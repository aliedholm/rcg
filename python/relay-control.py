import serial
import sys
toggle = sys.argv[2]
ardSer = serial.Serial("/dev/tty" + sys.argv[1], 9600)
ardSer.write(toggle)
