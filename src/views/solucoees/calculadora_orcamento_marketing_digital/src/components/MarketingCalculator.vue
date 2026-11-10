<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useThemeStore } from '@/stores/theme'
import { useLoadingStore } from '@/stores/loading'
import {
  campaignSchema,
  calculateBudget,
  parseNumber,
  formatCurrency,
  formatNumber,
} from '@/lib/calculator'
import HelpTooltip from './HelpTooltip.vue'

const theme = useThemeStore()
const loading = useLoadingStore()

const followers = ref('')
const rateInCents = ref('')
const duration = ref('')
const result = ref<number | null>(null)

/** Cores do SweetAlert2 conforme o tema ativo. */
function swalTheme() {
  const light = theme.mode === 'light'
  return {
    background: light ? '#ffffff' : '#0f172a',
    color: light ? '#1e293b' : '#f8fafc',
    confirmButtonColor: '#4F46E5',
    cancelButtonColor: '#64748b',
  }
}

async function onSubmit() {
  const parsed = campaignSchema.safeParse({
    followers: parseNumber(followers.value),
    rateInCents: parseNumber(rateInCents.value),
    durationDays: parseNumber(duration.value),
  })

  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Preencha todos os campos com valores válidos.'
    await Swal.fire({
      icon: 'warning',
      title: 'Campos Inválidos',
      text: msg,
      confirmButtonText: 'Entendi',
      ...swalTheme(),
    })
    return
  }

  // Simula um pequeno processamento para exibir o loading global.
  const budget = await loading.wrap(
    new Promise<number>((resolve) => {
      setTimeout(() => resolve(calculateBudget(parsed.data)), 350)
    }),
    'Calculando orçamento...'
  )

  result.value = budget

  await Swal.fire({
    icon: 'success',
    title: 'Orçamento Calculado!',
    html: `
      <div style="font-size:1.5rem;font-weight:700;color:#4F46E5;margin:1rem 0;">
        ${formatCurrency(budget)}
      </div>
      <p style="color:#64748b;font-size:0.875rem;">
        ${formatNumber(parsed.data.followers)} seguidores ×
        ${formatCurrency(parsed.data.rateInCents / 100)} ×
        ${parsed.data.durationDays} dias
      </p>`,
    confirmButtonText: 'Fechar',
    ...swalTheme(),
  })
}

async function onClear() {
  const res = await Swal.fire({
    title: 'Limpar Formulário?',
    text: 'Todos os dados inseridos serão apagados.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sim, limpar',
    cancelButtonText: 'Cancelar',
    ...swalTheme(),
  })

  if (res.isConfirmed) {
    followers.value = ''
    rateInCents.value = ''
    duration.value = ''
    result.value = null
    await Swal.fire({
      icon: 'success',
      title: 'Formulário Limpo!',
      text: 'Você pode começar um novo cálculo.',
      timer: 1500,
      showConfirmButton: false,
      ...swalTheme(),
    })
  }
}

const tips = [
  {
    icon: 'fa-lightbulb',
    title: 'Taxa Média do Mercado',
    description:
      'Influenciadores costumam cobrar entre 5 e 50 centavos por seguidor, dependendo do nicho.',
  },
  {
    icon: 'fa-chart-pie',
    title: 'Considere o Engajamento',
    description: 'Perfis com alto engajamento podem cobrar taxas mais elevadas.',
  },
  {
    icon: 'fa-calendar-alt',
    title: 'Duração Estratégica',
    description: 'Campanhas de 7 a 14 dias costumam ter melhor custo-benefício.',
  },
  {
    icon: 'fa-bullseye',
    title: 'Segmente seu Público',
    description: 'Valores podem variar de acordo com a segmentação e nicho do público.',
  },
]
</script>

<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <!-- Calculadora -->
    <div class="lg:col-span-2">
      <div class="card-premium">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl gradient-cta shadow-lg">
            <i class="fas fa-calculator text-xl text-white" aria-hidden="true"></i>
          </div>
          <div>
            <h3 class="text-xl font-bold text-foreground">Dados da Campanha</h3>
            <p class="text-sm text-muted-foreground">Insira as informações abaixo</p>
          </div>
        </div>

        <form autocomplete="off" class="space-y-6" @submit.prevent="onSubmit">
          <!-- Seguidores -->
          <div class="form-group">
            <label for="followers" class="form-label">
              <i class="fas fa-users text-sm text-primary" aria-hidden="true"></i>
              Seguidores ou Visualizações
              <HelpTooltip label="Ajuda sobre seguidores">
                <span class="block"
                  >Quantidade total de seguidores ou visualizações esperadas.</span
                >
                <span class="mt-1 block text-primary">Exemplo: 50000 para 50 mil seguidores.</span>
              </HelpTooltip>
            </label>
            <input
              id="followers"
              v-model="followers"
              type="number"
              class="form-input"
              placeholder="Ex: 50000"
              min="0"
              inputmode="numeric"
              autocomplete="off"
            />
          </div>

          <!-- Taxa -->
          <div class="form-group">
            <label for="rate" class="form-label">
              <i class="fas fa-coins text-sm text-primary" aria-hidden="true"></i>
              Taxa por Seguidor/Visualização (em centavos)
              <HelpTooltip label="Ajuda sobre a taxa">
                <span class="block">Valor em centavos cobrado por seguidor/visualização.</span>
                <span class="mt-1 block text-primary">Ex: 20 centavos = R$ 0,20 por seguidor.</span>
                <span class="mt-1 block text-muted-foreground"
                  >Valores típicos: 5 a 50 centavos.</span
                >
              </HelpTooltip>
            </label>
            <input
              id="rate"
              v-model="rateInCents"
              type="number"
              class="form-input"
              placeholder="Ex: 20 (para R$0,20)"
              min="0"
              step="0.01"
              inputmode="decimal"
              autocomplete="off"
            />
          </div>

          <!-- Duração -->
          <div class="form-group">
            <label for="duration" class="form-label">
              <i class="fas fa-clock text-sm text-primary" aria-hidden="true"></i>
              Duração da Campanha (em dias)
              <HelpTooltip label="Ajuda sobre a duração">
                <span class="block">Período que a campanha ficará ativa.</span>
                <span class="mt-1 block text-primary">Exemplo: 7 dias para uma semana.</span>
                <span class="mt-1 block text-muted-foreground">Para posts únicos, use 1 dia.</span>
              </HelpTooltip>
            </label>
            <input
              id="duration"
              v-model="duration"
              type="number"
              class="form-input"
              placeholder="Ex: 7"
              min="1"
              inputmode="numeric"
              autocomplete="off"
            />
          </div>

          <div class="flex flex-col gap-3 pt-4 sm:flex-row">
            <button type="submit" class="btn-primary flex-1 py-3.5 text-base">
              <i class="fas fa-calculator" aria-hidden="true"></i>
              Calcular Orçamento
            </button>
            <button type="button" class="btn-ghost py-3.5" @click="onClear">
              <i class="fas fa-eraser" aria-hidden="true"></i>
              Limpar
            </button>
          </div>
        </form>

        <div v-if="result !== null" class="result-card scale-in mt-8">
          <div
            class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/15"
          >
            <i class="fas fa-circle-check text-2xl text-success" aria-hidden="true"></i>
          </div>
          <div class="mb-2 text-sm font-medium text-muted-foreground">Orçamento Total Estimado</div>
          <p class="gradient-text mb-3 font-display text-4xl font-extrabold md:text-5xl">
            {{ formatCurrency(result) }}
          </p>
          <p class="text-sm text-muted-foreground">
            {{ formatNumber(parseNumber(followers)) }} seguidores ×
            {{ formatCurrency(parseNumber(rateInCents) / 100) }} × {{ duration }} dias
          </p>
        </div>
      </div>
    </div>

    <!-- Dicas -->
    <div class="space-y-4">
      <div class="card-premium">
        <h3 class="mb-4 flex items-center gap-2 font-semibold text-foreground">
          <i class="fas fa-lightbulb text-yellow-500" aria-hidden="true"></i>
          Dicas Úteis
        </h3>
        <div class="space-y-4">
          <div v-for="tip in tips" :key="tip.title" class="flex gap-3">
            <div
              class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10"
            >
              <i :class="['fas text-xs text-primary', tip.icon]" aria-hidden="true"></i>
            </div>
            <div>
              <h4 class="text-sm font-medium text-foreground">{{ tip.title }}</h4>
              <p class="text-xs text-muted-foreground">{{ tip.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-premium border-primary/20 bg-primary/5">
        <div class="mb-3 flex items-center gap-2">
          <i class="fas fa-question-circle text-primary" aria-hidden="true"></i>
          <h3 class="font-semibold text-foreground">Precisa de Ajuda?</h3>
        </div>
        <p class="mb-4 text-sm text-muted-foreground">
          Entre em contato conosco para tirar suas dúvidas sobre precificação.
        </p>
        <RouterLink
          to="/#contato"
          class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <i class="fas fa-envelope" aria-hidden="true"></i>
          Fale Conosco
        </RouterLink>
      </div>
    </div>
  </div>
</template>
