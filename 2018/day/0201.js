const input = require('../data/02.data').data
const { compose, map, reduce, log } = require('../utils');

const arrayFromString = (string) => string.split('');

const objectOfCountedArrayItems = (accumulator, value) => {
  if (accumulator[value]) accumulator[value] += 1;
  else accumulator[value] = 1;
  return accumulator;
}
const letterFrequency = (arr) => reduce(objectOfCountedArrayItems, {})(arr)

const hasTwoAndOrThreeRepeats = (obj) => ({
  two: Object.values(obj).includes(2),
  three: Object.values(obj).includes(3)
});

const numberOfTwosAndThrees = (arr) => arr.reduce((obj, next) => {
  if (next["two"])   obj[0]["two"]   += 1
  if (next["three"]) obj[0]["three"] += 1
  return obj;
}, [{ two: 0, three: 0 }]);

const multiply = (arr) => arr.two * arr.three;

return compose(
  log('result'),
  map(multiply),
  numberOfTwosAndThrees,
  map(hasTwoAndOrThreeRepeats),
  map(letterFrequency),
  map(arrayFromString)
)(input)
