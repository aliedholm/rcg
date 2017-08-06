import serial
from ParseAsUrl import ParseAsUrl
import requests

def ReadFromArduino(port):
	""" Keep reading from one Arduino, parse the read and send data to 
	database
	
	Parameter:
	port(str): The port where Arduino is connected to the pi
	"""

	ser = serial.Serial(port,9600)
	
	while True:
		#Handle exception by throwing bad data and keep looping
		try:	
			# Keep reading
			if(ser.inWaiting()>0):
				reading = ser.readline()
				url, value=ParseAsUrl(reading)
				
				# Post the value to the url
				requests.post(url, data = {'reading':value})
		except (ValueError,IndexError):
			continue
			
	
		
	
