'use strict'

angular.module('tutorialize')

   .component('newtuto', {
      templateUrl: 'components/newtuto/newtuto.html',
      controller: NewTuto
   })

function NewTuto($resource, $scope, $http) {
   // Controller
   const that = this

   this.tuto = {
      title: "Angular Smart Table",
      lang: "French",
      techno: "AngularJS, NodeJS",
      media: "Website",
      price: 0,
      link: "http://lorenzofox3.github.io/smart-table-website/",
      description: "Excellent module pour réaliser une table intelligente en angular, la documentation est bien faite et il y a de nombreux exemples avec code a l'appui."
   }

   //let tuto = {}
   this.send = function () {
      const data = this.tuto


      // On vérifie que les champs ont bien été renseigné
      if (data.title !== undefined &&
            data.description !== undefined &&
            data.lang !== undefined && // TODO: Replace with lang
            data.media !== undefined &&
            data.techno !== undefined &&
            data.link) {

         
         data.techno = data.techno.split(", ");
         data.ratings = [
            { grade: 2 },
            { grade: 5 },
            { grade: 1 },
            { grade: 4 }
         ]

         data.author = 'Tutorializers';

         console.log(data)

         // On fait l'insertion
         $http.post("/tuto", data).then(function (r) {
            if (r.status == 201) {
               console.log("OULALAL l'erreur")
            } else {
               console.log("super, le tuto à étè créer")
            }
         })

      }
      // Sinon on demande de replir tous les champs
      else {

         const err = "Veuillez remplir tous les champs."
         console.log(err)
      }
   }

   // var req = $resource('/tutorial', tuto, { "post": { method: 'POST' } });
   // req.post().$promise.then((data) => {
   //     // answer

   // }); 
   $("#btnAjout").on('click', function () {
      $('#myModal').modal('hide');
   });


}