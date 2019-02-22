import serial
ser = serial.Serial('/dev/cu.usbmodem1411', 9600)
while True:
    ser.write(b'hello\n')
    while ser.in_waiting > 0:
        print(ser.readline())
