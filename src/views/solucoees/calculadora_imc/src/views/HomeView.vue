<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { useMotionPresets } from '@/composables/useMotionPresets'

const { fadeUp, zoomIn } = useMotionPresets()

// Contato (unificado na home)
const whatsappNumero = '5541996924829'
const whatsappLabel = '(41) 99692-4829'
const email = 'contato@3wonline.com.br'
const whatsappLink = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(
  'Olá! Vim pela Calculadora de IMC e gostaria de falar sobre um projeto.',
)}`

// Gatilho de urgência: contagem regressiva diária (reinicia todo dia à meia-noite)
const tempoRestante = ref('')
let timer: ReturnType<typeof setInterval> | undefined

function atualizarContador() {
  const agora = new Date()
  const fimDoDia = new Date(agora)
  fimDoDia.setHours(23, 59, 59, 999)
  const diff = fimDoDia.getTime() - agora.getTime()
  const h = Math.floor(diff / 3_600_000)
  const m = Math.floor((diff % 3_600_000) / 60_000)
  const s = Math.floor((diff % 60_000) / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  tempoRestante.value = `${pad(h)}:${pad(m)}:${pad(s)}`
}

onMounted(() => {
  atualizarContador()
  timer = setInterval(atualizarContador, 1000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const features = [
  {
    icon: 'lucide:calculator',
    title: 'Cálculo de IMC Preciso',
    description: 'Descubra seu Índice de Massa Corporal com fórmulas cientificamente comprovadas.',
  },
  {
    icon: 'lucide:zap',
    title: 'Taxa Metabólica Basal',
    description: 'Conheça quantas calorias seu corpo queima em repouso (TMB) e em atividade (GET).',
  },
  {
    icon: 'lucide:droplets',
    title: 'Hidratação Personalizada',
    description: 'Saiba exatamente quanta água beber por dia, em litros, copos e garrafas.',
  },
  {
    icon: 'lucide:target',
    title: 'Metas de Macronutrientes',
    description: 'Proteínas, carboidratos e gorduras calculados de acordo com o seu perfil.',
  },
  {
    icon: 'lucide:file-text',
    title: 'Relatório PDF Completo',
    description: 'Baixe todas as suas metas em um documento profissional para levar ao seu médico.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Privacidade Garantida',
    description: 'Seus dados ficam apenas no seu dispositivo. Nada é enviado para servidores.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Insira seus dados',
    description: 'Altura, peso, idade, sexo e nível de atividade. Exemplo: 1.75 m, 70 kg, 30 anos.',
  },
  {
    number: '02',
    title: 'Calcule suas metas',
    description: 'Clique em "Calcular Metas" e veja os resultados na hora, sem cadastro.',
  },
  {
    number: '03',
    title: 'Analise e baixe',
    description: 'Explore os detalhes e salve seu relatório completo em PDF para consultar depois.',
  },
]

const beneficios = [
  'IMC, TMB, GET e percentual de gordura em um só lugar',
  'Metas de água e macronutrientes personalizadas',
  'Gráfico de evolução e histórico salvos no seu dispositivo',
  'Relatório em PDF para levar ao médico ou nutricionista',
  'Sem cadastro, sem anúncios invasivos, sem custo',
]

const remedios = [
  { icon: 'lucide:droplets', title: 'Água', description: 'Hidratação adequada é fundamental para todas as funções corporais.' },
  { icon: 'lucide:wind', title: 'Ar Puro', description: 'Respirar ar limpo melhora a oxigenação e a vitalidade.' },
  { icon: 'lucide:sun', title: 'Luz Solar', description: 'Exposição solar moderada fornece vitamina D essencial.' },
  { icon: 'lucide:moon', title: 'Descanso', description: 'Sono reparador é crucial para recuperação e bem-estar.' },
  { icon: 'lucide:scale', title: 'Temperança', description: 'Moderação em todas as coisas promove equilíbrio.' },
  { icon: 'lucide:apple', title: 'Nutrição', description: 'Alimentação balanceada fornece energia e nutrientes.' },
  { icon: 'lucide:dumbbell', title: 'Exercício', description: 'Atividade regular fortalece corpo e mente.' },
  { icon: 'lucide:smile', title: 'Confiança', description: 'Paz interior e propósito elevam a qualidade de vida.' },
]

const depoimentos = [
  { name: 'Maria S.', text: 'Finalmente uma ferramenta completa e fácil de usar!' },
  { name: 'João P.', text: 'Me ajudou muito a entender minhas necessidades diárias.' },
  { name: 'Ana L.', text: 'O relatório em PDF é muito profissional. Recomendo!' },
]

const dicas = [
  'Meça seu peso sempre no mesmo horário, de preferência em jejum, para resultados consistentes.',
  'O IMC é um indicador geral; atletas com muita massa muscular podem ter valores altos sem excesso de gordura.',
  'Combine os resultados com boa hidratação e sono: pequenas mudanças diárias geram grandes efeitos.',
]

const faq = [
  {
    q: 'A calculadora é realmente gratuita?',
    a: 'Sim, 100% gratuita e sem cadastro. Você pode usar quantas vezes quiser, sem custo.',
  },
  {
    q: 'Meus dados ficam salvos onde?',
    a: 'Apenas no seu próprio dispositivo (armazenamento local do navegador). Nada é enviado para servidores.',
  },
  {
    q: 'O resultado substitui uma consulta médica?',
    a: 'Não. É uma ferramenta informativa. Sempre consulte um profissional de saúde antes de mudanças na dieta ou exercícios.',
  },
  {
    q: 'Preciso instalar algo?',
    a: 'Não. Funciona direto no navegador, no computador ou no celular.',
  },
]
</script>

<template>
  <div class="bg-background">
    <!-- Banner de urgência -->
    <div class="bg-secondary text-secondary-foreground">
      <div class="container flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-sm font-medium">
        <span class="inline-flex items-center gap-1">
          <Icon icon="lucide:flame" class="h-4 w-4" />
          Acesso gratuito por tempo limitado
        </span>
        <span class="hidden sm:inline">•</span>
        <span class="inline-flex items-center gap-1">
          <Icon icon="lucide:timer" class="h-4 w-4" />
          Oferta encerra em <strong class="tabular-nums">{{ tempoRestante }}</strong>
        </span>
      </div>
    </div>

    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-hero opacity-90" aria-hidden="true" />
      <div
        class="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />
      <div class="container relative py-16 sm:py-20 md:py-28">
        <div class="mx-auto max-w-4xl text-center">
          <div v-motion="fadeUp(0)">
            <BaseBadge variant="glass" class="mb-6">
              <Icon icon="lucide:star" class="h-3 w-3" /> Ferramenta usada por milhares de pessoas
            </BaseBadge>
          </div>
          <h1
            v-motion="fadeUp(80)"
            class="mb-6 text-balance text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Descubra Seu Potencial de Saúde em
            <span class="underline decoration-secondary decoration-4 underline-offset-4">Segundos</span>
          </h1>
          <p
            v-motion="fadeUp(160)"
            class="mx-auto mb-8 max-w-2xl text-pretty text-base text-primary-foreground/90 sm:text-lg md:text-xl"
          >
            Calcule seu IMC, descubra suas necessidades calóricas e receba um plano nutricional
            personalizado. <strong>Grátis, rápido e 100% privado.</strong>
          </p>
          <div v-motion="fadeUp(240)" class="flex flex-col justify-center gap-3 sm:flex-row">
            <BaseButton to="/calculadora" variant="light" size="lg">
              <Icon icon="lucide:calculator" class="h-5 w-5" />
              Calcular Agora - É Grátis
              <Icon icon="lucide:arrow-right" class="h-5 w-5" />
            </BaseButton>
          </div>
          <p
            v-motion="fadeUp(320)"
            class="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-primary-foreground/70"
          >
            <span class="inline-flex items-center gap-1">
              <Icon icon="lucide:check-circle" class="h-4 w-4" /> Sem cadastro necessário
            </span>
            <span class="hidden sm:inline">•</span>
            <span class="inline-flex items-center gap-1">
              <Icon icon="lucide:check-circle" class="h-4 w-4" /> Resultados imediatos
            </span>
          </p>
        </div>
      </div>
    </section>

    <!-- Prova social -->
    <section class="border-b border-border bg-card/50">
      <div class="container py-8">
        <div class="flex flex-wrap items-center justify-center gap-6 text-center sm:gap-10">
          <div class="flex items-center gap-2">
            <Icon icon="lucide:users" class="h-6 w-6 text-primary" />
            <span class="text-2xl font-bold">10.000+</span>
            <span class="text-muted-foreground">Usuários</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="lucide:calculator" class="h-6 w-6 text-primary" />
            <span class="text-2xl font-bold">50.000+</span>
            <span class="text-muted-foreground">Cálculos</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="lucide:star" class="h-6 w-6 text-primary" />
            <span class="text-2xl font-bold">4.9/5</span>
            <span class="text-muted-foreground">Avaliação</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Oferta / valor (gatilho de valor + escassez) -->
    <section class="py-16 md:py-24">
      <div class="container">
        <BaseCard v-motion="zoomIn()" class="mx-auto max-w-3xl text-center">
          <BaseBadge variant="success" class="mb-4">
            <Icon icon="lucide:gift" class="h-3 w-3" /> Tudo incluído, sem pegadinha
          </BaseBadge>
          <h2 class="mb-2 text-3xl font-bold md:text-4xl">
            Um plano completo de saúde por
            <span class="text-gradient">R$ 0,00</span>
          </h2>
          <p class="mx-auto mb-6 max-w-xl text-muted-foreground">
            O que muitos apps cobram mensalidade para oferecer, aqui é gratuito e sem cadastro.
            <strong>Aproveite enquanto o acesso livre está disponível.</strong>
          </p>
          <ul class="mx-auto mb-8 grid max-w-xl grid-cols-1 gap-2 text-left sm:grid-cols-2">
            <li
              v-for="b in beneficios"
              :key="b"
              class="flex items-start gap-2 text-sm"
            >
              <Icon icon="lucide:check-circle" class="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>{{ b }}</span>
            </li>
          </ul>
          <BaseButton to="/calculadora" size="lg">
            <Icon icon="lucide:unlock" class="h-5 w-5" />
            Quero meu plano gratuito agora
          </BaseButton>
          <p class="mt-3 text-xs text-muted-foreground">
            <Icon icon="lucide:timer" class="mr-1 inline h-3 w-3" />
            Acesso gratuito encerra em {{ tempoRestante }}
          </p>
        </BaseCard>
      </div>
    </section>

    <!-- Funcionalidades -->
    <section class="bg-mesh py-16 md:py-24">
      <div class="container">
        <div v-motion="fadeUp()" class="mb-12 text-center">
          <BaseBadge class="mb-4">Funcionalidades</BaseBadge>
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">Tudo que Você Precisa em Uma Ferramenta</h2>
          <p class="mx-auto max-w-2xl text-muted-foreground">
            Desenvolvida para fornecer análises precisas e orientações práticas para a sua jornada
            de saúde.
          </p>
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BaseCard
            v-for="(feature, i) in features"
            :key="feature.title"
            v-motion="fadeUp(i * 80)"
            hover
            class="group"
          >
            <div
              class="mb-4 inline-flex rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20"
            >
              <Icon :icon="feature.icon" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="mb-2 text-xl font-semibold">{{ feature.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ feature.description }}</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Como funciona -->
    <section class="bg-card/30 py-16 md:py-24">
      <div class="container">
        <div v-motion="fadeUp()" class="mb-12 text-center">
          <BaseBadge class="mb-4">Como Funciona</BaseBadge>
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">Resultados em 3 Passos Simples</h2>
          <p class="mx-auto max-w-2xl text-muted-foreground">
            Menos de 2 minutos para descobrir seu plano de saúde personalizado.
            <strong>Sem complicação.</strong>
          </p>
        </div>
        <div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          <div
            v-for="(step, i) in steps"
            :key="step.number"
            v-motion="fadeUp(i * 120)"
            class="text-center"
          >
            <div
              class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-2xl font-bold text-primary-foreground shadow-glow"
            >
              {{ step.number }}
            </div>
            <h3 class="mb-2 text-xl font-semibold">{{ step.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ step.description }}</p>
          </div>
        </div>
        <div class="mt-12 text-center">
          <BaseButton to="/calculadora" size="lg">
            <Icon icon="lucide:clock" class="h-5 w-5" />
            Começar em 2 Minutos
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Dicas -->
    <section class="py-16 md:py-24">
      <div class="container">
        <div v-motion="fadeUp()" class="mb-12 text-center">
          <BaseBadge class="mb-4">Dicas de Uso</BaseBadge>
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">Aproveite Melhor a Ferramenta</h2>
          <p class="mx-auto max-w-2xl text-muted-foreground">
            Orientações rápidas para interpretar seus resultados com mais segurança.
          </p>
        </div>
        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <BaseCard v-for="(dica, i) in dicas" :key="i" v-motion="fadeUp(i * 80)" hover>
            <div class="mb-3 inline-flex rounded-lg bg-info/10 p-3">
              <Icon icon="lucide:lightbulb" class="h-6 w-6 text-info" />
            </div>
            <p class="text-sm leading-relaxed text-muted-foreground">{{ dica }}</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- 8 Remédios Naturais -->
    <section class="bg-mesh py-16 md:py-24">
      <div class="container">
        <div v-motion="fadeUp()" class="mb-12 text-center">
          <BaseBadge class="mb-4">Conhecimento</BaseBadge>
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">8 Remédios Naturais para uma Vida Saudável</h2>
          <p class="mx-auto max-w-2xl text-muted-foreground">
            Princípios comprovados que promovem saúde integral, incluídos gratuitamente nos seus
            resultados.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <BaseCard
            v-for="(remedio, i) in remedios"
            :key="remedio.title"
            v-motion="zoomIn((i % 4) * 60)"
            hover
            class="text-center"
          >
            <div class="mb-3 flex justify-center">
              <div class="rounded-full bg-primary/10 p-2">
                <Icon :icon="remedio.icon" class="h-5 w-5 text-primary" />
              </div>
            </div>
            <h3 class="mb-1 text-sm font-semibold">{{ remedio.title }}</h3>
            <p class="text-xs leading-relaxed text-muted-foreground">{{ remedio.description }}</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Depoimentos -->
    <section class="bg-card/30 py-16 md:py-24">
      <div class="container">
        <div v-motion="fadeUp()" class="mb-12 text-center">
          <BaseBadge class="mb-4">Depoimentos</BaseBadge>
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">O Que Nossos Usuários Dizem</h2>
        </div>
        <div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <BaseCard
            v-for="(d, i) in depoimentos"
            :key="d.name"
            v-motion="fadeUp(i * 100)"
            :gradient="false"
          >
            <div class="mb-3 flex">
              <Icon v-for="n in 5" :key="n" icon="lucide:star" class="h-4 w-4 text-warning" />
            </div>
            <p class="mb-4 italic text-muted-foreground">"{{ d.text }}"</p>
            <p class="text-sm font-semibold">{{ d.name }}</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Garantia / confiança -->
    <section class="py-16">
      <div class="container">
        <div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          <BaseCard v-motion="fadeUp(0)" class="text-center">
            <Icon icon="lucide:shield-check" class="mx-auto mb-2 h-8 w-8 text-success" />
            <h3 class="font-semibold">100% Privado</h3>
            <p class="text-sm text-muted-foreground">Seus dados nunca saem do seu dispositivo.</p>
          </BaseCard>
          <BaseCard v-motion="fadeUp(100)" class="text-center">
            <Icon icon="lucide:badge-check" class="mx-auto mb-2 h-8 w-8 text-primary" />
            <h3 class="font-semibold">Sem custo, para sempre</h3>
            <p class="text-sm text-muted-foreground">Nada de mensalidade ou cartão de crédito.</p>
          </BaseCard>
          <BaseCard v-motion="fadeUp(200)" class="text-center">
            <Icon icon="lucide:zap" class="mx-auto mb-2 h-8 w-8 text-warning" />
            <h3 class="font-semibold">Resultado na hora</h3>
            <p class="text-sm text-muted-foreground">Sem espera, sem cadastro, sem e-mail.</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Nota importante -->
    <section class="py-12">
      <div class="container">
        <div
          v-motion="fadeUp()"
          class="mx-auto flex max-w-4xl flex-col items-start gap-4 rounded-xl border border-warning/30 bg-warning/10 p-6 sm:flex-row"
        >
          <div class="flex-shrink-0 rounded-full bg-warning/20 p-3">
            <Icon icon="lucide:heart-pulse" class="h-6 w-6 text-warning" />
          </div>
          <div>
            <h3 class="mb-2 text-lg font-semibold">Nota Importante</h3>
            <p class="leading-relaxed text-muted-foreground">
              Esta ferramenta é informativa e não substitui acompanhamento profissional. Consulte um
              médico ou educador físico antes de iniciar qualquer plano alimentar ou de exercícios.
              Utilizamos seus dados apenas para os cálculos — tudo fica no seu dispositivo.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-card/30 py-16 md:py-24">
      <div class="container">
        <div v-motion="fadeUp()" class="mb-12 text-center">
          <BaseBadge class="mb-4">Dúvidas Frequentes</BaseBadge>
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">Perguntas Comuns</h2>
        </div>
        <div class="mx-auto max-w-3xl space-y-4">
          <details
            v-for="(item, i) in faq"
            :key="i"
            class="group rounded-xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary
              class="flex cursor-pointer items-center justify-between gap-3 font-semibold"
            >
              {{ item.q }}
              <Icon
                icon="lucide:chevron-down"
                class="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              />
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA calculadora (urgência) -->
    <section class="py-16 md:py-24">
      <div class="container">
        <div v-motion="zoomIn()" class="mx-auto max-w-3xl text-center">
          <Icon icon="lucide:award" class="mx-auto mb-6 h-16 w-16 text-primary animate-float" />
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">Comece Sua Jornada de Saúde Hoje</h2>
          <p class="mb-8 text-lg text-muted-foreground">
            Não deixe para amanhã o que você pode descobrir agora.
            <strong>Milhares de pessoas já transformaram sua relação com a saúde.</strong>
          </p>
          <BaseButton to="/calculadora" size="lg">
            <Icon icon="lucide:trending-up" class="h-6 w-6" />
            Acessar Calculadora Gratuita
          </BaseButton>
          <p class="mt-4 text-sm text-muted-foreground">
            100% gratuito • Sem cadastro • Resultados imediatos • Conforme LGPD
          </p>
        </div>
      </div>
    </section>

    <!-- Contato (unificado) -->
    <section id="contato" class="scroll-mt-20 border-t border-border py-16 md:py-24">
      <div class="container max-w-4xl">
        <div v-motion="fadeUp()" class="mb-10 text-center">
          <div class="mb-4 flex justify-center">
            <div class="rounded-full bg-primary/10 p-4">
              <Icon icon="lucide:mail" class="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 class="mb-2 text-3xl font-bold md:text-4xl">Fale Conosco</h2>
          <p class="mx-auto max-w-2xl text-muted-foreground">
            Tem uma ideia de site ou sistema? O <strong>Grupo 3W Online</strong> desenvolve soluções
            digitais personalizadas sob demanda — do planejamento ao deploy.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <a
            v-motion="fadeUp(80)"
            :href="whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
          >
            <div class="rounded-full bg-green-500/10 p-4">
              <Icon icon="lucide:message-circle" class="h-8 w-8 text-green-500" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">WhatsApp</p>
              <p class="text-lg font-semibold group-hover:text-primary">{{ whatsappLabel }}</p>
              <p class="text-sm text-muted-foreground">Atendimento rápido e direto</p>
            </div>
          </a>

          <a
            v-motion="fadeUp(160)"
            :href="`mailto:${email}`"
            class="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
          >
            <div class="rounded-full bg-primary/10 p-4">
              <Icon icon="lucide:mail" class="h-8 w-8 text-primary" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">E-mail</p>
              <p class="text-lg font-semibold group-hover:text-primary">{{ email }}</p>
              <p class="text-sm text-muted-foreground">Envie sua demanda com detalhes</p>
            </div>
          </a>
        </div>

        <div
          v-motion="zoomIn()"
          class="mt-8 overflow-hidden rounded-2xl bg-gradient-hero p-6 text-primary-foreground sm:p-8"
        >
          <div class="mx-auto max-w-2xl text-center">
            <Icon icon="lucide:code-2" class="mx-auto mb-4 h-12 w-12" />
            <h3 class="mb-3 text-2xl font-bold md:text-3xl">
              Sua ideia merece um produto digital de verdade
            </h3>
            <p class="mb-6 text-primary-foreground/90">
              Sites institucionais, landing pages, sistemas web, integrações e automações. No
              <strong>Grupo 3W Online</strong> transformamos necessidade em software sob medida, com
              foco em performance, segurança e resultado.
              <strong>As vagas de novos projetos deste mês são limitadas</strong> — garanta a sua.
            </p>
            <div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BaseButton href="https://www.3wonline.com.br" variant="light">
                <Icon icon="lucide:rocket" class="h-5 w-5" />
                Conhecer o Grupo 3W Online
              </BaseButton>
              <a
                :href="whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-primary-foreground/40 px-5 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                <Icon icon="lucide:message-circle" class="h-5 w-5" />
                Falar agora no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
