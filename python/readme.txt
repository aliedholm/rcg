Arduinos are to be addressed by their ACM # as a command line argument along with the execution of the program and the device name and desired state. The arduino will perform the operation and then return a confirmation message to the Pi that may contain data or just a recipt of confirmation.

Arduinos shall be addressed with a four digit code which will designate which device to control and which state to move it in to.

Structure of a command to arduino - XYYZ
X = arduino ACM #
Y = device code
Z = toggle on or off

Example command is 0101

Pumps = 2
Relay = 1
solenoid = 3


 
