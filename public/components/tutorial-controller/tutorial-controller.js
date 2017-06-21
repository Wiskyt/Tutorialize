'use strict';

angular.module('tutorialize')

   .component('tutorialcontroller', {
      templateUrl: './components/tutorial-controller/tutorial-controller.html',
      controller: TutorialController
   })

function TutorialController($resource) {
   this.filters = {};
   this.filtersUser = {};
   this.tutos = {};

   // On récupére les tutos
   requestTutorials(this, $resource);
}

function requestTutorials(self, $resource) {

   var availableTechnosIcons = ["passportjs", "angularjs", "nodejs", "mean"]; // Array that lists all icons repertoried

   let request = $resource('/tuto');
   request.get().$promise.then((data) => {
      console.log(data);
      let tutorials = data.tuto;

      tutorials.map((e) => {
         let technos = [];
         for (let i = 0; i < e.techno.length; i++) {
            let obj = {
               name: e.techno[i],
               hasImg: availableTechnosIcons.indexOf(e.techno[i].toLowerCase()) > -1
            }
            technos.push(obj);
            //  technos.push(obj); // TODO: Flexbox layout for 2+ icons
         }

         e.techno = technos;


         let dt = new Date(e.datePost);
         e.datePost = dt.toLocaleDateString();
      });

      self.tutos = tutorials;

   }).then(() => {
      if (!self.filters.static) {
         var resFilters = $resource("/filters");

         resFilters.get().$promise.then((filters) => {
            self.filters.static = filters;
            self.filtersCount = calculateFiltersCount(self.filters.static, self.tutos);
         })
      } else {
         self.filtersCount = calculateFiltersCount(self.filters, self.tutos);
      }
   })
}

function calculateFiltersCount(filters, tutos) {

   console.log(filters, tutos);
   console.log('-------------------------------------');

   let countableFields = ["lang", "language", "techno", "media"];

   let count = {
      lang: initArray(filters['lang'].length, 0),
      language: initArray(filters['language'].length, 0),
      techno: initArray(filters['techno'].length, 0),
      media: initArray(filters['media'].length, 0),
      free: 0
   };

   console.log(count);
   console.log('-------------------------------------');

   for (let ti = 0; ti < tutos.length; ti++) {
      let tuto = tutos[ti];

      for (let cfi = 0; cfi < countableFields.length; cfi++) {

         let field = countableFields[cfi];

         if (field == 'techno') {
            for (let tfi = 0; tfi < tuto[field].length; tfi++) {
               let position = filters[field].indexOf(tuto[field][tfi].name);
               if (position >= 0) {
                  count[field][position]++;
               }
            }
         } else {
            let position = filters[field].indexOf(tuto[field]);

            //console.log(filters[field], tuto[field], filters[field].indexOf(tuto[field]));
            if (position >= 0) {
               count[field][position]++;
            }
         }
      }
   }

   console.log(count);
}

function initArray(size, value) {
   let arr = [];
   for (let i = 0; i < size; i++) {
      arr.push(value);
   } return arr;
}