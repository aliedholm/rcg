var mysql = require('mysql');

//function to send a reading to the databases
postReading = function(req, res, datetime, reading, table) {

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'rcg',
  password: '8693ViaMallorca',
  database: 'sensors'
});

  connection.connect(function(err) {
    if(err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadID);
  });

  connection.query('CREATE TABLE IF NOT EXISTS ' + table + ' (id INT AUTO_INCREMENT NOT NULL, reading VARCHAR(10) NOT NULL, datetime DATETIME NOT NULL, PRIMARY KEY(ID)) ENGINE=INNODB;', function(error, results, fields) {
    if(error) {
      console.error('error creating or finding table');
      return;
    }
    console.log('table: ' + table + ' created successfully or already existed');
  });

  connection.query('INSERT INTO ' + table + ' (datetime, reading) VALUES("' + datetime + '", "' + reading + '");', function(error, results, fields) {
    if(error) {
      console.error('error inserting record: ' + error);
      return;
    }
    console.log('reading record inserted successfully' + results + ' fields: ' + fields);
  });

  connection.end(function(err) {
    if(err) {
      console.error('error terminating connection');
      return;
    }
    console.log('connection successfully terminated');
  });
}


//function to send a log to the database
postLog = function(req, res, datetime, type, message, table) {

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'rcg',
  password: '8693ViaMallorca',
  database: 'logs'
});

  connection.connect(function(err) {
    if(err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadID);
  });

  connection.query('CREATE TABLE IF NOT EXISTS ' + table + ' (id INT AUTO_INCREMENT NOT NULL, datetime DATETIME NOT NULL, type VARCHAR(10) NOT NULL, message VARCHAR(30) NOT NULL, PRIMARY KEY(ID)) ENGINE=INNODB;', function(error, results, fields) {
    if(error) {
      console.error('error creating or finding table');
      return;
    }
    console.log('table: ' + table + ' created successfully or already existed');
  });

  connection.query('INSERT INTO ' + table + ' (datetime, type, message) VALUES("' + datetime + '", "' + type + '", "' + message + '");', function(error, results, fields) {
    if(error) {
      console.error('error inserting record: ' + error);
      return;
    }
    console.log('reading record inserted successfully' + results + ' fields: ' + fields);
  });

  connection.end(function(err) {
    if(err) {
      console.error('error terminating connection');
      return;
    }
    console.log('connection successfully terminated');
  });
}

module.exports = postReading, postLog;
