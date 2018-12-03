const changes = require('../data/01.data');

/*
 * If you apply the list of changes e.g. [+1, +1, +10, -9] to a starting value
 * (0), you'll get a list of frequncies: [0, 1, 2, 12, 3]
 *
 * carry the last number, the final sum of the instructions, over to be the
 * starting value for the next iteration and apply the same list of changes. Do
 * this a couple times:
 *
 * 1 |  0,  1,  2, 12
 * 2 |  3,  4,  5, 15
 * 3 |  6,  7,  8, 18
 * 4 |  9, 10, 11, 21
 * 5 | 12, 13, 14, 24 <-- the first repeating value is 12
 *
 * ...and you'll start to see that each new iteration is a multiple of the
 * final sum plus the corresponding value from the 1st interation:
 *
 *   x = y + s * n
 *
 * where y is the 1st gen value
 *       s is the final sum or the offset value
 *       n is the generation number
 *
 * So what you need to do is:
 *
 * 1. find all pairs in the 1st iteration that are offset by a multiple of the
 *    final sum of the 1st iteration (because these numbers are on a "collision
 *    path" and will eventually repeat)
 *
 * 2. select the pair that are closest together (offset by the smallest index
 *    difference)
 *
 * 3. select the larger number of the pair.
 *
 */

const frequencies = changes.reduce((acc, curr) => {
  const sum = Number(acc.slice(-1)) + Number(curr);
  return acc.concat(sum);
}, [0])

const finalSum = frequencies.pop() // -> 574

let minOffset = Infinity;
let minIndex  = Infinity;
let minRepeat = null;

// modulus with negative numbers is weird
const mod = (divisor) => (dividend) => (dividend % divisor + divisor) % divisor
const modShift = mod(finalSum)

console.time('search')
outerloop:
for (let i = 0; i < frequencies.length; i++) {

  innerloop:
  for (let j = i + 1; j < frequencies.length; j++) {

    const freqA = frequencies[i];
    const freqB = frequencies[j];
    const isSameModGroup = modShift(freqA) === modShift(freqB);

    if (isSameModGroup) {
      const offset = Math.abs(freqA - freqB);
      if (offset <= minOffset) {
        const index = (finalSum > 0)
          ? (freqA > freqB ? j : i)
          : (freqA > freqB ? i : j)
        const smallerMultiple = (offset < minOffset);
        const smallerIndex    = (index < minIndex);
        const isNewCandidate  = smallerMultiple || smallerIndex;

        if (isNewCandidate) {
          minOffset = offset;
          minIndex  = index;
          minRepeat = (finalSum > 0)
            ? Math.max(freqA, freqB)
            : Math.min(freqA, freqB);
        }
      }
    }
  }
}
console.timeEnd('search')

console.log(minRepeat);
