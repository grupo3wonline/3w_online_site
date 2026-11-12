<!-- FaqAccordion.vue — Acordeão de FAQ com dark mode e acessibilidade aprimorada -->
<template>
  <div class="space-y-2" role="list">
    <div
      v-for="(faq, index) in items"
      :key="index"
      class="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden"
      role="listitem"
    >
      <button
        class="w-full text-left px-4 py-3.5
               bg-gray-50 dark:bg-slate-800
               hover:bg-primary-50 dark:hover:bg-primary-900/20
               transition-colors flex justify-between items-center gap-3
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
        :aria-expanded="openIndex === index"
        :aria-controls="`faq-panel-${index}`"
        @click="toggle(index)"
      >
        <span class="font-semibold text-gray-900 dark:text-white text-sm leading-snug text-left">
          {{ faq.question }}
        </span>
        <i
          :class="[
            'fas fa-chevron-down text-xs text-gray-500 dark:text-slate-400 flex-shrink-0 transition-transform duration-200',
            { 'rotate-180': openIndex === index }
          ]"
          aria-hidden="true"
        ></i>
      </button>
      <Transition name="accordion">
        <div
          v-show="openIndex === index"
          :id="`faq-panel-${index}`"
          role="region"
          class="px-4 py-3.5 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-700"
        >
          <p class="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{{ faq.answer }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FaqItem {
  question: string
  answer: string
}

defineProps<{ items: FaqItem[] }>()

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.25s ease, opacity 0.2s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
