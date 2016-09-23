'use strict';

var html = document.documentElement;

var canvas = document.getElementById('canvas');
var buffer = canvas.cloneNode();
var master = document.createElement('img');
var output = document.createElement('img');

var workerBlob = new Blob([document.getElementById('worker').textContent], {
  type: 'text/javascript'
});
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

master.addEventListener('load', function _onInputLoaded(e) {
  buffer.getContext('2d').drawImage(master, 0, 0);

  worker.postMessage({
    url: document.location.toString(),
    input: buffer.toDataURL('image/jpeg', 0.5)
  });
}, false);

master.setAttribute('src', 'master.png');

document.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 32:
      document.location.reload(true);
      break;
  }
}, false);
