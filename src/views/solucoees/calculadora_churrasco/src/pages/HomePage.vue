<template>
  <div class="bg-gradient-to-br from-bbq-warm via-background to-bbq-warm/50 dark:from-background dark:via-background dark:to-background">
    <!-- ================= HERO ================= -->
    <section class="relative overflow-hidden py-16 lg:py-28">
      <div
        class="absolute inset-0 opacity-5 dark:opacity-10"
        style="background-image: url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23f97316%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/svg%3E')"
      ></div>
      <div class="container relative mx-auto px-4">
        <div class="mx-auto max-w-4xl text-center">
          <div
            v-motion-fade
            class="mb-6 inline-flex items-center gap-2 rounded-full bg-bbq-orange/10 px-4 py-2 text-sm font-medium text-bbq-orange dark:bg-bbq-orange/20"
          >
            <i class="fa-solid fa-fire animate-pulse"></i>
            <span>100% Gratuito &bull; Sem cadastro &bull; Resultados instantâneos</span>
          </div>
          <h1 class="mb-6 text-4xl font-extrabold md:text-6xl lg:text-7xl">
            <span class="text-gradient">Calculadora de</span><br />
            <span class="text-foreground">Churrasco</span>
          </h1>
          <p class="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            <strong>Planeje seu churrasco perfeito!</strong> Calcule exatamente as quantidades de
            <span class="font-semibold text-bbq-orange">carnes</span>,
            <span class="font-semibold text-bbq-red">bebidas</span> e
            <span class="font-semibold text-accent">acompanhamentos</span> para qualquer evento.
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <router-link
              to="/calculadora"
              class="inline-flex transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-bbq-orange to-bbq-red px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <i class="fa-solid fa-calculator"></i> Calcular Agora <i class="fa-solid fa-arrow-right ml-1"></i>
            </router-link>
            <a
              href="#como-funciona"
              class="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-bbq-orange px-8 py-4 text-lg font-semibold text-bbq-orange transition-all duration-300 hover:bg-bbq-orange/10"
            >
              <i class="fa-solid fa-circle-play"></i> Como Funciona
            </a>
          </div>
        </div>
      </div>
      <!-- Stats -->
      <div class="mt-16 border-y border-border bg-card/80 backdrop-blur-sm">
        <div class="container mx-auto px-4 py-6">
          <div class="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div v-for="s in stats" :key="s.label">
              <span class="text-2xl font-bold text-foreground md:text-3xl">
                {{ s.value }}<i v-if="s.icon" :class="s.icon"></i>
              </span>
              <br />
              <span class="text-sm text-muted-foreground">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= BENEFÍCIOS ================= -->
    <section id="como-funciona" class="bg-gradient-to-b from-transparent to-muted/30 py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <SecaoTitulo
          subtitulo="Por que usar"
          titulo="A ferramenta definitiva para seu churrasco"
          descricao="Desenvolvida para o churrasco brasileiro, com dados precisos e interface intuitiva."
        />
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="b in benefits"
            :key="b.title"
            v-motion-slide-visible-once-bottom
            class="group cursor-default rounded-2xl border-0 bg-card p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            :title="b.tooltip"
          >
            <div
              class="mx-auto mb-4 w-fit rounded-2xl bg-gradient-to-br from-bbq-warm to-bbq-warm/50 p-4 transition-transform group-hover:scale-110 dark:from-bbq-orange/20 dark:to-bbq-red/10"
            >
              <i :class="b.icon + ' text-3xl'"></i>
            </div>
            <h3 class="mb-2 text-xl font-bold transition-colors group-hover:text-bbq-orange">{{ b.title }}</h3>
            <p class="text-muted-foreground">{{ b.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= COMO USAR (passos) ================= -->
    <section class="py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <SecaoTitulo
          subtitulo="Passo a passo"
          titulo="Calcule em 3 passos simples"
          descricao="Sem complicação: em segundos você tem a lista completa de compras do seu churrasco."
        />
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div v-for="(p, i) in passos" :key="p.titulo" class="relative text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-bbq-orange to-bbq-red text-2xl font-bold text-white"
            >
              {{ i + 1 }}
            </div>
            <h3 class="mb-2 text-lg font-bold text-foreground">{{ p.titulo }}</h3>
            <p class="text-sm text-muted-foreground">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= DUAS FORMAS DE PLANEJAR ================= -->
    <section class="bg-muted/20 py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <SecaoTitulo
          subtitulo="Duas calculadoras"
          titulo="Escolha como planejar"
          descricao="Deixe o app calcular as quantidades ou monte você mesmo o orçamento e divida entre os participantes."
        />
        <div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <div class="flex flex-col rounded-2xl bg-card p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-bbq-orange to-bbq-red">
              <i class="fa-solid fa-calculator text-xl text-white"></i>
            </div>
            <h3 class="mb-2 text-xl font-bold text-foreground">Calculadora automática</h3>
            <p class="mb-6 flex-1 text-muted-foreground">
              Informe convidados e duração e receba a quantidade exata de carnes, bebidas e
              acompanhamentos, com custo estimado.
            </p>
            <router-link
              to="/calculadora"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-bbq-orange to-bbq-red px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            >
              <i class="fa-solid fa-calculator"></i> Calcular quantidades
            </router-link>
          </div>
          <div class="flex flex-col rounded-2xl bg-card p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600">
              <i class="fa-solid fa-receipt text-xl text-white"></i>
            </div>
            <h3 class="mb-2 text-xl font-bold text-foreground">Orçamento manual + rateio</h3>
            <p class="mb-6 flex-1 text-muted-foreground">
              Lance seus próprios itens e valores, some o total e divida o custo entre os
              participantes (a famosa vaquinha).
            </p>
            <router-link
              to="/orcamento"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            >
              <i class="fa-solid fa-receipt"></i> Montar orçamento
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FUNCIONALIDADES + EXEMPLO ================= -->
    <section class="bg-muted/20 py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span class="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-bbq-orange">Funcionalidades</span>
            <h2 class="mb-6 text-3xl font-bold text-foreground md:text-4xl">Tudo que você precisa em um só lugar</h2>
            <p class="mb-8 text-lg text-muted-foreground">
              Nossa calculadora considera <strong>todos os aspectos</strong> do seu churrasco: tipo
              de público, duração e acompanhamentos.
            </p>
            <div class="space-y-4">
              <div v-for="f in features" :key="f" class="group flex items-center gap-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full bg-bbq-orange/20">
                  <i class="fa-solid fa-check text-xs text-bbq-orange"></i>
                </div>
                <span class="text-foreground transition-colors group-hover:text-bbq-orange">{{ f }}</span>
              </div>
            </div>
            <router-link
              to="/calculadora"
              class="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-bbq-orange to-bbq-red px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <i class="fa-solid fa-calculator"></i> Começar a calcular <i class="fa-solid fa-arrow-right"></i>
            </router-link>
          </div>
          <div class="relative">
            <div class="relative z-10 rounded-2xl border-0 bg-card p-8 shadow-2xl">
              <div class="text-center">
                <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-bbq-orange/20 to-bbq-red/20">
                  <i class="fa-solid fa-utensils text-3xl text-bbq-orange"></i>
                </div>
                <h3 class="mb-4 text-2xl font-bold text-foreground">Exemplo de Resultado</h3>
                <div class="space-y-3 text-left">
                  <div v-for="e in exemplo" :key="e.label" class="flex justify-between rounded-lg bg-muted/50 p-3">
                    <span class="text-muted-foreground">{{ e.label }}</span>
                    <span class="font-semibold" :class="e.cor">{{ e.value }}</span>
                  </div>
                </div>
                <p class="mt-4 rounded-lg bg-bbq-orange/10 p-2 text-sm text-muted-foreground">
                  <i class="fa-solid fa-users mr-2"></i>Para 8 pessoas em 4 horas
                </p>
              </div>
            </div>
            <div class="absolute -right-4 -top-4 -z-0 h-24 w-24 rounded-2xl bg-gradient-to-br from-bbq-orange to-bbq-red opacity-20"></div>
            <div class="absolute -bottom-4 -left-4 -z-0 h-32 w-32 rounded-full bg-gradient-to-br from-accent to-bbq-orange opacity-20"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= DICAS ================= -->
    <section class="py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <SecaoTitulo
          subtitulo="Dicas do churrasqueiro"
          titulo="Segredos para um churrasco de sucesso"
          descricao="Além das quantidades certas, siga estas dicas para impressionar seus convidados."
        />
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="d in dicas" :key="d.titulo" class="rounded-2xl bg-card p-6 shadow-md">
            <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-bbq-orange/10">
              <i :class="d.icone + ' text-xl text-bbq-orange'"></i>
            </div>
            <h3 class="mb-2 font-bold text-foreground">{{ d.titulo }}</h3>
            <p class="text-sm text-muted-foreground">{{ d.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SOBRE / MISSÃO ================= -->
    <section id="sobre" class="bg-muted/20 py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span class="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-bbq-orange">Nossa missão</span>
            <h2 class="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              A calculadora de churrasco mais completa do Brasil
            </h2>
            <p class="mb-6 text-lg leading-relaxed text-muted-foreground">
              Resolvemos um problema comum: <strong>quanto de carne comprar para o churrasco?</strong>
              Nossa ferramenta usa algoritmos precisos baseados em dados reais de consumo, eliminando
              o risco de errar nas quantidades.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="v in valores" :key="v.title" class="flex items-start gap-3 rounded-lg bg-card p-4 shadow-sm">
                <i :class="v.icon + ' mt-0.5 text-lg'"></i>
                <div>
                  <h3 class="text-sm font-semibold text-foreground">{{ v.title }}</h3>
                  <p class="mt-1 text-xs text-muted-foreground">{{ v.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-gradient-to-br from-card to-muted/50 p-8 shadow-xl">
            <div class="mb-6 text-center">
              <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-bbq-orange to-bbq-red">
                <i class="fa-solid fa-lightbulb text-2xl text-white"></i>
              </div>
              <h3 class="text-2xl font-bold text-foreground">Funcionalidades</h3>
            </div>
            <div class="space-y-3">
              <div v-for="f in funcionalidades" :key="f" class="flex items-center gap-3">
                <i class="fa-solid fa-circle-check text-bbq-orange"></i>
                <span class="text-sm text-muted-foreground">{{ f }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= DEPOIMENTOS ================= -->
    <section class="py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <SecaoTitulo subtitulo="Depoimentos" titulo="O que dizem nossos usuários" />
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div v-for="t in testimonials" :key="t.name" class="rounded-2xl bg-card p-6 shadow-md transition-shadow hover:shadow-xl">
            <div class="mb-4 flex gap-1"><i v-for="n in 5" :key="n" class="fa-solid fa-star text-yellow-500"></i></div>
            <p class="mb-4 italic text-muted-foreground">"{{ t.text }}"</p>
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-bbq-orange to-bbq-red font-bold text-white">
                {{ t.name.charAt(0) }}
              </div>
              <div>
                <p class="font-semibold text-foreground">{{ t.name }}</p>
                <p class="text-sm text-muted-foreground">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA CALCULADORA ================= -->
    <section class="relative overflow-hidden bg-gradient-to-r from-bbq-orange to-bbq-red py-16 lg:py-24">
      <div class="container relative z-10 mx-auto px-4 text-center">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-6 text-3xl font-bold text-white md:text-5xl">Pronto para o churrasco perfeito?</h2>
          <p class="mb-8 text-xl text-white/90">
            Use nossa calculadora <strong>100% gratuita</strong> e garanta que seu churrasco seja um
            sucesso absoluto!
          </p>
          <router-link
            to="/calculadora"
            class="inline-flex transform items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-bbq-red shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/90"
          >
            <i class="fa-solid fa-calculator"></i> Calcular meu churrasco
          </router-link>
        </div>
      </div>
    </section>

    <!-- ================= DESENVOLVEDORA 3W ONLINE ================= -->
    <section id="servicos" class="bg-muted/30 py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <SecaoTitulo
          subtitulo="Desenvolvido por"
          titulo="Grupo 3W Online"
          descricao="Especialistas em desenvolvimento de sites e sistemas personalizados sob demanda."
        />
        <div class="mx-auto max-w-4xl rounded-2xl bg-card p-8 shadow-xl">
          <div class="mb-6 flex items-center gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-bbq-orange to-bbq-red">
              <i class="fa-solid fa-building text-xl text-white"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-foreground">Grupo 3W Online</h3>
              <p class="text-muted-foreground">Soluções digitais sob demanda</p>
            </div>
          </div>
          <p class="mb-6 text-muted-foreground">
            Transformamos ideias em produtos digitais de alta qualidade. Da concepção ao lançamento,
            entregamos <strong>sites e sistemas sob medida</strong> para o seu negócio crescer.
          </p>
          <div class="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            <div v-for="s in servicos" :key="s" class="flex items-center gap-2 text-sm">
              <i class="fa-solid fa-code text-bbq-orange"></i><span class="text-muted-foreground">{{ s }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-4 sm:flex-row">
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-bbq-orange to-bbq-red px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            >
              <i class="fa-solid fa-rocket"></i> Solicitar orçamento
            </a>
            <a
              href="https://wa.me/5541996924829"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold transition-all hover:bg-muted"
            >
              <i class="fa-brands fa-whatsapp"></i> Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SecaoTitulo from '@/components/SecaoTitulo.vue'

const stats = [
  { value: '50K+', icon: '', label: 'Churrascos calculados' },
  { value: '4.9 ', icon: 'fa-solid fa-star text-yellow-500 text-sm', label: 'Avaliação média' },
  { value: '100%', icon: '', label: 'Gratuito sempre' },
  { value: '0 ', icon: 'fa-solid fa-shield-halved text-green-500 text-sm', label: 'Dados coletados' },
]

const benefits = [
  { icon: 'fa-solid fa-calculator text-bbq-orange', title: 'Cálculo preciso', description: 'Algoritmo baseado em dados reais de milhares de churrascos.', tooltip: 'Desenvolvido com pesquisas de consumo real' },
  { icon: 'fa-solid fa-users text-bbq-red', title: 'Para qualquer grupo', description: 'Ajuste para homens, mulheres e crianças com consumos diferenciados.', tooltip: 'Consumo médio por perfil' },
  { icon: 'fa-solid fa-clock text-bbq-brown', title: 'Duração flexível', description: 'Calcule para eventos de 1 a 24 horas com quantidade ideal.', tooltip: 'Mais tempo, mais precisão' },
  { icon: 'fa-solid fa-bolt text-accent', title: 'Resultado instantâneo', description: 'Planejamento completo em segundos, sem complicações.', tooltip: 'Processamento 100% local' },
  { icon: 'fa-solid fa-bullseye text-primary', title: 'Zero desperdício', description: 'Evite sobras e economize com cálculos otimizados.', tooltip: 'Economia média de 30%' },
  { icon: 'fa-solid fa-utensils text-bbq-orange', title: 'Lista completa', description: 'Carnes, acompanhamentos, bebidas e destilados organizados.', tooltip: 'Mais de 20 itens calculados' },
]

const passos = [
  { titulo: 'Informe os convidados', desc: 'Digite quantos homens, mulheres e crianças participarão do churrasco.' },
  { titulo: 'Defina a duração', desc: 'Informe por quantas horas o evento vai durar (recomendado 4 a 6h).' },
  { titulo: 'Receba a lista', desc: 'Veja instantaneamente carnes, bebidas e acompanhamentos calculados.' },
]

const features = [
  'Cálculo de carnes por tipo de pessoa',
  'Acompanhamentos e linguiças inclusos',
  'Bebidas alcoólicas e não alcoólicas',
  'Destilados para adultos',
  'Sugestões de cortes de carne premium',
  'Interface Mobile First e responsiva',
]

const exemplo = [
  { label: 'Carne:', value: '3.5 Kg', cor: 'text-bbq-red' },
  { label: 'Linguiça:', value: '1.2 Kg', cor: 'text-bbq-orange' },
  { label: 'Cerveja:', value: '24 latas', cor: 'text-amber-600' },
  { label: 'Refrigerante:', value: '4 garrafas 2L', cor: 'text-blue-600' },
]

const dicas = [
  { icone: 'fa-solid fa-temperature-half', titulo: 'Carne em temperatura', desc: 'Tire a carne da geladeira 30 min antes de assar para um resultado uniforme.' },
  { icone: 'fa-solid fa-fire-burner', titulo: 'Braseiro no ponto', desc: 'Acenda o carvão com antecedência: a brasa ideal é branca, sem chamas.' },
  { icone: 'fa-solid fa-droplet', titulo: 'Sal grosso', desc: 'Salgue a carne só na hora de assar para manter a suculência.' },
  { icone: 'fa-solid fa-clock', titulo: 'Ordem certa', desc: 'Comece pelos acompanhamentos e linguiça, deixando as carnes nobres por último.' },
]

const valores = [
  { icon: 'fa-solid fa-bullseye text-bbq-orange', title: 'Precisão', desc: 'Cálculos baseados em dados reais de consumo brasileiro.' },
  { icon: 'fa-solid fa-users text-bbq-red', title: 'Acessibilidade', desc: 'Interface intuitiva que qualquer pessoa pode usar.' },
  { icon: 'fa-solid fa-heart text-accent', title: 'Gratuidade', desc: '100% gratuito, sem taxas ou cadastros.' },
  { icon: 'fa-solid fa-shield-halved text-green-500', title: 'Privacidade', desc: 'Seus dados nunca são coletados.' },
]

const funcionalidades = [
  'Cálculo preciso de carnes por tipo de pessoa',
  'Sugestões de cortes e quantidades',
  'Cálculo de bebidas alcoólicas e não alcoólicas',
  'Acompanhamentos e destilados inclusos',
  'Interface responsiva para qualquer dispositivo',
  'Modo claro e escuro disponíveis',
  'Resultados instantâneos sem espera',
  'Processamento seguro e local',
]

const servicos = [
  'Sites institucionais',
  'Landing pages',
  'Sistemas web sob medida',
  'E-commerce',
  'Aplicativos mobile',
  'Integrações e APIs',
]

const testimonials = [
  { name: 'Carlos M.', role: 'Churrasqueiro amador', text: 'Nunca mais faltou carne no meu churrasco! A calculadora é simplesmente perfeita.' },
  { name: 'Ana P.', role: 'Organizadora de eventos', text: 'Uso em todos os eventos que organizo. Economizei muito dinheiro evitando desperdícios.' },
  { name: 'Roberto S.', role: 'Mestre churrasqueiro', text: 'Mesmo sendo experiente, a calculadora me ajuda a não errar nas quantidades.' },
]
</script>
