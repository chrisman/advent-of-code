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

const getAnswer = (list, result, reaction) => {
  const completePassWithNoReaction = (list.length === 1 && !reaction)
  if (completePassWithNoReaction)
    return result + head(list)

  const completePassWithReaction = (list.length === 1 && reaction)
  if (completePassWithReaction)
    return getAnswer(result + head(list), '', false)

  const isReaction = (areOppositePolarity(head(list), head(tail(list))))
  if (isReaction)
    return getAnswer(tail(tail(list)), result, true)

  return getAnswer(tail(list), result + head(list), reaction)
}

const main = (str) => getAnswer(str, '', false)

module.exports = {
  main,
  areDifferentCases,
  areSameType,
  areOppositePolarity,
}
