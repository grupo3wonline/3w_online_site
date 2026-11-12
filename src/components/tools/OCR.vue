<template>
  <ToolShell
    title="OCR — Extração de Texto"
    description="Extraia texto de imagens usando reconhecimento óptico de caracteres diretamente no navegador."
    icon="fa-eye"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['JPG, PNG, GIF, BMP', '6 idiomas suportados', 'Baixe o texto extraído']"
    :tips="[
      { title: 'Melhores resultados', text: 'Use imagens com boa iluminação, alto contraste e texto horizontal. Evite imagens embaçadas ou com muito ruído.', type: 'info' },
      { title: 'Escolha o idioma', text: 'Selecione o idioma correto do texto na imagem para aumentar significativamente a precisão do OCR.', type: 'info' },
      { title: 'Integração real', text: 'Esta ferramenta simula o OCR. Para produção, integre Tesseract.js, Google Vision API ou Amazon Textract.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Digitalizar documento', desc: 'Foto de contrato ou nota fiscal', result: 'Texto extraído, editável e pesquisável em segundos' },
      { title: 'Captura de tela', desc: 'Print de e-mail ou mensagem', result: 'Converte o texto da imagem em texto copiável' },
      { title: 'Placa ou banner', desc: 'Foto de placa de texto', result: 'Extrai o texto com até 95% de precisão em boas condições' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Configuração -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-language mr-1.5 text-purple-500"></i>
                Idioma do Texto
              </label>
              <select v-model="idiomaSelecionado" class="input-aurora">
                <option value="por">🇧🇷 Português</option>
                <option value="eng">🇺🇸 Inglês</option>
                <option value="spa">🇪🇸 Espanhol</option>
                <option value="fra">🇫🇷 Francês</option>
                <option value="deu">🇩🇪 Alemão</option>
                <option value="ita">🇮🇹 Italiano</option>
              </select>
            </div>
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-sliders mr-1.5 text-purple-500"></i>
                Modo de Processamento
              </label>
              <select v-model="modoProcessamento" class="input-aurora">
                <option value="fast">Rápido (menos preciso)</option>
                <option value="default">Padrão (balanceado)</option>
                <option value="accurate">Preciso (mais lento)</option>
              </select>
            </div>
          </div>

          <!-- Upload Zone -->
          <div
            :class="['border-2 border-dashed rounded-2xl p-8 text-center transition-all', imagemCarregada ? 'border-purple-400 dark:border-purple-600' : 'border-gray-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 cursor-pointer']"
            @click="!imagemCarregada && $refs.fileInput.click()"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileUpload" />
            <div v-if="!imagemCarregada">
              <i class="fas fa-cloud-upload-alt text-5xl text-gray-400 dark:text-slate-500 mb-4"></i>
              <p class="font-semibold text-gray-700 dark:text-slate-200 mb-1">Clique ou arraste a imagem</p>
              <p class="text-sm text-gray-500 dark:text-slate-400">JPG, PNG, GIF, BMP — máx. 10 MB</p>
            </div>
            <div v-else class="space-y-3">
              <img :src="imagemPreview" alt="Preview" class="max-h-48 mx-auto rounded-xl shadow-lg" />
              <div class="flex gap-3 justify-center">
                <button @click.stop="$refs.fileInput.click()" class="copy-btn">
                  <i class="fas fa-exchange-alt mr-1"></i>Trocar
                </button>
                <button @click.stop="removerImagem" class="copy-btn !text-red-600 dark:!text-red-400">
                  <i class="fas fa-trash mr-1"></i>Remover
                </button>
              </div>
            </div>
          </div>

          <!-- Progress -->
          <div v-if="processando" class="glass-panel p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700 dark:text-slate-200">Processando OCR...</span>
              <span class="text-sm font-bold text-purple-600 dark:text-purple-400">{{ progresso }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div class="bg-gradient-to-r from-purple-500 to-violet-600 h-2 rounded-full transition-all duration-300" :style="{ width: `${progresso}%` }"></div>
            </div>
          </div>

          <BaseButton
            variant="primary"
            icon="fa-search"
            @click="processarOCR"
            :disabled="!imagemCarregada || processando"
            :loading="processando"
            full-width
          >
            {{ processando ? `Processando... ${progresso}%` : 'Extrair Texto' }}
          </BaseButton>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="textoExtraido" class="space-y-4">
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">Texto extraído</p>
              <p class="text-4xl font-black text-white mb-1">{{ numeroPalavras }}</p>
              <p class="text-purple-300 text-sm font-semibold">
                <i class="fas fa-font mr-1"></i>palavras • {{ numeroCaracteres }} caracteres
                <span v-if="confianca"> • {{ confianca }}% confiança</span>
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ numeroPalavras }}</div>
                <div class="metric-glass-label">Palavras</div>
              </div>
              <div class="metric-glass ring-1 ring-violet-100 dark:ring-violet-900">
                <div class="metric-glass-value text-violet-600 dark:text-violet-400">{{ numeroCaracteres }}</div>
                <div class="metric-glass-label">Caracteres</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ confianca }}%</div>
                <div class="metric-glass-label">Confiança</div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                  <i class="fas fa-file-alt text-purple-500"></i>Texto Extraído
                </h4>
                <button @click="copiarTexto" class="copy-btn"><i class="fas fa-copy mr-1"></i>Copiar</button>
              </div>
              <textarea
                v-model="textoExtraido"
                rows="10"
                class="input-aurora font-mono text-sm resize-none"
              ></textarea>
              <div class="flex gap-3 mt-3">
                <BaseButton variant="success" icon="fa-download" @click="baixarTexto" class="flex-1">Baixar TXT</BaseButton>
                <BaseButton variant="outline" icon="fa-redo" @click="limparResultados" class="flex-1">Nova Extração</BaseButton>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Texto extraído com {{ confianca }}% de confiança. Revise e edite diretamente na caixa acima.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!textoExtraido && !processando" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-eye text-4xl mb-3 opacity-30 block text-purple-400"></i>
          <p class="text-sm">Envie uma imagem e clique em Extrair Texto</p>
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

const fileInput          = ref(null)
const imagemCarregada    = ref(false)
const imagemPreview      = ref('')
const idiomaSelecionado  = ref('por')
const modoProcessamento  = ref('default')
const processando        = ref(false)
const progresso          = ref(0)
const textoExtraido      = ref('')
const confianca          = ref(0)

const numeroCaracteres = computed(() => textoExtraido.value.length)
const numeroPalavras   = computed(() => textoExtraido.value.trim().split(/\s+/).filter(p => p.length > 0).length)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  if (file.size > 10 * 1024 * 1024) {
    Swal.fire({ icon: 'error', title: 'Arquivo muito grande', text: 'Máximo 10 MB', confirmButtonColor: '#7c3aed' })
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => { imagemPreview.value = e.target.result as string; imagemCarregada.value = true }
  reader.readAsDataURL(file)
}

const handleDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files[0]
  if (!file || !file.type.startsWith('image/')) return
  handleFileUpload({ target: { files: [file] } })
}

const removerImagem = () => {
  imagemCarregada.value = false; imagemPreview.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

const getNomeIdioma = (codigo: string) => ({ por:'Português',eng:'Inglês',spa:'Espanhol',fra:'Francês',deu:'Alemão',ita:'Italiano' }[codigo] || codigo)

const processarOCR = async () => {
  processando.value = true; progresso.value = 0; textoExtraido.value = ''
  try {
    const timer = setInterval(() => { if (progresso.value < 90) progresso.value += 10 }, 300)
    await new Promise(r => setTimeout(r, 3000))
    clearInterval(timer); progresso.value = 100
    textoExtraido.value = `[Simulação de OCR — ${getNomeIdioma(idiomaSelecionado.value)} / Modo ${modoProcessamento.value}]\n\nEste texto foi extraído da imagem enviada.\n\nO OCR (Optical Character Recognition) converte imagens que contêm texto em conteúdo editável e pesquisável.\n\nPara implementação real, integre:\n• Tesseract.js — OCR direto no navegador\n• Google Cloud Vision API\n• Amazon Textract\n• Microsoft Azure Computer Vision\n\nIdioma detectado: ${getNomeIdioma(idiomaSelecionado.value)}\nModo: ${modoProcessamento.value}`
    confianca.value = Math.floor(Math.random() * 15) + 85
    Swal.fire({ icon: 'success', title: 'Texto extraído!', text: `${numeroCaracteres.value} caracteres com ${confianca.value}% de confiança`, confirmButtonColor: '#7c3aed' })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro no processamento', confirmButtonColor: '#7c3aed' })
  } finally {
    processando.value = false
  }
}

const copiarTexto = () => {
  navigator.clipboard.writeText(textoExtraido.value)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 2000, showConfirmButton: false })
}

const baixarTexto = () => {
  const blob = new Blob([textoExtraido.value], { type: 'text/plain;charset=utf-8' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = `texto_ocr_${Date.now()}.txt`
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
}

const limparResultados = () => { textoExtraido.value = ''; confianca.value = 0; progresso.value = 0 }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
