<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const showBanner = ref(false)
const showDetails = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookie_consent')
  if (!consent) {
    // Pequeno delay para melhor UX
    setTimeout(() => {
      showBanner.value = true
    }, 1500)
  }
})

const handleConsent = (accepted) => {
  const consentData = {
    accepted,
    date: new Date().toISOString(),
    version: '1.0'
  }
  localStorage.setItem('cookie_consent', JSON.stringify(consentData))
  showBanner.value = false
  
  // Google Analytics Event
  if (window.gtag) {
    window.gtag('event', 'cookie_consent', {
      consent_given: accepted
    })
  }
  
  // Se recusou, desabilitar analytics
  if (!accepted && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied'
    })
  }
}

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>

<template>
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    leave-active-class="transition-all duration-300 ease-in"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div 
      v-if="showBanner" 
      class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-2xl border-t border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-6xl mx-auto p-4 md:p-6">
        <div class="flex flex-col gap-4">
          <!-- Main Content -->
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-cookie-bite text-2xl text-yellow-500"></i>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                  Sua Privacidade é Importante
                </h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Utilizamos cookies estritamente <strong>funcionais</strong> para melhorar sua experiência 
                e cookies de <strong>análise anônima</strong> para entender como você usa nosso site. 
                <strong>Não coletamos dados pessoais identificáveis</strong>.
              </p>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <button 
                @click="handleConsent(true)" 
                class="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-md"
              >
                <i class="fas fa-check"></i>
                Aceitar Todos
              </button>
              <button 
                @click="handleConsent(false)" 
                class="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <i class="fas fa-times"></i>
                Apenas Essenciais
              </button>
            </div>
          </div>
          
          <!-- Toggle Details -->
          <button 
            @click="toggleDetails"
            class="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start"
          >
            <i :class="showDetails ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
            {{ showDetails ? 'Ocultar detalhes' : 'Ver detalhes sobre cookies' }}
          </button>
          
          <!-- Details Panel -->
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="showDetails" class="overflow-hidden">
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <i class="fas fa-info-circle text-blue-500"></i>
                  Tipos de Cookies Utilizados
                </h4>
                
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                  <div class="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center gap-2 mb-2">
                      <i class="fas fa-cog text-green-500"></i>
                      <span class="font-semibold text-gray-900 dark:text-white">Cookies Essenciais</span>
                      <span class="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">Sempre Ativos</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400">
                      Necessários para o funcionamento básico: preferência de tema, consentimento de cookies.
                    </p>
                  </div>
                  
                  <div class="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center gap-2 mb-2">
                      <i class="fas fa-chart-bar text-blue-500"></i>
                      <span class="font-semibold text-gray-900 dark:text-white">Cookies de Análise</span>
                      <span class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">Opcional</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400">
                      Google Analytics para estatísticas anônimas de uso. Não identificamos você pessoalmente.
                    </p>
                  </div>
                </div>
                
                <div class="mt-4 flex flex-wrap gap-4 text-sm">
                  <RouterLink 
                    to="/politica-de-privacidade" 
                    class="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <i class="fas fa-shield-alt"></i>
                    Política de Privacidade
                  </RouterLink>
                  <RouterLink 
                    to="/termos-de-uso" 
                    class="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <i class="fas fa-file-contract"></i>
                    Termos de Uso
                  </RouterLink>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>
