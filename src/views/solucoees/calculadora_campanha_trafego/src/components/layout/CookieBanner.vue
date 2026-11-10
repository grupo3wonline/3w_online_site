<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const COOKIE_KEY = 'calc_trafego_cookie_consent'
const visivel = ref(false)

onMounted(() => {
  const consentimento = localStorage.getItem(COOKIE_KEY)
  if (!consentimento) {
    setTimeout(() => {
      visivel.value = true
    }, 1500)
  }
})

function aceitar() {
  localStorage.setItem(COOKIE_KEY, 'aceito')
  visivel.value = false
}

function recusar() {
  localStorage.setItem(COOKIE_KEY, 'recusado')
  visivel.value = false
}
</script>

<template>
  <div
    v-if="visivel"
    id="banner-cookies"
    class="fixed bottom-0 inset-x-0 z-[60] p-4 animate-slide-up"
    role="dialog"
    aria-label="Banner de consentimento de cookies"
  >
    <div class="container-app">
      <div class="glass-dark rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="flex-1">
          <p class="text-sm text-gray-200 leading-relaxed">
            <i class="fa-solid fa-cookie-bite text-warning-400 mr-2"></i>
            Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa
            <RouterLink to="/politica-de-privacidade" class="text-accent-400 underline hover:text-white">
              Política de Privacidade
            </RouterLink>.
          </p>
        </div>
        <div class="flex gap-3 shrink-0">
          <button id="btn-recusar-cookies" class="btn-ghost btn-sm text-gray-300 hover:text-white" @click="recusar">
            Recusar
          </button>
          <button id="btn-aceitar-cookies" class="btn-primary btn-sm" @click="aceitar">
            <i class="fa-solid fa-check"></i>
            Aceitar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
