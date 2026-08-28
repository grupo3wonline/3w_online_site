<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Publicidade & Propaganda' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:bullhorn-outline" class="w-4 h-4 text-rose-400" />
            <span>AGÊNCIA DE PUBLICIDADE & PROPAGANDA EM CURITIBA • CONCEITOS EXCLUSIVOS</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Publicidade & Propaganda de Alto Impacto que <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-primary-400">Gera Desejo e Vendas</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Pare de passar despercebido. Criamos conceitos publicitários marcantes, comerciais em vídeo, campanhas de resposta direta e anúncios de alto padrão visual que conectam sua marca ao público comprador.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento para campanha de publicidade e propaganda com a 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Solicitar Orçamento no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Publicidade
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:lightbulb-on" class="w-4 h-4 text-amber-400" /> Big Idea Criativa</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:video-vintage" class="w-4 h-4 text-rose-400" /> Produção Multimídia</span>
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
            <div class="text-2xl sm:text-4xl font-black text-rose-400 mb-1">+100</div>
            <div class="text-xs text-slate-300">Comerciais & Campanhas</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">+50%</div>
            <div class="text-xs text-slate-300">Mais Lembrança de Marca</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">5+ Anos</div>
            <div class="text-xs text-slate-300">de Mercado em Curitiba</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">4.9 / 5.0</div>
            <div class="text-xs text-slate-300">Avaliação Média dos Clientes</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Segunda Dobra — O Problema (Identificação da Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">A Invisibilidade Publicitária</span>
          <h2 class="section-title">Por Que Ninguém Presta Atenção na Sua Propaganda?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            O consumidor é bombardeado por mais de 5.000 anúncios por dia. Se sua mensagem for comum, ela será sumariamente ignorada.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Erros em Propagandas Genéricas:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Falta de Conceito Central (Big Idea):</strong> Peças sem graça que não despertam emoção ou curiosidade.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Textos Frios e Clichês:</strong> Frases como "qualidade e bom atendimento" que todos os concorrentes já usam.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Mídia Sem Foco em Conversão:</strong> Gastar milhares de reais em outdoors e rádios sem chamada clara para ação.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Propaganda que não gera conversas ou vendas é apenas vaidade e dinheiro perdido.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Publicidade com Foco em Resposta da 3W:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Conceito Criativo Inédito & Marcante:</strong> Ideias que grudam na mente do consumidor e diferenciam sua empresa.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Copywriting de Resposta Direta:</strong> Cada propaganda tem um motivo claro para o cliente entrar em contato agora.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Estratégia Híbrida (Digital + Offline):</strong> Conexão perfeita entre anúncios de vídeo, rádio, revistas e redes sociais.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Impacto visual que constrói marca e enche sua empresa de clientes.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Formatos Publicitários</span>
          <h2 class="section-title">O Que Produzimos Para Sua Campanha</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:video-vintage" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Comerciais em Vídeo</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Roteiros e produção cinematográfica para TV, redes sociais e canais digitais.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:billboard" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Mídia Exterior (OOH)</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Painéis digitais de LED, outdoors e busdoors de altíssimo impacto visual.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:radio-tower" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Spots de Rádio & Podcasts</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Roteiros persuasivos com locução profissional e jingles memoráveis.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:newspaper-variant-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Anúncios Impressos</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Páginas duplas em revistas, jornais e catálogos institucionais de luxo.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Vantagens</span>
          <h2 class="section-title">Resultados de uma Publicidade de Alto Nível</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-rose-500 mb-2">+50%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Lembrança de Marca</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Sua empresa sendo a primeira lembrada na hora da compra.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">100%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Resposta Direta</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Todas as peças incentivam o contato comercial imediato.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">Multicanal</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Sinergia Total</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Mesma mensagem impactando o cliente na rua e no celular.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">30 Dias</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Garantia Técnica</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Suporte para veiculação em todas as emissoras e veículos.</p>
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
                "A campanha de vídeo publicitário que a 3W criou para as redes e painéis de LED gerou mais de <strong>200 ligações e mensagens na primeira semana</strong>."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Rodrigo Mendonça</div>
              <div class="text-[11px] text-gray-500">Diretor Comercial • Concessionária de Veículos</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +200 Contatos em 7 Dias
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Criatividade fora da curva e compromisso sério com prazos de veiculação. A melhor agência de propaganda de Curitiba."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Mariana Costa</div>
              <div class="text-[11px] text-gray-500">Sócia • Rede de Clínicas Médicas</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5" /> 100% Pontual
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O conceito criado para o lançamento do nosso condomínio fechado vendeu <strong>85% dos lotes no final de semana de abertura</strong>."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Leonardo Matos</div>
              <div class="text-[11px] text-gray-500">Diretor de Incorporação • Construtora</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:star-check" class="w-3.5 h-3.5" /> 85% dos Lotes Vendidos
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
          <span class="section-label">Processo Criativo</span>
          <h2 class="section-title">Como Criamos Sua Campanha Publicitária</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Imersão & Big Idea</h4>
            <p class="text-xs text-gray-500">Desenvolvemos o conceito central marcante da campanha.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Roteiros & Peças</h4>
            <p class="text-xs text-gray-500">Criação das artes, textos persuasivos e roteiros de vídeo.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Veiculação de Mídia</h4>
            <p class="text-xs text-gray-500">Planejamento e negociação dos espaços online e offline.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Métricas & Retorno</h4>
            <p class="text-xs text-gray-500">Acompanhamento do impacto de vendas e recall da marca.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que Fazer Sua Publicidade com a 3W?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-rose-700 bg-rose-50/50">3W Online (Resposta Direta)</th>
                <th class="p-4 text-gray-500">Agências Focadas em Prêmios</th>
                <th class="p-4 text-gray-500">Criação Amadora Interna</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Foco Principal</td>
                <td class="p-4 font-bold text-emerald-600 bg-rose-50/30">Vendas & Retorno Financeiro</td>
                <td class="p-4 text-gray-500">Ganhar prêmios publicitários</td>
                <td class="p-4 text-gray-500">Apenas "preencher espaço"</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Copywriting Persuasivo</td>
                <td class="p-4 font-bold text-emerald-600 bg-rose-50/30">Linguagem de conversão direta</td>
                <td class="p-4 text-gray-500">Textos poéticos sem chamada</td>
                <td class="p-4 text-gray-500">Frases clichês repetidas</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Agilidade de Produção</td>
                <td class="p-4 font-bold text-emerald-600 bg-rose-50/30">Entrega ágil em sprints</td>
                <td class="p-4 text-gray-500">Meses de reuniões burocráticas</td>
                <td class="p-4 text-gray-500">Feito na correria sem método</td>
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
          <span class="inline-flex items-center gap-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-rose-400" />
            <span>PACOTE COMPLETO DE PUBLICIDADE & PROPAGANDA</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso na Sua Campanha</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Criação do Conceito Publicitário (Big Idea):</strong> Mensagem forte e exclusiva para sua marca.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Produção de Peças Digitais & Offline:</strong> Vídeos, banners, anúncios impressos e OOH.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Plano de Veiculação de Mídia:</strong> Distribuição estratégica nos canais mais eficientes.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Roteiros de Vídeo</div>
                <div class="text-[11px] text-blue-200">Comerciais para redes sociais. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Adaptação OOH</div>
                <div class="text-[11px] text-blue-200">Formatos para outdoor e LED. <span class="line-through text-gray-400">R$ 600</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Suporte de Mídia</div>
                <div class="text-[11px] text-blue-200">Negociação com veículos parceiros. <span class="line-through text-gray-400">R$ 600</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">Garantia Técnica de 30 Dias</div>
                <div class="text-blue-200">Ajustes e correções em todas as peças produzidas.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para criação de campanha publicitária com todos os bônus inclusos."
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto de Publicidade</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha os formatos e o alcance desejado.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="advertising" />
        </div>
      </div>
    </section>

    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Respostas para Suas Dúvidas sobre Publicidade</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- 10. Última Dobra — CTA Final de Transformação -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-rose-400" />
          <span>Vagas Limitadas para Criação de Campanhas</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para criar uma propaganda memorável que coloca sua marca no topo?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende uma reunião com nossos publicitários e descubra a Big Idea ideal para sua próxima campanha.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar com a equipe de publicidade da 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Falar com Publicitário no WhatsApp
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
  title: 'Agência de Publicidade e Propaganda em Curitiba | 3W Online',
  description: 'Agência de publicidade e propaganda em Curitiba: criação de conceitos criativos, comerciais em vídeo, campanhas de resposta direta e mídia OOH.',
  path: '/servicos/publicidade-propaganda',
  keywords: 'agência de publicidade curitiba, publicidade e propaganda curitiba, criação de campanhas publicitárias, agência de propaganda curitiba',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'A 3W cuida tanto da mídia online quanto da offline?', answer: 'Sim! Desenvolvemos conceitos integrados que funcionam tanto em comerciais para redes sociais e TV quanto em outdoors, painéis de LED, rádio e revistas impressas.' },
  { question: 'Vocês realizam a gravação e edição dos comerciais em vídeo?', answer: 'Sim! Entregamos desde o roteiro publicitário e direção de cena até a edição final com locução profissional, trilhas sonoras licenciadas e efeitos visuais.' },
  { question: 'Como é calculada a verba de veiculação nos veículos de mídia?', answer: 'Apresentamos um plano detalhado de mídia com estimativas de alcance e custo por mil impactos (CPM), permitindo que você aprove os veículos antes de qualquer contratação.' },
  { question: 'Quanto tempo leva para produzir uma campanha publicitária?', answer: 'Campanhas completas com roteiros, vídeos e peças gráficas são produzidas e aprovadas em média de 15 a 20 dias úteis.' },
]
</script>
