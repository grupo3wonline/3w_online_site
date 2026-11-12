<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'

type Sexo = 'male' | 'female'

interface DadosUsuario { altura: number; peso: number; idade: number; sexo: Sexo; atividade: number }

interface ResultadoIMC {
  imc: number; imcCategoria: string; pesoIdealFaixa: { min: number; max: number }
  calorias: number; proteina: number; carboidrato: number
  agua: { litros: number; garrafas: string; copos: string }
  tmb: number; get: number
  pesoIdeal: { pesoMin: number; pesoMed: number; pesoMax: number; nota: string }
}

const NIVEIS_ATIVIDADE = [
  { valor: 1.2, label: 'Sedentário (pouco ou nenhum exercício)' },
  { valor: 1.375, label: 'Leve (exercício 1-3 dias/semana)' },
  { valor: 1.55, label: 'Moderado (exercício 3-5 dias/semana)' },
  { valor: 1.725, label: 'Ativo (exercício 6-7 dias/semana)' },
  { valor: 1.9, label: 'Muito Ativo (exercício intenso, 2x/dia)' },
]

const form = reactive({ altura: '', peso: '', idade: '', sexo: '' as Sexo | '', atividade: '' as number | '' })
const resultado = ref<ResultadoIMC | null>(null)
const historico = ref<{ data: string; imc: number; categoria: string }[]>((() => {
  try { return JSON.parse(localStorage.getItem('imc-historico') || '[]') } catch { return [] }
})())

function getCategoria(imc: number): string {
  if (imc < 18.5) return 'Abaixo do peso'
  if (imc < 25) return 'Peso normal'
  if (imc < 30) return 'Sobrepeso'
  if (imc < 35) return 'Obesidade grau I'
  if (imc < 40) return 'Obesidade grau II'
  return 'Obesidade grau III'
}

function categoriaColor(cat: string): string {
  if (cat === 'Peso normal') return 'text-green-400'
  if (cat === 'Abaixo do peso') return 'text-blue-400'
  if (cat === 'Sobrepeso') return 'text-yellow-400'
  return 'text-red-400'
}

function calcular() {
  const altura = Number(form.altura)
  const peso = Number(form.peso)
  const idade = Number(form.idade)
  if (!altura || !peso || !idade || !form.sexo || !form.atividade) {
    Swal.fire({ icon: 'warning', title: 'Preencha todos os campos', confirmButtonColor: '#10b981' }); return
  }
  if (altura < 0.5 || altura > 2.5) { Swal.fire({ icon: 'warning', title: 'Altura inválida (0.5m–2.5m)' }); return }
  if (peso < 2 || peso > 500) { Swal.fire({ icon: 'warning', title: 'Peso inválido' }); return }

  const atividade = Number(form.atividade)
  const imc = peso / (altura * altura)
  const imcCategoria = getCategoria(imc)

  // TMB Harris-Benedict
  const tmb = form.sexo === 'male'
    ? 66 + 13.75 * peso + 5 * altura * 100 - 6.75 * idade
    : 655 + 9.56 * peso + 1.85 * altura * 100 - 4.68 * idade
  const get = tmb * atividade
  const calorias = Math.ceil((13.75 * peso + 5 * (altura * 100) - 6.76 * idade + 66.5) * atividade)
  const proteina = Math.ceil(peso * 1.6)
  const carboidrato = Math.ceil(peso * 6.5)

  // Hidratação
  const litros = Math.round(((peso * 35) / 1000) * 1000) / 1000
  const garrafas = Math.ceil((litros / 500) * 1000) + ' garrafas 500ml'
  const copos = Math.ceil((litros / 250) * 1000) + ' copos 250ml'

  // Peso ideal
  const pesoMin = Math.ceil(18.5 * altura * altura)
  const pesoMax = Math.ceil(24.9 * altura * altura)
  const pesoMed = Math.ceil((pesoMin + pesoMax) / 2)
  let nota = ''
  if (peso < pesoMin) nota = `Seu peso (${peso}kg) está abaixo do mínimo (${pesoMin}kg). Considere ganhar ${pesoMin - Math.ceil(peso)}kg.`
  else if (peso > pesoMax) nota = `Seu peso (${peso}kg) está acima do máximo (${pesoMax}kg). Considere perder ${Math.ceil(peso) - pesoMax}kg.`
  else nota = `Parabéns! Seu peso (${peso}kg) está na faixa ideal (${pesoMin}–${pesoMax}kg).`

  resultado.value = {
    imc: Math.round(imc * 100) / 100, imcCategoria,
    pesoIdealFaixa: { min: pesoMin, max: pesoMax },
    calorias, proteina, carboidrato,
    agua: { litros, garrafas, copos },
    tmb: Math.round(tmb), get: Math.round(get),
    pesoIdeal: { pesoMin, pesoMed, pesoMax, nota },
  }

  // Salvar histórico
  const entry = { data: new Date().toLocaleDateString('pt-BR'), imc: Math.round(imc * 100) / 100, categoria: imcCategoria }
  historico.value = [entry, ...historico.value.slice(0, 4)]
  try { localStorage.setItem('imc-historico', JSON.stringify(historico.value)) } catch { /* noop */ }

  Swal.fire({ icon: 'success', title: 'IMC calculado!', html: `IMC: <strong>${resultado.value.imc}</strong> — ${imcCategoria}`, timer: 1800, showConfirmButton: false })
}

function limpar() { form.altura = ''; form.peso = ''; form.idade = ''; form.sexo = ''; form.atividade = ''; resultado.value = null }

const imcGauge = computed(() => {
  if (!resultado.value) return 0
  return Math.min(100, (resultado.value.imc / 40) * 100)
})
</script>

<template>
  <ToolShell

    title="Calculadora de IMC & Saúde"

    description="Calcule IMC, peso ideal, calorias, hidratação e taxas metabólicas."

    icon="fa-heart-pulse"

    icon-gradient="from-emerald-500 to-teal-700"

    orb-color="emerald"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="grid lg:grid-cols-5 gap-6">
      <!-- Formulário -->
      <div class="lg:col-span-2 glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold text-sm flex items-center gap-2">
          <i class="fas fa-user-circle text-emerald-400" aria-hidden="true"></i>
          Seus Dados
        </h2>
        <div class="space-y-3">
          <div>
            <label class="input-aurora-label">Altura (m) — ex: 1.75</label>
            <input v-model="form.altura" type="number" step="0.01" min="0.5" max="2.5" autocomplete="off" placeholder="1.75"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Peso (kg)</label>
            <input v-model="form.peso" type="number" step="0.1" min="1" autocomplete="off" placeholder="70"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Idade (anos)</label>
            <input v-model="form.idade" type="number" min="1" max="120" autocomplete="off" placeholder="30"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Sexo</label>
            <div class="grid grid-cols-2 gap-2">
              <button v-for="s in [{ v: 'male', l: 'Masculino' }, { v: 'female', l: 'Feminino' }]" :key="s.v"
                type="button" @click="form.sexo = s.v as Sexo"
                :class="['border rounded-lg py-2 text-sm transition-all', form.sexo === s.v ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' : 'border-white/10 text-blue-200 hover:bg-white/5']">
                {{ s.l }}
              </button>
            </div>
          </div>
          <div>
            <label class="input-aurora-label">Nível de Atividade</label>
            <select v-model="form.atividade" autocomplete="off"
              class="w-full input-aurora">
              <option value="" disabled>Selecione</option>
              <option v-for="n in NIVEIS_ATIVIDADE" :key="n.valor" :value="n.valor">{{ n.label }}</option>
            </select>
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="calcular"
            class="btn-aurora btn-aurora-success flex-1 flex items-center justify-center gap-2">
            <i class="fas fa-calculator w-4 h-4" aria-hidden="true"></i> Calcular IMC
          </button>
          <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white py-2.5 px-3 rounded-lg transition-colors text-sm" title="Limpar campos" aria-label="Limpar campos">
            <i class="fas fa-rotate-left w-4 h-4" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <!-- Resultados -->
      <div class="lg:col-span-3 space-y-4">
        <template v-if="resultado">
          <!-- IMC Principal -->
          <div class="glass-panel p-5">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-white font-semibold">Seu IMC</h3>
              <span :class="['text-sm font-bold', categoriaColor(resultado.imcCategoria)]">{{ resultado.imcCategoria }}</span>
            </div>
            <div class="text-5xl font-extrabold text-white mb-3">{{ resultado.imc }}</div>
            <!-- Barra de IMC -->
            <div class="relative h-3 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-600 rounded-full mb-1">
              <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-900 shadow"
                :style="{ left: `${Math.min(95, Math.max(2, imcGauge))}%` }"></div>
            </div>
            <div class="flex justify-between text-xs text-blue-300">
              <span>Abaixo (18.5)</span><span>Normal (25)</span><span>Sobrepeso (30)</span><span>Obesidade</span>
            </div>
          </div>

          <!-- Métricas grid -->
          <div class="grid grid-cols-2 gap-3">
            <div class="glass-panel p-4">
              <div class="text-blue-300 text-xs mb-1">Peso ideal (faixa)</div>
              <div class="text-white font-bold">{{ resultado.pesoIdealFaixa.min }}–{{ resultado.pesoIdealFaixa.max }} kg</div>
              <div class="text-blue-200 text-xs mt-1 leading-tight">{{ resultado.pesoIdeal.nota }}</div>
            </div>
            <div class="glass-panel p-4">
              <div class="text-blue-300 text-xs mb-1">Calorias/dia</div>
              <div class="text-white font-bold text-xl">{{ resultado.calorias.toLocaleString('pt-BR') }}</div>
              <div class="text-blue-200 text-xs mt-1">TMB: {{ resultado.tmb }} | GET: {{ resultado.get }}</div>
            </div>
            <div class="glass-panel p-4">
              <div class="text-blue-300 text-xs mb-1">Hidratação</div>
              <div class="text-white font-bold text-xl">{{ resultado.agua.litros }}L</div>
              <div class="text-blue-200 text-xs mt-1">{{ resultado.agua.garrafas }} ou {{ resultado.agua.copos }}</div>
            </div>
            <div class="glass-panel p-4">
              <div class="text-blue-300 text-xs mb-1">Macronutrientes/dia</div>
              <div class="text-xs space-y-0.5">
                <div class="flex justify-between"><span class="text-blue-200">Proteínas</span><span class="text-white">{{ resultado.proteina }}g</span></div>
                <div class="flex justify-between"><span class="text-blue-200">Carboidratos</span><span class="text-white">{{ resultado.carboidrato }}g</span></div>
              </div>
            </div>
          </div>
        </template>

        <div v-else class="glass-panel flex items-center justify-center p-12">
          <div class="text-center">
            <i class="fas fa-heart-pulse text-5xl text-emerald-400/20 mb-4 block" aria-hidden="true"></i>
            <p class="text-blue-200 text-sm">Preencha seus dados e calcule o IMC</p>
          </div>
        </div>

        <!-- Histórico -->
        <div v-if="historico.length" class="glass-panel p-4">
          <h3 class="text-white text-sm font-semibold mb-2 flex items-center gap-2">
            <i class="fas fa-clock-rotate-left w-4 h-4 text-blue-400" aria-hidden="true"></i> Histórico
          </h3>
          <div class="space-y-1">
            <div v-for="(h, i) in historico" :key="i" class="flex justify-between text-xs">
              <span class="text-blue-300">{{ h.data }}</span>
              <span class="text-white">IMC {{ h.imc }}</span>
              <span :class="categoriaColor(h.categoria)">{{ h.categoria }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  


  </ToolShell></template>