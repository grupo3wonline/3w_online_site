<template>
  <ToolShell
    title="Gerador de Palheta de Cores"
    description="Gere palhetas de cores baseadas em teoria das cores: complementar, análogo, triádico, tetrádico e monocromático."
    icon="fa-swatchbook"
    icon-gradient="from-pink-500 to-rose-700"
    orb-color="pink"
    :quick-tips="['5 esquemas', 'Formatos HEX/RGB/HSL', 'Exportar CSS/JSON']"
    :tips="[
      { title: 'Paleta 60-30-10', text: 'Use 60% da cor dominante, 30% da secundária e 10% de destaque. Paletas com 5 cores cobrem bem essa regra.' },
      { title: 'Verificar contraste', text: 'Sempre verifique o contraste entre texto e fundo para acessibilidade. Mínimo WCAG AA: 4.5:1.', type: 'info' },
      { title: 'Tetrádico', text: 'O esquema tetrádico oferece muitas possibilidades, mas pode ser difícil de equilibrar. Use uma cor como dominante.', type: 'warning' },
    ]"
    :examples="[
      { title: 'UI Corporativa', desc: 'Cor base: #1D4ED8 (azul), Esquema: Análogo', result: 'Palheta em tons de azul e índigo' },
      { title: 'App Vibrante', desc: 'Cor base: #E11D48 (rosa), Esquema: Triádico', result: 'Rosa, verde e amarelo equilibrados' },
      { title: 'Dashboard', desc: 'Cor base: #7C3AED (roxo), Esquema: Monocromático', result: 'Hierarquia visual com 5 tons do mesmo roxo' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Cor base -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-droplet mr-1.5 text-pink-500"></i>
              Cor base
            </label>
            <div class="flex gap-2">
              <input
                v-model="corBase"
                type="color"
                class="w-14 h-10 rounded-xl cursor-pointer border border-gray-200 dark:border-slate-700 flex-shrink-0"
              />
              <input
                v-model="corBaseHex"
                type="text"
                placeholder="#6366F1"
                class="input-aurora font-mono flex-1"
                @input="atualizarCorBase"
              />
            </div>
          </div>

          <!-- Esquema -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-circle-half-stroke mr-1.5 text-rose-500"></i>
              Esquema de cores
            </label>
            <div class="space-y-1.5">
              <button
                v-for="(nome, id) in nomesEsquemas"
                :key="id"
                @click="esquemaSelecionado = id"
                :class="[
                  'w-full p-2.5 rounded-xl border-2 transition-all text-left flex items-center justify-between',
                  esquemaSelecionado === id
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-pink-300'
                ]"
              >
                <span class="text-xs font-semibold text-gray-700 dark:text-slate-200">{{ nome }}</span>
                <span
                  v-if="esquemaSelecionado === id"
                  class="w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0"
                >
                  <i class="fas fa-check text-white text-[8px]"></i>
                </span>
              </button>
            </div>
          </div>

          <BaseButton variant="success" icon="fa-magic" @click="gerarPalheta" class="w-full">
            Gerar Palheta
          </BaseButton>
        </div>
      </div>

      <!-- Resultado -->
      <div class="lg:col-span-2 space-y-4">
        <Transition name="scale-in">
          <div v-if="palhetaGerada" class="space-y-4">
            <!-- Cores da palheta -->
            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                  <i class="fas fa-swatchbook text-pink-500"></i>
                  {{ nomesEsquemas[esquemaSelecionado] }}
                  <span class="badge-aurora-purple">{{ cores.length }} cores</span>
                </h4>
                <button @click="exportarPalheta" class="copy-btn">
                  <i class="fas fa-download text-xs"></i>
                </button>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div
                  v-for="(cor, index) in cores"
                  :key="index"
                  class="group cursor-pointer"
                  @click="copiarCor(cor.hex)"
                >
                  <div
                    class="h-24 rounded-xl shadow-lg transition-transform group-hover:scale-105 relative overflow-hidden"
                    :style="{ backgroundColor: cor.hex }"
                  >
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <i class="fas fa-copy text-white text-sm drop-shadow"></i>
                    </div>
                  </div>
                  <div class="mt-2 space-y-0.5">
                    <div class="font-mono text-xs font-bold text-gray-900 dark:text-white">{{ cor.hex }}</div>
                    <div class="font-mono text-[10px] text-gray-500 dark:text-slate-400">{{ cor.rgb }}</div>
                    <div class="font-mono text-[10px] text-gray-400 dark:text-slate-500">{{ cor.hsl }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Código CSS -->
            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                  <i class="fas fa-code text-pink-500"></i>
                  Variáveis CSS
                </h4>
                <BaseButton variant="outline" icon="fa-copy" size="xs" @click="copiarCSS">Copiar</BaseButton>
              </div>
              <div class="bg-gray-900 text-green-400 rounded-xl p-4 font-mono text-xs overflow-auto">
                <pre>{{ cssCode }}</pre>
              </div>
            </div>

            <!-- Dica de teoria das cores -->
            <div class="tip-card">
              <i class="fas fa-info-circle text-pink-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">{{ descricaoEsquema }}</span>
            </div>
          </div>
        </Transition>

        <div v-if="!palhetaGerada" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-swatchbook text-3xl mb-3 opacity-30 block text-pink-400"></i>
          <p class="text-sm">Escolha uma cor base e clique em <strong>Gerar Palheta</strong></p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const corBase            = ref('#6366f1')
const corBaseHex         = ref('#6366f1')
const esquemaSelecionado = ref('complementar')
const palhetaGerada      = ref(false)
const cores              = ref([])

const nomesEsquemas = {
  complementar:  'Complementar (2 cores)',
  analogo:       'Análogo (3 cores)',
  triadico:      'Triádico (3 cores)',
  tetradico:     'Tetrádico (4 cores)',
  monocromatico: 'Monocromático (5 tons)',
}

const descricaoEsquema = computed(() => ({
  complementar:  'Cores opostas no círculo cromático (180°). Alto contraste, ótimas para CTAs.',
  analogo:       'Cores adjacentes (±30°). Harmoniosas, ideais para interfaces limpas e modernas.',
  triadico:      'Três cores espaçadas 120°. Vibrantes e equilibradas ao mesmo tempo.',
  tetradico:     'Quatro cores espaçadas 90°. Muitas possibilidades; use uma como dominante.',
  monocromatico: 'Variações de luminosidade de uma única cor. Hierarquia visual elegante.',
}[esquemaSelecionado.value] || ''))

const cssCode = computed(() => {
  let css = ':root {\n'
  cores.value.forEach((cor, i) => { css += `  --color-${i + 1}: ${cor.hex};\n` })
  css += '}'
  return css
})

watch(corBase, (v) => { corBaseHex.value = v })

const atualizarCorBase = () => {
  if (/^#[0-9A-F]{6}$/i.test(corBaseHex.value)) corBase.value = corBaseHex.value
}

// ── Conversões ────────────────────────────────────────────────────
const hexParaRgb = (hex) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
})

const rgbParaHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255
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
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

const hslParaRgb = (h, s, l) => {
  h /= 360; s /= 100; l /= 100
  if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v } }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return {
    r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1/3) * 255),
  }
}

const rgbParaHex = (r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()

const gerarCor = (h, s, l) => {
  const rgb = hslParaRgb(h, s, l)
  const hex = rgbParaHex(rgb.r, rgb.g, rgb.b)
  return { hex, rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, hsl: `hsl(${h}, ${s}%, ${l}%)` }
}

const gerarPalheta = () => {
  const rgb = hexParaRgb(corBase.value)
  const hsl = rgbParaHsl(rgb.r, rgb.g, rgb.b)
  cores.value = []

  switch (esquemaSelecionado.value) {
    case 'complementar':
      cores.value = [gerarCor(hsl.h, hsl.s, hsl.l), gerarCor((hsl.h + 180) % 360, hsl.s, hsl.l)]
      break
    case 'analogo':
      cores.value = [
        gerarCor((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
        gerarCor(hsl.h, hsl.s, hsl.l),
        gerarCor((hsl.h + 30) % 360, hsl.s, hsl.l),
      ]
      break
    case 'triadico':
      cores.value = [
        gerarCor(hsl.h, hsl.s, hsl.l),
        gerarCor((hsl.h + 120) % 360, hsl.s, hsl.l),
        gerarCor((hsl.h + 240) % 360, hsl.s, hsl.l),
      ]
      break
    case 'tetradico':
      cores.value = [
        gerarCor(hsl.h, hsl.s, hsl.l),
        gerarCor((hsl.h + 90) % 360, hsl.s, hsl.l),
        gerarCor((hsl.h + 180) % 360, hsl.s, hsl.l),
        gerarCor((hsl.h + 270) % 360, hsl.s, hsl.l),
      ]
      break
    case 'monocromatico':
      cores.value = [
        gerarCor(hsl.h, hsl.s, Math.max(hsl.l - 30, 10)),
        gerarCor(hsl.h, hsl.s, Math.max(hsl.l - 15, 20)),
        gerarCor(hsl.h, hsl.s, hsl.l),
        gerarCor(hsl.h, hsl.s, Math.min(hsl.l + 15, 80)),
        gerarCor(hsl.h, hsl.s, Math.min(hsl.l + 30, 90)),
      ]
      break
  }

  palhetaGerada.value = true
}

const copiarCor = (hex) => {
  navigator.clipboard.writeText(hex).then(() => {
    Swal.fire({ icon: 'success', title: `${hex} copiado!`, timer: 1200, showConfirmButton: false })
  })
}

const copiarCSS = () => {
  navigator.clipboard.writeText(cssCode.value).then(() => {
    Swal.fire({ icon: 'success', title: 'CSS copiado!', timer: 1500, showConfirmButton: false })
  })
}

const exportarPalheta = () => {
  const json = { scheme: esquemaSelecionado.value, baseColor: corBase.value, colors: cores.value }
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url; link.download = `palheta_${esquemaSelecionado.value}_${Date.now()}.json`
  document.body.appendChild(link); link.click(); link.remove()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
