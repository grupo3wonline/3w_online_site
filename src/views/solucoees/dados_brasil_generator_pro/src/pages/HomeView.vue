<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ToolsExplorer from '@/components/tools/ToolsExplorer.vue'
import CtaSection from '@/components/common/CtaSection.vue'
import InfoBox from '@/components/ui/InfoBox.vue'
import { tools } from '@/data/tools'
import { siteConfig } from '@/config/site'

const stats = [
  { value: '40+', label: 'Ferramentas', icon: 'lucide:layout-grid' },
  { value: '100%', label: 'Gratuito', icon: 'lucide:gift' },
  { value: '0', label: 'Cadastros', icon: 'lucide:user-x' },
  { value: 'pt-BR', label: 'Feito pro Brasil', icon: 'lucide:flag' },
]

const benefits = [
  { icon: 'lucide:zap', title: 'Rápido e sem cadastro', text: 'Gere e valide dados em segundos, direto no navegador. Sem login, sem espera.' },
  { icon: 'lucide:shield-check', title: 'Privado e seguro', text: 'Todo processamento acontece no seu dispositivo. Nenhum dado é enviado a servidores.' },
  { icon: 'lucide:layout-grid', title: 'Mais de 40 ferramentas', text: 'Geradores de documentos, validadores e utilitários para dev em um só lugar.' },
  { icon: 'lucide:smartphone', title: 'Funciona em qualquer tela', text: 'Design responsivo mobile-first: use no celular, tablet ou desktop.' },
]

const steps = [
  { icon: 'lucide:mouse-pointer-click', title: 'Escolha a ferramenta', text: 'Navegue ou pesquise entre geradores e validadores.' },
  { icon: 'lucide:sliders-horizontal', title: 'Ajuste as opções', text: 'Defina quantidade, formatação e parâmetros conforme a necessidade.' },
  { icon: 'lucide:copy-check', title: 'Copie e utilize', text: 'Um clique para copiar. Cole nos seus testes, formulários ou sistemas.' },
]

// Seção Sobre (unificada)
const pillars = [
  { icon: 'lucide:target', title: 'Missão', text: 'Acelerar o trabalho de quem desenvolve e testa software no Brasil com ferramentas gratuitas e confiáveis.' },
  { icon: 'lucide:lightbulb', title: 'Visão', text: 'Ser a referência em geradores e validadores de dados brasileiros, com foco em privacidade.' },
  { icon: 'lucide:heart-handshake', title: 'Valores', text: 'Transparência, qualidade, privacidade por padrão e melhoria contínua.' },
]

// Seção Serviços (unificada)
const services = [
  { icon: 'lucide:code', title: 'Desenvolvimento Web', text: 'Sites e aplicações robustas, escaláveis e seguras com tecnologias modernas.' },
  { icon: 'lucide:smartphone', title: 'Apps e Integrações', text: 'Aplicativos e integrações com ótima experiência e performance.' },
  { icon: 'lucide:database', title: 'Sistemas Corporativos', text: 'ERPs, CRMs e dashboards personalizados para otimizar processos.' },
  { icon: 'lucide:palette', title: 'UI/UX Design', text: 'Interfaces intuitivas e atraentes com foco na jornada do usuário.' },
]

const faqs = [
  { q: 'Os dados gerados são reais?', a: 'Não. Todos os documentos são fictícios e apenas matematicamente válidos, para testes de software. Não pertencem a pessoas reais.' },
  { q: 'É legal usar essas ferramentas?', a: 'Sim, para testes, desenvolvimento e QA. É proibido usar os dados para fraudes ou qualquer atividade ilegal.' },
  { q: 'Preciso pagar ou me cadastrar?', a: 'Não. Tudo é 100% gratuito e funciona sem cadastro, direto no navegador.' },
  { q: 'Meus dados ficam armazenados?', a: 'Não enviamos o que você digita para servidores. O processamento é feito localmente no seu dispositivo.' },
]

let faqScript: HTMLScriptElement | null = null
onMounted(() => {
  faqScript = document.createElement('script')
  faqScript.type = 'application/ld+json'
  faqScript.id = 'ld-faq-home'
  faqScript.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })
  document.head.appendChild(faqScript)
})
onUnmounted(() => faqScript?.remove())
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <div class="glow-primary pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-[500px] w-[500px] -translate-x-1/2" />

      <div class="container-app py-20 text-center sm:py-28">
        <div v-motion-fade>
          <BaseBadge icon="lucide:sparkles" class="mb-5">{{ $t('home.heroBadge') }}</BaseBadge>
        </div>

        <h1 class="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
          {{ $t('home.heroTitle') }}
          <span class="text-gradient">{{ $t('home.heroHighlight') }}</span>
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{{ $t('home.heroSubtitle') }}</p>

        <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BaseButton href="#ferramentas" size="lg">
            {{ $t('home.ctaPrimary') }}
            <Icon icon="lucide:arrow-right" class="h-5 w-5" />
          </BaseButton>
          <BaseButton href="#contato" variant="outline" size="lg">
            {{ $t('home.ctaSecondary') }}
          </BaseButton>
        </div>

        <dl class="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          <div v-for="s in stats" :key="s.label" class="rounded-2xl border border-border bg-card/60 p-5">
            <Icon :icon="s.icon" class="mx-auto mb-2 h-5 w-5 text-primary" />
            <dt class="text-3xl font-extrabold text-primary">{{ s.value }}</dt>
            <dd class="mt-1 text-sm text-muted-foreground">{{ s.label }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- ============ BENEFÍCIOS ============ -->
    <section class="py-16">
      <div class="container-app">
        <SectionHeading
          eyebrow="Vantagens"
          icon="lucide:badge-check"
          title="Por que usar o Gerador Brasil Pro?"
          subtitle="Ferramentas pensadas para quem desenvolve, testa e valida sistemas no dia a dia."
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="b in benefits"
            :key="b.title"
            v-motion-slide-visible-once-bottom
            class="card-hover rounded-2xl border border-border bg-card p-6"
          >
            <span class="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon :icon="b.icon" class="h-6 w-6" />
            </span>
            <h3 class="mb-2 font-bold">{{ b.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ b.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FERRAMENTAS (vitrine completa unificada) ============ -->
    <section id="ferramentas" class="scroll-anchor py-16">
      <div class="container-app">
        <SectionHeading
          eyebrow="Ferramentas"
          icon="lucide:wand-2"
          title="Todas as ferramentas gratuitas"
          :subtitle="`${tools.length} utilitários para gerar e validar documentos brasileiros e converter dados. 100% gratuitos, sem cadastro. Marque com ⭐ suas favoritas.`"
        />
        <ToolsExplorer />
      </div>
    </section>

    <!-- ============ COMO USAR ============ -->
    <section class="border-y border-border bg-card/40 py-16">
      <div class="container-app">
        <SectionHeading
          eyebrow="Passo a passo"
          icon="lucide:list-checks"
          title="Como funciona"
          subtitle="Três passos simples para gerar seus dados."
        />
        <div class="grid gap-8 md:grid-cols-3">
          <div v-for="(step, i) in steps" :key="step.title" class="relative text-center">
            <span class="absolute -top-3 left-1/2 -translate-x-1/2 text-7xl font-black text-primary/5">{{ i + 1 }}</span>
            <span class="relative mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Icon :icon="step.icon" class="h-8 w-8" />
            </span>
            <h3 class="mb-2 font-bold">{{ step.title }}</h3>
            <p class="mx-auto max-w-xs text-sm text-muted-foreground">{{ step.text }}</p>
          </div>
        </div>
        <div class="mx-auto mt-12 max-w-3xl">
          <InfoBox variant="tip" title="Dica de produtividade">
            Use a busca na seção de ferramentas para achar rapidamente o que precisa — ela pesquisa por nome,
            descrição e palavras-chave (ex.: "cpf", "json", "luhn"). Marque suas favoritas com a ⭐ para acesso rápido.
          </InfoBox>
        </div>
      </div>
    </section>

    <!-- ============ SOBRE (unificado, âncora) ============ -->
    <section id="sobre" class="scroll-anchor py-16">
      <div class="container-app">
        <SectionHeading
          eyebrow="Sobre o projeto"
          icon="lucide:info"
          title="Feito para acelerar o seu trabalho"
          subtitle="O Gerador Brasil Pro reúne mais de 40 ferramentas para gerar e validar documentos brasileiros, com privacidade por padrão."
        />
        <div class="grid gap-6 md:grid-cols-3">
          <div v-for="p in pillars" :key="p.title" class="rounded-2xl border border-border bg-card p-8 text-center card-hover">
            <span class="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon :icon="p.icon" class="h-7 w-7" />
            </span>
            <h3 class="mb-2 text-lg font-bold">{{ p.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ SERVIÇOS 3W (unificado, âncora) ============ -->
    <section id="servicos" class="scroll-anchor border-y border-border bg-card/40 py-16">
      <div class="container-app">
        <SectionHeading
          eyebrow="Grupo 3w Online"
          icon="lucide:rocket"
          title="Sites e sistemas sob medida"
          subtitle="Este projeto é mantido pela Grupo 3w Online. Também desenvolvemos soluções personalizadas sob demanda."
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="s in services" :key="s.title" class="rounded-2xl border border-border bg-card p-6 card-hover">
            <span class="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon :icon="s.icon" class="h-6 w-6" />
            </span>
            <h3 class="mb-1.5 font-bold">{{ s.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FAQ (AEO) ============ -->
    <section class="py-16">
      <div class="container-app max-w-3xl">
        <SectionHeading eyebrow="Dúvidas" icon="lucide:message-circle-question" title="Perguntas frequentes" />
        <div class="space-y-3">
          <details
            v-for="faq in faqs"
            :key="faq.q"
            class="group rounded-xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary class="flex cursor-pointer items-center justify-between gap-4 font-semibold">
              {{ faq.q }}
              <Icon icon="lucide:chevron-down" class="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
            </summary>
            <p class="mt-3 text-sm text-muted-foreground">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ============ CONTATO (unificado, âncora) ============ -->
    <section id="contato" class="scroll-anchor py-16">
      <div class="container-app">
        <div class="grid items-center gap-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-8 md:grid-cols-2 md:p-12">
          <div>
            <BaseBadge icon="lucide:phone" class="mb-3">Fale com a gente</BaseBadge>
            <h2 class="text-3xl font-bold">Precisa de um sistema sob medida?</h2>
            <p class="mt-4 text-muted-foreground">
              A Grupo 3w Online transforma sua ideia em software. Atendimento direto com quem desenvolve, sem
              intermediários. Fale agora — a agenda deste mês é limitada.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <BaseButton :href="siteConfig.developer.whatsappLink">
                <Icon icon="lucide:message-circle" class="h-5 w-5" /> WhatsApp
              </BaseButton>
              <BaseButton :href="`mailto:${siteConfig.developer.email}`" variant="outline">
                <Icon icon="lucide:mail" class="h-5 w-5" /> E-mail
              </BaseButton>
            </div>
          </div>
          <ul class="space-y-3">
            <li class="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <Icon icon="lucide:message-circle" class="h-6 w-6 shrink-0 text-green-500" />
              <div>
                <p class="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                <a :href="siteConfig.developer.whatsappLink" target="_blank" rel="noopener noreferrer" class="font-bold hover:text-primary">
                  {{ siteConfig.developer.whatsapp }}
                </a>
              </div>
            </li>
            <li class="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <Icon icon="lucide:mail" class="h-6 w-6 shrink-0 text-primary" />
              <div>
                <p class="text-xs uppercase tracking-wider text-muted-foreground">E-mail</p>
                <a :href="`mailto:${siteConfig.developer.email}`" class="font-bold hover:text-primary">
                  {{ siteConfig.developer.email }}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ CTA FINAL ============ -->
    <CtaSection />
  </div>
</template>
