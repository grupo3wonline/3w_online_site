<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface ColorStop {
  id: string
  color: string
  position: number
}

type GradientType = 'linear' | 'radial'

const gradientType = ref<GradientType>('linear')
const direction = ref(90)
const colorStops = ref<ColorStop[]>([
  { id: '1', color: '#667eea', position: 0 },
  { id: '2', color: '#764ba2', position: 100 },
])

const cssOutput = computed(() => {
  const stops = [...colorStops.value]
    .sort((a, b) => a.position - b.position)
    .map(s => `${s.color} ${s.position}%`)
    .join(', ')
  if (gradientType.value === 'linear') {
    return `background: linear-gradient(${direction.value}deg, ${stops});`
  }
  return `background: radial-gradient(circle, ${stops});`
})

const previewStyle = computed(() => {
  const stops = [...colorStops.value]
    .sort((a, b) => a.position - b.position)
    .map(s => `${s.color} ${s.position}%`)
    .join(', ')
  if (gradientType.value === 'linear') {
    return { backgroundImage: `linear-gradient(${direction.value}deg, ${stops})` }
  }
  return { backgroundImage: `radial-gradient(circle, ${stops})` }
})

function addStop() {
  colorStops.value.push({ id: Date.now().toString(), color: '#ffffff', position: 50 })
}

function removeStop(id: string) {
  if (colorStops.value.length > 2) {
    colorStops.value = colorStops.value.filter(s => s.id !== id)
  }
}

function updateStop(id: string, field: keyof ColorStop, value: string | number) {
  const stop = colorStops.value.find(s => s.id === id)
  if (stop) (stop as Record<string, string | number>)[field] = value
}

async function copyCss() {
  await navigator.clipboard.writeText(cssOutput.value)
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 })
    .fire({ icon: 'success', title: 'CSS copiado!' })
}

function randomGradient() {
  const randomHex = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
  colorStops.value = [
    { id: '1', color: randomHex(), position: 0 },
    { id: '2', color: randomHex(), position: 100 },
  ]
  direction.value = Math.floor(Math.random() * 360)
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1200 })
    .fire({ icon: 'success', title: 'Gradiente aleatório!' })
}

const presets = [
  { label: 'Pôr do Sol', stops: [{ color: '#f093fb', pos: 0 }, { color: '#f5576c', pos: 100 }], dir: 135 },
  { label: 'Oceano', stops: [{ color: '#4facfe', pos: 0 }, { color: '#00f2fe', pos: 100 }], dir: 90 },
  { label: 'Floresta', stops: [{ color: '#43e97b', pos: 0 }, { color: '#38f9d7', pos: 100 }], dir: 90 },
  { label: 'Aurora', stops: [{ color: '#a18cd1', pos: 0 }, { color: '#fbc2eb', pos: 100 }], dir: 135 },
  { label: 'Fogo', stops: [{ color: '#f7971e', pos: 0 }, { color: '#ffd200', pos: 100 }], dir: 90 },
  { label: 'Noite', stops: [{ color: '#0f0c29', pos: 0 }, { color: '#302b63', pos: 50 }, { color: '#24243e', pos: 100 }], dir: 90 },
]

function applyPreset(preset: typeof presets[0]) {
  colorStops.value = preset.stops.map((s, i) => ({ id: String(i + 1), color: s.color, position: s.pos }))
  direction.value = preset.dir
  gradientType.value = 'linear'
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:gradient-horizontal" class="text-blue-400 w-7 h-7" />
        Gerador de Gradiente CSS
      </h1>
      <p class="text-blue-200 text-sm">Crie gradientes lineares e radiais com código CSS pronto</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Controls -->
      <div class="space-y-5">
        <!-- Gradient Type -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
          <h2 class="text-white font-semibold">Configurações</h2>

          <div class="space-y-2">
            <label class="text-sm text-blue-200">Tipo de Gradiente</label>
            <div class="flex gap-2">
              <button v-for="type in [['linear','Linear'],['radial','Radial']]" :key="type[0]"
                @click="gradientType = type[0] as GradientType"
                :class="gradientType === type[0] ? 'bg-purple-600 text-white' : 'bg-white/5 text-blue-300 hover:text-white border border-white/10'"
                class="flex-1 py-2 rounded-lg text-sm font-medium transition-colors">
                {{ type[1] }}
              </button>
            </div>
          </div>

          <!-- Direction -->
          <div v-if="gradientType === 'linear'" class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-sm text-blue-200">Direção</label>
              <span class="text-xs text-blue-300 bg-white/5 px-2 py-0.5 rounded-full">{{ direction }}°</span>
            </div>
            <input type="range" v-model.number="direction" min="0" max="360" step="1"
              class="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500" />
          </div>

          <!-- Color Stops -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <label class="text-sm text-blue-200">Cores</label>
              <button @click="addStop"
                class="flex items-center gap-1 px-2.5 py-1 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-xs transition-colors">
                <Icon icon="mdi:plus" class="w-3.5 h-3.5" />
                Adicionar
              </button>
            </div>

            <div v-for="(stop, i) in colorStops" :key="stop.id"
              class="bg-[#0a1628] border border-white/5 rounded-lg p-3 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs text-blue-300">Cor {{ i + 1 }}</span>
                <button v-if="colorStops.length > 2" @click="removeStop(stop.id)"
                  class="text-red-400 hover:text-red-300 p-0.5">
                  <Icon icon="mdi:minus" class="w-3.5 h-3.5" />
                </button>
              </div>
              <div class="flex items-center gap-3">
                <input type="color" :value="stop.color"
                  @input="updateStop(stop.id, 'color', ($event.target as HTMLInputElement).value)"
                  class="w-10 h-8 rounded border border-white/10 bg-transparent cursor-pointer" />
                <input type="text" :value="stop.color"
                  @input="updateStop(stop.id, 'color', ($event.target as HTMLInputElement).value)"
                  class="flex-1 bg-[#0f1e3c] text-white border border-white/10 rounded px-2 py-1 text-xs font-mono focus:outline-none" />
              </div>
              <div class="space-y-1">
                <div class="flex justify-between text-xs text-blue-300">
                  <span>Posição</span>
                  <span>{{ stop.position }}%</span>
                </div>
                <input type="range" :value="stop.position"
                  @input="updateStop(stop.id, 'position', +($event.target as HTMLInputElement).value)"
                  min="0" max="100" step="1"
                  class="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500" />
              </div>
            </div>
          </div>

          <button @click="randomGradient"
            class="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors">
            <Icon icon="mdi:dice-multiple-outline" class="w-4 h-4" />
            Gradiente Aleatório
          </button>
        </div>

        <!-- Presets -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white">Presets</h3>
          <div class="grid grid-cols-3 gap-2">
            <button v-for="p in presets" :key="p.label" @click="applyPreset(p)"
              class="relative h-12 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all group"
              :style="{ backgroundImage: `linear-gradient(${p.dir}deg, ${p.stops.map(s => `${s.color} ${s.pos}%`).join(', ')})` }">
              <span class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white font-medium">{{ p.label }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Preview + CSS -->
      <div class="space-y-5">
        <!-- Preview -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
          <h2 class="text-white font-semibold">Pré-visualização</h2>
          <div class="h-56 rounded-xl border border-white/10" :style="previewStyle" />
        </div>

        <!-- CSS Output -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-white font-semibold">Código CSS</h2>
            <button @click="copyCss"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-xs transition-colors">
              <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" />
              Copiar
            </button>
          </div>
          <div class="bg-[#0a1628] rounded-lg p-4 border border-white/5">
            <code class="text-sm font-mono text-blue-300 break-all">{{ cssOutput }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
