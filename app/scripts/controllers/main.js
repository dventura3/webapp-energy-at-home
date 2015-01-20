'use strict';

/**
 * @ngdoc function
 * @name webappEnergyAtHomeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappEnergyAtHomeApp
 */
var app = angular.module('webappEnergyAtHomeApp');


app.controller('DevicesCtrl', ['$scope', 'energyathomeServices', function($scope, energyathomeServices) {
    $scope.text = "LIST-CONNNECTED-DEVICES-CONTROLLER";

	energyathomeServices.async().then(function() {
		$scope.connectedDevices = energyathomeServices.data();
	});

}]);
