<template>
  <ToolShell
    title="Manipulador de Listagem"
    description="Ordene, filtre, remova duplicatas e transforme listas de texto com um clique."
    icon="fa-list"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['12 operações disponíveis', 'Case-sensitive opcional', 'Aplique ao original']"
    :tips="[
      { title: 'Remover duplicatas', text: 'Funciona tanto com sensibilidade a maiúsculas ativa quanto desativada. Mantém a primeira ocorrência de cada item.', type: 'info' },
      { title: 'Aplicar ao original', text: 'Use o botão Aplicar para substituir a lista original pelo resultado, permitindo operações encadeadas.', type: 'info' },
      { title: 'Embaralhar', text: 'Útil para sortear nomes, criar filas aleatórias ou gerar dados de teste não ordenados.', type: 'success' },
    ]"
    :examples="[
      { title: 'Remover duplicatas', desc: 'Lista: maçã, banana, maçã, pera', result: 'maçã, banana, pera' },
      { title: 'Ordenar A-Z', desc: 'Lista: Zebra, Avião, Casa', result: 'Avião, Casa, Zebra' },
      { title: 'Adicionar bullets', desc: 'Qualquer lista de texto', result: '• item 1\n• item 2' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Entrada -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-list mr-1.5 text-teal-500"></i>
              Lista de Itens (um por linha)
            </label>
            <textarea
              v-model="listaEntrada"
              placeholder="Digite ou cole sua lista aqui, um item por linha..."
              class="input-aurora resize-none"
              rows="10"
            ></textarea>
            <p class="input-aurora-hint">{{ itensOriginal.length }} item(ns)</p>
          </div>

          <!-- Opções -->
          <div class="glass-panel p-3 space-y-2">
            <label class="input-aurora-label !mb-1">Opções de processamento</label>
            <label class="checkbox-aurora">
              <input v-model="opcoes.ignorarVazios" type="checkbox" />
              <span>Ignorar linhas vazias</span>
            </label>
            <label class="checkbox-aurora">
              <input v-model="opcoes.trimEspacos" type="checkbox" />
              <span>Remover espaços extras</span>
            </label>
            <label class="checkbox-aurora">
              <input v-model="opcoes.caseSensitive" type="checkbox" />
              <span>Diferenciar maiúsculas/minúsculas</span>
            </label>
          </div>

          <!-- Operações -->
          <div>
            <label class="input-aurora-label mb-2">
              <i class="fas fa-wand-magic-sparkles mr-1.5 text-cyan-500"></i>
              Operações
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="op in operacoes"
                :key="op.value"
                @click="aplicarOperacao(op.value)"
                class="p-3 rounded-xl border-2 border-gray-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all text-left"
              >
                <i :class="[op.icon, 'text-teal-600 dark:text-teal-400 mb-1 block text-sm']"></i>
                <div class="font-semibold text-gray-900 dark:text-white text-xs">{{ op.label }}</div>
                <div class="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">{{ op.descricao }}</div>
              </button>
            </div>
          </div>

          <BaseButton variant="outline" icon="fa-eraser" @click="limpar" full-width>Limpar Tudo</BaseButton>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="listaResultado" class="space-y-4">
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">Resultado</p>
              <p class="text-4xl font-black text-white mb-1">{{ itensResultado.length }}</p>
              <p class="text-teal-300 text-sm font-semibold">
                <i class="fas fa-check-circle mr-1"></i>item(ns)
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ itensOriginal.length }}</div>
                <div class="metric-glass-label">Originais</div>
              </div>
              <div class="metric-glass ring-1 ring-cyan-100 dark:ring-cyan-900">
                <div class="metric-glass-value text-cyan-600 dark:text-cyan-400">{{ itensResultado.length }}</div>
                <div class="metric-glass-label">Resultado</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ itensOriginal.length - itensResultado.length }}</div>
                <div class="metric-glass-label">Removidos</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ listaResultado.length }}</div>
                <div class="metric-glass-label">Caracteres</div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                  <i class="fas fa-list-check text-teal-500"></i>Lista processada
                </h4>
                <div class="flex gap-2">
                  <button @click="copiar" class="copy-btn"><i class="fas fa-copy mr-1"></i>Copiar</button>
                  <button @click="aplicarAoOriginal" class="copy-btn"><i class="fas fa-arrow-left mr-1"></i>Aplicar</button>
                </div>
              </div>
              <pre class="text-gray-700 dark:text-slate-200 whitespace-pre-wrap font-mono text-xs max-h-72 overflow-y-auto">{{ listaResultado }}</pre>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Clique em <strong>Aplicar</strong> para substituir a lista original pelo resultado e encadear operações.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!listaResultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-list text-4xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Cole sua lista e escolha uma operação</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const operacoes = [
  { value: 'ordenarAZ',        label: 'Ordenar A-Z',        icon: 'fas fa-sort-alpha-down',  descricao: 'Ordem alfabética' },
  { value: 'ordenarZA',        label: 'Ordenar Z-A',        icon: 'fas fa-sort-alpha-up',    descricao: 'Ordem reversa' },
  { value: 'removerDuplicatas',label: 'Remover Duplicatas', icon: 'fas fa-clone',            descricao: 'Apenas únicos' },
  { value: 'numerar',          label: 'Numerar Itens',      icon: 'fas fa-list-ol',          descricao: '1. Item' },
  { value: 'embaralhar',       label: 'Embaralhar',         icon: 'fas fa-random',           descricao: 'Ordem aleatória' },
  { value: 'inverter',         label: 'Inverter Ordem',     icon: 'fas fa-exchange-alt',     descricao: 'Última primeiro' },
  { value: 'maiusculas',       label: 'MAIÚSCULAS',         icon: 'fas fa-arrow-up',         descricao: 'Texto grande' },
  { value: 'minusculas',       label: 'minúsculas',         icon: 'fas fa-arrow-down',       descricao: 'Texto pequeno' },
  { value: 'contarItens',      label: 'Contar por Item',    icon: 'fas fa-hashtag',          descricao: 'Qtd repetições' },
  { value: 'prefixo',          label: 'Adicionar Prefixo',  icon: 'fas fa-arrow-right',      descricao: 'Texto antes' },
  { value: 'sufixo',           label: 'Adicionar Sufixo',   icon: 'fas fa-arrow-left',       descricao: 'Texto depois' },
  { value: 'marcarBullet',     label: 'Marcadores •',       icon: 'fas fa-circle',           descricao: '• Item' },
]

const listaEntrada  = ref('')
const listaResultado= ref('')
const opcoes        = ref({ ignorarVazios: true, trimEspacos: true, caseSensitive: false })

const processarLista = (txt: string) => {
  let itens = txt.split('\n')
  if (opcoes.value.ignorarVazios) itens = itens.filter(i => i.trim().length > 0)
  if (opcoes.value.trimEspacos)   itens = itens.map(i => i.trim())
  return itens
}

const itensOriginal  = computed(() => processarLista(listaEntrada.value))
const itensResultado = computed(() => processarLista(listaResultado.value))

const ordenarAZ = (itens: string[]) =>
  [...itens].sort((a, b) => (opcoes.value.caseSensitive ? a : a.toLowerCase()).localeCompare(opcoes.value.caseSensitive ? b : b.toLowerCase()))

const removerDuplicatas = (itens: string[]) => {
  if (opcoes.value.caseSensitive) return [...new Set(itens)]
  const seen = new Map<string, boolean>()
  return itens.filter(it => { const k = it.toLowerCase(); if (seen.has(k)) return false; seen.set(k, true); return true })
}

const contarItens = (itens: string[]) => {
  const count: Record<string, number> = {}
  const key = (it: string) => opcoes.value.caseSensitive ? it : it.toLowerCase()
  itens.forEach(it => { const k = key(it); count[k] = (count[k] || 0) + 1 })
  const done = new Set<string>()
  return itens.flatMap(it => {
    const k = key(it)
    if (done.has(k)) return []
    done.add(k); return [`${it} (${count[k]}x)`]
  })
}

const aplicarOperacao = async (op: string) => {
  if (!itensOriginal.value.length) { Swal.fire({ icon: 'warning', title: 'Lista vazia', text: 'Digite uma lista para manipular' }); return }
  let res = [...itensOriginal.value]
  switch (op) {
    case 'ordenarAZ':        res = ordenarAZ(res); break
    case 'ordenarZA':        res = ordenarAZ(res).reverse(); break
    case 'removerDuplicatas':res = removerDuplicatas(res); break
    case 'numerar':          res = res.map((it, i) => `${i + 1}. ${it}`); break
    case 'embaralhar':       { for (let i = res.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1));[res[i],res[j]]=[res[j],res[i]] } break }
    case 'inverter':         res = [...res].reverse(); break
    case 'maiusculas':       res = res.map(it => it.toUpperCase()); break
    case 'minusculas':       res = res.map(it => it.toLowerCase()); break
    case 'contarItens':      res = contarItens(res); break
    case 'marcarBullet':     res = res.map(it => `• ${it}`); break
    case 'prefixo': {
      const { value: pf } = await Swal.fire({ title: 'Prefixo', input: 'text', inputPlaceholder: 'Ex: - ', showCancelButton: true })
      if (pf !== undefined) res = res.map(it => `${pf}${it}`)
      break
    }
    case 'sufixo': {
      const { value: sf } = await Swal.fire({ title: 'Sufixo', input: 'text', inputPlaceholder: 'Ex: ;', showCancelButton: true })
      if (sf !== undefined) res = res.map(it => `${it}${sf}`)
      break
    }
  }
  listaResultado.value = res.join('\n')
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(listaResultado.value)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao copiar' })
  }
}

const aplicarAoOriginal = () => {
  listaEntrada.value = listaResultado.value
  listaResultado.value = ''
  Swal.fire({ icon: 'success', title: 'Aplicado!', timer: 1500, showConfirmButton: false })
}

const limpar = () => { listaEntrada.value = ''; listaResultado.value = '' }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
