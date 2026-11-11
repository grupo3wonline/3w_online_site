<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

interface Campos { custoFixo: number; custoVariavel: number; margem: number; impostos: number }
interface Resultado { custoTotal: number; lucro: number; impostoValor: number; precoFinal: number; precoMinimo: number; precoPremium: number }

const form = reactive<Campos>({ custoFixo: 0, custoVariavel: 0, margem: 30, impostos: 10 })
const resultado = ref<Resultado | null>(null)

function calcular() {
  if (form.custoFixo <= 0 && form.custoVariavel <= 0) { Swal.fire({ icon: 'warning', title: 'Informe pelo menos um custo', confirmButtonColor: '#8b5cf6' }); return }
  const custoTotal = form.custoFixo + form.custoVariavel
  const lucro = custoTotal * form.margem / 100
  const baseImposto = custoTotal + lucro
  const impostoValor = baseImposto * form.impostos / 100
  const precoFinal = baseImposto + impostoValor
  resultado.value = {
    custoTotal, lucro, impostoValor, precoFinal,
    precoMinimo: custoTotal * 1.1 * (1 + form.impostos / 100),
    precoPremium: custoTotal * 1.4 * (1 + form.impostos / 100),
  }
  Swal.fire({ icon: 'success', title: `Preço sugerido: ${fmt(precoFinal)}`, timer: 1800, showConfirmButton: false })
}

function limpar() { form.custoFixo = 0; form.custoVariavel = 0; form.margem = 30; form.impostos = 10; resultado.value = null }
const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const comparativos = computed(() => {
  const c = form.custoFixo + form.custoVariavel
  return [10, 15, 20, 25, 30, 40].map(m => { const l = c * m / 100; const p = c + l; return { margem: m, lucro: l, preco: p + (p * form.impostos / 100) } })
})
</script>

<template>
  <ToolShell
    title="Calculadora de Preço"
    description="Calcule o preço ideal de venda com base nos custos, margem de lucro e impostos."
    icon="fa-tag"
    icon-gradient="from-violet-500 to-purple-700"
    orb-color="purple"
    :quick-tips="['Markup automático', 'Faixa de preços', 'Comparativo de margens']"
    :tips="[
      { title: 'Custo fixo vs variável', text: 'Custo fixo: aluguel, salários, assinaturas. Custo variável: matéria-prima, comissão, embalagem — varia com cada venda.' },
      { title: 'Margem de lucro', text: 'Para produtos físicos: 20–40%. Para serviços: 30–50%. Para software/digital: 50–80%.' },
      { title: 'Impostos', text: 'Simples Nacional (anexo III): ~6%. Lucro Presumido: ~8–13%. Consulte seu contador para o regime correto.' },
    ]"
    :examples="[
      { title: 'Produto físico', desc: 'Custo fixo R$ 500 + variável R$ 200 | margem 35% | impostos 6%', result: 'Preço sugerido ≈ R$ 963,20' },
      { title: 'Serviço digital', desc: 'Custo total R$ 1.000 | margem 50% | impostos 6%', result: 'Preço sugerido ≈ R$ 1.590' },
      { title: 'Produto premium', desc: 'Custo total R$ 300 | margem 40% | impostos 10%', result: 'Preço premium ≈ R$ 462' },
    ]"
  >
    <div class="grid lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="tool-body !mb-0 space-y-3">
        <BaseInput v-model="form.custoFixo"    label="Custo Fixo (R$)"      type="number" :min="0" step="0.01" icon="fa-building"       tooltip="Aluguel, salários, assinaturas fixas" />
        <BaseInput v-model="form.custoVariavel" label="Custo Variável (R$)"  type="number" :min="0" step="0.01" icon="fa-boxes-stacked"  tooltip="Matéria-prima, comissões, embalagens" />
        <BaseInput v-model="form.margem"        label="Margem de Lucro (%)"  type="number" :min="0" icon="fa-percent"      tooltip="Percentual de lucro desejado (20–40%)" />
        <BaseInput v-model="form.impostos"      label="Impostos (%)"         type="number" :min="0" icon="fa-file-invoice" tooltip="Impostos sobre vendas — consulte seu contador" />
        <div class="flex gap-3">
          <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">Calcular Preço</BaseButton>
          <BaseButton variant="outline" icon="fa-eraser" @click="limpar">Limpar</BaseButton>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-xs text-purple-200 mb-1">Preço Sugerido</p>
              <p class="text-5xl font-black text-white">{{ fmt(resultado.precoFinal) }}</p>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-gray-100 dark:ring-slate-700">
                <div class="metric-glass-value text-sm text-gray-600 dark:text-slate-300">{{ fmt(resultado.custoTotal) }}</div>
                <div class="metric-glass-label">Custo total</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-sm text-emerald-600 dark:text-emerald-400">{{ fmt(resultado.lucro) }}</div>
                <div class="metric-glass-label">Lucro</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-sm text-orange-600 dark:text-orange-400">{{ fmt(resultado.impostoValor) }}</div>
                <div class="metric-glass-label">Impostos</div>
              </div>
            </div>
            <div class="glass-panel p-4">
              <div class="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">Preço mínimo</p>
                  <p class="font-bold text-gray-700 dark:text-slate-200">{{ fmt(resultado.precoMinimo) }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">Preço premium</p>
                  <p class="font-bold text-purple-600 dark:text-purple-400">{{ fmt(resultado.precoPremium) }}</p>
                </div>
              </div>
            </div>
            <div class="glass-panel p-4">
              <h4 class="text-xs font-bold text-gray-700 dark:text-slate-200 mb-2">Comparativo de Margens</h4>
              <div class="space-y-1">
                <div v-for="c in comparativos" :key="c.margem" class="flex justify-between text-xs"
                  :class="c.margem === form.margem ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-gray-500 dark:text-slate-400'">
                  <span>Margem {{ c.margem }}%</span>
                  <span>{{ fmt(c.lucro) }}</span>
                  <span class="font-semibold">{{ fmt(c.preco) }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <div v-if="!resultado" class="glass-panel p-10 text-center text-gray-400 dark:text-slate-500">
          <i class="fas fa-tag text-3xl mb-3 block opacity-30 text-violet-400"></i>
          <p class="text-sm">Preencha os dados e calcule o preço ideal</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all .3s ease; }
.scale-in-enter-from { transform: scale(.97); opacity: 0; }
.scale-in-leave-to  { opacity: 0; }
</style>
