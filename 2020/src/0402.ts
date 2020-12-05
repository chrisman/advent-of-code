export function main(data: string) {
  const docs = data.split("\n\n")
    .map((line) => line.split(/[ \n]/))
    .map((line) => line.filter((a) => a.length))
    .map((line) =>
      line.map((x) => {
        const [key, value] = x.split(":");
        return {
          name: key,
          value,
        };
      })
    );

  interface Constraint {
    name: string;
    presence: boolean;
    pattern(x: string): boolean;
  }

  const constraints: Constraint[] = [
    {
      name: "byr",
      presence: true,
      pattern: (x: string): boolean => (+x >= 1920 && +x <= 2002),
    },
    {
      name: "iyr",
      presence: true,
      pattern: (x: string): boolean => (+x >= 2010 && +x <= 2020),
    },
    {
      name: "eyr",
      presence: true,
      pattern: (x: string): boolean => (+x >= 2020 && +x <= 2030),
    },
    {
      name: "hgt",
      presence: true,
      pattern: (x: string): boolean => {
        const [num, unit] = [parseInt(x.slice(0, -2), 10), x.slice(-2)];
        switch (unit) {
          case "cm":
            return (num >= 150 && num <= 193);
          case "in":
            return (num >= 59 && num <= 76);
          default:
            return false;
        }
      },
    },
    {
      name: "hcl",
      presence: true,
      pattern: (x: string): boolean => {
        const reg = /#[a-z0-9]{6}/;
        return reg.test(x);
      },
    },
    {
      name: "ecl",
      presence: true,
      pattern: (x: string): boolean => {
        return [
          "amb",
          "blu",
          "brn",
          "gry",
          "grn",
          "hzl",
          "oth",
        ].includes(x);
      },
    },
    {
      name: "pid",
      presence: true,
      pattern: (x: string): boolean => {
        const reg = /[0-9]{9}/;
        return reg.test(x);
      },
    },
    {
      name: "cid",
      presence: false,
      pattern: (x) => true,
    },
  ];

  return docs
    .filter(function hasAllRequiredFields(doc) {
      const requireds = constraints
        .filter((c) => c.presence)
        .map((c) => c.name);
      const names = doc.map(({ name }) => name);
      return requireds.every((r) => names.includes(r));
    })
    .reduce(function numberOfValidDocuments(acc: number, doc) {
      acc += doc.every(({ name, value }) =>
          constraints.find((c) =>
            c.name === name
          )!.pattern(value)
        )
        ? 1
        : 0;
      return acc;
    }, 0);
}
