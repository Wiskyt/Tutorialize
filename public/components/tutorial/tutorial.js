'use strict';

angular.module('tutorialize')

.component('tutorial', {
    templateUrl: '/components/tutorial/tutorial.html',
    controller: Tutorial,
    bindings: {
       tutorial: '<',
       onTutorialClick: '=',
       index: '<'
    }
})

function Tutorial() {
    // Controller
}