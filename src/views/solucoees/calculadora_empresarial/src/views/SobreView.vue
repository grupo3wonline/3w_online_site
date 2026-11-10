<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-16 lg:py-24 overflow-hidden">
      <div class="absolute inset-0 gradient-hero opacity-5"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <i class="fa-solid fa-users"></i>
            Conheça a Calculadora Empresarial
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ferramentas que
            <span class="gradient-text"> transformam negócios</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            Desenvolvemos calculadoras profissionais para ajudar empreendedores,
            freelancers e gestores a tomarem decisões financeiras mais inteligentes
            e estratégicas.
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <router-link to="/calculadoras" class="btn-primary">
              Explorar Ferramentas
              <i class="fa-solid fa-arrow-right ml-2"></i>
            </router-link>
            <router-link to="/contato" class="btn-secondary">
              Fale Conosco
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Estatísticas -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800/50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="stat in estatisticas" :key="stat.label" class="card text-center p-6">
            <p class="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{{ stat.numero }}</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Nossa Missão -->
    <section class="py-16 lg:py-20">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div class="inline-flex items-center gap-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 px-4 py-2 rounded-full text-sm font-medium">
              <i class="fa-solid fa-bullseye"></i>
              Nossa Missão
            </div>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Simplificando a gestão financeira para todos
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              A Calculadora Empresarial nasceu da necessidade real de empreendedores
              que precisavam de ferramentas acessíveis e confiáveis para calcular
              preços, orçamentos e fazer projeções financeiras.
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Desenvolvida pelo <strong class="text-gray-900 dark:text-white">Grupo 3W Online</strong>, nossa plataforma
              oferece calculadoras validadas por especialistas em gestão e finanças,
              garantindo resultados precisos para suas decisões de negócio.
            </p>
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-medium">
              <i class="fa-solid fa-globe"></i>
              Conheça o Grupo 3W Online
              <i class="fa-solid fa-arrow-right text-sm"></i>
            </a>
          </div>
          <div class="grid gap-4">
            <div v-for="valor in valores" :key="valor.titulo" class="card-hover p-6 flex items-start gap-4">
              <div class="bg-primary-100 dark:bg-primary-900/30 rounded-xl p-3 flex-shrink-0">
                <i :class="valor.icon" class="text-primary-600 dark:text-primary-400 text-xl"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ valor.titulo }}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">{{ valor.descricao }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Diferenciais -->
    <section class="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i class="fa-solid fa-award"></i>
            Por que nos escolher?
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nossos Diferenciais</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Oferecemos muito mais do que simples calculadoras online</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div v-for="item in diferenciais" :key="item" class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <i class="fa-solid fa-circle-check text-green-500 flex-shrink-0"></i>
            <span class="text-gray-900 dark:text-white text-sm">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Grupo 3W Online -->
    <section class="py-16 lg:py-20">
      <div class="container mx-auto px-4">
        <div class="gradient-hero rounded-2xl p-8 lg:p-12">
          <div class="grid lg:grid-cols-2 gap-8 items-center">
            <div class="space-y-6">
              <div class="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white">
                <i class="fa-solid fa-bolt"></i>
                Desenvolvido por
              </div>
              <h3 class="text-3xl lg:text-4xl font-bold text-white">Grupo 3W Online</h3>
              <p class="text-white/80 text-lg leading-relaxed">
                Somos especialistas em desenvolvimento de sites e sistemas
                personalizados. Com anos de experiência, transformamos ideias
                em soluções digitais de sucesso.
              </p>
              <ul class="space-y-3">
                <li class="flex items-center gap-3 text-white"><i class="fa-solid fa-circle-check text-white/80"></i> Sites institucionais e e-commerces</li>
                <li class="flex items-center gap-3 text-white"><i class="fa-solid fa-circle-check text-white/80"></i> Sistemas web personalizados</li>
                <li class="flex items-center gap-3 text-white"><i class="fa-solid fa-circle-check text-white/80"></i> Aplicativos e integrações</li>
                <li class="flex items-center gap-3 text-white"><i class="fa-solid fa-circle-check text-white/80"></i> Consultoria em tecnologia</li>
              </ul>
            </div>
            <div class="text-center">
              <div class="bg-white/10 rounded-2xl p-8 backdrop-blur-sm inline-block">
                <i class="fa-solid fa-shield-halved text-white text-5xl mb-4"></i>
                <p class="text-white/80 mb-6">Transforme sua ideia em realidade digital</p>
                <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors w-full justify-center">
                  Solicitar Orçamento <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-2xl mx-auto space-y-6">
          <i class="fa-solid fa-heart text-primary-600 dark:text-primary-400 text-4xl"></i>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Pronto para otimizar seu negócio?</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">Comece agora mesmo a usar nossas calculadoras gratuitas e tome decisões mais inteligentes para sua empresa.</p>
          <router-link to="/calculadoras" class="btn-primary inline-flex">
            Começar Gratuitamente <i class="fa-solid fa-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Sobre Nós',
  description:
    'Conheça a Calculadora Empresarial, desenvolvida pelo Grupo 3W Online: ferramentas gratuitas e validadas por especialistas para empreendedores, freelancers e gestores.',
  keywords: 'sobre calculadora empresarial, grupo 3w online, ferramentas para empreendedores, gestão financeira'
})

const estatisticas = [
  { numero: '+10.000', label: 'Usuários ativos' },
  { numero: '19+', label: 'Calculadoras' },
  { numero: '4.9', label: 'Avaliação média' },
  { numero: '24/7', label: 'Disponibilidade' }
]

const valores = [
  { icon: 'fa-solid fa-lightbulb', titulo: 'Inovação', descricao: 'Buscamos constantemente novas soluções para facilitar a vida dos empreendedores' },
  { icon: 'fa-solid fa-handshake', titulo: 'Compromisso', descricao: 'Oferecemos ferramentas confiáveis e resultados precisos em todos os cálculos' },
  { icon: 'fa-solid fa-rocket', titulo: 'Acessibilidade', descricao: 'Democratizamos o acesso a ferramentas profissionais de gestão financeira' }
]

const diferenciais = [
  'Mais de 19 calculadoras especializadas',
  'Interface intuitiva e responsiva',
  '100% gratuito e sem limitações',
  'Resultados precisos e confiáveis',
  'Dicas de especialistas em cada ferramenta',
  'Suporte para dark mode',
  'Otimizado para dispositivos móveis',
  'Conformidade com LGPD'
]
</script>
