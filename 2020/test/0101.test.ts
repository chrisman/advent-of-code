import { main } from "../src/0101.ts";
import { assertEquals } from "./deps.ts";
import { data, mock } from "../data/0101.ts";

Deno.test({
  name: "hello world",
  fn() {
    const x = 4;
    assertEquals(x, 4);
  },
});

Deno.test({
  name: "works with mock data",
  fn(): void {
    const expected = 514579;
    const actual = main(mock);
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "works with real data",
  fn(): void {
    const expected = 997899;
    const actual = main(data);
    assertEquals(actual, expected);
  },
});
