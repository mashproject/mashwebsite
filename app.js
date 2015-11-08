'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ui.router']);
app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);


app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        /*$locationProvider.html5Mode(true);*/
        $stateProvider.
            /* PUBLIC PAGES */
            state('events', {
                url: '^/events/{id:int}',
                templateUrl: "Event.html",
                controller: 'singlEventCtrl'
            }).
            state('home', {
                url: '/',
                templateUrl: 'html/home.html',
                controller: 'eventCtrl'
            }).
            state('internship', {
                url: '/internship',
                templateUrl: 'internship.html'
            }).
            state('team', {
                url: '/team',
                templateUrl: 'team.html'
            }).
            state('partners', {
                url: '/partner',
                templateUrl: 'Partners.html'
            }).
            state('contributors', {
                url: '/contributors',
                templateUrl: 'Contributors.html'
            }).
            state('culture', {
                url: '/culture',
                templateUrl: 'Culture.html'
            })


    }]);

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
app.controller('eventCtrl', ['$scope', '$http', '$state',
    function ($scope, $http, $state) {
        console.log('loading events');
        $http.get('http://52.74.102.84:8000/events/?is_published=true').success(function (data) {
            $scope.events = data;
            console.log(data);
        });
        $scope.open = function (id) {
            $state.go('events', {id: id});
        };
    }]);
app.controller('singlEventCtrl', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
        var id = $stateParams.id;
        console.log('inside event ' + id.toString());
        $http.get('http://52.74.102.84:8000/events/?id=' + id.toString()).success(function (data) {
            $scope.event = data[0];
            console.log(data);
            console.log({"ids":data[0].supporters});
            $http.post('http://52.74.102.84:8000/events/supporters', {"ids":data[0].supporters}).success(function (data) {
                $scope.supporters = data;
                console.log(data);
            });
        });
    }]);
app.run(["$rootScope", "$anchorScroll" , function ($rootScope, $anchorScroll) {
    $anchorScroll.yOffset = 50;
    $rootScope.$on("$locationChangeSuccess", function() {
        $anchorScroll();
    });
}]);
app.controller('headerCtrl', ['$anchorScroll', '$location', '$scope',
    function ($anchorScroll, $location, $scope) {
        $scope.gotoAnchor = function (x) {
            var newHash = x;
            console.log($location.path(''));
            $location.replace();
            $scope.active = x;
            if ($location.hash() != newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash(x);
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }
        };
    }
]);

