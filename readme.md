## Witz
> Just another glitch factory

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/witz
```

### Usage
```js
import filter from '@thewhodidthis/witz'

const source = document.createElement('img')
const target = document.createElement('img')
const buffer = document.createElement('canvas').getContext('2d')

const canvas = Object.assign(buffer.canvas, { width: 640, height: 360 })
const output = filter({ chunks: 10 })

source.addEventListener('load', function _onImageReady(e) {
    buffer.drawImage(source, 0, 0)

    // Filter accepts and returns a dataURL
    target.src = output(canvas.toDataURL('image/jpeg', 0.01))
}, false)

source.setAttribute('crossOrigin', 'anonymous')
source.setAttribute('src', '//source.unsplash.com/random/640x360')
```
