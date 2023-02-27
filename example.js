const upward = Math.PI * 0.5
const settings = [
  { up: true },
  { depth: 9 },
]

const boards = document.querySelectorAll("canvas")

Array.from(boards).forEach((canvas, i) => {
  const config = settings[i % settings.length]

  const target = canvas.getContext("2d")
  const buffer = canvas.cloneNode().getContext("2d")

  const master = document.createElement("img")
  const output = document.createElement("img")

  const worker = new Worker("worker.js")
  const update = () => {
    // Works best with JPG images.
    const source = buffer.canvas.toDataURL("image/jpeg", 0.5)

    worker.postMessage({ config, source })
  }

  worker.addEventListener("message", ({ data }) => {
    output.setAttribute("src", data.result)
  })

  // Avoid drawing blanks.
  output.addEventListener("error", () => {
    // Try again.
    update()
  })

  output.addEventListener("load", () => {
    target.save()

    // Only rotate glitch versions.
    if (config.up) {
      target.translate(0, canvas.height)
      target.rotate(-upward)
    }

    target.drawImage(output, 0, 0)
    target.restore()
  })

  master.addEventListener("load", () => {
    if (config.up) {
      buffer.rotate(upward)
      buffer.translate(0, -canvas.height)
    }

    buffer.drawImage(master, 0, 0)
    update()
  })

  master.setAttribute("src", canvas.dataset.src)
})
