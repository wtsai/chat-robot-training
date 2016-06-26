#include <Wire.h>

boolean Action=false;
byte motion = 0;

void setup() {
  Wire.begin(1);
  Wire.onReceive(receiveEvent);
}

void loop() {
  if(Action)
  {
    switch(motion)
    {
      case 1:
        // Robot motion 1
        break;
      case 2:
        // Robot motion 2
        break;
      case 3:
        // Robot motion 3
        break;
      default:
        break;
    }
    Action = false;
  }
}

void receiveEvent(int howMany) {
  while(Wire.available()){
    motion = Wire.read();
    Action = true;
  }
}
