const out = str => { console.log(str) }

const createDescribe = () => {
  let counter = 0

  return (label, assertions) => {
    out(`# ${label}`);
    const assert = ({ given, skip = false, should, actual, expected }) => {
      counter++;
      if (actual === expected) {
        out(`ok ${counter} Given ${given}: should ${should}`)
      } else {
        out(`not ok ${counter} Given ${given}: should ${should}`)
        out(`  ---`)
        out(`  expected: ${expected}`);
        out(`  actual:   ${actual}`);
        out(`  ...`)
      }
    }
    assertions(assert)
  }
}

module.exports = createDescribe()
