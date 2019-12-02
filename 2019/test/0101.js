const DATAFILE = '../data/0101.js'
const FILE = '../src/0101.js'
const describe = require('./tap')
const data = require(DATAFILE)
const {
  main,
  fuelRequiredByMass,
} = require(FILE)

describe('fuelRequiredByMass', assert => {
  const expectations = {
    12: 2,
    14: 2,
    1969: 654,
    100756: 33583,
  }
  Object.keys(expectations).forEach(k => {
    assert({
      given: `a mass of ${k}`,
      should: 'return the correct amount of fuel',
      actual: fuelRequiredByMass(k),
      expected: expectations[k],
    })
  });
})

describe('main', assert => {
  const testdata = [ 12, 14, 1969, 100756 ]

  assert({
    given: 'a list of masses',
    should: 'reduce them a single fuel value',
    actual: main(testdata),
    expected: 34241,
  })

  assert({
    given: 'the actual data',
    should: 'return the right answer',
    actual: main(data),
    expected: 3320816,
  })
})
