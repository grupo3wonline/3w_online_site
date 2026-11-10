<template>
  <div class="landing-ads-page">
    <!-- Hero / Primeira Dobra — Dark Navy com Gatilho de Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Gestão de Tráfego Pago' }]" />

        <div class="max-w-4xl mt-4">
          <!-- Selo de Escassez / Urgência -->
          <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4 animate-pulse">
            <Icon icon="mdi:fire" class="w-4 h-4 text-rose-400" />
            <span>APENAS 3 VAGAS PARA NOVOS CLIENTES NESTE MÊS • ATENDIMENTO VIP</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Multiplique Seus Clientes com <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Tráfego Pago de Alta Conversão</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Pare de queimar dinheiro clicando em "Impulsionar". Atraia leads qualificados todos os dias no WhatsApp da sua empresa com estratégias avançadas no Google Ads, Instagram e Meta Ads.
          </p>

          <!-- CTAs Principais -->
          <div class="flex flex-wrap gap-4 items-center mb-10">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de garantir uma das 3 vagas para diagnóstico gratuito de anúncios."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Garantir Diagnóstico Gratuito no WhatsApp
            </a>
            <a href="#simulador" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Verba & Retorno
            </a>
          </div>

          <!-- Elementos de Confiança Próximos ao CTA -->
          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> Sem Fidelidade Forçada</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:certificate" class="w-4 h-4 text-secondary-400" /> Google & Meta Certified</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:clock-fast" class="w-4 h-4 text-cyan-400" /> Início em até 48 horas</span>
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
            <div class="text-xs text-slate-300">Empresas Aceleradas</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">R$ 2.8M+</div>
            <div class="text-xs text-slate-300">Faturamento Gerado para Clientes</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">300%</div>
            <div class="text-xs text-slate-300">Aumento Médio de Leads</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">4.9 / 5.0</div>
            <div class="text-xs text-slate-300">Avaliação de Satisfação no Google</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problema / O Custo da Inação (Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">O Custo Oculto</span>
          <h2 class="section-title">Quanto Dinheiro Sua Empresa Está Deixando na Mesa?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Anunciar sem técnica é a forma mais rápida de enriquecer o Google e o Facebook sem colocar um único centavo no seu bolso.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <!-- Card de Dores Críticas -->
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Os 4 Erros que Estão Queimando Seu Orçamento:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Botão "Impulsionar":</strong> Gera milhares de curtidas vazias de curiosos que nunca compram seu produto.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Palavras-Chave Erradas no Google:</strong> Você paga até R$ 15 por clique de pessoas pesquisando termos genéricos ou buscando vagas de emprego.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Pixel & GA4 Desconfigurados:</strong> Você não sabe de onde vêm as mensagens e continua investindo no canal que não dá retorno.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Concorrentes no Topo:</strong> Quando alguém pesquisa pelo seu serviço em Curitiba ou região, seu concorrente aparece primeiro e fecha a venda.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Cada dia sem anúncios estratégicos são oportunidades reais entregues de graça aos concorrentes.
            </div>
          </div>

          <!-- Card de Transformação 3W Online -->
          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                Como a 3W Online Resolve Definitivamente:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Google Search com Foco em Fundo de Funil:</strong> Apareça exclusivamente para quem está com o cartão na mão procurando seu serviço.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Criativos Persuasivos no Meta Ads:</strong> Banners e vídeos com gatilhos de copy que geram conversas imediatas no WhatsApp.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Rastreamento Avançado de Conversão (CAPI):</strong> Dados em tempo real para alimentar a IA do Google e reduzir o custo por contato.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Acompanhamento Semanal com Especialista:</strong> Reuniões periódicas e dashboards transparentes mostrando o ROI do seu dinheiro.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Metodologia validada com mais de R$ 2.8 milhões gerados em vendas.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Como Funciona em 4 Passos Simples -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Fluxo Simples & Rápido</span>
          <h2 class="section-title">Como Funciona a Parceria em 4 Passos</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Zero complicação. Nós cuidamos de toda a parte técnica para você focar em atender clientes e fechar vendas.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              1
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Diagnóstico Gratuito</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Analisamos seu mercado, concorrentes e contas antigas para traçar a melhor estratégia.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              2
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Planejamento & Copy</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Criamos os anúncios, títulos persuasivos, segmentações de público e roteiros de criativos.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              3
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Setup & Ativação</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Configuramos tags, rastreamento de WhatsApp e ativamos as campanhas em até 48 horas.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              4
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Escala & Otimização</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Monitoramos os lances diariamente para baixar seu custo por lead e aumentar o lucro.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Casos Reais & Depoimentos com Resultados Numéricos -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Casos de Sucesso</span>
          <h2 class="section-title">Resultados Reais de Empresas que Confiam na 3W Online</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Histórias de empresas que saíram do zero no tráfego e alcançaram previsibilidade comercial.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <!-- Caso 1 -->
          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Estávamos há meses tentando impulsionar sozinhos no Instagram sem retorno. Com a 3W Online, no primeiro mês fechamos <strong>38 novos contratos</strong> com custo por lead 50% menor."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Dr. Eduardo Santos</div>
              <div class="text-[11px] text-gray-500">Clínica Odontológica • Curitiba/PR</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +320% em Faturamento
              </div>
            </div>
          </div>

          <!-- Caso 2 -->
          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A gestão de Google Ads da 3W nos colocou no topo das buscas para projetos industriais. Em 60 dias geramos <strong>R$ 480 mil em propostas comerciais</strong>."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Mariana Costa</div>
              <div class="text-[11px] text-gray-500">Diretora Comercial • Setor de Energia</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> ROI Comprovado de 6.2x
              </div>
            </div>
          </div>

          <!-- Caso 3 -->
          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O atendimento diário e a rapidez para trocar criativos que saturaram faz toda a diferença. Não troco a equipe da 3W por nenhuma outra agência."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Rodrigo Almeida</div>
              <div class="text-[11px] text-gray-500">Sócio-Fundador • Consultoria Empresarial</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> CPL Reduzido em 45%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Oferta Irresistível + Bônus Exclusivos -->
    <section class="section-padding bg-gradient-to-b from-slate-900 to-[#0a1628] text-white">
      <div class="container max-w-4xl">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-1 bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-secondary-400" />
            <span>PACOTE COMPLETO DE ACELERAÇÃO COMERCIAL</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Você Recebe na Gestão da 3W Online</h2>
          <p class="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto">
            Tudo o que sua empresa precisa para ter um canal previsível e escalável de novos clientes.
          </p>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Gestão Estratégica Completa:</strong> Google Ads (Search + PMax) e Meta Ads (Instagram + Facebook).</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Criação de Anúncios Persuasivos:</strong> Copywriting focado em vendas e direção de arte profissional.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Otimização Diária de Lances:</strong> Negativação de termos irrelevantes para economizar seu dinheiro.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Dashboard Transparente em Tempo Real:</strong> Acompanhe cliques, leads e custo por mensagem.</span>
            </div>
          </div>

          <!-- Bônus Gratuitos Inclusos -->
          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 Bônus Especiais Inclusos no Setup:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Setup GA4 & Pixel</div>
                <div class="text-[11px] text-blue-200">Configuração avançada de API de Conversão. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Playbook WhatsApp</div>
                <div class="text-[11px] text-blue-200">Scripts de atendimento para fechar leads mais rápido. <span class="line-through text-gray-400">R$ 500</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Suporte Direto VIP</div>
                <div class="text-[11px] text-blue-200">Canal exclusivo no WhatsApp com gestor sênior. <span class="line-through text-gray-400">R$ 600</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <!-- Garantia Incondicional & CTA da Oferta -->
          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">Garantia de 30 Dias sem Fidelidade</div>
                <div class="text-blue-200">Se não ficar satisfeito no 1º mês, cancele sem multa rescisória.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero aproveitar a condição especial de gestão de tráfego com todos os bônus."
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Calcule a Estimativa de Investimento e Retorno</h2>
          <p class="text-xs sm:text-sm text-blue-200">Descubra a projeção de cliques e alcance para o seu nicho.</p>
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
          <h2 class="section-title">Respostas Claras para Suas Dúvidas</h2>
          <p class="section-subtitle">Tudo o que você precisa saber antes de iniciar sua parceria com a 3W Online.</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- CTA Final de Alta Urgência — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-rose-400" />
          <span>Vagas Limitadas por Consultor</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para começar a receber leads qualificados ainda esta semana?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Não deixe seus concorrentes dominarem as buscas. Agende seu diagnóstico gratuito agora mesmo e descubra o plano ideal para a sua empresa.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Quero agendar meu diagnóstico gratuito de anúncios agora mesmo."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Agendar Diagnóstico Grátis no WhatsApp
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
  title: 'Gestão de Tráfego Pago em Curitiba | Google Ads & Meta Ads | 3W Online',
  description: 'Gestão profissional de anúncios no Google Ads e Meta Ads em Curitiba. Multiplique seus leads com tráfego pago de alto ROI e atendimento VIP.',
  path: '/anuncios',
  keywords: 'gestão de anúncios curitiba, tráfego pago curitiba, google ads curitiba, instagram ads curitiba, agência de tráfego',
})

const faqs = [
  { question: 'Funciona para o meu segmento ou nicho de atuação?', answer: 'Sim! Atendemos desde prestadores de serviços locais (médicos, advogados, contadores, reformas) até indústrias, e-commerces e empresas B2B. A estratégia de canais é moldada especificamente para onde seu cliente toma a decisão de compra.' },
  { question: 'Qual o investimento mínimo em mídia recomendado?', answer: 'Recomendamos iniciar com uma verba de anúncios a partir de R$ 20 a R$ 30 por dia (R$ 600 a R$ 900/mês para o Google/Meta). Isso garante volume de testes suficiente para otimizar os lances e gerar resultados sólidos.' },
  { question: 'Em quanto tempo começo a ver os primeiros contatos?', answer: 'Campanhas de tráfego pago geram tráfego imediato. Normalmente, nas primeiras 24 a 72 horas após a ativação dos anúncios sua empresa já começa a receber mensagens no WhatsApp.' },
  { question: 'A verba de anúncios é paga para a 3W Online ou para o Google/Meta?', answer: 'A verba de anúncios é paga diretamente por você ao Google e Meta via cartão de crédito ou boleto da sua própria conta de anúncios. Você mantém 100% de controle e transparência sobre seus gastos.' },
  { question: 'Existe fidelidade contratual ou multa de cancelamento?', answer: 'Não exigimos fidelidade forçada. Nossos contratos são mensais com renovação automática e você pode cancelar a qualquer momento com aviso prévio de 30 dias.' },
  { question: 'Vocês ajudam minha equipe a fechar os leads recebidos?', answer: 'Sim! Como bônus exclusivo, fornecemos nosso Playbook de Atendimento Comercial no WhatsApp com scripts e técnicas para aumentar a taxa de conversão das mensagens em vendas.' },
]
</script>