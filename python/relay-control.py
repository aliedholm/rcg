import serial
import sys

options = sys.argv[1]
arduinoNum = options[0:1]
device = options[1:3]
toggle = options[3:4]
command = options [1:4]

ardSerial = serial.Serial('/dev/ttyACM' + arduinoNum, 9600)

ardSerial.write(command)
