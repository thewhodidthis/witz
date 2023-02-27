## about

Blindly corrupts images in string form.

## setup

Load via script tag:

```html
<!-- Just an IIFE namespaced `witz` -->
<script src="https://thewhodidthis.github.io/witz/witz.js"></script>
```

Source from an import map:

```json
{
  "imports": {
    "@thewhodidthis/witz": "https://thewhodidthis.github.io/witz/main.js"
  }
}
```

Download from GitHub directly if using a package manager:

```sh
# Add to package.json
pnpm install thewhodidthis/witz
```

## usage

Works with [Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) or plain [`base64`](https://www.gnu.org/software/coreutils/manual/html_node/base64-invocation.html#base64-invocation) encoded strings and is Web Worker and Node.js compatible.
```js
import witz from "@thewhodidthis/witz"
import fs from "fs"

const pimp = witz()
const save = (data, file = "./target.jpg") =>
  fs.writeFile(file, data, (error) => {
    if (error) {
      throw error
    }

    console.log("Done!")
  })

fs.readFile("./source.jpg", (error, data) => {
  if (error) {
    throw error
  }

  const master = Buffer(data).toString("base64")
  const sample = pimp(master)
  const result = Buffer.from(sample, "base64")

  save(result)
})
```

## see also

- [ImageGlitcher](https://www.airtightinteractive.com/2011/02/glitch-your-images-with-imageglitcher/)
- [glitch-canvas](https://github.com/snorpey/glitch-canvas)
