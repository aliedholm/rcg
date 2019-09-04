var runPort = "8080";
var apiUrl = "http://132.239.205.188"


//set module name
angular.module('rufAngular')

//dataCtrl controller definition
  .controller('dataCtrl', function(httpService){

    //variable definitions for init
    var self = this;
    self.databases = ["sensors"]; 
    self.currentDatabase = self.databases[0];
    self.datesAvailable = [];

//function to disable navigation buttons for dates that don't exist
    self.checkStops = function(){
      self.oldStop = 0; 
      self.newStop = 0; 
      if(self.currentDate == self.datesAvailable[0]){
        self.newStop = 1;
      }
      if(self.currentDate == self.datesAvailable[(self.datesAvailable).length - 1]){
        self.oldStop = 1;
      }
    }
    
//function to load a new database used when changing databases and also on page load
    self.changeDb = function(database){
      self.currentDatabase = database;
      httpService.getData(buildDatabaseUrl(self.currentDatabase))
        .then(function(sensors){
          self.sensors = sensors;
          self.currentSensor = sensors[0];

          httpService.getData(buildDatesUrl(self.currentDatabase, self.currentSensor))
          .then(function(dates){
            processDates(self, dates);
            self.changeDay(self.currentDate);
          })
        })  
    } 

//function to load a new database used when changing databases and also on page load
    self.changeSensor = function(sensor){
      self.currentSensor = sensor;
      httpService.getData(buildDatesUrl(self.currentDatabase, self.currentSensor))
      .then(function(dates){
        processDates(self, dates);
        self.changeDay(self.currentDate);
      })        
    }
 
//function to move the date back one day
    self.previousDay = function(){
      for(var i = 0; i < self.datesAvailable.length; i++){
        if (self.datesAvailable[i].start == self.currentDate.start){
          self.dateIndex = i;
        }
      }
      var newDateIndex = self.dateIndex + 1;
      self.currentDate = self.datesAvailable[newDateIndex];
      self.changeDay(self.currentDate);
    }

//function to move the date forward one day
    self.nextDay = function(){
      for(var i = 0; i < self.datesAvailable.length; i++){
        if (self.datesAvailable[i].start == self.currentDate.start){
          self.dateIndex = i;
        }
      }
      var newDateIndex = self.dateIndex - 1;
      self.currentDate = self.datesAvailable[newDateIndex];
      self.changeDay(self.currentDate);
    }

//function to fetch a new date and update the page
    self.changeDay = function(date){
      var url = buildSensorDatesUrl(self.currentDatabase, self.currentSensor);
      var params = { "start" : date.start, "end" : date.end };
      self.checkStops();
      httpService.getData(url, params)
        .then(function(response){
          self.stats = response.pop();
          self.dataPoints = response;
        })    
    }
//initialize the page by loading the default db
    self.changeDb(self.currentDatabase);

  })
//end of controller function

//utility functions that don't need to be called from the page

    //function to build database URLs
    var buildDatabaseUrl = function(database){
      url = apiUrl + ":" + runPort + "/api/retrieveTables/" + database;
      return url;
    }

    //function to build sensor URLs
    var buildSensorUrl = function(database, sensor){
      url = apiUrl + ":" + runPort + "/api/retrieveTable/" + database + "-" + sensor;
      return url;
    }

    //function to build sensor URLs
    var buildSensorDatesUrl = function(database, sensor){
      url = apiUrl + ":" + runPort + "/api/retrieveTableDates/" + database + "-" + sensor;
      return url;
    }

    //function to build sensor URLs
    var buildDatesUrl = function(database, sensor){
      url = apiUrl + ":" + runPort + "/api/retrieveDates/" + database + "-" + sensor;
      return url;
    }
    
    //function to return current date
    var getDate = function(date){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      if(date){
        today = moment.utc(date).format(momentFormat);
      }
      else {
        today = moment.utc(today).format(momentFormat);
      }
      var start = moment.utc(date).startOf('day').format(momentFormat);
      var end = moment.utc(date).endOf('day').format(momentFormat);
      day = moment.utc(date).format(momentDate);
      return {
        start : start,
        end : end,
        date : day
      } 
    }

    //function to process the returned dates object and load it into relevant places
    var processDates = function(self, dateArray){
      self.datesAvailable = [];
      self.oldest = moment.utc(dateArray[dateArray.length - 1]).startOf('day').format(momentFormat);
      self.newest = moment.utc(dateArray[0]).endOf('day').format(momentFormat);
      for(var i = 0; i < dateArray.length; i++){
        self.datesAvailable[i] = getDate(moment.utc(dateArray[i]).format(momentFormat)); 
      }
      self.currentDate = self.datesAvailable[0];
    }


    //variable to set the format of the general dates for the page
    var momentFormat = "YYYY-MM-DD HH:mm:ss";
    var momentDate = "YYYY-MM-DD";
