'use strict';

var html = document.documentElement;

var canvas = document.getElementById('canvas');

// Yes the id attribute is the same as that of master but buffer is orphan at this point
var buffer = canvas.cloneNode();

var source = document.createElement('img');
var output = document.createElement('img');

var workerBlob = new Blob([document.getElementById('worker').textContent]);
var workerBlobUrl = (window.URL || window.webkitURL).createObjectURL(workerBlob);

var worker = new Worker(workerBlobUrl);

html.className = 'html';

if (window !== window.top) {
  html.className += ' is-iframe';
}

worker.addEventListener('message', function _onDoneProcessing(e) {
  output.setAttribute('src', e.data.result);
}, false);

output.addEventListener('load', function _onOutputLoaded(e) {
  canvas.getContext('2d').drawImage(output, 0, 0);

  // DANGER! DANGER!
  // worker.postMessage({
  //   input: canvas.toDataURL('image/jpeg', 0.01)
  // });
}, false);

source.addEventListener('load', function _onInputLoaded(e) {
  buffer.getContext('2d').drawImage(source, 0, 0);

  worker.postMessage({
    input: buffer.toDataURL('image/jpeg', 0.01)
  });
}, false);

source.setAttribute('src', '/sprite.png');
