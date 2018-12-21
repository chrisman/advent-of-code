const describe = require('../tap')
const last = require('../../utils').last

describe('last()', assert => {
  assert({
    given: 'a one-item array',
    should: 'return the item',
    actual: last(['cat']),
    expected: 'cat'
  })

  assert({
    given: 'empty array',
    should: 'return undefined',
    actual: last([]),
    expected: undefined
  })

  assert({
    given: 'an array',
    should: 'behave as expected',
    actual: last(['cat', 'rat', 'bat', 'fat']),
    expected: 'fat'
  })

  assert({
    given: 'a string',
    should: 'return the last character',
    actual: last('bananas'),
    expected: 's'
  })

  assert({
    given: 'something not a string or array',
    should: 'return undefined',
    actual: last(123),
    expected: undefined
  })
})
