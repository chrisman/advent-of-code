const describe = require('../tap')
const { data, test } = require('../../data/03.data')
const {
  coords,
  main,
} = require('../../day/0301')

describe('coords()', assert => {
  const expected = [[1,3,4,4],[3,1,4,4],[5,5,2,2]]
  assert({
    given: 'test data',
    should: 'an array of [x, y, w, h]',
    actual: JSON.stringify(coords(test)),
    expected: JSON.stringify(expected)
  })
})

describe('main()', assert => {
  assert({
    given: 'test data',
    should: 'return length of total number of overlaps',
    actual: main(test),
    expected: 4
  })
  /*
  assert({
    given: 'test data',
    should: 'return length of total number of overlaps',
    actual: main(data),
    expected: 114946
  })
  */
})
