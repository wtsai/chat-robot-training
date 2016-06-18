"use strict";
const Wit = require('node-wit').Wit;

var WitAI = module.exports = function(token) {
	this.client = new function(){};
	this.token = token;
	this.say = '';
};

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

WitAI.prototype.init = function() {
	var self = this;
	const actions = {
	  say(sessionId, context, message, cb) {
			self.say = message;
	    cb();
	  },
	  merge(sessionId, context, entities, message, cb) {
	    const sushi = firstEntityValue(entities, 'sushi');
	    const counter = firstEntityValue(entities, 'number');
	    const check = firstEntityValue(entities, 'check');
	    const hello = firstEntityValue(entities, 'hello');
	    if (sushi) {
	      context.sushi = sushi;
	    }
	    if (counter) {
	      context.number = counter;
	    }
	    if (check) {
	      context.check = check;
	    }
	    if (hello) {
	      context.hello = hello;
	    }
	    cb(context);
	  },
	  error(sessionId, context, error) {
	    console.log(error.message);
	  }
	};

	self.client = new Wit(self.token, actions);
};

WitAI.prototype.runActions = function(str, callback) {
	var self = this;
	const session = 'robot-session-7688duo';
	const context = {};
	self.client.runActions(session, str, context, (error, data) => {
	  if (error) {
	    console.log('Oops! Got an error: ' + error);
			if (callback)
				callback(error, '', '');
	  } else {
			if (callback)
				callback(null, data, self.say);
	  }
	});
};
