'use strict';

angular.module('tutorialize')

.component('tutorial', {
    templateUrl: '/components/tutorial/tutorial.html',
    controller: Tutorial,
    bindings: {
       tutorial: '<',
       onTutorialClick: '=',
       index: '<',
       focusedTuto: '@'
    }
})

function Tutorial() {
    // Controller
}