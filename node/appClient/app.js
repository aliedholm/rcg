//defining the module
angular.module('rufAngular', ['ngRoute']);

function config ($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html',
      controller: 'angCtrl'
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'})
}

//further module definition 
angular
  .module('rufAngular')
  .config(['$routeProvider', config]);
