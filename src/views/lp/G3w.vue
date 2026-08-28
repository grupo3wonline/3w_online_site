<template>
  <div class="g3w-page">
    <!-- Hero / Primeira Dobra — Dark Navy com Escassez & Confiança -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Grupo 3W Online' }]" />

        <div class="max-w-4xl mt-4">
          <!-- Selo de Autoridade & Exclusividade -->
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:domain" class="w-4 h-4 text-secondary-400" />
            <span>SOFTWARE HOUSE & AGÊNCIA DE MARKETING DIGITAL • CURITIBA/PR</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Engenharia de Software, Marketing & <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Inteligência Artificial</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Um parceiro tecnológico completo para acelerar o crescimento da sua empresa. Unimos desenvolvimento de sistemas sob medida, criação de sites velozes, tráfego pago e automação de processos.
          </p>

          <!-- CTAs Principais -->
          <div class="flex flex-wrap gap-4 items-center mb-10">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de agendar uma reunião executiva com a diretoria do Grupo 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Falar com a Diretoria no WhatsApp
            </a>
            <a href="#simulador" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Solução Digital
            </a>
          </div>

          <!-- Elementos de Confiança Próximos ao CTA -->
          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> Empresa Sediada em Curitiba/PR</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:check-decagram" class="w-4 h-4 text-secondary-400" /> Atendimento Nacional</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:star-check" class="w-4 h-4 text-cyan-400" /> 5+ Anos de Trajetória Sólida</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Prova Social Imediata -->
    <section class="bg-slate-900 text-white py-6 border-y border-white/10">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+150</div>
            <div class="text-xs text-slate-300">Projetos Executados</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">120+</div>
            <div class="text-xs text-slate-300">Ferramentas Criadas</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">5+ Anos</div>
            <div class="text-xs text-slate-300">de Inovação Contínua</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">98%</div>
            <div class="text-xs text-slate-300">Aprovação de Clientes</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problema: Fragmentação de Fornecedores vs Solução Hub Único -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">O Desafio do Mercado</span>
          <h2 class="section-title">O Risco de Fragmentar Sua Tecnologia com Múltiplos Fornecedores</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Quando o designer não fala com o programador e o gestor de tráfego culpa o desenvolvedor, quem perde dinheiro é você.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Problemas da Fragmentação de Serviços:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Jogo de Empurra:</strong> O gestor de tráfego diz que o site é lento; o criador do site diz que o anúncio é ruim.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Custos Elevados e Redundantes:</strong> Várias faturas mensais pagas a profissionais avulsos sem alinhamento.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Falta de Visão Estratégica:</strong> Ninguém assume a responsabilidade final pelo crescimento do seu faturamento.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Ter fornecedores desconectados atrasa a evolução digital da sua empresa.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Solução Integrada do Grupo 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Um Único Parceiro Estratégico:</strong> Software house, agência de tráfego e especialistas em IA sob o mesmo teto.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Sinergia Total:</strong> O site é construído especificamente para converter os anúncios gerenciados pela mesma equipe.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Responsabilidade por Resultados:</strong> Acompanhamos desde a primeira linha de código até a geração de lucro.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Eficiência, velocidade e economia em um ecossistema integrado.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Os 4 Pilares Corporativos -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Divisões de Atuação</span>
          <h2 class="section-title">Os 4 Pilares de Excelência da 3W Online</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Soluções completas desenhadas para atender desde pequenas empresas até grandes corporações.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="service-card flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Icon icon="mdi:web" class="w-6 h-6" />
              </div>
              <h3 class="text-base font-bold text-gray-900 mb-2">Criação de Sites</h3>
              <p class="text-xs text-gray-500 mb-4 leading-relaxed">Sites institucionais, portais corporativos e landing pages que carregam em menos de 1.5s.</p>
            </div>
            <RouterLink to="/servicos/criacao-sites" class="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Conhecer Mais <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
            </RouterLink>
          </div>

          <div class="service-card flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                <Icon icon="mdi:application-cog-outline" class="w-6 h-6" />
              </div>
              <h3 class="text-base font-bold text-gray-900 mb-2">Sistemas Sob Medida</h3>
              <p class="text-xs text-gray-500 mb-4 leading-relaxed">Plataformas web, ERPs leves e CRMs sem cobrança de mensalidade por usuário.</p>
            </div>
            <RouterLink to="/servicos/criacao-sistemas" class="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Conhecer Mais <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
            </RouterLink>
          </div>

          <div class="service-card flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Icon icon="mdi:robot-outline" class="w-6 h-6" />
              </div>
              <h3 class="text-base font-bold text-gray-900 mb-2">Automação & IA</h3>
              <p class="text-xs text-gray-500 mb-4 leading-relaxed">Agentes inteligentes no WhatsApp para responder e qualificar clientes 24h por dia.</p>
            </div>
            <RouterLink to="/servicos/automacao-ia" class="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Conhecer Mais <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
            </RouterLink>
          </div>

          <div class="service-card flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Icon icon="mdi:chart-line" class="w-6 h-6" />
              </div>
              <h3 class="text-base font-bold text-gray-900 mb-2">Marketing & Ads</h3>
              <p class="text-xs text-gray-500 mb-4 leading-relaxed">Gestão de Google Ads e Meta Ads com acompanhamento diário de ROI e vendas.</p>
            </div>
            <RouterLink to="/servicos/marketing-digital" class="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Conhecer Mais <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Casos Reais & Depoimentos -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Casos de Sucesso</span>
          <h2 class="section-title">Resultados de Quem Escolheu o Grupo 3W Online</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Parcerias duradouras construídas com base em transparência e entrega de valor.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Centralizar o desenvolvimento do nosso site e a gestão de tráfego no Grupo 3W foi a melhor decisão que tomamos. O atendimento é ágil e as vendas triplicaram."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Marcos Vinícius</div>
              <div class="text-[11px] text-gray-500">Diretor • Grupo Imobiliário Curitiba</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5" /> Cliente há 3 anos
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O sistema de gestão sob medida que criaram resolveu um gargalo que tínhamos há anos com softwares de terceiros. Economia real de tempo e dinheiro."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Renata Silveira</div>
              <div class="text-[11px] text-gray-500">CFO • Indústria de Alimentos</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +500% em Produtividade
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Profissionais éticos, código limpo e entregas rigorosamente no prazo. Recomendo o Grupo 3W Online para qualquer empresário que queira crescer."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Dr. Paulo Henrique</div>
              <div class="text-[11px] text-gray-500">Fundador • Rede de Clínicas Médicas</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:shield-check" class="w-3.5 h-3.5" /> 100% Satisfeito
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Oferta Irresistível + Bônus Inclusos -->
    <section class="section-padding bg-gradient-to-b from-slate-900 to-[#0a1628] text-white">
      <div class="container max-w-4xl">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-1 bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-secondary-400" />
            <span>PACOTE EXECUTIVO GRUPO 3W ONLINE</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">Soluções Corporativas Sob Medida</h2>
          <p class="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto">
            Atendimento estratégico direto com a diretoria técnica e comercial.
          </p>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Consultoria Diagnóstica Inicial Gratuita:</strong> Avaliação completa de tecnologia, presença online e funil comercial.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Contrato Formal com Cláusula LGPD e SLA de Atendimento:</strong> Segurança jurídica plena com foro em Curitiba/PR.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Garantia Técnica de 30 Dias:</strong> Cobertura e suporte pós-entrega para sua total tranquilidade.</span>
            </div>
          </div>

          <div class="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-xs">
              <div class="font-bold text-white">Sede Própria em Curitiba/PR</div>
              <div class="text-blue-200">Atendimento presencial ou online em todo o Brasil.</div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de solicitar uma proposta institucional do Grupo 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Falar com a Diretoria no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulador de Preço Integrado -->
    <section id="simulador" class="testimonial-section section-padding">
      <div class="container">
        <div class="text-center mb-10 max-w-2xl mx-auto">
          <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Simulação Imediata</span>
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto com o Grupo 3W Online</h2>
          <p class="text-xs sm:text-sm text-blue-200">Descubra as estimativas para sua solução digital.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="website" />
        </div>
      </div>
    </section>

    <!-- Quebra de Objeções & FAQ Decisivo -->
    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Frequentes</span>
          <h2 class="section-title">Dúvidas sobre o Grupo 3W Online</h2>
          <p class="section-subtitle">Conheça nossa estrutura e modelo de parceria.</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- CTA Final — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:domain" class="w-4 h-4 text-secondary-400" />
          <span>Transformação Digital com Excelência</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para transformar sua empresa com tecnologia e marketing de ponta?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Entre em contato com nossa equipe executiva e conheça nossas soluções corporativas sob medida.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de agendar uma reunião com o Grupo 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Atendimento Executivo no WhatsApp
          </a>
          <RouterLink to="/contato" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
            Enviar Mensagem
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import PriceSimulator from '@/components/PriceSimulator.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Grupo 3W Online | Software House & Agência Digital em Curitiba',
  description: 'Grupo 3W Online: Software house e agência de marketing digital em Curitiba. Sites, sistemas sob medida, inteligência artificial e tráfego pago.',
  path: '/g3w',
  keywords: 'grupo 3w online, 3w online curitiba, software house curitiba, agência digital',
})

const faqs = [
  { question: 'Qual a localização e atuação da 3W Online?', answer: 'A 3W Online está sediada em Curitiba/PR, com mais de 5 anos de experiência e atuação remota em todo o Brasil.' },
  { question: 'A 3W Online atende projetos de grande porte?', answer: 'Sim! Desenvolvemos desde sites corporativos até sistemas integrados complexos com arquitetura de microsserviços e banco de dados relacional.' },
  { question: 'Como contratar um serviço do Grupo 3W Online?', answer: 'Você pode solicitar uma proposta pelo formulário de contato ou iniciar um atendimento direto pelo WhatsApp oficial (41) 99692-4829.' },
  { question: 'Quais garantias são oferecidas nos contratos?', answer: 'Todos os contratos contam com SLA de atendimento, garantia técnica de 30 dias pós-entrega e conformidade integral com a LGPD.' },
]
</script>
