'use strict';

/**
 * @ngdoc overview
 * @name webappEnergyAtHomeApp
 * @description
 * # webappEnergyAtHomeApp
 *
 * Main module of the application.
 */
angular
  .module('webappEnergyAtHomeApp', [
    'ngRoute', 'ngResource'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/connection', {
        templateUrl: 'views/connection.html'
      })
	  .when('/', {
        templateUrl: 'views/connection.html'
      })
	  .when('/monitoring', {
        templateUrl: 'views/monitoring.html'
      })
	  .when('/about', {
        templateUrl: 'views/about.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
