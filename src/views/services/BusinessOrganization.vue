<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Organização Comercial' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:briefcase-check" class="w-4 h-4 text-emerald-400" />
            <span>ESTRUTURAÇÃO DE PROCESSOS COMERCIAIS • APENAS 2 VAGAS NESTE MÊS</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Organização Comercial & Processos que <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-400">Aumentam Seu Fechamento</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Elimine a desorganização que faz sua equipe perder vendas. Estruturamos seu funil de CRM, criamos playbooks de atendimento no WhatsApp e treinamos seus vendedores para bater metas todos os meses.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de uma consultoria para organizar os processos comerciais da minha empresa."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Organizar Meu Time Comercial no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Projeto
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:account-group" class="w-4 h-4 text-emerald-400" /> CRM & Funil Estruturado</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:book-open-page-variant" class="w-4 h-4 text-secondary-400" /> Playbook de Atendimento</span>
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
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">+45%</div>
            <div class="text-xs text-slate-300">Taxa Média de Fechamento</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">&lt; 5 min</div>
            <div class="text-xs text-slate-300">Tempo Médio de Primeiro Contato</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+80</div>
            <div class="text-xs text-slate-300">Equipes Comerciais Treinadas</div>
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
          <span class="section-label">O Gargalo Invisível</span>
          <h2 class="section-title">Onde Sua Equipe de Vendas Está Perdendo Dinheiro?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Não adianta investir milhares de reais em anúncios se os leads chegam e ficam sem resposta ou acompanhamento adequado.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Problemas Comuns no Setor Comercial:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Leads Esquecidos no WhatsApp Pessoal:</strong> Quando um vendedor sai da empresa, ele leva o histórico de conversas embora.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Falta de Padrão nas Propostas:</strong> Cada atendente passa um preço ou condição diferente, gerando confusão.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Zero Follow-up:</strong> Se o cliente não comprou no primeiro dia, ninguém mais entra em contato para reaquecer a proposta.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Mais de 50% das vendas são perdidas simplesmente pela falta de follow-up estruturado.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Organização Comercial 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Centralização em CRM Corporativo:</strong> Todos os contatos e conversas salvos na nuvem da empresa.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Playbook de Vendas & Quebra de Objeções:</strong> Roteiros prontos para o vendedor saber exatamente o que responder.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Régua de Follow-up Automática:</strong> Lembretes automáticos para não deixar nenhuma proposta esfriar.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Aumento imediato de produtividade e previsibilidade no fechamento de contratos.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Pilares do Processo</span>
          <h2 class="section-title">O Que Implementamos no Seu Setor Comercial</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:view-column-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Funil no CRM</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Etapas claras: Novo Lead → Qualificação → Proposta Enviada → Fechamento.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:script-text-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Playbook de Vendas</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Manual com scripts de abordagem, técnicas de negociação e fechamento.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:clock-alert-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">SLA de Atendimento</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Tempo máximo de resposta estabelecido para garantir que o lead não compre do concorrente.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:chart-bar" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Dashboards de Metas</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Painel em tempo real para a diretoria acompanhar o desempenho de cada vendedor.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Ganhos Reais</span>
          <h2 class="section-title">Resultados de um Time Comercial Estruturado</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">+45%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mais Contratos</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Aumento expressivo na taxa de conversão de orçamentos enviados.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">&lt; 5 min</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Agilidade Total</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Resposta instantânea que impressiona o cliente na primeira mensagem.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">100%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Rastreabilidade</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Histórico completo de cada proposta comercial da empresa.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-purple-500 mb-2">30 Dias</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Garantia Técnica</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Acompanhamento contínuo da adaptação dos vendedores.</p>
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
                "A implementação do CRM e dos scripts de WhatsApp aumentou nossa taxa de fechamento de <strong>18% para 34% em apenas 45 dias</strong>."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Vinícius Toledo</div>
              <div class="text-[11px] text-gray-500">Diretor Comercial • Distribuidora de Peças</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +88% Conversão de Propostas
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O treinamento prático da equipe eliminou a desorganização. Hoje qualquer vendedor assume a conversa de outro sem perder o contexto."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Carla Peixoto</div>
              <div class="text-[11px] text-gray-500">Gerente de Vendas • Empresa de Energia Solar</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5" /> 100% Organizado
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Finalmente tenho controle sobre as metas e propostas abertas da empresa em um painel simples e sem planilhas confusas."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Gustavo Rezende</div>
              <div class="text-[11px] text-gray-500">Sócio • Consultoria Contábil</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:star-check" class="w-3.5 h-3.5" /> Controle Total
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
          <span class="section-label">Processo de Implementação</span>
          <h2 class="section-title">Como Estruturamos Seu Setor Comercial</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Diagnóstico Comercial</h4>
            <p class="text-xs text-gray-500">Mapeamos as etapas atuais de atendimento e gargalos.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Estruturação do CRM</h4>
            <p class="text-xs text-gray-500">Configuração das colunas do funil, campos e automações.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Playbook & Scripts</h4>
            <p class="text-xs text-gray-500">Criação do manual de abordagem e respostas persuasivas.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-secondary-100 text-secondary-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Treinamento & Garantia</h4>
            <p class="text-xs text-gray-500">Capacitação ao vivo dos vendedores e 30 dias de suporte.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que Organizar Seu Comercial com a 3W?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-emerald-700 bg-emerald-50/50">Organização Comercial 3W</th>
                <th class="p-4 text-gray-500">Treinamentos Motivacionais Teóricos</th>
                <th class="p-4 text-gray-500">Manter no WhatsApp Pessoal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Implementação Prática</td>
                <td class="p-4 font-bold text-emerald-600 bg-emerald-50/30">Configuração completa de CRM e Playbook</td>
                <td class="p-4 text-gray-500">Apenas palestras sem ferramentas</td>
                <td class="p-4 text-gray-500">Caos e falta de controle</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Retenção do Histórico</td>
                <td class="p-4 font-bold text-emerald-600 bg-emerald-50/30">100% na Nuvem da Empresa</td>
                <td class="p-4 text-gray-500">Sem ferramenta</td>
                <td class="p-4 text-gray-500">Perdido no celular do funcionário</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Scripts de Fechamento</td>
                <td class="p-4 font-bold text-emerald-600 bg-emerald-50/30">Prontos e validados</td>
                <td class="p-4 text-gray-500">Teorias gerais de vendas</td>
                <td class="p-4 text-gray-500">Cada atendente inventa o seu</td>
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
          <span class="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-emerald-400" />
            <span>PACOTE COMPLETO DE ORGANIZAÇÃO COMERCIAL</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu Projeto</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Estruturação Completa do Funil no CRM:</strong> Configuração de etapas, campos e automações.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Playbook de Vendas & Scripts de WhatsApp:</strong> Roteiros de abordagem e quebra de objeções.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Treinamento Prático com a Equipe:</strong> Sessões ao vivo para garantir que todos adotem o processo.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Scripts WhatsApp</div>
                <div class="text-[11px] text-blue-200">Respostas rápidas validadas. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Modelos Proposta</div>
                <div class="text-[11px] text-blue-200">Templates persuasivos em PDF. <span class="line-through text-gray-400">R$ 500</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Manual em Vídeo</div>
                <div class="text-[11px] text-blue-200">Para onboarding de novos vendedores. <span class="line-through text-gray-400">R$ 700</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">Garantia Técnica de 30 Dias</div>
                <div class="text-blue-200">Suporte completo para estabilização do processo.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para estruturar os processos comerciais da minha empresa com todos os bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Meu Projeto no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto de Estruturação Comercial</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha o tamanho da equipe e veja as estimativas.</p>
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
          <h2 class="section-title">Respostas para Suas Dúvidas sobre Processos Comerciais</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- 10. Última Dobra — CTA Final de Transformação -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-emerald-400" />
          <span>Vagas Limitadas por Mês</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para transformar sua equipe de vendas em uma máquina previsível de fechamento?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende um diagnóstico gratuito do seu processo comercial e descubra onde sua operação está deixando dinheiro na mesa.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de agendar um diagnóstico de processos comerciais."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Agendar Diagnóstico Comercial
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
  title: 'Organização Comercial e Processos de Vendas em Curitiba | 3W Online',
  description: 'Estruturação de processos comerciais e funil de vendas em Curitiba. Implementação de CRM, playbook de atendimento no WhatsApp, scripts e treinamento de equipe.',
  path: '/servicos/organizacao-comercial',
  keywords: 'organização comercial curitiba, processos de vendas curitiba, implementação de crm curitiba, playbook de vendas, treinamento de vendedores',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'Qual ferramenta de CRM vocês recomendam e implementam?', answer: 'Trabalhamos com os principais CRMs do mercado (Kommo, HubSpot, RD Station, Ploomes) ou configuramos sistemas proprietários sob medida conforme o fluxo da sua empresa.' },
  { question: 'Minha equipe é resistente a mudanças, vocês ajudam no treinamento?', answer: 'Sim! Realizamos treinamentos práticos e gravamos tutoriais em vídeo para facilitar a adaptação dos vendedores, mostrando que o CRM agiliza o trabalho deles em vez de burocratizar.' },
  { question: 'Quanto tempo leva para estruturar o processo comercial?', answer: 'A modelagem do funil, criação do playbook de atendimento e treinamento da equipe levam em média de 15 a 20 dias úteis.' },
  { question: 'Os scripts de atendimento funcionam para o WhatsApp?', answer: 'Sim! Entregamos scripts de resposta rápida formatados especificamente para o WhatsApp Business, com técnicas comprovadas de quebra de objeções e fechamento de contratos.' },
]
</script>
