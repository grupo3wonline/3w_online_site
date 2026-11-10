<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  path: '/',
  description:
    'Calculadora de Indicadores Financeiros: analise a saúde financeira de empresas com EBITDA, ROE, ROA, P/L, EV/EBITDA e mais. Gratuita, rápida e segura.',
  keywords:
    'calculadora financeira, indicadores financeiros, análise financeira, EBITDA, ROE, ROA, valuation',
})

const benefits = [
  {
    icon: 'mdi:flash',
    title: 'Rápido e gratuito',
    text: 'Resultados instantâneos, sem cadastro e sem custo.',
  },
  {
    icon: 'mdi:shield-lock-outline',
    title: '100% no navegador',
    text: 'Seus dados financeiros nunca saem do seu dispositivo.',
  },
  {
    icon: 'mdi:chart-line',
    title: '10 indicadores',
    text: 'Os principais indicadores do mercado em um só lugar.',
  },
  {
    icon: 'mdi:cellphone-link',
    title: 'Responsivo',
    text: 'Funciona bem no celular, tablet e desktop.',
  },
]

// Estatísticas de prova social.
const stats = [
  { value: '+2.500', label: 'análises realizadas' },
  { value: '10', label: 'indicadores por cálculo' },
  { value: '4,9/5', label: 'avaliação dos usuários' },
  { value: '100%', label: 'gratuito e sem cadastro' },
]

const indicators = [
  'EBITDA',
  'Valuation',
  'P/L',
  'EV/EBITDA',
  'ROE',
  'ROA',
  'Margem de Lucro',
  'Dividend Yield',
  'Liquidez Corrente',
  'Liquidez Seca',
]

// Guia de interpretação (dicas/orientações sobre cada indicador).
const guide = [
  {
    icon: 'mdi:cash-multiple',
    name: 'EBITDA',
    tip: 'Mede a geração de caixa operacional. Quanto maior e mais consistente, melhor a operação.',
    example: 'EBIT R$ 800 mil + Depreciação R$ 120 mil = EBITDA R$ 920 mil.',
  },
  {
    icon: 'mdi:trending-up',
    name: 'ROE',
    tip: 'Retorno sobre o patrimônio. Acima de 15% costuma ser considerado saudável.',
    example: 'Lucro R$ 550 mil ÷ Patrimônio R$ 2,2 mi = 25% de ROE.',
  },
  {
    icon: 'mdi:scale-balance',
    name: 'P/L',
    tip: 'Anos teóricos para recuperar o investimento. Abaixo de 15 tende a indicar preço atrativo.',
    example: 'Valor de mercado R$ 8 mi ÷ Lucro R$ 550 mil ≈ 14,5x.',
  },
  {
    icon: 'mdi:water',
    name: 'Liquidez Corrente',
    tip: 'Capacidade de pagar dívidas de curto prazo. Acima de 1,5 é um bom sinal.',
    example: 'Ativo circulante R$ 1,8 mi ÷ Passivo circulante R$ 900 mil = 2,0.',
  },
]

const steps = [
  {
    icon: 'mdi:file-document-edit-outline',
    title: 'Preencha os dados',
    text: 'Insira valores do Balanço Patrimonial e da DRE. Não sabe por onde começar? Use o botão "Exemplo".',
  },
  {
    icon: 'mdi:calculator',
    title: 'Calcule',
    text: 'Clique em calcular e veja os 10 indicadores na hora, com status de Bom, Alerta ou Atenção.',
  },
  {
    icon: 'mdi:chart-box-outline',
    title: 'Analise e exporte',
    text: 'Confira o gráfico comparativo, interprete os resultados e imprima o relatório.',
  },
]

// Prova social — depoimentos.
const testimonials = [
  {
    name: 'Marina Alves',
    role: 'Controller · Indústria',
    text: 'Uso antes de toda reunião de diretoria. Em minutos tenho o panorama financeiro pronto.',
    rating: 5,
  },
  {
    name: 'Rafael Souza',
    role: 'Analista de Investimentos',
    text: 'Rápida e confiável para uma triagem inicial de empresas. Virou parte da minha rotina.',
    rating: 5,
  },
  {
    name: 'Juliana Prado',
    role: 'Empreendedora · Varejo',
    text: 'Finalmente entendi a liquidez e o ROE do meu negócio sem precisar de planilhas complexas.',
    rating: 5,
  },
]

// FAQ com acordeão.
const faqs = [
  {
    q: 'A calculadora é realmente gratuita?',
    a: 'Sim. É 100% gratuita, sem cadastro e sem limite de uso. Você pode calcular quantas vezes quiser.',
  },
  {
    q: 'Meus dados financeiros ficam salvos em algum servidor?',
    a: 'Não. Todo o cálculo acontece no seu navegador. Nenhum dado financeiro é enviado ou armazenado em servidores.',
  },
  {
    q: 'Preciso ser especialista em finanças para usar?',
    a: 'Não. Cada campo tem uma dica explicativa, e os resultados vêm com status e descrição para facilitar a interpretação.',
  },
  {
    q: 'Onde encontro os valores para preencher?',
    a: 'No Balanço Patrimonial e na DRE (Demonstração do Resultado do Exercício) da empresa. Use o botão "Exemplo" para ver um preenchimento de referência.',
  },
]

const openFaq = ref<number | null>(0)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}
</script>

<template>
  <!-- BARRA DE URGÊNCIA -->
  <div class="bg-accent-500 text-white">
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 px-4 py-2 text-center text-sm font-medium sm:flex-row sm:gap-2"
    >
      <Icon icon="mdi:flash" class="text-base" />
      <span>Acesso liberado por tempo limitado — comece agora, é grátis e sem cadastro.</span>
    </div>
  </div>

  <!-- HERO -->
  <section class="relative overflow-hidden bg-brand-gradient text-white">
    <!-- Grid decorativo + blobs -->
    <div
      class="absolute inset-0 bg-grid-pattern [background-size:44px_44px]"
      aria-hidden="true"
    ></div>
    <div
      class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent-400/30 blur-3xl animate-blob"
      aria-hidden="true"
    ></div>
    <div
      class="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-primary-300/30 blur-3xl animate-blob [animation-delay:3s]"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div v-motion-fade-visible class="mx-auto max-w-3xl text-center">
        <span
          class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
        >
          <Icon icon="mdi:star" class="text-yellow-300" /> Avaliada em 4,9/5 por +2.500 usuários
        </span>
        <h1 class="text-4xl font-extrabold leading-[1.1] sm:text-6xl">
          A saúde financeira da sua empresa,
          <span class="bg-gradient-to-r from-white to-accent-200 bg-clip-text text-transparent">
            clara em segundos
          </span>
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
          Calcule EBITDA, ROE, ROA, P/L, EV/EBITDA, margem de lucro, dividend yield e liquidez.
          Simples, seguro e direto ao ponto — sem planilhas complicadas.
        </p>
        <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <RouterLink
            :to="{ name: 'calculator' }"
            class="btn bg-white text-primary-700 shadow-soft hover:-translate-y-0.5 hover:bg-ink-50 focus:ring-white/50"
          >
            <Icon icon="mdi:calculator" /> Calcular agora, é grátis
          </RouterLink>
          <a
            href="#contato"
            class="btn border border-white/30 bg-white/10 text-white backdrop-blur hover:-translate-y-0.5 hover:bg-white/20 focus:ring-white/40"
          >
            <Icon icon="mdi:message-text-outline" /> Falar com a 3W Online
          </a>
        </div>
        <p class="mt-5 flex flex-wrap items-center justify-center gap-x-2 text-xs text-white/70">
          <Icon icon="mdi:shield-check" /> Sem cadastro · Sem cartão · Dados 100% no seu navegador
        </p>
      </div>
    </div>

    <!-- Onda de transição -->
    <div class="relative">
      <svg
        class="block w-full text-ink-50 dark:text-ink-950"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="currentColor" d="M0,32 C360,64 1080,0 1440,32 L1440,60 L0,60 Z" />
      </svg>
    </div>
  </section>

  <!-- ESTATÍSTICAS / PROVA SOCIAL -->
  <section class="mx-auto -mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="surface grid grid-cols-2 gap-6 p-6 sm:p-8 lg:grid-cols-4">
      <div v-for="s in stats" :key="s.label" class="text-center">
        <p class="text-3xl font-extrabold text-primary-600 dark:text-primary-400">{{ s.value }}</p>
        <p class="mt-1 text-xs text-ink-500 dark:text-ink-400 sm:text-sm">{{ s.label }}</p>
      </div>
    </div>
  </section>

  <!-- BENEFÍCIOS -->
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-label="Benefícios">
    <div class="mx-auto mb-12 max-w-2xl text-center">
      <p class="eyebrow mb-2">Vantagens</p>
      <h2 class="text-3xl font-bold text-ink-900 dark:text-white">
        Por que usar a nossa calculadora
      </h2>
      <p class="mt-3 text-ink-500 dark:text-ink-400">
        Feita para dar clareza sobre o seu negócio, sem burocracia.
      </p>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="b in benefits"
        :key="b.title"
        v-motion-slide-visible-bottom
        class="surface surface-hover p-6 text-center"
      >
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"
        >
          <Icon :icon="b.icon" class="text-2xl" />
        </div>
        <h3 class="font-bold text-ink-900 dark:text-white">{{ b.title }}</h3>
        <p class="mt-1.5 text-sm text-ink-500 dark:text-ink-400">{{ b.text }}</p>
      </div>
    </div>
  </section>

  <!-- FUNCIONALIDADES / INDICADORES -->
  <section class="bg-white py-16 dark:bg-ink-900/40 lg:py-20" aria-label="Funcionalidades">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow mb-2">Completo</p>
        <h2 class="text-3xl font-bold text-ink-900 dark:text-white">
          10 indicadores em uma única tela
        </h2>
        <p class="mt-3 text-ink-500 dark:text-ink-400">
          Tudo o que você precisa para uma análise financeira completa e profissional.
        </p>
      </div>
      <div class="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
        <span
          v-for="ind in indicators"
          :key="ind"
          class="rounded-full border border-primary-200/70 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 transition-transform hover:-translate-y-0.5 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-300"
        >
          {{ ind }}
        </span>
      </div>
    </div>
  </section>

  <!-- GUIA DE INTERPRETAÇÃO (DICAS + EXEMPLOS) -->
  <section
    class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    aria-label="Como interpretar"
  >
    <div class="mx-auto mb-12 max-w-2xl text-center">
      <p class="eyebrow mb-2">Aprenda na prática</p>
      <h2 class="text-3xl font-bold text-ink-900 dark:text-white">
        Entenda o que cada número significa
      </h2>
      <p class="mt-3 text-ink-500 dark:text-ink-400">
        Dicas rápidas de interpretação com exemplos práticos para você tirar conclusões com
        segurança.
      </p>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div v-for="g in guide" :key="g.name" class="surface surface-hover p-6">
        <div class="mb-3 flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300"
          >
            <Icon :icon="g.icon" class="text-xl" />
          </div>
          <h3 class="font-bold text-ink-900 dark:text-white">{{ g.name }}</h3>
        </div>
        <p class="text-sm text-ink-600 dark:text-ink-300">{{ g.tip }}</p>
        <p
          class="mt-3 rounded-xl bg-ink-50 px-3 py-2 text-xs text-ink-500 dark:bg-ink-900/50 dark:text-ink-400"
        >
          <Icon icon="mdi:lightbulb-on-outline" class="mr-1 inline text-amber-500" />
          <strong>Exemplo:</strong> {{ g.example }}
        </p>
      </div>
    </div>
  </section>

  <!-- COMO USAR -->
  <section class="bg-white py-16 dark:bg-ink-900/40 lg:py-20" aria-label="Como usar">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow mb-2">Simples assim</p>
        <h2 class="text-3xl font-bold text-ink-900 dark:text-white">Como funciona</h2>
        <p class="mt-3 text-ink-500 dark:text-ink-400">Três passos simples para o resultado.</p>
      </div>
      <div class="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          class="surface surface-hover relative p-6"
        >
          <div class="mb-4 flex items-center gap-3">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient font-bold text-white shadow-glow"
              >{{ i + 1 }}</span
            >
            <Icon :icon="step.icon" class="text-2xl text-primary-500" />
          </div>
          <h3 class="font-bold text-ink-900 dark:text-white">{{ step.title }}</h3>
          <p class="mt-1.5 text-sm text-ink-500 dark:text-ink-400">{{ step.text }}</p>
        </div>
      </div>
      <div class="mt-12 text-center">
        <RouterLink :to="{ name: 'calculator' }" class="btn-primary">
          <Icon icon="mdi:rocket-launch-outline" /> Começar agora
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- DEPOIMENTOS -->
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-label="Depoimentos">
    <div class="mx-auto mb-12 max-w-2xl text-center">
      <p class="eyebrow mb-2">Prova social</p>
      <h2 class="text-3xl font-bold text-ink-900 dark:text-white">Quem usa, recomenda</h2>
      <p class="mt-3 text-ink-500 dark:text-ink-400">
        Profissionais e empreendedores já confiam na ferramenta no dia a dia.
      </p>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <figure
        v-for="t in testimonials"
        :key="t.name"
        class="surface surface-hover flex flex-col p-6"
      >
        <Icon
          icon="mdi:format-quote-open"
          class="text-3xl text-primary-200 dark:text-primary-500/40"
        />
        <blockquote class="-mt-2 flex-1 text-sm text-ink-600 dark:text-ink-300">
          {{ t.text }}
        </blockquote>
        <div class="mt-4 flex text-amber-400" :aria-label="`${t.rating} de 5 estrelas`">
          <Icon v-for="n in t.rating" :key="n" icon="mdi:star" />
        </div>
        <figcaption class="mt-3 border-t border-ink-100 pt-3 dark:border-ink-700/60">
          <p class="font-bold text-ink-900 dark:text-white">{{ t.name }}</p>
          <p class="text-xs text-ink-500 dark:text-ink-400">{{ t.role }}</p>
        </figcaption>
      </figure>
    </div>
  </section>

  <!-- FAQ -->
  <section class="bg-white py-16 dark:bg-ink-900/40 lg:py-20" aria-label="Perguntas frequentes">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto mb-12 max-w-2xl text-center">
        <p class="eyebrow mb-2">Dúvidas</p>
        <h2 class="text-3xl font-bold text-ink-900 dark:text-white">Perguntas frequentes</h2>
        <p class="mt-3 text-ink-500 dark:text-ink-400">
          Tudo o que você precisa saber antes de começar.
        </p>
      </div>
      <div class="space-y-3">
        <div v-for="(faq, i) in faqs" :key="i" class="surface overflow-hidden">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            :aria-expanded="openFaq === i"
            @click="toggleFaq(i)"
          >
            <span class="font-semibold text-ink-900 dark:text-white">{{ faq.q }}</span>
            <Icon
              icon="mdi:chevron-down"
              class="flex-shrink-0 text-xl text-ink-400 transition-transform duration-200"
              :class="{ 'rotate-180': openFaq === i }"
            />
          </button>
          <div v-show="openFaq === i" class="px-5 pb-4 text-sm text-ink-600 dark:text-ink-300">
            {{ faq.a }}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA FINAL COM ESCASSEZ / URGÊNCIA -->
  <section
    class="relative overflow-hidden bg-brand-gradient py-20 text-white"
    aria-label="Chamada final"
  >
    <div
      class="absolute -right-20 -top-16 h-72 w-72 rounded-full bg-accent-400/25 blur-3xl animate-blob"
      aria-hidden="true"
    ></div>
    <div class="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <span
        class="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-1.5 text-sm font-semibold shadow-soft"
      >
        <Icon icon="mdi:clock-fast" /> Não deixe para depois
      </span>
      <h2 class="text-3xl font-bold sm:text-4xl">
        A decisão financeira certa começa com dados claros
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-white/85">
        Enquanto você espera, seu concorrente já está analisando. Faça sua análise agora — leva
        menos de 2 minutos e não custa nada.
      </p>
      <div class="mt-8">
        <RouterLink
          :to="{ name: 'calculator' }"
          class="btn bg-white text-primary-700 shadow-soft hover:-translate-y-0.5 hover:bg-ink-50 focus:ring-white/50"
        >
          <Icon icon="mdi:rocket-launch-outline" /> Fazer minha análise gratuita
        </RouterLink>
      </div>
      <p class="mt-4 text-xs text-white/70">
        Sem compromisso · Você pode refazer quantas vezes quiser.
      </p>
    </div>
  </section>

  <!-- CTA EMPRESA DESENVOLVEDORA -->
  <section class="bg-ink-950 py-16 text-white lg:py-20" aria-label="Grupo 3W Online">
    <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <p class="eyebrow mb-2 !text-accent-400">Grupo 3W Online</p>
      <h2 class="text-3xl font-bold">Precisa de um site ou sistema sob medida?</h2>
      <p class="mx-auto mt-4 max-w-2xl text-white/80">
        O <strong>Grupo 3W Online</strong> desenvolve sites e sistemas personalizados sob demanda —
        do conceito ao deploy. Transforme sua ideia em uma solução digital robusta, segura e
        escalável, feita para o seu negócio.
      </p>
      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href="https://www.3wonline.com.br"
          target="_blank"
          rel="noopener noreferrer"
          class="btn bg-white text-ink-900 shadow-soft hover:-translate-y-0.5 hover:bg-ink-100 focus:ring-white/50"
        >
          <Icon icon="mdi:web" /> Conheça a 3W Online
        </a>
        <a
          href="https://wa.me/5541996924829"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-accent"
        >
          <Icon icon="mdi:whatsapp" /> Solicitar orçamento
        </a>
      </div>
    </div>
  </section>

  <!-- CONTATO -->
  <section
    id="contato"
    class="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    aria-label="Contato"
  >
    <div class="mx-auto max-w-2xl text-center">
      <p class="eyebrow mb-2">Contato</p>
      <h2 class="text-3xl font-bold text-ink-900 dark:text-white">Fale com a gente</h2>
      <p class="mt-3 text-ink-500 dark:text-ink-400">
        Tem uma demanda de site ou sistema? A equipe do Grupo 3W Online está pronta para atender
        você — resposta rápida no horário comercial.
      </p>
    </div>

    <div class="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
      <a
        href="https://wa.me/5541996924829"
        target="_blank"
        rel="noopener noreferrer"
        class="surface surface-hover flex items-center gap-4 p-6"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300"
        >
          <Icon icon="mdi:whatsapp" class="text-2xl" />
        </div>
        <div>
          <p class="text-sm text-ink-500 dark:text-ink-400">WhatsApp</p>
          <p class="font-bold text-ink-900 dark:text-white">(41) 99692-4829</p>
        </div>
      </a>

      <a
        href="mailto:contato@3wonline.com.br"
        class="surface surface-hover flex items-center gap-4 p-6"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"
        >
          <Icon icon="mdi:email-outline" class="text-2xl" />
        </div>
        <div>
          <p class="text-sm text-ink-500 dark:text-ink-400">E-mail</p>
          <p class="font-bold text-ink-900 dark:text-white">contato@3wonline.com.br</p>
        </div>
      </a>
    </div>

    <p class="mx-auto mt-8 max-w-2xl text-center text-sm text-ink-500 dark:text-ink-400">
      <strong>Grupo 3W Online</strong> — sites e sistemas personalizados sob demanda. Visite
      <a
        href="https://www.3wonline.com.br"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary-600 underline"
        >www.3wonline.com.br</a
      >.
    </p>
  </section>
</template>
