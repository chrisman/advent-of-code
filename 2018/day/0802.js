const { sum, tail } = require('../utils')
const input = require('../data/08.data').data.split(/ /).map(Number)

const parseNodes = (data) => {
  const node = {
    children : [],
    meta     : [],
    sum      : function() {
      return (this.children.length === 0)
        ? this.meta
            .reduce(sum)
        : this.meta
            .filter(i => (i <= this.children.length))
            .map(n => this.children[n - 1].sum())
            .reduce(sum)
    }
  }

  let childCount = data.shift()
  let metaCount  = data.shift()

  while(childCount--) {
    node.children.push(parseNodes(data))
  }

  while(metaCount--) {
    let m = data.shift()
    node.meta.push(m)
  }

  return node
}

console.log(parseNodes(input).sum())
