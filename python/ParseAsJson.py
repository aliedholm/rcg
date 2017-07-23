# A method for parsing the data read from Arduino
# The format should be "Tank# Sensor Value"
# The output dictionary format should be "{ "Tank#": { "Sensor": Value } }"

def ParseAsJson(arduino_str):

	result_dict = {}
	value_list = arduino_str.split(' ')
	
	tank=value_list[0]
	sensor=value_list[1]
	value=value_list[2]

	result_dict[tank] = {}
	
	try:
		result_dict[tank][sensor]=float(value)
	except ValueError:
		result_dict[tank][sensor]=int(value)
	
	return result_dict
	

