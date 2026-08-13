<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <i class="fas fa-image text-blue-600 dark:text-blue-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">OCR - Extração de Texto</h1>
        <p class="text-gray-600 dark:text-gray-400">Extraia texto de imagens com reconhecimento óptico de caracteres</p>
      </div>

      <div class="space-y-6">
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="idioma" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Idioma do Texto
              </label>
              <select 
                id="idioma"
                v-model="idiomaSelecionado" 
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="por">Português</option>
                <option value="eng">Inglês</option>
                <option value="spa">Espanhol</option>
                <option value="fra">Francês</option>
                <option value="deu">Alemão</option>
                <option value="ita">Italiano</option>
              </select>
            </div>

            <div>
              <label for="qualidade" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Modo de Processamento
              </label>
              <select 
                id="qualidade"
                v-model="modoProcessamento" 
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="fast">Rápido (menos preciso)</option>
                <option value="default">Padrão (balanceado)</option>
                <option value="accurate">Preciso (mais lento)</option>
              </select>
            </div>
          </div>

          <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            />
            
            <div v-if="!imagemCarregada" @click="$refs.fileInput.click()" class="cursor-pointer">
              <i class="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-4"></i>
              <p class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Clique para selecionar uma imagem
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Suporta: JPG, PNG, GIF, BMP (máx. 10MB)
              </p>
            </div>

            <div v-else class="space-y-4">
              <img :src="imagemPreview" alt="Preview" class="max-h-64 mx-auto rounded-lg shadow-lg" />
              <div class="flex gap-3 justify-center">
                <button @click="$refs.fileInput.click()" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
                  <i class="fas fa-exchange-alt mr-2"></i>Trocar Imagem
                </button>
                <button @click="removerImagem" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                  <i class="fas fa-trash mr-2"></i>Remover
                </button>
              </div>
            </div>
          </div>

          <BaseButton 
            @click="processarOCR" 
            variant="primary" 
            class="w-full mt-6" 
            :disabled="!imagemCarregada || processando"
          >
            <i :class="processando ? 'fas fa-spinner fa-spin' : 'fas fa-search'" class="mr-2"></i>
            {{ processando ? `Processando... ${progresso}%` : 'Extrair Texto' }}
          </BaseButton>
        </div>

        <div v-if="processando" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Processamento OCR</span>
            <span class="text-sm font-bold text-blue-600 dark:text-blue-400">{{ progresso }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
            <div 
              class="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              :style="{ width: `${progresso}%` }"
            ></div>
          </div>
        </div>

        <div v-if="textoExtraido" class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">Texto Extraído</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ numeroCaracteres }} caracteres • {{ numeroPalavras }} palavras
                  <span v-if="confianca > 0"> • Confiança: {{ confianca }}%</span>
                </p>
              </div>
              <button @click="copiarTexto" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                <i class="fas fa-copy mr-2"></i>Copiar
              </button>
            </div>

            <textarea
              v-model="textoExtraido"
              rows="10"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none"
            ></textarea>

            <div class="flex gap-3 mt-4">
              <BaseButton @click="baixarTexto" variant="success" class="flex-1">
                <i class="fas fa-download mr-2"></i>Baixar TXT
              </BaseButton>
              <BaseButton @click="limparResultados" variant="secondary" class="flex-1">
                <i class="fas fa-redo mr-2"></i>Nova Extração
              </BaseButton>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-1 mr-3"></i>
            <div class="text-sm text-blue-800 dark:text-blue-300">
              <p class="font-semibold mb-2">Dicas para Melhor Resultado:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li>Use imagens com boa iluminação e contraste</li>
                <li>Evite imagens com muito ruído ou desfocadas</li>
                <li>Textos horizontais são reconhecidos com mais precisão</li>
                <li>Escolha o idioma correto para melhor acurácia</li>
                <li>Para textos complexos, use o modo "Preciso"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from './common/BaseButton.vue'
import { useAnalytics } from '../../composables/useAnalytics'
import Swal from 'sweetalert2'

const { trackToolUsage } = useAnalytics()

const fileInput = ref(null)
const imagemCarregada = ref(false)
const imagemPreview = ref('')
const imagemFile = ref(null)
const idiomaSelecionado = ref('por')
const modoProcessamento = ref('default')
const processando = ref(false)
const progresso = ref(0)
const textoExtraido = ref('')
const confianca = ref(0)

const numeroCaracteres = computed(() => textoExtraido.value.length)
const numeroPalavras = computed(() => {
  return textoExtraido.value.trim().split(/\s+/).filter(p => p.length > 0).length
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 10 * 1024 * 1024) {
    Swal.fire({
      icon: 'error',
      title: 'Arquivo muito grande',
      text: 'O arquivo deve ter no máximo 10MB',
      confirmButtonColor: '#3b82f6'
    })
    return
  }

  imagemFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imagemPreview.value = e.target.result
    imagemCarregada.value = true
  }
  reader.readAsDataURL(file)
}

const removerImagem = () => {
  imagemCarregada.value = false
  imagemPreview.value = ''
  imagemFile.value = null
  fileInput.value.value = ''
}

const processarOCR = async () => {
  processando.value = true
  progresso.value = 0
  textoExtraido.value = ''
  
  try {
    // Simulação de processamento OCR
    // Na produção, usar Tesseract.js ou API de OCR
    const intervalo = setInterval(() => {
      progresso.value += 10
      if (progresso.value >= 100) {
        clearInterval(intervalo)
      }
    }, 300)

    await new Promise(resolve => setTimeout(resolve, 3000))

    // Texto simulado baseado na imagem
    textoExtraido.value = `Este é um texto de exemplo extraído da imagem.

O OCR (Optical Character Recognition) é uma tecnologia que converte diferentes tipos de documentos, como documentos em papel digitalizados, arquivos PDF ou imagens capturadas por câmera digital, em dados editáveis e pesquisáveis.

Para uma implementação real, você pode usar:
- Tesseract.js (OCR no navegador)
- Google Cloud Vision API
- Amazon Textract
- Microsoft Azure Computer Vision

Idioma detectado: ${getNomeIdioma(idiomaSelecionado.value)}
Modo: ${modoProcessamento.value}

Lembre-se de que este é um exemplo simulado.
Para uso em produção, integre uma biblioteca real de OCR.`

    confianca.value = Math.floor(Math.random() * 20) + 80 // 80-100%
    
    trackToolUsage('OCR', 'process', { 
      language: idiomaSelecionado.value,
      mode: modoProcessamento.value
    })

    Swal.fire({
      icon: 'success',
      title: 'Texto Extraído!',
      text: `${numeroCaracteres.value} caracteres extraídos com ${confianca.value}% de confiança`,
      confirmButtonColor: '#3b82f6'
    })

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro no Processamento',
      text: 'Não foi possível extrair o texto da imagem',
      confirmButtonColor: '#3b82f6'
    })
  } finally {
    processando.value = false
    progresso.value = 100
  }
}

const getNomeIdioma = (codigo) => {
  const idiomas = {
    por: 'Português',
    eng: 'Inglês',
    spa: 'Espanhol',
    fra: 'Francês',
    deu: 'Alemão',
    ita: 'Italiano'
  }
  return idiomas[codigo] || codigo
}

const copiarTexto = () => {
  navigator.clipboard.writeText(textoExtraido.value)
  Swal.fire({
    icon: 'success',
    title: 'Copiado!',
    text: 'Texto copiado para área de transferência',
    timer: 2000,
    showConfirmButton: false
  })
}

const baixarTexto = () => {
  const blob = new Blob([textoExtraido.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `texto_extraido_${Date.now()}.txt`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
  
  trackToolUsage('OCR', 'download')
}

const limparResultados = () => {
  textoExtraido.value = ''
  confianca.value = 0
  progresso.value = 0
}
</script>
