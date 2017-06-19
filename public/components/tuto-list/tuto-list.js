'use strict'

angular.module('tutorialize')

   .component('tutolist', {
      templateUrl: './components/tuto-list/tuto-list.html',
      controller: TutoList,
      bindings: {
         tutos: '<'
      }
   })

function TutoList($resource, $scope) {
   
   $scope.focusedTuto = -1;
   
   this.onTutorialClick = function (index) {
      if (index == $scope.focusedTuto) {
         $scope.focusedTuto = -1;
      } else {
         $scope.focusedTuto = index;
      }
   }
}