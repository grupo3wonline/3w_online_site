<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const visible = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookie-consent')
  if (!consent) visible.value = true
})

function decide(value: 'accepted' | 'rejected') {
  localStorage.setItem('cookie-consent', value)
  localStorage.setItem('cookie-consent-date', new Date().toISOString())
  visible.value = false
}
</script>

<template>
  <transition name="cookie">
    <div v-if="visible" class="fixed inset-x-0 bottom-0 z-50 p-4">
      <div
        class="mx-auto max-w-4xl rounded-lg border border-primary/20 bg-card/95 p-4 shadow-card backdrop-blur"
        role="dialog"
        aria-label="Aviso de cookies"
      >
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="flex items-start gap-3">
            <Icon icon="lucide:cookie" class="mt-0.5 h-6 w-6 flex-shrink-0 text-primary" />
            <div class="space-y-1">
              <p class="text-sm font-medium">Utilizamos Cookies</p>
              <p class="text-xs text-muted-foreground">
                Este site usa cookies para melhorar sua experiência. Ao continuar, você concorda com
                nossa
                <RouterLink to="/politica-de-privacidade" class="text-primary hover:underline">
                  Política de Privacidade </RouterLink
                >
                e
                <RouterLink to="/termos-de-uso" class="text-primary hover:underline">
                  Termos de Uso </RouterLink
                >. Em conformidade com LGPD, GDPR, CCPA e POPIA.
              </p>
            </div>
          </div>
          <div class="flex flex-shrink-0 gap-2">
            <button
              type="button"
              class="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              @click="decide('rejected')"
            >
              Recusar
            </button>
            <button
              type="button"
              class="rounded-md bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              @click="decide('accepted')"
            >
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
  transform: translateY(1rem);
}
</style>
