'use strict'

angular.module('tutorialize')

   .component('searchfield', {
      templateUrl: './components/searchfield/searchfield.html',
      controller: searchfield,
      bindings: {
         tutos: '=',
         filters: '=',
         filtersUser: '='
      }
   })

function searchfield($resource) { 
 
}