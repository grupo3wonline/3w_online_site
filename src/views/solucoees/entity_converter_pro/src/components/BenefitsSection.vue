<script setup>
const benefits = [
  {
    icon: 'fas fa-user-lock',
    color: 'green',
    title: 'LGPD: Não Coletamos Dados',
    description: 'Seu texto é processado apenas no seu navegador. Nenhuma informação é enviada para servidores externos.',
    tooltip: '100% Client-Side: processamento local e seguro'
  },
  {
    icon: 'fas fa-shield-alt',
    color: 'yellow',
    title: 'Segurança de Código (XSS)',
    description: 'Entities HTML previnem brechas de segurança como Cross-Site Scripting, garantindo a integridade do seu HTML.',
    tooltip: 'Proteção contra ataques XSS'
  },
  {
    icon: 'fas fa-clock',
    color: 'blue',
    title: 'Economia de Tempo (80/20)',
    description: 'Aplique o princípio de Pareto: solucione 20% das causas que geram 80% dos problemas de exibição.',
    tooltip: 'Princípio de Pareto aplicado ao desenvolvimento'
  }
]

const colorClasses = {
  green: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    border: 'border-green-200 dark:border-green-700',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-800 dark:text-green-300'
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/30',
    border: 'border-yellow-200 dark:border-yellow-700',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-800 dark:text-yellow-300'
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-700',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-300'
  }
}
</script>

<template>
  <section class="py-16 md:py-24 bg-white dark:bg-gray-900">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <span class="inline-block bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          <i class="fas fa-check-circle mr-2"></i> Benefícios
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Foco na Produtividade e na sua Privacidade
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          Aproveite a máxima performance de codificação sem preocupações. Nossa ferramenta é <strong>100%
          Client-Side</strong> e <strong>NÃO coleta dados pessoais</strong>, garantindo total conformidade com a LGPD.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div 
          v-for="benefit in benefits" 
          :key="benefit.title"
          :class="[
            colorClasses[benefit.color].bg,
            colorClasses[benefit.color].border,
            'p-6 rounded-xl shadow-lg border text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group'
          ]"
        >
          <div class="relative inline-block">
            <i :class="[benefit.icon, colorClasses[benefit.color].icon, 'text-4xl mb-4']"></i>
            <span 
              class="absolute -top-2 -right-6 text-xs text-gray-500 cursor-help opacity-0 group-hover:opacity-100 transition-opacity"
              :title="benefit.tooltip"
            >
              <i class="fas fa-info-circle"></i>
            </span>
          </div>
          <h3 :class="[colorClasses[benefit.color].title, 'font-bold text-xl mb-2']">
            {{ benefit.title }}
          </h3>
          <p class="text-gray-700 dark:text-gray-300">
            {{ benefit.description }}
          </p>
        </div>
      </div>

      <!-- Trust Badge -->
      <div class="mt-12 text-center">
        <div class="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm text-gray-600 dark:text-gray-400">
          <i class="fas fa-shield-alt text-green-500"></i>
          <span>Ferramenta em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD)</strong></span>
        </div>
      </div>
    </div>
  </section>
</template>
