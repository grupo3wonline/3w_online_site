<template>
  <ToolShell
    title="Calculadora de Orçamento Pessoal"
    description="Monte orçamentos profissionais com itens, margens, impostos e exportação."
    icon="fa-wallet"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['Itens ilimitados', 'Desconto + margem', 'Exportar TXT']"
    :tips="[
      { title: 'Contingência', text: 'Adicione 10–20% de margem para imprevistos e negociações.', type: 'warning' },
      { title: 'Custos indiretos', text: 'Inclua despesas ocultas: horas extras, deslocamento e ferramentas.' },
      { title: 'Impostos', text: 'Para serviços: ISS (2–5%). Para produtos: ICMS varia por estado.', type: 'info' },
    ]"
    :examples="[
      { title: 'Projeto web simples', desc: '3 itens totalizando R$ 2.000 + 30% margem + 10% impostos', result: 'Total: R$ 2.860,00' },
      { title: 'Orçamento com desconto', desc: 'Subtotal R$ 5.000 − 10% desconto + 20% margem + 12% impostos', result: 'Total: R$ 6.048,00' },
      { title: 'Serviço mensal', desc: '1 item R$ 3.000 + 25% margem + 6% ISS', result: 'Total: R$ 3.975,00' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <BaseInput
              v-model="nomeProjeto"
              label="Nome do Projeto"
              type="text"
              icon="fa-project-diagram"
              placeholder="Meu Projeto"
              tooltip="Dê um nome descritivo ao orçamento para fácil identificação."
            />

            <!-- Itens -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-list mr-1.5 text-teal-500"></i>
                Itens do Orçamento
              </label>
              <div class="space-y-2 mt-1.5">
                <div v-for="(item, index) in itens" :key="index" class="flex gap-2 items-center">
                  <input
                    v-model="item.descricao"
                    type="text"
                    placeholder="Descrição do item"
                    class="input-aurora flex-1 min-w-0 text-sm"
                  />
                  <input
                    v-model="item.quantidade"
                    type="number"
                    min="1"
                    placeholder="Qtd"
                    class="input-aurora w-16 text-sm"
                  />
                  <input
                    v-model="item.valorUnitario"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="R$"
                    class="input-aurora w-24 text-sm"
                  />
                  <button
                    @click="removerItem(index)"
                    class="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex-shrink-0"
                    title="Remover item"
                  >
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
              <button
                @click="adicionarItem"
                class="mt-2 w-full py-2.5 border-2 border-dashed border-teal-300 dark:border-teal-700 rounded-xl text-teal-600 dark:text-teal-400 hover:border-teal-500 hover:bg-teal-50/50 dark:hover:bg-teal-900/10 transition-all text-sm font-medium"
              >
                <i class="fas fa-plus mr-2"></i>Adicionar Item
              </button>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <BaseInput
                v-model="desconto"
                label="Desconto (%)"
                type="number"
                :min="0"
                :max="100"
                icon="fa-percent"
                tooltip="Percentual de desconto sobre o subtotal dos itens."
              />
              <BaseInput
                v-model="impostos"
                label="Impostos (%)"
                type="number"
                :min="0"
                :max="100"
                icon="fa-receipt"
                tooltip="Alíquota de impostos (ISS 2–5%, ICMS varia por estado)."
              />
              <BaseInput
                v-model="margem"
                label="Margem (%)"
                type="number"
                :min="0"
                :max="100"
                icon="fa-chart-line"
                tooltip="Lucro desejado sobre os custos totais após desconto."
              />
            </div>

            <div>
              <label class="input-aurora-label">
                <i class="fas fa-comment-alt mr-1.5 text-teal-500"></i>
                Observações
              </label>
              <textarea
                v-model="observacoes"
                rows="2"
                placeholder="Informações adicionais sobre o orçamento..."
                class="input-aurora w-full mt-1 resize-y"
              ></textarea>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular
            </BaseButton>
            <BaseButton variant="outline" icon="fa-download" @click="baixarPDF" :disabled="!resultado">
              Exportar
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <!-- Destaque principal -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Valor Total do Orçamento</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.total }}</p>
              <p class="text-teal-300 text-sm font-semibold">
                <i class="fas fa-box-open mr-1"></i>
                {{ resultado.itensCount }} itens · {{ resultado.quantidadeTotal }} unidades
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">R$ {{ resultado.subtotal }}</div>
                <div class="metric-glass-label">Subtotal</div>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-500 dark:text-red-400">- R$ {{ resultado.valorDesconto }}</div>
                <div class="metric-glass-label">Desconto</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">+ R$ {{ resultado.valorMargem }}</div>
                <div class="metric-glass-label">Margem</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">+ R$ {{ resultado.valorImpostos }}</div>
                <div class="metric-glass-label">Impostos</div>
              </div>
            </div>

            <!-- Tabela de itens -->
            <div class="glass-panel p-4 overflow-x-auto">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-teal-500"></i>
                Detalhamento dos Itens
              </h4>
              <table class="w-full text-xs">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-slate-700">
                    <th class="text-left pb-2 text-gray-500 dark:text-slate-400 font-medium">Item</th>
                    <th class="text-center pb-2 text-gray-500 dark:text-slate-400 font-medium">Qtd</th>
                    <th class="text-right pb-2 text-gray-500 dark:text-slate-400 font-medium">Unit.</th>
                    <th class="text-right pb-2 text-gray-500 dark:text-slate-400 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in resultado.itensDetalhados"
                    :key="i"
                    class="border-b border-gray-100 dark:border-slate-800 last:border-0"
                  >
                    <td class="py-1.5 text-gray-700 dark:text-slate-300">{{ item.descricao }}</td>
                    <td class="py-1.5 text-center text-gray-600 dark:text-slate-400">{{ item.quantidade }}</td>
                    <td class="py-1.5 text-right text-gray-600 dark:text-slate-400">R$ {{ item.valorUnitario }}</td>
                    <td class="py-1.5 text-right font-bold text-gray-900 dark:text-white">R$ {{ item.subtotal }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-info-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Ticket médio por item: <strong>R$ {{ resultado.ticketMedio }}</strong> ·
                Margem real sobre custo: <strong>{{ resultado.margemReal }}%</strong>
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-wallet text-4xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Adicione itens e clique em <strong>Calcular</strong></p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const nomeProjeto = ref('Meu Projeto')
const desconto    = ref(0)
const impostos    = ref(15)
const margem      = ref(30)
const observacoes = ref('')

const itens = ref([
  { descricao: 'Item 1', quantidade: 1, valorUnitario: 100 },
  { descricao: 'Item 2', quantidade: 2, valorUnitario: 50 },
])

const resultado = ref(null)

const adicionarItem = () => {
  itens.value.push({ descricao: `Item ${itens.value.length + 1}`, quantidade: 1, valorUnitario: 0 })
}

const removerItem = (index) => {
  if (itens.value.length > 1) {
    itens.value.splice(index, 1)
  } else {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'Mantenha pelo menos 1 item', confirmButtonColor: '#2563eb' })
  }
}

const calcular = () => {
  if (itens.value.some(i => !i.descricao || i.quantidade <= 0 || i.valorUnitario <= 0)) {
    Swal.fire({ icon: 'error', title: 'Dados incompletos', text: 'Preencha todos os itens corretamente.', confirmButtonColor: '#2563eb' })
    return
  }

  const itensDetalhados = itens.value.map(item => {
    const sub = Number(item.quantidade) * Number(item.valorUnitario)
    return {
      descricao: item.descricao,
      quantidade: item.quantidade,
      valorUnitario: Number(item.valorUnitario).toFixed(2),
      subtotal: sub.toFixed(2),
    }
  })

  const subtotal = itens.value.reduce((acc, i) => acc + Number(i.quantidade) * Number(i.valorUnitario), 0)
  const valorDesconto     = subtotal * (Number(desconto.value) / 100)
  const subtotalDesconto  = subtotal - valorDesconto
  const valorMargem       = subtotalDesconto * (Number(margem.value) / 100)
  const subtotalMargem    = subtotalDesconto + valorMargem
  const valorImpostos     = subtotalMargem * (Number(impostos.value) / 100)
  const total             = subtotalMargem + valorImpostos

  const quantidadeTotal = itens.value.reduce((acc, i) => acc + Number(i.quantidade), 0)
  const ticketMedio     = subtotal / itens.value.length
  const margemReal      = subtotal > 0 ? ((total - subtotal) / subtotal * 100).toFixed(2) : '0'

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
    itensDetalhados,
  }
}

const baixarPDF = () => {
  if (!resultado.value) return
  let conteudo = `ORÇAMENTO: ${nomeProjeto.value}\n\nITENS:\n`
  resultado.value.itensDetalhados.forEach(i => {
    conteudo += `${i.descricao} - ${i.quantidade}x R$ ${i.valorUnitario} = R$ ${i.subtotal}\n`
  })
  conteudo += `\nSUBTOTAL: R$ ${resultado.value.subtotal}\n`
  conteudo += `DESCONTO (-${desconto.value}%): R$ ${resultado.value.valorDesconto}\n`
  conteudo += `MARGEM (+${margem.value}%): R$ ${resultado.value.valorMargem}\n`
  conteudo += `IMPOSTOS (+${impostos.value}%): R$ ${resultado.value.valorImpostos}\n`
  conteudo += `\nTOTAL: R$ ${resultado.value.total}\n`
  if (observacoes.value) conteudo += `\nOBSERVAÇÕES:\n${observacoes.value}\n`

  const blob = new Blob([conteudo], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `orcamento-${nomeProjeto.value.toLowerCase().replace(/\s+/g, '-')}.txt`
  a.click()
  URL.revokeObjectURL(url)
  Swal.fire({ icon: 'success', title: 'Exportado!', text: 'Orçamento baixado com sucesso.', confirmButtonColor: '#2563eb' })
}

const limpar = () => {
  nomeProjeto.value = 'Meu Projeto'
  desconto.value    = 0
  impostos.value    = 15
  margem.value      = 30
  observacoes.value = ''
  itens.value       = [
    { descricao: 'Item 1', quantidade: 1, valorUnitario: 100 },
    { descricao: 'Item 2', quantidade: 2, valorUnitario: 50 },
  ]
  resultado.value = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
