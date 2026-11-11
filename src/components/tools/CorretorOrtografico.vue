<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const texto = ref('')
const corrigido = ref('')
const palavrasErradas = ref<string[]>([])
const isChecking = ref(false)

// Dicionário básico de erros comuns em português
const correcoes: Record<string, string> = {
  'voce': 'você','vc': 'você','tbm': 'também','tambem': 'também','nao': 'não',
  'entao': 'então','obrigatorio': 'obrigatório',
  'atraves': 'através','apos': 'após','so': 'só','la': 'lá','ca': 'cá',
  'proximo': 'próximo','util': 'útil','publico': 'público','codigo': 'código',
  'tecnologia': 'tecnologia','necessario': 'necessário','possivel': 'possível',
  'disponivel': 'disponível','servico': 'serviço','informacoes': 'informações',
  'solucao': 'solução','configuracao': 'configuração','execucao': 'execução',
  'conexao': 'conexão','aplicacao': 'aplicação','documentacao': 'documentação',
  'facil': 'fácil','dificil': 'difícil','amanha': 'amanhã','ira': 'irá',
  'esta': 'está','ate': 'até',
  'ja': 'já',
}

function verificarOrtografia() {
  if (!texto.value.trim()) return
  isChecking.value = true
  
  // Usar o corretor nativo do browser via HTML5 spellcheck
  // + correção de erros comuns de acentuação
  const palavras = texto.value.split(/\s+/)
  const erros: string[] = []
  let textCorrigido = texto.value
  
  palavras.forEach(p => {
    const limpa = p.toLowerCase().replace(/[^a-záàâãéêíóôõúç]/g, '')
    if (correcoes[limpa]) {
      erros.push(limpa)
      const regex = new RegExp('\\b' + limpa + '\\b', 'gi')
      textCorrigido = textCorrigido.replace(regex, (match) => {
        const correcao = correcoes[limpa]
        if (match[0] === match[0].toUpperCase()) return correcao.charAt(0).toUpperCase() + correcao.slice(1)
        return correcao
      })
    }
  })
  
  palavrasErradas.value = [...new Set(erros)]
  corrigido.value = textCorrigido
  isChecking.value = false
  
  if (erros.length === 0) {
    Swal.fire({ icon: 'success', title: 'Texto verificado!', text: 'Nenhum erro comum encontrado.', timer: 2000, showConfirmButton: false })
  }
}

function copiarCorrigido() {
  navigator.clipboard.writeText(corrigido.value)
  Swal.fire({ icon: 'success', title: 'Texto copiado!', timer: 800, showConfirmButton: false })
}

function usarCorrigido() {
  texto.value = corrigido.value
  corrigido.value = ''
  palavrasErradas.value = []
}
</script>

<template>
  <ToolShell title="Corretor Ortográfico" description="Verifique e corrija erros ortográficos comuns no português brasileiro."
    icon="fa-spell-check" icon-gradient="from-green-500 to-emerald-700" orb-color="green"
    :quick-tips="['Erros comuns PT-BR','Correção automática','Verificação em tempo real']"
    :tips="[{title:'Como funciona',text:'O corretor identifica erros ortográficos comuns no português como palavras sem acento. Para verificação completa, habilite o corretor do navegador.'}]">

    <div class="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-4 text-xs text-blue-300 flex items-start gap-2">
      <Icon icon="mdi:information-outline" class="w-4 h-4 shrink-0 mt-0.5" />
      <span>Dica: Ative o corretor ortográfico do seu navegador (clique direito → "Verificar ortografia") para verificação completa em qualquer campo de texto.</span>
    </div>

    <div class="grid lg:grid-cols-2 gap-4">
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-xs text-blue-300">Texto para verificar</label>
          <span class="text-xs text-blue-400">{{ texto.length }} caracteres</span>
        </div>
        <textarea v-model="texto" spellcheck="true" lang="pt-BR" rows="14"
          class="w-full input-aurora resize-none font-sans text-sm"
          placeholder="Cole ou digite seu texto aqui para verificar..."></textarea>
        <button @click="verificarOrtografia" :disabled="isChecking || !texto.trim()"
          class="mt-2 w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors">
          <Icon :icon="isChecking ? 'mdi:loading' : 'mdi:check-all'" class="w-5 h-5" :class="isChecking?'animate-spin':''" />
          Verificar Ortografia
        </button>
      </div>

      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-xs text-blue-300">Texto corrigido</label>
          <div v-if="corrigido" class="flex gap-1.5">
            <button @click="copiarCorrigido" class="text-xs text-blue-400 hover:text-white flex items-center gap-1"><Icon icon="mdi:content-copy" class="w-3 h-3" />Copiar</button>
            <button @click="usarCorrigido" class="text-xs text-green-400 hover:text-white flex items-center gap-1"><Icon icon="mdi:arrow-left" class="w-3 h-3" />Usar</button>
          </div>
        </div>
        <textarea :value="corrigido" readonly rows="14"
          class="w-full input-aurora resize-none font-sans text-sm bg-white/5 cursor-default"
          placeholder="O texto corrigido aparecerá aqui..."></textarea>

        <div v-if="palavrasErradas.length > 0" class="mt-3 glass-panel p-3">
          <p class="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1.5">
            <Icon icon="mdi:alert-outline" class="w-3.5 h-3.5" />
            {{ palavrasErradas.length }} correção(ões) aplicada(s):
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="e in palavrasErradas" :key="e"
              class="text-xs px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded">
              {{ e }} → {{ correcoes[e] }}
            </span>
          </div>
        </div>

        <div v-else-if="corrigido && palavrasErradas.length === 0" class="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-sm text-green-300">
          <Icon icon="mdi:check-circle" class="w-4 h-4" />
          Nenhum erro comum encontrado.
        </div>
      </div>
    </div>
  </ToolShell>
</template>
