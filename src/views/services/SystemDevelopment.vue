<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Sistemas Web' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:lightning-bolt" class="w-4 h-4 text-secondary-400" />
            <span>APENAS 2 NOVOS SISTEMAS INICIADOS POR MÊS • DESENVOLVIMENTO DEDICADO</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Sistemas Web Sob Medida que <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Automatizam Sua Operação</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Elimine planilhas confusas e tarefas manuais. Desenvolvemos CRMs, ERPs leves e painéis administrativos sob medida, sem cobrar mensalidades por usuário.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento para desenvolvimento de sistema sob medida."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Solicitar Consultoria no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Meu Sistema
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> 30 Dias de Garantia Técnica</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:account-multiple-check" class="w-4 h-4 text-secondary-400" /> Usuários Ilimitados</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:cloud-check" class="w-4 h-4 text-cyan-400" /> 99.9% Uptime em Nuvem</span>
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
            <div class="text-xs text-slate-300">Sistemas Entregues</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">0 R$</div>
            <div class="text-xs text-slate-300">Mensalidade por Usuário</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">40h/sem</div>
            <div class="text-xs text-slate-300">Economia Média de Tempo</div>
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
          <span class="section-label">Gargalos Operacionais</span>
          <h2 class="section-title">Sua Equipe Passa Mais Tempo Preenchendo Planilhas do que Vendendo?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Softwares genéricos cobram fortunas por usuário e nunca atendem às particularidades do seu fluxo de trabalho.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Riscos de Processos Manuais:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Planilhas Corrompidas:</strong> Perda de histórico financeiro e fórmulas apagadas acidentalmente.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Retrabalho Diário:</strong> Vários funcionários digitando as mesmas informações em locais diferentes.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Falta de Controle de Acesso:</strong> Dados confidenciais visíveis para qualquer colaborador sem permissão restrita.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Licenças Caras por Usuário:</strong> Mensalidades que penalizam sua empresa sempre que você contrata alguém.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ A ineficiência operacional custa milhares de reais em horas extras e oportunidades perdidas.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Solução com Sistema Sob Medida 3W:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Interface Exclusiva & Intuitiva:</strong> Desenvolvida exatamente para a rotina da sua equipe, sem telas desnecessárias.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Automação de E-mails, PDFs e WhatsApp:</strong> Emissão de propostas e avisos automáticos em 1 clique.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Dashboards em Tempo Real:</strong> Relatórios consolidados para a diretoria tomar decisões embasadas.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Economia Vitalícia:</strong> Usuários e cadastros ilimitados sem pagar nada a mais.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Aumento comprovado de até 500% na produtividade e controle do negócio.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Engenharia Sob Medida</span>
          <h2 class="section-title">O Que Desenvolvemos Para Sua Empresa</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:account-group-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">CRM de Vendas</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Gestão de funil, propostas e histórico de clientes sem perder nenhum lead.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:finance" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Painéis Financeiros & ERP</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Controle de fluxo de caixa, conciliação e geração automática de cobranças.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:calendar-clock" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Agendamento & Ordens</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Gestão de atendimentos e ordens de serviço com notificações no WhatsApp.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:shield-lock-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Portais B2B Restritos</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Áreas com login exclusivo para clientes baixarem pedidos, faturas e relatórios.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Resultados Percebidos</span>
          <h2 class="section-title">Ganhos Imediatos para Sua Equipe</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">40h</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Tempo Economizado</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Economia semanal de horas em digitação manual de dados.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">R$ 0</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Zero Mensalidade</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Sem custos adicionais por licença de novos colaboradores.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">100%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Código Próprio</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Propriedade intelectual transferida no final do projeto.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-purple-500 mb-2">99.9%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Disponibilidade</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Nuvem segura com backups automáticos diários.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Quinta Dobra — Prova Social com Métricas Reais -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Casos de Sucesso</span>
          <h2 class="section-title">O Que Nossos Clientes Dizem</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Substituímos 4 planilhas pesadas por um sistema web exclusivo. Economizamos mais de <strong>20 horas por semana</strong> na conferência de pedidos."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Fernanda Meirelles</div>
              <div class="text-[11px] text-gray-500">Gerente de Operações • Distribuidora</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:clock-check" class="w-3.5 h-3.5" /> 20h Economizadas/Semana
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O portal B2B automatizou mais de <strong>600 pedidos mensais</strong> que antes dependiam de digitação manual de e-mails."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Marcelo Castro</div>
              <div class="text-[11px] text-gray-500">Diretor de TI • Indústria Metalúrgica</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> -60% Tempo Operacional
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Cancelamos as mensalidades de um software americano que custava R$ 2.400/mês. O sistema da 3W se pagou em menos de 5 meses."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Andréia Zanetti</div>
              <div class="text-[11px] text-gray-500">Sócia • Serviços Financeiros</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:currency-usd" class="w-3.5 h-3.5" /> R$ 28k Economizados/Ano
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
          <h2 class="section-title">Como Desenvolvemos Seu Sistema em 4 Passos</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mapeamento de Regras</h4>
            <p class="text-xs text-gray-500">Entendemos suas planilhas, fluxos e necessidades exatas.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-secondary-100 text-secondary-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Prototipagem de Telas</h4>
            <p class="text-xs text-gray-500">Apresentação visual interativa para validação do time.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Codificação & Migração</h4>
            <p class="text-xs text-gray-500">Desenvolvimento ágil com Vue 3 e importação dos dados.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Treinamento & Garantia</h4>
            <p class="text-xs text-gray-500">Capacitação ao vivo e 30 dias de suporte gratuito pós-entrega.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que Escolher um Sistema Sob Medida 3W?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-primary-700 bg-primary-50/50">3W Online</th>
                <th class="p-4 text-gray-500">ERPs Genéricos de Prateleira</th>
                <th class="p-4 text-gray-500">Planilhas Excel/Google Sheets</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Cobrança por Usuário</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Zero (Ilimitados)</td>
                <td class="p-4 text-gray-500">Cobram por cada colaborador</td>
                <td class="p-4 text-gray-500">Grátis, mas sem segurança</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Adaptação ao Seu Fluxo</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">100% Personalizado</td>
                <td class="p-4 text-gray-500">Você se adapta ao software</td>
                <td class="p-4 text-gray-500">Complexo de manter</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Segurança & LGPD</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Banco Relacional Seguro</td>
                <td class="p-4 text-gray-500">Seguro, mas dados compartilhados</td>
                <td class="p-4 text-gray-500">Vulnerável a vazamentos</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Propriedade do Código</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">100% da Sua Empresa</td>
                <td class="p-4 text-gray-500">Você apenas aluga</td>
                <td class="p-4 text-gray-500">Sem propriedade técnica</td>
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
            <span>PACOTE COMPLETO DE DESENVOLVIMENTO DE SISTEMAS</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu Projeto</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Desenvolvimento Completo com Vue 3 & Banco PostgreSQL:</strong> Alta performance e segurança de dados.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Usuários e Cadastros Ilimitados:</strong> Sem custos adicionais conforme sua empresa expande.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Transferência Total de Código-Fonte:</strong> Sua empresa é dona definitiva de todo o software criado.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Migração de Planilhas</div>
                <div class="text-[11px] text-blue-200">Importação gratuita de dados antigos. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Treinamento em Vídeo</div>
                <div class="text-[11px] text-blue-200">Manual gravado de uso do sistema. <span class="line-through text-gray-400">R$ 500</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Suporte VIP 30 Dias</div>
                <div class="text-[11px] text-blue-200">Ajustes e correções pós-entrega. <span class="line-through text-gray-400">R$ 1.200</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">30 Dias de Garantia Técnica</div>
                <div class="text-blue-200">Ajustes e estabilização sem custos adicionais.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero aproveitar a condição especial para criar meu sistema sob medida com todos os bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Meu Sistema no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto de Sistema</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha as funcionalidades e receba a estimativa.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="system" />
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
          <span>Agenda Aberta para Início Imediato</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para automatizar seus processos e escalar com tranquilidade?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende uma consultoria diagnóstica gratuita com nossos arquitetos de software e descubra o plano de automação ideal.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de agendar uma consultoria diagnóstica para desenvolvimento de sistema sob medida."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Agendar Consultoria no WhatsApp
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
  title: 'Desenvolvimento de Sistemas Web Sob Medida em Curitiba | 3W Online',
  description: 'Desenvolvimento de sistemas web sob medida em Curitiba: ERPs leves, CRMs, painéis de gestão e automações sem cobrança de mensalidade por usuário.',
  path: '/servicos/criacao-sistemas',
  keywords: 'sistemas web sob medida curitiba, desenvolvimento sistemas curitiba, erp sob medida, crm personalizado curitiba',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'Quanto tempo leva para desenvolver um sistema sob medida?', answer: 'Sistemas modulares iniciais costumam ser entregues entre 15 e 30 dias úteis, com entregas parciais a cada sprint quinzenal para validação da sua equipe.' },
  { question: 'O código-fonte será 100% da minha empresa?', answer: 'Sim! Ao concluir o projeto, você recebe o repositório completo e todos os direitos patrimoniais do código, sem qualquer dependência ou fidelidade forçada.' },
  { question: 'Como funciona a importação dos dados das nossas planilhas atuais?', answer: 'Nossa equipe de engenharia realiza o tratamento, limpeza e migração de todos os dados históricos das suas planilhas para o novo banco de dados sem custo adicional.' },
  { question: 'Vocês realizam o treinamento da equipe?', answer: 'Sim! Entregamos manuais gravados em vídeo e realizamos sessões de treinamento ao vivo com os colaboradores para garantir rápida adoção.' },
  { question: 'O sistema funciona bem em tablets e celulares?', answer: 'Sim! Todas as telas são responsivas e adaptadas para acesso de qualquer dispositivo com conexão à internet.' },
]
</script>
