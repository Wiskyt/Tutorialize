'use strict'

angular.module('tutorialize')

.component('tutolist', {
    templateUrl: './components/tuto-list/tuto-list.html',
    controller: TutoList
})

function TutoList($resource) {
    // Controller
    var _this = this;

    var request = $resource("/data");
    request.get().$promise.then(function(data) {
        _this.tutorials = data.data;
    })
}