## Witz
> Just another glitch factory

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/witz
```

### Usage
```js
const bender = require('@thewhodidthis/witz')

const source = document.createElement('img')
const target = document.createElement('img')
const buffer = document.createElement('canvas').getContext('2d')
const figure = { width: 640, height: 360 }

const canvas = Object.assign(buffer.canvas, figure)
const filter = bender({ chunks: 10 })

source.addEventListener('load', () => {
    buffer.drawImage(source, 0, 0)

    const data = canvas.toDataURL('image/jpeg', 0.01)

    // Filter accepts and returns a dataURL
    target.src = filter(data)
})

source.crossOrigin = 'anonymous'
source.src = `//source.unsplash.com/random/${figure.width}x${figure.height}`
```
