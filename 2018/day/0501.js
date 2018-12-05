const { head, tail } = require('../utils')

// helper funcs
const isLowerCase = chr => chr == chr.toLowerCase()
const isUpperCase = chr => chr == chr.toUpperCase()
const areDifferentCases = (chr1, chr2) =>
  (isLowerCase(chr1) && isUpperCase(chr2))
  || (isUpperCase(chr1) && isLowerCase(chr2))
const areSameType = (chr1, chr2) => chr1.toLowerCase() == chr2.toLowerCase()
const areOppositePolarity = (chr1, chr2) =>
  areSameType(chr1, chr2) && areDifferentCases(chr1, chr2)

const getAnswer = (list) => {

  let reaction = false;
  let answer = ''
  let counter = 0;

  // here's a boring old do..while loop because this string was too big to
  // recurse over without a stack overflow
  do {
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

const main = (str) => getAnswer(str).length

module.exports = {
  main,
  getAnswer,
  areDifferentCases,
  areSameType,
  areOppositePolarity,
}
