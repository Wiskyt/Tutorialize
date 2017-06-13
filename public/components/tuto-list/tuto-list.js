'use strict'

angular.module('tutorialize')

   .component('tutolist', {
      templateUrl: './components/tuto-list/tuto-list.html',
      controller: TutoList
   })

function TutoList($resource) {
   // Controller
   var _this = this;

   var availableTechnosIcons = ["passportjs", "angularjs", "nodejs"]; // Array that lists all icons repertoried

   var request = $resource("/data");
   request.get().$promise.then(function (data) {
      let tutorials = data.data;

      tutorials.map((e) => {
         let obj = {
            name: e.techno,
            hasImg: availableTechnosIcons.indexOf(e.techno) > 0
         }
         console.log(obj);
         e.techno = obj;
      });


      _this.tutorials = tutorials;
   })
}