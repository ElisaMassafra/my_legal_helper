var app = angular.module('my_legal_helper', ['ngRoute', 'ngAnimate', 'ngSanitize'])

.controller('mainController', function($scope, $route, $routeParams, $location) {
	$scope.appName = "My Legal Helper";
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
})

.controller('landingController', function($scope) {
	$scope.hideLBool = true;
})

.controller('questionnaireController', function($scope, $http, $sce) {
  	$scope.hideQBool = true;
	$scope.qsCase = $sce.trustAsHtml('<input type="text" placeholder="first name" name="firstName" ng-model="caseAns.firstName" ng-required="true"/>');
	
	/*[
	{html: '<input type="text" placeholder="first name" name="firstName" ng-model="caseAns.firstName" ng-required="true"/>'},
	{html: '<input type="text" placeholder="last name" name="lastName" ng-model="caseAns.lastName" ng-required="true"/>'}
	];
	
	$scope.nextQ = function(){
	};

	/*console.log(angular.toJson($scope.qsCase));
		$http.get("data/qsCase.json").then(function(data){
		$scope.qsCase = data;
	});
	$http.get("data/qsLetter.json").then(function(data){
		$scope.qsLetter = data;
	});*/
})

.config(function($routeProvider, $locationProvider) {
	var baseUrl = 'app/components/';
	$routeProvider
   .when('/questionnaire', {
		templateUrl: baseUrl+"questionnaire/questionnaire_view.html",
		controller: "questionnaireController",
		resolve: {
			// I will cause a 1 second delay
			delay: function($q, $timeout) {
				var delay = $q.defer();
				$timeout(delay.resolve, 1000);
				return delay.promise;
			}
		}
	})
	.when("/home",{
        templateUrl: baseUrl+"landing/landing_view.html",
        controller: "landingController",
		resolve: {
			// I will cause a 1 second delay
			delay: function($q, $timeout) {
				var delay = $q.defer();
				$timeout(delay.resolve, 1000);
				return delay.promise;
			}
		}
    }).otherwise({ redirectTo: '/home' });
	$locationProvider.html5Mode(true);
});