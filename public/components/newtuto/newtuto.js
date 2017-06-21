'use strict'

angular.module('tutorialize')

    .component('newtuto', {
        templateUrl: 'components/newtuto/newtuto.html',
        controller: NewTuto
    })

function NewTuto($resource, $scope, $http) {
    // Controller
    const that = this

    //let tuto = {}
    this.send = function () {
        const data = this.tuto
        // On vérifie que les champs ont bien été renseigné
        if (data.title !== undefined ||
            data.description !== undefined ||
            data.langage !== undefined ||
            data.media !== undefined ||
            data.techno !== undefined) {
            console.log(data)
            
            // On fait l'insertion
            $http.post("/tuto", data).then(function (r) {
                if (r.status == 201) {
                    console.log("OULALAL l'erreur")
                }
                else {
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
}

