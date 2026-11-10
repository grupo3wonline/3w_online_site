# Seu Peso - Calculadora de Saúde Corporal

Uma aplicação web moderna e responsiva para calcular e monitorar indicadores de saúde corporal, desenvolvida com Vue.js 3 e Tailwind CSS.

## 🚀 Recursos

- **Cálculo de IMC**: Índice de Massa Corporal com classificação segundo a OMS
- **Metabolismo Basal**: Estimativa do gasto energético em repouso
- **Calorias Diárias**: Necessidades calóricas baseadas no nível de atividade
- **Peso Ideal**: Calculado usando a fórmula de Devine
- **Gordura Corporal**: Estimativa aproximada do percentual de gordura
- **Necessidades Nutricionais**: Água, proteínas, carboidratos e gorduras
- **Gasto Calórico**: Estimativa para diferentes tipos de exercícios

## 🛠️ Tecnologias

- **Vue.js 3** - Framework JavaScript reativo
- **Vue Router 4** - Roteamento para SPA
- **Tailwind CSS** - Framework CSS utilitário
- **Composition API** - API moderna do Vue.js para melhor organização do código
- **PostCSS** - Processamento de CSS
- **ESLint** - Linting de código

## 📱 Funcionalidades

### Landing Page

- Design responsivo e moderno
- Seções informativas sobre recursos
- Call-to-action otimizado
- Avisos de responsabilidade médica

### Calculadora

- Formulário intuitivo e validado
- Resultados em tempo real
- Interface responsiva
- Modal informativo sobre limitações

### SEO e Acessibilidade

- Meta tags otimizadas
- Open Graph para redes sociais
- URLs amigáveis
- Design acessível

## 🚦 Como Executar

### Desenvolvimento

```bash
npm install
npm run serve
```

### Produção

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## 📊 Cálculos Utilizados

### IMC (Índice de Massa Corporal)

```
IMC = peso(kg) / altura(m)²
```

### Metabolismo Basal (Equação de Mifflin-St Jeor)

**Homens:**

```
MB = 88.362 + (13.397 × peso) + (4.799 × altura_cm) - (5.677 × idade)
```

**Mulheres:**

```
MB = 447.593 + (9.247 × peso) + (3.098 × altura_cm) - (4.330 × idade)
```

### Peso Ideal (Fórmula de Devine)

**Homens:**

```
Peso Ideal = 50 + 2.3 × (altura_polegadas - 60)
```

**Mulheres:**

```
Peso Ideal = 45.5 + 2.3 × (altura_polegadas - 60)
```

### Necessidades Nutricionais

- **Água**: 35ml por kg de peso corporal
- **Proteínas**: 1.2-1.8g por kg (baseado no nível de atividade)
- **Carboidratos**: 55% das calorias totais
- **Gorduras**: 25% das calorias totais

## ⚠️ Importante

Esta aplicação fornece estimativas baseadas em fórmulas padrão e **NÃO substitui** o acompanhamento profissional. Sempre consulte:

- Médicos
- Nutricionistas
- Educadores físicos
- Outros profissionais de saúde

Especialmente importante para:

- Atletas com alta massa muscular
- Idosos
- Crianças e adolescentes
- Pessoas com condições médicas específicas
- Mulheres grávidas ou lactantes

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── composables/        # Lógica reativa (Composition API)
├── router/            # Configuração de rotas
├── views/             # Páginas da aplicação
├── style.css          # Estilos globais com Tailwind
└── main.js            # Ponto de entrada da aplicação
```

## 🎨 Design System

### Cores Principais

- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Tipografia

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Componentes

- Cards responsivos
- Formulários acessíveis
- Botões com estados hover/focus
- Modal informativo
- Navegação sticky

## 📈 Performance

- **Build Otimizado**: CSS e JS minificados
- **Lazy Loading**: Carregamento sob demanda
- **Tree Shaking**: Remoção de código não utilizado
- **Cache Strategy**: Headers apropriados para cache

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Tailwind CSS breakpoints padrão
- **Touch Friendly**: Elementos adequados para toque
- **Cross Browser**: Compatível com navegadores modernos

## 🔧 Configuração Personalizada

### Vue Config

- Output otimizado para produção
- Source maps desabilitados em produção
- Meta tags dinâmicas

### Tailwind Config

- Cores customizadas
- Animações personalizadas
- Configurações de tema estendidas

## 📄 Licença

© 2025 Ferramentas WYL. Todos os direitos reservados.

---

**Versão**: 1.0.0  
**Atualizado**: Agosto 2025
