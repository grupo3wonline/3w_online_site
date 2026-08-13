<template>
  <router-link
    :to="tool.path"
    class="block bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
  >
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <div
          class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
        >
          <i :class="['fas', tool.icon, 'text-white text-xl']"></i>
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h3
          class="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors"
        >
          {{ tool.name }}
        </h3>
        <p class="text-sm text-gray-600 line-clamp-2">
          {{ tool.description }}
        </p>

        <div class="mt-3 flex items-center justify-between">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 capitalize"
          >
            <i :class="getCategoryIcon(tool.category)" class="mr-1"></i>
            {{ getCategoryName(tool.category) }}
          </span>

          <span class="text-primary-600 group-hover:translate-x-1 transition-transform">
            <i class="fas fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  category: string
  path: string
}

defineProps<{
  tool: Tool
}>()

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    calculadoras: 'fas fa-calculator',
    geradores: 'fas fa-wand-magic-sparkles',
    texto: 'fas fa-text-height',
    conversores: 'fas fa-arrows-rotate',
    validadores: 'fas fa-check-circle',
    simuladores: 'fas fa-chart-line',
  }
  return icons[category] || 'fas fa-folder'
}

const getCategoryName = (category: string): string => {
  const names: Record<string, string> = {
    calculadoras: 'Calculadora',
    geradores: 'Gerador',
    texto: 'Texto',
    conversores: 'Conversor',
    validadores: 'Validador',
    simuladores: 'Simulador',
  }
  return names[category] || category
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
