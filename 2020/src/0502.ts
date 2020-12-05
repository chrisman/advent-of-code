import { dataToSeatIds } from "./0501.ts";

export function main(data: string) {
  const ids = dataToSeatIds(data)
    .sort(function lowestToHighest(a, b) {
      return +a < +b ? -1 : 1;
    });

  // Find missing number
  for (let i = ids[0]; i < ids.length + ids[0]; i++) {
    if (ids.indexOf(i) === -1) return i;
  }
}
