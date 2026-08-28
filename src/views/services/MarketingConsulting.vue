<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Consultoria Estratégica' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:finance" class="w-4 h-4 text-blue-400" />
            <span>APENAS 2 VAGAS DE CONSULTORIA EXECUTIVA POR MÊS • ATENDIMENTO DIRETO</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Consultoria Estratégica que <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-secondary-400">Destrava Seu Crescimento Comercial</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Pare de testar estratégias aleatórias. Diagnosticamos os gargalos do seu funil de vendas, reposicionamos sua marca e desenhamos um plano de ação prático para acelerar sua receita nos próximos 90 dias.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de agendar uma sessão diagnóstica de consultoria de marketing com a 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Agendar Sessão Diagnóstica no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Consultoria
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:chart-timeline-variant-shimmer" class="w-4 h-4 text-secondary-400" /> Plano de Ação 90 Dias</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:account-tie" class="w-4 h-4 text-cyan-400" /> Consultores com 5+ Anos de Mercado</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> Garantia de Satisfação</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Prova Social Imediata -->
    <section class="bg-slate-900 text-white py-6 border-y border-white/10">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+60</div>
            <div class="text-xs text-slate-300">Empresas Diagnosticadas</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">+40%</div>
            <div class="text-xs text-slate-300">Aumento Médio de Conversão</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">90 Dias</div>
            <div class="text-xs text-slate-300">Para Resultados Práticos</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">4.9 / 5.0</div>
            <div class="text-xs text-slate-300">Avaliação de Satisfação</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Segunda Dobra — O Problema (Identificação da Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">A Estagnação Comercial</span>
          <h2 class="section-title">Sua Empresa Bateu no Teto de Faturamento?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Sem clareza estratégica, mais dinheiro investido em marketing vira apenas mais desperdício.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Sintomas de Falta de Estratégia:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Gargalos Ocultos no Funil:</strong> Você atrai visitantes, mas não sabe em qual etapa exata eles estão desistindo.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Time Comercial Desalinhado:</strong> Vendedores sem roteiros de resposta que perdem leads quentes no WhatsApp.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Investimentos Sem Retorno Claro:</strong> Dinheiro gasto em ações pontuais sem mensuração de ROI.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Tentar resolver problemas estratégicos apenas postando mais nas redes não vai aumentar suas vendas.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Consultoria Estratégica 3W:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Mapeamento Preciso de Gargalos:</strong> Identificamos exatamente onde sua operação está perdendo dinheiro.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Plano Tático de Ação em 90 Dias:</strong> Metas claras, canais prioritários e responsáveis definidos.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Acompanhamento Quinzenal de Metas:</strong> Reuniões de alinhamento com a diretoria para garantir a execução.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Decisões comerciais embasadas em dados e inteligência de mercado.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Áreas de Diagnóstico</span>
          <h2 class="section-title">O Que Analisamos na Sua Consultoria</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:filter-variant" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Funil de Vendas</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Taxa de conversão de visitantes em leads e de leads em contratos fechados.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:account-cash-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">CAC & LTV</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Custo de aquisição de clientes e quanto cada cliente gera ao longo do tempo.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:domain" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Posicionamento</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Comparativo com os 3 principais concorrentes diretos do seu segmento.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:chart-line" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Matriz de Canais</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Definição dos melhores canais de mídia para concentrar o orçamento.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Ganhos Reais</span>
          <h2 class="section-title">Resultados de uma Consultoria Estratégica</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">+40%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Conversão Comercial</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Aumento médio no aproveitamento dos leads que chegam à empresa.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">90 Dias</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Direcionamento Claro</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Plano prático dia a dia sem perda de tempo em reuniões vazias.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">-35%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Desperdício de Mídia</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Corte de gastos em canais que não trazem retorno comprovado.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-purple-500 mb-2">Direto com Sócios</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Nível Executivo</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Atendimento realizado por consultores seniores experientes.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Quinta Dobra — Prova Social com Métricas Reais -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Depoimentos</span>
          <h2 class="section-title">O Que Nossos Clientes Dizem</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A consultoria da 3W identificou que estávamos perdendo 60% dos clientes no atendimento de WhatsApp. Ajustamos o processo e o faturamento <strong>cresceu 45% em 60 dias</strong>."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Guilherme Prado</div>
              <div class="text-[11px] text-gray-500">Diretor Executivo • Construtora Curitiba</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +45% Faturamento
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Plano extremamente prático e direto ao ponto. Sem teorias cansativas, apenas ações que a nossa equipe conseguiu implementar na mesma semana."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Renata Silveira</div>
              <div class="text-[11px] text-gray-500">CFO • Indústria de Alimentos</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5" /> 100% Prático
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Excelente visão de negócio e inteligência de dados. A clareza que eles trouxeram para o nosso time de marketing foi transformadora."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Dr. Paulo Henrique</div>
              <div class="text-[11px] text-gray-500">Fundador • Rede de Clínicas</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:star-check" class="w-3.5 h-3.5" /> Clareza Total
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Sexta Dobra — Como Funciona em 4 Passos -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Ciclo da Consultoria</span>
          <h2 class="section-title">Como Funciona a Mentoria Estratégica</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Diagnóstico Executivo</h4>
            <p class="text-xs text-gray-500">Entrevistas e auditoria completa de números e canais.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mapeamento de Gargalos</h4>
            <p class="text-xs text-gray-500">Identificação das fugas de dinheiro no funil de vendas.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-secondary-100 text-secondary-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Plano de Ação 90D</h4>
            <p class="text-xs text-gray-500">Entrega do plano detalhado com metas e cronograma.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Sessões Quinzenais</h4>
            <p class="text-xs text-gray-500">Acompanhamento contínuo da execução com a diretoria.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que a Consultoria 3W Gera Mais Resultados?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-blue-700 bg-blue-50/50">Consultoria Prática 3W</th>
                <th class="p-4 text-gray-500">Consultorias Tradicionais</th>
                <th class="p-4 text-gray-500">Cursos Gravados Genéricos</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Foco das Entregas</td>
                <td class="p-4 font-bold text-emerald-600 bg-blue-50/30">Plano prático de 90 dias com ROI</td>
                <td class="p-4 text-gray-500">Slides teóricos intermináveis</td>
                <td class="p-4 text-gray-500">Aulas que você não aplica</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Personalização</td>
                <td class="p-4 font-bold text-emerald-600 bg-blue-50/30">100% individual para seu negócio</td>
                <td class="p-4 text-gray-500">Modelos padronizados</td>
                <td class="p-4 text-gray-500">Conteúdo genérico</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Acompanhamento</td>
                <td class="p-4 font-bold text-emerald-600 bg-blue-50/30">Sessões quinzenais ao vivo</td>
                <td class="p-4 text-gray-500">Entregam o relatório e somem</td>
                <td class="p-4 text-gray-500">Sem acompanhamento</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 8. Oitava Dobra — Oferta Comercial + Bônus + Garantia -->
    <section class="section-padding bg-gradient-to-b from-slate-900 to-[#0a1628] text-white">
      <div class="container max-w-4xl">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-blue-400" />
            <span>PACOTE EXECUTIVO DE CONSULTORIA ESTRATÉGICA</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso na Sua Mentoria</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Diagnóstico Completo de Marketing & Vendas:</strong> Mapeamento integral de funil e concorrentes.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Plano Tático de Ação para 90 Dias:</strong> Guia com ações prioritárias, canais e metas.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Sessões Quinzenais de Alinhamento com a Diretoria:</strong> Acompanhamento ao vivo dos resultados.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Matriz de KPIs</div>
                <div class="text-[11px] text-blue-200">Painel com métricas essenciais. <span class="line-through text-gray-400">R$ 600</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Playbook Comercial</div>
                <div class="text-[11px] text-blue-200">Scripts de fechamento para time. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Alinhamento Equipe</div>
                <div class="text-[11px] text-blue-200">Workshop com os vendedores. <span class="line-through text-gray-400">R$ 1.000</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">Garantia de Satisfação Total</div>
                <div class="text-blue-200">Devolvemos o valor se a primeira sessão não trouxer clareza.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para a consultoria de marketing com todos os bônus inclusos."
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

    <!-- 9. Nona Dobra — Simulador de Preço + Quebra de Objeções (FAQ) -->
    <section ref="simulatorRef" class="testimonial-section section-padding">
      <div class="container">
        <div class="text-center mb-10 max-w-2xl mx-auto">
          <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Simulação Imediata</span>
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto de Consultoria</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha a intensidade e o formato do acompanhamento.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="consulting" />
        </div>
      </div>
    </section>

    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Respostas para Suas Dúvidas sobre Consultoria</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- 10. Última Dobra — CTA Final de Transformação -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-blue-400" />
          <span>Vagas Limitadas por Mês</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para destravar o crescimento da sua empresa com inteligência estratégica?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende sua sessão diagnóstica inicial gratuita e descubra exatamente o que precisa ser ajustado no seu funil comercial.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de agendar uma sessão diagnóstica de consultoria estratégica."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Agendar Sessão Diagnóstica
          </a>
          <RouterLink to="/contato" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
            Enviar Formulário de Contato
          </RouterLink>
        </div>
        <div class="mt-6 text-xs text-blue-300">
          Sem compromisso • Resposta em minutos • 30 dias de garantia
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
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Consultoria Estratégica em Marketing em Curitiba | 3W Online',
  description: 'Consultoria em marketing estratégico e vendas em Curitiba. Diagnóstico de funil, posicionamento de mercado, CAC, LTV e plano de ação de 90 dias.',
  path: '/servicos/consultoria-marketing',
  keywords: 'consultoria de marketing curitiba, consultoria estratégica curitiba, inteligência de mercado curitiba, diagnóstico comercial',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'Qual a diferença entre a consultoria e a execução de marketing?', answer: 'A consultoria é voltada para a tomada de decisão estratégica dos sócios e diretores, diagnosticando problemas de funil, precificação e canais, enquanto a execução é o operacional prático de criação e veiculação de anúncios.' },
  { question: 'A consultoria é online ou presencial?', answer: 'Realizamos atendimentos presenciais em Curitiba e Região Metropolitana ou reuniões executivas por videoconferência com gravação para empresas de todo o Brasil.' },
  { question: 'Quanto tempo dura o programa de consultoria?', answer: 'Nosso programa padrão tem duração de 90 dias com encontros quinzenais para acompanhamento direto da implementação e análise dos indicadores de ROI.' },
  { question: 'A 3W ajuda a treinar os vendedores da minha empresa?', answer: 'Sim! Como parte da consultoria, entregamos playbooks comerciais e realizamos alinhamento com seu time de vendas para otimizar o fechamento de propostas no WhatsApp.' },
]
</script>
