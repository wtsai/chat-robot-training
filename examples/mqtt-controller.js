var mqtt = require('mqtt');
var SerialPort = require("serialport").SerialPort;

var IoT ={
  domain: 'yq0gk',
  name: '7688duo',
  id: '7688-subscriber-1',
  passwd: 'UYf4O2AIHiT!Qgh0'
}

var serialPort = new SerialPort("/dev/ttyS0", {
  baudrate: 57600
}, function () {
  console.log('Connected.');
});

var clientId = ['d', IoT.domain, IoT.name, IoT.id].join(':');
var iot_client = mqtt.connect('mqtt://' + IoT.domain +'.messaging.internetofthings.ibmcloud.com:1883',
            {
              "clientId" : clientId,
              "keepalive" : 30,
              "username" : "use-token-auth",
              "password" : IoT.passwd
            });

iot_client.on('connect', function() {
	console.log('7688 Duo subscriber connected to IBM IoT Cloud.');
	iot_client.subscribe('iot-2/cmd/+/fmt/+');
});

iot_client.on("message", function(topic,payload){
	if (payload == 'hello') {
			serialPort.write('1');
	} else if (payload == 'order'){
			serialPort.write('2');
	} else if (payload == 'check'){
			serialPort.write('3');
	} 
});
