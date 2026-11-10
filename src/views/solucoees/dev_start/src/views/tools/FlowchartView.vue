<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { useSeo } from '@/composables/useSeo'
import { usePersistentState } from '@/composables/usePersistentState'

useSeo({
  title: 'Fluxograma Interativo | DevStart',
  description: 'Editor visual de fluxogramas com simulação passo a passo.',
  path: '/ferramentas/fluxograma',
})

type NodeKind = 'start' | 'process' | 'decision' | 'end' | 'loop' | 'input' | 'output'

interface FlowNode {
  id: string
  type: NodeKind
  label: string
  next?: string
  nextYes?: string
  nextNo?: string
  nextYesLabel?: string
  nextNoLabel?: string
}

const NODE_GUIDES: Record<NodeKind, { title: string; desc: string; usage: string; tip: string }> = {
  start: { title: 'Início', desc: 'Ponto de partida do algoritmo.', usage: 'Use um único bloco no topo.', tip: 'Todo fluxograma começa aqui.' },
  end: { title: 'Fim', desc: 'Encerra a execução.', usage: 'Conecte o final dos processos aqui.', tip: 'Pode haver vários fins.' },
  process: { title: 'Processamento', desc: 'Uma ação ou cálculo.', usage: 'Ex: Soma = A + B.', tip: 'Use verbos no imperativo.' },
  input: { title: 'Entrada', desc: 'Recebe dados externos.', usage: 'Ex: Ler idade.', tip: 'Abre uma caixa na simulação.' },
  output: { title: 'Saída', desc: 'Mostra informações.', usage: 'Ex: Exibir total.', tip: 'Aparece no log de execução.' },
  decision: { title: 'Decisão', desc: 'Divide o fluxo em Sim/Não.', usage: 'Ex: Idade >= 18?', tip: 'Rotule as saídas.' },
  loop: { title: 'Repetição', desc: 'Repete um trecho.', usage: 'Continue para repetir, Break para sair.', tip: 'Evite loops infinitos.' },
}

const TOOLBOX: { type: NodeKind; label: string; icon: string; classes: string }[] = [
  { type: 'start', label: 'INÍCIO', icon: 'lucide:play', classes: 'bg-green-100 border-green-500 text-green-900 rounded-full' },
  { type: 'input', label: 'ENTRADA', icon: 'lucide:keyboard', classes: 'bg-cyan-100 border-cyan-500 text-cyan-900' },
  { type: 'process', label: 'PROCESSO', icon: 'lucide:settings', classes: 'bg-blue-100 border-blue-500 text-blue-900' },
  { type: 'output', label: 'SAÍDA', icon: 'lucide:monitor', classes: 'bg-indigo-100 border-indigo-500 text-indigo-900' },
  { type: 'decision', label: 'DECISÃO', icon: 'lucide:git-branch', classes: 'bg-yellow-100 border-yellow-500 text-yellow-900' },
  { type: 'loop', label: 'LOOP', icon: 'lucide:rotate-cw', classes: 'bg-orange-100 border-orange-500 text-orange-900' },
  { type: 'end', label: 'FIM', icon: 'lucide:square', classes: 'bg-red-100 border-red-500 text-red-900 rounded-full' },
]

const nodes = ref<FlowNode[]>([])
usePersistentState('devstart_flowchart', nodes)
const selectedId = ref<string | null>(null)
const editingId = ref<string | null>(null)
const autoConnect = ref(true)

const executionState = ref<'idle' | 'running' | 'paused' | 'waiting'>('idle')
const simulationMode = ref<'auto' | 'step'>('auto')
const currentNodeId = ref<string | null>(null)
const logs = ref<string[]>([])
const active = { running: false }

function addNode(type: NodeKind, label: string) {
  const node: FlowNode = {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    type,
    label,
    nextYesLabel: type === 'loop' ? 'Continue' : type === 'decision' ? 'Sim' : undefined,
    nextNoLabel: type === 'loop' ? 'Break' : type === 'decision' ? 'Não' : undefined,
  }
  if (autoConnect.value && selectedId.value) {
    const sel = nodes.value.find((n) => n.id === selectedId.value)
    if (sel) {
      if (['start', 'process', 'input', 'output'].includes(sel.type) && !sel.next) sel.next = node.id
      else if (['decision', 'loop'].includes(sel.type)) {
        if (!sel.nextYes) sel.nextYes = node.id
        else if (!sel.nextNo) sel.nextNo = node.id
      }
    }
  }
  nodes.value.push(node)
  selectedId.value = node.id
}

function deleteNode(id: string) {
  nodes.value = nodes.value.filter((n) => n.id !== id)
  nodes.value.forEach((n) => {
    if (n.next === id) n.next = undefined
    if (n.nextYes === id) n.nextYes = undefined
    if (n.nextNo === id) n.nextNo = undefined
  })
  if (selectedId.value === id) selectedId.value = null
}

function clearAll() {
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Isso apagará todo o fluxograma!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Sim, limpar!',
    cancelButtonText: 'Cancelar',
  }).then((r) => {
    if (r.isConfirmed) {
      nodes.value = []
      selectedId.value = null
      stopSimulation()
    }
  })
}

function stopSimulation() {
  active.running = false
  executionState.value = 'idle'
  currentNodeId.value = null
  logs.value = []
}

function startSimulation(mode: 'auto' | 'step') {
  const start = nodes.value.find((n) => n.type === 'start')
  if (!start) {
    Swal.fire('Erro', 'Seu fluxograma precisa de um bloco INÍCIO.', 'error')
    return
  }
  active.running = true
  simulationMode.value = mode
  executionState.value = 'running'
  logs.value = [`Iniciando simulação (${mode === 'auto' ? 'Automática' : 'Passo a Passo'})...`]
  processNode(start.id, mode)
}

async function processNode(id: string, mode: 'auto' | 'step') {
  if (!active.running) return
  currentNodeId.value = id
  const node = nodes.value.find((n) => n.id === id)
  if (!node) {
    executionState.value = 'idle'
    return
  }

  let msg = `Executando: ${node.label} (${node.type})`
  if (node.type === 'input') {
    const { value } = await Swal.fire({
      title: node.label,
      input: 'text',
      inputLabel: 'Digite um valor:',
      inputValue: '0',
    })
    msg = `Entrada (${node.label}): ${value}`
  } else if (node.type === 'output') {
    msg = `Saída: ${node.label}`
  }
  logs.value.push(msg)

  await new Promise((r) => setTimeout(r, mode === 'auto' ? 800 : 300))
  if (!active.running) return

  if (node.type === 'end') {
    logs.value.push('Fim da execução.')
    executionState.value = 'idle'
    active.running = false
    Swal.fire({ title: 'Execução finalizada', icon: 'success', timer: 1800, showConfirmButton: false })
    return
  }

  if (['decision', 'loop'].includes(node.type)) {
    executionState.value = 'waiting'
    logs.value.push(node.type === 'loop' ? `Loop: ${node.label}?` : `Decisão: ${node.label}?`)
    return
  }

  if (mode === 'auto') {
    if (node.next) processNode(node.next, 'auto')
    else {
      logs.value.push('Aviso: fim do fluxo (sem conexão).')
      executionState.value = 'idle'
    }
  } else {
    executionState.value = 'paused'
  }
}

function handleStep() {
  if (executionState.value === 'paused' && currentNodeId.value) {
    const node = nodes.value.find((n) => n.id === currentNodeId.value)
    if (node?.next) processNode(node.next, 'step')
    else {
      logs.value.push('Aviso: fim do fluxo (sem conexão).')
      executionState.value = 'idle'
    }
  }
}

function handleDecision(isYes: boolean) {
  const node = nodes.value.find((n) => n.id === currentNodeId.value)
  if (!node) return
  const label = isYes ? node.nextYesLabel : node.nextNoLabel
  logs.value.push(`Decisão: ${label}`)
  const nextId = isYes ? node.nextYes : node.nextNo
  if (nextId) processNode(nextId, simulationMode.value)
  else {
    logs.value.push('Aviso: caminho não conectado.')
    executionState.value = 'idle'
  }
}

const selectedNode = computed(() => nodes.value.find((n) => n.id === selectedId.value))

function showHelp(type: NodeKind) {
  const g = NODE_GUIDES[type]
  Swal.fire({
    title: g.title,
    html: `<div class="text-left text-sm space-y-2"><p><b>O que é:</b> ${g.desc}</p><p class="rounded bg-slate-100 p-2"><b>Exemplo:</b> ${g.usage}</p><p class="text-slate-500 italic">${g.tip}</p></div>`,
    confirmButtonText: 'Entendi!',
    confirmButtonColor: '#7c3aed',
  })
}

function showGuide() {
  Swal.fire({
    title: 'Guia do Fluxograma',
    html: '<div class="text-left text-sm space-y-2"><ul class="list-disc pl-5 space-y-1"><li>Clique nos blocos à esquerda para adicioná-los.</li><li>Com Auto-Conectar ligado, os blocos se ligam automaticamente.</li><li>Duplo clique no bloco para editar o texto.</li><li>Use Simular para rodar passo a passo.</li></ul></div>',
    icon: 'info',
    confirmButtonText: 'Vamos começar!',
    confirmButtonColor: '#7c3aed',
  })
}
</script>

<template>
  <div class="container-page flex flex-col py-6">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <h1 class="text-2xl font-bold text-slate-800 dark:text-white">
          Fluxograma Interativo
        </h1>
        <button
          type="button"
          class="btn-ghost h-8 w-8 rounded-full p-0"
          aria-label="Guia"
          @click="showGuide"
        >
          <Icon
            icon="lucide:book-open"
            class="h-4 w-4 text-brand-600"
          />
        </button>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="btn-ghost text-sm"
          :title="autoConnect ? 'Auto-conectar ligado' : 'Auto-conectar desligado'"
          @click="autoConnect = !autoConnect"
        >
          <Icon
            :icon="autoConnect ? 'lucide:toggle-right' : 'lucide:toggle-left'"
            class="h-6 w-6"
            :class="autoConnect ? 'text-green-500' : 'text-slate-400'"
          />
          Auto-Conectar
        </button>
        <button
          type="button"
          class="btn-ghost text-sm text-red-500"
          @click="clearAll"
        >
          <Icon
            icon="lucide:trash-2"
            class="h-4 w-4"
          /> Limpar
        </button>
        <template v-if="executionState === 'idle'">
          <button
            type="button"
            class="btn bg-green-600 text-white hover:bg-green-700"
            @click="startSimulation('auto')"
          >
            <Icon
              icon="lucide:play"
              class="h-4 w-4"
            /> Simular
          </button>
          <button
            type="button"
            class="btn-primary"
            @click="startSimulation('step')"
          >
            <Icon
              icon="lucide:step-forward"
              class="h-4 w-4"
            /> Passo a passo
          </button>
        </template>
        <template v-else>
          <button
            type="button"
            class="btn animate-pulse bg-red-600 text-white"
            @click="stopSimulation"
          >
            <Icon
              icon="lucide:square"
              class="h-4 w-4"
            /> Parar
          </button>
          <button
            v-if="simulationMode === 'step'"
            type="button"
            class="btn-primary"
            :disabled="executionState === 'waiting'"
            @click="handleStep"
          >
            <Icon
              icon="lucide:fast-forward"
              class="h-4 w-4"
            /> Próximo
          </button>
        </template>
      </div>
    </div>

    <div class="flex flex-col gap-4 lg:flex-row">
      <!-- Toolbox -->
      <aside class="card h-fit w-full shrink-0 p-4 lg:w-56">
        <h2 class="mb-3 flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
          <Icon
            icon="lucide:toolbox"
            class="h-5 w-5"
          /> Ferramentas
        </h2>
        <div class="space-y-2">
          <div
            v-for="item in TOOLBOX"
            :key="item.type"
            class="flex gap-1"
          >
            <button
              type="button"
              class="flex flex-1 items-center justify-center gap-2 rounded border-2 p-2 text-xs font-bold transition hover:shadow-md"
              :class="item.classes"
              :title="NODE_GUIDES[item.type].desc"
              @click="addNode(item.type, item.label)"
            >
              <Icon
                :icon="item.icon"
                class="h-3.5 w-3.5"
              /> {{ item.label }}
            </button>
            <button
              type="button"
              class="px-1 text-slate-400 hover:text-brand-500"
              aria-label="Ajuda"
              @click="showHelp(item.type)"
            >
              <Icon
                icon="lucide:circle-help"
                class="h-4 w-4"
              />
            </button>
          </div>
        </div>
      </aside>

      <!-- Canvas -->
      <div class="flex flex-1 flex-col gap-4">
        <div
          class="relative flex min-h-[420px] flex-col items-center gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-slate-900"
          style="background-image: radial-gradient(#e5e7eb 1px, transparent 1px); background-size: 16px 16px"
        >
          <div
            v-if="nodes.length === 0"
            class="mt-16 text-center text-slate-400"
          >
            <Icon
              icon="lucide:workflow"
              class="mx-auto h-16 w-16 opacity-20"
            />
            <p class="mt-3 text-lg font-medium">
              Sua área de trabalho está vazia
            </p>
            <p class="mt-1 text-sm opacity-70">
              Adicione blocos usando o menu lateral.
            </p>
          </div>

          <div
            v-for="node in nodes"
            :key="node.id"
            class="relative flex min-w-[200px] cursor-pointer flex-col items-center justify-center border-2 p-4 text-center text-sm font-bold shadow-sm transition-all"
            :class="[
              TOOLBOX.find((t) => t.type === node.type)?.classes,
              node.id === currentNodeId ? 'z-10 scale-105 ring-4 ring-cyan-400' : '',
              selectedId === node.id ? 'ring-2 ring-slate-400' : '',
            ]"
            @click="selectedId = node.id"
            @dblclick="editingId = node.id"
          >
            <span
              v-if="node.type === 'loop'"
              class="mb-1 text-[10px] uppercase opacity-60"
            >Loop</span>
            <input
              v-if="editingId === node.id"
              v-model="node.label"
              autofocus
              autocomplete="off"
              class="w-full border-b border-black bg-white/50 text-center text-sm outline-none"
              @blur="editingId = null"
              @keydown.enter="editingId = null"
              @click.stop
            >
            <span v-else>{{ node.label }}</span>

            <div
              v-if="['decision', 'loop'].includes(node.type)"
              class="mt-2 flex gap-2 text-[10px]"
            >
              <span
                class="rounded bg-white/60 px-1.5 py-0.5"
                :class="node.nextYes ? 'text-green-700' : 'text-slate-400'"
              >{{ node.nextYesLabel }}</span>
              <span
                class="rounded bg-white/60 px-1.5 py-0.5"
                :class="node.nextNo ? 'text-red-700' : 'text-slate-400'"
              >{{ node.nextNoLabel }}</span>
            </div>

            <button
              type="button"
              class="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow transition hover:opacity-100 group-hover:opacity-100"
              :class="selectedId === node.id ? 'opacity-100' : ''"
              aria-label="Excluir bloco"
              @click.stop="deleteNode(node.id)"
            >
              <Icon
                icon="lucide:x"
                class="h-3 w-3"
              />
            </button>

            <!-- Decision buttons -->
            <div
              v-if="executionState === 'waiting' && currentNodeId === node.id"
              class="absolute -bottom-14 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-xl"
            >
              <button
                type="button"
                class="btn h-8 bg-green-600 px-3 text-xs text-white"
                @click.stop="handleDecision(true)"
              >
                {{ node.nextYesLabel }}
              </button>
              <button
                type="button"
                class="btn h-8 bg-red-600 px-3 text-xs text-white"
                @click.stop="handleDecision(false)"
              >
                {{ node.nextNoLabel }}
              </button>
            </div>
          </div>
        </div>

        <!-- Log -->
        <div class="card overflow-hidden">
          <div class="border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800">
            <Icon
              icon="lucide:terminal"
              class="mr-1 inline h-4 w-4"
            /> Log de execução
          </div>
          <div class="h-32 overflow-y-auto bg-slate-900 p-3 font-mono text-xs text-green-400">
            <p
              v-if="logs.length === 0"
              class="text-slate-600"
            >
              // Rode a simulação para ver os passos aqui.
            </p>
            <p
              v-for="(l, i) in logs"
              :key="i"
            >
              {{ l }}
            </p>
          </div>
        </div>
      </div>

      <!-- Properties -->
      <aside
        v-if="selectedNode"
        class="card h-fit w-full shrink-0 p-4 lg:w-56"
      >
        <h2 class="mb-3 font-semibold text-slate-600 dark:text-slate-300">
          Propriedades
        </h2>
        <label class="text-xs font-bold text-slate-500">Texto do bloco</label>
        <input
          v-model="selectedNode.label"
          autocomplete="off"
          class="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-800"
        >
        <template v-if="['decision', 'loop'].includes(selectedNode.type)">
          <label class="mt-3 block text-xs font-bold text-slate-500">Rótulo "Sim/Continue"</label>
          <input
            v-model="selectedNode.nextYesLabel"
            autocomplete="off"
            class="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-800"
          >
          <label class="mt-3 block text-xs font-bold text-slate-500">Rótulo "Não/Break"</label>
          <input
            v-model="selectedNode.nextNoLabel"
            autocomplete="off"
            class="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-800"
          >
        </template>
      </aside>
    </div>
  </div>
</template>
