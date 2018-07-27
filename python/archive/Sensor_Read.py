import serial
import Publish_Data

def get_known():
    with open("COM_Sensor_List.csv", "r") as readfile:
        read_list = readfile.readlines() #Reads a file, line by line, into a list like [COM, [#: Type, #: Type,...]]
    Master_Dict = {}
    COMs_List = []
    for node in read_list:
        COM = node[0]
        sensors = node[1]
        Master_Dict[COM] = sensors
        COMs_List.append(COM)
    return Master_Dict, COMs_List


def DS18b20_request(COM, number):
    iterable = 0
    temperature_list = []
    while iterable < number:
        request = "Get Temp", str(iterable)
        ser = serial.Serial(COM, 9600)
        ser.write(request)
        temperature = ser.readline()
        temperature_list.append(temperature)
        print temperature
    return temperature_list


def DO_request(COM, number):
    iterable = 0
    DO_list = []
    while iterable < number:
        request = "Get DO", str(iterable)
        ser = serial.Serial(COM, 9600)
        ser.write(request)
        DO = ser.readline()
        DO.append(DO)
        print DO
    return DO_list


def EC_request(COM, number):
    iterable = 0
    EC_list = []
    while iterable < number:
        request = "Get Temp", str(iterable)
        ser = serial.Serial(COM, 9600)
        ser.write(request)
        EC = ser.readline()
        EC_list.append(EC)
        print EC
    return EC_list


def pH_request(COM, number):
    iterable = 0
    pH_list = []
    while iterable < number:
        request = "Get Temp", str(iterable)
        ser = serial.Serial(COM, 9600)
        ser.write(request)
        pH = ser.readline()
        pH_list.append(pH)
        print pH
    return pH_list


def request_type(Master_Dict, COMS_List):
    while True:
        iterable = 0
        length = len(COMS_List)
        while iterable < length:
            COM = COMS_List[iterable]
            sensors = Master_Dict[COM]
            number_DS = 0
            number_DO = 0
            number_EC = 0
            number_pH = 0
            for sensor in sensors:
                temp_list = sensor.split(": ")  # Should split into two strings. One being "#", and the other being "Type".
                type = temp_list[1]
                number = temp_list[2]
                if type == "DS18b20":
                    number_DS = int(number)
                elif type == "DO":
                    number_DO = int(number)
                elif type == "EC":
                    number_EC = int(number)
                elif type == "pH":
                    number_pH = int(number)
                else:
                    print "Sensor type,", type, "is not recognized by this program."
                    print "Valid probe types are: "
                    print "     DS18b20 waterproof temperature probes"
                    print "     Dissolved Oxygen probes from Atlas Scientific"
                    print "     Electric Conductivity probes from Atlas Scientific"
                    print "     pH probes from Atlas Scientific"
                    #Add a function to remove this from list.
            if number_DO > 0:
                Publish_Data.publish_DO(DO_request(COM, number_DO), COM)
            if number_DS > 0:
                Publish_Data.publish_temp(DS18b20_request(COM, number_DS), COM)
            if number_EC > 0:
                Publish_Data.publish_EC(EC_request(COM, number_EC), COM)
            if number_pH > 0:
                Publish_Data.publish_pH(pH_request(COM, number_pH), COM)


def init():
    Master_Dict, COMS_List = get_known()
    request_type(Master_Dict, COMS_List)