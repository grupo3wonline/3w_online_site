<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Apps Mobile' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:cellphone-link" class="w-4 h-4 text-secondary-400" />
            <span>DESENVOLVIMENTO DE APPS IOS & ANDROID • PUBLICAS NAS LOJAS GARANTIDA</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Aplicativos Mobile que <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Fidelizam Seus Clientes</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Tenha sua marca presente na tela de início dos seus clientes. Desenvolvemos aplicativos nativos e multiplataforma para iOS e Android com notificações push, pagamentos integrados e alta performance.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento para desenvolvimento de aplicativo mobile."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Solicitar Orçamento de App no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Meu App
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:apple" class="w-4 h-4 text-white" /> iOS App Store</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:google-play" class="w-4 h-4 text-emerald-400" /> Google Play Store</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-secondary-400" /> 30 Dias de Garantia</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Prova Social Imediata -->
    <section class="bg-slate-900 text-white py-6 border-y border-white/10">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">100%</div>
            <div class="text-xs text-slate-300">Aprovação nas Lojas</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">iOS & Android</div>
            <div class="text-xs text-slate-300">Base de Código Única</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+300%</div>
            <div class="text-xs text-slate-300">Engajamento com Push</div>
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
          <span class="section-label">O Desafio Mobile</span>
          <h2 class="section-title">Por Que Sua Empresa Precisa de um App Próprio?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Depender apenas de sites no navegador faz com que o cliente esqueça sua marca minutos após a compra.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Desafios sem Aplicativo Próprio:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Falta de Canal Direto:</strong> Você precisa pagar anúncios novamente para falar com quem já é seu cliente.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Experiência Lenta em Navegadores:</strong> Páginas da web móvel sofrem com conexões fracas e não oferecem recursos nativos.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Dificuldade de Retenção e Recorrência:</strong> Clientes compram uma vez e não voltam com frequência.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Um app instalado no celular do cliente é um canal de vendas direto e gratuito 24h por dia.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Solução em Apps da 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Notificações Push Gratuitas:</strong> Envie promoções e avisos direto na tela de bloqueio do cliente sem custo de SMS.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Experiência Fluida & Offline:</strong> Telas ultrarrápidas com navegação intuitiva que encantam o usuário.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Publicação Completa nas Lojas:</strong> Cuidamos de todo o processo burocrático da Apple e do Google.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Aplicativos profissionais que geram fidelidade e compras recorrentes.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Recursos do App</span>
          <h2 class="section-title">O Que Implementamos no Seu Aplicativo</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:bell-ring-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Notificações Push</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Disparos instantâneos segmentados por comportamento do usuário.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:credit-card-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Pagamento Integrado</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Checkout transparente com PIX, Cartão e carteiras digitais (Apple Pay / Google Pay).</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:map-marker-radius-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Geolocalização & Mapas</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Rastreamento de entregas, rotas e busca de lojas próximas por GPS.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:view-dashboard-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Painel de Controle Web</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Área administrativa para você gerenciar usuários, banners e métricas em tempo real.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Vantagens</span>
          <h2 class="section-title">Resultados de Ter um App com a 3W</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">2 em 1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">iOS e Android</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Economia de 50% no desenvolvimento com código unificado.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">+300%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Engajamento</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Abertura de notificações push muito superior ao e-mail.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">100%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Aprovação</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Garantia de conformidade com as diretrizes das lojas.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-purple-500 mb-2">30 Dias</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Garantia Técnica</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Suporte e correções sem custo adicional pós-lançamento.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Quinta Dobra — Prova Social com Métricas Reais -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Depoimentos</span>
          <h2 class="section-title">Quem Criou App com a 3W Recomenda</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O app de agendamento e compras que a 3W desenvolveu dobrou a frequência de pedidos dos nossos clientes fiéis. O push notification funciona como mágica."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Gabriel Fontana</div>
              <div class="text-[11px] text-gray-500">Fundador • Rede de Barbearias & Estética</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +110% Pedidos Recorrentes
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A aprovação na Apple Store foi rápida e sem dores de cabeça. A equipe da 3W cuidou de todos os testes e requisitos de segurança."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Mariana Bezerra</div>
              <div class="text-[11px] text-gray-500">COO • Startup de Educação</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5" /> Publicação em 15 Dias
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Design moderno, código limpo e suporte excepcional. O painel administrativo web facilita demais a gestão dos nossos motoristas e pedidos."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Leonardo Matos</div>
              <div class="text-[11px] text-gray-500">Diretor • Logística & Entregas</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:star-check" class="w-3.5 h-3.5" /> Nota 4.9 nas Lojas
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
          <span class="section-label">Processo de Criação</span>
          <h2 class="section-title">Como Desenvolvemos Seu App</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">UX/UI & Telas</h4>
            <p class="text-xs text-gray-500">Desenhamos a interface interativa para sua validação.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-secondary-100 text-secondary-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Desenvolvimento</h4>
            <p class="text-xs text-gray-500">Codificação para iOS e Android com base unificada.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Testes Reais</h4>
            <p class="text-xs text-gray-500">Validação em múltiplos aparelhos e homologação.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Publicação nas Lojas</h4>
            <p class="text-xs text-gray-500">Deploy na App Store e Google Play com 30 dias de garantia.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que Desenvolver Seu App com a 3W?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-primary-700 bg-primary-50/50">3W Online</th>
                <th class="p-4 text-gray-500">Desenvolvimento Nativo Tradicional</th>
                <th class="p-4 text-gray-500">Criadores de Apps Genéricos</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Custo & Prazo</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Otimizado (Multiplataforma)</td>
                <td class="p-4 text-gray-500">Dobro do custo (2 equipes separadas)</td>
                <td class="p-4 text-gray-500">Barato, mas trava frequentemente</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Publicação nas Lojas</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Garantida e Executada</td>
                <td class="p-4 text-gray-500">Garantida, mas demorada</td>
                <td class="p-4 text-gray-500">Alto risco de rejeição na Apple</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Propriedade do Código</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">100% da Sua Empresa</td>
                <td class="p-4 text-gray-500">Sim</td>
                <td class="p-4 text-gray-500">Não (preso à plataforma deles)</td>
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
            <span>PACOTE COMPLETO DE DESENVOLVIMENTO MOBILE</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu App</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>App para iOS e Android:</strong> Publicado oficialmente na App Store e Google Play.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Painel Administrativo Web Completo:</strong> Gerencie conteúdos, usuários e métricas facilmente.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Código-Fonte 100% Transferido:</strong> Sua empresa é proprietária absoluta do software criado.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Publicação nas Lojas</div>
                <div class="text-[11px] text-blue-200">Homologação Apple & Google. <span class="line-through text-gray-400">R$ 1.500</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Setup de Push</div>
                <div class="text-[11px] text-blue-200">Notificações diretas para usuários. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Suporte VIP 30 Dias</div>
                <div class="text-[11px] text-blue-200">Ajustes e correções pós-publicação. <span class="line-through text-gray-400">R$ 1.500</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">30 Dias de Garantia Técnica</div>
                <div class="text-blue-200">Suporte completo para sua total segurança.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero aproveitar a condição especial para criar meu aplicativo mobile com todos os bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Meu App no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto de Aplicativo</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha as funcionalidades e receba a estimativa.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="app" />
        </div>
      </div>
    </section>

    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Respostas para Suas Dúvidas sobre Apps</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- 10. Última Dobra — CTA Final de Transformação -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-secondary-400" />
          <span>Agenda Aberta para Início Imediato</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para ter o aplicativo oficial da sua marca nas lojas?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende uma reunião diagnóstica gratuita com nossos especialistas em mobile e descubra o plano de desenvolvimento ideal.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar com a equipe de mobile da 3W Online sobre a criação de um app."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Quero Criar Meu App Agora
          </a>
          <RouterLink to="/contato" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
            Solicitar Proposta Formal
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
  title: 'Desenvolvimento de Aplicativos Mobile iOS & Android em Curitiba | 3W Online',
  description: 'Desenvolvimento de apps mobile em Curitiba para iOS e Android. Notificações push, pagamentos integrados e publicação garantida nas lojas.',
  path: '/servicos/desenvolvimento-apps',
  keywords: 'desenvolvimento de aplicativos curitiba, criação de apps curitiba, aplicativo ios android curitiba, empresa de apps curitiba',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'O aplicativo funcionará tanto no iPhone (iOS) quanto no Android?', answer: 'Sim! Desenvolvemos com tecnologias modernas multiplataforma que geram os executáveis nativos otimizados para ambos os sistemas operacionais a partir de uma base de código unificada.' },
  { question: 'A 3W Online cuida da aprovação e publicação nas lojas?', answer: 'Sim! Realizamos toda a homologação técnica, screenshots, configurações de privacidade e publicação direta na App Store e Google Play.' },
  { question: 'O código-fonte será 100% de propriedade da minha empresa?', answer: 'Com certeza! Ao final do projeto entregamos o repositório completo e todos os direitos autorais para sua empresa.' },
  { question: 'Quanto tempo leva para desenvolver um aplicativo?', answer: 'Aplicativos modulares costumam ser desenvolvidos e publicados entre 30 e 60 dias úteis com validações parciais contínuas.' },
]
</script>
