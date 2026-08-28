# Especificação Técnica — 3W Online (Site Institucional, Plataforma & Suíte de Ferramentas)

## 1. Visão Geral do Projeto

Este documento especifica a arquitetura de software, padrões de engenharia, modelo de dados client-side, diretrizes de SEO/GEO, conformidade com a LGPD e fluxos de implementação do portal **3W Online** (**Grupo 3W Online**).

### 1.1 Objetivo do Sistema
Construir e manter uma plataforma web de alta conversão, institucional e de utilidades digitais, reunindo:
1. **Apresentação Institucional & Serviços**: Soluções completas em Criação de Sites, Sistemas Web Sob Medida, Desenvolvimento de Apps, Gestão de Anúncios (Google/Meta Ads), Gestão de Redes Sociais e Automação com Inteligência Artificial.
2. **Landing Pages de Alta Conversão**: Páginas focadas em captação de leads para serviços específicos (Tráfego Pago, Gestão de Anúncios, Sistemas Web, Soluções G3W).
3. **Simulador de Preços & Orçamentos Interativo**: Ferramenta em tempo real para cálculo e simulação de escopos e orçamentos com encaminhamento direto para WhatsApp e formulários.
4. **Suíte com Mais de 120 Ferramentas Digitais Client-Side**: Calculadoras financeiras, geradores de dados para desenvolvedores, validadores de documentos (CPF, CNPJ, CEP, etc.), conversores de formatos (JSON/YAML/CSV/Base64) e processamento óptico (OCR) 100% executados no navegador do usuário, com zero latência e total privacidade.

### 1.2 Identidade da Marca
- **Nome Comercial**: 3W Online / Grupo 3W Online
- **CNPJ**: 25.530.623/0001-05
- **Localização / GEO**: Curitiba, Paraná — Brasil (Atendimento Nacional & Remoto)
- **Canais Oficiais**:
  - WhatsApp: `+55 (41) 99692-4829`
  - E-mail: `contato@3wonline.com.br`
  - Domínio Oficial: `https://www.3wonline.com.br`
  - Redes Sociais: `@grupo3wonline` (Instagram, Facebook)
  - Horário de Atendimento: Segunda a Sexta, das 8h às 18h
  - SLA de Resposta Comercial: Em até 24 horas úteis

---

## 2. Stack Tecnológica Oficial

| Camada / Função | Tecnologia | Versão | Descrição |
|---|---|---|---|
| **Core Framework** | **Vue 3** | `^3.4.38` | Composition API (`<script setup lang="ts">`), Single File Components |
| **Linguagem** | **TypeScript** | `^5.5.3` | Tipagem estática estrita (`strict: true`, `vue-tsc`) |
| **Build & Bundler** | **Vite** | `^5.4.2` | HMR instantâneo, ESM nativo, code-splitting e chunking otimizado |
| **Styling & CSS** | **Tailwind CSS** | `^3.4.17` | Utility-first CSS mobile-first, PostCSS, Autoprefixer, `@tailwindcss/forms` |
| **State Management** | **Pinia** | `^2.1.7` | Store reativa modular para catálogo e busca de ferramentas |
| **Roteamento** | **Vue Router** | `^4.5.1` | Lazy-loading com dynamic imports, guards de SEO/Analytics e rotas aninhadas |
| **Internacionalização** | **vue-i18n** | `^9.13.1` | Suporte i18n com catálogo padrão `pt-BR` |
| **Data & Queries** | **@tanstack/vue-query** | `^5.51.0` | Cache assíncrono e gerenciamento de estado de dados externos |
| **Tabelas Complexas** | **@tanstack/vue-table** | `^8.17.0` | Tabelas headless de alta performance |
| **Composables & Utilidades** | **@vueuse/core** | `^10.11.0` | Utilitários de sensores, clipboard, storage e eventos de browser |
| **Animações** | **@vueuse/motion** | `^2.2.3` | Micro-animações e transições declarativas |
| **Formulários & Validação** | **Zod** + **Vee-Validate** | `^3.23.8` / `^4.13.1` | Validação de schemas tipados e tratamento de erros de formulários |
| **Máscaras de Input** | **Maska** | `^3.0.0` | Máscaras de telefone, CPF, CNPJ, moeda e CEP |
| **Iconografia** | **@iconify/vue** + **FontAwesome** | `^4.1.2` / `^6.5.2` | Conjunto leve de ícones sob demanda (MDI, Heroicons, FA6) |
| **Alertas & Modais** | **SweetAlert2** | `^11.12.0` | Notificações visuais e confirmações de ações |
| **Processamento Local** | **Tesseract.js** + **QRCode** | `^7.0.0` / `^1.5.4` | OCR no navegador via WebAssembly e gerador de QR Codes |
| **Busca Local (Fuzzy)** | **Fuse.js** | `^7.0.0` | Busca instantânea no catálogo de 120+ ferramentas |
| **Manipulação de Datas** | **date-fns** | `^3.6.0` | Utilitários imutáveis para cálculos e formatação de datas |
| **Testes Unitários** | **Vitest** | `^1.6.0` | Suíte de testes unitários ultrarrápida integrada ao Vite |
| **Testes E2E** | **Playwright** | `^1.45.0` | Testes automatizados ponta a ponta em múltiplos navegadores |
| **Qualidade de Código** | **ESLint** + **Prettier** | `^8.57.0` / `^3.3.0` | Linting com regras Vue/TS e formatação padronizada |
| **Git Hooks** | **Husky** + **lint-staged** | `^9.0.0` / `^15.2.0` | Validação e formatação automática pré-commit |

---

## 3. Arquitetura de Diretórios & Padrões de Código

A aplicação é estruturada segundo a arquitetura padrão modular do ecossistema Vue 3 + TypeScript:

```
src/
├── assets/
│   └── css/
│       └── main.css              # Camadas Tailwind (@layer base, components, utilities), temas e animações
├── components/
│   ├── layout/
│   │   ├── AppNavbar.vue         # Barra de navegação principal, links, menu responsivo, CTAs
│   │   └── AppFooter.vue         # Rodapé institucional, links rápidos, dados de contato, redes sociais e CNPJ
│   ├── ui/
│   │   ├── AppBreadcrumb.vue     # Navegação estrutural com schema breadcrumb
│   │   ├── CookieBanner.vue      # Banner de consentimento LGPD com persistência em localStorage
│   │   ├── FaqAccordion.vue      # Accordion interativo para FAQs institucionais e de serviços
│   │   ├── TipsSection.vue       # Seção de dicas e melhores práticas
│   │   └── WhatsAppFloat.vue     # Botão flutuante de contato rápido com micro-animação
│   ├── tools/
│   │   ├── common/               # Componentes compartilhados entre ferramentas (ToolHeader, ToolResult, ToolCard)
│   │   ├── Calculadora*.vue      # Calculadoras (Freelancer, Anúncios, ROI, IMC, Salário, etc.)
│   │   ├── Conversor*.vue        # Conversores (JSON/YAML, CSV, Moedas, Unidades, Base64, etc.)
│   │   ├── Gerador*.vue          # Geradores (Senhas, UUID, CPF/CNPJ, QR Code, Paletas, etc.)
│   │   ├── Validador*.vue        # Validadores (CPF, CNPJ, CEP, E-mail, Regex, Cartão, etc.)
│   │   ├── Simulador*.vue        # Simuladores financeiros e de negócio (13º, CDB, Aluguel, etc.)
│   │   └── OCR.vue               # Reconhecimento óptico de caracteres client-side via Tesseract.js
│   └── PriceSimulator.vue        # Simulador interativo de orçamento de serviços da 3W Online
├── composables/
│   ├── useAlert.ts               # Encapsulamento de toasts e alerts (SweetAlert2)
│   ├── useAnalytics.ts           # Rastreamento de eventos, conversões e pageviews
│   ├── usePerformance.ts         # Monitoramento de métricas Web Vitals e render
│   └── useSeo.ts                 # Injeção dinâmica de title, meta description, canonical e tags sociais
├── constants/
│   └── content.ts                # Dados estáticos globais (FAQ, depoimentos, etapas de processo, contatos)
├── locales/
│   └── pt-BR.ts                  # Dicionário de tradução e internacionalização
├── router/
│   ├── index.ts                  # Configuração do Vue Router, rotas principais, guards e SEO
│   └── tools.ts                  # Definição e rotas dinâmicas de todas as ferramentas digitais
├── stores/
│   └── tools.ts                  # Pinia store para catálogo, categorias, filtros e histórico de ferramentas
├── views/
│   ├── Home.vue                  # Página inicial com proposta de valor, estatísticas, serviços, ferramentas e simulador
│   ├── About.vue                 # História, posicionamento institucional e credenciais
│   ├── Services.vue              # Catálogo geral de soluções e orçamentos
│   ├── Contact.vue               # Formulário de contato, canais diretos e WhatsApp
│   ├── Tools.vue                 # Hub central de busca e catálogo de mais de 120 ferramentas digitais
│   ├── ToolWrapper.vue           # Wrapper genérico com layout, breadcrumbs e SEO para cada ferramenta
│   ├── Institucional.vue         # Missão, visão, valores e estrutura do Grupo 3W Online
│   ├── Regulamento.vue           # Regulamentos, termos de campanhas e diretrizes de prestação
│   ├── Privacy.vue               # Política de Privacidade e proteção de dados (LGPD)
│   ├── Terms.vue                 # Termos de Uso e Condições Gerais
│   ├── Pagamento.vue             # Informações e facilidades de pagamento seguro
│   ├── LandingAds.vue            # LP especializada em Tráfego Pago / Google Ads / Meta Ads
│   ├── LandingMarketing.vue      # LP focada em Marketing Digital e Estratégia
│   ├── LandingPRD.vue            # LP de Soluções de Produto e Engenharia
│   ├── LandingSitesSistemas.vue  # LP para Criação de Sites e Sistemas Web
│   ├── lp/                       # Landing pages adicionais (G3w.vue, Sistemas.vue)
│   ├── services/                 # 13 páginas detalhadas de cada serviço (Web, App, IA, Social Media, etc.)
│   └── errors/                   # Error403.vue, Error404.vue, Error500.vue
├── App.vue                       # Componente raiz, layout base, loading overlay global e transições
├── main.ts                       # Bootstrap da aplicação, plugins, diretivas globais e montagem
└── env.d.ts                      # Declarações de tipos de ambiente do Vite
```

---

## 4. Módulos e Funcionalidades Principais

### 4.1 Hub Institucional & Serviços
- **Páginas Institucionais**: Apresentação de autoridade, números da agência (150+ projetos, 5+ anos), diferenciais competitivos e conformidade legal.
- **Páginas Detalhadas de Serviços (`/servicos/*`)**:
  1. `WebDevelopment.vue`: Sites institucionais, portais e e-commerces.
  2. `SystemDevelopment.vue`: Sistemas sob medida, ERPs leves, CRMs e painéis administrativos.
  3. `AppDevelopment.vue`: Aplicativos móveis (iOS e Android / PWA).
  4. `AutomacaoIA.vue`: Chatbots inteligentes, automação de fluxos no WhatsApp e integrações com LLMs.
  5. `MarketingDigital.vue`: Gestão completa de presença online e funil de conversão.
  6. `AdsManagement.vue`: Tráfego pago em Google Ads, Meta Ads (Instagram/Facebook), TikTok Ads e LinkedIn Ads.
  7. `SocialMediaManagement.vue`: Planejamento editorial, criação visual e gestão de comunidade.
  8. `GraphicDesign.vue`: Identidade visual, branding, criação de marcas e materiais gráficos.
  9. `MarketingConsulting.vue`: Consultoria estratégica de posicionamento e vendas.
  10. `BusinessOrganization.vue`: Organização de processos operacionais e digitais.
  11. `CampaignPlanning.vue`: Planejamento de campanhas sazonais e lançamentos.
  12. `PublicRelations.vue`: Relações públicas e autoridade de marca.
  13. `Advertising.vue`: Publicidade e propaganda multicanal.

### 4.2 Simulador de Preços (`PriceSimulator.vue`)
- Componente reativo presente na Home, na página de Serviços e páginas específicas. Permite ao lead configurar escopo (tipo de projeto, funcionalidades, prazos, suporte).
- Geração instantânea de estimativa orçamentária e botão para exportar/enviar escopo detalhado via WhatsApp para fechamento comercial.

### 4.3 Suíte de Mais de 120 Ferramentas Gratuitas (`/ferramentas/*`)
- **Categorias Organizadas no Pinia Store**:
  - **Financeiro & Negócios**: Calculadoras de ROI, Margem de Lucro, Salário Líquido, 13º Salário, Ponto de Equilíbrio, Depreciação, Empréstimos, Preço de Venda.
  - **Marketing & Mídias**: Calculadora de Anúncios, Custos de Social Media, Gerador de UTM, Extrator de E-mails.
  - **Desenvolvedores & TI**: Gerador de UUID v4, Hash (MD5, SHA-256), Base64, Conversores JSON/YAML/CSV/XML, Gerador de SQL INSERT, Validador Regex, Gerador de Senhas Fortes.
  - **Validadores de Documentos**: Validação de CPF, CNPJ, CEP, Cartão de Crédito, Telefone, PIS, Renavam, Título de Eleitor, IBAN, HTML, CSS, JSON.
  - **Design & Cores**: Gerador de Paleta de Cores, Gerador de Gradiente CSS, Conversor RGB/Hex, Gerador de Avatar, Gerador de QR Code.
  - **Produtividade & Texto**: Analisador de Texto, Divisor de Texto, Modificador de Caixa (Uppercase/Lowercase), Gerador de Lorem Ipsum, OCR local com Tesseract.js.
  - **Matemática & Ciências**: Regra de Três, Porcentagem, MMC/MDC, Área, Perímetro, Volume, Pitágoras, Velocidade, Força, Energia.
- **Isolamento e Segurança**: NENHUM dado digitado nas ferramentas é enviado para servidores externos. O processamento é 100% estático e local no navegador.

---

## 5. SEO, GEO-Targeting & Performance

### 5.1 Otimização para Mecanismos de Busca (SEO)
- **Título & Meta Description Dinâmicos**: Gerenciados via `useSeo()` em cada transição de rota com palavras-chave de cauda longa.
- **Canonical Tags**: Garantia de URL canônica única para evitar conteúdo duplicado.
- **OpenGraph & Twitter Cards**: Pré-visualizações ricas em compartilhamentos de redes sociais e mensageiros.
- **Estruturação de Dados Schema.org (JSON-LD)**:
  - `Organization`: Identificação da empresa, redes sociais, logotipo e contatos.
  - `ProfessionalService` / `LocalBusiness`: Coordenadas geográficas de Curitiba (`latitude: -25.4284`, `longitude: -49.2733`), fuso horário, telefone oficial e área de cobertura nacional.
  - `BreadcrumbList`: Trilhas estruturadas para navegação em ferramentas e serviços.

### 5.2 Performance & Core Web Vitals
- **Lazy Loading de Rotas**: Cada página e cada uma das 120+ ferramentas são carregadas sob demanda através de `() => import(...)`.
- **Preconnect de Fontes**: Conexão antecipada com `fonts.googleapis.com` e `fonts.gstatic.com`.
- **Otimização de Assets**: SVG inline e rasterizados modernos, CSS utilitário com remoção de classes não utilizadas (Purge do Tailwind CSS).
- **Transições Suaves**: Transições de rota otimizadas com `<Transition name="page" mode="out-in">` sem layout shifts (CLS < 0.05, LCP < 1.5s).

---

## 6. Privacidade, Segurança & Conformidade LGPD

1. **Consentimento Explícito de Cookies**: Banner de cookies estruturado em conformidade com a LGPD, com opções de aceitar/rejeitar e gravação da preferência em `localStorage`.
2. **Políticas Formais**: Páginas dedicadas e transparentes de `/privacidade`, `/termos` e `/regulamento`.
3. **Segurança de Cabeçalhos no Frontend**:
   - `X-Content-Type-Options: nosniff`
   - `referrer: strict-origin-when-cross-origin`
   - Prevenção de Clickjacking e links externos com `rel="noopener noreferrer"`.
4. **Sanitização Client-Side**: Validação de inputs em tempo real com Zod e escape de HTML em visualizações dinâmicas.

---

## 7. Qualidade de Código, Testes & CI/CD

### 7.1 Padrões de Qualidade
- **TypeScript**: Checagem de tipos estrita através de `vue-tsc -b`.
- **ESLint**: Regras recomendadas para Vue 3 (`plugin:vue/vue3-recommended`) e TypeScript (`@typescript-eslint/recommended`).
- **Prettier**: Formatação automatizada em commits via Husky e `lint-staged`.

### 7.2 Scripts do Projeto
```bash
npm run dev        # Inicializa o servidor local Vite em modo desenvolvimento
npm run build      # Valida tipos com vue-tsc e compila o bundle de produção em dist/
npm run preview    # Executa preview local do bundle gerado em dist/
npm run lint       # Executa o linter e corrige problemas automaticamente
npm run format     # Formata código fonte com Prettier
npm run test       # Executa testes unitários com Vitest
npm run test:watch # Executa Vitest em modo observador
npm run test:e2e   # Executa testes automatizados ponta a ponta com Playwright
```

---

## 8. Estratégia de Build & Deploy

- **Build de Produção**: Gera uma pasta `dist/` 100% estática e otimizada (HTML, CSS minificado, JS com hash de cache busting).
- **Hospedagem & Ambientes Suportados**:
  - **Ambiente Local**: Laragon / Node.js 20+ / Vite Dev Server.
  - **Ambientes de Produção**: HostGator (cPanel / Apache via `.htaccess` com fallback SPA para `index.html`), Nginx, Vercel, Netlify ou AWS S3/CloudFront.
- **Configuração de Roteamento SPA (.htaccess para Apache/HostGator)**:
  ```apache
  <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
  </IfModule>
  ```