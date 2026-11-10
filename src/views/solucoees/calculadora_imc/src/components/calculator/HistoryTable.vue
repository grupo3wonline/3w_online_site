<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Fuse from 'fuse.js'
import Swal from 'sweetalert2'
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
  createColumnHelper,
  type SortingState,
} from '@tanstack/vue-table'
import { storeToRefs } from 'pinia'
import { useHistoryStore, type HistoryEntry } from '@/stores/history'
import { exportarCSV, exportarJSON } from '@/lib/history/export'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useHistoryStore()
const { entries, isEmpty } = storeToRefs(store)

const busca = ref('')
const sorting = ref<SortingState>([{ id: 'data', desc: true }])

const SEXO_LABEL: Record<string, string> = { male: 'Masculino', female: 'Feminino' }

function formatarData(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Busca fuzzy por categoria/sexo/data com Fuse.js
const dadosFiltrados = computed<HistoryEntry[]>(() => {
  const termo = busca.value.trim()
  if (!termo) return entries.value
  const fuse = new Fuse(entries.value, {
    keys: ['categoria', 'sexo', 'data'],
    threshold: 0.4,
  })
  return fuse.search(termo).map((r) => r.item)
})

const columnHelper = createColumnHelper<HistoryEntry>()

const columns = [
  columnHelper.accessor('data', {
    header: 'Data',
    cell: (info) => formatarData(info.getValue()),
  }),
  columnHelper.accessor('imc', {
    header: 'IMC',
    cell: (info) => info.getValue().toFixed(1),
  }),
  columnHelper.accessor('categoria', { header: 'Categoria' }),
  columnHelper.accessor('altura', {
    header: 'Altura',
    cell: (info) => `${info.getValue()} m`,
  }),
  columnHelper.accessor('peso', {
    header: 'Peso',
    cell: (info) => `${info.getValue()} kg`,
  }),
  columnHelper.accessor('idade', {
    header: 'Idade',
    cell: (info) => `${info.getValue()} anos`,
  }),
  columnHelper.accessor('sexo', {
    header: 'Sexo',
    cell: (info) => SEXO_LABEL[info.getValue()] ?? info.getValue(),
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'acoes',
    header: '',
    cell: (info) => info.row.original.id,
  }),
]

const table = useVueTable({
  get data() {
    return dadosFiltrados.value
  },
  columns,
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})

function excluir(id: string) {
  store.remove(id)
}

async function limparTudo() {
  const res = await Swal.fire({
    icon: 'warning',
    title: 'Limpar histórico?',
    text: 'Esta ação remove todos os cálculos salvos neste dispositivo e não pode ser desfeita.',
    showCancelButton: true,
    confirmButtonText: 'Sim, limpar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
  })
  if (res.isConfirmed) store.clear()
}
</script>

<template>
  <BaseCard v-if="!isEmpty" class="mx-auto max-w-6xl">
    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="flex items-center gap-2 text-lg font-semibold">
          <Icon icon="lucide:history" class="h-5 w-5 text-primary" />
          Histórico de Cálculos
        </h3>
        <p class="text-sm text-muted-foreground">
          Salvo apenas neste dispositivo. {{ entries.length }} registro(s).
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <BaseButton size="sm" variant="outline" @click="exportarCSV(entries)">
          <Icon icon="lucide:file-spreadsheet" class="h-4 w-4" /> CSV
        </BaseButton>
        <BaseButton size="sm" variant="outline" @click="exportarJSON(entries)">
          <Icon icon="lucide:file-json" class="h-4 w-4" /> JSON
        </BaseButton>
        <BaseButton size="sm" variant="ghost" @click="limparTudo">
          <Icon icon="lucide:trash-2" class="h-4 w-4" /> Limpar
        </BaseButton>
      </div>
    </div>

    <!-- Busca -->
    <div class="relative mb-4">
      <Icon
        icon="lucide:search"
        class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        v-model="busca"
        type="search"
        autocomplete="off"
        placeholder="Buscar por categoria, sexo ou data..."
        aria-label="Buscar no histórico"
        class="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>

    <!-- Tabela -->
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-border text-muted-foreground">
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="px-3 py-2 font-medium"
              :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <span class="inline-flex items-center gap-1">
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <Icon
                  v-if="header.column.getIsSorted() === 'asc'"
                  icon="lucide:chevron-up"
                  class="h-3.5 w-3.5"
                />
                <Icon
                  v-else-if="header.column.getIsSorted() === 'desc'"
                  icon="lucide:chevron-down"
                  class="h-3.5 w-3.5"
                />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-b border-border/60 transition-colors hover:bg-muted/50"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-3 py-2"
            >
              <button
                v-if="cell.column.id === 'acoes'"
                type="button"
                class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-destructive transition-colors hover:bg-destructive/10"
                :aria-label="`Excluir registro de ${formatarData(row.original.data)}`"
                @click="excluir(row.original.id)"
              >
                <Icon icon="lucide:trash-2" class="h-4 w-4" />
              </button>
              <FlexRender
                v-else
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
          <tr v-if="table.getRowModel().rows.length === 0">
            <td :colspan="columns.length" class="px-3 py-6 text-center text-muted-foreground">
              Nenhum resultado para "{{ busca }}".
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>
