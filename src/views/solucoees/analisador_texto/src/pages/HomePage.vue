<template>
  <div>
    <!-- ===================== HERO ===================== -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-20 md:py-28 lg:py-32"
    >
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary-300/30 rounded-full blur-3xl animate-float"></div>
        <div
          class="absolute bottom-10 right-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-float"
          style="animation-delay: -3s"
        ></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="badge badge-primary mb-6 px-4 py-1.5 text-sm" v-motion-fade>
          <i class="fa-solid fa-bolt mr-1.5" aria-hidden="true"></i> 100% Gratuito • Sem Cadastro • Privado
        </span>
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6" v-motion-slide-bottom>
          <span class="gradient-text">{{ t('brand.name') }}</span>
        </h1>
        <p class="text-xl md:text-2xl text-slate-700 dark:text-slate-200 font-semibold mb-4">
          {{ t('brand.tagline') }}
        </p>
        <p class="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
          Conte caracteres, palavras, sentenças e parágrafos com precisão. Compare textos lado a lado e identifique
          diferenças instantaneamente — tudo no seu navegador.
        </p>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Ideal para <strong>redatores</strong>, <strong>estudantes</strong>,
          <strong>profissionais de SEO</strong> e qualquer pessoa que trabalha com textos.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link to="/ferramenta" class="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
            <i class="fa-solid fa-rocket" aria-hidden="true"></i> Começar Agora — É Grátis
          </router-link>
          <a href="#funcionalidades" class="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
            <i class="fa-solid fa-list-check" aria-hidden="true"></i> Ver Recursos
          </a>
        </div>
        <div class="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <div
            v-for="trust in trustBadges"
            :key="trust.label"
            class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
          >
            <i :class="trust.icon" class="text-green-500" aria-hidden="true"></i> {{ trust.label }}
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== FUNCIONALIDADES ===================== -->
    <section id="funcionalidades" class="py-16 md:py-24 bg-white dark:bg-slate-900 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="badge badge-primary mb-4"><i class="fa-solid fa-star mr-1" aria-hidden="true"></i> Funcionalidades</span>
          <h2 class="section-title mb-4">Tudo que Você Precisa em Um Só Lugar</h2>
          <p class="section-subtitle">
            Ferramentas profissionais de análise textual, completamente gratuitas e acessíveis direto no navegador.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(feature, i) in features" :key="i" class="card card-hover p-6 group">
            <div
              class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors"
            >
              <i :class="feature.icon" class="text-primary-600 dark:text-primary-400 text-xl" aria-hidden="true"></i>
            </div>
            <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== COMO USAR ===================== -->
    <section id="como-usar" class="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="badge badge-primary mb-4"><i class="fa-solid fa-graduation-cap mr-1" aria-hidden="true"></i> Tutorial</span>
          <h2 class="section-title mb-4">Como Usar em 3 Passos Simples</h2>
          <p class="section-subtitle">Analise e compare textos em segundos — sem complicação.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(step, i) in steps" :key="i" class="text-center relative">
            <div
              v-if="i < steps.length - 1"
              class="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-300 to-primary-100 dark:from-primary-700 dark:to-primary-900"
            ></div>
            <div
              class="relative z-10 w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-elegant"
            >
              {{ i + 1 }}
            </div>
            <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">{{ step.title }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
              {{ step.description }}
            </p>
          </div>
        </div>
        <div class="text-center mt-12">
          <router-link to="/ferramenta" class="btn-primary text-lg px-8 py-4">
            <i class="fa-solid fa-play" aria-hidden="true"></i> Experimentar Agora
          </router-link>
        </div>
      </div>
    </section>

    <!-- ===================== CASOS DE USO ===================== -->
    <section id="casos" class="py-16 md:py-24 bg-white dark:bg-slate-900 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="badge badge-primary mb-4"><i class="fa-solid fa-users mr-1" aria-hidden="true"></i> Para quem é</span>
          <h2 class="section-title mb-4">Exemplos de Uso</h2>
          <p class="section-subtitle">Descubra como profissionais de diversas áreas usam o Analisador de Texto</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(useCase, i) in useCases" :key="i" class="card p-5 text-center">
            <div
              class="w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center mx-auto mb-4"
              :class="useCase.gradient"
            >
              <i :class="useCase.icon" class="text-white text-xl" aria-hidden="true"></i>
            </div>
            <h3 class="font-semibold text-slate-800 dark:text-white mb-2 text-sm">{{ useCase.title }}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ useCase.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== BENEFÍCIOS ===================== -->
    <section id="beneficios" class="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="badge badge-success mb-4"><i class="fa-solid fa-check mr-1" aria-hidden="true"></i> Vantagens</span>
          <h2 class="section-title mb-4">Por que Escolher Nosso Analisador?</h2>
          <p class="section-subtitle">Benefícios reais que fazem a diferença no seu dia a dia</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <div v-for="(benefit, i) in benefits" :key="i" class="flex items-start gap-4 p-4 card">
            <div
              class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center shrink-0"
            >
              <i :class="benefit.icon" class="text-green-600 dark:text-green-400 text-sm" aria-hidden="true"></i>
            </div>
            <div>
              <h3 class="font-semibold text-slate-800 dark:text-white mb-1 text-sm">{{ benefit.title }}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== DICAS ===================== -->
    <section id="dicas" class="py-16 md:py-24 bg-white dark:bg-slate-900 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="badge badge-warning mb-4"><i class="fa-solid fa-lightbulb mr-1" aria-hidden="true"></i> Dicas</span>
          <h2 class="section-title mb-4">Dicas para Aproveitar ao Máximo</h2>
          <p class="section-subtitle">Truques e orientações para usar a ferramenta com maestria</p>
        </div>
        <div class="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div v-for="(tip, i) in tips" :key="i" class="card p-5 flex items-start gap-4">
            <div
              class="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center shrink-0"
            >
              <span class="text-amber-700 dark:text-amber-400 text-xs font-bold">{{ i + 1 }}</span>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{{ tip }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== SOBRE ===================== -->
    <section id="sobre" class="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50 scroll-mt-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="badge badge-primary mb-4"><i class="fa-solid fa-circle-info mr-1" aria-hidden="true"></i> Sobre</span>
          <h2 class="section-title mb-4">Sobre o Analisador de Texto</h2>
          <p class="section-subtitle">
            Ferramenta gratuita que facilita a análise e comparação de textos com total privacidade
          </p>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="card p-6 md:p-8">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <div class="w-9 h-9 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <i class="fa-solid fa-bullseye text-primary-600 dark:text-primary-400 text-sm" aria-hidden="true"></i>
              </div>
              O que é?
            </h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              O <strong>Analisador de Texto</strong> é uma ferramenta online gratuita para profissionais, estudantes
              e qualquer pessoa que trabalha com textos. Conte caracteres, palavras, sentenças, parágrafos e linhas,
              compare dois textos lado a lado, aplique filtros inteligentes e importe arquivos .txt — ideal para
              redatores, SEO, estudantes e tradutores.
            </p>
          </div>
          <div class="card p-6 md:p-8">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <div class="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <i class="fa-solid fa-shield-halved text-green-600 dark:text-green-400 text-sm" aria-hidden="true"></i>
              </div>
              Privacidade e Segurança
            </h3>
            <div class="grid gap-2">
              <div
                v-for="item in privacyItems"
                :key="item"
                class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 p-2.5 bg-green-50 dark:bg-green-900/10 rounded-lg"
              >
                <i class="fa-solid fa-check-circle text-green-500" aria-hidden="true"></i> {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="card p-6 md:p-8 mt-6">
          <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <div class="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-microchip text-purple-600 dark:text-purple-400 text-sm" aria-hidden="true"></i>
            </div>
            Tecnologias Utilizadas
          </h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in technologies" :key="tech" class="badge badge-primary px-3 py-1.5">{{ tech }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== SERVIÇOS 3W ===================== -->
    <section id="servicos" class="py-16 md:py-24 bg-white dark:bg-slate-900 scroll-mt-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="badge badge-primary mb-4"><i class="fa-solid fa-briefcase mr-1" aria-hidden="true"></i> Serviços</span>
          <h2 class="section-title mb-4">Grupo 3W Online — Sites e Sistemas sob Demanda</h2>
          <p class="section-subtitle">
            Transformamos ideias em soluções digitais de alta performance, com foco em qualidade, segurança e
            resultados reais.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="service in services"
            :key="service"
            class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 card p-3"
          >
            <i class="fa-solid fa-check text-green-500 text-xs shrink-0" aria-hidden="true"></i>
            {{ service }}
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== CTA PRINCIPAL ===================== -->
    <section
      class="py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden"
    >
      <div class="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Pronto para analisar seus textos?</h2>
        <p class="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Nossa ferramenta é completamente gratuita, não requer cadastro e seus dados ficam 100% seguros no seu
          navegador. Comece agora.
        </p>
        <router-link
          to="/ferramenta"
          class="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg"
        >
          <i class="fa-solid fa-play" aria-hidden="true"></i> Usar Ferramenta Grátis
        </router-link>
      </div>
    </section>

    <!-- ===================== CONTATO ===================== -->
    <section id="contato" class="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50 scroll-mt-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="badge badge-primary mb-4"><i class="fa-solid fa-envelope mr-1" aria-hidden="true"></i> Contato</span>
          <h2 class="section-title mb-4">Vamos construir algo incrível juntos?</h2>
          <p class="section-subtitle">
            Seja um site institucional, e-commerce, sistema de gestão ou aplicação web personalizada — o
            <strong>Grupo 3W Online</strong> desenvolve a solução ideal para o seu negócio.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 gap-4 mb-8">
          <a
            href="https://wa.me/5541996924829"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl hover:shadow-md transition-all group"
          >
            <div
              class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
            >
              <i class="fa-brands fa-whatsapp text-white text-xl" aria-hidden="true"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400">WhatsApp</p>
              <p class="font-semibold text-slate-800 dark:text-white">(41) 99692-4829</p>
            </div>
          </a>
          <a
            href="mailto:contato@3wonline.com.br"
            class="flex items-center gap-4 p-5 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl hover:shadow-md transition-all group"
          >
            <div
              class="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
            >
              <i class="fa-solid fa-envelope text-white text-xl" aria-hidden="true"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400">E-mail</p>
              <p class="font-semibold text-slate-800 dark:text-white">contato@3wonline.com.br</p>
            </div>
          </a>
        </div>
        <div class="text-center">
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary text-lg px-8 py-4"
          >
            <i class="fa-solid fa-rocket" aria-hidden="true"></i> Solicite seu Projeto
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const trustBadges = [
  { icon: 'fa-solid fa-shield-halved', label: 'Processamento local' },
  { icon: 'fa-solid fa-lock', label: 'LGPD · GDPR' },
  { icon: 'fa-solid fa-bolt', label: 'Resultados instantâneos' },
  { icon: 'fa-solid fa-mobile-screen', label: 'Responsivo' }
]

const features = [
  { icon: 'fa-solid fa-chart-bar', title: 'Análise Completa', description: 'Conte caracteres, palavras, sentenças, parágrafos e linhas com precisão absoluta em tempo real.' },
  { icon: 'fa-solid fa-filter', title: 'Filtros Inteligentes', description: 'Ignore espaços, pontuação ou números para obter contagens específicas conforme sua necessidade.' },
  { icon: 'fa-solid fa-code-compare', title: 'Comparação Detalhada', description: 'Compare dois textos e veja diferenças percentuais em cada métrica instantaneamente.' },
  { icon: 'fa-solid fa-file-arrow-up', title: 'Upload de Arquivos', description: 'Carregue arquivos .txt diretamente para análise — sem precisar copiar e colar textos longos.' },
  { icon: 'fa-solid fa-shield-halved', title: 'Privacidade Total', description: 'Seus textos são processados localmente no navegador. Zero dados enviados para servidores externos.' },
  { icon: 'fa-solid fa-bolt', title: 'Velocidade Instantânea', description: 'Resultados em milissegundos. Processamento otimizado para textos de qualquer tamanho.' }
]

const steps = [
  { title: 'Cole ou importe seu texto', description: 'Insira o texto no campo ou faça upload de um arquivo .txt do seu computador.' },
  { title: 'Configure os filtros', description: 'Escolha se deseja ignorar espaços, pontuação ou números para uma contagem mais precisa.' },
  { title: 'Veja os resultados', description: 'Clique em "Analisar" e veja todas as métricas. Compare dois textos para ver diferenças.' }
]

const useCases = [
  { icon: 'fa-solid fa-pen-fancy', title: 'Redatores', description: 'Verifique limites de caracteres para títulos, meta descriptions e posts em redes sociais.', gradient: 'from-blue-500 to-blue-700' },
  { icon: 'fa-solid fa-graduation-cap', title: 'Estudantes', description: 'Confira a contagem de palavras para trabalhos acadêmicos e redações.', gradient: 'from-purple-500 to-purple-700' },
  { icon: 'fa-solid fa-magnifying-glass-chart', title: 'Profissionais de SEO', description: 'Otimize o tamanho de títulos, descrições e conteúdos para melhor ranqueamento.', gradient: 'from-green-500 to-green-700' },
  { icon: 'fa-solid fa-language', title: 'Tradutores', description: 'Compare versões originais e traduzidas para verificar consistência textual.', gradient: 'from-orange-500 to-orange-700' }
]

const benefits = [
  { icon: 'fa-solid fa-gift', title: 'Totalmente gratuito', description: 'Sem custos, sem limites, sem cadastro. Use quando e quanto quiser.' },
  { icon: 'fa-solid fa-lock', title: 'Privacidade garantida', description: 'Processamento local — seus textos nunca saem do navegador.' },
  { icon: 'fa-solid fa-gauge-high', title: 'Resultados instantâneos', description: 'Análise em tempo real sem esperar carregamentos.' },
  { icon: 'fa-solid fa-mobile-screen', title: 'Mobile-first', description: 'Interface responsiva que funciona perfeitamente em qualquer dispositivo.' },
  { icon: 'fa-solid fa-palette', title: 'Tema claro e escuro', description: 'Escolha o tema que preferir ou use o automático do sistema.' },
  { icon: 'fa-solid fa-universal-access', title: 'Acessível', description: 'Projetado com acessibilidade para todos os usuários.' }
]

const tips = [
  'Use os filtros para contagens mais precisas. Por exemplo, ignore espaços ao contar caracteres para redes sociais.',
  'Faça upload de arquivos .txt para analisar textos longos sem copiar e colar manualmente.',
  'Compare duas versões de um mesmo texto para verificar diferenças após edições ou revisões.',
  'A ferramenta funciona offline após o primeiro carregamento — ideal para locais sem internet.',
  'Para SEO, verifique se seus títulos têm entre 50-60 caracteres e descriptions entre 150-160.',
  'Use a comparação para detectar perda ou adição de conteúdo durante traduções.'
]

const privacyItems = [
  'Processamento 100% local (no navegador)',
  'Nenhum dado enviado para servidores',
  'Conformidade com LGPD, GDPR, CCPA e POPIA',
  'Sem cadastro ou login necessário'
]

const technologies = ['Vue.js 3', 'Vite 5', 'TypeScript', 'Tailwind CSS 3', 'Pinia', 'vue-i18n', 'HTML5', 'CSS3']

const services = [
  'Sites Institucionais',
  'E-commerce e Lojas Virtuais',
  'Sistemas de Gestão (ERP/CRM)',
  'Aplicações Web Personalizadas',
  'Landing Pages de Alta Conversão',
  'APIs e Integrações',
  'Consultoria Digital e Estratégia',
  'Manutenção e Suporte Contínuo'
]
</script>
