'use strict'

angular.module('tutorialize')

.component('home', {
    templateUrl: '/views/home/home.html',
    controller: Home
})

function Home() {
    console.log("HOME");
    // Controller
}