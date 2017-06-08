'use strict'

angular.module('tutorialize')

.component('searchfield', {
    templateUrl: './components/searchfield/searchfield.html',
    controller: searchfield
})

function searchfield($resource) {
    // Controller
   console.log("searchfield");
}