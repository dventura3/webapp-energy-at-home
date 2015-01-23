var myApp =  angular.module('webappEnergyAtHomeApp');


myApp.factory('energyathomeServices', ['$http', '$q', '$websocket' , function($http, $q, $websocket){

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

		myServices.subscribeForEnergyEvents = function(functionUID, nameOfProperty){
			if(ip !== "")
				var baseURL = host + ":" + ip;
			else
				var baseURL = host;
			var ws = $websocket('ws://' + baseURL + '/ws');
			var collection = [];

			ws.onMessage(function(event) {
				var res;
				try {
					res = JSON.parse(event.data);
					console.log(res.properties["dal.function.property.value"].level + res.properties["dal.function.property.value"].unit);
				} catch(e) {
					res = "Error";
				}
			});

			ws.onError(function(event) {
				console.log('connection Error', event);
			});
			ws.onClose(function(event) {
				console.log('connection closed', event);
			});
			
			ws.onOpen(function() {
				console.log('connection open');
				ws.send({"dal.function.UID" : functionUID, "dal.function.property.name" : nameOfProperty});
			});
		};

		myServices.data = function() { return data; };
		
		return myServices;
}]);

