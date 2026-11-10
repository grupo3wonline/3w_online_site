<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { siteConfig } from '@/config/site'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'
</script>

<template>
  <BaseTooltip text="Precisa de ajuda? Fale conosco no WhatsApp" position="left">
    <a
      :href="siteConfig.developer.whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Ajuda via WhatsApp"
    >
      <Icon icon="lucide:message-circle-more" class="h-7 w-7" />
    </a>
  </BaseTooltip>
</template>
