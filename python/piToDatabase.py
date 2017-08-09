import pymongo
import serial
from pymongo import MongoClient

client = MongoClient()

db = client.test_database

ser = serial.Serial('/dev/ttyACM0',9600)
while 1:
	if(ser.inWaiting()>0):
		data = ser.readline()	
		print data
