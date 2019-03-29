import serial
import sys
import threading
import io
from multiprocessing import Process
import subprocess
import time

d1 = .0015
d2 = .25

def send(commandCode, arduinoNum):
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
  return finalData

  #close the serial port
  ardSerial.close()
  try:
    sys.stdout.flush()
  except:
    pass

#return the list of ports occupied by arduinos on the rpi system
def checkArduinos():
  data = subprocess.check_output("ls /dev/ttyACM*", shell=True)
  return data

#specialized temperature check function
def checkTemp(command, device, sensorNum):
  temp = send(command, device)
  print "T" + sensorNum
  print temp 
  time.sleep(d1)
  return temp


#check the system for arduinos and have them all reports identities  
def getAddresses():
  addresses = checkArduinos().splitlines()
  arduinosRaw = ['0'] * len(addresses)
  for x in range(len(addresses)):
    identity = send("9999", addresses[x])
    time.sleep(d1)
    arduinosRaw[x] = [addresses[x], identity]
  return arduinosRaw    

#setup of the program getting ready for main loop

arduinos = getAddresses()

for x in arduinos:
  print x

#main loop to monitor conditions and adjust system
#while 1:
#  arduino = "/dev/ttyACM11" 
#  checkTemp("1111", arduino, "1")
#  time.sleep(.25)
#  checkTemp("1112", arduino, "2")
#  time.sleep(.25)
#  checkTemp("1113", arduino, "3")
#  time.sleep(.25)
