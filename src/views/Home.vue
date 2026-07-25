<template>
  <div>
    <!-- Hero — Dark Navy -->
    <section class="hero-gradient text-white py-20 md:py-28 lg:py-36 relative overflow-hidden">
      <div class="container relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Transforme Seu Negócio com
            <span class="text-gradient">Soluções Digitais</span>
          </h1>
          <p class="text-sm md:text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
            Especialistas em marketing digital, desenvolvimento web e soluções tecnológicas que realmente geram resultados.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <RouterLink to="/contato" class="btn-primary !bg-primary-500 hover:!bg-primary-600 !text-sm">
              <Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" /> Orçamento Gratuito
            </RouterLink>
            <RouterLink to="/servicos" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 !text-sm">
              <Icon icon="mdi:arrow-right" class="w-4 h-4 mr-2" /> Ver Serviços
            </RouterLink>
          </div>
          <div class="flex items-center justify-center gap-2 text-xs text-blue-300">
            <Icon icon="mdi:shield-check" class="w-4 h-4 text-green-400" />
            Dados protegidos conforme a LGPD
          </div>
        </div>
      </div>
      <!-- Badge flutuante -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div class="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-300 text-xs px-4 py-2 rounded-full">
          <Icon icon="mdi:check-circle" class="w-4 h-4" />
          <span class="font-medium">Vagas Limitadas</span> — Entre em contato hoje
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 md:py-16 bg-white border-b border-gray-100">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-2xl md:text-4xl font-bold text-primary-600">{{ stat.value }}</div>
            <div class="text-xs text-gray-500 mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10 md:mb-14">
          <span class="section-label">Nossos Serviços</span>
          <h2 class="section-title">Soluções para Cada Desafio</h2>
          <p class="section-subtitle max-w-2xl mx-auto">Do marketing digital ao desenvolvimento de sistemas — entregamos resultados mensuráveis.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="service in services" :key="service.id" class="service-card">
            <div class="w-11 h-11 rounded-full flex items-center justify-center mb-4" :class="service.iconBg">
              <Icon :icon="service.icon" class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-1">{{ service.title }}</h3>
            <p class="text-xs text-gray-500 mb-3 leading-relaxed">{{ service.description }}</p>
            <RouterLink :to="service.link" class="inline-flex items-center text-xs font-semibold text-primary-600 hover:text-primary-700 gap-1">
              Saiba mais <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
            </RouterLink>
          </div>
        </div>
        <div class="text-center mt-8">
          <RouterLink to="/servicos" class="btn-outline text-sm">Ver Todos os Serviços</RouterLink>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Por que a 3W Online?</span>
          <h2 class="section-title">Expertise que Gera Resultados Reais</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="d in differentials" :key="d.title" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <div class="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <Icon :icon="d.icon" class="w-4 h-4 text-primary-600" />
              </div>
              <h4 class="font-semibold text-gray-900 text-sm mb-1">{{ d.title }}</h4>
              <p class="text-[11px] text-gray-500 leading-relaxed">{{ d.description }}</p>
            </div>
          </div>
          <div>
            <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Equipe 3W Online" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials — Dark Section -->
    <section class="testimonial-section section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-2">Depoimentos</span>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">O que Nossos Clientes Dizem</h2>
          <p class="text-sm text-blue-200">Resultados reais de quem confia em nosso trabalho.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="t in testimonials" :key="t.id" class="testimonial-card">
            <p class="text-sm text-gray-300 mb-5 leading-relaxed italic">"{{ t.text }}"</p>
            <div class="flex items-center">
              <div class="w-9 h-9 bg-primary-500/20 rounded-full flex items-center justify-center mr-3">
                <span class="text-primary-300 font-semibold text-xs">{{ t.avatar }}</span>
              </div>
              <div>
                <h4 class="font-semibold text-white text-sm">{{ t.name }}</h4>
                <p class="text-[11px] text-blue-300">{{ t.company }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-8">
          <span class="section-label">🧮 Simulador Gratuito</span>
          <h2 class="section-title">Quanto vai custar seu projeto?</h2>
          <p class="section-subtitle">Calcule agora e receba uma estimativa personalizada em segundos</p>
        </div>
        <div class="max-w-4xl mx-auto">
          <PriceSimulator service-type="website" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas?</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas antes de começar</p>
        </div>
        <div class="max-w-3xl mx-auto">
          <FaqAccordion :items="faqs" />
        </div>
        <div class="text-center mt-8">
          <RouterLink to="/contato" class="btn-primary text-sm">
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Tirar Outra Dúvida
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA — Dark -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-3">Comece sua transformação digital</span>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Pronto para Impulsionar Seu Negócio?</h2>
        <p class="text-sm text-blue-200 mb-6 max-w-xl mx-auto">Entre em contato e descubra como nossa equipe pode ajudar você a alcançar resultados extraordinários.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-sm">
            Falar com Especialista
          </RouterLink>
          <a href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar sobre soluções digitais para meu negócio." target="_blank" rel="noopener noreferrer" class="btn-secondary text-sm">
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import PriceSimulator from '@/components/PriceSimulator.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'
import { FAQ_ITEMS } from '@/constants/content'

const stats = [
  { value: '150+', label: 'Projetos Entregues' },
  { value: '98%', label: 'Clientes Satisfeitos' },
  { value: '5+', label: 'Anos de Experiência' },
  { value: '24/7', label: 'Suporte Disponível' },
]

const services = [
  { id: 1, title: 'Gestão de Redes Sociais', description: 'Estratégia, criação de conteúdo e gestão completa das suas redes.', icon: 'mdi:instagram', iconBg: 'bg-pink-500', link: '/servicos/gestao-redes-sociais' },
  { id: 2, title: 'Criação de Sites', description: 'Sites profissionais, responsivos e otimizados para conversão.', icon: 'mdi:web', iconBg: 'bg-blue-500', link: '/servicos/criacao-sites' },
  { id: 3, title: 'Gestão de Anúncios', description: 'Campanhas no Google Ads e Meta Ads com foco em ROI.', icon: 'mdi:bullseye-arrow', iconBg: 'bg-green-500', link: '/servicos/gestao-anuncios' },
  { id: 4, title: 'Desenvolvimento de Apps', description: 'Aplicativos mobile modernos para iOS e Android.', icon: 'mdi:cellphone', iconBg: 'bg-purple-500', link: '/servicos/desenvolvimento-apps' },
  { id: 5, title: 'Design Gráfico', description: 'Identidade visual e peças criativas que destacam sua marca.', icon: 'mdi:palette', iconBg: 'bg-orange-500', link: '/servicos/design-grafico' },
  { id: 6, title: 'Marketing Digital', description: 'Estratégia completa para crescimento sustentável.', icon: 'mdi:chart-line', iconBg: 'bg-indigo-500', link: '/servicos/marketing-digital' },
]

const differentials = [
  { title: 'Expertise Comprovada', icon: 'mdi:trophy', description: '5+ anos, 150+ projetos entregues para clientes de todo o Brasil.' },
  { title: 'Resultados Mensuráveis', icon: 'mdi:chart-bar', description: 'Focamos em métricas que impactam o negócio, com relatórios transparentes.' },
  { title: 'Atendimento Personalizado', icon: 'mdi:account-heart', description: 'Cada projeto recebe estratégia e atenção exclusiva.' },
  { title: 'Tecnologia Atualizada', icon: 'mdi:rocket-launch', description: 'Melhores ferramentas e práticas modernas do mercado.' },
]

const testimonials = [
  { id: 1, name: 'João Silva', company: 'Silva & Associados', avatar: 'JS', text: 'A 3W Online transformou nossa presença digital. Aumentamos as vendas em 300% em apenas 6 meses!' },
  { id: 2, name: 'Maria Santos', company: 'Boutique Elegance', avatar: 'MS', text: 'Nosso site ficou incrível e as redes sociais estão gerando clientes todo dia!' },
  { id: 3, name: 'Carlos Oliveira', company: 'Tech Solutions', avatar: 'CO', text: 'A equipe entende o negócio e entrega com qualidade. Recomendo sem hesitar!' },
]

const faqs = FAQ_ITEMS.slice(0, 5)
</script>
