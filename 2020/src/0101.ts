export function main(nums: number[]): number {
  for (const n of nums) {
    const match = nums.find(x => (2020 - x) === n)
    if (match) return match * n
  }
  return 0
}
