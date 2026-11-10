<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const CHAVE = 'cookie_consent_calcprecos'
const visivel = ref(false)

function registrarConsentimento(estado: 'granted' | 'denied') {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag === 'function') {
    // Consent Mode v2 (GDPR/LGPD/CCPA/POPIA)
    w.gtag('consent', 'update', {
      ad_storage: estado,
      analytics_storage: estado,
      ad_user_data: estado,
      ad_personalization: estado,
    })
  }
}

onMounted(() => {
  let aceite: string | null = null
  try {
    aceite = localStorage.getItem(CHAVE)
  } catch {
    /* ignore */
  }
  if (aceite === 'aceito') registrarConsentimento('granted')
  else if (aceite === 'recusado') registrarConsentimento('denied')
  else setTimeout(() => (visivel.value = true), 1500)
})

function salvar(valor: 'aceito' | 'recusado') {
  try {
    localStorage.setItem(CHAVE, valor)
  } catch {
    /* ignore */
  }
  registrarConsentimento(valor === 'aceito' ? 'granted' : 'denied')
  visivel.value = false
}
</script>

<template>
  <transition name="cookie">
    <div
      v-if="visivel"
      class="fixed bottom-0 left-0 right-0 z-[100] p-4"
    >
      <div class="max-w-4xl mx-auto glass-card p-6 shadow-2xl">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <Icon
                icon="fa6-solid:cookie-bite"
                class="text-accent-500 text-lg"
              />
              <h2 class="text-sm font-semibold txt-forte">
                Privacidade e Cookies
              </h2>
            </div>
            <p class="text-xs txt-suave leading-relaxed">
              Utilizamos cookies para melhorar sua experiência e analisar o tráfego, em conformidade
              com a <strong class="txt-forte">LGPD, GDPR, CCPA e POPIA</strong>. Você pode aceitar ou
              recusar. Saiba mais na
              <RouterLink
                to="/politica-de-privacidade"
                class="text-primary-500 hover:underline"
              >
                Política de Privacidade
              </RouterLink>.
            </p>
          </div>
          <div class="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              class="flex-1 sm:flex-none px-4 py-2 text-xs font-medium txt-suave border rounded-lg hover:bg-primary-500/10 transition-colors"
              style="border-color: var(--glass-borda)"
              @click="salvar('recusado')"
            >
              Recusar
            </button>
            <button
              type="button"
              class="flex-1 sm:flex-none btn-primary text-xs py-2 px-4"
              @click="salvar('aceito')"
            >
              <Icon icon="fa6-solid:check" />
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.cookie-enter-active,
.cookie-leave-active {
  transition: all 0.3s ease;
}
.cookie-enter-from,
.cookie-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
