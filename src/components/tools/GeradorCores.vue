<template>
  <ToolShell
    title="Gerador de Cores"
    description="Gere paletas de cores harmônicas: complementar, análoga, triádica, monocromática e tetrádica. Exporte em CSS, Tailwind ou JSON."
    icon="fa-palette"
    icon-gradient="from-pink-500 to-rose-700"
    orb-color="pink"
    :quick-tips="['5 esquemas', 'Variações de tonalidade', 'Exportar CSS/JSON']"
    :tips="[
      { title: 'Cores análogas', text: 'Cores vizinhas no círculo cromático (±30°). Criam harmonia e são agradáveis aos olhos. Ótimas para interfaces limpas.' },
      { title: 'Complementar', text: 'Cores nos lados opostos do círculo (180°). Criam alto contraste — ideal para CTAs e elementos de destaque.', type: 'info' },
      { title: 'Regra 60-30-10', text: 'Use 60% da cor dominante, 30% da secundária e 10% de destaque. Paletas triádicas encaixam bem nessa regra.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Paleta para site', desc: 'Cor base: #3B82F6, Esquema: Análoga', result: '5 cores harmônicas em tons de azul e ciano' },
      { title: 'UI de alto contraste', desc: 'Cor base: #E11D48, Esquema: Complementar', result: 'Rosa + Verde intenso para máximo contraste' },
      { title: 'Dashboard monoc.', desc: 'Cor base: #6366F1, Esquema: Monocromática', result: '5 tons do mesmo roxo para hierarquia visual' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Tipo de paleta -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-circle-half-stroke mr-1.5 text-pink-500"></i>
              Esquema de cores
            </label>
            <div class="space-y-1.5">
              <button
                v-for="tipo in tiposPaleta"
                :key="tipo.id"
                @click="tipoSelecionado = tipo.id; gerarPaleta()"
                :class="[
                  'w-full p-2.5 rounded-xl border-2 transition-all text-left flex items-center gap-2',
                  tipoSelecionado === tipo.id
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-pink-300'
                ]"
              >
                <i :class="[tipo.icon, 'text-sm w-4', tipoSelecionado === tipo.id ? 'text-pink-500' : 'text-gray-400']"></i>
                <span class="text-xs font-semibold text-gray-700 dark:text-slate-200">{{ tipo.nome }}</span>
              </button>
            </div>
          </div>

          <!-- Cor base -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-droplet mr-1.5 text-rose-500"></i>
              Cor base
            </label>
            <div class="flex gap-2">
              <input
                v-model="corBase"
                @input="gerarPaleta"
                type="color"
                class="w-14 h-10 rounded-lg cursor-pointer border-0"
              />
              <input
                v-model="corBase"
                @input="gerarPaleta"
                type="text"
                class="input-aurora font-mono flex-1"
                placeholder="#3B82F6"
              />
            </div>
          </div>

          <!-- Botões -->
          <div class="flex gap-2">
            <BaseButton variant="outline" icon="fa-shuffle" @click="gerarCorAleatoria" class="flex-1">
              Aleatória
            </BaseButton>
            <BaseButton variant="success" icon="fa-rotate" @click="gerarPaleta" class="flex-1">
              Atualizar
            </BaseButton>
          </div>
        </div>

        <!-- Info do esquema -->
        <div class="tip-card">
          <i class="fas fa-info-circle text-pink-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">{{ descricaoTipo }}</span>
        </div>
      </div>

      <!-- Paleta principal + variações -->
      <div class="lg:col-span-2 space-y-4">
        <Transition name="scale-in">
          <div v-if="cores.length > 0" class="space-y-4">
            <!-- Cores principais -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-palette text-pink-500"></i>
                Paleta — {{ tipoNomeSelecionado }}
              </h4>
              <div class="grid grid-cols-5 gap-3">
                <div v-for="(cor, index) in cores" :key="index" class="group">
                  <div
                    :style="{ backgroundColor: cor }"
                    class="h-20 rounded-xl shadow cursor-pointer transition-transform hover:scale-105 hover:ring-2 hover:ring-pink-400"
                    @click="copiarCor(cor)"
                    :title="cor"
                  >
                    <div class="h-full flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span class="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full">
                        <i class="fas fa-copy mr-1"></i>Copiar
                      </span>
                    </div>
                  </div>
                  <div class="mt-2 text-center">
                    <div class="font-mono text-xs font-bold text-gray-900 dark:text-white">{{ cor }}</div>
                    <div class="text-[10px] text-gray-500 dark:text-slate-400">{{ hexParaRGB(cor) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Variações de tonalidade -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-layer-group text-pink-500"></i>
                Variações de tonalidade
              </h4>
              <div v-for="(cor, index) in cores" :key="`var-${index}`" class="mb-3 last:mb-0">
                <div class="text-[10px] text-gray-500 dark:text-slate-400 mb-1 font-mono">{{ cor }}</div>
                <div class="flex gap-1">
                  <div
                    v-for="(variacao, vIndex) in gerarVariacoes(cor)"
                    :key="vIndex"
                    :style="{ backgroundColor: variacao }"
                    :title="variacao"
                    class="flex-1 h-8 rounded cursor-pointer hover:ring-2 hover:ring-pink-400 hover:scale-y-110 transition-all"
                    @click="copiarCor(variacao)"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Exportação -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-code text-pink-500"></i>
                Código para exportar
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <p class="text-gray-500 dark:text-slate-400 mb-1">CSS Variables</p>
                  <div class="bg-gray-900 text-green-400 rounded-lg p-3 font-mono leading-relaxed">
                    <div v-for="(cor, i) in cores" :key="`css-${i}`">--color-{{ i + 1 }}: {{ cor }};</div>
                  </div>
                </div>
                <div>
                  <p class="text-gray-500 dark:text-slate-400 mb-1">Tailwind Config</p>
                  <div class="bg-gray-900 text-blue-400 rounded-lg p-3 font-mono leading-relaxed">
                    <div v-for="(cor, i) in cores" :key="`tw-${i}`">'{{ i + 1 }}': '{{ cor }}',</div>
                  </div>
                </div>
              </div>
              <div class="flex gap-2 mt-3">
                <BaseButton variant="outline" icon="fa-copy" size="sm" @click="copiarCSS" class="flex-1">CSS</BaseButton>
                <BaseButton variant="outline" icon="fa-download" size="sm" @click="exportarJSON" class="flex-1">JSON</BaseButton>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!cores.length" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-palette text-3xl mb-3 opacity-30 block text-pink-400"></i>
          <p class="text-sm">Selecione um esquema e ajuste a cor base</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const tiposPaleta = [
  { id: 'complementar',  nome: 'Complementar',  icon: 'fas fa-circle-half-stroke' },
  { id: 'analogica',     nome: 'Análoga',        icon: 'fas fa-circles-overlap' },
  { id: 'triadica',      nome: 'Triádica',       icon: 'fas fa-shapes' },
  { id: 'monocromatica', nome: 'Monocromática',  icon: 'fas fa-layer-group' },
  { id: 'tetradica',     nome: 'Tetrádica',      icon: 'fas fa-grip' },
]

const tipoSelecionado = ref('complementar')
const corBase         = ref('#3B82F6')
const cores           = ref([])

const tipoNomeSelecionado = computed(() => tiposPaleta.find(t => t.id === tipoSelecionado.value)?.nome || '')

const descricaoTipo = computed(() => ({
  complementar:  'Cores opostas no círculo cromático. Criam alto contraste e são vibrantes juntas.',
  analogica:     'Cores adjacentes no círculo cromático. Criam harmonia e são agradáveis aos olhos.',
  triadica:      'Três cores igualmente espaçadas. Oferecem contraste vibrante mantendo equilíbrio.',
  monocromatica: 'Variações de uma única cor. Aspecto limpo e elegante.',
  tetradica:     'Quatro cores espaçadas. Oferece muitas possibilidades de combinação.',
}[tipoSelecionado.value] || ''))

// ── Conversões de cor ──────────────────────────────────────────────
const hexParaHSL = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b); const min = Math.min(r, g, b)
  let h = 0; let s = 0; const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

const hslParaHex = (h, s, l) => {
  s /= 100; l /= 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0; let g = 0; let b = 0
  if (h < 60)       { r = c; g = x; b = 0 }
  else if (h < 120) { r = x; g = c; b = 0 }
  else if (h < 180) { r = 0; g = c; b = x }
  else if (h < 240) { r = 0; g = x; b = c }
  else if (h < 300) { r = x; g = 0; b = c }
  else              { r = c; g = 0; b = x }
  const toHex = (v) => { const h = Math.round((v + m) * 255).toString(16); return h.length === 1 ? '0' + h : h }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const hexParaRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

const gerarPaleta = () => {
  if (!corBase.value || !/^#[0-9A-Fa-f]{6}$/.test(corBase.value)) return
  const hsl = hexParaHSL(corBase.value)
  const novaCores = []
  switch (tipoSelecionado.value) {
    case 'complementar':
      novaCores.push(corBase.value, hslParaHex((hsl.h + 180) % 360, hsl.s, hsl.l),
        hslParaHex(hsl.h, hsl.s * 0.5, Math.min(hsl.l * 1.2, 85)),
        hslParaHex((hsl.h + 180) % 360, hsl.s * 0.5, Math.min(hsl.l * 1.2, 85)),
        hslParaHex(hsl.h, hsl.s * 0.3, Math.min(hsl.l * 1.4, 90))); break
    case 'analogica':
      novaCores.push(hslParaHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
        hslParaHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l), corBase.value,
        hslParaHex((hsl.h + 15) % 360, hsl.s, hsl.l), hslParaHex((hsl.h + 30) % 360, hsl.s, hsl.l)); break
    case 'triadica':
      novaCores.push(corBase.value, hslParaHex((hsl.h + 120) % 360, hsl.s, hsl.l),
        hslParaHex((hsl.h + 240) % 360, hsl.s, hsl.l),
        hslParaHex(hsl.h, hsl.s * 0.6, Math.min(hsl.l * 1.2, 85)),
        hslParaHex((hsl.h + 120) % 360, hsl.s * 0.6, Math.min(hsl.l * 1.2, 85))); break
    case 'monocromatica':
      novaCores.push(hslParaHex(hsl.h, hsl.s, Math.max(hsl.l * 0.3, 10)),
        hslParaHex(hsl.h, hsl.s, Math.max(hsl.l * 0.6, 20)), corBase.value,
        hslParaHex(hsl.h, hsl.s * 0.5, Math.min(hsl.l * 1.2, 80)),
        hslParaHex(hsl.h, hsl.s * 0.3, Math.min(hsl.l * 1.4, 90))); break
    case 'tetradica':
      novaCores.push(corBase.value, hslParaHex((hsl.h + 90) % 360, hsl.s, hsl.l),
        hslParaHex((hsl.h + 180) % 360, hsl.s, hsl.l),
        hslParaHex((hsl.h + 270) % 360, hsl.s, hsl.l),
        hslParaHex(hsl.h, hsl.s * 0.5, Math.min(hsl.l * 1.2, 85))); break
  }
  cores.value = novaCores
}

const gerarVariacoes = (cor) => {
  const hsl = hexParaHSL(cor)
  return Array.from({ length: 10 }, (_, i) => {
    const fator = (i + 1) / 10
    return hslParaHex(hsl.h, hsl.s, Math.min(95, hsl.l * (0.3 + fator * 1.4)))
  })
}

const gerarCorAleatoria = () => {
  const rnd = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  corBase.value = `#${rnd()}${rnd()}${rnd()}`
  gerarPaleta()
}

const copiarCor = async (cor) => {
  try {
    await navigator.clipboard.writeText(cor)
    Swal.fire({ icon: 'success', title: `${cor} copiado!`, timer: 1200, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const copiarCSS = async () => {
  const css = cores.value.map((cor, i) => `  --color-${i + 1}: ${cor};`).join('\n')
  try {
    await navigator.clipboard.writeText(css)
    Swal.fire({ icon: 'success', title: 'CSS copiado!', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const exportarJSON = () => {
  const dados = { tipo: tipoSelecionado.value, corBase: corBase.value, cores: cores.value, variacoes: cores.value.map(gerarVariacoes) }
  const blob  = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
  const url   = URL.createObjectURL(blob)
  const link  = document.createElement('a')
  link.href = url; link.download = `paleta-cores-${Date.now()}.json`; link.click()
  URL.revokeObjectURL(url)
  Swal.fire({ icon: 'success', title: 'Download iniciado!', timer: 1500, showConfirmButton: false })
}

gerarPaleta()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
