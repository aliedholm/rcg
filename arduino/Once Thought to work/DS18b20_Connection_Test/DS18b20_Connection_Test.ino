//Call OneWire and DST Libraries
#include <OneWire.h>
#include <DallasTemperature.h>

//Data wire is plugged into port 2 on the Arduino
#define ONE_WIRE_BUS 3

//Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);

//Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);

//Set up variables
float temp;
String to_print;

void setup()
{
  //Start serial port
  Serial.begin(9600);
  Serial.println("DS18b20 Connection Quality Control Sketch");
  Serial.println("Luke Lindgren - 5/29/18");
  Serial.println("");
}

void loop()
{ 
  //Call sensors.requestTemperatures() to issue a global temperature request to all devices on the bus
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
    to_print = String(temp) + "F";
  }

  Serial.println(to_print);
  delay(500);
}
