<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/common/ToolShell.vue'
import InfoCard from '@/components/common/InfoCard.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useCopy } from '@/composables/useClipboard'
import { toast } from '@/lib/notify'
import { formatString, type InputFormat, type OutputFormat } from '@/lib/stringFormat'

const input = ref('')
const output = ref('')
const inputFormat = ref<InputFormat>('text')
const outputFormat = ref<OutputFormat>('escaped')
const { copyText } = useCopy()

function process() {
  try {
    output.value = formatString(input.value, inputFormat.value, outputFormat.value)
    toast('String processada com sucesso!')
  } catch {
    toast('Erro ao processar a string.', 'error')
  }
}

function clearAll() {
  input.value = ''
  output.value = ''
}

const escapeItems = [
  '\\n — nova linha (Line Feed)',
  '\\r — retorno de carro (Carriage Return)',
  '\\t — tabulação (Tab)',
  '\\f — Form Feed / \\v — tab vertical',
]

const otherItems = [
  '\\0 — caractere nulo / \\\\ — barra invertida',
  "\\' e \\\" — aspas simples e duplas",
  '\\uXXXX — escape Unicode',
  'Códigos ASCII (0-255)',
]
</script>

<template>
  <ToolShell
    icon="lucide:type"
    title="Formatador de Strings e Caracteres Especiais"
    description="Converta entre texto simples, sequências de escape, códigos ASCII e escapes Unicode."
    help="Escolha o formato de entrada e o de saída, depois clique em Converter."
  >
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Icon icon="lucide:type" class="h-5 w-5 text-primary" />
          Conversor de Formato
        </CardTitle>
        <CardDescription>Selecione os formatos de entrada e saída.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label>Formato de entrada</Label>
            <Select v-model="inputFormat">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto normal</SelectItem>
                <SelectItem value="escaped">Texto com escape (\n, \t, ...)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label>Formato de saída</Label>
            <Select v-model="outputFormat">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto normal</SelectItem>
                <SelectItem value="escaped">Texto com escape (\n, \t, ...)</SelectItem>
                <SelectItem value="ascii">Códigos ASCII</SelectItem>
                <SelectItem value="unicode">Unicode escape (\uXXXX)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-3">
            <h3 class="font-semibold">Entrada</h3>
            <Textarea
              v-model="input"
              placeholder="Digite ou cole seu texto aqui..."
              class="min-h-[300px] font-mono text-sm"
            />
            <div class="flex flex-wrap gap-2">
              <Button variant="brand" :disabled="!input.trim()" @click="process">Converter</Button>
              <Button variant="outline" @click="clearAll">
                <Icon icon="lucide:rotate-ccw" class="h-4 w-4" />
                Limpar
              </Button>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Saída</h3>
              <Button v-if="output" variant="outline" size="sm" @click="copyText(output)">
                <Icon icon="lucide:copy" class="h-4 w-4" />
                Copiar
              </Button>
            </div>
            <Textarea
              :model-value="output"
              readonly
              placeholder="O resultado aparecerá aqui..."
              class="min-h-[300px] bg-muted font-mono text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <InfoCard
        title="Sequências de escape"
        icon="lucide:corner-down-left"
        accent="text-teal-500"
        :items="escapeItems"
      />
      <InfoCard
        title="Outros formatos"
        icon="lucide:file-digit"
        accent="text-cyan-500"
        :items="otherItems"
      />
    </div>
  </ToolShell>
</template>
