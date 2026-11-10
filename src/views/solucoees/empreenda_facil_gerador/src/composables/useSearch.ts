import { ref, computed, type Ref } from "vue";
import Fuse from "fuse.js";

export interface SearchItem {
  title: string;
  description: string;
  to: string;
  icon: string;
  keywords?: string;
}

/** Índice de conteúdo pesquisável (ferramentas e páginas). */
export const searchIndex: SearchItem[] = [
  {
    title: "Gerador de Orçamentos",
    description: "Crie orçamentos com cálculo automático de itens e totais.",
    to: "/orcamentos",
    icon: "lucide:calculator",
    keywords: "proposta preço cotação valores",
  },
  {
    title: "Ordem de Serviço",
    description: "Gere OS com prazos, prioridades, status e assinaturas.",
    to: "/ordem-servicos",
    icon: "lucide:file-text",
    keywords: "os chamado manutenção reparo técnico",
  },
  {
    title: "Gerador de Recibos",
    description: "Emita recibos com valor por extenso automático.",
    to: "/recibos",
    icon: "lucide:receipt",
    keywords: "comprovante pagamento venda quitação",
  },
  {
    title: "Simulador de Preço e Parcelamento",
    description: "Calcule preço de venda com margem/markup e simule parcelas.",
    to: "/simulador",
    icon: "lucide:trending-up",
    keywords: "precificação margem markup juros parcela lucro simulador",
  },
  {
    title: "Dicas e Tutoriais",
    description: "Aprenda boas práticas para seus documentos.",
    to: "/#dicas",
    icon: "lucide:book-open",
    keywords: "ajuda como usar passo a passo guia",
  },
  {
    title: "Contato",
    description: "Fale com o Grupo 3w Online por WhatsApp ou e-mail.",
    to: "/#contato",
    icon: "lucide:mail",
    keywords: "suporte whatsapp email 3w online",
  },
];

/**
 * Busca fuzzy sobre o índice de conteúdo usando Fuse.js.
 * Retorna todos os itens quando a query está vazia.
 */
export function useSearch(query: Ref<string>) {
  const fuse = new Fuse(searchIndex, {
    keys: [
      { name: "title", weight: 2 },
      { name: "description", weight: 1 },
      { name: "keywords", weight: 1.5 },
    ],
    threshold: 0.4,
    ignoreLocation: true,
  });

  const results = computed<SearchItem[]>(() => {
    const q = query.value.trim();
    if (!q) return searchIndex;
    return fuse.search(q).map((r) => r.item);
  });

  return { results };
}

export function useSearchState() {
  const query = ref("");
  const open = ref(false);
  const { results } = useSearch(query);
  return { query, open, results };
}
