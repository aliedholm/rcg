import serial
import sys
import time, threading

arduinoNum = sys.argv[1];
commandCode = sys.argv[2];

ardSerial = serial.Serial('/dev/ttyACM' + arduinoNum, 9600)

ardSerial.write("<" + commandCode + ">");

time.sleep(1.5)

while ardSerial.inWaiting():
     myData = ardSerial.readline()
     print myData
