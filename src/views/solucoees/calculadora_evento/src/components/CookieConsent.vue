<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useConsentStore } from '@/stores/consent'

const consent = useConsentStore()
const { decided, analytics, marketing } = storeToRefs(consent)

const isVisible = ref(false)
const isAnimating = ref(false)
const showPreferences = ref(false)

// Estado local dos toggles no painel de preferências
const localAnalytics = ref(analytics.value)
const localMarketing = ref(marketing.value)

const shouldShow = computed(() => isVisible.value && !decided.value)

function show() {
  isVisible.value = true
  setTimeout(() => {
    isAnimating.value = true
  }, 50)
}

function hide() {
  isAnimating.value = false
  setTimeout(() => {
    isVisible.value = false
    showPreferences.value = false
  }, 300)
}

function acceptAll() {
  consent.acceptAll()
  hide()
}

function rejectAll() {
  consent.rejectAll()
  hide()
}

function openPreferences() {
  localAnalytics.value = analytics.value
  localMarketing.value = marketing.value
  showPreferences.value = true
}

function savePreferences() {
  consent.savePreferences({ analytics: localAnalytics.value, marketing: localMarketing.value })
  hide()
}

onMounted(() => {
  consent.init()
  if (!decided.value) {
    setTimeout(show, 1200)
  }
  // Permite reabrir o gerenciador a partir de um link no rodapé
  window.addEventListener('open-cookie-preferences', () => {
    consent.reopen()
    show()
    openPreferences()
  })
})
</script>

<template>
  <div
    v-if="shouldShow"
    class="fixed bottom-0 left-0 right-0 z-[100] p-4 transition-all duration-300"
    :class="isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
    role="dialog"
    aria-labelledby="cookie-title"
    aria-modal="false"
  >
    <div class="container-max">
      <div
        class="bg-card border border-border rounded-xl shadow-2xl p-4 md:p-6 max-h-[80vh] overflow-y-auto"
      >
        <!-- Aviso principal -->
        <div v-if="!showPreferences" class="flex flex-col lg:flex-row lg:items-center gap-4">
          <div class="flex-1">
            <div class="flex items-start gap-3">
              <div class="p-2 bg-primary/10 rounded-lg shrink-0">
                <i class="fa-solid fa-cookie-bite text-xl text-primary"></i>
              </div>
              <div>
                <h3 id="cookie-title" class="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <i class="fa-solid fa-shield-halved text-sm text-secondary"></i>
                  Sua Privacidade é Importante
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Utilizamos cookies para melhorar sua experiência e analisar o tráfego. Você pode
                  aceitar todos, recusar os não essenciais ou gerenciar suas preferências. Ao
                  continuar, você concorda com nossa
                  <router-link to="/politica-de-privacidade" class="text-primary hover:underline"
                    >Política de Privacidade</router-link
                  >
                  e
                  <router-link to="/termos-de-uso" class="text-primary hover:underline"
                    >Termos de Uso</router-link
                  >. Em conformidade com LGPD, GDPR, CCPA e POPIA.
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 lg:shrink-0">
            <button
              type="button"
              class="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              @click="openPreferences"
            >
              <i class="fa-solid fa-sliders mr-2"></i>
              Preferências
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              @click="rejectAll"
            >
              Rejeitar
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-lg bg-gradient-hero text-white text-sm font-medium btn-glow transition-all hover:opacity-90"
              @click="acceptAll"
            >
              <i class="fa-solid fa-check mr-2"></i>
              Aceitar Todos
            </button>
          </div>
        </div>

        <!-- Painel de preferências granulares -->
        <div v-else>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-foreground flex items-center gap-2">
              <i class="fa-solid fa-sliders text-primary"></i>
              Gerenciar Preferências de Cookies
            </h3>
            <button
              type="button"
              class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Fechar preferências"
              @click="showPreferences = false"
            >
              <i class="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          <div class="space-y-3 mb-4">
            <!-- Necessários -->
            <div class="flex items-start justify-between gap-4 p-3 rounded-lg bg-muted/40">
              <div>
                <p class="text-sm font-medium text-foreground">Essenciais</p>
                <p class="text-xs text-muted-foreground">
                  Necessários para o funcionamento do site. Sempre ativos.
                </p>
              </div>
              <span class="text-xs font-medium text-secondary shrink-0 mt-0.5">
                <i class="fa-solid fa-lock mr-1"></i>Sempre ativo
              </span>
            </div>

            <!-- Análise -->
            <label class="flex items-start justify-between gap-4 p-3 rounded-lg bg-muted/40 cursor-pointer">
              <div>
                <p class="text-sm font-medium text-foreground">Análise</p>
                <p class="text-xs text-muted-foreground">
                  Ajudam a entender como o site é usado (Google Analytics).
                </p>
              </div>
              <input
                v-model="localAnalytics"
                type="checkbox"
                class="mt-1 h-5 w-5 rounded border-input text-primary focus:ring-primary shrink-0"
              />
            </label>

            <!-- Marketing -->
            <label class="flex items-start justify-between gap-4 p-3 rounded-lg bg-muted/40 cursor-pointer">
              <div>
                <p class="text-sm font-medium text-foreground">Marketing</p>
                <p class="text-xs text-muted-foreground">
                  Usados para personalizar anúncios e medir campanhas.
                </p>
              </div>
              <input
                v-model="localMarketing"
                type="checkbox"
                class="mt-1 h-5 w-5 rounded border-input text-primary focus:ring-primary shrink-0"
              />
            </label>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 justify-end">
            <button
              type="button"
              class="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              @click="rejectAll"
            >
              Rejeitar Todos
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-lg bg-gradient-hero text-white text-sm font-medium btn-glow transition-all hover:opacity-90"
              @click="savePreferences"
            >
              <i class="fa-solid fa-floppy-disk mr-2"></i>
              Salvar Preferências
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
