<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { safeStorage } from '@/utils/security'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const isVisible = ref(false)
const showSettings = ref(false)
const preferences = ref<CookiePreferences>({
  necessary: true,
  analytics: false,
  marketing: false
})

onMounted(() => {
  const consent = safeStorage.get<CookiePreferences | null>('cookie_consent', null)
  if (!consent) {
    setTimeout(() => { isVisible.value = true }, 1500)
  }
})

function persistConsent(prefs: CookiePreferences) {
  safeStorage.set('cookie_consent', prefs)
  safeStorage.set('cookie_consent_date', new Date().toISOString())
  updateGtagConsent(prefs.analytics, prefs.marketing)
  isVisible.value = false
}

function handleAcceptAll() {
  persistConsent({ necessary: true, analytics: true, marketing: true })
}

function handleAcceptNecessary() {
  persistConsent({ necessary: true, analytics: false, marketing: false })
}

function handleSavePreferences() {
  persistConsent({ ...preferences.value })
}

function updateGtagConsent(analytics: boolean, marketing: boolean) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied'
    })
  }
}
</script>

<template>
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div v-if="isVisible" class="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div class="max-w-4xl mx-auto">
        <div class="card p-6 shadow-2xl">
          <!-- Main Banner -->
          <template v-if="!showSettings">
            <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 gradient-primary rounded-xl flex items-center justify-center shadow-elegant">
                  <i class="fa-solid fa-cookie-bite text-white text-lg"></i>
                </div>
              </div>

              <div class="flex-1">
                <h3 class="font-semibold text-lg mb-1 text-gray-900 dark:text-white">🍪 Sua Privacidade Importa</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar conteúdo.
                  Ao clicar em "Aceitar Todos", você concorda com nossa
                  <router-link to="/politica-de-privacidade" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                    Política de Privacidade
                  </router-link>
                  e
                  <router-link to="/termos-de-uso" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                    Termos de Uso
                  </router-link>.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button @click="showSettings = true" class="btn-ghost text-sm border border-gray-200 dark:border-slate-600">
                  <i class="fa-solid fa-gear"></i>
                  Configurar
                </button>
                <button @click="handleAcceptNecessary" class="btn-ghost text-sm border border-gray-200 dark:border-slate-600">
                  Apenas Necessários
                </button>
                <button @click="handleAcceptAll" class="btn-primary text-sm">
                  <i class="fa-solid fa-check"></i>
                  Aceitar Todos
                </button>
              </div>
            </div>
          </template>

          <!-- Settings Panel -->
          <template v-else>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Configurar Preferências</h3>
                <button @click="showSettings = false" class="btn-ghost rounded-full w-8 h-8">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Cookies Necessários</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Essenciais para o funcionamento. Não podem ser desativados.</p>
                  </div>
                  <div class="h-6 w-11 bg-primary-500 rounded-full flex items-center justify-end px-1">
                    <div class="h-4 w-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Cookies de Análise</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Nos ajudam a entender como você usa o site.</p>
                  </div>
                  <button
                    @click="preferences.analytics = !preferences.analytics"
                    class="h-6 w-11 rounded-full flex items-center px-1 transition-colors"
                    :class="preferences.analytics ? 'bg-primary-500 justify-end' : 'bg-gray-300 dark:bg-slate-500 justify-start'"
                  >
                    <div class="h-4 w-4 bg-white rounded-full shadow"></div>
                  </button>
                </div>

                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Cookies de Marketing</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Usados para personalizar anúncios.</p>
                  </div>
                  <button
                    @click="preferences.marketing = !preferences.marketing"
                    class="h-6 w-11 rounded-full flex items-center px-1 transition-colors"
                    :class="preferences.marketing ? 'bg-primary-500 justify-end' : 'bg-gray-300 dark:bg-slate-500 justify-start'"
                  >
                    <div class="h-4 w-4 bg-white rounded-full shadow"></div>
                  </button>
                </div>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <button @click="showSettings = false" class="btn-ghost text-sm border border-gray-200 dark:border-slate-600">Cancelar</button>
                <button @click="handleSavePreferences" class="btn-primary text-sm">
                  <i class="fa-solid fa-check"></i>
                  Salvar Preferências
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>
