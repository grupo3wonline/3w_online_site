<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/common/ToolShell.vue'
import InfoCard from '@/components/common/InfoCard.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { generatePassword, estimateStrength, type PasswordOptions } from '@/lib/password'
import { useCopy } from '@/composables/useClipboard'
import { toast } from '@/lib/notify'

const opts = ref<PasswordOptions>({
  length: 16,
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
})

const password = ref('')
const { copyText } = useCopy()

const strength = computed(() => estimateStrength(password.value))
const strengthColor = computed(() => {
  const s = strength.value.score
  if (s >= 85) return 'bg-emerald-500'
  if (s >= 65) return 'bg-green-500'
  if (s >= 40) return 'bg-amber-500'
  return 'bg-destructive'
})

function generate() {
  const noneSelected =
    !opts.value.lowercase && !opts.value.uppercase && !opts.value.numbers && !opts.value.symbols
  if (noneSelected) {
    toast('Selecione ao menos um tipo de caractere.', 'error')
    return
  }
  password.value = generatePassword(opts.value)
}

function copyPwd() {
  if (password.value) copyText(password.value, 'Senha copiada!')
}

const toggles = [
  { key: 'lowercase' as const, label: 'Minúsculas (a-z)' },
  { key: 'uppercase' as const, label: 'Maiúsculas (A-Z)' },
  { key: 'numbers' as const, label: 'Números (0-9)' },
  { key: 'symbols' as const, label: 'Símbolos (!@#$)' },
  { key: 'excludeAmbiguous' as const, label: 'Excluir ambíguos (Il1O0o)' },
]

// Regenera ao mudar opções
watch(opts, generate, { deep: true })
generate()
</script>

<template>
  <ToolShell
    icon="lucide:shield-check"
    title="Gerador de Senhas Seguras"
    description="Crie senhas fortes e aleatórias com medidor de força. Geração criptograficamente segura, 100% no seu navegador."
    help="Recomendamos 16+ caracteres combinando todos os tipos. Nunca reutilize senhas entre serviços."
  >
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Icon icon="lucide:shield-check" class="h-5 w-5 text-primary" />
          Sua senha
        </CardTitle>
        <CardDescription>Ajuste as opções e gere uma nova senha.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- Resultado -->
        <div class="flex gap-2">
          <Input
            :model-value="password"
            readonly
            class="font-mono text-base"
            aria-label="Senha gerada"
          />
          <Button variant="outline" size="icon" aria-label="Copiar senha" @click="copyPwd">
            <Icon icon="lucide:copy" class="h-4 w-4" />
          </Button>
          <Button variant="brand" size="icon" aria-label="Gerar nova senha" @click="generate">
            <Icon icon="lucide:refresh-cw" class="h-4 w-4" />
          </Button>
        </div>

        <!-- Medidor de força -->
        <div class="space-y-1">
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Força</span>
            <span class="font-medium capitalize">{{ strength.label }}</span>
          </div>
          <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              class="h-full rounded-full transition-all duration-300"
              :class="strengthColor"
              :style="{ width: `${strength.score}%` }"
            />
          </div>
        </div>

        <!-- Comprimento -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <Label for="pwd-length">Comprimento</Label>
            <span class="text-sm font-medium tabular-nums">{{ opts.length }}</span>
          </div>
          <input
            id="pwd-length"
            v-model.number="opts.length"
            type="range"
            min="4"
            max="64"
            class="w-full accent-[hsl(var(--primary))]"
          />
        </div>

        <!-- Opções -->
        <div class="grid gap-3 sm:grid-cols-2">
          <label
            v-for="t in toggles"
            :key="t.key"
            class="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:bg-accent"
          >
            <input v-model="opts[t.key]" type="checkbox" class="h-4 w-4 rounded border-input" />
            {{ t.label }}
          </label>
        </div>
      </CardContent>
    </Card>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <InfoCard
        title="Boas práticas de senha"
        icon="lucide:lightbulb"
        accent="text-emerald-500"
        :items="[
          'Use 16 ou mais caracteres',
          'Combine letras, números e símbolos',
          'Uma senha única por serviço',
          'Guarde em um gerenciador de senhas',
        ]"
      />
      <InfoCard
        title="Por que confiar"
        icon="lucide:shield-check"
        accent="text-green-500"
        :items="[
          'Geração via Web Crypto (aleatoriedade forte)',
          '100% local — a senha não é transmitida',
          'Sem logs, sem armazenamento',
          'Código aberto e auditável',
        ]"
      />
    </div>
  </ToolShell>
</template>
