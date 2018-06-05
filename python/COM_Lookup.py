import sys
import glob
import serial

def COM_check(): #Modified from https://stackoverflow.com/questions/12090503/listing-available-com-ports-with-python
    """Lists serial port names
        :raises EnvironmentError: On unsupported or unknown platforms
        :returns: A list of the serial ports available on the system
    """
    if sys.platform.startswith("win"):
        ports = ["COM%s" % (i + 1) for i in range(256)]
    elif sys.platform.startswith("linux") or sys.platform.startswith("cygwin"):
        #Excludes current terminal "/dev/tty"
        ports = glob.glob("/dev/tty[A-Za-z]*")
    elif sys.platform.startswith("darwin"):
        ports = glob.glob("/dev/tty.*")
    else:
        raise EnvironmentError("This OS is unsupported. Program cannot auto-scan for COM ports.")
    result = []
    for port in ports:
        try:
            s = serial.Serial(port)
            s.close()
            result.append(port)
        except (OSError, serial.SerialException):
            pass
    return result


def check_sensors_on_COM(COMS):
    sensors = []
    for COM in COMS():
        ser = serial.Serial(COM, 9600)
        ser.write("Sensor List")
        sensors[COM] = ser.readline() #Should look like (#: Type, #: Type, ...).
    return sensors


def write_to_file(sensors):
    for COM in sensors:
        to_write = [COM] #Create a list, to_write, that already has the COM port in it.
        sensor_list = sensors[COM]
        with open("COM_Sensor_List.txt", "a+") as write_file:
            to_write = [COM, sensor_list] #[COM, [#: Type, #: Type,...]]
            write_file.write(str(to_write)) #Writes the above, as a line, in a text file.


def init():
    COMS = COM_check() #Gets a list of all operational COMS on this machine.
    for COMS in COM_check():
        print COMS  #Prints all coms
    sensors = check_sensors_on_COM(COMS) #Checks number of sensors and types on a COM port.
    for COM in sensors:
        print COM, sensors[COM] #Prints the returned data
    write_to_file(sensors) #Writes data to a CSV file