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
   
   this.focusedTuto = -1;
   
   this.onTutorialClick = (index) => {
      if (index == this.focusedTuto) {
         this.focusedTuto = -1;
      } else {
         this.focusedTuto = index;
      }
   }
}