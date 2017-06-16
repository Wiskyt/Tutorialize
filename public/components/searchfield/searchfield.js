'use strict'

angular.module('tutorialize')

   .component('searchfield', {
      templateUrl: './components/searchfield/searchfield.html',
      controller: searchfield
   })

function searchfield($resource) {
   var resFilters = $resource("/filters");

   resFilters.get().$promise.then((filters) => {
      this.filters = filters;

      console.log(filters);
   })
}