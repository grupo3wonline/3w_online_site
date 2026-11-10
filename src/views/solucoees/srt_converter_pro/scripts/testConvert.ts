import fs from 'fs'
import path from 'path'
import { convertToSRT } from '../src/utils/srtConverter'

const sample = Array(120).fill('Olá mundo! Este é um teste de conversão para SRT.').join(' ')

try {
  const config = {
    charactersPerBlock: 500,
    minWordsPerBlock: 80,
    maxWordsPerBlock: 100,
    blockDuration: 30,
    intervalBetweenBlocks: 5,
  }

  const result = convertToSRT(sample, config as any)
  console.log('Total blocks:', result.totalBlocks)
  console.log('Total duration:', result.totalDuration)
  console.log('Preview:\n', result.srtContent.slice(0, 1000))

  const outPath = path.resolve(process.cwd(), 'test-legendas.srt')
  fs.writeFileSync(outPath, '\uFEFF' + result.srtContent, 'utf8')
  console.log('Arquivo salvo em', outPath)
} catch (err) {
  console.error('Erro ao executar conversão:', err)
  process.exit(1)
}
