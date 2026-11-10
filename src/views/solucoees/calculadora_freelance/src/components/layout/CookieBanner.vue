<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCookieConsent } from '@/composables/useCookieConsent'

const { consent, accept, reject } = useCookieConsent()

const showBanner = computed(() => consent.value === null)
</script>

<template>
  <Transition
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="translate-y-full opacity-0"
    leave-active-class="transition duration-300 ease-in"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="showBanner"
      class="fixed inset-x-0 bottom-0 z-[90] p-4"
      role="dialog"
      aria-label="Aviso de cookies e privacidade"
    >
      <div class="container-app">
        <div
          class="card-surface flex flex-col items-start gap-4 p-6 shadow-2xl md:flex-row md:items-center"
        >
          <div class="flex-shrink-0">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-purple-600"
            >
              <i class="fas fa-cookie-bite text-xl text-white"></i>
            </div>
          </div>

          <div class="flex-1">
            <h3 class="mb-1 flex items-center gap-2 text-lg font-bold">
              <i class="fas fa-shield-halved text-brand-600"></i> Cookies e Privacidade
            </h3>
            <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Usamos cookies para melhorar sua experiência e analisar o tráfego, em conformidade com
              LGPD, GDPR, CCPA e POPIA. Você pode aceitar ou recusar.
              <RouterLink
                to="/privacidade"
                class="font-medium text-brand-600 underline hover:text-brand-700"
              >
                Saiba mais
              </RouterLink>
            </p>
          </div>

          <div class="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <button
              type="button"
              class="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              @click="reject"
            >
              <i class="fas fa-circle-xmark"></i> Rejeitar
            </button>
            <button type="button" class="btn-primary px-6 py-2.5" @click="accept">
              <i class="fas fa-circle-check"></i> Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
