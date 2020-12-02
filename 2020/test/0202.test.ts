import { main } from "../src/0202.ts";
import { assertEquals } from "./deps.ts";
import { data, mock } from "../data/0201.ts";

Deno.test({
  name: "0202 works with mock data",
  fn(): void {
    const expected = 1;
    const actual = main(mock);
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "0202 works with real data",
  fn(): void {
    const expected = 388;
    const actual = main(data);
    assertEquals(actual, expected);
  },
});
