const {
  lines,
  intersects,
} = require ('./0301')

const main = (wire1, wire2) => {
  const _l = lines([ wire1, wire2 ])
  const i = intersects(_l)
  const l = _l.map(line => line.map(a => `${a[0]},${a[1]}`))

  let min = Infinity
  Object.keys(i).forEach(key => {
    const dist = l[0].indexOf(key) + l[1].indexOf(key)
    min = (dist < min) ? dist : min
  })

  return min
}

module.exports = {
  main,
}
