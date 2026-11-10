import Swal from 'sweetalert2'

/**
 * Ações compartilhadas para os resultados dos simuladores:
 * imprimir, copiar resumo e compartilhar via WhatsApp.
 */
export function useResultadoActions() {
  function imprimir() {
    window.print()
  }

  async function copiarResumo(titulo: string, linhas: string[]) {
    const texto = `${titulo}\n\n${linhas.join('\n')}\n\nGerado em Simuladores Empresariais Pro — 3w Online`
    try {
      await navigator.clipboard.writeText(texto)
      Swal.fire({
        icon: 'success',
        title: 'Copiado!',
        text: 'Resumo copiado para a área de transferência.',
        confirmButtonColor: 'hsl(221, 83%, 45%)',
        timer: 1800,
        timerProgressBar: true,
      })
    } catch {
      Swal.fire({
        icon: 'info',
        title: 'Resumo',
        html: `<pre style="text-align:left;white-space:pre-wrap;font-size:0.85rem">${texto}</pre>`,
        confirmButtonColor: 'hsl(221, 83%, 45%)',
      })
    }
  }

  function compartilharWhatsApp(titulo: string, linhas: string[]) {
    const texto = `*${titulo}*\n\n${linhas.join('\n')}\n\nGerado em Simuladores Empresariais Pro`
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener')
  }

  return { imprimir, copiarResumo, compartilharWhatsApp }
}
