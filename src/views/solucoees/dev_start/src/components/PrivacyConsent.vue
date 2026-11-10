<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const STORAGE_KEY = 'devstart_privacy_consent'
const show = ref(false)

onMounted(() => {
  if (!localStorage.getItem(STORAGE_KEY)) show.value = true
})

function decide(value: 'accepted' | 'rejected') {
  localStorage.setItem(STORAGE_KEY, value)
  localStorage.setItem('devstart_consent_date', new Date().toISOString())
  show.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
  >
    <div
      v-if="show"
      class="fixed inset-x-0 bottom-0 z-[9990] border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95"
      role="dialog"
      aria-label="Aviso de privacidade e cookies"
    >
      <div
        class="container-page flex flex-col items-start gap-4 py-4 md:flex-row md:items-center md:justify-between"
      >
        <div class="flex-1 text-sm text-slate-600 dark:text-slate-300">
          <p class="mb-1 flex items-center gap-2 font-bold text-slate-800 dark:text-white">
            <Icon
              icon="lucide:shield-check"
              class="h-5 w-5 text-brand-600"
            />
            Sua privacidade importa
          </p>
          <p>
            Usamos armazenamento local e cookies essenciais para salvar seu progresso, tema e
            preferências. Nenhum dado pessoal é compartilhado com terceiros sem seu consentimento.
            Em conformidade com
            <strong>LGPD, GDPR, CCPA e POPIA</strong>. Saiba mais na
            <RouterLink
              to="/privacidade"
              class="link-underline"
            >
              Política de Privacidade
            </RouterLink>.
          </p>
        </div>
        <div class="flex w-full shrink-0 gap-3 md:w-auto">
          <button
            type="button"
            class="btn-secondary flex-1 md:flex-none"
            @click="decide('rejected')"
          >
            Rejeitar
          </button>
          <button
            type="button"
            class="btn-primary flex-1 md:flex-none"
            @click="decide('accepted')"
          >
            Aceitar e continuar
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
