import { encodeHtmlEntities } from './dev-tools'

/**
 * Renderizador Markdown mínimo e seguro.
 * Escapa HTML primeiro (previne XSS) e depois aplica um subconjunto de Markdown.
 */
export function renderMarkdown(md: string): string {
  let html = encodeHtmlEntities(md)

  // Blocos de código
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`)
  // Código inline
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  // Cabeçalhos
  html = html.replace(/^###### (.*)$/gm, '<h6>$1</h6>')
  html = html.replace(/^##### (.*)$/gm, '<h5>$1</h5>')
  html = html.replace(/^#### (.*)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>')
  // Negrito e itálico
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  // Links — apenas http/https (segurança)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  // Citações
  html = html.replace(/^&gt; (.*)$/gm, '<blockquote>$1</blockquote>')
  // Listas
  html = html.replace(/^[-*] (.*)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
  // Parágrafos (linhas restantes)
  html = html
    .split(/\n{2,}/)
    .map((block) => (/^\s*<(h\d|ul|pre|blockquote)/.test(block) ? block : `<p>${block.replace(/\n/g, '<br>')}</p>`))
    .join('\n')

  return html
}
