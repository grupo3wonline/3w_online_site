<template>
  <div class="landing-marketing-page">
    <!-- Hero / Primeira Dobra — Dark Navy com Escassez & Confiança -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Marketing Digital 360°' }]" />

        <div class="max-w-4xl mt-4">
          <!-- Selo de Escassez -->
          <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4 animate-pulse">
            <Icon icon="mdi:fire" class="w-4 h-4 text-rose-400" />
            <span>APENAS 4 VAGAS PARA NOVOS CLIENTES DE MARKETING NESTE MÊS</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Transforme Suas Redes & Anúncios em uma <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Máquina Previsível de Vendas</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Una gestão profissional de redes sociais, tráfego pago no Google & Meta Ads e automação de atendimento no WhatsApp para atrair clientes todos os dias.
          </p>

          <!-- CTAs Principais -->
          <div class="flex flex-wrap gap-4 items-center mb-10">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de garantir uma das vagas para o plano de Marketing Digital 360°."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Solicitar Consultoria Grátis no WhatsApp
            </a>
            <a href="#simulador" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Plano Mensal
            </a>
          </div>

          <!-- Elementos de Confiança Próximos ao CTA -->
          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> Sem Contratos de Longa Fidelidade</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:account-group" class="w-4 h-4 text-secondary-400" /> Equipe Completa Dedicada</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:file-chart-check" class="w-4 h-4 text-cyan-400" /> Relatórios Transparentes Mensais</span>
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
            <div class="text-xs text-slate-300">Empresas Gerenciadas</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">300%</div>
            <div class="text-xs text-slate-300">Aumento Médio de Alcance</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">5+ Anos</div>
            <div class="text-xs text-slate-300">de Mercado em Curitiba</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">98%</div>
            <div class="text-xs text-slate-300">Satisfação de Clientes</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problema / O Custo da Inação (Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">O Cenário Atual</span>
          <h2 class="section-title">Por Que Suas Redes Sociais Não Estão Gerando Vendas?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Postar sem estratégia de conversão gera apenas curtidas vazias e frustração no final do mês.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Erros Comuns no Marketing Digital:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Posts Esporádicos Sem Cronograma:</strong> Sem consistência, o algoritmo do Instagram corta o alcance das suas publicações.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Conteúdo Focado Apenas no Produto:</strong> Falta de conexão com as dores e desejos reais do seu cliente.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Ausência de Tráfego Pago:</strong> Depender apenas do alcance orgânico faz seu perfil crescer a passos de tartaruga.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Demora para Responder Leads:</strong> Contatos que chegam no direct ou WhatsApp e esfriam por falta de resposta rápida.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Curtidas não pagam boletos. O que sua empresa precisa é de conversas e propostas fechadas.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Solução 3W Online 360°:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Cronograma Editorial Mensal Antecipado:</strong> Posts e Reels aprovados com antecedência para sua total tranquilidade.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Copywriting Persuasivo com Chamada para Ação:</strong> Cada postagem direciona o seguidor para uma conversa comercial.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Gestão Integrada de Anúncios (Google & Meta):</strong> Tráfego pago direcionado para as pessoas certas no momento da compra.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Automação Inteligente de Atendimento:</strong> Chatbot 24/7 no WhatsApp para qualificar leads instantaneamente.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Aceleração completa com equipe dedicada de designers, redatores e gestores de tráfego.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Como Funciona em 4 Passos -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Passo a Passo</span>
          <h2 class="section-title">Como Implementamos Seu Marketing Digital</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Fluxo estruturado para colocar sua máquina de vendas online para funcionar rapidamente.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              1
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Diagnóstico de Marca</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Estudo aprofundado dos concorrentes, tom de voz e personas prioritárias de compra.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              2
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Planejamento Editorial</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Criação de temas, roteiros de Reels, carrosséis e definição de campanhas de anúncios.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              3
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Produção & Veiculação</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Design gráfico refinado, redação publicitária e ativação dos anúncios no Google/Meta.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              4
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Análise de Métricas & ROI</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Reuniões mensais de apresentação de resultados, ajuste de lances e expansão de faturamento.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Casos Reais & Depoimentos -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Resultados Concretos</span>
          <h2 class="section-title">Histórias de Clientes que Escalaram Vendas</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Marcas que transformaram sua presença digital em autoridade e contratos fechados.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Nossas redes sociais eram fantasmas. Em 3 meses de parceria com a 3W, passamos a receber de <strong>5 a 10 orçamentos por dia</strong> no WhatsApp."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Juliana Nogueira</div>
              <div class="text-[11px] text-gray-500">Sócia • Móveis Planejados & Decoração</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +280% de Leads Comerciais
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A combinação de anúncios no Google com posts no Instagram gerou <strong>R$ 130 mil em novos contratos corporativos</strong> em apenas 60 dias."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Carlos Eduardo</div>
              <div class="text-[11px] text-gray-500">Diretor Comercial • Escritório Contábil</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:currency-usd" class="w-3.5 h-3.5" /> R$ 130k em Novos Contratos
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O design dos posts é impecável e a equipe responde rápido a qualquer demanda. Finalmente temos uma presença digital que reflete a qualidade do nosso serviço."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Dra. Patrícia Ramos</div>
              <div class="text-[11px] text-gray-500">Fundadora • Clínica de Dermatologia</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:star-check" class="w-3.5 h-3.5" /> Autoridade Consolidada
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
            <span>PLANO COMPLETO DE ACELERAÇÃO MENSAL</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu Plano</h2>
          <p class="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto">
            Uma agência completa trabalhando para o seu negócio por uma fração do custo de um time interno.
          </p>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Gestão de Redes Sociais:</strong> Criação de conteúdo, carrosséis educativos e roteiros de Reels persuasivos.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Gestão de Tráfego Pago (Google & Meta Ads):</strong> Campanhas otimizadas com foco em conversões diretas.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Relatório Mensal & Reunião Estratégica:</strong> Transparência total sobre custos, leads e crescimento.</span>
            </div>
          </div>

          <!-- Bônus Gratuitos -->
          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 Bônus Inclusos na Contratação:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Chatbot WhatsApp</div>
                <div class="text-[11px] text-blue-200">Automação de atendimento 24/7. <span class="line-through text-gray-400">R$ 900</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Playbook de Vendas</div>
                <div class="text-[11px] text-blue-200">Guia de fechamento de leads. <span class="line-through text-gray-400">R$ 500</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Setup de Rastreamento</div>
                <div class="text-[11px] text-blue-200">Configuração de Pixel e GA4. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <!-- Garantia Incondicional & CTA -->
          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">Garantia de 30 Dias sem Fidelidade</div>
                <div class="text-blue-200">Cancele sem multas se não aprovar nossa metodologia.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para o plano de Marketing Digital 360° com todos os bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Minha Vaga no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Plano de Marketing Digital</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha os módulos desejados e veja uma estimativa orçamentária.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="ads" />
        </div>
      </div>
    </section>

    <!-- Quebra de Objeções & FAQ Decisivo -->
    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Dúvidas Frequentes sobre o Marketing Digital 360°</h2>
          <p class="section-subtitle">Tudo sobre nossa metodologia de trabalho e entregas.</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- CTA Final — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-rose-400" />
          <span>Vagas Limitadas por Consultor</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para ter uma presença digital que gera vendas reais todos os dias?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende um diagnóstico gratuito e descubra exatamente o que sua empresa precisa para liderar o seu segmento no ambiente digital.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Quero agendar um diagnóstico gratuito de marketing digital."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Agendar Diagnóstico no WhatsApp
          </a>
          <RouterLink to="/contato" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
            Enviar Formulário de Contato
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
  title: 'Agência de Marketing Digital em Curitiba | 3W Online',
  description: 'Marketing digital 360° em Curitiba: gestão de redes sociais, Google Ads, Meta Ads, SEO e automação com inteligência artificial para sua empresa.',
  path: '/lp-mkt',
  keywords: 'marketing digital curitiba, agência de marketing curitiba, gestão de tráfego, social media curitiba',
})

const faqs = [
  { question: 'Minha empresa precisa fornecer as fotos e vídeos ou a 3W cuida de tudo?', answer: 'Nossa equipe cuida de toda a direção de arte, copywriting e edição de posts e criativos. Caso você possua fotos dos seus produtos ou vídeos institucionais, nós os incorporamos às produções profissionais.' },
  { question: 'Como acompanho os resultados do meu investimento?', answer: 'Disponibilizamos relatórios mensais claros e reuniões estratégicas para demonstrar a evolução de seguidores, cliques, mensagens recebidas e faturamento gerado.' },
  { question: 'Existe carência ou fidelidade no contrato?', answer: 'Trabalhamos com contratos mensais transparentes, sem multas rescisórias abusivas. Nosso objetivo é reter sua empresa pelos resultados consistentes obtidos mês a mês.' },
  { question: 'Em quanto tempo começo a ver novos clientes?', answer: 'As campanhas de tráfego pago geram contatos comerciais imediatos (primeiros dias), enquanto a autoridade de redes sociais consolida uma base crescente e fiel de compradores ao longo dos primeiros meses.' },
]
</script>