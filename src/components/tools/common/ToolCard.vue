<template>
  <RouterLink
    :to="tool.path"
    class="block bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-primary-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
  >
    <div>
      <div class="flex items-start gap-3.5 mb-3">
        <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-sm">
          <i :class="['fas', tool.icon, 'text-lg']"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
            {{ tool.name }}
          </h3>
          <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 capitalize">
            {{ getCategoryName(tool.category) }}
          </span>
        </div>
      </div>

      <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
        {{ tool.description }}
      </p>
    </div>

    <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-primary-600 font-semibold group-hover:text-primary-700">
      <span class="text-[11px]">Abrir Ferramenta</span>
      <Icon icon="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

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
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
