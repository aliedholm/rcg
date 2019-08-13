//set module name
angular.module('rufAngular', [])

//dataCtrl controller definition
  .controller('dataCtrl', function(httpService){

    //variable definitions for init
    var self = this;
    self.databases = ["sensors", "logs", "digester"]; 
    self.currentDatabase = self.databases[0];
    self.datesAvailable = [];
     
    self.currentDate = getCurrentDate();

//function to load a new database used when changing databases and also on page load
    self.changeDb = function(database){
      self.currentDatabase = database;
      httpService.getData(buildDatabaseUrl(self.currentDatabase))
        .then(function(sensors){
          self.sensors = sensors;
          self.currentSensor = sensors[0];
          httpService.getData(buildDatesUrl(self.currentDatabase, self.currentSensor))
          .then(function(dates){
            self.oldest = moment.utc(dates[dates.length - 1]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
            self.newest = moment.utc(dates[0]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
            for(var i = 0; i < dates.length; i++){
              self.datesAvailable[i] = (moment.utc(dates[i]).format('YYYY-MM-DD HH:mm:ss')); 
            }
            self.dataStart = self.currentDate.start;
            self.dataEnd = self.currentDate.end;
            var url = buildSensorDatesUrl(self.currentDatabase, self.currentSensor);
            var params = { "start" : self.currentDate.start, "end" : self.currentDate.end };
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
 
    //function to move the date back one day
    self.previousDay = function(){
      var dateIndex = self.datesAvailable.indexOf(self.currentDate.start);
      var newDateIndex = dateIndex + 1;
      var newDate = self.datesAvailable[newDateIndex];
      newDate = dateStartEnd(newDate);
      self.currentDate = newDate;
      self.changeDay(newDate);
    }

    //function to move the date forward one day
    self.nextDay = function(){
      var dateIndex = self.datesAvailable.indexOf(self.currentDate.start);
      var newDateIndex = dateIndex - 1;
      var newDate = self.datesAvailable[newDateIndex];
      newDate = dateStartEnd(newDate);
      self.currentDate = newDate;
      self.changeDay(newDate);
    }

  //function to fetch a new date and update the page
    self.changeDay = function(date){
      var url = buildSensorDatesUrl(self.currentDatabase, self.currentSensor);
      var params = { "start" : date.start, "end" : date.end };
      httpService.getData(url, params)
        .then(function(response){
          self.dataPoints = response;
        })    
    }
//initialize the page by loading the default db
    self.changeDb(self.currentDatabase);

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
          //console.log("This is the response: " + JSON.stringify(response.data));
          //console.log("This was the URL Sent: " + url + " These were the params: " + JSON.stringify(params)); 
          return response.data;
          });
      }
    };
  });
 

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
    
    //function to return current date
    var getCurrentDate = function(){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      today = moment.utc(today);
      return dateStartEnd(today)
    }

    //function to get the start and end of a day
    var dateStartEnd = function(date){
      var start = moment(date).startOf('day').format("YYYY-MM-DD HH:mm:ss");
      var end = moment(date).endOf('day').format("YYYY-MM-DD HH:mm:ss");
      return {
        start : start,
        end : end,
        date : date
      } 
    }
