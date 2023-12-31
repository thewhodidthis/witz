importScripts("./witz.js")

addEventListener("message", ({ data }) => {
  const filter = witz(data.input, data.depth)

  postMessage(filter())
})
