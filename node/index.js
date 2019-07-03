//fileName: index.js
//import body parser
var bodyParser = require('body-parser');

//import express
var express = require('express');

var routes = require('./routes/index.js');

//initialize the app
var app = express();

//use API routes in the app
app.use('/api', routes);

//configure body parser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//setup server port
var port = process.env.PORT || 8080;

//send message for default URL
app.get('/', (req, res) => res.send("Hello World from Express"));

//launch app to listen on specified port
app.listen(port, function(){
  console.log("running apiTest on port " + port);
});
