<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const largura = ref(400)
const altura = ref(300)
const bgColor = ref('#1e40af')
const textColor = ref('#ffffff')
const texto = ref('')
const fontSize = ref(24)
const formato = ref('png')
const previewUrl = ref('')

const canvasRef = ref<HTMLCanvasElement | null>(null)

const textoFinal = computed(() => texto.value || `${largura.value}×${altura.value}`)

function gerarImagem() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = largura.value
  canvas.height = altura.value
  const ctx = canvas.getContext('2d')!
  
  // Background
  ctx.fillStyle = bgColor.value
  ctx.fillRect(0, 0, largura.value, altura.value)
  
  // Cross lines (placeholder style)
  ctx.strokeStyle = textColor.value + '33'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(largura.value, altura.value)
  ctx.moveTo(largura.value, 0)
  ctx.lineTo(0, altura.value)
  ctx.stroke()
  
  // Border
  ctx.strokeStyle = textColor.value + '66'
  ctx.lineWidth = 2
  ctx.strokeRect(1, 1, largura.value - 2, altura.value - 2)
  
  // Text
  ctx.fillStyle = textColor.value
  ctx.font = `bold ${fontSize.value}px sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(textoFinal.value, largura.value / 2, altura.value / 2)
  
  previewUrl.value = canvas.toDataURL(`image/${formato.value}`)
}

function baixar() {
  const a = document.createElement('a')
  a.href = previewUrl.value
  a.download = `imagem-placeholder-${largura.value}x${altura.value}.${formato.value}`
  a.click()
}

function copiarURL() {
  const url = `https://via.placeholder.com/${largura.value}x${altura.value}/${bgColor.value.slice(1)}/${textColor.value.slice(1)}?text=${encodeURIComponent(textoFinal.value)}`
  navigator.clipboard.writeText(url)
  Swal.fire({ icon: 'success', title: 'URL copiada!', timer: 1000, showConfirmButton: false })
}

const presets = [
  { l: '1920', a: '1080', n: 'Full HD (1920×1080)' },
  { l: '1280', a: '720', n: 'HD (1280×720)' },
  { l: '800', a: '600', n: 'SVGA (800×600)' },
  { l: '400', a: '300', n: 'Web padrão (400×300)' },
  { l: '300', a: '250', n: 'Banner médio (300×250)' },
  { l: '728', a: '90', n: 'Leaderboard (728×90)' },
  { l: '160', a: '600', n: 'Skyscraper (160×600)' },
  { l: '1200', a: '630', n: 'Open Graph (1200×630)' },
  { l: '1080', a: '1080', n: 'Instagram Square' },
  { l: '1080', a: '1920', n: 'Stories (1080×1920)' },
]

function aplicarPreset(p: typeof presets[0]) {
  largura.value = parseInt(p.l); altura.value = parseInt(p.a)
  gerarImagem()
}

onMounted(gerarImagem)
</script>

<template>
  <ToolShell title="Gerador de Imagem Placeholder" description="Gere imagens placeholder personalizadas com tamanho, cor e texto customizáveis."
    icon="fa-image" icon-gradient="from-teal-500 to-green-700" orb-color="teal"
    :quick-tips="['Tamanho livre','Download PNG/JPEG','Presets prontos']"
    :tips="[{title:'Uso',text:'Configure largura, altura, cores e texto. Baixe a imagem ou copie a URL.'}]">

    <canvas ref="canvasRef" class="hidden" />

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Configurações -->
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white">Dimensões</h3>
          <div class="grid grid-cols-2 gap-2">
            <div><label class="text-xs text-blue-300 mb-1 block">Largura (px)</label><input v-model.number="largura" type="number" min="1" max="4000" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1 block">Altura (px)</label><input v-model.number="altura" type="number" min="1" max="4000" class="w-full input-aurora" /></div>
          </div>
        </div>

        <div class="glass-panel p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white">Cores</h3>
          <div class="grid grid-cols-2 gap-2">
            <div><label class="text-xs text-blue-300 mb-1 block">Background</label><div class="flex gap-2"><input v-model="bgColor" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent" /><input v-model="bgColor" class="flex-1 input-aurora" /></div></div>
            <div><label class="text-xs text-blue-300 mb-1 block">Texto</label><div class="flex gap-2"><input v-model="textColor" type="color" class="w-10 h-9 rounded border border-white/10 bg-transparent" /><input v-model="textColor" class="flex-1 input-aurora" /></div></div>
          </div>
        </div>

        <div class="glass-panel p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white">Texto</h3>
          <input v-model="texto" class="w-full input-aurora" :placeholder="`${largura}×${altura}`" />
          <div><label class="text-xs text-blue-300 mb-1 block">Tamanho da fonte</label><input v-model.number="fontSize" type="number" min="8" max="200" class="w-24 input-aurora" /></div>
          <div><label class="text-xs text-blue-300 mb-1 block">Formato</label><select v-model="formato" class="input-aurora"><option value="png">PNG</option><option value="jpeg">JPEG</option><option value="webp">WebP</option></select></div>
        </div>

        <button @click="gerarImagem" class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold transition-colors">
          <Icon icon="mdi:image-edit-outline" class="w-4 h-4" /> Gerar Imagem
        </button>

        <div class="flex gap-2">
          <button @click="baixar" class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-colors">
            <Icon icon="mdi:download" class="w-4 h-4" /> Baixar
          </button>
          <button @click="copiarURL" class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 text-blue-300 border border-white/10 rounded-lg text-sm transition-colors">
            <Icon icon="mdi:link" class="w-4 h-4" /> URL
          </button>
        </div>

        <div class="glass-panel p-3 space-y-1.5">
          <p class="text-xs font-semibold text-blue-300 mb-2">Presets</p>
          <button v-for="p in presets" :key="p.n" @click="aplicarPreset(p)"
            class="w-full text-left text-xs text-blue-300 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors">
            {{ p.n }}
          </button>
        </div>
      </div>

      <!-- Preview -->
      <div class="lg:col-span-2">
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Preview</h3>
        <div class="rounded-xl overflow-hidden border border-white/10 bg-checkerboard">
          <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="max-w-full h-auto" style="max-height:60vh;object-fit:contain" />
        </div>
        <p class="text-xs text-blue-400 mt-2 text-center">{{ largura }} × {{ altura }} px</p>
      </div>
    </div>
  </ToolShell>
</template>

<style scoped>
.bg-checkerboard {
  background-image: repeating-conic-gradient(#ffffff12 0% 25%, transparent 0% 50%);
  background-size: 20px 20px;
}
</style>
