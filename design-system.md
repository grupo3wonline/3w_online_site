# Design System & Style Guide — 3W Online

## 1. Visão Geral e Filosofia Visual

Este Design System define os padrões visuais, diretrizes de UI/UX, tokens de design, componentes de interface e regras de acessibilidade do portal e ecossistema **3W Online** (**Grupo 3W Online**).

A identidade visual foi concebida para transmitir **alta tecnologia, autoridade digital, dinamismo e confiança**, combinando tons profundos de azul marinho (*Dark Navy*), gradientes modernos, azul e verde de alta conversão, tipografia limpa (*Inter*) e micro-interações fluidas.

### 1.1 Princípios de Design
1. **Mobile-First & Responsividade Fluida**: Experiência de uso consistente e polida desde dispositivos compactos (320px) até monitores ultrawide 4K.
2. **Hierarquia Visual Clara & Alta Conversão**: Chamadas para ação (CTAs) em posições estratégicas, títulos contrastantes e caminhos de conversão claros para WhatsApp e formulários.
3. **Equilíbrio Entre Dark Navy e Superfícies Claras**: Seções nobres de destaque (Hero, Testemunhos, Footer, CTAs) utilizam o gradiente escuro de assinatura da marca, enquanto áreas de leitura, formulários e ferramentas utilizam superfícies claras limpas de alto contraste.
4. **Feedback Visual Imediato**: Loading overlays elegantes com desfoque de fundo (`backdrop-blur`), notificações tipo toast/modal via `useAlert` (SweetAlert2) e estados de carregamento em todas as ações.
5. **Acessibilidade & Inclusão (WCAG 2.1 AA)**: Alto contraste de leitura, suporte completo a navegação por teclado (`:focus-visible`), atributos ARIA, links de salto (*skip-link*) e respeito à preferência `prefers-reduced-motion`.

---

## 2. Tokens de Design (Tailwind CSS & Variáveis)

### 2.1 Paleta de Cores da Marca

#### A. Cores Primárias — Azul Tecnológico (Brand Primary)
Utilizada na marca, botões principais, links destacados e acentuações da interface.
```javascript
primary: {
  50:  '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6', // Azul Vibrante / Destaques
  600: '#2563eb', // Azul Principal de Ação / Botão Primário
  700: '#1d4ed8', // Hover de Botões
  800: '#1e40af', // Bordas e Textos Escuros
  900: '#1e3a8a', // Azul Profundo
}
```

#### B. Cores Secundárias — Teal / Esmeralda Tecnológico
Utilizada em badges secundários, métricas e categorias de ferramentas analíticas.
```javascript
secondary: {
  50:  '#f0fdfa',
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6', // Teal Principal
  600: '#0d9488',
  700: '#0f766e',
  800: '#115e59',
  900: '#134e4a',
}
```

#### C. Cores de Destaque — Laranja / Accent
Utilizada em alertas de urgência, tags promocionais e pontos focais de conversão.
```javascript
accent: {
  50:  '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316', // Laranja Acentuado
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
}
```

#### D. Assinatura Dark Navy & Superfícies Escuras
Utilizada nos heros, rodapé, barra de navegação e seções nobres de alto impacto.
- **Hero Gradient**: `bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044]`
- **Navbar Background**: `#0f172a` (Slate 900 com sombra sutil)
- **Footer Background**: `#0a1628` (Navy Profundo)
- **Banner LGPD**: `#0f172a` com borda superior `border-gray-700`

#### E. Verde Conversão & WhatsApp
- **WhatsApp Principal**: `#22c55e` / `bg-green-500` (Hover: `bg-green-600`, Active: `bg-green-700`)
- **Botão Secundário de Vendas**: `bg-green-600` (Hover: `bg-green-700`)

---

### 2.2 Tipografia

- **Família Tipográfica Principal**: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Renderização**: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`

#### Escala Tipográfica Modular
| Token | Tamanho | Line Height | Peso Recomendado | Aplicação Principal |
|---|---|---|---|---|
| `text-xs` | `0.75rem` (12px) | `1rem` | 500 / 600 | Badges, tags, legendas auxiliares, breadcrumbs |
| `text-sm` | `0.875rem` (14px) | `1.25rem` | 400 / 500 | Labels de formulários, botões secundários, cards pequenos |
| `text-base` | `1rem` (16px) | `1.5rem` | 400 / 500 | Parágrafos gerais, inputs, corpo de texto |
| `text-lg` | `1.125rem` (18px) | `1.75rem` | 500 / 600 | Subtítulos de cards, leads de seção |
| `text-xl` | `1.25rem` (20px) | `1.75rem` | 600 / 700 | Títulos de serviços e cards principais |
| `text-2xl` | `1.5rem` (24px) | `2rem` | 700 | Títulos de seções (mobile), métricas |
| `text-3xl` | `1.875rem` (30px) | `2.25rem` | 700 / 800 | Títulos de seções (desktop), heros secundários |
| `text-4xl` | `2.25rem` (36px) | `2.5rem` | 800 | Títulos de heros em tablet, números de destaque |
| `text-5xl` | `3rem` (48px) | `1.15` | 800 / 900 | Hero principal em desktop |
| `text-6xl` | `3.75rem` (60px) | `1.1` | 900 | Hero principal em telas grandes (large desktop) |

---

### 2.3 Raios de Borda e Sombras (Elevations)

#### Raios de Borda
- `rounded-lg` (`0.5rem` / 8px): Botões, campos de formulário, inputs, badges.
- `rounded-xl` (`0.75rem` / 12px): Cards de serviços, cards de portfólio, modais, containers de ferramentas.
- `rounded-full` (`9999px`): Botão flutuante do WhatsApp, avatars, tags pill.

#### Sombras
- `shadow-sm`: Cards padrão e inputs em estado normal.
- `shadow-md`: Cards com leve destaque e containers de seções.
- `shadow-lg`: Barra de navegação e botão do WhatsApp.
- `shadow-xl`: Cards de serviço e portfólio em estado `:hover`.
- `shadow-2xl`: Banner de cookies e modais de alto nível.

---

## 3. Catálogo de Componentes do Design System

### 3.1 Botões

```html
<!-- 1. Botão Primário (Ação Principal) -->
<button class="btn-primary">
  <Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" />
  Solicitar Orçamento
</button>

<!-- 2. Botão Secundário / Conversão Direta (WhatsApp / Vendas) -->
<a href="https://wa.me/5541996924829" class="btn-secondary">
  <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" />
  Falar no WhatsApp
</a>

<!-- 3. Botão Outline (Secundário em fundos escuros ou claros) -->
<button class="btn-outline">
  Ver Todos os Serviços
</button>

<!-- 4. Botão Ghost (Navegação Suave) -->
<button class="btn-ghost">
  Saiba Mais
</button>

<!-- 5. Botões de Ação em Ferramentas Digitais -->
<button class="btn btn-success">Gerar Dados</button>
<button class="btn btn-danger">Limpar Campos</button>
```

### 3.2 Cards & Superfícies

```html
<!-- Card de Serviço com Efeito de Elevação no Hover -->
<div class="service-card">
  <div class="w-12 h-12 rounded-full bg-blue-100 text-primary-600 flex items-center justify-center mb-4">
    <Icon icon="mdi:laptop" class="w-6 h-6" />
  </div>
  <h3 class="text-xl font-bold text-gray-900 mb-2">Criação de Sites</h3>
  <p class="text-sm text-gray-600 mb-4">Desenvolvimento de sites modernos, responsivos e otimizados para o Google.</p>
  <RouterLink to="/servicos/criacao-de-sites" class="text-primary-600 font-semibold text-sm hover:underline inline-flex items-center">
    Conhecer serviço <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
  </RouterLink>
</div>

<!-- Card de Testemunho em Seção Escura (Dark Navy) -->
<div class="testimonial-card">
  <p class="text-sm text-blue-100 italic mb-4">"A 3W Online transformou nossa presença digital. Aumentamos as vendas em 300%!"</p>
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-primary-500/30 flex items-center justify-center font-bold text-white">JS</div>
    <div>
      <div class="font-semibold text-white text-sm">João Silva</div>
      <div class="text-xs text-blue-300">Silva & Associados</div>
    </div>
  </div>
</div>
```

### 3.3 Formulários & Inputs

```html
<!-- Grupo de Campo de Formulário Padronizado -->
<div class="space-y-1.5">
  <label for="nome" class="form-label">Nome Completo</label>
  <input
    id="nome"
    type="text"
    placeholder="Ex: Carlos Eduardo"
    class="form-input"
  />
  <span class="form-hint">Informe seu nome ou razão social.</span>
  <span class="form-error">O campo nome é obrigatório.</span>
</div>

<!-- Textarea Padronizada -->
<div class="space-y-1.5">
  <label for="mensagem" class="form-label">Mensagem / Descrição do Projeto</label>
  <textarea
    id="mensagem"
    rows="4"
    placeholder="Conte-nos detalhes do seu projeto..."
    class="form-textarea"
  ></textarea>
</div>
```

### 3.4 Elementos Globais de Estrutura

#### Hero com Gradiente Dark Navy
```html
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb">
      <RouterLink to="/">Início</RouterLink>
      <span>/</span>
      <span>Serviços</span>
    </nav>
    <h1 class="page-hero-title">Soluções Sob Medida para o Seu Negócio</h1>
    <p class="page-hero-subtitle max-w-2xl">
      Estratégias de marketing e tecnologia projetadas para acelerar seus resultados.
    </p>
  </div>
</section>
```

#### Botão Flutuante do WhatsApp
```html
<a
  href="https://wa.me/5541996924829"
  target="_blank"
  rel="noopener noreferrer"
  class="whatsapp-float"
  aria-label="Atendimento via WhatsApp"
>
  <Icon icon="mdi:whatsapp" class="w-7 h-7 text-white" />
</a>
```

#### Overlay Global de Carregamento
```html
<div class="loading-overlay" role="alert" aria-live="polite">
  <div class="flex flex-col items-center gap-4">
    <div class="loading-spinner"></div>
    <p class="text-white font-medium text-sm">Carregando...</p>
  </div>
</div>
```

---

## 4. Padrões de Layout, Grid & Seções

### 4.1 Estrutura de Seção Padronizada
```html
<section class="section-padding bg-white">
  <div class="container">
    <!-- Cabeçalho de Seção Centralizado -->
    <div class="text-center mb-10 md:mb-14">
      <span class="section-label">Portfólio & Resultados</span>
      <h2 class="section-title">Cases de Sucesso Recentes</h2>
      <p class="section-subtitle max-w-2xl mx-auto">
        Conheça alguns dos projetos desenvolvidos pela equipe da 3W Online.
      </p>
    </div>

    <!-- Grid Responsivo (1 col mobile, 2 col tablet, 3 col desktop) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Itens do Grid -->
    </div>
  </div>
</section>
```

---

## 5. Micro-animações, Transições & Estados

### 5.1 Keyframes Definidos no Sistema
- **`bounceGentle`**: Animação sutil de pulso vertical para o botão flutuante de WhatsApp, convidando o usuário ao contato sem poluição visual.
- **`fadeIn`**: Entrada suave de opacidade em 0.6s.
- **`slideUp`**: Entrada com deslocamento vertical de 20px para cima com opacidade.
- **`spinSlow`**: Rotação suave contínua em 3s para ícones de processamento e engrenagens.

### 5.2 Transições de Rota no Vue Router
No componente raiz `App.vue`:
```vue
<RouterView v-slot="{ Component }">
  <Transition name="page" mode="out-in">
    <component :is="Component" />
  </Transition>
</RouterView>
```
Com as classes CSS de suporte:
```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
```

---

## 6. Diretrizes de Acessibilidade & Boas Práticas (A11y)

1. **Foco Visível Global**:
   - Todo elemento interativo focado via teclado recebe `outline: 2px solid #3b82f6; outline-offset: 2px;`.
2. **Skip Link para Navegação por Teclado**:
   - Inclusão no topo do `App.vue`: `<a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>`.
3. **Respeito a `prefers-reduced-motion`**:
   - Todas as animações são neutralizadas para usuários que possuem sensibilidade motora ou vestibular ativada no sistema operacional.
4. **Regras de Impressão (`@media print`)**:
   - Ocultação automática de `.whatsapp-float`, `.navbar`, `.footer`, `.cookie-banner` e `.loading-overlay` durante impressões de relatórios e ferramentas.