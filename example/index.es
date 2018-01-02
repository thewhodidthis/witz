const boards = document.querySelectorAll('canvas')
const images = document.querySelectorAll('img')

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe')
}

const halfPI = Math.PI * 0.5
const params = [
  { depth: 0 },
  { up: true },
  { depth: 9 }
]

Array.from(images).map(img => img.alt).forEach((src, i) => {
  const config = params[i % params.length]
  const canvas = boards[i]

  const target = canvas.getContext('2d')
  const buffer = canvas.cloneNode().getContext('2d')

  const master = document.createElement('img')
  const output = document.createElement('img')

  const worker = new Worker('worker.js')

  const update = () => {
    // Works best with JPG images
    const source = buffer.canvas.toDataURL('image/jpeg', 0.5)

    worker.postMessage({ config, source })
  }

  // This needs fixing, fires more times than expected
  worker.addEventListener('message', (e) => {
    output.setAttribute('src', e.data.result)
  })

  output.addEventListener('load', () => {
    target.save()

    // Only rotate glitch versions
    if (config.up) {
      target.translate(0, canvas.height)
      target.rotate(-halfPI)
    }

    target.drawImage(output, 0, 0)
    target.restore()
  })

  // Avoid drawing blanks
  output.addEventListener('error', () => {
    // Try again
    update()
  })

  master.addEventListener('load', () => {
    if (config.up) {
      buffer.rotate(halfPI)
      buffer.translate(0, -canvas.height)
    }

    buffer.drawImage(master, 0, 0)
    update()
  })

  master.setAttribute('src', src)
})
