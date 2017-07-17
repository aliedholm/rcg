import serial
import json
with open('sensor_data.txt','w') as f:
	json.dump(json_object,f)
 
ser = serial.Serial('/dev/ttyACM0',9600)

# A dictionary to store the data
data={}

while 1:
	# Keep reading
	if(ser.inWaiting()>0):
		ser.readline()	
		ParseAsJson()

		
json_object json.load(data_dictionary)
