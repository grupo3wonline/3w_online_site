# 🎨 Gerador de Gradiente CSS

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Ferramenta profissional e gratuita para criar gradientes CSS perfeitos com visualização em tempo real, múltiplos formatos e exportação instantânea de código.

## ✨ Características

- 🎨 **Geração em Tempo Real**: Visualize gradientes instantaneamente enquanto ajusta
- 🔄 **Múltiplos Formatos**: Linear, Radial e Cônico
- 📋 **Export CSS**: Copie código pronto para usar
- 🎯 **Presets**: Gradientes predefinidos profissionais
- 🎲 **Randomização**: Gere cores aleatórias com um clique
- 📱 **Responsivo**: Mobile-first design
- ⚡ **Performance**: Processamento local no navegador
- 🔒 **Seguro**: Seus dados nunca saem do computador
- ♿ **Acessível**: WCAG 2.1 compliance
- 🌐 **SEO Otimizado**: Meta tags completas, Schema.org
- 📊 **Analytics**: Google Analytics 4 e Tag Manager
- ⚖️ **LGPD**: Totalmente conforme à legislação

## 🚀 Tecnologias

- **React 18.3.1** - Framework UI
- **Vite 5.4.1** - Build tool e dev server
- **TypeScript 5.5.3** - Type safety
- **Tailwind CSS 3.4.11** - Utility-first CSS
- **React Router DOM 6.26.2** - Roteamento
- **SweetAlert2** - Alertas elegantes
- **Font Awesome 6.5.1** - Ícones
- **React Helmet Async** - SEO dinâmico
- **Shadcn/ui** - Componentes acessíveis

## 📋 Pré-requisitos

- Node.js 18+ ou superior
- npm 9+ ou superior

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/3wonline/gerador-gradiente.git

# Entre no diretório
cd gerador_gradiente

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                 # Inicia servidor de desenvolvimento

# Build
npm run build              # Build para produção
npm run build:dev          # Build para development

# Preview
npm run preview            # Preview do build de produção

# Lint
npm run lint               # Verifica código com ESLint
```

## 🌐 Deploy

O projeto está configurado para deploy no caminho `/gerador_gradiente/`.

```bash
# Build para produção
npm run build

# Os arquivos estarão em dist/
```

### Configuração de Base Path

O base path está configurado em:
- `vite.config.ts`: `base: '/gerador_gradiente/'`
- `package.json`: `homepage: '/gerador_gradiente/'`
- `App.tsx`: `<BrowserRouter basename="/gerador_gradiente">`

## 📁 Estrutura do Projeto

```
gerador_gradiente/
├── public/                 # Arquivos estáticos
│   ├── favicon.svg
│   ├── og-image.jpg
│   └── manifest.json
├── src/
│   ├── components/        # Componentes React
│   │   ├── layout/       # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── CookieBanner.tsx
│   │   │   └── Layout.tsx
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── CTA.tsx
│   │   └── SEO.tsx
│   ├── pages/            # Páginas
│   │   ├── Home.tsx
│   │   ├── Sobre.tsx
│   │   ├── Servicos.tsx
│   │   ├── Ferramenta.tsx
│   │   ├── Contato.tsx
│   │   ├── Termos.tsx
│   │   ├── Privacidade.tsx
│   │   └── NotFound.tsx
│   ├── types/            # TypeScript types
│   ├── App.tsx           # App principal
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globais
├── .env                  # Variáveis de ambiente
├── index.html            # HTML template
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Páginas

1. **Home** (`/`) - Landing page com hero, features e CTAs
2. **Sobre** (`/sobre`) - Informações da empresa e valores
3. **Serviços** (`/servicos`) - Serviços oferecidos pela 3w Online
4. **Ferramenta** (`/ferramenta`) - Gerador de gradientes
5. **Contato** (`/contato`) - Formulário e informações de contato
6. **Termos** (`/termos`) - Termos de uso
7. **Privacidade** (`/privacidade`) - Política de privacidade (LGPD)

## 🔐 LGPD

A aplicação está em conformidade com a LGPD (Lei nº 13.709/2018):

- ✅ Banner de consentimento de cookies
- ✅ Política de Privacidade completa
- ✅ Termos de Uso detalhados
- ✅ Processamento local de dados
- ✅ Direitos do usuário claramente explicados
- ✅ Encarregado de dados (DPO) identificado

## 📊 SEO e Analytics

### Meta Tags
- Title, description e keywords em todas as páginas
- Open Graph tags completas
- Twitter Card tags
- Schema.org structured data

### Analytics
- Google Analytics 4 (GA4)
- Google Tag Manager (GTM)
- Eventos customizados
- Consentimento de cookies

## 🎨 Design System

### Cores Principais
- Primary: Indigo (#6366f1) → Purple (#a855f7)
- Secondary: Emerald (#10b981)
- Accent: Pink (#ec4899)

### Tipografia
- Font Family: Inter (Google Fonts)
- Pesos: 300, 400, 500, 600, 700, 800

### Ícones
- Font Awesome 6.5.1
- Biblioteca completa de ícones

## 🌟 Funcionalidades da Ferramenta

### Tipos de Gradiente
1. **Linear** - Gradientes lineares com direção customizável
2. **Radial** - Gradientes radiais circulares
3. **Cônico** - Gradientes cônicos com ângulo ajustável

### Controles
- Seletor de cores (color picker + input hex)
- Direção do gradiente (8 opções para linear)
- Ângulo (0-360° para cônico)
- Presets profissionais
- Geração aleatória de cores

### Export
- Código CSS pronto para copiar
- Um clique para copiar à área de transferência
- Notificação de sucesso com SweetAlert2

## 🔒 Segurança

- Processamento 100% local no navegador
- HTTPS obrigatório em produção
- Headers de segurança configurados
- Sanitização de inputs
- XSS Protection
- CSRF Protection

## ⚡ Performance

- Lazy loading de componentes
- Code splitting automático
- Otimização de imagens
- Minificação de CSS/JS
- Compression (gzip/brotli)
- CDN ready

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores e Créditos

**Desenvolvido por [3w Online](https://www.3wonline.com.br)**

- Design e Desenvolvimento
- UI/UX
- Arquitetura de Software
- SEO e Performance

## 📧 Contato

- **Email**: contato@3wonline.com.br
- **Website**: [www.3wonline.com.br](https://www.3wonline.com.br)
- **Ferramenta**: [app.3wonline.com/gerador_gradiente](https://app.3wonline.com/gerador_gradiente)

## 🎯 Roadmap

- [ ] Múltiplas cores (3+)
- [ ] Exportação em diferentes formatos (SVG, PNG)
- [ ] Paleta de cores favoritas
- [ ] Histórico de gradientes criados
- [ ] Compartilhamento via URL
- [ ] Temas (claro/escuro)
- [ ] PWA (Progressive Web App)
- [ ] Modo offline

---

<div align="center">
  <p>Feito com ❤️ pela <a href="https://www.3wonline.com.br">3w Online</a></p>
  <p>
    <a href="https://www.3wonline.com.br">Website</a> •
    <a href="https://app.3wonline.com/gerador_gradiente">Ferramenta</a> •
    <a href="https://app.3wonline.com/gerador_gradiente/contato">Contato</a>
  </p>
</div>
