<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <i class="fas fa-tag text-emerald-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Calculadora de Preço</h1>
        <p class="text-gray-600">Calcule o preço de venda ideal do seu produto</p>
      </div>

      <div class="space-y-6">
        <!-- Custos -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Custos do Produto</h3>
          
          <BaseInput
            v-model="custoProduto"
            label="Custo de Produção/Aquisição (R$)"
            type="number"
            :min="0"
            step="0.01"
            icon="fa-solid fa-box"
          />
          
          <BaseInput
            v-model="custoFrete"
            label="Custo de Frete (R$)"
            type="number"
            :min="0"
            step="0.01"
            icon="fa-solid fa-truck"
          />
          
          <BaseInput
            v-model="custoEmbalagem"
            label="Custo de Embalagem (R$)"
            type="number"
            :min="0"
            step="0.01"
            icon="fa-solid fa-box-open"
          />
          
          <BaseInput
            v-model="outrosCustos"
            label="Outros Custos (R$)"
            type="number"
            :min="0"
            step="0.01"
            icon="fa-solid fa-plus"
          />
        </div>

        <!-- Margens e Impostos -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Margens e Impostos</h3>
          
          <BaseInput
            v-model="margemLucro"
            label="Margem de Lucro (%)"
            type="number"
            :min="0"
            :max="100"
            icon="fa-solid fa-percent"
          />
          
          <BaseInput
            v-model="impostos"
            label="Impostos (%)"
            type="number"
            :min="0"
            :max="100"
            icon="fa-solid fa-receipt"
          />
          
          <BaseInput
            v-model="comissaoVenda"
            label="Comissão de Venda (%)"
            type="number"
            :min="0"
            :max="100"
            icon="fa-solid fa-handshake"
          />
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="calcular" variant="primary" class="flex-1">
            <i class="fas fa-calculator mr-2"></i>
            Calcular Preço
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Preço de Venda Sugerido</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.precoVenda }}</div>
            <div class="text-emerald-100">Lucro: R$ {{ resultado.lucroUnitario }}</div>
          </div>

          <!-- Breakdown -->
          <div class="bg-gray-50 rounded-lg p-6 space-y-3">
            <h4 class="font-semibold text-gray-900 mb-4">Detalhamento</h4>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Custo Total:</span>
              <span class="font-medium">R$ {{ resultado.custoTotal }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Margem de Lucro ({{ margemLucro }}%):</span>
              <span class="font-medium text-emerald-600">+ R$ {{ resultado.valorMargem }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Impostos ({{ impostos }}%):</span>
              <span class="font-medium text-red-600">+ R$ {{ resultado.valorImpostos }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Comissão ({{ comissaoVenda }}%):</span>
              <span class="font-medium text-orange-600">+ R$ {{ resultado.valorComissao }}</span>
            </div>
            
            <div class="border-t pt-3 flex justify-between font-semibold">
              <span>Preço Final:</span>
              <span class="text-emerald-600">R$ {{ resultado.precoVenda }}</span>
            </div>
          </div>

          <!-- Métricas -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600">{{ resultado.margemRealPct }}%</div>
              <div class="text-sm text-gray-600">Margem Real</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600">{{ resultado.markup }}x</div>
              <div class="text-sm text-gray-600">Markup</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600">R$ {{ resultado.precoAtacado }}</div>
              <div class="text-sm text-gray-600">Preço Atacado</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600">{{ resultado.descontoMax }}%</div>
              <div class="text-sm text-gray-600">Desc. Máx.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'

const custoProduto = ref(50)
const custoFrete = ref(10)
const custoEmbalagem = ref(5)
const outrosCustos = ref(5)
const margemLucro = ref(40)
const impostos = ref(15)
const comissaoVenda = ref(10)

const resultado = ref(null)

const calcular = () => {
  const custo = Number(custoProduto.value)
  const frete = Number(custoFrete.value)
  const embalagem = Number(custoEmbalagem.value)
  const outros = Number(outrosCustos.value)
  
  if (custo <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite o custo do produto' })
    return
  }

  const custoTotal = custo + frete + embalagem + outros
  
  // Cálculo: Preço = CustoTotal / (1 - (margem + impostos + comissão) / 100)
  const percentualTotal = (Number(margemLucro.value) + Number(impostos.value) + Number(comissaoVenda.value)) / 100
  const precoVenda = custoTotal / (1 - percentualTotal)
  
  const valorMargem = precoVenda * (Number(margemLucro.value) / 100)
  const valorImpostos = precoVenda * (Number(impostos.value) / 100)
  const valorComissao = precoVenda * (Number(comissaoVenda.value) / 100)
  const lucroUnitario = precoVenda - custoTotal - valorImpostos - valorComissao
  
  const margemRealPct = ((lucroUnitario / custoTotal) * 100).toFixed(2)
  const markup = (precoVenda / custoTotal).toFixed(2)
  const precoAtacado = (precoVenda * 0.7).toFixed(2)
  const descontoMax = Math.min(Number(margemLucro.value), 30).toFixed(0)

  resultado.value = {
    custoTotal: custoTotal.toFixed(2),
    valorMargem: valorMargem.toFixed(2),
    valorImpostos: valorImpostos.toFixed(2),
    valorComissao: valorComissao.toFixed(2),
    precoVenda: precoVenda.toFixed(2),
    lucroUnitario: lucroUnitario.toFixed(2),
    margemRealPct,
    markup,
    precoAtacado,
    descontoMax
  }
}

const limpar = () => {
  custoProduto.value = 50
  custoFrete.value = 10
  custoEmbalagem.value = 5
  outrosCustos.value = 5
  margemLucro.value = 40
  impostos.value = 15
  comissaoVenda.value = 10
  resultado.value = null
}
</script>
