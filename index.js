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
