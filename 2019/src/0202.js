const computer = require('./0201.js')
const expected = 19690720

module.exports = (d) => {
  for(let noun = 0; noun <= 99; noun++) {
    for(let verb = 0; verb <= 99; verb++) {
      if(computer(d)(noun, verb) === expected) {
        return 100 * noun + verb
      }
    }
  }
}
