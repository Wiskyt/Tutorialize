'use strict'

const config = [
    '$stateProvider',
    '$urlRouterProvider',
    Config
]

const run = [
    '$state',
    Run
]

angular.module('tutorialize', [
    'ui.router',
    'ngResource'
    // HERE LIST YOUR MODULES
])

.config(config)
    .run(run)

function Config($stateProvider, $urlRouterProvider) {
    const states = [{
        name: 'home',
        url: '/',
        component: 'home'
    }, {
        name: 'tutoList',
        url: '',
        component: 'tutoList'
    }];

    states.forEach((state) => {
        $stateProvider.state(state)
    });

    $urlRouterProvider.otherwise('/');
}

function Run($state) {
    if (!navigator.onLine) {
        $state.go('offline')
    }
}