import serial
import sys
import time, threading

arduinoNum = "0"

ardSerial = serial.Serial('/dev/ttyACM0', 9600)

def foo():
	ardSerial.write("1")
	time.sleep(1)
	ardSerial.write("2")
	time.sleep(1)
	ardSerial.write("3")
	time.sleep(3)
	ardSerial.write("4")
	time.sleep(3)
	ardSerial.write("5")
	time.sleep(3)
	threading.Timer(3, foo).start()

foo()

