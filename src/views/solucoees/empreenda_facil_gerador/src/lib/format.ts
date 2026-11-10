/** Formata número como moeda BRL. */
export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number.isFinite(value) ? value : 0
  );

/** Converte string de valor (aceita vírgula ou ponto) em número. */
export const parseNumber = (value: string): number => {
  if (!value) return 0;
  const normalized = value
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : 0;
};

/**
 * Converte um valor monetário em reais para a forma escrita por extenso.
 * Suporta até bilhões, com centavos.
 */
export function numeroParaExtenso(valor: number): string {
  const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const especiais = [
    "dez",
    "onze",
    "doze",
    "treze",
    "quatorze",
    "quinze",
    "dezesseis",
    "dezessete",
    "dezoito",
    "dezenove",
  ];
  const dezenas = [
    "",
    "",
    "vinte",
    "trinta",
    "quarenta",
    "cinquenta",
    "sessenta",
    "setenta",
    "oitenta",
    "noventa",
  ];
  const centenas = [
    "",
    "cento",
    "duzentos",
    "trezentos",
    "quatrocentos",
    "quinhentos",
    "seiscentos",
    "setecentos",
    "oitocentos",
    "novecentos",
  ];

  const porExtensoInteiro = (n: number): string => {
    if (n === 0) return "";
    if (n === 100) return "cem";
    let r = "";
    if (n >= 1000) {
      const milhares = Math.floor(n / 1000);
      r += milhares === 1 ? "mil" : `${porExtensoInteiro(milhares)} mil`;
      const resto = n % 1000;
      if (resto > 0) {
        // Regra pt-BR: usa "e" quando o resto é < 100 ou uma centena exata (200, 500...)
        const usaE = resto < 100 || resto % 100 === 0;
        r += usaE ? ` e ${porExtensoInteiro(resto)}` : ` ${porExtensoInteiro(resto)}`;
      }
      return r.trim();
    }
    if (n >= 100) {
      r += centenas[Math.floor(n / 100)];
      const resto = n % 100;
      if (resto > 0) r += ` e ${porExtensoInteiro(resto)}`;
      return r.trim();
    }
    if (n >= 20) {
      r += dezenas[Math.floor(n / 10)];
      const u = n % 10;
      if (u > 0) r += ` e ${unidades[u]}`;
      return r.trim();
    }
    if (n >= 10) return especiais[n - 10];
    return unidades[n];
  };

  if (!Number.isFinite(valor) || valor === 0) return "zero real";
  const inteiro = Math.floor(valor);
  const centavos = Math.round((valor - inteiro) * 100);

  let resultado = "";
  if (inteiro > 0) {
    resultado += porExtensoInteiro(inteiro);
    resultado += inteiro === 1 ? " real" : " reais";
  }
  if (centavos > 0) {
    if (resultado) resultado += " e ";
    resultado += porExtensoInteiro(centavos);
    resultado += centavos === 1 ? " centavo" : " centavos";
  }
  return resultado.trim();
}

/** Escapa HTML para prevenir XSS ao gerar documentos com dados do usuário. */
export const escapeHtml = (str: string): string =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
