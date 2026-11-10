<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import { z } from 'zod'
import { fileTypeFromBuffer } from 'file-type'
import { downloadFile } from '@/lib/download'
import ToolShell from '@/components/common/ToolShell.vue'
import InfoCard from '@/components/common/InfoCard.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useUiStore } from '@/stores/ui'
import { toast } from '@/lib/notify'

type FileFormat = 'csv' | 'json' | 'xml' | 'xls' | 'xlsx'

const ui = useUiStore()
const inputFormat = ref<FileFormat>('csv')
const outputFormat = ref<FileFormat>('json')
const fileName = ref('')
const data = ref<Record<string, unknown>[] | null>(null)

const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

function resetOnFormatChange() {
  data.value = null
  fileName.value = ''
}

// Extensões que possuem assinatura binária (magic bytes) detectável
const BINARY_SIGNATURES: Record<string, string[]> = {
  xls: ['application/x-cfb'],
  xlsx: ['application/zip', 'application/x-cfb'],
}

async function validateMagicBytes(file: File): Promise<boolean> {
  // Só valida binários; formatos de texto (csv/json/xml) não têm assinatura confiável
  const expected = BINARY_SIGNATURES[inputFormat.value]
  if (!expected) return true
  const head = new Uint8Array(await file.slice(0, 4100).arrayBuffer())
  const detected = await fileTypeFromBuffer(head)
  if (!detected) return false
  return expected.includes(detected.mime)
}

async function processFile(file: File) {
  if (file.size > MAX_SIZE) {
    toast('Arquivo muito grande (máx. 10 MB).', 'error')
    return
  }

  // Verificação de segurança: confirma o tipo real do arquivo (magic bytes),
  // impedindo que um arquivo malicioso se passe por planilha via extensão.
  const ok = await ui.withLoading(() => validateMagicBytes(file), 'Verificando arquivo...')
  if (!ok) {
    toast('O conteúdo do arquivo não corresponde à extensão informada.', 'error')
    return
  }

  fileName.value = file.name
  const reader = new FileReader()

  reader.onload = (ev) => {
    const content = ev.target?.result
    ui.withLoading(() => {
      try {
        parseContent(content)
        toast('Arquivo carregado com sucesso!')
      } catch {
        toast('Erro ao processar o arquivo.', 'error')
      }
    }, 'Processando arquivo...')
  }

  if (inputFormat.value === 'xls' || inputFormat.value === 'xlsx') {
    reader.readAsArrayBuffer(file)
  } else {
    reader.readAsText(file)
  }
}

function handleUpload(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) processFile(file)
  target.value = ''
}

// --- Drag and drop ---
const isDragging = ref(false)

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (ext !== inputFormat.value) {
    toast(`Selecione o formato de entrada como ".${ext}" para este arquivo.`, 'error')
    return
  }
  processFile(file)
}

function parseContent(content: string | ArrayBuffer | null | undefined) {
  if (inputFormat.value === 'csv') {
    const res = Papa.parse(content as string, { header: true, skipEmptyLines: true })
    data.value = res.data as Record<string, unknown>[]
  } else if (inputFormat.value === 'json') {
    // Valida com Zod: aceita apenas objeto ou array de objetos (dados tabulares)
    const rowSchema = z.record(z.string(), z.unknown())
    const schema = z.union([rowSchema, z.array(rowSchema)])
    const parsed = schema.parse(JSON.parse(content as string))
    data.value = Array.isArray(parsed) ? parsed : [parsed]
  } else if (inputFormat.value === 'xml') {
    const doc = new DOMParser().parseFromString(content as string, 'text/xml')
    const items = Array.from(doc.getElementsByTagName('item'))
    data.value = items.map((item) => {
      const obj: Record<string, unknown> = {}
      Array.from(item.children).forEach((c) => (obj[c.tagName] = c.textContent))
      return obj
    })
  } else {
    const wb = XLSX.read(content, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    data.value = XLSX.utils.sheet_to_json(ws)
  }
}

function download() {
  if (!data.value || !data.value.length) {
    toast('Nenhum dado para converter.', 'error')
    return
  }
  ui.withLoading(() => {
    try {
      let blob: Blob
      const rows = data.value as Record<string, unknown>[]

      if (outputFormat.value === 'csv') {
        blob = new Blob([Papa.unparse(rows)], { type: 'text/csv;charset=utf-8' })
      } else if (outputFormat.value === 'json') {
        blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' })
      } else if (outputFormat.value === 'xml') {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${rows
          .map(
            (item) =>
              `  <item>\n${Object.entries(item)
                .map(([k, v]) => `    <${k}>${String(v ?? '')}</${k}>`)
                .join('\n')}\n  </item>`
          )
          .join('\n')}\n</root>`
        blob = new Blob([xml], { type: 'application/xml' })
      } else {
        const ws = XLSX.utils.json_to_sheet(rows)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Planilha1')
        const buf = XLSX.write(wb, { bookType: outputFormat.value, type: 'array' })
        blob = new Blob([buf], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
      }

      downloadFile(blob, `convertido.${outputFormat.value}`)
      toast('Arquivo convertido e baixado!')
    } catch {
      toast('Erro ao converter o arquivo.', 'error')
    }
  }, 'Convertendo...')
}

const preview = () => JSON.stringify((data.value ?? []).slice(0, 5), null, 2)
</script>

<template>
  <ToolShell
    icon="lucide:refresh-cw"
    title="Conversor de Formatos de Arquivo"
    description="Converta arquivos entre CSV, JSON, XML, XLS e XLSX com pré-visualização dos dados."
    help="Todo o processamento ocorre no seu navegador — nenhum arquivo é enviado a servidores. Limite de 10 MB."
  >
    <Card>
      <CardContent class="space-y-6 p-6">
        <div class="grid items-end gap-4 md:grid-cols-3">
          <div class="space-y-2">
            <Label>Formato de entrada</Label>
            <Select v-model="inputFormat" @update:model-value="resetOnFormatChange">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="xml">XML</SelectItem>
                <SelectItem value="xls">XLS</SelectItem>
                <SelectItem value="xlsx">XLSX</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex justify-center pb-2">
            <Icon icon="lucide:arrow-right" class="h-6 w-6 text-primary" />
          </div>
          <div class="space-y-2">
            <Label>Formato de saída</Label>
            <Select v-model="outputFormat">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="xml">XML</SelectItem>
                <SelectItem value="xls">XLS</SelectItem>
                <SelectItem value="xlsx">XLSX</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="space-y-4">
          <div
            class="rounded-lg border-2 border-dashed p-8 text-center transition-colors"
            :class="isDragging ? 'border-primary bg-primary/5' : 'border-input'"
            @dragover.prevent="isDragging = true"
            @dragenter.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
          >
            <Icon
              icon="lucide:upload-cloud"
              class="mx-auto h-12 w-12 transition-colors"
              :class="isDragging ? 'text-primary' : 'text-muted-foreground'"
            />
            <div class="mt-4">
              <label for="file-upload" class="cursor-pointer">
                <span class="font-medium text-primary hover:underline">Clique para enviar</span>
                <span class="text-muted-foreground"> ou arraste um arquivo .{{ inputFormat }} aqui</span>
              </label>
              <input
                id="file-upload"
                type="file"
                :accept="`.${inputFormat}`"
                class="hidden"
                @change="handleUpload"
              />
            </div>
            <p v-if="fileName" class="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon icon="lucide:file" class="h-4 w-4" />
              {{ fileName }}
            </p>
          </div>

          <Button variant="brand" size="lg" class="w-full" :disabled="!data" @click="download">
            <Icon icon="lucide:download" class="h-4 w-4" />
            Baixar convertido (.{{ outputFormat }})
          </Button>
        </div>

        <div v-if="data && data.length" class="space-y-2">
          <Label>Pré-visualização dos dados</Label>
          <div class="max-h-64 overflow-auto rounded-lg bg-muted p-4">
            <pre class="text-xs">{{ preview() }}</pre>
            <p v-if="data.length > 5" class="mt-2 text-xs text-muted-foreground">
              ... e mais {{ data.length - 5 }} registros
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <InfoCard
        title="Formatos suportados"
        icon="lucide:files"
        accent="text-amber-500"
        :items="[
          'CSV — valores separados por vírgula',
          'JSON — arrays de objetos',
          'XML — elementos <item> com campos',
          'XLS / XLSX — planilhas Excel',
        ]"
      />
      <InfoCard
        title="Dicas de uso"
        icon="lucide:lightbulb"
        accent="text-orange-500"
        :items="[
          'CSV deve conter cabeçalho na primeira linha',
          'JSON pode ser um objeto ou uma lista',
          'Para XML, use a estrutura <root><item>...',
          'Processamento 100% local e seguro',
        ]"
      />
    </div>
  </ToolShell>
</template>
