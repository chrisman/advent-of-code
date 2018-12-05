const { head, tail } = require('../utils')

const isLowerCase = chr => chr == chr.toLowerCase()
const isUpperCase = chr => chr == chr.toUpperCase()
const areDifferentCases = (chr1, chr2) =>
  (isLowerCase(chr1) && isUpperCase(chr2))
  || (isUpperCase(chr1) && isLowerCase(chr2))
const areSameType = (chr1, chr2) => chr1.toLowerCase() == chr2.toLowerCase()
const areOppositePolarity = (chr1, chr2) =>
  areSameType(chr1, chr2) && areDifferentCases(chr1, chr2)

const answer = 'dabCBAcaDA'

const getAnswer = (list) => {
  const _getAnswer = (_list, _result, _reaction) => {
    // complete pass and no reaction = DONE
    return (_list.length === 1 && !_reaction)
      ? _result + head(_list)
      // complete pass with reaction = start over
      : (_list.length === 1 && _reaction)
      ? _getAnswer(_result + head(_list), '', false)
      // R-R-R-REACTION!
      : (areOppositePolarity(head(_list), head(tail(_list))))
      ? _getAnswer(tail(tail(_list)), _result, true)
      // mundane
      : _getAnswer(tail(_list), _result + head(_list), _reaction)
  }

  return _getAnswer(list, '', false)
}

const main = (str) => getAnswer(str)

module.exports = {
  main,
  areDifferentCases,
  areSameType,
  areOppositePolarity,
}
