const input = require('../data/04.data').data.sort()
const { reduce, log, compose, map, countBy, head, tail } = require('../utils')

//// <WELCOME TO REGEX TOWN>
// matches minutes from the time stamp, and the log message
const parseLine = /\[\d{4}-\d{2}-\d{2}\s\d{2}:(\d{2})\] (.*)/
// matches guard number
const guardNumber = /.*#(\d*).*/
//// </ WELCOME TO REGEX TOWN >

const toTimeAndContent = (line) => {
  [ time, content ] = line.replace(parseLine, '$1lol$2').split('lol')
  return { time, content }
}
const toTypeAndParsedContent = (line) => (line.content.includes('begins shift'))
  ? Object.assign({}, line, {
      type: 'shift',
      content: line.content.replace(guardNumber, '$1')
    })
  : Object.assign({}, line, {
      type: 'state',
    })

const range = (start, end) =>
  (isNaN(end) || isNaN(start))
    ? []
    : [...Array(end - start).keys()].map(e => e + start)

/*
 * 1. if the item is type===shift, update the currentguard, and create a new
 *    key in the object
 * 2. else take the next two items (falls asleep + wakes up) and add the range
 *    of minutes between those two timestamps to the current guard
 *
 * This returns a list of each minute spent asleep for each guard
 * (not a total number of minutes asleep)
 *
 * e.g. { '10': [10, 11, 12, 13, 40, 41] }
 */
const minutesPerGuard = (arr) => {
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
      Object.assign({}, result, { [currentGuard]: result[currentGuard].concat(minutes) })
    )
  }

  // kick off recursion here
  // assumption: the first log will be a shift start
  return inner(
    head(tail(arr)),
    tail(tail(arr)),
    head(arr).content,
    { [head(arr).content]: [] }
  )
}

const sleepiestGuard = (data) => {
  const guard = Object.keys(data)
    .reduce((prev, curr) => data[prev].length > data[curr].length ? prev : curr)
  return [ data, guard ]
}

const sleepiestMinuteAndGuard = ([ data, guard ]) => {
  const sleeps = data[guard]
  const sleepFrequency = countBy(sleeps)

  let maxSleeps = 0
  let minute

  Object.entries(sleepFrequency).forEach(([ _minute, _sleeps ]) => {
    if (_sleeps > maxSleeps) {
      maxSleeps = _sleeps
      minute = _minute
    }
  })

  return [ minute, guard ]
}

const multiply = (x, y) => x * y

const answer = compose(
  log('solution'),
  // a gotcha of the way I wrote reduce is that you must always provide an
  // initial value:
  reduce(multiply, 1),
  sleepiestMinuteAndGuard,
  sleepiestGuard,
  minutesPerGuard,
  map(toTypeAndParsedContent),
  map(toTimeAndContent)
) (input)

module.exports = answer
