# 🖼️ Marca D'água Pro

> Aplicação web moderna e profissional para adicionar marca d'água em imagens - 100% gratuita e segura

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-green.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)](https://vitejs.dev/)

## 📖 Sobre o Projeto

O **Marca D'água Pro** é uma ferramenta profissional desenvolvida para proteger suas imagens de forma rápida, segura e totalmente gratuita. Todo o processamento é feito localmente no navegador, garantindo privacidade absoluta.

### 🎯 Principais Diferenciais

- **🆓 100% Gratuito** - Sem limites, sem cadastro, sem assinaturas
- **🔒 Privacidade Total** - Processamento offline no navegador
- **⚡ Rápido e Eficiente** - Preview em tempo real
- **🎨 Profissional** - Controle total sobre aparência
- **📱 Responsivo** - Funciona em todos os dispositivos
- **♿ Acessível** - Desenvolvido seguindo padrões de acessibilidade

## 🚀 Tecnologias

- **Vue.js 3** - Framework progressivo (Composition API)
- **Vite** - Build tool moderna e ultrarrápida
- **Vue Router** - Roteamento SPA
- **Tailwind CSS** - Framework CSS utilitário
- **@vueuse/core** - Coleção de composables essenciais
- **@vueuse/head** - Gerenciamento de meta tags para SEO

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/marca-dagua-pro.git

# Entrar no diretório
cd marca-dagua-pro

# Instalar dependências
npm install
```

## 🛠️ Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# O projeto estará disponível em http://localhost:5173
```

## 🏗️ Build de Produção

```bash
# Gerar build otimizado
npm run build

# Visualizar build localmente
npm run preview
```

## ✨ Recursos

### Funcionalidades Principais

- ✅ **Marca d'água de Texto** - Adicione texto personalizado
- ✅ **Marca d'água com Logo** - Upload de imagem/logo
- ✅ **6 Posições Predefinidas** - Cantos e centro
- ✅ **Controle de Cor** - Seletor de cores completo
- ✅ **Ajuste de Opacidade** - Controle fino da transparência
- ✅ **Preview em Tempo Real** - Veja antes de aplicar
- ✅ **Processamento em Lote** - Múltiplas imagens simultâneas
- ✅ **Download Individual/Lote** - ZIP com todas as imagens

### Características Técnicas

- ✅ **Processamento Offline** - Nenhum dado enviado para servidor
- ✅ **Dark Mode** - Tema claro/escuro/automático
- ✅ **Design Responsivo** - Mobile-first approach
- ✅ **SEO Otimizado** - Meta tags dinâmicas e sitemap
- ✅ **Performance** - Code splitting e lazy loading
- ✅ **PWA Ready** - Pode ser instalado como app
- ✅ **Conformidade LGPD** - Privacidade por design

## 🔍 SEO & Performance

### Otimizações Implementadas

#### Meta Tags Dinâmicas

- Uso de `@vueuse/head` para gerenciamento de meta tags
- Meta tags específicas para cada página
- Open Graph e Twitter Cards configurados
- Structured Data (JSON-LD) para rich snippets

#### Arquivos de SEO

- **sitemap.xml** - Mapeamento completo do site
- **robots.txt** - Instruções otimizadas para crawlers
- **Canonical URLs** - URLs canônicas definidas

#### Performance

- Code splitting automático (Vite)
- Lazy loading de componentes
- Imagens otimizadas
- CSS minificado e tree-shaking
- Build otimizado para produção

## 📁 Estrutura do Projeto

```
marca-dagua-pro/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── App/          # Componentes do editor
│   │   ├── Landing/      # Componentes da landing page
│   │   ├── Legal/        # Termos e privacidade
│   │   └── Shared/       # Componentes compartilhados
│   ├── composables/
│   │   ├── useCanvas.js  # Lógica de canvas
│   │   ├── useSeo.js     # SEO dinâmico
│   │   ├── useTheme.js   # Gerenciamento de tema
│   │   └── useWatermark.js # Lógica de marca d'água
│   ├── router/
│   │   └── index.js      # Configuração de rotas
│   ├── views/            # Páginas da aplicação
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🌐 Páginas

- **/** - Landing page com informações do produto
- **/app** - Editor de marca d'água
- **/sobre** - Informações sobre o projeto
- **/contato** - Formulário de contato e FAQ
- **/termos-de-uso** - Termos de uso do serviço
- **/politica-de-privacidade** - Política de privacidade (LGPD)

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Suporte a múltiplas fontes
- [ ] Marca d'água diagonal
- [ ] Marca d'água em padrão (tile)
- [ ] Templates prontos
- [ ] Histórico de configurações
- [ ] Modo em lote avançado
- [ ] API pública
- [ ] Integração com serviços de nuvem

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvido por

**3W Online**

- Website: [www.3wonline.com.br](https://www.3wonline.com.br)
- Email: contato@3wonline.com.br
- GitHub: [@hotwyl](https://github.com/hotwyl)

---

<div align="center">
  <p>Feito com ❤️ e Vue.js</p>
  <p>Se este projeto foi útil, considere dar uma ⭐</p>
</div>
