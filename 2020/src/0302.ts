export function main(arr: string[]): number {
  const slopes = [
    {
      x: 3,
      y: 1,
    },
    {
      x: 1,
      y: 1,
    },
    {
      x: 5,
      y: 1,
    },
    {
      x: 7,
      y: 1,
    },
    {
      x: 1,
      y: 2,
    },
  ];

  const height = arr.length;
  const width = arr[0].length;

  const treeTallies: number[] = [];

  for (const slope of slopes) {
    let trees = 0;
    let y = slope.y;
    let x = slope.x;

    while (y < height) {
      trees += (arr[y][x] === "#") ? 1 : 0;
      y += slope.y;
      x = (x + slope.x) % width;
    }

    treeTallies.push(trees);
  }

  return treeTallies.reduce((a, b) => a * b);
}
