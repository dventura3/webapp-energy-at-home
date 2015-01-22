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

	energyathomeServices.getConnectedDevices().then(function() {
		//receive a json object containing a list of connected devices
		$scope.connectedDevices = energyathomeServices.data();

		//to set as "active" the first device in the list
		if($scope.connectedDevices.length >= 1)
			$scope.activeDevice = $scope.connectedDevices[0]["dal.device.UID"];
		/*
		for(var x=0; x < $scope.connectedDevices.length; x++)
			console.log($scope.connectedDevices[x]["dal.device.UID"]);
		*/
	});

	$scope.isActive = function(idDevice){
		return $scope.activeDevice === idDevice;
	};

	$scope.selectDevForDetails = function(idDevice){
		//to show "active" class in the list of selected device
		$scope.activeDevice = idDevice;

		//update element to show in the right part of the web page
        $scope.devSelected = idDevice;
    };

	//quando si clicca su un device, si invoca la .../api/devices/{devUID}/functions e
	//automaticamente anche la funzione per aprire il webSocket e ricevere
	//i dati sul consumo energetico da graficare.


}]);


