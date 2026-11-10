<script setup>
// Usando princípios de prova social (Robert Cialdini)
const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'Desenvolvedor Full Stack',
    company: 'Tech Solutions',
    avatar: 'CS',
    rating: 5,
    text: 'Ferramenta indispensável no meu dia a dia! Eliminou completamente os problemas de encoding que eu tinha em projetos legados. Recomendo a todos os desenvolvedores.'
  },
  {
    name: 'Ana Costa',
    role: 'Web Designer',
    company: 'Creative Agency',
    avatar: 'AC',
    rating: 5,
    text: 'Simples, rápida e eficiente. O fato de ser 100% client-side me dá total segurança para usar com conteúdo confidencial dos clientes.'
  },
  {
    name: 'Pedro Santos',
    role: 'Gerente de Marketing',
    company: 'E-commerce Brasil',
    avatar: 'PS',
    rating: 5,
    text: 'Uso diariamente para criar e-mails marketing que funcionam em qualquer cliente de e-mail. A tabela de referência é fantástica!'
  },
  {
    name: 'Juliana Mendes',
    role: 'Desenvolvedora Frontend',
    company: 'Startup Hub',
    avatar: 'JM',
    rating: 5,
    text: 'A interface em dark mode é muito confortável para longas sessões de trabalho. Ferramenta bem pensada e profissional.'
  }
]

const stats = [
  { value: '10.000+', label: 'Usuários Ativos', icon: 'fas fa-users' },
  { value: '500.000+', label: 'Conversões Realizadas', icon: 'fas fa-exchange-alt' },
  { value: '4.9/5', label: 'Avaliação Média', icon: 'fas fa-star' },
  { value: '99.9%', label: 'Uptime', icon: 'fas fa-server' }
]
</script>

<template>
  <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
        <div 
          v-for="stat in stats" 
          :key="stat.label"
          class="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 text-center shadow-lg"
        >
          <i :class="[stat.icon, 'text-2xl md:text-3xl text-blue-600 dark:text-blue-400 mb-2']"></i>
          <div class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Testimonials Header -->
      <div class="text-center mb-12">
        <span class="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          <i class="fas fa-comments mr-2"></i> Depoimentos
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          O Que Nossos Usuários Dizem
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Mais de 10.000 profissionais já confiam no Entity Converter Pro
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="testimonial in testimonials" 
          :key="testimonial.name"
          class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <!-- Rating -->
          <div class="flex items-center gap-1 mb-4">
            <i 
              v-for="star in testimonial.rating" 
              :key="star" 
              class="fas fa-star text-yellow-500"
            ></i>
          </div>
          
          <!-- Text -->
          <p class="text-gray-600 dark:text-gray-300 mb-6 italic">
            "{{ testimonial.text }}"
          </p>
          
          <!-- Author -->
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {{ testimonial.avatar }}
            </div>
            <div>
              <div class="font-bold text-gray-900 dark:text-white">{{ testimonial.name }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ testimonial.role }} • {{ testimonial.company }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Badges -->
      <div class="mt-16 text-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">Tecnologias e Padrões Utilizados</p>
        <div class="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400" title="Vue.js 3">
            <i class="fab fa-vuejs text-2xl text-green-500"></i>
            <span class="font-medium">Vue.js 3</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400" title="Tailwind CSS">
            <i class="fas fa-wind text-2xl text-cyan-500"></i>
            <span class="font-medium">Tailwind CSS</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400" title="Vite">
            <i class="fas fa-bolt text-2xl text-purple-500"></i>
            <span class="font-medium">Vite</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400" title="LGPD Compliant">
            <i class="fas fa-shield-alt text-2xl text-green-600"></i>
            <span class="font-medium">LGPD</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400" title="W3C Valid">
            <i class="fas fa-check-circle text-2xl text-blue-500"></i>
            <span class="font-medium">W3C</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
