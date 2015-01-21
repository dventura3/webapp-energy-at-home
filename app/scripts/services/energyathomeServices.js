angular.module('webappEnergyAtHomeApp')
	.factory('energyathomeServices', ['$http', '$q' , function($http, $q){

		var host = "localhost";
		var ip = "8080";

		if(ip !== "")
				var baseURL = "http://" + host + ":" + ip;
		else
				var baseURL = "http://" + host;

		var deffered = $q.defer();
  		var data = [];  
  		var myServices = {};

		myServices.getConnectedDevices = function() {
			var URL = baseURL + "/api/devices";
			$http.get(URL).success(function(resp){
				data = resp;
				console.log(data);
				deffered.resolve();
			});
			return deffered.promise;
		};


		myServices.getDeviceFunctions = function(){
			var URL = baseURL + "/api/devices/{name-device}/functions";
		};

		myServices.data = function() { return data; };
		
		return myServices;
}]);

