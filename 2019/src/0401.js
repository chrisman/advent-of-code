const {
  filter,
  range,
  map,
  compose,
} = require('../lib')
const isSixDigitNumber = x => x.toString().length === 6
const twoAdjacentDigitsAreSame = x => /(\d)\1{1}/.test(x)
const digitsNeverDecrease = x => x
  .toString()
  .split('')
  .map(Number)
  .every((e, i, a) => i === a.length - 1 || e <= a[i + 1])

const isValid = x =>
  isSixDigitNumber(x)
  && twoAdjacentDigitsAreSame(x)
  && digitsNeverDecrease(x)

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
  isSixDigitNumber,
  twoAdjacentDigitsAreSame,
  digitsNeverDecrease,
}
