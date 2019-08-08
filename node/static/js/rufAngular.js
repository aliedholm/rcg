//set module name
angular.module('rufAngular', [])

//dataCtrl controller definition
  .controller('dataCtrl', function(httpService){
    var self = this;
    self.title = 'This is the title ';
    self.fakeTitle = 'This is not the title ';

//URLs of respective data or buildling the URL strings
    var sensorsUrl = 'http://132.239.205.188:8080/api/retrieveTables/sensors';
    var table61Url = 'http://132.239.205.188:8080/api/retrieveTable/sensors-table61';
    var temp1Url = 'http://132.239.205.188:8080/api/retrieveTable/sensors-temp1';

//Call for all the sensor names
    httpService.getData(sensorsUrl)
      .then(function(response){
        self.sensors = response;
      })

//Call for the initial data
      .then(function(results){
        httpService.getData(temp1Url)
          .then(function(response){
            self.dataPoints = response;
          });    
      });
      
      self.fetchNew = function(url){
        httpService.getData(temp1Url)
          .then(function(response){
            self.dataPoints = response;
          });    
      }
  })

//API data call service  
  .service('httpService', function($http){
    return {
      getData: function(url){
        return $http.get(url)
          .then(function(response){
          console.log("This is the response: " + JSON.stringify(response.data));
          return response.data;
          });
      }
    };
  });
