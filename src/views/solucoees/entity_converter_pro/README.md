# 🚀 Entity Converter Pro

> Conversor profissional de caracteres especiais para HTML Entities. Rápido, seguro e em conformidade com LGPD.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Vue](https://img.shields.io/badge/Vue.js-3.5-brightgreen.svg)
![Vite](https://img.shields.io/badge/Vite-7.2-purple.svg)

## ✨ Características

- ⚡ **Ultra Rápido**: Conversão instantânea em menos de 1 segundo
- 🔒 **100% Seguro**: Processamento client-side, seus dados nunca saem do dispositivo
- 🎨 **Interface Moderna**: Design responsivo e profissional com Tailwind CSS
- 🌙 **Dark Mode**: Suporte completo para tema escuro com persistência
- 📱 **Mobile First**: Otimizado para todos os dispositivos
- 🛡️ **LGPD Compliant**: Em conformidade total com a Lei Geral de Proteção de Dados
- ♾️ **Uso Ilimitado**: Sem restrições, sem cadastro, 100% gratuito
- 🔍 **SEO Otimizado**: Meta tags, structured data e Open Graph completos

## 🛠️ Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utility-first
- **Font Awesome** - Biblioteca de ícones
- **SweetAlert2** - Alertas bonitos e customizáveis
- **Playwright** - Testes E2E automatizados
- **Vitest** - Framework de testes unitários
- **Google Analytics 4** - Análise de dados
- **Google Tag Manager** - Gerenciamento de tags

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/3wonline/entity_converter_pro.git

# Entre no diretório
cd entity_converter_pro

# Instale as dependências
npm install
```

## 🚀 Uso

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# O app estará disponível em http://localhost:3000/entity_converter_pro/
```

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Preview do build
npm run preview
```

### Testes

```bash
# Rodar todos os testes
npm run test

# Testes E2E com Playwright
npm run test:e2e

# Testes com interface visual
npm run test:ui

# Cobertura de testes
npm run test:coverage
```

## 📁 Estrutura do Projeto

```
entity_converter_pro/
├── public/                # Assets estáticos
├── src/
│   ├── assets/           # Imagens e arquivos
│   ├── components/       # Componentes Vue reutilizáveis
│   │   ├── HeaderSection.vue
│   │   ├── FooterSection.vue
│   │   ├── ConverterTool.vue
│   │   ├── CookieBanner.vue
│   │   └── ...
│   ├── composables/      # Composables Vue
│   │   └── useDarkMode.js
│   ├── data/             # Dados estáticos
│   │   └── characters.js
│   ├── pages/            # Páginas da aplicação
│   │   ├── HomePage.vue
│   │   ├── SobrePage.vue
│   │   ├── ContatoPage.vue
│   │   ├── TermosPage.vue
│   │   └── PrivacidadePage.vue
│   ├── router/           # Configuração de rotas
│   │   └── index.js
│   ├── App.vue           # Componente raiz
│   ├── main.js           # Ponto de entrada
│   └── style.css         # Estilos globais
├── tests/                # Testes automatizados
│   ├── e2e/             # Testes End-to-End
│   │   ├── app.spec.js
│   │   ├── security.spec.js
│   │   └── performance.spec.js
│   └── unit/            # Testes unitários
├── index.html            # HTML principal com SEO
├── vite.config.js        # Configuração do Vite
├── tailwind.config.js    # Configuração do Tailwind
├── playwright.config.js  # Configuração do Playwright
└── package.json          # Dependências e scripts
```

## 🎯 Funcionalidades Principais

### Conversor de Caracteres

- Converte caracteres especiais (á, é, í, ó, ú, ç, etc.) para HTML Entities
- Suporte a mais de 100 caracteres especiais
- Conversão bidirecional (caracteres ↔ entities)
- Proteção contra XSS
- Validação de entrada

### Dark Mode

- Toggle intuitivo no header
- Persistência de preferência no localStorage
- Detecção automática de preferência do sistema
- Transições suaves entre temas

### LGPD & Privacidade

- Banner de cookies com consentimento explícito
- Termos de Uso completos
- Política de Privacidade detalhada
- Processamento 100% client-side
- Nenhum dado enviado para servidores

### Testes Automatizados

- ✅ Testes de navegação
- ✅ Testes de segurança (XSS, SQL Injection, CSRF)
- ✅ Testes de performance
- ✅ Testes de acessibilidade
- ✅ Testes de responsividade
- ✅ Testes de conformidade LGPD

## 🔒 Segurança

- **XSS Protection**: Sanitização completa de entrada
- **Client-Side Processing**: Nenhum dado enviado para servidores
- **HTTPS Only**: Aplicação deve ser servida apenas via HTTPS em produção
- **Content Security Policy**: Headers de segurança configurados
- **Input Validation**: Validação rigorosa de todos os inputs
- **LGPD Compliance**: Conformidade total com legislação brasileira

## 📊 SEO & Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **Core Web Vitals**: Otimizado para LCP, FID e CLS
- **Meta Tags Completas**: Title, description, keywords, author
- **Open Graph**: Otimizado para redes sociais
- **Twitter Cards**: Preview otimizado para Twitter
- **Structured Data**: Schema.org implementado
- **Sitemap**: Gerado automaticamente
- **Lazy Loading**: Carregamento otimizado de componentes
- **Code Splitting**: Bundle otimizado por rota

## 🌐 Deploy

O projeto está configurado para deploy em qualquer servidor web estático:

```bash
# Build para produção
npm run build

# Os arquivos estarão em /dist
# Deploy para:
# - Vercel
# - Netlify
# - GitHub Pages
# - Apache/Nginx
```

### Configuração do Base Path

O projeto usa `/entity_converter_pro/` como base path. Para alterar:

1. Edite `vite.config.js`: `base: '/seu-path/'`
2. Edite `vue.config.js`: `publicPath: '/seu-path/'`
3. Edite `router/index.js`: `createWebHistory('/seu-path/')`
4. Edite `package.json`: `homepage: '/seu-path/'`

## 👨‍💻 Desenvolvedor

**Sistema desenvolvido por hotwyl - willfrombrasil**

Desenvolvido por [Grupo 3W Online](https://www.3wonline.com.br)

- 🌐 Website: https://www.3wonline.com.br
- 📧 Contato: https://3wonline.freshdesk.com
- 💼 LinkedIn: https://www.linkedin.com/company/3wonline

Especialistas em desenvolvimento de sites e sistemas personalizados sob demanda.

## 📄 Licença

MIT License - © 2024 Entity Converter Pro - Grupo 3W Online

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, siga estas diretrizes:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato:

- 📧 Formulário de contato: https://3wonline.freshdesk.com
- 🌐 Website: https://www.3wonline.com.br
- 📱 WhatsApp: Disponível no site

## 🎉 Agradecimentos

- Vue.js Team pela incrível framework
- Vite Team pelo build tool ultra-rápido
- Tailwind CSS pelo framework CSS fantástico
- Toda comunidade open-source

---

Feito com ❤️ por [Grupo 3W Online](https://www.3wonline.com.br) | **hotwyl - willfrombrasil**
