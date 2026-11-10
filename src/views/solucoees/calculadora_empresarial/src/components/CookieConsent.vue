<template>
  <transition name="slide-up">
    <div
      v-if="isVisible"
      class="fixed bottom-0 left-0 right-0 z-50 p-4 no-print"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
      aria-modal="true"
    >
      <div class="container mx-auto max-w-4xl">
        <div
          class="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
        >
          <button
            class="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Recusar cookies não essenciais e fechar"
            @click="rejectAll"
          >
            <i class="fa-solid fa-xmark text-lg" aria-hidden="true"></i>
          </button>

          <div class="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div class="flex-1">
              <div class="mb-3 flex items-center gap-3">
                <div class="rounded-full bg-primary-100 p-2 dark:bg-primary-900/30">
                  <i class="fa-solid fa-cookie-bite text-primary-600 dark:text-primary-400" aria-hidden="true"></i>
                </div>
                <h3 id="cookie-title" class="text-lg font-semibold text-gray-900 dark:text-white">
                  Sua privacidade é importante
                </h3>
              </div>

              <p id="cookie-description" class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Usamos cookies para melhorar sua experiência e analisar o tráfego. Você controla o que aceita, em
                conformidade com a
                <strong>LGPD</strong> (Brasil), <strong>GDPR</strong> (Europa), <strong>CCPA</strong> (Califórnia) e
                <strong>POPIA</strong> (África do Sul). Veja nossa
                <router-link to="/privacidade" class="text-primary-600 hover:underline dark:text-primary-400">
                  Política de Privacidade </router-link
                >.
              </p>

              <!-- Preferências detalhadas -->
              <transition name="fade">
                <div v-if="showDetails" class="mt-4 space-y-3 border-t border-gray-100 pt-4 dark:border-gray-700">
                  <label class="flex items-start gap-3 opacity-70">
                    <input type="checkbox" checked disabled class="mt-1" />
                    <span class="text-sm">
                      <strong class="text-gray-900 dark:text-white">Essenciais</strong>
                      <span class="block text-gray-500 dark:text-gray-400"
                        >Necessários para o funcionamento do site. Sempre ativos.</span
                      >
                    </span>
                  </label>
                  <label class="flex cursor-pointer items-start gap-3">
                    <input v-model="prefs.analytics" type="checkbox" class="mt-1" />
                    <span class="text-sm">
                      <strong class="text-gray-900 dark:text-white">Analíticos</strong>
                      <span class="block text-gray-500 dark:text-gray-400"
                        >Google Analytics para entender como o site é usado (dados anônimos).</span
                      >
                    </span>
                  </label>
                </div>
              </transition>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0 lg:flex-col">
              <button v-if="!showDetails" class="btn-primary px-5 py-2.5 text-sm" @click="acceptAll">
                Aceitar todos
              </button>
              <button v-if="!showDetails" class="btn-secondary px-5 py-2.5 text-sm" @click="rejectAll">
                Apenas essenciais
              </button>
              <button v-if="showDetails" class="btn-primary px-5 py-2.5 text-sm" @click="savePreferences">
                Salvar escolhas
              </button>
              <button
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
                @click="showDetails = !showDetails"
              >
                {{ showDetails ? 'Ocultar opções' : 'Personalizar' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const CONSENT_KEY = 'cookieConsent'
const isVisible = ref(false)
const showDetails = ref(false)
const prefs = reactive({ analytics: true })

onMounted(() => {
  const consent = localStorage.getItem(CONSENT_KEY)
  if (!consent) {
    setTimeout(() => {
      isVisible.value = true
    }, 1200)
  } else {
    // Reaplica o consentimento salvo no gtag em cada carregamento.
    applyConsent(consent === 'all')
  }
})

function persist(value) {
  localStorage.setItem(CONSENT_KEY, value)
  localStorage.setItem('cookieConsentDate', new Date().toISOString())
}

function applyConsent(analyticsGranted) {
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: analyticsGranted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    })
  }
}

function acceptAll() {
  persist('all')
  applyConsent(true)
  isVisible.value = false
}

function rejectAll() {
  persist('essential')
  applyConsent(false)
  isVisible.value = false
}

function savePreferences() {
  persist(prefs.analytics ? 'all' : 'essential')
  applyConsent(prefs.analytics)
  isVisible.value = false
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
