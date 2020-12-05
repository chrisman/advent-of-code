import { main } from "../src/0402.ts";
import { assertEquals } from "./deps.ts";

const mock = await Deno.readTextFile("data/0401.txt");
const data = await Deno.readTextFile("data/0402.txt");

Deno.test({
  name: "0402 works with mock data",
  fn(): void {
    const expected = 2;
    const actual = main(mock);
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "0402 works with real data",
  fn(): void {
    const expected = 188;
    const actual = main(data);
    assertEquals(actual, expected);
  },
});
