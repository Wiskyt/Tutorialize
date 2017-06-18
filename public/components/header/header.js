'use strict'

angular.module('tutorialize')

   .component('header', {
      templateUrl: '/components/header/header.html',
      controller: Header
   })

function Header($resource) {
   var request = $resource("/auth/info");
   
   request.get().$promise.then((data) => {
      if (data.msg == "Unauthenticated") {
         this.auth = false;
      } else {
         this.auth = true;
         this.user = data;
      }
   });
}