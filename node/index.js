//fileName: index.js
//import body parser
var bodyParser = require('body-parser');
//import process
var process = require('process');
//import express
var express = require('express');
//import api and page routes
var apiRoutes = require('./routes/apiRoutes.js');
var pageRoutes = require('./routes/pageRoutes.js');

//initialize the app
var app = express();

//use API routes in the app
app.use('/api', apiRoutes);

//use the page routes in the app
app.use('/', pageRoutes);

//set server to use jade templates
app.set('view engine', 'pug');

//configure body parser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//configure app to serve static files
app.use(express.static('static'));
app.use(express.static('appClient'));

//setup server port
var port = process.env.PORT || 8080;

//launch app to listen on specified port
app.listen(port, function(){
  console.log("RUF running on: " + port);
});

//Graceful exit hooks
process.on('SIGINT', handle);
process.on('SIGTERM', handle);
process.on('exit', handle);
process.on('SIGQUIT', handle);
process.on('SIGHUP', handle);

//Graceful exit handler
function handle(signal){
  console.log("Received " + signal);
  app.close();
  process.exit();
}
