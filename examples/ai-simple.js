var WitAI = require('../lib/witai');
var witai = new WitAI('AKV3RP6T6NXL7ZUVSWKNDQW22LWXIVJJ');

witai.init();
witai.runActions('我想要比目魚兩份', function(err, data, say){
  if(data){
    console.log('data:' + JSON.stringify(data));
    console.log('say:' + JSON.stringify(say));
  }
});
