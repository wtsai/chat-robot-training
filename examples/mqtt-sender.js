"use strict";
var mqtt = require('mqtt');

var IoT ={
  domain: 'yq0gk',
  name: '7688duo',
  id: '7688-sender-1',
  passwd: 'xvzJOBDh9PlJ*p1H'
}

var clientId = ['d', IoT.domain, IoT.name, IoT.id].join(':');
var iot_client = mqtt.connect('mqtt://' + IoT.domain +'.messaging.internetofthings.ibmcloud.com:1883',
            {
              "clientId" : clientId,
              "keepalive" : 30,
              "username" : "use-token-auth",
              "password" : IoT.passwd
            });

iot_client.on('connect', function() {
  iot_client.publish('iot-2/evt/status/fmt/json', '{"d":{"status": "connected" }}');
  iot_client.publish('iot-2/evt/I2C/fmt/string','hello');
});
