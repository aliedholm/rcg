import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode
import serial
import sys
import threading
import io
from multiprocessing import Process
import subprocess
import time
import datetime

d1 = .0015
d2 = .25

def establishSerial(arduinoNum):
  ardSerial = serial.Serial(arduinoNum, 9600)
  return ardSerial

def stringArray(array):
  string = ''
  for x in array:
    string += x
  return string

def send(commandCode, arduinoNum):
  ardDataBuffer = []
  endOfData = 0
  endOfDataChar = '$'
  errorChar = '@'
  dataReturn = ''

  ardSerial = establishSerial(arduinoNum)

  #write the actual command code the arduino is to execute
  while endOfData == 0:
    myData = []
    while ardSerial.in_waiting == 0:
      time.sleep(1)
      ardSerial.write('<' + commandCode + '>')
      print "command code sent"
      time.sleep(2)
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

  #close the serial port
  ardSerial.close()
  try:
    sys.stdout.flush()
  except:
    pass
  
  #return the data to the python-master program
  return finalData

#return the list of ports occupied by arduinos on the rpi system
def checkArduinos():
  data = subprocess.check_output("ls /dev/ttyACM*", shell=True)
  return data

#function to check if variable is a number or letters
#def numberCheck(variable):
  
#specialized temperature check function
def checkTemp(command, arduino, sensorNum):
  temp = send(command, arduino)
  print sensorNum
  print temp 
  time.sleep(d1)
  timestamp = getTime()
  print timestamp
  dbLocal(sensorNum, timestamp, temp)
  return temp

#check the system for arduinos and have them all reports identities  
def getAddresses():
  addresses = checkArduinos().splitlines()
  arduinosRaw = ['0'] * len(addresses)
  for x in range(len(addresses)):
    identity = send("9999", addresses[x])
    arduinosRaw[x] = [addresses[x], identity]
  return arduinosRaw    

#function to get current time
def getTime():
  ts = time.time()
  timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S') 
  return timestamp

#function to create table if it does not exist
def createTableLocal(table):
  try: 
    connection = mysql.connector.connect(host='localhost', database='sensors', user='root', password='8693ViaMallorca')
    sql_insert_query = "CREATE TABLE IF NOT EXISTS " + table + " (id INT AUTO_INCREMENT NOT NULL, reading VARCHAR(8) NOT NULL, datetime DATETIME NOT NULL, PRIMARY KEY (id)) ENGINE=INNODB;"
    print sql_insert_query
    cursor = connection.cursor()
    result = cursor.execute(sql_insert_query)
    connection.commit()
    print "table creation or was already successful"
  except:
    print "failed table creation"

#function to insert data to local database
def dbLocal(table, datetime, reading):
  createTableLocal(table)
  try: 
    connection = mysql.connector.connect(host='localhost', database='sensors', user='root', password='8693ViaMallorca')
    sql_insert_query = "INSERT INTO " + table + " (datetime, reading) VALUES('" + datetime + "', '" + reading + "');"
    print sql_insert_query
    cursor = connection.cursor()
    result = cursor.execute(sql_insert_query)
    connection.commit()
    print "db record sent"
  except:
    print "failed db record insert"

#setup of the program getting ready for main loop

arduinos = getAddresses()

print "main print statement"
for x in arduinos:
  print x

#main loop to monitor conditions and adjust system
while 1:
  checkTemp("1111", "/dev/ttyACM2", "tSoil")
  time.sleep(.25)
