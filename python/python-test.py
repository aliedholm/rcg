import serial
import time
import subprocess


paths = subprocess.check_output('ls /dev/cu.usbmodem*', shell=True).splitlines()
sers = list(map(lambda path: serial.Serial(path.decode('ASCII'), 9600, timeout=0, write_timeout=0.05), paths))

for i in range(len(sers)):
    while not sers[i].is_open:
        time.sleep(0.05)
    print('Serial %d is open' % i)

while True:
    i = 0
    for ser in sers:
        user_input = input('Sending to serial %d: ' % i).encode('latin-1') + b'\n'
        ser.write(user_input)
        timeout = 2
        while ser.in_waiting <= 0 and timeout > 0:
            time.sleep(0.05)
            timeout -= 0.05
        if (timeout > 0):
            while ser.in_waiting > 0:
                print(b'response: ' + ser.readline())
        else:
            print(b'Timed out\n')

for ser in sers:
    ser.close()
