export function main(nums: number[]): number {
  for (const outter of nums) {
    for (const inner of nums) {
      const match = nums.find((x) => (2020 - outter - inner) === x);
      if (match) return outter * inner * match;
    }
  }
  return 0;
}
