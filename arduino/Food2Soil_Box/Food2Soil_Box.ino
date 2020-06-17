/*
 * Components: 16x2 LCD screen, 3 DS18b20 temp sensors, DHT sensor, 2 soil moisture sensors
 */

// LCD Libraries
#include <LiquidCrystal.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <hd44780.h> // include hd44780 library header file
#include <hd44780ioClass/hd44780_I2Cexp.h> // i/o expander/backpack class
hd44780_I2Cexp lcd; // auto detect backpack and pin mappings

// DS18b20 Libraries
#include <OneWire.h>
#include <DallasTemperature.h>

// LCD Libraries
#include <LiquidCrystal.h>

// DS18b20 initialization
#define ONE_WIRE_BUS_PIN A0
OneWire oneWire(ONE_WIRE_BUS_PIN);
DallasTemperature sensors(&oneWire);
DeviceAddress Probe01 = {0x28, 0xAA, 0x06, 0xC3, 0x17, 0x13, 0x02, 0x95};
DeviceAddress Probe02 = {0x28, 0x27, 0x2B, 0xAB, 0x1F, 0x13, 0x01, 0x6A};
DeviceAddress Probe03 = {0x28, 0xAA, 0x9F, 0x0E, 0x18, 0x13, 0x02, 0x2A};
float temp1 = 0;
float temp2 = 0;
float temp3 = 0;

//LCD initialization
const int rs = 7, en = 8, d4 = 9, d5 = 10, d6 = 11, d7 = 12;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

// DHT initialization
#include <dht.h>
float hum_val = 0;
#define dataPin A3
dht DHT;

// Soil moisture sensors
long soil_val1; // moisture value
long soil_val2;
int soil_pin1 = A2; // pin that 1st soil moisture sensor is connected to
int soil_pin2 = A1; // pin that 2nd soil moisture sensor is connected to
long max_val = 1000;
long min_val = 0;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  
  //LCD Code
  lcd.init();
  lcd.begin(20, 4);
  lcd.backlight();0
  
  //for ds18b20 code
  sensors.begin();
  sensors.setResolution(Probe01, 12);
  sensors.setResolution(Probe02, 12);
  sensors.setResolution(Probe03, 12);
  //ds18b20 code end
}


void loop() {
  //ds18b20 generic code
  sensors.requestTemperatures();
  delay(500);
  //end ds18b20 generic code

  // Take and print temp sensors data
  temp1 = (int)printTemperature(Probe01);
  temp2 = (int)printTemperature(Probe02);
  temp3 = (int)printTemperature(Probe03);
   
  // lcd.setCursor(col, row)
  lcd.setCursor(3,0);
  lcd.print("T1:");
  lcd.setCursor(9,0);
  lcd.print("T2:");
  lcd.setCursor(15,0);
  lcd.print("T3:");
 
  lcd.setCursor(2,1);
  lcd.print(temp1, 1);
  lcd.setCursor(8,1);
  lcd.print(temp2, 1);
  lcd.setCursor(14,1);
  lcd.print(temp3, 1);

  // Take and print soil moisture and DHT sensor data
  soil_val1 = printMoisture(soil_pin1);
  soil_val2 = printMoisture(soil_pin2);
  int readData = DHT.read22(dataPin);
  hum_val = DHT.humidity;
  
  // lcd.setCursor(col, row)
  lcd.setCursor(2,2);
  lcd.print("SM1:");
  lcd.setCursor(8,2);
  lcd.print("SM2:");
  lcd.setCursor(14,2);
  lcd.print("HUM:");

  lcd.setCursor(2,3);
  lcd.print(soil_val1);
  lcd.print("%");
  lcd.setCursor(8,3);
  lcd.print(soil_val2);
  lcd.print("%");
  lcd.setCursor(14,3);
  lcd.print(hum_val, 1);
  lcd.print("%");
  
  // Clear
  lcd.clear();
}


// Function to retrieve soil moisture data
long printMoisture (int soil_pin) {
  float data = analogRead(soil_pin);
  
  Serial.println("In the function: ");
  Serial.println(data);
  
  if(data > max_val) {
    data = max_val;
  }
  if(data < min_val) {
    data = min_val;
  }
  
  long soil_val = map( data, min_val, max_val, 100, 0); 
  return soil_val;
}

// Function to retrieve DS18B20 temp sensor data
float printTemperature(DeviceAddress deviceAddress)
{
  float tempC = sensors.getTempC(deviceAddress);
 
  if (tempC == -127.00) {
    Serial.print("Error getting temperature  ");
  } else {
    //Serial.println(DallasTemperature::toFahrenheit(tempC));
    return (DallasTemperature::toFahrenheit(tempC));
  }
}
// ds18b20 end code
