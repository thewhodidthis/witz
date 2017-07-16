'use strict';

// Yer standard limit up pseudo random `int` util
var rand = function (max) { return function () { return Math.floor(Math.random() * max); }; };

var Witz = function (options) {
  // Avoid default params for now
  var ref = Object.assign({
    // List of characters to choose from
    chars: '.!()ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+-',

    // Split into how many chunks?
    count: 23
  }, options);
  var chars = ref.chars;
  var count = ref.count;

  var sample = chars.split('');
  var random = rand(sample.length);

  // Expects and returns `dataURL` like string,
  // count override allowed
  return function (dataUrl, splits) {
    if ( splits === void 0 ) splits = count;

    // Just in case
    var source = (dataUrl && dataUrl.toString()) || '';

    // Separate mime and data parts
    var ref = source.split(',');
    var mimeType = ref[0];
    var sourceB64 = ref[1];

    // Decode data string
    var input = atob(sourceB64);

    // Calculate chunk size
    var inputW = input.length;
    var chunkW = parseInt(inputW / Math.max(splits, 1), 10);

    // Chunk data
    var chunks = [];

    for (var i = 0; i < inputW; i += chunkW) {
      chunks.push(input.substring(i, i + chunkW));
    }

    // Loop through chunks
    for (var j = 0; j < splits; j += 1) {
      // For looking up chars to replace
      var seed0 = random();
      var seed1 = random();

      // Witz :))
      var seed2 = seed0 !== seed1 ? seed1 : 9;

      // Swap
      chunks[j] = chunks[j].replace(sample[seed0], sample[seed2]);
    }

    // Stitch
    var result = chunks.join('');

    // Encode
    var resultB64 = btoa(result);

    // Prepend original media type
    return (mimeType + "," + resultB64)
  }
};

module.exports = Witz;

