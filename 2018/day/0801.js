const { test, data } = require('../data/08.data')
const { head, tail, log, compose } = require('../utils')

const header = (list) => [
  [
    head(list),       // children
    head(tail(list))  // metadata
  ],
  tail(tail(list))    // rest
]

const children = ([ [ numChildren, numMetadata ], list ]) => {
  let childs = []
  let num = numChildren
  let lst = list
  while (num > 0) {
    [ h, c, m, lst ] = node(lst)
    childs.push([ h, c, m ])
    num--
  }

  return [
    [ numChildren, numMetadata ],
    childs,
    lst
  ]
}

const metadata = ([ [ numChildren, numMetadata ], children, list]) => {
  const result = [
    [ numChildren, numMetadata ], // header
    children,                     // children
    list.slice(0, numMetadata),   // meta
    list.slice(numMetadata)       // rest
  ]
  return result
}

const allMeta = ([ header, children, metadata ]) => {
  const inner = (acc, [ h, c, m ]) => {
    c.forEach(child => inner(acc, child))
    acc.push(m)
    return acc
  }

  return inner(
    [],
    [
      header,
      children,
      metadata
    ]
  )
}

const flattenAndSum = (arr) => arr
  .reduce((acc, cur) => acc = acc.concat(cur) , [])
  .map(s => +s)
  .reduce((x, y) => x + y)

const node = compose(
  metadata,
  children,
  header,
)

const split = (arr) => arr.split(' ')

const main = compose(
  log('solution'),
  flattenAndSum,
  allMeta,
  node,
  split,
) (data)
