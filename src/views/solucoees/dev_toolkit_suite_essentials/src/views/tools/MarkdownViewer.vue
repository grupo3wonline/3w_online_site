<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/common/ToolShell.vue'
import InfoCard from '@/components/common/InfoCard.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { renderMarkdown } from '@/lib/markdown'
import { downloadFile } from '@/lib/download'
import { useCopy } from '@/composables/useClipboard'
import { toast } from '@/lib/notify'

const input = ref('')
const { copyText } = useCopy()

const rendered = computed(() => renderMarkdown(input.value))

function clearAll() {
  input.value = ''
}

function download() {
  downloadFile(input.value, 'documento.md', 'text/markdown')
  toast('Arquivo Markdown baixado!')
}

const placeholder = `# Título

Digite ou cole seu **Markdown** aqui...

## Subtítulo

- Item 1
- Item 2

\`\`\`js
console.log('Olá, mundo!')
\`\`\``
</script>

<template>
  <ToolShell
    icon="lucide:file-text"
    title="Editor e Visualizador de Markdown"
    description="Escreva ou cole seu Markdown e veja a formatação em tempo real, com suporte a GitHub Flavored Markdown."
    help="A pré-visualização atualiza automaticamente enquanto você digita. HTML embutido é escapado por segurança."
  >
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Icon icon="lucide:file-text" class="h-5 w-5 text-primary" />
          Editor de Markdown
        </CardTitle>
        <CardDescription>Suporta tabelas, listas de tarefas, código e muito mais.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Código Markdown</h3>
              <div class="flex gap-2">
                <Button variant="outline" size="sm" :disabled="!input" @click="copyText(input)">
                  <Icon icon="lucide:copy" class="h-4 w-4" />
                  Copiar
                </Button>
                <Button variant="outline" size="sm" :disabled="!input" @click="download">
                  <Icon icon="lucide:download" class="h-4 w-4" />
                  Baixar
                </Button>
                <Button variant="outline" size="sm" @click="clearAll">
                  <Icon icon="lucide:rotate-ccw" class="h-4 w-4" />
                  Limpar
                </Button>
              </div>
            </div>
            <Textarea v-model="input" :placeholder="placeholder" class="min-h-[500px] font-mono text-sm" />
          </div>

          <div class="space-y-3">
            <h3 class="font-semibold">Visualização</h3>
            <div
              class="prose prose-slate min-h-[500px] max-w-none overflow-auto rounded-lg border bg-background p-4 dark:prose-invert"
            >
              <!-- eslint-disable-next-line vue/no-v-html -- HTML já sanitizado em lib/markdown.ts (HTML bruto é escapado antes do parse) -->
              <div v-if="input" v-html="rendered" />
              <p v-else class="italic text-muted-foreground">A visualização aparecerá aqui...</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <InfoCard
        title="Formatação básica"
        icon="lucide:pilcrow"
        accent="text-indigo-500"
        :items="[
          '# Título e ## Subtítulo',
          '**negrito** e *itálico*',
          '~~tachado~~ e `código inline`',
          '> citações e listas com -',
        ]"
      />
      <InfoCard
        title="Recursos avançados"
        icon="lucide:table"
        accent="text-violet-500"
        :items="[
          '[Link](https://url.com) e imagens',
          '- [ ] lista de tarefas / - [x] concluída',
          '| Tabela | Coluna | com pipes',
          '``` blocos de código ```',
        ]"
      />
    </div>
  </ToolShell>
</template>
