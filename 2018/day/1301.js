const { compose } = require('../utils')

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

const turns = {
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
  covering = '-',
} = {}) => ({
  x, y, orientation, turn, covering,
  turnAtIntersection(intersection = '') {
    if (intersection === '+') {
      this.orientation = dirs[this.orientation][turns[this.turn]]
      this.turn = (this.turn === 2) ? 0 : this.turn + 1
    }
    this.covering = intersection
    return this
  },
  turnAtCurve(curve = '') {
    if (curve === '/' || curve === '\\') {
      this.orientation = (curve.length)
        ? curves[curve][this.orientation]
        : this.orientation
    }
    this.covering = curve
    return this
  },
  applyVelocity() {
    const [ dx, dy ] = dirs[this.orientation].velocity
    this.x += dx
    this.y += dy
    return this
  },
  checkCollision(cars) {
    const counts = cars.reduce((acc, cur) => {
      acc[`${cur.x},${cur.y}`] = (acc[`${cur.x},${cur.y}`] || 0) + 1
      return acc
    }, {})

    const collision = (Object.values(counts).some(count => count > 1))

    return collision
  },
})


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
        const car = createCart({ x, y, orientation: i, covering: carTracks[i] })
        cars.push(car)
        map[y][x] = carTracks[i]
      } else {
        map[y][x] = i
      }
    }
  }

  return [ map, cars ]
}

const showMap = ([ map, cars ]) => {
  map.forEach(line => {
    console.log(line.join(''))
  })
  return [ map, cars ]
}

const showCars = ([ map, cars ]) => {
  cars.forEach(({ x, y, orientation, covering }, idx) => {
    console.log(idx, `[ ${x}, ${y} ]`, orientation, `on ${covering}`)
  })
  return [ map, cars ]
}

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
  let collision = false

  while(!collision) {
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
          console.log('HOLY FUCKING SHIT!!!', car.x, car.y)
          cars = cars.filter(c => c.x !== car.x && c.y !== car.y)
          map[car.y][car.x] = 'x'
          collision = true
        }
        car.turnAtCurve(map[car.y][car.x])
        car.turnAtIntersection(map[car.y][car.x])
      })
  }

  return [ map, cars ]
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
