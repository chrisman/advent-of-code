const {
  compose: c,
  sumlist: sum,
} = require('../lib')
const {
  fuelRequiredByMass: fuel,
} = require('./0101.js')

// solve for `x / 3 - 2 = 0`: this is the largest fuel amount that can be
// powered by "wishes". i.e., nothing smaller than this value needs to be
// processed further
const WISH = 6

const mapper = (x, acc = []) => (x <= WISH)
  ? sum(acc)
  : mapper(fuel(x), acc.concat(fuel(x)))
const domap = (xs) => xs.map(x => mapper(x))

module.exports = c(sum, domap)
