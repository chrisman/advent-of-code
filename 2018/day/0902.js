const [ players, turns ] = require('../data/09.data').data.match(/\d+/g)

const addAfter = (value, marble) => {
  const toAdd = {
    value,
    prev: marble,
    next: marble.next,
  }
  marble.next.prev = toAdd
  marble.next      = toAdd
  return toAdd
}

const scores = {}
for (let i = 1; i <= players; i += 1) {
  scores[i] = 0
}

let player = 1

let current = {
  value: 0,
}
current.next = current
current.prev = current

for (let m = 1; m <= turns * 100; m += 1) {
  if (m % 23 === 0) {
    scores[player] += m
    // prev prev prev prev prev prev prev!!!!!!!
    current = current.prev.prev.prev.prev.prev.prev
    // prev
    scores[player] += current.prev.value
    // prev prev
    current.prev.prev.next = current
    // prev. prev prev
    current.prev = current.prev.prev
  } else {
    current = addAfter(m, current.next)
  }
  player = player % players + 1
}

console.log(Math.max(...Object.values(scores)))
