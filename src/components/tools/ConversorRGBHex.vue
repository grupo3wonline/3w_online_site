<template>
  <ToolShell
    title="Conversor RGB ↔ HEX"
    description="Converta cores entre HEX, RGB e CSS — com preview visual em tempo real."
    icon="fa-palette"
    icon-gradient="from-pink-500 to-rose-700"
    orb-color="pink"
    :quick-tips="['Preview ao vivo', 'Cópia com 1 clique', 'RGB, HEX e CSS']"
    :tips="[
      { text: 'HEX #RRGGBB usa valores hexadecimais de 00 a FF (0–255 decimal).' },
      { text: 'RGB(255, 0, 0) = vermelho puro. Cada canal vai de 0 a 255.', type: 'info' },
      { text: 'Use o color picker abaixo para selecionar qualquer cor visualmente.', type: 'success' },
    ]"
  >
    <!-- Toggle de modo -->
    <div class="tool-section">
      <div class="flex gap-2 p-1 bg-gray-100 dark:bg-slate-700 rounded-xl mb-4">
        <button
          :class="['flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all', modo === 'rgb-hex' ? 'bg-pink-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600']"
          @click="modo = 'rgb-hex'"
        >
          <i class="fas fa-arrow-right mr-1.5 text-xs"></i> RGB → HEX
        </button>
        <button
          :class="['flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all', modo === 'hex-rgb' ? 'bg-pink-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600']"
          @click="modo = 'hex-rgb'"
        >
          <i class="fas fa-arrow-left mr-1.5 text-xs"></i> HEX → RGB
        </button>
      </div>

      <!-- Color Picker visual -->
      <div class="flex items-center gap-4 mb-4">
        <div>
          <label class="input-aurora-label text-xs mb-1 block">Escolher cor</label>
          <input
            type="color"
            v-model="colorPicker"
            @input="onColorPicker"
            class="w-16 h-12 rounded-xl border border-gray-200 dark:border-slate-600 cursor-pointer"
          />
        </div>
        <div class="flex-1">
          <div
            :style="{ backgroundColor: corAtual }"
            class="w-full h-12 rounded-xl border border-gray-200 dark:border-slate-600 shadow-inner transition-colors duration-300"
          ></div>
          <p class="text-xs text-gray-400 dark:text-slate-500 mt-1 text-center font-mono">{{ corAtual }}</p>
        </div>
      </div>

      <!-- RGB inputs -->
      <div v-if="modo === 'rgb-hex'" class="grid grid-cols-3 gap-3">
        <div>
          <label class="input-aurora-label">R (0–255)</label>
          <input v-model.number="r" @input="rgbParaHex" type="number" min="0" max="255"
            class="input-aurora text-center font-mono" placeholder="255" />
          <div class="mt-1 h-2 rounded-full" :style="{ background: `rgb(${r},0,0)` }"></div>
        </div>
        <div>
          <label class="input-aurora-label">G (0–255)</label>
          <input v-model.number="g" @input="rgbParaHex" type="number" min="0" max="255"
            class="input-aurora text-center font-mono" placeholder="87" />
          <div class="mt-1 h-2 rounded-full" :style="{ background: `rgb(0,${g},0)` }"></div>
        </div>
        <div>
          <label class="input-aurora-label">B (0–255)</label>
          <input v-model.number="b" @input="rgbParaHex" type="number" min="0" max="255"
            class="input-aurora text-center font-mono" placeholder="51" />
          <div class="mt-1 h-2 rounded-full" :style="{ background: `rgb(0,0,${b})` }"></div>
        </div>
      </div>

      <!-- HEX input -->
      <div v-else>
        <label class="input-aurora-label">HEX (#RRGGBB)</label>
        <input v-model="hexInput" @input="hexParaRgb" type="text" placeholder="#FF5733"
          maxlength="7" class="input-aurora font-mono uppercase" />
      </div>
    </div>

    <!-- Resultado -->
    <div v-if="corAtual" class="glass-panel p-5 space-y-3">
      <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
        <i class="fas fa-swatchbook text-pink-500"></i>
        Valores da Cor
      </h4>
      <div v-for="item in resultados" :key="item.label" class="flex items-center justify-between p-3 bg-white dark:bg-slate-700/60 rounded-xl border border-gray-100 dark:border-slate-600">
        <div>
          <p class="text-[10px] text-gray-500 dark:text-slate-400 font-semibold uppercase">{{ item.label }}</p>
          <code class="text-sm font-bold text-gray-900 dark:text-white font-mono">{{ item.valor }}</code>
        </div>
        <button @click="copiar(item.valor, item.label)" class="copy-btn">
          <i :class="['fas', copiado === item.label ? 'fa-check text-emerald-500' : 'fa-copy']"></i>
          {{ copiado === item.label ? 'Copiado!' : 'Copiar' }}
        </button>
      </div>
    </div>

    <!-- Paleta de referência -->
    <div class="glass-panel p-4">
      <p class="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Cores Rápidas</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="c in coresRapidas"
          :key="c.hex"
          class="w-8 h-8 rounded-lg border-2 border-white dark:border-slate-600 shadow-sm hover:scale-110 transition-transform"
          :style="{ backgroundColor: c.hex }"
          :title="c.nome"
          @click="usarCor(c.hex)"
        ></button>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'

// ─── Estado ───────────────────────────────────────────────────────────────────
const modo        = ref<'rgb-hex' | 'hex-rgb'>('rgb-hex')
const r           = ref(255)
const g           = ref(87)
const b           = ref(51)
const hexInput    = ref('#FF5733')
const corAtual    = ref('#FF5733')
const colorPicker = ref('#FF5733')
const copiado     = ref('')

// ─── Resultados computados ────────────────────────────────────────────────────
const hexSaida = computed(() => corAtual.value.toUpperCase())
const rgbSaida = computed(() => `${r.value}, ${g.value}, ${b.value}`)

const resultados = computed(() => [
  { label: 'HEX',          valor: hexSaida.value },
  { label: 'RGB',          valor: rgbSaida.value },
  { label: 'CSS rgb()',     valor: `rgb(${r.value}, ${g.value}, ${b.value})` },
  { label: 'CSS rgba()',    valor: `rgba(${r.value}, ${g.value}, ${b.value}, 1)` },
  { label: 'Tailwind hint', valor: `[${hexSaida.value}]` },
])

// ─── Cores de referência ─────────────────────────────────────────────────────
const coresRapidas = [
  { hex: '#FF5733', nome: 'Vermelho Tomate' },
  { hex: '#FF6B35', nome: 'Laranja' },
  { hex: '#F7C948', nome: 'Amarelo' },
  { hex: '#28B463', nome: 'Verde' },
  { hex: '#2563EB', nome: 'Azul' },
  { hex: '#7C3AED', nome: 'Violeta' },
  { hex: '#DB2777', nome: 'Rosa' },
  { hex: '#0F172A', nome: 'Dark Navy' },
  { hex: '#FFFFFF', nome: 'Branco' },
  { hex: '#94A3B8', nome: 'Cinza' },
]

// ─── Conversões ───────────────────────────────────────────────────────────────
function rgbParaHex() {
  const rv = Math.max(0, Math.min(255, r.value || 0))
  const gv = Math.max(0, Math.min(255, g.value || 0))
  const bv = Math.max(0, Math.min(255, b.value || 0))
  const hex = '#' + [rv, gv, bv].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
  corAtual.value    = hex
  colorPicker.value = hex
}

function hexParaRgb() {
  let hex = hexInput.value.trim()
  if (!hex.startsWith('#')) hex = '#' + hex
  if (hex.length === 7) {
    const rv = parseInt(hex.slice(1, 3), 16)
    const gv = parseInt(hex.slice(3, 5), 16)
    const bv = parseInt(hex.slice(5, 7), 16)
    if (!isNaN(rv) && !isNaN(gv) && !isNaN(bv)) {
      r.value = rv; g.value = gv; b.value = bv
      corAtual.value    = hex.toUpperCase()
      colorPicker.value = hex.toLowerCase()
    }
  }
}

function onColorPicker() {
  const hex = colorPicker.value
  r.value = parseInt(hex.slice(1, 3), 16)
  g.value = parseInt(hex.slice(3, 5), 16)
  b.value = parseInt(hex.slice(5, 7), 16)
  corAtual.value = hex.toUpperCase()
  if (modo.value === 'hex-rgb') hexInput.value = hex.toUpperCase()
}

function usarCor(hex: string) {
  r.value = parseInt(hex.slice(1, 3), 16)
  g.value = parseInt(hex.slice(3, 5), 16)
  b.value = parseInt(hex.slice(5, 7), 16)
  corAtual.value    = hex.toUpperCase()
  colorPicker.value = hex.toLowerCase()
  hexInput.value    = hex.toUpperCase()
}

async function copiar(valor: string, label: string) {
  await navigator.clipboard.writeText(valor)
  copiado.value = label
  setTimeout(() => (copiado.value = ''), 2000)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `${label} copiado!`, showConfirmButton: false, timer: 1400 })
}

// Init
rgbParaHex()
</script>
