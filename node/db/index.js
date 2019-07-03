var mysql = require('mysql');

postReading = function() {

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'rcg',
  password: '8693ViaMallorca',
  database: 'sensors'
});

var table = 'airTemp';
var reading = '12.6';
var datetime = new Date();
var datetime = datetime.getUTCFullYear() + '-' +
  ('00' + (datetime.getUTCMonth()+1)).slice(-2) + '-' +
  ('00' + datetime.getUTCDate()).slice(-2) + ' ' + 
  ('00' + datetime.getUTCHours()).slice(-2) + ':' + 
  ('00' + datetime.getUTCMinutes()).slice(-2) + ':' + 
  ('00' + datetime.getUTCSeconds()).slice(-2);

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

module.exports = postReading;
