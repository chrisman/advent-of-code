import { main } from "../src/0102.ts";
import { assertEquals } from "./deps.ts";
import { data, mock } from "../data/0101.ts";

Deno.test({
  name: "works with mock data",
  fn(): void {
    const expected = 241861950;
    const actual = main(mock);
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "works with real data",
  fn(): void {
    const expected = 131248694;
    const actual = main(data);
    assertEquals(actual, expected);
  },
});
