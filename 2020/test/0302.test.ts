import { main } from "../src/0302.ts";
import { assertEquals } from "./deps.ts";
import { data, mock } from "../data/0301.ts";

Deno.test({
  name: "0302 works with mock data",
  fn(): void {
    const expected = 336;
    const actual = main(mock);
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "0302 works with real data",
  fn(): void {
    const expected = 9354744432;
    const actual = main(data);
    assertEquals(actual, expected);
  },
});
