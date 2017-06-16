'use strict'

angular.module('tutorialize')

   .component('tutolist', {
      templateUrl: './components/tuto-list/tuto-list.html',
      controller: TutoList
   })

function TutoList($resource, $scope) {
   var availableTechnosIcons = ["passportjs", "angularjs", "nodejs"]; // Array that lists all icons repertoried

   $scope.focusedTuto = 20;

   var request = $resource("/data");
   request.get().$promise.then((data) => {
      let tutorials = data.data;

      tutorials.map((e) => {
         let obj = {
            name: e.techno,
            hasImg: availableTechnosIcons.indexOf(e.techno) > 0
         }
         e.techno = obj;
      });

      this.tutorials = tutorials;
      console.log(tutorials);
   })

   this.tutorialClick = function (index) {
      if (index == $scope.focusedTuto) {
         $scope.focusedTuto = -1;
      } else {
         $scope.focusedTuto = index;
      }
   }

   this.test = function() {
      console.log("aha");
   }
}