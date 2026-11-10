<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useStorage } from '@vueuse/core'
import BaseButton from '@/components/ui/BaseButton.vue'

type Consent = 'accepted' | 'declined' | null

const consent = useStorage<Consent>('dp-cookie-consent', null)
const show = ref(false)

onMounted(() => {
  show.value = consent.value === null
})

function accept() {
  consent.value = 'accepted'
  show.value = false
}
function decline() {
  consent.value = 'declined'
  show.value = false
}
</script>

<template>
  <Transition name="cookie">
    <div v-if="show" class="fixed inset-x-0 bottom-0 z-[90] p-4" role="dialog" aria-label="Consentimento de cookies">
      <div
        class="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-primary/20 bg-card/95 p-6 shadow-2xl backdrop-blur-md md:flex-row md:items-start"
      >
        <Icon icon="lucide:cookie" class="h-8 w-8 flex-shrink-0 text-primary" />
        <div class="flex-1 space-y-3">
          <h3 class="text-lg font-semibold">🍪 Sua privacidade é prioridade</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Utilizamos apenas cookies essenciais para o funcionamento do site. Você controla seus dados
            conforme a <strong>LGPD</strong>, <strong>GDPR</strong>, <strong>CCPA</strong> e
            <strong>POPIA</strong>. Não vendemos nem compartilhamos suas informações.
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <BaseButton size="sm" @click="accept">Aceitar</BaseButton>
            <BaseButton size="sm" variant="outline" @click="decline">Recusar não essenciais</BaseButton>
            <RouterLink
              to="/privacidade"
              class="text-sm text-muted-foreground underline transition-colors hover:text-primary"
            >
              Política de Privacidade
            </RouterLink>
          </div>
        </div>
        <button
          type="button"
          class="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Fechar"
          @click="decline"
        >
          <Icon icon="lucide:x" class="h-5 w-5" />
        </button>
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
