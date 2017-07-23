import serial
import json

import sys
sys.path.append("~/Github/rcg/python/")
from ParseAsJson import ParseAsJson

 
ser = serial.Serial('/dev/ttyACM0',9600)

# A dictionary to store the data
data={}

while 1:
	# Keep reading
	if(ser.inWaiting()>0):
		reading = ser.readline()	
		result_dict=ParseAsJson(reading)

		
json_object json.load(data_dictionary)
