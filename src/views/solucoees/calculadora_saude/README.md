# Calculadora de Saúde — Grupo 3W Online

Aplicação web moderna e profissional para cálculo de IMC, peso ideal e plano nutricional
personalizado. Refatorada em **Vue 3 + TypeScript + Vite**, com landing page única em formato
hotsite, tema claro/escuro, SEO completo, segurança reforçada e conformidade com as principais
leis globais de privacidade.

## Funcionalidades

- **Cálculo Preciso de IMC** — baseado em padrões da OMS, com classificação de risco
- **Metabolismo (TMB) e Gasto Total (TDEE)** — equação de Harris-Benedict
- **Gordura Corporal Estimada** — fórmula de Deurenberg (IMC, idade, sexo)
- **Metas por Objetivo** — perder / manter / ganhar (ajuste automático de calorias)
- **Peso Ideal Personalizado** — faixa saudável para seu perfil
- **Plano Nutricional Completo** — proteínas, carboidratos e gorduras
- **Gráficos** — gauge de IMC + donut de macros (ApexCharts) e escala visual de IMC
- **Divisão de Refeições** — café da manhã, almoço, jantar e lanches
- **Relatório em PDF** — gerado localmente (jsPDF), sob demanda
- **Compartilhar Resultado** — Web Share API com fallback para copiar
- **Salvar Dados (opt-in)** — persistência local apenas com consentimento
- **8 Remédios Naturais** — dicas para uma vida saudável

## Design e Experiência

- Landing page única (hotsite) com seções e âncoras: Início, Benefícios, Como Funciona,
  Calculadora, Sobre, Serviços, Depoimentos, Contato
- Tema claro/escuro com persistência
- Mobile first, responsivo e acessível (foco visível, `prefers-reduced-motion`, ARIA)
- Botões de ajuda, tooltips, breadcrumb, SweetAlert2 e overlay de carregamento
- Cabeçalho e rodapé em todas as páginas

## Privacidade e Segurança

- Processamento 100% local — nenhum dado pessoal é enviado a servidores
- Conformidade com **LGPD, GDPR, CCPA e POPIA** (banner de consentimento granular)
- GA4/GTM carregados **somente após consentimento**
- Sanitização de entradas (anti-XSS), validação com Zod
- Cabeçalhos de segurança via `.htaccess` (CSP, HSTS, X-Frame-Options, etc.)

## Stack

- Vue 3 (Composition API) + TypeScript + Vite
- Vue Router, Pinia
- Tailwind CSS (mobile first)
- vee-validate + Zod (validação de formulários)
- Iconify (`@iconify/vue`) — Font Awesome 6
- VueUse + `@vueuse/motion` (animações)
- ApexCharts (`vue3-apexcharts`)
- Maska (máscaras de entrada)
- SweetAlert2, jsPDF
- ESLint + Prettier
- Vitest (testes automatizados — 60 testes)

## Scripts

```bash
npm install        # instala as dependências
npm run dev        # ambiente de desenvolvimento
npm run build      # type-check + build de produção + sitemap
npm run preview    # pré-visualiza o build
npm run test       # roda a suíte de testes
npm run lint       # ESLint (--fix)
npm run format     # Prettier
```

## Deploy em hospedagem compartilhada (Hostgator)

A aplicação é servida no subdiretório `/calculadora_saude/`.

1. Rode `npm run build`.
2. Envie **todo o conteúdo da pasta `dist/`** para a pasta `public_html/calculadora_saude/`
   do servidor (inclusive o arquivo `.htaccess`).
3. O `.htaccess` já cuida do fallback de rotas SPA, HTTPS, compressão GZIP, cache e cabeçalhos
   de segurança.

Base path configurado em `vite.config.ts` (`base: '/calculadora_saude/'`),
`package.json` (`homepage`), `manifest.json` e no Vue Router (`createWebHistory`).

## Contato — Grupo 3W Online

Desenvolvemos sites e sistemas personalizados sob demanda.

- WhatsApp: (41) 99692-4829
- E-mail: contato@3wonline.com.br
- Site: https://www.3wonline.com.br

## Desenvolvedor

Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL**.

## Licença

© 2026 Calculadora de Saúde — Grupo 3W Online. Todos os direitos reservados.
