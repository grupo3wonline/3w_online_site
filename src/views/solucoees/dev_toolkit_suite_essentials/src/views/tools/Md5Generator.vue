<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/common/ToolShell.vue'
import InfoCard from '@/components/common/InfoCard.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { md5 } from '@/lib/md5'
import { useCopy } from '@/composables/useClipboard'
import { toast } from '@/lib/notify'

const input = ref('')
const hash = ref('')
const { copyText } = useCopy()

function generate() {
  if (!input.value.trim()) return
  hash.value = md5(input.value)
  toast('Hash MD5 gerado com sucesso!')
}

function clearAll() {
  input.value = ''
  hash.value = ''
}
</script>

<template>
  <ToolShell
    icon="lucide:hash"
    title="Gerador de Hash MD5"
    description="Gere hash MD5 a partir de qualquer texto. Ideal para checksums, verificação de integridade e aplicações não sensíveis."
    help="O MD5 produz sempre 32 caracteres hexadecimais. A mesma entrada gera sempre o mesmo hash."
  >
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Icon icon="lucide:hash" class="h-5 w-5 text-primary" />
          Gerar Hash MD5
        </CardTitle>
        <CardDescription>Digite seu texto e clique em gerar para criar o hash.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <label for="md5-input" class="mb-2 block text-sm font-medium">Entrada de texto</label>
          <Textarea
            id="md5-input"
            v-model="input"
            placeholder="Digite o texto que deseja transformar em hash... Ex.: minha senha secreta"
            class="min-h-[120px] font-mono text-sm"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          <Button variant="brand" :disabled="!input.trim()" @click="generate">
            <Icon icon="lucide:hash" class="h-4 w-4" />
            Gerar Hash MD5
          </Button>
          <Button variant="outline" @click="clearAll">
            <Icon icon="lucide:rotate-ccw" class="h-4 w-4" />
            Limpar
          </Button>
        </div>

        <div v-if="hash" class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium">Resultado (MD5)</label>
            <Button variant="outline" size="sm" @click="copyText(hash)">
              <Icon icon="lucide:copy" class="h-4 w-4" />
              Copiar
            </Button>
          </div>
          <Input :model-value="hash" readonly class="bg-muted font-mono text-sm font-semibold text-primary" />
        </div>
      </CardContent>
    </Card>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <InfoCard
        title="Sobre o MD5"
        icon="lucide:info"
        accent="text-primary"
        :items="[
          'Cria um valor de hash de 128 bits (32 caracteres)',
          'Função unidirecional — não pode ser revertida',
          'A mesma entrada sempre produz o mesmo hash',
          'Entradas diferentes produzem hashes diferentes',
        ]"
      />
      <InfoCard
        title="Casos de uso comuns"
        icon="lucide:list-checks"
        accent="text-orange-500"
        :items="[
          'Verificação de integridade de arquivos',
          'Deduplicação de dados',
          'Identificadores de cache',
          'Checksums e perícia digital',
        ]"
      />
      <InfoCard
        title="Aviso de segurança"
        icon="lucide:shield-alert"
        accent="text-destructive"
        class="md:col-span-2"
        text="O MD5 não é recomendado para fins criptográficos devido a vulnerabilidades conhecidas de colisão. Para segurança, prefira SHA-256 ou algoritmos modernos. O MD5 continua útil para checksums e usos não relacionados à segurança."
      />
    </div>
  </ToolShell>
</template>
