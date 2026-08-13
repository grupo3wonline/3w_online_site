<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-link text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Links UTM</h1>
        <p class="text-gray-600 dark:text-gray-400">Crie links com parâmetros UTM para rastreamento de campanhas</p>
      </div>

      <div class="space-y-6">
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 space-y-4">
          <div>
            <label for="urlBase" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL Base *
            </label>
            <input
              id="urlBase"
              v-model="urlBase"
              type="url"
              placeholder="https://seusite.com/pagina"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label for="utmSource" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                UTM Source * <span class="text-xs text-gray-500">(origem do tráfego)</span>
              </label>
              <input
                id="utmSource"
                v-model="utmSource"
                type="text"
                placeholder="google, facebook, newsletter"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label for="utmMedium" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                UTM Medium * <span class="text-xs text-gray-500">(tipo de mídia)</span>
              </label>
              <input
                id="utmMedium"
                v-model="utmMedium"
                type="text"
                placeholder="cpc, email, social, banner"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label for="utmCampaign" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              UTM Campaign * <span class="text-xs text-gray-500">(nome da campanha)</span>
            </label>
            <input
              id="utmCampaign"
              v-model="utmCampaign"
              type="text"
              placeholder="black_friday_2025, lancamento_produto"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label for="utmTerm" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                UTM Term <span class="text-xs text-gray-500">(palavra-chave)</span>
              </label>
              <input
                id="utmTerm"
                v-model="utmTerm"
                type="text"
                placeholder="desconto, promoção"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label for="utmContent" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                UTM Content <span class="text-xs text-gray-500">(conteúdo)</span>
              </label>
              <input
                id="utmContent"
                v-model="utmContent"
                type="text"
                placeholder="banner_principal, link_texto"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <BaseButton @click="gerarLink" variant="primary" class="w-full" :disabled="!podeGerar">
          <i class="fas fa-magic mr-2"></i>Gerar Link UTM
        </BaseButton>

        <div v-if="linkGerado" class="space-y-4">
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <div class="flex justify-between items-center mb-3">
              <h3 class="font-bold text-gray-900 dark:text-white">Link Gerado</h3>
              <div class="flex gap-2">
                <button @click="copiarLink" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                  <i class="fas fa-copy mr-2"></i>Copiar
                </button>
                <button @click="encurtarLink" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm">
                  <i class="fas fa-compress mr-2"></i>Encurtar
                </button>
              </div>
            </div>
            
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm break-all">
              {{ linkGerado }}
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Parâmetros UTM</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">utm_source:</span>
                <span class="font-mono text-gray-900 dark:text-white">{{ utmSource }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">utm_medium:</span>
                <span class="font-mono text-gray-900 dark:text-white">{{ utmMedium }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">utm_campaign:</span>
                <span class="font-mono text-gray-900 dark:text-white">{{ utmCampaign }}</span>
              </div>
              <div v-if="utmTerm" class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">utm_term:</span>
                <span class="font-mono text-gray-900 dark:text-white">{{ utmTerm }}</span>
              </div>
              <div v-if="utmContent" class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">utm_content:</span>
                <span class="font-mono text-gray-900 dark:text-white">{{ utmContent }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
            <div class="text-sm text-purple-800 dark:text-purple-300">
              <p class="font-semibold mb-2">Parâmetros UTM:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>utm_source:</strong> Origem do tráfego (google, facebook, newsletter)</li>
                <li><strong>utm_medium:</strong> Tipo de mídia (cpc, email, social, organic)</li>
                <li><strong>utm_campaign:</strong> Nome específico da campanha</li>
                <li><strong>utm_term:</strong> Palavras-chave pagas (opcional)</li>
                <li><strong>utm_content:</strong> Diferencia anúncios similares (opcional)</li>
                <li>Use no Google Analytics, Facebook Ads, etc.</li>
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

const urlBase = ref('')
const utmSource = ref('')
const utmMedium = ref('')
const utmCampaign = ref('')
const utmTerm = ref('')
const utmContent = ref('')
const linkGerado = ref('')

const podeGerar = computed(() => {
  return urlBase.value && utmSource.value && utmMedium.value && utmCampaign.value
})

const gerarLink = () => {
  if (!podeGerar.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos Obrigatórios',
      text: 'Preencha URL, Source, Medium e Campaign',
      confirmButtonColor: '#9333ea'
    })
    return
  }

  try {
    const url = new URL(urlBase.value)
    url.searchParams.set('utm_source', utmSource.value.toLowerCase().replace(/\s+/g, '_'))
    url.searchParams.set('utm_medium', utmMedium.value.toLowerCase().replace(/\s+/g, '_'))
    url.searchParams.set('utm_campaign', utmCampaign.value.toLowerCase().replace(/\s+/g, '_'))
    
    if (utmTerm.value) {
      url.searchParams.set('utm_term', utmTerm.value.toLowerCase().replace(/\s+/g, '_'))
    }
    
    if (utmContent.value) {
      url.searchParams.set('utm_content', utmContent.value.toLowerCase().replace(/\s+/g, '_'))
    }

    linkGerado.value = url.toString()
    
    trackToolUsage('Gerador UTM', 'generate')
    
    Swal.fire({
      icon: 'success',
      title: 'Link Gerado!',
      text: 'Link UTM criado com sucesso',
      confirmButtonColor: '#9333ea'
    })
  } catch {
    Swal.fire({
      icon: 'error',
      title: 'URL Inválida',
      text: 'Por favor, insira uma URL válida (ex: https://seusite.com)',
      confirmButtonColor: '#9333ea'
    })
  }
}

const copiarLink = () => {
  navigator.clipboard.writeText(linkGerado.value)
  
  trackToolUsage('Gerador UTM', 'copy')
  
  Swal.fire({
    icon: 'success',
    title: 'Link Copiado!',
    timer: 2000,
    showConfirmButton: false
  })
}

const encurtarLink = () => {
  Swal.fire({
    icon: 'info',
    title: 'Encurtar Link',
    html: `
      <p class="mb-3">Use um serviço de encurtamento:</p>
      <div class="space-y-2">
        <a href="https://bitly.com" target="_blank" class="block text-blue-600 hover:underline">• Bitly</a>
        <a href="https://tinyurl.com" target="_blank" class="block text-blue-600 hover:underline">• TinyURL</a>
        <a href="https://rebrandly.com" target="_blank" class="block text-blue-600 hover:underline">• Rebrandly</a>
      </div>
    `,
    confirmButtonColor: '#9333ea'
  })
}
</script>
