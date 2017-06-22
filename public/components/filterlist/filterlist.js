'use strict';

angular.module('tutorialize')

.component('filterlist', {
    templateUrl: '/components/filterlist/filterlist.html',
    controller: Filterlist,
    bindings: {
       name: '<',
       displayName: '<',
       filter: '<',
       filterCount: '<'
    }
})

function Filterlist() {
}