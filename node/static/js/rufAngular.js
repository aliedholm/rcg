angular.module('rufAngular', []);
//defining the angular controller
var angCtrl = async function($scope, fetchData){
  var temp1Url = 'http://132.239.205.188:8080/api/retrieveTable/sensors-temp1';
  var table61Url = 'http://132.239.205.188:8080/api/retrieveTable/sensors-table61';
  var results;
  changeData(temp1Url, $scope, fetchData, setScope);
}

//function to string together other required functions
changeData = function(url, $scope, fetchData, setScope){
  var fetchedData = fetchData(url);
  setScope(fetchedData, $scope);
}

//function to set the scope based on the results of a promise return of data
setScope = function(promise, $scope){
  promise.then(function(data){
    var results = data;
    $scope.data = {readings : results.data}
  }, function(error){
    console.error(data);
  })
}

//function to generate a promise that will return the required data
fetchData = function($http, $q){
  return function(url){
    var defer = $q.defer()
    fetchedData = $http({
      method: 'GET',
      url: url
    }).then(function(response){
        defer.resolve(response)
      }, function(err){
        defer.reject(err)
      })
    return defer.promise
  }
}

angular
  .module('rufAngular')
  .controller('angCtrl', angCtrl)
  .service('fetchData', fetchData)
  .service('changeData', changeData)
  .service('setScope', setScope);

