const { compose, head, tail, log } = require('../utils');
const input = require('../data/02.data').data;

const diffs = (string1) => (string2) => {
  let array1 = string1.split('');
  let array2 = string2.split('');
  let diffs = 0;

  array1.forEach((chr,idx) => {
    if (chr !== array2[idx]) diffs++;
  });

  return diffs;
}

const oneDiff = (string1) => (string2) => diffs(string1)(string2) === 1;

const correctIds = ({ item, list, answer }) => {
  if (list.length === 0) return;

  list.forEach(id => {
    if (oneDiff(item)(id))
      answer = [item, id];
  });

  return answer.length
    ? answer
    : correctIds({
        answer,
        item: head(list),
        list: tail(list),
      })
}

const commonLetters = ([ string1, string2 ]) => {
  const array1 = string1.split('');
  const array2 = string2.split('');
  let answer = [];

  array1.forEach((character, index) => {
    if (character === array2[index]) answer.push(character);
  });

  return answer.join('');
}

return compose(
  log('solution'),
  commonLetters,
  correctIds
) ({
  item: head(input),
  list: tail(input),
  answer: [],
})

