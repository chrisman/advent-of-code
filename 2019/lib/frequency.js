module.exports = (arr) => arr.reduce((acc, x) => { acc[x] = (acc[x] || 0) + 1; return acc; }, {});
