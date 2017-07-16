// Yer standard limit up pseudo random `int` util
const rand = max => () => Math.floor(Math.random() * max)

const Witz = (options) => {
  // Avoid default params for now
  const { chars, count } = Object.assign({
    // List of characters to choose from
    chars: '.!()ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+-',

    // Split into how many chunks?
    count: 23
  }, options)

  const sample = chars.split('')
  const random = rand(sample.length)

  // Expects and returns `dataURL` like string,
  // count override allowed
  return (dataUrl, splits = count) => {
    // Just in case
    const source = (dataUrl && dataUrl.toString()) || ''

    // Separate mime and data parts
    const [mimeType, sourceB64] = source.split(',')

    // Decode data string
    const input = atob(sourceB64)

    // Calculate chunk size
    const inputW = input.length
    const chunkW = parseInt(inputW / Math.max(splits, 1), 10)

    // Chunk data
    const chunks = []

    for (let i = 0; i < inputW; i += chunkW) {
      chunks.push(input.substring(i, i + chunkW))
    }

    // Loop through chunks
    for (let j = 0; j < splits; j += 1) {
      // For looking up chars to replace
      const seed0 = random()
      const seed1 = random()

      // Witz :))
      const seed2 = seed0 !== seed1 ? seed1 : 9

      // Swap
      chunks[j] = chunks[j].replace(sample[seed0], sample[seed2])
    }

    // Stitch
    const result = chunks.join('')

    // Encode
    const resultB64 = btoa(result)

    // Prepend original media type
    return `${mimeType},${resultB64}`
  }
}

export default Witz
