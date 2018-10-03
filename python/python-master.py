import subprocess
import time

commands = ["1111", "2222", "3333", "3333", "4444", "4444", "5555", "5555"]
for x in commands:
  data = subprocess.check_output(["python", "/home/andy/rcg/python/python-send.py", "0", x])
  print data
  time.sleep(1)

