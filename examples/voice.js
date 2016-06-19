"use strict";
var request = require('request');
var Mpg = require('mpg123');
var fs = require('fs');

var writeStream = fs.createWriteStream('./tts.mp3');
var reply_hello = '歡迎光臨，請問今天需要什麼。';
var reply_order = '好的，請問還需要什麼。';
var reply_check = '謝謝光臨，歡迎下次再來。';
var params = {
  key: 'd5c673a84b6b4b6798cfc2f64e3bbd3e',
  ie: 'UTF-8',
  src: reply_order,
  r: 3,
  c: 'MP3',
  f: '44khz_16bit_stereo',
  hl: 'zh-tw'
};

writeStream
  .on('finish', function() {
    var player = new Mpg();
    player.play('./tts.mp3');
  });

request
  .post({
    url: 'http://api.voicerss.org/?', form: params,
  })
  .on('error', function (err) {
    console.log(err);
  })
  .pipe(writeStream);
