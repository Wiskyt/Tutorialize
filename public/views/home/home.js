'use strict'

angular.module('tutorialize')

.component('home', {
    templateUrl: './views/home/home.html',
    controller: Home,
    directives: ["tutoList", "header"]
})

function Home() {
    console.log("HOME");
    // Controller
}