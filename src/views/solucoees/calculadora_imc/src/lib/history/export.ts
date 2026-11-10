import type { HistoryEntry } from '@/stores/history'

function baixarArquivo(conteudo: string, nome: string, tipo: string): void {
  const blob = new Blob([conteudo], { type: tipo })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nome
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

const SEXO_LABEL: Record<string, string> = { male: 'Masculino', female: 'Feminino' }

export function exportarJSON(entries: HistoryEntry[]): void {
  baixarArquivo(
    JSON.stringify(entries, null, 2),
    'historico-imc.json',
    'application/json;charset=utf-8',
  )
}

export function exportarCSV(entries: HistoryEntry[]): void {
  const cabecalho = ['Data', 'Altura (m)', 'Peso (kg)', 'Idade', 'Sexo', 'IMC', 'Categoria']
  const linhas = entries.map((e) =>
    [
      new Date(e.data).toLocaleString('pt-BR'),
      e.altura,
      e.peso,
      e.idade,
      SEXO_LABEL[e.sexo] ?? e.sexo,
      e.imc,
      e.categoria,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(','),
  )
  // BOM para acentuação correta no Excel
  const csv = '\uFEFF' + [cabecalho.join(','), ...linhas].join('\n')
  baixarArquivo(csv, 'historico-imc.csv', 'text/csv;charset=utf-8')
}
