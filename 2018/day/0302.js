const input = require('../data/03.data').data
const { compose, log } = require('../utils');

const makeClaim = (acc, line) => {
  [ id, at, init, size ] = line.split(' ');
  [ x, y ] = init.slice(0, -1).split(',').map(str => +str);
  [ w, h ] = size.split('x').map(str => +str);

  return acc.concat({ id, x, y, w, h });
};
const claimsFromInput = (arr) => arr.reduce(makeClaim, []);

const claimsDoOverlap = ({ claim1, claim2 }) =>
  claim1.x < claim2.x + claim2.w
  && claim1.y < claim2.y + claim2.h
  && claim2.x < claim1.x + claim1.w
  && claim2.y < claim1.y + claim1.h

const findLoneClaim = (doesOverlap) => (claims) => {

  outterloop:
  for(let i = 0; i < claims.length; i++) {
    let isLone = true;

    innerloop:
    for(let j = 0; j < claims.length; j++) {
      if(i === j) continue innerloop;

      const isOverlap = doesOverlap({
        claim1: claims[i],
        claim2: claims[j]
      })

      if(isOverlap) {
        isLone = false;
        continue outterloop;
      }
    }

    if (isLone) return claims[i].id
  }
}

return compose(
  log('solution'),
  findLoneClaim(claimsDoOverlap),
  claimsFromInput,
)(input);
