<template>
  <Transition name="slide-up">
    <div v-if="showBanner" class="cookie-banner" role="dialog" aria-label="Aviso sobre cookies e LGPD">
      <div class="container">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <Icon icon="mdi:cookie" class="w-5 h-5 text-yellow-400" />
              <h3 class="font-semibold text-sm">Utilizamos cookies</h3>
            </div>
            <p class="text-gray-300 text-xs leading-relaxed">
              Este site utiliza cookies para melhorar sua experiência de navegação.
              Ao continuar, você concorda com nossa
              <RouterLink to="/privacidade" class="text-primary-400 hover:text-primary-300 underline">
                Política de Privacidade
              </RouterLink>
              e com o uso de cookies conforme a LGPD (Lei Geral de Proteção de Dados).
            </p>
          </div>

          <div class="flex gap-2 shrink-0">
            <button
              @click="acceptCookies"
              class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            >
              Aceitar
            </button>
            <button
              @click="rejectCookies"
              class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            >
              Rejeitar
            </button>
            <RouterLink
              to="/privacidade"
              class="border border-gray-600 hover:border-gray-500 text-gray-300 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            >
              Mais info
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const showBanner = ref(false)
const COOKIE_KEY = '3w_cookie_consent'

onMounted(() => {
  const consent = localStorage.getItem(COOKIE_KEY)
  if (!consent) {
    showBanner.value = true
  }
})

function acceptCookies(): void {
  localStorage.setItem(COOKIE_KEY, 'accepted')
  showBanner.value = false
}

function rejectCookies(): void {
  localStorage.setItem(COOKIE_KEY, 'rejected')
  showBanner.value = false
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
</style>
