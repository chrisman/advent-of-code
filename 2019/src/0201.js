const computer = (program) => (noun, verb) => {
  const xs = program.split(',').map(Number)
  const STEP = 4
  const HALT = 99

  let ptr = 0

  xs[1] = noun
  xs[2] = verb

  while (xs[ptr] !== HALT) {
    const [ op, i, j, k ] = xs.slice(ptr, ptr + 4)
    const [ x, y ] = [ xs[i], xs[j] ]
    xs[k] = (op === 1)
      ? x + y
      : x * y
    ptr += STEP
  }

  return xs[0]
}

module.exports = computer
