import serial
import json

import sys
sys.path.append("~/Github/rcg/python/")
from ParseAsJson import ParseAsJson

def ReadFromArduino(port):
	client
	ser = serial.Serial(port,9600)

	# A dictionary to store the data
	data=[]
	count = 0
	while(count>0)
	while (count<10):
		# Keep reading
		if(ser.inWaiting()>0):
			reading = ser.readline()	
			result_dict=ParseAsJson(reading)
			data.append(result_dict)
	
		
	
