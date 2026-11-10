<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  calcularServico,
  fmt,
  type DadosServico,
  type ResultadoServico,
  type Complexidade,
  type Urgencia,
} from '@/lib/precificacao'
import { alertaSucesso, alertaAtencao } from '@/lib/alerta'
import { useCarregandoStore } from '@/stores/carregando'

const carregando = useCarregandoStore()

const dados = reactive<DadosServico>({
  horasEstimadas: 0,
  valorHora: 0,
  custosOperacionais: 0,
  complexidade: 'medio',
  urgencia: 'normal',
  margemLucro: 25,
})

const resultado = ref<ResultadoServico | null>(null)

function normalizar(campo: 'horasEstimadas' | 'valorHora' | 'custosOperacionais' | 'margemLucro', valor: string) {
  const numero = parseFloat(valor) || 0
  if (numero < 0) return
  dados[campo] = numero
}

const descComplexidade: Record<Complexidade, string> = {
  simples: 'Tarefas rotineiras, baixa especialização',
  medio: 'Requer conhecimento técnico específico',
  avancado: 'Alta especialização, solução customizada',
}

const descUrgencia: Record<Urgencia, string> = {
  normal: 'Prazo padrão de entrega',
  urgente: 'Entrega em prazo reduzido (+20%)',
  express: 'Entrega imediata/emergencial (+50%)',
}

async function calcular() {
  if (dados.horasEstimadas <= 0 || dados.valorHora <= 0) {
    alertaAtencao('Preencha as horas estimadas e o valor por hora.')
    return
  }

  const res = await carregando.comCarregamento(async () => {
    await new Promise((r) => setTimeout(r, 350))
    return calcularServico({ ...dados })
  }, 'Calculando o preço do serviço...')

  resultado.value = res
  alertaSucesso(
    'Cálculo Realizado!',
    `<p class="txt-suave">Preço sugerido: <strong style="color:#10b981; font-size:20px;">R$ ${fmt(res.precoFinal)}</strong></p>`
  )
}

function limpar() {
  dados.horasEstimadas = 0
  dados.valorHora = 0
  dados.custosOperacionais = 0
  dados.complexidade = 'medio'
  dados.urgencia = 'normal'
  dados.margemLucro = 25
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
            for="horasEstimadas"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:hourglass-half"
              class="text-accent-500"
            />
            Tempo Estimado (horas)
            <span
              class="tooltip-custom"
              tabindex="0"
              data-tooltip="Total de horas estimadas para concluir o serviço"
            >
              <Icon
                icon="fa6-solid:circle-question"
                class="txt-fraco text-xs"
              />
            </span>
          </label>
          <input
            id="horasEstimadas"
            :value="dados.horasEstimadas || ''"
            type="number"
            min="0"
            step="0.5"
            inputmode="decimal"
            placeholder="Ex: 40"
            class="input-field"
            autocomplete="off"
            @input="normalizar('horasEstimadas', ($event.target as HTMLInputElement).value)"
          >
        </div>

        <div>
          <label
            for="valorHoraServico"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:money-bill-wave"
              class="text-primary-500"
            />
            Valor Base por Hora (R$)
            <span
              class="tooltip-custom"
              tabindex="0"
              data-tooltip="Seu valor/hora base sem ajustes de complexidade ou urgência"
            >
              <Icon
                icon="fa6-solid:circle-question"
                class="txt-fraco text-xs"
              />
            </span>
          </label>
          <input
            id="valorHoraServico"
            :value="dados.valorHora || ''"
            type="number"
            min="0"
            step="0.01"
            inputmode="decimal"
            placeholder="Ex: 50.00"
            class="input-field"
            autocomplete="off"
            @input="normalizar('valorHora', ($event.target as HTMLInputElement).value)"
          >
        </div>

        <div>
          <label
            for="custosOpServico"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:toolbox"
              class="text-accent-500"
            />
            Custos Operacionais (R$)
            <span
              class="tooltip-custom"
              tabindex="0"
              data-tooltip="Software, energia, internet, materiais, etc."
            >
              <Icon
                icon="fa6-solid:circle-question"
                class="txt-fraco text-xs"
              />
            </span>
          </label>
          <input
            id="custosOpServico"
            :value="dados.custosOperacionais || ''"
            type="number"
            min="0"
            step="0.01"
            inputmode="decimal"
            placeholder="Ex: 200.00"
            class="input-field"
            autocomplete="off"
            @input="normalizar('custosOperacionais', ($event.target as HTMLInputElement).value)"
          >
          <p class="text-xs txt-fraco mt-1">
            Software, energia, internet, materiais, etc.
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label
            for="complexidade"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:layer-group"
              class="text-primary-500"
            />
            Nível de Complexidade
          </label>
          <select
            id="complexidade"
            v-model="dados.complexidade"
            class="input-field"
            autocomplete="off"
          >
            <option value="simples">
              Simples (1.0x)
            </option>
            <option value="medio">
              Médio (1.3x)
            </option>
            <option value="avancado">
              Avançado (1.6x)
            </option>
          </select>
          <p class="text-xs txt-fraco mt-1">
            {{ descComplexidade[dados.complexidade] }}
          </p>
        </div>

        <div>
          <label
            for="urgencia"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:bolt"
              class="text-accent-500"
            />
            Urgência da Entrega
          </label>
          <select
            id="urgencia"
            v-model="dados.urgencia"
            class="input-field"
            autocomplete="off"
          >
            <option value="normal">
              Normal (sem acréscimo)
            </option>
            <option value="urgente">
              Urgente (+20%)
            </option>
            <option value="express">
              Express (+50%)
            </option>
          </select>
          <p class="text-xs txt-fraco mt-1">
            {{ descUrgencia[dados.urgencia] }}
          </p>
        </div>

        <div>
          <label
            for="margemLucroServico"
            class="label-field flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:chart-pie"
              class="text-primary-500"
            />
            Margem de Lucro (%)
            <span
              class="tooltip-custom"
              tabindex="0"
              data-tooltip="Percentual de lucro desejado sobre o custo total do serviço"
            >
              <Icon
                icon="fa6-solid:circle-question"
                class="txt-fraco text-xs"
              />
            </span>
          </label>
          <input
            id="margemLucroServico"
            :value="dados.margemLucro || ''"
            type="number"
            min="0"
            max="200"
            inputmode="decimal"
            placeholder="Ex: 25"
            class="input-field"
            autocomplete="off"
            @input="normalizar('margemLucro', ($event.target as HTMLInputElement).value)"
          >
        </div>
      </div>
    </div>

    <!-- Botões -->
    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        type="submit"
        class="btn-accent px-8 py-3"
      >
        <Icon icon="fa6-solid:calculator" />
        Calcular Preço do Serviço
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
      <div class="h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="glass-card p-6 text-center">
          <div class="flex items-center justify-center gap-2 mb-2">
            <Icon
              icon="fa6-solid:receipt"
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
            Trabalho + Operacional
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
          class="rounded-3xl p-6 text-center bg-gradient-to-br from-accent-500 to-accent-600 shadow-glow-accent"
        >
          <div class="flex items-center justify-center gap-2 mb-2">
            <Icon
              icon="fa6-solid:bullseye"
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
            Valor total do projeto
          </p>
        </div>
      </div>

      <!-- Opções de Cobrança -->
      <div class="glass-card p-6">
        <h3 class="text-lg font-semibold txt-forte mb-2 flex items-center gap-2">
          <Icon
            icon="fa6-solid:hand-holding-dollar"
            class="text-accent-500"
          />
          Opções de Cobrança
        </h3>
        <p class="text-xs txt-fraco mb-4">
          Diferentes formas de apresentar o preço
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="glass-card p-4 text-center">
            <div class="text-xs txt-fraco mb-1">
              Por Projeto
            </div>
            <div class="text-xl font-bold text-primary-500">
              R$ {{ fmt(resultado.precoFinal) }}
            </div>
            <span
              class="inline-block mt-2 text-[10px] bg-primary-500/20 text-primary-500 px-2 py-0.5 rounded-full font-medium"
            >Recomendado</span>
          </div>
          <div class="glass-card p-4 text-center">
            <div class="text-xs txt-fraco mb-1">
              Por Hora
            </div>
            <div class="text-xl font-bold txt-forte">
              R$ {{ fmt(resultado.precoPorHora) }}
            </div>
            <div class="text-[10px] txt-fraco mt-1">
              ({{ dados.horasEstimadas }}h total)
            </div>
          </div>
          <div class="glass-card p-4 text-center">
            <div class="text-xs txt-fraco mb-1">
              Por Dia
            </div>
            <div class="text-xl font-bold txt-forte">
              R$ {{ fmt(resultado.precoPorDia) }}
            </div>
            <div class="text-[10px] txt-fraco mt-1">
              (8h por dia)
            </div>
          </div>
          <div class="glass-card p-4 text-center">
            <div class="text-xs txt-fraco mb-1">
              Por Semana
            </div>
            <div class="text-xl font-bold txt-forte">
              R$ {{ fmt(resultado.precoPorSemana) }}
            </div>
            <div class="text-[10px] txt-fraco mt-1">
              (40h por semana)
            </div>
          </div>
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
            <span class="txt-suave">Valor base ({{ dados.horasEstimadas }}h × R$ {{ fmt(dados.valorHora) }}):</span>
            <span class="txt-forte font-medium">R$ {{ fmt(resultado.custoBaseTrabalho) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="txt-suave">Multiplicador complexidade ({{ dados.complexidade }}):</span>
            <span class="txt-forte font-medium">×{{ resultado.multiplicadorComplexidade }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="txt-suave">Multiplicador urgência ({{ dados.urgencia }}):</span>
            <span class="txt-forte font-medium">×{{ resultado.multiplicadorUrgencia }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="txt-suave">Trabalho ajustado:</span>
            <span class="txt-forte font-medium">R$ {{ fmt(resultado.custoAjustado) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="txt-suave">Custos operacionais:</span>
            <span class="txt-forte font-medium">R$ {{ fmt(dados.custosOperacionais) }}</span>
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
          <div
            class="h-px"
            style="background: var(--glass-borda)"
          />
          <div class="flex justify-between text-lg font-bold">
            <span class="text-accent-500">Preço Final:</span>
            <span class="text-accent-500">R$ {{ fmt(resultado.precoFinal) }}</span>
          </div>
        </div>
      </div>

      <!-- Comparativo -->
      <div class="glass-card p-6">
        <h3 class="text-lg font-semibold txt-forte mb-2 flex items-center gap-2">
          <Icon
            icon="fa6-solid:scale-balanced"
            class="text-primary-500"
          />
          Comparativo de Margens
        </h3>
        <p class="text-xs txt-fraco mb-4">
          Como diferentes margens afetam o preço
        </p>
        <div class="space-y-2">
          <div
            v-for="comp in resultado.comparativos"
            :key="comp.margem"
            class="flex justify-between items-center p-3 rounded-xl text-sm transition-all"
            :class="
              comp.margem === dados.margemLucro
                ? 'bg-accent-500/15 border border-accent-500/30'
                : 'hover:bg-accent-500/5'
            "
            :style="comp.margem !== dados.margemLucro ? 'background: var(--glass-bg)' : ''"
          >
            <span class="font-medium txt-forte flex items-center gap-2">
              <Icon
                v-if="comp.margem === dados.margemLucro"
                icon="fa6-solid:star"
                class="text-accent-500 text-xs"
              />
              {{ comp.margem }}% de margem
            </span>
            <div class="text-right">
              <div class="font-bold txt-forte">
                R$ {{ fmt(comp.precoFinal) }}
              </div>
              <div class="text-xs txt-fraco">
                R$ {{ fmt(comp.porHora) }}/hora
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Faixa de preço -->
      <div class="glass-card p-6 border-accent-500/20">
        <h3 class="text-lg font-semibold text-accent-500 mb-4 flex items-center gap-2">
          <Icon icon="fa6-solid:lightbulb" />
          Faixa de Preços Recomendada
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="glass-card p-4 text-center">
            <div class="text-xs txt-fraco mb-1">
              Preço Mínimo
            </div>
            <div class="text-xl font-bold text-red-500">
              R$ {{ fmt(resultado.precoMinimo) }}
            </div>
            <div class="text-[10px] txt-fraco">
              15% margem
            </div>
          </div>
          <div class="bg-accent-500/10 rounded-xl p-4 text-center border border-accent-500/30">
            <div class="text-xs txt-fraco mb-1">
              Preço Ideal
            </div>
            <div class="text-xl font-bold text-accent-500">
              R$ {{ fmt(resultado.precoFinal) }}
            </div>
            <div class="text-[10px] txt-fraco">
              {{ dados.margemLucro }}% margem
            </div>
          </div>
          <div class="glass-card p-4 text-center">
            <div class="text-xs txt-fraco mb-1">
              Preço Premium
            </div>
            <div class="text-xl font-bold text-primary-500">
              R$ {{ fmt(resultado.precoPremium) }}
            </div>
            <div class="text-[10px] txt-fraco">
              50% margem
            </div>
          </div>
        </div>
        <div class="space-y-2 text-sm txt-suave">
          <p>
            • <strong class="txt-forte">Nunca cobre abaixo do preço mínimo</strong> — você pode ter
            prejuízo
          </p>
          <p>• <strong class="txt-forte">O preço ideal</strong> considera sua margem e é competitivo</p>
          <p>
            • <strong class="txt-forte">Use o preço premium</strong> para clientes que valorizam alta
            qualidade/urgência
          </p>
        </div>
      </div>
    </div>
  </form>
</template>
