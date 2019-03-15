import serial
import sys
import time, threading
import io

arduinoNum = sys.argv[1];
commandCode = sys.argv[2];

ardSerial = serial.Serial(arduinoNum, 9600)

#write the actual command code the arduino is to execute
ardSerial.write('<' + commandCode + '>')
time.sleep(.05)

ardDataBuffer = []
endOfData = 0
endOfDataChar = '$' 
errorChar = '@'

dataReturn = ''

while endOfData == 0:
  def stringArray(array):
    string = ''
    for x in array:
      string += x
    return string
  
  myData = ardSerial.read()
  ardDataBuffer += myData
  
  if endOfDataChar in myData:
    dataReturn = stringArray(ardDataBuffer)
    endOfData = 1
   
  if errorChar in myData:
    dataReturn = 'error: ' + stringArray(ardDataBuffer)
    endOfData = 1

print dataReturn
