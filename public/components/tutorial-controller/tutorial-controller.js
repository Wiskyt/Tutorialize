'use strict';

angular.module('tutorialize')

    .component('tutorialcontroller', {
        templateUrl: './components/tutorial-controller/tutorial-controller.html',
        controller: TutorialController
    })

function TutorialController($resource) {
    this.filters = {};
    this.filtersUser = {};
    this.tutos = {};

    // On récupére les tutos
    requestTutorials(this, $resource);
    requestFilters(this , $resource );


}

function requestTutorials(self, $resource) {

    var availableTechnosIcons = ["passportjs", "angularjs", "nodejs", "MEAN"]; // Array that lists all icons repertoried

    var request = $resource("/data");
    request.get().$promise.then((data) => {
        let tutorials = data.data;

        tutorials.map((e) => {
            let t = e.techno.split(", "),
                technos = [];
            for (let i = 0; i < t.length; i++) {
                let obj = {
                    name: t[i],
                    hasImg: availableTechnosIcons.indexOf(t[i]) > -1
                }
                technos.push(obj);
                //  technos.push(obj); // TODO: Flexbox layout for 2+ icons
            }

            e.techno = technos;
        });

        self.tutos = tutorials.concat(tutorials);
        console.log(self.tutos);
    })


}
function requestFilters(self, $resource) {
    var resFilters = $resource("/filters");

    resFilters.get().$promise.then((filters) => {
        self.filters = filters;

        console.log("request filters",filters);
    })
}
