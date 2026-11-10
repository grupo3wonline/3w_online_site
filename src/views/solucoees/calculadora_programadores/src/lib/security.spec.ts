import { describe, it, expect } from "vitest";
import { escapeHtml, sanitizeText } from "./security";

describe("security", () => {
  it("escapa caracteres HTML perigosos (proteção XSS)", () => {
    const malicious = '<script>alert("x")</script>';
    const escaped = escapeHtml(malicious);
    expect(escaped).not.toContain("<script>");
    expect(escaped).toContain("&lt;script&gt;");
  });

  it("escapa aspas e e-comercial", () => {
    expect(escapeHtml(`a & "b" 'c'`)).toBe("a &amp; &quot;b&quot; &#039;c&#039;");
  });

  it("sanitiza e limita o tamanho do texto", () => {
    const long = "a".repeat(500);
    expect(sanitizeText(long, 10)).toHaveLength(10);
    expect(sanitizeText("  <b>x</b>  ")).toBe("&lt;b&gt;x&lt;/b&gt;");
  });
});
