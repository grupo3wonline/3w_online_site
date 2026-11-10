# SRT Converter Pro 🎬

![SRT Converter Pro](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Vue.js](https://img.shields.io/badge/Vue.js-3.4.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)

**Conversor Profissional de Roteiro para SRT** - Interface moderna, rápida e responsiva

Desenvolvido por **Hotwyl - Will from Brasil** | **Grupo 3W Online**

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Recursos Principais](#recursos-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Testes](#testes)
- [Build e Deploy](#build-e-deploy)
- [Conformidade LGPD](#conformidade-lgpd)
- [SEO e Analytics](#seo-e-analytics)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Contato](#contato)

---

## 🎯 Sobre o Projeto

O **SRT Converter Pro** é uma ferramenta web profissional e gratuita para converter roteiros em legendas no formato SRT. Desenvolvida com as mais modernas tecnologias, oferece:

- ⚡ **Conversão Ultra Rápida** - Processamento em segundos
- 🎨 **Interface Moderna** - Design responsivo e intuitivo (Mobile First)
- 🔒 **100% Seguro** - Processamento local no navegador
- 🌙 **Dark Mode** - Alterne entre temas claro/escuro
- 🌐 **SEO Otimizado** - Estrutura completa para posicionamento
- ✅ **Conformidade LGPD** - Política de Privacidade e Termos de Uso

---

## ✨ Recursos Principais

### Funcionalidades

- ✅ Conversão instantânea de roteiro para SRT
- ✅ Configuração de intervalo entre legendas (0-30s)
- ✅ Limite de caracteres por legenda customizável
- ✅ Download direto do arquivo SRT
- ✅ Processamento 100% local (sem envio para servidor)
- ✅ Interface responsiva (Mobile First)
- ✅ Modo escuro/claro automático
- ✅ Tooltips e ajuda contextual
- ✅ Validação de entrada em tempo real
- ✅ Preview do resultado antes do download

### UI/UX

- 🎨 Design moderno com Tailwind CSS
- 📱 Totalmente responsivo (Mobile, Tablet, Desktop)
- ⚡ Animações suaves e transições
- 🎯 Foco em acessibilidade (WCAG 2.1)
- 🔔 Notificações com SweetAlert2
- 💡 Tooltips informativos
- 🎭 Font Awesome Icons

### Segurança

- 🔒 Processamento local (sem envio de dados)
- 🛡️ Sanitização de entrada
- 🔐 HTTPS obrigatório
- ✅ Conformidade com LGPD
- 🍪 Gerenciamento de cookies transparente

---

## 🚀 Tecnologias Utilizadas

### Core

- **Vue.js 3.4** - Framework progressivo
- **TypeScript 5.3** - Tipagem estática
- **Vite 5.1** - Build tool ultra-rápida
- **Vue Router 4.2** - Gerenciamento de rotas

### Estilização

- **Tailwind CSS 3.4** - Utility-first CSS
- **PostCSS** - Transformação CSS
- **Font Awesome 6** - Biblioteca de ícones

### Bibliotecas

- **SweetAlert2** - Alertas elegantes
- **@vueuse/core** - Composables utilitários
- **@headlessui/vue** - Componentes acessíveis

### Analytics & SEO

- **Google Analytics 4 (GA4)**
- **Google Tag Manager (GTM)**
- **Google Search Console**
- **Meta Tags Open Graph**
- **Schema.org Structured Data**

### Desenvolvimento

- **ESLint** - Linting
- **Prettier** - Formatação de código
- **TypeScript** - Verificação de tipos
- **Vitest** - Framework de testes

---

## 📦 Instalação

### Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

### Passo a Passo

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/srt_converter_pro.git

# Entre na pasta do projeto
cd srt_converter_pro

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173/srt_converter_pro/`

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_BASE_URL=/srt_converter_pro/
VITE_GA_ID=G-J06THXX0MW
VITE_GTM_ID=GTM-WVMJV7G6
```

### Base Path

O projeto está configurado para ser hospedado em um subdiretório. Para alterar:

**vite.config.ts**

```typescript
export default defineConfig({
  base: "/srt_converter_pro/", // Altere aqui
  // ...
});
```

**src/main.ts**

```typescript
const router = createRouter({
  history: createWebHistory("/srt_converter_pro/"), // Altere aqui
  routes,
});
```

---

## 🎮 Uso

### Desenvolvimento

```bash
# Servidor de desenvolvimento com hot-reload
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Lint e correção automática
npm run lint

# Formatação de código
npm run format

# Verificação de tipos TypeScript
npm run type-check
```

### Build

```bash
# Build otimizado para produção
npm run build

# Build com verificação de tipos
npm run build:check

# Análise do bundle
npm run analyze
```

Os arquivos compilados estarão em `dist/`

---

## 📁 Estrutura do Projeto

```
srt_converter_pro/
├── public/                 # Arquivos estáticos
│   ├── manifest.json      # PWA manifest
│   ├── robots.txt         # Instruções para crawlers
│   └── sitemap.xml        # Mapa do site
├── src/
│   ├── assets/            # CSS e recursos
│   │   └── style.css      # Estilos globais
│   ├── components/        # Componentes Vue
│   │   ├── common/        # Componentes reutilizáveis
│   │   ├── home/          # Componentes da home
│   │   └── icons/         # Componentes de ícones
│   ├── composables/       # Composables Vue
│   │   ├── useConsent.ts
│   │   ├── useConverter.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useSweetAlert.ts
│   │   ├── useTheme.ts
│   │   └── useToast.ts
│   ├── types/             # Definições TypeScript
│   │   └── index.ts
│   ├── utils/             # Funções utilitárias
│   │   ├── analytics.ts   # Google Analytics
│   │   ├── sanitize.ts    # Sanitização
│   │   ├── srtConverter.ts # Lógica de conversão
│   │   └── validation.ts  # Validações
│   ├── views/             # Páginas/Views
│   │   ├── HomeView.vue
│   │   ├── ConverterView.vue
│   │   ├── AboutView.vue
│   │   ├── ContactView.vue
│   │   ├── PrivacyPolicyView.vue
│   │   └── TermsOfServiceView.vue
│   ├── App.vue            # Componente raiz
│   └── main.ts            # Entry point
├── index.html             # HTML template
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── vite.config.ts         # Configuração Vite
├── tailwind.config.js     # Configuração Tailwind
└── README.md              # Este arquivo
```

---

## 🧪 Testes

### Executar Testes

```bash
# Rodar todos os testes
npm run test

# Testes em modo watch
npm run test:watch

# Coverage de testes
npm run test:coverage
```

### Tipos de Testes

- ✅ **Testes Unitários** - Funções e composables
- ✅ **Testes de Integração** - Componentes e rotas
- ✅ **Testes de Segurança** - Sanitização e validação
- ✅ **Testes de Performance** - Tempo de execução
- ✅ **Testes de Acessibilidade** - ARIA e navegação
- ✅ **Testes de LGPD** - Consentimento e privacidade

---

## 🚀 Build e Deploy

### Build para Produção

```bash
npm run build
```

### Deploy

O projeto pode ser hospedado em:

- **Vercel** - `vercel --prod`
- **Netlify** - `netlify deploy --prod`
- **GitHub Pages** - Configure no repositório
- **Servidor próprio** - Copie a pasta `dist/`

### Configuração de Servidor

Para Apache, adicione ao `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /srt_converter_pro/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /srt_converter_pro/index.html [L]
</IfModule>
```

Para Nginx:

```nginx
location /srt_converter_pro/ {
  try_files $uri $uri/ /srt_converter_pro/index.html;
}
```

---

## 🔒 Conformidade LGPD

O projeto está em **total conformidade com a LGPD** (Lei Geral de Proteção de Dados - Lei nº 13.709/2018):

### Implementações

- ✅ **Política de Privacidade** completa e acessível
- ✅ **Termos de Uso** detalhados
- ✅ **Cookie Consent** com opções granulares
- ✅ **Direito ao Esquecimento** - Exclusão de dados
- ✅ **Portabilidade de Dados** - Export de informações
- ✅ **Consentimento Explícito** - Aceite obrigatório
- ✅ **Transparência** - Informações claras sobre coleta

### Dados Coletados

- 📊 Dados analíticos (Google Analytics)
- 🍪 Cookies de preferências
- 📧 Dados de contato (formulário)
- 🔐 Processamento local (roteiros não são enviados)

---

## 📈 SEO e Analytics

### SEO

- ✅ Meta tags completas
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Schema.org Structured Data
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Alt text em imagens
- ✅ Títulos descritivos
- ✅ URLs amigáveis

### Analytics

- **Google Analytics 4 (GA4)** - ID: G-J06THXX0MW
- **Google Tag Manager (GTM)** - ID: GTM-WVMJV7G6
- **Google Search Console** - Integrado

### Eventos Rastreados

- 🎯 Page views
- 🔄 Conversões realizadas
- 📥 Downloads de arquivos
- 🖱️ Cliques em CTAs
- ⏱️ Tempo na página
- 🚀 Taxa de rejeição

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Guidelines

- Siga o padrão de código (ESLint + Prettier)
- Adicione testes para novas funcionalidades
- Atualize a documentação
- Faça commits descritivos

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato

**Desenvolvedor:** Hotwyl - Will from Brasil  
**Empresa:** Grupo 3W Online  
**Website:** [www.3wonline.com.br](https://www.3wonline.com.br)  
**Email:** Através do [formulário de contato](https://app.3wonline.com/srt_converter_pro/contato)

---

## 🙏 Agradecimentos

- Vue.js Team
- Tailwind CSS Team
- Vite Team
- Todos os contribuidores open source
- Comunidade de desenvolvedores

---

## 🎉 Features Futuras

- [ ] Suporte a múltiplos idiomas (i18n)
- [ ] Import de arquivos de texto
- [ ] Exportação para outros formatos (VTT, ASS)
- [ ] Editor de legendas inline
- [ ] Sincronização com vídeo
- [ ] API pública
- [ ] Modo offline (PWA)
- [ ] Histórico de conversões

---

**⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!**

---

_Última atualização: 24 de Dezembro de 2025_

_Desenvolvido com ❤️ por Hotwyl - Will from Brasil | Grupo 3W Online_
