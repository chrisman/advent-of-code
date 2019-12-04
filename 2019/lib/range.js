module.exports = (start, stop) => Array.from({ length: stop - start }).map((_, i) => start + i)
