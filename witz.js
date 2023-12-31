var witz = (function() {
  "use strict"

  // # Witz
  // Helps produce glitch

  // Expects and returns an array buffer.
  function witz(input = new Uint8Array(), depth = 23) {
    // Figure out JPEG header length.
    if (input.at(0) !== 0xff || input.at(1) !== 0xd8) {
      throw new Error("Not a JPEG image.")
    }

    let offset = 417

    for (let i = 0, m = input.length; i < m; i += 1) {
      if (input.at(i) === 0xff && input.at(i + 1) === 0xda) {
        offset = 2 + i

        break
      }
    }

    return (seed) => {
      const next = Uint8Array.from(input)
      const rand = random(seed)

      for (let i = 0; i < depth; i += 1) {
        const j = rand(offset, next.length - offset - 4)

        next[j] = 0
      }

      return next
    }
  }

  function random(s = Math.random()) {
    return (a, b) => {
      const h = b === undefined ? a : b
      const l = b === undefined ? 0 : a

      return Math.floor((s += 1) && (((s * 15485863 ** 3 % 2038074743) / 2038074743) * (h - l)) + l)
    }
  }

  return witz
})()
