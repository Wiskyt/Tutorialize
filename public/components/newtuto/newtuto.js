'use strict'

angular.module('')

   .component('newtuto', {
      templateUrl: 'components/newtuto/newtuto.html',
      controller: NewTuto
   })

function NewTuto() {
   // Controller
   console.log('NewTuto loaded');

   this.send = function () {
      let tuto = {

      };

      var req = $resource('/tutorial', tuto, { "post": {method: 'POST' }});
      req.post().$promise.then((data) => {
         // answer
      });
   }
}
