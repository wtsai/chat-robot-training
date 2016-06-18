var WitAI = require('../lib/witai');
var witai = new WitAI('AKV3RP6T6NXL7ZUVSWKNDQW22LWXIVJJ');

var dishes = 0;
var sushi = {
  name: null,
  counter: 0,
  text: null,
  status: ''
}

function messageProcess(data, callback) {
  if(data.entities.sushi&&data.entities.number){
    sushi['status'] = 'order';
    sushi['name'] = data.entities.sushi[0].value;
    sushi['counter'] = parseInt(data.entities.number[0].value);
    sushi['text'] = data._text;
    callback(null, 'done');
  }
  else if(data.entities.check){
    sushi['status'] = 'check';
    sushi['text'] = data._text;
    callback(null, 'done');
  }
  else if(data.entities.hello){
    sushi['status'] = 'hello';
    sushi['text'] = data._text;
    callback(null, 'done');
  }
  else{
    callback(null, 'done');
  }
};

function actionsProcess(callback) {
  if(sushi['status'] == 'order'){
    dishes = parseInt(dishes) + parseInt(sushi['counter']);
    witai.runActions(sushi['text'], function(err, data, say){
      if(data){
        return callback(null, data, say);
      }
      else{
        return callback(null, '', '');
      }
    });
  }
  else if(sushi['status'] == 'check' ||
          sushi['status'] == 'hello' ){
    witai.runActions(sushi['text'], function(err, data, say){
      if(data){
        return callback(null, data, say);
      }
      else{
        return callback(null, '', '');
      }
    });
  }
  else{
    return callback(null, '', '');
  }
};

witai.init();
witai.message('結帳', function(err, data){
  if(data){
    messageProcess(data, function(err, done){
      actionsProcess(function(err, data, sentence){
        console.log('data:' + JSON.stringify(data));
        console.log('sentence:' + JSON.stringify(sentence));
      });
    });
  }
});
