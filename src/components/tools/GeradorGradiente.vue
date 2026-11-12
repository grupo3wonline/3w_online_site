<template>
  <ToolShell
    title="Gerador de Gradiente CSS"
    description="Crie gradientes CSS lineares, radiais e cônicos com preview ao vivo, controle de posição das cores e export em CSS/Tailwind."
    icon="fa-paint-brush"
    icon-gradient="from-purple-500 to-pink-700"
    orb-color="purple"
    :quick-tips="['3 tipos de gradiente', 'Preview ao vivo', 'Copiar CSS']"
    :tips="[
      { title: 'Gradiente linear', text: 'background: linear-gradient(90deg, #667eea, #764ba2). Use graus (0-360) para controlar a direção.' },
      { title: 'Gradiente sutil', text: 'Para fundos profissionais, use 2 cores similares com diferença de matiz de 20-40°. Evite contrastes muito altos.', type: 'info' },
      { title: 'Performance CSS', text: 'Gradientes CSS são acelerados por GPU e têm performance superior a imagens. Prefira CSS para fundos decorativos.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Aurora UI', desc: '135deg, #667eea → #764ba2', result: 'Gradiente roxo/violeta suave' },
      { title: 'Pôr do sol', desc: 'to right, #ff6a00 → #ee0979', result: 'Gradiente laranja para rosa vibrante' },
      { title: 'Oceano', desc: '120deg, #2193b0 → #6dd5ed', result: 'Gradiente azul oceano para céu' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Tipo de gradiente -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-wand-magic-sparkles mr-1.5 text-purple-500"></i>
              Tipo
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="t in tiposGradiente"
                :key="t.id"
                @click="tipo = t.id"
                :class="[
                  'p-2.5 rounded-xl border-2 transition-all text-center',
                  tipo === t.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-purple-300'
                ]"
              >
                <i :class="[t.icon, 'text-sm block mb-1', tipo === t.id ? 'text-purple-500' : 'text-gray-400']"></i>
                <span class="text-[10px] font-semibold text-gray-700 dark:text-slate-200">{{ t.nome }}</span>
              </button>
            </div>
          </div>

          <!-- Direção (apenas linear) -->
          <div v-if="tipo === 'linear'">
            <label class="input-aurora-label">
              <i class="fas fa-compass mr-1.5 text-purple-400"></i>
              Direção: {{ direcao }}°
            </label>
            <input v-model="direcao" type="range" min="0" max="360" class="range-aurora w-full" />
            <div class="flex justify-between text-[10px] text-gray-500 dark:text-slate-400 mt-1">
              <span>0° →</span><span>90° ↑</span><span>180° ←</span><span>270° ↓</span>
            </div>
          </div>

          <!-- Cores -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="input-aurora-label !mb-0">
                <i class="fas fa-palette mr-1.5 text-pink-500"></i>
                Cores ({{ coresGradiente.length }})
              </label>
              <BaseButton variant="outline" size="xs" icon="fa-plus" @click="adicionarCor">Cor</BaseButton>
            </div>
            <div class="space-y-2">
              <div
                v-for="(cor, index) in coresGradiente"
                :key="index"
                class="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 rounded-xl p-2"
              >
                <input v-model="cor.hex" type="color" class="w-10 h-9 rounded-lg cursor-pointer border-0 flex-shrink-0" />
                <input v-model="cor.hex" type="text" class="input-aurora font-mono text-xs flex-1 !py-1.5" />
                <input v-model="cor.posicao" type="number" min="0" max="100" class="input-aurora text-center text-xs !py-1.5 w-16" />
                <span class="text-xs text-gray-500 dark:text-slate-400">%</span>
                <button
                  v-if="coresGradiente.length > 2"
                  @click="removerCor(index)"
                  class="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                >
                  <i class="fas fa-trash text-xs"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Ações rápidas -->
          <div class="grid grid-cols-3 gap-2">
            <BaseButton variant="outline" size="sm" icon="fa-arrow-right-arrow-left" @click="inverterCores">Inverter</BaseButton>
            <BaseButton variant="outline" size="sm" icon="fa-shuffle" @click="gerarAleatorio">Aleatório</BaseButton>
            <BaseButton variant="outline" size="sm" icon="fa-rotate-left" @click="resetar">Resetar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Preview + Código -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Preview ao vivo -->
        <div
          :style="{ background: gradienteCSS }"
          class="h-52 rounded-2xl shadow-xl relative overflow-hidden"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="bg-black/50 text-white px-5 py-2.5 rounded-xl backdrop-blur-sm text-sm font-semibold">
              <i class="fas fa-eye mr-2"></i>Preview ao vivo
            </div>
          </div>
        </div>

        <!-- Código CSS -->
        <div class="glass-panel p-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
              <i class="fas fa-code text-purple-500"></i>
              Código CSS
            </h4>
            <BaseButton variant="primary" icon="fa-copy" size="xs" @click="copiarCSS">Copiar</BaseButton>
          </div>
          <div class="bg-gray-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
            <pre class="text-green-400">background: {{ gradienteCSS }};</pre>
          </div>
        </div>

        <!-- Gradientes populares -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-wand-magic-sparkles text-purple-500"></i>
            Presets populares
          </h4>
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="(preset, index) in presets"
              :key="index"
              @click="aplicarPreset(preset)"
              :style="{ background: preset.css }"
              :title="preset.nome"
              class="h-16 rounded-xl cursor-pointer hover:scale-105 transition-transform relative group shadow"
            >
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-xl transition-all flex items-end justify-center pb-1.5">
                <span class="text-white text-[10px] opacity-0 group-hover:opacity-100 font-semibold">{{ preset.nome }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const tiposGradiente = [
  { id: 'linear', nome: 'Linear', icon: 'fas fa-arrows-left-right' },
  { id: 'radial', nome: 'Radial', icon: 'fas fa-circle-dot' },
  { id: 'conic',  nome: 'Cônico', icon: 'fas fa-chart-pie' },
]

const tipo           = ref('linear')
const direcao        = ref(90)
const coresGradiente = ref([
  { hex: '#667eea', posicao: 0 },
  { hex: '#764ba2', posicao: 100 },
])

const presets = [
  { nome: 'Oceano',   css: 'linear-gradient(120deg, #2193b0, #6dd5ed)' },
  { nome: 'Pôr do Sol', css: 'linear-gradient(to right, #ff6a00, #ee0979)' },
  { nome: 'Aurora',   css: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)' },
  { nome: 'Floresta', css: 'linear-gradient(to right, #11998e, #38ef7d)' },
  { nome: 'Fogo',     css: 'linear-gradient(to right, #f12711, #f5af19)' },
  { nome: 'Lavanda',  css: 'linear-gradient(to right, #834d9b, #d04ed6)' },
  { nome: 'Limão',    css: 'linear-gradient(to right, #c6ea8d, #fe90af)' },
  { nome: 'Noite',    css: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)' },
]

const gradienteCSS = computed(() => {
  const cores = [...coresGradiente.value]
    .sort((a, b) => a.posicao - b.posicao)
    .map(c => `${c.hex} ${c.posicao}%`)
    .join(', ')
  if (tipo.value === 'linear') return `linear-gradient(${direcao.value}deg, ${cores})`
  if (tipo.value === 'radial') return `radial-gradient(circle, ${cores})`
  return `conic-gradient(from 0deg, ${cores})`
})

const adicionarCor = () => {
  const ult = coresGradiente.value[coresGradiente.value.length - 1].posicao
  const pos = ult < 100 ? (ult + 100) / 2 : 50
  coresGradiente.value.push({ hex: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`, posicao: pos })
}

const removerCor = (i) => {
  if (coresGradiente.value.length > 2) coresGradiente.value.splice(i, 1)
}

const inverterCores = () => {
  coresGradiente.value.reverse()
  coresGradiente.value.forEach((c, i) => { c.posicao = (100 / (coresGradiente.value.length - 1)) * i })
}

const gerarAleatorio = () => {
  const n = 2 + Math.floor(Math.random() * 3)
  coresGradiente.value = Array.from({ length: n }, (_, i) => ({
    hex: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
    posicao: (100 / (n - 1)) * i,
  }))
  direcao.value = Math.floor(Math.random() * 360)
}

const resetar = () => {
  tipo.value = 'linear'; direcao.value = 90
  coresGradiente.value = [{ hex: '#667eea', posicao: 0 }, { hex: '#764ba2', posicao: 100 }]
}

const copiarCSS = async () => {
  try {
    await navigator.clipboard.writeText(`background: ${gradienteCSS.value};`)
    Swal.fire({ icon: 'success', title: 'CSS copiado!', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const aplicarPreset = (preset) => {
  const regex = /(?:linear|radial|conic)-gradient\(([^,]+),\s*(.+)\)/
  const match = preset.css.match(regex)
  if (!match) return
  const cores = match[2].split(',').map(c => c.trim())
  coresGradiente.value = cores.map((cor, i) => ({
    hex: cor.match(/#[0-9a-fA-F]{6}/)?.[0] || '#000000',
    posicao: (100 / Math.max(cores.length - 1, 1)) * i,
  }))
}
</script>
