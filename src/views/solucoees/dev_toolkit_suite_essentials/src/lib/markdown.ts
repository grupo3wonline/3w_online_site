import { marked } from 'marked'

/**
 * Renderiza Markdown (GitHub Flavored) para HTML.
 * Sanitização: HTML embutido é escapado (não interpretado) para prevenir XSS,
 * já que o conteúdo é fornecido pelo próprio usuário e renderizado via v-html.
 */
marked.setOptions({
  gfm: true,
  breaks: true,
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function renderMarkdown(source: string): string {
  if (!source) return ''
  // Escapa HTML bruto antes do parse: impede injeção de <script>/<img onerror>
  const safeSource = escapeHtml(source)
  return marked.parse(safeSource, { async: false }) as string
}
