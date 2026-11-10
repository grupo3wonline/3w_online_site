<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-600 focus-visible:ring-4 focus-visible:ring-green-300 no-print"
    aria-label="Falar no WhatsApp com o Grupo 3W Online"
  >
    <i class="fa-brands fa-whatsapp text-2xl" aria-hidden="true"></i>
    <span
      class="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
    >
      Fale conosco
    </span>
  </a>
</template>

<script setup>
import { WHATSAPP_LINK } from '@/config/site'

const link = `${WHATSAPP_LINK}?text=${encodeURIComponent(
  'Olá! Vim pela Calculadora Empresarial e gostaria de saber mais sobre desenvolvimento de sites e sistemas.'
)}`
</script>
