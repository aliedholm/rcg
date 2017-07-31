import serial
import json
""" Keep reading from one Arduino, parse the read and send data to database
Args:
	db(mongodb database): The database we use for all data
	port(str): The port where Arduino is connected to the pi
"""
import sys
sys.path.append("~/Github/rcg/python/")

from ParseAsJson import ParseAsJson
from datetime import datetime

def ReadFromArduino(db,port):

	ser = serial.Serial(port,9600)
	
	while True:
		# Keep reading
		if(ser.inWaiting()>0):
			reading = ser.readline()
			timestamp = str(datetime.now())	
			
			result_dict,tank_type=ParseAsJson(timestamp,reading)
			db[tank_type].insert_one(result_dict)

			
	
		
	
