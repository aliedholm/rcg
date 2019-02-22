import serial
import time

ser1 = serial.Serial('/dev/cu.usbmodem14201', 9600)
ser2 = serial.Serial('/dev/cu.usbmodem14101', 9600)

while True:
    # user_input = input('happy: ').encode('latin-1') + b'\n'
    # ser1.write(user_input)
    ser1.write(b"I am fine,how are you ? \n" )
    ser2.write(b"I am good, and you? \n")

    while ser1.in_waiting <= 0:
        time.sleep(0.05)
    while ser1.in_waiting > 0:
        print("ser1 saying: " + ser1.readline().decode("utf-8"))

    while ser2.in_waiting <= 0:
        time.sleep(0.05)
    while ser2.in_waiting > 0:
        print("ser2 saying: " + ser2.readline().decode("utf-8"))    
    
