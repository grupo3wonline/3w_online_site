/**
 * Numeração automática de documentos no formato NNN/AAAA.
 * O contador é persistido por tipo (orcamento, recibo, os) no localStorage,
 * incrementando a cada geração para evitar números repetidos.
 */
export type DocTipo = "orcamento" | "recibo" | "os";

const STORAGE_KEY = "empreenda-facil-contadores";

type Contadores = Record<string, { ano: number; seq: number }>;

const ler = (): Contadores => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Contadores;
  } catch {
    return {};
  }
};

const salvar = (c: Contadores) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {
    /* armazenamento indisponível */
  }
};

const pad = (n: number) => String(n).padStart(3, "0");

/** Sugere o próximo número sem consumir o contador (apenas leitura). */
export function proximoNumero(tipo: DocTipo): string {
  const ano = new Date().getFullYear();
  const c = ler();
  const atual = c[tipo];
  const seq = atual && atual.ano === ano ? atual.seq + 1 : 1;
  return `${pad(seq)}/${ano}`;
}

/** Gera e consome o próximo número (incrementa o contador persistido). */
export function gerarNumero(tipo: DocTipo): string {
  const ano = new Date().getFullYear();
  const c = ler();
  const atual = c[tipo];
  const seq = atual && atual.ano === ano ? atual.seq + 1 : 1;
  c[tipo] = { ano, seq };
  salvar(c);
  return `${pad(seq)}/${ano}`;
}

/** Data de hoje no formato ISO (yyyy-mm-dd) para inputs type=date. */
export const hojeISO = (): string => new Date().toISOString().slice(0, 10);
