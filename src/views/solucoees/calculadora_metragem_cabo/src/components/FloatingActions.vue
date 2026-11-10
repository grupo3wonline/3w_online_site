<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useWindowScroll } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { COMPANY } from '@/config/site'

const { t } = useI18n()
const { y } = useWindowScroll({ behavior: 'smooth' })
const showTop = computed(() => y.value > 400)

function scrollToTop(): void {
  y.value = 0
}
</script>

<template>
  <div class="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 no-print">
    <!-- Voltar ao topo -->
    <Transition name="fab">
      <button
        v-if="showTop"
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-soft transition-all hover:scale-110 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        :aria-label="t('common.backToTop')"
        @click="scrollToTop"
      >
        <Icon icon="ph:arrow-up-bold" class="h-5 w-5" aria-hidden="true" />
      </button>
    </Transition>

    <!-- WhatsApp -->
    <a
      :href="COMPANY.whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-600/30 transition-transform hover:scale-110"
      :aria-label="t('contact.whatsappCta')"
    >
      <span class="absolute inset-0 animate-ping rounded-full bg-green-500/40" aria-hidden="true"></span>
      <Icon icon="ph:whatsapp-logo-fill" class="relative h-7 w-7" aria-hidden="true" />
    </a>
  </div>
</template>

<style scoped>
.fab-enter-active,
.fab-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.8);
}
</style>
