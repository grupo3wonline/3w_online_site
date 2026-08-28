<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Criação de Sites' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:lightning-bolt" class="w-4 h-4 text-secondary-400" />
            <span>APENAS 2 NOVOS PROJETOS INICIADOS POR SEMANA • DESENVOLVIMENTO EXCLUSIVO</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Sites Profissionais Ultrarrápidos que <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Convertem Visitantes em Clientes</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Desenvolvimento moderno em Vue 3 e TypeScript com carregamento em menos de 1.5s, SEO estruturado para o Google e design exclusivo que eleva a autoridade da sua marca.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento para criação de site profissional."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Solicitar Orçamento no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Meu Site
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> 30 Dias de Garantia Total</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:speedometer" class="w-4 h-4 text-secondary-400" /> Carregamento em &lt; 1.5s</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:google" class="w-4 h-4 text-cyan-400" /> SEO Nativo Google</span>
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
            <div class="text-xs text-slate-300">Sites Publicados</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">&lt; 1.5s</div>
            <div class="text-xs text-slate-300">Tempo de Carregamento</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">99/100</div>
            <div class="text-xs text-slate-300">Nota Google PageSpeed</div>
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
          <span class="section-label">O Diagnóstico</span>
          <h2 class="section-title">Por Que a Maioria dos Sites Não Vende?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Se sua empresa enfrenta algum destes problemas, você está perdendo vendas todos os dias para concorrentes mais velozes.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Dores Críticas de Sites Amadores:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Carregamento Lento:</strong> Se o site demora mais de 3 segundos, mais de 50% dos visitantes desistem antes de ver sua oferta.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Visual Amador ou Tema Batido:</strong> O cliente julga o valor do seu serviço pelo design da página em menos de 50 milissegundos.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Invisível no Google:</strong> Sites feitos sem arquitetura de SEO técnico nunca recebem tráfego orgânico gratuito.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Plugins Quebrados & Falhas no Celular:</strong> Menus que não abrem e botões que não clicam em smartphones.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Um site ruim custa muito mais caro em vendas perdidas do que o investimento em um site profissional.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                A Solução de Engenharia 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tecnologia SPA Vue 3 / Vite:</strong> Páginas que abrem instantaneamente, garantindo retenção máxima de leads.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Design Exclusivo de Alto Padrão:</strong> Criado especificamente para sua marca transmitir autoridade imediata.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>SEO Técnico Nativo:</strong> Tags semânticas, schema.org e sitemap XML para ranquear nas primeiras posições.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Conversão Otimizada no WhatsApp:</strong> Botões flutuantes e formulários inteligentes para gerar contatos diretos.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Código 100% autoral com transferência total de direitos para o cliente.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Mecanismo Único</span>
          <h2 class="section-title">Como Transformamos Visitantes em Oportunidades Reais</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Combinamos 3 pilares essenciais: velocidade extrema, copywriting persuasivo e design responsivo.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:speedometer" class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-2">1. Retenção Imediata</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Carregamento abaixo de 1.5s evita a fuga de visitantes em redes móveis 4G/5G.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:text-box-check-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-2">2. Persuasão Visual</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Estrutura de blocos que conduz o visitante do interesse ao desejo de compra.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:whatsapp" class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-2">3. Conversão Direta</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Integração nativa com WhatsApp e formulários para iniciar conversas comerciais na hora.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios com Resultados Percebidos -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Vantagens Concretas</span>
          <h2 class="section-title">O Que Sua Empresa Ganha</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">+140%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Mais Mensagens</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Aumento médio no volume de leads gerados pelo site no WhatsApp.</p>
          </div>

          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">&lt; 1.5s</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Velocidade Máxima</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Carregamento instantâneo que reduz drasticamente a taxa de rejeição.</p>
          </div>

          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">1º Lugar</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">SEO no Google</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Estrutura otimizada para ranquear nas pesquisas locais da sua cidade.</p>
          </div>

          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-purple-500 mb-2">100%</div>
            <div class="text-sm font-bold text-gray-900 mb-1">Código Próprio</div>
            <p class="text-xs text-gray-500 leading-relaxed">Sem mensalidades forçadas ou dependência de plugins de terceiros.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Quinta Dobra — Prova Social com Métricas Reais -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Casos Reais</span>
          <h2 class="section-title">Resultados de Quem Criou o Site com a 3W Online</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O site antigo demorava 6 segundos para abrir. Com a 3W, a nova versão carrega instantaneamente e aumentou em <strong>+140% as mensagens de orçamento</strong>."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Guilherme Prado</div>
              <div class="text-[11px] text-gray-500">Diretor • Escritório de Engenharia</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:speedometer" class="w-3.5 h-3.5" /> 99/100 no Google PageSpeed
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Nossa autoridade visual mudou completamente. Fechamos contratos maiores simplesmente porque o site transmite o profissionalismo que a empresa tem."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Dra. Letícia Rossi</div>
              <div class="text-[11px] text-gray-500">Sócia • Clínica Odontológica Curitiba</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +85% de Pacientes Particulares
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Entrega impecável dentro do prazo de 10 dias. O suporte técnico nos orientou em cada detalhe de configuração do domínio e e-mails."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Rodrigo Mendonça</div>
              <div class="text-[11px] text-gray-500">CEO • Consultoria Financeira B2B</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-all" class="w-3.5 h-3.5" /> Entrega em 10 Dias Úteis
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
          <h2 class="section-title">Como Criamos Seu Site em 4 Passos</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Briefing & Estratégia</h4>
            <p class="text-xs text-gray-500">Coleta de informações sobre sua marca, produtos e público.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-secondary-100 text-secondary-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Layout Exclusivo</h4>
            <p class="text-xs text-gray-500">Apresentação visual para sua aprovação antes do código.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Codificação & SEO</h4>
            <p class="text-xs text-gray-500">Desenvolvimento ágil em Vue 3 com otimização de velocidade.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Publicação & Garantia</h4>
            <p class="text-xs text-gray-500">Deploy com SSL, domínio e 30 dias de suporte gratuito.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que a 3W Online é a Escolha Mais Segura?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério de Avaliação</th>
                <th class="p-4 text-primary-700 bg-primary-50/50">3W Online</th>
                <th class="p-4 text-gray-500">Agências Tradicionais</th>
                <th class="p-4 text-gray-500">Plataformas Prontas / Wix</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Velocidade de Carregamento</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">&lt; 1.5s (Vue 3 / Vite)</td>
                <td class="p-4 text-gray-500">Lento (WordPress pesado)</td>
                <td class="p-4 text-gray-500">Média (cheio de scripts)</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Propriedade do Código</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">100% do Cliente</td>
                <td class="p-4 text-gray-500">Geralmente presa à agência</td>
                <td class="p-4 text-gray-500">Você nunca é o dono</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Mensalidades Forçadas</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">Zero (Sem taxas ocultas)</td>
                <td class="p-4 text-gray-500">Cobram manutenção cara</td>
                <td class="p-4 text-gray-500">Mensalidade vitalícia em dólar</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Garantia & Suporte</td>
                <td class="p-4 font-bold text-emerald-600 bg-primary-50/30">30 Dias Garantidos</td>
                <td class="p-4 text-gray-500">Suporte burocrático por ticket</td>
                <td class="p-4 text-gray-500">Apenas autoatendimento</td>
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
            <span>PACOTE COMPLETO DE CRIAÇÃO DE SITES</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu Projeto</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Design 100% Exclusivo & Responsivo:</strong> Adaptado perfeitamente a computadores, tablets e celulares.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Integração Direta WhatsApp:</strong> Botões de conversão e formulários para receber leads na hora.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Painel Administrativo Intuitivo:</strong> Altere textos, fotos e produtos sem depender de suporte.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Otimização SEO Google</div>
                <div class="text-[11px] text-blue-200">Indexação e tags para ranquear. <span class="line-through text-gray-400">R$ 700</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Hospedagem + SSL</div>
                <div class="text-[11px] text-blue-200">1 ano de infraestrutura segura. <span class="line-through text-gray-400">R$ 450</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Treinamento em Vídeo</div>
                <div class="text-[11px] text-blue-200">Manual gravado de uso do site. <span class="line-through text-gray-400">R$ 350</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">30 Dias de Garantia Total</div>
                <div class="text-blue-200">Suporte e correções sem custo pós-entrega.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero aproveitar o pacote completo de criação de sites com os 3 bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Meu Site no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto de Site</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha os módulos e obtenha uma estimativa orçamentária.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="website" />
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
          Pronto para transformar mais visitantes em clientes?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Comece agora e descubra quanto potencial de conversão sua empresa está deixando na mesa com um site antigo.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Quero começar o desenvolvimento do meu site com a 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Quero Criar Meu Site Agora
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
  title: 'Criação de Sites Profissionais em Curitiba | 3W Online',
  description: 'Criação de sites profissionais e landing pages de alta conversão em Curitiba. Carregamento em menos de 1.5s, Vue 3, SEO nativo e 30 dias de garantia.',
  path: '/servicos/criacao-sites',
  keywords: 'criação de sites curitiba, criação de sites profissionais, desenvolvimento de sites curitiba, landing pages curitiba',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'Quanto tempo demora para meu site ficar pronto?', answer: 'Landing pages de alta conversão e sites institucionais são entregues em média entre 7 e 15 dias úteis, com cronograma claro e validações parciais com você.' },
  { question: 'O código-fonte será 100% da minha empresa?', answer: 'Sim! Ao finalizar o projeto e aprovar a entrega, você recebe todos os arquivos e direitos patrimoniais do código, sem qualquer fidelidade ou dependência da 3W Online.' },
  { question: 'Como funciona a garantia de 30 dias?', answer: 'Oferecemos 30 dias de garantia técnica gratuita pós-publicação para ajustes, dúvidas operacionais e correções sem qualquer custo adicional.' },
  { question: 'Vocês cuidam da hospedagem e do domínio?', answer: 'Sim! Como bônus especial, configuramos seu domínio, certificado SSL e hospedagem SSD em nuvem gratuitamente no primeiro ano.' },
  { question: 'Consigo editar os textos e fotos sozinho depois?', answer: 'Com certeza! Entregamos uma área administrativa amigável e um tutorial gravado em vídeo ensinando passo a passo como alterar qualquer informação.' },
]
</script>
