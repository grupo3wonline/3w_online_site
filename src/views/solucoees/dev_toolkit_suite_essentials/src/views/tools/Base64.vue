<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/common/ToolShell.vue'
import InfoCard from '@/components/common/InfoCard.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import CharCount from '@/components/common/CharCount.vue'
import { useCopy } from '@/composables/useClipboard'
import { toast } from '@/lib/notify'

type Mode = 'encode' | 'decode'

const input = ref('')
const output = ref('')
const mode = ref<Mode>('encode')
const { copyText } = useCopy()

function process() {
  if (!input.value.trim()) return
  try {
    if (mode.value === 'encode') {
      output.value = btoa(unescape(encodeURIComponent(input.value)))
      toast('Texto codificado em Base64!')
    } else {
      output.value = decodeURIComponent(escape(atob(input.value.trim())))
      toast('Base64 decodificado!')
    }
  } catch {
    toast(
      mode.value === 'encode' ? 'Falha ao codificar. Verifique a entrada.' : 'String Base64 inválida.',
      'error'
    )
  }
}

function switchMode() {
  mode.value = mode.value === 'encode' ? 'decode' : 'encode'
  input.value = output.value
  output.value = ''
}

function clearAll() {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <ToolShell
    icon="lucide:binary"
    title="Codificador / Decodificador Base64"
    description="Codifique texto para Base64 ou decodifique strings Base64 de volta para texto legível. Perfeito para transmissão e armazenamento de dados."
    help="Base64 converte dados binários em texto ASCII usando 64 caracteres. Não é criptografia — apenas codificação reversível."
  >
    <Card>
      <CardHeader>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{{ mode === 'encode' ? 'Codificar para Base64' : 'Decodificar de Base64' }}</CardTitle>
            <CardDescription>
              {{
                mode === 'encode'
                  ? 'Converta texto simples em uma string Base64.'
                  : 'Converta uma string Base64 de volta para texto simples.'
              }}
            </CardDescription>
          </div>
          <Button variant="outline" @click="switchMode">
            <Icon icon="lucide:arrow-up-down" class="h-4 w-4" />
            Mudar para {{ mode === 'encode' ? 'Decodificar' : 'Codificar' }}
          </Button>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <label for="b64-in" class="mb-2 block text-sm font-medium">
            {{ mode === 'encode' ? 'Texto simples' : 'String Base64' }}
          </label>
          <Textarea
            id="b64-in"
            v-model="input"
            :placeholder="
              mode === 'encode'
                ? 'Digite o texto que deseja codificar... Ex.: Olá, mundo!'
                : 'Cole a string Base64... Ex.: T2zDoSwgbXVuZG8h'
            "
            class="min-h-[150px] font-mono text-sm"
          />
          <div class="mt-1.5 flex justify-end">
            <CharCount :text="input" />
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button variant="brand" :disabled="!input.trim()" @click="process">
            {{ mode === 'encode' ? 'Codificar' : 'Decodificar' }}
          </Button>
          <Button variant="outline" @click="clearAll">
            <Icon icon="lucide:rotate-ccw" class="h-4 w-4" />
            Limpar
          </Button>
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <label class="text-sm font-medium">
              {{ mode === 'encode' ? 'Saída Base64' : 'Texto simples' }}
            </label>
            <Button v-if="output" variant="outline" size="sm" @click="copyText(output)">
              <Icon icon="lucide:copy" class="h-4 w-4" />
              Copiar
            </Button>
          </div>
          <Textarea
            :model-value="output"
            readonly
            placeholder="O resultado aparecerá aqui..."
            class="min-h-[150px] bg-muted font-mono text-sm"
          />
        </div>
      </CardContent>
    </Card>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <InfoCard
        title="Sobre a codificação Base64"
        icon="lucide:info"
        accent="text-emerald-500"
        :items="[
          'Converte dados binários em texto ASCII',
          'Usa 64 caracteres: A-Z, a-z, 0-9, + e /',
          'Comum em e-mail e aplicações web',
          'Seguro para transmissão em protocolos de texto',
        ]"
      />
      <InfoCard
        title="Casos de uso comuns"
        icon="lucide:list-checks"
        accent="text-blue-500"
        :items="[
          'Anexos de e-mail e codificação MIME',
          'Data URLs em HTML e CSS',
          'Tokens de autenticação de API',
          'Armazenamento de dados binários em bancos',
        ]"
      />
    </div>
  </ToolShell>
</template>
