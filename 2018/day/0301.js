const input = require('../data/03.data').data

let overlaps = {};

input.forEach(line => {
  [ id, at, init, size ] = line.split(' ');
  [ x, y ] = init.slice(0, -1).split(',').map(str => +str);
  [ w, h ] = size.split('x').map(str => +str);

  for(let i = x; i < x + w; i++) {
    for(let j = y; j < y + h; j++) {
      overlaps[`${i}x${j}`] = (overlaps[`${i}x${j}`] || 0) + 1;
    }
  }
});

const answer = Object.values(overlaps)
  .filter(num => num > 1)
  .length

console.log(answer);
