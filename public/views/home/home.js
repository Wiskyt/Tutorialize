'use strict'

angular.module('tutorialize')

.component('home', {
    templateUrl: './views/home/home.html',
    controller: Home,
    directives: ["tutolist", "header"]
})

function Home() {
}