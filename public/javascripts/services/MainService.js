
app.factory('MainService', ['$http', '$q', '$log', function ($http, $q, $log) {
		return {
			GetContacts: function () {
				var deferred = $q.defer();
				$http.get('contacts').then(function successCallback(data) {
					deferred.resolve(data);
				}, function errorCallback(error) {
					deferred.reject(error);
					$log.log(error.message);
				});
				return deferred.promise;
			},
			AddContact: function (newContact) {
				var deferred = $q.defer();
				$http.post('contacts', { newContact}).success(function (data, status) {
					deferred.resolve(data);
				}).error(function (error) {
					deferred.resolve("error");
				});
				return deferred.promise;
			},
			UpdateContact: function (contact, index) {
				var deferred = $q.defer();
				$http.put('contacts', { contact, index}).success(function (data, status) {
					deferred.resolve(data);
				}).error(function (error) {
					deferred.resolve("error");
				});
				return deferred.promise;
			},
			DeleteContact: function (index) {
				var deferred = $q.defer();
				$http.delete('contacts/' + index).success(function (data, status) {
					deferred.resolve(data);
				}).error(function (error) {
					deferred.resolve("error");
				});
				return deferred.promise;
			}
		}
	}]);
