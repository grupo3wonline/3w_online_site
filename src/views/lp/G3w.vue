<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 md:py-24">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h1 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Soluções Digitais
              <span class="text-primary-600">Sob Medida</span> para
              Alavancar Seu Negócio
            </h1>
            <p class="text-base md:text-xl text-gray-600 mb-6 leading-relaxed">
              Seu site, seu sistema, do seu jeito. Gerenciamos sua presença online
              para você focar no que importa.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <RouterLink to="/contato" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors">
                Solicitar Orçamento
              </RouterLink>
              <RouterLink to="/servicos" class="btn-outline text-center">
                Conhecer Serviços
              </RouterLink>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white rounded-xl p-5 shadow-md">
              <div class="text-2xl md:text-3xl font-bold text-primary-600 mb-1">150+</div>
              <div class="text-sm text-gray-600">Projetos Entregues</div>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-md">
              <div class="text-2xl md:text-3xl font-bold text-green-600 mb-1">98%</div>
              <div class="text-sm text-gray-600">Clientes Satisfeitos</div>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-md">
              <div class="text-2xl md:text-3xl font-bold text-blue-600 mb-1">24h</div>
              <div class="text-sm text-gray-600">Tempo de Resposta</div>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-md">
              <div class="text-2xl md:text-3xl font-bold text-purple-600 mb-1">5+</div>
              <div class="text-sm text-gray-600">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="section-padding">
      <div class="container">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="section-title">Sobre a <span class="text-primary-600">3W Online</span></h2>
          <p class="text-gray-600 leading-relaxed">
            Somos uma software house e agência de marketing digital dedicada a transformar
            ideias em soluções digitais personalizadas. Criamos sites modernos e sistemas sob demanda
            que atendem às necessidades específicas do seu negócio. Gerenciamos suas redes
            sociais e campanhas de anúncios para garantir alcance, engajamento e conversão.
          </p>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10 md:mb-16">
          <h2 class="section-title">Nossos Serviços</h2>
          <p class="section-subtitle">Soluções completas para transformar sua presença digital</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div v-for="service in services" :key="service.title" class="card p-6 md:p-8 hover:shadow-xl transition-shadow">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center mb-4" :class="service.bgClass">
              <Icon :icon="service.icon" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ service.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ service.description }}</p>
            <ul class="space-y-2">
              <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-sm text-gray-600">
                <Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500 flex-shrink-0" />
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10 md:mb-16">
          <h2 class="section-title">Por Que Escolher a <span class="text-primary-600">3W Online</span>?</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="diff in differentials" :key="diff.title" class="text-center">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" :class="diff.bgClass">
              <Icon :icon="diff.icon" class="w-8 h-8" :class="diff.iconClass" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">{{ diff.title }}</h3>
            <p class="text-xs text-gray-600">{{ diff.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10 md:mb-16">
          <h2 class="section-title">Perguntas Frequentes</h2>
        </div>
        <div class="max-w-3xl mx-auto">
          <FaqAccordion :items="faqs" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-20 bg-gradient-to-r from-primary-600 to-blue-700 text-white">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Pronto para transformar seu negócio?</h2>
        <p class="text-base md:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
          Vamos criar soluções digitais personalizadas que impulsionem seus resultados.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/contato" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center">
            Solicitar Orçamento Gratuito
          </RouterLink>
          <a
            href="https://wa.me/5541996924829?text=Olá! Vi a landing page da 3W Online e gostaria de saber mais."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-center"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5 mr-2 inline" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'

const services = [
  {
    title: 'Criação de Sites Personalizados',
    description: 'Sites modernos, responsivos e exclusivos que refletem a identidade da sua marca.',
    icon: 'mdi:web',
    bgClass: 'bg-blue-500',
    features: ['Design responsivo e moderno', 'Otimização para SEO', 'Integração com sistemas'],
  },
  {
    title: 'Desenvolvimento de Sistemas Sob Demanda',
    description: 'Soluções tecnológicas feitas sob medida para otimizar processos e impulsionar resultados.',
    icon: 'mdi:cog',
    bgClass: 'bg-purple-500',
    features: ['Automação de processos', 'Integração com APIs', 'Relatórios personalizados'],
  },
  {
    title: 'Gestão de Redes Sociais',
    description: 'Planejamento e execução estratégica para fortalecer sua presença online.',
    icon: 'mdi:instagram',
    bgClass: 'bg-pink-500',
    features: ['Conteúdo estratégico', 'Gestão de comunidade', 'Relatórios de performance'],
  },
  {
    title: 'Campanhas de Anúncios Digitais',
    description: 'Campanhas segmentadas que geram tráfego qualificado e conversões reais.',
    icon: 'mdi:bullseye-arrow',
    bgClass: 'bg-green-500',
    features: ['Google Ads e Meta Ads', 'Segmentação avançada', 'Otimização contínua'],
  },
]

const differentials = [
  { title: 'Personalização Total', icon: 'mdi:tune', bgClass: 'bg-blue-100', iconClass: 'text-blue-600', description: 'Cada projeto é único e desenhado para suas necessidades.' },
  { title: 'Atendimento Próximo', icon: 'mdi:account-group', bgClass: 'bg-green-100', iconClass: 'text-green-600', description: 'Consultoria dedicada e suporte contínuo.' },
  { title: 'Tecnologia e Inovação', icon: 'mdi:lightbulb', bgClass: 'bg-purple-100', iconClass: 'text-purple-600', description: 'Melhores ferramentas para soluções modernas.' },
  { title: 'Resultados Comprovados', icon: 'mdi:chart-line', bgClass: 'bg-orange-100', iconClass: 'text-orange-600', description: 'Clientes satisfeitos e cases de sucesso.' },
]

const faqs = [
  { question: 'Quanto tempo leva para desenvolver um site?', answer: 'O tempo médio é de 2 a 4 semanas, dependendo da complexidade do projeto.' },
  { question: 'Vocês oferecem suporte após a entrega?', answer: 'Sim, oferecemos suporte técnico após a entrega, além de planos de manutenção contínua.' },
  { question: 'Quais são as formas de pagamento?', answer: 'Aceitamos PIX (5% desconto), cartão de crédito em até 12x sem juros e transferência bancária.' },
  { question: 'Posso alterar o projeto depois de iniciado?', answer: 'Alterações podem ser feitas durante o desenvolvimento, mas podem impactar no prazo e custo final.' },
  { question: 'Vocês trabalham com empresas de outros estados?', answer: 'Sim, atendemos clientes de todo o Brasil de forma remota com comunicação eficiente.' },
  { question: 'Como posso solicitar um orçamento?', answer: 'Entre em contato pelo WhatsApp ou formulário e enviaremos um orçamento detalhado.' },
]
</script>
