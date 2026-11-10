/**
 * Composable para exportação de relatórios em PDF
 * @module usePDF
 */

import { jsPDF } from 'jspdf'

export function usePDF() {
  /**
   * Gera PDF do relatório de simulação
   * @param {Object} data - Dados da simulação
   * @returns {Promise<void>}
   */
  const generateSimulationPDF = async (data) => {
    const {
      montanteInicial,
      aporteMensal,
      tempoInvestimento,
      montanteTotal,
      montanteInvestido,
      lucroTotal
    } = data

    // Criar novo documento PDF
    const doc = new jsPDF()

    // Configurações
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    let yPosition = 20

    // Cabeçalho
    doc.setFontSize(24)
    doc.setTextColor(37, 99, 235) // primary-600
    doc.text('InvestSim', pageWidth / 2, yPosition, { align: 'center' })

    yPosition += 10
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text('Relatório de Simulação de Investimento', pageWidth / 2, yPosition, { align: 'center' })

    yPosition += 15
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    const dataHora = new Date().toLocaleString('pt-BR')
    doc.text(`Gerado em: ${dataHora}`, pageWidth / 2, yPosition, { align: 'center' })

    // Linha divisória
    yPosition += 10
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)

    // Dados de Entrada
    yPosition += 15
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.setFont(undefined, 'bold')
    doc.text('Dados da Simulação', margin, yPosition)

    yPosition += 10
    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')

    const dadosEntrada = [
      ['Montante Inicial:', `R$ ${formatNumber(montanteInicial)}`],
      ['Aporte Mensal:', `R$ ${formatNumber(aporteMensal)}`],
      ['Tempo de Investimento:', `${tempoInvestimento} anos (${Math.round(tempoInvestimento * 12)} meses)`]
    ]

    dadosEntrada.forEach(([label, value]) => {
      yPosition += 8
      doc.setTextColor(80, 80, 80)
      doc.text(label, margin, yPosition)
      doc.setTextColor(0, 0, 0)
      doc.setFont(undefined, 'bold')
      doc.text(value, margin + 70, yPosition)
      doc.setFont(undefined, 'normal')
    })

    // Resultados
    yPosition += 20
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text('Resultados', margin, yPosition)

    // Box de resultados com fundo
    yPosition += 10
    doc.setFillColor(239, 246, 255) // blue-50
    doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 50, 3, 3, 'F')

    yPosition += 12
    doc.setFontSize(12)
    doc.setTextColor(37, 99, 235) // primary-600

    const resultados = [
      ['💰 Valor Total Investido:', `R$ ${formatNumber(montanteInvestido)}`],
      ['📈 Montante Acumulado:', `R$ ${formatNumber(montanteTotal)}`],
      ['🎯 Lucro Obtido:', `R$ ${formatNumber(lucroTotal)}`]
    ]

    resultados.forEach(([label, value], index) => {
      yPosition += index > 0 ? 12 : 0
      doc.setTextColor(80, 80, 80)
      doc.text(label, margin + 5, yPosition)
      doc.setTextColor(34, 139, 34) // green
      doc.setFont(undefined, 'bold')
      doc.setFontSize(13)
      doc.text(value, margin + 85, yPosition)
      doc.setFont(undefined, 'normal')
      doc.setFontSize(12)
    })

    // Análise
    yPosition += 30
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.setFont(undefined, 'bold')
    doc.text('Análise', margin, yPosition)

    yPosition += 10
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    doc.setTextColor(60, 60, 60)

    const rentabilidade = ((lucroTotal / montanteInvestido) * 100).toFixed(2)
    const valorFinal = montanteTotal

    const analiseTexto = [
      `• Rentabilidade total: ${rentabilidade}%`,
      `• Seu investimento inicial de R$ ${formatNumber(montanteInicial)} cresceu para R$ ${formatNumber(valorFinal)}`,
      `• Com aportes mensais de R$ ${formatNumber(aporteMensal)}, você obteve um lucro de R$ ${formatNumber(lucroTotal)}`,
      `• Os juros compostos trabalharam a seu favor durante ${tempoInvestimento} anos`
    ]

    analiseTexto.forEach(texto => {
      yPosition += 8
      doc.text(texto, margin + 5, yPosition, { maxWidth: pageWidth - 2 * margin - 10 })
    })

    // Disclaimer
    yPosition += 20
    doc.setFontSize(8)
    doc.setTextColor(120, 120, 120)
    doc.setFont(undefined, 'italic')
    const disclaimer = 'Aviso: Esta é uma simulação baseada em projeções matemáticas. Os resultados reais podem variar de acordo com as condições de mercado, taxas de administração e outros fatores. Consulte sempre um especialista financeiro antes de tomar decisões de investimento.'
    doc.text(disclaimer, margin, yPosition, { maxWidth: pageWidth - 2 * margin, align: 'justify' })

    // Rodapé
    const footerY = doc.internal.pageSize.getHeight() - 15
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.setFont(undefined, 'normal')
    doc.text('InvestSim - Simulador de Investimentos', pageWidth / 2, footerY, { align: 'center' })
    doc.text('https://app.3wonline.com/investsim/', pageWidth / 2, footerY + 5, { align: 'center' })

    // Salvar PDF
    const fileName = `investsim-relatorio-${new Date().getTime()}.pdf`
    doc.save(fileName)
  }

  /**
   * Formata número para exibição
   * @param {number} value - Valor a formatar
   * @returns {string}
   */
  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  return {
    generateSimulationPDF
  }
}
