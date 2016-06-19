void setup() {
  Serial.begin(115200); // connection to your computer
  Serial1.begin(57600); // connection to MCU
}

void loop() {
  if (Serial1.available()){
    byte robot_control = Serial1.read();
    if (robot_control != -1) {
        switch(robot_control) {
          case '1':
            // Robot motion 1
            break;
          case '2':
            // Robot motion 2
            break;
          case '3':
            // Robot motion 3
            break;
          default:
            break;
        }
    }
  }
}
