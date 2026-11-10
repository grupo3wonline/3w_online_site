import { watchEffect } from "vue";
import { siteConfig } from "@/config/site";

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: string;
  /** JSON-LD structured data adicional (AEO/GEO) */
  jsonLd?: Record<string, unknown>;
}

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const setJsonLd = (data: Record<string, unknown>) => {
  const id = "route-jsonld";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

/**
 * Aplica meta tags de SEO/SEM/GEO/AEO reativamente para a rota atual.
 * Cobre: title, description, keywords, canonical, Open Graph e Twitter Cards.
 */
export function useSeo(meta: () => SeoMeta) {
  watchEffect(() => {
    const m = meta();
    const fullTitle = m.title
      ? `${m.title} | ${siteConfig.name}`
      : `${siteConfig.name} — ${siteConfig.tagline}`;
    const description = m.description ?? siteConfig.description;
    const keywords = m.keywords ?? siteConfig.keywords;
    const url = `${siteConfig.url}${m.path ?? ""}`;
    const image = m.image ?? "/og-image.jpg";
    const type = m.type ?? "website";

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setLink("canonical", url);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", image);

    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    if (m.jsonLd) setJsonLd(m.jsonLd);
  });
}
