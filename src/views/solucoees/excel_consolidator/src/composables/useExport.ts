import * as XLSX from 'xlsx'
import { useAlert } from './useAlert'

export function useExport() {
  const alert = useAlert()

  function exportToExcel(
    data: Record<string, unknown>[],
    filename = 'Consolidado_Master_Excel',
  ) {
    if (data.length === 0) {
      alert.warning('Sem dados', 'Não há dados para exportar.')
      return
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabela Consolidada')
      XLSX.writeFile(workbook, `${filename}.xlsx`)
      alert.success('Exportação concluída!', `Arquivo ${filename}.xlsx baixado com sucesso.`)
    } catch {
      alert.error('Erro na exportação', 'Não foi possível gerar o arquivo Excel.')
    }
  }

  function exportToCSV(
    data: Record<string, unknown>[],
    filename = 'Consolidado_Master_Excel',
  ) {
    if (data.length === 0) {
      alert.warning('Sem dados', 'Não há dados para exportar.')
      return
    }

    let objectUrl: string | null = null

    try {
      const worksheet = XLSX.utils.json_to_sheet(data)
      const csvOutput = XLSX.utils.sheet_to_csv(worksheet)
      const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' })
      objectUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.setAttribute('href', objectUrl)
      link.setAttribute('download', `${filename}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      alert.success('Exportação concluída!', `Arquivo ${filename}.csv baixado com sucesso.`)
    } catch {
      alert.error('Erro na exportação', 'Não foi possível gerar o arquivo CSV.')
    } finally {
      // Cleanup para prevenir memory leak
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }

  return { exportToExcel, exportToCSV }
}
