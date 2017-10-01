(function () {
'use strict';

var boards = document.querySelectorAll('canvas');
var images = document.querySelectorAll('img');

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe');
}

var params = [
  { count: 0 },
  { up: true },
  { count: 9 }
];

Array.from(images).map(function (img) { return img.alt; }).forEach(function (file, i) {
  var config = params[i % params.length];

  var canvas = boards[i];
  var master = canvas.getContext('2d');
  var buffer = canvas.cloneNode().getContext('2d');

  var source = document.createElement('img');
  var output = document.createElement('img');
  var worker = new Worker('worker.js');

  worker.addEventListener('message', function (e) {
    output.setAttribute('src', e.data.result);
  });

  output.addEventListener('load', function () {
    master.save();

    // Only rotate glitch versions
    if (config.up && output.src.indexOf('data') >= 0) {
      master.translate(0, canvas.height);
      master.rotate(-Math.PI * 0.5);
    }

    master.drawImage(output, 0, 0);
    master.restore();
  });

  // Because iOS may struggle at times,
  // avoid drawing blanks this way
  output.setAttribute('src', file);

  source.addEventListener('load', function () {
    var angle = config.up ? Math.PI * 0.5 : 0;
    var shift = config.up ? -1 * canvas.height : 0;

    buffer.rotate(angle);
    buffer.drawImage(source, 0, shift);
    worker.postMessage({ config: config, source: buffer.canvas.toDataURL('image/jpeg', 0.5) });
  });

  source.setAttribute('src', file);
});

}());

