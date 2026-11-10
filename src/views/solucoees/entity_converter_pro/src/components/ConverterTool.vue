<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { charactersData } from '../data/characters'
import Swal from 'sweetalert2'

const inputText = ref('')
const outputText = ref('')
const lgpdAccepted = ref(false)
const isConverting = ref(false)

const canCopy = computed(() => outputText.value !== '' && lgpdAccepted.value)

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  }
})

const convertText = async () => {
  if (!inputText.value.trim()) {
    await Swal.fire({
      icon: 'warning',
      title: 'Atenção',
      text: 'Por favor, digite algum texto para realizar a conversão.',
      confirmButtonText: 'Entendi',
      confirmButtonColor: '#3b82f6'
    })
    return
  }
  
  isConverting.value = true
  
  // Simular pequeno delay para feedback visual
  await new Promise(resolve => setTimeout(resolve, 300))
  
  let converted = inputText.value
  charactersData.forEach(item => {
    const regex = new RegExp(escapeRegExp(item.char), 'g')
    converted = converted.replace(regex, item.entity)
  })
  
  outputText.value = converted
  isConverting.value = false
  
  Toast.fire({
    icon: 'success',
    title: 'Texto convertido com sucesso!'
  })
  
  // Google Analytics Event
  if (window.gtag) {
    window.gtag('event', 'text_converted', {
      text_length: inputText.value.length,
      converted_length: converted.length
    })
  }
}

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const copyToClipboard = async () => {
  if (!lgpdAccepted.value) {
    await Swal.fire({
      icon: 'info',
      title: 'Aceite os Termos',
      text: 'Para copiar o conteúdo, você deve ler e aceitar os Termos de Uso e a Política de Privacidade.',
      confirmButtonText: 'Entendi',
      confirmButtonColor: '#3b82f6'
    })
    return
  }
  
  try {
    await navigator.clipboard.writeText(outputText.value)
    
    Toast.fire({
      icon: 'success',
      title: 'Código copiado para a área de transferência!'
    })
    
    // Google Analytics Event
    if (window.gtag) {
      window.gtag('event', 'text_copied', {
        text_length: outputText.value.length
      })
    }
  } catch (err) {
    console.error('Erro ao copiar:', err)
    await Swal.fire({
      icon: 'error',
      title: 'Erro ao Copiar',
      text: 'Não foi possível copiar automaticamente. Tente selecionar e copiar manualmente.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3b82f6'
    })
  }
}

const clearFields = () => {
  inputText.value = ''
  outputText.value = ''
  
  Toast.fire({
    icon: 'info',
    title: 'Campos limpos!'
  })
}

const showHelp = async () => {
  await Swal.fire({
    icon: 'question',
    title: 'Como Usar',
    html: `
      <div class="text-left">
        <p class="mb-3"><strong>1.</strong> Cole ou digite seu texto na área de entrada</p>
        <p class="mb-3"><strong>2.</strong> Clique em "Converter Texto"</p>
        <p class="mb-3"><strong>3.</strong> Aceite os termos marcando o checkbox</p>
        <p><strong>4.</strong> Copie o resultado convertido</p>
      </div>
    `,
    confirmButtonText: 'Entendi',
    confirmButtonColor: '#3b82f6'
  })
}
</script>

<template>
  <section id="ferramenta" class="p-4 md:p-8 bg-gray-100 dark:bg-gray-800 border-t-8 border-yellow-400">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          <i class="fas fa-wrench text-yellow-500 mr-3"></i> Sua Ferramenta de Conversão Imediata
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Converta caracteres especiais em HTML Entities de forma rápida, segura e profissional
        </p>
      </div>

      <div class="card mb-12">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
            <i class="fas fa-magic text-blue-500 mr-3"></i> Conversor de Caracteres para Entities
          </h3>
          <button 
            @click="showHelp"
            class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            title="Ajuda - Como usar a ferramenta"
            aria-label="Ajuda"
          >
            <i class="fas fa-question-circle text-lg"></i>
          </button>
        </div>
        
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Insira o seu texto abaixo. A ferramenta substituirá automaticamente caracteres acentuados (como
          <strong>á, ç, ü</strong>) e especiais (como <strong>&lt;, &gt;</strong>) pelos seus respectivos códigos
          HTML Entities.
        </p>

        <div class="flex flex-col lg:flex-row lg:space-x-8 gap-6">
          <!-- Área de Input -->
          <div class="w-full lg:w-1/2">
            <label for="inputText" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-keyboard mr-1"></i> Texto Original
              <span 
                class="ml-2 text-xs text-gray-500 cursor-help" 
                title="Digite ou cole aqui o texto que deseja converter"
              >
                <i class="fas fa-info-circle"></i>
              </span>
            </label>
            <textarea
              v-model="inputText"
              id="inputText"
              rows="8"
              placeholder="Digite ou cole seu texto com acentuações e caracteres especiais aqui..."
              class="input-field resize-none"
              autocomplete="off"
              spellcheck="false"
            ></textarea>
            
            <div class="flex items-center justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{{ inputText.length }} caracteres</span>
              <button 
                v-if="inputText.length > 0"
                @click="clearFields"
                class="text-red-500 hover:text-red-700 flex items-center gap-1"
                title="Limpar campos"
              >
                <i class="fas fa-trash-alt"></i> Limpar
              </button>
            </div>
          </div>

          <!-- Área de Output -->
          <div class="w-full lg:w-1/2">
            <label for="outputText" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-code mr-1"></i> Entities HTML Geradas
              <span 
                class="ml-2 text-xs text-gray-500 cursor-help" 
                title="O resultado da conversão aparecerá aqui"
              >
                <i class="fas fa-info-circle"></i>
              </span>
            </label>
            <textarea
              v-model="outputText"
              id="outputText"
              rows="8"
              readonly
              placeholder="O resultado da conversão aparecerá aqui..."
              class="input-field resize-none bg-gray-50 dark:bg-gray-700"
              autocomplete="off"
            ></textarea>

            <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {{ outputText.length }} caracteres
            </div>

            <!-- Botão de Conversão -->
            <button
              @click="convertText"
              :disabled="isConverting"
              class="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2"
            >
              <i :class="isConverting ? 'fas fa-spinner fa-spin' : 'fas fa-arrows-alt-h'"></i>
              {{ isConverting ? 'Convertendo...' : 'Converter Texto' }}
            </button>

            <!-- Checkbox LGPD -->
            <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <label class="flex items-start text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  v-model="lgpdAccepted"
                  type="checkbox"
                  class="mt-0.5 h-4 w-4 text-green-600 rounded focus:ring-green-500"
                  autocomplete="off"
                >
                <span class="ml-2">
                  Li e aceito os
                  <RouterLink to="/termos-de-uso" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 underline font-semibold">Termos de Uso</RouterLink>
                  e a
                  <RouterLink to="/politica-de-privacidade" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 underline font-semibold">Política de Privacidade</RouterLink>.
                </span>
              </label>
            </div>

            <!-- Botão de Copiar -->
            <button
              @click="copyToClipboard"
              :disabled="!canCopy"
              :class="[
                'w-full mt-3 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2',
                canCopy
                  ? 'bg-green-600 hover:bg-green-700 text-white hover:scale-[1.02] cursor-pointer'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              ]"
              :title="!canCopy ? 'Aceite os termos e converta o texto primeiro' : 'Copiar resultado'"
            >
              <i class="fas fa-copy"></i> Copiar Entities
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
