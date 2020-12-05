import { main } from "../src/0501.ts";
import { assertEquals } from "./deps.ts";

const mock = await Deno.readTextFile("data/0501.mock.txt");
const data = await Deno.readTextFile("data/0501.data.txt");

Deno.test({
  name: "0501 works with mock data",
  fn(): void {
    const expected = 820;
    const actual = main(mock);
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "0501 works with real data",
  fn(): void {
    const expected = 826;
    const actual = main(data);
    assertEquals(actual, expected);
  },
});
