const DATAFILE = '../data/0201.js'
const FILE = '../src/0201.js'
const data = require(DATAFILE)
const computer = require(FILE)
const describe = require('./tap')

describe('test', assert => {
  assert({
    given: 'program input',
    should: 'give the right answer',
    actual: computer(data)(12, 2),
    expected: 9581917,
  })
})
