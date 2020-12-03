export function main(arr: string[]) {
  const slope = {
    x: 3,
    y: 1,
  };
  let trees = 0;

  const height = arr.length;
  const width = arr[0].length;

  let y = slope.y;
  let x = slope.x;

  while (y < height) {
    trees += (arr[y][x] === "#") ? 1 : 0;
    y += slope.y;
    x = (x + slope.x) % width;
  }

  return trees;
}
