<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-12 lg:py-16 overflow-hidden">
      <div class="absolute inset-0 gradient-hero opacity-5"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <i class="fa-solid fa-star"></i>
            19+ Ferramentas Gratuitas
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Todas as Calculadoras
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Ferramentas profissionais para calcular preços, orçamentos, juros e tomar
            decisões financeiras inteligentes para seu negócio.
          </p>

          <!-- Search -->
          <div class="max-w-md mx-auto relative">
            <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              v-model="searchTerm"
              type="text"
              autocomplete="off"
              placeholder="Pesquisar calculadoras..."
              class="input-field pl-12 pr-4 py-4 text-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Calculadoras por categoria -->
    <section class="py-8 lg:py-12">
      <div class="container mx-auto px-4">
        <div class="grid gap-12">
          <div v-for="category in categories" :key="category" class="space-y-6">
            <div class="flex items-center gap-4">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ category }}</h2>
              <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <span class="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                {{ filteredByCategory(category).length }} ferramentas
              </span>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="calc in filteredByCategory(category)"
                :key="calc.path"
                class="card-hover group p-6"
              >
                <div class="flex items-start gap-4 mb-4">
                  <div :class="`bg-gradient-to-br ${calc.color} rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform`">
                    <i :class="calc.icon" class="text-white text-lg"></i>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{{ calc.title }}</h3>
                    <span class="badge bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{{ calc.category }}</span>
                  </div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ calc.description }}</p>
                <router-link :to="calc.path" class="block w-full btn-primary text-sm py-2.5 text-center">
                  Usar Calculadora
                  <i class="fa-solid fa-arrow-right ml-2"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredCalculators.length === 0" class="text-center py-16">
          <i class="fa-solid fa-search text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Nenhuma calculadora encontrada
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Tente buscar por outro termo ou explore todas as categorias
          </p>
          <button @click="searchTerm = ''" class="btn-outline text-sm">
            Limpar Pesquisa
          </button>
        </div>

        <!-- Help Section -->
        <div class="mt-16">
          <div class="gradient-hero rounded-2xl p-8 text-center max-w-3xl mx-auto">
            <i class="fa-solid fa-circle-question text-white/80 text-4xl mb-4"></i>
            <h3 class="text-2xl font-bold text-white mb-4">Precisa de Ajuda?</h3>
            <p class="mb-6 text-white/80">
              Confira nossas dicas e instruções detalhadas para usar cada calculadora e
              maximizar seus resultados.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link to="/contato" class="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
                Fale Conosco
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Todas as Calculadoras',
  description:
    'Explore mais de 19 calculadoras profissionais gratuitas: juros, preço de produto, valor da hora, orçamentos, precificação de serviços, marketing digital e freelancers.',
  keywords:
    'calculadoras online gratis, precificação, calculadora de juros, orçamento, valor da hora, freelancer, marketing digital'
})

const searchTerm = ref('')

const allCalculators = [
  { title: 'Calculadora de Juros', description: 'Calcule juros compostos e simples para investimentos e financiamentos', icon: 'fa-solid fa-chart-line', path: '/calculadora-juros', category: 'Financeiro', color: 'from-blue-500 to-blue-600' },
  { title: 'Orçamento de Marketing', description: 'Planeje seu budget completo de marketing digital e redes sociais', icon: 'fa-solid fa-bullseye', path: '/calculadora-marketing', category: 'Marketing', color: 'from-purple-500 to-purple-600' },
  { title: 'Orçamento Geral', description: 'Crie orçamentos detalhados para produtos e serviços', icon: 'fa-solid fa-calculator', path: '/calculadora-orcamento', category: 'Vendas', color: 'from-indigo-500 to-indigo-600' },
  { title: 'Orçamento de Site', description: 'Calcule custos para desenvolvimento de sites e sistemas', icon: 'fa-solid fa-globe', path: '/calculadora-site', category: 'Tecnologia', color: 'from-cyan-500 to-cyan-600' },
  { title: 'Calculadora de Parcelas', description: 'Simule parcelamentos por quantidade ou valor das parcelas', icon: 'fa-solid fa-credit-card', path: '/calculadora-parcelas', category: 'Financeiro', color: 'from-emerald-500 to-emerald-600' },
  { title: 'Preço Hora de Trabalho', description: 'Defina o valor da sua hora profissional baseado em custos', icon: 'fa-solid fa-clock', path: '/calculadora-hora', category: 'Consultoria', color: 'from-orange-500 to-orange-600' },
  { title: 'Preço de Produto', description: 'Calcule preços de venda considerando custos e margem', icon: 'fa-solid fa-box', path: '/calculadora-produto', category: 'Vendas', color: 'from-green-500 to-green-600' },
  { title: 'Preço de Projeto', description: 'Estime custos de projetos baseado em horas e recursos', icon: 'fa-solid fa-briefcase', path: '/calculadora-projeto', category: 'Consultoria', color: 'from-amber-500 to-amber-600' },
  { title: 'Preço de Serviço', description: 'Defina preços para prestação de serviços', icon: 'fa-solid fa-users', path: '/calculadora-servico', category: 'Serviços', color: 'from-teal-500 to-teal-600' },
  { title: 'Calculadora de Salário', description: 'Calcule salário líquido com impostos e gratificações', icon: 'fa-solid fa-wallet', path: '/calculadora-salario', category: 'RH', color: 'from-rose-500 to-rose-600' },
  { title: 'Trabalho Autônomo', description: 'Calcule custos e preços para trabalho autônomo', icon: 'fa-solid fa-chart-pie', path: '/calculadora-autonomo', category: 'Freelancer', color: 'from-violet-500 to-violet-600' },
  { title: 'Videomaker', description: 'Calcule preços para produção de vídeos, edição e motion graphics', icon: 'fa-solid fa-video', path: '/calculadora-videomaker', category: 'Criativo', color: 'from-red-500 to-red-600' },
  { title: 'Web Designer', description: 'Defina preços para projetos de design web e interfaces digitais', icon: 'fa-solid fa-palette', path: '/calculadora-web-designer', category: 'Design', color: 'from-pink-500 to-pink-600' },
  { title: 'Web Developer', description: 'Calcule preços para desenvolvimento web e aplicações', icon: 'fa-solid fa-code', path: '/calculadora-web-developer', category: 'Tecnologia', color: 'from-slate-500 to-slate-600' },
  { title: 'Social Media', description: 'Preços para gestão de redes sociais e criação de conteúdo', icon: 'fa-solid fa-share-nodes', path: '/calculadora-social-media', category: 'Marketing', color: 'from-sky-500 to-sky-600' },
  { title: 'Gestor de Tráfego', description: 'Calcule custos para gestão de campanhas pagas e otimização', icon: 'fa-solid fa-arrow-pointer', path: '/calculadora-trafego', category: 'Marketing', color: 'from-lime-500 to-lime-600' },
  { title: 'Copywriter', description: 'Defina preços para textos publicitários e copywriting', icon: 'fa-solid fa-pen-nib', path: '/calculadora-copywriter', category: 'Marketing', color: 'from-fuchsia-500 to-fuchsia-600' },
  { title: 'Marketing Digital', description: 'Calcule investimentos e retorno em marketing digital', icon: 'fa-solid fa-bullhorn', path: '/calculadora-marketing-digital', category: 'Marketing', color: 'from-yellow-500 to-yellow-600' },
  { title: 'Influencer', description: 'Defina preços para colaborações e conteúdo patrocinado', icon: 'fa-solid fa-star', path: '/calculadora-influencer', category: 'Marketing', color: 'from-amber-400 to-orange-500' }
]

const filteredCalculators = computed(() => {
  if (!searchTerm.value) return allCalculators
  const term = searchTerm.value.toLowerCase()
  return allCalculators.filter(calc =>
    calc.title.toLowerCase().includes(term) ||
    calc.description.toLowerCase().includes(term) ||
    calc.category.toLowerCase().includes(term)
  )
})

const categories = computed(() => {
  return [...new Set(filteredCalculators.value.map(c => c.category))]
})

function filteredByCategory(category) {
  return filteredCalculators.value.filter(c => c.category === category)
}
</script>
