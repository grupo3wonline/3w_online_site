import { ref, computed } from 'vue'

export function useHealthCalculations() {
  const idade = ref()
  const altura = ref()
  const peso = ref()
  const sexo = ref()
  const atividade = ref()

  // Cálculo do IMC
  const imc = computed(() => {
    if (altura.value > 0 && peso.value > 0) {
      return peso.value / (altura.value * altura.value)
    }
    return 0
  })

  // Classificação do IMC
  const classificacaoIMC = computed(() => {
    const imcValue = imc.value
    if (imcValue < 18.5) return { status: 'Abaixo do peso', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (imcValue < 25) return { status: 'Peso normal', color: 'text-green-600', bg: 'bg-green-50' }
    if (imcValue < 30) return { status: 'Sobrepeso', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    if (imcValue < 35) return { status: 'Obesidade grau I', color: 'text-orange-600', bg: 'bg-orange-50' }
    if (imcValue < 40) return { status: 'Obesidade grau II', color: 'text-red-600', bg: 'bg-red-50' }
    return { status: 'Obesidade grau III', color: 'text-red-800', bg: 'bg-red-100' }
  })

  // Cálculo do Metabolismo Basal
  const metabolismoBasal = computed(() => {
    if (sexo.value === 'masculino') {
      return 88.362 + (13.397 * peso.value) + (4.799 * (altura.value * 100)) - (5.677 * idade.value)
    } else {
      return 447.593 + (9.247 * peso.value) + (3.098 * (altura.value * 100)) - (4.330 * idade.value)
    }
  })

  // Cálculo das Calorias Diárias
  const caloriasDiarias = computed(() => {
    return metabolismoBasal.value * atividade.value
  })

  // Cálculo do Peso Ideal (Fórmula de Devine)
  const pesoIdeal = computed(() => {
    const alturaEmCm = altura.value * 100
    if (sexo.value === 'masculino') {
      return 50 + 2.3 * ((alturaEmCm / 2.54) - 60)
    } else {
      return 45.5 + 2.3 * ((alturaEmCm / 2.54) - 60)
    }
  })

  // Cálculo da Gordura Corporal (Fórmula aproximada)
  const gorduraCorporal = computed(() => {
    const imcValue = imc.value
    if (sexo.value === 'masculino') {
      return (1.20 * imcValue) + (0.23 * idade.value) - 16.2
    } else {
      return (1.20 * imcValue) + (0.23 * idade.value) - 5.4
    }
  })

  // Cálculo da Água (35ml por kg de peso)
  const aguaDiaria = computed(() => {
    return (peso.value * 35) / 1000 // em litros
  })

  // Cálculo de Proteínas (1.2g por kg para sedentários, 1.6g para ativos)
  const proteinasDiarias = computed(() => {
    let fator = 1.4 // padrão
    if (atividade.value <= 1.2) {
      fator = 1.2
    } else if (atividade.value >= 1.55) {
      fator = 1.8
    }
    return peso.value * fator
  })

  // Cálculo de Carboidratos (45-65% das calorias)
  const carboidratosDiarios = computed(() => {
    return (caloriasDiarias.value * 0.55) / 4 // 55% das calorias, dividido por 4 cal/g
  })

  // Cálculo de Gorduras (20-35% das calorias)
  const gordurasDiarias = computed(() => {
    return (caloriasDiarias.value * 0.25) / 9 // 25% das calorias, dividido por 9 cal/g
  })

  // Gasto calórico por exercício (estimativa por hora)
  const gastoExercicio = computed(() => {
    const peso_kg = peso.value
    return {
      caminhada: peso_kg * 3.8,
      corrida: peso_kg * 11.4,
      natacao: peso_kg * 8.3,
      ciclismo: peso_kg * 7.5,
      musculacao: peso_kg * 6.0,
      yoga: peso_kg * 2.5
    }
  })

  return {
    // Estado
    idade,
    altura,
    peso,
    sexo,
    atividade,
    
    // Resultados computados
    imc,
    classificacaoIMC,
    metabolismoBasal,
    caloriasDiarias,
    pesoIdeal,
    gorduraCorporal,
    aguaDiaria,
    proteinasDiarias,
    carboidratosDiarios,
    gordurasDiarias,
    gastoExercicio
  }
}
