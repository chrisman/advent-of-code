const describe = (name, cb) => {

  console.log(`# ${name}`);

  let counter = 0

  const t = ({ given, skip = false, should, actual, expected }) => {
    counter++;
    if (actual === expected) {
      console.log(`ok ${counter} Given ${given}: should ${should}`)
    } else {
      console.error(`not ok ${counter} Given ${given}: should ${should}`)
      console.error(`  ---`)
      console.error(`     expected: ${expected}`);
      console.error(`     actual:   ${actual}`);
      console.error(`  ---`)
    }
  }

  cb(t)
}

module.exports = describe
