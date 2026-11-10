<template>
  <div v-if="isVisible" class="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up print-hidden">
    <div class="container mx-auto max-w-4xl">
      <div class="bg-card border border-border rounded-2xl shadow-2xl p-6 relative">
        <button class="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors" aria-label="Fechar aviso de cookies" @click="isVisible = false">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
        <div class="flex items-start gap-4">
          <div class="hidden sm:flex h-12 w-12 rounded-full bg-bbq-orange/10 items-center justify-center flex-shrink-0">
            <i class="fa-solid fa-cookie-bite text-2xl text-bbq-orange"></i>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-foreground mb-2">Este site utiliza cookies</h3>
            <p class="text-muted-foreground text-sm mb-4">Utilizamos cookies para melhorar sua experiencia de navegacao e analisar nosso trafego. Ao clicar em "Aceitar todos", voce concorda com o uso de TODOS os cookies. <router-link to="/sobre" class="text-bbq-orange hover:underline">Saiba mais</router-link></p>
            <div class="flex flex-wrap gap-3">
              <button class="px-5 py-2.5 rounded-lg bg-gradient-to-r from-bbq-orange to-bbq-red text-white font-medium hover:shadow-lg transition-all text-sm" @click="acceptAll"><i class="fa-solid fa-check mr-2"></i>Aceitar todos</button>
              <button class="px-5 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-all text-sm" @click="acceptNecessary">Apenas necessarios</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookieConsent')
  if (!consent) {
    setTimeout(() => { isVisible.value = true }, 1500)
  }
})

function acceptAll() {
  localStorage.setItem('cookieConsent', JSON.stringify({ necessary: true, analytics: true, timestamp: new Date().toISOString() }))
  isVisible.value = false
}

function acceptNecessary() {
  localStorage.setItem('cookieConsent', JSON.stringify({ necessary: true, analytics: false, timestamp: new Date().toISOString() }))
  isVisible.value = false
}
</script>

<style scoped>
@keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.animate-slide-up { animation: slide-up 0.4s ease-out; }
</style>
