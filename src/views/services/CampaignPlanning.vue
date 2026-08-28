<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Planejamento de Campanhas' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-amber-500/20 text-amber-200 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:calendar-star" class="w-4 h-4 text-amber-400" />
            <span>APENAS 2 NOVAS CAMPANHAS PLANEJADAS POR MÊS • ESTRATÉGIA DEDICADA</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Planejamento de Campanhas que <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-primary-400">Batem Recordes de Vendas</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Pare de improvisar em datas comemorativas e lançamentos. Estruturamos campanhas completas de alta conversão com copy persuasiva, funil de antecipação, anúncios e automação de disparos.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de planejar a próxima campanha de vendas da minha empresa com a 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Planejar Minha Campanha no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Campanha
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:target" class="w-4 h-4 text-amber-400" /> Funil de Antecipação & Conversão</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:bullhorn" class="w-4 h-4 text-secondary-400" /> Multicanal (Meta, Google, WhatsApp)</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> 30 Dias de Garantia</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Prova Social Imediata -->
    <section class="bg-slate-900 text-white py-6 border-y border-white/10">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-2xl sm:text-4xl font-black text-amber-400 mb-1">+80</div>
            <div class="text-xs text-slate-300">Campanhas Executadas</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">R$ 4.5M+</div>
            <div class="text-xs text-slate-300">Faturamento em Lançamentos</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">100%</div>
            <div class="text-xs text-slate-300">Cronograma no Prazo</div>
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
          <span class="section-label">O Erro do Improviso</span>
          <h2 class="section-title">Por Que Suas Promoções Não Vendem Como Deveriam?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Lançar descontos de última hora sem fase de aquecimento atrai apenas clientes caçadores de preço e não cria senso de urgência.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Erros em Campanhas Amadoras:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Planejamento em Cima da Hora:</strong> Fazer posts na véspera da data comemorativa sem tempo para os anúncios performarem.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Falta de Antecipação:</strong> O público não é avisado com antecedência e não reserva orçamento para comprar de você.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Oferta sem Escassez Real:</strong> Descontos genéricos que não motivam o cliente a agir imediatamente.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Uma campanha mal planejada frustra o time de vendas e queima a imagem da sua marca.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Estrutura de Campanhas 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Fase de Antecipação Estratégica:</strong> Captação prévia de leads interessados para garantir fila de espera.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Oferta Irresistível com Bônus:</strong> Estrutura de precificação que valoriza seu produto sem canibalizar margem.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Disparos Coordenados & Tráfego Pago:</strong> Impacto simultâneo no WhatsApp, e-mail, Instagram e Google.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Metodologia comprovada para gerar picos históricos de faturamento.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Fases da Campanha</span>
          <h2 class="section-title">O Ciclo Completo de uma Campanha Lucrativa</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:fire" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">1. Aquecimento</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Geração de curiosidade, listas VIP no WhatsApp e captura de leads antecipados.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:rocket-launch" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">2. Abertura do Carrinho</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Disparo coordenado da oferta com bônus exclusivos para os primeiros compradores.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:clock-alert-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">3. Escassez Final</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Avisos de últimas horas e contagem regressiva para converter indecisos.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:handshake-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">4. Pós-Venda & Upsell</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Ações imediatas para fidelizar os compradores e oferecer novos serviços.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Ganhos Reais</span>
          <h2 class="section-title">Resultados de um Planejamento Estruturado</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-amber-500 mb-2">Picos</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Recordes de Vendas</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Concentração de receita em curto período de tempo.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">-50%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Custo por Aquisição</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Público aquecido converte muito mais barato.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">100%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Previsibilidade</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Cronograma detalhado dia a dia para a equipe.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">Sem Estresse</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Tudo Pronto</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Artes, copies e anúncios aprovados com antecedência.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Quinta Dobra — Prova Social com Métricas Reais -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Casos Reais</span>
          <h2 class="section-title">Resultados de Quem Planejou Campanhas com a 3W</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Nossa campanha de Black Friday planejada pela 3W faturou em <strong>3 dias o equivalente a 2 meses normais</strong> da loja."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Patrícia Alencar</div>
              <div class="text-[11px] text-gray-500">Diretora • E-commerce de Moda</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +200% Faturamento Mensal
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O funil de antecipação com lista VIP no WhatsApp gerou <strong>65 agendamentos antes mesmo da campanha abrir oficialmente</strong>."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Dr. Marcos Vinicius</div>
              <div class="text-[11px] text-gray-500">Sócio • Clínica de Harmonização</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5" /> 100% Agenda Preenchida
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A copy dos anúncios e os roteiros de stories foram cirúrgicos. O retorno sobre o investimento em anúncios passou de 8x."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Fabiana Guimarães</div>
              <div class="text-[11px] text-gray-500">Fundadora • Escola de Cursos Profissionalizantes</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:currency-usd" class="w-3.5 h-3.5" /> ROI de 8.4x
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
          <span class="section-label">Execução da Campanha</span>
          <h2 class="section-title">Como Estruturamos Sua Campanha</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Definição de Oferta</h4>
            <p class="text-xs text-gray-500">Desenho da proposta de valor, precificação e bônus.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Criação de Copy & Artes</h4>
            <p class="text-xs text-gray-500">Produção de banners, vídeos e scripts de mensagens.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Ativação Multicanal</h4>
            <p class="text-xs text-gray-500">Disparos no WhatsApp e ativação do tráfego pago.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Otimização em Tempo Real</h4>
            <p class="text-xs text-gray-500">Acompanhamento minuto a minuto dos fechamentos.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que Planejar Suas Campanhas com a 3W?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-amber-700 bg-amber-50/50">3W Online (Campanha Estruturada)</th>
                <th class="p-4 text-gray-500">Descontos de Última Hora</th>
                <th class="p-4 text-gray-500">Agências Tradicionais</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Fase de Antecipação</td>
                <td class="p-4 font-bold text-emerald-600 bg-amber-50/30">Lista VIP & Pré-venda ativa</td>
                <td class="p-4 text-gray-500">Nenhuma antecipação</td>
                <td class="p-4 text-gray-500">Apenas posts no dia</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Scripts de Fechamento</td>
                <td class="p-4 font-bold text-emerald-600 bg-amber-50/30">Prontos para o time comercial</td>
                <td class="p-4 text-gray-500">Vendedor improvisa</td>
                <td class="p-4 text-gray-500">Não entregam scripts</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Acompanhamento ao Vivo</td>
                <td class="p-4 font-bold text-emerald-600 bg-amber-50/30">Suporte em tempo real</td>
                <td class="p-4 text-gray-500">Zero</td>
                <td class="p-4 text-gray-500">Burocrático por ticket</td>
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
          <span class="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-amber-400" />
            <span>PACOTE COMPLETO DE PLANEJAMENTO DE CAMPANHA</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu Lançamento</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Estruturação Completa da Oferta & Bônus:</strong> Engenharia de precificação persuasiva.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Copywriting de Anúncios, E-mails & WhatsApp:</strong> Todos os textos prontos para disparo.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Gestão de Mídia & Remarketing Agressivo:</strong> Anúncios direcionados para recuperar visitantes.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Playbook WhatsApp</div>
                <div class="text-[11px] text-blue-200">Scripts de quebra de objeção. <span class="line-through text-gray-400">R$ 600</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Design de Banners</div>
                <div class="text-[11px] text-blue-200">Criativos visuais de alta conversão. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Suporte em Tempo Real</div>
                <div class="text-[11px] text-blue-200">Acompanhamento no dia da ação. <span class="line-through text-gray-400">R$ 1.000</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">Garantia Técnica de 30 Dias</div>
                <div class="text-blue-200">Acompanhamento completo de todo o pós-venda.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para planejar a campanha de vendas com todos os bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Minha Campanha no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto de Campanha</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha o formato e a dimensão da ação comercial.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="campaign" />
        </div>
      </div>
    </section>

    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Respostas para Suas Dúvidas sobre Campanhas</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- 10. Última Dobra — CTA Final de Transformação -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-amber-500/20 text-amber-200 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-amber-400" />
          <span>Vagas Limitadas para Planejamento Mensal</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para bater recordes de faturamento na sua próxima data comercial?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende uma consultoria diagnóstica gratuita e comece a estruturar sua campanha com antecedência.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de agendar uma reunião para planejar minha campanha de vendas."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Agendar Reunião no WhatsApp
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
  title: 'Planejamento de Campanhas Promocionais e Lançamentos em Curitiba | 3W Online',
  description: 'Planejamento estratégico de campanhas comerciais, Black Friday, lançamentos e datas sazonais em Curitiba. Funil de antecipação e alta conversão.',
  path: '/servicos/planejamento-campanhas',
  keywords: 'planejamento de campanhas curitiba, lançamentos digitais, campanhas sazonais curitiba, estratégia de black friday',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'Com quanto tempo de antecedência devo iniciar o planejamento de uma campanha?', answer: 'O ideal é iniciar o planejamento com 30 a 45 dias de antecedência da data de abertura das vendas para termos tempo hábil de produzir criativos e rodar a fase de captação de lista VIP.' },
  { question: 'Vocês também criam as artes e vídeos da campanha?', answer: 'Sim! Entregamos o pacote completo: copywriting persuasivo, design dos banners, roteiros de vídeos para stories/reels e disparos de WhatsApp.' },
  { question: 'A 3W gerencia os anúncios durante o período da campanha?', answer: 'Com certeza! Nossos gestores de tráfego realizam acompanhamento em tempo real para otimizar os lances e garantir o menor custo por lead possível nos dias de pico.' },
  { question: 'Funciona para empresas de serviços e comércio físico local?', answer: 'Sim! Adaptamos a metodologia tanto para e-commerces quanto para lojas físicas, clínicas, escritórios e prestadores de serviços.' },
]
</script>
