const {
  compose,
  filter,
  map,
  range,
  log,
} = require('../lib')
const {
  isSixDigitNumber,
  digitsNeverDecrease,
} = require('./0401')

const twoAndOnlyTwo = x =>
  (x.toString().match(/(\d)\1{1,}/g) || [])
    .map(x => x.length)
    .includes(2)

const isValid = x => 
  isSixDigitNumber(x)
  && digitsNeverDecrease(x)
  && twoAndOnlyTwo(x)

const main = compose(
  a => a.length,
  filter(isValid),
  a => range(...a),
  map(Number),
  x => x.split('-'),
)

module.exports = {
  main,
  isValid,
}
