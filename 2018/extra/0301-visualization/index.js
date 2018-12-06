const { coords } = require('../../day/0301')
const { data } = require('../../data/03.data')

const mycoords = coords(data)

const canvas = document.getElementById('canvas')

const width = mycoords
  .map(([ x, y, w, h ]) => x + w)
  .reduce((p, c) => p > c ? p : c)
const height = mycoords
  .map(([ x, y, w, h ]) => y + h)
  .reduce((p, c) => p > c ? p : c)

canvas.width = width
canvas.height = height

const ctx = canvas.getContext('2d')

const colors = [
  "rgba(29,162,216,0.4)",
]

const rand = (arr) => arr[Math.floor(Math.random()*arr.length)];

mycoords.forEach((arr) => {
  ctx.fillStyle = rand(colors)
  ctx.fillRect(...arr)
})
