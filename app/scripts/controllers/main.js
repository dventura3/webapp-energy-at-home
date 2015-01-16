'use strict';

/**
 * @ngdoc function
 * @name webappEnergyAtHomeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappEnergyAtHomeApp
 */
var app = angular.module('webappEnergyAtHomeApp');

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.text = "pippo";
	
	$scope.connectedDevices = [];

	var baseURL = "http://localhost:8080/api/devices";

	$http.get(baseURL).success(function(resp){
/* Example of resp:
[{"dal.device.status":2,"dal.device.UID":"ZigBee:SmartPlug 1:ah.app.3521399293210526020-8","service.bundleid":79,"dal.device.driver":"ZigBee","service.id":158,"service.scope":"singleton"}]
*/
		console.log(resp);
		$scope.connectedDevices = resp;
	});

}]);
