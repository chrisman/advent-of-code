const DATAFILE = '../data/0301.js'
const FILE = '../src/0301.js'
const data = require(DATAFILE)
const {
  getLines,
  main,
  processInput,
} = require(FILE)
const describe = require('./tap')

describe('processInput', assert => {
  assert({
    should: 'return an identity vector and a magnitude',
    given: 'R8',
    expected: [[0, 1, 8]],
    actual: processInput('R8'),
  })
  assert({
    should: 'return an identity vector and a magnitude',
    given: 'U1,D1',
    expected: [[-1, 0, 1], [1, 0, 1]],
    actual: processInput('U1,D1'),
  })
  assert({
    should: 'return an identity vector and a magnitude',
    given: 'L3,U7,D4',
    expected: [[0,-1,3],[-1,0,7],[1,0,4]],
    actual: processInput('L3,U7,D4'),
  })
  assert({
    should: 'handle larger numbers',
    given: 'L39,R202',
    expected: [[0,-1,39],[0,1,202]],
    actual: processInput('L39,R202'),
  })
})


describe('getLines', assert => {
  const lines = processInput('U2,R3')
  assert({
    should: 'return an array of points',
    given: lines,
    expected: [ [0, 0], [-1, 0], [-2, 0], [-2, 1], [-2, 2], [-2, 3] ],
    actual: getLines(lines),
  })
})

describe('main', assert => {
  const tests = [
    ['R8,U5,L5,D3', 'U7,R6,D4,L4', 6],
    ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83', 159],
    ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7', 135],
  ]
  tests.forEach(([ wire1, wire2, expected ]) => {
    assert({
      should: 'give the right answer',
      given: `wire ${wire1} and wire ${wire2}`,
      actual: main(wire1, wire2),
      expected,
    })
  })
  assert({
    should: 'solve the real puzzle',
    given: 'puzzle data',
    actual: main(data[0], data[1]),
    expected: 709,
  })
})
