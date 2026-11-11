<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const slugTabMap: Record<string, string> = {
  'texto-ordem-alfabetica': 'ordem', 'texto-inverter': 'inverter', 'texto-remover-acentos': 'acentos',
  'texto-newlines': 'newlines', 'texto-contador-ocorrencias': 'ocorrencias',
  'texto-cortar': 'cortar', 'texto-info-caracter': 'info',
}

const aba = ref('ordem')
onMounted(() => { aba.value = slugTabMap[route.params.slug as string] || 'ordem' })
watch(() => route.params.slug, (s) => { if (s) aba.value = slugTabMap[s as string] || aba.value })

const tabs = [
  { id: 'ordem', label: 'Ordem Alfabética', icon: 'mdi:sort-alphabetical-ascending' },
  { id: 'inverter', label: 'Inverter Texto', icon: 'mdi:format-text-rotation-180' },
  { id: 'acentos', label: 'Remover Acentos', icon: 'mdi:format-strikethrough' },
  { id: 'newlines', label: 'Manipular \n', icon: 'mdi:format-line-style' },
  { id: 'ocorrencias', label: 'Contar Ocorrências', icon: 'mdi:counter' },
  { id: 'cortar', label: 'Cortar Texto', icon: 'mdi:content-cut' },
  { id: 'info', label: 'Info do Caractere', icon: 'mdi:information-outline' },
  { id: 'contador', label: 'Contador de Chars', icon: 'mdi:counter' },
]

const input = ref('')
const output = ref('')

// Ordem alfabética
const ordemDir = ref<'asc'|'desc'>('asc')

// Newlines
const nlOp = ref('remover')
const nlReplace = ref(' ')

// Ocorrências
const palavraBusca = ref('')

// Cortar
const cortarInicio = ref(0)
const cortarFim = ref(100)

// Info caractere
const charInput = ref('')

function copiar() {
  navigator.clipboard.writeText(output.value || charInfo.value.join('\n'))
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}

function copiarInfo(text: string) {
  navigator.clipboard.writeText(text)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}

// ─── Processamentos ────────────────────────────────────────────────────────────
function processar() {
  const v = input.value
  switch (aba.value) {
    case 'ordem': {
      const linhas = v.split('\n').filter(l => l.trim())
      linhas.sort((a, b) => a.localeCompare(b, 'pt-BR'))
      if (ordemDir.value === 'desc') linhas.reverse()
      output.value = linhas.join('\n')
      break
    }
    case 'inverter':
      output.value = v.split('').reverse().join('')
      break
    case 'acentos':
      output.value = v.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      break
    case 'newlines': {
      if (nlOp.value === 'remover') output.value = v.replace(/\n+/g, ' ').trim()
      else if (nlOp.value === 'substituir') output.value = v.replace(/\n/g, nlReplace.value)
      else if (nlOp.value === 'espacar') output.value = v.replace(/\n/g, '\n\n')
      else if (nlOp.value === 'compactar') output.value = v.replace(/\n{2,}/g, '\n')
      break
    }
    case 'ocorrencias': {
      if (!palavraBusca.value.trim()) { output.value = '(informe uma palavra para buscar)'; break }
      const count = (v.match(new RegExp(palavraBusca.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length
      output.value = `A palavra "${palavraBusca.value}" aparece ${count} vez(es).`
      break
    }
    case 'cortar':
      output.value = v.slice(cortarInicio.value, cortarFim.value)
      break
    case 'contador':
      output.value = `Caracteres (com espaços): ${v.length}\nCaracteres (sem espaços): ${v.replace(/\s/g, '').length}\nPalavras: ${v.trim().split(/\s+/).filter(Boolean).length}\nLinhas: ${v.split('\n').length}\nParágrafos: ${v.split(/\n{2,}/).filter(Boolean).length}`
      break
  }
}

const charInfo = computed(() => {
  const c = charInput.value
  if (!c) return []
  return Array.from(c).map(ch => {
    const cp = ch.codePointAt(0) || 0
    return `Char: "${ch}" | Unicode: U+${cp.toString(16).toUpperCase().padStart(4,'0')} | Decimal: ${cp} | Hexadecimal: 0x${cp.toString(16).toUpperCase()} | HTML: &#${cp}; | Binário: ${cp.toString(2).padStart(8,'0')}`
  })
})

watch([aba, input, ordemDir, nlOp, nlReplace, palavraBusca, cortarInicio, cortarFim], processar)
onMounted(processar)
</script>

<template>
  <ToolShell title="Ferramentas de Texto" description="Ordem alfabética, inverter texto, remover acentos, manipular newlines, contar ocorrências e mais."
    icon="fa-font" icon-gradient="from-violet-500 to-purple-700" orb-color="purple"
    :quick-tips="['7+ operações','Resultado imediato','Copiar com 1 clique']"
    :tips="[{title:'Uso',text:'Selecione a operação, insira o texto e veja o resultado imediatamente.'}]">

    <div class="tab-row !mb-4">
      <button v-for="t in tabs" :key="t.id" @click="aba = t.id"
        :class="['flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba===t.id?'bg-violet-600 text-white border-violet-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
      </button>
    </div>

    <!-- Options per tab -->
    <div v-if="aba==='ordem'" class="flex gap-2 mb-3">
      <label class="flex items-center gap-2 cursor-pointer"><input type="radio" v-model="ordemDir" value="asc" class="accent-violet-500" /><span class="text-sm text-blue-200">A → Z</span></label>
      <label class="flex items-center gap-2 cursor-pointer"><input type="radio" v-model="ordemDir" value="desc" class="accent-violet-500" /><span class="text-sm text-blue-200">Z → A</span></label>
    </div>

    <div v-if="aba==='newlines'" class="flex flex-wrap gap-2 mb-3 items-end">
      <div>
        <label class="text-xs text-blue-300 mb-1 block">Operação</label>
        <select v-model="nlOp" class="input-aurora">
          <option value="remover">Remover \n (substituir por espaço)</option>
          <option value="substituir">Substituir \n por texto</option>
          <option value="espacar">Espaçar (adicionar linha em branco)</option>
          <option value="compactar">Compactar (remover linhas duplas)</option>
        </select>
      </div>
      <div v-if="nlOp==='substituir'">
        <label class="text-xs text-blue-300 mb-1 block">Substituir por</label>
        <input v-model="nlReplace" class="w-28 input-aurora" placeholder="espaço, vírgula..." />
      </div>
    </div>

    <div v-if="aba==='ocorrencias'" class="mb-3">
      <label class="text-xs text-blue-300 mb-1 block">Palavra a contar</label>
      <input v-model="palavraBusca" class="w-full sm:w-80 input-aurora" placeholder="Digite a palavra..." />
    </div>

    <div v-if="aba==='cortar'" class="flex gap-3 mb-3 items-end">
      <div><label class="text-xs text-blue-300 mb-1 block">Posição inicial</label><input v-model.number="cortarInicio" type="number" min="0" class="w-24 input-aurora" /></div>
      <div><label class="text-xs text-blue-300 mb-1 block">Posição final</label><input v-model.number="cortarFim" type="number" min="0" class="w-24 input-aurora" /></div>
    </div>

    <!-- Info de caractere special case -->
    <div v-if="aba==='info'" class="space-y-3">
      <div>
        <label class="text-xs text-blue-300 mb-1 block">Caractere(s) para analisar</label>
        <input v-model="charInput" maxlength="20" class="w-full input-aurora font-mono text-2xl" placeholder="A" />
      </div>
      <div v-if="charInfo.length" class="space-y-2">
        <div v-for="(info, i) in charInfo" :key="i"
          class="bg-white/5 p-3 rounded-lg font-mono text-xs text-blue-200 hover:bg-white/10 cursor-pointer"
          @click="copiarInfo(charInfo[i])">
          {{ info }}
        </div>
      </div>
    </div>

    <!-- Input + Output para outras abas -->
    <div v-else class="grid lg:grid-cols-2 gap-4">
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-xs text-blue-300">Texto de entrada</label>
          <span class="text-xs text-blue-400">{{ input.length }} chars</span>
        </div>
        <textarea v-model="input" rows="12" class="w-full input-aurora resize-none font-mono text-sm"
          :placeholder="aba==='ordem'?'Uma linha\nPor vez\nPara ordenar':aba==='contador'?'Insira qualquer texto...':'Insira o texto aqui...'"></textarea>
      </div>
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-xs text-blue-300">Resultado</label>
          <button v-if="output" @click="copiar" class="text-xs text-blue-400 hover:text-white flex items-center gap-1">
            <Icon icon="mdi:content-copy" class="w-3 h-3" />Copiar
          </button>
        </div>
        <textarea :value="output" readonly rows="12" class="w-full input-aurora resize-none font-mono text-sm bg-white/5 cursor-default"
          placeholder="O resultado aparecerá aqui..."></textarea>
      </div>
    </div>
  </ToolShell>
</template>

