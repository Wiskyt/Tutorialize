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

   .directive('tooltip', function () {
      return {
         restrict: 'A',
         link: function (scope, element, attrs) {
            $(element).hover(function () {
               // on mouseenter
               $(element).tooltip('show');
            }, function () {
               // on mouseleave
               $(element).tooltip('hide');
            });
         }
      };
   });

function Config($stateProvider, $urlRouterProvider) {
   const states = [{
      name: 'home',
      url: '/',
      component: 'home'
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