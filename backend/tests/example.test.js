import { test, expect } from "@jest/globals";
import { sum } from "./funcion";
test("nombre del test", () => {
  const result = sum(2, 2);
  expect(result).toBe(4);
});
