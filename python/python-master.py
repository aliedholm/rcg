import subprocess
import time

d1 = .015
d2 = .25


def checkArduinos():
  data = subprocess.check_output("ls /dev/ttyACM*", shell=True)
  time.sleep(d1)
  return data

def writeCommand(command, device):
  data = subprocess.check_output(["python", "/home/rcg/rcg/python/python-send.py", device, command])
  time.sleep(d1)
  return data

def checkTemp(command, device, sensorNum):
  temp = writeCommand(command, device)
  print "T" + sensorNum
  print temp 
  time.sleep(d1)
  return temp

def relaySwitch(command, device, relayNum, state):
  writeCommand(command, device)
  print "Relay" + " " + relayNum + " " + state
  time.sleep(d1)

arduinos = checkArduinos().splitlines()
print arduinos

for x in arduinos:
  identity = writeCommand("9999", x)
  time.sleep(d2)
  print identity 
