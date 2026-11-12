<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'

type Gender        = 'male' | 'female'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
type Goal          = 'lose' | 'maintain' | 'gain'

interface HealthMetrics {
  bmi:            number
  bmiCategory:    string
  bmr:            number
  tdee:           number
  targetCalories: number
  protein:        number
  carbs:          number
  fat:            number
  water:          number
  idealWeightMin: number
  idealWeightMax: number
}

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary:    1.2,
  light:        1.375,
  moderate:     1.55,
  active:       1.725,
  'very-active':1.9,
}

const activityOptions = [
  { value: 'sedentary',    label: 'Sedentário (pouco ou nenhum exercício)' },
  { value: 'light',        label: 'Leve (exercício 1–3 dias/semana)' },
  { value: 'moderate',     label: 'Moderado (exercício 3–5 dias/semana)' },
  { value: 'active',       label: 'Ativo (exercício 6–7 dias/semana)' },
  { value: 'very-active',  label: 'Muito Ativo (exercício intenso, 2×/dia)' },
]

const goalOptions = [
  { value: 'lose',     label: 'Perder peso',   icon: 'fa-arrow-trend-down', adj: -500 },
  { value: 'maintain', label: 'Manter peso',   icon: 'fa-equals',           adj:    0 },
  { value: 'gain',     label: 'Ganhar massa',  icon: 'fa-arrow-trend-up',   adj:  300 },
]

const form = reactive({
  height:        '' as number | '',
  weight:        '' as number | '',
  age:           '' as number | '',
  gender:        '' as Gender | '',
  activityLevel: '' as ActivityLevel | '',
  goal:          '' as Goal | '',
})

const resultado  = ref<HealthMetrics | null>(null)
const isLoading  = ref(false)

// ─── Categorias IMC ───────────────────────────────────────────────
function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Abaixo do peso'
  if (bmi < 25)   return 'Peso normal'
  if (bmi < 30)   return 'Sobrepeso'
  if (bmi < 35)   return 'Obesidade I'
  return 'Obesidade II+'
}

function bmiColorClass(cat: string): string {
  if (cat === 'Peso normal')      return 'text-emerald-400'
  if (cat === 'Abaixo do peso')   return 'text-blue-400'
  if (cat === 'Sobrepeso')        return 'text-amber-400'
  return 'text-red-400'
}

function bmiBarClass(cat: string): string {
  if (cat === 'Peso normal')      return 'bg-emerald-500'
  if (cat === 'Abaixo do peso')   return 'bg-blue-500'
  if (cat === 'Sobrepeso')        return 'bg-amber-500'
  return 'bg-red-500'
}

function bmiBarWidth(bmi: number): string {
  return `${Math.min(100, Math.max(5, (bmi / 40) * 100))}%`
}

// ─── Cálculo ──────────────────────────────────────────────────────
function calcular() {
  const { height, weight, age, gender, activityLevel, goal } = form

  if (!height || !weight || !age || !gender || !activityLevel || !goal) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Preencha todos os campos para calcular seu plano de saúde.',
      confirmButtonColor: '#059669',
    })
    return
  }

  if (Number(height) < 100 || Number(height) > 250) {
    Swal.fire({ icon: 'warning', title: 'Altura inválida', text: 'Informe a altura em centímetros (100–250 cm).', confirmButtonColor: '#059669' })
    return
  }
  if (Number(weight) < 20 || Number(weight) > 500) {
    Swal.fire({ icon: 'warning', title: 'Peso inválido', text: 'Informe o peso em quilogramas (20–500 kg).', confirmButtonColor: '#059669' })
    return
  }

  isLoading.value = true

  const h   = Number(height) / 100   // cm → m
  const w   = Number(weight)
  const a   = Number(age)
  const bmi = w / (h * h)

  // TMB Harris-Benedict
  const bmr = gender === 'male'
    ? 66 + 13.75 * w + 5 * Number(height) - 6.75 * a
    : 655 + 9.56 * w + 1.85 * Number(height) - 4.68 * a

  const tdee    = bmr * activityMultipliers[activityLevel as ActivityLevel]
  const goalAdj = goalOptions.find(g => g.value === goal)?.adj ?? 0
  const targetCalories = Math.round(tdee + goalAdj)

  const protein = Math.round(w * 1.6)
  const fat     = Math.round(targetCalories * 0.25 / 9)
  const carbs   = Math.round((targetCalories - protein * 4 - fat * 9) / 4)
  const water   = Math.round(w * 35 / 1000 * 10) / 10

  const idealWeightMin = Math.round(18.5 * h * h)
  const idealWeightMax = Math.round(24.9 * h * h)

  resultado.value = {
    bmi:            Math.round(bmi * 100) / 100,
    bmiCategory:    bmiCategory(bmi),
    bmr:            Math.round(bmr),
    tdee:           Math.round(tdee),
    targetCalories,
    protein,
    carbs,
    fat,
    water,
    idealWeightMin,
    idealWeightMax,
  }

  isLoading.value = false

  Swal.fire({
    icon:              'success',
    title:             'Plano de saúde calculado!',
    html:              `IMC: <strong>${resultado.value.bmi}</strong> — <strong>${resultado.value.bmiCategory}</strong>`,
    confirmButtonColor:'#059669',
    timer:             2000,
    showConfirmButton: false,
  })
}

function limpar() {
  form.height        = ''
  form.weight        = ''
  form.age           = ''
  form.gender        = ''
  form.activityLevel = ''
  form.goal          = ''
  resultado.value    = null
}
</script>

<template>
  <ToolShell
    title="Calculadora de Saúde"
    description="Calcule IMC, TMB, GET, calorias por objetivo, macronutrientes e hidratação diária recomendada."
    icon="fa-stethoscope"
    icon-gradient="from-green-500 to-teal-700"
    orb-color="emerald"
    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side', 'Harris-Benedict 2024']"
    :tips="[
      { title: 'TMB (Taxa Metabólica Basal)', text: 'Quantidade de calorias que seu corpo precisa em repouso total. Calculada pela fórmula de Harris-Benedict.' },
      { title: 'GET (Gasto Energético Total)', text: 'TMB multiplicada pelo fator de atividade física. É a quantidade real de calorias que você gasta por dia.', type: 'info' },
      { title: 'Objetivo de peso', text: 'Perda de peso = déficit de 500 kcal/dia. Ganho de massa = superávit de 300 kcal/dia. Manter = GET atual.', type: 'info' },
      { title: 'Hidratação', text: 'A recomendação de 35ml/kg/dia é um guia geral. Ajuste conforme temperatura, atividade e condições de saúde.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Homem 30 anos, 70kg, 175cm', desc: 'Atividade moderada | Objetivo: manter peso', result: 'IMC 22,9 | 2.730 kcal/dia | 2,45L água' },
      { title: 'Mulher 25 anos, 60kg, 165cm', desc: 'Atividade leve | Objetivo: perder peso', result: 'IMC 22,0 | 1.650 kcal/dia | 2,10L água' },
      { title: 'Atleta 35 anos, 85kg, 180cm', desc: 'Muito ativo | Objetivo: ganhar massa', result: 'IMC 26,2 | 3.650 kcal/dia | 2,98L água' },
    ]"
  >

    <div class="grid lg:grid-cols-5 gap-6">
      <!-- ── Formulário ─────────────────────────────────────── -->
      <div class="lg:col-span-2 glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold text-sm flex items-center gap-2">
          <i class="fas fa-user-circle text-emerald-400" aria-hidden="true"></i>
          Seus Dados
        </h2>

        <!-- Altura / Peso / Idade -->
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label for="health-height" class="input-aurora-label">Altura (cm)</label>
            <input
              id="health-height"
              v-model.number="form.height"
              type="number"
              min="100"
              max="250"
              autocomplete="off"
              placeholder="175"
              class="w-full input-aurora"
            />
          </div>
          <div>
            <label for="health-weight" class="input-aurora-label">Peso (kg)</label>
            <input
              id="health-weight"
              v-model.number="form.weight"
              type="number"
              min="20"
              max="500"
              autocomplete="off"
              placeholder="70"
              class="w-full input-aurora"
            />
          </div>
          <div>
            <label for="health-age" class="input-aurora-label">Idade</label>
            <input
              id="health-age"
              v-model.number="form.age"
              type="number"
              min="1"
              max="120"
              autocomplete="off"
              placeholder="30"
              class="w-full input-aurora"
            />
          </div>
        </div>

        <!-- Sexo -->
        <div>
          <label class="input-aurora-label" id="health-gender-label">Sexo Biológico</label>
          <div class="grid grid-cols-2 gap-2" role="group" aria-labelledby="health-gender-label">
            <button
              v-for="s in [{ v: 'male', l: 'Masculino', icon: 'fa-mars' }, { v: 'female', l: 'Feminino', icon: 'fa-venus' }]"
              :key="s.v"
              type="button"
              :aria-pressed="form.gender === s.v"
              :class="[
                'border rounded-lg py-2.5 text-sm transition-all flex items-center justify-center gap-1.5 font-medium',
                form.gender === s.v
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                  : 'border-white/10 text-blue-200 hover:bg-white/5',
              ]"
              @click="form.gender = s.v as Gender"
            >
              <i :class="['fas', s.icon]" aria-hidden="true"></i>
              {{ s.l }}
            </button>
          </div>
        </div>

        <!-- Nível de atividade -->
        <div>
          <label for="health-activity" class="input-aurora-label">Nível de Atividade</label>
          <select
            id="health-activity"
            v-model="form.activityLevel"
            autocomplete="off"
            class="w-full input-aurora"
          >
            <option value="" disabled>Selecione...</option>
            <option v-for="a in activityOptions" :key="a.value" :value="a.value">{{ a.label }}</option>
          </select>
        </div>

        <!-- Objetivo -->
        <div>
          <label class="input-aurora-label" id="health-goal-label">Objetivo</label>
          <div class="grid grid-cols-3 gap-2" role="group" aria-labelledby="health-goal-label">
            <button
              v-for="g in goalOptions"
              :key="g.value"
              type="button"
              :aria-pressed="form.goal === g.value"
              :class="[
                'border rounded-lg py-2.5 text-xs font-medium transition-all flex flex-col items-center gap-1',
                form.goal === g.value
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                  : 'border-white/10 text-blue-200 hover:bg-white/5',
              ]"
              @click="form.goal = g.value as Goal"
            >
              <i :class="['fas', g.icon]" aria-hidden="true"></i>
              <span>{{ g.label }}</span>
            </button>
          </div>
        </div>

        <!-- Ações -->
        <div class="flex gap-3 pt-1">
          <BaseButton
            variant="success"
            icon="fa-calculator"
            :loading="isLoading"
            class="flex-1"
            @click="calcular"
          >
            Calcular
          </BaseButton>
          <BaseButton
            variant="ghost"
            icon="fa-rotate-left"
            tooltip="Limpar todos os campos"
            @click="limpar"
          />
        </div>
      </div>

      <!-- ── Resultados ─────────────────────────────────────── -->
      <div class="lg:col-span-3 space-y-4">
        <Transition name="slide-up">
          <div v-if="resultado" class="space-y-4 animate-fade-in-up">

            <!-- IMC em destaque -->
            <div class="glass-panel p-5">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <div class="text-blue-300 text-xs font-medium mb-0.5">Índice de Massa Corporal (IMC)</div>
                  <div class="text-5xl font-black text-white">{{ resultado.bmi }}</div>
                </div>
                <div class="text-right">
                  <span :class="['text-base font-black', bmiColorClass(resultado.bmiCategory)]">
                    {{ resultado.bmiCategory }}
                  </span>
                  <div class="text-blue-200 text-xs mt-1">
                    Peso ideal: {{ resultado.idealWeightMin }}–{{ resultado.idealWeightMax }} kg
                  </div>
                </div>
              </div>
              <!-- Barra de IMC -->
              <div class="strength-track" role="progressbar" :aria-valuenow="resultado.bmi" aria-valuemin="0" aria-valuemax="40">
                <div
                  :class="['strength-bar', bmiBarClass(resultado.bmiCategory)]"
                  :style="{ width: bmiBarWidth(resultado.bmi) }"
                ></div>
              </div>
              <div class="flex justify-between text-[10px] text-blue-300/50 mt-1">
                <span>Abaixo do peso &lt;18,5</span>
                <span>Normal 18,5–24,9</span>
                <span>Sobrepeso &gt;25</span>
              </div>
            </div>

            <!-- Calorias + Água -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass">
                <div class="metric-glass-value text-amber-400">{{ resultado.targetCalories.toLocaleString('pt-BR') }}</div>
                <div class="metric-glass-label">Calorias/dia</div>
                <div class="text-[10px] text-blue-300/60 mt-0.5">GET: {{ resultado.tdee }} | TMB: {{ resultado.bmr }}</div>
              </div>
              <div class="metric-glass">
                <div class="metric-glass-value text-cyan-400">{{ resultado.water }}L</div>
                <div class="metric-glass-label">Água/dia</div>
                <div class="text-[10px] text-blue-300/60 mt-0.5">≈ {{ Math.ceil(resultado.water / 0.25) }} copos 250ml</div>
              </div>
            </div>

            <!-- Macronutrientes -->
            <div class="glass-panel p-5">
              <h3 class="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <i class="fas fa-pie-chart text-primary-400" aria-hidden="true"></i>
                Macronutrientes Diários
              </h3>
              <div class="grid grid-cols-3 gap-3 text-center">
                <div
                  v-for="macro in [
                    { label: 'Proteína',     value: resultado.protein, unit: 'g', color: 'bg-blue-500',   badge: 'badge-aurora-blue',   kcal: resultado.protein * 4   },
                    { label: 'Carboidratos', value: resultado.carbs,   unit: 'g', color: 'bg-yellow-400', badge: 'badge-aurora-orange',  kcal: resultado.carbs * 4     },
                    { label: 'Gorduras',     value: resultado.fat,     unit: 'g', color: 'bg-red-400',    badge: 'badge-aurora bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300', kcal: resultado.fat * 9 },
                  ]"
                  :key="macro.label"
                  class="bg-black/20 rounded-xl p-3"
                >
                  <div :class="['w-3 h-3 rounded-full mx-auto mb-2', macro.color]" aria-hidden="true"></div>
                  <div class="text-2xl font-black text-white">{{ macro.value }}<span class="text-sm font-medium text-blue-300">{{ macro.unit }}</span></div>
                  <div class="text-blue-200 text-xs mt-1">{{ macro.label }}</div>
                  <div class="text-[10px] text-blue-300/50 mt-0.5">{{ macro.kcal }} kcal</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Estado vazio -->
          <div v-else class="glass-panel flex items-center justify-center p-14">
            <div class="text-center">
              <i class="fas fa-heart-pulse text-5xl text-emerald-400/20 mb-4 block" aria-hidden="true"></i>
              <p class="text-blue-200 text-sm font-medium">Preencha seus dados ao lado</p>
              <p class="text-blue-300/50 text-xs mt-1">O resultado aparecerá aqui em tempo real</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>

  </ToolShell>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s ease;
}
.slide-up-enter-from {
  transform: translateY(12px);
  opacity: 0;
}
.slide-up-leave-to {
  opacity: 0;
}
</style>
