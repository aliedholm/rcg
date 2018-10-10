import subprocess
import time

d1 = .015
d2 = .25

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

while 1: 
  temp1 = checkTemp("1001", "0", "1")
  if (float(temp1) > 85.00):
      relaySwitch("2011", "0", "1", "on")  
  if (float(temp1) < 85.00):
      relaySwitch("2010", "0", "1", "off")  
  
  temp2 = checkTemp("1002", "0", "2")
  if (float(temp2) > 85.00):
      relaySwitch("2021", "0", "2", "on")  
  if (float(temp2) < 85.00):
      relaySwitch("2020", "0", "2", "off")  
  
  temp3 = checkTemp("1003", "0", "3")
  if (float(temp3) > 85.00):
      relaySwitch("2031", "0", "3", "on")  
  if (float(temp3) < 85.00):
      relaySwitch("2030", "0", "3", "off")  
  
  temp4 = checkTemp("1004", "0", "4")
  if (float(temp4) > 85.00):
      relaySwitch("2041", "0", "4", "on")  
  if (float(temp4) < 85.00):
      relaySwitch("2040", "0", "4", "off")  
