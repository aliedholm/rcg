//set module name
angular.module('rufAngular')

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
