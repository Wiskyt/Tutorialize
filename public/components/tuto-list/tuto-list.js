'use strict'

angular.module('tutorialize')

.component('tutoList', {
    templateUrl: './components/tuto-list/tuto-list.html',
    controller: TutoList
})

function TutoList($resource) {
    // Controller
    console.log("wow");
    var _this = this;

    var request = $resource("/data");
    request.get().$promise.then(function(data) {
        _this.tutorials = data.data;
    })
}