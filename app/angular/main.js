angular.module('Ticketing', ['ngSanitize','ngRoute','ngResource','ngFileUpload','ui.bootstrap','colorpicker.module']).config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "public/Login.html",
		controller:"universalController"
    })
    .when("/Login", {
        templateUrl : "public/Login.html",
		controller:"universalController"
    })
	.when("/Dashboard", {
        templateUrl : "public/Dashboard.html",
		controller:"universalController"
    })
	
	.when("/Profile", {
        templateUrl : "public/Profile.html",
		controller:"universalController"
    })
	.when("/Lock", {
        templateUrl : "public/Lock.html",
		controller:"universalController"
    })
	.when("/QueryForm", {
        templateUrl : "public/QueriesDetails.html",
		controller:"universalController"
    })
	.when("/UsersDetails", {
        templateUrl : "public/UsersDetails.html",
		controller:"universalController"
    })
	.when("/DepartmentDetails", {
        templateUrl : "public/DepartmentDetails.html",
		controller:"universalController"
    })
	.otherwise({
		  redirectTo: ''
		});
}).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
       if(input!=undefined)
        {return input.slice(start);}
    }
});