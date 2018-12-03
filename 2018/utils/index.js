const compose = (...funs) => (init) => funs.reduceRight((x, f) => f(x), init);
const head = (arr) => arr[0];
const log = (label) => (x) => { console.log(`${label}:`, x); return x; };
const map = (fun) => (arr) => arr.map(fun);
const reduce = (fun, init = 0) => (arr) => arr.reduce(fun, init);
const tail = (arr) => arr.slice(1);
const countBy = (arr) => arr.reduce((acc, x) => {
  if (acc[x]) acc[x] += 1;
  else acc[x] = 1;
  return x;
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
