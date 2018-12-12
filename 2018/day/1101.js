const serialNumber = 5235
const gridSize = 8

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

const squareCoords = (x, y, size = 3) => [
  // first row
  [x     , y],
  [x + 1 , y],
  [x + 2 , y],
  // second row
  [x     , y + 1],
  [x + 1 , y + 1],
  [x + 2 , y + 1],
  // third row
  [x     , y + 2],
  [x + 1 , y + 2],
  [x + 2 , y + 2],
]

const squareValues = (grid) => {
  let result = []
  for(let y = 1; y < grid.length - 2; y++) {
    result[y] = []
    for(let x = 1; x < grid.length - 2; x++) {
      result[y][x] = squareCoords(x, y)
        .map(([ _x, _y ]) => grid[_y][_x])
        .reduce((a, b) => a + b)
    }
  }
  return result
}

const greatestSquare = (grid) => {
  let greatest = 0
  let coords = []
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
    const rackId = x + 10
    const _powerLevel = rackId * y + serialNumber
    const powerLevel = _powerLevel * rackId
    const hundreds = (powerLevel.toString().length >= 3) ? Number(powerLevel.toString().slice(-3)[0]) : 0
    grid[y][x] = hundreds - 5
  }
}

console.log(prettyGrid(grid))
console.log(greatestSquare(squareValues(grid)))
