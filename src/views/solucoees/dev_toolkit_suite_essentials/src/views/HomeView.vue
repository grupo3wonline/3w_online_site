<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import ToolCard from '@/components/common/ToolCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { TOOLS, COMPANY, FAQS, TESTIMONIALS, TECH_STACK } from '@/config/site'

const benefits = [
  {
    icon: 'lucide:zap',
    title: 'Performance inigualável',
    text: 'Processamento em tempo real no seu navegador. Sem latência de servidor, sem espera.',
    color: 'text-blue-500',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Privacidade garantida',
    text: 'Abordagem Local-First: seus dados nunca saem do dispositivo. Conformidade com LGPD, GDPR, CCPA e POPIA.',
    color: 'text-emerald-500',
  },
  {
    icon: 'lucide:globe',
    title: 'Acesso universal',
    text: 'Funciona em qualquer dispositivo, desktop ou mobile. Interface adaptável e moderna.',
    color: 'text-violet-500',
  },
]

const stats = [
  { value: '10k+', label: 'Usuários mensais' },
  { value: '1M+', label: 'Operações realizadas' },
  { value: '100%', label: 'Seguro e privado' },
  { value: '24/7', label: 'Disponibilidade' },
]

const pillars = [
  {
    icon: 'lucide:target',
    title: 'Missão',
    text: 'Empoderar negócios e desenvolvedores com tecnologia acessível, segura e de alta performance.',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: 'lucide:rocket',
    title: 'Visão',
    text: 'Ser referência em soluções web inovadoras e desenvolvimento de software sob medida.',
    color: 'bg-violet-500/10 text-violet-500',
  },
  {
    icon: 'lucide:users',
    title: 'Valores',
    text: 'Transparência, inovação constante, foco no cliente e qualidade técnica inegociável.',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
]

const services = [
  { icon: 'lucide:monitor', title: 'Desenvolvimento Web', text: 'Sites, portais e e-commerce com tecnologias modernas e responsivas.' },
  { icon: 'lucide:smartphone', title: 'Aplicativos Mobile', text: 'Apps nativos e híbridos para iOS e Android, focados em experiência e performance.' },
  { icon: 'lucide:code', title: 'Sistemas Personalizados', text: 'Software sob medida para otimizar processos e escalar seu negócio com segurança.' },
  { icon: 'lucide:search', title: 'SEO Técnico', text: 'Otimização completa para buscadores, garantindo visibilidade e tráfego orgânico.' },
  { icon: 'lucide:server', title: 'Hospedagem & Infra', text: 'Cloud, servidores dedicados e manutenção preventiva para sua tranquilidade.' },
  { icon: 'lucide:bar-chart-3', title: 'Consultoria em TI', text: 'Planejamento estratégico para impulsionar sua transformação digital.' },
]

const howToUse = [
  { step: '1', title: 'Escolha a ferramenta', text: 'Navegue pelas ferramentas ou use a busca (Ctrl+K) para encontrar o que precisa.' },
  { step: '2', title: 'Cole ou envie seus dados', text: 'Digite, cole o texto ou faça upload do arquivo. Tudo é processado localmente.' },
  { step: '3', title: 'Obtenha o resultado', text: 'Copie, baixe ou visualize instantaneamente. Sem cadastro, sem limites.' },
]

const privacyPoints = [
  { icon: 'lucide:cpu', title: 'Processamento local', text: 'Tudo roda no seu navegador via JavaScript e Web Crypto.' },
  { icon: 'lucide:cloud-off', title: 'Zero upload', text: 'Seu conteúdo não é enviado nem armazenado em servidores.' },
  { icon: 'lucide:eye-off', title: 'Sem rastreio invasivo', text: 'Analytics só com o seu consentimento (LGPD/GDPR).' },
  { icon: 'lucide:file-check-2', title: 'Código auditável', text: 'Lógica transparente e verificável, sem caixas-pretas.' },
]

const featuredTools = TOOLS.slice(0, 6)
</script>

<template>
  <div id="topo">
    <!-- HERO -->
    <section class="relative overflow-hidden border-b">
      <div class="pointer-events-none absolute inset-0 bg-grid mask-fade opacity-60" />
      <div class="pointer-events-none absolute inset-0 glow-brand" />
      <div class="container-app relative py-20 text-center md:py-28">
        <Badge
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          variant="brand"
          class="mb-6"
        >
          <Icon icon="lucide:sparkles" class="mr-1 h-3.5 w-3.5" />
          {{ TOOLS.length }} ferramentas gratuitas para desenvolvedores
        </Badge>
        <h1
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
        >
          Acelere seu desenvolvimento com
          <span class="text-gradient">precisão e segurança</span>
        </h1>
        <p
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Todas as ferramentas essenciais em um só lugar. Sem instalações, sem logs, 100% gratuito e
          seguro — direto no seu navegador.
        </p>
        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <RouterLink to="/ferramentas">
            <Button variant="brand" size="xl" class="shadow-brand">
              Acessar ferramentas agora
              <Icon icon="lucide:arrow-right" class="h-5 w-5" />
            </Button>
          </RouterLink>
          <a href="#beneficios">
            <Button variant="outline" size="xl">Saiba mais</Button>
          </a>
        </div>

        <!-- Chips das ferramentas -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 400 } }"
          class="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          <RouterLink
            v-for="tool in TOOLS"
            :key="tool.slug"
            :to="tool.path"
            class="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Icon :icon="tool.icon" class="h-4 w-4" />
            {{ tool.title }}
          </RouterLink>
        </div>
      </div>

      <!-- Stats -->
      <div class="border-t bg-background/60">
        <div class="container-app grid grid-cols-2 gap-6 py-10 text-center md:grid-cols-4">
          <div v-for="s in stats" :key="s.label">
            <p class="text-3xl font-bold text-gradient">{{ s.value }}</p>
            <p class="text-sm text-muted-foreground">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAIXA DE TECNOLOGIAS -->
    <section class="border-b py-8">
      <div class="container-app">
        <p class="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Construído com tecnologia moderna
        </p>
        <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <div
            v-for="t in TECH_STACK"
            :key="t.name"
            class="flex items-center gap-2 text-muted-foreground"
          >
            <Icon :icon="t.icon" class="h-5 w-5" />
            <span class="text-sm font-medium">{{ t.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFÍCIOS -->
    <section id="beneficios" class="scroll-mt-20 py-20">
      <div class="container-app">
        <SectionHeading
          eyebrow="Benefícios"
          eyebrow-icon="lucide:star"
          title="Por que o Dev Toolkit é diferente?"
          subtitle="Focamos no que realmente importa: sua produtividade e segurança."
        />
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="(b, i) in benefits"
            :key="b.title"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 120 } }"
            class="card-glow rounded-xl border bg-card p-8 shadow-sm"
          >
            <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <Icon :icon="b.icon" class="h-7 w-7" :class="b.color" />
            </div>
            <h3 class="text-xl font-bold">{{ b.title }}</h3>
            <p class="mt-3 leading-relaxed text-muted-foreground">{{ b.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- COMO USAR -->
    <section class="border-y bg-muted/30 py-20">
      <div class="container-app">
        <SectionHeading
          eyebrow="Instruções"
          eyebrow-icon="lucide:list-checks"
          title="Como usar em 3 passos"
          subtitle="Simples, rápido e sem cadastro."
        />
        <div class="grid gap-8 md:grid-cols-3">
          <div v-for="h in howToUse" :key="h.step" class="relative rounded-xl border bg-card p-8">
            <span
              class="absolute -top-4 left-8 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-purple-600 text-sm font-bold text-white shadow-lg"
            >
              {{ h.step }}
            </span>
            <h3 class="mt-2 text-lg font-bold">{{ h.title }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">{{ h.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FERRAMENTAS -->
    <section id="ferramentas-preview" class="scroll-mt-20 py-20">
      <div class="container-app">
        <div class="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span class="pill-brand mb-4"><Icon icon="lucide:wrench" class="h-3.5 w-3.5" />Ferramentas</span>
            <h2 class="text-3xl font-bold md:text-4xl">Tudo o que você precisa</h2>
            <p class="mt-3 text-muted-foreground">O que os desenvolvedores estão usando agora.</p>
          </div>
          <RouterLink
            to="/ferramentas"
            class="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            Ver todas as ferramentas
            <Icon icon="lucide:arrow-right" class="h-4 w-4" />
          </RouterLink>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ToolCard v-for="tool in featuredTools" :key="tool.slug" :tool="tool" />
        </div>
      </div>
    </section>

    <!-- GARANTIA DE PRIVACIDADE (Local-First) -->
    <section class="border-y bg-muted/30 py-20">
      <div class="container-app">
        <SectionHeading
          eyebrow="Privacidade em primeiro lugar"
          eyebrow-icon="lucide:lock"
          title="Seus dados nunca saem do seu dispositivo"
          subtitle="Arquitetura Local-First: rápida por natureza e segura por padrão."
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="p in privacyPoints"
            :key="p.title"
            class="rounded-xl border bg-card p-6 text-center"
          >
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Icon :icon="p.icon" class="h-6 w-6" />
            </div>
            <h3 class="font-bold">{{ p.title }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- DEPOIMENTOS -->
    <section class="py-20">
      <div class="container-app">
        <SectionHeading
          eyebrow="Prova social"
          eyebrow-icon="lucide:message-square-quote"
          title="Quem usa, recomenda"
          subtitle="Desenvolvedores e times que já incorporaram a suíte no dia a dia."
        />
        <div class="grid gap-6 md:grid-cols-3">
          <figure
            v-for="t in TESTIMONIALS"
            :key="t.name"
            class="flex flex-col rounded-xl border bg-card p-6"
          >
            <div class="mb-4 flex gap-1 text-amber-400">
              <Icon v-for="n in 5" :key="n" icon="lucide:star" class="h-4 w-4 fill-current" />
            </div>
            <blockquote class="flex-1 text-sm leading-relaxed text-muted-foreground">
              "{{ t.text }}"
            </blockquote>
            <figcaption class="mt-5 flex items-center gap-3">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-purple-600 text-sm font-bold text-white"
              >
                {{ t.initials }}
              </span>
              <span>
                <span class="block text-sm font-semibold">{{ t.name }}</span>
                <span class="block text-xs text-muted-foreground">{{ t.role }}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- SOBRE -->
    <section id="sobre" class="scroll-mt-20 border-y bg-muted/30 py-20">
      <div class="container-app grid items-center gap-12 md:grid-cols-2">
        <div>
          <span class="pill-brand mb-4"><Icon icon="lucide:building-2" class="h-3.5 w-3.5" />Sobre nós</span>
          <h2 class="text-3xl font-bold md:text-4xl">Uma iniciativa do {{ COMPANY.name }}</h2>
          <p class="mt-4 leading-relaxed text-muted-foreground">
            O Dev Toolkit Suite Essentials nasceu no {{ COMPANY.name }}, empresa especializada no
            desenvolvimento de sites e sistemas personalizados sob demanda. Nossa missão é entregar
            ferramentas de alta performance que simplificam o dia a dia de desenvolvedores e empresas.
          </p>
          <ul class="mt-6 space-y-3">
            <li
              v-for="item in [
                'Excelência em engenharia de software',
                'Design UI/UX moderno e intuitivo',
                'Compromisso com resultados',
              ]"
              :key="item"
              class="flex items-center gap-3"
            >
              <Icon icon="lucide:check-circle-2" class="h-5 w-5 text-[hsl(var(--success))]" />
              <span class="font-medium">{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
          <div
            v-for="p in pillars"
            :key="p.title"
            class="rounded-xl border bg-card p-6 text-center"
          >
            <div :class="p.color" class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl">
              <Icon :icon="p.icon" class="h-6 w-6" />
            </div>
            <h3 class="font-bold">{{ p.title }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVIÇOS -->
    <section id="servicos" class="scroll-mt-20 py-20">
      <div class="container-app">
        <SectionHeading
          eyebrow="Serviços"
          eyebrow-icon="lucide:briefcase"
          :title="`O que o ${COMPANY.name} faz por você`"
          subtitle="Soluções completas de tecnologia para alavancar o seu negócio no mundo digital."
        />
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="s in services"
            :key="s.title"
            class="group rounded-xl border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              <Icon :icon="s.icon" class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold">{{ s.title }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">{{ s.text }}</p>
          </div>
        </div>

        <!-- Persuasão / autoridade -->
        <div class="mt-16 grid gap-8 rounded-2xl border bg-muted/40 p-8 md:grid-cols-3 md:p-12">
          <div>
            <h4 class="text-lg font-bold text-primary">Autoridade e experiência</h4>
            <p class="mt-2 text-sm text-muted-foreground">
              Anos de mercado entregando soluções robustas para diversos setores da economia.
            </p>
          </div>
          <div>
            <h4 class="text-lg font-bold text-primary">Equipe de elite</h4>
            <p class="mt-2 text-sm text-muted-foreground">
              Engenheiros prontos para resolver desafios complexos que outros não conseguem.
            </p>
          </div>
          <div>
            <h4 class="text-lg font-bold text-primary">Prova social</h4>
            <p class="mt-2 text-sm text-muted-foreground">
              Centenas de clientes satisfeitos que transformaram suas operações com nossa tecnologia.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA ESCASSEZ / URGÊNCIA -->
    <section class="relative overflow-hidden bg-gradient-to-br from-brand-600 to-purple-700 py-20 text-white">
      <div class="pointer-events-none absolute inset-0 bg-grid opacity-10" />
      <div class="container-app relative text-center">
        <Badge class="mb-6 border-white/30 bg-white/15 text-white">
          <Icon icon="lucide:flame" class="mr-1 h-3.5 w-3.5" />
          Vagas limitadas neste mês
        </Badge>
        <h2 class="mx-auto max-w-3xl text-3xl font-bold md:text-5xl">
          Precisa de um site ou sistema sob medida?
        </h2>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-white/90">
          O {{ COMPANY.name }} desenvolve sites e sistemas personalizados sob demanda. A agenda de
          novos projetos deste mês está quase completa — garanta seu orçamento antes que as vagas
          acabem.
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a :href="COMPANY.site" target="_blank" rel="noopener noreferrer">
            <Button size="xl" class="bg-white text-brand-700 hover:bg-white/90">
              Solicitar orçamento agora
              <Icon icon="lucide:arrow-right" class="h-5 w-5" />
            </Button>
          </a>
          <a :href="COMPANY.whatsappLink" target="_blank" rel="noopener noreferrer">
            <Button size="xl" variant="outline" class="border-white/40 bg-transparent text-white hover:bg-white/10">
              <Icon icon="fa6-brands:whatsapp" class="h-5 w-5" />
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="scroll-mt-20 py-20">
      <div class="container-app">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          eyebrow-icon="lucide:circle-help"
          title="Perguntas frequentes"
          subtitle="Tudo o que você precisa saber antes de começar."
        />
        <div class="mx-auto max-w-3xl">
          <Accordion type="single" collapsible :default-value="'0'">
            <AccordionItem v-for="(f, i) in FAQS" :key="i" :value="String(i)">
              <AccordionTrigger>{{ f.q }}</AccordionTrigger>
              <AccordionContent>{{ f.a }}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>

    <!-- CONTATO (sem formulário, sem iframe) -->
    <section id="contato" class="scroll-mt-20 border-t bg-muted/30 py-20">
      <div class="container-app">
        <SectionHeading
          eyebrow="Contato"
          eyebrow-icon="lucide:mail"
          :title="`Fale com o ${COMPANY.name}`"
          subtitle="Tem um projeto em mente ou uma dúvida? Estamos a uma mensagem de distância. Respondemos rápido — e sua ideia pode sair do papel ainda esta semana."
        />
        <div class="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          <a
            :href="COMPANY.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center rounded-xl border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
              <Icon icon="fa6-brands:whatsapp" class="h-7 w-7" />
            </div>
            <h3 class="text-lg font-bold">WhatsApp</h3>
            <p class="mt-1 text-muted-foreground">{{ COMPANY.whatsapp }}</p>
            <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Iniciar conversa
              <Icon icon="lucide:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
          <a
            :href="`mailto:${COMPANY.email}`"
            class="group flex flex-col items-center rounded-xl border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500">
              <Icon icon="lucide:mail" class="h-7 w-7" />
            </div>
            <h3 class="text-lg font-bold">E-mail</h3>
            <p class="mt-1 text-muted-foreground">{{ COMPANY.email }}</p>
            <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Enviar e-mail
              <Icon icon="lucide:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
