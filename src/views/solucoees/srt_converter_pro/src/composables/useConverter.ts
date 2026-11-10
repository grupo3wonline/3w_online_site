import { ref, computed } from 'vue'
import { convertToSRT, downloadSRT } from '../utils/srtConverter'
import type { ConversionResult, ConversionConfig } from '../types'
import { useLocalStorage } from './useLocalStorage'
import { useToast } from './useToast'

export interface ConversionHistory {
  id: string
  timestamp: number
  scriptPreview: string
  result: ConversionResult
  config: ConversionConfig
}

export function useConverter() {
  const toast = useToast()
  
  const scriptText = ref('')
  const conversionResult = ref<ConversionResult | null>(null)
  const isLoading = ref(false)
  const history = useLocalStorage<ConversionHistory[]>('conversion-history', [])
  const config = useLocalStorage<ConversionConfig>('conversion-config', {
    charactersPerBlock: 500,
    minWordsPerBlock: 80,
    maxWordsPerBlock: 100,
    blockDuration: 30,
    intervalBetweenBlocks: 30,
  })

  const hasContent = computed(() => scriptText.value.trim().length > 0)
  const hasResult = computed(() => conversionResult.value !== null)
  const characterCount = computed(() => scriptText.value.length)
  const wordCount = computed(() => scriptText.value.trim().split(/\s+/).filter(Boolean).length)

  const convert = async () => {
    if (!hasContent.value) {
      toast.warning('Campo vazio', 'Por favor, insira um roteiro para converter.')
      return
    }

    isLoading.value = true

    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 500))

      const result = convertToSRT(scriptText.value.trim(), config.value)
      conversionResult.value = result

      // Add to history
      addToHistory(scriptText.value, result)

      toast.success('Conversão concluída!', `${result.totalBlocks} blocos criados com sucesso.`)
    } catch (error) {
      console.error('Erro na conversão:', error)
      toast.error('Erro na conversão', 'Ocorreu um erro ao processar seu roteiro. Tente novamente.')
      conversionResult.value = null
    } finally {
      isLoading.value = false
    }
  }

  const download = (filename = 'legendas.srt') => {
    if (!hasResult.value || !conversionResult.value) {
      toast.warning('Nenhum resultado', 'Converta um roteiro antes de fazer o download.')
      return
    }

    try {
      downloadSRT(conversionResult.value.srtContent, filename)
      toast.success('Download iniciado!', 'Seu arquivo SRT foi baixado com sucesso.')
    } catch (error) {
      console.error('Erro no download:', error)
      toast.error('Erro no download', 'Não foi possível fazer o download do arquivo.')
    }
  }

  const clear = () => {
    scriptText.value = ''
    conversionResult.value = null
  }

  const addToHistory = (script: string, result: ConversionResult) => {
    const preview = script.substring(0, 100) + (script.length > 100 ? '...' : '')
    
    const entry: ConversionHistory = {
      id: `history-${Date.now()}`,
      timestamp: Date.now(),
      scriptPreview: preview,
      result,
      config: { ...config.value },
    }

    history.value = [entry, ...history.value].slice(0, 10) // Keep last 10
  }

  const loadFromHistory = (entry: ConversionHistory) => {
    conversionResult.value = entry.result
    toast.info('Histórico carregado', 'Resultado do histórico foi restaurado.')
  }

  const clearHistory = () => {
    history.value = []
    toast.info('Histórico limpo', 'Todo o histórico de conversões foi removido.')
  }

  const updateConfig = (newConfig: Partial<ConversionConfig>) => {
    config.value = { ...config.value, ...newConfig }
    toast.success('Configuração atualizada', 'As novas configurações serão aplicadas na próxima conversão.')
  }

  const resetConfig = () => {
    config.value = {
      charactersPerBlock: 500,
      minWordsPerBlock: 80,
      maxWordsPerBlock: 100,
      blockDuration: 30,
      intervalBetweenBlocks: 30,
    }
    toast.info('Configuração resetada', 'Configurações padrão restauradas.')
  }

  return {
    scriptText,
    conversionResult,
    isLoading,
    history,
    config,
    hasContent,
    hasResult,
    characterCount,
    wordCount,
    convert,
    download,
    clear,
    loadFromHistory,
    clearHistory,
    updateConfig,
    resetConfig,
  }
}
