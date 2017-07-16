const master = document.querySelector('canvas').getContext('2d')
const buffer = master.canvas.cloneNode()

const source = document.createElement('img')
const output = document.createElement('img')
const worker = new Worker('worker.js')

const reload = () => {
  document.location.reload()
}

if (window !== window.top) {
  document.documentElement.className.classList.add('is-iframe')
}

worker.addEventListener('message', (e) => {
  output.setAttribute('src', e.data.result)
})

output.addEventListener('load', () => {
  master.drawImage(output, 0, 0)

  // DANGER! DANGER!
  // worker.postMessage({ source: master.canvas.toDataURL('image/jpeg', 0.01) });
})

source.addEventListener('load', () => {
  buffer.getContext('2d').drawImage(source, 0, 0)
  worker.postMessage({ source: buffer.toDataURL('image/jpeg', 0.5) })
})

source.setAttribute('src', 'master.png')

// Because iOS may struggle at times,
// avoid drawing blanks this way
output.setAttribute('src', 'master.png')

document.addEventListener('touchstart', reload)
document.addEventListener('mousedown', reload)
document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
  case 32:
    reload()
    break
  default:
    break
  }
})
