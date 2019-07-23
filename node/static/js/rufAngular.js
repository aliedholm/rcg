angular.module('rufAngular', []);
//defining the angular controller
var angCtrl = async function($scope, fetchData){
  var results;
  var fetchedData = fetchData();
  fetchedData.then(function(data){
    var results = data;
    $scope.data = {
      readings : data.data,
      title : 'this is not a fake title',
      fakeTitle : 'this is a fake title'
    }
    console.log('angCtrl data return =============================' + ($scope.data.readings));
    console.log('angCtrl data return stringify  =============================' + JSON.stringify($scope.data));
  }, function(error){
    console.error(data);
  })

}

function fetchData($http, $q){
  return function(){
    var defer = $q.defer()
    fetchedData = $http({
      method: 'GET',
      url: 'http://132.239.205.188:8080/api/retrieveTableDates/sensors-table61?start=2020-12-11&days=2'
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
  .service('fetchData', fetchData);
