<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Param {
  name: string
  type: 'number' | 'text'
  default: string | number
}
interface BlockDef {
  type: string
  category: string
  template: (string | Param)[]
}
interface BlockInstance {
  id: string
  def: BlockDef
  params: Record<string, string | number>
  children?: BlockInstance[]
}

defineProps<{
  block: BlockInstance
  colors: Record<string, string>
  activeId: string | null
  targetContainerId: string | null
  containerTypes: string[]
}>()

const emit = defineEmits<{
  remove: [id: string]
  selectContainer: [id: string]
}>()

function isString(part: string | Param): part is string {
  return typeof part === 'string'
}
</script>

<template>
  <div>
    <div
      class="group flex items-center gap-1 rounded-md px-3 py-2 text-xs font-bold text-white shadow-sm transition"
      :class="[colors[block.def.category], activeId === block.id ? 'ring-4 ring-cyan-300' : '']"
    >
      <template
        v-for="(part, i) in block.def.template"
        :key="i"
      >
        <span v-if="isString(part)">{{ part }}</span>
        <input
          v-else
          v-model="block.params[part.name]"
          :type="part.type === 'number' ? 'number' : 'text'"
          autocomplete="off"
          class="mx-1 w-16 rounded-full px-2 py-0.5 text-center text-xs text-black shadow-inner"
        >
      </template>

      <button
        v-if="containerTypes.includes(block.def.type)"
        type="button"
        class="ml-1 rounded-full bg-black/20 p-1 transition hover:bg-black/40"
        :class="targetContainerId === block.id ? 'ring-2 ring-white' : ''"
        :title="
          targetContainerId === block.id
            ? 'Recebendo blocos aqui — clique para soltar'
            : 'Adicionar blocos dentro deste laço'
        "
        @click="emit('selectContainer', block.id)"
      >
        <Icon
          :icon="targetContainerId === block.id ? 'lucide:folder-open' : 'lucide:folder-plus'"
          class="h-3 w-3"
        />
      </button>

      <button
        type="button"
        class="ml-auto rounded-full bg-black/20 p-1 opacity-0 transition group-hover:opacity-100"
        aria-label="Remover bloco"
        @click="emit('remove', block.id)"
      >
        <Icon
          icon="lucide:x"
          class="h-3 w-3"
        />
      </button>
    </div>

    <!-- Corpo do container (aninhamento) -->
    <div
      v-if="block.children"
      class="ml-4 mt-1 space-y-1.5 border-l-4 border-orange-300 py-1 pl-3"
      :class="targetContainerId === block.id ? 'bg-orange-50 dark:bg-orange-900/20' : ''"
    >
      <p
        v-if="block.children.length === 0"
        class="py-1 text-[11px] italic text-slate-400"
      >
        {{
          targetContainerId === block.id
            ? 'Clique nos blocos à esquerda para adicioná-los aqui.'
            : 'Vazio — use o botão da pasta para inserir blocos aqui.'
        }}
      </p>
      <BlockNode
        v-for="child in block.children"
        :key="child.id"
        :block="child"
        :colors="colors"
        :active-id="activeId"
        :target-container-id="targetContainerId"
        :container-types="containerTypes"
        @remove="emit('remove', $event)"
        @select-container="emit('selectContainer', $event)"
      />
    </div>
  </div>
</template>
