var WitAI = require('../lib/witai-simple');
var witai = new WitAI('AKV3RP6T6NXL7ZUVSWKNDQW22LWXIVJJ');
var str_hello = '你好';
var str_order = '我想要比目魚兩份';
var str_check = '我要結帳';

witai.init();
witai.runActions(str_order, function(err, data, say){
  if(data){
    console.log('data:' + JSON.stringify(data));
    console.log('say:' + JSON.stringify(say));
  }
});
