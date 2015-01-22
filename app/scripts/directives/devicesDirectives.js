var app = angular.module('webappEnergyAtHomeApp');

app.directive('listConnectedDevices', function(){
	return {
		restrict: 'E',
		templateUrl: 'views/listConnectedDevices.html'
	};
});


app.directive('deviceDetails', function(){
	return {
		restrict: 'E',
		templateUrl: 'views/deviceDetails.html'
	};
});
