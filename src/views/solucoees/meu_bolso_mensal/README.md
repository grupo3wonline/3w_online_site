# 💰 Meu Bolso Mensal

> Controle Financeiro Pessoal Gratuito, Rápido e Profissional

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.11-cyan)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Sobre o Projeto

**Meu Bolso Mensal** é uma aplicação web moderna e gratuita para controle financeiro pessoal. Desenvolvida com foco em **privacidade**, **performance** e **usabilidade**, permite que você gerencie suas finanças de forma simples e eficiente.

### ✨ Principais Características

- ✅ **100% Gratuito** - Sem custos, sem planos pagos, sem pegadinhas
- 🔒 **Totalmente Privado** - Dados processados localmente no navegador
- 📊 **12 Calculadoras** - Ferramentas trabalhistas e financeiras
- 📱 **Mobile First** - Funciona perfeitamente em qualquer dispositivo
- 🚀 **Ultra Rápido** - Performance otimizada com Vite
- 🎨 **Design Moderno** - Interface intuitiva e profissional
- ♿ **Acessível** - Seguindo padrões de acessibilidade
- 🔍 **SEO Otimizado** - Google Analytics 4 e Google Tag Manager integrados

## 🛠️ Tecnologias Utilizadas

### Frontend Framework
- **React 18.3.1** - Biblioteca JavaScript para interfaces
- **TypeScript 5.5.3** - Superset tipado do JavaScript
- **Vite 5.4.1** - Build tool ultra rápida

### Estilização
- **TailwindCSS 3.4.11** - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis e não estilizados
- **Shadcn/ui** - Componentes reutilizáveis
- **Font Awesome 6.5.1** - Biblioteca de ícones

### Ferramentas e Utilitários
- **React Router DOM 6.26.2** - Roteamento
- **React Hook Form 7.53.0** - Gerenciamento de formulários
- **Zod 3.23.8** - Validação de esquemas
- **Recharts 2.12.7** - Gráficos e visualizações
- **SweetAlert2 11.26.17** - Alertas personalizados
- **date-fns 3.6.0** - Manipulação de datas

### Analytics e SEO
- **Google Analytics 4** (GA4)
- **Google Tag Manager** (GTM)
- **Meta Tags SEO** completas
- **Structured Data** (Schema.org)

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ ou Bun
- npm, yarn ou pnpm

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <repository-url>
cd meu_bolso_mensal
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:8080/meu_bolso_mensal/
```

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Build de produção
npm run preview      # Preview do build

# Qualidade de Código
npm run lint         # Executa ESLint
```

## 📁 Estrutura do Projeto

```
meu_bolso_mensal/
├── public/              # Arquivos estáticos
│   ├── favicon.svg
│   ├── manifest.json
│   └── og-image.jpg
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── calculators/ # Calculadoras financeiras
│   │   ├── layout/      # Header, Footer, CookieBanner
│   │   ├── shared/      # Componentes compartilhados
│   │   └── ui/          # Componentes Shadcn/ui
│   ├── hooks/           # React hooks personalizados
│   ├── lib/             # Utilitários e helpers
│   ├── pages/           # Páginas da aplicação
│   │   ├── HomePage.tsx
│   │   ├── SobrePage.tsx
│   │   ├── ServicosPage.tsx
│   │   ├── FerramentasPage.tsx
│   │   ├── ContatoPage.tsx
│   │   ├── TermosPage.tsx
│   │   └── PrivacidadePage.tsx
│   ├── App.tsx          # Componente raiz
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos globais
├── .env                 # Variáveis de ambiente
├── index.html           # HTML base
├── vite.config.ts       # Configuração Vite
├── tailwind.config.ts   # Configuração Tailwind
├── tsconfig.json        # Configuração TypeScript
└── package.json         # Dependências
```

## 🎯 Funcionalidades

### Calculadoras Disponíveis

1. **Trabalhistas**
   - Cálculo de Salário
   - Férias
   - 13º Salário
   - Rescisão
   - Seguro Desemprego
   - FGTS
   - PLR
   - Benefícios

2. **Financeiras**
   - Rendimentos
   - Investimentos (Juros Compostos)
   - Imposto de Renda

3. **Previdência**
   - Aposentadoria

### Páginas

- **Home** - Landing page com apresentação e CTAs persuasivos
- **Sobre** - História, missão, valores e estatísticas
- **Serviços** - Apresentação dos serviços da 3W Online
- **Ferramentas** - Grade de calculadoras com filtros
- **Contato** - Formulário Freshdesk integrado
- **Termos de Uso** - Documento legal obrigatório
- **Política de Privacidade** - Conformidade com LGPD

## 🔐 Segurança e Privacidade (LGPD)

- ✅ Dados financeiros processados **localmente**
- ✅ Nunca enviamos dados sensíveis para servidores
- ✅ Política de Privacidade completa
- ✅ Termos de Uso detalhados
- ✅ Banner de cookies com consentimento
- ✅ Direitos do titular garantidos
- ✅ Conformidade total com LGPD (Lei 13.709/2018)

## 🎨 Design System

### Cores Principais
- **Primária**: Verde Esmeralda (`#10b981`)
- **Secundária**: Teal (`#14b8a6`)
- **Gradientes**: emerald-600 → teal-600

### Tipografia
- **Display**: Inter (headings)
- **Corpo**: Inter (body text)
- **Pesos**: 300, 400, 500, 600, 700, 800

### Ícones
- Font Awesome 6.5.1 (solid, brands)

## 📱 Responsividade

Breakpoints do TailwindCSS:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🌐 Deploy

### Configuração do Base Path

O projeto está configurado para deploy em subdiretório `/meu_bolso_mensal/`:

```javascript
// vite.config.ts
base: '/meu_bolso_mensal/'

// App.tsx
<BrowserRouter basename="/meu_bolso_mensal">
```

### Build de Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados em `dist/`.

## 📊 Analytics

### Google Analytics 4
- Tracking ID: `G-J06THXX0MW`
- Events customizados configurados
- Conversões e objetivos rastreados

### Google Tag Manager
- Container ID: `GTM-WVMJV7G6`
- Tags para GA4 configuradas
- Triggers para eventos importantes

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Autor

**Grupo 3W Online**
- Website: [www.3wonline.com.br](https://www.3wonline.com.br)
- Email: contato@3wonline.com.br

## 📄 Licença

Este projeto é de propriedade do Grupo 3W Online.

## 🙏 Agradecimentos

- Comunidade React
- Equipe TailwindCSS
- Shadcn/ui
- Todos os usuários que confiam no Meu Bolso Mensal

---

<div align="center">
  
**Desenvolvido com ❤️ pelo Grupo 3W Online**

[Website](https://www.3wonline.com.br) • [Suporte](mailto:contato@3wonline.com.br)

</div>
