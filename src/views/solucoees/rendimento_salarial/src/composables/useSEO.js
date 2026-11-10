import { watch, onMounted } from 'vue';

/**
 * Composable para gerenciamento de SEO dinâmico
 * @returns {Object} Funções para atualizar meta tags
 */
export function useSEO() {
  /**
   * Atualiza o título da página
   */
  const setTitle = (title) => {
    document.title = title;
    updateMetaTag('og:title', title);
    updateMetaTag('twitter:title', title);
  };

  /**
   * Atualiza a descrição da página
   */
  const setDescription = (description) => {
    updateMetaTag('description', description);
    updateMetaTag('og:description', description);
    updateMetaTag('twitter:description', description);
  };

  /**
   * Atualiza palavras-chave
   */
  const setKeywords = (keywords) => {
    updateMetaTag('keywords', keywords);
  };

  /**
   * Atualiza a URL canônica
   */
  const setCanonical = (url) => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
    updateMetaTag('og:url', url);
  };

  /**
   * Atualiza imagem de compartilhamento
   */
  const setImage = (imageUrl) => {
    updateMetaTag('og:image', imageUrl);
    updateMetaTag('twitter:image', imageUrl);
  };

  /**
   * Atualiza uma meta tag específica
   */
  const updateMetaTag = (name, content) => {
    // Tenta encontrar por name
    let meta = document.querySelector(`meta[name="${name}"]`);
    
    // Se não encontrar, tenta por property (Open Graph)
    if (!meta) {
      meta = document.querySelector(`meta[property="${name}"]`);
    }

    // Se ainda não existir, cria
    if (!meta) {
      meta = document.createElement('meta');
      const isOG = name.startsWith('og:') || name.startsWith('twitter:');
      if (isOG) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', content);
  };

  /**
   * Atualiza structured data (JSON-LD)
   */
  const setStructuredData = (data) => {
    let script = document.querySelector('script[type="application/ld+json"]');
    
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  };

  /**
   * Atualiza todas as meta tags de uma vez
   */
  const updateSEO = (config) => {
    const {
      title,
      description,
      keywords,
      canonical,
      image,
      structuredData,
      ogType = 'website'
    } = config;

    if (title) setTitle(title);
    if (description) setDescription(description);
    if (keywords) setKeywords(keywords);
    if (canonical) setCanonical(canonical);
    if (image) setImage(image);
    if (structuredData) setStructuredData(structuredData);
    if (ogType) updateMetaTag('og:type', ogType);
  };

  /**
   * Reseta para as meta tags padrão
   */
  const resetSEO = () => {
    updateSEO({
      title: 'Rendimento Salarial - Calculadora Online Gratuita',
      description: 'Calculadora de rendimento salarial: calcule ganhos por hora, dia, semana, mês e ano de forma rápida, precisa e gratuita.',
      keywords: 'rendimento salarial, calculadora salarial, salário, planejamento financeiro',
      canonical: 'https://app.3wonline.com/rendimentosalarial',
      image: 'https://www.3wonline.com.br/images/preview.png'
    });
  };

  return {
    setTitle,
    setDescription,
    setKeywords,
    setCanonical,
    setImage,
    setStructuredData,
    updateMetaTag,
    updateSEO,
    resetSEO
  };
}
