# 3w OmniHub - Thumbnail YouTube Downloader

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

🚀 **Ferramenta profissional, moderna e gratuita para download de thumbnails do YouTube em alta qualidade.**

## 📋 Índice

- [Sobre](#sobre)
- [Recursos](#recursos)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Scripts](#scripts)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração](#configuração)
- [Testes](#testes)
- [Deploy](#deploy)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Contato](#contato)

## 🎯 Sobre

O **3w OmniHub - Thumbnail YouTube Downloader** é uma aplicação web desenvolvida com Vue.js 3, Vite e Tailwind CSS que permite aos usuários baixar miniaturas (thumbnails) de vídeos do YouTube em diversas resoluções, incluindo HD, Full HD e 4K.

### Principais Características

✅ **100% Gratuito** - Sem taxas, sem assinaturas, sem limites  
✅ **Alta Qualidade** - Suporte para resoluções até 4K  
✅ **Rápido** - Download instantâneo em segundos  
✅ **Sem Cadastro** - Use imediatamente, sem burocracia  
✅ **Mobile First** - Design responsivo e otimizado para todos os dispositivos  
✅ **Dark Mode** - Tema escuro para conforto visual  
✅ **LGPD Compliant** - Total conformidade com a Lei Geral de Proteção de Dados  
✅ **SEO Otimizado** - Meta tags completas e structured data  
✅ **PWA Ready** - Progressive Web App com manifest.json

## 🚀 Recursos

### Interface e UX

- 🎨 Design moderno e profissional com Tailwind CSS
- 🌓 Dark Mode com persistência no localStorage
- 📱 Totalmente responsivo (Mobile First)
- ♿ Acessibilidade (ARIA labels, navegação por teclado)
- ✨ Animações suaves e transições elegantes
- 🎯 Tooltips informativos
- 🔔 Notificações com SweetAlert2
- 🎭 Font Awesome para ícones

### Funcionalidades

- 📥 Download de thumbnails em múltiplas resoluções
- 🔗 Validação de URLs do YouTube
- 📋 Copiar URL da imagem
- 🔄 Reset e nova pesquisa
- 💾 Histórico de preferências salvo localmente

### SEO e Analytics

- 🔍 Meta tags completas (Open Graph, Twitter Cards)
- 📊 Google Analytics 4 (GA4)
- 🏷️ Google Tag Manager (GTM)
- 🗺️ Sitemap.xml e robots.txt
- 📈 Structured Data (Schema.org)

### Segurança e Privacidade

- 🔒 Conformidade com LGPD
- 🛡️ Cookie Consent personalizável
- 🔐 Processamento local (sem armazenamento de dados pessoais)
- 📜 Política de Privacidade completa
- 📄 Termos de Uso detalhados

## 🛠️ Tecnologias

### Core

- **Vue.js 3.4** - Framework progressivo JavaScript
- **Vite 7.1** - Build tool ultra-rápido
- **Vue Router 4.5** - Roteamento oficial do Vue
- **Tailwind CSS 3.4** - Framework CSS utility-first

### Bibliotecas

- **SweetAlert2 11.10** - Alertas e modais elegantes
- **Font Awesome 6.5** - Ícones vetoriais
- **Vitest 1.1** - Framework de testes unitários

### Ferramentas de Desenvolvimento

- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Prefixos CSS automáticos
- **ESLint** - Linting de código JavaScript/Vue

### Analytics e Tracking

- **Google Analytics 4** - Análise de métricas
- **Google Tag Manager** - Gerenciamento de tags
- **Google Search Console** - SEO e indexação

## 📦 Instalação

### Pré-requisitos

- Node.js >= 16.x
- npm >= 8.x ou yarn >= 1.22

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/thumbnail_youtube.git
cd thumbnail_youtube
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
VITE_BASE_URL=/thumbnail_youtube/
VITE_API_URL=https://3wsys-back-hotwyl.vercel.app
VITE_GA_ID=G-J06THXX0MW
VITE_GTM_ID=GTM-WVMJV7G6
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
```

Acesse: `http://localhost:5173/thumbnail_youtube/`

## 🎮 Uso

### Desenvolvimento

```bash
npm run dev        # Iniciar servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview da build de produção
npm run lint       # Executar ESLint
npm run test       # Executar testes
npm run test:ui    # Executar testes com interface
```

### Como Usar a Aplicação

1. **Copie a URL do vídeo do YouTube**

   - Acesse o vídeo no YouTube
   - Copie a URL da barra de endereços

2. **Cole e busque**

   - Cole a URL no campo de entrada
   - Clique em "Obter Thumbnail"

3. **Baixe**
   - Escolha a resolução desejada
   - Clique em "Baixar Thumbnail"

### Formatos de URL Aceitos

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`

## 📂 Estrutura do Projeto

```
thumbnail_youtube/
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── tailwind.css
│   ├── components/
│   │   ├── BackToTop.vue
│   │   ├── CookieConsent.vue
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   └── LoadingSpinner.vue
│   ├── composables/
│   │   └── useDarkMode.js
│   ├── router/
│   │   └── index.js
│   ├── tests/
│   │   └── app.test.js
│   ├── views/
│   │   ├── About.vue
│   │   ├── Contact.vue
│   │   ├── LandingPage.vue
│   │   ├── NotFound.vue
│   │   ├── PrivacyPolicy.vue
│   │   ├── TermsOfService.vue
│   │   └── ThumbnailDownloader.vue
│   ├── App.vue
│   └── main.js
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── vitest.config.js
└── README.md
```

## ⚙️ Configuração

### Base Path

O projeto está configurado para funcionar no caminho `/thumbnail_youtube/`. Para alterar:

1. **vite.config.js**

```javascript
export default defineConfig({
  base: "/novo-caminho/",
  // ...
});
```

2. **vue.config.js**

```javascript
module.exports = {
  publicPath: "/novo-caminho/",
};
```

3. **router/index.js**

```javascript
const router = createRouter({
  history: createWebHistory("/novo-caminho/"),
  // ...
});
```

4. **manifest.json**

```json
{
  "start_url": "/novo-caminho/",
  "scope": "/novo-caminho/"
}
```

### Dark Mode

O tema escuro é gerenciado pelo composable `useDarkMode` e persiste no localStorage.

### Google Analytics / GTM

Configure seus IDs no arquivo `.env` e no `index.html`.

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Executar com interface
npm run test:ui

# Executar com coverage
npm run test:coverage
```

### Tipos de Testes Implementados

- ✅ Testes unitários
- ✅ Testes de validação de URLs
- ✅ Testes de Dark Mode
- ✅ Testes de Cookie Consent
- ✅ Testes de performance
- ✅ Testes de segurança
- ✅ Testes de acessibilidade
- ✅ Testes de responsividade

## 🚀 Deploy

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

### Deploy na Vercel

```bash
vercel --prod
```

### Deploy no Netlify

```bash
netlify deploy --prod --dir=dist
```

### Deploy em Servidor Apache/Nginx

1. Faça build do projeto
2. Copie o conteúdo de `dist/` para seu servidor
3. Configure o servidor para servir o conteúdo no caminho correto

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

**Grupo 3w Online**  
Especialistas em desenvolvimento de sites e sistemas personalizados

- 🌐 Website: [www.3wonline.com.br](https://www.3wonline.com.br)
- 📧 Email: Através do [formulário de contato](https://app.3wonline.com/thumbnail_youtube/contato)
- 💼 LinkedIn: [@3wonline](https://www.linkedin.com/company/3wonline)

**Desenvolvedor**  
HotWyl - WillFromBrasil

---

<div align="center">
  <p>Desenvolvido com ❤️ pelo Grupo 3w Online</p>
  <p>© 2025 3w OmniHub - Todos os direitos reservados</p>
</div>
