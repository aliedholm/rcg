var mongoose = require( 'mongoose' );

//individual reading schema

var readingSchema = new mongoose.Schema({
  timestamp: {type: Date, required: true},
  reading: {type: Number, required: true}
});

//schema for tank 

var tankSchema = new mongoose.Schema({
  tankName: {type: String, required: true},
  tankType: {type: String, required: true},
  tankNumber: {type: Number, required: true},
  phData: [readingSchema],
  doData: [readingSchema],
  ecData: [readingSchema],
  wtempData: [readingSchema],
  wlvlData: [readingSchema]
});

mongoose.model('tank', tankSchema, 'tanks');
