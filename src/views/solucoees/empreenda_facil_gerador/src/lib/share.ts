/**
 * Monta e abre um compartilhamento por WhatsApp com o resumo de um documento.
 * Usa a Web Share API quando disponível (mobile), com fallback para wa.me.
 */
export interface ResumoDocumento {
  titulo: string;
  numero?: string;
  cliente?: string;
  total?: string;
  extra?: string[];
}

export function montarTextoResumo(r: ResumoDocumento): string {
  const linhas = [`*${r.titulo}*`];
  if (r.numero) linhas.push(`Nº: ${r.numero}`);
  if (r.cliente) linhas.push(`Cliente: ${r.cliente}`);
  if (r.total) linhas.push(`Total: ${r.total}`);
  (r.extra ?? []).forEach((l) => linhas.push(l));
  linhas.push("", "Gerado no Empreenda Fácil");
  return linhas.join("\n");
}

export async function compartilharWhatsApp(r: ResumoDocumento): Promise<void> {
  const texto = montarTextoResumo(r);

  if (typeof navigator !== "undefined" && "share" in navigator) {
    try {
      await navigator.share({ title: r.titulo, text: texto });
      return;
    } catch {
      /* usuário cancelou ou API indisponível: cai no fallback */
    }
  }

  const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
