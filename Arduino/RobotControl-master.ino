#include <Wire.h>

void setup() {
  Serial.begin(115200); // connection to your computer
  Serial1.begin(57600); // connection to MCU

  Wire.begin();
}

void loop() {
  if (Serial1.available()){
    byte robot_control = Serial1.read();
    if (robot_control != -1) {
        Wire.beginTransmission(1);
        switch(robot_control) {
          case '1':
            Wire.write(1);
            break;
          case '2':
            Wire.write(2);
            break;
          case '3':
            Wire.write(3);
            break;
          default:
            break;
        }
        Wire.endTransmission();
    }
  }
}
