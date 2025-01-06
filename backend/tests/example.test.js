import { jest } from "@jest/globals";
import { sum } from "./funcion.js";
test("nombre del test", () => {
  const result = sum(2, 2);
  expect(result).toBe(4);
});
