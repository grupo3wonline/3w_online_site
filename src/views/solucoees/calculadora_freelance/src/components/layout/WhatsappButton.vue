<script setup lang="ts">
import { COMPANY } from '@/lib/constants'
</script>

<template>
  <a
    :href="COMPANY.whatsappLink"
    target="_blank"
    rel="noopener noreferrer"
    class="group fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-600 hover:shadow-xl"
    aria-label="Falar no WhatsApp"
    title="Falar no WhatsApp"
  >
    <span
      class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-40"
    ></span>
    <i class="fab fa-whatsapp relative text-2xl"></i>
    <span
      class="pointer-events-none absolute left-16 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-gray-700"
    >
      Fale conosco no WhatsApp
    </span>
  </a>
</template>
