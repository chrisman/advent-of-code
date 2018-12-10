const { num } = require('../utils')
const [ players, turns ] = require('../data/09.data').test0.match(/\d+/g)

let circle = [0, 1]
let current = 1
let player = 1
let scores = Array
  .from({ length: players })
  .map((_,i) => i + 1)
  .reduce((acc, cur) => { acc[cur] = 0; return acc }, {})

for(let i = 2; i <= turns; i++) {
  if (i % 23 === 0) {
    current -= 7
    if (current < 0) current += circle.length
    let additionalScore = circle.splice(current, 1)
    scores[player] += (num(i) + num(additionalScore))
  } else {
    current += 2
    if (current > circle.length)
      current = current % circle.length
    circle.splice(current, 0, i)
  }
  player += 1
  if (player > players) player = 1
}

//console.log(Object.values(scores).reduce((x,y) => x > y ? x : y))
console.log(scores)
