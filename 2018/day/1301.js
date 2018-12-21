const { compose } = require('../utils')

// velocity and relative directions of each direction
const dirs = {
  '>': {
    velocity: [1, 0],  // east  = +x
    straight: '>',
    left: '^',
    right: 'v'
  },
  '<': {
    velocity: [-1, 0], // west  = -x
    straight: '<',
    left: 'v',
    right: '^'
  },
  '^': {
    velocity: [0, -1], // north = -y
    straight: '^',
    left: '<',
    right: '>'
  },
  'v': {
    velocity: [0, 1],  // south = +y
    straight: 'v',
    left: '>',
    right: '<'
  },
}

// how directions change when encountering a curve
const curves = {
  '\\': {
    '>': 'v', // turn right
    '^': '<', // turn left
    'v': '>', // turn left
    '<': '^', // turn right
  },
  '/': {
    '^': '>', // turn right
    '<': 'v', // turn left
    '>': '^', // turn left
    'v': '<', // turn right
  },
}

// the order of turns at intersections
const intersectionTurns = {
  0: 'left',
  1: 'straight',
  2: 'right',
}

const stringsToArrays = (arr) => arr.map(string => string.split(''))

const createCart = ({
  orientation = '>',
  turn = 0,
  x = 0,
  y = 0,
} = {}) => ({
  x, y, orientation, turn,
  turnAtIntersection(intersection = '') {
    if (intersection === '+') {
      this.orientation = dirs[this.orientation][intersectionTurns[this.turn]]
      this.turn = (this.turn === 2) ? 0 : this.turn + 1
    }
    return this
  },
  turnAtCurve(curve = '') {
    if (curve === '/' || curve === '\\') {
      this.orientation = (curve.length)
        ? curves[curve][this.orientation]
        : this.orientation
    }
    return this
  },
  applyVelocity() {
    const [ dx, dy ] = dirs[this.orientation].velocity
    this.x += dx
    this.y += dy
    return this
  },
  checkCollision(cars) {
    // count up all the cars by location
    const counts = cars.reduce((acc, cur) => {
      acc[`${cur.x},${cur.y}`] = (acc[`${cur.x},${cur.y}`] || 0) + 1
      return acc
    }, {})

    // if there's more than one car at a location, that's a collision
    const collision = (Object.values(counts).some(count => count > 1))

    return collision
  },
})


// returns a map with no cars, and a list of cars
const getCarsAndMap = (arr) => {
  const w  = arr[0].length
  const h  = arr.length
  const carTracks = {
    '>': '-',
    '<': '-',
    'v': '|',
    '^': '|',
  }
  let map  = []
  let cars = []

  for(let y = 0; y < h; y++) {
    map[y] = []
    for(let x = 0; x < w; x++) {
      let i = arr[y][x]
      if (Object.keys(carTracks).includes(i)) {
        const car = createCart({ x, y, orientation: i })
        cars.push(car)
        map[y][x] = carTracks[i]
      } else {
        map[y][x] = i
      }
    }
  }

  return [ map, cars ]
}

// helper printing function
const showMap = ([ map, cars ]) => {
  map.forEach(line => {
    console.log(line.join(''))
  })
  return [ map, cars ]
}

// helper printing function
const showCars = ([ map, cars ]) => {
  cars.forEach(({ x, y, orientation }, idx) => {
    console.log(idx, `[ ${x}, ${y} ]`, orientation)
  })
  return [ map, cars ]
}

// helper printing function
const showMapWithCars = ([ map, cars ]) => {
  const carMap = new Map()
  cars.forEach(car => {
    carMap.set(`${car.x},${car.y}`, car)
  })

  const w = map[0].length
  const h = map.length

  let result = []

  for(let y = 0; y < h; y++) {
    result[y] = []
    for(let x = 0; x < w; x++) {
      if (carMap.get(`${x},${y}`))
        result[y][x] = carMap.get(`${x},${y}`).orientation
      else 
        result[y][x] = map[y][x]
    }
  }

  showMap([ result ])
  return [ map, cars ]
}

const moveCars = ([ map, cars ]) => {
  let collision = []

  while(collision.length === 0) {
    cars
      .sort((a, b) => (a.y < b.y)
        ? -1
        : (a.y === b.y && a.x < b.x)
        ? -1
        : 1
      )
      .forEach(car => {
        car.applyVelocity()
        if (car.checkCollision(cars)) {
          cars = cars.filter(c => c.x !== car.x && c.y !== car.y)
          map[car.y][car.x] = 'x'
          collision = [car.x, car.y]
        }
        car.turnAtCurve(map[car.y][car.x])
        car.turnAtIntersection(map[car.y][car.x])
      })
  }

  return [ map, cars, collision ]
}

const main = compose(
  moveCars,
  getCarsAndMap,
  stringsToArrays,
)

module.exports = {
  createCart,
  main
}
