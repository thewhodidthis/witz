(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Witz = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Helps produce glitch
 * @constructor
 * @param {Object} settings - split into how many chunks, list characters to choose from
 */
function Witz(options) {
  var defaults = Object.create(Witz.defaults);

  // Store settings
  for (var key in defaults) {

    // TODO: Rewrite maybe?
    this[key] = (options && options[key]) || defaults[key];
  }
}

Witz.prototype = {
  constructor: Witz,

  /**
  * Do glitch
  * @param {String} dataURL - input base64 encoded image source
  * @return {String} dataURL - output base64 encoded image source
  */
  that: function (dataURL) {

    // For splitting data into chunks
    var chunks = [];
    var chunksTotal = this.chunks;

    // Swap these around in raw image data
    var chars = this.chars.split('');

    // Separate mime type and data
    var dataParts = dataURL.split(',');

    // Mime type
    var dataType = dataParts[0];

    // Data part
    var dataData = dataParts[1];

    // Decode input data
    var data = atob(dataData);

    // Get input data size
    var dataSize = data.length;

    // Set chunk size
    var chunkSize = parseInt(dataSize / chunksTotal, 10);

    // Chunk the data
    for (var i = 0; i < dataSize; i += chunkSize) {
      chunks.push(data.substring(i, i + chunkSize));
    }

    // Loop through chunks, leaving out the leading part
    for (var i = 1; i <= chunksTotal; i += 1) {

      // Create random indices for selection of the glitch characters
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

    // Re-base64-encode
    dataData = btoa(data);

    // Add mime type, replace input dataURL
    dataURL = dataType + ',' + dataData;

    return dataURL;
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