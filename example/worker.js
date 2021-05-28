importScripts('witz.js')

self.addEventListener('message', (e) => {
  const filter = witz.default(e.data.config)

  self.postMessage({
    result: filter(e.data.source)
  })
})
