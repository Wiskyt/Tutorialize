'use strict'

angular.module('tutorialize')

    .component('header', {
        templateUrl: '/components/header/header.html',
        controller: Header
    })

function Header($resource, $http) {
    var request = $resource("/auth/info");

    request.get().$promise.then((data) => {
        if (data.msg == "Unauthenticated") {
            this.auth = false;
        } else {
            this.auth = true;
            this.user = data;
        }
    });

    // fonction qui doit ajouter des tutos au clic sur le bouton
    this.addTuto = function () {
        // J'instencie dans une const le contenu des tutos qu'on ajoute
        const data = [
            {
                title: 'Tuto1',
                description: 'C\'est le tuto 1',
                rating: [
                    {
                        grade: '5',
                    },
                    {
                        grade: '3',
                    },
                    {
                        grade: '4',
                    }
                ],
                language: 'JS',
                lang: 'French',
                techno: 'jQuery',
                media: 'Website',
                author: 'Rocky',
                price: '0',
                link: 'http://www.google.fr'
            },
            {
                title: 'Tuto2',
                description: 'C\'est le tuto 2',
                rating: [
                    {
                        grade: '1',
                    },
                    {
                        grade: '1',
                    },
                    {
                        grade: '1',
                    }
                ],
                language: 'HTML',
                lang: 'English',
                techno: 'React',
                media: 'Video',
                author: 'Balboa',
                price: '10',
                link: 'http://www.google.fr'
            }]

        // On fait l'insertion
        const dataLength = data.length
        for (let i = 0; i < dataLength; i++) {
            $http.post("/tuto", data[i]).then(function (r) {
                if (r.status == 201) {
                    console.log("OULALAL l'erreur")
                }
                else {
                    location.reload();
                    console.log("super, le tuto à étè créer")
                }
            })
        }
    }

}