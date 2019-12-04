const DATAFILE = '../data/0302.js'
const FILE = '../src/0302.js'
const data = require(DATAFILE)
const { main } = require(FILE)
const describe = require('./tap')

describe('test', assert => {
  assert({
    given: 'sample input',
    should: 'give the right answer',
    actual: main('R8,U5,L5,D3','U7,R6,D4,L4'),
    expected: 40,
  })
  
  assert({
    given: 'sample input',
    should: 'give the right answer',
    actual: main('R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'),
    expected: 610,
  })

  assert({
    given: 'sample input',
    should: 'give the right answer',
    actual: main(
      'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
      'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    ),
    expected: 410,
  })

  assert({
    given: 'sample input',
    should: 'give the right answer',
    actual: main(
      data[0],
      data[1]
    ),
    expected: 410,
  })
})
