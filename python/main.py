"""The main program for reading from Arduino and send data to database"""

import sys
sys.path.append("~/Github/rcg/python/")

from ReadFromArduino import ReadFromArduino
import PiToDatabase
client,db=PiToDatabase.setup_connection()
ReadFromArduino(db,'/dev/ttyAMA0')

