'use strict'

angular.module('tutorialize')

   .component('admin', {
      templateUrl: './views/admin/admin.html',
      controller: Admin
   })

function Admin($resource) {
   let request = $resource('/tuto');
   request.get().$promise.then((data) => { // REQUETE DES TUTORIELS
      console.log(data);
      let tutorials = data.tuto;

      tutorials.map((e) => { // On parcours les tutos pour savoir si il est possible de remplacer le txt techno par une image

         /*         let technos = [];
                  for (let i = 0; i < e.techno.length; i++) {
                     let obj = {
                        name: e.techno[i],
                        hasImg: availableTechnosIcons.indexOf(e.techno[i].toLowerCase()) > -1
                     }
                     technos.push(obj);
                  }
                  e.techno = technos;*/

         // On convertis la date en format lisible

         e.datePost = new Date(e.datePost).toLocaleDateString();
         e.dateCreate = new Date(e.dateCreate).toLocaleDateString();

         return e;
      });

      this.tutos = tutorials;
   });
}