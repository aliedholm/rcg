"""The main program for reading from Arduino and send data to database"""

import sys
sys.path.append("~/Github/rcg/python/")

from ReadFromArduino import ReadFromArduino
ReadFromArduino('/dev/ttyACM0')

