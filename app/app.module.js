var app = angular.module('my_legal_helper', ['ngRoute'])

.controller('mainController', function($scope, $route, $routeParams, $location) {
  $scope.appName = "My Legal Helper";
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
})

.controller('landingController', function($scope) {
  $scope.message = "The app routing is working for the landing part!";
})

.controller('questionnaireController', function($scope) {
  $scope.message = "The app routing is working for the questionnaire part!";
});

app.config(function($routeProvider, $locationProvider) {
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
  .when("/home",
    {
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