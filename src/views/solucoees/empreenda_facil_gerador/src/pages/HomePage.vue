<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardContent from "@/components/ui/CardContent.vue";
import CardDescription from "@/components/ui/CardDescription.vue";
import Badge from "@/components/ui/Badge.vue";
import Accordion from "@/components/ui/Accordion.vue";
import SectionTitle from "@/components/ui/SectionTitle.vue";
import AnimatedCounter from "@/components/ui/AnimatedCounter.vue";
import { siteConfig, whatsappLink } from "@/config/site";
import heroImage from "@/assets/hero-business.jpg";

const ferramentas = [
  {
    icon: "lucide:calculator",
    title: "Gerador de Orçamentos",
    description:
      "Crie orçamentos profissionais com cálculo automático de itens, descontos e totais. Impressione seus clientes.",
    to: "/orcamentos",
    color: "from-blue-500 to-indigo-600",
    dica: "Inclua sempre uma data de validade para proteger seus preços.",
  },
  {
    icon: "lucide:file-text",
    title: "Ordem de Serviço",
    description:
      "Gere OS detalhadas com prazos, prioridades, status e campos de assinatura. Organize seu fluxo de trabalho.",
    to: "/ordem-servicos",
    color: "from-emerald-500 to-green-600",
    dica: "Documente o problema e os serviços com clareza para evitar retrabalho.",
  },
  {
    icon: "lucide:receipt",
    title: "Gerador de Recibos",
    description:
      "Emita recibos com valor por extenso automático e formato legal. Venda, compra ou prestação de serviço.",
    to: "/recibos",
    color: "from-purple-500 to-fuchsia-600",
    dica: "Guarde sempre uma cópia do recibo para seus registros fiscais.",
  },
  {
    icon: "lucide:trending-up",
    title: "Simulador de Preço",
    description:
      "Descubra o preço de venda ideal com margem ou markup e simule parcelamentos com juros.",
    to: "/simulador",
    color: "from-amber-500 to-orange-600",
    dica: "Considere todos os custos antes de definir sua margem de lucro.",
  },
];

const stats = [
  { value: 2500, suffix: "+", label: "Empreendedores usando" },
  { value: 15000, suffix: "+", label: "Documentos gerados" },
  { value: 4.9, suffix: "/5", label: "Nota de satisfação" },
  { value: 100, suffix: "%", label: "Gratuito e sem cadastro" },
];

const beneficios = [
  {
    icon: "lucide:timer",
    title: "Economia de Tempo",
    desc: "Documentos prontos em segundos, não em horas.",
  },
  {
    icon: "lucide:badge-check",
    title: "Visual Profissional",
    desc: "Layouts padronizados que passam credibilidade.",
  },
  {
    icon: "lucide:users",
    title: "Fácil de Usar",
    desc: "Interface intuitiva, sem curva de aprendizado.",
  },
  {
    icon: "lucide:shield-check",
    title: "Seguro e Privado",
    desc: "Seus dados ficam no seu navegador. Nada é enviado.",
  },
  {
    icon: "lucide:smartphone",
    title: "Funciona no Celular",
    desc: "Responsivo e mobile first. Use de qualquer lugar.",
  },
  {
    icon: "lucide:gift",
    title: "100% Gratuito",
    desc: "Todas as ferramentas sem custo e sem cadastro.",
  },
];

const passos = [
  {
    num: 1,
    icon: "lucide:mouse-pointer-click",
    title: "Escolha a ferramenta",
    desc: "Orçamento, ordem de serviço ou recibo.",
  },
  {
    num: 2,
    icon: "lucide:keyboard",
    title: "Preencha os dados",
    desc: "Empresa, cliente e itens. Cálculos são automáticos.",
  },
  {
    num: 3,
    icon: "lucide:printer",
    title: "Visualize e gere",
    desc: "Confira o documento e imprima ou salve em PDF.",
  },
];

const antesDepois = {
  antes: [
    "Documentos feitos à mão ou no Word, sem padrão",
    "Cálculos manuais sujeitos a erro",
    "Tempo perdido formatando a cada novo cliente",
    "Aparência amadora que reduz a confiança",
  ],
  depois: [
    "Documentos padronizados e profissionais",
    "Cálculos e valor por extenso automáticos",
    "Pronto em segundos, sempre no mesmo padrão",
    "Imagem profissional que fecha mais negócios",
  ],
};

// ===== Conteúdo de DICAS (unificado) =====
const gruposDicas = [
  {
    titulo: "Orçamentos",
    icon: "lucide:calculator",
    cor: "text-primary",
    dicas: [
      {
        icon: "lucide:file-text",
        titulo: "Seja detalhado",
        desc: "Descreva bem cada item para evitar mal-entendidos.",
      },
      {
        icon: "lucide:alert-circle",
        titulo: "Defina validade",
        desc: "Inclua uma data de validade para proteger seus preços.",
      },
      {
        icon: "lucide:calculator",
        titulo: "Calcule a margem",
        desc: "Considere materiais, mão de obra, impostos e lucro.",
      },
    ],
  },
  {
    titulo: "Ordens de Serviço",
    icon: "lucide:file-text",
    cor: "text-emerald-500",
    dicas: [
      {
        icon: "lucide:file-text",
        titulo: "Documente tudo",
        desc: "Registre o problema e os procedimentos realizados.",
      },
      {
        icon: "lucide:check-circle",
        titulo: "Defina responsáveis",
        desc: "Deixe claro quem é o responsável técnico.",
      },
      {
        icon: "lucide:alert-circle",
        titulo: "Prazos realistas",
        desc: "Considere a complexidade ao definir prazos.",
      },
    ],
  },
  {
    titulo: "Recibos",
    icon: "lucide:receipt",
    cor: "text-purple-500",
    dicas: [
      {
        icon: "lucide:check-circle",
        titulo: "Confira os dados",
        desc: "Verifique se os dados do pagador estão corretos.",
      },
      {
        icon: "lucide:receipt",
        titulo: "Guarde cópias",
        desc: "Mantenha uma cópia para seus registros.",
      },
      {
        icon: "lucide:file-text",
        titulo: "Seja específico",
        desc: "Descreva claramente o que está sendo pago.",
      },
    ],
  },
];

const tutoriais = [
  {
    title: "Como criar um orçamento profissional",
    items: [
      "Preencha os dados da sua empresa completamente",
      "Insira as informações corretas do cliente",
      "Detalhe cada item com descrição clara",
      "Defina quantidade e valores unitários precisos",
      "Escolha a forma de pagamento adequada",
      "Revise tudo antes de gerar",
    ],
  },
  {
    title: "Gerando uma Ordem de Serviço eficiente",
    items: [
      "Complete os dados da empresa e do cliente",
      "Defina o número sequencial da OS",
      "Estabeleça prioridade e tipo de serviço",
      "Descreva detalhadamente o problema",
      "Liste os serviços a executar e o responsável",
      "Adicione observações relevantes",
    ],
  },
  {
    title: "Emitindo recibos corretamente",
    items: [
      "Preencha os dados do emitente (quem recebe)",
      "Insira os dados do pagador (quem paga)",
      "Digite o valor numérico correto",
      "Confira o valor por extenso gerado",
      "Especifique o motivo do pagamento",
      "Revise todas as informações",
    ],
  },
];

const boasPraticas = [
  {
    title: "Organização",
    items: [
      "Mantenha uma numeração sequencial para os documentos",
      "Organize arquivos por cliente e tipo de documento",
      "Faça backup regular dos documentos importantes",
      "Estabeleça um padrão de nomenclatura",
    ],
  },
  {
    title: "Legal",
    items: [
      "Guarde cópias de todos os documentos emitidos",
      "Mantenha os dados de clientes atualizados",
      "Respeite prazos estabelecidos em contratos",
      "Consulte um contador sobre obrigações fiscais",
    ],
  },
  {
    title: "Relacionamento",
    items: [
      "Seja transparente sobre prazos e valores",
      "Mantenha comunicação clara com o cliente",
      "Cumpra rigorosamente os prazos acordados",
      "Ofereça canais de contato acessíveis",
    ],
  },
];

// ===== Conteúdo de CONTATO (unificado) =====
const motivosContato = [
  {
    icon: "lucide:user-check",
    titulo: "Atendimento personalizado",
    desc: "Nossa equipe entende a fundo a sua necessidade. Nada de respostas automáticas.",
  },
  {
    icon: "lucide:puzzle",
    titulo: "Soluções sob medida",
    desc: "Do site institucional ao sistema complexo, temos a expertise certa para o seu projeto.",
  },
  {
    icon: "lucide:trending-up",
    titulo: "Compromisso com resultado",
    desc: "Nosso foco é entregar valor real para o seu negócio crescer.",
  },
];

const faq = [
  {
    q: "O Empreenda Fácil é realmente gratuito?",
    a: "Sim. Todas as ferramentas são 100% gratuitas, sem cadastro e sem limite de uso.",
  },
  {
    q: "Meus dados ficam salvos em algum servidor?",
    a: "Não. Os dados que você digita são processados apenas no seu navegador para gerar o documento. Nada é enviado para servidores.",
  },
  {
    q: "Consigo salvar o documento em PDF?",
    a: "Sim. Ao clicar em Imprimir, escolha a opção 'Salvar como PDF' na janela de impressão do seu navegador.",
  },
  {
    q: "Funciona no celular?",
    a: "Sim. O site é responsivo e foi construído com abordagem mobile first, funcionando bem em qualquer dispositivo.",
  },
  {
    q: "Preciso de um sistema mais completo. Vocês desenvolvem?",
    a: "Sim! O Grupo 3w Online cria sites e sistemas personalizados sob demanda. Fale conosco pelo WhatsApp ou pelo site oficial.",
  },
];

const openFaq = ref<number | null>(0);
const toggleFaq = (i: number) => (openFaq.value = openFaq.value === i ? null : i);
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative overflow-hidden px-4 py-16 md:py-28">
      <div class="absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <div
        class="blob absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-primary"
        aria-hidden="true"
      />
      <div
        class="blob absolute -right-10 top-40 -z-10 h-72 w-72 rounded-full bg-fuchsia-500"
        aria-hidden="true"
      />
      <div class="container mx-auto grid items-center gap-12 lg:grid-cols-2">
        <div v-motion-slide-visible-once-bottom class="text-center lg:text-left">
          <Badge variant="secondary" class="mb-4 animate-pulse-glow">
            <Icon icon="lucide:sparkles" class="mr-1 h-3.5 w-3.5" />
            Ferramentas gratuitas para empreendedores
          </Badge>
          <h1
            class="font-display mb-6 text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-7xl"
          >
            Documentos do seu negócio,
            <span class="text-gradient-hero">prontos em segundos</span>
          </h1>
          <p class="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Crie orçamentos, ordens de serviço e recibos profissionais de forma rápida, fácil e
            segura. Sem cadastro, sem mensalidade.
          </p>
          <div class="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <RouterLink to="/orcamentos">
              <Button variant="hero" size="lg">
                <Icon icon="lucide:rocket" class="h-5 w-5" />
                Começar agora, é grátis
              </Button>
            </RouterLink>
            <a href="#ferramentas">
              <Button variant="outline" size="lg">
                Conhecer as ferramentas
                <Icon icon="lucide:arrow-down" class="h-4 w-4" />
              </Button>
            </a>
          </div>
          <div
            class="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start"
          >
            <span class="flex items-center gap-1">
              <Icon icon="lucide:star" class="h-4 w-4 fill-current text-yellow-500" />
              4.9/5 de satisfação
            </span>
            <span class="flex items-center gap-1">
              <Icon icon="lucide:shield-check" class="h-4 w-4 text-success" />
              Dados 100% no seu navegador
            </span>
          </div>
        </div>
        <div v-motion-slide-visible-once-right class="relative">
          <div class="glow absolute inset-0 -z-10 rounded-3xl" aria-hidden="true" />
          <img
            :src="heroImage"
            alt="Empreendedores usando ferramentas de gestão de documentos"
            class="w-full rounded-3xl border border-border shadow-strong"
            width="1200"
            height="800"
            loading="eager"
          />
          <div
            class="glass absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl p-4 shadow-medium sm:flex"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-success/15">
              <Icon icon="lucide:check" class="h-5 w-5 text-success" />
            </span>
            <div>
              <p class="text-sm font-bold leading-none">Documento pronto</p>
              <p class="text-xs text-muted-foreground">em menos de 1 minuto</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="border-y border-border bg-muted/30 px-4 py-12">
      <div class="container mx-auto grid grid-cols-2 gap-8 md:grid-cols-4">
        <div v-for="s in stats" :key="s.label" class="text-center">
          <p class="text-3xl font-extrabold text-gradient md:text-4xl">
            <AnimatedCounter :value="s.value" :suffix="s.suffix" />
          </p>
          <p class="mt-1 text-sm text-muted-foreground">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- FERRAMENTAS -->
    <section id="ferramentas" class="scroll-mt-20 px-4 py-16 md:py-24">
      <div class="container mx-auto">
        <SectionTitle
          center
          eyebrow="Ferramentas"
          title="Tudo que seu negócio precisa"
          subtitle="Ferramentas essenciais para profissionalizar a gestão documental da sua empresa."
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            v-for="f in ferramentas"
            :key="f.to"
            v-motion-slide-visible-once-bottom
            class="group flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-medium"
          >
            <div
              class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white transition-transform group-hover:scale-110"
              :class="f.color"
            >
              <Icon :icon="f.icon" class="h-7 w-7" />
            </div>
            <h3 class="mb-2 text-xl font-bold">{{ f.title }}</h3>
            <p class="mb-4 flex-1 text-muted-foreground">{{ f.description }}</p>
            <div class="mb-4 flex items-start gap-2 rounded-lg bg-accent/50 p-3 text-sm">
              <Icon icon="lucide:lightbulb" class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span><strong>Dica:</strong> {{ f.dica }}</span>
            </div>
            <RouterLink :to="f.to">
              <Button class="w-full">
                Usar ferramenta
                <Icon icon="lucide:arrow-right" class="h-4 w-4" />
              </Button>
            </RouterLink>
          </Card>
        </div>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section id="como-funciona" class="scroll-mt-20 bg-muted/30 px-4 py-16 md:py-24">
      <div class="container mx-auto">
        <SectionTitle
          center
          eyebrow="Simples assim"
          title="Como funciona"
          subtitle="Três passos e o seu documento está pronto."
        />
        <div class="grid gap-8 md:grid-cols-3">
          <div v-for="p in passos" :key="p.num" class="relative text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-white"
            >
              <Icon :icon="p.icon" class="h-7 w-7" />
            </div>
            <span class="mb-2 inline-block text-sm font-bold text-primary">Passo {{ p.num }}</span>
            <h3 class="mb-2 text-xl font-semibold">{{ p.title }}</h3>
            <p class="text-muted-foreground">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFÍCIOS (Sobre) -->
    <section id="sobre" class="scroll-mt-20 px-4 py-16 md:py-24">
      <div class="container mx-auto">
        <SectionTitle
          center
          eyebrow="Vantagens"
          :title="`Por que escolher o ${siteConfig.name}?`"
          subtitle="Desenvolvido para atender as necessidades reais dos empreendedores brasileiros."
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="b in beneficios"
            :key="b.title"
            class="flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-soft"
          >
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10"
            >
              <Icon :icon="b.icon" class="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 class="mb-1 font-semibold">{{ b.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ b.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ANTES x DEPOIS -->
    <section class="bg-muted/30 px-4 py-16 md:py-24">
      <div class="container mx-auto">
        <SectionTitle center eyebrow="A diferença" title="Antes e depois do Empreenda Fácil" />
        <div class="grid gap-6 md:grid-cols-2">
          <Card class="border-destructive/20 p-8">
            <h3 class="mb-4 flex items-center gap-2 text-lg font-bold text-destructive">
              <Icon icon="lucide:x-circle" class="h-6 w-6" /> Sem o Empreenda Fácil
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(item, i) in antesDepois.antes"
                :key="i"
                class="flex items-start gap-2 text-muted-foreground"
              >
                <Icon icon="lucide:minus" class="mt-1 h-4 w-4 shrink-0 text-destructive" />
                {{ item }}
              </li>
            </ul>
          </Card>
          <Card class="border-success/30 bg-success/5 p-8">
            <h3 class="mb-4 flex items-center gap-2 text-lg font-bold text-success">
              <Icon icon="lucide:check-circle" class="h-6 w-6" /> Com o Empreenda Fácil
            </h3>
            <ul class="space-y-3">
              <li v-for="(item, i) in antesDepois.depois" :key="i" class="flex items-start gap-2">
                <Icon icon="lucide:check" class="mt-1 h-4 w-4 shrink-0 text-success" />
                {{ item }}
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>

    <!-- DICAS E TUTORIAIS (unificado) -->
    <section id="dicas" class="scroll-mt-20 px-4 py-16 md:py-24">
      <div class="container mx-auto">
        <SectionTitle
          center
          eyebrow="Dicas e tutoriais"
          title="Aprenda a usar como um profissional"
          subtitle="Dicas rápidas, tutoriais passo a passo e melhores práticas para seus documentos."
        />

        <!-- Dicas rápidas por grupo -->
        <div class="space-y-8">
          <div v-for="g in gruposDicas" :key="g.titulo">
            <h3 class="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Icon :icon="g.icon" class="h-5 w-5" :class="g.cor" />
              {{ g.titulo }}
            </h3>
            <div class="grid gap-4 md:grid-cols-3">
              <Card
                v-for="d in g.dicas"
                :key="d.titulo"
                class="transition-shadow hover:shadow-medium"
              >
                <CardHeader class="pb-3">
                  <div class="flex items-center gap-2">
                    <Icon :icon="d.icon" class="h-5 w-5" :class="g.cor" />
                    <CardTitle class="text-base">{{ d.titulo }}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent
                  ><CardDescription>{{ d.desc }}</CardDescription></CardContent
                >
              </Card>
            </div>
          </div>
        </div>

        <!-- Tutoriais passo a passo -->
        <h3 class="mb-6 mt-12 text-2xl font-bold">Tutoriais passo a passo</h3>
        <div class="grid gap-6 lg:grid-cols-3">
          <Card v-for="t in tutoriais" :key="t.title">
            <CardHeader>
              <CardTitle class="flex items-center gap-2 text-base">
                <Icon icon="lucide:lightbulb" class="h-5 w-5 shrink-0 text-primary" />
                {{ t.title }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol class="space-y-3">
                <li v-for="(passo, i) in t.items" :key="i" class="flex items-start gap-3 text-sm">
                  <span
                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                  >
                    {{ i + 1 }}
                  </span>
                  <span>{{ passo }}</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        <!-- Melhores práticas -->
        <h3 class="mb-6 mt-12 text-2xl font-bold">Melhores práticas</h3>
        <Accordion :items="boasPraticas" />
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="scroll-mt-20 bg-muted/30 px-4 py-16 md:py-24">
      <div class="container mx-auto max-w-3xl">
        <SectionTitle center eyebrow="Dúvidas frequentes" title="Perguntas e respostas" />
        <div class="space-y-3">
          <div
            v-for="(item, i) in faq"
            :key="i"
            class="rounded-xl border border-border bg-card px-5"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              :aria-expanded="openFaq === i"
              @click="toggleFaq(i)"
            >
              {{ item.q }}
              <Icon
                icon="lucide:chevron-down"
                class="h-5 w-5 shrink-0 text-primary transition-transform"
                :class="openFaq === i ? 'rotate-180' : ''"
              />
            </button>
            <div v-show="openFaq === i" class="pb-5 text-muted-foreground">{{ item.a }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTATO (unificado) -->
    <section id="contato" class="scroll-mt-20 px-4 py-16 md:py-24">
      <div class="container mx-auto">
        <SectionTitle
          center
          eyebrow="Fale conosco"
          title="Vamos conversar sobre o seu projeto"
          subtitle="Tire dúvidas, envie sugestões ou solicite um orçamento sem compromisso."
        />
        <div class="grid items-start gap-8 lg:grid-cols-2">
          <!-- Copy persuasiva -->
          <Card class="p-8">
            <h3 class="mb-6 text-xl font-bold">Por que falar conosco?</h3>
            <ul class="space-y-5">
              <li v-for="m in motivosContato" :key="m.titulo" class="flex items-start gap-4">
                <span
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10"
                >
                  <Icon :icon="m.icon" class="h-5 w-5 text-primary" />
                </span>
                <div>
                  <h4 class="font-semibold">{{ m.titulo }}</h4>
                  <p class="text-sm text-muted-foreground">{{ m.desc }}</p>
                </div>
              </li>
            </ul>
          </Card>

          <!-- Canais -->
          <Card class="p-8">
            <h3 class="mb-2 text-xl font-bold">{{ siteConfig.company.name }}</h3>
            <p class="mb-6 text-muted-foreground">{{ siteConfig.company.description }}</p>
            <div class="space-y-3">
              <a
                :href="whatsappLink('Olá! Vim pelo Empreenda Fácil e gostaria de conversar.')"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="success" class="w-full justify-start" size="lg">
                  <Icon icon="lucide:message-circle" class="h-5 w-5" />
                  WhatsApp: {{ siteConfig.company.whatsappDisplay }}
                </Button>
              </a>
              <a :href="`mailto:${siteConfig.company.email}`">
                <Button variant="outline" class="w-full justify-start" size="lg">
                  <Icon icon="lucide:mail" class="h-5 w-5" />
                  {{ siteConfig.company.email }}
                </Button>
              </a>
              <a :href="siteConfig.company.site" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" class="w-full justify-start" size="lg">
                  <Icon icon="lucide:globe" class="h-5 w-5" />
                  Visite nosso site oficial
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA ESCASSEZ / EMPRESA 3W ONLINE -->
    <section class="px-4 pb-16 md:pb-24">
      <div class="container mx-auto">
        <div
          class="glow relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-center text-white md:p-14"
        >
          <Badge class="mb-4 border-white/30 bg-white/20 text-white">
            <Icon icon="lucide:flame" class="mr-1 h-3.5 w-3.5" />
            Vagas limitadas neste mês
          </Badge>
          <h2 class="mx-auto mb-4 max-w-3xl text-3xl font-bold md:text-5xl">
            Precisa de um site ou sistema sob medida?
          </h2>
          <p class="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            O <strong>{{ siteConfig.company.name }}</strong> desenvolve sites e sistemas
            personalizados sob demanda. As agendas para novos projetos são limitadas — garanta a sua
            e saia na frente da concorrência.
          </p>
          <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a :href="siteConfig.company.site" target="_blank" rel="noopener noreferrer">
              <Button size="lg" class="bg-white text-primary hover:bg-white/90">
                <Icon icon="lucide:rocket" class="h-5 w-5" />
                Quero meu sistema personalizado
              </Button>
            </a>
            <a
              :href="
                whatsappLink(
                  'Olá! Tenho interesse em um projeto personalizado com o Grupo 3w Online.'
                )
              "
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                class="border-white/40 text-white hover:bg-white/10"
              >
                <Icon icon="lucide:message-circle" class="h-5 w-5" />
                Falar agora no WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
