<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/common/ToolShell.vue'
import InfoCard from '@/components/common/InfoCard.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { uuidList } from '@/lib/uuid'
import { useCopy } from '@/composables/useClipboard'
import { toast } from '@/lib/notify'

const count = ref(5)
const uppercase = ref(false)
const uuids = ref<string[]>([])
const { copyText } = useCopy()

function generate() {
  let list = uuidList(count.value)
  if (uppercase.value) list = list.map((u) => u.toUpperCase())
  uuids.value = list
  toast(`${list.length} UUID(s) gerado(s)!`)
}

function copyOne(u: string) {
  copyText(u, 'UUID copiado!')
}

function copyAll() {
  if (uuids.value.length) copyText(uuids.value.join('\n'), 'Todos os UUIDs copiados!')
}

// Gera uma leva inicial
generate()
</script>

<template>
  <ToolShell
    icon="lucide:fingerprint"
    title="Gerador de UUID v4"
    description="Gere identificadores únicos universais (UUID v4) em lote, com geração criptograficamente segura via Web Crypto."
    help="UUID v4 é aleatório. A chance de colisão é praticamente nula, ideal para chaves e identificadores."
  >
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Icon icon="lucide:fingerprint" class="h-5 w-5 text-primary" />
          Configurações
        </CardTitle>
        <CardDescription>Escolha a quantidade e o formato dos UUIDs.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <Label for="uuid-count">Quantidade (1 a 100)</Label>
            <Input id="uuid-count" v-model.number="count" type="number" min="1" max="100" />
          </div>
          <div class="flex items-end">
            <label class="flex cursor-pointer items-center gap-2 text-sm">
              <input v-model="uppercase" type="checkbox" class="h-4 w-4 rounded border-input" />
              Maiúsculas
            </label>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button variant="brand" @click="generate">
            <Icon icon="lucide:refresh-cw" class="h-4 w-4" />
            Gerar
          </Button>
          <Button v-if="uuids.length" variant="outline" @click="copyAll">
            <Icon icon="lucide:copy" class="h-4 w-4" />
            Copiar todos
          </Button>
        </div>

        <div class="space-y-2">
          <ul class="divide-y rounded-lg border">
            <li
              v-for="(u, i) in uuids"
              :key="i"
              class="flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-sm"
            >
              <span class="truncate">{{ u }}</span>
              <button
                type="button"
                class="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                :aria-label="`Copiar ${u}`"
                @click="copyOne(u)"
              >
                <Icon icon="lucide:copy" class="h-4 w-4" />
              </button>
            </li>
          </ul>
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <Label>Saída em bloco</Label>
          </div>
          <Textarea :model-value="uuids.join('\n')" readonly class="min-h-[120px] bg-muted font-mono text-sm" />
        </div>
      </CardContent>
    </Card>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <InfoCard
        title="O que é um UUID?"
        icon="lucide:info"
        accent="text-pink-500"
        :items="[
          '128 bits, exibido em 36 caracteres',
          'Versão 4 = totalmente aleatório',
          'Não requer coordenação central',
          'Ideal para IDs de banco, chaves e correlação',
        ]"
      />
      <InfoCard
        title="Dicas de uso"
        icon="lucide:lightbulb"
        accent="text-rose-500"
        :items="[
          'Gere em lote para popular seeds/testes',
          'Use maiúsculas se seu sistema exigir',
          'Geração local e segura (Web Crypto)',
          'Copie individualmente ou em bloco',
        ]"
      />
    </div>
  </ToolShell>
</template>
