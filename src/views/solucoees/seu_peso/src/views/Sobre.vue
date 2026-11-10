<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
          <i class="fas fa-heartbeat text-white text-4xl"></i>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Sobre o <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Seu Peso</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Sua ferramenta completa e gratuita para monitoramento inteligente da saúde corporal
        </p>
      </div>

      <!-- Funcionalidades -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <i class="fas fa-star text-yellow-500 mr-3"></i>
          Funcionalidades e Recursos
        </h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(feature, index) in features" :key="index" class="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i :class="feature.icon" class="text-blue-600 dark:text-blue-400"></i>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{{ feature.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Como Funciona -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
        <h2 class="text-3xl font-bold mb-8 text-center">Como Funciona</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl font-bold">1</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Insira seus Dados</h3>
            <p class="text-blue-100">Idade, altura, peso, sexo e nível de atividade física</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl font-bold">2</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Processamento Instantâneo</h3>
            <p class="text-blue-100">Cálculos baseados em fórmulas científicas validadas</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl font-bold">3</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Resultados Detalhados</h3>
            <p class="text-blue-100">Análises completas e recomendações personalizadas</p>
          </div>
        </div>

        <div class="mt-8 text-center">
          <router-link 
            to="/calculadora" 
            class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:scale-105"
          >
            <i class="fas fa-calculator mr-2"></i>
            Experimentar Agora - É Grátis!
          </router-link>
        </div>
      </div>

      <!-- Aviso Importante -->
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-2xl p-8 mb-12">
        <div class="flex items-start space-x-4">
          <i class="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400 text-3xl flex-shrink-0"></i>
          <div>
            <h3 class="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-3">Aviso Importante</h3>
            <p class="text-yellow-700 dark:text-yellow-400 leading-relaxed">
              Esta ferramenta fornece estimativas baseadas em fórmulas padrão e <strong>NÃO substitui o acompanhamento profissional</strong>. Sempre consulte médicos, nutricionistas ou educadores físicos para orientações personalizadas, especialmente se você tem condições de saúde específicas.
            </p>
          </div>
        </div>
      </div>

      <!-- Sobre o Grupo 3w Online -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
        <div class="flex items-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
            <i class="fas fa-building text-white text-2xl"></i>
          </div>
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Grupo 3w Online</h2>
            <p class="text-blue-600 dark:text-blue-400 font-medium">Desenvolvedora da Aplicação</p>
          </div>
        </div>

        <div class="prose prose-lg dark:prose-invert max-w-none mb-8">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            O <strong>Grupo 3w Online</strong> é uma empresa especializada no desenvolvimento de <strong>sites e sistemas personalizados sob demanda</strong>, oferecendo soluções tecnológicas inovadoras para empresas e projetos de todos os tamanhos.
          </p>
          
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Nossos Serviços</h3>
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <i class="fas fa-check-circle text-green-600 dark:text-green-400 mt-1"></i>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Desenvolvimento Web</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Sites institucionais, landing pages e portais</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <i class="fas fa-check-circle text-green-600 dark:text-green-400 mt-1"></i>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Sistemas Personalizados</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">ERPs, CRMs e soluções corporativas</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <i class="fas fa-check-circle text-green-600 dark:text-green-400 mt-1"></i>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">E-commerce</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Lojas virtuais completas e integradas</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <i class="fas fa-check-circle text-green-600 dark:text-green-400 mt-1"></i>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Aplicações Web</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Ferramentas e sistemas como o Seu Peso</p>
              </div>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Por Que Escolher a 3w Online?</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <i class="fas fa-star text-yellow-500 mr-3 mt-1"></i>
              <span class="text-gray-700 dark:text-gray-300"><strong>Expertise Técnica:</strong> Equipe especializada em tecnologias modernas</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-star text-yellow-500 mr-3 mt-1"></i>
              <span class="text-gray-700 dark:text-gray-300"><strong>Soluções Personalizadas:</strong> Cada projeto é único e feito sob medida</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-star text-yellow-500 mr-3 mt-1"></i>
              <span class="text-gray-700 dark:text-gray-300"><strong>Suporte Dedicado:</strong> Acompanhamento em todas as etapas do projeto</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-star text-yellow-500 mr-3 mt-1"></i>
              <span class="text-gray-700 dark:text-gray-300"><strong>Resultados Comprovados:</strong> Projetos de sucesso em diversos segmentos</span>
            </li>
          </ul>
        </div>

        <!-- CTA -->
        <div class="mt-8 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white text-center">
          <h3 class="text-2xl font-bold mb-3">Precisa de um Site ou Sistema Personalizado?</h3>
          <p class="text-blue-100 mb-6">Transforme sua ideia em realidade com a expertise do Grupo 3w Online</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.3wonline.com.br" 
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:scale-105"
            >
              <i class="fas fa-globe mr-2"></i>
              Visitar 3w Online
            </a>
            <router-link 
              to="/contato"
              class="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-all duration-200 border-2 border-white/30"
            >
              <i class="fas fa-envelope mr-2"></i>
              Solicitar Orçamento
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const features = ref([
  {
    icon: 'fas fa-calculator',
    title: 'Cálculo de IMC',
    description: 'Índice de Massa Corporal com interpretação detalhada e recomendações'
  },
  {
    icon: 'fas fa-fire',
    title: 'Metabolismo Basal',
    description: 'Taxa metabólica basal (TMB) calculada pelas fórmulas de Harris-Benedict'
  },
  {
    icon: 'fas fa-utensils',
    title: 'Necessidades Calóricas',
    description: 'Estimativa de calorias diárias baseada no seu nível de atividade'
  },
  {
    icon: 'fas fa-weight',
    title: 'Peso Ideal',
    description: 'Faixas de peso saudável calculadas por diferentes métodos científicos'
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Macronutrientes',
    description: 'Distribuição ideal de proteínas, carboidratos e gorduras'
  },
  {
    icon: 'fas fa-running',
    title: 'Gasto Calórico',
    description: 'Cálculo de calorias gastas por atividade física específica'
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Privacidade Total',
    description: 'Processamento local - seus dados nunca saem do seu dispositivo'
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Mobile First',
    description: 'Interface responsiva otimizada para todos os dispositivos'
  }
])
</script>
