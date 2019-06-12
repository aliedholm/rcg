import serial
import sys
import time, threading
import io

arduinoNum = sys.argv[1];
commandCode = sys.argv[2];

def establishSerial(arduinoNum):
  ardSerial = serial.Serial(arduinoNum, 9600)
  return ardSerial

ardSerial = establishSerial(arduinoNum)

ardSerial = establishSerial(arduinoNum)
#write the actual command code the arduino is to execute
ardSerial.write('<' + commandCode + '>')
time.sleep(.05)

ardDataBuffer = []
endOfData = 0
endOfDataChar = '$' 
errorChar = '@'
dataReturn = ''

def stringArray(array):
  string = ''
  for x in array:
    string += x
  return string
  
while endOfData == 0:
  myData = ardSerial.read()
  ardDataBuffer += myData
  if endOfDataChar in myData:
    dataReturn = stringArray(ardDataBuffer)
    endOfData = 1
   
  if errorChar in myData:
    dataReturn = 'error: ' + stringArray(ardDataBuffer)
    endOfData = 1

#remove the $ character from the results
finalData = dataReturn[:-1]

#return the data to the python-master program
print finalData

#close the serial port
ardSerial.close()
try:
  sys.stdout.flush()
except:
  pass
