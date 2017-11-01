import 'cutaway'
import { assert, report } from 'tapeless'
import createFilter from './index.es'

const { ok, equal } = assert

const canvas = Object.assign(document.createElement('canvas'), { width: 10, height: 10 })
const source = canvas.toDataURL('image/jpeg', 0.01)

const filter = createFilter()
const result = filter(source)

equal(typeof filter, 'function', 'returns funtion on init', 'will operate')
ok(result.indexOf('image/jpeg'), 'output type is a match')

report()
