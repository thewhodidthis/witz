## Witz
> Just another glitch factory

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/witz
```

### Usage
```js
import bender from '@thewhodidthis/witz'

const source = document.createElement('img')
const target = document.createElement('img')
const buffer = document.createElement('canvas').getContext('2d')

const canvas = Object.assign(buffer.canvas, { width: 180, height: 180 })

const filter = bender({ chunks: 10 })

source.addEventListener('load', () => {
    buffer.drawImage(source, 0, 0)

    const lookup = canvas.toDataURL('image/jpeg', 0.01)
    const result = filter(lookup)

    target.setAttribute('src', result)
})

source.setAttribute('crossOrigin', 'anonymous')
source.setAttribute('src', `//source.unsplash.com/random/${canvas.width}x${canvas.height}`)
```
