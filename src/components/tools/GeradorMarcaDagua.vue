<template>
  <ToolShell
    title="Gerador de Marca d'Água"
    description="Adicione marcas d'água de texto em imagens diretamente no navegador. Configuração de posição, opacidade, cor e tamanho da fonte."
    icon="fa-copyright"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Processamento local', '7 posições', 'Download PNG']"
    :tips="[
      { title: 'Privacidade total', text: 'O processamento é feito 100% no seu navegador. A imagem nunca é enviada para nenhum servidor.' },
      { title: 'Opacidade ideal', text: 'Uma opacidade entre 30% e 60% protege a imagem sem prejudicar o conteúdo visual.', type: 'info' },
      { title: 'Marca em diagonal', text: 'O modo diagonal (repetida) é o mais eficaz para proteção de conteúdo, pois dificulta o recorte da marca.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Fotografia', desc: 'Texto: © 2024 Fotógrafo, Posição: Inferior direita, Opacidade: 50%', result: 'Imagem com assinatura discreta no canto' },
      { title: 'Documento', desc: 'Texto: CONFIDENCIAL, Posição: Central, Opacidade: 20%', result: 'Marca d\'água sobreposta ao documento' },
      { title: 'Cobertura total', desc: 'Modo: Diagonal, Texto: © Empresa, Repetições', result: 'Imagem com marcas repetidas em diagonal' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Upload de imagem -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-image mr-1.5 text-blue-500"></i>
              Imagem base
            </label>
            <label
              class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all"
              :class="imagemSrc ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-300 dark:border-slate-600 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/5'"
            >
              <div class="text-center" v-if="!imagemSrc">
                <i class="fas fa-cloud-upload-alt text-2xl text-gray-400 mb-2 block"></i>
                <p class="text-sm text-gray-500 dark:text-slate-400">Clique ou arraste uma imagem</p>
                <p class="text-xs text-gray-400 dark:text-slate-500 mt-0.5">PNG, JPG, WEBP</p>
              </div>
              <div class="text-center" v-else>
                <i class="fas fa-check-circle text-2xl text-blue-500 mb-1 block"></i>
                <p class="text-xs text-blue-600 dark:text-blue-400 font-semibold">{{ nomeArquivo }}</p>
              </div>
              <input type="file" accept="image/*" class="hidden" @change="carregarImagem" />
            </label>
          </div>

          <BaseInput
            v-model="texteMarca"
            label="Texto da marca d'água"
            icon="fa-copyright"
            placeholder="© 2024 Empresa"
            tooltip="O texto que aparecerá como marca d'água sobre a imagem."
          />

          <!-- Posição -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-crosshairs mr-1.5 text-indigo-500"></i>
              Posição
            </label>
            <div class="grid grid-cols-3 gap-1.5">
              <button
                v-for="pos in posicoes"
                :key="pos.id"
                @click="posicao = pos.id"
                :class="[
                  'p-2 rounded-xl border-2 text-xs transition-all',
                  posicao === pos.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-blue-300'
                ]"
              >
                <i :class="[pos.icon, 'block mb-0.5']"></i>
                {{ pos.nome }}
              </button>
            </div>
          </div>

          <!-- Configurações de estilo -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-tint mr-1 text-blue-400"></i>
                Cor do texto
              </label>
              <input v-model="corTexto" type="color" class="w-full h-10 rounded-xl cursor-pointer border border-gray-200 dark:border-slate-700" />
            </div>
            <BaseInput
              v-model="tamanhoFonte"
              label="Tamanho (px)"
              type="number"
              :min="8"
              :max="200"
              icon="fa-text-height"
            />
          </div>

          <div>
            <label class="input-aurora-label">
              <i class="fas fa-adjust mr-1.5 text-blue-400"></i>
              Opacidade: {{ opacidade }}%
            </label>
            <input v-model="opacidade" type="range" min="5" max="100" step="5" class="range-aurora w-full" />
          </div>

          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="diagonal" type="checkbox" class="checkbox-aurora" />
            <span class="text-sm text-gray-700 dark:text-slate-200">Modo diagonal (repetida)</span>
          </label>

          <div class="flex gap-3">
            <BaseButton variant="success" icon="fa-magic" @click="aplicarMarca" class="flex-1" :disabled="!imagemSrc">
              Aplicar Marca
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Preview + Download -->
      <div>
        <Transition name="scale-in">
          <div v-if="resultadoSrc" class="space-y-4">
            <!-- Preview -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-eye text-blue-500"></i>
                Preview
              </h4>
              <img :src="resultadoSrc" alt="Resultado" class="w-full rounded-xl shadow" />
            </div>

            <!-- Download -->
            <BaseButton variant="primary" icon="fa-download" @click="baixar" class="w-full">
              Baixar PNG com marca d'água
            </BaseButton>

            <div class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Processamento 100% local — sua imagem não foi enviada para nenhum servidor.</span>
            </div>
          </div>
        </Transition>

        <!-- Canvas oculto para processamento -->
        <canvas ref="canvasRef" class="hidden"></canvas>

        <!-- Estado vazio -->
        <div v-if="!resultadoSrc" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-copyright text-3xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Faça upload de uma imagem e configure a marca d'água</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const posicoes = [
  { id: 'top-left',      nome: 'Sup. Esq.',  icon: 'fas fa-arrow-up-left' },
  { id: 'top-center',    nome: 'Sup. Centro',icon: 'fas fa-arrow-up' },
  { id: 'top-right',     nome: 'Sup. Dir.',  icon: 'fas fa-arrow-up-right' },
  { id: 'center',        nome: 'Centro',     icon: 'fas fa-crosshairs' },
  { id: 'bottom-left',   nome: 'Inf. Esq.',  icon: 'fas fa-arrow-down-left' },
  { id: 'bottom-center', nome: 'Inf. Centro',icon: 'fas fa-arrow-down' },
  { id: 'bottom-right',  nome: 'Inf. Dir.',  icon: 'fas fa-arrow-down-right' },
]

const imagemSrc    = ref('')
const nomeArquivo  = ref('')
const texteMarca   = ref('© 2024 Empresa')
const posicao      = ref('bottom-right')
const corTexto     = ref('#ffffff')
const tamanhoFonte = ref(32)
const opacidade    = ref(50)
const diagonal     = ref(false)
const resultadoSrc = ref('')
const canvasRef    = ref(null)

const imagemOriginal = ref(null)

const carregarImagem = (e) => {
  const file = e.target.files[0]
  if (!file) return
  nomeArquivo.value = file.name
  const reader = new FileReader()
  reader.onload = (ev) => { imagemSrc.value = ev.target.result }
  reader.readAsDataURL(file)
}

const aplicarMarca = () => {
  if (!imagemSrc.value) return

  const canvas = canvasRef.value
  const img    = new Image()
  img.onload = () => {
    canvas.width  = img.width
    canvas.height = img.height
    const ctx     = canvas.getContext('2d')

    // Desenhar imagem original
    ctx.drawImage(img, 0, 0)

    const fontSize = Number(tamanhoFonte.value)
    ctx.font       = `bold ${fontSize}px Arial`
    ctx.fillStyle  = corTexto.value
    ctx.globalAlpha = opacidade.value / 100

    if (diagonal.value) {
      // Modo diagonal repetida
      ctx.save()
      ctx.rotate(-Math.PI / 6)
      const stepX = img.width / 3
      const stepY = img.height / 4
      for (let x = -img.width; x < img.width * 2; x += stepX) {
        for (let y = -img.height; y < img.height * 2; y += stepY) {
          ctx.fillText(texteMarca.value, x, y)
        }
      }
      ctx.restore()
    } else {
      // Posição fixa
      const pad = 20
      const tw  = ctx.measureText(texteMarca.value).width
      let x = pad; let y = fontSize + pad
      if (posicao.value.includes('right'))  x = img.width - tw - pad
      if (posicao.value.includes('center') && !posicao.value.includes('bottom') && !posicao.value.includes('top')) {
        x = (img.width - tw) / 2; y = (img.height + fontSize) / 2
      }
      if (posicao.value.includes('top-center'))    { x = (img.width - tw) / 2; y = fontSize + pad }
      if (posicao.value.includes('bottom-center')) { x = (img.width - tw) / 2; y = img.height - pad }
      if (posicao.value.includes('bottom-left'))   { x = pad; y = img.height - pad }
      if (posicao.value.includes('bottom-right'))  { x = img.width - tw - pad; y = img.height - pad }
      if (posicao.value.includes('center') && !posicao.value.includes('top') && !posicao.value.includes('bottom')) {
        x = (img.width - tw) / 2; y = (img.height + fontSize) / 2
      }
      ctx.fillText(texteMarca.value, x, y)
    }

    ctx.globalAlpha = 1
    resultadoSrc.value = canvas.toDataURL('image/png')
  }
  img.src = imagemSrc.value
}

const baixar = () => {
  if (!resultadoSrc.value) return
  const link = document.createElement('a')
  link.href  = resultadoSrc.value
  link.download = `imagem-marca-dagua-${Date.now()}.png`
  link.click()
  Swal.fire({ icon: 'success', title: 'Download iniciado!', timer: 1500, showConfirmButton: false })
}

const limpar = () => {
  imagemSrc.value = ''; nomeArquivo.value = ''; resultadoSrc.value = ''
  texteMarca.value = '© 2024 Empresa'; posicao.value = 'bottom-right'
  corTexto.value = '#ffffff'; tamanhoFonte.value = 32; opacidade.value = 50; diagonal.value = false
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
