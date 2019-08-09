//set module name
angular.module('rufAngular', [])

//dataCtrl controller definition
  .controller('dataCtrl', function(httpService){
    var self = this;
    self.databases = ["sensors", "logs", "digester"]; 
    self.currentSensor = "table61";
    self.currentDatabase = "sensors";

//URLs of respective data or buildling the URL strings
    var sensorsUrl = 'http://132.239.205.188:8080/api/retrieveTables/sensors';

//function to build database URLs
    var builDatabaseUrl = function(database){
      url = "http://132.239.205.188:8080/api/retrieveTables/" + database;
      return url;
    }

//function to build sensor URLs
    var buildSensorUrl = function(database, sensor){
      url = "http://132.239.205.188:8080/api/retrieveTable/" + database + "-" + sensor;
      return url;
    }

//Call for all the sensor names
    httpService.getData(sensorsUrl)
      .then(function(response){
        self.sensors = response;
      })

//Call for the initial data
      .then(function(results){
        self.fetchNew("table61");
      });
   
//function to fetch new data and update the page 
      self.fetchNew = function(sensor){
        url = buildSensorUrl(self.currentDatabase, sensor);
        httpService.getData(url)
          .then(function(response){
            self.currentSensor = sensor;
            self.dataPoints = response;
          });    
      }
      
      self.changeDb = function(database){
        self.currentDatabase = database;
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
