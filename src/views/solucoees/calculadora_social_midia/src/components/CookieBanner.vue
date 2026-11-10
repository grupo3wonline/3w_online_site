<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const STORAGE_KEY = 'cookie_consent_calculadora_social'
const isVisible = ref(false)

onMounted(() => {
  const consent = localStorage.getItem(STORAGE_KEY)
  if (!consent) {
    window.setTimeout(() => {
      isVisible.value = true
    }, 1200)
  }
})

function decide(value: 'accepted' | 'rejected') {
  localStorage.setItem(STORAGE_KEY, value)
  localStorage.setItem(`${STORAGE_KEY}_date`, new Date().toISOString())
  isVisible.value = false
}
</script>

<template>
  <transition name="slide-up">
    <div
      v-if="isVisible"
      class="fixed inset-x-0 bottom-0 z-[9999] p-4"
      role="dialog"
      aria-label="Aviso de cookies"
    >
      <div
        class="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-gray-800 md:p-6"
      >
        <div class="flex flex-col gap-4 md:flex-row md:items-center">
          <div class="flex-1">
            <div class="mb-2 flex items-center gap-2">
              <Icon
                icon="lucide:cookie"
                class="h-5 w-5 text-amber-500"
              />
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">
                Utilizamos Cookies
              </h3>
            </div>
            <p class="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
              Usamos cookies para melhorar sua experiência e analisar o tráfego (Google Analytics).
              Ao clicar em "Aceitar", você concorda com nossa
              <RouterLink
                to="/privacidade"
                class="font-medium text-violet-600 hover:underline dark:text-violet-400"
              >
                Política de Privacidade
              </RouterLink>
              e
              <RouterLink
                to="/termos"
                class="font-medium text-violet-600 hover:underline dark:text-violet-400"
              >
                Termos de Uso
              </RouterLink>, em conformidade com LGPD, GDPR, CCPA e POPIA.
            </p>
          </div>
          <div class="flex shrink-0 gap-3">
            <button
              type="button"
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              @click="decide('rejected')"
            >
              Recusar
            </button>
            <button
              type="button"
              class="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg"
              @click="decide('accepted')"
            >
              <Icon
                icon="lucide:check"
                class="mr-1 inline h-4 w-4"
              />
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
