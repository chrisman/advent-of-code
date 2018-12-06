const describe = require('../tap')
const head = require('../../utils').head

describe('head()', assert => {
  assert({
    given: 'a one-item array',
    should: 'return the item',
    actual: head(['cat']),
    expected: 'cat'
  })

  assert({
    given: 'empty array',
    should: 'return undefined',
    actual: head([]),
    expected: undefined
  })

  assert({
    given: 'an array',
    should: 'behave as expected',
    actual: head(['cat', 'rat', 'bat', 'fat']),
    expected: 'cat'
  })

  let original = ['cat', 'rat', 'bat', 'fat'];
  let test = head(original);

  assert({
    given: 'a string',
    should: 'return the fist character',
    actual: head('bananas'),
    expected: 'b'
  })

  assert({
    given: 'something not a string or array',
    should: 'return undefined',
    actual: head(123),
    expected: undefined
  })
})
