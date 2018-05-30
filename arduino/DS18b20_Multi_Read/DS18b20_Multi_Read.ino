//DS18b20 Libraries
#include <OneWire.h>
#include <DallasTemperature.h>

//Definition Statements for DS18b20
#define ONE_WIRE_BUS 3

//Data wire is plugged into port 3 on the Arduino
#define ONE_WIRE_BUS 3

//Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);

//Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);

//Set up variables
float temp;
int sens_on_bus, count;
String to_print;

void setup() {
  Serial.begin(9600); //Initialize Serial Port
  sens_on_bus = sensors.getDeviceCount();
  Serial.println("There are " + String(sens_on_bus+1) + " DS18b20's on this bus.");
  delay(1000);
}

void loop() {
  if(count <= sens_on_bus){
    sensors.requestTemperatures(); 
    temp = sensors.getTempCByIndex(0);
    delay(500);
    if (temp == -127){
      to_print = "Error: Data corruption during transit! Please check the associated pull-up resistor.";
    }
    else if (temp == 85){
      to_print = "Error: Data read before complete read! Please wait until power cycle is completed.";
    }
    else if (temp == 0){
      to_print = "Error: No DS18b20 sensor detected! Please check that the circuit is completed.";
    }
    else{
      temp = sensors.getTempFByIndex(0);
      to_print = "Sensor number: " + String(sens_on_bus+1) + " is reading " + String(temp) + " F.";
    }
    Serial.println(to_print);
    count = count+1;
    delay(500);
  }
  else{
  count = 0;
  delay(1000);
  }
}

