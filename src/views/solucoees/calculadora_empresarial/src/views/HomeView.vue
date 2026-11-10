<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-16 lg:py-28 overflow-hidden">
      <div class="absolute inset-0 gradient-hero opacity-5"></div>
      <div class="absolute top-20 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium">
            <i class="fa-solid fa-star"></i>
            100% Gratuito • Sem Cadastro • Ilimitado
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Calculadoras Profissionais para
            <span class="gradient-text block mt-2">Empreendedores Inteligentes</span>
          </h1>

          <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Ferramentas gratuitas para calcular preços, orçamentos, juros e muito mais.
            Tome decisões financeiras mais inteligentes e aumente sua lucratividade.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <router-link to="/calculadoras" class="btn-primary text-lg px-8 py-3.5">
              <i class="fa-solid fa-calculator mr-2"></i>
              Começar Agora
              <i class="fa-solid fa-arrow-right ml-2"></i>
            </router-link>
            <router-link to="/sobre" class="btn-secondary text-lg px-8 py-3.5">
              Saiba Mais
            </router-link>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-6 lg:gap-10 pt-8 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-users text-primary-600"></i>
              <span><strong class="text-gray-900 dark:text-white">+10.000</strong> usuários</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-star text-yellow-400"></i>
              <span><strong class="text-gray-900 dark:text-white">4.9/5</strong> avaliação</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-calculator text-secondary-500"></i>
              <span><strong class="text-gray-900 dark:text-white">19+</strong> calculadoras</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800/50">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="feature in features" :key="feature.title" class="card-hover text-center p-6">
            <div class="gradient-hero rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <i :class="feature.icon" class="text-white text-xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculadoras em Destaque -->
    <section id="ferramentas" class="py-16 lg:py-20 scroll-mt-24">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="fa-solid fa-bolt"></i>
            Mais Populares
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Calculadoras em Destaque
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ferramentas essenciais para empreendedores tomarem decisões financeiras inteligentes
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="calc in calculators" :key="calc.path" class="card-hover group p-6 text-center">
            <div :class="`bg-gradient-to-br ${calc.color} rounded-2xl p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform`">
              <i :class="calc.icon" class="text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ calc.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">{{ calc.description }}</p>
            <router-link
              :to="calc.path"
              class="block w-full btn-outline text-sm py-2.5 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600"
            >
              Usar Calculadora
              <i class="fa-solid fa-arrow-right ml-2"></i>
            </router-link>
          </div>
        </div>

        <div class="text-center mt-10">
          <router-link to="/calculadoras" class="btn-primary text-lg px-8 py-3">
            Ver Todas as 19+ Calculadoras
            <i class="fa-solid fa-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Como Usar / Instruções -->
    <section class="py-16 lg:py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="fa-solid fa-list-check"></i>
            Simples de usar
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comece em 3 passos
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sem cadastro, sem instalação. Resultados na hora, direto no seu navegador.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div v-for="(passo, i) in passos" :key="passo.titulo" class="card p-6 text-center relative">
            <div class="gradient-hero absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ i + 1 }}
            </div>
            <i :class="passo.icon" class="text-primary-600 dark:text-primary-400 text-3xl mt-4 mb-3"></i>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ passo.titulo }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ passo.descricao }}</p>
          </div>
        </div>
        <div class="mt-10 bg-secondary-50 dark:bg-secondary-900/10 border border-secondary-200 dark:border-secondary-800 rounded-2xl p-6 max-w-3xl mx-auto flex items-start gap-4">
          <i class="fa-solid fa-lightbulb text-secondary-500 text-xl mt-1"></i>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Dica de especialista</h4>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Cada calculadora traz orientações e exemplos de uso. Combine ferramentas — por exemplo, calcule o
              <router-link to="/calculadora-hora" class="text-primary-600 dark:text-primary-400 hover:underline">valor da sua hora</router-link>
              e use-o na
              <router-link to="/calculadora-projeto" class="text-primary-600 dark:text-primary-400 hover:underline">precificação de projetos</router-link>
              para orçamentos mais precisos.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefícios -->
    <section id="beneficios" class="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/50 scroll-mt-24">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium">
              <i class="fa-solid fa-award"></i>
              Por que nos escolher?
            </div>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Ferramentas que realmente fazem a diferença
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Desenvolvidas por especialistas em gestão empresarial, nossas calculadoras
              oferecem precisão, confiabilidade e insights valiosos para o crescimento
              do seu negócio.
            </p>
            <div class="grid gap-3">
              <div v-for="benefit in benefits" :key="benefit" class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <i class="fa-solid fa-circle-check text-green-500 flex-shrink-0"></i>
                <span class="text-gray-900 dark:text-white text-sm">{{ benefit }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="card p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-primary-100 dark:bg-primary-900/30 rounded-xl p-3">
                  <i class="fa-solid fa-award text-primary-600 dark:text-primary-400 text-2xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 dark:text-white">Ferramentas Validadas</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Por especialistas em gestão</p>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Todas as fórmulas e cálculos são baseados em metodologias
                reconhecidas no mercado financeiro e empresarial brasileiro.
              </p>
            </div>
            <div class="card p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-secondary-100 dark:bg-secondary-900/30 rounded-xl p-3">
                  <i class="fa-solid fa-shield-halved text-secondary-500 text-2xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 dark:text-white">Privacidade LGPD</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Seus dados são seguros</p>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Seus dados são processados localmente no navegador e nunca
                são enviados aos nossos servidores. Total privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sobre -->
    <section id="sobre" class="py-16 lg:py-20 scroll-mt-24">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="fa-solid fa-users"></i>
            Quem somos
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simplificando a gestão financeira para todos
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A Calculadora Empresarial nasceu da necessidade real de empreendedores por ferramentas
            acessíveis e confiáveis. Desenvolvida pelo <strong class="text-gray-900 dark:text-white">Grupo 3W Online</strong>,
            reúne calculadoras validadas por especialistas em gestão e finanças.
          </p>
        </div>

        <!-- Estatísticas -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          <div v-for="stat in estatisticas" :key="stat.label" class="card text-center p-6">
            <p class="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{{ stat.numero }}</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Diferenciais -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div v-for="item in diferenciais" :key="item" class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <i class="fa-solid fa-circle-check text-green-500 flex-shrink-0"></i>
            <span class="text-gray-900 dark:text-white text-sm">{{ item }}</span>
          </div>
        </div>

        <div class="text-center mt-10">
          <router-link to="/sobre" class="btn-outline">
            Conheça nossa história completa
            <i class="fa-solid fa-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Depoimentos -->
    <section class="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="fa-solid fa-star"></i>
            Depoimentos
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            O que dizem nossos usuários
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Milhares de empreendedores já transformaram seus negócios com nossas ferramentas
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="card-hover p-6">
            <div class="flex items-center gap-1 mb-4">
              <i v-for="n in testimonial.rating" :key="n" class="fa-solid fa-star text-yellow-400 text-sm"></i>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-6 italic leading-relaxed">
              "{{ testimonial.comment }}"
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 gradient-hero rounded-full flex items-center justify-center text-white font-bold text-lg">
                {{ testimonial.avatar }}
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Serviços 3W Online (empresa desenvolvedora) -->
    <section id="servicos" class="py-16 lg:py-20 scroll-mt-24">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="fa-solid fa-code"></i>
            Grupo 3W Online
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sites e sistemas personalizados sob demanda
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Gostou dessas ferramentas? Elas foram desenvolvidas pelo Grupo 3W Online.
            Criamos soluções digitais sob medida para transformar o seu negócio.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div v-for="servico in servicos" :key="servico.titulo" class="card-hover p-6 text-center">
            <div class="gradient-hero rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <i :class="servico.icon" class="text-white text-xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ servico.titulo }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ servico.descricao }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 3W Online -->
    <section class="py-16 gradient-hero">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto space-y-6">
          <i class="fa-solid fa-rocket text-white/80 text-5xl"></i>
          <h2 class="text-3xl lg:text-4xl font-bold text-white">
            Sua ideia merece uma solução digital de verdade
          </h2>
          <p class="text-xl text-white/80">
            Chega de improviso. O Grupo 3W Online transforma sua visão em um site ou sistema
            profissional, rápido e seguro. Solicite um orçamento sem compromisso e saia na frente da concorrência.
          </p>
          <div class="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors"
            >
              <i class="fa-solid fa-globe"></i>
              Quero meu projeto
            </a>
            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              <i class="fa-brands fa-whatsapp"></i>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Contato -->
    <section id="contato" class="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/50 scroll-mt-24">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="fa-solid fa-envelope"></i>
            Fale Conosco
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vamos conversar sobre o seu projeto
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Precisa de um site ou sistema personalizado? O <strong class="text-gray-900 dark:text-white">Grupo 3W Online</strong>
            desenvolve soluções digitais sob demanda. Fale direto com a gente pelos canais abaixo.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="card p-8 text-center hover:shadow-lg transition-shadow group">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <i class="fa-brands fa-whatsapp text-3xl text-green-600 dark:text-green-400"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">WhatsApp</h3>
            <p class="text-green-600 dark:text-green-400 font-medium text-lg mb-1">{{ empresa.whatsappDisplay }}</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Atendimento rápido e personalizado</p>
          </a>

          <a :href="`mailto:${empresa.email}`" class="card p-8 text-center hover:shadow-lg transition-shadow group">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-envelope text-3xl text-primary-600 dark:text-primary-400"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">E-mail</h3>
            <p class="text-primary-600 dark:text-primary-400 font-medium text-lg mb-1">{{ empresa.email }}</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Resposta em até 24h úteis</p>
          </a>
        </div>

        <div class="text-center mt-8">
          <router-link to="/contato" class="btn-outline">
            Ver todas as informações de contato
            <i class="fa-solid fa-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto space-y-6">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Pronto para otimizar seu negócio?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            Acesse todas as calculadoras gratuitamente e tome decisões mais inteligentes
            para aumentar sua lucratividade.
          </p>
          <router-link to="/calculadoras" class="btn-primary text-lg px-8 py-3.5 inline-flex">
            <i class="fa-solid fa-calculator mr-2"></i>
            Começar Agora - É Grátis!
            <i class="fa-solid fa-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSeo, faqJsonLd } from '@/composables/useSeo'
import { WHATSAPP_LINK, SITE } from '@/config/site'

const empresa = SITE.company

useSeo({
  title: 'Calculadoras Empresariais Gratuitas',
  description:
    'Mais de 19 calculadoras profissionais e gratuitas para precificar produtos e serviços, calcular juros, orçamentos e valor da hora. Tome decisões financeiras inteligentes.',
  keywords:
    'calculadora empresarial gratis, precificação, calculadora de preços, valor da hora, orçamento freelancer, juros compostos, gestão financeira',
  jsonLd: faqJsonLd([
    {
      question: 'As calculadoras são realmente gratuitas?',
      answer:
        'Sim. Todas as calculadoras são 100% gratuitas, sem cadastro e sem limite de uso. Os cálculos são feitos localmente no seu navegador.'
    },
    {
      question: 'Meus dados ficam salvos em algum servidor?',
      answer:
        'Não. Os dados que você digita são processados apenas no seu navegador e nunca são enviados aos nossos servidores, garantindo total privacidade (LGPD).'
    },
    {
      question: 'Quais calculadoras estão disponíveis?',
      answer:
        'Oferecemos mais de 19 ferramentas, incluindo calculadoras de juros, preço de produto, valor da hora, orçamentos, precificação para freelancers, marketing digital e muito mais.'
    }
  ])
})

const features = [
  { icon: 'fa-solid fa-rocket', title: 'Rápido e Preciso', description: 'Resultados instantâneos com cálculos validados por especialistas' },
  { icon: 'fa-solid fa-chart-line', title: '+19 Ferramentas', description: 'Calculadoras para todas as necessidades do seu negócio' },
  { icon: 'fa-solid fa-lightbulb', title: 'Dicas Incluídas', description: 'Orientações profissionais para maximizar seus resultados' }
]

const calculators = [
  { title: 'Calculadora de Juros', description: 'Calcule juros compostos e simples para seus investimentos', icon: 'fa-solid fa-chart-line', path: '/calculadora-juros', color: 'from-blue-500 to-blue-600' },
  { title: 'Orçamento de Marketing', description: 'Planeje seu budget de marketing digital completo', icon: 'fa-solid fa-bullseye', path: '/calculadora-marketing', color: 'from-purple-500 to-purple-600' },
  { title: 'Preço de Produtos', description: 'Defina preços competitivos para seus produtos', icon: 'fa-solid fa-dollar-sign', path: '/calculadora-produto', color: 'from-green-500 to-green-600' },
  { title: 'Hora de Trabalho', description: 'Calcule o valor da sua hora profissional', icon: 'fa-solid fa-clock', path: '/calculadora-hora', color: 'from-orange-500 to-orange-600' }
]

const benefits = [
  'Calculadoras profissionais validadas por especialistas',
  'Interface intuitiva e 100% responsiva',
  'Resultados precisos e detalhados em segundos',
  'Dicas de especialistas incluídas em cada ferramenta',
  'Acesso gratuito e ilimitado - sem cadastro',
  'Conformidade com LGPD - seus dados são seguros'
]

const testimonials = [
  { name: 'Maria Silva', role: 'Empreendedora', comment: 'As calculadoras me ajudaram a precificar meus produtos corretamente e aumentar minha margem de lucro em 30%!', rating: 5, avatar: 'M' },
  { name: 'João Santos', role: 'Consultor Financeiro', comment: 'Ferramenta indispensável para calcular o valor da hora e fazer orçamentos precisos para meus clientes.', rating: 5, avatar: 'J' },
  { name: 'Ana Costa', role: 'Freelancer', comment: 'Finalmente consegui cobrar o valor justo pelo meu trabalho. Recomendo para todos os autônomos!', rating: 5, avatar: 'A' }
]

const passos = [
  { icon: 'fa-solid fa-hand-pointer', titulo: 'Escolha a calculadora', descricao: 'Selecione a ferramenta ideal entre mais de 19 opções especializadas.' },
  { icon: 'fa-solid fa-keyboard', titulo: 'Preencha os dados', descricao: 'Informe os valores nos campos, com dicas e exemplos ao lado de cada um.' },
  { icon: 'fa-solid fa-circle-check', titulo: 'Veja o resultado', descricao: 'Receba o cálculo detalhado na hora e tome decisões com segurança.' }
]

const servicos = [
  { icon: 'fa-solid fa-globe', titulo: 'Sites Institucionais', descricao: 'Presença digital profissional e otimizada para conversão.' },
  { icon: 'fa-solid fa-cart-shopping', titulo: 'E-commerce', descricao: 'Lojas virtuais completas para vender online com segurança.' },
  { icon: 'fa-solid fa-gears', titulo: 'Sistemas Web', descricao: 'Aplicações sob medida para automatizar o seu negócio.' },
  { icon: 'fa-solid fa-mobile-screen', titulo: 'Apps e Integrações', descricao: 'Aplicativos e integrações que conectam suas ferramentas.' }
]

const estatisticas = [
  { numero: '+10.000', label: 'Usuários ativos' },
  { numero: '19+', label: 'Calculadoras' },
  { numero: '4.9', label: 'Avaliação média' },
  { numero: '24/7', label: 'Disponibilidade' }
]

const diferenciais = [
  'Mais de 19 calculadoras especializadas',
  'Interface intuitiva e responsiva',
  '100% gratuito e sem limitações',
  'Resultados precisos e confiáveis',
  'Dicas de especialistas em cada ferramenta',
  'Suporte para modo escuro',
  'Otimizado para dispositivos móveis',
  'Conformidade com LGPD'
]

const whatsappLink = `${WHATSAPP_LINK}?text=${encodeURIComponent('Olá! Vim pela Calculadora Empresarial e quero um orçamento.')}`
</script>
