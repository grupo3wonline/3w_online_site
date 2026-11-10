<template>
  <nav aria-label="Breadcrumb" class="mb-6">
    <ol
      class="flex items-center flex-wrap gap-1 text-sm text-gray-500 dark:text-gray-400"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-1"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <template v-if="index < items.length - 1">
          <router-link
            :to="item.path"
            class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            itemprop="item"
          >
            <span itemprop="name">{{ item.label }}</span>
          </router-link>
          <meta :content="String(index + 1)" itemprop="position" />
          <i class="fa-solid fa-chevron-right text-xs text-gray-400 dark:text-gray-500 mx-1"></i>
        </template>
        <template v-else>
          <span class="text-gray-900 dark:text-white font-medium" itemprop="name">
            {{ item.label }}
          </span>
          <meta :content="String(index + 1)" itemprop="position" />
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
