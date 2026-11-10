<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useConsentStore } from '@/stores/consent'

const consent = useConsentStore()
const { decided } = storeToRefs(consent)
</script>

<template>
  <transition name="slide-up">
    <div
      v-if="!decided"
      class="fixed inset-x-0 bottom-0 z-[90] border-t border-ink-200/60 bg-white/85 p-4 shadow-card-hover backdrop-blur-xl dark:border-ink-800 dark:bg-ink-900/85"
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de privacidade"
    >
      <div
        class="mx-auto flex max-w-7xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-start gap-3">
          <span
            class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"
          >
            <Icon icon="mdi:cookie-outline" class="text-xl" />
          </span>
          <p class="text-sm text-ink-600 dark:text-ink-300">
            Usamos armazenamento local e cookies de análise para melhorar sua experiência. Em
            conformidade com
            <strong>LGPD, GDPR, CCPA e POPIA</strong>. Os cálculos são feitos no seu navegador —
            nenhum dado financeiro é enviado a servidores. Veja a
            <RouterLink :to="{ name: 'privacy' }" class="text-primary-600 underline"
              >Política de Privacidade</RouterLink
            >.
          </p>
        </div>
        <div class="flex w-full shrink-0 gap-2 sm:w-auto">
          <button
            type="button"
            class="btn-outline flex-1 py-2 text-sm sm:flex-none"
            @click="consent.reject"
          >
            Recusar
          </button>
          <button
            type="button"
            class="btn-primary flex-1 py-2 text-sm sm:flex-none"
            @click="consent.accept"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
