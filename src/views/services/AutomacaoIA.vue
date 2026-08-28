<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Automação & IA' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-purple-500/20 text-purple-200 border border-purple-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:robot" class="w-4 h-4 text-purple-400" />
            <span>APENAS 3 NOVAS INTEGRAÇÕES DE IA ABERTAS NESTE MÊS • ATENDIMENTO 24/7</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Chatbots com IA & Automações que <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-primary-400">Atendem e Vendem 24 Horas</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Nunca mais perca um cliente por demora no WhatsApp. Desenvolvemos agentes virtuais com Inteligência Artificial treinados com os dados e produtos da sua empresa para qualificar e agendar 24/7.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de testar uma demonstração de Chatbot com IA no WhatsApp."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Ver Demonstração ao Vivo no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Automação com IA
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:clock-fast" class="w-4 h-4 text-emerald-400" /> Resposta em &lt; 5 Segundos</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:whatsapp" class="w-4 h-4 text-secondary-400" /> Integração Oficial WhatsApp</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:brain" class="w-4 h-4 text-cyan-400" /> Treinado com Seus Dados</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Prova Social Imediata -->
    <section class="bg-slate-900 text-white py-6 border-y border-white/10">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-2xl sm:text-4xl font-black text-purple-400 mb-1">&lt; 5s</div>
            <div class="text-xs text-slate-300">Tempo Médio de Resposta</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">24/7</div>
            <div class="text-xs text-slate-300">Disponibilidade Ininterrupta</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+65%</div>
            <div class="text-xs text-slate-300">Aumento em Agendamentos</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">98%</div>
            <div class="text-xs text-slate-300">Aprovação de Clientes</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Segunda Dobra — O Problema (Identificação da Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">O Gargalo do Atendimento</span>
          <h2 class="section-title">Quanto Custa Demorar Horas para Responder um Lead no WhatsApp?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Mais de 70% dos clientes compram do primeiro concorrente que responde com clareza e rapidez.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Problemas do Atendimento 100% Manual:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Perda de Clientes Noturnos e Fins de Semana:</strong> Leads que mandam mensagem fora do horário comercial ficam sem resposta e procuram outro.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Equipe Sobrecarregada com Dúvidas Repetitivas:</strong> Seus vendedores gastam 60% do dia respondendo as mesmas perguntas de preços e horários.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Chatbots Antigos Irritantes:</strong> Menus numéricos travados ("Digite 1 para...") que afastam o cliente e geram reclamações.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ A demora de 10 minutos para responder um lead reduz a chance de conversão em mais de 300%.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Inteligência Artificial da 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Atendimento Natural em Linguagem Humana:</strong> A IA conversa com fluidez, tira dúvidas complexas e recomenda o produto certo.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Qualificação Automática & Agendamento:</strong> A IA coleta dados do cliente, agenda reuniões e envia diretamente para o CRM.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Transbordo Humano Inteligente:</strong> Quando o lead está pronto para assinar, a IA transfere a conversa para o vendedor sênior.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Aceleração de vendas com atendimento ininterrupto 24 horas por dia.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Arquitetura de IA</span>
          <h2 class="section-title">Como Funciona o Agente Inteligente da 3W</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:brain" class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-2">1. Base de Conhecimento Própria</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Alimentamos o modelo com PDFs de produtos, tabelas de preços, regras de atendimento e políticas da sua empresa.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:whatsapp" class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-2">2. Conexão Oficial WhatsApp</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Integração segura via API oficial para garantir estabilidade sem risco de bloqueio de número.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:handshake" class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-2">3. Fechamento de Vendas</h3>
            <p class="text-xs text-gray-500 leading-relaxed">O lead é qualificado, tem suas dúvidas esclarecidas e chega pronto para fechar com o vendedor.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Resultados</span>
          <h2 class="section-title">Ganhos Imediatos para Sua Operação</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-purple-500 mb-2">&lt; 5s</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Velocidade Total</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Resposta instantânea sem deixar o cliente esperando.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">+65%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mais Agendamentos</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Aumento comprovado na conversão de leads em reuniões.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">-70%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Carga Operacional</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Redução drástica de perguntas repetitivas para o time.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">24h/dia</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Vendas Noturnas</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Captação ativa mesmo aos fins de semana e feriados.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Quinta Dobra — Prova Social com Métricas Reais -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Depoimentos</span>
          <h2 class="section-title">Resultados de Quem Automatizou com IA</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Nosso chatbot de IA atende os pacientes fora do horário comercial e já <strong>agenda a consulta diretamente no sistema</strong>. Mais de 35% das nossas consultas hoje vêm de agendamentos noturnos."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Dra. Monique Castro</div>
              <div class="text-[11px] text-gray-500">Diretora • Clínica de Estética Avançada</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +35% Consultas Noturnas
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A IA responde dúvidas técnicas sobre nossos produtos industriais com precisão impressionante. Liberou nossos engenheiros comerciais para focar apenas em negociações grandes."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Eng. Renato Albuquerque</div>
              <div class="text-[11px] text-gray-500">Gerente Geral • Fabricante de Equipamentos</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:clock-check" class="w-3.5 h-3.5" /> -70% de Dúvidas Repetitivas
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Integração rápida e suporte impecável da 3W. O modelo foi treinado em 3 dias e já começou a gerar resultados no mesmo final de semana."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Thiago Menezes</div>
              <div class="text-[11px] text-gray-500">Sócio • Imobiliária Curitiba</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-all" class="w-3.5 h-3.5" /> Ativação em 72 Horas
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
          <span class="section-label">Processo Simples</span>
          <h2 class="section-title">Como Implementamos a IA na Sua Empresa</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mapeamento de Dados</h4>
            <p class="text-xs text-gray-500">Coletamos catálogos, dúvidas frequentes e regras de atendimento.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Treinamento do Modelo</h4>
            <p class="text-xs text-gray-500">Configuramos a IA com o tom de voz e respostas oficiais da marca.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-secondary-100 text-secondary-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Integração WhatsApp</h4>
            <p class="text-xs text-gray-500">Conectamos o agente ao seu número oficial e ao CRM de vendas.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Ativação 24/7</h4>
            <p class="text-xs text-gray-500">O robô assume o atendimento com monitoramento e 30 dias de garantia.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que a IA da 3W Online é Superior?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-purple-700 bg-purple-50/50">IA Generativa 3W Online</th>
                <th class="p-4 text-gray-500">Chatbots Rígidos Antigos</th>
                <th class="p-4 text-gray-500">Atendimento 100% Manual</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Fluidez da Conversa</td>
                <td class="p-4 font-bold text-emerald-600 bg-purple-50/30">Linguagem natural humana</td>
                <td class="p-4 text-gray-500">Menus numéricos travados</td>
                <td class="p-4 text-gray-500">Humana, mas demorada</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Disponibilidade Noturna</td>
                <td class="p-4 font-bold text-emerald-600 bg-purple-50/30">24h / 7 dias por semana</td>
                <td class="p-4 text-gray-500">24h, mas sem inteligência</td>
                <td class="p-4 text-gray-500">Apenas horário comercial</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Integração com CRM</td>
                <td class="p-4 font-bold text-emerald-600 bg-purple-50/30">Dados salvos automaticamente</td>
                <td class="p-4 text-gray-500">Básica ou inexistente</td>
                <td class="p-4 text-gray-500">Digitação manual do vendedor</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Risco de Bloqueio</td>
                <td class="p-4 font-bold text-emerald-600 bg-purple-50/30">Zero (API Oficial Meta)</td>
                <td class="p-4 text-gray-500">Alto se usar robôs não oficiais</td>
                <td class="p-4 text-gray-500">Baixo</td>
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
          <span class="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-purple-400" />
            <span>PACOTE COMPLETO DE AUTOMAÇÃO COM IA</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu Agente de IA</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Agente com Modelo LLM Avançado:</strong> Treinado especificamente para responder sobre sua empresa e produtos.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Conexão Segura WhatsApp Business API:</strong> Estabilidade garantida sem risco de banimento de número.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Transbordo Inteligente para Vendedores:</strong> Notificação imediata para seu time quando o lead está quente.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Treinamento com FAQs</div>
                <div class="text-[11px] text-blue-200">Criação da base de respostas oficial. <span class="line-through text-gray-400">R$ 900</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Integração com CRM</div>
                <div class="text-[11px] text-blue-200">Envio automático de contatos para o funil. <span class="line-through text-gray-400">R$ 600</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Suporte VIP 30 Dias</div>
                <div class="text-[11px] text-blue-200">Ajustes finos no comportamento da IA. <span class="line-through text-gray-400">R$ 1.000</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">30 Dias de Garantia Técnica</div>
                <div class="text-blue-200">Ajustes contínuos para garantir precisão nas respostas.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir meu agente de IA com todos os bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Meu Chatbot com IA
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto de Automação</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha o nível de inteligência e veja as estimativas.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="ai" />
        </div>
      </div>
    </section>

    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Respostas para Suas Dúvidas sobre IA</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- 10. Última Dobra — CTA Final de Transformação -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-purple-500/20 text-purple-200 border border-purple-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-purple-400" />
          <span>Agenda Aberta para Início Imediato</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para ter um vendedor de IA atendendo seus clientes 24 horas por dia?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende uma demonstração prática no WhatsApp e veja a Inteligência Artificial funcionando em tempo real.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de testar uma demonstração de Chatbot com IA."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Testar Demonstração no WhatsApp
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
  title: 'Chatbots com Inteligência Artificial no WhatsApp em Curitiba | 3W Online',
  description: 'Automação comercial e chatbots inteligentes com IA no WhatsApp em Curitiba. Atendimento 24/7, qualificação de leads e agendamentos automáticos.',
  path: '/servicos/automacao-ia',
  keywords: 'chatbot whatsapp curitiba, automação com inteligência artificial, agente ia whatsapp, chatbot inteligente curitiba',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'A IA pode falar coisas erradas ou inventar preços?', answer: 'Não! Configuramos travas de segurança rigorosas (guardrails) para que a IA responda exclusivamente com base nas informações e regras de preços que você aprovar.' },
  { question: 'É possível transferir para um atendente humano quando necessário?', answer: 'Sim! Sempre que o cliente solicitar falar com uma pessoa ou quando a IA identificar uma oportunidade de fechamento, a conversa é transferida automaticamente com aviso no painel.' },
  { question: 'Existe risco de meu número de WhatsApp ser bloqueado?', answer: 'Trabalhamos exclusivamente com a API oficial do WhatsApp Business (Cloud API da Meta), garantindo conformidade total e zero risco de banimento.' },
  { question: 'Quanto tempo leva para treinar e ativar o robô?', answer: 'Em média, a estruturação da base de conhecimento, testes de precisão e ativação levam de 3 a 7 dias úteis.' },
]
</script>
