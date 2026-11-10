<template>
  <div class="overflow-hidden rounded-2xl bg-card shadow-lg">
    <div class="h-1 bg-gradient-to-r" :class="barra"></div>
    <div class="p-6">
      <h3 class="mb-4 text-lg font-bold" :class="cor">
        <i :class="icone" class="mr-2"></i>{{ titulo }}
      </h3>
      <div :class="colunas ? 'grid grid-cols-2 gap-2' : 'space-y-2'">
        <div
          v-for="item in itens"
          :key="item.label"
          class="flex justify-between rounded-lg bg-muted/30 p-2"
        >
          <span class="text-sm">{{ item.label }}</span>
          <span class="text-sm font-semibold">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItemQuantidade } from '@/lib/calculadora'

defineProps<{
  titulo: string
  icone: string
  cor: string
  barra: string
  itens: ItemQuantidade[]
  colunas?: boolean
}>()
</script>
