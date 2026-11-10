<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

interface Crumb {
  labelKey: string
}

const route = useRoute()
const { t } = useI18n()

const crumbs = computed<Crumb[]>(() => (route.meta.breadcrumb as Crumb[]) ?? [])
const showBreadcrumb = computed(() => crumbs.value.length > 0)
</script>

<template>
  <nav
    v-if="showBreadcrumb"
    aria-label="Trilha de navegação"
    class="border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80"
  >
    <ol
      class="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3 text-sm text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8"
    >
      <li>
        <router-link
          to="/"
          class="inline-flex items-center gap-1 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
        >
          <Icon icon="ph:house-bold" class="h-4 w-4" aria-hidden="true" />
          <span>{{ t('breadcrumb.home') }}</span>
        </router-link>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="crumb.labelKey" class="flex items-center gap-1">
        <Icon icon="ph:caret-right-bold" class="h-3.5 w-3.5" aria-hidden="true" />
        <span
          :class="
            index === crumbs.length - 1
              ? 'font-medium text-gray-900 dark:text-gray-100'
              : ''
          "
          :aria-current="index === crumbs.length - 1 ? 'page' : undefined"
        >
          {{ t(crumb.labelKey) }}
        </span>
      </li>
    </ol>
  </nav>
</template>
