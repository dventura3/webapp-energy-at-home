'use strict';

/**
 * @ngdoc function
 * @name webappEnergyAtHomeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappEnergyAtHomeApp
 */
var app = angular.module('webappEnergyAtHomeApp');


app.controller('ConnectedDevicesCtrl', ['$scope', 'energyathomeServices', function($scope, energyathomeServices) {

	energyathomeServices.async().then(function() {
		//receive a json object containing a list of connected devices
		$scope.connectedDevices = energyathomeServices.data();
		for(var x=0; x < $scope.connectedDevices.length; x++)
			console.log($scope.connectedDevices[x]["dal.device.UID"]);
	});

	//quando si clicca su un device, si invoca la .../api/devices/{devUID}/functions e automaticamente anche la funzione per
	//aprire il webSocket e ricevere i dati sul consumo energetico da graficare

}]);
