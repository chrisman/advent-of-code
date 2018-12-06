const { compose, head, tail } = require('../utils')

// helper funcs
const isLowerCase = chr => chr == chr.toLowerCase()
const isUpperCase = chr => chr == chr.toUpperCase()
const areDifferentCases = (chr1, chr2) =>
  (isLowerCase(chr1) && isUpperCase(chr2))
  || (isUpperCase(chr1) && isLowerCase(chr2))
const areSameType = (chr1, chr2) => chr1.toLowerCase() == chr2.toLowerCase()
const areOppositePolarity = (chr1, chr2) =>
  areSameType(chr1, chr2) && areDifferentCases(chr1, chr2)
const alphabet = Array.from({ length: 26 }).map((x, i) => String.fromCharCode(97 + i))

const reactPolymer = (list) => {

  let reaction = false;
  let answer = ''
  let counter = 0;

  // here's a boring old do..while loop because this string was too big to
  // recurse over without a stack overflow
  do {
    if (list.length === 0) break
    // complete with no reaction = DONE
    if (list.length === 1 && !reaction) {
      answer += head(list)
      list = ''
    // complete with reaction = start over
    } else if (list.length === 1 && reaction) {
      list = answer + head(list)
      answer = ''
      reaction = false
    // r-r-r-r-reaction!!
    } else if (areOppositePolarity(head(list), head(tail(list)))) {
      list = tail(tail(list))
      reaction = true
    // mundane: stable polymer segment
    } else {
      answer = answer + head(list)
      list = tail(list)
    }
  } while (list.length || reaction)

  return answer;
}

// arr is an array of what will become object keys
// str is a string that will be the value of every key, to be mapped over later
const mappy = (arr) => (str) => arr.reduce((acc, cur) => {
  acc[cur] = str
  return acc
}, {})

// each key becomes the regex used to strip that character, lower and upper
// case, from its value
const removeTypes = (obj) => Object.entries(obj)
  .map(([ key, value ]) => {
    const myregexp = new RegExp(`${key}`, 'gi');
    return [ key, value.replace(myregexp, '') ]
  })

const reactPolymers = (arr) => arr
  .map(([ key, polymer ]) => [ key, reactPolymer(polymer) ] )

const polymerToLength = (arr) => arr.map(([ key, value ]) => [ key, value.length ])

const findShortest = (arr) => arr.reduce((prev, curr) => prev[1] < curr[1] ? prev : curr)

const length = (arr) => arr[1]

const main = compose(
  length,
  findShortest,
  polymerToLength,
  reactPolymers,
  removeTypes,
  mappy(alphabet),
)

module.exports = {
  findShortest,
  polymerToLength,
  reactPolymers,
  removeTypes,
  mappy,
  main,
  alphabet,
}
