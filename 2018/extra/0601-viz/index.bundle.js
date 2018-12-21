(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  test: [
    [1, 1],
    [1, 6],
    [8, 3],
    [3, 4],
    [5, 5],
    [8, 9],
  ],
  data: [
    [108, 324],
    [46, 91],
    [356, 216],
    [209, 169],
    [170, 331],
    [332, 215],
    [217, 104],
    [75, 153],
    [110, 207],
    [185, 102],
    [61, 273],
    [233, 301],
    [278, 151],
    [333, 349],
    [236, 249],
    [93, 155],
    [186, 321],
    [203, 138],
    [103, 292],
    [47, 178],
    [178, 212],
    [253, 174],
    [348, 272],
    [83, 65],
    [264, 227],
    [239, 52],
    [243, 61],
    [290, 325],
    [135, 96],
    [165, 339],
    [236, 132],
    [84, 185],
    [94, 248],
    [164, 82],
    [325, 202],
    [345, 323],
    [45, 42],
    [292, 214],
    [349, 148],
    [80, 180],
    [314, 335],
    [210, 264],
    [302, 108],
    [235, 273],
    [253, 170],
    [150, 303],
    [249, 279],
    [255, 159],
    [273, 356],
    [275, 244],
  ]
}

},{}],2:[function(require,module,exports){
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
  greatestArea,
  toAreas,
  noInfinites,
  noBorders,
  noDeadSquares,
  allPoints,
) (data)

module.exports = {
  allPoints,
  main,
}


},{"../data/06.data":1,"../utils":4}],3:[function(require,module,exports){
const { allPoints } = require('../../day/0601')
const { test } = require('../../data/06.data')

const [ w, h, points, centers ] = allPoints(test)

const myMap = points.map(point => [
  point[0].split('x'),
  (point[1] && point[1][1].join('x')) || '.'
])

console.log(myMap)

const offset = 10
const canvas = document.getElementById('canvas')
canvas.width = w * offset + (2 * offset)
canvas.height = h * offset + (2 * offset)
const ctx = canvas.getContext('2d')

const colors = [
  "rgba(29,162,216,0.4)",
]

const rand = (arr) => arr[Math.floor(Math.random()*arr.length)];

centers.forEach((point) => {
  ctx.fillStyle = '#000000'
  ctx.fillRect(point[0] * offset, point[1]* offset, offset, offset)
})


},{"../../data/06.data":1,"../../day/0601":2}],4:[function(require,module,exports){
const compose = (...funs) => (init) => funs.reduceRight((x, f) => f(x), init);
const countBy = (arr) => arr.reduce((acc, x) => { acc[x] = (acc[x] || 0) + 1; return acc; }, {});
const head = (arr) => arr[0];
const isFunction = (f) => f && {}.toString.call(f) === '[object Function]';
const log = (label) => (x) => { console.log(`${label}:`, JSON.stringify(x)); return x; };
const map = (fun) => (arr) => arr.map(fun);
const num = (str) => parseInt(str, 10);
const reduce = (fun, init) => (arr) => arr.reduce(fun, init);
const tail = (arr) => arr.slice(1);

module.exports = {
  compose,
  countBy,
  head,
  isFunction,
  log,
  map,
  num,
  reduce,
  tail,
}

},{}]},{},[3]);
