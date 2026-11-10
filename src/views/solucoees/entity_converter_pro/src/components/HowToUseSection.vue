<script setup>
const steps = [
  {
    number: 1,
    color: 'blue',
    icon: 'fas fa-paste',
    title: 'Cole seu Texto',
    description: 'Insira ou cole o texto contendo caracteres especiais, acentos ou símbolos na área de entrada.'
  },
  {
    number: 2,
    color: 'green',
    icon: 'fas fa-magic',
    title: 'Clique em Converter',
    description: 'Pressione o botão "Converter Texto" e a mágica acontece instantaneamente.'
  },
  {
    number: 3,
    color: 'purple',
    icon: 'fas fa-check-circle',
    title: 'Aceite os Termos',
    description: 'Marque o checkbox aceitando os Termos de Uso e Política de Privacidade.'
  },
  {
    number: 4,
    color: 'yellow',
    icon: 'fas fa-copy',
    title: 'Copie o Resultado',
    description: 'Copie o código HTML Entities gerado e use diretamente no seu projeto.'
  }
]

const tips = [
  {
    icon: 'fas fa-lightbulb',
    title: 'Use para E-mails',
    description: 'Evite problemas de exibição em clientes de e-mail que não suportam UTF-8.'
  },
  {
    icon: 'fas fa-code',
    title: 'Compatibilidade HTML',
    description: 'Garanta que caracteres especiais sejam exibidos corretamente em qualquer navegador.'
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Previna XSS',
    description: 'Entities HTML ajudam a prevenir vulnerabilidades de Cross-Site Scripting.'
  }
]
</script>

<template>
  <section id="como-usar" class="py-16 md:py-24 bg-white dark:bg-gray-900">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <span class="inline-block bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          <i class="fas fa-play-circle mr-2"></i> Passo a Passo
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Como Usar a Ferramenta
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Em apenas 4 passos simples, você terá seu texto convertido profissionalmente
        </p>
      </div>

      <!-- Steps -->
      <div class="relative">
        <!-- Connection Line (Desktop) -->
        <div class="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="step in steps" 
            :key="step.number"
            class="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
          >
            <!-- Number Badge -->
            <div :class="[
              'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 font-bold text-lg',
              step.color === 'blue' ? 'bg-blue-600 text-white' : '',
              step.color === 'green' ? 'bg-green-600 text-white' : '',
              step.color === 'purple' ? 'bg-purple-600 text-white' : '',
              step.color === 'yellow' ? 'bg-yellow-500 text-gray-900' : ''
            ]">
              {{ step.number }}
            </div>
            
            <!-- Icon -->
            <div :class="[
              'w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4',
              step.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' : '',
              step.color === 'green' ? 'bg-green-100 dark:bg-green-900' : '',
              step.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' : '',
              step.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' : ''
            ]">
              <i :class="[
                step.icon, 'text-2xl',
                step.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : '',
                step.color === 'green' ? 'text-green-600 dark:text-green-400' : '',
                step.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : '',
                step.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' : ''
              ]"></i>
            </div>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {{ step.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Tips -->
      <div class="mt-16">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
          Dicas de Uso
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="tip in tips" 
            :key="tip.title"
            class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <i :class="[tip.icon, 'text-yellow-600 dark:text-yellow-400']"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-1">{{ tip.title }}</h4>
                <p class="text-gray-600 dark:text-gray-400 text-sm">{{ tip.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
