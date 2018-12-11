const input = require('../data/10.data').data

const reggie = /position=<([ 0-9-]+), ([ 0-9-]+)> velocity=<([ 0-9-]+), ([ 0-9-]+)>/

const data = input
  .map(line => line.match())
  .map(([ _, x, y, dx, dy ]) => ({
    x:  +x,
    y:  +y,
    dx: +dx,
    dy: +dy,
  }))

// hello there, day 6!
const manhattan = (x1, x2, y1, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

const getBounds = (arr) => ({
  x: {
    min: Math.min(...arr.map(i => i.x)),
    max: Math.max(...arr.map(i => i.x)),
  },
  y: {
    min: Math.min(...arr.map(i => i.y)),
    max: Math.max(...arr.map(i => i.y)),
  },
})

function showSky(starMap, c = 'o') {
  const bounds = getBounds(Array.from(starMap.values()))

  let output = ''

  for (let y = bounds.y.min; y <= bounds.y.max; y++) {
    for (let x = bounds.x.min; x <= bounds.x.max; x++) {
      if (starMap.get(`${x},${y}`)) output += c
      else output += ' '
    }
    output += "\n"
  }

  return output
}

function getSky(stars, seconds) {
  const currentSky = new Map()
  let skyMessage = new Map()

  let shortestDistance = Infinity
  let secondOfSkyMessage = 0

  for (let second = 0; second <= seconds; second++) {

    // apply velocity to each star
    stars.forEach((star, idx) => {
        if (currentSky.has(idx)) {
          let tmp = currentSky.get(idx)
          tmp.x += star.dx
          tmp.y += star.dy
          currentSky.set(idx, tmp)
        } else {
          currentSky.set(idx, {
            x: star.x,
            y: star.y,
          })
        }
    })

    // if the distance between upper and lower bounds is the smallest, this is our message
    const sky      = Array.from(currentSky.values())
    const bounds   = getBounds(sky)
    const distance = manhattan(bounds.x.min, bounds.x.max, bounds.y.min, bounds.y.max)
    if (distance < shortestDistance) {
      secondOfSkyMessage = second
      shortestDistance   = distance
      skyMessage         = new Map()
      sky.forEach((star) => {
        skyMessage.set(`${star.x},${star.y}`, {
          x: star.x,
          y: star.y,
        })
      })
    }
  }

  console.log('#2:', secondOfSkyMessage)
  return skyMessage
}

const msg = showSky(getSky(data, 20500))
console.log('#1:')
console.log(msg)
