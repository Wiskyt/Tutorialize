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
   })

   .filter('myStrictFilter', function ($filter) {
      return function (input, predicate) {
         return $filter('filter')(input, predicate, true);
      }
   })

   .filter('unique', function () {
      return function (arr, field) {

         console.log("WOLOLOLO");

         var o = {}, i, l = arr.length, r = [];
         for (i = 0; i < l; i += 1) {
            o[arr[i][field]] = arr[i];
         }
         for (i in o) {
            r.push(o[i]);
         }
         return r;
      };
   })

   .directive("refreshTable", function () {
      return {
         require: 'stTable',
         restrict: "A",
         link: function (scope, elem, attr, table) {
            scope.$on("refreshTutos", function () {
               table.pipe(table.tableState());
            });
         }
      }
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