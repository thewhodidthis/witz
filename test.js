require('kpow')()

const test = require('tape')
const createFilter = require('./')

test('will operate', (t) => {
  const canvas = Object.assign(document.createElement('canvas'), { width: 10, height: 10 })
  const source = canvas.toDataURL('image/jpeg', 0.01)

  const filter = createFilter()
  const result = filter(source)

  t.equal(typeof filter, 'function', 'returns funtion on init')
  t.ok(result.indexOf('image/jpeg'), 'output type is a match')
  t.end()
})
