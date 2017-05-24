'use strict'

angular.module('tutorialize')

.component('header', {
    templateUrl: '/components/header/header.html',
    controller: Header
})

function Header() {
    console.log("Header");
    // Controller
}