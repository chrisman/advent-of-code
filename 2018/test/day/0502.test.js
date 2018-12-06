const describe = require('../tap')
const { data, test } = require('../../data/05.data')
const {
  main,
  polymerToLength,
  findShortest,
  alphabet,
  removeTypes,
  mappy,
  reactPolymers,
} = require('../../day/0502')

describe('alphabet', assert => {
  assert({
    given: 'the alphabet',
    should: 'be the alphabet!',
    actual: JSON.stringify(alphabet),
    expected: JSON.stringify(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'])
  })
})

describe('mappy()', assert => {
  assert({
    given: 'test string',
    should: 'return an alphabet object of all the strings',
    actual: JSON.stringify(mappy(alphabet)(test)),
    expected: JSON.stringify({"a":"dabAcCaCBAcCcaDA","b":"dabAcCaCBAcCcaDA","c":"dabAcCaCBAcCcaDA","d":"dabAcCaCBAcCcaDA","e":"dabAcCaCBAcCcaDA","f":"dabAcCaCBAcCcaDA","g":"dabAcCaCBAcCcaDA","h":"dabAcCaCBAcCcaDA","i":"dabAcCaCBAcCcaDA","j":"dabAcCaCBAcCcaDA","k":"dabAcCaCBAcCcaDA","l":"dabAcCaCBAcCcaDA","m":"dabAcCaCBAcCcaDA","n":"dabAcCaCBAcCcaDA","o":"dabAcCaCBAcCcaDA","p":"dabAcCaCBAcCcaDA","q":"dabAcCaCBAcCcaDA","r":"dabAcCaCBAcCcaDA","s":"dabAcCaCBAcCcaDA","t":"dabAcCaCBAcCcaDA","u":"dabAcCaCBAcCcaDA","v":"dabAcCaCBAcCcaDA","w":"dabAcCaCBAcCcaDA","x":"dabAcCaCBAcCcaDA","y":"dabAcCaCBAcCcaDA","z":"dabAcCaCBAcCcaDA"})
  })
})

describe('removeTypes()', assert => {
  const actual = {"a":"dabAcCaCBAcCcaDA","b":"dabAcCaCBAcCcaDA","c":"dabAcCaCBAcCcaDA","d":"dabAcCaCBAcCcaDA","e":"dabAcCaCBAcCcaDA","f":"dabAcCaCBAcCcaDA","g":"dabAcCaCBAcCcaDA","h":"dabAcCaCBAcCcaDA","i":"dabAcCaCBAcCcaDA","j":"dabAcCaCBAcCcaDA","k":"dabAcCaCBAcCcaDA","l":"dabAcCaCBAcCcaDA","m":"dabAcCaCBAcCcaDA","n":"dabAcCaCBAcCcaDA","o":"dabAcCaCBAcCcaDA","p":"dabAcCaCBAcCcaDA","q":"dabAcCaCBAcCcaDA","r":"dabAcCaCBAcCcaDA","s":"dabAcCaCBAcCcaDA","t":"dabAcCaCBAcCcaDA","u":"dabAcCaCBAcCcaDA","v":"dabAcCaCBAcCcaDA","w":"dabAcCaCBAcCcaDA","x":"dabAcCaCBAcCcaDA","y":"dabAcCaCBAcCcaDA","z":"dabAcCaCBAcCcaDA"}
  const expected = [["a","dbcCCBcCcD"],["b","daAcCaCAcCcaDA"],["c","dabAaBAaDA"],["d","abAcCaCBAcCcaA"],["e","dabAcCaCBAcCcaDA"],["f","dabAcCaCBAcCcaDA"],["g","dabAcCaCBAcCcaDA"],["h","dabAcCaCBAcCcaDA"],["i","dabAcCaCBAcCcaDA"],["j","dabAcCaCBAcCcaDA"],["k","dabAcCaCBAcCcaDA"],["l","dabAcCaCBAcCcaDA"],["m","dabAcCaCBAcCcaDA"],["n","dabAcCaCBAcCcaDA"],["o","dabAcCaCBAcCcaDA"],["p","dabAcCaCBAcCcaDA"],["q","dabAcCaCBAcCcaDA"],["r","dabAcCaCBAcCcaDA"],["s","dabAcCaCBAcCcaDA"],["t","dabAcCaCBAcCcaDA"],["u","dabAcCaCBAcCcaDA"],["v","dabAcCaCBAcCcaDA"],["w","dabAcCaCBAcCcaDA"],["x","dabAcCaCBAcCcaDA"],["y","dabAcCaCBAcCcaDA"],["z","dabAcCaCBAcCcaDA"]]

  assert({
    given: "a test object",
    should: `remove instances of each key's value in the entry`,
    actual: JSON.stringify(removeTypes(actual)),
    expected: JSON.stringify(expected)
  })
})

describe('reactPolymers()', assert => {
  const actual = [["a","dbcCCBcCcD"],["b","daAcCaCAcCcaDA"],["c","dabAaBAaDA"],["d","abAcCaCBAcCcaA"],["e","dabAcCaCBAcCcaDA"],["f","dabAcCaCBAcCcaDA"],["g","dabAcCaCBAcCcaDA"],["h","dabAcCaCBAcCcaDA"],["i","dabAcCaCBAcCcaDA"],["j","dabAcCaCBAcCcaDA"],["k","dabAcCaCBAcCcaDA"],["l","dabAcCaCBAcCcaDA"],["m","dabAcCaCBAcCcaDA"],["n","dabAcCaCBAcCcaDA"],["o","dabAcCaCBAcCcaDA"],["p","dabAcCaCBAcCcaDA"],["q","dabAcCaCBAcCcaDA"],["r","dabAcCaCBAcCcaDA"],["s","dabAcCaCBAcCcaDA"],["t","dabAcCaCBAcCcaDA"],["u","dabAcCaCBAcCcaDA"],["v","dabAcCaCBAcCcaDA"],["w","dabAcCaCBAcCcaDA"],["x","dabAcCaCBAcCcaDA"],["y","dabAcCaCBAcCcaDA"],["z","dabAcCaCBAcCcaDA"]]
  const expected = [["a","dbCBcD"],["b","daCAcaDA"],["c","daDA"],["d","abAaCBAc"],["e","dabCBAcaDA"],["f","dabCBAcaDA"],["g","dabCBAcaDA"],["h","dabCBAcaDA"],["i","dabCBAcaDA"],["j","dabCBAcaDA"],["k","dabCBAcaDA"],["l","dabCBAcaDA"],["m","dabCBAcaDA"],["n","dabCBAcaDA"],["o","dabCBAcaDA"],["p","dabCBAcaDA"],["q","dabCBAcaDA"],["r","dabCBAcaDA"],["s","dabCBAcaDA"],["t","dabCBAcaDA"],["u","dabCBAcaDA"],["v","dabCBAcaDA"],["w","dabCBAcaDA"],["x","dabCBAcaDA"],["y","dabCBAcaDA"],["z","dabCBAcaDA"]]

  assert({
    given: "a test array",
    should: `react them polymers!`,
    actual: JSON.stringify(reactPolymers(actual)),
    expected: JSON.stringify(expected)
  })
})
describe('polymerToLength()', assert => {
  const actual = [["a","dbCBcD"],["b","daCAcaDA"],["c","daDA"],["d","abAaCBAc"],["e","dabCBAcaDA"],["f","dabCBAcaDA"],["g","dabCBAcaDA"],["h","dabCBAcaDA"],["i","dabCBAcaDA"],["j","dabCBAcaDA"],["k","dabCBAcaDA"],["l","dabCBAcaDA"],["m","dabCBAcaDA"],["n","dabCBAcaDA"],["o","dabCBAcaDA"],["p","dabCBAcaDA"],["q","dabCBAcaDA"],["r","dabCBAcaDA"],["s","dabCBAcaDA"],["t","dabCBAcaDA"],["u","dabCBAcaDA"],["v","dabCBAcaDA"],["w","dabCBAcaDA"],["x","dabCBAcaDA"],["y","dabCBAcaDA"],["z","dabCBAcaDA"]]
  const expected = [["a",6],["b",8],["c",4],["d",8],["e",10],["f",10],["g",10],["h",10],["i",10],["j",10],["k",10],["l",10],["m",10],["n",10],["o",10],["p",10],["q",10],["r",10],["s",10],["t",10],["u",10],["v",10],["w",10],["x",10],["y",10],["z",10]]

  assert({
    given: "a test array",
    should: `reduce polymers to lengths`,
    actual: JSON.stringify(polymerToLength(actual)),
    expected: JSON.stringify(expected)
  })
})

describe('findShortest()', assert => {
  const actual = [["a",6],["b",8],["c",4],["d",8],["e",10],["f",10],["g",10],["h",10],["i",10],["j",10],["k",10],["l",10],["m",10],["n",10],["o",10],["p",10],["q",10],["r",10],["s",10],["t",10],["u",10],["v",10],["w",10],["x",10],["y",10],["z",10]]
  const expected = ["c",4]

  assert({
    given: "a test array",
    should: `return the tuple with the shortest length`,
    actual: JSON.stringify(findShortest(actual)),
    expected: JSON.stringify(expected)
  })
})

describe('main()', assert => {

  assert({
    given: 'test data',
    should: `return the length of the shortest possible fully reacter polymer`,
    actual: main(test),
    expected: 4
  })

  assert({
    given: 'real data',
    should: `return the length of the shortest possible fully reacter polymer`,
    actual: main(data),
    expected: 4282
  })

})
