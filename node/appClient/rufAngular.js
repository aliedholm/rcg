//defining the module
angular.module('rufAngular', []);

//defining the angular controller
var angCtrl = async function($scope, $http, $q, fetchData){
  var fetchedData = fetchData();
  fetchedData.then(function(data){
    console.log("results from angCTRL               aaaaaaaaaaaaaaaaaaaaaaaaa " + JSON.stringify(data));
    var results = data 
    $scope.data = {
      readings : results.data,
      title : 'this is not a fake title',
      fakeTitle : 'this is a fake title'
    }
  }, function(error){
    console.error(data);
  })

}

//utility function to return a promise of an API call
fetchData = function($q, $http){
  return function(){
    var defer = $q.defer()
    fetchedData = $http({
      method: 'GET',
      url: 'http://132.239.205.188:8080/api/retrieveTable/sensors-table61' 
    }).then(function(data){
        console.log("response from fetch data ===========================" + JSON.stringify(data.data));
        defer.resolve(data.data)
      }, function(err){
        defer.reject(err)
      })
    return defer.promise
  }
}

//further module definition 
angular
  .module('rufAngular')
  .controller('angCtrl', angCtrl)
  .service('fetchData', fetchData)
