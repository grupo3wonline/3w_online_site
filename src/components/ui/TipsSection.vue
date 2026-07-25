<template>
  <div>
    <div class="flex items-center justify-center gap-2 mb-4">
      <Icon icon="mdi:lightbulb-on" class="w-6 h-6 text-primary-600" />
      <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
    </div>
    <div class="space-y-2 max-w-2xl mx-auto">
      <div
        v-for="(tip, index) in tips"
        :key="index"
        class="border border-gray-200 rounded-lg overflow-hidden"
      >
        <button
          class="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
          :aria-expanded="openIndex === index"
          @click="toggle(index)"
        >
          <span class="font-medium text-sm text-gray-800">{{ tip.title }}</span>
          <Icon
            icon="mdi:chevron-right"
            class="w-5 h-5 text-gray-500 transition-transform flex-shrink-0"
            :class="{ 'rotate-90': openIndex === index }"
          />
        </button>
        <div v-show="openIndex === index" class="px-4 py-3 bg-white border-t border-gray-100">
          <p class="text-sm text-gray-600 leading-relaxed">{{ tip.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

interface Tip {
  title: string
  content: string
}

withDefaults(defineProps<{
  title?: string
  tips: Tip[]
}>(), {
  title: 'Dicas',
})

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.rotate-90 {
  transform: rotate(90deg);
}
</style>
