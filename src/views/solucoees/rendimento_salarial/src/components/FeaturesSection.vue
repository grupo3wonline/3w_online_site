<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Recursos da Ferramenta
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Nossa calculadora oferece recursos avançados para ajudar você a entender melhor seus ganhos
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div v-for="(feature, index) in features" :key="index" 
             class="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold mb-4">O que nossos usuários dizem</h3>
          <p class="text-blue-100 text-lg">Mais de 10.000 pessoas já usaram nossa calculadora</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index"
               class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="flex items-center mb-4">
              <div class="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span class="text-white font-bold">{{ testimonial.name.charAt(0) }}</span>
              </div>
              <div>
                <h4 class="font-semibold">{{ testimonial.name }}</h4>
                <p class="text-blue-100 text-sm">{{ testimonial.role }}</p>
              </div>
            </div>
            <p class="text-blue-50">"{{ testimonial.comment }}"</p>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="mt-16 bg-white rounded-2xl shadow-lg p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">
          📊 Estatísticas da Plataforma
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">10.000+</div>
            <p class="text-gray-600">Cálculos Realizados</p>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">98%</div>
            <p class="text-gray-600">Satisfação dos Usuários</p>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <p class="text-gray-600">Disponibilidade</p>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600 mb-2">100%</div>
            <p class="text-gray-600">Gratuito</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection',
  data() {
    return {
      features: [
        {
          icon: '⏱️',
          title: 'Cálculo por Hora',
          description: 'Descubra quanto você ganha por hora trabalhada'
        },
        {
          icon: '📅',
          title: 'Períodos Diversos',
          description: 'Visualize ganhos diários, semanais, mensais e anuais'
        },
        {
          icon: '📊',
          title: 'Projeções Financeiras',
          description: 'Planeje seu futuro financeiro com projeções precisas'
        },
        {
          icon: '💡',
          title: 'Interface Intuitiva',
          description: 'Ferramenta fácil de usar com resultados instantâneos'
        },
        {
          icon: '📱',
          title: 'Responsivo',
          description: 'Funciona perfeitamente em todos os dispositivos'
        },
        {
          icon: '🔒',
          title: 'Privacidade Total',
          description: 'Seus dados nunca são armazenados ou compartilhados'
        },
        {
          icon: '⚡',
          title: 'Performance',
          description: 'Cálculos instantâneos e interface rápida'
        },
        {
          icon: '🖨️',
          title: 'Impressão',
          description: 'Imprima seus resultados para referência futura'
        }
      ],
      testimonials: [
        {
          name: 'Maria Silva',
          role: 'Analista Financeira',
          comment: 'Excelente ferramenta para planejamento financeiro pessoal!'
        },
        {
          name: 'João Santos',
          role: 'Freelancer',
          comment: 'Me ajuda muito a precificar meus serviços por hora.'
        },
        {
          name: 'Ana Costa',
          role: 'Empresária',
          comment: 'Uso para calcular custos de funcionários. Muito prática!'
        }
      ]
    }
  }
}
</script>
