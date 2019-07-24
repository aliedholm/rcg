var mysql = require('mysql');

//run an array of queries 
connectDb = async function(query, database){
  resultArray = [];
  const connection = await dbConnect(database);
  
  for(let i=0; i < query.length; i++){
    const result = await buildQuery(connection, query[i]);
    console.log(result);
    resultArray.push(result);
  }
  dbDisconnect(connection);
  return resultArray;
};

//helper functions

//opening the db connection
function dbConnect(database){
  return new Promise(function(resolve, reject){
    var connection = mysql.createConnection({
      host : 'localhost',
      user : 'rcg',
      password: '8693ViaMallorca',
      database: database
    });

    connection.connect(function(err) {
      if(err) {
        console.error('error connecting: ' + err.stack);
        reject(err);
      }
      else{
        console.log('connected as id ' + connection.threadID);
        resolve(connection);
      }
    });
  });
}
    
//building the query promise function
function buildQuery(connection, query){
  return new Promise(function(resolve, reject){
    connection.query(query, function(error, results, fields){
      if(error){
        console.error('error retrieving the query');
        console.log(query);
        reject(error);
      }
      else{
        resolve(results);
      };
    });
  });
}

//closing the connection to the database
function dbDisconnect(connection){
  connection.end(function(err) {
    if(err) {
      console.error('error terminating connection');
      return(error);
    }
    else{
      return(console.log('connection successfully terminated'));
    }
  });
}

module.exports = connectDb;
