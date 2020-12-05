import { main } from "../src/0502.ts";
import { assertEquals } from "./deps.ts";

const data = await Deno.readTextFile("data/0501.data.txt");

Deno.test({
  name: "0502 works with real data",
  fn(): void {
    const expected = 678;
    const actual = main(data);
    assertEquals(actual, expected);
  },
});
