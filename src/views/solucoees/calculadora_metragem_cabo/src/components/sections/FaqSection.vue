<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const keys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const
const openIndex = ref<number | null>(0)

function toggle(index: number): void {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section id="faq" class="section scroll-mt-24 bg-gray-50 dark:bg-gray-950">
    <div class="mx-auto max-w-3xl">
      <div class="text-center">
        <span
          class="badge bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300"
        >
          <Icon icon="ph:question-bold" class="h-4 w-4" aria-hidden="true" />
          FAQ
        </span>
        <h2 class="section-title mt-4">{{ t('faq.title') }}</h2>
        <p class="section-subtitle">{{ t('faq.subtitle') }}</p>
      </div>

      <dl class="mt-10 space-y-3">
        <div
          v-for="(key, index) in keys"
          :key="key"
          class="overflow-hidden rounded-2xl border transition-colors"
          :class="
            openIndex === index
              ? 'border-primary-300 bg-white shadow-soft dark:border-primary-800 dark:bg-gray-900'
              : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
          "
        >
          <dt>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-medium text-gray-900 transition-colors hover:text-primary-700 dark:text-white dark:hover:text-primary-400"
              :aria-expanded="openIndex === index"
              @click="toggle(index)"
            >
              <span>{{ t(`faq.items.${key}.q`) }}</span>
              <span
                class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all"
                :class="
                  openIndex === index
                    ? 'rotate-180 bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800'
                "
              >
                <Icon icon="ph:caret-down-bold" class="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
          </dt>
          <Transition name="faq">
            <dd
              v-if="openIndex === index"
              class="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
            >
              {{ t(`faq.items.${key}.a`) }}
            </dd>
          </Transition>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.faq-enter-active,
.faq-leave-active {
  transition: opacity 0.2s ease;
}
.faq-enter-from,
.faq-leave-to {
  opacity: 0;
}
</style>
