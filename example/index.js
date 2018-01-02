(function () {
'use strict';

var boards = document.querySelectorAll('canvas');
var images = document.querySelectorAll('img');

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe');
}

var halfPI = Math.PI * 0.5;
var params = [
  { depth: 0 },
  { up: true },
  { depth: 9 }
];

Array.from(images).map(function (img) { return img.alt; }).forEach(function (src, i) {
  var config = params[i % params.length];
  var canvas = boards[i];

  var target = canvas.getContext('2d');
  var buffer = canvas.cloneNode().getContext('2d');

  var master = document.createElement('img');
  var output = document.createElement('img');

  var worker = new Worker('worker.js');

  var update = function () {
    // Works best with JPG images
    var source = buffer.canvas.toDataURL('image/jpeg', 0.5);

    worker.postMessage({ config: config, source: source });
  };

  // This needs fixing, fires more times than expected
  worker.addEventListener('message', function (e) {
    output.setAttribute('src', e.data.result);
  });

  output.addEventListener('load', function () {
    target.save();

    // Only rotate glitch versions
    if (config.up) {
      target.translate(0, canvas.height);
      target.rotate(-halfPI);
    }

    target.drawImage(output, 0, 0);
    target.restore();
  });

  // Avoid drawing blanks
  output.addEventListener('error', function () {
    // Try again
    update();
  });

  master.addEventListener('load', function () {
    if (config.up) {
      buffer.rotate(halfPI);
      buffer.translate(0, -canvas.height);
    }

    buffer.drawImage(master, 0, 0);
    update();
  });

  master.setAttribute('src', src);
});

}());

