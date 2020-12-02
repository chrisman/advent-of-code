import { main } from "../src/0201.ts";
import { assertEquals } from "./deps.ts";
import { data, mock } from "../data/0201.ts";

Deno.test({
  name: "0201 works with mock data",
  fn(): void {
    const expected = 2;
    const actual = main(mock);
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "0201 works with real data",
  fn(): void {
    const expected = 643;
    const actual = main(data);
    assertEquals(actual, expected);
  },
});
