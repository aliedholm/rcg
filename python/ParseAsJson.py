# A method for parsing the data read from Arduino
# The input string format should be "Tanktype Tank# Sensor Value" with the time
# The output dictionary format should be "{sensor: { Tank Number:{'Time': time
# stamp, 'Value': value }}}" And also return the tank type searately

def ParseAsJson(timestamp,arduino_str):

	value_list = arduino_str.split(' ')
	
	tank_type=value_list[0]
	tank_num=int(value_list[1])
	sensor=value_list[2]
	try:
		value=float(value_list[3])
	except ValueError:
		value=int(value_list[3])

	result_dict={}
	result_dict[sensor]={}
	result_dict[sensor][str(tank_num)]={ "Time": timestamp, "Value": value}
	
	
	return result_dict,tank_type
	

