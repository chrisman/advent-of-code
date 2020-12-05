export function main(data: string) {
  const parsedData = data.split("\n\n")
    .map((line) => line.split(/[ \n]/))
    .map((line) => line.filter((a) => a.length))
    .map((line) => line.map((x) => x.slice(0, 3)));

  const required = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
  ];

  return parsedData.reduce((acc, curr) => {
    acc += (required.every((r) => curr.includes(r))) ? 1 : 0;
    return acc;
  }, 0);
}
