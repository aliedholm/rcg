const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyUSB1', { baudRate: 9600 });

const parser = new Readline()
port.pipe(parser)

parser.on('data', line => console.log('> ${line}'))
