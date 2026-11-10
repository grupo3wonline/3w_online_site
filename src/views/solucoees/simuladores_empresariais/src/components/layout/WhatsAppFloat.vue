<script setup lang="ts">
import { Icon } from '@iconify/vue'

const url = `https://wa.me/5541996924829?text=${encodeURIComponent(
  'Olá! Vim pelos Simuladores Empresariais e gostaria de falar sobre um projeto.'
)}`
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group fixed bottom-6 right-6 z-[80] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105"
    aria-label="Falar no WhatsApp"
  >
    <Icon icon="fa6-brands:whatsapp" class="h-6 w-6" />
    <span
      class="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[140px] sm:inline"
    >
      Fale conosco
    </span>
  </a>
</template>
