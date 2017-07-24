# A method for parsing the data read from Arduino
# The input string format should be "Tanktype Tank# Sensor Value"
# The output dictionary format should be "{'Tank Type': Tanktype, 'Tank Number'
: Tank#, 'Sensor': Sensor, 'Value': value }"

def ParseAsJson(arduino_str):

	value_list = arduino_str.split(' ')
	
	tank_type=value_list[0]
	tank_num=int(value_list[1])
	sensor=value_list[2]
	try:
		value=float(value_list[3])
	except ValueError:
		value=int(value_list[3])

	result_dict={"Tank Type": tank_type, "Tank Number": tank_num, "Sensor": sensor, "Value": value}
	
	
	return result_dict
	

