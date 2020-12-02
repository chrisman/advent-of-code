export function main(arr: string[]): number {
  const regex = /^(\d+)-(\d+) ([a-z]): ([a-z]*)$/;
  let correctPasswordCount = 0;

  for (const a of arr) {
    const match = a.match(regex);

    const min = match![1];
    const max = match![2];
    const char = match![3];
    const pwd = match![4];

    const r = new RegExp(char, "g");
    const matches = pwd.match(r);
    const l = matches?.length || 0;

    if (l >= +min && l <= +max) {
      correctPasswordCount += 1;
    }
  }

  return correctPasswordCount;
}
