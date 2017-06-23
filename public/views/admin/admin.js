'use strict'

angular.module('tutorialize')

   .component('admin', {
      templateUrl: './views/admin/admin.html',
      controller: Admin
   })

function Admin($resource, $scope) {
   let request = $resource('/tuto/all');
   request.get().$promise.then((data) => { // REQUETE DES TUTORIELS
      let tutorials = data.tuto;

      tutorials.map((e) => { // On parcours les tutos pour savoir si il est possible de remplacer le txt techno par une image

         /*         let technos = [];
                  for (let i = 0; i < e.techno.length; i++) {
                     let obj = {
                        name: e.techno[i],
                        hasImg: availableTechnosIcons.indexOf(e.techno[i].toLowerCase()) > -1
                     }
                     technos.push(obj);
                  }
                  e.techno = technos;*/

         // On convertis la date en format lisible

         e.datePost = new Date(e.datePost).toLocaleDateString();
         e.dateCreate = new Date(e.dateCreate).toLocaleDateString();

         return e;
      });

      this.tutos = tutorials;
      this.tutosCopy = [].concat(tutorials);

      $scope.predicates = ['lang', 'title', 'language', 'dateTuto', 'datePost', 'link', 'price', 'flags', 'valid'];
      $scope.selectedPredicate = $scope.predicates[8];
   });

   this.valid = function (id) {
      console.log("ID: ", id);
      let request = $resource('/tuto/valid/' + id);
      request.save().$promise.then((data) => {
         
         let index = this.tutos.findIndex((e) => {
            return e._id == id;
         });
         console.log(index);

         let item = this.tutos.splice(index, 1)[0];
         item.isValid = data.valid;
         
         this.tutos.push(item);

         console.log('Validey', this.tutos);
      });
   }

   this.edit = function (id) {

   }

   // Function that resets flags to 0
   this.clearFlags = function (id) {

   }

   this.delete = function (id) {
      let request = $resource('/tuto/' + id);
      request.delete().$promise.then((data) => {
         this.tutos.splice(this.tutos.findIndex((e) => e._id = id), 1);
      });
   }
}