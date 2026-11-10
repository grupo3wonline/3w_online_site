<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { useI18n } from 'vue-i18n'
import { Icon } from '@/components/ui'

const { isDark, toggleDarkMode } = useTheme()
const { t } = useI18n()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent"
    :title="isDark ? t('nav.lightMode') : t('nav.darkMode')"
    :aria-label="t('nav.toggleTheme')"
    @click="toggleDarkMode"
  >
    <Icon :icon="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-5 w-5" />
  </button>
</template>
