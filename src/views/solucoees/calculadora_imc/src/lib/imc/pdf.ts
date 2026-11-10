// Geração do relatório em PDF a partir do resultado do cálculo.
import jsPDF from 'jspdf'
import type { DadosUsuario, ResultadoIMC } from './types'

export function gerarRelatorioPDF(dados: DadosUsuario, r: ResultadoIMC): void {
  const doc = new jsPDF()

  doc.setFontSize(20)
  doc.text('Relatório Completo de Metas de Saúde', 20, 30)

  doc.setFontSize(14)
  doc.text('Dados do Usuário:', 20, 50)
  doc.setFontSize(12)
  doc.text(`Altura: ${dados.altura}m`, 20, 65)
  doc.text(`Peso: ${dados.peso}kg`, 20, 75)
  doc.text(`Idade: ${dados.idade} anos`, 20, 85)
  doc.text(`Sexo: ${dados.sexo === 'male' ? 'Masculino' : 'Feminino'}`, 20, 95)

  doc.setFontSize(14)
  doc.text('Análise Corporal:', 20, 115)
  doc.setFontSize(12)
  doc.text(`IMC: ${r.imc.toFixed(1)} (${r.imcCategoria})`, 20, 130)
  doc.text(`TMB: ${r.tmb.valor} kcal`, 20, 140)
  doc.text(`GET: ${r.get.valor} kcal`, 20, 150)
  doc.text(`Percentual de Gordura: ${r.percentualGordura.percentual}%`, 20, 160)

  doc.setFontSize(14)
  doc.text('Análise de Peso:', 20, 180)
  doc.setFontSize(12)
  doc.text(`Peso Mínimo: ${r.pesoIdeal.pesoMin}kg`, 20, 195)
  doc.text(`Peso Médio: ${r.pesoIdeal.pesoMed}kg`, 20, 205)
  doc.text(`Peso Máximo: ${r.pesoIdeal.pesoMax}kg`, 20, 215)

  doc.setFontSize(14)
  doc.text('Necessidades Nutricionais:', 20, 235)
  doc.setFontSize(12)
  doc.text(`Calorias: ${r.gastoCalorico.calorias.necessidade} kcal/dia`, 20, 250)
  doc.text(`Proteínas: ${r.gastoCalorico.proteinas.necessidade}g/dia`, 20, 260)
  doc.text(`Carboidratos: ${r.gastoCalorico.carboidratos.necessidade}g/dia`, 20, 270)
  doc.text(`Gorduras: ${r.gastoCalorico.gorduras.necessidade}g/dia`, 20, 280)

  doc.addPage()

  doc.setFontSize(14)
  doc.text('Hidratação:', 20, 30)
  doc.setFontSize(12)
  doc.text(`${r.hidratacao.litros} por dia`, 20, 45)
  doc.text(`${r.hidratacao.garrafas}`, 20, 55)
  doc.text(`${r.hidratacao.copos}`, 20, 65)

  doc.setFontSize(14)
  doc.text('Distribuição das Refeições:', 20, 85)
  doc.setFontSize(12)
  doc.text(`Café da manhã: ${r.refeicoes.cafe.calorias}kcal`, 20, 100)
  doc.text(`Almoço: ${r.refeicoes.almoco.calorias}kcal`, 20, 110)
  doc.text(`Jantar: ${r.refeicoes.jantar.calorias}kcal`, 20, 120)
  doc.text(`Lanches: ${r.refeicoes.lanches.calorias}kcal`, 20, 130)

  doc.setFontSize(14)
  doc.text('Recomendações:', 20, 150)
  doc.setFontSize(10)
  const lines = doc.splitTextToSize(r.pesoIdeal.nota, 170)
  doc.text(lines, 20, 165)

  doc.setFontSize(10)
  doc.text('AVISO IMPORTANTE:', 20, 220)
  doc.text('Esta ferramenta é informativa e não substitui acompanhamento profissional.', 20, 235)
  doc.text('Consulte um médico ou educador físico antes de iniciar qualquer plano', 20, 245)
  doc.text('alimentar ou de exercícios.', 20, 255)

  doc.save('relatorio-completo-metas-saude.pdf')
}
