const serialNumber = 5235
const gridSize = 300

const leftpad = (x, filler = ' ', length = 4) =>
  (Array.from({ length }).map(_ => filler).join('') + x).slice(length * -1)

const prettyGrid = (grid) => {
  let result = ''
  for(let y = 1; y < grid.length; y++) {
    for(let x = 1; x < grid.length; x++) {
      result += leftpad(grid[y][x])
    }
    result += '\n'
  }
  return result
}

const squareCoords = (x, y, size = 3) => {
  let result = []
  for(let _y = 0; _y < size; _y++) {
    for(let _x = 0; _x < size; _x++) {
      result.push([ x + _x, y + _y])
    }
  }
  return result
}

const squareValues = (grid, size = 3) => {
  let result = []
  for(let y = 1; y < grid.length - (size - 1); y++) {
    result[y] = []
    for(let x = 1; x < grid.length - (size - 1); x++) {
      result[y][x] = squareCoords(x, y, size)
        .map(([ _x, _y ]) => grid[_y][_x])
        .reduce((a, b) => a + b)
    }
  }
  return result
}

const greatestSquare = (grid) => {
  let greatest = Number.NEGATIVE_INFINITY
  let coords   = []
  for(let y = 1; y < grid.length; y++) {
    for(let x = 1; x < grid.length; x++) {
      let val = grid[y][x]
      if (val > greatest) {
        greatest = val
        coords = [x,y]
      }
    }
  }
  return [ coords, greatest ]
}

let grid = []
for(let y = 1; y < gridSize + 1; y++) {
  grid[y] = []
  for(let x = 1; x < gridSize + 1; x++) {
    const rackId      = x + 10
    const _powerLevel = rackId * y + serialNumber
    const powerLevel  = _powerLevel * rackId
    const hundreds    = (powerLevel.toString().length >= 3)
      ? Number(powerLevel.toString().slice(-3)[0])
      : 0
    grid[y][x] = hundreds - 5
  }
}

let greatestGreatestSquare = [, Number.NEGATIVE_INFINITY ,]
for(let i = 20; i > 1; i--) {
  let a = greatestSquare(squareValues(grid, i))
  a.push(i)
  if (a[1] > greatestGreatestSquare[1]) {
    greatestGreatestSquare = a
  }
}

console.log(greatestGreatestSquare)
