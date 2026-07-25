<template>
  <div>
    <!-- Hero -->
    <section class="hero-gradient text-white py-16 md:py-24 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300 rounded-full blur-3xl"></div>
      </div>
      <div class="container relative z-10 text-center max-w-4xl mx-auto">
        <span class="inline-flex items-center px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-full mb-6">
          <Icon icon="mdi:fire" class="w-4 h-4 mr-1" /> OFERTA LIMITADA
        </span>
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          Automatize Seu Negócio com
          <span class="text-cyan-300">Sistemas Sob Medida</span>
        </h1>
        <div class="text-base md:text-xl text-blue-100 space-y-3 mb-8 max-w-3xl mx-auto">
          <p>⚡ <strong>Elimine tarefas repetitivas</strong> e ganhe até 40h por semana</p>
          <p>📊 <strong>Controle total</strong> com relatórios em tempo real</p>
          <p>💰 <strong>ROI comprovado de 500%</strong> em produtividade</p>
        </div>
        <div class="flex flex-wrap justify-center gap-4 text-xs text-gray-300 mb-8">
          <span class="flex items-center gap-1"><Icon icon="mdi:check-circle" class="text-green-400" /> +200 sistemas desenvolvidos</span>
          <span class="flex items-center gap-1"><Icon icon="mdi:check-circle" class="text-green-400" /> 8+ anos de experiência</span>
          <span class="flex items-center gap-1"><Icon icon="mdi:check-circle" class="text-green-400" /> 99.9% disponibilidade</span>
        </div>
        <a :href="`${WHATSAPP_BASE_URL}?text=${encodeURIComponent('Olá! Quero uma consultoria GRATUITA para automatizar meu negócio com sistemas sob medida!')}`" target="_blank" rel="noopener noreferrer" class="btn-primary bg-green-500 hover:bg-green-600 !text-lg !px-8 !py-4">
          <Icon icon="mdi:whatsapp" class="w-6 h-6 mr-2" />
          QUERO AUTOMATIZAR MEU NEGÓCIO
        </a>
        <p class="text-xs text-gray-300 mt-4">⚡ Consultoria 100% GRATUITA | 🎁 Análise completa | 📞 Sem compromisso</p>
      </div>
    </section>

    <!-- Problems -->
    <section class="section-padding bg-red-50">
      <div class="container max-w-4xl mx-auto text-center">
        <h2 class="text-2xl md:text-4xl font-bold text-red-600 mb-6">❌ PARE DE PERDER TEMPO COM PROCESSOS MANUAIS!</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
          <div v-for="problem in problems" :key="problem.title" class="bg-white p-5 rounded-xl shadow-md border-l-4 border-red-500">
            <div class="flex items-start gap-3">
              <Icon icon="mdi:close-circle" class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 class="font-bold text-gray-900 mb-1 text-sm">{{ problem.title }}</h3>
                <p class="text-xs text-gray-600">{{ problem.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-red-500 text-white p-6 rounded-xl">
          <p class="font-bold text-lg">💸 CADA MINUTO PERDIDO É DINHEIRO JOGADO FORA!</p>
          <p class="text-sm text-red-100 mt-2">Enquanto você luta com processos manuais, seus concorrentes estão automatizando e crescendo 10x mais rápido.</p>
        </div>
      </div>
    </section>

    <!-- Solutions -->
    <section class="section-padding bg-blue-50">
      <div class="container">
        <div class="text-center mb-10 md:mb-16">
          <h2 class="section-title">✅ A AUTOMAÇÃO QUE SEU NEGÓCIO PRECISA!</h2>
          <p class="section-subtitle">Sistemas inteligentes que trabalham 24/7 para você</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div v-for="solution in solutions" :key="solution.title" class="card p-6 text-center border-t-4" :class="solution.borderClass">
            <div class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" :class="solution.bgClass">
              <Icon :icon="solution.icon" class="w-7 h-7 text-white" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">{{ solution.title }}</h3>
            <p class="text-xs text-gray-600 mb-3">{{ solution.description }}</p>
            <div class="bg-gray-50 p-3 rounded-lg">
              <span class="text-2xl font-bold" :class="solution.textClass">{{ solution.stat }}</span>
              <p class="text-xs text-gray-600">{{ solution.statLabel }}</p>
            </div>
          </div>
        </div>

        <!-- Before/After -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto">
          <div class="bg-red-50 p-6 md:p-8">
            <h3 class="text-xl font-bold text-red-600 mb-4 text-center">❌ ANTES</h3>
            <ul class="space-y-3 text-sm">
              <li v-for="item in beforeItems" :key="item" class="flex items-start gap-2">
                <Icon icon="mdi:close" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="bg-green-50 p-6 md:p-8">
            <h3 class="text-xl font-bold text-green-600 mb-4 text-center">✅ DEPOIS</h3>
            <ul class="space-y-3 text-sm">
              <li v-for="item in afterItems" :key="item" class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="py-16 md:py-20 bg-gray-900 text-white">
      <div class="container">
        <div class="text-center mb-10 md:mb-16">
          <h2 class="text-2xl md:text-4xl font-bold mb-4">💻 SISTEMAS QUE <span class="text-cyan-400">TRANSFORMAM NEGÓCIOS</span></h2>
          <p class="text-gray-300">Invista em automação e veja seu ROI multiplicar em 6 meses!</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div v-for="plan in plans" :key="plan.title" class="rounded-xl p-6 shadow-2xl hover:scale-105 transition-transform text-center" :class="plan.bgClass">
            <div v-if="plan.badge" class="text-xs font-bold bg-orange-500 text-white px-3 py-1 rounded-full inline-block mb-3">{{ plan.badge }}</div>
            <Icon :icon="plan.icon" class="w-10 h-10 mx-auto mb-3 opacity-80" />
            <h3 class="text-lg font-bold mb-2">{{ plan.title }}</h3>
            <p class="text-xs opacity-80 mb-4">{{ plan.subtitle }}</p>
            <div class="mb-4">
              <div class="text-3xl font-bold text-cyan-300">{{ plan.price }}</div>
              <div class="text-xs line-through opacity-50">{{ plan.oldPrice }}</div>
            </div>
            <ul class="text-left text-xs space-y-2 mb-6">
              <li v-for="feat in plan.features" :key="feat" class="flex items-center gap-2">
                <Icon icon="mdi:check" class="w-4 h-4 text-cyan-300 flex-shrink-0" />
                {{ feat }}
              </li>
            </ul>
            <a :href="plan.cta" target="_blank" rel="noopener noreferrer" class="block w-full bg-cyan-400 text-gray-900 py-3 rounded-lg font-bold hover:bg-cyan-300 transition-colors text-sm">
              {{ plan.ctaText }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section-padding bg-blue-50">
      <div class="container">
        <div class="text-center mb-10"><h2 class="section-title">🚀 CASOS DE SUCESSO REAIS</h2></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div v-for="t in systemTestimonials" :key="t.name" class="card p-6 text-center">
            <div class="flex justify-center text-yellow-400 mb-3">
              <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
            </div>
            <p class="text-sm text-gray-600 italic mb-4">"{{ t.quote }}"</p>
            <h4 class="font-bold text-gray-900 text-sm">{{ t.name }}</h4>
            <p class="text-xs text-primary-600">{{ t.company }}</p>
            <div class="mt-3 bg-green-100 rounded-lg p-2">
              <span class="text-xs font-bold text-green-700">{{ t.result }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Pronto para automatizar?</h2>
        <p class="text-blue-100 mb-6">Consultoria gratuita. Sem compromisso.</p>
        <a :href="`${WHATSAPP_BASE_URL}?text=${encodeURIComponent('Olá! Quero automatizar meu negócio com um sistema personalizado!')}`" target="_blank" rel="noopener noreferrer" class="btn-primary bg-green-500 hover:bg-green-600 !px-8 !py-4">
          <Icon icon="mdi:whatsapp" class="w-5 h-5 mr-2" />
          QUERO MINHA CONSULTORIA GRATUITA
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { WHATSAPP_BASE_URL, TESTIMONIALS } from '@/constants/content'

const problems = [
  { title: 'Planilhas Desorganizadas', description: 'Horas perdidas procurando informações, dados duplicados e erros constantes.' },
  { title: 'Processos Lentos', description: 'Tarefas que levam horas, atrasando entregas e frustrando clientes.' },
  { title: 'Falta de Controle', description: 'Sem visibilidade do que acontece no negócio, decisões no escuro.' },
  { title: 'Erros Custosos', description: 'Erros humanos em processos manuais que custam dinheiro e credibilidade.' },
]

const solutions = [
  { title: 'Automação Completa', icon: 'mdi:cog', bgClass: 'bg-blue-500', borderClass: 'border-blue-500', textClass: 'text-blue-600', description: 'Elimine tarefas repetitivas e foque no crescimento.', stat: '40h', statLabel: 'Economizadas por semana' },
  { title: 'Relatórios Inteligentes', icon: 'mdi:chart-bar', bgClass: 'bg-green-500', borderClass: 'border-green-500', textClass: 'text-green-600', description: 'Dashboards em tempo real para decisões certas.', stat: '99.9%', statLabel: 'Precisão dos dados' },
  { title: 'Segurança Máxima', icon: 'mdi:shield-check', bgClass: 'bg-purple-500', borderClass: 'border-purple-500', textClass: 'text-purple-600', description: 'Dados protegidos, backups automáticos, acesso controlado.', stat: '100%', statLabel: 'Segurança garantida' },
]

const beforeItems = ['40+ horas semanais em tarefas manuais', 'Erros constantes em planilhas', 'Informações espalhadas e desorganizadas', 'Decisões baseadas em achismos', 'Estresse e frustração diária']
const afterItems = ['Automação de 90% dos processos', 'Zero erros em cálculos e relatórios', 'Todas informações centralizadas', 'Decisões baseadas em dados reais', 'Tranquilidade e crescimento sustentável']

const plans = [
  { title: 'Sites Profissionais', icon: 'mdi:web', subtitle: 'Presença online que converte', bgClass: 'bg-gradient-to-br from-blue-600 to-blue-800', price: 'R$ 2.497', oldPrice: 'R$ 4.997', badge: '', features: ['Design responsivo premium', 'SEO otimizado', 'Formulários inteligentes', 'Integração WhatsApp', 'Suporte 6 meses'], cta: `https://wa.me/5541996924829?text=${encodeURIComponent('Quero contratar um Site Profissional!')}`, ctaText: 'QUERO MEU SITE' },
  { title: 'Sistemas Personalizados', icon: 'mdi:cog', subtitle: 'Automação completa', bgClass: 'bg-gradient-to-br from-green-600 to-green-800', price: 'R$ 9.997', oldPrice: 'R$ 19.997', badge: 'POPULAR', features: ['Análise completa dos processos', 'Sistema 100% personalizado', 'Dashboards e relatórios', 'Automação de fluxos', 'Treinamento da equipe'], cta: `https://wa.me/5541996924829?text=${encodeURIComponent('Quero contratar um Sistema Personalizado!')}`, ctaText: 'QUERO AUTOMATIZAR' },
  { title: 'Aplicativos Mobile', icon: 'mdi:cellphone', subtitle: 'Seu app nas lojas', bgClass: 'bg-gradient-to-br from-purple-600 to-purple-800', price: 'R$ 14.997', oldPrice: 'R$ 29.997', badge: 'PREMIUM', features: ['App iOS e Android', 'Design UI/UX profissional', 'Integração com sistemas', 'Push notifications', 'Publicação nas lojas'], cta: `https://wa.me/5541996924829?text=${encodeURIComponent('Quero contratar um Aplicativo Mobile!')}`, ctaText: 'QUERO MEU APP' },
]

const systemTestimonials = TESTIMONIALS.filter((t) => t.result).slice(2, 5)
</script>
