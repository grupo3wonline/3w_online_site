<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useConsentStore } from '@/stores/consent'
import BaseButton from '@/components/ui/BaseButton.vue'

const consent = useConsentStore()
const showSettings = ref(false)
const prefs = ref({ analytics: false, marketing: false })

function saveCustom() {
  consent.savePreferences(prefs.value)
  showSettings.value = false
}
</script>

<template>
  <transition name="banner">
    <div
      v-if="!consent.decided"
      class="fixed inset-x-0 bottom-0 z-[150] p-4"
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies e privacidade"
    >
      <div class="container-app">
        <div class="glass rounded-2xl border border-border p-5 shadow-2xl sm:p-6">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex gap-3">
              <Icon icon="lucide:cookie" class="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h2 class="text-base font-bold text-foreground">{{ $t('cookies.title') }}</h2>
                <p class="mt-1 max-w-2xl text-sm text-muted-foreground">
                  {{ $t('cookies.message') }}
                  <RouterLink to="/privacidade" class="text-primary hover:underline">Saiba mais</RouterLink>.
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <BaseButton variant="ghost" size="sm" @click="showSettings = !showSettings">
                {{ $t('cookies.settings') }}
              </BaseButton>
              <BaseButton variant="outline" size="sm" @click="consent.rejectAll()">
                {{ $t('cookies.reject') }}
              </BaseButton>
              <BaseButton size="sm" @click="consent.acceptAll()">
                {{ $t('cookies.accept') }}
              </BaseButton>
            </div>
          </div>

          <!-- Preferências detalhadas -->
          <transition name="fade">
            <div v-if="showSettings" class="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-3">
              <label class="flex items-center gap-2 rounded-lg border border-border p-3 opacity-70">
                <input type="checkbox" checked disabled class="accent-primary" />
                <span class="text-sm font-medium">{{ $t('cookies.necessary') }}</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3">
                <input v-model="prefs.analytics" type="checkbox" class="accent-primary" />
                <span class="text-sm font-medium">{{ $t('cookies.analytics') }}</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3">
                <input v-model="prefs.marketing" type="checkbox" class="accent-primary" />
                <span class="text-sm font-medium">{{ $t('cookies.marketing') }}</span>
              </label>
              <div class="sm:col-span-3">
                <BaseButton size="sm" block @click="saveCustom">{{ $t('cookies.save') }}</BaseButton>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.banner-enter-active,
.banner-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.banner-enter-from,
.banner-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
