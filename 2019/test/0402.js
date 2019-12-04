const FILE = '../src/0402.js'
const {
  main,
  isValid,
} = require(FILE)
const describe = require('./tap')

describe('isValid', assert => {
  assert({
    should: 'meets these criteria because the digits never decrease and all repeated digits are exactly two digits long',
    given: 112233,
    expected: true,
    actual: isValid(112233),
  })
  assert({
    should: 'no longer meets the criteria (the repeated 44 is part of a larger group of 444',
    given: 123444,
    expected: false,
    actual: isValid(123444),
  })
  assert({
    should: 'meets the criteria (even though 1 is repeated more than twice, it still contains a double 22',
    given: 111122,
    expected: true,
    actual: isValid(111122),
  })
})


describe('main', assert => {
  assert({
    should: 'solve it',
    given: 'data',
    expected: 814,
    actual: main('234208-765869'),
  })
})
