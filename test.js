const { ok, equal } = require('tapeless')
const createFilter = require('./')

const sample = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII='

const filter = createFilter()
const result = filter(sample)

equal(typeof filter, 'function', 'returns lambda on init', 'will operate')
ok(result, 'output type is a match')
