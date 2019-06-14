import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode
import serial
import sys
import io
import subprocess
import time
import datetime

d1 = .0015
d2 = .25

class sensor(object):
  def __init__(self, uniName, command, address, units):
    self.uniName = uniName
    self.command = command
    self.address = address
    self.units = units

  def getData(self, command, arduino, sensorNum):
    temp = send(command, arduino)
    print sensorNum
    print temp 
    time.sleep(d1)
    timestamp = getTime()
    print timestamp
    dbLocal(sensorNum, timestamp, temp)
    return temp

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
  def localDB(table, datetime, reading):
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

