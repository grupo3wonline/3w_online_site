<template>
  <div>
    <!-- Banner Principal Flutuante de Consentimento -->
    <Transition name="slide-up">
      <div
        v-if="showBanner && !isPreferencesModalOpen"
        class="fixed bottom-0 inset-x-0 z-50 p-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 shadow-2xl text-white"
        role="dialog"
        aria-modal="true"
        aria-label="Gerenciamento Global de Privacidade e Cookies"
      >
        <div class="container max-w-6xl mx-auto">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div class="flex-1 space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <div class="w-6 h-6 rounded bg-primary-500/20 text-primary-400 flex items-center justify-center">
                  <Icon icon="mdi:shield-account" class="w-4 h-4" />
                </div>
                <h3 class="font-bold text-sm text-white">Privacidade & Conformidade Global</h3>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-500/30">
                  LGPD • GDPR • CCPA • POPIA
                </span>
              </div>

              <p class="text-xs text-slate-300 leading-relaxed max-w-4xl">
                Valorizamos sua privacidade e seus direitos de proteção de dados. Utilizamos cookies essenciais para o funcionamento do site e tecnologias analíticas anônimas para otimizar sua experiência, em conformidade com as normas internacionais. Suas ferramentas e dados processados nas calculadoras nunca saem do seu navegador.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-2.5 shrink-0 w-full lg:w-auto justify-end">
              <button
                @click="openPreferences"
                class="btn-outline !border-slate-600 !text-slate-200 hover:!bg-slate-800 text-xs !py-2.5 !px-3.5 font-medium"
              >
                <Icon icon="mdi:tune" class="w-3.5 h-3.5 mr-1" />
                Personalizar
              </button>
              <button
                @click="handleRejectNonEssential"
                class="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                Rejeitar Não Essenciais
              </button>
              <button
                @click="handleAcceptAll"
                class="btn-primary !bg-emerald-600 hover:!bg-emerald-700 !text-white text-xs font-bold !py-2.5 !px-5 shadow-lg shadow-emerald-600/20"
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal de Preferências Granulares de Cookies -->
    <Transition name="fade">
      <div
        v-if="isPreferencesModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
      >
        <div class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-white space-y-6">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 class="text-base sm:text-lg font-bold flex items-center gap-2">
                <Icon icon="mdi:cog" class="w-5 h-5 text-primary-400" />
                Central de Preferências de Privacidade
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">
                Em conformidade com LGPD (BR), GDPR (UE), CCPA (EUA) e POPIA (África do Sul)
              </p>
            </div>
            <button
              @click="closePreferences"
              class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
            >
              <Icon icon="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <!-- Categorias Granulares -->
          <div class="space-y-4 text-xs">
            <!-- Categoria 1: Essenciais -->
            <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" />
                  <span class="font-bold text-sm text-white">1. Cookies Estritamente Necessários</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Sempre Ativos
                </span>
              </div>
              <p class="text-slate-300 leading-relaxed">
                Essenciais para a segurança, autenticação de sessões, integridade de formulários e navegação segura. Não podem ser desativados.
              </p>
            </div>

            <!-- Categoria 2: Analíticos -->
            <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:chart-bar" class="w-4 h-4 text-blue-400" />
                  <span class="font-bold text-sm text-white">2. Cookies Analíticos e Desempenho</span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="tempAnalytics" class="sr-only peer" />
                  <div class="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
              <p class="text-slate-300 leading-relaxed">
                Permitem contar visitas e fontes de tráfego de forma 100% anonimizada (Google Analytics com mascaramento de IP) para melhorar a velocidade e usabilidade do site.
              </p>
            </div>

            <!-- Categoria 3: Marketing & SEM -->
            <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:bullseye-arrow" class="w-4 h-4 text-purple-400" />
                  <span class="font-bold text-sm text-white">3. Cookies de Marketing & Conversão</span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="tempMarketing" class="sr-only peer" />
                  <div class="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
              <p class="text-slate-300 leading-relaxed">
                Utilizados para atribuir campanhas de tráfego pago (Google Ads, Meta Ads) e medir a efetividade dos canais de anúncio. Nunca vendemos seus dados pessoais a terceiros (CCPA "Do Not Sell").
              </p>
            </div>
          </div>

          <div class="p-3 bg-slate-800/50 rounded-xl border border-slate-700 text-[11px] text-slate-300 flex items-center justify-between">
            <span>Para mais detalhes sobre seus direitos, consulte nossa:</span>
            <RouterLink to="/privacidade" @click="closePreferences" class="text-primary-400 hover:underline font-bold">
              Política de Privacidade Completa →
            </RouterLink>
          </div>

          <div class="flex flex-wrap justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              @click="handleRejectNonEssential"
              class="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              Rejeitar Opcionais
            </button>
            <button
              @click="saveCustomPreferences"
              class="btn-primary !bg-primary-600 hover:!bg-primary-700 text-xs font-bold !py-2.5 !px-5 shadow-lg"
            >
              Salvar Minhas Preferências
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { usePrivacyConsent } from '@/composables/usePrivacyConsent'

const {
  isPreferencesModalOpen,
  getStoredConsent,
  saveConsent,
  acceptAll,
  rejectNonEssential,
  openPreferences,
  closePreferences,
} = usePrivacyConsent()

const showBanner = ref(false)
const tempAnalytics = ref(false)
const tempMarketing = ref(false)

onMounted(() => {
  const consent = getStoredConsent()
  if (!consent) {
    showBanner.value = true
  } else {
    tempAnalytics.value = consent.analytics
    tempMarketing.value = consent.marketing
  }
})

function handleAcceptAll(): void {
  acceptAll()
  showBanner.value = false
  closePreferences()
}

function handleRejectNonEssential(): void {
  rejectNonEssential()
  tempAnalytics.value = false
  tempMarketing.value = false
  showBanner.value = false
  closePreferences()
}

function saveCustomPreferences(): void {
  saveConsent({
    necessary: true,
    analytics: tempAnalytics.value,
    marketing: tempMarketing.value,
  })
  showBanner.value = false
  closePreferences()
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
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
