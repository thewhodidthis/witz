(function () {
'use strict';

var canvas = document.querySelector('canvas');
var buffer = canvas.cloneNode();

var source = document.createElement('img');
var output = document.createElement('img');

var workerBlob = new Blob([document.getElementById('worker').textContent]);
var workerBlobUrl = (window.URL || window.webkitURL).createObjectURL(workerBlob);
var worker = new Worker(workerBlobUrl);

var reload = function reload() {
  document.location.reload(true);
};

if (window !== window.top) {
  document.documentElement.className.classList.add('is-iframe');
}

worker.addEventListener('message', function (e) {
  output.setAttribute('src', e.data.result);
});

output.addEventListener('load', function () {
  canvas.getContext('2d').drawImage(output, 0, 0);

  // DANGER! DANGER!
  // worker.postMessage({ source: canvas.toDataURL('image/jpeg', 0.01) });
});

source.addEventListener('load', function () {
  buffer.getContext('2d').drawImage(source, 0, 0);

  worker.postMessage({ source: buffer.toDataURL('image/jpeg', 0.5) });
});

source.setAttribute('src', 'master.png');

document.addEventListener('click', reload);
document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case 32:
      reload();
      break;
    default:
      break;
  }
});

}());
