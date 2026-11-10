<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import {
    useVueTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    FlexRender,
    type ColumnDef,
    type SortingState,
  } from '@tanstack/vue-table'
  import { Icon } from '@iconify/vue'
  import { useConsolidatorStore } from '@/stores/consolidator'
  import { PAGE_SIZE_OPTIONS } from '@/constants'

  const store = useConsolidatorStore()
  const sorting = ref<SortingState>([])

  /** Colunas dinâmicas baseadas nos dados consolidados */
  const columns = computed<ColumnDef<Record<string, unknown>>[]>(() => {
    return store.allColumns.map((col) => ({
      accessorKey: col,
      header: col,
    }))
  })

  const table = useVueTable({
    get data() {
      return store.filteredData as Record<string, unknown>[]
    },
    get columns() {
      return columns.value
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      get sorting() {
        return sorting.value
      },
    },
    onSortingChange: (updaterOrValue) => {
      sorting.value =
        typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
    },
    initialState: {
      pagination: {
        pageSize: store.pageSize,
      },
    },
  })

  /** Sincronizar tamanho de página do store com TanStack Table */
  watch(
    () => store.pageSize,
    (newSize) => {
      table.setPageSize(newSize)
    },
  )

  function handlePageSizeChange(e: Event) {
    const value = Number((e.target as HTMLSelectElement).value)
    store.setPageSize(value)
  }

  function isMetaColumn(col: string): boolean {
    return col === 'Arquivo_Origem' || col === 'Aba_Origem'
  }

  function formatCellValue(value: unknown): string {
    if (value === undefined || value === null || value === '') return '—'
    return String(value)
  }
</script>

<template>
  <section class="glass-card space-y-6 rounded-2xl p-4 sm:p-6">
    <!-- Barra de busca e filtros -->
    <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="relative w-full sm:w-96">
        <Icon
          icon="mdi:magnify"
          class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          autocomplete="off"
          placeholder="Pesquisar em todas as colunas..."
          :value="store.searchTerm"
          class="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none"
          @input="store.setSearch(($event.target as HTMLInputElement).value)"
        />
      </div>

      <div
        class="flex w-full items-center justify-between gap-3 text-xs text-slate-400 sm:w-auto sm:justify-end"
      >
        <span>
          {{ table.getRowModel().rows.length }} de {{ store.filteredData.length }} linhas
        </span>
        <select
          :value="store.pageSize"
          autocomplete="off"
          class="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
          @change="handlePageSizeChange"
        >
          <option v-for="size in PAGE_SIZE_OPTIONS" :key="size" :value="size">
            {{ size }} por página
          </option>
        </select>
      </div>
    </div>

    <!-- Tabela de dados -->
    <div class="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/50">
      <table class="w-full border-collapse text-left text-xs">
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="border-b border-slate-800 bg-slate-900/90 text-slate-300"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="cursor-pointer whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wide transition hover:text-emerald-400"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <div class="flex items-center gap-1.5">
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <Icon
                  v-if="header.column.getIsSorted() === 'asc'"
                  icon="mdi:arrow-up"
                  class="h-3 w-3 text-emerald-400"
                />
                <Icon
                  v-else-if="header.column.getIsSorted() === 'desc'"
                  icon="mdi:arrow-down"
                  class="h-3 w-3 text-emerald-400"
                />
                <Icon v-else icon="mdi:swap-vertical" class="h-3 w-3 text-slate-600" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/50">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="transition duration-150 hover:bg-slate-900/40"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="whitespace-nowrap px-4 py-3"
              :class="
                isMetaColumn(cell.column.id)
                  ? 'font-semibold text-emerald-400/90'
                  : 'text-slate-300'
              "
            >
              {{ formatCellValue(cell.getValue()) }}
            </td>
          </tr>

          <!-- Estado vazio de busca -->
          <tr v-if="table.getRowModel().rows.length === 0">
            <td
              :colspan="store.allColumns.length || 1"
              class="px-6 py-8 text-center text-slate-500"
            >
              <Icon icon="mdi:file-search-outline" class="mx-auto mb-2 h-6 w-6" />
              Nenhum registro encontrado
              <span v-if="store.searchTerm"> para "{{ store.searchTerm }}"</span>.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginação -->
    <div
      v-if="table.getPageCount() > 1"
      class="flex items-center justify-between pt-2 text-xs"
    >
      <button
        class="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        <Icon icon="mdi:chevron-left" class="h-4 w-4" />
        Anterior
      </button>

      <span class="font-medium text-slate-400">
        Página
        <span class="font-bold text-white">
          {{ table.getState().pagination.pageIndex + 1 }}
        </span>
        de
        <span class="font-bold text-white">{{ table.getPageCount() }}</span>
      </span>

      <button
        class="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Próximo
        <Icon icon="mdi:chevron-right" class="h-4 w-4" />
      </button>
    </div>
  </section>
</template>
