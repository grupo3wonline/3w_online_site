<template>
  <div class="space-y-2">
    <div
      v-for="(faq, index) in items"
      :key="index"
      class="border border-gray-200 rounded-lg overflow-hidden"
    >
      <button
        class="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center gap-3"
        :aria-expanded="openIndex === index"
        :aria-controls="`faq-panel-${index}`"
        @click="toggle(index)"
      >
        <span class="font-medium text-gray-900 text-sm">{{ faq.question }}</span>
        <Icon
          icon="mdi:chevron-down"
          class="w-5 h-5 text-gray-500 transition-transform flex-shrink-0"
          :class="{ 'rotate-180': openIndex === index }"
        />
      </button>
      <Transition name="accordion">
        <div
          v-show="openIndex === index"
          :id="`faq-panel-${index}`"
          role="region"
          class="px-4 py-3 bg-white border-t border-gray-100"
        >
          <p class="text-sm text-gray-600 leading-relaxed">{{ faq.answer }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

interface FaqItem {
  question: string
  answer: string
}

defineProps<{
  items: FaqItem[]
}>()

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.25s ease, opacity 0.25s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>
