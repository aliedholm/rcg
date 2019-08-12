//set module name
angular.module('rufAngular', [])

//dataCtrl controller definition
  .controller('dataCtrl', function(httpService){
  //variable definitions for init
    var self = this;
    self.databases = ["sensors", "logs", "digester"]; 
    self.currentDatabase = self.databases[0];
    self.startDate = "2000-01-01";
    self.endDate = "3000-01-01";
    self.dateOldest = "2000-01-01";
    self.dateNewest = "3000-01-01";
    
//function to load a new database used when changing databases and also on page load
    self.changeDb = function(database){
      self.currentDatabase = database;
      httpService.getData(buildDatabaseUrl(self.currentDatabase))
        .then(function(sensors){
          self.sensors = sensors;
          self.currentSensor = sensors[0];
          httpService.getData(buildDatesUrl(self.currentDatabase, self.currentSensor))
          .then(function(dates){
            self.datesAvailable = dates;
            self.oldest = dayjs(dates[dates.length - 1]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
            self.newest = dayjs(dates[0]).add(8, 'hour').endOf('day').format('YYYY-MM-DD HH:mm:ss');
            self.dataStart = dayjs(dates[dates.length -1]).startOf('day').format('YYYY-MM-DD');
            self.dataEnd = dayjs(dates[0]).add(8, 'hour').endOf('day').format('YYYY-MM-DD');
            var url = buildSensorDatesUrl(self.currentDatabase, self.currentSensor);
            var params = { "start" : self.oldest, "end" : self.newest };
            httpService.getData(url, params)
              .then(function(data){
                self.dataPoints = data;
              })
          })
        })  
    } 

//function to load a new database used when changing databases and also on page load
    self.changeSensor = function(sensor){
      self.currentSensor = sensor;
      httpService.getData(buildDatesUrl(self.currentDatabase, self.currentSensor))
      .then(function(dates){
        self.datesAvailable = dates;
        self.newest = dates[0];
        self.oldest = dates[dates.length - 1]; 
        var url = buildSensorDatesUrl(self.currentDatabase, self.currentSensor);
        var params = { "start" : self.oldest, "end" : self.newest };
        httpService.getData(url, params)
          .then(function(data){
            self.dataPoints = data;
          })
      })        
    }
 
//data fetching functions to assist in grabbing data 
  //function to fetch new list of tables from DB and update the page
    self.fetchTables = function(database){
      url = buildDatabaseUrl(database);
      httpService.getData(url)
        .then(function(response){
          self.sensors = response;
        });
    }

  //function to fetch new data from a sensor table by date and update the page 
    self.fetchNewSensorDates = function(start, end){
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
          self.oldest = dayjs(dates[dates.length - 1]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
          self.newest = dayjs(dates[0]).add(8, 'hour').endOf('day').format('YYYY-MM-DD HH:mm:ss');
        });
    }
//initialize the page by loading the default db
    self.changeDb(self.currentDatabase);


//end of controller function
  })


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
         // console.log("This is the response: " + JSON.stringify(response.data));
         // console.log("This was the URL Sent: " + url + " These were the params: " + JSON.stringify(params)); 
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
