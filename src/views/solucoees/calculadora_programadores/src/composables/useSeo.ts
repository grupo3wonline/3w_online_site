import { watchEffect } from "vue";

const SITE_URL = "https://app.3wonline.com.br/calculadora_programadores";
const SITE_NAME = "Calculadora de Programadores — Grupo 3w Online";

export interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  robots?: string;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Composable de SEO por rota: atualiza title, description, keywords,
 * canonical, Open Graph e Twitter de forma reativa.
 * Cobre SEO, SEM, GEO e AEO ao manter metadados consistentes por página.
 */
export function useSeo(getOptions: () => SeoOptions) {
  watchEffect(() => {
    const opts = getOptions();
    const url = `${SITE_URL}${opts.path ?? ""}`;
    const fullTitle = opts.title.includes("3w")
      ? opts.title
      : `${opts.title} | Calculadora de Programadores`;

    document.title = fullTitle;
    setMeta("name", "description", opts.description);
    if (opts.keywords) setMeta("name", "keywords", opts.keywords);
    setMeta("name", "robots", opts.robots ?? "index, follow, max-image-preview:large");
    setCanonical(url);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", opts.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", "pt_BR");

    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", opts.description);
    setMeta("name", "twitter:card", "summary_large_image");
  });
}
