const boards = document.querySelectorAll('canvas')
const images = document.querySelectorAll('img')

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe')
}

const params = [
  { count: 0 },
  { up: true },
  { count: 9 }
]

Array.from(images).map(img => img.alt).forEach((file, i) => {
  const config = params[i % params.length]

  const canvas = boards[i]
  const master = canvas.getContext('2d')
  const buffer = canvas.cloneNode().getContext('2d')

  const source = document.createElement('img')
  const output = document.createElement('img')
  const worker = new Worker('worker.js')

  worker.addEventListener('message', (e) => {
    output.setAttribute('src', e.data.result)
  })

  output.addEventListener('load', () => {
    master.save()

    // Only rotate glitch versions
    if (config.up && output.src.indexOf('data') >= 0) {
      master.translate(0, canvas.height)
      master.rotate(-Math.PI * 0.5)
    }

    master.drawImage(output, 0, 0)
    master.restore()
  })

  // Because iOS may struggle at times,
  // avoid drawing blanks this way
  output.setAttribute('src', file)

  source.addEventListener('load', () => {
    const angle = config.up ? Math.PI * 0.5 : 0
    const shift = config.up ? -1 * canvas.height : 0

    buffer.rotate(angle)
    buffer.drawImage(source, 0, shift)
    worker.postMessage({ config, source: buffer.canvas.toDataURL('image/jpeg', 0.5) })
  })

  source.setAttribute('src', file)
})
