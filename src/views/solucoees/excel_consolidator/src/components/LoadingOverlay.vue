<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  withDefaults(
    defineProps<{
      message?: string
      show?: boolean
    }>(),
    {
      message: 'Processando arquivos...',
      show: true,
    },
  )
</script>

<template>
  <Transition name="fade">
    <div
      v-show="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      role="alert"
      aria-live="assertive"
    >
      <div
        class="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/90 px-8 py-6 shadow-2xl"
      >
        <Icon icon="svg-spinners:ring-resize" class="h-10 w-10 text-emerald-400" />
        <p class="text-sm font-medium text-slate-300">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>
