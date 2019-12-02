const {
  compose: c,
  sumlist,
} = require('../lib')

const divide = x => y => y / x
const subtract = x => y => y - x

const divideByThree = divide (3)
const subtractTwo = subtract (2)

const roundDown = Math.floor

const fuelRequiredByMass = c(
  subtractTwo,
  roundDown,
  divideByThree,
)

const massListTofuelList = xs => xs.map(fuelRequiredByMass)

const main = c(
  sumlist,
  massListTofuelList,
)

module.exports = {
  fuelRequiredByMass,
  main,
}
