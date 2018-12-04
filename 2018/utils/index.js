const compose = (...funs) => (init) => funs.reduceRight((x, f) => f(x), init);
const head = (arr) => arr[0];
const log = (label) => (x) => { console.log(`${label}:`, x); return x; };
const map = (fun) => (arr) => arr.map(fun);
const reduce = (fun, init) => (arr) => arr.reduce(fun, init);
const tail = (arr) => arr.slice(1);
const countBy = (arr) => arr.reduce((acc, x) => {
  acc[x] = (acc[x] || 0) + 1;
  return acc;
}, {});

module.exports = {
  compose,
  countBy,
  head,
  log,
  map,
  reduce,
  tail,
}
