import assert from 'tapeless'
import createFilter from './main.js'

/* eslint max-len: 0 */
const sample = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII='

const { ok, equal } = assert
const filter = createFilter()
const result = filter(sample)

equal
  .describe('returns lambda on init')
  .test(typeof filter, 'function')

ok
  .describe('output type is a match')
  .test(result)
