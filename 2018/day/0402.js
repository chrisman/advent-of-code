const input = require('../data/04.data').data.sort()
const { log, compose, map, countBy, head, tail } = require('../utils')

const parseInput = (arr) => arr
  .map(line => line.split('] '))
  .map(a => [ a[0].slice(-2), a[1] ])
  .reduce((acc, curr) => acc.concat({
    time: curr[0],
    type: curr[1].includes('begins shift') ? 'shift' : 'state',
    content: curr[1].replace(/.*#(\d*).*/, '$1'),
  }), [])

const range = (start, end) =>
  (isNaN(end) || isNaN(start))
    ? []
    : [...Array(end - start).keys()].map(e => e + start)

const allMinutesPerGuard = (arr) => {
  const inner = (item, list, currentGuard, result) => {
    if (!list.length) return result

    if(item.type === 'shift') {
      return inner(
        head(list),
        tail(list),
        item.content,
        (result[item.content])
          ? Object.assign({}, result)
          : Object.assign({}, result, { [item.content]: [] })
      )
    }

    const start   = parseInt(item.time, 10)
    const end     = parseInt(head(list).time, 10)
    const minutes = range(start, end)

    return inner(
      head(tail(list)),
      tail(tail(list)),
      currentGuard,
      Object.assign({}, result, { [currentGuard]: result[currentGuard].concat(minutes).sort() })
    )
  }

  return inner(
    head(tail(arr)),
    tail(tail(arr)),
    head(arr).content,
    { [head(arr).content]: [] }
  )
}

const minuteFrequency = (obj) => 
  Object.entries(obj)
    .map(([ guard, minutes ]) => [ guard, countBy(minutes) ])

const mostFrequentByGuard = (arr) => arr
  .map(([ guard, minutes ]) => [
    guard,
    Object.entries(minutes).reduce((prev, cur) => prev[1] > cur[1] ? prev: cur)
  ])

const getProduct = (arr) =>
  parseInt(arr[0], 10) * parseInt(arr[1][0], 10)

// some empty objects were goofing up my reduce funcs
const removeNonSleepingGuards = (arr) => arr.reduce((acc, curr) => {
    const tooMuchCoffee = (Object.keys(curr[1]).length === 0)
    if (!tooMuchCoffee) acc = acc.concat([curr])
    return acc;
  }, [])

const maxGuardAndMinute = (arr) =>
  arr.reduce((prev, curr) => prev[1][1] > curr[1][1] ? prev : curr)

const answer = compose(
  log('solution'),
  getProduct,
  maxGuardAndMinute,
  mostFrequentByGuard,
  removeNonSleepingGuards,
  minuteFrequency,
  allMinutesPerGuard,
  parseInput
) (input)

module.exports = answer
