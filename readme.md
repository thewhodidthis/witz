## Witz
![Screenshot](/screenshot.jpg?raw=true "Screenshot")

### Setup
```sh
# Install from github
npm install thewhodidthis/witz
```

### Usage
Should work on your latest major browsers.
```js
// Require like so if using browserify
var Witz = require('@thewhodidthis/witz');

var source = document.createElement('img');
var target = document.createElement('img');
var buffer = document.createElement('canvas').getContext('2d');

var filter = new Witz({
	chunks: 10
});

buffer.canvas.width = 640;
buffer.canvas.height = 360;

source.addEventListener('load', function _onImageReady(e) {
	buffer.drawImage(source, 0, 0);

	// Filter accepts and returns a dataURL
	target.src = filter.that(buffer.canvas.toDataURL('image/jpeg', 0.01));
}, false);

source.setAttribute('crossOrigin', 'anonymous');
source.setAttribute('src', '//source.unsplash.com/random/640x360');
```
Try the example for typical use case using web workers.
```sh
# Symlink freshly built standalone module into example folder
# Start a php server on port 8000
npm run example

# Open using default browser
open http://localhost:8000
```

### More
- [r/glitch_art](https://www.reddit.com/r/glitch_art/ "Glitch art subreddit")
- [gli.tc/h](http://gli.tc/h/)
