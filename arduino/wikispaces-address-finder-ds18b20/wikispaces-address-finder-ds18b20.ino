/* YourDuino Example: Find Address of a DS18B20 Temperature Sensor
 Cut and paste the address to a text file for later use.
 V1.1 01/17/2013
 Questions: terry@yourduino.com 
 
 Connections:
 DS18B20 Pinout (Left to Right, pins down, flat side toward you)
 - Left   = Ground
 - Center = Signal (Pin 2):  (with 3.3K to 4.7K resistor to +5 or 3.3 )
 - Right  = +5 or +3.3 V   
 This sketch looks for 1-wire devices and  prints their addresses (serial number)
 to the Serial Monitor in a format that is useful in Arduino sketches.
 Based on example at: 
 http://www.hacktronics.com/Tutorials/arduino-1-wire-address-finder.html
 */

/*-----( Import needed libraries )-----*/
#include <OneWire.h>

/*-----( Declare Constants and Pin Numbers )-----*/
#define SENSOR_PIN 2  // Any pin 2 to 12 (not 13) and A0 to A5

/*-----( Declare objects )-----*/
OneWire  ourBus(SENSOR_PIN);  // Create a 1-wire object

void setup()  /****** SETUP: RUNS ONCE ******/
{
  Serial.begin(9600);
 
  discoverOneWireDevices();  // Everything happens here!
}//--(end setup )---

void loop()   /****** LOOP: RUNS CONSTANTLY ******/
{
  // Nothing happening here
}

/*-----( Declare User-written Functions )-----*/
void discoverOneWireDevices(void) {
  byte i;
  byte present = 0;
  byte data[12];
  byte addr[8];

  Serial.print("Looking for 1-Wire devices...\n\r");// "\n\r" is NewLine 
  while(ourBus.search(addr)) {
    Serial.print("\n\r\n\rFound \'1-Wire\' device with address:\n\r");
    for( i = 0; i < 8; i++) {
      Serial.print("0x");
      if (addr[i] < 16) {
        Serial.print('0');
      }
      Serial.print(addr[i], HEX);
      if (i < 7) {
        Serial.print(", ");
      }
    }
    if ( OneWire::crc8( addr, 7) != addr[7]) {
      Serial.print("CRC is not valid!\n\r");
      return;
    }
  }
  Serial.println();
  Serial.print("Done");
  ourBus.reset_search();
  return;
}

//*********( THE END )***********
