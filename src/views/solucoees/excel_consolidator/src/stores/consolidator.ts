import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Fuse from 'fuse.js'
import type { ProcessedFile } from '@/types'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import { sampleFiles } from '@/constants/sampleData'

export const useConsolidatorStore = defineStore('consolidator', () => {
  // ─── Estado ───────────────────────────────────────────────
  const files = ref<ProcessedFile[]>([])
  const includeFileName = ref(true)
  const includeSheetName = ref(true)
  const searchTerm = ref('')
  const pageSize = ref(DEFAULT_PAGE_SIZE)
  const isProcessing = ref(false)
  const isDragging = ref(false)

  // ─── Dados Consolidados ──────────────────────────────────
  const consolidatedData = computed(() => {
    const rows: Record<string, unknown>[] = []
    for (const fileObj of files.value) {
      for (const sheet of fileObj.sheets) {
        for (const row of sheet.data) {
          const newRow: Record<string, unknown> = {}
          if (includeFileName.value) newRow['Arquivo_Origem'] = fileObj.name
          if (includeSheetName.value) newRow['Aba_Origem'] = sheet.sheetName
          Object.assign(newRow, row)
          rows.push(newRow)
        }
      }
    }
    return rows
  })

  // ─── Colunas ─────────────────────────────────────────────
  const allColumns = computed(() => {
    const colSet = new Set<string>()
    for (const row of consolidatedData.value) {
      for (const key of Object.keys(row)) {
        colSet.add(key)
      }
    }

    const cols = Array.from(colSet)
    const metaCols: string[] = []
    if (includeFileName.value && cols.includes('Arquivo_Origem')) {
      metaCols.push('Arquivo_Origem')
    }
    if (includeSheetName.value && cols.includes('Aba_Origem')) {
      metaCols.push('Aba_Origem')
    }
    const otherCols = cols.filter((c) => c !== 'Arquivo_Origem' && c !== 'Aba_Origem')
    return [...metaCols, ...otherCols]
  })

  // ─── Fuse.js (instância memoizada) ──────────────────────
  const fuseInstance = computed(() => {
    if (consolidatedData.value.length === 0 || allColumns.value.length === 0) {
      return null
    }
    return new Fuse(consolidatedData.value, {
      keys: allColumns.value,
      threshold: 0.3,
      ignoreLocation: true,
    })
  })

  // ─── Filtragem com busca fuzzy ───────────────────────────
  const filteredData = computed(() => {
    if (!searchTerm.value.trim()) return consolidatedData.value
    if (!fuseInstance.value) return consolidatedData.value
    return fuseInstance.value.search(searchTerm.value).map((result) => result.item)
  })

  // ─── Estatísticas ────────────────────────────────────────
  const stats = computed(() => ({
    fileCount: files.value.length,
    totalRows: consolidatedData.value.length,
    totalColumns: allColumns.value.length,
    filteredRows: filteredData.value.length,
  }))

  // ─── Ações ───────────────────────────────────────────────
  function addFiles(newFiles: ProcessedFile[]) {
    files.value.push(...newFiles)
  }

  function removeFile(id: string) {
    files.value = files.value.filter((f) => f.id !== id)
  }

  function clearAll() {
    files.value = []
    searchTerm.value = ''
  }

  function loadSampleData() {
    files.value = [...sampleFiles]
  }

  function setSearch(term: string) {
    searchTerm.value = term
  }

  function setPageSize(size: number) {
    pageSize.value = size
  }

  return {
    // Estado
    files,
    includeFileName,
    includeSheetName,
    searchTerm,
    pageSize,
    isProcessing,
    isDragging,
    // Getters
    consolidatedData,
    allColumns,
    filteredData,
    stats,
    // Ações
    addFiles,
    removeFile,
    clearAll,
    loadSampleData,
    setSearch,
    setPageSize,
  }
})
