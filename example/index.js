'use strict';

var html = document.documentElement;
var output = document.createElement('img');
var source = document.createElement('img');
var target = document.getElementById('canvas').getContext('2d');

// Yes the id attribute is the same as that of master but buffer is orphan at this point
var buffer = target.canvas.cloneNode();

var blob = new Blob([document.getElementById('worker').textContent]);
var blobURL = window.URL.createObjectURL(blob);

var worker = new Worker(blobURL);

html.className = 'html';

// Apply different styles when loaded inside of an iframe
if (window !== window.top) {
  html.classList.add('is-iframe');
}

worker.addEventListener('message', function _onDoneProcessing(e) {
  output.src = e.data.result;
}, false);

source.src = '/sprite.png';

source.addEventListener('load', function _onOriginalLoaded(e) {
  buffer.getContext('2d').drawImage(source, 0, 0);

  worker.postMessage({
    input: buffer.toDataURL('image/jpeg', 0.01)
  });
}, false);

output.addEventListener('load', function _onFilteredLoaded(e) {
  target.drawImage(output, 0, 0);

  // DANGER! DANGER!
  // worker.postMessage({
  //   input: target.canvas.toDataURL('image/jpeg', 0.01)
  // });
}, false);
