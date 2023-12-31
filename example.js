const settings = [
  { up: true },
  { depth: 9 },
]

const boards = document.querySelectorAll("canvas")
const upward = Math.PI * 0.5

Array.from(boards).forEach((canvas, i) => {
  const depth = i & 1 === 1 ? 9 : 21
  const up = i % 2 === 0

  const target = canvas.getContext("2d")
  const buffer = canvas.cloneNode().getContext("2d")

  const master = document.createElement("img")
  const output = document.createElement("img")

  const worker = new Worker("worker.js")

  worker.addEventListener("message", ({ data }) => {
    const blob = new Blob([data])
    const src = URL.createObjectURL(blob)

    output.setAttribute("src", src)
  })

  // Avoid drawing blanks.
  output.addEventListener("error", () => {
    // Try again.
    master.setAttribute("src", canvas.dataset.src)
  })

  output.addEventListener("load", () => {
    target.save()

    // Only rotate glitch versions.
    if (up) {
      target.translate(0, canvas.height)
      target.rotate(-upward)
    }

    target.drawImage(output, 0, 0)
    target.restore()

    URL.revokeObjectURL(output.src)
  })

  master.addEventListener("load", () => {
    if (up) {
      buffer.rotate(upward)
      buffer.translate(0, -canvas.height)
    }

    buffer.drawImage(master, 0, 0)
    buffer.canvas.toBlob((blob) => {
      blob.arrayBuffer().then((b) => {
        worker.postMessage({ input: new Uint8Array(b), depth })
      })
    }, "image/jpeg")
  })

  master.setAttribute("src", canvas.dataset.src)
})
