const { test, data } = require('../data/07.data')
const { log, compose, uniq } = require('../utils')

const requirements = (arr) => {
  // ===============
  // regex-planation
  // ===============
  //
  // /\b([A-Z])\b/g
  // ^           ^   // start and end of expression
  //  ^^       ^^    // word-bound
  //    ^     ^      // match this
  //     ^^^^^       // any single capital letter
  //              ^  // global flag: find all occurances
  // e.g.
  // Step C must be finished before step A can begin.
  //      ^                              ^               // matches
  // ^                                                   // not a match
  const myregex = /\b([A-Z])\b/g

  const matches = arr
    .map(line => line.match(myregex))

  const allStepRequirements = matches
    .reduce((acc, cur) => acc.concat(cur), [])
    .filter((cur, idx, arr) => arr.indexOf(cur) === idx)
    .sort()
    .map(step => [
      step,
      matches
        .filter(match => match[1] === step)
        .map(match => match[0])
    ])

  return [
    allStepRequirements,
  ]
}

const order = ([ requirements ]) => {
  let counter = 0

  const inner = ([ reqs, answer ]) => {
    if (reqs.length === 0) return answer

    const nextStep = reqs
      .filter(requirement => requirement[1].length === 0)
      .sort()[0][0]

    return inner([
      reqs
        .filter(req => req[0] !== nextStep)
        .map(([ _step, _reqs ]) => [
          _step,
          _reqs.filter(r => r !== nextStep)
        ]),
      answer + nextStep
    ])
  }

  return inner([ requirements, ''])
}

compose(
  log('solution'),
  order,
  requirements,
) (data)
