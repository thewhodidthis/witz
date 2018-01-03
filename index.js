'use strict';

// # Witz
// Helps produce glitch

// Corrupt by recursively inserting random pick from base64
// charset at random index along target string
var glitch = function (lookup) {
  var random = function (peak) {
    if ( peak === void 0 ) peak = lookup.length;

    return Math.floor(Math.random() * peak);
  };
  var filter = function (data, turn) {
    if (!turn) {
      return data
    }

    var seed = random(data.length);
    var pick = random();
    var sign = lookup.charAt(pick);

    var crop = data.substring(0, seed) + sign + data.substring(seed + 1);

    return filter(crop, turn - 1)
  };

  return filter
};

var witz = function (options) {
  // Merge options and defaults
  var ref = Object.assign({
    // List of characters to choose from
    // Source: https://tools.ietf.org/html/rfc4648#page-5
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

    // Split into how many parts when processing? (ie. resolution)
    depth: 23
  }, options);
  var chars = ref.chars;
  var depth = ref.depth;

  // Strap in
  var filter = glitch(chars);

  // Expects and returns dataURL or plain base64 encoded string,
  // allows for overriding depth
  return function (source, N) {
    if ( source === void 0 ) source = '';
    if ( N === void 0 ) N = depth;

    // Bypass
    if (!N) {
      return source
    }

    // Extract data past the comma in dataURL if need be
    var split = source.indexOf(',') + 1;
    var scoop = source.slice(split);

    // Stitch up
    return source.slice(0, split) + filter(scoop, N)
  }
};

module.exports = witz;

