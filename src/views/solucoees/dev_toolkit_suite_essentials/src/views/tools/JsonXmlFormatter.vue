<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/common/ToolShell.vue'
import InfoCard from '@/components/common/InfoCard.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCopy } from '@/composables/useClipboard'
import { toast, alertMessage } from '@/lib/notify'

const input = ref('')
const output = ref('')
const isValid = ref(true)
const activeTab = ref<'json' | 'xml'>('json')
const { copyText } = useCopy()

function formatXmlString(xml: string): string {
  const PADDING = '  '
  const reg = /(>)(<)(\/*)/g
  let pad = 0
  return xml
    .replace(reg, '$1\n$2$3')
    .split('\n')
    .map((node) => {
      let indent = 0
      if (/.+<\/\w[^>]*>$/.test(node)) {
        indent = 0
      } else if (/^<\/\w/.test(node) && pad > 0) {
        pad -= 1
      } else if (/^<\w[^>]*[^/]>.*$/.test(node)) {
        indent = 1
      }
      const line = PADDING.repeat(pad) + node
      pad += indent
      return line
    })
    .join('\n')
}

function format() {
  if (!input.value.trim()) return
  if (activeTab.value === 'json') {
    try {
      output.value = JSON.stringify(JSON.parse(input.value), null, 2)
      isValid.value = true
      toast('JSON formatado com sucesso!')
    } catch {
      isValid.value = false
      alertMessage('JSON inválido', 'Verifique a sintaxe do seu JSON e tente novamente.', 'error')
    }
  } else {
    try {
      const doc = new DOMParser().parseFromString(input.value, 'text/xml')
      if (doc.getElementsByTagName('parsererror').length > 0) throw new Error('invalid')
      const raw = new XMLSerializer().serializeToString(doc)
      output.value = formatXmlString(raw)
      isValid.value = true
      toast('XML formatado com sucesso!')
    } catch {
      isValid.value = false
      alertMessage('XML inválido', 'Verifique a sintaxe do seu XML e tente novamente.', 'error')
    }
  }
}

function validateOnly() {
  if (!input.value.trim()) return
  if (activeTab.value === 'json') {
    try {
      JSON.parse(input.value)
      isValid.value = true
      alertMessage('JSON válido', 'A sintaxe do seu JSON está correta!', 'success')
    } catch {
      isValid.value = false
      alertMessage('JSON inválido', 'Verifique a sintaxe do seu JSON.', 'error')
    }
  } else {
    const doc = new DOMParser().parseFromString(input.value, 'text/xml')
    if (doc.getElementsByTagName('parsererror').length === 0) {
      isValid.value = true
      alertMessage('XML válido', 'A sintaxe do seu XML está correta!', 'success')
    } else {
      isValid.value = false
      alertMessage('XML inválido', 'Verifique a sintaxe do seu XML.', 'error')
    }
  }
}

function clearAll() {
  input.value = ''
  output.value = ''
  isValid.value = true
}

const jsonPlaceholder = 'Cole seu JSON aqui...\n\nExemplo:\n{"nome": "João", "idade": 30, "ativo": true}'
const xmlPlaceholder =
  'Cole seu XML aqui...\n\nExemplo:\n<pessoa><nome>João</nome><idade>30</idade></pessoa>'
</script>

<template>
  <ToolShell
    icon="lucide:code-2"
    title="Formatador e Validador JSON/XML"
    description="Formate, valide e embeleze seus dados JSON e XML com indentação automática e detecção de erros."
    help="Use 'Apenas validar' para checar a sintaxe sem reformatar. A formatação reorganiza a indentação."
  >
    <Card>
      <CardHeader>
        <Tabs v-model="activeTab">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="json">Formatador JSON</TabsTrigger>
            <TabsTrigger value="xml">Formatador XML</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Entrada</h3>
              <span v-if="!isValid" class="flex items-center gap-1 text-sm text-destructive">
                <Icon icon="lucide:alert-circle" class="h-4 w-4" />
                Sintaxe inválida
              </span>
            </div>
            <Textarea
              v-model="input"
              :placeholder="activeTab === 'json' ? jsonPlaceholder : xmlPlaceholder"
              class="min-h-[320px] font-mono text-sm"
            />
            <div class="flex flex-wrap gap-2">
              <Button variant="brand" :disabled="!input.trim()" @click="format">
                Formatar {{ activeTab.toUpperCase() }}
              </Button>
              <Button variant="outline" :disabled="!input.trim()" @click="validateOnly">
                Apenas validar
              </Button>
              <Button variant="outline" @click="clearAll">
                <Icon icon="lucide:rotate-ccw" class="h-4 w-4" />
                Limpar
              </Button>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Saída formatada</h3>
              <Button v-if="output" variant="outline" size="sm" @click="copyText(output)">
                <Icon icon="lucide:copy" class="h-4 w-4" />
                Copiar
              </Button>
            </div>
            <Textarea
              :model-value="output"
              readonly
              placeholder="A saída formatada aparecerá aqui..."
              class="min-h-[320px] bg-muted font-mono text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <InfoCard
        title="Formatação JSON"
        icon="lucide:braces"
        accent="text-blue-500"
        :items="[
          'Cole JSON minificado para torná-lo legível',
          'Valida a sintaxe automaticamente',
          'Suporta objetos e arrays aninhados',
          'Preserva tipos de dados e estrutura',
        ]"
      />
      <InfoCard
        title="Formatação XML"
        icon="lucide:file-code"
        accent="text-orange-500"
        :items="[
          'Indentação adequada para leitura',
          'Valida sintaxe e estrutura XML',
          'Lida com atributos e elementos aninhados',
          'Funciona com qualquer XML válido',
        ]"
      />
    </div>
  </ToolShell>
</template>
