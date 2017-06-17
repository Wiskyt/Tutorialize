'use strict'

angular.module('tutorialize')

   .component('tutolist', {
      templateUrl: './components/tuto-list/tuto-list.html',
      controller: TutoList
   })

function TutoList($resource, $scope) {
   var availableTechnosIcons = ["passportjs", "angularjs", "nodejs", "MEAN"]; // Array that lists all icons repertoried

   $scope.focusedTuto = 20;

   var request = $resource("/data");
   request.get().$promise.then((data) => {
      let tutorials = data.data;

      tutorials.map((e) => {
         let t = e.techno.split(", "), technos = [];
         for (let i = 0; i < t.length; i++) {
            let obj = {
               name: t[i],
               hasImg: availableTechnosIcons.indexOf(t[i]) > -1
            }
            technos.push(obj);
           //  technos.push(obj); // TODO: Flexbox layout for 2+ icons
         }

         e.techno = technos;
      });
      
      this.tutorials = tutorials.concat(tutorials);
      console.log(tutorials);
   })

   this.tutorialClick = function (index) {
      if (index == $scope.focusedTuto) {
         $scope.focusedTuto = -1;
      } else {
         $scope.focusedTuto = index;
      }
   }

   this.test = function () {
      console.log("aha");
   }
}