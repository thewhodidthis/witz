const Witz = (options) => {
  const settings = Object.assign({
    // List of characters to choose from
    chars: '.!()ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+-',

    // Split into how many chunks?
    chunks: 23,
  }, options);

  // Expects and returns data urls
  return (source) => {
    let dataUrl = (source && source.toString()) || '';

    // For splitting data into chunks
    const chunks = [];
    const chunksTotal = settings.chunks;

    // Swap these around in raw image data
    const chars = settings.chars.split('');

    // Separate mime type and data
    const dataUrlParts = dataUrl.split(',');

    // Mime type
    const dataUrlType = dataUrlParts[0];

    // Data part
    let dataUrlData = dataUrlParts[1];

    // Decode input data
    let data = atob(dataUrlData);

    // Get input data size
    const dataSize = data.length;

    // Set chunk size
    const chunkSize = parseInt(dataSize / chunksTotal, 10);

    // Chunk the data
    for (let i = 0; i < dataSize; i += chunkSize) {
      chunks.push(data.substring(i, i + chunkSize));
    }

    // Loop through chunks
    for (let j = 0; j < chunksTotal; j += 1) {
      // Create random indices for selection of the glitch characters
      const char1 = Math.floor((Math.random() * chars.length));
      let char2 = Math.floor((Math.random() * chars.length));

      if (char2 === char1) {
        // Witz :))
        char2 = '9';
      }

      chunks[j] = chunks[j].replace(chars[char1], chars[char2]);
    }

    // Stitch everything back together
    data = chunks.join('');

    // Re-base64-encode
    dataUrlData = btoa(data);

    // Add mime type, replace input dataURL
    dataUrl = `${dataUrlType},${dataUrlData}`;

    return dataUrl;
  };
};

export default Witz;

