var Witz = (function () {
'use strict';

var Witz = function Witz(options) {
  var settings = Object.assign({
    // List of characters to choose from
    chars: '.!()ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+-',

    // Split into how many chunks?
    chunks: 23
  }, options);

  return function (source) {
    var dataUrl = source && source.toString() || '';

    // For splitting data into chunks
    var chunks = [];
    var chunksTotal = settings.chunks;

    // Swap these around in raw image data
    var chars = settings.chars.split('');

    // Separate mime type and data
    var dataUrlParts = dataUrl.split(',');

    // Mime type
    var dataUrlType = dataUrlParts[0];

    // Data part
    var dataUrlData = dataUrlParts[1];

    // Decode input data
    var data = atob(dataUrlData);

    // Get input data size
    var dataSize = data.length;

    // Set chunk size
    var chunkSize = parseInt(dataSize / chunksTotal, 10);

    // Chunk the data
    for (var i = 0; i < dataSize; i += chunkSize) {
      chunks.push(data.substring(i, i + chunkSize));
    }

    // Loop through chunks, leaving out the leading part
    for (var _i = 1; _i <= chunksTotal; _i += 1) {
      // Create random indices for selection of the glitch characters
      var char1 = Math.floor(Math.random() * chars.length);
      var char2 = Math.floor(Math.random() * chars.length);

      if (char2 === char1) {
        // Witz :))
        char2 = '9';
      }

      chunks[_i] = chunks[_i].replace(chars[char1], chars[char2]);
    }

    // Stitch everything back together
    data = chunks.join('');

    // Re-base64-encode
    dataUrlData = btoa(data);

    // Add mime type, replace input dataURL
    dataUrl = dataUrlType + ',' + dataUrlData;

    return dataUrl;
  };
};

return Witz;

}());
