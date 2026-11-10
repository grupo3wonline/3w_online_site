# Calculadora Empresarial

Conjunto de calculadoras profissionais e gratuitas para empreendedores, freelancers
e gestores: precificação, juros, orçamentos, valor da hora e muito mais. Todos os
cálculos são feitos localmente no navegador, sem envio de dados a servidores.

Desenvolvido pelo **Grupo 3W Online** — sites e sistemas personalizados sob demanda
(https://www.3wonline.com.br).

## Tecnologias

- Vue 3 (Composition API) + Vite
- Vue Router (SPA) e Pinia (estado)
- Tailwind CSS (design system, tema claro/escuro)
- VueUse e @vueuse/motion
- @unhead/vue (SEO dinâmico por rota: meta tags + JSON-LD)
- SweetAlert2 (alertas) e Font Awesome (ícones)
- Vitest (testes) + ESLint + Prettier

## Scripts

```sh
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento (http://localhost:8080/calculadora_empresarial/)
npm run build      # build de produção (pasta dist/)
npm run preview    # pré-visualiza o build de produção
npm run test       # executa os testes (Vitest)
npm run lint       # ESLint com correção automática
npm run format     # Prettier
```

## Estrutura

```
src/
  assets/        estilos globais (Tailwind)
  components/    Header, Footer, tema, cookies, loading, WhatsApp, breadcrumb
  composables/   useSeo (SEO por rota)
  config/        site.js (fonte única de dados do site)
  router/        rotas da SPA
  stores/        Pinia (UI: loading global)
  utils/         funções puras de cálculo (finance.js) + testes
  views/         páginas e as 19 calculadoras
```

## Deploy

O app é publicado no subdiretório `/calculadora_empresarial/`. Veja **[DEPLOY.md](./DEPLOY.md)**
para instruções de publicação na HostGator (inclui `.htaccess` com rewrite de SPA e
cabeçalhos de segurança).
