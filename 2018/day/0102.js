const input = require('../data/01.data');

let repeatFound = false;
let freqs = [];
let answer = 0;

// there has got to be a better way
console.time('search');
while (!repeatFound) {
  for(let i = 0; i < input.length; i++) {
    answer += input[i];

    if (freqs.includes(answer)) {
      repeatFound = true;
      console.timeEnd('search');
      break;
    }

    freqs.push(answer);
  }
}

console.log(answer);
return answer;
