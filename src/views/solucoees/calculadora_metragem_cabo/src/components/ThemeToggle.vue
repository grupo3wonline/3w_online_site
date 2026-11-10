<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useThemeStore } from '@/stores/theme'
import { useI18n } from 'vue-i18n'

const theme = useThemeStore()
const { t } = useI18n()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 dark:text-gray-300 dark:hover:bg-gray-800"
    :aria-label="theme.isDark ? t('common.lightMode') : t('common.darkMode')"
    :title="theme.isDark ? t('common.lightMode') : t('common.darkMode')"
    @click="theme.toggle()"
  >
    <Icon :icon="theme.isDark ? 'ph:sun-bold' : 'ph:moon-bold'" class="h-5 w-5" aria-hidden="true" />
  </button>
</template>
