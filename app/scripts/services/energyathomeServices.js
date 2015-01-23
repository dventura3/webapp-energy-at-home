var myApp =  angular.module('webappEnergyAtHomeApp');


myApp.factory('energyathomeServices', ['$http', '$q', function($http, $q){

		var host = "localhost";
		var ip = "8080";

		if(ip !== "")
				var baseURL = "http://" + host + ":" + ip;
		else
				var baseURL = "http://" + host;

		var data = [];  
  		var myServices = {};

		myServices.getConnectedDevices = function() {
			var deffered = $q.defer();
			var URL = baseURL + "/api/devices";
			$http.get(URL).success(function(resp){
				data = resp;
				deffered.resolve();
			});
			return deffered.promise;
		};


		myServices.getDeviceFunctions = function(deviceUID){
			var deffered = $q.defer();
			var URL = baseURL + "/api/devices/" + deviceUID + "/functions";
			$http.get(URL).success(function(resp){
				data = resp;
				deffered.resolve();
			});
			return deffered.promise;
		};


		myServices.getOnOffStatus = function(functionUID){
			var deffered = $q.defer();
			var URL = baseURL + "/api/functions/" + functionUID;
			$http({
				url: URL,
				method: "POST",
				data: { 'operation' : 'getData' }
			})
			.then(function(resp){
				data = resp.data;
				deffered.resolve();
			});
			return deffered.promise;
		};

		myServices.reverseOnOffStatus = function(functionUID, functionToSet){
			var deffered = $q.defer();
			var URL = baseURL + "/api/functions/" + functionUID;
			$http({
				url: URL,
				method: "POST",
				data: { 'operation' : functionToSet }
			})
			.then(function(resp){
				data = resp.data;
				deffered.resolve();
			});
			return deffered.promise;
		};

		myServices.data = function() { return data; };
		
		return myServices;
}]);

