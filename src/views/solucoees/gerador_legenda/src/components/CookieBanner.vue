<template>
  <div v-if="!accepted" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-4 md:p-6 transition-transform duration-300 ease-in-out transform">
    <div class="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex-1 text-sm text-gray-600">
        <p>
          Utilizamos cookies para melhorar sua experiência e analisar o tráfego. Ao continuar navegando, você concorda com nossa 
          <a href="#" class="text-primary-600 hover:text-primary-700 underline">Política de Privacidade</a> e 
          <a href="#" class="text-primary-600 hover:text-primary-700 underline">Termos de Uso</a>.
        </p>
      </div>
      <div class="flex gap-3 shrink-0">
        <button @click="acceptCookies" class="btn btn-primary btn-sm whitespace-nowrap">
          Aceitar Tudo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const accepted = ref(true)

onMounted(() => {
  const consent = localStorage.getItem('cookie_consent')
  if (!consent) {
    accepted.value = false
  }
})

const acceptCookies = () => {
  localStorage.setItem('cookie_consent', 'true')
  accepted.value = true
}
</script>
