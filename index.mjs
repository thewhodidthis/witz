// # Witz
// Helps produce glitch

// Corrupt by recursively inserting random pick from base64 character
// lookup at random index along target string
const glitch = (lookup) => {
  const random = (peak = lookup.length) => Math.floor(Math.random() * peak)
  const filter = (data, turn) => {
    if (!turn) {
      return data
    }

    const seed = random(data.length)
    const pick = random()
    const sign = lookup[pick]

    const crop = data.substring(0, seed) + sign + data.substring(seed + 1)

    return filter(crop, turn - 1)
  }

  return filter
}

const witz = (options) => {
  // Merge options and defaults
  const { chars, depth } = Object.assign({
    // List of characters to choose from
    // Source: https://tools.ietf.org/html/rfc4648#page-5
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

    // Split into how many parts when processing? (ie. resolution)
    depth: 23
  }, options)

  // Strap in
  const filter = glitch(chars.split(''))

  // Expects and returns dataURL or plain base64 encoded string,
  // allows for overriding depth
  return (source = '', N = depth) => {
    // Bypass
    if (!N) {
      return source
    }

    // Extract data past the comma in dataURL if need be
    const split = source.indexOf(',') + 1
    const scoop = source.slice(split)

    // Stitch up
    return source.slice(0, split) + filter(scoop, N)
  }
}

export default witz
