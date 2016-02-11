import subprocess
import time

def writeCommand(command, device):
  data = subprocess.check_output(["python", "/home/rcg/rcg/python/python-send.py", device, command])
  time.sleep(.75)
  return data

while 1: 
  temp1 = writeCommand("1111", "0")
  print "T1"
  print temp1
#  temp2 = writeCommand("2222", "0")
#  print "T2"
#  print temp2
#  temp3 = writeCommand("3333", "0")
#  print "T3"
#  print temp3
#  temp4 = writeCommand("4444", "0")
#  print "T4"
#  print temp4
  if (float(temp1) > 85.00):
      writeCommand("5555", "0")  
      print "Relay On"
      time.sleep(1) 
  if (float(temp1) < 80.00):
      writeCommand("6666", "0")
      print "Relay Off"
      time.sleep(1)
