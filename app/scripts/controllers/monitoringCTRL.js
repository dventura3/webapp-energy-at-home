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

	$scope.ENERGY = {
		level : 0,
		unit : 'W'
	};

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

		//status Of current on/off value
		$scope.devSelectedStatus = {};

		//to show "active" class in the list of selected device
		$scope.activeDevice = idDevice;

		//update element to show in the right part of the web page
        $scope.devSelected = idDevice;
		
		//call service to get all functions of selected device
		energyathomeServices.getDeviceFunctions(idDevice).then(function() {
				var selectedDeviceFunctions = energyathomeServices.data();
				$scope.functionUID = {}; //ID of function related to OnOff operation
				for(var x=0; x < selectedDeviceFunctions.length; x++){
					if(selectedDeviceFunctions[x]["dal.function.UID"].indexOf("OnOff") !=-1)
							$scope.functionUID["OnOff"] = selectedDeviceFunctions[x]["dal.function.UID"];
					if(selectedDeviceFunctions[x]["dal.function.UID"].indexOf("EnergyMeter") !=-1)
							$scope.functionUID["EnergyMeter"] = selectedDeviceFunctions[x]["dal.function.UID"];		
				}
				
				//invoke the service to know the current OnOff state of the selected device
				energyathomeServices.getOnOffStatus($scope.functionUID.OnOff).then(function() {
						var selectedDeviceStatus = energyathomeServices.data();
						$scope.devSelectedStatus.OnOff = selectedDeviceStatus.result.value;
						$scope.checkValue = $scope.devSelectedStatus.OnOff;
				});

				//Open websocket to receive energy data
				energyathomeServices.subscribeForEnergyEvents($scope.functionUID.EnergyMeter,"current");
				//var tmp = energyathomeServices.energyEvents();
				
		});
    };

	$scope.reverseOnOffStatus = function(){
		var functionToSet = "";
		if($scope.checkValue == 1)
			functionToSet = "setTrue";
		else
			functionToSet = "setFalse";
		//call API
		energyathomeServices.reverseOnOffStatus($scope.functionUID.OnOff, functionToSet).then(function() {
				console.log("Device status was set? " + JSON.stringify(energyathomeServices.data()));
		});
	}


	$scope.$watch(function () { 
		return energyathomeServices.energyEvents();
	}, function (newVal, oldVal) {
		console.log("New Data::: ", newVal);
		$scope.ENERGY.level = newVal.level;
		$scope.ENERGY.unit = newVal.unit;
	}, true);

}]);


