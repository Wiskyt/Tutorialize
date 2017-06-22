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
   'ngResource',
   'ngAnimate',
   'smart-table'
   // Here list your modules
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
   })

   .factory('User', function () {
      let user = {};

      function login() {
         return $resource("/auth/info").get().$promise;
      }
      
      function setUser() {

      }

      function getUser() {

      }

      function isLoggedIn() {
         return user !== {};
      }

      function logout() {
         
      }

      then((data) => {
         if (data.msg == "Unauthenticated") {
            this.auth = false;
         } else {
            this.auth = true;
            this.user = data;
            console.log(this.user);
         }
      });
   });

function Config($stateProvider, $urlRouterProvider) {
   const states = [{
      name: 'home',
      url: '/',
      component: 'home'
   }, {
      name: 'admin',
      url: '/admin',
      component: 'admin'
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