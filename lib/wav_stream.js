"use strict";
var fs = require('fs');
var wav = require('wav');
var inherits = require('util').inherits;

module.exports = WriteStream;

function WriteStream(opts) {
  if (!(this instanceof WriteStream)) return new WriteStream(opts);
  wav.Writer.call(this, opts);
  this.on('header', this._onHeader);
}
inherits(WriteStream, wav.Writer);

WriteStream.prototype._onHeader = function (header) {
  var self = this, fd;

  function onOpen (err, f) {
    if (err) return self.emit('error', err);
    fd = f;
    fs.write(fd, header, 0, header.length, 0, onWrite);
  }

  function onWrite (err, bytesWritten) {
    if (err) return self.emit('error', err);
    if (bytesWritten != header.length) {
      return self.emit('error', new Error('problem writing "header" data'));
    }
    fs.close(fd, onClose);
  }

  function onClose (err) {
    if (err) return self.emit('error', err);
    self.emit('done');
  }
};
