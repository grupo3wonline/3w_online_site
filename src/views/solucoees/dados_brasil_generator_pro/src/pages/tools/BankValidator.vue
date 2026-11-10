<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { validateContaBancaria } from '@/lib/validators'

const agency = ref('')
const account = ref('')
const result = ref<boolean | null>(null)

function check() {
  if (!agency.value.trim() && !account.value.trim()) {
    result.value = null
    return
  }
  result.value = validateContaBancaria(agency.value, account.value)
}
</script>

<template>
  <ToolPageLayout
    slug="validador-conta-bancaria"
    tip="Validação de formato de agência e conta. Cada banco possui regras próprias de dígito."
  >
    <div class="space-y-5 rounded-2xl border border-border bg-card p-6">
      <div class="grid gap-3 sm:grid-cols-2">
        <div>
          <label class="mb-1 block text-sm font-medium" for="bank-ag">Agência</label>
          <input
            id="bank-ag"
            v-model="agency"
            type="text"
            autocomplete="off"
            placeholder="0000"
            class="h-14 w-full rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
            @input="result = null"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium" for="bank-acc">Conta</label>
          <input
            id="bank-acc"
            v-model="account"
            type="text"
            autocomplete="off"
            placeholder="00000-0"
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
