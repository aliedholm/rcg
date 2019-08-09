//set module name
angular.module('rufAngular', [])

//dataCtrl controller definition
  .controller('dataCtrl', function(httpService){
  //variable definitions for init
    var self = this;
    self.databases = ["sensors", "logs", "digester"]; 
    self.currentSensor = "table31";
    self.currentDatabase = self.databases[0];
    self.startDate = getCurrentDate(-1);
    self.endDate = getCurrentDate;

//initial page setup calls on load
  //Call for all the sensor names
    httpService.getData(buildDatabaseUrl(self.currentDatabase))
      .then(function(response){
        self.sensors = response;
      })
  //Call for the initial dates
      .then(function(results){
        self.fetchNewSensor(self.currentSensor);
      })
  //Call for the initial data
      .then(function(results){
        self.fetchNewDates(self.dateOldest, self.dateNewest);
      })

//data fetching functions to assist in grabbing data 
  //function to fetch new list of tables from DB and update the page
      self.fetchTables = function(database){
        url = buildDatabaseUrl(database);
        httpService.getData(url)
          .then(function(response){
            self.sensors = response;
          });
      }

  //function to fetch new data from a sensor table and update the page 
      self.fetchNewSensor = function(sensor){
        self.currentSensor = sensor;
        url = buildSensorUrl(self.currentDatabase, self.currentSensor);
        httpService.getData(url)
          .then(function(response){
            self.dataPoints = response;
          })
          .then(function(dates){
            self.fetchDistinctDates(self.currentSensor);
          });
      }

  //function to fetch new data from a sensor table by date and update the page 
      self.fetchNewDates = function(start, end){
        self.dataStart = start;
        self.dataEnd = end;
        var url = buildSensorDatesUrl(self.currentDatabase, self.currentSensor);
        var params = { "start" : start, "end" : end };
        httpService.getData(url, params)
          .then(function(response){
            self.dataPoints = response;
          })    
      }

  //function to fetch the list of dates avaialable by sensor
      self.fetchDistinctDates = function(sensor){
        url = buildDatesUrl(self.currentDatabase, sensor);
        httpService.getData(url)
          .then(function(response){
            self.datesAvailable = response;
            self.dateNewest = response[0];
            self.dateOldest = response[response.length - 1];
          });
      }

  })
//end of controller function

//API data call service  
  .service('httpService', function($http){
    return {
      getData: function(url, params){
        getReq = {
          url : url,
          method : "GET",
          params : params
        }
        return $http(getReq)
          .then(function(response){
          console.log("This is the response: " + JSON.stringify(response.data));
          return response.data;
          });
      }
    };
  });
 


//outside controller definition
  //utility functions
    //function to build database URLs
    var buildDatabaseUrl = function(database){
      url = "http://132.239.205.188:8080/api/retrieveTables/" + database;
      return url;
    }

    //function to build sensor URLs
    var buildSensorUrl = function(database, sensor){
      url = "http://132.239.205.188:8080/api/retrieveTable/" + database + "-" + sensor;
      return url;
    }

    //function to build sensor URLs
    var buildSensorDatesUrl = function(database, sensor){
      url = "http://132.239.205.188:8080/api/retrieveTableDates/" + database + "-" + sensor;
      return url;
    }

    //function to build sensor URLs
    var buildDatesUrl = function(database, sensor){
      url = "http://132.239.205.188:8080/api/retrieveDates/" + database + "-" + sensor;
      return url;
    }

    //function to get todays date
    var getCurrentDate = function(days){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      if(days){
        dd = dd + days;
      }
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '-' + dd + '-' + yyyy;
      return today;
    }
