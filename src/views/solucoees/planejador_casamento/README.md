# 💍 Planejador de Casamento

> Ferramenta completa e gratuita para planejar o casamento dos seus sonhos

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

![Planejador de Casamento](./public/og-image.jpg)

## ✨ Características

- 🎨 **Design Premium** - Interface moderna com glassmorphism e animações suaves
- 📱 **Mobile First** - 100% responsivo e otimizado para todos os dispositivos
- 🚀 **Performance** - Build otimizado e carregamento ultra-rápido
- 🔒 **LGPD Compliant** - Totalmente adequado à Lei Geral de Proteção de Dados
- 📊 **SEO Otimizado** - Meta tags completas, Schema.org e Open Graph
- 🎯 **Google Analytics** - Integração com GA4 e Google Tag Manager
- 💰 **Calculadora de Orçamento** - Estime custos detalhados do seu casamento
- 🎨 **UI/UX Profissional** - Componentização com Shadcn/ui e Radix UI
- ⚡ **SweetAlert2** - Alertas e notificações elegantes
- 🎭 **Font Awesome** - Ícones profissionais integrados

## 🚀 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | 18.3.1 | Biblioteca JavaScript para interfaces |
| Vite | 5.4.1 | Build tool e dev server ultra-rápido |
| TypeScript | 5.5.3 | Superset JavaScript com tipagem estática |
| Tailwind CSS | 3.4.11 | Framework CSS utility-first |
| React Router | 6.26.2 | Roteamento para React Applications |
| Shadcn/ui | Latest | Componentes reutilizáveis com Radix UI |
| SweetAlert2 | Latest | Alertas customizáveis e bonitos |
| Font Awesome | 6.5.1 | Biblioteca de ícones profissionais |

## 📂 Estrutura do Projeto

```
planejador_casamento/
├── public/
│   ├── manifest.json
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── apple-touch-icon.svg
│   └── og-image.jpg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── CTA3wOnline.tsx
│   │   ├── CookieBanner.tsx
│   │   └── ui/ (Shadcn components)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Tools.tsx
│   │   ├── Contact.tsx
│   │   ├── Terms.tsx
│   │   ├── Privacy.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório** (se aplicável)
```bash
git clone https://github.com/seu-usuario/planejador_casamento.git
cd planejador_casamento
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o ambiente**

O projeto já está configurado com:
- Base path: `/planejador_casamento/`
- Google Analytics: `G-J06THXX0MW`
- Google Tag Manager: `GTM-WVMJV7G6`

4. **Execute em desenvolvimento**
```bash
npm run dev
```

Acesse: `http://localhost:8080`

5. **Build para produção**
```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run build:dev    # Build em modo desenvolvimento
npm run preview      # Preview do build de produção
npm run lint         # Verifica erros de lint
```

## 📱 Páginas Implementadas

### 🏠 Home
Landing page com hero section, benefícios, features, depoimentos e CTAs persuasivos

### ℹ️ Sobre  
História da empresa, missão, valores e equipe de desenvolvimento

### 💼 Serviços
Detalhamento de todas as funcionalidades da plataforma com process flow

### 🛠️ Ferramentas
Calculadora interativa de orçamento de casamento com:
- Input de número de convidados (com slider)
- Seleção de localização
- Cálculo automático por categorias
- Visualização com gráficos de barras
- Dicas de economia

### 📧 Contato
Formulário iframe Freshdesk + FAQ + informações de contato

### 📄 Termos de Uso
Documento completo LGPD-compliant com todas as cláusulas necessárias

### 🔒 Política de Privacidade
Política detalhada conforme LGPD com direitos do usuário claramente expostos

## 🎯 SEO e Marketing

### Meta Tags Implementadas
- ✅ Title e Description otimizados
- ✅ Open Graph (Facebook/LinkedIn)
- ✅ Twitter Cards
- ✅ Schema.org / JSON-LD
- ✅ Canonical URLs
- ✅ Robots directives

### Analytics
- ✅ Google Analytics 4 (GA4)
- ✅ Google Tag Manager (GTM)
- ✅ Event tracking configurado

### Performance
- ✅ Lazy loading de imagens
- ✅ Code splitting automático
- ✅ Minificação e otimização
- ✅ Preconnect para recursos externos
- ✅ Font loading otimizado

## 🔐 LGPD Compliance

### Implementado
- [x] Banner de consentimento de cookies
- [x] Política de Privacidade completa
- [x] Termos de Uso detalhados
- [x] Formulários com `autocomplete="off"`
- [x] Processamento local de dados
- [x] Links para exercer direitos do titular
- [x] Contato DPO disponível

## 🎨 Design System

### Cores Principais
- **Primary**: Purple/Pink gradient (#a855f7 → #ec4899)
- **Secondary**: Blue tones
- **Accent**: Warm tones

### Tipografia
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Componentes Reutilizáveis
- Navbar responsivo com menu mobile
- Footer com links organizados
- Breadcrumb para navegação contextual
- CTA 3w Online para conversão
- Cookie Banner LGPD-compliant
- Cards com glassmorphism effect

## 🚀 Deploy

### Configuração para Subdiretório

O projeto está configurado para deploy em `/planejador_casamento/`:

**vite.config.ts**
```typescript
base: '/planejador_casamento/'
```

**App.tsx**
```typescript
<BrowserRouter basename="/planejador_casamento">
```

### Arquivos para Upload
Faça upload da pasta `dist/` para o servidor em:
```
/public_html/planejador_casamento/
```

## 📝 To-Do / Melhorias Futuras

- [ ] Adicionar modo dark
- [ ] Implementar autenticação de usuário
- [ ] Salvar dados localmente (LocalStorage)
- [ ] Exportar orçamento em PDF
- [ ] Adicionar mais calculadoras (convidados, cronograma, etc.)
- [ ] Integração com APIs de fornecedores
- [ ] Sistema de notificações
- [ ] Versão PWA offline-first

## 🐛 Troubleshooting

### Erro no Build
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Rotas 404 em Produção
Certifique-se de configurar o servidor para redirecionar todas as rotas para `index.html`:

**Apache (.htaccess)**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /planejador_casamento/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /planejador_casamento/index.html [L]
</IfModule>
```

## 👥 Créditos

Desenvolvido por **[3w Online](https://www.3wonline.com.br)**  
Especialistas em desenvolvimento web personalizado

## 📄 Licença

Este projeto é de propriedade de 3w Online. Todos os direitos reservados.

---

<div align="center">

**[🌐 Website](https://app.3wonline.com/planejador_casamento)** • 
**[📧 Contato](https://www.3wonline.com.br/contato)** • 
**[💼 3w Online](https://www.3wonline.com.br)**

Feito com ❤️ e ☕ pela equipe 3w Online

</div>
