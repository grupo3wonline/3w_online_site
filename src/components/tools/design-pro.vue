<template>
  <ToolShell
    title="Design Pro — Ferramentas Visuais"
    :description="`${abaLabel}: gere código CSS, paletas, tipografia e muito mais.`"
    icon="fa-palette"
    icon-gradient="from-pink-500 to-fuchsia-700"
    orb-color="pink"
    :quick-tips="['11 ferramentas','Preview em tempo real','Copiar CSS com 1 clique']"
    :tips="designTips"
  >
    <!-- Tabs -->
    <div class="tab-row flex-wrap">
      <button v-for="t in tabs" :key="t.id" @click="aba=t.id"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba===t.id?'bg-pink-600 text-white border-pink-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
      </button>
    </div>

    <!-- ══ BOX SHADOW ════════════════════════════════════════════ -->
    <div v-if="aba==='boxshadow'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-3">Gerador de Box Shadow CSS</h3>
        <div v-for="(sh, i) in shadows" :key="i" class="glass-panel p-3 space-y-2">
          <div class="flex justify-between items-center"><span class="text-xs text-blue-300 font-semibold">Sombra {{ i+1 }}</span><button v-if="shadows.length>1" @click="shadows.splice(i,1)" class="text-red-400 text-xs"><Icon icon="mdi:close" class="w-3.5 h-3.5" /></button></div>
          <div class="form-grid-2">
            <div><label class="field-label">Horizontal (px)</label><input v-model.number="sh.x" type="range" min="-50" max="50" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ sh.x }}px</span></div>
            <div><label class="field-label">Vertical (px)</label><input v-model.number="sh.y" type="range" min="-50" max="50" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ sh.y }}px</span></div>
          </div>
          <div class="form-grid-2">
            <div><label class="field-label">Blur (px)</label><input v-model.number="sh.blur" type="range" min="0" max="100" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ sh.blur }}px</span></div>
            <div><label class="field-label">Spread (px)</label><input v-model.number="sh.spread" type="range" min="-30" max="30" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ sh.spread }}px</span></div>
          </div>
          <div class="form-grid-2">
            <div><label class="field-label">Cor</label><input v-model="sh.color" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent cursor-pointer" /></div>
            <div><label class="field-label">Opacidade</label><input v-model.number="sh.opacity" type="range" min="0" max="100" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ sh.opacity }}%</span></div>
          </div>
          <label class="flex items-center gap-2 text-xs text-blue-200 cursor-pointer"><input type="checkbox" v-model="sh.inset" class="accent-pink-500" /><span>Inset (sombra interna)</span></label>
        </div>
        <button @click="shadows.push({x:5,y:5,blur:10,spread:0,color:'#000000',opacity:25,inset:false})" class="text-xs text-blue-400 flex items-center gap-1"><Icon icon="mdi:plus-circle" class="w-4 h-4" /> Adicionar sombra</button>
        <div class="mt-2">
          <label class="field-label">Cor do elemento</label>
          <input v-model="boxBg" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent cursor-pointer" />
        </div>
      </div>
      <div class="space-y-4">
        <div class="glass-panel p-6 flex items-center justify-center min-h-48">
          <div class="w-32 h-32 rounded-xl transition-all" :style="`background-color:${boxBg}; box-shadow:${boxShadowCss}`"></div>
        </div>
        <div class="glass-panel p-4">
          <label class="text-xs text-blue-300 font-semibold block mb-2">CSS Gerado:</label>
          <code class="text-xs font-mono text-green-300 break-all leading-relaxed">box-shadow: {{ boxShadowCss }};</code>
          <button @click="copiar('box-shadow: '+boxShadowCss+';')" class="mt-2 text-xs text-blue-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar CSS</button>
        </div>
      </div>
    </div>

    <!-- ══ BORDER RADIUS ══════════════════════════════════════════ -->
    <div v-if="aba==='borderradius'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-3">Gerador de Border Radius CSS</h3>
        <label class="flex items-center gap-2 text-xs text-blue-200 cursor-pointer mb-3"><input type="checkbox" v-model="brAll" class="accent-pink-500" /><span>Todos os cantos iguais</span></label>
        <div v-if="brAll">
          <label class="field-label">Raio (todos)</label>
          <input v-model.number="br.tl" type="range" min="0" max="100" class="range-aurora w-full" />
          <span class="text-xs text-blue-200">{{ br.tl }}px</span>
        </div>
        <div v-else class="grid grid-cols-2 gap-3">
          <div><label class="field-label">Superior Esq.</label><input v-model.number="br.tl" type="range" min="0" max="100" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ br.tl }}px</span></div>
          <div><label class="field-label">Superior Dir.</label><input v-model.number="br.tr" type="range" min="0" max="100" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ br.tr }}px</span></div>
          <div><label class="field-label">Inferior Esq.</label><input v-model.number="br.bl" type="range" min="0" max="100" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ br.bl }}px</span></div>
          <div><label class="field-label">Inferior Dir.</label><input v-model.number="br.br" type="range" min="0" max="100" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ br.br }}px</span></div>
        </div>
        <div><label class="field-label">Largura do elemento</label><input v-model.number="brW" type="range" min="50" max="300" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ brW }}px</span></div>
        <div><label class="field-label">Cor do elemento</label><input v-model="brColor" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent" /></div>
        <div class="flex flex-wrap gap-2 mt-2">
          <button v-for="p in brPresets" :key="p.label" @click="aplicarBrPreset(p)" class="text-xs px-2 py-1 bg-white/5 hover:bg-pink-600/40 border border-white/10 text-blue-300 rounded transition-colors">{{ p.label }}</button>
        </div>
      </div>
      <div class="space-y-4">
        <div class="glass-panel p-6 flex items-center justify-center min-h-48">
          <div class="transition-all" :style="`width:${brW}px; height:${brW}px; background-color:${brColor}; border-radius:${borderRadiusCss}`"></div>
        </div>
        <div class="glass-panel p-4">
          <code class="text-xs font-mono text-green-300">border-radius: {{ borderRadiusCss }};</code>
          <button @click="copiar('border-radius: '+borderRadiusCss+';')" class="mt-2 text-xs text-blue-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar CSS</button>
        </div>
      </div>
    </div>

    <!-- ══ CONTRASTE WCAG ════════════════════════════════════════ -->
    <div v-if="aba==='contraste'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-3">Verificador de Contraste WCAG</h3>
        <div><label class="field-label">Cor do texto</label><div class="flex gap-2"><input v-model="wcag.fg" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent cursor-pointer" /><input v-model="wcag.fg" class="input-aurora flex-1 font-mono" /></div></div>
        <div><label class="field-label">Cor do fundo</label><div class="flex gap-2"><input v-model="wcag.bg" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent cursor-pointer" /><input v-model="wcag.bg" class="input-aurora flex-1 font-mono" /></div></div>
        <div>
          <label class="field-label">Texto de preview</label>
          <input v-model="wcag.texto" class="input-aurora w-full" />
        </div>
        <div class="flex gap-2">
          <button v-for="size in ['normal','large','icon']" :key="size" @click="wcag.size=size" :class="['px-3 py-1 rounded text-xs', wcag.size===size?'bg-pink-600 text-white':'bg-white/5 text-blue-300']">{{ size==='normal'?'Texto Normal':size==='large'?'Texto Grande':'Ícone' }}</button>
        </div>
      </div>
      <div class="space-y-4">
        <!-- Preview -->
        <div class="rounded-xl overflow-hidden border border-white/10">
          <div :style="`background:${wcag.bg}; padding:1.5rem; text-align:center`">
            <span :style="`color:${wcag.fg}; font-size:${wcag.size==='large'?'1.25rem':'1rem'}; font-weight:${wcag.size==='large'?'bold':'normal'}`">{{ wcag.texto }}</span>
          </div>
        </div>
        <!-- Resultado -->
        <div class="glass-panel p-4 space-y-3" v-if="wcagResult">
          <div class="text-center">
            <p class="text-xs text-blue-300 mb-1">Razão de Contraste</p>
            <p class="text-4xl font-black" :class="wcagResult.ratio>=7?'text-green-400':wcagResult.ratio>=4.5?'text-yellow-400':'text-red-400'">{{ wcagResult.ratio.toFixed(2) }}:1</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="level in wcagResult.levels" :key="level.name" class="flex items-center justify-between p-2 rounded-lg" :class="level.pass?'bg-green-500/10 border border-green-500/30':'bg-red-500/10 border border-red-500/30'">
              <span class="text-xs font-semibold text-white">{{ level.name }}</span>
              <span class="text-xs font-bold" :class="level.pass?'text-green-400':'text-red-400'">{{ level.pass?'✓ PASS':'✗ FAIL' }}</span>
            </div>
          </div>
          <p class="text-xs text-blue-300 text-center">{{ wcagResult.descricao }}</p>
        </div>
      </div>
    </div>

    <!-- ══ TIPOGRAFIA ════════════════════════════════════════════ -->
    <div v-if="aba==='tipografia'" class="space-y-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-3">Escala Tipográfica Modular</h3>
        <div class="grid lg:grid-cols-4 gap-3">
          <div><label class="field-label">Tamanho base (px)</label><input v-model.number="tipo.base" type="number" min="8" max="24" class="input-aurora w-full" /></div>
          <div><label class="field-label">Razão de escala</label><select v-model.number="tipo.ratio" class="input-aurora w-full"><option v-for="r in ratios" :key="r.value" :value="r.value">{{ r.label }}</option></select></div>
          <div><label class="field-label">Unidade</label><select v-model="tipo.unidade" class="input-aurora w-full"><option>px</option><option>rem</option><option>em</option></select></div>
          <div><label class="field-label">Fonte</label><select v-model="tipo.fonte" class="input-aurora w-full"><option v-for="f in fontes" :key="f.value" :value="f.value">{{ f.label }}</option></select></div>
        </div>
      </div>
      <div class="space-y-2">
        <div v-for="step in tipoScale" :key="step.name" class="glass-panel p-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <span class="text-xs font-mono text-blue-300 w-12">{{ step.name }}</span>
            <span :style="`font-size:${step.px}px; font-family:${tipo.fonte}; color:white`">{{ step.preview }}</span>
          </div>
          <div class="flex gap-4 text-xs text-blue-300 font-mono">
            <span>{{ step.px.toFixed(1) }}px</span>
            <span>{{ step.rem.toFixed(3) }}rem</span>
            <button @click="copiar(tipoVarCss(step))" class="text-blue-400 hover:text-white px-1"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>
      <div class="glass-panel p-4">
        <div class="flex justify-between items-center mb-2"><p class="text-xs font-semibold text-white">CSS Custom Properties:</p><button @click="copiar(tipoAllCss)" class="text-xs text-blue-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar tudo</button></div>
        <pre class="text-xs font-mono text-green-300 overflow-auto max-h-40">{{ tipoAllCss }}</pre>
      </div>
    </div>

    <!-- ══ PROPORÇÃO ════════════════════════════════════════════ -->
    <div v-if="aba==='proporcao'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-3">Calculadora de Proporção (Aspect Ratio)</h3>
        <div>
          <label class="field-label">Proporção predefinida</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="p in propPresets" :key="p.label" @click="aplicarProp(p)" :class="['text-xs px-2.5 py-1 rounded-lg border transition-colors', prop.aw===p.w&&prop.ah===p.h?'bg-pink-600 text-white border-pink-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">{{ p.label }}</button>
          </div>
        </div>
        <div class="form-grid-2">
          <div><label class="field-label">Proporção W</label><input v-model.number="prop.aw" type="number" class="input-aurora w-full" /></div>
          <div><label class="field-label">Proporção H</label><input v-model.number="prop.ah" type="number" class="input-aurora w-full" /></div>
        </div>
        <div>
          <label class="field-label">Informe a largura (px)</label>
          <input v-model.number="prop.largura" type="number" class="input-aurora w-full" @input="prop.altura=Math.round(prop.largura*prop.ah/prop.aw)" />
        </div>
        <div>
          <label class="field-label">Informe a altura (px)</label>
          <input v-model.number="prop.altura" type="number" class="input-aurora w-full" @input="prop.largura=Math.round(prop.altura*prop.aw/prop.ah)" />
        </div>
      </div>
      <div class="space-y-3">
        <div class="glass-panel p-6 flex items-center justify-center min-h-48">
          <div class="border-2 border-pink-500 bg-pink-500/10 flex items-center justify-center text-xs text-pink-200 font-mono" :style="`width:${Math.min(prop.largura,250)}px; height:${Math.min(prop.largura*prop.ah/prop.aw,200)}px`">
            {{ prop.largura }}×{{ prop.altura }}
          </div>
        </div>
        <div class="glass-panel p-4 space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-blue-300">Dimensões</span><span class="font-mono text-white">{{ prop.largura }} × {{ prop.altura }}px</span></div>
          <div class="flex justify-between"><span class="text-blue-300">Proporção</span><span class="font-mono text-white">{{ prop.aw }}:{{ prop.ah }}</span></div>
          <div class="flex justify-between"><span class="text-blue-300">aspect-ratio CSS</span><code class="font-mono text-green-300">{{ prop.aw }}/{{ prop.ah }}</code></div>
          <button @click="copiar(`aspect-ratio: ${prop.aw}/${prop.ah};`)" class="text-xs text-blue-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar CSS</button>
        </div>
      </div>
    </div>

    <!-- ══ PALETA HARMÔNICA ════════════════════════════════════════ -->
    <div v-if="aba==='paleta'" class="space-y-5">
      <div class="glass-panel p-5">
        <h3 class="text-sm font-semibold text-white mb-4">Paleta de Cores Harmônica</h3>
        <div class="flex flex-wrap gap-4 items-end">
          <div><label class="field-label">Cor base</label><div class="flex gap-2"><input v-model="paleta.base" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent cursor-pointer" /><input v-model="paleta.base" class="input-aurora w-28 font-mono" /></div></div>
          <div><label class="field-label">Harmonia</label><select v-model="paleta.tipo" class="input-aurora"><option v-for="h in harmonias" :key="h.value" :value="h.value">{{ h.label }}</option></select></div>
          <div><label class="field-label">Tons por cor</label><input v-model.number="paleta.tons" type="number" min="1" max="9" class="input-aurora w-20" /></div>
        </div>
      </div>
      <div v-for="(grupo, gi) in paletaResult" :key="gi" class="glass-panel p-4">
        <p class="text-xs font-semibold text-blue-300 mb-3">{{ grupo.nome }}</p>
        <div class="flex gap-2 flex-wrap">
          <div v-for="cor in grupo.tons" :key="cor.hex"
            class="cursor-pointer group flex flex-col items-center gap-1" @click="copiar(cor.hex)">
            <div class="w-12 h-12 rounded-xl shadow-lg border border-white/10" :style="`background:${cor.hex}`"></div>
            <span class="text-[10px] font-mono text-blue-300 group-hover:text-white">{{ cor.hex }}</span>
            <span class="text-[9px] text-blue-400">{{ cor.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ ESPAÇAMENTO ════════════════════════════════════════════ -->
    <div v-if="aba==='espacamento'" class="space-y-4">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-3">Sistema de Espaçamento</h3>
        <div class="grid lg:grid-cols-3 gap-3">
          <div><label class="field-label">Unidade base (px)</label><input v-model.number="esp.base" type="number" min="2" max="16" class="input-aurora w-full" /></div>
          <div><label class="field-label">Prefixo CSS</label><input v-model="esp.prefixo" class="input-aurora w-full" placeholder="--space" /></div>
          <div><label class="field-label">Sistema</label><select v-model="esp.sistema" class="input-aurora w-full"><option value="4">Base 4 (4, 8, 12...)</option><option value="8">Base 8 (8, 16, 24...)</option><option value="fibonacci">Fibonacci</option><option value="tailwind">Tailwind-like</option></select></div>
        </div>
      </div>
      <div class="glass-panel p-4 space-y-2">
        <div v-for="step in espScale" :key="step.name" class="flex items-center gap-3">
          <span class="text-xs font-mono text-blue-300 w-20">{{ step.name }}</span>
          <div class="bg-pink-500/70 rounded" :style="`width:${Math.min(step.px*2, 200)}px; height:16px`"></div>
          <span class="text-xs font-mono text-white">{{ step.px }}px / {{ (step.px/16).toFixed(3) }}rem</span>
        </div>
      </div>
      <div class="glass-panel p-4">
        <div class="flex justify-between items-center mb-2"><p class="text-xs font-semibold text-white">CSS Custom Properties:</p><button @click="copiar(espCss)" class="text-xs text-blue-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar tudo</button></div>
        <pre class="text-xs font-mono text-green-300 overflow-auto max-h-40">{{ espCss }}</pre>
      </div>
    </div>

    <!-- ══ TEXT SHADOW ════════════════════════════════════════════ -->
    <div v-if="aba==='textshadow'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-3">Gerador de Text Shadow CSS</h3>
        <div v-for="(sh, i) in textShadows" :key="i" class="glass-panel p-3 space-y-2">
          <div class="flex justify-between"><span class="text-xs text-blue-300">Sombra {{ i+1 }}</span><button v-if="textShadows.length>1" @click="textShadows.splice(i,1)" class="text-red-400"><Icon icon="mdi:close" class="w-3.5 h-3.5" /></button></div>
          <div class="form-grid-2">
            <div><label class="field-label">H (px)</label><input v-model.number="sh.x" type="range" min="-20" max="20" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ sh.x }}px</span></div>
            <div><label class="field-label">V (px)</label><input v-model.number="sh.y" type="range" min="-20" max="20" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ sh.y }}px</span></div>
          </div>
          <div class="form-grid-2">
            <div><label class="field-label">Blur (px)</label><input v-model.number="sh.blur" type="range" min="0" max="40" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ sh.blur }}px</span></div>
            <div><label class="field-label">Cor</label><input v-model="sh.color" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent cursor-pointer" /></div>
          </div>
        </div>
        <button @click="textShadows.push({x:2,y:2,blur:4,color:'#000000'})" class="text-xs text-blue-400 flex items-center gap-1"><Icon icon="mdi:plus-circle" class="w-4 h-4" /> Add sombra</button>
        <div class="form-grid-2">
          <div><label class="field-label">Texto preview</label><input v-model="tsh.texto" class="input-aurora w-full" /></div>
          <div><label class="field-label">Cor do texto</label><input v-model="tsh.cor" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent cursor-pointer" /></div>
        </div>
        <div><label class="field-label">Tamanho (px)</label><input v-model.number="tsh.size" type="range" min="12" max="80" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ tsh.size }}px</span></div>
      </div>
      <div class="space-y-4">
        <div class="glass-panel p-6 flex items-center justify-center min-h-32 bg-[#1a1a2e]">
          <span :style="`font-size:${tsh.size}px; color:${tsh.cor}; text-shadow:${textShadowCss}; font-weight:bold`">{{ tsh.texto }}</span>
        </div>
        <div class="glass-panel p-4">
          <code class="text-xs font-mono text-green-300 break-all">text-shadow: {{ textShadowCss }};</code>
          <button @click="copiar('text-shadow: '+textShadowCss+';')" class="mt-2 text-xs text-blue-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar CSS</button>
        </div>
      </div>
    </div>

    <!-- ══ CONVERSOR COR AVANÇADO ══════════════════════════════════ -->
    <div v-if="aba==='corcompleta'" class="space-y-4">
      <div class="glass-panel p-5">
        <h3 class="text-sm font-semibold text-white mb-4">Conversor de Cores Avançado</h3>
        <div class="flex gap-3 items-end flex-wrap">
          <div><label class="field-label">Cor (qualquer formato)</label><div class="flex gap-2"><input v-model="corAdv.input" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent cursor-pointer" @input="corAdv.texto=corAdv.input" /><input v-model="corAdv.texto" class="input-aurora w-36 font-mono" placeholder="#ff0000" @input="parseCorAdv" /></div></div>
        </div>
      </div>
      <div v-if="corAdv.resultado" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div v-for="formato in corAdv.resultado" :key="formato.label"
          class="glass-panel p-3 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors" @click="copiar(formato.valor)">
          <div>
            <p class="text-xs text-blue-300 mb-0.5">{{ formato.label }}</p>
            <code class="text-sm font-mono text-white">{{ formato.valor }}</code>
          </div>
          <Icon icon="mdi:content-copy" class="w-4 h-4 text-blue-400 hover:text-white shrink-0" />
        </div>
      </div>
      <div v-if="corAdv.resultado" class="grid grid-cols-5 gap-2 glass-panel p-4">
        <div v-for="shade in corAdv.shades" :key="shade.name" class="text-center cursor-pointer" @click="copiar(shade.hex)">
          <div class="h-10 rounded-lg mb-1 border border-white/10" :style="`background:${shade.hex}`"></div>
          <p class="text-[10px] text-blue-300">{{ shade.name }}</p>
          <p class="text-[9px] font-mono text-blue-400">{{ shade.hex }}</p>
        </div>
      </div>
    </div>

    <!-- ══ GRADIENTE AVANÇADO ════════════════════════════════════ -->
    <div v-if="aba==='gradiente'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-3">Gerador de Gradiente Avançado</h3>
        <div class="form-grid-2">
          <div><label class="field-label">Tipo</label><select v-model="grad.tipo" class="input-aurora w-full"><option value="linear">Linear</option><option value="radial">Radial</option><option value="conic">Cônico</option></select></div>
          <div v-if="grad.tipo==='linear'"><label class="field-label">Ângulo (°)</label><input v-model.number="grad.angulo" type="range" min="0" max="360" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ grad.angulo }}°</span></div>
        </div>
        <div class="space-y-2">
          <div v-for="(stop, i) in grad.stops" :key="i" class="flex items-center gap-2">
            <input v-model="stop.cor" type="color" class="w-10 h-8 rounded border border-white/10 bg-transparent cursor-pointer shrink-0" />
            <input v-model="stop.cor" class="input-aurora flex-1 font-mono text-xs" />
            <div class="flex items-center gap-1 w-24"><input v-model.number="stop.pos" type="range" min="0" max="100" class="range-aurora flex-1" /><span class="text-xs text-blue-200 w-8">{{ stop.pos }}%</span></div>
            <button v-if="grad.stops.length>2" @click="grad.stops.splice(i,1)" class="text-red-400 shrink-0"><Icon icon="mdi:close" class="w-3.5 h-3.5" /></button>
          </div>
        </div>
        <button @click="grad.stops.push({cor:'#ff0000',pos:50})" class="text-xs text-blue-400 flex items-center gap-1"><Icon icon="mdi:plus-circle" class="w-4 h-4" /> Add cor</button>
        <div class="flex flex-wrap gap-2 mt-2">
          <button v-for="p in gradPresets" :key="p.name" @click="aplicarGradPreset(p)" class="text-xs px-2 py-1 rounded-lg text-white border border-white/20" :style="`background:linear-gradient(90deg,${p.stops.map(s=>s.cor).join(',')})`">{{ p.name }}</button>
        </div>
      </div>
      <div class="space-y-4">
        <div class="rounded-xl min-h-48 border border-white/10" :style="`background:${gradientCss}`"></div>
        <div class="glass-panel p-4">
          <code class="text-xs font-mono text-green-300 break-all">background: {{ gradientCss }};</code>
          <button @click="copiar('background: '+gradientCss+';')" class="mt-2 text-xs text-blue-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar CSS</button>
        </div>
      </div>
    </div>

    <!-- ══ PADRÕES CSS ════════════════════════════════════════════ -->
    <div v-if="aba==='padroes'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 form-stack">
        <h3 class="text-sm font-semibold text-white mb-3">Gerador de Padrão CSS</h3>
        <div><label class="field-label">Tipo de Padrão</label><select v-model="padrao.tipo" class="input-aurora w-full"><option v-for="p in padraoTipos" :key="p.value" :value="p.value">{{ p.label }}</option></select></div>
        <div class="form-grid-2">
          <div><label class="field-label">Tamanho (px)</label><input v-model.number="padrao.size" type="range" min="4" max="80" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ padrao.size }}px</span></div>
          <div><label class="field-label">Espessura (px)</label><input v-model.number="padrao.thickness" type="range" min="1" max="20" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ padrao.thickness }}px</span></div>
        </div>
        <div class="form-grid-2">
          <div><label class="field-label">Cor do padrão</label><input v-model="padrao.cor" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent cursor-pointer" /></div>
          <div><label class="field-label">Cor do fundo</label><input v-model="padrao.fundo" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent cursor-pointer" /></div>
        </div>
        <div><label class="field-label">Opacidade (%)</label><input v-model.number="padrao.opacity" type="range" min="10" max="100" class="range-aurora w-full" /><span class="text-xs text-blue-200">{{ padrao.opacity }}%</span></div>
      </div>
      <div class="space-y-4">
        <div class="rounded-xl min-h-48 border border-white/10" :style="padraoCss"></div>
        <div class="glass-panel p-4">
          <label class="text-xs text-blue-300 font-semibold block mb-2">CSS:</label>
          <code class="text-xs font-mono text-green-300 break-all leading-relaxed whitespace-pre-wrap">{{ padraoCssStr }}</code>
          <button @click="copiar(padraoCssStr)" class="mt-2 text-xs text-blue-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar CSS</button>
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
  'gerador-box-shadow':'boxshadow','gerador-border-radius':'borderradius','verificador-contraste-wcag':'contraste',
  'escala-tipografica':'tipografia','calculadora-proporcao-tela':'proporcao','paleta-harmonica':'paleta',
  'sistema-espacamento':'espacamento','gerador-text-shadow':'textshadow','conversor-cores-avancado':'corcompleta',
  'gerador-gradiente-avancado':'gradiente','gerador-padroes-css':'padroes',
}

const tabs = [
  { id:'boxshadow',   label:'Box Shadow',    icon:'mdi:layers-outline' },
  { id:'borderradius',label:'Border Radius', icon:'mdi:rounded-corner' },
  { id:'contraste',   label:'Contraste',     icon:'mdi:contrast-box' },
  { id:'tipografia',  label:'Tipografia',    icon:'mdi:format-font' },
  { id:'proporcao',   label:'Proporção',     icon:'mdi:aspect-ratio' },
  { id:'paleta',      label:'Paleta',        icon:'mdi:palette-swatch' },
  { id:'espacamento', label:'Espaçamento',   icon:'mdi:ruler-square' },
  { id:'textshadow',  label:'Text Shadow',   icon:'mdi:format-text' },
  { id:'corcompleta', label:'Cores Avançado',icon:'mdi:eyedropper' },
  { id:'gradiente',   label:'Gradiente',     icon:'mdi:gradient-horizontal' },
  { id:'padroes',     label:'Padrões CSS',   icon:'mdi:texture' },
] as const

type TabId = typeof tabs[number]['id']
const aba = ref<TabId>('boxshadow')
const abaLabel = computed(()=>tabs.find(t=>t.id===aba.value)?.label||'')
onMounted(()=>{ const s=route.params.slug as string; if(slugTabMap[s]) aba.value=slugTabMap[s] as TabId })
watch(()=>route.params.slug,s=>{ if(s&&slugTabMap[s as string]) aba.value=slugTabMap[s as string] as TabId })

const designTips = [
  { title:'WCAG AA requer 4.5:1', text:'Para texto normal, a relação de contraste mínima exigida pelo WCAG 2.1 AA é 4.5:1. Para texto grande (18pt+), é 3:1.', type:'info' as const },
  { title:'Escala modular', text:'Usar uma razão consistente na escala tipográfica cria harmonia visual. A razão Áurea (1.618) é usada por muitos designers.', type:'info' as const },
]

function copiar(text: string) { navigator.clipboard.writeText(text); Swal.fire({icon:'success',title:'Copiado!',timer:800,showConfirmButton:false}) }
function hex2rgba(hex: string, op=1){ const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return `rgba(${r},${g},${b},${op})` }

// ─── Box Shadow ────────────────────────────────────────────────────────────────
const shadows = ref([{x:5,y:5,blur:15,spread:0,color:'#000000',opacity:25,inset:false}])
const boxBg = ref('#ffffff')
const boxShadowCss = computed(()=>shadows.value.map(sh=>{
  const c = hex2rgba(sh.color, sh.opacity/100)
  return `${sh.inset?'inset ':''} ${sh.x}px ${sh.y}px ${sh.blur}px ${sh.spread}px ${c}`
}).join(', '))

// ─── Border Radius ─────────────────────────────────────────────────────────────
const br = ref({tl:12,tr:12,bl:12,br:12}); const brAll = ref(true); const brW = ref(120); const brColor = ref('#4f46e5')
const brPresets = [{label:'Nenhum',tl:0,tr:0,bl:0,br:0},{label:'Pequeno',tl:4,tr:4,bl:4,br:4},{label:'Médio',tl:12,tr:12,bl:12,br:12},{label:'Grande',tl:24,tr:24,bl:24,br:24},{label:'Círculo',tl:50,tr:50,bl:50,br:50},{label:'Pílula',tl:9999,tr:9999,bl:9999,br:9999},{label:'Folha',tl:0,tr:50,bl:50,br:0}]
function aplicarBrPreset(p:any){ Object.assign(br.value,p); brAll.value = p.tl===p.tr&&p.tl===p.bl&&p.tl===p.br }
watch(()=>br.value.tl, v=>{ if(brAll.value){ br.value.tr=v; br.value.bl=v; br.value.br=v } })
const borderRadiusCss = computed(()=>{
  if(brAll.value) return `${br.value.tl}px`
  return `${br.value.tl}px ${br.value.tr}px ${br.value.br}px ${br.value.bl}px`
})

// ─── Contraste WCAG ────────────────────────────────────────────────────────────
const wcag = ref({fg:'#000000',bg:'#ffffff',texto:'Exemplo de Texto',size:'normal'})
function getLuminance(hex:string){
  const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255
  const toLinear=(c:number)=>c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4
  return 0.2126*toLinear(r)+0.7152*toLinear(g)+0.0722*toLinear(b)
}
const wcagResult = computed(()=>{
  const L1=getLuminance(wcag.value.fg), L2=getLuminance(wcag.value.bg)
  const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05)
  const isLarge=wcag.value.size==='large'
  const levels=[
    {name:'AA Normal',       pass: ratio>=4.5},
    {name:'AAA Normal',      pass: ratio>=7},
    {name:'AA Grande',       pass: ratio>=3},
    {name:'AAA Grande',      pass: ratio>=4.5},
  ]
  const descricao = ratio>=7?'Excelente contraste (AAA)':ratio>=4.5?'Bom contraste (AA)':ratio>=3?'Aceitável para texto grande':''
  return { ratio, levels, descricao }
})

// ─── Tipografia ────────────────────────────────────────────────────────────────
const tipo = ref({base:16,ratio:1.25,unidade:'rem',fonte:'system-ui'})
const ratios = [{value:1.067,label:'Menor Segunda (1.067)'},{value:1.125,label:'Maior Segunda (1.125)'},{value:1.2,label:'Menor Terça (1.2)'},{value:1.25,label:'Maior Terça (1.25)'},{value:1.333,label:'Quarta Perfeita (1.333)'},{value:1.414,label:'√2 (1.414)'},{value:1.5,label:'Quinta Perfeita (1.5)'},{value:1.618,label:'Razão Áurea (1.618)'}]
const fontes = [{value:'system-ui',label:'System UI'},{value:'Georgia,serif',label:'Georgia'},{value:"'Courier New',monospace",label:'Courier'},{value:'Arial,sans-serif',label:'Arial'}]
const steps = ['xs','sm','base','lg','xl','2xl','3xl','4xl','5xl']
const tipoScale = computed(()=>steps.map((name,i)=>{
  const exp = i - 2 // base is at index 2
  const px = tipo.value.base * Math.pow(tipo.value.ratio, exp)
  const rem = px/16
  const preview = name==='base'?'Texto Base — Aa Bb Cc':name==='xs'?'extra small':name==='sm'?'small':name==='lg'?'large':name==='xl'?'Extra Large':name
  return { name, px, rem, preview }
}))
function tipoVarCss(step:any){ return `--text-${step.name}: ${tipo.value.unidade==='rem'?step.rem.toFixed(3)+'rem':step.px.toFixed(1)+'px'};` }
const tipoAllCss = computed(()=>`:root {\n${tipoScale.value.map(s=>('  '+tipoVarCss(s))).join('\n')}\n}`)

// ─── Proporção ─────────────────────────────────────────────────────────────────
const prop = ref({aw:16,ah:9,largura:1280,altura:720})
const propPresets = [{label:'16:9',w:16,h:9},{label:'4:3',w:4,h:3},{label:'1:1',w:1,h:1},{label:'9:16',w:9,h:16},{label:'21:9',w:21,h:9},{label:'2:1',w:2,h:1},{label:'3:2',w:3,h:2},{label:'√2',w:1414,h:1000}]
function aplicarProp(p:any){ prop.value.aw=p.w; prop.value.ah=p.h; prop.value.altura=Math.round(prop.value.largura*p.h/p.w) }

// ─── Paleta ────────────────────────────────────────────────────────────────────
const paleta = ref({base:'#4f46e5',tipo:'complementar',tons:5})
const harmonias = [{value:'complementar',label:'Complementar'},{value:'analogica',label:'Analógica'},{value:'triadica',label:'Triádica'},{value:'tetradica',label:'Tetrádica'},{value:'splitcompl',label:'Split-Complementar'}]
function hex2hsl(hex:string){
  const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255
  const max=Math.max(r,g,b),min=Math.min(r,g,b); let h=0,s=0,l=(max+min)/2
  if(max!==min){ const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min); if(max===r)h=((g-b)/d+(g<b?6:0))/6; else if(max===g)h=((b-r)/d+2)/6; else h=((r-g)/d+4)/6 }
  return [h*360,s*100,l*100]
}
function hsl2hex(h:number,s:number,l:number){
  h%=360; const hh=h/360,ss=s/100,ll=l/100
  if(ss===0){ const v=Math.round(ll*255).toString(16).padStart(2,'0'); return '#'+v+v+v }
  const q=ll<0.5?ll*(1+ss):ll+ss-ll*ss, p=2*ll-q
  const f=(t:number)=>{ t=(t<0?t+1:t>1?t-1:t); if(t<1/6)return p+(q-p)*6*t; if(t<1/2)return q; if(t<2/3)return p+(q-p)*(2/3-t)*6; return p }
  return '#'+[f(hh+1/3),f(hh),f(hh-1/3)].map(c=>Math.round(c*255).toString(16).padStart(2,'0')).join('')
}
function gerarTons(hue:number, sat:number, nTons:number){ return Array.from({length:nTons},(_,i)=>{ const l=90-(i*(80/(nTons-1||1))); return {hex:hsl2hex(hue,sat,l), label: i===0?'50':i===nTons-1?'900':`${Math.floor(i/(nTons-1)*900/100)*100}` } }) }
const paletaResult = computed(()=>{
  const [h,s] = hex2hsl(paleta.value.base)
  const groups: {nome:string;tons:{hex:string;label:string}[]}[] = []
  groups.push({nome:'Base', tons:gerarTons(h,s,paleta.value.tons)})
  if(paleta.value.tipo==='complementar') groups.push({nome:'Complementar', tons:gerarTons((h+180)%360,s,paleta.value.tons)})
  if(paleta.value.tipo==='analogica'){ groups.push({nome:'Analógico -30°',tons:gerarTons((h-30+360)%360,s,paleta.value.tons)}); groups.push({nome:'Analógico +30°',tons:gerarTons((h+30)%360,s,paleta.value.tons)}) }
  if(paleta.value.tipo==='triadica'){ groups.push({nome:'Triádico 1',tons:gerarTons((h+120)%360,s,paleta.value.tons)}); groups.push({nome:'Triádico 2',tons:gerarTons((h+240)%360,s,paleta.value.tons)}) }
  if(paleta.value.tipo==='tetradica'){ [120,180,240].forEach((d,i)=>groups.push({nome:`Tetrádico ${i+1}`,tons:gerarTons((h+d)%360,s,paleta.value.tons)})) }
  if(paleta.value.tipo==='splitcompl'){ groups.push({nome:'Split 1',tons:gerarTons((h+150)%360,s,paleta.value.tons)}); groups.push({nome:'Split 2',tons:gerarTons((h+210)%360,s,paleta.value.tons)}) }
  return groups
})

// ─── Espaçamento ───────────────────────────────────────────────────────────────
const esp = ref({base:4,prefixo:'--space',sistema:'4'})
const espScale = computed(()=>{
  const b=esp.value.base
  if(esp.value.sistema==='fibonacci') return [0,1,1,2,3,5,8,13,21,34,55].map((v,i)=>({name:['0','1','2','3','4','5','6','7','8','9','10'][i]||String(i),px:v*b}))
  if(esp.value.sistema==='tailwind') return [0,.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32].map((v,i)=>({name:String(v),px:v*(b||4)}))
  const mult=Number(esp.value.sistema)||4; return Array.from({length:12},(_,i)=>({name:String((i+1)*mult/4),px:(i+1)*mult}))
})
const espCss = computed(()=>`:root {\n${espScale.value.map(s=>`  ${esp.value.prefixo}-${s.name}: ${s.px}px; /* ${(s.px/16).toFixed(3)}rem */`).join('\n')}\n}`)

// ─── Text Shadow ───────────────────────────────────────────────────────────────
const textShadows = ref([{x:2,y:2,blur:4,color:'#000000'}])
const tsh = ref({texto:'Design Pro',cor:'#ffffff',size:40})
const textShadowCss = computed(()=>textShadows.value.map(sh=>`${sh.x}px ${sh.y}px ${sh.blur}px ${sh.color}`).join(', '))

// ─── Conversor de Cores Avançado ───────────────────────────────────────────────
const corAdv = ref({input:'#4f46e5',texto:'#4f46e5',resultado:null as any, shades:[] as any[]})
function parseCorAdv(){
  let hex = corAdv.value.texto.trim()
  if(!hex.startsWith('#')) hex='#'+hex
  if(hex.length<7) return
  corAdv.value.input = hex
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16)
  const [h,s,l]=hex2hsl(hex)
  const cv=Math.min(r,g,b)/255, R=r/255,G=g/255,B=b/255, mx=Math.max(R,G,B)
  const C=mx-cv, cmyk_k=1-mx, cmyk_c=mx>0?(C/mx):0, cmyk_m=mx>0?((mx-G)/mx):0, cmyk_y=mx>0?((mx-B)/mx):0
  corAdv.value.resultado = [
    {label:'HEX', valor: hex.toUpperCase()},
    {label:'RGB', valor: `rgb(${r}, ${g}, ${b})`},
    {label:'RGBA', valor: `rgba(${r}, ${g}, ${b}, 1)`},
    {label:'HSL', valor: `hsl(${h.toFixed(0)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`},
    {label:'HSLA', valor: `hsla(${h.toFixed(0)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%, 1)`},
    {label:'HSV', valor: `hsv(${h.toFixed(0)}, ${(s).toFixed(1)}%, ${(mx*100).toFixed(1)}%)`},
    {label:'CMYK', valor: `cmyk(${(cmyk_c*100).toFixed(0)}%, ${(cmyk_m*100).toFixed(0)}%, ${(cmyk_y*100).toFixed(0)}%, ${(cmyk_k*100).toFixed(0)}%)`},
    {label:'CSS Named (aprox)', valor: `color:${hex}`},
    {label:'CSS var', valor: `--color-primary: ${hex.toUpperCase()}`},
    {label:'Luminância', valor: getLuminance(hex).toFixed(4)},
  ]
  corAdv.value.shades = [100,90,80,70,60].map((l,i)=>({name:[50,100,200,300,400][i],hex:hsl2hex(h,s,l)}))
}

// ─── Gradiente ─────────────────────────────────────────────────────────────────
const grad = ref({tipo:'linear',angulo:135,stops:[{cor:'#4f46e5',pos:0},{cor:'#ec4899',pos:100}]})
const gradientCss = computed(()=>{
  const stops = grad.value.stops.map(s=>`${s.cor} ${s.pos}%`).join(', ')
  if(grad.value.tipo==='linear') return `linear-gradient(${grad.value.angulo}deg, ${stops})`
  if(grad.value.tipo==='radial') return `radial-gradient(circle, ${stops})`
  return `conic-gradient(${stops})`
})
const gradPresets = [
  {name:'Oceano',stops:[{cor:'#0ea5e9',pos:0},{cor:'#6366f1',pos:100}]},
  {name:'Pôr-do-Sol',stops:[{cor:'#f97316',pos:0},{cor:'#ec4899',pos:100}]},
  {name:'Floresta',stops:[{cor:'#10b981',pos:0},{cor:'#059669',pos:100}]},
  {name:'Neon',stops:[{cor:'#a855f7',pos:0},{cor:'#06b6d4',pos:100}]},
  {name:'Aurora',stops:[{cor:'#4ade80',pos:0},{cor:'#06b6d4',pos:50},{cor:'#818cf8',pos:100}]},
]
function aplicarGradPreset(p:any){ grad.value.stops=[...p.stops] }

// ─── Padrões CSS ───────────────────────────────────────────────────────────────
const padrao = ref({tipo:'dots',size:20,thickness:2,cor:'#4f46e5',fundo:'#0a1628',opacity:70})
const padraoTipos = [{value:'dots',label:'Pontos'},{value:'grid',label:'Grade'},{value:'horizontal',label:'Linhas Horizontais'},{value:'vertical',label:'Linhas Verticais'},{value:'diagonal',label:'Diagonal'},{value:'diagonal2',label:'Diagonal Cruzada'},{value:'checkers',label:'Xadrez'}]
const padraoCss = computed(()=>{
  const {tipo,size,thickness,cor,fundo,opacity}=padrao.value
  const c=cor+Math.round(opacity*2.55).toString(16).padStart(2,'0')
  const style: Record<string,string> = { background: fundo }
  if(tipo==='dots') style.backgroundImage=`radial-gradient(${c} ${thickness}px, transparent 0)`, style.backgroundSize=`${size}px ${size}px`
  else if(tipo==='grid') style.backgroundImage=`linear-gradient(${c} ${thickness}px, transparent 0), linear-gradient(90deg, ${c} ${thickness}px, transparent 0)`, style.backgroundSize=`${size}px ${size}px`
  else if(tipo==='horizontal') style.backgroundImage=`linear-gradient(${c} ${thickness}px, transparent 0)`, style.backgroundSize=`${size}px ${size}px`
  else if(tipo==='vertical') style.backgroundImage=`linear-gradient(90deg, ${c} ${thickness}px, transparent 0)`, style.backgroundSize=`${size}px ${size}px`
  else if(tipo==='diagonal') style.backgroundImage=`repeating-linear-gradient(45deg, ${c}, ${c} ${thickness}px, transparent 0, transparent ${size}px)`
  else if(tipo==='diagonal2') style.backgroundImage=`repeating-linear-gradient(45deg, ${c}, ${c} ${thickness}px, transparent 0, transparent ${size}px), repeating-linear-gradient(-45deg, ${c}, ${c} ${thickness}px, transparent 0, transparent ${size}px)`
  else if(tipo==='checkers') style.backgroundImage=`repeating-conic-gradient(${cor} 0% 25%, ${fundo} 0% 50%)`, style.backgroundSize=`${size}px ${size}px`
  return Object.entries(style).map(([k,v])=>`${k}:${v}`).join(';')
})
const padraoCssStr = computed(()=>{
  const p=padrao.value
  const c=p.cor+Math.round(p.opacity*2.55).toString(16).padStart(2,'0')
  if(p.tipo==='dots') return `background-color: ${p.fundo};\nbackground-image: radial-gradient(${c} ${p.thickness}px, transparent 0);\nbackground-size: ${p.size}px ${p.size}px;`
  if(p.tipo==='grid') return `background-color: ${p.fundo};\nbackground-image: linear-gradient(${c} ${p.thickness}px, transparent 0), linear-gradient(90deg, ${c} ${p.thickness}px, transparent 0);\nbackground-size: ${p.size}px ${p.size}px;`
  if(p.tipo==='horizontal') return `background-color: ${p.fundo};\nbackground-image: linear-gradient(${c} ${p.thickness}px, transparent 0);\nbackground-size: ${p.size}px ${p.size}px;`
  if(p.tipo==='diagonal') return `background: repeating-linear-gradient(45deg, ${c}, ${c} ${p.thickness}px, transparent 0, transparent ${p.size}px);\nbackground-color: ${p.fundo};`
  if(p.tipo==='checkers') return `background-color: ${p.fundo};\nbackground-image: repeating-conic-gradient(${p.cor} 0% 25%, ${p.fundo} 0% 50%);\nbackground-size: ${p.size}px ${p.size}px;`
  return ''
})
</script>
