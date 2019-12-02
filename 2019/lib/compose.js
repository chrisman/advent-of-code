module.exports = (...fs) => x => fs.reduceRight((y, f) => f(y), x) 
