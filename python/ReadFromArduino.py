import serial

# Write the data read from the Arduino to the file
f=open('sensor_data','w')

ser = serial.Serial('/dev/ttyACM0',9600)

while 1:
	# Keep reading
	if(ser.inWaiting()>0):
		data = ser.readline()	
		f.write(data)
	else:
		f.close()

