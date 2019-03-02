import serial
import time
import subprocess


paths = subprocess.check_output('ls /dev/cu.usbmodem*', shell=True).splitlines()
sers = list(map(lambda path: serial.Serial(path.decode('ASCII'), 9600), paths))

for i in range(len(sers)):
    while not sers[i].is_open:
        time.sleep(0.05)
    print(f'Serial {i} is open')

while True:
    i = 0
    for ser in sers:
        user_input = input(f'Sending to serial {i}: ').encode('latin-1') + b'\n'
        ser.write(user_input)
        while ser.in_waiting <= 0:
            time.sleep(0.05)
        while ser.in_waiting > 0:
            print(b'response: ' + ser.readline())



    # user_input = input('happy: ').encode('latin-1') + b'\n'
    # ser1.write(user_input)
    # sers[0].write(b'I am fine,how are you?')
    # ser2.write(b'I am good, and you?')

    # while ser1.in_waiting <= 0:
    #     time.sleep(0.05)
    # while ser1.in_waiting > 0:
    # print(b'sers[0] saying: ' + sers[0].readline())

    # while ser2.in_waiting <= 0:
    #     time.sleep(0.05)
    # while ser2.in_waiting > 0:
    #     print('ser2 saying: ' + ser2.readline().decode('utf-8'))    
    
