// helpers
const {
  compose,
  filter,
  frequency,
  log,
  map,
} = require('../lib')
const startTimer = label => x => { console.time(label); return x }
const stopTimer = label => x => { console.timeEnd(label); return x }

// direction lookup table
// maps to unit vectors
const directions = {
  'u': [-1, 0],
  'd': [1, 0],
  'r': [0, 1],
  'l': [0, -1],
}

const smallestDistance = obj => Object.keys(obj)
  .map(s => s.split(','))
  .map(a => a.map(Number))
  .map(a => Math.abs(a[0]) + Math.abs(a[1]))
  .reduce((a, b) => a <= b ? a : b)

const getIntersects = obj => {
  let o = {}
  Object.keys(obj).forEach(k => {
    if (obj[k] > 1) o[k] = obj[k]
  })
  return o
}

const merge = ([a, b]) => [...a, ...b]

const getLines = (instructions) => {
  let lines = [ [0,0] ]
  instructions.forEach(([ dx, dy, mag ]) => {
    for(let i = 0; i < mag; i++) {
      const prev = lines[lines.length - 1]
      const next = [
        prev[0] + dx,
        prev[1] + dy,
      ]
      lines.push(next)
    }
  })
  return lines
}

const processInput = str => str
  // split into instructions
  .split(',')
  // split instructions into direction and magnitude: 'U9' -> ['U', '9']
  .map(s => [ s.slice(0,1), s.slice(1) ])
  // parse instructions
  .map(([ direction, vector ]) => [ direction.toLowerCase(), Number(vector) ])
  // map direction to identity vector
  .map(([ direction, vector ]) => [ directions[direction], vector ])
  // flatten
  .map(([ [ dx, dy ], magnitude ]) => [ dx, dy, magnitude ])

const lines = compose(
  map(getLines),
  map(processInput),
)

const intersects = compose(
  getIntersects,
  frequency,
  filter(s => s !== '0,0'),
  merge,
  stopTimer('map 2'),
  map(a => Array.from(new Set(a))),
  startTimer('map 2'),
  map(a => a.map(xs => `${xs[0]},${xs[1]}`)),
)

const main = (wire1, wire2) => compose(
  smallestDistance,
  intersects,
  lines,
)([ wire1, wire2 ])

module.exports = {
  main,
  lines,
  intersects,
  getLines,
  processInput,
}
