const out = str => { console.log(str) }
const stringify = JSON.stringify

const createDescribe = () => {
  let counter = 0

  return (label, assertions) => {
    out(`# ${label}`);
    const assert = ({ given, skip = false, should, actual, expected }) => {
      counter++;
      if (stringify(actual) === stringify(expected)) {
        out(`ok ${counter} Given ${given}: should ${should}`)
      } else {
        out(`not ok ${counter} Given ${stringify(given)}, it should ${should}`)
        out(`  ---`)
        out(`  expected: ${stringify(expected)}`);
        out(`  actual:   ${stringify(actual)}`);
        out(`  ...`)
      }
    }
    assertions(assert)
  }
}

module.exports = createDescribe()
