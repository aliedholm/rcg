var mongoose = require( 'mongoose' );

//schema for logs 

var logsSchema = new mongoose.Schema({
  logType: {type: String, required: true},
  logTime: {type: Date, required: true},
  logBody: {type: String, required: true}
});

mongoose.model('log', logsSchema, 'logs');
