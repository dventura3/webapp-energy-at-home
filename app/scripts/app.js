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
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
