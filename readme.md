## Witz
> Just another glitch factory

### Setup
```sh
# Install from github
npm install thewhodidthis/witz
```

### Usage
Should work on your latest major browsers.
```js
var createFilter = require('@thewhodidthis/witz');

var source = document.createElement('img');
var target = document.createElement('img');
var buffer = document.createElement('canvas').getContext('2d');

var filter = createFilter({ chunks: 10 });

buffer.canvas.width = 640;
buffer.canvas.height = 360;

source.addEventListener('load', function _onImageReady(e) {
    buffer.drawImage(source, 0, 0);

    // Filter accepts and returns a dataURL
    target.src = filter(buffer.canvas.toDataURL('image/jpeg', 0.01));
}, false);

source.setAttribute('crossOrigin', 'anonymous');
source.setAttribute('src', '//source.unsplash.com/random/640x360');
```
Try the example for typical use case using web workers.
```sh
# Run script from within package folder
npm run example
```
