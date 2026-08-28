<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Redes Sociais' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-pink-500/20 text-pink-200 border border-pink-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:instagram" class="w-4 h-4 text-pink-400" />
            <span>APENAS 4 NOVAS MARCAS ATENDIDAS NESTE MÊS • CRONOGRAMA ANTECIPADO</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Gestão de Redes Sociais que <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-primary-400">Transforma Seguidores em Clientes</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Pare de postar sem estratégia. Criamos conteúdos visuais de alto padrão, roteiros de Reels persuasivos e carrosséis educativos que constroem autoridade e geram pedidos todos os dias.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de conhecer os planos de gestão de redes sociais da 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Solicitar Plano no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Meu Plano
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:calendar-check" class="w-4 h-4 text-emerald-400" /> Aprovação Mensal Antecipada</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:palette" class="w-4 h-4 text-pink-400" /> Design Exclusivo</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-cyan-400" /> Sem Contratos de Fidelidade</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Prova Social Imediata -->
    <section class="bg-slate-900 text-white py-6 border-y border-white/10">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-2xl sm:text-4xl font-black text-pink-400 mb-1">+12.000</div>
            <div class="text-xs text-slate-300">Posts Criados</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">300%</div>
            <div class="text-xs text-slate-300">Aumento Médio de Alcance</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">100%</div>
            <div class="text-xs text-slate-300">Entregas no Prazo</div>
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
          <span class="section-label">O Cenário Atual</span>
          <h2 class="section-title">Por Que Seu Perfil Não Gera Vendas?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Postar fotos aleatórias sem estratégia de copywriting atrai apenas curtidas vazias e não enche a agenda da sua empresa.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Problemas Comuns nas Redes Sociais:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Falta de Consistência:</strong> Dias ou semanas sem postar fazem o algoritmo esconder seu perfil dos seguidores.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Artes Amadoras de Baixa Qualidade:</strong> Transmitem sensação de amadorismo e desvalorizam o preço do seu serviço.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Conteúdo Focado Apenas no Produto:</strong> Sem conexão emocional e sem chamada persuasiva para o WhatsApp.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Um perfil desatualizado afasta clientes que pesquisam sua empresa antes de comprar.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Metodologia de Redes Sociais 3W:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Cronograma Editorial Mensal Antecipado:</strong> Você aprova todas as publicações antes de irem ao ar.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Design Gráfico de Nível Internacional:</strong> Identidade visual refinada que posiciona sua marca como líder de mercado.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Roteiros de Reels & Copy de Conversão:</strong> Formatos virais desenhados para atrair clientes prontos para comprar.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Presença digital profissional com total tranquilidade para focar no seu negócio.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Formatos Estratégicos</span>
          <h2 class="section-title">O Que Produzimos Para Suas Redes Sociais</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:video-vintage" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Roteiros de Reels & Shorts</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Vídeos curtos dinâmicos com ganchos virais que alcançam milhares de novos seguidores.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:view-carousel-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Carrosséis Educativos</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Publicações ricas em conteúdo que geram muitos salvamentos e compartilhamentos.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:cellphone-message" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Stories Diários & Enquetes</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Estratégia de interação contínua para aquecer os seguidores mais engajados.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:palette-swatch-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Identidade & Destaques</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Bio otimizada, links de conversão e capas de destaques profissionais.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Vantagens</span>
          <h2 class="section-title">Resultados de uma Gestão Profissional</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-pink-500 mb-2">+300%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mais Alcance</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Crescimento orgânico consistente no público-alvo da sua região.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">100%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Tranquilidade</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Sem estresse para pensar no que postar todo dia.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">Alto Padrão</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Autoridade Máxima</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Design refinado que justifica preços mais altos para seu serviço.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">Sem Fidelidade</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Contrato Mensal</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Flexibilidade e transparência para seu negócio.</p>
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
                "Nossas redes sociais eram abandonadas. Em 3 meses de gestão com a 3W, passamos a receber de <strong>5 a 10 orçamentos por dia</strong> no direct e WhatsApp."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Juliana Nogueira</div>
              <div class="text-[11px] text-gray-500">Sócia • Móveis Planejados & Decoração</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +280% de Leads
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A qualidade visual dos posts é impecável. Nossos pacientes elogiam constantemente a clareza e elegância do conteúdo."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Dra. Patrícia Ramos</div>
              <div class="text-[11px] text-gray-500">Fundadora • Clínica Dermatológica</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:star-check" class="w-3.5 h-3.5" /> Autoridade Consolidada
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O cronograma antecipado me dá paz de espírito. Aprovo tudo no início do mês e sei que a presença digital da empresa está em mãos de profissionais."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Lucas Fontes</div>
              <div class="text-[11px] text-gray-500">Diretor Comercial • Concessionária</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-all" class="w-3.5 h-3.5" /> 100% Pontual
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
          <span class="section-label">Processo Editorial</span>
          <h2 class="section-title">Como Funciona a Gestão Mensal</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Diagnóstico de Marca</h4>
            <p class="text-xs text-gray-500">Estudo de concorrentes, público-alvo e pilares de conteúdo.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Planejamento Editorial</h4>
            <p class="text-xs text-gray-500">Definição dos temas de posts, carrosséis e Reels do mês.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Produção & Aprovação</h4>
            <p class="text-xs text-gray-500">Criação das artes e textos para sua validação antecipada.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Publicação & Relatórios</h4>
            <p class="text-xs text-gray-500">Agendamento dos posts e relatório mensal de crescimento.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que Ter a 3W Cuidando das Suas Redes?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-pink-700 bg-pink-50/50">3W Online</th>
                <th class="p-4 text-gray-500">Freelancer Avulso</th>
                <th class="p-4 text-gray-500">Fazer Sozinho na Empresa</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Equipe Envolvida</td>
                <td class="p-4 font-bold text-emerald-600 bg-pink-50/30">Designer + Redator + Estrategista</td>
                <td class="p-4 text-gray-500">Apenas 1 pessoa sobrecarregada</td>
                <td class="p-4 text-gray-500">Funcionário sem especialização</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Pontualidade de Entregas</td>
                <td class="p-4 font-bold text-emerald-600 bg-pink-50/30">100% Cronograma Antecipado</td>
                <td class="p-4 text-gray-500">Atrasos frequentes</td>
                <td class="p-4 text-gray-500">Posts feitos na correria</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Foco em Vendas</td>
                <td class="p-4 font-bold text-emerald-600 bg-pink-50/30">Copywriting persuasivo direto</td>
                <td class="p-4 text-gray-500">Apenas estética básica</td>
                <td class="p-4 text-gray-500">Sem técnica de conversão</td>
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
          <span class="inline-flex items-center gap-1 bg-pink-500/20 text-pink-300 border border-pink-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-pink-400" />
            <span>PLANO MENSAL DE GESTÃO DE REDES SOCIAIS</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu Plano</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Criação Completa de Artes & Roteiros de Reels:</strong> Design exclusivo de alto impacto.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Copywriting Persuasivo com Chamada para Ação:</strong> Textos que geram comentários e mensagens no WhatsApp.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Agendamento & Publicação Automática:</strong> Você não precisa se preocupar com horários.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Roteiros de Reels</div>
                <div class="text-[11px] text-blue-200">Ganchos virais prontos para gravar. <span class="line-through text-gray-400">R$ 600</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Otimização de Bio</div>
                <div class="text-[11px] text-blue-200">Reestruturação visual do perfil. <span class="line-through text-gray-400">R$ 400</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Relatório Mensal</div>
                <div class="text-[11px] text-blue-200">Métricas de alcance e novos clientes. <span class="line-through text-gray-400">R$ 500</span> <strong>GRÁTIS</strong></div>
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
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para o plano de gestão de redes sociais com todos os bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Meu Plano no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Plano de Redes Sociais</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha a frequência de postagens ideal para sua marca.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="social-media" />
        </div>
      </div>
    </section>

    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Respostas para Suas Dúvidas sobre Redes Sociais</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- 10. Última Dobra — CTA Final de Transformação -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-pink-500/20 text-pink-200 border border-pink-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-pink-400" />
          <span>Vagas Limitadas por Consultor</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para ter um perfil que gera autoridade e novos clientes todos os dias?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Entre em contato com nossa equipe e receba um diagnóstico visual gratuito do seu Instagram.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de receber um diagnóstico gratuito do meu perfil no Instagram."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Receber Diagnóstico Gratuito
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
  title: 'Gestão de Redes Sociais em Curitiba | Instagram & Facebook | 3W Online',
  description: 'Gestão profissional de redes sociais em Curitiba: criação de conteúdo estratégico, design refinado, Reels, carrosséis e copywriting de conversão.',
  path: '/servicos/gestao-redes-sociais',
  keywords: 'gestão de redes sociais curitiba, social media curitiba, gerenciamento de instagram curitiba, agência de mídias sociais curitiba',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'Minha empresa precisa fornecer as fotos e vídeos?', answer: 'Nossa equipe de design cuida de toda a criação gráfica e artes institucionais. Caso você possua fotos dos seus produtos, instalações ou equipe, nós as integramos e tratamos visualmente para elevar a autoridade.' },
  { question: 'Consigo aprovar os posts antes de serem publicados?', answer: 'Sim! Enviamos o cronograma editorial completo com artes e textos com antecedência para sua revisão e aprovação antes de qualquer agendamento.' },
  { question: 'Vocês também respondem os comentários e mensagens no direct?', answer: 'Oferecemos planos com moderação de comentários e triagem de mensagens no direct, direcionando os contatos quentes imediatamente para o WhatsApp comercial da sua empresa.' },
  { question: 'Existe carência ou fidelidade no contrato?', answer: 'Não exigimos fidelidade forçada. Nossos contratos são mensais com aviso prévio simples de 30 dias.' },
]
</script>
