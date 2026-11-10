<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  calcularProduto,
  fmt,
  type DadosProduto,
  type ResultadoProduto,
} from '@/lib/precificacao'
import { alertaSucesso, alertaAtencao } from '@/lib/alerta'
import { useCarregandoStore } from '@/stores/carregando'

const carregando = useCarregandoStore()

const dados = reactive<DadosProduto>({
  custoMaterial: 0,
  custoOperacional: 0,
  tempoProducao: 0,
  valorHora: 0,
  margemLucro: 20,
  impostos: 10,
})

const resultado = ref<ResultadoProduto | null>(null)

function normalizar(campo: keyof DadosProduto, valor: string) {
  const numero = parseFloat(valor) || 0
  if (numero < 0) return
  dados[campo] = numero
}

async function calcular() {
  if (dados.custoMaterial <= 0 && dados.custoOperacional <= 0 && dados.tempoProducao <= 0) {
    alertaAtencao('Preencha pelo menos um campo de custo para calcular.')
    return
  }

  const res = await carregando.comCarregamento(async () => {
    // Pequeno atraso para o overlay ser percebido em cálculos instantâneos
    await new Promise((r) => setTimeout(r, 350))
    return calcularProduto({ ...dados })
  }, 'Calculando o preço ideal...')

  resultado.value = res
  alertaSucesso(
    'Cálculo Realizado!',
    `<p class="txt-suave">Preço sugerido: <strong style="color:#6366f1; font-size:20px;">R$ ${fmt(res.precoFinal)}</strong></p>`
  )
}

function limpar() {
  dados.custoMaterial = 0
  dados.custoOperacional = 0
  dados.tempoProducao = 0
  dados.valorHora = 0
  dados.margemLucro = 20
  dados.impostos = 10
  resultado.value = null
}
</script>

<template>
  <form
    class="space-y-6"
    autocomplete="off"
    @submit.prevent="calcular"
  >
    <!-- Formulário -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div>
          <label
            for="custoMaterial"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:boxes-stacked"
              class="text-primary-500"
            />
            Custo de Matéria-Prima (R$)
            <span
              class="tooltip-custom"
              tabindex="0"
              data-tooltip="Custo total dos materiais utilizados na fabricação do produto"
            >
              <Icon
                icon="fa6-solid:circle-question"
                class="txt-fraco text-xs"
              />
            </span>
          </label>
          <input
            id="custoMaterial"
            :value="dados.custoMaterial || ''"
            type="number"
            min="0"
            step="0.01"
            inputmode="decimal"
            placeholder="Ex: 50.00"
            class="input-field"
            autocomplete="off"
            @input="normalizar('custoMaterial', ($event.target as HTMLInputElement).value)"
          >
        </div>

        <div>
          <label
            for="custoOperacional"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:gears"
              class="text-accent-500"
            />
            Custos Operacionais (R$)
            <span
              class="tooltip-custom"
              tabindex="0"
              data-tooltip="Embalagem, transporte, energia, aluguel, etc."
            >
              <Icon
                icon="fa6-solid:circle-question"
                class="txt-fraco text-xs"
              />
            </span>
          </label>
          <input
            id="custoOperacional"
            :value="dados.custoOperacional || ''"
            type="number"
            min="0"
            step="0.01"
            inputmode="decimal"
            placeholder="Ex: 15.00"
            class="input-field"
            autocomplete="off"
            @input="normalizar('custoOperacional', ($event.target as HTMLInputElement).value)"
          >
          <p class="text-xs txt-fraco mt-1">
            Embalagem, transporte, energia, etc.
          </p>
        </div>

        <div>
          <label
            for="tempoProducao"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:clock"
              class="text-primary-500"
            />
            Tempo de Produção (horas)
            <span
              class="tooltip-custom"
              tabindex="0"
              data-tooltip="Tempo total em horas para produzir uma unidade do produto"
            >
              <Icon
                icon="fa6-solid:circle-question"
                class="txt-fraco text-xs"
              />
            </span>
          </label>
          <input
            id="tempoProducao"
            :value="dados.tempoProducao || ''"
            type="number"
            min="0"
            step="0.5"
            inputmode="decimal"
            placeholder="Ex: 2.5"
            class="input-field"
            autocomplete="off"
            @input="normalizar('tempoProducao', ($event.target as HTMLInputElement).value)"
          >
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label
            for="valorHoraProduto"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:money-bill-wave"
              class="text-accent-500"
            />
            Valor da Hora de Trabalho (R$)
            <span
              class="tooltip-custom"
              tabindex="0"
              data-tooltip="Quanto custa cada hora do seu trabalho ou de funcionários"
            >
              <Icon
                icon="fa6-solid:circle-question"
                class="txt-fraco text-xs"
              />
            </span>
          </label>
          <input
            id="valorHoraProduto"
            :value="dados.valorHora || ''"
            type="number"
            min="0"
            step="0.01"
            inputmode="decimal"
            placeholder="Ex: 30.00"
            class="input-field"
            autocomplete="off"
            @input="normalizar('valorHora', ($event.target as HTMLInputElement).value)"
          >
        </div>

        <div>
          <label
            for="margemLucroProduto"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:chart-line"
              class="text-primary-500"
            />
            Margem de Lucro (%)
            <span
              class="tooltip-custom"
              tabindex="0"
              data-tooltip="Percentual de lucro desejado sobre o custo total"
            >
              <Icon
                icon="fa6-solid:circle-question"
                class="txt-fraco text-xs"
              />
            </span>
          </label>
          <input
            id="margemLucroProduto"
            :value="dados.margemLucro || ''"
            type="number"
            min="0"
            max="200"
            inputmode="decimal"
            placeholder="Ex: 20"
            class="input-field"
            autocomplete="off"
            @input="normalizar('margemLucro', ($event.target as HTMLInputElement).value)"
          >
        </div>

        <div>
          <label
            for="impostosProduto"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:receipt"
              class="text-accent-500"
            />
            Impostos / Taxas (%)
            <span
              class="tooltip-custom"
              tabindex="0"
              data-tooltip="Percentual de impostos e taxas sobre o preço de venda"
            >
              <Icon
                icon="fa6-solid:circle-question"
                class="txt-fraco text-xs"
              />
            </span>
          </label>
          <input
            id="impostosProduto"
            :value="dados.impostos || ''"
            type="number"
            min="0"
            max="100"
            inputmode="decimal"
            placeholder="Ex: 10"
            class="input-field"
            autocomplete="off"
            @input="normalizar('impostos', ($event.target as HTMLInputElement).value)"
          >
        </div>
      </div>
    </div>

    <!-- Botões -->
    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        type="submit"
        class="btn-primary px-8 py-3"
      >
        <Icon icon="fa6-solid:calculator" />
        Calcular Preço do Produto
      </button>
      <button
        type="button"
        class="btn-outline px-6 py-3"
        @click="limpar"
      >
        <Icon icon="fa6-solid:rotate-right" />
        Limpar
      </button>
    </div>

    <!-- Resultados -->
    <div
      v-if="resultado"
      class="space-y-6 mt-4 animate-fade-in"
    >
      <div class="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="glass-card p-6 text-center">
          <div class="flex items-center justify-center gap-2 mb-2">
            <Icon
              icon="fa6-solid:coins"
              class="text-primary-500"
            />
            <h3 class="text-sm font-medium txt-suave">
              Custo Total
            </h3>
          </div>
          <p class="text-2xl font-bold txt-forte">
            R$ {{ fmt(resultado.custoTotal) }}
          </p>
          <p class="text-xs txt-fraco mt-1">
            Material + Operação + Trabalho
          </p>
        </div>

        <div class="glass-card p-6 text-center">
          <div class="flex items-center justify-center gap-2 mb-2">
            <Icon
              icon="fa6-solid:arrow-trend-up"
              class="text-accent-500"
            />
            <h3 class="text-sm font-medium txt-suave">
              Lucro Estimado
            </h3>
          </div>
          <p class="text-2xl font-bold text-accent-500">
            R$ {{ fmt(resultado.lucro) }}
          </p>
          <p class="text-xs txt-fraco mt-1">
            {{ dados.margemLucro }}% de margem
          </p>
        </div>

        <div
          class="rounded-3xl p-6 text-center bg-gradient-to-br from-primary-500 to-primary-600 shadow-glow"
        >
          <div class="flex items-center justify-center gap-2 mb-2">
            <Icon
              icon="fa6-solid:tag"
              class="text-white/90"
            />
            <h3 class="text-sm font-medium text-white/80">
              Preço Sugerido
            </h3>
          </div>
          <p class="text-3xl font-bold text-white">
            R$ {{ fmt(resultado.precoFinal) }}
          </p>
          <p class="text-xs text-white/70 mt-1">
            Preço final com impostos
          </p>
        </div>
      </div>

      <!-- Detalhamento -->
      <div class="glass-card p-6">
        <h3 class="text-lg font-semibold txt-forte mb-4 flex items-center gap-2">
          <Icon
            icon="fa6-solid:list-check"
            class="text-primary-500"
          />
          Detalhamento dos Custos
        </h3>
        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span class="txt-suave">Matéria-Prima:</span>
            <span class="txt-forte font-medium">R$ {{ fmt(dados.custoMaterial) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="txt-suave">Custos Operacionais:</span>
            <span class="txt-forte font-medium">R$ {{ fmt(dados.custoOperacional) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="txt-suave">Mão de Obra ({{ dados.tempoProducao }}h × R$ {{ fmt(dados.valorHora) }}):</span>
            <span class="txt-forte font-medium">R$ {{ fmt(resultado.custoMaoObra) }}</span>
          </div>
          <div
            class="h-px"
            style="background: var(--glass-borda)"
          />
          <div class="flex justify-between text-sm font-medium">
            <span class="txt-forte">Custo Total:</span>
            <span class="txt-forte">R$ {{ fmt(resultado.custoTotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-accent-500">Lucro ({{ dados.margemLucro }}%):</span>
            <span class="text-accent-500 font-medium">R$ {{ fmt(resultado.lucro) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="txt-suave">Impostos ({{ dados.impostos }}%):</span>
            <span class="txt-forte font-medium">R$ {{ fmt(resultado.impostoValor) }}</span>
          </div>
          <div
            class="h-px"
            style="background: var(--glass-borda)"
          />
          <div class="flex justify-between text-lg font-bold">
            <span class="text-primary-500">Preço Final:</span>
            <span class="text-primary-500">R$ {{ fmt(resultado.precoFinal) }}</span>
          </div>
        </div>
      </div>

      <!-- Comparativo -->
      <div class="glass-card p-6">
        <h3 class="text-lg font-semibold txt-forte mb-2 flex items-center gap-2">
          <Icon
            icon="fa6-solid:scale-balanced"
            class="text-accent-500"
          />
          Comparativo de Margens de Lucro
        </h3>
        <p class="text-xs txt-fraco mb-4">
          Veja como diferentes margens afetam o preço final
        </p>
        <div class="space-y-2">
          <div
            v-for="comp in resultado.comparativos"
            :key="comp.margem"
            class="flex justify-between items-center p-3 rounded-xl text-sm transition-all"
            :class="
              comp.margem === dados.margemLucro
                ? 'bg-primary-500/15 border border-primary-500/30'
                : 'hover:bg-primary-500/5'
            "
            :style="comp.margem !== dados.margemLucro ? 'background: var(--glass-bg)' : ''"
          >
            <span class="font-medium txt-forte flex items-center gap-2">
              <Icon
                v-if="comp.margem === dados.margemLucro"
                icon="fa6-solid:star"
                class="text-primary-500 text-xs"
              />
              {{ comp.margem }}% de margem
            </span>
            <div class="text-right">
              <div class="font-bold txt-forte">
                R$ {{ fmt(comp.precoFinal) }}
              </div>
              <div class="text-xs txt-fraco">
                Lucro: R$ {{ fmt(comp.lucro) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recomendações -->
      <div class="glass-card p-6 border-accent-500/20">
        <h3 class="text-lg font-semibold text-accent-500 mb-4 flex items-center gap-2">
          <Icon icon="fa6-solid:lightbulb" />
          Recomendações
        </h3>
        <div class="space-y-2 text-sm txt-suave">
          <p>
            • <strong class="txt-forte">Preço mínimo:</strong> R$ {{ fmt(resultado.precoMinimo) }}
            <span class="txt-fraco">(10% de margem)</span>
          </p>
          <p>
            • <strong class="txt-forte">Preço ideal:</strong> R$ {{ fmt(resultado.precoFinal) }}
            <span class="txt-fraco">({{ dados.margemLucro }}% de margem)</span>
          </p>
          <p>
            • <strong class="txt-forte">Preço premium:</strong> R$ {{ fmt(resultado.precoPremium) }}
            <span class="txt-fraco">(40% de margem)</span>
          </p>
          <p class="text-xs txt-fraco mt-3">
            Considere o posicionamento do seu produto no mercado e o valor percebido pelo cliente.
          </p>
        </div>
      </div>
    </div>
  </form>
</template>
