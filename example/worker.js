importScripts('witz.js');

self.addEventListener('message', function (e) {
  var filter = witz(e.data.config);

  self.postMessage({ result: filter(e.data.source) });
});
