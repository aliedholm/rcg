//for ds18b20 code
#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS_PIN A0

// include the library LCD code:
#include <LiquidCrystal.h>

OneWire oneWire(ONE_WIRE_BUS_PIN);
DallasTemperature sensors(&oneWire);

  //device addresses to be found in another sketch and assigned here
DeviceAddress Probe01 = { 0x28, 0xFF, 0xB2, 0x76, 0xB5, 0x16, 0x05, 0xD5 }; 
DeviceAddress Probe02 = { 0x28, 0xFF, 0xD4, 0xEA, 0xC1, 0x16, 0x04, 0x84 }; 
DeviceAddress Probe03 = { 0x28, 0xFF, 0xCC, 0x0A, 0xC2, 0x16, 0x04, 0x6B };
//ds18b20 code end

//LCD Setup Code
const int rs = 7, en = 8, d4 = 9, d5 = 10, d6 = 11, d7 = 12;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

//for relay control code
// declare and name all actuator pins on the arduino
int relay1 = 11;
int relay2 = 10;
int relay3 = 9;
int relay4 = 8;
//relay control code end

//declare command code variable
String commandCode = "0";

//tentacle sheild code 
#include <SoftwareSerial.h>         //Include the software serial library  

SoftwareSerial sSerial(11, 10);     // RX, TX  - Name the software serial library sftSerial (this cannot be omitted)
                                    // assigned to pins 10 and 11 for maximum compatibility
int s0 = 7;                         // Tentacle uses pin 7 for multiplexer control S0
int s1 = 6;                         // Tentacle uses pin 6 for multiplexer control S1
int enable_1 = 5;                   // Tentacle uses pin 5 to control pin E on shield 1
int enable_2 = 4;                   // Tentacle uses pin 4 to control pin E on shield 2

char computerdata[20];              // A 20 byte character array to hold incoming data from a pc/mac/other
char sensordata[30];                // A 30 byte character array to hold incoming data from the sensors
byte computer_bytes_received = 0;   // We need to know how many characters bytes have been received
byte sensor_bytes_received = 0;     // We need to know how many characters bytes have been received

char *channel;                      // Char pointer used in string parsing
char *cmd;                          // Char pointer used in string parsing

String str;
String str_channel;
//tentacle sheild code end

//Serial buffer code
const byte numChars = 32;
char receivedChars[numChars]; // an array to store the received data
boolean newData = false;
//Serial buffer code end

void setup() {
  
  Serial.begin(9600);
  
  //LCD Code
  lcd.begin(16, 2);
  
  //for ds18b20 code
  sensors.begin();
  sensors.setResolution(Probe01, 12);
  sensors.setResolution(Probe02, 12);
  sensors.setResolution(Probe03, 12);
  //ds18b20 code end

  //tentacle sheild code
  pinMode(s0, OUTPUT);             // set the digital output pins for the serial multiplexer
  pinMode(s1, OUTPUT);
  pinMode(enable_1, OUTPUT);
  pinMode(enable_2, OUTPUT);

  sSerial.begin(9600);             // Set the soft serial port to 9600 (change if all your devices use another baudrate)
  intro();                         // display startup message

  
}



void loop() {
  
  //ds18b20 generic code
  sensors.requestTemperatures();
  delay(100);
  //end ds18b20 generic code

  //Main set of if statements to trigger conditions from Serial commands
  commandCode = "1001";   
  if(commandCode == "1001"){
    float temp = printTemperature(Probe01);
    lcd.setCursor(0,0);
    lcd.print("T1:");
    lcd.setCursor(0,1);
    lcd.print(temp);
    lcd.setCursor(4,1);
    lcd.print(" ");
    delay(200);
    commandCode = "0";
  }
  commandCode = "1002";   
  if(commandCode == "1002"){
    float temp = printTemperature(Probe02);
    lcd.setCursor(6,0);
    lcd.print("T2:");
    lcd.setCursor(6,1);
    lcd.print(temp);
    lcd.setCursor(10,1);
    lcd.print(" ");
    delay(200);
    commandCode = "0";
  }
  commandCode = "1003";   
  if(commandCode == "1003"){
    float temp = printTemperature(Probe03);
    lcd.setCursor(12,0);
    lcd.print("T3:");
    lcd.setCursor(12,1);
    lcd.print(temp);
    delay(200);
    commandCode = "0";
  }
  
//End of Main set of if statements 
        
}//end of main loop

//start of functions needed to be called in them main loop

//Serial buffer functions
void recvWithStartEndMarkers() {
    static boolean recvInProgress = false;
    static byte ndx = 0;
    char startMarker = '<';
    char endMarker = '>';
    char rc;
 
 // if (Serial.available() > 0) {
    while (Serial.available() > 0 && newData == false) {
        rc = Serial.read();

        if (recvInProgress == true) {
            if (rc != endMarker) {
                receivedChars[ndx] = rc;
                ndx++;
                if (ndx >= numChars) {
                    ndx = numChars - 1;
                }
                
                commandCode = receivedChars;
                String String(commandCode);
            }
            else {
                receivedChars[ndx] = '\0'; // terminate the string
                recvInProgress = false;
                ndx = 0;
                newData = true;
            }
        }

        else if (rc == startMarker) {
            recvInProgress = true;
        }
    }
}

void showNewData() {
 if (newData == true) {
 newData = false;
 }
}

//ds18b20 code functions
float printTemperature(DeviceAddress deviceAddress)
{

float tempC = sensors.getTempC(deviceAddress);

   if (tempC == -127.00) 
   {
   Serial.print("Error getting temperature  ");
   } 
   else
   {
   
   Serial.println(DallasTemperature::toFahrenheit(tempC));
   return (DallasTemperature::toFahrenheit(tempC));
   }
}
// ds18b20 end code

//tentacle sheild code
// Print intro
void intro() {
  Serial.flush();
  Serial.println(" ");
}


