const DATAFILE = '../data/0202.js'
const FILE = '../src/0202.js'
const data = require(DATAFILE)
const thing = require(FILE)
const describe = require('./tap')

describe('test', assert => {
  assert({
    given: 'program input',
    should: 'give the right answer',
    actual: thing(data),
    expected: 2505,
  })
})
