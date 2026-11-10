# 💰 InvestSim - Simulador de Investimentos Profissional

> **Ferramenta profissional e 100% gratuita para simulação de investimentos com juros compostos, aportes mensais e análise detalhada.**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Características Principais

- ✨ **100% Gratuito** - Sem cadastro, sem limites, sem custos ocultos
- 📊 **Cálculos Precisos** - Algoritmos validados por especialistas financeiros
- 📱 **Mobile First** - Responsivo e otimizado para todos os dispositivos
- 🎨 **Design Moderno** - Interface limpa, profissional e intuitiva
- ⚡ **Ultra Rápido** - Resultados instantâneos em menos de 3 segundos
- 🔒 **Seguro** - Processamento local, dados protegidos pela LGPD
- 🌙 **Dark Mode** - Modo escuro para conforto visual
- 📈 **Gráficos Interativos** - Visualização clara da evolução patrimonial
- 📄 **Export PDF** - Salve e compartilhe suas simulações
- 🎓 **Educativo** - Aprenda sobre investimentos na prática

---

## 🚀 Demo Online

🔗 **[Acesse o InvestSim →](https://app.3wonline.com.br/investsim/)**

---

## ✨ Funcionalidades

### 🎯 Landing Page Otimizada

- Design responsivo com Tailwind CSS
- Hero section impactante com gatilhos de persuasão
- Copywriting profissional (Gatilhos de Cialdini)
- Prova social (+15.000 usuários)
- SEO completo (Open Graph, Schema.org, GTM, GA4)
- Mobile First e acessível

### 📊 Simulador Avançado

- Cálculos precisos de juros compostos
- Aportes mensais configuráveis
- Interface intuitiva e validações em tempo real
- Gráficos interativos com Chart.js
- Export em PDF profissional
- Modo claro e escuro
- 100% responsivo

### 🔐 Compliance LGPD

- Política de Privacidade detalhada
- Termos de Uso completos
- Cookie Consent funcional
- Processamento local de dados
- Conformidade Lei 13.709/2018

### 🛠️ Recursos Técnicos

- Vue.js 3 com Composition API
- Vue Router 4 para navegação SPA
- Tailwind CSS 3 para estilização
- Vite 5 para build ultra-rápido
- Chart.js 4 para gráficos
- SweetAlert2 para alertas elegantes
- Font Awesome 6 para ícones
- Google Analytics 4 + Tag Manager

## 🚀 Como Executar

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/investsim.git

# Entre no diretório
cd investsim

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Visualizar build localmente
npm run preview
```

## 📱 Responsividade

A aplicação foi desenvolvida com **mobile-first design** e é totalmente responsiva:

- **Mobile** (320px+): Layout otimizado para telas pequenas
- **Tablet** (768px+): Interface adaptada para tablets
- **Desktop** (1024px+): Layout completo com sidebar
- **Large Desktop** (1280px+): Aproveitamento total da tela

## 🎨 Design System

### Cores Principais

- **Primary**: Azul (#3b82f6) - Botões e links principais
- **Success**: Verde (#22c55e) - Resultados positivos
- **Warning**: Amarelo (#f59e0b) - Alertas e dicas
- **Error**: Vermelho (#ef4444) - Erros e validações

### Tipografia

- **Font Family**: Inter (Google Fonts)
- **Tamanhos**: Sistema de escalas do Tailwind
- **Pesos**: 300, 400, 500, 600, 700, 800

## 🔍 SEO e Performance

### SEO Otimizado

- **Meta tags** apropriadas
- **Open Graph** para redes sociais
- **Twitter Cards** para Twitter
- **JSON-LD** structured data
- **Sitemap** automático
- **URLs amigáveis**

### Performance

- **Code splitting** automático
- **Lazy loading** de componentes
- **Assets otimizados**
- **Bundle size** minimizado
- **Tree shaking** automático

## 📊 Funcionalidades do Simulador

### Entrada de Dados

- **Montante Inicial**: Valor inicial do investimento
- **Tempo de Investimento**: Período em anos
- **Aporte Mensal**: Contribuição mensal

### Cálculos

- **Montante Acumulado**: Valor total após o período
- **Valor Investido**: Total de aportes realizados
- **Lucro Obtido**: Rendimento do investimento

### Validações

- **Campos obrigatórios**: Validação de preenchimento
- **Valores positivos**: Apenas números > 0
- **Formato numérico**: Aceita decimais
- **Feedback visual**: Mensagens de erro claras

## 🛠️ Estrutura do Projeto

```
investsim/
├── public/                 # Arquivos estáticos
├── src/
│   ├── assets/            # CSS e recursos
│   ├── components/        # Componentes Vue
│   │   ├── Navigation.vue # Navegação principal
│   │   ├── Footer.vue     # Rodapé
│   │   └── InfoModal.vue  # Modal de informações
│   ├── views/             # Páginas da aplicação
│   │   ├── Home.vue       # Landing page
│   │   └── Simulator.vue  # Simulador
│   ├── App.vue            # Componente raiz
│   └── main.js            # Ponto de entrada
├── index.html             # Template HTML
├── package.json           # Dependências
├── tailwind.config.js     # Configuração Tailwind
├── vite.config.js         # Configuração Vite
└── README.md              # Este arquivo
```

## 🌟 Melhorias Futuras

- [ ] **Gráficos interativos** com Chart.js
- [ ] **Comparação de cenários** lado a lado
- [ ] **Histórico de simulações** local
- [ ] **Exportação para PDF** dos resultados
- [ ] **PWA** com cache offline
- [ ] **Calculadoras adicionais** (aposentadoria, financiamento)
- [ ] **Integração com APIs** de investimentos reais
- [ ] **Temas dark/light** mode

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Hotwyl** - [Grupo 3w Online](https://www.3wonline.com.br/)

- Website: [3wonline.com.br](https://www.3wonline.com.br/)
- Suporte: [Contato](https://www.3wonline.com.br/contact/)

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**
