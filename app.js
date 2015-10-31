'use strict';

// Declare app level module which depends on views, and components
var app=angular.module('myApp', [])
app.directive('appfooter', function() {
    return {
       templateUrl: "html/footer.html"
    };
  });
app.directive('appheader', function() {
    return {
       templateUrl: "html/header.html"
    };
  });