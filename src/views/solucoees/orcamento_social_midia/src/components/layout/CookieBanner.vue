<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { useStorage } from '@vueuse/core'

/**
 * Banner de consentimento de cookies em conformidade com
 * LGPD (BR), GDPR (UE), CCPA (EUA-CA) e POPIA (ZA).
 * Permite aceitar todos, rejeitar não essenciais e gerenciar categorias.
 */
interface Consent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  decidedAt: string | null
}

const consent = useStorage<Consent>('osm-cookie-consent', {
  necessary: true,
  analytics: false,
  marketing: false,
  decidedAt: null,
})

const visible = ref(false)

onMounted(() => {
  visible.value = !consent.value.decidedAt
})

function persist(next: Partial<Consent>) {
  consent.value = {
    ...consent.value,
    ...next,
    necessary: true,
    decidedAt: new Date().toISOString(),
  }
  visible.value = false
  Swal.fire({
    icon: 'success',
    title: 'Preferências salvas!',
    text: 'Suas escolhas de privacidade foram registradas.',
    timer: 2200,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
  })
}

function acceptAll() {
  persist({ analytics: true, marketing: true })
}

function rejectNonEssential() {
  persist({ analytics: false, marketing: false })
}

async function manage() {
  const { value: formValues } = await Swal.fire({
    title: 'Preferências de cookies',
    html: `
      <div style="text-align:left;font-size:14px">
        <label style="display:flex;gap:8px;align-items:center;margin-bottom:8px;opacity:.7">
          <input type="checkbox" checked disabled /> Necessários (sempre ativos)
        </label>
        <label style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
          <input type="checkbox" id="swal-analytics" ${consent.value.analytics ? 'checked' : ''} /> Analíticos (métricas de uso)
        </label>
        <label style="display:flex;gap:8px;align-items:center">
          <input type="checkbox" id="swal-marketing" ${consent.value.marketing ? 'checked' : ''} /> Marketing (personalização)
        </label>
      </div>`,
    showCancelButton: true,
    confirmButtonText: 'Salvar preferências',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#7c3aed',
    preConfirm: () => ({
      analytics: (document.getElementById('swal-analytics') as HTMLInputElement)?.checked ?? false,
      marketing: (document.getElementById('swal-marketing') as HTMLInputElement)?.checked ?? false,
    }),
  })
  if (formValues) persist(formValues)
}
</script>

<template>
  <Transition name="cookie">
    <div
      v-if="visible"
      class="fixed bottom-0 left-0 right-0 z-50 border-t border-purple-500/20 bg-gradient-to-r from-purple-900/95 to-indigo-900/95 p-4 shadow-2xl backdrop-blur-lg"
      role="region"
      aria-label="Aviso de cookies"
    >
      <div class="container-app flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div class="flex-1 text-sm text-gray-200">
          <p class="mb-1 flex items-center gap-2 font-semibold">
            <Icon icon="fa6-solid:cookie-bite" class="text-purple-400" aria-hidden="true" />
            Este site utiliza cookies
          </p>
          <p class="text-xs text-gray-300">
            Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar
            conteúdo, em conformidade com LGPD, GDPR, CCPA e POPIA. Saiba mais na
            <RouterLink
              to="/politica-privacidade"
              class="text-purple-300 underline hover:text-purple-200"
            >
              Política de Privacidade </RouterLink
            >.
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="rounded-lg border border-gray-500 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-gray-400 hover:text-white"
            @click="manage"
          >
            Gerenciar
          </button>
          <button
            type="button"
            class="rounded-lg border border-gray-500 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-gray-400 hover:text-white"
            @click="rejectNonEssential"
          >
            Rejeitar
          </button>
          <button
            type="button"
            class="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition hover:from-purple-700 hover:to-indigo-700"
            @click="acceptAll"
          >
            Aceitar todos
          </button>
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
