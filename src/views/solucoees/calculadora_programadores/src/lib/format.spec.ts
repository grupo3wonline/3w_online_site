import { describe, it, expect } from "vitest";
import { formatCurrency, formatHours } from "./format";

describe("format", () => {
  it("formata valores como moeda brasileira", () => {
    const result = formatCurrency(1234.5);
    // Usa espaço não separável entre símbolo e valor no locale pt-BR.
    expect(result).toMatch(/R\$\s?1\.234,50/);
  });

  it("formata horas com uma casa decimal", () => {
    expect(formatHours(12)).toBe("12.0h");
    expect(formatHours(8.25)).toBe("8.3h");
  });
});
