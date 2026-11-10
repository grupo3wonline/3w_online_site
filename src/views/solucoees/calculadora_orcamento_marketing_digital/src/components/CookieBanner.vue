<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useConsentStore } from '@/stores/consent'

const consent = useConsentStore()
const isVisible = ref(false)

onMounted(() => {
  // Exibe o banner apenas se ainda não houver decisão registrada.
  if (!consent.level) {
    setTimeout(() => {
      isVisible.value = true
    }, 1500)
  }
})

function accept(level: 'all' | 'essential') {
  consent.decide(level)
  isVisible.value = false
}
</script>

<template>
  <Transition name="cookie">
    <div
      v-if="isVisible"
      class="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div class="container mx-auto">
        <div class="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div
            class="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/20 lg:flex"
          >
            <i class="fas fa-cookie-bite text-xl text-primary" aria-hidden="true"></i>
          </div>

          <div class="flex-1">
            <h3
              id="cookie-title"
              class="mb-1 flex items-center gap-2 font-semibold text-foreground"
            >
              <i class="fas fa-cookie-bite text-primary lg:hidden" aria-hidden="true"></i>
              Utilizamos Cookies
            </h3>
            <p id="cookie-desc" class="text-sm leading-relaxed text-muted-foreground">
              Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar
              nosso tráfego, em conformidade com LGPD, GDPR, CCPA e POPIA. Ao clicar em "Aceitar
              Todos", você concorda com o uso de cookies conforme nossa
              <RouterLink to="/politica-de-privacidade" class="text-primary hover:underline">
                Política de Privacidade </RouterLink
              >.
            </p>
          </div>

          <div class="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <button
              type="button"
              class="btn-ghost px-5 py-2.5 text-sm"
              @click="accept('essential')"
            >
              Apenas Essenciais
            </button>
            <button type="button" class="btn-primary py-2.5 text-sm" @click="accept('all')">
              <i class="fas fa-check" aria-hidden="true"></i>
              Aceitar Todos
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-enter-active,
.cookie-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.cookie-enter-from,
.cookie-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
