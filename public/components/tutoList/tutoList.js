'use strict'

angular.module('tutorialize')

.component('tutoList', {
    templateUrl: '/components/tutoList/tutoList.html',
    controller: TutoList
})

function TutoList($resource) {
    console.log("hello");
    // Controller
    var _this = this;

    var request = $resource("127.0.0.1:9000/data");
    request.get().$promise.then(function(data) {
        console.log("got ", data);
    })
}