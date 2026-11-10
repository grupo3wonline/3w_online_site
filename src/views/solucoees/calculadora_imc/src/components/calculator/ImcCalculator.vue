<script setup lang="ts">
import { reactive, ref, defineAsyncComponent } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import {
  calcularResultado,
  imcFormSchema,
  NIVEIS_ATIVIDADE,
  REMEDIO_LABELS,
  type DadosUsuario,
  type ResultadoIMC,
} from '@/lib/imc'
import { useUiStore } from '@/stores/ui'
import { useHistoryStore } from '@/stores/history'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import { useMotionPresets } from '@/composables/useMotionPresets'

// Gauge carregado sob demanda (ApexCharts é pesado; só entra quando há resultado).
const ImcGauge = defineAsyncComponent(() => import('./ImcGauge.vue'))

const ui = useUiStore()
const history = useHistoryStore()
const { fadeUp } = useMotionPresets()

// Máscaras numéricas (Maska). Ponto como separador decimal para manter o valor
// diretamente parseável por Number() na validação Zod.
const maskAltura = { mask: '9.99', tokens: { 9: { pattern: /[0-9]/ } }, eager: true }
const maskPeso = { number: { locale: 'en', fraction: 1, unsigned: true } }
const maskIdade = { mask: '###', tokens: { '#': { pattern: /[0-9]/ } } }

const form = reactive({
  altura: '' as number | '',
  peso: '' as number | '',
  idade: '' as number | '',
  sexo: '' as 'male' | 'female' | '',
  atividade: '' as number | '',
})

const errors = reactive<Record<string, string>>({})
const resultado = ref<ResultadoIMC | null>(null)
const ultimoDados = ref<DadosUsuario | null>(null)

const refeicaoLabels: Record<string, string> = {
  cafe: 'Café da manhã',
  almoco: 'Almoço',
  jantar: 'Jantar',
  lanches: 'Lanches',
}

function formatarNutriente(chave: string): string {
  return chave.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1')
}

function validar(): DadosUsuario | null {
  Object.keys(errors).forEach((k) => delete errors[k])
  const parsed = imcFormSchema.safeParse({
    altura: form.altura === '' ? undefined : Number(form.altura),
    peso: form.peso === '' ? undefined : Number(form.peso),
    idade: form.idade === '' ? undefined : Number(form.idade),
    sexo: form.sexo === '' ? undefined : form.sexo,
    atividade: form.atividade === '' ? undefined : Number(form.atividade),
  })
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message
    }
    return null
  }
  return parsed.data
}

async function calcular() {
  const dados = validar()
  if (!dados) {
    Swal.fire({
      icon: 'warning',
      title: 'Verifique os campos',
      text: 'Preencha corretamente todos os campos obrigatórios para calcular.',
      confirmButtonColor: 'hsl(270, 100%, 60%)',
    })
    return
  }

  ui.showLoading('Calculando suas metas...')
  // pequena espera para o overlay ser perceptível em cálculos instantâneos
  await new Promise((r) => setTimeout(r, 350))
  const r = calcularResultado(dados)
  resultado.value = r
  ultimoDados.value = dados
  history.add({
    altura: dados.altura,
    peso: dados.peso,
    idade: dados.idade,
    sexo: dados.sexo,
    imc: Number(r.imc.toFixed(1)),
    categoria: r.imcCategoria,
  })
  ui.hideLoading()

  Swal.fire({
    icon: 'success',
    title: 'Cálculo realizado!',
    text: 'Suas metas foram calculadas com sucesso.',
    timer: 1600,
    showConfirmButton: false,
  })
}

function limpar() {
  form.altura = ''
  form.peso = ''
  form.idade = ''
  form.sexo = ''
  form.atividade = ''
  Object.keys(errors).forEach((k) => delete errors[k])
  resultado.value = null
  ultimoDados.value = null
}

async function baixarPdf() {
  if (!resultado.value || !ultimoDados.value) return
  ui.showLoading('Gerando PDF...')
  await new Promise((r) => setTimeout(r, 250))
  try {
    // jsPDF é carregado sob demanda (só quando o usuário gera o PDF).
    const { gerarRelatorioPDF } = await import('@/lib/imc/pdf')
    gerarRelatorioPDF(ultimoDados.value, resultado.value)
  } finally {
    ui.hideLoading()
  }
}
</script>

<template>
  <div class="p-4">
    <!-- Formulário -->
    <BaseCard as="form" class="mx-auto max-w-2xl" autocomplete="off" novalidate @submit.prevent="calcular">
      <div class="mb-6 text-center">
        <h2 class="flex items-center justify-center gap-2 text-2xl font-bold">
          <Icon icon="lucide:calculator" class="h-6 w-6 text-primary" />
          Calculadora de IMC
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          Preencha os dados abaixo para calcular suas metas personalizadas. Leva menos de 2 minutos.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BaseInput
          id="altura"
          v-model="form.altura"
          label="Altura (metros)"
          inputmode="decimal"
          placeholder="Ex: 1.75"
          hint="Informe sua altura em metros, usando ponto como separador (ex.: 1.75)."
          :mask="maskAltura"
          :error="errors.altura"
        />
        <BaseInput
          id="peso"
          v-model="form.peso"
          label="Peso (kg)"
          inputmode="decimal"
          placeholder="Ex: 70.5"
          hint="Informe seu peso atual em quilogramas (ex.: 70.5)."
          :mask="maskPeso"
          :error="errors.peso"
        />
        <BaseInput
          id="idade"
          v-model="form.idade"
          label="Idade (anos)"
          inputmode="numeric"
          placeholder="Ex: 30"
          hint="Sua idade em anos completos. Usada no cálculo da faixa de peso e metabolismo."
          :mask="maskIdade"
          :error="errors.idade"
        />
        <BaseSelect
          id="sexo"
          v-model="form.sexo"
          label="Sexo"
          :options="[
            { value: 'male', label: 'Masculino' },
            { value: 'female', label: 'Feminino' },
          ]"
          :error="errors.sexo"
        />
      </div>

      <div class="mt-4">
        <BaseSelect
          id="atividade"
          v-model="form.atividade"
          label="Frequência de Atividades"
          placeholder="Selecione seu nível de atividade"
          :options="NIVEIS_ATIVIDADE"
          :error="errors.atividade"
        />
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <BaseButton type="submit" block>
          <Icon icon="lucide:sparkles" class="h-4 w-4" />
          Calcular Metas
        </BaseButton>
        <BaseButton type="button" variant="outline" block @click="limpar">
          <Icon icon="lucide:eraser" class="h-4 w-4" />
          Limpar
        </BaseButton>
      </div>
    </BaseCard>

    <!-- Resultados -->
    <div v-if="resultado" v-motion="fadeUp()" class="mx-auto mt-8 max-w-6xl space-y-6">
      <h2 class="text-center text-2xl font-bold">Suas Metas Diárias</h2>

      <!-- Gauge do IMC -->
      <BaseCard class="flex flex-col items-center">
        <h3 class="mb-1 text-lg font-semibold">Seu IMC</h3>
        <p class="mb-2 text-sm text-muted-foreground">
          Índice de Massa Corporal na faixa <strong>{{ resultado.imcCategoria }}</strong>
        </p>
        <ImcGauge :imc="resultado.imc" :categoria="resultado.imcCategoria" />
      </BaseCard>

      <!-- Cards resumo -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="flex items-center gap-3 rounded-xl border border-border bg-gradient-card p-6 shadow-card">
          <Icon icon="lucide:heart-pulse" class="h-8 w-8 text-primary" />
          <div>
            <p class="text-sm text-muted-foreground">IMC</p>
            <p class="text-2xl font-bold">{{ resultado.imc.toFixed(1) }}</p>
            <p class="text-sm">{{ resultado.imcCategoria }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-xl border border-border bg-gradient-card p-6 shadow-card">
          <Icon icon="lucide:droplets" class="h-8 w-8 text-blue-400" />
          <div>
            <p class="text-sm text-muted-foreground">Água</p>
            <p class="text-2xl font-bold">{{ resultado.hidratacao.necessidadeHidrica }}L</p>
            <p class="text-sm">por dia</p>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-xl border border-border bg-gradient-card p-6 shadow-card">
          <Icon icon="lucide:zap" class="h-8 w-8 text-yellow-400" />
          <div>
            <p class="text-sm text-muted-foreground">Calorias</p>
            <p class="text-2xl font-bold">{{ resultado.calorias }}</p>
            <p class="text-sm">kcal/dia</p>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-xl border border-border bg-gradient-card p-6 shadow-card">
          <span class="h-8 w-8 rounded-full bg-green-400" />
          <div>
            <p class="text-sm text-muted-foreground">Peso Ideal</p>
            <p class="text-xl font-bold">
              {{ resultado.pesoIdealFaixa.min }}-{{ resultado.pesoIdealFaixa.max }}
            </p>
            <p class="text-sm">kg</p>
          </div>
        </div>
      </div>

      <!-- Nutrição + Hidratação -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="rounded-xl border border-border bg-gradient-card p-6 shadow-card">
          <h3 class="text-lg font-semibold">Análise Nutricional Detalhada</h3>
          <p class="mb-4 text-sm text-muted-foreground">Necessidades diárias calculadas</p>
          <div class="space-y-4">
            <div v-for="key in ['calorias', 'proteinas', 'carboidratos', 'gorduras'] as const" :key="key">
              <h4 class="font-semibold capitalize text-primary">{{ key }}</h4>
              <p class="text-sm">{{ resultado.gastoCalorico[key].nota }}</p>
              <p class="text-xs text-muted-foreground">{{ resultado.gastoCalorico[key].indicacao }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-border bg-gradient-card p-6 shadow-card">
          <h3 class="text-lg font-semibold">Hidratação</h3>
          <p class="mb-4 text-sm text-muted-foreground">Necessidades de água diárias</p>
          <div class="text-center">
            <p class="text-3xl font-bold text-blue-500">{{ resultado.hidratacao.litros }}</p>
            <p class="text-sm text-muted-foreground">por dia</p>
          </div>
          <div class="mt-4 space-y-2">
            <p class="text-sm">📱 {{ resultado.hidratacao.garrafas }}</p>
            <p class="text-sm">🥤 {{ resultado.hidratacao.copos }}</p>
            <p class="mt-2 text-xs text-muted-foreground">{{ resultado.hidratacao.nota }}</p>
          </div>
        </div>
      </div>

      <!-- Peso + Composição -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="rounded-xl border border-border bg-gradient-card p-6 shadow-card">
          <h3 class="text-lg font-semibold">Análise de Peso</h3>
          <p class="mb-4 text-sm text-muted-foreground">Faixa de peso ideal personalizada</p>
          <div class="flex justify-around text-center">
            <div>
              <p class="text-sm text-muted-foreground">Mínimo</p>
              <p class="text-xl font-bold text-green-500">{{ resultado.pesoIdeal.pesoMin }}kg</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Médio</p>
              <p class="text-xl font-bold text-blue-500">{{ resultado.pesoIdeal.pesoMed }}kg</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Máximo</p>
              <p class="text-xl font-bold text-green-500">{{ resultado.pesoIdeal.pesoMax }}kg</p>
            </div>
          </div>
          <p class="mt-4 text-sm">{{ resultado.pesoIdeal.nota }}</p>
        </div>

        <div class="rounded-xl border border-border bg-gradient-card p-6 shadow-card">
          <h3 class="text-lg font-semibold">Composição Corporal</h3>
          <p class="mb-4 text-sm text-muted-foreground">Taxa metabólica e gordura corporal</p>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-primary">TMB (Taxa Metabólica Basal)</h4>
              <p class="text-2xl font-bold">{{ resultado.tmb.valor }} kcal</p>
              <p class="text-xs text-muted-foreground">Energia necessária em repouso</p>
            </div>
            <div>
              <h4 class="font-semibold text-primary">GET (Gasto Energético Total)</h4>
              <p class="text-2xl font-bold">{{ resultado.get.valor }} kcal</p>
              <p class="text-xs text-muted-foreground">Energia total com atividades</p>
            </div>
            <div>
              <h4 class="font-semibold text-primary">Percentual de Gordura</h4>
              <p class="text-2xl font-bold">{{ resultado.percentualGordura.percentual }}%</p>
              <p class="text-xs text-muted-foreground">Estimativa baseada no IMC</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Refeições -->
      <div class="rounded-xl border border-border bg-gradient-card p-6 shadow-card">
        <h3 class="text-lg font-semibold">Distribuição das Refeições</h3>
        <p class="mb-4 text-sm text-muted-foreground">
          Sugestão de como dividir suas metas ao longo do dia
        </p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(valores, meal) in resultado.refeicoes"
            :key="meal"
            class="rounded-lg border border-border p-4"
          >
            <h4 class="font-semibold">{{ refeicaoLabels[meal] }}</h4>
            <p class="text-sm text-muted-foreground">{{ valores.calorias }} kcal</p>
            <p class="text-sm text-muted-foreground">{{ valores.proteina }}g proteína</p>
            <p class="text-sm text-muted-foreground">{{ valores.carboidrato }}g carboidrato</p>
          </div>
        </div>
      </div>

      <!-- Nutrientes -->
      <div class="rounded-xl border border-border bg-gradient-card p-6 shadow-card">
        <h3 class="text-lg font-semibold">Nutrientes Essenciais Diários</h3>
        <p class="mb-4 text-sm text-muted-foreground">Valores recomendados de vitaminas e minerais</p>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(valor, nutriente) in resultado.nutrientes"
            :key="nutriente"
            class="rounded-lg border border-border p-3"
          >
            <h5 class="font-medium capitalize text-primary">{{ formatarNutriente(nutriente) }}</h5>
            <p class="text-sm text-muted-foreground">{{ valor }}</p>
          </div>
        </div>
      </div>

      <!-- 8 Remédios Naturais -->
      <div class="rounded-xl border border-border bg-gradient-card p-6 shadow-card">
        <h3 class="text-lg font-semibold">8 Remédios Naturais para uma Vida Saudável</h3>
        <p class="mb-4 text-sm text-muted-foreground">
          Princípios fundamentais para o bem-estar integral
        </p>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            v-for="(info, remedio) in resultado.remediosNaturais"
            :key="remedio"
            class="space-y-3 rounded-lg border border-border p-4"
          >
            <h4 class="font-semibold text-primary">{{ REMEDIO_LABELS[remedio] }}</h4>
            <div>
              <h5 class="text-sm font-medium">Recomendação:</h5>
              <p class="text-sm leading-relaxed text-muted-foreground">{{ info.recomendacao }}</p>
            </div>
            <div>
              <h5 class="text-sm font-medium">Exemplo prático:</h5>
              <p class="text-sm leading-relaxed text-muted-foreground">{{ info.exemplo }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Aviso -->
      <div
        class="rounded-xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-800 dark:bg-orange-950"
      >
        <h3 class="mb-2 text-lg font-semibold text-orange-800 dark:text-orange-200">
          ⚠️ Aviso Importante
        </h3>
        <p class="leading-relaxed text-orange-700 dark:text-orange-300">
          Esta ferramenta é informativa e não substitui acompanhamento profissional. Consulte um
          médico ou educador físico antes de iniciar qualquer plano alimentar ou de exercícios. Os
          valores apresentados são baseados em recomendações gerais e podem variar conforme suas
          necessidades individuais.
        </p>
      </div>

      <div class="text-center">
        <BaseButton type="button" size="lg" @click="baixarPdf">
          <Icon icon="lucide:file-down" class="h-5 w-5" />
          Gerar PDF Completo
        </BaseButton>
      </div>
    </div>
  </div>
</template>
