// Motor de cálculo de IMC e metas de saúde.
// Funções puras — fórmulas preservadas do app original (React).

import type {
  DadosUsuario,
  GastoCalorico,
  Hidratacao,
  PesoIdeal,
  Refeicoes,
  ResultadoIMC,
  Sexo,
} from './types'
import { NUTRIENTES, REMEDIOS_NATURAIS } from './data'

export function getCategoriaIMC(imc: number): string {
  if (imc < 18.5) return 'Abaixo do peso'
  if (imc < 25) return 'Peso normal'
  if (imc < 30) return 'Sobrepeso'
  if (imc < 35) return 'Obesidade grau I'
  if (imc < 40) return 'Obesidade grau II'
  return 'Obesidade grau III'
}

export function calcGastoCalorico(
  peso: number,
  altura: number,
  idade: number,
  atividade: number,
  genero: Sexo,
): GastoCalorico {
  const indicacao = genero === 'female' ? 2000 : 2500

  const calorias = Math.ceil(
    (13.75 * peso + 5 * (altura * 100) - 6.76 * idade + 66.5) * atividade,
  )
  const proteinas = Math.ceil(peso * 1.6)
  const carboidratos = Math.ceil(peso * 6.5)
  const gorduras = Math.ceil(peso * 1.9)

  return {
    calorias: {
      necessidade: calorias,
      nota: `Necessidade da ingestão de ${calorias} calorias (kcal) por dia`,
      indicacao: `indicação de ${indicacao} calorias (kcal) por dia`,
    },
    proteinas: {
      necessidade: proteinas,
      nota: `Necessidade da ingestão de ${proteinas} gramas (g) de proteínas por dia`,
      indicacao: 'indicação de 0,8 gramas (g) por quilo (kg) de peso corporal por dia',
    },
    carboidratos: {
      necessidade: carboidratos,
      nota: `Necessidade da ingestão de ${carboidratos} gramas (g) de carboidratos por dia`,
      indicacao: 'indicação de 45% a 65% do total de calorias diárias',
    },
    gorduras: {
      necessidade: gorduras,
      nota: `Necessidade da ingestão de ${gorduras} gramas (g) de gorduras por dia`,
      indicacao: 'indicação de 20% a 35% do total de calorias diárias',
    },
  }
}

export function calcIngestaoAgua(peso: number, genero: Sexo): Hidratacao {
  const indicacao = genero === 'female' ? '2,7' : '3,7'

  const agua = Math.round(((peso * 35) / 1000) * 1000) / 1000
  const garrafas = Math.ceil((agua / 500) * 1000)
  const copos = Math.ceil((agua / 250) * 1000)

  return {
    necessidadeHidrica: agua,
    litros: `${agua} Litros`,
    garrafas: `${garrafas} Garrafas de 500ml`,
    copos: `${copos} Copos de 250ml`,
    nota: `indicação de ${indicacao} litros (l) por dia`,
  }
}

export function calcPeso(
  sexo: Sexo,
  altura: number,
  idade: number,
  peso: number,
): PesoIdeal {
  let peso1 = 0
  let peso2 = 0
  let peso3 = 0

  if (sexo === 'male') {
    peso1 = Math.round((72.7 * altura - 58) * 100) / 100
    peso3 = Math.round((altura * 100 - 100 - (altura * 100 - 150) / 4) * 100) / 100
  } else {
    peso1 = Math.round((62.1 * altura - 44.7) * 100) / 100
    peso3 = Math.round((altura * 100 - 100 - (altura * 100 - 150) / 2) * 100) / 100
  }

  if (altura < 2) {
    peso2 = Math.round((altura * 100 - 100 + (altura / 10) * 0.9) * 100) / 100
  } else {
    peso2 = Math.round((altura * 100 - 200 + (altura / 10) * 0.9) * 100) / 100
  }

  const pesoMed = Math.ceil((peso1 + peso2 + peso3) / 3)
  const pesoMin = Math.ceil(((altura - 1) * 100 + idade / 10) * 0.9 * 0.9)
  const pesoMax = Math.ceil(((altura - 1) * 100 + idade / 10) * 0.9 * 1.1)

  let nota = ''
  if (Math.ceil(peso) < Math.ceil(pesoMin)) {
    const newPeso = Math.ceil(pesoMin - peso)
    nota = `Seu peso é ${peso} kg. Atenção! Você está abaixo do peso mínimo indicado. Considere ganhar ${newPeso} kg. Mantenha seu peso entre ${pesoMin} kg e ${pesoMax} kg.`
  } else if (peso > pesoMax) {
    const newPeso = Math.ceil(peso - pesoMax)
    nota = `Seu peso é ${peso} kg. Atenção! Você está acima do peso máximo indicado. Considere perder ${newPeso} kg. Mantenha seu peso entre ${pesoMin} kg e ${pesoMax} kg.`
  } else {
    nota = `Seu peso é ${peso} kg. Parabéns! Você está dentro da faixa de peso ideal. Mantenha seu peso entre ${pesoMin} kg e ${pesoMax} kg.`
  }

  return { pesoMin, pesoMed, pesoMax, nota }
}

export function calcPercentualGordura(peso: number, altura: number, genero: Sexo) {
  const imc = peso / (altura * altura)
  const fatorGenero = genero === 'male' ? 1.0 : 0.8

  const percentual = Math.round((1.2 * imc + 0.23 * fatorGenero - 10.8 - 5.4) * 100) / 100

  return {
    percentual,
    nota: `Percentual de Gordura Corporal: ${percentual}%`,
  }
}

export function calcTMB(peso: number, altura: number, idade: number, genero: Sexo) {
  let tmb: number

  if (genero === 'male') {
    tmb = Math.round((66 + 13.75 * peso + 5 * altura * 100 - 6.75 * idade) * 100) / 100
  } else {
    tmb = Math.round((655 + 9.56 * peso + 1.85 * altura * 100 - 4.68 * idade) * 100) / 100
  }

  return { valor: tmb, nota: `Taxa Metabólica Basal (TMB): ${tmb} calorias` }
}

export function calcGET(
  peso: number,
  altura: number,
  idade: number,
  genero: Sexo,
  nivelAtividade: number,
) {
  const tmb = calcTMB(peso, altura, idade, genero)
  const get = Math.round(tmb.valor * nivelAtividade * 100) / 100

  return { valor: get, nota: `Gasto Energético Total (GET): ${get} calorias` }
}

function calcRefeicoes(calorias: number, proteina: number, carboidrato: number): Refeicoes {
  return {
    cafe: {
      calorias: Math.round(calorias * 0.25),
      proteina: Math.round(proteina * 0.25),
      carboidrato: Math.round(carboidrato * 0.3),
    },
    almoco: {
      calorias: Math.round(calorias * 0.35),
      proteina: Math.round(proteina * 0.35),
      carboidrato: Math.round(carboidrato * 0.4),
    },
    jantar: {
      calorias: Math.round(calorias * 0.3),
      proteina: Math.round(proteina * 0.3),
      carboidrato: Math.round(carboidrato * 0.25),
    },
    lanches: {
      calorias: Math.round(calorias * 0.1),
      proteina: Math.round(proteina * 0.1),
      carboidrato: Math.round(carboidrato * 0.05),
    },
  }
}

/**
 * Calcula todos os indicadores de saúde a partir dos dados do usuário.
 */
export function calcularResultado(dados: DadosUsuario): ResultadoIMC {
  const { altura, peso, idade, sexo, atividade } = dados

  const imc = peso / (altura * altura)
  const imcCategoria = getCategoriaIMC(imc)

  const pesoIdealFaixa = {
    min: Math.round(18.5 * altura * altura),
    max: Math.round(24.9 * altura * altura),
  }

  const gastoCalorico = calcGastoCalorico(peso, altura, idade, atividade, sexo)
  const hidratacao = calcIngestaoAgua(peso, sexo)
  const pesoIdeal = calcPeso(sexo, altura, idade, peso)
  const percentualGordura = calcPercentualGordura(peso, altura, sexo)
  const tmb = calcTMB(peso, altura, idade, sexo)
  const get = calcGET(peso, altura, idade, sexo, atividade)

  const calorias = gastoCalorico.calorias.necessidade
  const proteina = gastoCalorico.proteinas.necessidade
  const carboidrato = Math.round((calorias * 0.5) / 4)

  const refeicoes = calcRefeicoes(calorias, proteina, carboidrato)

  return {
    imc,
    imcCategoria,
    pesoIdealFaixa,
    hidratacao,
    calorias,
    proteina,
    carboidrato,
    refeicoes,
    gastoCalorico,
    pesoIdeal,
    percentualGordura,
    tmb,
    get,
    nutrientes: NUTRIENTES,
    remediosNaturais: REMEDIOS_NATURAIS,
  }
}
