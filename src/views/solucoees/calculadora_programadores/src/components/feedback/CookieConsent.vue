<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";
import { useConsentStore } from "@/stores/consent";
import BaseButton from "@/components/ui/BaseButton.vue";

const consent = useConsentStore();
const showDetails = ref(false);
const analytics = ref(consent.state.analytics);

function savePreferences() {
  consent.save({ analytics: analytics.value });
}
</script>

<template>
  <transition name="slide-up">
    <div
      v-if="!consent.state.decided"
      class="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-4"
      role="dialog"
      aria-label="Aviso de privacidade e cookies"
      aria-live="polite"
    >
      <div
        class="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-5 shadow-xl sm:p-6"
      >
        <div class="flex items-start gap-3">
          <Icon
            icon="lucide:cookie"
            class="mt-0.5 h-6 w-6 shrink-0 text-primary"
          />
          <div class="flex-1">
            <h2 class="text-base font-bold text-foreground">
              Sua privacidade é importante
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Usamos cookies essenciais e, com o seu consentimento, cookies de análise (Google
              Analytics) para melhorar a experiência. Em conformidade com
              <strong>LGPD, GDPR, CCPA e POPIA</strong>. Saiba mais na
              <RouterLink
                :to="{ name: 'privacy' }"
                class="text-primary underline"
              >
                Política de Privacidade
              </RouterLink>.
            </p>

            <div
              v-if="showDetails"
              class="mt-4 space-y-2 rounded-lg bg-muted/40 p-3 text-sm"
            >
              <label class="flex items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  checked
                  disabled
                  class="accent-primary"
                >
                Cookies necessários (sempre ativos)
              </label>
              <label class="flex items-center gap-2 text-foreground">
                <input
                  v-model="analytics"
                  type="checkbox"
                  class="accent-primary"
                >
                Cookies de análise (Google Analytics)
              </label>
            </div>

            <div class="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <BaseButton
                size="sm"
                @click="consent.acceptAll()"
              >
                Aceitar todos
              </BaseButton>
              <BaseButton
                size="sm"
                variant="outline"
                @click="consent.rejectAll()"
              >
                Recusar não essenciais
              </BaseButton>
              <BaseButton
                v-if="!showDetails"
                size="sm"
                variant="ghost"
                @click="showDetails = true"
              >
                Gerenciar preferências
              </BaseButton>
              <BaseButton
                v-else
                size="sm"
                variant="secondary"
                @click="savePreferences"
              >
                Salvar preferências
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
