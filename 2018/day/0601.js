const { compose, log } = require('../utils')
const { test, data } = require('../data/06.data')

const num = (num) => parseInt(num, 10)

const getWidth = (arr) => arr
  .map(([x, _]) => x)
  .reduce((p,c) => p > c ? p : c)

const getHeight = (arr) => arr
  .map(([_, y]) => y)
  .reduce((p,c) => p > c ? p : c)

const getWidthAndHeight = (arr) => [
  getWidth(arr),
  getHeight(arr),
  arr,
]

const createBoard = ([ w, h, centers ]) => {
  let acc = {} 
  for (let i = 0; i <= h; i++) {
    for (let j = 0; j <= w; j++) {
      acc[`${j}x${i}`] = []
    }
  }
  return [ w, h, acc, centers ]
}

const filterCenters = ([ w, h, board, centers ]) => {
  const res = Object.keys(board)
    .filter(el => centers.every(([ x, y ]) => el !== `${x}x${y}`))
    .sort()

  return [ w, h, res, centers ]
}

const manhatten = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])

const pointsAndDistances = ([ w, h, points, centers ]) => [
  w, h,
  points.map(point => [
    point,
    centers
      .map(center => [ manhatten(point.split('x'), center), center ])
      .sort((a, b) => a[0] < b[0] ? -1 : 1)
  ]),
  centers,
]

const shortestDistance = ([ w, h, points, centers ]) => [
  w,
  h,
  points.map(point => [
    point[0],
    (point[1][0][0] === point[1][1][0]) ? null : point[1][0]
  ]),
  centers,
]

const noDeadSquares = ([ w, h, points, centers ]) => [
  w,
  h,
  points.filter(point => point[1] !== null),
  centers,
]

const noBorders = ([ w, h, points, centers ]) => {

  let result = points.map(point => [
    point[0].split('x').map(str => num(str)),
    point[1][1]
  ])

  const left   = ([ x, _ ]) => (x === 0)
  const right  = ([ x, _ ]) => (x === w)
  const top    = ([ _, y ]) => (y === 0)
  const bottom = ([ _, y ]) => (y === h)
  const isEdge = (coord) => top(coord) || bottom(coord) || left(coord) || right(coord)

  let infiniteCenters = []

  const removeEdgesAndGetInfiniteCenters = ((acc, cur) => {
    if (isEdge(cur[0])) {
      infiniteCenters.push(cur[1])
      return acc
    } else {
      acc.push(cur)
      return acc
    }
  })

  const noInfiniteCenters = result.reduce(removeEdgesAndGetInfiniteCenters, [])

  return [
    w, h,
    noInfiniteCenters,
    centers,
    Array.from(new Set(infiniteCenters))
  ]
}

const myIncludes = (array, includes) => includes
  .filter((a) => (array.every(infinite => 
    infinite[0] !== a[1][0]
    && infinite[1] !== a[1][1]
  )))
const noInfinites = ([ w, h, points, centers, infinites]) => [
  w, h,
  myIncludes(infinites, points),
  centers,
  infinites,
]

const toAreas = ([ w, h, points, centers, infinites ]) => [
  w, h,
  points.reduce((acc, curr) => {
    const key = `${curr[1][0]}x${curr[1][1]}`
    acc[key] = (acc[key] || 1) + 1
    return acc
  }, {}),
  centers,
  infinites,
]

const greatestArea = ([ w, h, areas, centers, infinites ]) => Object.values(areas)
  .reduce((x, y) => x > y ? x : y)

const allPoints = compose(
  shortestDistance,
  pointsAndDistances,
  filterCenters,
  createBoard,
  getWidthAndHeight,
)

const main = compose(
  log('area'),
  greatestArea,
  toAreas,
  noInfinites,
  noBorders,
  noDeadSquares,
  allPoints,
) (data)

module.exports = {
  main,
}

