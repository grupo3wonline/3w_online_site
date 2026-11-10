<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { useSeo } from '@/composables/useSeo'
import { usePersistentState } from '@/composables/usePersistentState'
import BlockNode from '@/components/blocks/BlockNode.vue'

useSeo({
  title: 'Programação em Blocos | DevStart',
  description: 'Programe um personagem arrastando blocos, no estilo Scratch.',
  path: '/ferramentas/blocos',
})

type Category = 'events' | 'motion' | 'looks' | 'sound' | 'control'

interface Param {
  name: string
  type: 'number' | 'text'
  default: string | number
}

interface BlockDef {
  type: string
  category: Category
  template: (string | Param)[]
}

interface BlockInstance {
  id: string
  def: BlockDef
  params: Record<string, string | number>
  children?: BlockInstance[]
}

/** Tipos de bloco que contêm um corpo (aninhamento). */
const CONTAINER_TYPES = ['control_repeat']

const CAT_COLORS: Record<Category, string> = {
  events: 'bg-yellow-500',
  motion: 'bg-blue-500',
  looks: 'bg-purple-600',
  sound: 'bg-pink-500',
  control: 'bg-orange-500',
}

const CAT_LABELS: Record<Category, string> = {
  events: 'Eventos',
  motion: 'Movimento',
  looks: 'Aparência',
  sound: 'Som',
  control: 'Controle',
}

const BLOCKS: BlockDef[] = [
  { type: 'event_flag', category: 'events', template: ['Quando bandeira clicada'] },
  { type: 'motion_move', category: 'motion', template: ['Mova', { name: 'steps', type: 'number', default: 10 }, 'passos'] },
  { type: 'motion_turn_cw', category: 'motion', template: ['Gire', { name: 'deg', type: 'number', default: 15 }, 'graus (horário)'] },
  { type: 'motion_turn_ccw', category: 'motion', template: ['Gire', { name: 'deg', type: 'number', default: 15 }, 'graus (anti-horário)'] },
  { type: 'motion_gotoxy', category: 'motion', template: ['Vá para x:', { name: 'x', type: 'number', default: 0 }, 'y:', { name: 'y', type: 'number', default: 0 }] },
  { type: 'motion_edge', category: 'motion', template: ['Se tocar na borda, volte'] },
  { type: 'looks_say', category: 'looks', template: ['Diga', { name: 'msg', type: 'text', default: 'Olá!' }, 'por', { name: 'secs', type: 'number', default: 2 }, 's'] },
  { type: 'looks_size', category: 'looks', template: ['Tamanho', { name: 'size', type: 'number', default: 100 }, '%'] },
  { type: 'looks_show', category: 'looks', template: ['Mostre'] },
  { type: 'looks_hide', category: 'looks', template: ['Esconda'] },
  { type: 'sound_note', category: 'sound', template: ['Toque nota', { name: 'note', type: 'number', default: 60 }, 'por', { name: 'beats', type: 'number', default: 0.5 }] },
  { type: 'control_wait', category: 'control', template: ['Espere', { name: 'secs', type: 'number', default: 1 }, 's'] },
  { type: 'control_repeat', category: 'control', template: ['Repita', { name: 'times', type: 'number', default: 4 }, 'vezes'] },
]

const workspace = ref<BlockInstance[]>([])
usePersistentState('devstart_blocks', workspace)
const isRunning = ref(false)
const activeId = ref<string | null>(null)
/** Container atualmente selecionado como destino de novos blocos (null = raiz). */
const targetContainerId = ref<string | null>(null)
let abort: AbortController | null = null

const sprite = reactive({
  x: 0,
  y: 0,
  direction: 90,
  bubble: null as string | null,
  visible: true,
  size: 100,
})

function resetSprite() {
  sprite.x = 0
  sprite.y = 0
  sprite.direction = 90
  sprite.bubble = null
  sprite.visible = true
  sprite.size = 100
}

function createInstance(def: BlockDef): BlockInstance {
  const params: Record<string, string | number> = {}
  def.template.forEach((p) => {
    if (typeof p !== 'string') params[p.name] = p.default
  })
  const instance: BlockInstance = {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    def,
    params,
  }
  if (CONTAINER_TYPES.includes(def.type)) instance.children = []
  return instance
}

function findContainer(list: BlockInstance[], id: string): BlockInstance | null {
  for (const b of list) {
    if (b.id === id) return b
    if (b.children) {
      const found = findContainer(b.children, id)
      if (found) return found
    }
  }
  return null
}

function addBlock(def: BlockDef) {
  const instance = createInstance(def)
  if (targetContainerId.value) {
    const container = findContainer(workspace.value, targetContainerId.value)
    if (container?.children) {
      container.children.push(instance)
      return
    }
  }
  workspace.value.push(instance)
}

function removeFrom(list: BlockInstance[], id: string): BlockInstance[] {
  return list
    .filter((b) => b.id !== id)
    .map((b) => (b.children ? { ...b, children: removeFrom(b.children, id) } : b))
}

function removeBlock(id: string) {
  if (targetContainerId.value === id) targetContainerId.value = null
  workspace.value = removeFrom(workspace.value, id)
}

function selectContainer(id: string) {
  targetContainerId.value = targetContainerId.value === id ? null : id
}

function clearWorkspace() {
  workspace.value = []
  targetContainerId.value = null
}

function playTone(freq: number, dur: number) {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    osc.start()
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + dur)
    osc.stop(ctx.currentTime + dur)
  } catch {
    /* áudio indisponível */
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function runBlock(block: BlockInstance, signal: AbortSignal) {
  const p = block.params
  switch (block.def.type) {
    case 'motion_move': {
      const rad = ((sprite.direction - 90) * Math.PI) / 180
      sprite.x += Math.cos(rad) * Number(p.steps)
      sprite.y += Math.sin(rad) * Number(p.steps)
      break
    }
    case 'motion_turn_cw':
      sprite.direction += Number(p.deg)
      break
    case 'motion_turn_ccw':
      sprite.direction -= Number(p.deg)
      break
    case 'motion_gotoxy':
      sprite.x = Number(p.x)
      sprite.y = -Number(p.y)
      break
    case 'motion_edge': {
      const lx = 220
      const ly = 160
      if (sprite.x > lx || sprite.x < -lx) {
        sprite.direction = -sprite.direction
        sprite.x = sprite.x > 0 ? lx : -lx
      }
      if (sprite.y > ly || sprite.y < -ly) {
        sprite.direction = 180 - sprite.direction
        sprite.y = sprite.y > 0 ? ly : -ly
      }
      break
    }
    case 'looks_say':
      sprite.bubble = String(p.msg)
      await wait(Number(p.secs) * 1000)
      if (!signal.aborted) sprite.bubble = null
      break
    case 'looks_size':
      sprite.size = Number(p.size)
      break
    case 'looks_show':
      sprite.visible = true
      break
    case 'looks_hide':
      sprite.visible = false
      break
    case 'sound_note': {
      const freq = 440 * Math.pow(2, (Number(p.note) - 69) / 12)
      playTone(freq, Number(p.beats) * 0.5)
      await wait(Number(p.beats) * 500)
      break
    }
    case 'control_wait':
      await wait(Number(p.secs) * 1000)
      break
    // control_repeat é tratado recursivamente em runList (aninhamento real)
  }
}

async function runList(list: BlockInstance[], signal: AbortSignal) {
  for (const block of list) {
    if (signal.aborted) break
    activeId.value = block.id

    if (block.def.type === 'control_repeat') {
      const times = Number(block.params.times)
      for (let i = 0; i < times; i++) {
        if (signal.aborted) break
        await runList(block.children ?? [], signal)
      }
    } else {
      await runBlock(block, signal)
    }
    await wait(80)
  }
}

async function run() {
  if (isRunning.value) {
    abort?.abort()
    isRunning.value = false
    return
  }
  isRunning.value = true
  abort = new AbortController()
  try {
    await runList(workspace.value, abort.signal)
  } finally {
    isRunning.value = false
    activeId.value = null
  }
}

function stopAndReset() {
  abort?.abort()
  isRunning.value = false
  activeId.value = null
  resetSprite()
}

function showGuide() {
  Swal.fire({
    title: 'Como programar com blocos',
    html: '<div class="text-left text-sm space-y-2"><p>Clique nos blocos coloridos para adicioná-los à área de scripts.</p><ul class="list-disc pl-5"><li><b>Eventos</b>: iniciam o script.</li><li><b>Movimento</b>: mexem o personagem.</li><li><b>Controle</b>: use o bloco <b>Repita</b> e clique no ícone de pasta dele para inserir blocos <i>dentro</i> do laço.</li></ul><p>Clique em <b>Executar</b> para rodar!</p></div>',
    icon: 'info',
    confirmButtonText: 'Vamos programar!',
    confirmButtonColor: '#7c3aed',
  })
}
</script>

<template>
  <div class="container-page py-6">
    <div class="card mb-4 flex items-center justify-between p-3">
      <h1 class="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
        <Icon
          icon="lucide:blocks"
          class="h-6 w-6 text-orange-500"
        /> Programação em Blocos
      </h1>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="btn-ghost text-sm"
          @click="showGuide"
        >
          <Icon
            icon="lucide:circle-help"
            class="h-4 w-4"
          /> Guia
        </button>
        <button
          type="button"
          class="btn bg-green-600 text-white hover:bg-green-700"
          @click="run"
        >
          <Icon
            :icon="isRunning ? 'lucide:square' : 'lucide:flag'"
            class="h-4 w-4"
          />
          {{ isRunning ? 'Parar' : 'Executar' }}
        </button>
        <button
          type="button"
          class="btn-secondary"
          @click="stopAndReset"
        >
          <Icon
            icon="lucide:rotate-ccw"
            class="h-4 w-4"
          /> Reiniciar
        </button>
      </div>
    </div>

    <div class="grid gap-4 lg:grid-cols-[16rem_1fr_20rem]">
      <!-- Palette -->
      <aside class="card h-[560px] overflow-y-auto p-3">
        <template
          v-for="cat in (['events', 'motion', 'looks', 'sound', 'control'] as Category[])"
          :key="cat"
        >
          <h2 class="mb-2 mt-3 flex items-center gap-2 text-xs font-bold uppercase text-slate-500 first:mt-0">
            <span
              class="h-3 w-3 rounded"
              :class="CAT_COLORS[cat]"
            /> {{ CAT_LABELS[cat] }}
          </h2>
          <button
            v-for="def in BLOCKS.filter((b) => b.category === cat)"
            :key="def.type"
            type="button"
            class="mb-1.5 flex w-full items-center gap-1 rounded-md px-3 py-2 text-left text-xs font-bold text-white shadow-sm transition hover:brightness-110"
            :class="CAT_COLORS[cat]"
            @click="addBlock(def)"
          >
            <template
              v-for="(part, i) in def.template"
              :key="i"
            >
              <span v-if="typeof part === 'string'">{{ part }}</span>
              <span
                v-else
                class="rounded bg-black/20 px-1.5"
              >{{ part.default }}</span>
            </template>
          </button>
        </template>
      </aside>

      <!-- Workspace -->
      <div class="card flex flex-col overflow-hidden">
        <div class="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800">
          <span>Área de Scripts</span>
          <button
            type="button"
            class="text-red-500 hover:text-red-600"
            @click="clearWorkspace"
          >
            <Icon
              icon="lucide:trash-2"
              class="h-4 w-4"
            />
          </button>
        </div>
        <div class="flex-1 space-y-2 overflow-y-auto p-4">
          <p
            v-if="workspace.length === 0"
            class="mt-16 text-center text-sm text-slate-400"
          >
            Clique nos blocos à esquerda para montar seu script.
          </p>
          <BlockNode
            v-for="block in workspace"
            :key="block.id"
            :block="block"
            :colors="CAT_COLORS"
            :active-id="activeId"
            :target-container-id="targetContainerId"
            :container-types="CONTAINER_TYPES"
            @remove="removeBlock"
            @select-container="selectContainer"
          />
        </div>
      </div>

      <!-- Stage -->
      <div class="card flex flex-col overflow-hidden">
        <div class="border-b border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800">
          Palco
        </div>
        <div
          class="relative flex-1 overflow-hidden bg-white"
          style="min-height: 360px"
        >
          <div
            class="absolute left-1/2 top-1/2 flex items-center justify-center transition-all duration-150"
            :style="{
              transform: `translate(calc(-50% + ${sprite.x}px), calc(-50% + ${sprite.y}px)) rotate(${sprite.direction - 90}deg) scale(${sprite.size / 100})`,
              opacity: sprite.visible ? 1 : 0,
            }"
          >
            <div
              v-if="sprite.bubble"
              class="absolute -top-10 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 shadow"
            >
              {{ sprite.bubble }}
            </div>
            <Icon
              icon="lucide:cat"
              class="h-14 w-14 text-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
