const compose = (...funs) => (init) => funs.reduceRight((x, f) => f(x), init);
const countBy = (arr) => arr.reduce((acc, x) => { acc[x] = (acc[x] || 0) + 1; return acc; }, {});
const head = (arr) => arr[0];
const isFunction = (f) => f && {}.toString.call(f) === '[object Function]';
const filter = (f) => (arr) => arr.filter(f)
const leftpad = (x, pad = ' ', size = 4) => (Array.from({ length: size }).map(_ => pad).join('') + x).slice(size * -1)
const log = (label) => (x) => { console.log(`${label}:`, JSON.stringify(x)); return x; };
const map = (fun) => (arr) => arr.map(fun);
const num = (str) => parseInt(str, 10);
const range = (a, b) => Array.from({ length: b - a }).map((_, i) => a + i)
const reduce = (fun, init) => (arr) => arr.reduce(fun, init);
const split = (str) => (arr) => arr.split(str)
const sum = (x, y) => x + y
const tail = (arr) => arr.slice(1);
const uniq = (cur, idx, arr) => arr.indexOf(cur) === idx

module.exports = {
  compose,
  countBy,
  head,
  isFunction,
  filter,
  leftpad,
  log,
  map,
  num,
  range,
  reduce,
  split,
  sum,
  tail,
  uniq,
}
