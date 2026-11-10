# 💰 Calculadora de Rendimento Salarial

Uma aplicação web moderna e responsiva para calcular rendimentos salariais em diferentes períodos, desenvolvida com **Vue.js 3** e **Tailwind CSS**.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge)

## 🚀 Funcionalidades

- ✨ **Cálculo Instantâneo**: Calcule rendimentos por hora, dia, semana, mês e ano
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **Interface Moderna**: Design limpo e intuitivo com animações suaves
- 🔒 **Privacidade Total**: Nenhum dado é armazenado ou enviado para servidores
- 📊 **Projeções Detalhadas**: Visualize ganhos em diferentes períodos
- 🖨️ **Função de Impressão**: Imprima os resultados para referência
- ⚡ **Performance Otimizada**: Carregamento rápido e experiência fluida
- 🌐 **PWA Ready**: Pode ser instalada como aplicativo

## 🛠️ Tecnologias Utilizadas

- **Vue.js 3** - Framework JavaScript reativo com Composition API
- **Vue CLI** - Ferramentas de build e desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **PostCSS** - Processamento de CSS
- **HTML5** - Estrutura semântica
- **JavaScript ES6+** - Lógica da aplicação

## 📊 Metodologia de Cálculo

### Períodos Calculados:

- **Por Hora**: Baseado em 220 horas trabalhadas por mês (8h/dia × 22 dias úteis)
- **Por Dia**: Salário mensal ÷ 30 dias
- **Por Semana**: Considerando 4,33 semanas por mês em média
- **Por Quinzena**: Salário mensal ÷ 2
- **Por Mês**: Valor base informado
- **Por Trimestre**: Salário mensal × 3
- **Por Semestre**: Salário mensal × 6
- **Por Ano**: Salário mensal × 12

## 🚀 Como Executar

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/3wsys/calculadora-salarial.git

# Entre no diretório
cd calculadora-salarial

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run serve

# Build para produção
npm run build
```

### Scripts Disponíveis

```bash
# Servidor de desenvolvimento
npm run serve

# Build de produção
npm run build

# Linting
npm run lint

# Preview da build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes Vue
│   ├── SalaryCalculator.vue    # Componente principal
│   ├── CalculatorSection.vue   # Seção da calculadora
│   ├── ResultsSection.vue      # Seção de resultados
│   ├── FeaturesSection.vue     # Seção de recursos
│   ├── AboutSection.vue        # Seção sobre
│   └── AppFooter.vue          # Rodapé
├── assets/              # Recursos estáticos
│   └── styles/
│       └── main.css           # Estilos principais
├── App.vue             # Componente raiz
└── main.js            # Ponto de entrada
```

## 🎯 Casos de Uso

- **Planejamento Financeiro Pessoal**
- **Negociação Salarial**
- **Comparação de Propostas de Trabalho**
- **Cálculo de Freelances por Hora**
- **Análise de Custos para Empresários**
- **Educação Financeira**

## 📱 Responsividade

A aplicação foi desenvolvida com **mobile-first design** e funciona perfeitamente em:

- 📱 **Smartphones** (320px+)
- 📟 **Tablets** (768px+)
- 💻 **Desktops** (1024px+)
- 🖥️ **Large Screens** (1440px+)

## 🎨 Características de UI/UX

### Design System:

- **Cores**: Paleta azul/índigo com gradientes modernos
- **Tipografia**: Inter font para melhor legibilidade
- **Espaçamento**: Sistema consistente baseado em Tailwind
- **Animações**: Transições suaves e feedback visual

### Acessibilidade:

- ♿ **Semântica HTML** adequada
- 🎯 **Foco visível** em elementos interativos
- 📱 **Touch targets** adequados para mobile
- 🔤 **Contraste** otimizado para legibilidade

## 🚀 Performance

### Otimizações Implementadas:

- ⚡ **Code Splitting** automático do Vue CLI
- 🖼️ **Lazy Loading** de componentes
- 📦 **Tree Shaking** para bundle otimizado
- 🔄 **Efficient Re-rendering** com Vue.js reactivity
- 📱 **PWA** com service worker

## 📈 SEO Otimizado

- 🏷️ **Meta Tags** completas
- 📊 **Structured Data** (JSON-LD)
- 🔗 **Open Graph** e Twitter Cards
- 🎯 **Keywords** relevantes
- 📝 **Descrições** otimizadas

## 🔒 Segurança e Privacidade

- 🛡️ **Não coleta dados** pessoais
- 🔐 **Processamento local** - tudo roda no browser
- 🚫 **Sem cookies** ou tracking
- ✅ **LGPD Compliant** por design

## 🌟 Melhorias Futuras

- [ ] **Modo Escuro** toggle
- [ ] **Múltiplas Moedas** suporte
- [ ] **Comparação** de múltiplos salários
- [ ] **Histórico** de cálculos
- [ ] **Export** para PDF/Excel
- [ ] **Calculadora de Impostos** integrada
- [ ] **Service Worker** para funcionamento offline

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Desenvolvedor

**3wSys** - Ferramentas e Soluções Web

- 🌐 Website: [www.3wsys.com](https://www.3wsys.com)
- 📧 Email: contato@3wsys.com
- 🐙 GitHub: [@3wsys](https://github.com/3wsys)

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte ou dúvidas:

- 📧 Email: contato@3wsys.com
- 🐛 Issues: [GitHub Issues](https://github.com/3wsys/calculadora-salarial/issues)

---

**Desenvolvido com ❤️ usando Vue.js 3 e Tailwind CSS**
