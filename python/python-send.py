import serial
import sys
import time, threading
import io

arduinoNum = sys.argv[1];
commandCode = sys.argv[2];

ardSerial = serial.Serial(arduinoNum, 9600, timeout=1)

ardSerial.write("<" + commandCode + ">");
print "sent " + commandCode + " to " + arduinoNum
time.sleep(.5)

ardDataBuffer = []
endOfData = 0
endOfDataChar = '$' 

while endOfData == 0:
  myData = ardSerial.read()
  print myData
  ardDataBuffer += myData
  if endOfDataChar in myData:
    endOfData = 1
    print ardDataBuffer


