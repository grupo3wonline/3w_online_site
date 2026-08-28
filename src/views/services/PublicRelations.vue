<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Relações Públicas' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:newspaper" class="w-4 h-4 text-secondary-400" />
            <span>ASSESSORIA DE IMPRENSA & RP EM CURITIBA • CONECTAMOS SUA MARCA À MÍDIA</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Assessoria de Imprensa que <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Coloca Sua Marca nos Grandes Portais</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Conquiste matérias espontâneas, autoridade institucional e backlinks de alta relevância para o Google. Conectamos sua empresa aos principais jornalistas e veículos de comunicação do Brasil.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento para assessoria de imprensa e relações públicas com a 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Falar com Assessor no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Assessoria
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:newspaper-variant-multiple" class="w-4 h-4 text-secondary-400" /> Releases Estruturados</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:microphone" class="w-4 h-4 text-emerald-400" /> Media Training de Porta-Vozes</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-cyan-400" /> 30 Dias de Garantia</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Prova Social Imediata -->
    <section class="bg-slate-900 text-white py-6 border-y border-white/10">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+350</div>
            <div class="text-xs text-slate-300">Matérias Publicadas</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">R$ 3.2M+</div>
            <div class="text-xs text-slate-300">Valor de Mídia Espontânea</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">100%</div>
            <div class="text-xs text-slate-300">Jornalistas Especializados</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">4.9 / 5.0</div>
            <div class="text-xs text-slate-300">Satisfação de Clientes</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Segunda Dobra — O Problema (Identificação da Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">A Falta de Notoriedade</span>
          <h2 class="section-title">Sua Empresa Presta um Serviço Excelente, Mas Ninguém na Mídia Fala de Você?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Ver concorrentes menores ganhando matérias em grandes jornais e portais acontece porque eles têm uma assessoria conectada aos jornalistas.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Problemas de Não Ter Assessoria:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Invisibilidade Institucional:</strong> Sua marca é vista apenas quando paga por anúncios, sem autoridade espontânea.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Releases Ignorados:</strong> Enviar e-mails frios para redações sem pauta jornalística relevante vai direto para a lixeira.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Porta-Vozes Despreparados:</strong> Medo de dar entrevistas ou falar em podcasts por falta de treinamento prévio.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Uma única matéria em um grande portal gera mais autoridade e confiança do que dezenas de anúncios pagos.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Assessoria de Imprensa 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Relacionamento Direto com Repórteres:</strong> Pitching personalizado para editores de economia, tecnologia, saúde e negócios.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Pautas Atraentes & Dados Exclusivos:</strong> Transformamos as conquistas da sua empresa em notícias de interesse público.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Media Training Executivo:</strong> Preparamos seus diretores para conceder entrevistas com segurança e clareza.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Notoriedade e prestígio institucional nos veículos mais influentes do país.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Serviços de RP</span>
          <h2 class="section-title">O Que Entregamos na Sua Assessoria de Imprensa</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:file-document-edit-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Releases Jornalísticos</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Textos técnicos no formato que as redações adoram receber e publicar.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:email-fast-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Pitching Exclusivo</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Contato direto com jornalistas-chave dos principais veículos nacionais e regionais.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:microphone" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Media Training</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Capacitação prática para portas-vozes se comunicarem com postura e autoridade.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:newspaper-check" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Relatório de Clipping</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Monitoramento de todas as matérias veiculadas com cálculo de valor de mídia equivalente.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Vantagens</span>
          <h2 class="section-title">Resultados de uma Presença Marcante na Mídia</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">Gratuita</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mídia Espontânea</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Espaço editorial nobre sem pagar taxas por veiculação.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">Backlinks</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">SEO de Alta Autoridade</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Links de grandes portais que elevam seu site no Google.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">Prestígio</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Confiança Plena</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Selo "Destaque na Mídia" para incluir no seu site comercial.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-purple-500 mb-2">30 Dias</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Garantia Técnica</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Acompanhamento próximo de todos os contatos com repórteres.</p>
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
                "A matéria que a 3W emplacou no portal G1 nos trouxe <strong>mais de R$ 300 mil em contratos corporativos</strong> em menos de duas semanas."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Eduardo Fonseca</div>
              <div class="text-[11px] text-gray-500">CEO • Empresa de Tecnologia B2B</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +R$ 300k em Contratos
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O media training foi essencial para eu dar entrevistas na rádio e TV com segurança e clareza. Recomendo de olhos fechados."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Dra. Letícia Rossi</div>
              <div class="text-[11px] text-gray-500">Sócia • Clínica Médica Curitiba</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5" /> Autoridade na TV
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Os relatórios de clipping mensais são impecáveis e mostram exatamente o valor de mídia conquistado. Excelente assessoria."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Rodrigo Almeida</div>
              <div class="text-[11px] text-gray-500">Diretor Institucional • Construtora</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:star-check" class="w-3.5 h-3.5" /> 100% Satisfeito
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
          <span class="section-label">Fluxo Editorial</span>
          <h2 class="section-title">Como Funciona Nossa Assessoria de Imprensa</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mapeamento de Pautas</h4>
            <p class="text-xs text-gray-500">Identificamos temas quentes e dados exclusivos da sua marca.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-secondary-100 text-secondary-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Redação Jornalística</h4>
            <p class="text-xs text-gray-500">Produção de releases no formato que as redações publicam.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Pitching Ativo</h4>
            <p class="text-xs text-gray-500">Contato direto e envio para jornalistas e editores segmentados.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Clipping & Métricas</h4>
            <p class="text-xs text-gray-500">Monitoramento e relatório com valor de mídia equivalente gerado.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que a Assessoria de Imprensa da 3W Conquista Mais Mídia?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-primary-700 bg-primary-50/50">Assessoria Proativa 3W</th>
                <th class="p-4 text-gray-500">Disparadores Automáticos de Release</th>
                <th class="p-4 text-gray-500">Agências Tradicionais Caríssimas</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Abordagem com Repórteres</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Personalizada e individual</td>
                <td class="p-4 text-gray-500">Disparo em massa (Spam)</td>
                <td class="p-4 text-gray-500">Geralmente boa, mas lenta</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Foco em Backlinks para SEO</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Sim (Links de alta autoridade)</td>
                <td class="p-4 text-gray-500">Sites agregadores sem valor</td>
                <td class="p-4 text-gray-500">Ignoram métricas digitais de SEO</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Custo-Benefício</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Investimento acessível e transparente</td>
                <td class="p-4 text-gray-500">Barato, mas não gera resultado</td>
                <td class="p-4 text-gray-500">Mensalidades astronômicas com fidelidade</td>
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
            <span>PACOTE COMPLETO DE RELAÇÕES PÚBLICAS & IMPRENSA</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso na Sua Assessoria</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Produção de Releases & Pautas Estratégicas:</strong> Conteúdo jornalístico relevante e atrativo.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Pitching Ativo para Veículos Regionais e Nacionais:</strong> Relacionamento com jornalistas segmentados.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Relatório Mensal de Clipping & Valor de Mídia:</strong> Acompanhamento transparente de todas as publicações.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Media Training</div>
                <div class="text-[11px] text-blue-200">Capacitação para entrevistas. <span class="line-through text-gray-400">R$ 1.200</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Kit Pautas Sazonais</div>
                <div class="text-[11px] text-blue-200">Ideias de pauta para todo o ano. <span class="line-through text-gray-400">R$ 600</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Relatório Clipping</div>
                <div class="text-[11px] text-blue-200">Monitoramento de menções web. <span class="line-through text-gray-400">R$ 600</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">Garantia Técnica de 30 Dias</div>
                <div class="text-blue-200">Acompanhamento contínuo de todas as ações de imprensa.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para assessoria de imprensa com todos os bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Minha Assessoria no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto de Relações Públicas</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha o plano de assessoria para sua empresa.</p>
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
          <h2 class="section-title">Respostas para Suas Dúvidas sobre Imprensa</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- 10. Última Dobra — CTA Final de Transformação -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-secondary-400" />
          <span>Vagas Limitadas por Trimestre</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para conquistar autoridade e ver sua marca nos principais veículos de notícia?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende uma conversa com nossos assessores de imprensa e descubra quais pautas da sua empresa têm potencial de notícia nacional.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar com a equipe de assessoria de imprensa da 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Falar com Assessor no WhatsApp
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
  title: 'Assessoria de Imprensa e Relações Públicas em Curitiba | 3W Online',
  description: 'Assessoria de imprensa e relações públicas em Curitiba. Conquiste matérias espontâneas em grandes jornais e portais, media training e autoridade.',
  path: '/servicos/relacoes-publicas',
  keywords: 'assessoria de imprensa curitiba, relações públicas curitiba, assessoria de comunicação curitiba, media training curitiba',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'Como funciona a conquista de matéria espontânea na imprensa?', answer: 'Identificamos acontecimentos relevantes, dados exclusivos ou inovações da sua empresa e redigimos uma pauta de interesse público para os jornalistas, que publicam a reportagem sem custo de veiculação.' },
  { question: 'A assessoria ajuda no ranqueamento SEO do meu site?', answer: 'Com certeza! Quando um grande portal de notícias menciona sua empresa e inclui um link para o seu site, o Google transfere altíssima autoridade de domínio, impulsionando suas posições orgânicas.' },
  { question: 'Vocês realizam treinamento antes das entrevistas?', answer: 'Sim! Nosso programa inclui sessões práticas de Media Training para preparar seus porta-vozes com as melhores técnicas de oratória e postura diante de repórteres.' },
  { question: 'Como acompanho as publicações que saíram sobre a minha empresa?', answer: 'Enviamos relatórios periódicos de clipping digital contendo os links das matérias, prints, dados de audiência estimada e cálculo de valor equivalente de mídia.' },
]
</script>
