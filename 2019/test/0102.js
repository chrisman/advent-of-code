const DATAFILE = '../data/0102.js'
const FILE = '../src/0102.js'
const describe = require('./tap')
const data = require(DATAFILE)
const total = require(FILE)

describe('total', assert => {
  const tests = [
    {
      a: [14],
      e: 2,
    },
    {
      a: [1969],
      e: 966,
    },
    {
      a: [100756],
      e: 50346,
    },
  ]
  tests.forEach(t => {
    assert({
      given: 'a masses',
      should: 'return the right amount of fuel',
      actual: total(t.a),
      expected: t.e,
    })
  })

  assert({
    given: 'problem data',
    should: 'give the right answer',
    actual: total(data),
    expected: 4978360,
  })
})
