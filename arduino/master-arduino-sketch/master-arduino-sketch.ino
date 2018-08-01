//for ds18b20 code
#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS_PIN 2
OneWire oneWire(ONE_WIRE_BUS_PIN);
DallasTemperature sensors(&oneWire);
DeviceAddress Probe01 = { 0x28, 0xFF, 0xE0, 0x7F, 0xB5, 0x16, 0x05, 0x50 }; 
DeviceAddress Probe02 = { 0x28, 0xFF, 0x50, 0xEF, 0xC1, 0x16, 0x04, 0xD1 };
DeviceAddress Probe03 = { 0x28, 0xFF, 0x7B, 0xCC, 0xC1, 0x16, 0x04, 0xA1 };
DeviceAddress Probe04 = { 0x28, 0xFF, 0x4F, 0x19, 0xC2, 0x16, 0x04, 0x5E };
//ds18b20 code end

void setup() {
  Serial.begin(9600);
  
  //for ds18b20 code
  sensors.begin();
  sensors.setResolution(Probe01, 12);
  sensors.setResolution(Probe02, 12);
  sensors.setResolution(Probe03, 12);
  sensors.setResolution(Probe04, 12);
  //ds18b20 code end
  
}

void loop() {
  delay(150);
  
  int commandCode = 0;
  if(Serial.available()){
    commandCode = Serial.read() - '0';
  }  
  
  switch (commandCode) {
    
    //request one round of temperature data
    case 119:
      sensors.requestTemperatures();
      printTemperature(Probe01);
      break;
      
    case 129:
      sensors.requestTemperatures();
      printTemperature(Probe02);
      break;

    case 139:
      sensors.requestTemperatures();
      printTemperature(Probe03);
      break;

    case 149:
      sensors.requestTemperatures();
      printTemperature(Probe04);
      break;
      
    default:
      delay(100);
  }

}

//ds18b20 code functions
void printTemperature(DeviceAddress deviceAddress)
{

float tempC = sensors.getTempC(deviceAddress);

   if (tempC == -127.00) 
   {
   Serial.print("Error getting temperature  ");
   } 
   else
   {
   Serial.print("C: ");
   Serial.print(tempC);
   Serial.print(" F: ");
   Serial.println(DallasTemperature::toFahrenheit(tempC));
   }
}
// ds18b20 end code

