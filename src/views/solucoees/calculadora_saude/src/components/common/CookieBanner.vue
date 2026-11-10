<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { getConsent, hasStoredConsent, setConsent } from '@/utils/consent';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const showBanner = ref(false);
const analytics = ref(false);
const marketing = ref(false);

onMounted(() => {
  const prefs = getConsent();
  analytics.value = prefs.analytics;
  marketing.value = prefs.marketing;
  if (!hasStoredConsent()) showBanner.value = true;
});

function acceptSelected() {
  setConsent({ essential: true, analytics: analytics.value, marketing: marketing.value });
  showBanner.value = false;
}

function acceptAll() {
  analytics.value = true;
  marketing.value = true;
  setConsent({ essential: true, analytics: true, marketing: true });
  showBanner.value = false;
}

function rejectAll() {
  analytics.value = false;
  marketing.value = false;
  setConsent({ essential: true, analytics: false, marketing: false });
  showBanner.value = false;
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-[80] border-t-2 border-brand-500 bg-white shadow-2xl dark:bg-gray-800"
      role="dialog"
      aria-label="Consentimento de cookies"
    >
      <div class="container-page py-6">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div class="flex flex-1 items-start gap-4">
            <Icon
              icon="fa6-solid:cookie-bite"
              class="mt-1 flex-shrink-0 text-3xl text-brand-500"
              aria-hidden="true"
            />
            <div>
              <h2 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                Uso de Cookies e Consentimento
              </h2>
              <p class="mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                Usamos armazenamento local para preferências essenciais. Com seu consentimento,
                também usamos análise e marketing para melhorar o produto. Você controla suas
                escolhas — em conformidade com LGPD, GDPR, CCPA e POPIA.
              </p>

              <div class="flex flex-col gap-2">
                <label class="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    class="cursor-not-allowed accent-brand-600"
                  >
                  <span class="text-sm text-gray-700 dark:text-gray-300">
                    Essencial — Funcionalidades básicas (obrigatório)
                  </span>
                </label>
                <label class="flex items-center gap-3">
                  <input
                    v-model="analytics"
                    type="checkbox"
                    class="accent-brand-600"
                  >
                  <span class="text-sm text-gray-700 dark:text-gray-300">
                    Analytics — métricas anônimas de uso (Google Analytics)
                  </span>
                </label>
                <label class="flex items-center gap-3">
                  <input
                    v-model="marketing"
                    type="checkbox"
                    class="accent-brand-600"
                  >
                  <span class="text-sm text-gray-700 dark:text-gray-300">
                    Marketing — cookies de publicidade e remarketing (GTM)
                  </span>
                </label>
              </div>

              <button
                class="mt-3 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
                @click="ui.openPrivacy()"
              >
                Saiba mais
              </button>
            </div>
          </div>

          <div class="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <button
              class="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              @click="rejectAll"
            >
              Recusar
            </button>
            <button
              class="rounded-lg bg-brand-600 px-4 py-2 text-white transition-colors hover:bg-brand-700"
              @click="acceptSelected"
            >
              Aceitar Selecionados
            </button>
            <button
              class="rounded-lg bg-brand-800 px-4 py-2 text-white transition-colors hover:bg-brand-900"
              @click="acceptAll"
            >
              Aceitar Todos
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
