<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type TabKey = 'produto' | 'servico'
type Complexidade = 'simples' | 'medio' | 'avancado'
type Urgencia = 'normal' | 'urgente' | 'express'

interface DadosProduto { custoMaterial: number; custoOperacional: number; tempoProducao: number; valorHora: number; margemLucro: number; impostos: number }
interface ResultadoProduto { custoTotal: number; custoMaoObra: number; lucro: number; impostoValor: number; precoFinal: number; precoMinimo: number; precoPremium: number }

interface DadosServico { horasEstimadas: number; valorHora: number; custosOperacionais: number; complexidade: Complexidade; urgencia: Urgencia; margemLucro: number }
interface ResultadoServico { custoBase: number; ajusteComplexidade: number; ajusteUrgencia: number; lucro: number; precoFinal: number; porHora: number }

const COMPLEXIDADE_MULT: Record<Complexidade, number> = { simples: 1, medio: 1.3, avancado: 1.6 }
const URGENCIA_MULT: Record<Urgencia, number> = { normal: 1, urgente: 1.25, express: 1.5 }

const tab = ref<TabKey>('produto')

const produto = reactive<DadosProduto>({ custoMaterial: 0, custoOperacional: 0, tempoProducao: 0, valorHora: 0, margemLucro: 20, impostos: 10 })
const resultadoProduto = ref<ResultadoProduto | null>(null)

const servico = reactive<DadosServico>({ horasEstimadas: 0, valorHora: 0, custosOperacionais: 0, complexidade: 'simples', urgencia: 'normal', margemLucro: 25 })
const resultadoServico = ref<ResultadoServico | null>(null)

function calcularProduto() {
  if (produto.custoMaterial <= 0 && produto.custoOperacional <= 0 && produto.tempoProducao <= 0) {
    Swal.fire({ icon: 'warning', title: 'Preencha pelo menos um campo de custo', confirmButtonColor: '#6366f1' }); return
  }
  const custoMaoObra = produto.tempoProducao * produto.valorHora
  const custoTotal = produto.custoMaterial + produto.custoOperacional + custoMaoObra
  const lucro = custoTotal * produto.margemLucro / 100
  const precoAntesImposto = custoTotal + lucro
  const impostoValor = precoAntesImposto * produto.impostos / 100
  const precoFinal = precoAntesImposto + impostoValor
  resultadoProduto.value = {
    custoTotal, custoMaoObra, lucro, impostoValor, precoFinal,
    precoMinimo: custoTotal * 1.1 * (1 + produto.impostos / 100),
    precoPremium: custoTotal * 1.4 * (1 + produto.impostos / 100),
  }
  Swal.fire({ icon: 'success', title: 'Preço calculado!', html: `Preço sugerido: <strong>${fmt(precoFinal)}</strong>`, timer: 1800, showConfirmButton: false })
}

function calcularServico() {
  if (!servico.horasEstimadas || !servico.valorHora) {
    Swal.fire({ icon: 'warning', title: 'Informe horas e valor/hora', confirmButtonColor: '#6366f1' }); return
  }
  const custoBase = servico.horasEstimadas * servico.valorHora + servico.custosOperacionais
  const ajusteComplexidade = custoBase * (COMPLEXIDADE_MULT[servico.complexidade] - 1)
  const valorAposComplexidade = custoBase + ajusteComplexidade
  const ajusteUrgencia = valorAposComplexidade * (URGENCIA_MULT[servico.urgencia] - 1)
  const valorAntesLucro = valorAposComplexidade + ajusteUrgencia
  const lucro = valorAntesLucro * servico.margemLucro / 100
  const precoFinal = valorAntesLucro + lucro
  resultadoServico.value = {
    custoBase, ajusteComplexidade, ajusteUrgencia, lucro, precoFinal,
    porHora: servico.horasEstimadas > 0 ? precoFinal / servico.horasEstimadas : 0,
  }
  Swal.fire({ icon: 'success', title: 'Serviço precificado!', html: `Valor do serviço: <strong>${fmt(precoFinal)}</strong>`, timer: 1800, showConfirmButton: false })
}

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:store-outline" class="text-indigo-400 w-7 h-7" />
        Calculadora de Produto &amp; Serviço
      </h1>
      <p class="text-blue-200 text-sm">Precifique produtos e serviços considerando custos, complexidade e urgência</p>
    </div>

    <!-- Tabs -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-1 grid grid-cols-2 gap-1">
      <button v-for="t in [{ key: 'produto', label: 'Produto', icon: 'mdi:cube-outline' }, { key: 'servico', label: 'Serviço', icon: 'mdi:wrench-outline' }]"
        :key="t.key" @click="tab = t.key as TabKey"
        :class="['flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all', tab === t.key ? 'bg-indigo-600 text-white' : 'text-blue-200 hover:bg-white/5']">
        <Icon :icon="t.icon" class="w-4 h-4" /> {{ t.label }}
      </button>
    </div>

    <!-- PRODUTO -->
    <div v-show="tab === 'produto'" class="grid lg:grid-cols-2 gap-6">
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <h2 class="text-white font-semibold text-sm">Dados do Produto</h2>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="f in [
            { key: 'custoMaterial', label: 'Custo Material (R$)' }, { key: 'custoOperacional', label: 'Custo Operacional (R$)' },
            { key: 'tempoProducao', label: 'Tempo Produção (h)' }, { key: 'valorHora', label: 'Valor/Hora (R$)' },
            { key: 'margemLucro', label: 'Margem (%)' }, { key: 'impostos', label: 'Impostos (%)' },
          ]" :key="f.key">
            <label class="text-blue-200 text-xs font-medium block mb-1">{{ f.label }}</label>
            <input v-model.number="(produto as any)[f.key]" type="number" min="0" step="0.01" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
          </div>
        </div>
        <button @click="calcularProduto" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
          <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular Preço do Produto
        </button>
      </div>
      <div v-if="resultadoProduto" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <div class="bg-gradient-to-br from-indigo-700 to-purple-700 rounded-xl p-4 text-center">
          <div class="text-white/80 text-xs mb-1">Preço Sugerido</div>
          <div class="text-3xl font-black text-white">{{ fmt(resultadoProduto.precoFinal) }}</div>
        </div>
        <div class="space-y-2 text-sm">
          <div v-for="it in [
            { l: 'Custo Total', v: fmt(resultadoProduto.custoTotal) },
            { l: 'Mão de Obra', v: fmt(resultadoProduto.custoMaoObra) },
            { l: 'Lucro', v: fmt(resultadoProduto.lucro) },
            { l: 'Impostos', v: fmt(resultadoProduto.impostoValor) },
          ]" :key="it.l" class="flex justify-between">
            <span class="text-blue-200">{{ it.l }}</span><span class="text-white">{{ it.v }}</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2 border-t border-white/10 pt-2 text-center text-sm">
          <div><div class="text-blue-200 text-xs">Mínimo</div><div class="text-white font-bold">{{ fmt(resultadoProduto.precoMinimo) }}</div></div>
          <div><div class="text-blue-200 text-xs">Premium</div><div class="text-white font-bold">{{ fmt(resultadoProduto.precoPremium) }}</div></div>
        </div>
      </div>
      <div v-else class="bg-[#0f1e3c] border border-white/10 rounded-xl flex items-center justify-center p-10">
        <div class="text-center"><Icon icon="mdi:cube-outline" class="w-12 h-12 text-indigo-400/20 mx-auto mb-2" /><p class="text-blue-200 text-sm">Preencha e calcule</p></div>
      </div>
    </div>

    <!-- SERVIÇO -->
    <div v-show="tab === 'servico'" class="grid lg:grid-cols-2 gap-6">
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <h2 class="text-white font-semibold text-sm">Dados do Serviço</h2>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="f in [
            { key: 'horasEstimadas', label: 'Horas Estimadas' }, { key: 'valorHora', label: 'Valor/Hora (R$)' },
            { key: 'custosOperacionais', label: 'Custos Extras (R$)' }, { key: 'margemLucro', label: 'Margem (%)' },
          ]" :key="f.key">
            <label class="text-blue-200 text-xs font-medium block mb-1">{{ f.label }}</label>
            <input v-model.number="(servico as any)[f.key]" type="number" min="0" step="0.01" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Complexidade</label>
            <select v-model="servico.complexidade" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
              <option value="simples">Simples (1×)</option>
              <option value="medio">Médio (1.3×)</option>
              <option value="avancado">Avançado (1.6×)</option>
            </select>
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Urgência</label>
            <select v-model="servico.urgencia" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
              <option value="normal">Normal (1×)</option>
              <option value="urgente">Urgente (1.25×)</option>
              <option value="express">Express (1.5×)</option>
            </select>
          </div>
        </div>
        <button @click="calcularServico" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
          <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular Preço do Serviço
        </button>
      </div>
      <div v-if="resultadoServico" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <div class="bg-gradient-to-br from-blue-700 to-cyan-700 rounded-xl p-4 text-center">
          <div class="text-white/80 text-xs mb-1">Valor do Serviço</div>
          <div class="text-3xl font-black text-white">{{ fmt(resultadoServico.precoFinal) }}</div>
          <div class="text-white/70 text-xs mt-1">{{ fmt(resultadoServico.porHora) }}/hora</div>
        </div>
        <div class="space-y-2 text-sm">
          <div v-for="it in [
            { l: 'Custo Base', v: fmt(resultadoServico.custoBase) },
            { l: 'Ajuste Complexidade', v: fmt(resultadoServico.ajusteComplexidade) },
            { l: 'Ajuste Urgência', v: fmt(resultadoServico.ajusteUrgencia) },
            { l: 'Lucro', v: fmt(resultadoServico.lucro) },
          ]" :key="it.l" class="flex justify-between">
            <span class="text-blue-200">{{ it.l }}</span><span class="text-white">{{ it.v }}</span>
          </div>
        </div>
      </div>
      <div v-else class="bg-[#0f1e3c] border border-white/10 rounded-xl flex items-center justify-center p-10">
        <div class="text-center"><Icon icon="mdi:wrench-outline" class="w-12 h-12 text-indigo-400/20 mx-auto mb-2" /><p class="text-blue-200 text-sm">Preencha e calcule</p></div>
      </div>
    </div>
  </div>
</template>
