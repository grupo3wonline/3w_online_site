<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type Gender = 'male' | 'female'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
type Goal = 'lose' | 'maintain' | 'gain'

interface HealthMetrics {
  bmi: number; bmiCategory: string; bmr: number; tdee: number
  targetCalories: number; protein: number; carbs: number; fat: number
  water: number; idealWeightMin: number; idealWeightMax: number
}

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, 'very-active': 1.9
}
const activityOptions = [
  { value: 'sedentary', label: 'Sedentário (pouco ou nenhum exercício)' },
  { value: 'light', label: 'Leve (exercício leve 1-3 dias/semana)' },
  { value: 'moderate', label: 'Moderado (exercício 3-5 dias/semana)' },
  { value: 'active', label: 'Ativo (exercício 6-7 dias/semana)' },
  { value: 'very-active', label: 'Muito Ativo (exercício intenso, 2x/dia)' },
]
const goalOptions = [
  { value: 'lose', label: 'Perder peso', icon: 'mdi:trending-down', adj: -500 },
  { value: 'maintain', label: 'Manter peso', icon: 'mdi:equal', adj: 0 },
  { value: 'gain', label: 'Ganhar massa', icon: 'mdi:trending-up', adj: 300 },
]

const form = reactive({ height: 0, weight: 0, age: 0, gender: '' as Gender | '', activityLevel: '' as ActivityLevel | '', goal: '' as Goal | '' })
const resultado = ref<HealthMetrics | null>(null)

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Abaixo do peso'
  if (bmi < 25) return 'Peso normal'
  if (bmi < 30) return 'Sobrepeso'
  if (bmi < 35) return 'Obesidade I'
  return 'Obesidade II+'
}

function calcular() {
  const { height, weight, age, gender, activityLevel, goal } = form
  if (!height || !weight || !age || !gender || !activityLevel || !goal) {
    Swal.fire({ icon: 'warning', title: 'Preencha todos os campos', confirmButtonColor: '#059669' }); return
  }
  const h = height / 100 // cm → m
  const bmi = weight / (h * h)
  // BMR Harris-Benedict
  const bmr = gender === 'male'
    ? 66 + 13.75 * weight + 5 * height - 6.75 * age
    : 655 + 9.56 * weight + 1.85 * height - 4.68 * age
  const tdee = bmr * activityMultipliers[activityLevel]
  const goalAdj = goalOptions.find(g => g.value === goal)?.adj ?? 0
  const targetCalories = Math.round(tdee + goalAdj)
  const protein = Math.round(weight * 1.6)
  const fat = Math.round(targetCalories * 0.25 / 9)
  const carbs = Math.round((targetCalories - protein * 4 - fat * 9) / 4)
  const water = Math.round(weight * 35 / 1000 * 10) / 10
  const idealWeightMin = Math.round(18.5 * h * h)
  const idealWeightMax = Math.round(24.9 * h * h)

  resultado.value = {
    bmi: Math.round(bmi * 100) / 100, bmiCategory: bmiCategory(bmi),
    bmr: Math.round(bmr), tdee: Math.round(tdee), targetCalories,
    protein, carbs, fat, water, idealWeightMin, idealWeightMax,
  }
  Swal.fire({
    icon: 'success',
    title: 'Plano calculado!',
    text: `IMC: ${resultado.value.bmi} — ${resultado.value.bmiCategory}`,
    confirmButtonColor: '#059669',
    timer: 2000, showConfirmButton: false,
  })
}

function limpar() {
  form.height = 0; form.weight = 0; form.age = 0; form.gender = ''; form.activityLevel = ''; form.goal = ''
  resultado.value = null
}

function bmiColor(cat: string): string {
  if (cat === 'Peso normal') return 'text-green-400'
  if (cat === 'Abaixo do peso') return 'text-blue-400'
  if (cat === 'Sobrepeso') return 'text-yellow-400'
  return 'text-red-400'
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:heart-pulse" class="text-green-400 w-7 h-7" />
        Calculadora de Saúde
      </h1>
      <p class="text-blue-200 text-sm">Calcule IMC, calorias, macros, hidratação e seu plano de saúde personalizado</p>
    </div>

    <div class="grid lg:grid-cols-5 gap-6">
      <!-- Formulário -->
      <div class="lg:col-span-2 bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:account-outline" class="text-green-400 w-5 h-5" />
          Seus Dados
        </h2>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Altura (cm)</label>
              <input v-model.number="form.height" type="number" min="100" max="250" autocomplete="off" placeholder="175"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Peso (kg)</label>
              <input v-model.number="form.weight" type="number" min="1" autocomplete="off" placeholder="70"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Idade</label>
              <input v-model.number="form.age" type="number" min="1" max="120" autocomplete="off" placeholder="30"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50" />
            </div>
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Sexo</label>
            <div class="grid grid-cols-2 gap-2">
              <button v-for="s in [{ v: 'male', l: 'Masculino' }, { v: 'female', l: 'Feminino' }]" :key="s.v"
                type="button" @click="form.gender = s.v as Gender"
                :class="['border rounded-lg py-2 text-sm transition-all', form.gender === s.v ? 'border-green-500 bg-green-500/20 text-green-300' : 'border-white/10 text-blue-200 hover:bg-white/5']">
                {{ s.l }}
              </button>
            </div>
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Nível de Atividade</label>
            <select v-model="form.activityLevel" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50">
              <option value="" disabled>Selecione</option>
              <option v-for="a in activityOptions" :key="a.value" :value="a.value">{{ a.label }}</option>
            </select>
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Objetivo</label>
            <div class="grid grid-cols-3 gap-2">
              <button v-for="g in goalOptions" :key="g.value" type="button" @click="form.goal = g.value as Goal"
                :class="['border rounded-lg py-2 text-xs font-medium transition-all flex items-center justify-center gap-1', form.goal === g.value ? 'border-green-500 bg-green-500/20 text-green-300' : 'border-white/10 text-blue-200 hover:bg-white/5']">
                <Icon :icon="g.icon" class="w-3.5 h-3.5" /> {{ g.label }}
              </button>
            </div>
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="calcular"
            class="flex-1 bg-green-700 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular
          </button>
          <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white py-2.5 px-3 rounded-lg transition-colors text-sm">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Resultados -->
      <div class="lg:col-span-3 space-y-4">
        <template v-if="resultado">
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 col-span-2">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-blue-200 text-xs">IMC</div>
                  <div class="text-4xl font-black text-white">{{ resultado.bmi }}</div>
                </div>
                <div class="text-right">
                  <span :class="['text-sm font-bold', bmiColor(resultado.bmiCategory)]">{{ resultado.bmiCategory }}</span>
                  <div class="text-blue-200 text-xs mt-1">Peso ideal: {{ resultado.idealWeightMin }}–{{ resultado.idealWeightMax }} kg</div>
                </div>
              </div>
            </div>
            <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4">
              <div class="text-blue-300 text-xs mb-1">Calorias/dia</div>
              <div class="text-2xl font-bold text-white">{{ resultado.targetCalories.toLocaleString('pt-BR') }}</div>
              <div class="text-blue-200 text-xs mt-1">TDEE: {{ resultado.tdee }} | BMR: {{ resultado.bmr }}</div>
            </div>
            <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4">
              <div class="text-blue-300 text-xs mb-1">Água/dia</div>
              <div class="text-2xl font-bold text-white">{{ resultado.water }}L</div>
              <div class="text-blue-200 text-xs mt-1">{{ Math.ceil(resultado.water / 0.25) }} copos de 250ml</div>
            </div>
          </div>
          <!-- Macros -->
          <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5">
            <h3 class="text-white font-semibold text-sm mb-3">Macronutrientes Diários</h3>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div v-for="macro in [
                { label: 'Proteína', value: resultado.protein, unit: 'g', color: 'bg-blue-500' },
                { label: 'Carboidratos', value: resultado.carbs, unit: 'g', color: 'bg-yellow-500' },
                { label: 'Gorduras', value: resultado.fat, unit: 'g', color: 'bg-red-500' },
              ]" :key="macro.label" class="bg-black/20 rounded-lg p-3">
                <div :class="['w-2 h-2 rounded-full mx-auto mb-1', macro.color]"></div>
                <div class="text-xl font-bold text-white">{{ macro.value }}{{ macro.unit }}</div>
                <div class="text-blue-200 text-xs">{{ macro.label }}</div>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="bg-[#0f1e3c] border border-white/10 rounded-xl flex items-center justify-center p-12">
          <div class="text-center">
            <Icon icon="mdi:heart-pulse" class="w-16 h-16 text-green-400/20 mx-auto mb-3" />
            <p class="text-blue-200 text-sm">Preencha seus dados para calcular seu plano de saúde</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
