<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Calculadora de Saúde Corporal
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Preencha os dados para obter uma análise da saúde corporal
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulário de Entrada -->
        <div class="lg:col-span-1">
          <div class="card sticky top-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Dados para Cálculo</h2>
            <small class="text-gray-500 mb-4 block">
              <em class="text-gray-400">Nota: Todos os campos são obrigatórios, após preencher, os dados solicitados o cálculo é simulado automaticamente e os resultados são exibidos ao lado.</em>
            </small>
            <form @submit.prevent class="space-y-6">
              <!-- Idade -->
              <div>
                <label for="idade" class="label">Idade (anos)</label>
                <input
                  id="idade"
                  v-model.number="idade"
                  type="number"
                  min="1"
                  max="120"
                  class="input-field"
                  placeholder="Ex: 25"
                  autocomplete="off"
                  required
                >
              </div>

              <!-- Altura -->
              <div>
                <label for="altura" class="label">Altura (metros)</label>
                <input
                  id="altura"
                  v-model.number="altura"
                  type="number"
                  step="0.01"
                  min="0.5"
                  max="2.5"
                  class="input-field"
                  placeholder="Ex: 1.70"
                  autocomplete="off"
                  required
                >
              </div>

              <!-- Peso -->
              <div>
                <label for="peso" class="label">Peso (kg)</label>
                <input
                  id="peso"
                  v-model.number="peso"
                  type="number"
                  step="0.1"
                  min="20"
                  max="300"
                  class="input-field"
                  placeholder="Ex: 70.5"
                  autocomplete="off"
                  required
                >
              </div>

              <!-- Sexo -->
              <div>
                <fieldset>
                  <legend class="label">Sexo</legend>
                  <div class="flex space-x-4">
                    <label class="flex items-center">
                      <input
                        v-model="sexo"
                        type="radio"
                        value="masculino"
                        class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      >
                      <span class="ml-2 text-gray-700">Masculino</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="sexo"
                        type="radio"
                        value="feminino"
                        class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      >
                      <span class="ml-2 text-gray-700">Feminino</span>
                    </label>
                  </div>
                </fieldset>
              </div>

              <!-- Nível de Atividade -->
              <div>
                <label for="atividade" class="label">Nível de Atividade Física</label>
                <select
                  id="atividade"
                  v-model.number="atividade"
                  class="input-field"
                  autocomplete="off"
                  required
                >
                  <option value="" disabled>Selecione seu nível</option>
                  <option value="1.2">Sedentário (pouco ou nenhum exercício)</option>
                  <option value="1.375">Levemente ativo (exercício leve 1-3 dias/semana)</option>
                  <option value="1.55">Moderadamente ativo (exercício 3-5 dias/semana)</option>
                  <option value="1.725">Muito ativo (exercício intenso 6-7 dias/semana)</option>
                  <option value="1.9">Extremamente ativo (exercício muito intenso, trabalho físico)</option>
                </select>
              </div>

              <!-- Botão de Info -->
              <div class="pt-4">
                <button
                  type="button"
                  @click="showInfo = !showInfo"
                  class="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ showInfo ? 'Ocultar' : 'Mostrar' }} Informações</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Resultados -->
        <div class="lg:col-span-2">
          <div v-if="isFormValid" class="space-y-6 animate-fade-in">
            <!-- IMC -->
            <div class="result-card">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold text-gray-900">Índice de Massa Corporal (IMC)</h3>
                <div class="text-right">
                  <div class="text-2xl font-bold text-primary-600">{{ imc.toFixed(1) }}</div>
                  <div :class="classificacaoIMC.color" class="text-sm font-medium">
                    {{ classificacaoIMC.status }}
                  </div>
                </div>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-300"
                  :class="getIMCBarColor(imc)"
                  :style="{ width: `${Math.min((imc / 40) * 100, 100)}%` }"
                ></div>
              </div>
            </div>

            <!-- Grid de Resultados -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Metabolismo Basal -->
              <div class="card">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Metabolismo Basal</h4>
                <div class="text-2xl font-bold text-green-600 mb-1">
                  {{ Math.round(metabolismoBasal) }} kcal/dia
                </div>
                <p class="text-sm text-gray-600">Calorias queimadas em repouso</p>
              </div>

              <!-- Calorias Diárias -->
              <div class="card">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Calorias Diárias</h4>
                <div class="text-2xl font-bold text-blue-600 mb-1">
                  {{ Math.round(caloriasDiarias) }} kcal/dia
                </div>
                <p class="text-sm text-gray-600">Necessidade calórica total</p>
              </div>

              <!-- Peso Ideal -->
              <div class="card">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Peso Ideal</h4>
                <div class="text-2xl font-bold text-purple-600 mb-1">
                  {{ pesoIdeal.toFixed(1) }} kg
                </div>
                <p class="text-sm text-gray-600">Baseado na fórmula de Devine</p>
              </div>

              <!-- Gordura Corporal -->
              <div class="card">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Gordura Corporal</h4>
                <div class="text-2xl font-bold text-orange-600 mb-1">
                  {{ Math.max(gorduraCorporal, 0).toFixed(1) }}%
                </div>
                <p class="text-sm text-gray-600">Estimativa aproximada</p>
              </div>
            </div>

            <!-- Necessidades Nutricionais -->
            <div class="card">
              <h3 class="text-xl font-semibold text-gray-900 mb-6">Necessidades Nutricionais Diárias</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="text-center p-4 bg-blue-50 rounded-lg">
                  <div class="text-lg font-bold text-blue-600">{{ aguaDiaria.toFixed(1) }}L</div>
                  <div class="text-sm text-gray-600">Água</div>
                </div>
                <div class="text-center p-4 bg-red-50 rounded-lg">
                  <div class="text-lg font-bold text-red-600">{{ Math.round(proteinasDiarias) }}g</div>
                  <div class="text-sm text-gray-600">Proteínas</div>
                </div>
                <div class="text-center p-4 bg-yellow-50 rounded-lg">
                  <div class="text-lg font-bold text-yellow-600">{{ Math.round(carboidratosDiarios) }}g</div>
                  <div class="text-sm text-gray-600">Carboidratos</div>
                </div>
                <div class="text-center p-4 bg-green-50 rounded-lg">
                  <div class="text-lg font-bold text-green-600">{{ Math.round(gordurasDiarias) }}g</div>
                  <div class="text-sm text-gray-600">Gorduras</div>
                </div>
              </div>
            </div>

            <!-- Gasto Calórico por Exercício -->
            <div class="card">
              <h3 class="text-xl font-semibold text-gray-900 mb-6">Gasto Calórico por Hora de Exercício</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(calorias, exercicio) in gastoExercicio" :key="exercicio" 
                     class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span class="capitalize text-gray-700">{{ formatExerciseName(exercicio) }}</span>
                  <span class="font-semibold text-primary-600">{{ Math.round(calorias) }} kcal</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Estado Inicial -->
          <div v-else class="card text-center py-12">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Preencha seus dados</h3>
            <p class="text-gray-600">Os resultados aparecerão aqui após o preenchimento do formulário</p>
          </div>
        </div>
      </div>

      <!-- Modal de Informações -->
      <div v-if="showInfo" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Informações Importantes</h2>
              <button
                @click="showInfo = false"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div class="prose max-w-none">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Sobre os Cálculos</h3>
              <div class="space-y-4 text-gray-600">
                <p>
                  <strong>IMC (Índice de Massa Corporal):</strong> Calculado usando a fórmula peso/(altura)². 
                  É uma medida padrão internacional para classificar o peso corporal.
                </p>
                <p>
                  <strong>Metabolismo Basal:</strong> Utiliza a equação de Mifflin-St Jeor, considerada uma 
                  das mais precisas para estimar o gasto energético em repouso.
                </p>
                <p>
                  <strong>Peso Ideal:</strong> Baseado na fórmula de Devine, amplamente utilizada por 
                  profissionais de saúde.
                </p>
                <p>
                  <strong>Necessidades Nutricionais:</strong> Calculadas com base em diretrizes nutricionais 
                  internacionais e ajustadas ao nível de atividade física.
                </p>
              </div>
              
              <h3 class="text-lg font-semibold text-gray-900 mb-3 mt-6">Limitações</h3>
              <div class="space-y-4 text-gray-600">
                <p>
                  Estas calculadoras fornecem estimativas baseadas em fórmulas padrão e podem não ser 
                  adequadas para todos os indivíduos, especialmente:
                </p>
                <ul class="list-disc pl-6 space-y-1">
                  <li>Atletas com alta massa muscular</li>
                  <li>Idosos</li>
                  <li>Crianças e adolescentes</li>
                  <li>Pessoas com condições médicas específicas</li>
                  <li>Mulheres grávidas ou lactantes</li>
                </ul>
              </div>
              
              <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p class="text-yellow-800 text-sm">
                  <strong>Importante:</strong> Sempre consulte profissionais de saúde qualificados para 
                  orientações personalizadas. Esta ferramenta não substitui o acompanhamento médico ou nutricional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHealthCalculations } from '../composables/useHealthCalculations'
import { ref, computed } from 'vue'

export default {
  name: 'Calculator',
  setup() {
    const showInfo = ref(false)
    
    const {
      idade,
      altura,
      peso,
      sexo,
      atividade,
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
    } = useHealthCalculations()

    const isFormValid = computed(() => {
      return idade.value > 0 && 
             altura.value > 0 && 
             peso.value > 0 && 
             sexo.value && 
             atividade.value > 0
    })

    const getIMCBarColor = (imcValue) => {
      if (imcValue < 18.5) return 'bg-blue-500'
      if (imcValue < 25) return 'bg-green-500'
      if (imcValue < 30) return 'bg-yellow-500'
      if (imcValue < 35) return 'bg-orange-500'
      return 'bg-red-500'
    }

    const formatExerciseName = (exercicio) => {
      const names = {
        caminhada: 'Caminhada',
        corrida: 'Corrida',
        natacao: 'Natação',
        ciclismo: 'Ciclismo',
        musculacao: 'Musculação',
        yoga: 'Yoga'
      }
      return names[exercicio] || exercicio
    }

    return {
      showInfo,
      idade,
      altura,
      peso,
      sexo,
      atividade,
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
      gastoExercicio,
      isFormValid,
      getIMCBarColor,
      formatExerciseName
    }
  }
}
</script>
