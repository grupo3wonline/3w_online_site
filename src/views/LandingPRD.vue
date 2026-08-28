<template>
  <div class="landing-prd-page">
    <!-- Hero / Primeira Dobra — Dark Navy com Escassez & Confiança -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Engenharia de Soluções Digitais' }]" />

        <div class="max-w-4xl mt-4">
          <!-- Selo de Escassez -->
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:rocket-launch-outline" class="w-4 h-4 text-secondary-400" />
            <span>SOLUÇÕES DIGITAIS & ENGENHARIA DE SOFTWARE SOB MEDIDA • B2B</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Engenharia de Software de Alta Performance para <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Escalar Sua Operação</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Desenvolvimento de plataformas web robustas, portais corporativos e integrações de APIs com Vue 3, TypeScript e nuvem de alta disponibilidade. Código 100% de sua propriedade.
          </p>

          <!-- CTAs Principais -->
          <div class="flex flex-wrap gap-4 items-center mb-10">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar com a equipe de engenharia sobre uma solução digital sob medida."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Falar com Engenheiro no WhatsApp
            </a>
            <a href="#simulador" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Escopo de Software
            </a>
          </div>

          <!-- Elementos de Confiança Próximos ao CTA -->
          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-lock-outline" class="w-4 h-4 text-emerald-400" /> Conformidade Total LGPD</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:server-network" class="w-4 h-4 text-secondary-400" /> 99.9% Uptime Garantido</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:file-document-check-outline" class="w-4 h-4 text-cyan-400" /> Transferência de Direitos Autorais</span>
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
            <div class="text-xs text-slate-300">Projetos de Software Concluídos</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">99.9%</div>
            <div class="text-xs text-slate-300">Disponibilidade em Nuvem</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">60%</div>
            <div class="text-xs text-slate-300">Redução de Custos Operacionais</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">4.9 / 5.0</div>
            <div class="text-xs text-slate-300">Avaliação Média dos Clientes</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problema / O Custo da Inação (Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Gargalos Operacionais</span>
          <h2 class="section-title">O Que Impede Sua Operação de Escalar com Segurança?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Processos manuais e softwares genéricos criam barreiras que limitam o crescimento da sua empresa.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Riscos de Softwares Inadequados:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Sistemas Isolados:</strong> Dados desconectados entre vendas, estoque e financeiro, gerando retrabalho diário.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Licenças Abusivas por Usuário:</strong> Mensalidades que aumentam conforme sua equipe cresce, estrangulando o caixa.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Falta de Suporte Técnico Especializado:</strong> Chamados que demoram semanas para serem atendidos por grandes fornecedores.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Insegurança de Dados:</strong> Falta de conformidade com a LGPD e ausência de backups automáticos em nuvem.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Empresas que não modernizam seus sistemas perdem competitividade ano após ano.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Engenharia de Software 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Arquitetura de Microsserviços & APIs:</strong> Conectamos seus sistemas legados, gateways de pagamento e WhatsApp.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Usuários Ilimitados:</strong> Sem cobrança por usuário cadastrado. Adicione quantos colaboradores precisar.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Atendimento Ágil Direto com Engenheiros:</strong> Sem atendentes intermediários; resolução rápida de qualquer demanda.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Conformidade e Backup em Nuvem:</strong> Banco de dados relacional criptografado e backups automáticos diários.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Soluções turn-key com código-fonte 100% de propriedade do cliente.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Como Funciona em 4 Passos -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Metodologia</span>
          <h2 class="section-title">Etapas do Desenvolvimento de Engenharia</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Controle total do cronograma e entregas incrementais a cada sprint.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              1
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Diagnóstico de Arquitetura</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Mapeamos as regras de negócio, fluxos de dados e integrações necessárias.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              2
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Prototipagem & Schema</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Desenhamos a modelagem de banco de dados e telas interativas para validação.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              3
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Desenvolvimento em Sprints</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Codificação limpa com Vue 3/TypeScript e validações parciais quinzenais.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              4
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Deploy & Garantia 30 Dias</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Publicação em nuvem com monitoramento e 30 dias de suporte gratuito pós-lançamento.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Casos Reais & Depoimentos -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Casos B2B</span>
          <h2 class="section-title">Resultados Comprovados em Operações Reais</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Veja como transformamos processos manuais em softwares altamente lucrativos.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O portal B2B desenvolvido pela 3W Online automatizou mais de <strong>600 pedidos mensais</strong> que antes dependiam de digitação manual de e-mails."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Marcelo Castro</div>
              <div class="text-[11px] text-gray-500">Diretor de TI • Indústria Metalúrgica</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> -60% Tempo Operacional
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A segurança e a velocidade de resposta do sistema nos deram total tranquilidade com a LGPD. A entrega foi feita exatamente dentro do prazo do contrato."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Camila Fontoura</div>
              <div class="text-[11px] text-gray-500">Supervisora de Operações • Saúde & Clínicas</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:shield-check" class="w-3.5 h-3.5" /> 100% LGPD Compliant
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Excelente equipe técnica. Os engenheiros entenderam a complexidade do nosso negócio na primeira reunião e entregaram um sistema impecável."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Henrique Viana</div>
              <div class="text-[11px] text-gray-500">CFO • Empresa de Logística</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-all" class="w-3.5 h-3.5" /> Entrega em Sprints Ágeis
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
            <span>PACOTE CORPORATIVO DE ENGENHARIA</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Sua Empresa Recebe</h2>
          <p class="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto">
            Tudo o que é necessário para uma plataforma web segura e escalável.
          </p>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Arquitetura Moderna com Vue 3 & TypeScript:</strong> Frontend veloz e backend escalável com PostgreSQL.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Integração com APIs & Gateways:</strong> WhatsApp, Pagamentos, Webhooks e sistemas de terceiros.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Código-Fonte Integralmente Transferido:</strong> Sua empresa é proprietária absoluta dos direitos autorais.</span>
            </div>
          </div>

          <!-- Bônus Gratuitos -->
          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 Bônus Especiais Inclusos no Contrato:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Modelagem de Dados</div>
                <div class="text-[11px] text-blue-200">Diagrama de arquitetura relacional. <span class="line-through text-gray-400">R$ 1.200</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Documentação Swagger</div>
                <div class="text-[11px] text-blue-200">Documentação técnica de APIs. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Suporte VIP 30 Dias</div>
                <div class="text-[11px] text-blue-200">Acompanhamento com engenheiro sênior. <span class="line-through text-gray-400">R$ 1.500</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <!-- Garantia Incondicional & CTA -->
          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">30 Dias de Garantia Técnica</div>
                <div class="text-blue-200">Correções e estabilização gratuitas pós-entrega.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de uma consultoria técnica de engenharia de software sob medida."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Falar com Engenheiro no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Estime o Investimento da Sua Solução</h2>
          <p class="text-xs sm:text-sm text-blue-200">Selecione as funcionalidades e obtenha a estimativa orçamentária.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="system" />
        </div>
      </div>
    </section>

    <!-- Quebra de Objeções & FAQ Decisivo -->
    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Dúvidas Frequentes sobre Soluções Digitais B2B</h2>
          <p class="section-subtitle">Esclareça suas dúvidas técnicas e comerciais.</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- CTA Final — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-rose-400" />
          <span>Atendimento Direto com Engenheiros Seniores</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para construir o software sob medida da sua empresa?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende uma reunião de arquitetura técnica sem custos e descubra o plano de desenvolvimento ideal.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de agendar uma reunião técnica com a engenharia da 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Agendar Reunião no WhatsApp
          </a>
          <RouterLink to="/contato" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
            Solicitar Proposta Formal
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
  title: 'Engenharia de Software e Soluções Digitais B2B em Curitiba | 3W Online',
  description: 'Soluções digitais e engenharia de software sob medida em Curitiba: sistemas escaláveis, portais corporativos e microsserviços com Vue 3 e TypeScript.',
  path: '/landing-prd',
  keywords: 'engenharia de software curitiba, soluções digitais b2b, desenvolvimento sistemas web, software sob medida curitiba',
})

const faqs = [
  { question: 'Minha empresa precisa ter uma equipe interna de TI para contratar a 3W?', answer: 'Não! Atuamos como sua software house parceira, cuidando de toda a arquitetura, desenvolvimento, deploy e suporte contínuo.' },
  { question: 'Como é garantida a segurança e privacidade dos dados (LGPD)?', answer: 'Aplicamos criptografia de ponta a ponta, isolamento de bancos de dados relacionais e práticas rigorosas de conformidade com a LGPD (Lei nº 13.709/2018).' },
  { question: 'É possível integrar o novo sistema com softwares legados da nossa empresa?', answer: 'Sim! Desenvolvemos APIs REST e Webhooks para integrar com ERPs existentes, bancos de dados legados, gateways de pagamento e sistemas de CRM.' },
  { question: 'Qual a metodologia de acompanhamento durante o desenvolvimento?', answer: 'Trabalhamos com metodologia ágil baseada em sprints quinzenais, onde você acompanha as entregas em ambiente de homologação e valida cada funcionalidade.' },
]
</script>