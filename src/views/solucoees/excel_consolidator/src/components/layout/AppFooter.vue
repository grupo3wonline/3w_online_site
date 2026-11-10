<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { DEVELOPER_CREDITS } from '@/constants'

  const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="glass-card mt-auto border-t border-white/5 px-4 py-6 sm:px-6">
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row"
    >
      <p class="text-xs text-slate-500">
        &copy; {{ currentYear }} — Sistema desenvolvido pelo desenvolvedor
        <span class="font-bold text-emerald-400">{{ DEVELOPER_CREDITS }}</span>
      </p>
      <router-link
        to="/privacidade"
        class="flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-emerald-400"
      >
        <Icon icon="mdi:shield-check-outline" class="h-3.5 w-3.5" />
        Política de Privacidade (LGPD)
      </router-link>
    </div>
  </footer>
</template>
