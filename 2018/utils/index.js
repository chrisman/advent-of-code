const compose = (...funs) => (init) => funs.reduceRight((x, f) => f(x), init);
const log = (label) => (x) => { console.log(`${label}:`, x); return x; };
const head = (arr) => arr[0];
const tail = (arr) => arr.slice(1);
const map = (fun) => (arr) => arr.map(fun);
const reduce = (fun, init) => (arr) => arr.reduce(fun, init);
const isFunction = (f) => f && {}.toString.call(f) === '[object Function]';
const countBy = (arr) => arr.reduce((acc, x) => {
  acc[x] = (acc[x] || 0) + 1;
  return acc;
}, {});

module.exports = {
  compose,
  countBy,
  head,
  isFunction,
  log,
  map,
  reduce,
  tail,
}
