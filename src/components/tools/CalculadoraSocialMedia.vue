<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
          <i class="fas fa-chart-line text-rose-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Calculadora Social Media</h1>
        <p class="text-gray-600">Calcule métricas e engajamento de redes sociais</p>
      </div>

      <div class="space-y-6">
        <!-- Tipo de Cálculo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Tipo de Cálculo</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="tipoCalculo = 'engajamento'"
              :class="[
                'p-4 rounded-lg border-2 transition-all',
                tipoCalculo === 'engajamento'
                  ? 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-gray-200 hover:border-rose-300'
              ]"
            >
              <i class="fas fa-heart text-2xl mb-2"></i>
              <div class="font-medium">Taxa de Engajamento</div>
            </button>
            <button
              @click="tipoCalculo = 'crescimento'"
              :class="[
                'p-4 rounded-lg border-2 transition-all',
                tipoCalculo === 'crescimento'
                  ? 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-gray-200 hover:border-rose-300'
              ]"
            >
              <i class="fas fa-chart-line text-2xl mb-2"></i>
              <div class="font-medium">Taxa de Crescimento</div>
            </button>
          </div>
        </div>

        <!-- Cálculo de Engajamento -->
        <div v-if="tipoCalculo === 'engajamento'" class="space-y-4">
          <BaseInput
            v-model="seguidores"
            label="Número de Seguidores"
            type="number"
            :min="0"
            icon="fa-solid fa-users"
          />
          <BaseInput
            v-model="curtidas"
            label="Curtidas"
            type="number"
            :min="0"
            icon="fa-solid fa-heart"
          />
          <BaseInput
            v-model="comentarios"
            label="Comentários"
            type="number"
            :min="0"
            icon="fa-solid fa-comment"
          />
          <BaseInput
            v-model="compartilhamentos"
            label="Compartilhamentos"
            type="number"
            :min="0"
            icon="fa-solid fa-share"
          />
        </div>

        <!-- Cálculo de Crescimento -->
        <div v-if="tipoCalculo === 'crescimento'" class="space-y-4">
          <BaseInput
            v-model="seguidoresAnteriores"
            label="Seguidores Anteriores"
            type="number"
            :min="0"
            icon="fa-solid fa-users"
          />
          <BaseInput
            v-model="seguidoresAtuais"
            label="Seguidores Atuais"
            type="number"
            :min="0"
            icon="fa-solid fa-users"
          />
          <BaseInput
            v-model="periodoDias"
            label="Período (dias)"
            type="number"
            :min="1"
            icon="fa-solid fa-calendar"
          />
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="calcular" variant="primary" class="flex-1">
            <i class="fas fa-calculator mr-2"></i>
            Calcular
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">{{ resultado.titulo }}</div>
            <div class="text-5xl font-bold mb-2">{{ resultado.valor }}%</div>
            <div class="text-rose-100">{{ resultado.descricao }}</div>
          </div>

          <!-- Métricas Detalhadas -->
          <div v-if="tipoCalculo === 'engajamento'" class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-rose-600">{{ totalInteracoes }}</div>
              <div class="text-sm text-gray-600">Total Interações</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-rose-600">{{ alcance }}</div>
              <div class="text-sm text-gray-600">Alcance Estimado</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-rose-600">{{ classificacao }}</div>
              <div class="text-sm text-gray-600">Classificação</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-rose-600">{{ interacoesPorSeguidor }}</div>
              <div class="text-sm text-gray-600">Por Seguidor</div>
            </div>
          </div>

          <div v-if="tipoCalculo === 'crescimento'" class="grid grid-cols-3 gap-4">
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-rose-600">{{ ganhoSeguidores }}</div>
              <div class="text-sm text-gray-600">Novos Seguidores</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-rose-600">{{ crescimentoDiario }}</div>
              <div class="text-sm text-gray-600">Por Dia</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-rose-600">{{ projecao30Dias }}</div>
              <div class="text-sm text-gray-600">Projeção 30 dias</div>
            </div>
          </div>

          <!-- Referência -->
          <div class="bg-rose-50 border border-rose-200 rounded-lg p-4">
            <h4 class="font-semibold text-rose-900 mb-2">Referências</h4>
            <div class="text-sm text-rose-800 space-y-1">
              <p v-if="tipoCalculo === 'engajamento'">
                • Excelente: > 6% | Bom: 3-6% | Médio: 1-3% | Baixo: < 1%
              </p>
              <p v-else>
                • Viral: > 10% | Muito Bom: 5-10% | Bom: 2-5% | Normal: < 2%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'

const tipoCalculo = ref('engajamento')

// Engajamento
const seguidores = ref(10000)
const curtidas = ref(500)
const comentarios = ref(50)
const compartilhamentos = ref(25)

// Crescimento
const seguidoresAnteriores = ref(10000)
const seguidoresAtuais = ref(12000)
const periodoDias = ref(30)

const resultado = ref(null)

// Computados Engajamento
const totalInteracoes = computed(() => {
  return Number(curtidas.value) + Number(comentarios.value) + Number(compartilhamentos.value)
})

const alcance = computed(() => {
  return Math.round(Number(seguidores.value) * 0.3)
})

const interacoesPorSeguidor = computed(() => {
  if (seguidores.value === 0) return '0.00'
  return (totalInteracoes.value / seguidores.value).toFixed(2)
})

const classificacao = computed(() => {
  const taxa = resultado.value ? parseFloat(resultado.value.valor) : 0
  if (taxa > 6) return 'Excelente'
  if (taxa > 3) return 'Bom'
  if (taxa > 1) return 'Médio'
  return 'Baixo'
})

// Computados Crescimento
const ganhoSeguidores = computed(() => {
  return Number(seguidoresAtuais.value) - Number(seguidoresAnteriores.value)
})

const crescimentoDiario = computed(() => {
  if (periodoDias.value === 0) return 0
  return Math.round(ganhoSeguidores.value / periodoDias.value)
})

const projecao30Dias = computed(() => {
  const taxaDiaria = crescimentoDiario.value
  return Number(seguidoresAtuais.value) + (taxaDiaria * 30)
})

// Calcular
const calcular = () => {
  if (tipoCalculo.value === 'engajamento') {
    if (seguidores.value <= 0) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite o número de seguidores' })
      return
    }
    
    const taxa = (totalInteracoes.value / seguidores.value) * 100
    
    resultado.value = {
      titulo: 'Taxa de Engajamento',
      valor: taxa.toFixed(2),
      descricao: `${totalInteracoes.value} interações de ${seguidores.value} seguidores`
    }
  } else {
    if (seguidoresAnteriores.value <= 0) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite os seguidores anteriores' })
      return
    }
    
    const taxa = ((ganhoSeguidores.value / seguidoresAnteriores.value) * 100)
    
    resultado.value = {
      titulo: 'Taxa de Crescimento',
      valor: taxa.toFixed(2),
      descricao: `${ganhoSeguidores.value} novos seguidores em ${periodoDias.value} dias`
    }
  }
}

// Limpar
const limpar = () => {
  seguidores.value = 10000
  curtidas.value = 500
  comentarios.value = 50
  compartilhamentos.value = 25
  seguidoresAnteriores.value = 10000
  seguidoresAtuais.value = 12000
  periodoDias.value = 30
  resultado.value = null
}
</script>
