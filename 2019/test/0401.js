const FILE = '../src/0401.js'
const {
  main,
  isValid,
  isSixDigitNumber,
  twoAdjacentDigitsAreSame,
  digitsNeverDecrease,
} = require(FILE)
const describe = require('./tap')

describe('isSixDigitNumber', assert => {
  assert({
    should: 'know if a number is 6 digs',
    given: '111111',
    expected: true,
    actual: isSixDigitNumber(111111),
  })
  assert({
    should: 'know if a number is 7 digs',
    given: '1111111',
    expected: false,
    actual: isSixDigitNumber(1111111),
  })
  assert({
    should: 'know if a number is 5 digs',
    given: '11111',
    expected: false,
    actual: isSixDigitNumber(11111),
  })
})


describe('twoAdjacentDigitsAreSame', assert => {
  assert({
    should: 'know if there are sequential numbs',
    given: 'seq numbs',
    expected: true,
    actual: twoAdjacentDigitsAreSame(123345),
  })
  assert({
    should: 'know if there are sequential numbs',
    given: 'seq numbs',
    expected: true,
    actual: twoAdjacentDigitsAreSame(111111),
  })
  assert({
    should: 'know if there are no numbs',
    given: 'no numbs',
    expected: false,
    actual: twoAdjacentDigitsAreSame(123456),
  })
})


describe('digitsNeverDecrease', assert => {
  assert({
    should: 'know if there is no decrease',
    given: 'seq numbs',
    expected: true,
    actual: digitsNeverDecrease(123345),
  })
  assert({
    should: 'know if there is no decrease',
    given: 'all the same',
    expected: true,
    actual: digitsNeverDecrease(111111),
  })
  assert({
    should: 'know if there is decrease',
    given: 'no numbs',
    expected: false,
    actual: digitsNeverDecrease(654321),
  })
})


describe('isValid', assert => {
  assert({
    should: 'validate',
    given: '111111',
    expected: true,
    actual: isValid(111111),
  })
  assert({
    should: 'not validate',
    given: '223450',
    expected: false,
    actual: isValid(223450),
  })
  assert({
    should: 'not validate',
    given: '123789',
    expected: false,
    actual: isValid(123789),
  })
})


describe('main', assert => {
  assert({
    should: 'solve the ribble',
    given: '234208-765869',
    expected: 1246,
    actual: main('234208-765869'),
  })
})
