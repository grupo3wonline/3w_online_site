<template>
  <a
    href="https://wa.me/5541996924829?text=Olá! Gostaria de saber mais sobre os serviços da 3W Online."
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
import { Icon } from '@iconify/vue'
</script>
