'use strict';

var html = document.documentElement;
var output = document.createElement('img');
var source = document.createElement('img');
var target = document.getElementById('canvas').getContext('2d');

// Yes the id attribute is the same as that of master but buffer is orphan at this point
var buffer = target.canvas.cloneNode();

var workerBlob = new Blob([document.getElementById('worker').textContent]);
var workerBlobUrl = (window.URL || window.webkitURL).createObjectURL(workerBlob);

var worker = new Worker(workerBlobUrl);

html.className = 'html';

// Apply different styles when loaded inside of an iframe
if (window !== window.top) {
  html.className += ' is-iframe';
}

worker.addEventListener('message', function _onDoneProcessing(e) {
  output.setAttribute('src', e.data.result);
}, false);

output.addEventListener('load', function _onOutputLoaded(e) {
  target.drawImage(output, 0, 0);

  // DANGER! DANGER!
  // worker.postMessage({
  //   input: target.canvas.toDataURL('image/jpeg', 0.01)
  // });
}, false);

source.addEventListener('load', function _onInputLoaded(e) {
  buffer.getContext('2d').drawImage(source, 0, 0);

  worker.postMessage({
    input: buffer.toDataURL('image/jpeg', 0.01)
  });
}, false);

source.setAttribute('src', '/sprite.png');
