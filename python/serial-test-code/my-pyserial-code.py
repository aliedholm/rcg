import serial
import time

ser = serial.Serial('/dev/cu.usbmodem1411', 9600)
while True:
    user_input = input('happy: ').encode('latin-1') + b'\n'
    ser.write(user_input)
    while ser.in_waiting <= 0:
        time.sleep(0.05)
    while ser.in_waiting > 0:
        print(ser.readline())
    
