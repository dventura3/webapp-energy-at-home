angular.module('webappEnergyAtHomeApp')
	.factory('energyathomeServices', ['$http', '$q' , function($http, $q){

		var deffered = $q.defer();
  		var data = [];  
  		var myService = {};

		myService.async = function() {
			var baseURL = "http://localhost:8080/api/devices";
			$http.get(baseURL).success(function(resp){
				data = resp;
				console.log(resp);
				deffered.resolve();
			});
			return deffered.promise;
		};
		myService.data = function() { return data; };
		
		return myService;
}]);

