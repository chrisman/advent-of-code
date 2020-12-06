export function processData(s: string) {
  return s.split("\n\n");
}
function removeNewLines(s: string) {
  return s.replace(/\n/g, "");
}
function stringToArray(s: string) {
  return s.split("");
}
function arrayOfUniqueStrings(a: string[]) {
  return a.filter(function removeDuplicates(c, i, a) {
    return a.indexOf(c) === i;
  });
}
function arrayToArrayLength(a: string[]) {
  return a.length;
}
export function sumAllNums(a: number, b: number) {
  return a + b;
}

export function main(data: string): number {
  return processData(data)
    .map(removeNewLines)
    .map(stringToArray)
    .map(arrayOfUniqueStrings)
    .map(arrayToArrayLength)
    .reduce(sumAllNums);
}
