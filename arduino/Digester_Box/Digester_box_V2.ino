/*
 * Components: 20x4 LCD screen, I2C backpack, ultrasonic sensor, DS18b20 temp sensor, relay
 */

// LCD Libraries
#include <LiquidCrystal.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <hd44780.h> // include hd44780 library header file
#include <hd44780ioClass/hd44780_I2Cexp.h> // i/o expander/backpack class
hd44780_I2Cexp lcd; // auto detect backpack and pin mappings

// Ultrasonic Sensor Libraries
#include <NewPing.h>

// DS18b20 Libraries
#include <OneWire.h>
#include <DallasTemperature.h>

// Ultrasonic Sensr initialization
#define PING_PIN 4 // Arduino pin for both trig and echo
NewPing sonar(PING_PIN, PING_PIN);
float distance = 0;

// DS18b20 initialization
#define ONE_WIRE_BUS_PIN A0 // Arduino pin for the DS18b20 data bus
OneWire oneWire(ONE_WIRE_BUS_PIN);
DallasTemperature sensors(&oneWire);
// Use Address Finder sketch to find device addresses and assigned here
DeviceAddress Probe02 = { 0x28, 0xF6, 0xBE, 0xA8, 0x1F, 0x13, 0x01, 0x74 }; 
float temp2 = 0;
// Device addresses end

//Variable Definitions
#define TEMP_PIN A0;
#define PUMP_PIN 5; // Arduino pin for pump
#define MAX_DIS 10;
#define MIN_DIS 8;

boolean isPumping = false;


void setup() {
  Serial.begin(9600);
  lcd.init(); // initialize the lcd 
  lcd.begin(20, 4);
  lcd.backlight();
  
  // For ds18b20 code
  sensors.begin();
  sensors.setResolution(Probe02, 12);
  // ds18b20 code end
  
  pinMode(5, OUTPUT); // For power switch/relay
}


void loop() {
  // First will get the temperatures and update LCD:
 
  sensors.requestTemperatures(); // General initialization command
  delay(100); // Wait before request
  temp2 = printTemperature(Probe02); // Get probe 1 temp and then print data to screen
  lcd.setCursor(0, 3);
  lcd.print("T2: ");
  lcd.setCursor(5,3);
  lcd.print(temp2);

  // Now we get the water level. Remember that max distance is further from the sensor but is the lower water level
//  delay(200); // Need at least 29ms total between pings due to sensor processing limitations

  distance = getDistance();
  lcd.clear();
  Serial.println(distance);
  lcd.setCursor(0,0);
  lcd.print("Distance: ");
  lcd.setCursor(10,0);
  lcd.print(distance);

  // If water level is too low and if so, print "Status: Filling"
  if(distance > MAX_DIS) {
    digitalWrite(5, HIGH);
    lcd.setCursor(0,1);
    lcd.print("Status: Filling");
    Serial.println("Status: Filling");
    delay(2000);
    
    digitalWrite(5, LOW);
    delay(700);
  }

  
  if (distance < 2) { // If water level too high or something is blocking sensor
    lcd.setCursor(0,1);
    lcd.print("Sensor Blocked!");
    digitalWrite(5, LOW); 
  } else if (distance <= MAX_DIS && distance >= MIN_DIS) { // If good water level
    lcd.setCursor(0,1);
    lcd.print("Status: Full");
    digitalWrite(5, LOW); 
  } else if (distance > 300) { // If water level is out of range
    lcd.setCursor(0,1);
    lcd.print("Sensor Error");
    digitalWrite(5, LOW); 
  }
  

}

//ds18b20 code functions
float printTemperature(DeviceAddress deviceAddress)
{
   float tempC = sensors.getTempC(deviceAddress);

   if (tempC == -127.00) {
    Serial.print("Error getting temperature  ");
   } else {
     Serial.print("C: ");
     Serial.print(tempC);
     Serial.print(" F: ");
     Serial.println(DallasTemperature::toFahrenheit(tempC));
     return(DallasTemperature::toFahrenheit(tempC));
   }
}
// ds18b20 end code
  

float getDistance() {
  sum = 0;
  /* for loop to average distance */
  for(int i = 0; i < 20; i++) {
    unsigned int uS = sonar.ping(); // Send ping, get ping time in microseconds (uS).
    sum = sum + (uS / US_ROUNDTRIP_CM); // Convert ping to distance
    delay(70);
  }
  float distance = sum/20;
  return distance;
}
