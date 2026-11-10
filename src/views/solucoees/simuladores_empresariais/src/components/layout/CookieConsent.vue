<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import Button from '@/components/ui/Button.vue'

const CHAVE = 'cookie-consent-v1'
const visivel = ref(false)

onMounted(() => {
  if (!localStorage.getItem(CHAVE)) visivel.value = true
})

function registrar(valor: 'accepted' | 'rejected') {
  localStorage.setItem(CHAVE, JSON.stringify({ valor, data: new Date().toISOString() }))
  visivel.value = false
  // Sinaliza consentimento ao GTM/GA4 (Consent Mode)
  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: 'cookie_consent', consent_status: valor })
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="visivel"
      class="fixed inset-x-0 bottom-0 z-[90] border-t border-border bg-card/95 p-4 shadow-2xl backdrop-blur-md"
      role="dialog"
      aria-label="Aviso de privacidade e cookies"
    >
      <div class="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="flex items-start gap-3">
          <Icon icon="lucide:cookie" class="mt-0.5 h-6 w-6 flex-shrink-0 text-primary" />
          <p class="text-sm text-muted-foreground">
            Usamos cookies e tecnologias similares para melhorar sua experiência e analisar o
            tráfego, em conformidade com <strong>LGPD, GDPR, CCPA e POPIA</strong>. Seus dados de
            simulação são processados localmente no seu navegador. Saiba mais na
            <RouterLink to="/politica-de-privacidade" class="text-primary underline">
              Política de Privacidade </RouterLink
            >.
          </p>
        </div>
        <div class="flex flex-shrink-0 gap-3">
          <Button variant="outline" size="sm" @click="registrar('rejected')">Recusar</Button>
          <Button size="sm" @click="registrar('accepted')">Aceitar</Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
