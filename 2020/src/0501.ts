function parseData(data: string) {
  return data
    .split("\n")
    .filter((s) => s.length);
}
interface Seat {
  min: number;
  max: number;
  lower: "L" | "F";
  upper: "B" | "R";
}

function processSeat(str: string, s: Seat) {
  for (const c of str) {
    if (c == s.lower) {
      s.max = s.max - (Math.ceil((s.max - s.min) / 2));
    } else if (c == s.upper) {
      s.min = s.min + (Math.ceil((s.max - s.min) / 2));
    } else {
      throw new Error(
        `@processSeat: illegal instruction: ${c} in ${str}. Should be one of ${s.lower} ${s.upper}`,
      );
    }
  }
  return s.max;
}

export function dataToSeatIds(d: string) {
  const col: Seat = {
    min: 0,
    max: 7,
    lower: "L",
    upper: "R",
  };
  const row: Seat = {
    min: 0,
    max: 127,
    lower: "F",
    upper: "B",
  };

  return parseData(d)
    .map(function stringToRowAndColInstructions(str) {
      return [
        str.slice(0, -3), // row
        str.slice(-3), // col
      ];
    })
    .map(function instructionsToSeatNumbers([r, c]) {
      return [
        processSeat(r, Object.assign({}, row)),
        processSeat(c, Object.assign({}, col)),
      ];
    })
    .map(function seatNumberToSeatId(rowCol) {
      return rowCol[0] * 8 + rowCol[1];
    });
}

export function main(data: string) {
  return dataToSeatIds(data)
    .reduce(function largestSeatId(a, b) {
      return a > b ? a : b;
    });
}
