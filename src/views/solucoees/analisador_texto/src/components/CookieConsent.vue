<template>
  <transition name="slide-up" appear>
    <div
      v-if="consent.bannerVisible"
      class="fixed bottom-0 inset-x-0 z-[9998] p-4"
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de privacidade"
    >
      <div
        class="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-5 md:p-6"
      >
        <div class="flex flex-col gap-4">
          <div>
            <h2 class="font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
              <i class="fa-solid fa-cookie-bite text-amber-500" aria-hidden="true"></i>
              {{ t('consent.title') }}
            </h2>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ t('consent.description') }}
            </p>
          </div>

          <!-- Preferências granulares -->
          <transition name="slide-down">
            <div v-if="showDetails" class="space-y-2">
              <div
                v-for="cat in categories"
                :key="cat.key"
                class="flex items-start justify-between gap-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
              >
                <div>
                  <p class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ cat.label }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ cat.desc }}</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    :checked="cat.locked ? true : prefs[cat.key as 'analytics' | 'marketing']"
                    :disabled="cat.locked"
                    @change="onToggle(cat.key, ($event.target as HTMLInputElement).checked)"
                  />
                  <span
                    class="w-10 h-5 bg-slate-300 dark:bg-slate-600 rounded-full peer-checked:bg-primary-600 peer-disabled:opacity-60 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
                  ></span>
                </label>
              </div>
            </div>
          </transition>

          <!-- Ações -->
          <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              v-if="!showDetails"
              type="button"
              class="btn-ghost text-sm px-4 py-2.5 border border-slate-200 dark:border-slate-600"
              @click="showDetails = true"
            >
              <i class="fa-solid fa-sliders" aria-hidden="true"></i> {{ t('consent.customize') }}
            </button>
            <button
              v-else
              type="button"
              class="btn-ghost text-sm px-4 py-2.5 border border-slate-200 dark:border-slate-600"
              @click="consent.savePreferences(prefs)"
            >
              <i class="fa-solid fa-check" aria-hidden="true"></i> {{ t('consent.save') }}
            </button>
            <button
              type="button"
              class="btn-ghost text-sm px-4 py-2.5 border border-slate-200 dark:border-slate-600"
              @click="consent.rejectAll()"
            >
              <i class="fa-solid fa-xmark" aria-hidden="true"></i> {{ t('consent.rejectAll') }}
            </button>
            <button type="button" class="btn-primary text-sm px-5 py-2.5" @click="consent.acceptAll()">
              <i class="fa-solid fa-shield-halved" aria-hidden="true"></i> {{ t('consent.acceptAll') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConsentStore } from '@/stores/consent'

const { t } = useI18n()
const consent = useConsentStore()

const showDetails = ref(false)
const prefs = reactive({ analytics: false, marketing: false })

function onToggle(key: 'necessary' | 'analytics' | 'marketing', value: boolean) {
  if (key === 'necessary') return
  prefs[key] = value
}

const categories = computed(() => [
  {
    key: 'necessary' as const,
    label: t('consent.necessary'),
    desc: t('consent.necessaryDesc'),
    locked: true
  },
  {
    key: 'analytics' as const,
    label: t('consent.analytics'),
    desc: t('consent.analyticsDesc'),
    locked: false
  },
  {
    key: 'marketing' as const,
    label: t('consent.marketing'),
    desc: t('consent.marketingDesc'),
    locked: false
  }
])
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
