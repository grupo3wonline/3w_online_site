<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useConsentStore } from '@/stores/consent'

const { t } = useI18n()
const consent = useConsentStore()

const showOptions = ref(false)
const analytics = ref(consent.preferences.analytics)
const preferences = ref(consent.preferences.preferences)

const showBanner = computed(() => !consent.hasConsent)

function acceptAll(): void {
  consent.acceptAll()
}
function rejectAll(): void {
  consent.rejectAll()
}
function saveSelected(): void {
  consent.save({ analytics: analytics.value, preferences: preferences.value })
}
</script>

<template>
  <Transition name="cookie-slide">
    <section
      v-if="showBanner"
      class="fixed inset-x-0 bottom-0 z-[9998] border-t border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur dark:border-gray-700 dark:bg-gray-900/95"
      role="dialog"
      aria-label="Consentimento de cookies"
      aria-live="polite"
    >
      <div class="mx-auto max-w-5xl">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div class="flex-1">
            <h3
              class="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white"
            >
              <Icon icon="ph:cookie-bold" class="h-5 w-5 text-primary-600" aria-hidden="true" />
              {{ t('cookie.title') }}
            </h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {{ t('cookie.text') }}
              {{ t('cookie.seeMore') }}
              <RouterLink
                to="/politica-de-privacidade"
                class="font-medium text-primary-600 underline hover:text-primary-700 dark:text-primary-400"
              >
                {{ t('cookie.policyLink') }}</RouterLink
              >.
            </p>

            <div v-if="showOptions" class="mt-4 space-y-2">
              <label class="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                <input
                  type="checkbox"
                  checked
                  disabled
                  class="h-4 w-4 rounded accent-primary-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">
                  {{ t('cookie.essential') }}
                  <span
                    class="ml-1 rounded bg-primary-100 px-1.5 py-0.5 text-xs text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                    >{{ t('cookie.essentialTag') }}</span
                  >
                </span>
              </label>
              <label class="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                <input
                  v-model="analytics"
                  type="checkbox"
                  class="h-4 w-4 rounded accent-primary-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{
                  t('cookie.analytics')
                }}</span>
              </label>
              <label class="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                <input
                  v-model="preferences"
                  type="checkbox"
                  class="h-4 w-4 rounded accent-primary-600"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{
                  t('cookie.preferences')
                }}</span>
              </label>
            </div>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row lg:flex-col lg:w-52">
            <button
              type="button"
              class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              @click="acceptAll"
            >
              {{ t('cookie.acceptAll') }}
            </button>
            <button
              v-if="showOptions"
              type="button"
              class="rounded-lg border border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:hover:bg-gray-800"
              @click="saveSelected"
            >
              {{ t('cookie.save') }}
            </button>
            <button
              type="button"
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              @click="showOptions = !showOptions"
            >
              {{ showOptions ? t('cookie.hide') : t('cookie.customize') }}
            </button>
            <button
              type="button"
              class="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
              @click="rejectAll"
            >
              {{ t('cookie.reject') }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
