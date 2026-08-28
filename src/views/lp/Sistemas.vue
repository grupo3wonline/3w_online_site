<template>
  <div class="sistemas-page">
    <!-- Hero / Primeira Dobra — Dark Navy com Escassez & Confiança -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Sistemas Web Sob Medida' }]" />

        <div class="max-w-4xl mt-4">
          <!-- Selo de Urgência / Escassez -->
          <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4 animate-pulse">
            <Icon icon="mdi:fire" class="w-4 h-4 text-rose-400" />
            <span>OFERTA LIMITADA • AUTOMATIZE SEU NEGÓCIO E GANHE ATÉ 40H/SEMANA</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Automatize Seu Negócio com <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Sistemas Web Sob Medida</span>
          </h1>

          <div class="space-y-2.5 mb-8 text-blue-200 text-sm sm:text-base max-w-3xl leading-relaxed">
            <p class="flex items-center gap-2.5"><Icon icon="mdi:flash" class="w-4 h-4 text-yellow-300 shrink-0" /> <span><strong>Elimine tarefas repetitivas:</strong> Ganhe até 40 horas semanais de produtividade da equipe.</span></p>
            <p class="flex items-center gap-2.5"><Icon icon="mdi:chart-bar" class="w-4 h-4 text-secondary-400 shrink-0" /> <span><strong>Controle total com relatórios em tempo real:</strong> Sem pagar mensalidades caras por usuário.</span></p>
            <p class="flex items-center gap-2.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400 shrink-0" /> <span><strong>Código 100% proprietário:</strong> Transferência integral de propriedade intelectual para sua empresa.</span></p>
          </div>

          <!-- CTAs Principais -->
          <div class="flex flex-wrap gap-4 items-center mb-10">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de uma consultoria gratuita para automatizar processos com sistema sob medida."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Solicitar Consultoria Grátis no WhatsApp
            </a>
            <a href="#simulador" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Meu Sistema
            </a>
          </div>

          <!-- Elementos de Confiança Próximos ao CTA -->
          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> 30 Dias de Garantia Total</span>
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
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+150</div>
            <div class="text-xs text-slate-300">Sistemas Desenvolvidos</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">0 R$</div>
            <div class="text-xs text-slate-300">Cobrança por Licença de Usuário</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">99.9%</div>
            <div class="text-xs text-slate-300">Disponibilidade em Nuvem</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">4.9 / 5.0</div>
            <div class="text-xs text-slate-300">Avaliação Média no Google</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problema / O Custo da Inação (Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">O Prejuízo dos Processos Manuais</span>
          <h2 class="section-title">Pare de Perder Tempo e Dinheiro com Planilhas Quebradas</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Enquanto você luta contra planilhas confusas, seus concorrentes automatizam e crescem 10x mais rápido.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Os Riscos de Processos Manuais:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Erros Humanos & Dados Perdidos:</strong> Uma fórmula corrompida na planilha pode custar milhares de reais em faturamento.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Horas Gastas em Retrabalho:</strong> Funcionários digitando as mesmas informações em múltiplos lugares todos os dias.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Falta de Visibilidade para a Diretoria:</strong> Impossibilidade de extrair relatórios em tempo real para tomada de decisão.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Softwares de Prateleira Inflexíveis:</strong> Mensalidades caras em dólar por usuário que não atendem às suas regras.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Cada hora desperdiçada com tarefas manuais é dinheiro jogado fora.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Solução com Sistema Sob Medida 3W:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Painel 100% Adaptado ao Seu Fluxo:</strong> Telas simples e intuitivas que qualquer colaborador aprende a usar em 15 minutos.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Automação de E-mails & WhatsApp:</strong> Cobranças, avisos de pedidos e notificações enviadas sem intervenção humana.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Dashboards Financeiros em Tempo Real:</strong> Gráficos precisos de faturamento, margem de lucro e pedidos abertos.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Economia Vitalícia de Licenças:</strong> Cadastre 5, 50 ou 500 usuários sem pagar nada a mais por isso.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Aumento comprovado de até 500% em produtividade da equipe.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Como Funciona em 4 Passos -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Fluxo Ágil</span>
          <h2 class="section-title">Como Criamos Seu Sistema Sob Medida</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Do mapeamento das regras de negócio até o treinamento prático da sua equipe.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              1
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Diagnóstico de Processos</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Mapeamos as planilhas atuais, gargalos e regras de cálculo do negócio.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              2
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Prototipagem Interativa</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Apresentamos as telas do sistema para validação do fluxo com sua equipe.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              3
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Desenvolvimento & Migração</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Codificação em Vue 3, testes de segurança e importação gratuita dos dados antigos.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              4
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Treinamento & Garantia</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Treinamento ao vivo com os colaboradores e 30 dias de suporte pós-entrega.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Casos Reais & Depoimentos -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Histórias de Sucesso</span>
          <h2 class="section-title">Resultados de Quem Automatizou Processos</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Empresas que ganharam escala e eliminaram o estresse operacional.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Nosso time gastava 4 horas por dia consolidando relatórios de vendas. Com o sistema da 3W, tudo é gerado em <strong>1 clique em tempo real</strong>."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Vinícius Toledo</div>
              <div class="text-[11px] text-gray-500">Diretor Comercial • Distribuidora</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:clock-check" class="w-3.5 h-3.5" /> 4h/dia Economizadas
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Cancelamos as mensalidades de um software americano que custava R$ 2.400/mês. O sistema sob medida da 3W se pagou em menos de 5 meses."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Andréia Zanetti</div>
              <div class="text-[11px] text-gray-500">Sócia-Administradora • Serviços Financeiros</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:currency-usd" class="w-3.5 h-3.5" /> R$ 28k Economizados/Ano
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A facilidade de uso foi o grande diferencial. Toda a nossa equipe de atendimento aprendeu a operar o CRM em menos de uma semana."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Gustavo Rezende</div>
              <div class="text-[11px] text-gray-500">Gerente de Vendas • Indústria Química</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-all" class="w-3.5 h-3.5" /> Adoção Imediata
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Oferta Irresistível + Bônus Inclusos -->
    <section class="section-padding bg-gradient-to-b from-slate-900 to-[#0a1628] text-white">
      <div class="container max-w-4xl">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-1 bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-secondary-400" />
            <span>PACOTE COMPLETO DE AUTOMAÇÃO</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu Sistema</h2>
          <p class="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto">
            Uma plataforma completa entregue pronta para operar sem custos ocultos.
          </p>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Desenvolvimento Sob Medida com Vue 3 & Banco PostgreSQL:</strong> Alta performance e segurança de dados.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Usuários e Cadastros Ilimitados:</strong> Sem mensalidades adicionais conforme seu time cresce.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Transferência Total de Código-Fonte:</strong> Sua empresa é dona definitiva de todo o software criado.</span>
            </div>
          </div>

          <!-- Bônus Gratuitos -->
          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 Bônus Especiais Inclusos no Contrato:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Migração de Planilhas</div>
                <div class="text-[11px] text-blue-200">Importação gratuita dos seus dados antigos. <span class="line-through text-gray-400">R$ 800</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Treinamento em Vídeo</div>
                <div class="text-[11px] text-blue-200">Manual gravado para novos funcionários. <span class="line-through text-gray-400">R$ 500</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Suporte VIP 30 Dias</div>
                <div class="text-[11px] text-blue-200">Ajustes e correções gratuitas pós-entrega. <span class="line-through text-gray-400">R$ 1.200</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <!-- Garantia Incondicional & CTA -->
          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">30 Dias de Garantia Total</div>
                <div class="text-blue-200">Ajustes e estabilização sem custos adicionais.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero aproveitar a condição especial de automação com sistema sob medida."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Projeto no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Calcule a Estimativa do Seu Sistema</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha as funcionalidades e receba a estimativa.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="system" />
        </div>
      </div>
    </section>

    <!-- Quebra de Objeções & FAQ Decisivo -->
    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Dúvidas Frequentes sobre Sistemas Sob Medida</h2>
          <p class="section-subtitle">Tudo o que você precisa saber sobre o desenvolvimento.</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- CTA Final — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-rose-400" />
          <span>Agenda Aberta para Início Imediato</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para eliminar processos manuais e automatizar sua empresa?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende uma consultoria diagnóstica gratuita com nossos arquitetos de software e receba um plano de automação sob medida.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de agendar uma consultoria diagnóstica de sistemas sob medida."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Agendar Consultoria no WhatsApp
          </a>
          <RouterLink to="/contato" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
            Solicitar Proposta por E-mail
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
  title: 'Desenvolvimento de Sistemas Sob Medida em Curitiba | 3W Online',
  description: 'Sistemas web sob medida para automatizar seu negócio. CRM, ERP, agendamento, controle de pedidos e integrações. Empresa de software em Curitiba.',
  path: '/lp-sistemas',
  keywords: 'sistemas sob medida curitiba, desenvolvimento sistemas, crm personalizado, erp curitiba, automação comercial',
})

const faqs = [
  { question: 'Quanto tempo leva para desenvolver um sistema web sob medida?', answer: 'Sistemas modulares iniciais costumam ser entregues entre 15 e 30 dias úteis com cronograma de sprints e validações quinzenais.' },
  { question: 'O código-fonte do sistema será da minha empresa?', answer: 'Sim! Ao concluir o projeto, todos os direitos de propriedade intelectual e o código-fonte desenvolvido são integralmente transferidos para a sua empresa.' },
  { question: 'Vocês realizam o treinamento da nossa equipe?', answer: 'Sim! Entregamos manuais em vídeo e realizamos sessões de treinamento ao vivo para garantir que todos os colaboradores utilizem o sistema com facilidade.' },
  { question: 'Como funciona a importação dos dados das nossas planilhas atuais?', answer: 'Nossa equipe de engenharia realiza o tratamento, limpeza e migração de todos os dados históricos das suas planilhas para o novo banco de dados sem custo adicional.' },
]
</script>
