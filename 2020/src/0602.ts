import { processData } from "./0601.ts";
import { sumAllNums } from "../lib/mod.ts";

function splitOnNewline(s: string): string[] {
  return s.split("\n");
}
function removeEmpties(xs: string[]): string[] {
  return xs.filter((x) => x.length);
}
function stringToAnswer(xs: string[]): number {
  if (xs.length === 1) {
    return xs[0].length;
  }

  let count = 0;

  for (const answers of xs) {
    for (const answer of answers) {
      const everyone = xs.every((x) => x.includes(answer));
      if (everyone) {
        const re = new RegExp(answer, "g");
        xs = xs.map((as) => as.replace(re, ""));
        count += 1;
      }
    }
  }

  return count;
}

export function main(data: string) {
  return processData(data)
    .map(splitOnNewline)
    .map(removeEmpties)
    .map(stringToAnswer)
    .reduce(sumAllNums);
}
