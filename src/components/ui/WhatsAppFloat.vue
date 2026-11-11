<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-float"
    aria-label="Entrar em contato via WhatsApp"
    v-tooltip="'Fale conosco pelo WhatsApp'"
  >
    <Icon icon="mdi:whatsapp" class="w-7 h-7" />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const whatsappUrl = computed(() => {
  const num = import.meta.env.VITE_WHATSAPP_NUMBER || '5541996924829'
  const msg = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da 3W Online.')
  return `https://wa.me/${num}?text=${msg}`
})
</script>
