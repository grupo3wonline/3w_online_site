<script setup lang="ts">
import { ref } from 'vue'
import { vMaska } from 'maska/vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from './ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    slug: string
    placeholder: string
    validate: (value: string) => boolean
    mask?: string
    tip?: string
    example?: string
  }>(),
  {},
)

const input = ref('')
const result = ref<boolean | null>(null)

function check() {
  if (!input.value.trim()) {
    result.value = null
    return
  }
  result.value = props.validate(input.value)
}

function onInput() {
  result.value = null
}
</script>

<template>
  <ToolPageLayout :slug="slug" :tip="tip">
    <div class="space-y-5 rounded-2xl border border-border bg-card p-6">
      <input
        v-model="input"
        v-maska="mask ? { mask } : undefined"
        type="text"
        autocomplete="off"
        :placeholder="placeholder"
        class="h-14 w-full rounded-xl border border-border bg-background px-4 text-center text-xl outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
        @input="onInput"
        @keyup.enter="check"
      />

      <BaseButton block size="lg" @click="check">
        <Icon icon="lucide:search-check" class="h-5 w-5" /> Validar
      </BaseButton>

      <transition name="fade">
        <div
          v-if="result !== null"
          class="flex items-center justify-center gap-3 rounded-xl border p-4"
          :class="
            result
              ? 'border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400'
              : 'border-destructive/30 bg-destructive/10 text-destructive'
          "
          role="status"
          aria-live="polite"
        >
          <Icon :icon="result ? 'lucide:circle-check-big' : 'lucide:circle-x'" class="h-7 w-7" />
          <span class="text-xl font-bold">{{ result ? 'Válido' : 'Inválido' }}</span>
        </div>
      </transition>
    </div>

    <p v-if="example" class="text-center text-sm text-muted-foreground">
      <strong>Exemplo válido:</strong> <span class="font-mono">{{ example }}</span>
    </p>
  </ToolPageLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
