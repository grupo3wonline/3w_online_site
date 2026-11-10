import type { SRTBlock, ConversionConfig, ConversionResult } from '../types'
import { cleanTextForSRT } from './sanitize'
import { validate, required, minWords } from './validation'

const DEFAULT_CONFIG: ConversionConfig = {
  charactersPerBlock: 500,
  minWordsPerBlock: 80,
  maxWordsPerBlock: 100,
  blockDuration: 30,
  intervalBetweenBlocks: 30
}

export function convertToSRT(text: string, config: ConversionConfig = DEFAULT_CONFIG): ConversionResult {
  // Sanitize input
  const cleanedText = cleanTextForSRT(text)
  
  // Validate input
  const validationResult = validate(cleanedText, [
    required(),
    minWords(5)
  ])
  
  if (!validationResult.valid) {
    throw new Error(validationResult.errors[0] || 'Texto inválido')
  }
  // Ensure config values are sane
  const cfg: ConversionConfig = {
    charactersPerBlock: config.charactersPerBlock || DEFAULT_CONFIG.charactersPerBlock,
    minWordsPerBlock: config.minWordsPerBlock || DEFAULT_CONFIG.minWordsPerBlock,
    maxWordsPerBlock: config.maxWordsPerBlock || DEFAULT_CONFIG.maxWordsPerBlock,
    blockDuration: config.blockDuration || DEFAULT_CONFIG.blockDuration,
    intervalBetweenBlocks: Math.min(Math.max(0, config.intervalBetweenBlocks ?? DEFAULT_CONFIG.intervalBetweenBlocks), 30),
  }

  let srt = ''
  let counter = 1
  let accumulatedTime = 0
  const words = cleanedText.split(/\s+/)
  let currentBlock = ''
  let wordsInBlock = 0
  const blocks: SRTBlock[] = []

  for (const word of words) {
    if (currentBlock.length + word.length <= cfg.charactersPerBlock && wordsInBlock < cfg.maxWordsPerBlock) {
      currentBlock += word + ' '
      wordsInBlock++
    } else {
      // Try to split at last sentence-ending punctuation (., ?, !)
      const lastPunctuation = findLastPunctuationIndex(currentBlock)
      if (lastPunctuation !== -1 && lastPunctuation !== currentBlock.length - 1) {
        const remainder = currentBlock.substring(lastPunctuation + 1)
        currentBlock = currentBlock.substring(0, lastPunctuation + 1)
        const block = formatSRTBlock(counter, accumulatedTime, currentBlock, cfg)
        srt += block.content
        blocks.push(block.data)
        counter++
        accumulatedTime += cfg.blockDuration + cfg.intervalBetweenBlocks
        currentBlock = (remainder + ' ' + word + ' ').trim() + ' '
        wordsInBlock = remainder.trim() ? remainder.trim().split(/\s+/).length + 1 : 1
      } else {
        const block = formatSRTBlock(counter, accumulatedTime, currentBlock, cfg)
        srt += block.content
        blocks.push(block.data)
        counter++
        accumulatedTime += cfg.blockDuration + cfg.intervalBetweenBlocks
        currentBlock = word + ' '
        wordsInBlock = 1
      }
    }
  }

  if (currentBlock) {
    const block = formatSRTBlock(counter, accumulatedTime, currentBlock, cfg)
    srt += block.content
    blocks.push(block.data)
  }

  // Compute total duration: blocks * blockDuration + intervals between blocks (blocks - 1)
  const totalBlocks = blocks.length
  const totalSeconds = totalBlocks * cfg.blockDuration + Math.max(0, totalBlocks - 1) * cfg.intervalBetweenBlocks

  return {
    srtContent: srt.trim(),
    blocks,
    totalBlocks,
    totalDuration: formatTime(totalSeconds)
  }
}

function findLastPunctuationIndex(text: string): number {
  if (!text) return -1
  const punctuations = ['.', '!', '?']
  let last = -1
  for (const p of punctuations) {
    const idx = text.lastIndexOf(p)
    if (idx > last) last = idx
  }
  return last
}

function formatSRTBlock(counter: number, startTime: number, text: string, config: ConversionConfig) {
  const endTime = startTime + config.blockDuration
  const startTimeStr = formatTime(startTime)
  const endTimeStr = formatTime(endTime)
  const content = `${counter}\n${startTimeStr} --> ${endTimeStr}\n${text.trim()}\n\n`

  return {
    content,
    data: {
      index: counter,
      startTime: startTimeStr,
      endTime: endTimeStr,
      text: text.trim()
    }
  }
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  const milliseconds = Math.floor((seconds % 1) * 1000)
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)},${pad(milliseconds, 3)}`
}

function pad(number: number, size = 2): string {
  return number.toString().padStart(size, '0')
}

export function downloadSRT(content: string, filename = 'legendas.srt'): void {
  if (!content || content.trim().length === 0) {
    throw new Error('Conteúdo vazio. Nada para baixar.')
  }

  try {
    // Add BOM for UTF-8 encoding
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
  } catch (error) {
    console.error('Erro ao fazer download:', error)
    throw new Error('Falha ao fazer o download do arquivo.')
  }
}

/**
 * Copy SRT content to clipboard
 */
export async function copySRTToClipboard(content: string): Promise<void> {
  if (!content || content.trim().length === 0) {
    throw new Error('Conteúdo vazio. Nada para copiar.')
  }

  try {
    await navigator.clipboard.writeText(content)
  } catch (clipboardError: unknown) {
    console.warn('Clipboard API failed, using fallback:', clipboardError)
    
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = content
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    
    try {
      // eslint-disable-next-line deprecation/deprecation
      const successful = document.execCommand('copy')
      if (!successful) {
        throw new Error('Copy command failed')
      }
    } catch (execError) {
      console.error('Fallback copy failed:', execError)
      throw new Error('Falha ao copiar para a área de transferência.')
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

export { DEFAULT_CONFIG }