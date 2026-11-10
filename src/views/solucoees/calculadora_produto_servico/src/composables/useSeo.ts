import { watch } from 'vue'
import { useRoute } from 'vue-router'

const BASE_URL_CANONICA = 'https://app.3wonline.com.br/calculadora_produto_servico'

/** Cria/atualiza uma <meta> identificada por name ou property. */
function definirMeta(chave: 'name' | 'property', valor: string, conteudo: string) {
  const seletor = `meta[${chave}="${valor}"]`
  let el = document.head.querySelector<HTMLMetaElement>(seletor)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(chave, valor)
    document.head.appendChild(el)
  }
  el.setAttribute('content', conteudo)
}

function definirCanonica(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

/**
 * Sincroniza título e meta tags (SEO/SEM/GEO/AEO) com a rota atual.
 * Também envia page_view para o GA4 em navegações SPA.
 * Toda a lógica é tolerante a falhas para nunca impedir a renderização da página.
 */
export function useSeo() {
  const route = useRoute()

  function atualizar() {
    try {
      const titulo = route.meta.titulo || document.title
      const descricao = route.meta.descricao || ''
      const caminho = route.path === '/' ? '' : route.path
      const canonica = `${BASE_URL_CANONICA}${caminho}`

      document.title = titulo
      definirMeta('name', 'description', descricao)
      definirMeta('property', 'og:title', titulo)
      definirMeta('property', 'og:description', descricao)
      definirMeta('property', 'og:url', canonica)
      definirMeta('name', 'twitter:title', titulo)
      definirMeta('name', 'twitter:description', descricao)
      definirCanonica(canonica)

      // GA4 page_view em navegação SPA
      const w = window as unknown as { gtag?: (...args: unknown[]) => void }
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'page_view', {
          page_title: titulo,
          page_path: route.fullPath,
          page_location: canonica,
        })
      }
    } catch {
      /* SEO nunca deve quebrar a navegação */
    }
  }

  watch(() => route.fullPath, atualizar, { immediate: true })
}
