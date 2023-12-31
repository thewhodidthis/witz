## about

Blindly corrupts JPEG images.

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

Expects and returns `Uint8Array` data, can be seeded for replicable results, is Web Worker, Node.js, and Deno compatible.

```js
import witz from "@thewhodidthis/witz"
import fs from "fs"

fs.readFile("./4.2.02.jpg", (error, input) => {
  if (error) {
    throw error
  }

  const s = Date.now()
  const result = witz(input)(s)
  const b = Buffer.from(result, "base64")

  fs.writeFile(`./4.2.02-${s}.jpg`, b, (error) => {
    if (error) {
      throw error
    }

    console.log("Done!")
  })
})
```

## see also

- [ImageGlitcher](https://www.airtightinteractive.com/2011/02/glitch-your-images-with-imageglitcher/)
- [glitch-canvas](https://github.com/snorpey/glitch-canvas)
