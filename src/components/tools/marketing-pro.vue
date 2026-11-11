<template>
  <ToolShell
    title="Marketing Pro — Calculadoras & Métricas"
    :description="`${abaLabel}: calcule métricas profissionais de marketing digital.`"
    icon="fa-chart-line"
    icon-gradient="from-orange-500 to-rose-600"
    orb-color="orange"
    :quick-tips="['11 calculadoras', 'Resultado instantâneo', 'Fórmulas profissionais']"
    :tips="marketingTips"
  >
    <!-- Tabs -->
    <div class="tab-row">
      <button v-for="t in tabs" :key="t.id" @click="aba=t.id"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba===t.id?'bg-orange-600 text-white border-orange-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
      </button>
    </div>

    <!-- ══ ENGAJAMENTO ════════════════════════════════════════════ -->
    <div v-if="aba==='engajamento'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">Calculadora de Taxa de Engajamento</h3>
        <p class="text-xs text-blue-300 mb-4">Mede o nível de interação do público com seu conteúdo.</p>
        <div><label class="field-label">Seguidores / Alcance</label><input v-model.number="eng.seguidores" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Curtidas</label><input v-model.number="eng.curtidas" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Comentários</label><input v-model.number="eng.comentarios" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Compartilhamentos</label><input v-model.number="eng.compartilhamentos" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Salvamentos</label><input v-model.number="eng.salvamentos" type="number" class="input-aurora w-full" /></div>
        <button @click="calcEngajamento()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="eng.resultado" class="space-y-3">
        <div class="glass-panel p-5 text-center">
          <p class="text-xs text-blue-300 mb-1">Taxa de Engajamento</p>
          <p class="text-5xl font-black" :class="eng.resultado.taxa>=5?'text-green-400':eng.resultado.taxa>=2?'text-yellow-400':'text-red-400'">{{ eng.resultado.taxa.toFixed(2) }}%</p>
          <p class="text-sm mt-2 font-semibold" :class="eng.resultado.taxa>=5?'text-green-300':eng.resultado.taxa>=2?'text-yellow-300':'text-red-300'">{{ eng.resultado.nivel }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="item in eng.resultado.detalhe" :key="item.label" class="glass-panel p-3 text-center">
            <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
            <p class="font-mono font-bold text-sm text-white">{{ item.valor }}</p>
          </div>
        </div>
        <div class="glass-panel p-3 text-xs text-blue-200 space-y-1">
          <p class="font-semibold text-white mb-1">Benchmarks de Engajamento:</p>
          <p>🔴 Abaixo de 1% — Baixo</p><p>🟡 1–3% — Médio</p><p>🟢 3–6% — Bom</p><p>⭐ Acima de 6% — Excelente</p>
        </div>
      </div>
    </div>

    <!-- ══ ROAS ════════════════════════════════════════════════════ -->
    <div v-if="aba==='roas'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">ROAS — Retorno sobre Gasto em Anúncio</h3>
        <p class="text-xs text-blue-300 mb-4">Return On Ad Spend: quanto você fatura para cada R$1 investido em anúncios.</p>
        <div><label class="field-label">Receita gerada pelos anúncios (R$)</label><input v-model.number="roas.receita" type="number" step="0.01" class="input-aurora w-full" /></div>
        <div><label class="field-label">Gasto total em anúncios (R$)</label><input v-model.number="roas.gasto" type="number" step="0.01" class="input-aurora w-full" /></div>
        <div><label class="field-label">Custo do produto/serviço (R$) <span class="text-blue-400 text-[10px]">opcional</span></label><input v-model.number="roas.custo" type="number" step="0.01" class="input-aurora w-full" /></div>
        <button @click="calcRoas()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="roas.resultado" class="space-y-3">
        <div class="glass-panel p-5 text-center">
          <p class="text-xs text-blue-300 mb-1">ROAS</p>
          <p class="text-5xl font-black" :class="roas.resultado.roas>=4?'text-green-400':roas.resultado.roas>=2?'text-yellow-400':'text-red-400'">{{ roas.resultado.roas.toFixed(2) }}x</p>
          <p class="text-xs text-blue-300 mt-1">Para cada R$1 investido, gerou R${{ roas.resultado.roas.toFixed(2) }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="item in roas.resultado.detalhe" :key="item.label" class="glass-panel p-3 text-center">
            <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
            <p class="font-mono font-bold text-sm" :class="item.cor||'text-white'">{{ item.valor }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ LTV ════════════════════════════════════════════════════ -->
    <div v-if="aba==='ltv'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">LTV — Lifetime Value do Cliente</h3>
        <p class="text-xs text-blue-300 mb-4">Valor total que um cliente gera durante toda a relação com a empresa.</p>
        <div><label class="field-label">Ticket médio por compra (R$)</label><input v-model.number="ltv.ticket" type="number" step="0.01" class="input-aurora w-full" /></div>
        <div><label class="field-label">Frequência de compra (vezes por mês)</label><input v-model.number="ltv.frequencia" type="number" step="0.1" class="input-aurora w-full" /></div>
        <div><label class="field-label">Tempo médio de retenção (meses)</label><input v-model.number="ltv.retencao" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Margem de lucro (%)</label><input v-model.number="ltv.margem" type="number" step="0.1" class="input-aurora w-full" /></div>
        <button @click="calcLtv()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="ltv.resultado" class="space-y-3">
        <div class="glass-panel p-5 text-center">
          <p class="text-xs text-blue-300 mb-1">LTV</p>
          <p class="text-4xl font-black text-green-400">{{ ltv.resultado.ltvFmt }}</p>
          <p class="text-xs text-blue-300 mt-1">Valor médio por cliente</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="item in ltv.resultado.detalhe" :key="item.label" class="glass-panel p-3 text-center">
            <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
            <p class="font-mono font-bold text-sm text-white">{{ item.valor }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ CAC ════════════════════════════════════════════════════ -->
    <div v-if="aba==='cac'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">CAC — Custo de Aquisição de Cliente</h3>
        <p class="text-xs text-blue-300 mb-4">Quanto custa, em média, conquistar um novo cliente.</p>
        <div><label class="field-label">Investimento em Marketing (R$)</label><input v-model.number="cac.marketing" type="number" step="0.01" class="input-aurora w-full" /></div>
        <div><label class="field-label">Investimento em Vendas (R$)</label><input v-model.number="cac.vendas" type="number" step="0.01" class="input-aurora w-full" /></div>
        <div><label class="field-label">Outros custos de aquisição (R$)</label><input v-model.number="cac.outros" type="number" step="0.01" class="input-aurora w-full" /></div>
        <div><label class="field-label">Novos clientes adquiridos</label><input v-model.number="cac.clientes" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">LTV do cliente (R$) <span class="text-blue-400 text-[10px]">opcional</span></label><input v-model.number="cac.ltvRef" type="number" step="0.01" class="input-aurora w-full" /></div>
        <button @click="calcCac()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="cac.resultado" class="space-y-3">
        <div class="glass-panel p-5 text-center">
          <p class="text-xs text-blue-300 mb-1">CAC</p>
          <p class="text-4xl font-black text-orange-400">{{ cac.resultado.cacFmt }}</p>
          <p class="text-xs text-blue-300 mt-1">por cliente adquirido</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="item in cac.resultado.detalhe" :key="item.label" class="glass-panel p-3 text-center">
            <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
            <p class="font-mono font-bold text-sm" :class="item.cor||'text-white'">{{ item.valor }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ CONVERSÃO ══════════════════════════════════════════════ -->
    <div v-if="aba==='conversao'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">Taxa de Conversão & Funil</h3>
        <p class="text-xs text-blue-300 mb-4">Simule as etapas do funil de vendas e taxas de conversão.</p>
        <div v-for="(etapa, i) in funil" :key="i" class="flex gap-2 items-center">
          <div class="flex-1"><label class="text-[10px] text-blue-300 mb-1 block">Etapa {{ i+1 }}</label><input v-model="etapa.nome" class="input-aurora w-full text-xs" placeholder="Visitas, Leads, etc." /></div>
          <div class="w-28"><label class="text-[10px] text-blue-300 mb-1 block">Quantidade</label><input v-model.number="etapa.qtd" type="number" class="input-aurora w-full text-xs" /></div>
          <button v-if="i>1" @click="funil.splice(i,1)" class="text-red-400 hover:text-red-300 mt-4 shrink-0"><Icon icon="mdi:close-circle" class="w-4 h-4" /></button>
        </div>
        <button @click="funil.push({nome:'',qtd:0})" class="text-xs text-blue-400 flex items-center gap-1"><Icon icon="mdi:plus-circle" class="w-3.5 h-3.5" /> Adicionar etapa</button>
        <div class="form-grid-2">
          <div><label class="field-label">Ticket médio (R$)</label><input v-model.number="conv.ticket" type="number" step="0.01" class="input-aurora w-full" /></div>
          <div><label class="field-label">Período (dias)</label><input v-model.number="conv.periodo" type="number" class="input-aurora w-full" /></div>
        </div>
        <button @click="calcConversao()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="conv.resultado" class="space-y-3">
        <div class="grid grid-cols-2 gap-2">
          <div v-for="item in conv.resultado.metricas" :key="item.label" class="glass-panel p-3 text-center">
            <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
            <p class="font-mono font-bold text-sm" :class="item.cor||'text-white'">{{ item.valor }}</p>
          </div>
        </div>
        <!-- Funil visual -->
        <div class="glass-panel p-4 space-y-2">
          <p class="text-xs font-semibold text-white mb-2">Funil de Conversão:</p>
          <div v-for="(etapa, i) in conv.resultado.funil" :key="i" class="flex items-center gap-2">
            <div class="flex-1 bg-white/5 rounded-lg overflow-hidden h-7 relative">
              <div class="h-full bg-orange-600/60 transition-all" :style="`width:${etapa.pct}%`"></div>
              <span class="absolute inset-0 flex items-center px-2 text-xs text-white font-semibold">{{ etapa.nome }}: {{ etapa.qtd.toLocaleString('pt-BR') }}</span>
            </div>
            <span class="text-xs text-blue-300 w-14 text-right">{{ etapa.pct.toFixed(1) }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ EMAIL MARKETING ════════════════════════════════════════ -->
    <div v-if="aba==='email'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">Calculadora de E-mail Marketing</h3>
        <div class="form-grid-2">
          <div><label class="field-label">E-mails enviados</label><input v-model.number="email.enviados" type="number" class="input-aurora w-full" /></div>
          <div><label class="field-label">E-mails entregues</label><input v-model.number="email.entregues" type="number" class="input-aurora w-full" /></div>
        </div>
        <div class="form-grid-2">
          <div><label class="field-label">Abertos</label><input v-model.number="email.abertos" type="number" class="input-aurora w-full" /></div>
          <div><label class="field-label">Cliques</label><input v-model.number="email.cliques" type="number" class="input-aurora w-full" /></div>
        </div>
        <div class="form-grid-2">
          <div><label class="field-label">Conversões</label><input v-model.number="email.conversoes" type="number" class="input-aurora w-full" /></div>
          <div><label class="field-label">Ticket médio (R$)</label><input v-model.number="email.ticket" type="number" step="0.01" class="input-aurora w-full" /></div>
        </div>
        <div><label class="field-label">Custo da campanha (R$)</label><input v-model.number="email.custo" type="number" step="0.01" class="input-aurora w-full" /></div>
        <button @click="calcEmail()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="email.resultado" class="grid grid-cols-2 gap-3">
        <div v-for="item in email.resultado" :key="item.label" class="glass-panel p-3 text-center">
          <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
          <p class="font-mono font-bold text-sm" :class="item.cor||'text-white'">{{ item.valor }}</p>
          <p v-if="item.benchmark" class="text-[10px] text-blue-400 mt-0.5">Ref: {{ item.benchmark }}</p>
        </div>
      </div>
    </div>

    <!-- ══ HASHTAGS ════════════════════════════════════════════════ -->
    <div v-if="aba==='hashtags'" class="space-y-4">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">Gerador de Hashtags por Nicho</h3>
        <div class="form-grid-2">
          <div>
            <label class="field-label">Nicho / Área</label>
            <select v-model="hash.nicho" class="input-aurora w-full">
              <option v-for="n in nichosHash" :key="n.id" :value="n.id">{{ n.label }}</option>
            </select>
          </div>
          <div>
            <label class="field-label">Palavras-chave adicionais</label>
            <input v-model="hash.palavras" class="input-aurora w-full" placeholder="ex: curitiba, freelance" />
          </div>
        </div>
        <div class="form-grid-2">
          <div>
            <label class="field-label">Volume de hashtags</label>
            <select v-model="hash.volume" class="input-aurora w-full">
              <option value="pequeno">Pequeno (5–15 tags)</option>
              <option value="medio">Médio (15–25 tags)</option>
              <option value="grande">Grande (25–30 tags)</option>
            </select>
          </div>
          <div>
            <label class="field-label">Plataforma</label>
            <select v-model="hash.plataforma" class="input-aurora w-full">
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">X/Twitter</option>
            </select>
          </div>
        </div>
        <button @click="gerarHashtags()" class="btn-row justify-start !mb-0">
          <button class="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors"><Icon icon="mdi:refresh" class="w-4 h-4 inline mr-1" /> Gerar Hashtags</button>
        </button>
      </div>
      <div v-if="hash.resultado.length" class="glass-panel p-5 space-y-3">
        <div class="flex justify-between items-center">
          <p class="text-xs font-semibold text-white">{{ hash.resultado.length }} hashtags para {{ hash.plataforma }}</p>
          <button @click="copiarHashtags()" class="text-xs text-blue-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar tudo</button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="h in hash.resultado" :key="h" @click="copiarUm(h)"
            class="cursor-pointer px-2.5 py-1 bg-orange-600/20 hover:bg-orange-600/40 border border-orange-500/30 text-orange-200 hover:text-white rounded-lg text-xs font-mono transition-colors">
            {{ h }}
          </span>
        </div>
        <div class="p-3 bg-white/5 rounded-xl text-xs font-mono text-blue-200 leading-relaxed break-all">
          {{ hash.resultado.join(' ') }}
        </div>
      </div>
    </div>

    <!-- ══ CPM/CPC/CPA ════════════════════════════════════════════ -->
    <div v-if="aba==='cpm'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">CPM / CPC / CPA — Custo por Resultado</h3>
        <div class="form-grid-2">
          <div><label class="field-label">Investimento total (R$)</label><input v-model.number="cpm.investimento" type="number" step="0.01" class="input-aurora w-full" /></div>
          <div><label class="field-label">Impressões</label><input v-model.number="cpm.impressoes" type="number" class="input-aurora w-full" /></div>
        </div>
        <div class="form-grid-2">
          <div><label class="field-label">Cliques</label><input v-model.number="cpm.cliques" type="number" class="input-aurora w-full" /></div>
          <div><label class="field-label">Conversões</label><input v-model.number="cpm.conversoes" type="number" class="input-aurora w-full" /></div>
        </div>
        <div><label class="field-label">Receita gerada (R$)</label><input v-model.number="cpm.receita" type="number" step="0.01" class="input-aurora w-full" /></div>
        <button @click="calcCpm()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="cpm.resultado" class="grid grid-cols-2 gap-3">
        <div v-for="item in cpm.resultado" :key="item.label" class="glass-panel p-3 text-center">
          <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
          <p class="font-mono font-bold text-sm" :class="item.cor||'text-white'">{{ item.valor }}</p>
          <p v-if="item.desc" class="text-[10px] text-blue-400 mt-0.5">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <!-- ══ SEO ════════════════════════════════════════════════════ -->
    <div v-if="aba==='seo'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">Calculadora de SEO & Tráfego Orgânico</h3>
        <div><label class="field-label">Volume de busca mensal (palavra-chave)</label><input v-model.number="seo.volume" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Posição esperada no Google (1–10)</label><input v-model.number="seo.posicao" type="number" min="1" max="10" class="input-aurora w-full" /></div>
        <div class="form-grid-2">
          <div><label class="field-label">Taxa de conversão do site (%)</label><input v-model.number="seo.taxaConv" type="number" step="0.1" class="input-aurora w-full" /></div>
          <div><label class="field-label">Ticket médio (R$)</label><input v-model.number="seo.ticket" type="number" step="0.01" class="input-aurora w-full" /></div>
        </div>
        <button @click="calcSeo()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="seo.resultado" class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div v-for="item in seo.resultado.metricas" :key="item.label" class="glass-panel p-3 text-center">
            <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
            <p class="font-mono font-bold text-sm text-white">{{ item.valor }}</p>
          </div>
        </div>
        <div class="glass-panel p-3 text-xs text-blue-200">
          <p class="font-semibold text-white mb-2">CTR estimado por posição:</p>
          <div class="grid grid-cols-2 gap-1">
            <span v-for="p in seo.resultado.ctrTable" :key="p.pos" :class="['text-[10px]', p.atual?'text-orange-300 font-bold':'']">{{ p.pos }}º: {{ p.ctr }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ NPS ════════════════════════════════════════════════════ -->
    <div v-if="aba==='nps'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">Calculadora de NPS (Net Promoter Score)</h3>
        <p class="text-xs text-blue-300 mb-4">Mede a lealdade dos seus clientes com base na pergunta: "Quanto você recomendaria nossa empresa?"</p>
        <div><label class="field-label">Total de respondentes</label><input v-model.number="nps.total" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Promotores (nota 9–10)</label><input v-model.number="nps.promotores" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Neutros (nota 7–8)</label><input v-model.number="nps.neutros" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Detratores (nota 0–6)</label><input v-model.number="nps.detratores" type="number" class="input-aurora w-full" /></div>
        <button @click="calcNps()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="nps.resultado" class="space-y-3">
        <div class="glass-panel p-5 text-center">
          <p class="text-xs text-blue-300 mb-1">NPS Score</p>
          <p class="text-6xl font-black" :class="nps.resultado.score>=75?'text-green-400':nps.resultado.score>=50?'text-blue-400':nps.resultado.score>=0?'text-yellow-400':'text-red-400'">{{ nps.resultado.score }}</p>
          <p class="text-sm mt-2 font-bold" :class="nps.resultado.cor">{{ nps.resultado.zona }}</p>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="glass-panel p-3 text-center"><p class="text-[10px] text-green-300 mb-0.5">Promotores</p><p class="font-bold text-green-400">{{ nps.resultado.pctProm.toFixed(1) }}%</p></div>
          <div class="glass-panel p-3 text-center"><p class="text-[10px] text-yellow-300 mb-0.5">Neutros</p><p class="font-bold text-yellow-400">{{ nps.resultado.pctNeut.toFixed(1) }}%</p></div>
          <div class="glass-panel p-3 text-center"><p class="text-[10px] text-red-300 mb-0.5">Detratores</p><p class="font-bold text-red-400">{{ nps.resultado.pctDetr.toFixed(1) }}%</p></div>
        </div>
        <div class="glass-panel p-3 text-xs text-blue-200 space-y-1">
          <p>🔴 Zona Crítica: NPS &lt; 0</p><p>🟡 Zona de Aperfeiçoamento: 0–49</p><p>🟢 Zona de Qualidade: 50–74</p><p>⭐ Zona de Excelência: ≥ 75</p>
        </div>
      </div>
    </div>

    <!-- ══ CHURN ════════════════════════════════════════════════════ -->
    <div v-if="aba==='churn'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">Taxa de Churn & Retenção</h3>
        <div><label class="field-label">Clientes no início do período</label><input v-model.number="churn.inicio" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Clientes que cancelaram no período</label><input v-model.number="churn.cancelados" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Período (meses)</label><input v-model.number="churn.meses" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">MRR (Receita Mensal Recorrente em R$)</label><input v-model.number="churn.mrr" type="number" step="0.01" class="input-aurora w-full" /></div>
        <button @click="calcChurn()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="churn.resultado" class="grid grid-cols-2 gap-3">
        <div v-for="item in churn.resultado" :key="item.label" class="glass-panel p-3 text-center">
          <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
          <p class="font-mono font-bold text-sm" :class="item.cor||'text-white'">{{ item.valor }}</p>
        </div>
      </div>
    </div>

    <!-- ══ ROI MARKETING ════════════════════════════════════════════ -->
    <div v-if="aba==='roi'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">ROI de Campanha de Marketing</h3>
        <div><label class="field-label">Receita gerada (R$)</label><input v-model.number="roi.receita" type="number" step="0.01" class="input-aurora w-full" /></div>
        <div><label class="field-label">Custo total da campanha (R$)</label><input v-model.number="roi.custo" type="number" step="0.01" class="input-aurora w-full" /></div>
        <div><label class="field-label">Custo dos produtos/serviços vendidos (R$)</label><input v-model.number="roi.cogs" type="number" step="0.01" class="input-aurora w-full" /></div>
        <button @click="calcRoi()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Calcular</button>
      </div>
      <div v-if="roi.resultado" class="space-y-3">
        <div class="glass-panel p-5 text-center">
          <p class="text-xs text-blue-300 mb-1">ROI da Campanha</p>
          <p class="text-5xl font-black" :class="roi.resultado.roi>=100?'text-green-400':roi.resultado.roi>=0?'text-yellow-400':'text-red-400'">{{ roi.resultado.roi.toFixed(1) }}%</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="item in roi.resultado.detalhe" :key="item.label" class="glass-panel p-3 text-center">
            <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
            <p class="font-mono font-bold text-sm" :class="item.cor||'text-white'">{{ item.valor }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ INFLUENCIADOR ══════════════════════════════════════════ -->
    <div v-if="aba==='influencer'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-1">Calculadora de Influenciadores</h3>
        <div><label class="field-label">Seguidores</label><input v-model.number="inf.seguidores" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Média de likes por post</label><input v-model.number="inf.likes" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Média de comentários por post</label><input v-model.number="inf.comentarios" type="number" class="input-aurora w-full" /></div>
        <div><label class="field-label">Posts por mês</label><input v-model.number="inf.posts" type="number" class="input-aurora w-full" /></div>
        <div>
          <label class="field-label">Plataforma</label>
          <select v-model="inf.plataforma" class="input-aurora w-full">
            <option>Instagram</option><option>TikTok</option><option>YouTube</option><option>LinkedIn</option>
          </select>
        </div>
        <button @click="calcInfluencer()" class="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-colors">Analisar</button>
      </div>
      <div v-if="inf.resultado" class="space-y-3">
        <div class="glass-panel p-4 text-center">
          <p class="text-xs text-blue-300 mb-1">Perfil</p>
          <p class="text-2xl font-black text-white">{{ inf.resultado.tipo }}</p>
          <p class="text-sm text-blue-300 mt-1">{{ inf.resultado.descTipo }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="item in inf.resultado.metricas" :key="item.label" class="glass-panel p-3 text-center">
            <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
            <p class="font-mono font-bold text-sm" :class="item.cor||'text-white'">{{ item.valor }}</p>
          </div>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const slugTabMap: Record<string,string> = {
  'calculadora-engajamento':'engajamento','calculadora-roas':'roas','calculadora-ltv':'ltv',
  'calculadora-cac':'cac','simulador-funil-vendas':'conversao','calculadora-email-marketing':'email',
  'gerador-hashtags':'hashtags','calculadora-cpm-cpc':'cpm','calculadora-seo-organico':'seo',
  'calculadora-nps':'nps','calculadora-churn':'churn','calculadora-roi-marketing':'roi',
  'calculadora-influenciador':'influencer',
}

const tabs = [
  { id:'engajamento', label:'Engajamento',   icon:'mdi:heart-multiple-outline' },
  { id:'roas',        label:'ROAS',           icon:'mdi:trending-up' },
  { id:'ltv',         label:'LTV',            icon:'mdi:account-clock-outline' },
  { id:'cac',         label:'CAC',            icon:'mdi:account-plus-outline' },
  { id:'conversao',   label:'Funil/Conversão',icon:'mdi:filter-outline' },
  { id:'email',       label:'E-mail',         icon:'mdi:email-fast-outline' },
  { id:'hashtags',    label:'Hashtags',       icon:'mdi:pound' },
  { id:'cpm',         label:'CPM/CPC/CPA',    icon:'mdi:currency-usd' },
  { id:'seo',         label:'SEO',            icon:'mdi:magnify' },
  { id:'nps',         label:'NPS',            icon:'mdi:star-outline' },
  { id:'churn',       label:'Churn',          icon:'mdi:account-off-outline' },
  { id:'roi',         label:'ROI',            icon:'mdi:chart-line' },
  { id:'influencer',  label:'Influenciador',  icon:'mdi:instagram' },
] as const

type TabId = typeof tabs[number]['id']
const aba = ref<TabId>('engajamento')
const abaLabel = computed(()=>tabs.find(t=>t.id===aba.value)?.label||'')

onMounted(()=>{
  const slug = route.params.slug as string
  if (slugTabMap[slug]) aba.value = slugTabMap[slug] as TabId
})
watch(()=>route.params.slug, s=>{ if(s && slugTabMap[s as string]) aba.value = slugTabMap[s as string] as TabId })

const marketingTips = [
  { title:'ROAS vs ROI', text:'ROAS mede somente o retorno sobre gasto em anúncios. ROI considera todos os custos da operação.', type:'info' as const },
  { title:'LTV:CAC ideal', text:'A relação LTV/CAC deve ser ≥ 3:1 para um negócio saudável. Menos que isso indica custos de aquisição muito altos.', type:'info' as const },
]

const brl = (n:number) => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})

// ─── Engajamento ──────────────────────────────────────────────────────────────
const eng = ref({ seguidores:0, curtidas:0, comentarios:0, compartilhamentos:0, salvamentos:0, resultado:null as any })
function calcEngajamento(){
  const { seguidores, curtidas, comentarios, compartilhamentos, salvamentos } = eng.value
  if(!seguidores) return
  const totalInteracoes = curtidas + comentarios + compartilhamentos + salvamentos
  const taxa = (totalInteracoes / seguidores) * 100
  const nivel = taxa>=6?'🌟 Excelente':taxa>=3?'✅ Bom':taxa>=1?'⚠️ Médio':'🔴 Baixo'
  eng.value.resultado = { taxa, nivel, detalhe:[
    {label:'Interações Totais', valor: totalInteracoes.toLocaleString('pt-BR')},
    {label:'Curtidas', valor: curtidas.toLocaleString('pt-BR')},
    {label:'Comentários', valor: comentarios.toLocaleString('pt-BR')},
    {label:'Salvamentos', valor: salvamentos.toLocaleString('pt-BR')},
    {label:'Tx. Curtidas', valor: ((curtidas/seguidores)*100).toFixed(2)+'%'},
    {label:'Tx. Comentários', valor: ((comentarios/seguidores)*100).toFixed(2)+'%'},
  ]}
}

// ─── ROAS ─────────────────────────────────────────────────────────────────────
const roas = ref({ receita:0, gasto:0, custo:0, resultado:null as any })
function calcRoas(){
  const { receita, gasto, custo } = roas.value
  if(!gasto) return
  const r = receita / gasto
  const lucro = receita - gasto - custo
  const margem = custo ? ((receita-custo)/receita*100) : 0
  roas.value.resultado = { roas: r, detalhe:[
    {label:'ROAS', valor: r.toFixed(2)+'x', cor: r>=4?'text-green-400':r>=2?'text-yellow-400':'text-red-400'},
    {label:'Receita', valor: brl(receita)},
    {label:'Gasto em Ads', valor: brl(gasto)},
    {label:'Lucro Líquido', valor: brl(lucro), cor: lucro>0?'text-green-400':'text-red-400'},
    ...(custo?[{label:'Margem', valor: margem.toFixed(1)+'%'}]:[]),
  ]}
}

// ─── LTV ──────────────────────────────────────────────────────────────────────
const ltv = ref({ ticket:0, frequencia:0, retencao:0, margem:0, resultado:null as any })
function calcLtv(){
  const { ticket, frequencia, retencao, margem } = ltv.value
  const ltvBruto = ticket * frequencia * retencao
  const ltvLiquido = ltvBruto * (margem/100)
  ltv.value.resultado = { ltvFmt: brl(ltvLiquido||ltvBruto), detalhe:[
    {label:'LTV Bruto', valor: brl(ltvBruto)},
    {label:'LTV Líquido', valor: brl(ltvLiquido)},
    {label:'Receita Mensal/Cliente', valor: brl(ticket*frequencia)},
    {label:'Tempo de Vida', valor: retencao+' meses'},
  ]}
}

// ─── CAC ──────────────────────────────────────────────────────────────────────
const cac = ref({ marketing:0, vendas:0, outros:0, clientes:0, ltvRef:0, resultado:null as any })
function calcCac(){
  const { marketing, vendas, outros, clientes, ltvRef } = cac.value
  if(!clientes) return
  const totalInv = marketing + vendas + outros
  const c = totalInv / clientes
  const ratio = ltvRef ? (ltvRef/c) : 0
  cac.value.resultado = { cacFmt: brl(c), detalhe:[
    {label:'CAC', valor: brl(c), cor:'text-orange-400'},
    {label:'Investimento Total', valor: brl(totalInv)},
    ...(ltvRef?[{label:'LTV/CAC Ratio', valor: ratio.toFixed(1)+'x', cor: ratio>=3?'text-green-400':'text-red-400'}]:[]),
  ]}
}

// ─── Conversão / Funil ────────────────────────────────────────────────────────
const funil = ref([{nome:'Visitantes',qtd:1000},{nome:'Leads',qtd:150},{nome:'Oportunidades',qtd:50},{nome:'Clientes',qtd:15}])
const conv = ref({ ticket:0, periodo:30, resultado:null as any })
function calcConversao(){
  const f = funil.value.filter(e=>e.nome&&e.qtd>0)
  if(f.length<2) return
  const topo = f[0].qtd, fundo = f[f.length-1].qtd
  const taxaGlobal = (fundo/topo)*100
  const funilComPct = f.map(e=>({...e, pct:(e.qtd/topo)*100}))
  const receita = fundo * conv.value.ticket
  const metricas = [
    {label:'Tx. Conversão Global', valor: taxaGlobal.toFixed(2)+'%', cor:'text-orange-400'},
    {label:'Clientes no Período', valor: fundo.toLocaleString('pt-BR')},
    {label:'Clientes/dia', valor: (fundo/conv.value.periodo).toFixed(1)},
    ...(conv.value.ticket?[{label:'Receita Estimada', valor: brl(receita), cor:'text-green-400'}]:[]),
  ]
  for(let i=1;i<f.length;i++) metricas.push({label:`${f[i-1].nome}→${f[i].nome}`, valor: (f[i].qtd/f[i-1].qtd*100).toFixed(1)+'%', cor:''})
  conv.value.resultado = { metricas, funil: funilComPct }
}

// ─── E-mail ───────────────────────────────────────────────────────────────────
const email = ref({ enviados:0, entregues:0, abertos:0, cliques:0, conversoes:0, ticket:0, custo:0, resultado:null as any })
function calcEmail(){
  const e = email.value; if(!e.enviados) return
  const entrega  = e.entregues ? (e.entregues/e.enviados*100) : 0
  const abertura = e.entregues ? (e.abertos/e.entregues*100)  : 0
  const ctr      = e.abertos   ? (e.cliques/e.abertos*100)    : 0
  const conv     = e.cliques   ? (e.conversoes/e.cliques*100) : 0
  const receita  = e.conversoes * e.ticket
  const roi      = e.custo     ? ((receita-e.custo)/e.custo*100) : 0
  email.value.resultado = [
    {label:'Taxa de Entrega',   valor: entrega.toFixed(1)+'%',  benchmark:'≥95%',   cor:entrega>=95?'text-green-400':'text-red-400'},
    {label:'Taxa de Abertura',  valor: abertura.toFixed(1)+'%', benchmark:'15–25%', cor:abertura>=15?'text-green-400':'text-yellow-400'},
    {label:'CTR (cliques/abertos)', valor: ctr.toFixed(1)+'%', benchmark:'2–5%',   cor:ctr>=2?'text-green-400':'text-yellow-400'},
    {label:'Taxa de Conversão', valor: conv.toFixed(1)+'%',    benchmark:'1–5%',   cor:conv>=1?'text-green-400':'text-red-400'},
    ...(receita?[{label:'Receita', valor: brl(receita), cor:'text-green-400', benchmark:''}]:[]),
    ...(e.custo?[{label:'ROI', valor: roi.toFixed(0)+'%', cor:roi>=100?'text-green-400':'text-red-400', benchmark:'>100%'}]:[]),
  ]
}

// ─── Hashtags ──────────────────────────────────────────────────────────────────
const nichosHash = [
  {id:'marketing',  label:'Marketing Digital'},    {id:'moda',       label:'Moda & Estilo'},
  {id:'fitness',    label:'Fitness & Saúde'},       {id:'gastronomia',label:'Gastronomia'},
  {id:'viagem',     label:'Viagem & Turismo'},      {id:'tech',       label:'Tecnologia'},
  {id:'business',   label:'Negócios & Empreend.'},  {id:'fotografia', label:'Fotografia'},
  {id:'musica',     label:'Música'},                {id:'beleza',     label:'Beleza & Estética'},
  {id:'decoracao',  label:'Decoração & Design'},    {id:'educacao',   label:'Educação'},
]
const hashBase: Record<string,string[]> = {
  marketing: ['marketingdigital','trafegopago','socialmedia','googleads','metaads','inbound','marketingdeconteudo','seo','emailmarketing','copywriting','branding','mkt','marketingonline','agenciadigital','estrategiasdigitais','trafego','ROI','leads','conversao','anunciosonline'],
  moda: ['moda','fashion','style','outfit','lookdodia','tendencias','fashionblog','modafeminina','modamasculina','streetstyle','fashionista','modabrasileira','tendencia','vestido','saia','calca','bolsa','sapato','acessorios','modaestilo'],
  fitness: ['fitness','treino','academia','musculacao','saudavel','emagrecer','vidasaudavel','exercicio','nutricao','dieta','crossfit','yoga','corrida','forca','saude','bemEstar','alimentacaosaudavel','personal','hipertrofia','cardio'],
  gastronomia: ['gastronomia','receita','comida','culinaria','food','foodporn','cozinha','chefcook','delicia','restaurante','gastronomiaBR','bolo','sobremesa','saboroso','almoço','jantar','brunch','foodlover','cooking','chef'],
  viagem: ['viagem','travel','turismo','aventura','mochileiro','destinos','ferias','brasil','passagem','hotel','praia','montanha','fotografia','viajando','vlog','nomadedigital','backpacker','explorar','mundo','roadtrip'],
  tech: ['tecnologia','programacao','developer','codigo','software','startup','inovacao','inteligenciaartificial','IA','python','javascript','webdev','frontend','backend','cloud','cybersecurity','devops','machinelearning','bigdata','blockchain'],
  business: ['empreendedorismo','negocios','startup','empresario','sucesso','motivacao','lideranca','gestao','business','investimento','financas','economiabr','MEI','microempresa','vendas','comercio','desenvolvimento','resultado','networking','carreira'],
  fotografia: ['fotografia','photo','photography','photographer','fotógrafo','retrato','paisagem','ensaio','instaphoto','fotoedit','lightroom','picoftheday','photooftheday','fotogr','foto','snap','portrait','natureza','street','blackandwhite'],
  musica: ['musica','music','musicabrasileira','sertanejo','MPB','pagode','gospel','funk','rock','pop','artista','cantor','banda','ao_vivo','show','playlist','streaming','spotif','novamusica','hit'],
  beleza: ['beleza','make','maquiagem','skincare','cuidadoscomapele','cabelo','unhas','estetica','salaoDebeleza','manicure','pedicure','dermato','beautifull','instamake','eyemakeup','nails','hair','tutorial','maquiadora','salon'],
  decoracao: ['decoracao','design','interiores','arquitetura','homedecor','casa','apartamento','sala','quarto','cozinha','banheiro','decoracaointerior','mobilia','lighting','interior','furnitures','decoracaobr','casapropia','tendencia','projeto'],
  educacao: ['educacao','ensino','aprendizado','escola','universidade','vestibular','concurso','enem','estudo','professor','aula','didatica','pedagogia','educacaobr','aprender','cursinho','faculdade','pos','mestrado','conhecimento'],
}

const hash = ref({ nicho:'marketing', palavras:'', volume:'medio', plataforma:'instagram', resultado:[] as string[] })
function gerarHashtags(){
  const base = hashBase[hash.value.nicho] || hashBase.marketing
  const extra = hash.value.palavras.split(',').map(p=>p.trim().toLowerCase().replace(/\s+/g,'')).filter(Boolean)
  const qtd = hash.value.volume==='pequeno'?10:hash.value.volume==='medio'?20:30
  // Shuffle base
  const pool = [...base, ...extra].sort(()=>Math.random()-0.5)
  hash.value.resultado = pool.slice(0, Math.min(qtd, pool.length)).map(h=>'#'+h)
}
function copiarHashtags(){ navigator.clipboard.writeText(hash.value.resultado.join(' ')); Swal.fire({icon:'success',title:'Copiado!',timer:800,showConfirmButton:false}) }
function copiarUm(h:string){ navigator.clipboard.writeText(h); Swal.fire({icon:'success',title:`${h} copiado!`,timer:600,showConfirmButton:false}) }

// ─── CPM/CPC/CPA ──────────────────────────────────────────────────────────────
const cpm = ref({ investimento:0, impressoes:0, cliques:0, conversoes:0, receita:0, resultado:null as any })
function calcCpm(){
  const c = cpm.value; if(!c.investimento) return
  const CPM  = c.impressoes  ? (c.investimento/c.impressoes*1000) : 0
  const CPC  = c.cliques     ? (c.investimento/c.cliques) : 0
  const CPA  = c.conversoes  ? (c.investimento/c.conversoes) : 0
  const CTR  = c.impressoes && c.cliques ? (c.cliques/c.impressoes*100) : 0
  const CVR  = c.cliques && c.conversoes ? (c.conversoes/c.cliques*100) : 0
  const ROAS = c.receita ? (c.receita/c.investimento) : 0
  cpm.value.resultado = [
    {label:'CPM (R$/mil impressões)', valor: brl(CPM), desc:'Custo por Mil Impressões'},
    {label:'CPC (R$/clique)', valor: brl(CPC), desc:'Custo por Clique'},
    {label:'CPA (R$/conversão)', valor: brl(CPA), desc:'Custo por Aquisição'},
    {label:'CTR (clique/impressão)', valor: CTR.toFixed(2)+'%', desc:'Taxa de Clique'},
    {label:'CVR (conv./clique)', valor: CVR.toFixed(2)+'%', desc:'Taxa de Conversão'},
    ...(ROAS?[{label:'ROAS', valor: ROAS.toFixed(2)+'x', desc:'Retorno sobre Gasto'}]:[]),
  ]
}

// ─── SEO ──────────────────────────────────────────────────────────────────────
const ctrByPos = [28.5, 15.7, 11.0, 8.0, 7.2, 5.1, 4.0, 3.2, 2.8, 2.5]
const seo = ref({ volume:0, posicao:1, taxaConv:2, ticket:0, resultado:null as any })
function calcSeo(){
  const { volume, posicao, taxaConv, ticket } = seo.value
  if(!volume||!posicao) return
  const ctr = ctrByPos[posicao-1] || 2
  const cliques = Math.round(volume * ctr/100)
  const conversoes = Math.round(cliques * taxaConv/100)
  const receita = conversoes * ticket
  seo.value.resultado = {
    metricas:[
      {label:'CTR estimado', valor: ctr+'%'},
      {label:'Cliques/mês', valor: cliques.toLocaleString('pt-BR')},
      {label:'Cliques/dia', valor: (cliques/30).toFixed(0)},
      ...(taxaConv?[{label:'Conversões/mês', valor: conversoes.toLocaleString('pt-BR')}]:[]),
      ...(ticket?[{label:'Receita/mês', valor: brl(receita), cor:'text-green-400'}]:[]),
    ],
    ctrTable: ctrByPos.map((c,i)=>({pos:i+1,ctr:c,atual:(i+1)===posicao}))
  }
}

// ─── NPS ──────────────────────────────────────────────────────────────────────
const nps = ref({ total:0, promotores:0, neutros:0, detratores:0, resultado:null as any })
function calcNps(){
  const { total, promotores, neutros, detratores } = nps.value
  if(!total) return
  const pctProm = promotores/total*100, pctNeut = neutros/total*100, pctDetr = detratores/total*100
  const score = Math.round(pctProm - pctDetr)
  const zona = score>=75?'Zona de Excelência ⭐':score>=50?'Zona de Qualidade ✅':score>=0?'Zona de Aperfeiçoamento ⚠️':'Zona Crítica 🔴'
  const cor = score>=75?'text-green-400':score>=50?'text-blue-400':score>=0?'text-yellow-400':'text-red-400'
  nps.value.resultado = { score, zona, cor, pctProm, pctNeut, pctDetr }
}

// ─── Churn ────────────────────────────────────────────────────────────────────
const churn = ref({ inicio:0, cancelados:0, meses:1, mrr:0, resultado:null as any })
function calcChurn(){
  const { inicio, cancelados, meses, mrr } = churn.value
  if(!inicio) return
  const taxaMensal = cancelados/inicio/meses*100
  const taxaAnual = (1-(1-taxaMensal/100)**12)*100
  const vidaUtil = taxaMensal>0 ? (1/(taxaMensal/100)) : Infinity
  const retencao = 100-taxaMensal
  const mrrPerdido = mrr ? (mrr * taxaMensal/100) : 0
  churn.value.resultado = [
    {label:'Churn Mensal', valor: taxaMensal.toFixed(2)+'%', cor: taxaMensal>5?'text-red-400':taxaMensal>2?'text-yellow-400':'text-green-400'},
    {label:'Churn Anual', valor: taxaAnual.toFixed(1)+'%', cor: taxaAnual>50?'text-red-400':'text-yellow-400'},
    {label:'Taxa de Retenção', valor: retencao.toFixed(1)+'%', cor:retencao>=95?'text-green-400':'text-yellow-400'},
    {label:'Vida Útil do Cliente', valor: isFinite(vidaUtil)?vidaUtil.toFixed(1)+' meses':'∞'},
    ...(mrr?[{label:'MRR Perdido/mês', valor: brl(mrrPerdido), cor:'text-red-400'}]:[]),
  ]
}

// ─── ROI Marketing ────────────────────────────────────────────────────────────
const roi = ref({ receita:0, custo:0, cogs:0, resultado:null as any })
function calcRoi(){
  const { receita, custo, cogs } = roi.value
  if(!custo) return
  const lucro = receita - custo - cogs
  const r = ((receita - custo - cogs)/custo)*100
  roi.value.resultado = { roi: r, detalhe:[
    {label:'Receita', valor: brl(receita)},
    {label:'Custo da Campanha', valor: brl(custo)},
    {label:'Lucro Líquido', valor: brl(lucro), cor: lucro>0?'text-green-400':'text-red-400'},
    {label:'ROI', valor: r.toFixed(1)+'%', cor: r>=100?'text-green-400':r>=0?'text-yellow-400':'text-red-400'},
    {label:'Payback', valor: (custo/((receita-cogs)/12)).toFixed(1)+' meses'},
  ]}
}

// ─── Influenciador ────────────────────────────────────────────────────────────
const inf = ref({ seguidores:0, likes:0, comentarios:0, posts:0, plataforma:'Instagram', resultado:null as any })
function calcInfluencer(){
  const { seguidores, likes, comentarios, posts, plataforma } = inf.value
  if(!seguidores) return
  const eng = ((likes+comentarios)/seguidores*100)
  const tipo = seguidores>=1000000?'Mega Influenciador':seguidores>=100000?'Macro Influenciador':seguidores>=10000?'Micro Influenciador':seguidores>=1000?'Nano Influenciador':'Perfil Comum'
  const descTipo = seguidores>=1000000?'1M+ seguidores':seguidores>=100000?'100K–1M':seguidores>=10000?'10K–100K':seguidores>=1000?'1K–10K':'<1K'
  const valorPost = seguidores * 0.001 * (eng>5?2:eng>2?1:0.5)
  const alcanceMensal = Math.round(seguidores * (eng/100) * posts)
  inf.value.resultado = { tipo, descTipo, metricas:[
    {label:'Engajamento', valor: eng.toFixed(2)+'%', cor: eng>=5?'text-green-400':eng>=2?'text-yellow-400':'text-red-400'},
    {label:'Posts/mês', valor: posts.toString()},
    {label:'Alcance est./mês', valor: alcanceMensal.toLocaleString('pt-BR')},
    {label:'Valor est./post', valor: brl(valorPost), cor:'text-blue-300'},
    {label:'Plataforma', valor: plataforma},
    {label:'Tipo', valor: tipo},
  ]}
}
</script>
