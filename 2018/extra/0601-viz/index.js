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

