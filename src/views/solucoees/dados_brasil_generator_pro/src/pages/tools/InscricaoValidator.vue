<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { validateIE } from '@/lib/validators'

const ufs = ['SP', 'RJ', 'MG', 'PR', 'RS', 'BA', 'SC', 'GO', 'PE', 'CE', 'DF']
const uf = ref('SP')
const ie = ref('')
const result = ref<boolean | null>(null)

function check() {
  if (!ie.value.trim()) {
    result.value = null
    return
  }
  result.value = validateIE(ie.value, uf.value)
}
</script>

<template>
  <ToolPageLayout
    slug="validador-inscricao-estadual"
    tip="A regra de validação de IE é específica por UF. Aqui validamos o formato geral."
  >
    <div class="space-y-5 rounded-2xl border border-border bg-card p-6">
      <div class="grid gap-3 sm:grid-cols-[120px_1fr]">
        <div>
          <label class="mb-1 block text-sm font-medium" for="ie-uf">UF</label>
          <select
            id="ie-uf"
            v-model="uf"
            class="h-14 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-primary"
          >
            <option v-for="u in ufs" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium" for="ie-num">Inscrição Estadual</label>
          <input
            id="ie-num"
            v-model="ie"
            type="text"
            autocomplete="off"
            placeholder="Somente números"
            class="h-14 w-full rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
            @input="result = null"
            @keyup.enter="check"
          />
        </div>
      </div>

      <BaseButton block size="lg" @click="check">
        <Icon icon="lucide:search-check" class="h-5 w-5" /> Validar
      </BaseButton>

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
        <span class="text-xl font-bold">{{ result ? 'Formato válido' : 'Formato inválido' }}</span>
      </div>
    </div>
  </ToolPageLayout>
</template>
