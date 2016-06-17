"use strict";

var mic = require('mic');
var WavStream = require('../lib/wav_stream');
var watson = require('watson-developer-cloud');

var micInstance = mic({
	'rate': '16000',
	'channels': '1',
	'debug': false,
	'exitOnSilence': 6
});
var pcm2wav = new WavStream({
	channels: 1,
	sampleRate: 16000
});
var speech_to_text = watson.speech_to_text({
	username: 'e19d8ae4-00ad-4300-a660-6d2ee29d79e3',
	password: 'mC1KpDzeuDHU',
	version: 'v1'
});
var watson_params = {
	content_type: 'audio/wav; rate=44100',
	model: 'zh-CN_BroadbandModel',
	continuous: true,
	max_alternatives: 10
};
var stt = speech_to_text.createRecognizeStream(watson_params);
var micInputStream = micInstance.getAudioStream();

stt.setEncoding('utf8');
pcm2wav.pipe(stt);
micInputStream.pipe(pcm2wav);

stt.on('results', function(data) {
	console.log('data:' + JSON.stringify(data));
});

micInstance.start();
