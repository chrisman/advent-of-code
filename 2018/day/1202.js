const { init, notes } = require('../data/12.data').data
const { leftpad, last } = require('../utils')

const rules = notes.reduce((acc, cur) => {
  const [ pattern, next ] = cur.split(' => ')
  acc[pattern] = next
  return acc
}, {})

const applyRule = (rules) => (pattern) =>
  (rules[pattern])
    ? rules[pattern]
    : '.'

const showGenerations = (arr) => {
  // header
  console.log(leftpad(1, ' ', 21), leftpad(2, ' ', 9), leftpad(3, ' ', 9))
  console.log(leftpad(0, ' ', 11), leftpad(5, ' ', 4), leftpad(0, ' ', 4), leftpad(5, ' ', 4), leftpad(0, ' ', 4), leftpad(5, ' ', 4), leftpad(0, ' ', 4), leftpad(5, ' ', 4))

  // generations
  arr.forEach((el, i) => {
    console.log(leftpad(i), el)
  })
}

const buildString = (str) => (idx) =>
  `${str[idx - 2]}${str[idx - 1]}${str[idx]}${str[idx + 1]}${str[idx + 2]}`

const sumOfPots = (arr) => last(arr)
  .split('')
  .reduce((acc, curr, idx) => 
    acc + ((curr === '#') ? idx - padLeft : 0)
  , 0)

const arrayOfDots = (length) =>
  Array.from({ length }).map(_ => '.').join('')

const padRight     = 2500
const padLeft      = 5
const FIFTYBILLION = 50000000000
// after 120 generations, the pattern stabilizes
// the difference between the generations is a constant of 20
const numberOfGenerations = 120
const generationalDifference = 20

let previousGeneration
let generations    = []
let nextGeneration = arrayOfDots(padLeft) + init + arrayOfDots(padRight)
let noGenerations  = numberOfGenerations

generations.push(nextGeneration) // get gen zero

while(noGenerations--) {
  previousGeneration = nextGeneration
  nextGeneration     = '..'

  for(let i = 2; i < previousGeneration.length - 2; i++) {
    const pattern  = buildString(previousGeneration)(i)
    const next     = applyRule(rules)(pattern)
    nextGeneration = nextGeneration + next
  }

  nextGeneration += '..'
  generations.push(nextGeneration)
}

//showGenerations(generations)

console.log(sumOfPots(generations) + (generationalDifference * (FIFTYBILLION - numberOfGenerations)))
