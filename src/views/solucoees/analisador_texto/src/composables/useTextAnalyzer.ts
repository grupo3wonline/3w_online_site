/**
 * Composable que orquestra a análise/comparação de dois textos.
 * Reutilizado pela ferramenta standalone e pela seção embutida na landing.
 * Concentra estado + feedback ao usuário, delegando os cálculos à camada lib/.
 */
import { ref, shallowRef } from 'vue'
import Swal from 'sweetalert2'
import { computed } from 'vue'
import { analyzeText, compareAnalyses, fuzzyFindWords } from '@/lib/text'
import { DEFAULT_FILTERS, type ComparisonResult, type TextAnalysis, type TextFilters } from '@/lib/text/types'
import { validateTextFile } from '@/lib/validation/schemas'
import { sanitizeText } from '@/lib/text/sanitize'
import { useUiStore } from '@/stores/ui'

const SWAL_CONFIRM = '#4263eb'
const SWAL_CANCEL = '#64748b'

export function useTextAnalyzer() {
  const ui = useUiStore()

  const textA = ref('')
  const textB = ref('')
  const filtersA = ref<TextFilters>({ ...DEFAULT_FILTERS })
  const filtersB = ref<TextFilters>({ ...DEFAULT_FILTERS })
  const analysisA = shallowRef<TextAnalysis | null>(null)
  const analysisB = shallowRef<TextAnalysis | null>(null)
  const comparison = shallowRef<ComparisonResult | null>(null)
  const showComparison = ref(false)

  // Busca aproximada (fuzzy) de termos dentro do Texto A.
  const searchQuery = ref('')
  const searchTarget = ref<'A' | 'B'>('A')
  const searchResults = computed(() => {
    const source = searchTarget.value === 'A' ? textA.value : textB.value
    return fuzzyFindWords(source, searchQuery.value, 30)
  })

  function warnEmpty(label: string) {
    Swal.fire({
      icon: 'warning',
      title: `${label} vazio`,
      text: `Digite ou cole algum texto no campo do ${label} para analisar.`,
      confirmButtonColor: SWAL_CONFIRM
    })
  }

  async function analyze(which: 'A' | 'B') {
    const text = which === 'A' ? textA.value : textB.value
    if (!text.trim()) {
      warnEmpty(`Texto ${which}`)
      return
    }
    await ui.withLoading(async () => {
      // pequeno atraso para o overlay ser perceptível em textos pequenos
      await new Promise((r) => setTimeout(r, 180))
      const result = analyzeText(text, which === 'A' ? filtersA.value : filtersB.value)
      if (which === 'A') analysisA.value = result
      else analysisB.value = result
      showComparison.value = false
    }, 'Analisando texto...')

    Swal.fire({
      icon: 'success',
      title: 'Análise concluída',
      text: `Texto ${which} analisado com sucesso.`,
      timer: 1600,
      showConfirmButton: false
    })
  }

  async function compare() {
    if (!textA.value.trim() || !textB.value.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Textos incompletos',
        text: 'Preencha ambos os campos (Texto A e Texto B) para comparar.',
        confirmButtonColor: SWAL_CONFIRM
      })
      return
    }
    await ui.withLoading(async () => {
      await new Promise((r) => setTimeout(r, 250))
      analysisA.value = analyzeText(textA.value, filtersA.value)
      analysisB.value = analyzeText(textB.value, filtersB.value)
      comparison.value = compareAnalyses(analysisA.value, analysisB.value)
      showComparison.value = true
    }, 'Comparando textos...')

    Swal.fire({
      icon: 'success',
      title: 'Comparação concluída',
      text: 'Os textos foram comparados. Veja os resultados abaixo.',
      timer: 1800,
      showConfirmButton: false
    })
  }

  function handleFileUpload(file: File, which: 'A' | 'B') {
    const error = validateTextFile(file)
    if (error) {
      Swal.fire({ icon: 'error', title: 'Arquivo inválido', text: error, confirmButtonColor: SWAL_CONFIRM })
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = sanitizeText(String(e.target?.result ?? ''))
      if (which === 'A') textA.value = content
      else textB.value = content
      Swal.fire({
        icon: 'success',
        title: 'Arquivo carregado',
        text: `Conteúdo inserido no Texto ${which} com sucesso.`,
        timer: 1600,
        showConfirmButton: false
      })
    }
    reader.onerror = () => {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao ler o arquivo',
        text: 'Não foi possível ler o arquivo selecionado.',
        confirmButtonColor: SWAL_CONFIRM
      })
    }
    reader.readAsText(file, 'UTF-8')
  }

  async function copyText(which: 'A' | 'B') {
    const text = which === 'A' ? textA.value : textB.value
    if (!text) {
      Swal.fire({ icon: 'info', title: 'Nada para copiar', text: 'O campo está vazio.', confirmButtonColor: SWAL_CONFIRM })
      return
    }
    try {
      await navigator.clipboard.writeText(text)
      Swal.fire({ icon: 'success', title: 'Copiado!', text: 'Texto copiado.', timer: 1400, showConfirmButton: false })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao copiar',
        text: 'Não foi possível copiar. Selecione manualmente.',
        confirmButtonColor: SWAL_CONFIRM
      })
    }
  }

  function clearText(which: 'A' | 'B') {
    const text = which === 'A' ? textA.value : textB.value
    if (!text) return
    Swal.fire({
      icon: 'question',
      title: 'Limpar texto?',
      text: `Deseja limpar todo o conteúdo do Texto ${which}?`,
      showCancelButton: true,
      confirmButtonText: 'Sim, limpar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: SWAL_CONFIRM,
      cancelButtonColor: SWAL_CANCEL
    }).then((r) => {
      if (r.isConfirmed) {
        if (which === 'A') {
          textA.value = ''
          analysisA.value = null
        } else {
          textB.value = ''
          analysisB.value = null
        }
        showComparison.value = false
      }
    })
  }

  return {
    textA,
    textB,
    filtersA,
    filtersB,
    analysisA,
    analysisB,
    comparison,
    showComparison,
    searchQuery,
    searchTarget,
    searchResults,
    analyze,
    compare,
    handleFileUpload,
    copyText,
    clearText
  }
}
