'use strict'

angular.module('tutorialize')

    .component('searchfield', {
        templateUrl: './components/searchfield/searchfield.html',
        controller: searchfield
    })

function searchfield($resource) {
    // Controller
    console.log("searchfield");

    var _this = this;

    var requestLang = $resource("/filters/lang");
    var requestLanguages = $resource("/filters/languages")
    var requestTechnology = $resource("/filters/technology")
    var requestType = $resource("/filters/type")

    requestLang.get().$promise.then(function (lang) {
        console.log("sss", lang.filter)
        _this.filLang = lang.filter
    })

    requestLanguages.get().$promise.then(function (languages) {
        console.log("sss", languages.filter)
        _this.filLanguages = languages.filter
    })

    requestTechnology.get().$promise.then(function (technology) {
        console.log("sss", technology.filter)
        _this.filTechnology = technology.filter
    })
 
    requestType.get().$promise.then(function (type) {
        console.log("sss", type.filter)
        _this.filType = type.filter
    })

}