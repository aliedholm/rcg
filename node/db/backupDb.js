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

//running the query statement
for(i=0; i < query.length; i++){ 
  connection.query(query[i], function(error, results, fields){
    if(error){
      console.error('error retrieving the query');
      console.log(query[i]);
      return;
    }
    else{
      console.log('this is the query that was run ' + query[i]);
      console.log('successfully executed query and these are the results' + results);
    };
    if(req.method == 'GET'){
      res.send(results);
    }
    if(req.method == "POST"){
      res.send("executed query");
    }
  });
}
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
