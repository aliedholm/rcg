var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://localhost/rcgaqua';
var promise = mongoose.connect(dbURI, {
  useMongoClient: true
});

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to: ' + dbURI);
}); 

mongoose.connection.on('error', function() {
  console.log('Mongoose connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
}); 

var gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through: ' + msg);
    callback();
  });
};

process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
require('./data');
