# ColorCraft - Criador de Paletas de Cores Profissional

![ColorCraft Logo](./public/og-image.jpg)

## 📚 Sobre o Projeto

ColorCraft é uma ferramenta online **100% gratuita** para criação de paletas de cores harmônicas baseadas em teoria das cores profissional. Desenvolvida com tecnologias modernas e design premium.

### ✨ Principais Características

- 🎨 **Gerador de Paletas Harmônicas** - Complementares, Análogas, Tríades, Tetrádicas
- 🔄 **Conversor de Cores** - HEX, RGB, HSL, CMYK
- ⚡ **Ultra Rápido** - Processamento local no navegador
- 📱 **Mobile First** - Totalmente responsivo
- 🔒 **100% Seguro** - Seus dados nunca saem do seu navegador
- 🌐 **SEO Otimizado** - Google Analytics, GTM, Schema.org
- 🛡️ **Conforme LGPD** - Política de Privacidade e Termos de Uso

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem
- **Vite** - Build tool de nova geração
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Roteamento SPA
- **SweetAlert2** - Alertas bonitos
- **Font Awesome** - Ícones
- **Radix UI** - Componentes acessíveis

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/3wonline/color_craft.git

# Entre na pasta
cd color_craft

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 🗂️ Estrutura do Projeto

```
color_craft/
├── public/              # Arquivos estáticos
│   ├── favicon.svg
│   ├── og-image.jpg
│   └── manifest.json
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── CookieBanner.tsx
│   │   ├── CTASection.tsx
│   │   ├── Layout.tsx
│   │   └── ui/          # Componentes UI (Radix UI)
│   ├── pages/           # Páginas da aplicação
│   │   ├── Home.tsx
│   │   ├── Sobre.tsx
│   │   ├── Servicos.tsx
│   │   ├── Ferramentas.tsx
│   │   ├── Contato.tsx
│   │   ├── Termos.tsx
│   │   ├── Privacidade.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos globais
├── .env                 # Variáveis de ambiente
├── vite.config.ts       # Configuração do Vite
├── tailwind.config.ts   # Configuração do Tailwind
├── tsconfig.json        # Configuração do TypeScript
└── package.json         # Dependências e scripts
```

## ⚙️ Configuração

### Base Path

O projeto está configurado para ser hospedado em `/color_craft/`. Para alterar:

1. **vite.config.ts**:
```typescript
export default defineConfig({
  base: '/seu-caminho/',
  // ...
});
```

2. **package.json**:
```json
{
  "homepage": "/seu-caminho/",
  // ...
}
```

3. **App.tsx**:
```typescript
<BrowserRouter basename="/seu-caminho">
```

### Variáveis de Ambiente

Edite o arquivo `.env` com suas configurações:

```env
VITE_APP_NAME=ColorCraft
VITE_BASE_URL=/color_craft/
VITE_COMPANY_URL=https://www.3wonline.com.br
VITE_GA_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXX
```

## 📄 Páginas

- **Home** - Landing page com apresentação da ferramenta
- **Sobre** - Informações sobre o projeto e tecnologias
- **Serviços** - Serviços da 3w Online
- **Ferramentas** - Ferramenta principal de cores
- **Contato** - Formulário de contato (Freshdesk)
- **Termos de Uso** - Termos legais
- **Política de Privacidade** - LGPD compliant

## 🎨 Design System

O projeto utiliza Tailwind CSS com cores customizadas:

- **Primary**: Violet (600)
- **Secondary**: Purple (600)
- **Accent**: Pink/Yellow
- **Neutral**: Gray scale

## 📊 SEO e Analytics

- **Google Analytics 4** - Análise de tráfego
- **Google Tag Manager** - Gestão de tags
- **Meta Tags** - Open Graph, Twitter Cards
- **Schema.org** - Structured Data
- **Sitemap** - Indexação otimizada

## 🛡️ LGPD

O projeto está em conformidade com a Lei Geral de Proteção de Dados:

- ✅ Banner de cookies
- ✅ Política de Privacidade
- ✅ Termos de Uso
- ✅ Processamento local de dados
- ✅ Direitos do titular

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma Branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova feature'`)
4. Push para a Branch (`git push origin feature/NovaFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto é desenvolvido e mantido pela **3w Online**.

## 📞 Contato

**3w Online** - Desenvolvimento de Sites e Sistemas

- 🌐 Website: [www.3wonline.com.br](https://www.3wonline.com.br)
- 📧 Email: contato@3wonline.com.br
- 📍 São Paulo, SP - Brasil

## 🙏 Agradecimentos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Font Awesome](https://fontawesome.com/)
- [SweetAlert2](https://sweetalert2.github.io/)

---

**Desenvolvido com ❤️ pela [3w Online](https://www.3wonline.com.br)**

⭐ Se este projeto te ajudou, considere dar uma estrela!
