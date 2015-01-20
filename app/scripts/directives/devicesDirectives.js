var app = angular.module('webappEnergyAtHomeApp');

app.directive('listConnectedDevices', function(){
	return {
		restrict: 'E',
		templateUrl: 'views/listConnectedDevices.html',
		controller: 'ConnectedDevicesCtrl'
	};
});
