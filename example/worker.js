importScripts('witz.js');

self.addEventListener('message', (e) => {
  const filter = Witz();

  self.postMessage({ result: filter(e.data.source) });
});
