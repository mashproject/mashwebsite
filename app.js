'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', []);
app.directive('appfooter', function () {
    return {
        templateUrl: "html/footer.html"
    };
});
app.directive('appheader', function () {
    return {
        templateUrl: "html/header.html"
    };
});
app.controller('eventCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('http://52.74.102.84:8000/events').success(function (data) {
            $scope.events = data;
        });
        $scope.open=function(id){

        }
    }]);

//app.config(['$stateProvider', '$urlRouterProvider',
//    function ($stateProvider, $urlRouterProvider) {
//        /*$locationProvider.html5Mode(true);*/
//        $stateProvider.
//
//            /* PUBLIC PAGES */
//            state('events', {
//                url: '/events/{id:int}',
//                templateUrl: 'Events.html',
//                controller: ['$scope', '$http','$stateParams',
//                    function ($scope, $http,$stateParams) {
//                        id=$stateParams.id;
//                        $http.get('http://52.74.102.84:8000/events/').success(function (data) {
//                            $scope.events = data;
//                        });
//
//                    }]
//            })
//
//
//
//    }]);
