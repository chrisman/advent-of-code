export function main(arr: string[]): number {
  const regex = /^(\d+)-(\d+) ([a-z]): ([a-z]*)$/;
  let correctPasswordCount = 0;

  for (const a of arr) {
    const match = a.match(regex);

    const i1 = match![1];
    const i2 = match![2];
    const char = match![3];
    const pwd = match![4];

    const first = pwd[+i1 - 1] === char;
    const second = pwd[+i2 - 1] === char;
    const condition = (first || second) && (!(first && second));
    if (condition) {
      correctPasswordCount += 1;
    }
  }

  return correctPasswordCount;
}
