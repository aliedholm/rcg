def ParseAsUrl(arduino_str):
	""" A method for parsing the data read from Arduino
	
	parameter:
	arduino_str (String) : The reading from Arduino with the format 
	"tank_type Tank# Sensor Value" 

	return:
	An URL representing where to post the data
	The value of the reading
	"""

	value_list = arduino_str.split(' ')
	
	tank_type=value_list[0]
	tank_num=value_list[1]
	sensor=value_list[2]
	try:
		value=float(value_list[3])
	except ValueError:
		value=int(value_list[3])

	url = "http://octopi.ucsd.edu:3000/api/stats/name/"+ tank_type + tank_num+"/stat/"+sensor
	
	return url,value
