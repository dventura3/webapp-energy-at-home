'use strict';

/**
 * @ngdoc function
 * @name webappEnergyAtHomeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappEnergyAtHomeApp
 */
var app = angular.module('webappEnergyAtHomeApp');


app.controller('MainCtrl', ['$scope', 'energyathomeServices', function($scope, energyathomeServices) {
    $scope.text = "pippo";
	
	energyathomeServices.async().then(function() {
		$scope.connectedDevices = energyathomeServices.data();
	});
}]);
