const { compose, log } = require('../utils')

const coords = (arr) => arr.map((str) => {
  [ id, at, init, size ] = str.split(' ');
  [ x, y ] = init.slice(0, -1).split(',').map(str => +str);
  [ w, h ] = size.split('x').map(str => +str);
  return [ x, y, w, h ]
})

const getOverlaps = (arr) => {
  let overlaps = {}

  arr.forEach(([ x, y, w, h ]) => {
    for(let i = x; i < x + w; i++) {
      for(let j = y; j < y + h; j++) {
        overlaps[`${i}x${j}`] = (overlaps[`${i}x${j}`] || 0) + 1;
      }
    }
  })

  return overlaps
}

const isOverlap = (obj) => Object.values(obj).filter(len => len > 1)

const numberOfOverlaps = (arr) => arr.length

const main = compose(
  numberOfOverlaps,
  isOverlap,
  getOverlaps,
  coords,
)

module.exports = {
  main,
  coords,
}
