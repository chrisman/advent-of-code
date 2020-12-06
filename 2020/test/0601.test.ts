import { main } from "../src/0601.ts";
import { assertEquals } from "./deps.ts";

const mock = await Deno.readTextFile("data/06.mock.txt");
const data = await Deno.readTextFile("data/06.data.txt");

Deno.test({
  name: "0601 works with mock data",
  fn(): void {
    const expected = 11;
    const actual = main(mock);
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "0601 works with real data",
  fn(): void {
    const expected = 6583;
    const actual = main(data);
    assertEquals(actual, expected);
  },
});
