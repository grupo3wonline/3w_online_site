# 3W Online — Site Institucional

Site institucional da 3W Online com landing pages, portfólio, blog e ferramentas.

## Stack

- Vue 3 + TypeScript + Vite
- Tailwind CSS (mobile-first)
- Pinia, Vue Router, vue-i18n
- SweetAlert2, Maska, @iconify/vue

## Scripts

```bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Build de produção
npm run preview   # Preview do build
npm run lint      # Lint com ESLint
npm run format    # Formatação com Prettier
```

## Estrutura

```
src/
├── assets/css/       # Estilos globais (Tailwind)
├── components/
│   ├── layout/       # Navbar, Footer
│   └── ui/           # Breadcrumb, FAQ, CookieBanner, Tips, WhatsApp
├── composables/      # useAlert, usePerformance, useSeo
├── constants/        # Dados reutilizáveis (FAQ, depoimentos, etc.)
├── locales/          # i18n pt-BR
├── router/           # Vue Router com lazy loading
└── views/
    ├── errors/       # 404, 403, 500
    ├── lp/           # Landing pages (G3w, Sistemas)
    └── services/     # Páginas de serviços individuais
```

---

Desenvolvido por **HOTWYL | WILLFROMBRASIL**
