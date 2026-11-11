<template>
  <ToolShell
    title="Calculadora de Porcentagem"
    description="Calcule porcentagens de múltiplas formas: valor, aumento, redução e comparação entre valores."
    icon="fa-percent"
    icon-gradient="from-cyan-500 to-teal-700"
    orb-color="cyan"
    :quick-tips="['4 modos de cálculo', 'Resultado imediato', 'Histórico de operações']"
    :tips="toolTips"
    :examples="[
      { title: '10% de desconto',       desc: '10% de R$ 350',           result: 'R$ 35 de desconto → R$ 315' },
      { title: 'Qual % representa?',    desc: '45 é qual % de 300?',      result: '15%' },
      { title: 'Variação de preço',     desc: 'De R$ 80 para R$ 92',      result: 'Aumento de 15%' },
    ]"
  >
    <!-- Abas de modo -->
    <div class="tool-section mb-4">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          v-for="m in modos"
          :key="m.id"
          :class="[
            'p-2.5 rounded-xl text-xs font-semibold border transition-all text-center',
            modo === m.id
              ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border-gray-200 dark:border-slate-600 hover:border-primary-400'
          ]"
          @click="modo = (m.id as typeof modo.value); calcular()"
        >
          <i :class="['fas', m.icon, 'block mb-1', modo === m.id ? 'text-white' : 'text-primary-500']"></i>
          {{ m.label }}
        </button>
      </div>
    </div>

    <div class="tool-body">
      <div class="space-y-3">
        <!-- Modo 1: X% de Y -->
        <template v-if="modo === 'valor'">
          <p class="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-3">
            Calcular: <em>Qual é <strong class="text-primary-600">X%</strong> de <strong class="text-primary-600">Y</strong>?</em>
          </p>
          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="a" label="Porcentagem (%)" type="number" icon="fa-percent" placeholder="15" @input="calcular" />
            <BaseInput v-model="b" label="Valor base"      type="number" icon="fa-coins"   placeholder="200" @input="calcular" />
          </div>
        </template>

        <!-- Modo 2: X é qual % de Y -->
        <template v-if="modo === 'qual'">
          <p class="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-3">
            Calcular: <em><strong class="text-primary-600">X</strong> é qual porcentagem de <strong class="text-primary-600">Y</strong>?</em>
          </p>
          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="a" label="Valor parcial (X)" type="number" icon="fa-hashtag"  placeholder="30" @input="calcular" />
            <BaseInput v-model="b" label="Valor total (Y)"   type="number" icon="fa-chart-pie" placeholder="200" @input="calcular" />
          </div>
        </template>

        <!-- Modo 3: Variação % -->
        <template v-if="modo === 'variacao'">
          <p class="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-3">
            Calcular: <em>Variação percentual de <strong class="text-primary-600">A</strong> para <strong class="text-primary-600">B</strong></em>
          </p>
          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="a" label="Valor inicial" type="number" icon="fa-play"   placeholder="100" @input="calcular" />
            <BaseInput v-model="b" label="Valor final"   type="number" icon="fa-flag"   placeholder="115" @input="calcular" />
          </div>
        </template>

        <!-- Modo 4: Valor original -->
        <template v-if="modo === 'original'">
          <p class="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-3">
            Calcular: <em>Valor original antes de um <strong class="text-primary-600">X%</strong> de desconto/acréscimo</em>
          </p>
          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="a" label="Valor atual (após %)" type="number" icon="fa-tag"    placeholder="85" @input="calcular" />
            <BaseInput v-model="b" label="Porcentagem aplicada (%)" type="number" icon="fa-percent" placeholder="15" @input="calcular"
              hint="Negativo = desconto, positivo = acréscimo" />
          </div>
        </template>
      </div>
    </div>

    <!-- Resultado -->
    <Transition name="fade-in-up">
      <div v-if="res !== null" class="mt-4 tool-result-info text-center">
        <p class="text-xs text-blue-600 dark:text-blue-300 mb-2">{{ resLabel }}</p>
        <p class="text-5xl font-black text-blue-700 dark:text-blue-300">{{ resFormatado }}</p>
        <p v-if="resExtra" class="text-sm text-blue-500 dark:text-blue-400 mt-1">{{ resExtra }}</p>

        <!-- Mini histórico -->
        <div class="flex flex-wrap justify-center gap-2 mt-4">
          <span v-for="h in historico.slice(-5).reverse()" :key="h"
            class="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-mono">
            {{ h }}
          </span>
        </div>
      </div>
    </Transition>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const modo = ref<'valor' | 'qual' | 'variacao' | 'original'>('valor')
const a = ref<number | ''>(15)
const b = ref<number | ''>(200)

const toolTips = [
  { text: 'X% de Y: Qual é 15% de R$ 200? Resultado: R$ 30' },
  { text: 'X é qual % de Y: 30 é qual % de 200? Resultado: 15%' },
  { text: 'Aumento/Reducao: De 100 para 115, aumento de 15%', type: 'info' as const },
]

const modos = [
  { id: 'valor',    label: 'X% de Y',    icon: 'fa-percent'    },
  { id: 'qual',     label: 'X é % de Y', icon: 'fa-question'   },
  { id: 'variacao', label: 'Variação %', icon: 'fa-arrows-up-down' },
  { id: 'original', label: 'Original',   icon: 'fa-rotate-left'},
]

const res      = ref<number | null>(null)
const resLabel = ref('')
const resExtra = ref('')
const historico = ref<string[]>([])

const resFormatado = computed(() => {
  if (res.value === null) return ''
  const v = res.value
  if (modo.value === 'qual' || modo.value === 'variacao') return `${v.toFixed(2)}%`
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
})

function calcular() {
  const na = Number(a.value)
  const nb = Number(b.value)
  if (!na && na !== 0) { res.value = null; return }

  if (modo.value === 'valor') {
    if (!nb) { res.value = null; return }
    res.value = (na / 100) * nb
    resLabel.value = `${na}% de ${nb} =`
    resExtra.value = `Resto: ${(nb - res.value).toLocaleString('pt-BR', {minimumFractionDigits:2})}`
    historico.value.push(`${na}% de ${nb} = ${res.value.toFixed(2)}`)
  }
  else if (modo.value === 'qual') {
    if (!nb) { res.value = null; return }
    res.value = (na / nb) * 100
    resLabel.value = `${na} representa`
    resExtra.value = `de um total de ${nb}`
    historico.value.push(`${na}/${nb} = ${res.value.toFixed(2)}%`)
  }
  else if (modo.value === 'variacao') {
    if (!nb || !na) { res.value = null; return }
    res.value = ((nb - na) / na) * 100
    resLabel.value = res.value >= 0 ? 'Aumento de' : 'Redução de'
    resExtra.value = `De ${na} → ${nb} (Δ ${(nb - na >= 0 ? '+' : '')}${(nb-na).toLocaleString('pt-BR',{minimumFractionDigits:2})})`
    historico.value.push(`${na}→${nb}: ${res.value >= 0 ? '+' : ''}${res.value.toFixed(2)}%`)
  }
  else if (modo.value === 'original') {
    if (!nb) { res.value = null; return }
    res.value = na / (1 + nb / 100)
    resLabel.value = `Valor original antes do ${nb > 0 ? 'acréscimo' : 'desconto'} de ${Math.abs(nb)}%:`
    resExtra.value = `Diferença aplicada: ${(na - res.value).toLocaleString('pt-BR',{minimumFractionDigits:2})}`
    historico.value.push(`Original de ${na} (${nb}%): ${res.value.toFixed(2)}`)
  }

  if (historico.value.length > 10) historico.value.shift()
}

calcular()
</script>
