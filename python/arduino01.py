import serial
import sys

arduinoSerialData = serial.Serial('/dev/tty' + sys.argv[1], 9600)
while 1:
   if(arduinoSerialData.inWaiting()>0):
      myData = arduinoSerialData.readline()
      print myData
