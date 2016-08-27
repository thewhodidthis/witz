(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Witz = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function Witz(options) {

  // Store settings
  for (var key in Witz.defaults) {
    this[key] = (options && options[key]) || Witz.defaults[key];
  }
}

Witz.prototype = {
  constructor: Witz,

  that: function (dataURL) {

    // Swap these around in raw image data
    var chars = this.chars.split('');

    // For splitting data into chunks
    var chunks = [];
    var chunksTotal = this.chunks;
    var chunkLength = 0;

    // Cleanup dataURL
    // Leave out the 'data:<mediatype>' and ';base64,' parts
    var regxp = /(.*)base64,/;
    var dataType = '';

    var data = dataURL.replace(regxp, function (match) {
      dataType = match;

      return '';
    });

    // Unencode
    data = atob(data);

    // Set length of each chunk
    chunkLength = parseInt((data.length - 1) / chunksTotal, 10);

    // Do chunk
    for (var i = 0, stop = data.length; i < stop; i += chunkLength) {
      chunks.push(data.substring(i, i + chunkLength));
    }

    // Loop through chunks
    for (var i = 1; i <= chunksTotal; i += 1) {

      // Create random numbers for selection of the glitch characters
      var char1 = Math.floor((Math.random() * chars.length));
      var char2 = Math.floor((Math.random() * chars.length));

      if (char2 === char1) {

        // Witz :))
        char2 = '9';
      }

      chunks[i] = chunks[i].replace(chars[char1], chars[char2]);
    }

    // Stitch everything back together
    data = chunks.join('');
    data = btoa(data);
    data = dataType + data;

    return data;
  }
};

Witz.defaults = {

  // List of characters to choose from
  chars: '.!()ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+-',

  // Split into how many chunks?
  chunks: 23
};

module.exports = Witz;

},{}]},{},[1])(1)
});