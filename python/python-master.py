import subprocess
import time

d1 = .0015
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

#check the system for arduinos and have them all reports identities  
addresses = checkArduinos().splitlines()

arduinos = [0] * 10 

for x in range(len(addresses)):
  identity = writeCommand("9999", addresses[x])
  time.sleep(d1)
  arduinos[x] = [addresses[x], identity]

for x in arduinos:
  if x != 0:
    print x

#test function to request some temperature values from arduino

while 1: 
  checkTemp("1111", "/dev/ttyACM5", "1")
  time.sleep(.25)
  checkTemp("1112", "/dev/ttyACM5", "2")
  time.sleep(.25)
  checkTemp("1113", "/dev/ttyACM5", "3")
  time.sleep(.25)
