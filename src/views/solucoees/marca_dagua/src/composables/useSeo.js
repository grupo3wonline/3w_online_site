import { useHead } from '@vueuse/head'

/**
 * Composable para gerenciar SEO dinâmico em todas as páginas
 * @param {Object} options - Opções de SEO
 * @param {string} options.title - Título da página
 * @param {string} options.description - Descrição da página
 * @param {string} options.keywords - Palavras-chave (opcional)
 * @param {string} options.image - URL da imagem (opcional)
 * @param {string} options.url - URL canônica (opcional)
 * @param {string} options.type - Tipo de conteúdo OG (padrão: website)
 */
export function useSeo(options = {}) {
  const {
    title = 'Marca D\'água Pro - Adicione Marca D\'água Profissional',
    description = 'Adicione marca d\'água profissional em suas imagens gratuitamente. Rápido, fácil e 100% seguro.',
    keywords = 'marca d\'água, watermark, proteção de imagens, adicionar logo, marca dagua online, gratuito',
    image = 'https://www.3wonline.com.br/images/marca-dagua-preview.png',
    url = '',
    type = 'website',
    author = '3W Online - Marca D\'água Pro',
    twitterCard = 'summary_large_image'
  } = options

  // Configuração completa de meta tags
  const metaTags = [
    // Primary Meta Tags
    { name: 'title', content: title },
    { name: 'description', content: description },
    { name: 'author', content: author },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: 'Portuguese' },
    { name: 'rating', content: 'general' },
    
    // Open Graph / Facebook
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:locale', content: 'pt_BR' },
    { property: 'og:site_name', content: 'Marca D\'água Pro' },
    
    // Twitter
    { name: 'twitter:card', content: twitterCard },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image }
  ]

  // Adicionar keywords se fornecido
  if (keywords) {
    metaTags.push({ name: 'keywords', content: keywords })
  }

  // Adicionar URL se fornecido
  if (url) {
    metaTags.push(
      { property: 'og:url', content: url },
      { name: 'twitter:url', content: url }
    )
  }

  // Configurar useHead
  useHead({
    title,
    meta: metaTags,
    link: url ? [{ rel: 'canonical', href: url }] : []
  })

  return {
    title,
    description,
    keywords,
    image,
    url
  }
}

/**
 * Preset de SEO para a Landing Page
 */
export function useSeoLanding() {
  return useSeo({
    title: 'Marca D\'água Pro - Adicione Marca D\'água Profissional Grátis',
    description: 'Proteja suas imagens com marca d\'água profissional. 100% gratuito, seguro e rápido. Processamento offline no navegador. Sem cadastro, sem limites.',
    keywords: 'marca d\'água gratis, watermark online, proteção de imagens, adicionar marca dagua, proteger fotos, marca dagua profissional, editor de imagens online',
    url: 'https://marcadagua.3wonline.com.br'
  })
}

/**
 * Preset de SEO para o Editor/App
 */
export function useSeoApp() {
  return useSeo({
    title: 'Editor - Marca D\'água Pro | Adicione Marca D\'água Agora',
    description: 'Editor online de marca d\'água profissional. Adicione texto ou logo, ajuste posição, cor e opacidade. Preview em tempo real.',
    keywords: 'editor marca dagua, adicionar watermark, editor de imagens, marca dagua texto, marca dagua logo',
    url: 'https://marcadagua.3wonline.com.br/app',
    type: 'webapp'
  })
}

/**
 * Preset de SEO para a página Sobre
 */
export function useSeoAbout() {
  return useSeo({
    title: 'Sobre - Marca D\'água Pro | Proteção Profissional de Imagens',
    description: 'Conheça o Marca D\'água Pro: solução gratuita e segura para proteger suas imagens. Processamento offline, 100% privado e profissional.',
    url: 'https://marcadagua.3wonline.com.br/sobre'
  })
}

/**
 * Preset de SEO para a página de Contato
 */
export function useSeoContact() {
  return useSeo({
    title: 'Contato - Marca D\'água Pro | Entre em Contato Conosco',
    description: 'Entre em contato com o Marca D\'água Pro. Tire suas dúvidas, envie sugestões ou reporte problemas. Estamos aqui para ajudar!',
    url: 'https://marcadagua.3wonline.com.br/contato'
  })
}

/**
 * Preset de SEO para Termos de Uso
 */
export function useSeoTerms() {
  return useSeo({
    title: 'Termos de Uso - Marca D\'água Pro',
    description: 'Termos de Uso do Marca D\'água Pro. Leia nossas condições de uso do serviço.',
    url: 'https://marcadagua.3wonline.com.br/termos-de-uso',
    type: 'article'
  })
}

/**
 * Preset de SEO para Política de Privacidade
 */
export function useSeoPrivacy() {
  return useSeo({
    title: 'Política de Privacidade - Marca D\'água Pro',
    description: 'Política de Privacidade em conformidade com a LGPD. Seus dados estão seguros conosco.',
    url: 'https://marcadagua.3wonline.com.br/politica-de-privacidade',
    type: 'article'
  })
}
