<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { useSeo } from '@/composables/useSeo'
import { usePersistentState } from '@/composables/usePersistentState'

useSeo({
  title: 'Simulador Lógico | DevStart',
  description: 'Monte circuitos digitais com portas lógicas e veja os sinais em tempo real.',
  path: '/ferramentas/logica',
})

type NodeType = 'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND' | 'SWITCH' | 'BULB'

interface LogicNode {
  id: string
  type: NodeType
  x: number
  y: number
  inputs: boolean[]
  output: boolean
}

interface Wire {
  id: string
  fromNode: string
  toNode: string
  toInputIndex: number
}

const NODE_HEIGHT = 60

const GUIDES: Record<string, { title: string; desc: string; usage: string; icon: string }> = {
  SWITCH: { title: 'Interruptor (Entrada)', desc: 'Fornece um sinal 0 ou 1 ao circuito.', usage: 'Clique para alternar Ligado/Desligado.', icon: 'lucide:toggle-right' },
  BULB: { title: 'Lâmpada (Saída)', desc: 'Acende quando recebe um sinal verdadeiro (1).', usage: 'Conecte à saída final das portas.', icon: 'lucide:lightbulb' },
  AND: { title: 'Porta AND (E)', desc: 'Saída 1 só se TODAS as entradas forem 1.', usage: '1 AND 1 = 1; qualquer outra = 0.', icon: 'lucide:plus' },
  OR: { title: 'Porta OR (OU)', desc: 'Saída 1 se PELO MENOS uma entrada for 1.', usage: '1 OR 0 = 1; 0 OR 0 = 0.', icon: 'lucide:check' },
  NOT: { title: 'Porta NOT (Inversor)', desc: 'Inverte o sinal: 1 vira 0 e 0 vira 1.', usage: 'NOT 1 = 0.', icon: 'lucide:x' },
  XOR: { title: 'Porta XOR (OU Exclusivo)', desc: 'Saída 1 apenas se as entradas forem diferentes.', usage: '1 XOR 0 = 1; 1 XOR 1 = 0.', icon: 'lucide:shuffle' },
  NAND: { title: 'Porta NAND', desc: 'Oposto da AND. Saída 0 só se todas forem 1.', usage: '1 NAND 1 = 0.', icon: 'lucide:grip' },
}

const nodes = ref<LogicNode[]>([])
const wires = ref<Wire[]>([])
usePersistentState('devstart_logic_nodes', nodes)
usePersistentState('devstart_logic_wires', wires)
const draggingId = ref<string | null>(null)
const dragOffset = ref({ x: 0, y: 0 })
const connectingNodeId = ref<string | null>(null)
const mousePos = ref({ x: 0, y: 0 })
const canvasRef = ref<HTMLElement | null>(null)

let tick: number | undefined

function inputCountFor(type: NodeType) {
  if (type === 'NOT' || type === 'BULB') return 1
  if (type === 'SWITCH') return 0
  return 2
}

function evaluate() {
  let changed = false
  const map = new Map(nodes.value.map((n) => [n.id, n]))

  nodes.value.forEach((n) => {
    if (n.type !== 'SWITCH') n.inputs = n.type === 'NOT' || n.type === 'BULB' ? [false] : [false, false]
  })

  wires.value.forEach((w) => {
    const src = map.get(w.fromNode)
    const tgt = map.get(w.toNode)
    if (src && tgt) tgt.inputs[w.toInputIndex] = src.output
  })

  nodes.value.forEach((n) => {
    const [a, b] = n.inputs
    let out = n.output
    switch (n.type) {
      case 'SWITCH': out = n.output; break
      case 'BULB': out = !!a; break
      case 'AND': out = !!a && !!b; break
      case 'OR': out = !!a || !!b; break
      case 'NOT': out = !a; break
      case 'NAND': out = !(a && b); break
      case 'XOR': out = a !== b; break
    }
    if (n.output !== out) {
      n.output = out
      changed = true
    }
  })
  return changed
}

onMounted(() => {
  tick = window.setInterval(evaluate, 50)
})
onBeforeUnmount(() => window.clearInterval(tick))

function addNode(type: NodeType) {
  nodes.value.push({
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    type,
    x: 100 + Math.random() * 60,
    y: 100 + Math.random() * 60,
    inputs: type === 'NOT' || type === 'BULB' ? [false] : type === 'SWITCH' ? [] : [false, false],
    output: false,
  })
}

function toggleSwitch(id: string) {
  const n = nodes.value.find((x) => x.id === id)
  if (n) n.output = !n.output
}

function deleteNode(id: string) {
  nodes.value = nodes.value.filter((n) => n.id !== id)
  wires.value = wires.value.filter((w) => w.fromNode !== id && w.toNode !== id)
}

function deleteWire(id: string) {
  wires.value = wires.value.filter((w) => w.id !== id)
}

function clearBoard() {
  Swal.fire({
    title: 'Limpar tudo?',
    text: 'Você perderá todo o circuito atual.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Sim, limpar',
    cancelButtonText: 'Cancelar',
  }).then((r) => {
    if (r.isConfirmed) {
      nodes.value = []
      wires.value = []
    }
  })
}

function startDrag(e: MouseEvent, id: string) {
  const n = nodes.value.find((x) => x.id === id)
  if (!n || !canvasRef.value) return
  draggingId.value = id
  const rect = canvasRef.value.getBoundingClientRect()
  dragOffset.value = { x: e.clientX - rect.left - n.x, y: e.clientY - rect.top - n.y }
}

function onMouseMove(e: MouseEvent) {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  mousePos.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  if (draggingId.value) {
    const n = nodes.value.find((x) => x.id === draggingId.value)
    if (n) {
      n.x = mousePos.value.x - dragOffset.value.x
      n.y = mousePos.value.y - dragOffset.value.y
    }
  }
}

function endDrag() {
  draggingId.value = null
  connectingNodeId.value = null
}

function startWire(id: string) {
  connectingNodeId.value = id
}

function endWire(targetId: string, index: number) {
  const from = connectingNodeId.value
  if (from && from !== targetId) {
    const exists = wires.value.some((w) => w.fromNode === from && w.toNode === targetId && w.toInputIndex === index)
    if (!exists) {
      wires.value.push({ id: Math.random().toString(36).slice(2), fromNode: from, toNode: targetId, toInputIndex: index })
    }
  }
  connectingNodeId.value = null
}

function outputPos(n: LogicNode) {
  return { x: n.x + (n.type === 'SWITCH' ? 96 : 112), y: n.y + NODE_HEIGHT / 2 }
}

function inputPos(n: LogicNode, index: number) {
  const count = inputCountFor(n.type)
  const y = count === 1 ? NODE_HEIGHT / 2 : (NODE_HEIGHT / (count + 1)) * (index + 1)
  return { x: n.x, y: n.y + y }
}

function wirePath(w: Wire) {
  const src = nodes.value.find((n) => n.id === w.fromNode)
  const tgt = nodes.value.find((n) => n.id === w.toNode)
  if (!src || !tgt) return ''
  const s = outputPos(src)
  const t = inputPos(tgt, w.toInputIndex)
  const midX = (s.x + t.x) / 2
  return `M ${s.x} ${s.y} C ${midX} ${s.y}, ${midX} ${t.y}, ${t.x} ${t.y}`
}

function connectingPath() {
  const n = nodes.value.find((x) => x.id === connectingNodeId.value)
  if (!n) return ''
  const s = outputPos(n)
  return `M ${s.x} ${s.y} L ${mousePos.value.x} ${mousePos.value.y}`
}

function showHelp(type: string) {
  const g = GUIDES[type]
  if (!g) return
  Swal.fire({
    title: g.title,
    html: `<div class="text-left text-sm space-y-2"><p>${g.desc}</p><p class="rounded bg-slate-100 p-2 font-mono text-xs">${g.usage}</p></div>`,
    confirmButtonText: 'Entendi',
    confirmButtonColor: '#7c3aed',
  })
}

function showGuide() {
  Swal.fire({
    title: 'Como usar o Simulador Lógico',
    html: '<div class="text-left text-sm space-y-2"><ul class="list-disc pl-5 space-y-1"><li>Adicione componentes pelos botões.</li><li>Arraste-os pela área.</li><li>Clique na saída (direita) e depois na entrada (esquerda) para conectar.</li><li>Clique nos interruptores para alternar 0/1.</li><li>Clique num fio para removê-lo.</li></ul></div>',
    icon: 'info',
    confirmButtonText: 'Vamos lá!',
    confirmButtonColor: '#7c3aed',
  })
}
</script>

<template>
  <div class="container-page py-6">
    <!-- Toolbar -->
    <div class="card mb-4 flex flex-wrap items-center justify-between gap-3 p-3">
      <div class="flex items-center gap-2">
        <h1 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
          <Icon
            icon="lucide:cpu"
            class="h-6 w-6 text-indigo-600"
          /> Simulador Lógico
        </h1>
        <button
          type="button"
          class="btn-ghost h-8 w-8 rounded-full p-0"
          aria-label="Guia"
          @click="showGuide"
        >
          <Icon
            icon="lucide:book-open"
            class="h-4 w-4 text-indigo-600"
          />
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <div class="flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            class="btn-secondary h-9 px-3 text-xs"
            title="Entrada"
            @click="addNode('SWITCH')"
          >
            <Icon
              icon="lucide:toggle-right"
              class="h-4 w-4"
            /> Entrada
          </button>
          <button
            type="button"
            class="btn-secondary h-9 px-3 text-xs"
            title="Saída"
            @click="addNode('BULB')"
          >
            <Icon
              icon="lucide:lightbulb"
              class="h-4 w-4"
            /> Saída
          </button>
        </div>
        <div class="flex gap-1">
          <button
            v-for="t in (['AND', 'OR', 'NOT', 'XOR', 'NAND'] as NodeType[])"
            :key="t"
            type="button"
            class="btn-secondary h-9 px-3 text-xs font-bold"
            :title="`${t} — clique direito para ajuda`"
            @click="addNode(t)"
            @contextmenu.prevent="showHelp(t)"
          >
            {{ t }}
          </button>
        </div>
        <button
          type="button"
          class="btn-ghost h-9 text-xs text-red-500"
          @click="clearBoard"
        >
          <Icon
            icon="lucide:trash-2"
            class="h-4 w-4"
          /> Limpar
        </button>
      </div>
    </div>

    <!-- Canvas -->
    <div
      ref="canvasRef"
      class="relative h-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900"
      style="background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 20px 20px"
      @mousemove="onMouseMove"
      @mouseup="endDrag"
      @mouseleave="endDrag"
    >
      <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <path
          v-if="connectingNodeId"
          :d="connectingPath()"
          stroke="#94a3b8"
          stroke-width="2"
          stroke-dasharray="5,5"
          fill="none"
        />
        <g
          v-for="w in wires"
          :key="w.id"
          class="pointer-events-auto cursor-pointer"
          @click="deleteWire(w.id)"
        >
          <path
            :d="wirePath(w)"
            :stroke="nodes.find((n) => n.id === w.fromNode)?.output ? '#22c55e' : '#64748b'"
            stroke-width="3"
            fill="none"
          />
          <path
            :d="wirePath(w)"
            stroke="transparent"
            stroke-width="14"
            fill="none"
          />
        </g>
      </svg>

      <div
        v-for="n in nodes"
        :key="n.id"
        class="group absolute select-none rounded-lg border-2 shadow-md transition-colors"
        :class="[
          n.type === 'SWITCH' ? 'h-16 w-24' : 'h-16 w-28',
          n.output ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800',
        ]"
        :style="{ left: n.x + 'px', top: n.y + 'px' }"
        @mousedown="startDrag($event, n.id)"
      >
        <div class="flex h-full w-full items-center justify-center font-bold text-slate-700 dark:text-slate-200">
          <button
            v-if="n.type === 'SWITCH'"
            type="button"
            class="flex h-6 w-10 items-center rounded-full px-1 transition-colors"
            :class="n.output ? 'justify-end bg-green-500' : 'justify-start bg-slate-300'"
            title="Alternar 0/1"
            @mousedown.stop
            @click="toggleSwitch(n.id)"
          >
            <span class="h-4 w-4 rounded-full bg-white shadow" />
          </button>
          <div
            v-else-if="n.type === 'BULB'"
            class="h-8 w-8 rounded-full border-2 transition-all"
            :class="n.output ? 'border-yellow-500 bg-yellow-400 shadow-[0_0_20px_orange]' : 'border-slate-400 bg-slate-200'"
          />
          <div
            v-else
            class="flex flex-col items-center"
          >
            <span class="text-xs uppercase text-slate-400">{{ n.type }}</span>
            <Icon
              :icon="GUIDES[n.type].icon"
              class="h-4 w-4 text-indigo-500"
            />
          </div>

          <button
            type="button"
            class="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow transition group-hover:opacity-100"
            aria-label="Excluir"
            @mousedown.stop
            @click="deleteNode(n.id)"
          >
            <Icon
              icon="lucide:x"
              class="h-3 w-3"
            />
          </button>
        </div>

        <!-- Output port -->
        <button
          v-if="n.type !== 'BULB'"
          type="button"
          class="absolute z-20 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-slate-600 hover:scale-125"
          :class="n.output ? 'bg-green-400' : 'bg-slate-200'"
          :style="{ left: (n.type === 'SWITCH' ? 96 : 112) - 7 + 'px', top: NODE_HEIGHT / 2 + 'px' }"
          title="Saída — clique para conectar"
          @mousedown.stop="startWire(n.id)"
        />

        <!-- Input ports -->
        <button
          v-for="idx in inputCountFor(n.type)"
          :key="idx"
          type="button"
          class="absolute z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-600 hover:scale-125"
          :class="n.inputs[idx - 1] ? 'bg-green-400' : 'bg-slate-200'"
          :style="{ left: '0px', top: (inputCountFor(n.type) === 1 ? NODE_HEIGHT / 2 : (NODE_HEIGHT / (inputCountFor(n.type) + 1)) * idx) + 'px' }"
          title="Entrada"
          @mousedown.stop="endWire(n.id, idx - 1)"
        />
      </div>

      <div
        v-if="nodes.length === 0"
        class="pointer-events-none absolute inset-0 flex items-center justify-center text-slate-400"
      >
        <div class="text-center">
          <Icon
            icon="lucide:cpu"
            class="mx-auto h-16 w-16 opacity-20"
          />
          <p class="mt-3 text-lg font-bold">
            Área de trabalho vazia
          </p>
          <p class="text-sm opacity-70">
            Adicione portas e componentes pelo menu acima.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
