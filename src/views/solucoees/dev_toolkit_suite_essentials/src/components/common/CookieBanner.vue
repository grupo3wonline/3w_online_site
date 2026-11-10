<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { useConsentStore } from '@/stores/consent'

const consent = useConsentStore()
const { decided } = storeToRefs(consent)
</script>

<template>
  <Transition name="cookie">
    <div
      v-if="!decided"
      class="fixed inset-x-0 bottom-0 z-[90] p-4"
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de privacidade e cookies"
    >
      <div
        class="container-app flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-2xl md:flex-row md:items-center md:justify-between"
      >
        <div class="flex items-start gap-3">
          <Icon icon="lucide:cookie" class="mt-0.5 h-6 w-6 shrink-0 text-primary" />
          <p class="text-sm text-muted-foreground">
            Usamos cookies e ferramentas de análise para melhorar sua experiência. Você pode aceitar
            ou recusar. Em conformidade com LGPD, GDPR, CCPA e POPIA. Saiba mais na
            <RouterLink to="/privacidade" class="font-medium text-primary hover:underline">
              Política de Privacidade </RouterLink
            >.
          </p>
        </div>
        <div class="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" @click="consent.reject()">Recusar</Button>
          <Button variant="brand" size="sm" @click="consent.accept()">Aceitar</Button>
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
