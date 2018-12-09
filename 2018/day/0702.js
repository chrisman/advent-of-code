/*
 * NOTE: all credit for this solution goes to:
 * https://github.com/ericrallen/advent-of-code/blob/master/2018/solutions/day-7/part-2/part-2.js
 */
const { test, data } = require('../data/07.data')
const { uniq } = require('../utils')

const workers = 5
const workTime = 60

let solution = []

const workerArrays = Array.from({ length: workers })
  .reduce((acc, cur, idx) => {
    acc[idx] = []
    return acc
  }, {})

const myregex         = /\b([A-Z])\b/g
const prerequisiteMap = new Map()
const prerequisites   = []
const steps           = data.map((line) => line.match(myregex))
const timeMap         = {}

// create prerequisiteMap
steps
  .reduce((acc, cur) => acc.concat(cur), [])
  .filter(uniq)
  .sort()
  .map(step => [
    step,
    steps
    .filter(s => s[1] === step)
    .map(s => s[0])
    .sort()
  ])
  .forEach(([ step, prereqs ]) => {
    prerequisiteMap.set(step, prereqs)
  })

const stepsFilter = (map) => (filterBy) => Array.from(map)
  .filter(filterBy)
  .map(([ step ]) => step)
  .sort()
const stepsFilterFromMap = stepsFilter(prerequisiteMap)
const firstSteps         = stepsFilterFromMap(([ step, prereqs ]) => !prereqs.length)
const lastSteps          = stepsFilterFromMap(([ step ])          => !prerequisites.includes(step))

const getStepTime = (step) => step.charCodeAt(0) - 64 + workTime

const prereqsResolved = (prerequisites, test) => {
  const unresolved = prerequisites.filter((step) => !test.includes(step))
  return unresolved.length === 0
}

const isWorkerFree = (workerId, elapsedTime) => {
  const workArray = workerArrays[workerId]
  const totalWork = workArray.reduce((totalTime, step) => totalTime + getStepTime(step), 0)
  return (elapsedTime >= totalWork)
}

const isStepResolved = (step, elapsedTime) => (elapsedTime - timeMap[step] >= getStepTime(step))

const isStepActive = (step) =>
  Object.keys(workerArrays)
    .some((workerId) => workerArrays[workerId].includes(step))

let done = false
let elapsedTime = 0

while(!done) {
  Object.keys(workerArrays).forEach((workerId) => {
    workerArrays[workerId].forEach((step) => {
      if (isStepResolved(step, elapsedTime) && !solution.includes(step)) {
        solution = solution.concat(step)
        if (solution.length === prerequisiteMap.size) {
          done = true
        }
      }
    })
  })

  if (!done) {

    let nextSteps = []
    Array.from(prerequisiteMap).forEach(([ nextStep, prereqs ]) => {
      const isNextStep = !solution.includes(nextStep)
        && prereqsResolved(prereqs, solution)
        && !isStepActive(nextStep)
      if (isNextStep) {
        nextSteps = nextSteps.concat(nextStep)
      }
    })

    const sortedNextSteps = nextSteps.sort()

    // seriously mutative arrays ahead:
    Object.keys(workerArrays).forEach((workerId) => {
      if (isWorkerFree(workerId, elapsedTime)) {
        const workersNextStep = sortedNextSteps.shift()

        if (workersNextStep && !isStepActive(workersNextStep)) {
          workerArrays[workerId].push(workersNextStep)

          timeMap[workersNextStep] = elapsedTime

          if (firstSteps.includes(workersNextStep)) {
            firstSteps.splice(firstSteps.indexOf(workersNextStep), 1)
          }

          if (lastSteps.includes(workersNextStep)) {
            lastSteps.splice(lastSteps.indexOf(workersNextStep), 1)
          }
        }
      }
    })

    elapsedTime += 1
  }
}

console.log(elapsedTime)
