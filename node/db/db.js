var mysql = require('mysql');

//generalized utility db functions
//function to open a db connection

//opening the connection to the database
connectDb = function(req, res, query, database){  

  var connection = mysql.createConnection({
    host : 'localhost',
    user : 'rcg',
    password: '8693ViaMallorca',
    database: database
  });

  connection.connect(function(err) {
    if(err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadID);
  });

//runnin the query statement
  connection.query(query, function(error, results, fields){
    if(error){
      console.error('error retrieving the query');
      console.log(query);
      return;
    }
    else{
      console.log('this is the query that was run ' + query);
      console.log('successfully executed query and these are the results' + results);
      res.send(results);
    };
  });

//closing the connection to the database
  connection.end(function(err) {
    if(err) {
      console.error('error terminating connection');
      return;
    }
    console.log('connection successfully terminated');
  });
};

module.exports = connectDb;
