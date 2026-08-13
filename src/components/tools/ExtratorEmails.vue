<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <i class="fas fa-at text-blue-600 dark:text-blue-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Extrator de E-mails</h1>
        <p class="text-gray-600 dark:text-gray-400">Extraia endereços de e-mail de qualquer texto</p>
      </div>

      <div class="space-y-6">
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <label for="textoEntrada" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cole o texto para extrair e-mails
          </label>
          <textarea
            id="textoEntrada"
            v-model="textoEntrada"
            rows="10"
            placeholder="Cole aqui o texto que contém e-mails... Exemplo: Entre em contato pelo email contato@exemplo.com ou suporte@empresa.com.br"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            @input="extrairEmails"
          ></textarea>
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <i class="fas fa-info-circle mr-1"></i>
            {{ textoEntrada.length }} caracteres
          </div>
        </div>

        <div class="flex gap-3">
          <BaseButton @click="extrairEmails" variant="primary" class="flex-1">
            <i class="fas fa-search mr-2"></i>Extrair E-mails
          </BaseButton>
          <BaseButton @click="limpar" variant="secondary" class="flex-1">
            <i class="fas fa-eraser mr-2"></i>Limpar
          </BaseButton>
        </div>

        <div v-if="emailsEncontrados.length > 0" class="space-y-4">
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                  E-mails Encontrados
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ emailsEncontrados.length }} e-mail(s) único(s)
                </p>
              </div>
              <div class="flex gap-2">
                <button @click="copiarLista" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                  <i class="fas fa-copy mr-2"></i>Copiar Lista
                </button>
                <button @click="exportarCSV" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">
                  <i class="fas fa-file-csv mr-2"></i>Exportar CSV
                </button>
              </div>
            </div>

            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div
                v-for="(email, index) in emailsEncontrados"
                :key="index"
                class="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg group hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <span class="text-sm font-mono text-gray-500 dark:text-gray-400">{{ index + 1 }}.</span>
                  <a :href="`mailto:${email}`" class="text-blue-600 dark:text-blue-400 hover:underline font-mono">
                    {{ email }}
                  </a>
                </div>
                <button
                  @click="copiarEmail(email)"
                  class="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-sm"
                >
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Estatísticas</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white dark:bg-gray-600 rounded-lg p-3 text-center">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ emailsEncontrados.length }}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">E-mails Únicos</div>
              </div>
              <div class="bg-white dark:bg-gray-600 rounded-lg p-3 text-center">
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ dominiosUnicos }}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">Domínios</div>
              </div>
              <div class="bg-white dark:bg-gray-600 rounded-lg p-3 text-center">
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ emailsComBR }}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">.com.br</div>
              </div>
              <div class="bg-white dark:bg-gray-600 rounded-lg p-3 text-center">
                <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ emailsGmail }}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">Gmail</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="textoEntrada.length > 0" class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
          <div class="flex">
            <i class="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400 mt-1 mr-3"></i>
            <div class="text-sm text-yellow-800 dark:text-yellow-300">
              <p class="font-semibold">Nenhum e-mail encontrado</p>
              <p>Verifique se o texto contém endereços de e-mail válidos.</p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-1 mr-3"></i>
            <div class="text-sm text-blue-800 dark:text-blue-300">
              <p class="font-semibold mb-2">Como usar:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li>Cole qualquer texto que contenha e-mails</li>
                <li>Os e-mails serão extraídos automaticamente</li>
                <li>Duplicados são removidos automaticamente</li>
                <li>Clique em um e-mail para copiar individualmente</li>
                <li>Use "Copiar Lista" para copiar todos de uma vez</li>
                <li>Exporte para CSV para usar em planilhas</li>
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

const textoEntrada = ref('')
const emailsEncontrados = ref([])

const dominiosUnicos = computed(() => {
  const dominios = new Set(emailsEncontrados.value.map(email => email.split('@')[1]))
  return dominios.size
})

const emailsComBR = computed(() => {
  return emailsEncontrados.value.filter(email => email.endsWith('.br')).length
})

const emailsGmail = computed(() => {
  return emailsEncontrados.value.filter(email => email.includes('@gmail.com')).length
})

const extrairEmails = () => {
  // Regex para validar e-mails
  const regexEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const emails = textoEntrada.value.match(regexEmail) || []
  
  // Remove duplicados e converte para minúsculas
  emailsEncontrados.value = [...new Set(emails.map(email => email.toLowerCase()))]
  
  if (emailsEncontrados.value.length > 0) {
    trackToolUsage('Extrator Emails', 'extract', { count: emailsEncontrados.value.length })
    
    Swal.fire({
      icon: 'success',
      title: 'E-mails Extraídos!',
      text: `${emailsEncontrados.value.length} e-mail(s) único(s) encontrado(s)`,
      confirmButtonColor: '#3b82f6'
    })
  }
}

const copiarEmail = (email) => {
  navigator.clipboard.writeText(email)
  Swal.fire({
    icon: 'success',
    title: 'Copiado!',
    text: `E-mail ${email} copiado`,
    timer: 1500,
    showConfirmButton: false
  })
}

const copiarLista = () => {
  const lista = emailsEncontrados.value.join('\n')
  navigator.clipboard.writeText(lista)
  
  trackToolUsage('Extrator Emails', 'copy')
  
  Swal.fire({
    icon: 'success',
    title: 'Lista Copiada!',
    text: `${emailsEncontrados.value.length} e-mails copiados`,
    timer: 2000,
    showConfirmButton: false
  })
}

const exportarCSV = () => {
  let csv = 'Email,Dominio\n'
  
  for (const email of emailsEncontrados.value) {
    const dominio = email.split('@')[1]
    csv += `${email},${dominio}\n`
  }
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `emails_${Date.now()}.csv`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
  
  trackToolUsage('Extrator Emails', 'export')
  
  Swal.fire({
    icon: 'success',
    title: 'CSV Exportado!',
    timer: 2000,
    showConfirmButton: false
  })
}

const limpar = () => {
  textoEntrada.value = ''
  emailsEncontrados.value = []
}
</script>
