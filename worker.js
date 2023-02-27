importScripts("./witz.js")

self.addEventListener("message", ({ data }) => {
  const filter = witz(data.config)

  self.postMessage({ result: filter(data.source) })
})
