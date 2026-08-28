<template>
  <div class="service-hotsite">
    <!-- 1. Primeira Dobra — Promessa + Ação + Escassez -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Design Gráfico & Branding' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-purple-500/20 text-purple-200 border border-purple-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:palette" class="w-4 h-4 text-purple-400" />
            <span>APENAS 3 PROJETOS DE IDENTIDADE VISUAL POR MÊS • CRIAÇÃO EXCLUSIVA</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Design Gráfico & Branding que <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-primary-400">Multiplicam o Valor da Sua Marca</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Pare de perder clientes para concorrentes que parecem mais profissionais. Criamos marcas memoráveis, logotipos exclusivos e manuais de identidade visual que transmitem autoridade e elegância.
          </p>

          <div class="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento para criação de identidade visual com a 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Solicitar Orçamento no WhatsApp
            </a>
            <button @click="scrollToSimulator" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Meu Projeto
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:vector-curve" class="w-4 h-4 text-purple-400" /> Vetores em Alta Resolução</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:book-open-page-variant" class="w-4 h-4 text-secondary-400" /> Manual de Marca Completo</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> 100% de Aprovação</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Prova Social Imediata -->
    <section class="bg-slate-900 text-white py-6 border-y border-white/10">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-2xl sm:text-4xl font-black text-purple-400 mb-1">+200</div>
            <div class="text-xs text-slate-300">Marcas Criadas</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">100%</div>
            <div class="text-xs text-slate-300">Autoral & Exclusivo</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+60%</div>
            <div class="text-xs text-slate-300">Aumento de Percepção de Valor</div>
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
          <span class="section-label">A Primeira Impressão</span>
          <h2 class="section-title">Quanto Dinheiro Sua Empresa Perde por Parecer Amadora?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            O cliente julga a competência do seu serviço pela qualidade do seu logotipo e identidade visual em menos de 1 segundo.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Problemas de um Visual Amador:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Logotipos Genéricos de Sites Baratos:</strong> Ícones copiados da internet que você vê em dezenas de outros concorrentes.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Desvalorização de Preço:</strong> Clientes pedem desconto porque sua marca não transmite a solidez necessária.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> <span><strong>Falta de Padrão nas Redes e Materiais:</strong> Cada post com uma fonte diferente, cores desbotadas e sem harmonia.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Um design fraco obriga sua empresa a competir por preço, e não por valor.
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                O Branding Estratégico da 3W:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Estudo Aprofundado de Posicionamento:</strong> Psicologia das cores e tipografia desenhadas para atrair o cliente certo.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Manual de Identidade Visual Completo:</strong> Regras claras de aplicação para nunca mais despadronizar materiais.</span></li>
                <li class="flex items-start gap-2.5"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> <span><strong>Arquivos em Todos os Formatos:</strong> Vetores abertos prontos para fachadas, frotas, brindes e telas digitais.</span></li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Elevação imediata de status e confiança para sua empresa cobrar mais.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Terceira Dobra — A Solução & Mecanismo Único -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Entregáveis de Design</span>
          <h2 class="section-title">O Que Desenvolvemos Para Sua Marca</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:draw" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Logotipo Exclusivo</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Versões primária, secundária, horizontal, vertical e ícone para avatar.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:book-open-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Manual de Identidade</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Guia com paleta de cores (RGB, CMYK, HEX), fontes e regras de uso.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:card-account-details-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Papelaria Corporativa</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Cartão de visita interativo, papel timbrado, pastas e assinaturas de e-mail.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:instagram" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Kit para Redes Sociais</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Templates de capas de destaque, avatares e padrões visuais de posts.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Quarta Dobra — Benefícios Mensuráveis -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Vantagens</span>
          <h2 class="section-title">Resultados de uma Marca Forte</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-purple-500 mb-2">+60%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Percepção de Valor</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Capacidade comprovada de praticar preços mais altos no mercado.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-primary-500 mb-2">100%</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Vetor Original</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Arquivos que nunca perdem resolução ao ampliar.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-emerald-500 mb-2">Elegância</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Autoridade Máxima</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Sua empresa transmitindo a solidez que ela realmente tem.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center">
            <div class="text-3xl font-black text-secondary-500 mb-2">30 Dias</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Garantia Técnica</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Suporte para envio de arquivos para gráficas parceiras.</p>
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
                "O redesign da nossa marca mudou o nível dos clientes que nos procuram. Hoje fechamos projetos de valor muito mais alto com facilidade."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Arquiteta Camila Duarte</div>
              <div class="text-[11px] text-gray-500">Fundadora • Studio Duarte Arquitetura</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:trending-up" class="w-3.5 h-3.5" /> +80% Ticket Médio
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O manual de marca entregue pela 3W é super detalhado. Facilitou muito a confecção de uniformes, frota e materiais impressos sem nenhum erro."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Henrique Vianna</div>
              <div class="text-[11px] text-gray-500">Diretor • Transportadora Curitiba</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5" /> 100% Padronizado
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Processo criativo impecável. Eles captaram a essência da nossa clínica na primeira apresentação de conceitos."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-100">
              <div class="font-bold text-xs text-gray-900">Dra. Raquel Silveira</div>
              <div class="text-[11px] text-gray-500">Sócia • Clínica Dermatológica</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:star-check" class="w-3.5 h-3.5" /> Aprovado de 1ª
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
          <h2 class="section-title">Como Criamos Sua Identidade Visual</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-3">1</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Briefing de Marca</h4>
            <p class="text-xs text-gray-500">Entendemos seu público, valores e objetivos comerciais.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto mb-3">2</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Conceitos & Moodboard</h4>
            <p class="text-xs text-gray-500">Criação de opções visuais com tipografia e cores.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-secondary-100 text-secondary-700 font-bold flex items-center justify-center mx-auto mb-3">3</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Apresentação & Ajustes</h4>
            <p class="text-xs text-gray-500">Validação dos conceitos e refinamento dos detalhes.</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto mb-3">4</div>
            <h4 class="text-sm font-bold text-gray-900 mb-1">Entrega dos Arquivos</h4>
            <p class="text-xs text-gray-500">Envio do Brandbook e vetores em todos os formatos.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Sétima Dobra — Diferenciais (Você vs Alternativas) -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container max-w-4xl">
        <div class="text-center mb-12">
          <span class="section-label">Comparativo</span>
          <h2 class="section-title">Por Que Criar Sua Marca com a 3W Online?</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl border border-gray-200 text-xs sm:text-sm text-left shadow-sm">
            <thead class="bg-slate-100 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th class="p-4">Critério</th>
                <th class="p-4 text-purple-700 bg-purple-50/50">3W Online (Branding Estratégico)</th>
                <th class="p-4 text-gray-500">Geradores Automáticos / Canva</th>
                <th class="p-4 text-gray-500">Freelancer de Logo Barato</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="p-4 font-semibold text-gray-900">Exclusividade do Design</td>
                <td class="p-4 font-bold text-emerald-600 bg-purple-50/30">100% Autoral & Registrável</td>
                <td class="p-4 text-gray-500">Não pode registrar marca</td>
                <td class="p-4 text-gray-500">Frequentemente copiado da web</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Manual de Marca (Brandbook)</td>
                <td class="p-4 font-bold text-emerald-600 bg-purple-50/30">Completo com todas as normas</td>
                <td class="p-4 text-gray-500">Inexistente</td>
                <td class="p-4 text-gray-500">Entrega apenas imagem PNG solta</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold text-gray-900">Arquivos Vetorizados</td>
                <td class="p-4 font-bold text-emerald-600 bg-purple-50/30">AI, EPS, PDF, SVG, PNG</td>
                <td class="p-4 text-gray-500">Apenas imagem de baixa qualidade</td>
                <td class="p-4 text-gray-500">Cobram extra por arquivos abertos</td>
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
            <span>PACOTE COMPLETO DE IDENTIDADE VISUAL & BRANDING</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu Projeto</h2>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-3.5 mb-8 text-xs sm:text-sm text-gray-100">
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Criação de Logotipo Exclusivo & Variantes:</strong> Versões para fundos claros, escuros e ícone para app.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Manual de Identidade Visual (Brandbook):</strong> Normas de aplicação, paleta de cores e tipografia.</span></div>
            <div class="flex items-start gap-3"><Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Transferência Total de Direitos Patrimoniais:</strong> Sua empresa é proprietária absoluta da marca.</span></div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 3 Bônus Gratuitos Inclusos:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Kit Papelaria</div>
                <div class="text-[11px] text-blue-200">Cartão de visita e papel timbrado. <span class="line-through text-gray-400">R$ 400</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Kit Redes Sociais</div>
                <div class="text-[11px] text-blue-200">Capas e avatares padronizados. <span class="line-through text-gray-400">R$ 500</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Suporte Gráfica</div>
                <div class="text-[11px] text-blue-200">Envio de arquivos para impressão. <span class="line-through text-gray-400">R$ 400</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">Garantia Técnica de 30 Dias</div>
                <div class="text-blue-200">Ajustes e correções gratuitas pós-entrega.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para criação de identidade visual com todos os bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Minha Marca no WhatsApp
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
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Simule Seu Projeto de Branding</h2>
          <p class="text-xs sm:text-sm text-blue-200">Escolha os itens necessários para sua empresa.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="design" />
        </div>
      </div>
    </section>

    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Respostas para Suas Dúvidas sobre Branding</h2>
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
          Pronto para transformar sua empresa em uma marca admirada e desejada?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Agende uma conversa com nossos designers de branding e eleve o padrão visual do seu negócio.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar sobre a criação de identidade visual para minha empresa."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Falar com Designer no WhatsApp
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
  title: 'Design Gráfico e Branding em Curitiba | Criação de Marcas | 3W Online',
  description: 'Design gráfico profissional e criação de identidade visual em Curitiba. Logotipos exclusivos, manual de marca, papelaria e materiais institucionais.',
  path: '/servicos/design-grafico',
  keywords: 'design gráfico curitiba, criação de logotipo curitiba, identidade visual curitiba, branding curitiba, manual de marca',
})

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const faqs = [
  { question: 'Quantos conceitos de logotipo são apresentados?', answer: 'Apresentamos de 2 a 3 conceitos completos de identidade visual desenvolvidos estrategicamente com base no seu briefing e concorrentes.' },
  { question: 'Posso registrar a marca desenvolvida no INPI?', answer: 'Sim! Nossas criações são 100% originais e autorais, permitindo que você realize o processo de registro de marca no INPI com total segurança jurídica.' },
  { question: 'Em quais formatos receberei os arquivos finais?', answer: 'Entregamos o pacote completo com arquivos vetorizados e abertos (AI, EPS, PDF, SVG) e imagens em alta resolução com fundo transparente (PNG) para qualquer tipo de aplicação digital ou impressa.' },
  { question: 'Quanto tempo leva o processo de criação de identidade visual?', answer: 'O ciclo completo de pesquisa, criação de conceitos, aprovação e montagem do manual de marca leva em média de 10 a 15 dias úteis.' },
]
</script>
