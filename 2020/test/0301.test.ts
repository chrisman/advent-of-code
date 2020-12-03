import { main } from "../src/0301.ts";
import { assertEquals } from "./deps.ts";
import { data, mock } from "../data/0301.ts";

Deno.test({
  name: "0301 works with mock data",
  fn(): void {
    const expected = 7;
    const actual = main(mock);
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "0301 works with real data",
  fn(): void {
    const expected = 292;
    const actual = main(data);
    assertEquals(actual, expected);
  },
});
