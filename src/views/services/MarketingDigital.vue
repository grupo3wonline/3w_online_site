<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Marketing Digital 360°' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:bullhorn" class="w-4 h-4 text-secondary-400" />
            <span>ASSESSORIA COMPLETA 360° • APENAS 3 VAGAS ABERTAS NESTE MÊS</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Marketing Digital 360° que <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Gera Vendas Previsíveis</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Tenha uma agência completa trabalhando pelo crescimento do seu negócio. Integramos gestão de redes sociais, Google Ads, Meta Ads, SEO e automação de WhatsApp sob uma única estratégia.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de uma proposta para assessoria de Marketing Digital 360° da 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Solicitar Proposta 360° no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Meu Plano
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:account-group" class="w-4 h-4 text-secondary-400" /> Equipe Multidisciplinar</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:file-chart-check" class="w-4 h-4 text-cyan-400" /> Relatórios Mensais Transparentes</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> Sem Contratos de Fidelidade</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Prova Social Imediata -->
    <section class="bg-slate-900 text-white py-6 border-y border-white/10">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+150</div>
            <div class="text-xs text-slate-300">Empresas Aceleradas</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">360°</div>
            <div class="text-xs text-slate-300">Estratégia Integrada</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+280%</div>
            <div class="text-xs text-slate-300">Crescimento Médio de Leads</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">98%</div>
            <div class="text-xs text-slate-300">Satisfação de Clientes</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Segunda Dobra — O Problema (Identificação da Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">O Cenário Atual</span>
          <h2 class="section-title">O Risco de Ter Ações de Marketing Desconectadas</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Quando suas redes sociais não conversam com os anúncios e seu site não converte leads, sua empresa perde dinheiro todos os meses.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Problemas de Ações Fragmentadas:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Múltiplos Fornecedores Desalinhados:</strong> O designer faz a arte, o gestor de tráfego sobe o anúncio e nenhum dos dois se responsabiliza pelas vendas.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Custo Elevado de Time CLT Interno:</strong> Contratar designer, redator e gestor de tráfego custa mais de R$ 15 mil/mês em salários e encargos.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Falta de Visão Global de ROI:</strong> Você não sabe exatamente de onde veio o cliente e qual canal trouxe mais lucro.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Ter fornecedores fragmentados drena seu tempo e orçamento sem gerar previsibilidade comercial.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Solução 360° da 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Um Único Parceiro Estratégico:</strong> Redes sociais, anúncios, SEO e automações alinhados para o mesmo objetivo: vender.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Economia de até 70%:</strong> Toda a estrutura de uma agência de ponta por uma fração do custo de uma contratação CLT.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Relatórios Unificados de Resultados:</strong> Visão clara de leads recebidos, taxa de conversão e faturamento gerado.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Ecossistema completo para acelerar seu faturamento mês a mês.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Pilares 360°</span>
          <h2 class="section-title">Os 4 Pilares da Assessoria Integrada</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:instagram" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">1. Redes Sociais & Branding</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Criação de autoridade com posts, carrosséis e Reels de alto padrão visual.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:target" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">2. Gestão de Tráfego Pago</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Campanhas ativas no Google e Meta Ads para captar clientes prontos para comprar.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:robot-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">3. Automação WhatsApp & IA</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Qualificação e atendimento instantâneo para não deixar nenhum lead esfriar.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:chart-timeline-variant-shimmer" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">4. Inteligência & Métricas</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Reuniões mensais para analisar o retorno financeiro e planejar o próximo passo.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Vantagens</span>
          <h2 class="section-title">Resultados de uma Estratégia Unificada</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">+280%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mais Oportunidades</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Crescimento contínuo no fluxo de novos orçamentos no WhatsApp.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">-70%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Economia de Custo</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Em comparação com a contratação de equipe interna própria.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">100%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Alinhamento</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Todos os canais falando a mesma linguagem e tom de voz.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-purple-500 mb-2">Sem Fidelidade</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Flexibilidade</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Retenção de clientes baseada exclusivamente em resultados reais.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Quinta Dobra — Prova Social com Métricas Reais -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Casos Reais</span>
          <h2 class="section-title">Resultados de Quem Contratou a Assessoria 360°</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Antes tínhamos um freelancer para os posts e outro para o Google. Com a 3W unificando tudo, nossas vendas <strong>triplicaram em 90 dias</strong>."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Carlos Eduardo</div>
              <div class="text-[11px] text-gray-500">Diretor Comercial • Escritório Contábil</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +200% em Novos Contratos
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A integração entre anúncios no Meta e o chatbot de IA no WhatsApp preencheu completamente nossa agenda de atendimentos particulares."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Dra. Vanessa Lemos</div>
              <div class="text-[11px] text-gray-500">Sócia • Clínica de Nutrição & Bem-Estar</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:calendar-check" class="w-3.5 h-3.5" /> Agenda 100% Lotada
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Transparência total nos relatórios mensais e suporte sempre acessível. A melhor agência com quem já trabalhamos em Curitiba."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Maurício Fagundes</div>
              <div class="text-[11px] text-gray-500">CEO • Construtora & Incorporadora</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-all" class="w-3.5 h-3.5" /> Parceria de 3 Anos
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
          <span class="section-label">Metodologia Ágil</span>
          <h2 class="section-title">Como Implementamos Sua Assessoria 360°</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Diagnóstico 360°</h4>
            <p class="text-xs text-gray-500">Mapeamos seu funil atual, concorrentes e diferenciais.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-secondary-100 text-secondary-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Planejamento Integrado</h4>
            <p class="text-xs text-gray-500">Definição de campanhas de tráfego e cronograma de redes.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Execução Multicanal</h4>
            <p class="text-xs text-gray-500">Ativação dos anúncios, posts e automações no WhatsApp.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Reuniões & Escala</h4>
            <p class="text-xs text-gray-500">Apresentação mensal de ROI e estratégias de expansão.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que Escolher a Assessoria 360° da 3W?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-primary-700 bg-primary-50/50">3W Online (Assessoria 360°)</th>
                <th class="p-4 text-gray-500">Múltiplos Freelancers</th>
                <th class="p-4 text-gray-500">Contratação CLT Interna</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Custo Financeiro</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Fração de 1 salário CLT</td>
                <td class="p-4 text-gray-500">Média, mas somas imprevisíveis</td>
                <td class="p-4 text-gray-500">R$ 15k+/mês com encargos trabalhistas</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Integração dos Canais</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">100% Sinergia Total</td>
                <td class="p-4 text-gray-500">Zero comunicação entre eles</td>
                <td class="p-4 text-gray-500">Depende de gestão interna</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Fidelidade Contratual</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Zero (Mensal)</td>
                <td class="p-4 text-gray-500">Sem fidelidade</td>
                <td class="p-4 text-gray-500">Rescisões CLT caríssimas</td>
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
          <span class="inline-flex items-center gap-1 bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-secondary-400" />
            <span>PACOTE COMPLETO DE MARKETING DIGITAL 360°</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso na Sua Assessoria</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Gestão de Redes Sociais & Criação de Conteúdo:</strong> Cronograma aprovado com antecedência.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Gestão de Tráfego Pago (Google & Meta Ads):</strong> Otimização contínua com foco em conversões.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Relatórios Mensais & Reunião Estratégica:</strong> Acompanhamento próximo do ROI e novas ações.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Setup Chatbot WhatsApp</div>
                <div class="text-[11px] text-blue-200">Automação de atendimento 24/7. <span class="line-through text-gray-400">R$ 900</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Playbook de Vendas</div>
                <div class="text-[11px] text-blue-200">Guia de conversão de leads. <span class="line-through text-gray-400">R$ 500</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Auditoria Digital</div>
                <div class="text-[11px] text-blue-200">Diagnóstico de presença online. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">Garantia de 30 Dias sem Fidelidade</div>
                <div class="text-blue-200">Cancele quando quiser com aviso prévio simples.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para a assessoria de Marketing Digital 360° com todos os bônus inclusos."
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Plano 360°</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha os módulos desejados e veja as estimativas.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="ads" />
        </div>
      </div>
    </section>

    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Respostas para Suas Dúvidas</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- 10. Última Dobra — CTA Final de Transformação -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-secondary-400" />
          <span>Vagas Limitadas por Consultor</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para ter uma estratégia de marketing digital completa trabalhando por você?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende um diagnóstico gratuito e descubra como acelerar as vendas da sua empresa com a 3W Online.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Quero agendar um diagnóstico gratuito de marketing digital 360°."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Agendar Diagnóstico Gratuito
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
  title: 'Agência de Marketing Digital 360° em Curitiba | 3W Online',
  description: 'Marketing digital completo em Curitiba: gestão de redes sociais, tráfego pago Google & Meta Ads, SEO e automação com inteligência artificial para sua empresa.',
  path: '/servicos/marketing-digital',
  keywords: 'marketing digital curitiba, assessoria de marketing digital, agência 360 curitiba, gestão de tráfego e redes sociais curitiba',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'O que está incluso na assessoria de marketing digital 360°?', answer: 'A assessoria inclui gestão completa de redes sociais (posts, carrosséis, roteiros de Reels), gestão de tráfego pago no Google e Meta Ads, otimização de conversão e relatórios mensais de resultados.' },
  { question: 'Minha empresa precisa ter alguém interno cuidando de marketing?', answer: 'Não! Nossa equipe cuida de todas as etapas (criação visual, redação, configuração de anúncios e relatórios), necessitando apenas da sua aprovação mensal do cronograma.' },
  { question: 'Existe fidelidade ou multa rescisória?', answer: 'Trabalhamos com contratos mensais transparentes, sem multas rescisórias abusivas. Nosso objetivo é reter sua empresa pelos resultados consistentes gerados mês a mês.' },
  { question: 'Em quanto tempo começo a ver novos clientes?', answer: 'As campanhas de tráfego pago geram contatos comerciais imediatos (primeiros dias), enquanto a autoridade de redes sociais consolida uma base crescente e fiel de compradores ao longo dos primeiros meses.' },
]
</script>
