'use strict';

angular.module('Full_Disclosure', [ 'ngRoute', 'ngSanitize', 'restangular', 'ui.bootstrap' ]);

angular.module('Full_Disclosure')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		title: '',
		templateUrl: '/assets/html/post.html',
		controller: 'PostCtrl'
	})
	.when('/resources', {
		title: 'Resources',
		templateUrl: '/assets/html/resources.html',
		controller: 'ResourcesCtrl'
	})
	.when('/archive', {
		title: 'Archive',
		templateUrl: '/assets/html/archive.html',
		controller: 'ArchiveCtrl'
	})
	.when('/about', {
		title: 'About',
		templateUrl: '/assets/html/about.html',
		controller: 'AboutCtrl'
	})
	.when('/post/:postId', {
		title: '',
		templateUrl: '/assets/html/post.html',
		controller: 'PostCtrl'
	})
	.otherwise({
		redirectTo: '/about'
	});
	$locationProvider.html5Mode(true);
}])
.run(['Restangular', function(Restangular) {
	Restangular.setBaseUrl('/wp/?json_route=');
	Restangular.setDefaultHeaders({
		'Content-Type' : 'application/json'
	});
}])
.run(['$rootScope', function($rootScope) {
	$rootScope.$on('$routeChangeSuccess', function(event, next, current) {
		$rootScope.title = next.$$route.title;
	});
}]);