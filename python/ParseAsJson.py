
def ParseAsJson(timestamp,arduino_str):
	"""A method for parsing the data read from Arduino

	parameter:
	timestamp (str): The input string format should be 
	"Tanktype Tank# Sensor Value" with the time
	
	return:
	{sensor: { Tank Number:{'Time': timestamp, 'Value': value }}}" 
	tank type 

	value_list = arduino_str.split(' ')
	
	tank_type=value_list[0]
	tank_num=value_list[1]
	sensor=value_list[2]
	try:
		value=float(value_list[3])
	except ValueError:
		value=int(value_list[3])

	result_dict={}
	result_dict[sensor]={}
	result_dict[sensor][tank_num]={ "Time": timestamp, "Value": value}
	
	
	return result_dict,tank_type
	

