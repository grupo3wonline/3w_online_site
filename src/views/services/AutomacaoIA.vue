<template>
  <div>
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Automação e Inteligência Artificial' }]" />
        <h1 class="page-hero-title">Automação e Inteligência Artificial</h1>
        <p class="page-hero-subtitle">Automatize processos, reduza custos e escale seu negócio com soluções inteligentes</p>
      </div>
    </section>

    <!-- Content + Image -->
    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Trabalhe de forma mais inteligente, não mais difícil</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-5">
              Implementamos soluções de automação e inteligência artificial que eliminam tarefas repetitivas,
              otimizam processos e liberam sua equipe para focar no que realmente importa: crescer o negócio.
              De chatbots a automações de marketing, entregamos tecnologia de ponta com resultados mensuráveis.
            </p>
            <ul class="space-y-2.5 mb-6">
              <li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}
              </li>
            </ul>
            <div class="flex flex-wrap gap-3">
              <button @click="scrollTo" class="btn-primary text-sm">
                <Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço
              </button>
              <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Automação e Inteligência Artificial." target="_blank" rel="noopener noreferrer" class="btn-secondary text-sm">
                <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp
              </a>
            </div>
          </div>
          <img
            src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Automação e Inteligência Artificial"
            class="w-full rounded-xl shadow-lg"
            loading="lazy"
            width="800"
            height="533"
          />
        </div>
      </div>
    </section>

    <!-- Solutions -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Nossas soluções de IA e Automação</h2>
          <p class="section-subtitle">Tecnologia aplicada para resultados reais no seu negócio</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <div v-for="s in solutions" :key="s.title" class="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-3" :class="s.iconBg">
              <Icon :icon="s.icon" class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-1">{{ s.title }}</h3>
            <p class="text-xs text-gray-500 mb-3 leading-relaxed">{{ s.desc }}</p>
            <p class="text-sm font-bold text-primary-600">{{ s.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Como funciona</h2>
          <p class="section-subtitle">Processo estruturado para implementação de IA no seu negócio</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
          <div v-for="(step, i) in process" :key="i" class="text-center">
            <div class="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-3 font-bold">{{ i + 1 }}</div>
            <h4 class="text-sm font-semibold text-gray-900 mb-1">{{ step.title }}</h4>
            <p class="text-[11px] text-gray-500">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Use cases -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Casos de uso</h2>
          <p class="section-subtitle">Exemplos de como a IA pode transformar seu negócio</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div v-for="uc in useCases" :key="uc.title" class="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <Icon :icon="uc.icon" class="w-6 h-6 text-primary-600 flex-shrink-0" />
              <h3 class="font-bold text-gray-900 text-sm">{{ uc.title }}</h3>
            </div>
            <p class="text-xs text-gray-600 leading-relaxed">{{ uc.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technologies -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Tecnologias que utilizamos</h2>
          <p class="section-subtitle">Trabalhamos com as plataformas e ferramentas mais modernas do mercado</p>
        </div>
        <div class="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          <span v-for="tech in technologies" :key="tech" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs font-medium">
            {{ tech }}
          </span>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section ref="simRef" class="section-padding bg-gray-50">
      <div class="container max-w-4xl mx-auto">
        <PriceSimulator service-type="system" />
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="section-title">Perguntas Frequentes</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para automatizar seu negócio com IA?</h2>
        <p class="text-sm text-blue-200 mb-6">Agende uma consultoria gratuita e descubra como a inteligência artificial pode transformar seus resultados</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-sm">
            <Icon icon="mdi:calendar-check" class="w-4 h-4 mr-2" /> Agendar Consultoria
          </RouterLink>
          <a href="https://wa.me/5541996924829?text=Olá! Quero saber mais sobre Automação e IA para meu negócio." target="_blank" rel="noopener noreferrer" class="btn-secondary text-sm">
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import PriceSimulator from '@/components/PriceSimulator.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'

const simRef = ref<HTMLElement>()
const scrollTo = () => simRef.value?.scrollIntoView({ behavior: 'smooth' })

const benefits = [
  'Chatbots inteligentes com IA (atendimento 24/7)',
  'Automação de processos repetitivos (RPA)',
  'Integração com ferramentas existentes',
  'Análise preditiva de dados e relatórios',
  'Personalização em escala com machine learning',
  'Redução de até 70% no tempo de tarefas manuais',
]

const solutions = [
  { title: 'Chatbots com IA', desc: 'Atendimento automatizado inteligente que resolve dúvidas, qualifica leads e atende clientes 24/7.', price: 'A partir de R$ 3.000', icon: 'mdi:robot', iconBg: 'bg-blue-500' },
  { title: 'Automação de Marketing', desc: 'Fluxos automatizados de e-mail, WhatsApp e CRM que nutrem leads e aumentam conversões.', price: 'A partir de R$ 2.500', icon: 'mdi:email-fast', iconBg: 'bg-green-500' },
  { title: 'RPA (Robotic Process)', desc: 'Automatize tarefas repetitivas como preenchimento de planilhas, envio de relatórios e muito mais.', price: 'A partir de R$ 5.000', icon: 'mdi:cog-transfer', iconBg: 'bg-purple-500' },
  { title: 'Análise de Dados com IA', desc: 'Dashboards inteligentes e análise preditiva para tomada de decisões baseada em dados.', price: 'A partir de R$ 4.000', icon: 'mdi:chart-bell-curve-cumulative', iconBg: 'bg-orange-500' },
  { title: 'Assistentes Virtuais', desc: 'Assistentes personalizados com GPT que entendem seu negócio e auxiliam sua equipe.', price: 'A partir de R$ 6.000', icon: 'mdi:head-lightbulb', iconBg: 'bg-indigo-500' },
  { title: 'Integração de Sistemas', desc: 'Conecte ferramentas (CRM, ERP, e-commerce) com automações inteligentes entre plataformas.', price: 'A partir de R$ 3.500', icon: 'mdi:api', iconBg: 'bg-teal-500' },
]

const process = [
  { title: 'Diagnóstico', desc: 'Mapeamos processos e identificamos oportunidades de automação' },
  { title: 'Estratégia', desc: 'Definimos prioridades e escolhemos as melhores ferramentas' },
  { title: 'Implementação', desc: 'Desenvolvemos e configuramos as automações' },
  { title: 'Otimização', desc: 'Monitoramos resultados e aprimoramos continuamente' },
]

const useCases = [
  { title: 'E-commerce', desc: 'Recomendações personalizadas, recuperação de carrinho automatizada, análise de comportamento do cliente.', icon: 'mdi:cart' },
  { title: 'Atendimento ao Cliente', desc: 'Chatbot que resolve 80% das dúvidas sem intervenção humana, triagem inteligente de tickets.', icon: 'mdi:headset' },
  { title: 'Vendas e CRM', desc: 'Lead scoring com IA, follow-up automatizado, previsão de vendas com machine learning.', icon: 'mdi:handshake' },
  { title: 'Financeiro', desc: 'Conciliação bancária automática, análise de fluxo de caixa, alertas de inadimplência.', icon: 'mdi:cash-multiple' },
  { title: 'Marketing', desc: 'Segmentação inteligente, personalização de conteúdo, otimização de campanhas em tempo real.', icon: 'mdi:bullseye-arrow' },
  { title: 'Operações', desc: 'Automatização de relatórios, gestão de estoque inteligente, previsão de demanda.', icon: 'mdi:factory' },
]

const technologies = [
  'OpenAI / GPT',
  'LangChain',
  'n8n / Make',
  'Zapier',
  'Python',
  'TensorFlow',
  'Google Cloud AI',
  'AWS AI Services',
  'Dialogflow',
  'Botpress',
  'RD Station',
  'HubSpot',
]

const faqs = [
  { question: 'Preciso ter conhecimento técnico para usar as automações?', answer: 'Não. Todas as soluções são entregues prontas para uso, com treinamento da equipe e documentação completa. Você não precisa saber programar.' },
  { question: 'Quanto tempo leva para implementar uma automação?', answer: 'Depende da complexidade. Chatbots simples ficam prontos em 1-2 semanas. Automações complexas com IA levam de 4 a 8 semanas.' },
  { question: 'A IA vai substituir minha equipe?', answer: 'Não. O objetivo é liberar sua equipe de tarefas repetitivas para que possam focar em atividades estratégicas e de maior valor.' },
  { question: 'Funciona com as ferramentas que já uso?', answer: 'Sim. Integramos com as principais plataformas: WhatsApp, Google, Meta, Shopify, RD Station, HubSpot, e praticamente qualquer sistema com API.' },
  { question: 'Existe suporte após a implementação?', answer: 'Sim. Oferecemos planos de suporte e manutenção contínua para garantir que tudo funcione perfeitamente e otimizar os resultados ao longo do tempo.' },
]
</script>
