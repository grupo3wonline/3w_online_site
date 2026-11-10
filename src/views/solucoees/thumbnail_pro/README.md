# 🎬 ThumbnailPro - Extrator de Thumbnails do YouTube

<div align="center">

![ThumbnailPro](https://img.shields.io/badge/ThumbnailPro-v1.0.0-red?style=for-the-badge)
![Vue.js](https://img.shields.io/badge/Vue.js-3.4.21-4FC08D?style=for-the-badge&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.1.6-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

**Ferramenta #1 mais confiável do Brasil para extração de thumbnails do YouTube**

[🚀 Demo](https://app.3wonline.com/thumbnail_pro/) • [📖 Documentação](TECHNICAL_DOCS.md) • [📋 Relatório](REFACTORING_REPORT.md)

</div>

---

## 🌟 Sobre o Projeto

Uma aplicação web moderna e profissional desenvolvida com **Vue.js 3**, **Vite** e **Tailwind CSS** para extrair thumbnails de alta qualidade de vídeos do YouTube de forma instantânea, segura e gratuita.

Desenvolvido pelo **Grupo 3w Online** - líder em soluções web personalizadas e sistemas sob demanda.

### ✨ Características Principais

- **⚡ Ultra Rápido**: Extração em menos de 3 segundos
- **🛡️ 100% Seguro**: Não armazenamos dados, conforme LGPD
- **📱 Responsivo**: Design Mobile First, funciona em todos dispositivos
- **🎨 Design Moderno**: Interface UX/UI profissional com dark mode
- **🖼️ Múltiplas Resoluções**: 6 tamanhos disponíveis (120x90 até 4K)
- **🆓 Totalmente Gratuito**: Sem limites, sem cadastro, sem taxas
- **🔍 SEO Otimizado**: Google Analytics, GTM e Structured Data
- **♿ Acessível**: Font Awesome icons e navegação intuitiva

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia       | Versão  | Descrição                    |
| ---------------- | ------- | ---------------------------- |
| **Vue.js**       | 3.4.21  | Framework JavaScript reativo |
| **Vite**         | 5.1.6   | Build tool ultra-rápido      |
| **Tailwind CSS** | 3.4.1   | Framework CSS utility-first  |
| **Vue Router**   | 4.2.5   | Roteamento SPA               |
| **Font Awesome** | Latest  | Biblioteca de ícones         |
| **SweetAlert2**  | Latest  | Alertas elegantes            |
| **@vueuse/core** | 10.7.2  | Composables Vue              |
| **Lucide Vue**   | 0.358.0 | Ícones modernos              |

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/3wonline/thumbnail_pro.git
   cd thumbnail_pro
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Abra no navegador:**
   ```
   http://localhost:3000
   ```

```bash
npm run dev    # Servidor de desenvolvimento (porta 3000)
npm run build  # Build de produção (pasta dist/)
npm run preview # Preview do build de produção
```

---

## 🎯 Funcionalidades

### 🏠 Landing Page (Home)

- ✅ Hero section com badges de autoridade e prova social
- ✅ Stats cards (100% Grátis, <3s, 4K, ∞ Uso)
- ✅ Social proof banner (+50K usuários, 4.9/5 estrelas)
- ✅ Features section com ícones Font Awesome
- ✅ How it works (3 passos simples)
- ✅ Benefits section detalhada
- ✅ Use cases para diferentes profissionais
- ✅ Instruções e dicas de uso
- ✅ FAQ e depoimentos integrados
- ✅ CTA final com garantia
- ✅ **Copy persuasiva usando gatilhos de Robert Cialdini**

### 🔧 Extrator de Thumbnails

- ✅ Interface limpa e intuitiva
- ✅ Validação de URL em tempo real
- ✅ 6 resoluções disponíveis (120x90 até 4K)
- ✅ Download individual ou todos de uma vez
- ✅ Preview das thumbnails
- ✅ Informações completas do vídeo
- ✅ Loading states e feedback visual
- ✅ Tratamento de erros elegante

### 🏢 Sobre (About)

- ✅ Informações completas do Grupo 3w Online
- ✅ Missão e visão da empresa
- ✅ 6 funcionalidades principais destacadas
- ✅ Serviços oferecidos (Sites, E-commerce, Sistemas, Apps)
- ✅ Tech stack utilizada
- ✅ Informações do desenvolvedor
- ✅ CTAs para contato e orçamento

### 📧 Contato (Contact)

- ✅ **Iframe do Freshdesk integrado**
- ✅ Informações de contato completas
- ✅ Links para redes sociais
- ✅ Copy persuasiva sobre serviços
- ✅ Seção "Por Que Escolher" com 4 pilares
- ✅ CTAs estratégicos

### 🔒 LGPD Compliance

- ✅ Cookie Consent banner
- ✅ Política de Privacidade completa
- ✅ Termos de Uso detalhados
- ✅ Links acessíveis no footer

---

## 🎨 Design System

### 🌙 Dark Mode

- ✅ Toggle no navbar (ícones sol/lua)
- ✅ Persistência no localStorage
- ✅ Detecção automática da preferência do sistema
- ✅ Transições suaves entre temas
- ✅ Todas as páginas com suporte

### 🎨 Cores Principais

```css
/* YouTube Red */
--youtube-red: #ff0000;
--youtube-red-hover: #cc0000;

/* Gradients */
.gradient-bg {
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
}
```

### 🔤 Tipografia

- **Font Family**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800, 900

### 🧩 Componentes

- Navbar responsivo com menu mobile
- Footer completo com links e redes sociais
- Cards com hover effects e sombras
- Botões com animações (scale, gradient)
- Inputs com estados de focus
- Modais e toasts (NotificationToast)
- Loading spinners e skeleton loaders

---

## 📱 Responsividade

**Approach:** Mobile First

| Breakpoint | Tamanho | Dispositivo         |
| ---------- | ------- | ------------------- |
| **sm**     | 640px+  | Smartphones grandes |
| **md**     | 768px+  | Tablets             |
| **lg**     | 1024px+ | Laptops             |
| **xl**     | 1280px+ | Desktops            |
| **2xl**    | 1536px+ | Telas grandes       |

---

## 🔍 SEO & Analytics

### Meta Tags Implementadas

- ✅ Title otimizado com keywords
- ✅ Description persuasiva (160 caracteres)
- ✅ Keywords relevantes
- ✅ Author e Copyright (Grupo 3w Online)
- ✅ Canonical URL
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Favicons (SVG, ICO, PNG)
- ✅ PWA Manifest

### Analytics

- ✅ **Google Analytics 4** (G-J06THXX0MW)
- ✅ **Google Tag Manager** (GTM-WVMJV7G6)
- ✅ GTM noscript tag
- ✅ Structured Data (Schema.org WebApplication)

### Performance

| Métrica                      | Valor    |
| ---------------------------- | -------- |
| **Bundle Size (gzipped)**    | ~62 KB   |
| **CSS (gzipped)**            | ~32 KB   |
| **Build Time**               | ~6s      |
| **First Contentful Paint**   | < 1.5s\* |
| **Largest Contentful Paint** | < 2.5s\* |

\*Valores estimados em conexão rápida

---

## 🗂️ Estrutura do Projeto

```
thumbnail_pro/
├── public/                # Assets estáticos
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   └── schema.json
├── src/
│   ├── components/        # Componentes Vue
│   │   ├── Home.vue              # Landing page
│   │   ├── About.vue             # Sobre + Grupo 3w Online
│   │   ├── Contact.vue           # Contato + Freshdesk
│   │   ├── ContactIframe.vue     # Iframe Freshdesk
│   │   ├── ThumbnailExtractor.vue # Ferramenta principal
│   │   ├── Navbar.vue            # Navegação + dark mode
│   │   ├── Footer.vue            # Rodapé completo
│   │   ├── FAQ.vue               # Perguntas frequentes
│   │   ├── Testimonials.vue      # Depoimentos
│   │   ├── CookieConsent.vue     # Banner LGPD
│   │   ├── PrivacyPolicy.vue     # Política Privacidade
│   │   ├── TermsOfService.vue    # Termos de Uso
│   │   ├── NotificationToast.vue # Notificações
│   │   ├── LoadingSpinner.vue    # Loading state
│   │   └── SkeletonLoader.vue    # Skeleton UI
│   ├── composables/       # Composables reutilizáveis
│   │   ├── useDarkMode.js        # Dark mode
│   │   ├── useCookies.js         # Gestão cookies
│   │   ├── useLocalStorage.js    # LocalStorage
│   │   ├── useNotifications.js   # Sistema notificações
│   │   └── useSecurity.js        # Segurança
│   ├── utils/            # Utilitários
│   │   ├── analytics.js          # Google Analytics
│   │   ├── performance.js        # Performance
│   │   ├── sanitize.js           # Sanitização
│   │   └── validation.js         # Validação
│   ├── App.vue           # Componente raiz
│   ├── main.js           # Entry point + Router
│   └── style.css         # Estilos globais Tailwind
├── index.html            # HTML base com SEO
├── vite.config.js        # Config Vite
├── tailwind.config.js    # Config Tailwind
├── postcss.config.js     # Config PostCSS
├── package.json          # Dependências
├── README.md             # Este arquivo
├── REFACTORING_REPORT.md # Relatório completo
├── QUICK_START.md        # Guia rápido
└── TECHNICAL_DOCS.md     # Docs técnicas
```

---

## 🚀 Deploy

### Build de Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

### Configuração do Servidor

**Base Path:** `/thumbnail_pro/`

O projeto está configurado para ser hospedado em:

```
https://app.3wonline.com/thumbnail_pro/
```

### Requisitos do Servidor

- Suporte a SPA (Single Page Application)
- Redirecionamento de rotas para index.html
- Compressão gzip/brotli recomendada
- HTTPS obrigatório

---

## 📚 Documentação Adicional

- 📋 [Relatório Completo de Refatoração](REFACTORING_REPORT.md)
- 🚀 [Guia Rápido de Início](QUICK_START.md)
- 📖 [Documentação Técnica](TECHNICAL_DOCS.md)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 👨‍💻 Autor & Créditos

**Desenvolvedor:**  
🔹 **HotWyl** - willfrombrasil  
🔗 [GitHub](https://github.com/willfrombrasil) • [LinkedIn](https://www.linkedin.com/in/willfrombrasil)

**Empresa:**  
🏢 **Grupo 3w Online**  
🌐 [www.3wonline.com.br](https://www.3wonline.com.br)  
📧 contato@3wonline.com.br

### Serviços do Grupo 3w Online

- 🌐 Sites Personalizados
- 🛒 E-commerce Completo
- ⚙️ Sistemas Web Customizados
- 📱 Aplicativos Mobile (iOS/Android)
- 📊 Marketing Digital
- 🔧 Manutenção e Suporte

---

## 📄 Licença

Este projeto está sob licença proprietária.  
© 2025 Grupo 3w Online. Todos os direitos reservados.

---

## 📞 Suporte

Precisa de ajuda ou tem sugestões?

- 📧 **Email:** contato@3wonline.com.br
- 🌐 **Website:** https://www.3wonline.com.br
- 💬 **Formulário:** [Página de Contato](https://app.3wonline.com/thumbnail_pro/contato)

---

## 🌟 Features Futuras

- [ ] API para desenvolvedores
- [ ] Extensão para navegador
- [ ] App mobile nativo
- [ ] Suporte a playlists
- [ ] Batch processing
- [ ] Histórico de downloads
- [ ] Favoritos/bookmarks
- [ ] Compartilhamento social direto

---

<div align="center">

**⭐ Se este projeto foi útil, considere deixar uma estrela!**

Desenvolvido com ❤️ por [Grupo 3w Online](https://www.3wonline.com.br)

![Made with Vue.js](https://img.shields.io/badge/Made%20with-Vue.js-4FC08D?style=flat-square&logo=vue.js)
![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css)
![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=flat-square&logo=vite)

</div>

2. **O conteúdo estará na pasta `dist/`**

3. **Configure seu servidor web para servir os arquivos estáticos**

### 📈 Métricas e Analytics

- Google Analytics integrado
- Tracking de conversões
- Heatmaps e user behavior
- Performance monitoring

### 🛡️ Segurança

- Validação de inputs
- Sanitização de dados
- HTTPS obrigatório
- CSP headers
- XSS protection

### 📞 Suporte

Para suporte técnico ou dúvidas:

- Email: suporte@thumbnailpro.com
- Website: https://thumbnailpro.com

### 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para criadores de conteúdo**
