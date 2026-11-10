import { watchEffect } from 'vue';

const SITE_NAME = 'Calculadora de Saúde';
const SITE_URL = 'https://www.3wonline.com.br/calculadora_saude/';

export interface SeoOptions {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const JSON_LD_ID = 'seo-jsonld-dynamic';

/**
 * Aplica SEO (title, description, keywords, canonical, Open Graph, Twitter Card
 * e JSON-LD) de forma reativa para a rota atual. Focado em SEO/SEM/GEO/AEO.
 */
export function useSeo(options: () => SeoOptions): void {
  watchEffect(() => {
    const o = options();
    const url = o.path ? `${SITE_URL.replace(/\/$/, '')}${o.path}` : SITE_URL;
    const image = o.image || `${SITE_URL}og-image.jpg`;
    const type = o.type || 'website';

    document.title = o.title;

    upsertMeta('meta[name="description"]', 'name', 'description', o.description);
    if (o.keywords) upsertMeta('meta[name="keywords"]', 'name', 'keywords', o.keywords);

    upsertLink('canonical', url);

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', o.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', o.description);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', image);

    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', o.title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', o.description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);

    if (o.jsonLd) {
      let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = JSON_LD_ID;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(o.jsonLd);
    }
  });
}
