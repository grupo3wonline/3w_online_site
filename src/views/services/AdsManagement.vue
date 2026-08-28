<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Gestão de Anúncios' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4 animate-pulse">
            <Icon icon="mdi:fire" class="w-4 h-4 text-rose-400" />
            <span>APENAS 3 VAGAS PARA NOVAS CONTAS NESTE MÊS • ATENDIMENTO VIP</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Gestão de Tráfego Pago que <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Multiplica Suas Vendas</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Pare de queimar dinheiro em anúncios que não convertem. Criamos campanhas estratégicas no Google Ads e Meta Ads para colocar leads qualificados no WhatsApp da sua empresa todos os dias.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de um diagnóstico gratuito dos meus anúncios com a 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Garantir Diagnóstico Gratuito no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Verba & Retorno
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:certificate" class="w-4 h-4 text-secondary-400" /> Google & Meta Certified</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> Sem Contratos de Fidelidade</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:clock-fast" class="w-4 h-4 text-cyan-400" /> Início em até 48 Horas</span>
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
            <div class="text-xs text-slate-300">Contas Gerenciadas</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">R$ 2.8M+</div>
            <div class="text-xs text-slate-300">Faturamento Gerado</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">-42%</div>
            <div class="text-xs text-slate-300">Custo Médio por Lead</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">4.9 / 5.0</div>
            <div class="text-xs text-slate-300">Avaliação Média no Google</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Segunda Dobra — O Problema (Identificação da Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">O Prejuízo Invisível</span>
          <h2 class="section-title">Por Que Seus Anúncios Não Estão Trazendo Lucro?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            A maioria dos empresários comete os mesmos erros ao tentar anunciar sem estratégia técnica de dados.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Erros que Consomem Sua Verba:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Botão "Impulsionar":</strong> Entrega seus anúncios para pessoas aleatórias que só deixam curtidas vazias.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Palavras-Chave Amplas no Google:</strong> Você paga caro por buscas de curiosos que não têm intenção de compra.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Falta de Rastreamento (Pixel & GA4):</strong> Você não sabe qual anúncio gerou venda e continua desperdiçando orçamento.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Anunciar sem otimização diária de lances é queimar o dinheiro da sua empresa.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Gestão de Tráfego 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Google Search com Foco em Fundo de Funil:</strong> Apareça apenas para quem está buscando comprar agora.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Criativos Persuasivos no Meta Ads:</strong> Copywriting de resposta direta para gerar conversas imediatas no WhatsApp.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Otimização Diária de Lances:</strong> Negativação contínua de termos inúteis para reduzir seu custo por lead.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Metodologia focada exclusivamente em retorno financeiro sobre o investimento.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Canais Estratégicos</span>
          <h2 class="section-title">Onde Posicionamos Seus Anúncios</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:google" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Google Search & PMax</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Esteja no topo da pesquisa quando o cliente digitar o que você vende.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:instagram" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Instagram & Reels Ads</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Anúncios visuais impactantes com chamada direta para mensagem.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:refresh" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Remarketing Ativo</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Persiga os visitantes que não compraram e recupere vendas perdidas.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:video-vintage" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Vídeo & Display Ads</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Comerciais em vídeo para construir autoridade e atrair clientes qualificados.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Resultados</span>
          <h2 class="section-title">Métricas Médias Alcançadas por Nossos Clientes</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">-42%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Custo por Lead</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Redução expressiva no valor pago por cada mensagem comercial.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">+300%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mais Contatos</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Aumento consistente no volume de oportunidades no WhatsApp.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">4x a 7x</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">ROI Médio</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Retorno sobre o valor investido em anúncios nas plataformas.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-purple-500 mb-2">Sem Fidelidade</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Risco Zero</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Cancele quando quiser com aviso prévio de 30 dias.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Quinta Dobra — Prova Social com Métricas Reais -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Casos de Sucesso</span>
          <h2 class="section-title">Resultados Reais de Tráfego Pago</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Estávamos gastando R$ 1.500/mês sem receber quase nada. A 3W reestruturou nossas campanhas e no primeiro mês fechamos <strong>38 novos contratos</strong>."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Dr. Eduardo Santos</div>
              <div class="text-[11px] text-gray-500">Clínica Odontológica • Curitiba/PR</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +320% Faturamento
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O Google Ads gerenciado pela 3W nos gerou <strong>R$ 480 mil em propostas comerciais</strong> para instalações solares industriais em 60 dias."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Mariana Costa</div>
              <div class="text-[11px] text-gray-500">Diretora Comercial • Setor de Energia</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> ROI de 6.2x
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Reduzimos nosso custo por mensagem de R$ 18 para R$ 6. O volume de contatos no WhatsApp é constante todos os dias."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Rodrigo Almeida</div>
              <div class="text-[11px] text-gray-500">Sócio • Consultoria Empresarial</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-all" class="w-3.5 h-3.5" /> -66% Custo por Lead
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
          <span class="section-label">Processo Ágil</span>
          <h2 class="section-title">Como Iniciamos Sua Gestão de Tráfego</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Diagnóstico Gratuito</h4>
            <p class="text-xs text-gray-500">Analisamos suas contas antigas e concorrentes.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-secondary-100 text-secondary-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Planejamento & Copy</h4>
            <p class="text-xs text-gray-500">Criação dos anúncios e segmentações de público.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Setup & Ativação</h4>
            <p class="text-xs text-gray-500">Configuração de Pixel/GA4 e publicação em 48h.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Escala & Relatórios</h4>
            <p class="text-xs text-gray-500">Otimização diária de lances para maximizar o lucro.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que a 3W Online Entrega Mais Resultado?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-primary-700 bg-primary-50/50">3W Online</th>
                <th class="p-4 text-gray-500">Agências Tradicionais</th>
                <th class="p-4 text-gray-500">Anunciar Sozinho</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Acompanhamento</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Diário por Gestor Sênior</td>
                <td class="p-4 text-gray-500">Delegado a estagiários</td>
                <td class="p-4 text-gray-500">Apenas quando sobra tempo</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Fidelidade Contratual</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Zero (Mensal)</td>
                <td class="p-4 text-gray-500">Multas pesadas de 12 meses</td>
                <td class="p-4 text-gray-500">Sem fidelidade</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Transparência de Verba</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">100% Paga Direto ao Google/Meta</td>
                <td class="p-4 text-gray-500">Muitas cobram margem oculta</td>
                <td class="p-4 text-gray-500">Transparente, mas sem ROI</td>
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
            <span>PACOTE COMPLETO DE GESTÃO DE TRÁFEGO</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso na Sua Gestão</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Gestão Completa Google Ads & Meta Ads:</strong> Estratégia de busca, display, reels e stories.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Copywriting Persuasivo:</strong> Títulos e textos de anúncios que geram cliques qualificados.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Otimização Diária de Lances:</strong> Eliminação contínua de termos inúteis para baixar o CPL.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Setup GA4 & Pixel</div>
                <div class="text-[11px] text-blue-200">API de Conversões Meta. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Playbook WhatsApp</div>
                <div class="text-[11px] text-blue-200">Scripts de fechamento de vendas. <span class="line-through text-gray-400">R$ 500</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Suporte VIP Direto</div>
                <div class="text-[11px] text-blue-200">Canal exclusivo com gestor sênior. <span class="line-through text-gray-400">R$ 600</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">Garantia de 30 Dias sem Fidelidade</div>
                <div class="text-blue-200">Cancele quando quiser se não aprovar nossa metodologia.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para gestão de tráfego com todos os bônus inclusos."
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Investimento em Anúncios</h2>
          <p class="text-xs sm:text-sm text-blue-200">Veja projeções de cliques e alcance para o seu nicho.</p>
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
          <h2 class="section-title">Respostas para Suas Dúvidas sobre Anúncios</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- 10. Última Dobra — CTA Final de Transformação -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-rose-400" />
          <span>Vagas Limitadas por Consultor</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para receber contatos de compradores todos os dias?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende seu diagnóstico gratuito agora mesmo e descubra como colocar sua empresa no topo das buscas.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Quero agendar meu diagnóstico gratuito de tráfego pago."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Agendar Diagnóstico Grátis
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
  title: 'Gestão de Anúncios e Tráfego Pago em Curitiba | Google & Meta Ads | 3W Online',
  description: 'Gestão profissional de anúncios no Google Ads e Meta Ads em Curitiba. Atraia leads qualificados todos os dias com alto ROI e sem fidelidade contratual.',
  path: '/servicos/gestao-anuncios',
  keywords: 'gestão de anúncios curitiba, tráfego pago curitiba, google ads curitiba, instagram ads curitiba, agência de tráfego curitiba',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'Qual o valor mínimo recomendado para investir em anúncios?', answer: 'Recomendamos uma verba inicial de mídia a partir de R$ 20 a R$ 30 por dia (R$ 600 a R$ 900/mês) para que as plataformas gerem dados suficientes de aprendizado.' },
  { question: 'A verba de anúncios é paga para a 3W Online ou para o Google/Meta?', answer: 'A verba de anúncios é paga diretamente por você ao Google e Meta via cartão de crédito ou boleto da sua própria conta de anúncios. Para a 3W Online, você paga apenas a taxa de gestão estratégica.' },
  { question: 'Em quanto tempo começo a receber os primeiros contatos?', answer: 'Campanhas de tráfego pago geram contatos comerciais imediatos. É comum receber os primeiros leads qualificados nas primeiras 24 a 48 horas após a ativação.' },
  { question: 'Existe fidelidade contratual na gestão de tráfego?', answer: 'Não exigimos fidelidade forçada. Nossos contratos são mensais com aviso prévio simples de 30 dias.' },
]
</script>
