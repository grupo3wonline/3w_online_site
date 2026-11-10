/**
 * Funções financeiras usadas no Simulador de Preço e Parcelamento.
 * Todas puras e testáveis (SOLID: responsabilidade única, sem efeitos colaterais).
 */

export interface PrecoResultado {
  precoVenda: number;
  lucro: number;
  markup: number; // multiplicador sobre o custo
}

/**
 * Preço de venda a partir do custo e uma margem sobre o PREÇO (margem de contribuição).
 * preco = custo / (1 - margem%). Ex.: custo 100, margem 20% => preço 125.
 */
export function precoPorMargem(custo: number, margemPct: number): PrecoResultado {
  const c = Math.max(0, custo);
  const m = Math.min(99.9, Math.max(0, margemPct)) / 100;
  const precoVenda = m >= 1 ? c : c / (1 - m);
  const lucro = precoVenda - c;
  const markup = c > 0 ? precoVenda / c : 0;
  return { precoVenda, lucro, markup };
}

/**
 * Preço de venda a partir do custo e um markup (acréscimo sobre o custo).
 * preco = custo * (1 + markup%). Ex.: custo 100, markup 50% => preço 150.
 */
export function precoPorMarkup(custo: number, markupPct: number): PrecoResultado {
  const c = Math.max(0, custo);
  const mk = Math.max(0, markupPct) / 100;
  const precoVenda = c * (1 + mk);
  const lucro = precoVenda - c;
  const markup = 1 + mk;
  return { precoVenda, lucro, markup };
}

export interface ParcelamentoResultado {
  valorParcela: number;
  totalPago: number;
  totalJuros: number;
}

/**
 * Simula parcelamento pela Tabela Price (juros compostos).
 * jurosMensalPct = 0 => parcelas iguais sem juros.
 */
export function simularParcelamento(
  valor: number,
  parcelas: number,
  jurosMensalPct: number
): ParcelamentoResultado {
  const pv = Math.max(0, valor);
  const n = Math.max(1, Math.floor(parcelas));
  const i = Math.max(0, jurosMensalPct) / 100;

  let valorParcela: number;
  if (i === 0) {
    valorParcela = pv / n;
  } else {
    // PMT = PV * i / (1 - (1+i)^-n)
    valorParcela = (pv * i) / (1 - Math.pow(1 + i, -n));
  }
  const totalPago = valorParcela * n;
  const totalJuros = totalPago - pv;
  return { valorParcela, totalPago, totalJuros };
}
