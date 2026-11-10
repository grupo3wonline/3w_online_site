import { describe, it, expect } from "vitest";
import { addBusinessDays, isBusinessDay, addDays, formatDate } from "./date";

describe("date", () => {
  it("identifica dias úteis (seg–sex)", () => {
    // 2026-09-21 é uma segunda-feira
    expect(isBusinessDay(new Date(2026, 8, 21))).toBe(true);
    // 2026-09-26 é um sábado
    expect(isBusinessDay(new Date(2026, 8, 26))).toBe(false);
    // 2026-09-27 é um domingo
    expect(isBusinessDay(new Date(2026, 8, 27))).toBe(false);
  });

  it("adiciona dias corridos", () => {
    const d = addDays(new Date(2026, 8, 21), 5);
    expect(d.getDate()).toBe(26);
  });

  it("soma dias úteis pulando fim de semana", () => {
    // Sexta 2026-09-25 + 1 dia útil = segunda 2026-09-28
    const result = addBusinessDays(new Date(2026, 8, 25), 1);
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(8);
    expect(result.getDate()).toBe(28);
    expect(isBusinessDay(result)).toBe(true);
  });

  it("formata data no padrão brasileiro", () => {
    expect(formatDate(new Date(2026, 8, 23))).toBe("23/09/2026");
  });
});
