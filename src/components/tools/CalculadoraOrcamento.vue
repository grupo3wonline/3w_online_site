<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <i class="fas fa-file-invoice-dollar text-purple-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Calculadora de Orçamento</h1>
        <p class="text-gray-600">Crie orçamentos profissionais para seus projetos</p>
      </div>

      <div class="space-y-6">
        <!-- Nome do Projeto -->
        <BaseInput
          v-model="nomeProjeto"
          label="Nome do Projeto"
          type="text"
          icon="fa-solid fa-project-diagram"
        />

        <!-- Itens do Orçamento -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">
            <i class="fas fa-list mr-2 text-purple-600"></i>
            Itens do Orçamento
          </label>
          
          <div v-for="(item, index) in itens" :key="index" class="flex gap-2">
            <input
              v-model="item.descricao"
              type="text"
              placeholder="Descrição do item"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
            <input
              v-model="item.quantidade"
              type="number"
              min="1"
              placeholder="Qtd"
              class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
            <input
              v-model="item.valorUnitario"
              type="number"
              min="0"
              step="0.01"
              placeholder="Valor"
              class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
            <button
              @click="removerItem(index)"
              class="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
          
          <button
            @click="adicionarItem"
            class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-600"
          >
            <i class="fas fa-plus mr-2"></i>
            Adicionar Item
          </button>
        </div>

        <!-- Configurações -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput
            v-model="desconto"
            label="Desconto (%)"
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
            v-model="margem"
            label="Margem (%)"
            type="number"
            :min="0"
            :max="100"
            icon="fa-solid fa-chart-line"
          />
        </div>

        <!-- Observações -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            <i class="fas fa-comment-alt mr-2 text-purple-600"></i>
            Observações
          </label>
          <textarea
            v-model="observacoes"
            rows="3"
            placeholder="Informações adicionais sobre o orçamento..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          ></textarea>
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="calcular" variant="primary" class="flex-1">
            <i class="fas fa-calculator mr-2"></i>
            Calcular Orçamento
          </BaseButton>
          <BaseButton @click="baixarPDF" variant="outline" :disabled="!resultado">
            <i class="fas fa-download mr-2"></i>
            Baixar PDF
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Valor Total do Orçamento</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.total }}</div>
            <div class="text-purple-100">{{ resultado.itensCount }} itens • {{ resultado.quantidadeTotal }} unidades</div>
          </div>

          <!-- Tabela de Itens -->
          <div class="bg-gray-50 rounded-lg p-6 overflow-x-auto">
            <h4 class="font-semibold text-gray-900 mb-4">Detalhamento dos Itens</h4>
            
            <table class="w-full text-sm">
              <thead class="border-b-2 border-gray-300">
                <tr class="text-left">
                  <th class="pb-2">Item</th>
                  <th class="pb-2 text-center">Qtd</th>
                  <th class="pb-2 text-right">Valor Unit.</th>
                  <th class="pb-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in resultado.itensDetalhados" :key="index" class="border-b border-gray-200">
                  <td class="py-2">{{ item.descricao }}</td>
                  <td class="py-2 text-center">{{ item.quantidade }}</td>
                  <td class="py-2 text-right">R$ {{ item.valorUnitario }}</td>
                  <td class="py-2 text-right font-medium">R$ {{ item.subtotal }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Cálculos -->
          <div class="bg-gray-50 rounded-lg p-6 space-y-3">
            <h4 class="font-semibold text-gray-900 mb-4">Cálculos</h4>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal:</span>
              <span class="font-medium">R$ {{ resultado.subtotal }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Desconto ({{ desconto }}%):</span>
              <span class="font-medium text-red-600">- R$ {{ resultado.valorDesconto }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Margem ({{ margem }}%):</span>
              <span class="font-medium text-green-600">+ R$ {{ resultado.valorMargem }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Impostos ({{ impostos }}%):</span>
              <span class="font-medium text-orange-600">+ R$ {{ resultado.valorImpostos }}</span>
            </div>
            
            <div class="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span class="text-purple-600">R$ {{ resultado.total }}</span>
            </div>
          </div>

          <!-- Métricas -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600">{{ resultado.itensCount }}</div>
              <div class="text-sm text-gray-600">Itens</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600">{{ resultado.quantidadeTotal }}</div>
              <div class="text-sm text-gray-600">Unidades</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600">R$ {{ resultado.ticketMedio }}</div>
              <div class="text-sm text-gray-600">Ticket Médio</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600">{{ resultado.margemReal }}%</div>
              <div class="text-sm text-gray-600">Margem Real</div>
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

const nomeProjeto = ref('Meu Projeto')
const desconto = ref(0)
const impostos = ref(15)
const margem = ref(30)
const observacoes = ref('')

const itens = ref([
  { descricao: 'Item 1', quantidade: 1, valorUnitario: 100 },
  { descricao: 'Item 2', quantidade: 2, valorUnitario: 50 }
])

const resultado = ref(null)

const adicionarItem = () => {
  itens.value.push({
    descricao: `Item ${itens.value.length + 1}`,
    quantidade: 1,
    valorUnitario: 0
  })
}

const removerItem = (index) => {
  if (itens.value.length > 1) {
    itens.value.splice(index, 1)
  } else {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'Mantenha pelo menos 1 item' })
  }
}

const calcular = () => {
  if (itens.value.some(item => !item.descricao || item.quantidade <= 0 || item.valorUnitario <= 0)) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Preencha todos os itens corretamente' })
    return
  }

  const itensDetalhados = itens.value.map(item => {
    const subtotal = Number(item.quantidade) * Number(item.valorUnitario)
    return {
      descricao: item.descricao,
      quantidade: item.quantidade,
      valorUnitario: Number(item.valorUnitario).toFixed(2),
      subtotal: subtotal.toFixed(2)
    }
  })

  const subtotal = itens.value.reduce((acc, item) => {
    return acc + (Number(item.quantidade) * Number(item.valorUnitario))
  }, 0)

  const valorDesconto = subtotal * (Number(desconto.value) / 100)
  const subtotalComDesconto = subtotal - valorDesconto
  const valorMargem = subtotalComDesconto * (Number(margem.value) / 100)
  const subtotalComMargem = subtotalComDesconto + valorMargem
  const valorImpostos = subtotalComMargem * (Number(impostos.value) / 100)
  const total = subtotalComMargem + valorImpostos

  const quantidadeTotal = itens.value.reduce((acc, item) => acc + Number(item.quantidade), 0)
  const ticketMedio = subtotal / itens.value.length
  const margemReal = ((total - subtotal) / subtotal * 100).toFixed(2)

  resultado.value = {
    subtotal: subtotal.toFixed(2),
    valorDesconto: valorDesconto.toFixed(2),
    valorMargem: valorMargem.toFixed(2),
    valorImpostos: valorImpostos.toFixed(2),
    total: total.toFixed(2),
    itensCount: itens.value.length,
    quantidadeTotal,
    ticketMedio: ticketMedio.toFixed(2),
    margemReal,
    itensDetalhados
  }
}

const baixarPDF = () => {
  if (!resultado.value) return
  
  let conteudo = `ORÇAMENTO: ${nomeProjeto.value}\n\n`
  conteudo += `ITENS:\n`
  resultado.value.itensDetalhados.forEach(item => {
    conteudo += `${item.descricao} - ${item.quantidade}x R$ ${item.valorUnitario} = R$ ${item.subtotal}\n`
  })
  conteudo += `\nSUBTOTAL: R$ ${resultado.value.subtotal}\n`
  conteudo += `DESCONTO (-${desconto.value}%): R$ ${resultado.value.valorDesconto}\n`
  conteudo += `MARGEM (+${margem.value}%): R$ ${resultado.value.valorMargem}\n`
  conteudo += `IMPOSTOS (+${impostos.value}%): R$ ${resultado.value.valorImpostos}\n`
  conteudo += `\nTOTAL: R$ ${resultado.value.total}\n`
  if (observacoes.value) {
    conteudo += `\nOBSERVAÇÕES:\n${observacoes.value}\n`
  }
  
  const blob = new Blob([conteudo], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `orcamento-${nomeProjeto.value.toLowerCase().replace(/\s+/g, '-')}.txt`
  a.click()
  URL.revokeObjectURL(url)
  
  Swal.fire({ icon: 'success', title: 'Sucesso!', text: 'Orçamento baixado!' })
}

const limpar = () => {
  nomeProjeto.value = 'Meu Projeto'
  desconto.value = 0
  impostos.value = 15
  margem.value = 30
  observacoes.value = ''
  itens.value = [
    { descricao: 'Item 1', quantidade: 1, valorUnitario: 100 },
    { descricao: 'Item 2', quantidade: 2, valorUnitario: 50 }
  ]
  resultado.value = null
}
</script>
