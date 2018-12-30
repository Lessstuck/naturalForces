/*
 Basic ESP8266 MQTT example

 This sketch demonstrates the capabilities of the pubsub library in combination
 with the ESP8266 board/library.

 It connects to an MQTT server then:
  - publishes "hello world" to the topic "outTopic" every two seconds
  - subscribes to the topic "inTopic", printing out any messages
    it receives. NB - it assumes the received payloads are strings not binary
  - If the first character of the topic "inTopic" is an 1, switch ON the ESP Led,
    else switch it off

 It will reconnect to the server if the connection is lost using a blocking
 reconnect function. See the 'mqtt_reconnect_nonblocking' example for how to
 achieve the same result without blocking the main loop.

 To install the ESP8266 board, (using Arduino 1.6.4+):
  - Add the following 3rd party board manager under "File -> Preferences -> Additional Boards Manager URLs":
       http://arduino.esp8266.com/stable/package_esp8266com_index.json
  - Open the "Tools -> Board -> Board Manager" and click install for the ESP8266"
  - Select your ESP8266 in "Tools -> Board"
   Added stepper controls!  -LS
*/

int value = 0;
float tippy = 0.;
int tipper = 0;

#include <Stepper.h>
#include <AccelStepper.h>
/*
 Stepper Motor Control - one revolution
 by Tom Igoe
 */
const int stepsPerRevolution = 200;
const int stepsPerScan = stepsPerRevolution / 10;
AccelStepper stepper(4, 14, 15, 32, 33);


void setup() {
  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  stepper.setMaxSpeed(1000);
}


void loop() {

//moveTo() is relative to a zero position that is changed each time program is uploaded
//therefore, set mechanics to 0 position before uploading
//stepper.move(1);
//stepper.setSpeed(100);
//stepper.runSpeedToPosition();
//delay(10);
stepper.moveTo(1000);
stepper.setSpeed(100);
stepper.runSpeedToPosition();
//delay(1);
}
