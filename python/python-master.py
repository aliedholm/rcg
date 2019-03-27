from multiprocessing import Process
import subprocess
import time

d1 = .0015
d2 = .25

#return the list of ports occupied by arduinos on the rpi system
def checkArduinos():
  data = subprocess.check_output("ls /dev/ttyACM*", shell=True)
  return data

#generic write command to arduino function
def writeCommand(command, device):
  data = subprocess.check_output(["python", "/home/rcg/rcg/python/python-send.py", device, command])
  time.sleep(d1)
  return data

#specialized temperature check function
def checkTemp(command, device, sensorNum):
  temp = writeCommand(command, device)
  print "T" + sensorNum
  print temp 
  time.sleep(d1)
  return temp

#specialized command to actuate a binary state device on the system
def relaySwitch(command, device, relayNum, state):
  writeCommand(command, device)
  print "Relay" + " " + relayNum + " " + state
  time.sleep(d1)

#check the system for arduinos and have them all reports identities  
def getAddresses():
  addresses = checkArduinos().splitlines()
  arduinosRaw = [0] * 100
  for x in range(len(addresses)):
    identity = writeCommand("9999", addresses[x])
    time.sleep(d1)
    arduinosRaw[x] = [addresses[x], identity]

  for x in range(len(arduinosRaw)):
    if arduinosRaw[x] != 0:
      arduinos[x] = arduinosRaw[x]
      print arduinos[x]

#setup of the program getting ready for main loop

arduinos = [0] * 100
attempts = 0

while attempts < 5:
  attempts = attempts + 1
  if __name__ == '__main__':
    p = Process(target=getAddresses, args=())
    p.start()
    p.join(5)
    if p.is_alive():
      p.terminate()
      p.join()
    print attempts
    time.sleep(.005)

for x in range(len(arduinos)):
  if arduinos[x] != 0:
    print arduinos[x]

print len(arduinos)
print "anything?"
print arduinos
#main loop to monitor conditions and adjust system
while 1:
  arduino = "/dev/ttyACM1" 
  checkTemp("1111", arduino, "1")
  time.sleep(.25)
  checkTemp("1112", arduino, "2")
  time.sleep(.25)
  checkTemp("1113", arduino, "3")
  time.sleep(.25)
