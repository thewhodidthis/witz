importScripts('witz.js');

self.addEventListener('message', function (e) {
  const filter = Witz();

  self.postMessage({ result: filter(e.data.source) });
});
