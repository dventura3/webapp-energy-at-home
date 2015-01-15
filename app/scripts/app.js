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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
