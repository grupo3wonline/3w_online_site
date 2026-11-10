<template>
  <div
    class="min-h-screen bg-gradient-to-br from-bbq-warm via-background to-bbq-warm/50 dark:from-background dark:via-background dark:to-background"
  >
    <div class="container mx-auto px-4 py-8">
      <AppBreadcrumb />

      <!-- Header -->
      <div class="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
        >
          <i class="fa-solid fa-arrow-left"></i> Voltar
        </router-link>
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-bbq-orange to-bbq-red"
          >
            <i class="fa-solid fa-calculator text-xl text-white"></i>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-foreground md:text-3xl">Calculadora de Churrasco</h1>
            <p class="text-sm text-muted-foreground">Preencha os dados e obtenha sua lista completa</p>
          </div>
        </div>
      </div>

      <!-- Dica -->
      <div class="mb-6 rounded-xl border border-bbq-orange/20 bg-bbq-orange/10 p-4">
        <p class="text-sm text-foreground">
          <i class="fa-solid fa-lightbulb mr-2 text-bbq-orange"></i>
          <strong>Dica:</strong> informe o número de convidados por perfil e a duração do evento em
          horas. Use os atalhos abaixo para preencher rápido e ajuste o apetite conforme o seu grupo.
        </p>
        <router-link
          to="/orcamento"
          class="mt-2 inline-flex items-center gap-2 text-sm font-medium text-bbq-orange hover:underline"
        >
          <i class="fa-solid fa-receipt"></i> Prefere lançar itens e valores manualmente? Use o Orçamento com rateio
          <i class="fa-solid fa-arrow-right text-xs"></i>
        </router-link>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Form -->
        <div class="overflow-hidden rounded-2xl bg-card shadow-xl">
          <div class="bg-gradient-to-r from-bbq-orange/10 to-bbq-red/10 p-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="flex items-center gap-2 text-lg font-bold">
                  <i class="fa-solid fa-users text-bbq-orange"></i> Dados do Churrasco
                </h2>
                <p class="mt-1 text-sm text-muted-foreground">Informe a quantidade de pessoas e a duração</p>
              </div>
              <button
                type="button"
                class="rounded-lg p-2 transition-colors hover:bg-muted"
                title="Preencha todos os campos para obter o cálculo preciso. Valores baseados em consumo médio brasileiro."
                aria-label="Ajuda sobre o preenchimento"
              >
                <i class="fa-solid fa-circle-question text-muted-foreground"></i>
              </button>
            </div>
          </div>

          <form class="space-y-6 p-6" autocomplete="off" novalidate @submit.prevent="onSubmit">
            <!-- Presets -->
            <div>
              <p class="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Atalhos rápidos
              </p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="preset in PRESETS"
                  :key="preset.id"
                  type="button"
                  class="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-bbq-orange hover:bg-bbq-orange/10 hover:text-bbq-orange"
                  :title="`Preencher com ${preset.label}`"
                  @click="aplicarPreset(preset)"
                >
                  <i :class="preset.icone"></i> {{ preset.label }}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <CampoNumero
                id="homens"
                v-model="homens"
                label="Homens"
                icone="fa-solid fa-person text-bbq-orange"
                dica="~400g de carne/pessoa"
                :erro="errors.homens"
              />
              <CampoNumero
                id="mulheres"
                v-model="mulheres"
                label="Mulheres"
                icone="fa-solid fa-person-dress text-bbq-red"
                dica="~300g de carne/pessoa"
                :erro="errors.mulheres"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <CampoNumero
                id="criancas"
                v-model="criancas"
                label="Crianças"
                icone="fa-solid fa-child text-accent"
                dica="~150g de carne/pessoa"
                :erro="errors.criancas"
              />
              <CampoNumero
                id="duracao"
                v-model="duracao"
                label="Duração (horas)"
                icone="fa-solid fa-clock text-bbq-brown"
                dica="Recomendado: 4 a 6 horas"
                placeholder="4"
                :erro="errors.duracao"
              />
            </div>

            <!-- Apetite -->
            <div>
              <label class="mb-2 flex items-center gap-2 text-sm font-medium">
                <i class="fa-solid fa-gauge-high text-bbq-orange"></i> Nível de apetite do grupo
              </label>
              <div class="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Nível de apetite">
                <button
                  v-for="op in apetiteOpcoes"
                  :key="op.valor"
                  type="button"
                  role="radio"
                  :aria-checked="apetite === op.valor"
                  :title="op.dica"
                  :class="[
                    'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                    apetite === op.valor
                      ? 'border-bbq-orange bg-bbq-orange/10 text-bbq-orange'
                      : 'border-border hover:bg-muted',
                  ]"
                  @click="apetite = op.valor"
                >
                  <i :class="op.icone + ' mr-1'"></i>{{ op.label }}
                </button>
              </div>
            </div>

            <div class="flex gap-3 pt-2">
              <button
                type="submit"
                class="inline-flex flex-1 transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-bbq-orange to-bbq-red px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <i class="fa-solid fa-calculator"></i> Calcular Churrasco
              </button>
              <button
                type="button"
                class="rounded-xl border border-border px-4 py-3 transition-colors hover:bg-muted"
                title="Limpar formulário"
                aria-label="Limpar formulário"
                @click="onReset"
              >
                <i class="fa-solid fa-rotate-left"></i>
              </button>
            </div>
          </form>
        </div>

        <!-- Results -->
        <div v-if="resultado" class="space-y-6 print:space-y-4">
          <div class="print-hidden flex flex-wrap justify-end gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
              @click="imprimir"
            >
              <i class="fa-solid fa-print"></i> Imprimir
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
              @click="baixar"
            >
              <i class="fa-solid fa-download"></i> Baixar lista
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
              @click="compartilhar"
            >
              <i class="fa-solid fa-share-nodes"></i> Compartilhar
            </button>
          </div>

          <!-- Resumo -->
          <div class="overflow-hidden rounded-2xl bg-card shadow-lg">
            <div class="h-1 bg-gradient-to-r from-bbq-orange to-bbq-red"></div>
            <div class="p-6">
              <h3 class="mb-4 text-lg font-bold"><i class="fa-solid fa-chart-simple mr-2"></i>Resumo</h3>
              <div class="grid grid-cols-3 gap-4 text-center">
                <div class="rounded-lg bg-muted/50 p-3">
                  <p class="text-2xl font-bold text-bbq-orange">{{ resultado.adultos }}</p>
                  <p class="text-xs text-muted-foreground">Adulto(s)</p>
                </div>
                <div class="rounded-lg bg-muted/50 p-3">
                  <p class="text-2xl font-bold text-accent">{{ resultado.criancas }}</p>
                  <p class="text-xs text-muted-foreground">Criança(s)</p>
                </div>
                <div class="rounded-lg bg-muted/50 p-3">
                  <p class="text-2xl font-bold text-bbq-brown">{{ resultado.duracao }}h</p>
                  <p class="text-xs text-muted-foreground">Duração</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Custo estimado -->
          <div class="overflow-hidden rounded-2xl bg-card shadow-lg">
            <div class="h-1 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div class="p-6">
              <div class="mb-3 flex items-center justify-between">
                <h3 class="text-lg font-bold text-emerald-600">
                  <i class="fa-solid fa-sack-dollar mr-2"></i>Custo estimado
                </h3>
                <button
                  type="button"
                  class="print-hidden text-sm text-muted-foreground transition-colors hover:text-bbq-orange"
                  :title="editandoPrecos ? 'Ocultar edição de preços' : 'Ajustar preços'"
                  @click="editandoPrecos = !editandoPrecos"
                >
                  <i class="fa-solid fa-pen-to-square mr-1"></i>{{ editandoPrecos ? 'Ocultar' : 'Ajustar preços' }}
                </button>
              </div>

              <p class="mb-3 text-3xl font-extrabold text-foreground">{{ brl(custo.total) }}</p>
              <p class="mb-4 text-xs text-muted-foreground">
                <i class="fa-solid fa-circle-info mr-1"></i>Estimativa baseada em preços médios. Ajuste
                conforme os valores da sua região.
              </p>

              <div v-if="editandoPrecos" class="print-hidden space-y-2 rounded-lg bg-muted/30 p-3">
                <div
                  v-for="chave in Object.keys(precos)"
                  :key="chave"
                  class="flex items-center justify-between gap-3"
                >
                  <label :for="`preco-${chave}`" class="text-sm">{{ chave }}</label>
                  <div class="flex items-center gap-1">
                    <span class="text-xs text-muted-foreground">R$</span>
                    <input
                      :id="`preco-${chave}`"
                      v-model.number="precos[chave]"
                      type="number"
                      min="0"
                      step="0.5"
                      autocomplete="off"
                      class="w-24 rounded-md border border-input bg-background px-2 py-1 text-right text-sm outline-none focus:ring-2 focus:ring-bbq-orange"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  class="mt-2 text-xs text-bbq-orange hover:underline"
                  @click="restaurarPrecos"
                >
                  <i class="fa-solid fa-rotate-left mr-1"></i>Restaurar preços padrão
                </button>
              </div>
            </div>
          </div>

          <!-- Carnes -->
          <div class="overflow-hidden rounded-2xl bg-card shadow-lg">
            <div class="h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
            <div class="p-6">
              <h3 class="mb-4 text-lg font-bold text-bbq-red">
                <i class="fa-solid fa-drumstick-bite mr-2"></i>Carnes
              </h3>
              <div class="mb-4 grid grid-cols-2 gap-4">
                <div class="rounded-xl bg-red-50 p-4 text-center dark:bg-red-950/30">
                  <p class="mb-1 text-xs text-muted-foreground">Mínimo</p>
                  <p class="text-xl font-bold text-bbq-red">{{ resultado.carneMin }} Kg</p>
                </div>
                <div class="rounded-xl border-2 border-bbq-red/30 bg-red-100 p-4 text-center dark:bg-red-950/50">
                  <p class="mb-1 text-xs text-muted-foreground">Recomendado</p>
                  <p class="text-xl font-bold text-bbq-red">{{ resultado.carneMax }} Kg</p>
                </div>
              </div>
              <p class="text-xs text-muted-foreground">
                <i class="fa-solid fa-lightbulb mr-1 text-yellow-500"></i>Sugestões: Fraldinha,
                Contra-Filé, Alcatra, Costela, Picanha, Maminha, Cupim, Filé Mignon
              </p>
            </div>
          </div>

          <!-- Acompanhamentos -->
          <ListaResultado
            titulo="Acompanhamentos"
            icone="fa-solid fa-bread-slice"
            cor="text-bbq-orange"
            barra="from-orange-500 to-amber-500"
            :itens="resultado.acompanhamentos"
          />

          <!-- Bebidas -->
          <ListaResultado
            titulo="Bebidas"
            icone="fa-solid fa-wine-glass"
            cor="text-blue-600"
            barra="from-blue-500 to-cyan-500"
            :itens="resultado.bebidas"
            colunas
          />

          <!-- Destilados -->
          <ListaResultado
            titulo="Destilados"
            icone="fa-solid fa-whiskey-glass"
            cor="text-amber-700 dark:text-amber-400"
            barra="from-amber-600 to-amber-800"
            :itens="resultado.destilados"
            colunas
          />
        </div>

        <!-- Placeholder -->
        <div
          v-else
          class="flex items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 shadow-lg"
        >
          <div class="text-center">
            <i class="fa-solid fa-fire mb-4 text-6xl text-muted-foreground/30"></i>
            <p class="text-lg text-muted-foreground">
              Preencha o formulário e clique em <strong>Calcular</strong>
            </p>
            <p class="mt-2 text-sm text-muted-foreground">Os resultados aparecerão aqui</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import Swal from 'sweetalert2'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import CampoNumero from '@/components/CampoNumero.vue'
import ListaResultado from '@/components/ListaResultado.vue'
import { useCalculadoraStore } from '@/stores/calculadora'
import { useLoading } from '@/composables/useLoading'
import {
  churrascoSchema,
  gerarResumoTexto,
  calcularCusto,
  brl,
  PRESETS,
  PRECOS_PADRAO,
  type Apetite,
  type PresetChurrasco,
} from '@/lib/calculadora'

const store = useCalculadoraStore()
const { resultado } = storeToRefs(store)
const { withLoading } = useLoading()

const { errors, handleSubmit, resetForm, defineField, setValues } = useForm({
  validationSchema: toTypedSchema(churrascoSchema),
  initialValues: { homens: 0, mulheres: 0, criancas: 0, duracao: 4, apetite: 'normal' as Apetite },
})

const [homens] = defineField('homens')
const [mulheres] = defineField('mulheres')
const [criancas] = defineField('criancas')
const [duracao] = defineField('duracao')
const [apetite] = defineField('apetite')

const apetiteOpcoes: { valor: Apetite; label: string; icone: string; dica: string }[] = [
  { valor: 'leve', label: 'Leve', icone: 'fa-solid fa-feather', dica: 'Grupo que come menos (-20%)' },
  { valor: 'normal', label: 'Normal', icone: 'fa-solid fa-utensils', dica: 'Consumo médio brasileiro' },
  { valor: 'reforcado', label: 'Reforçado', icone: 'fa-solid fa-drumstick-bite', dica: 'Grupo que come bastante (+25%)' },
]

// Preços editáveis (cópia local para o usuário ajustar)
const precos = reactive<Record<string, number>>({ ...PRECOS_PADRAO })
const editandoPrecos = ref(false)

const custo = computed(() =>
  resultado.value ? calcularCusto(resultado.value, precos) : { total: 0, itens: [] },
)

// Restaura o último input calculado (persistido) para manter o form coerente.
onMounted(() => {
  if (store.ultimoInput) {
    setValues(store.ultimoInput)
  }
})

function aplicarPreset(preset: PresetChurrasco) {
  setValues({ ...preset.input, apetite: apetite.value ?? 'normal' })
}

function restaurarPrecos() {
  Object.assign(precos, PRECOS_PADRAO)
}

const onSubmit = handleSubmit(async (values) => {
  await withLoading(async () => {
    // Pequeno atraso para o overlay ser perceptível em cálculos instantâneos.
    await new Promise((r) => setTimeout(r, 250))
    store.calcular(values)
  }, 'Calculando seu churrasco...')

  Swal.fire({
    icon: 'success',
    title: 'Cálculo realizado!',
    text: 'Veja abaixo a lista completa e o custo estimado do seu churrasco.',
    confirmButtonColor: '#ea580c',
    timer: 1800,
    showConfirmButton: false,
    customClass: { popup: 'rounded-2xl' },
  })
})

function onReset() {
  resetForm()
  store.limpar()
  Swal.fire({
    icon: 'info',
    title: 'Formulário limpo',
    text: 'Todos os campos foram resetados.',
    confirmButtonColor: '#ea580c',
    timer: 1400,
    showConfirmButton: false,
    customClass: { popup: 'rounded-2xl' },
  })
}

function imprimir() {
  window.print()
}

function baixar() {
  if (!resultado.value) return
  const texto = gerarResumoTexto(resultado.value, custo.value.total)
  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'lista-churrasco.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

async function compartilhar() {
  if (!resultado.value) return
  const texto = `Para ${resultado.value.adultos} adultos e ${resultado.value.criancas} crianças em ${resultado.value.duracao}h: ${resultado.value.carneMax} Kg de carne. Custo estimado ${brl(custo.value.total)}.`
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Meu Churrasco Calculado', text: texto, url: window.location.href })
    } catch {
      /* cancelado pelo usuário */
    }
  } else {
    try {
      await navigator.clipboard.writeText(`${texto} ${window.location.href}`)
      Swal.fire({
        icon: 'success',
        title: 'Copiado!',
        text: 'Resumo copiado para a área de transferência.',
        confirmButtonColor: '#ea580c',
        timer: 1600,
        showConfirmButton: false,
        customClass: { popup: 'rounded-2xl' },
      })
    } catch {
      Swal.fire({
        icon: 'info',
        title: 'Compartilhar',
        text: 'Copie o link da página para compartilhar seu cálculo!',
        confirmButtonColor: '#ea580c',
        customClass: { popup: 'rounded-2xl' },
      })
    }
  }
}
</script>
