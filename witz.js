var witz = (function() {
  "use strict"

  // # Witz
  // Helps produce glitch

  // Corrupt by recursively inserting random pick from base64
  // charset at random index along target string.
  const glitch = (lookup) => {
    const random = (peak = lookup.length) => Math.floor(Math.random() * peak)
    const filter = (data, turn) => {
      if (!turn) {
        return data
      }

      const mark = random(data.length)
      const seed = lookup.charAt(random())

      const crop = data.substring(0, mark) + seed + data.substring(mark + 1)

      return filter(crop, turn - 1)
    }

    return filter
  }

  function witz(options) {
    // Merge options and defaults.
    const { chars, depth } = Object.assign({
      // List of characters to choose from.
      // Source: https://tools.ietf.org/html/rfc4648#page-5
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",

      // Resolution, mutations per call.
      depth: 23,
    }, options)

    // Strap in.
    const filter = glitch(chars)

    // Expects and returns dataURL or plain base64 encoded string,
    // allows for overriding depth.
    return (target = "", N = depth) => {
      // Bypass.
      if (!N) {
        return target
      }

      // Extract data past the comma in dataURL if need be.
      const split = target.indexOf(",") + 1
      const scoop = target.slice(split)

      // Stitch up.
      return target.slice(0, split) + filter(scoop, N)
    }
  }

  return witz
})()
