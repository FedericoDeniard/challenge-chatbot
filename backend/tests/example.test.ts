import { sum } from "./funcion";

describe("Sumar", () => {
  test("Sumar par", () => {
    const result = sum(2, 2);
    expect(result).toBe(4);
  });

  test("Sumar impar", () => {
    const result = sum(3, 2);
    expect(result).toBe(5);
  });
})

