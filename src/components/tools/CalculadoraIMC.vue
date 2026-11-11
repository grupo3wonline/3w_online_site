<template>
  <ToolShell
    title="Calculadora de IMC"
    description="Calcule seu Índice de Massa Corporal com análise nutricional, peso ideal e recomendações de saúde."
    icon="fa-heart-pulse"
    icon-gradient="from-rose-500 to-pink-700"
    orb-color="pink"
    :quick-tips="['Análise completa de saúde', 'Peso ideal e metas', 'Dicas nutricionais']"
    :tips="[
      { title: 'O IMC tem limitações', text: 'O IMC não diferencia massa muscular de gordura corporal. Atletas podem ter IMC alto e boa saúde. Consulte um médico para avaliação completa.' },
      { title: 'Faixa saudável',       text: 'IMC entre 18,5 e 24,9 é considerado normal pela OMS para adultos.', type: 'success' },
      { title: 'Crianças e idosos',    text: 'As tabelas de referência para crianças e idosos são diferentes. Esta calculadora é para adultos (18–65 anos).', type: 'warning' },
    ]"
    :examples="[
      { title: 'Adulto masculino',  desc: '1,75m de altura, 80kg',    result: 'IMC 26,1 — Sobrepeso leve' },
      { title: 'Adulta feminina',   desc: '1,62m de altura, 55kg',    result: 'IMC 20,9 — Peso normal' },
      { title: 'Atleta',            desc: '1,80m de altura, 95kg (muscular)', result: 'IMC 29,3 — Leitura pode ser enganosa' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- ── Formulário ─────────────────────────────────────── -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-4">
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-ruler-vertical mr-1.5 text-blue-500"></i>
                Altura
              </label>
              <div class="flex gap-2">
                <div class="flex-1">
                  <input v-model.number="alturaCm" type="number" placeholder="Ex: 175"
                    class="input-aurora" min="100" max="250" @input="calcular" />
                  <span class="input-aurora-hint">centímetros</span>
                </div>
                <div class="flex items-center px-3 text-gray-400 font-bold text-sm">ou</div>
                <div class="flex gap-1">
                  <div>
                    <input v-model.number="alturaMetros" type="number" placeholder="1" class="input-aurora w-16" min="1" max="2" @input="syncCm" />
                    <span class="input-aurora-hint">m</span>
                  </div>
                  <div>
                    <input v-model.number="alturaCentimetros" type="number" placeholder="75" class="input-aurora w-16" min="0" max="99" @input="syncCm" />
                    <span class="input-aurora-hint">cm</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label class="input-aurora-label">
                <i class="fas fa-weight-scale mr-1.5 text-purple-500"></i>
                Peso (kg)
              </label>
              <input v-model.number="peso" type="number" placeholder="Ex: 70,5"
                class="input-aurora" min="20" max="400" step="0.1" @input="calcular" />
            </div>

            <!-- Faixa etária e sexo (para cálculo de gordura corporal) -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="input-aurora-label">
                  <i class="fas fa-birthday-cake mr-1.5 text-orange-500"></i>
                  Idade (anos)
                </label>
                <input v-model.number="idade" type="number" placeholder="30" min="15" max="100"
                  class="input-aurora" @input="calcular" />
              </div>
              <div>
                <label class="input-aurora-label">
                  <i class="fas fa-venus-mars mr-1.5 text-pink-500"></i>
                  Sexo biológico
                </label>
                <select v-model="sexo" class="input-aurora" @change="calcular">
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>
            </div>

            <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="w-full">
              Calcular IMC & Saúde
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- ── Resultado ─────────────────────────────────────── -->
      <div>
        <Transition name="fade-in-up" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- IMC em destaque -->
            <div :class="['tool-result', resultado.classeCSS]">
              <div class="text-center mb-3">
                <div class="text-6xl font-black" :class="resultado.corTexto">
                  {{ resultado.imc.toFixed(1) }}
                </div>
                <div class="text-sm font-bold text-gray-700 dark:text-slate-200 mt-1">Índice de Massa Corporal</div>
                <div :class="['inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mt-2', resultado.badgeClasse]">
                  <i :class="['fas', resultado.icone]"></i>
                  {{ resultado.classificacao }}
                </div>
              </div>

              <!-- Barra visual de IMC -->
              <div class="relative mt-2">
                <div class="h-4 rounded-full overflow-hidden flex">
                  <div class="bg-blue-400"   style="width:10%" title="Muito baixo (<16)"></div>
                  <div class="bg-sky-300"    style="width:15%" title="Abaixo (<18.5)"></div>
                  <div class="bg-emerald-400"style="width:25%" title="Normal (18.5–24.9)"></div>
                  <div class="bg-yellow-400" style="width:20%" title="Sobrepeso (25–29.9)"></div>
                  <div class="bg-orange-400" style="width:15%" title="Obeso I (30–34.9)"></div>
                  <div class="bg-red-400"    style="width:10%" title="Obeso II (35–39.9)"></div>
                  <div class="bg-red-600"    style="width:5%"  title="Obeso III (≥40)"></div>
                </div>
                <!-- Marcador de posição -->
                <div
                  class="absolute top-0 w-3 h-4 bg-white dark:bg-slate-200 border-2 border-gray-700 dark:border-slate-900 rounded-sm shadow-lg -translate-x-1/2 transition-all duration-500"
                  :style="{ left: imcBarraPercent + '%' }"
                ></div>
              </div>
              <div class="flex justify-between text-[10px] text-gray-500 dark:text-slate-400 mt-1 font-mono">
                <span>16</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40+</span>
              </div>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">
                  {{ resultado.pesoIdealMin.toFixed(1) }}–{{ resultado.pesoIdealMax.toFixed(1) }}
                </div>
                <div class="metric-glass-label">Faixa de peso ideal (kg)</div>
              </div>
              <div class="metric-glass">
                <div class="metric-glass-value" :class="resultado.ajuste > 0 ? 'text-orange-500' : resultado.ajuste < 0 ? 'text-blue-500' : 'text-emerald-500'">
                  {{ resultado.ajuste > 0 ? '+' : '' }}{{ resultado.ajuste.toFixed(1) }} kg
                </div>
                <div class="metric-glass-label">{{ resultado.ajuste > 0 ? 'Para perder' : resultado.ajuste < 0 ? 'Para ganhar' : 'Peso ideal!' }}</div>
              </div>
              <div class="metric-glass">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ resultado.tmb.toFixed(0) }}</div>
                <div class="metric-glass-label">TMB (kcal/dia)</div>
              </div>
              <div class="metric-glass">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ resultado.agua.toFixed(1) }}L</div>
                <div class="metric-glass-label">Água diária recomendada</div>
              </div>
            </div>

            <!-- Recomendação -->
            <div :class="['tip-card', resultado.tipoPill]">
              <i :class="['fas', resultado.icone, 'flex-shrink-0 mt-0.5']"></i>
              <span>{{ resultado.recomendacao }}</span>
            </div>

          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel p-6 text-center text-gray-400 dark:text-slate-500">
          <i class="fas fa-heart-pulse text-3xl mb-3 opacity-30 block text-rose-400"></i>
          <p class="text-sm">Preencha altura e peso para calcular</p>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

// ─── Estado ───────────────────────────────────────────────────────
const alturaCm       = ref<number | ''>(175)
const alturaMetros   = ref<number | ''>(1)
const alturaCentimetros = ref<number | ''>(75)
const peso           = ref<number | ''>(70)
const idade          = ref<number | ''>(30)
const sexo           = ref<'masculino' | 'feminino'>('masculino')

interface ResultadoIMC {
  imc: number; classificacao: string; corTexto: string; badgeClasse: string
  icone: string; classeCSS: string; tipoPill: string
  pesoIdealMin: number; pesoIdealMax: number
  ajuste: number; tmb: number; agua: number; recomendacao: string
}

const resultado = ref<ResultadoIMC | null>(null)
const imcBarraPercent = ref(50)

// ─── Sincronização m/cm ───────────────────────────────────────────
function syncCm() {
  const m = Number(alturaMetros.value) || 0
  const c = Number(alturaCentimetros.value) || 0
  alturaCm.value = m * 100 + c
  calcular()
}

// ─── Cálculo ──────────────────────────────────────────────────────
function calcular() {
  const h = Number(alturaCm.value) || 0
  const p = Number(peso.value)     || 0
  const i = Number(idade.value)    || 25

  if (!h || !p || h < 100 || h > 250 || p < 20) { resultado.value = null; return }

  const hm  = h / 100
  const imc = p / (hm * hm)

  const minI = 18.5 * hm * hm
  const maxI = 24.9 * hm * hm

  // TMB (Mifflin-St Jeor)
  const tmb = sexo.value === 'masculino'
    ? 10 * p + 6.25 * h - 5 * i + 5
    : 10 * p + 6.25 * h - 5 * i - 161

  const agua = p * 0.035

  // Classificação OMS
  type ClasseMeta = { label: string; cor: string; badge: string; icon: string; tip: string; rec: string }
  const tabelaOMS: Array<{ min: number; max: number } & ClasseMeta> = [
    { min:0,  max:16,  label:'Magreza grave',  cor:'text-blue-700',    badge:'bg-blue-100 text-blue-700',      icon:'fa-exclamation-triangle',tip:'',          rec:'Procure orientação médica urgente — risco de desnutrição grave.' },
    { min:16, max:17,  label:'Magreza moderada',cor:'text-sky-700',    badge:'bg-sky-100 text-sky-700',        icon:'fa-exclamation-circle',  tip:'warning',   rec:'Procure orientação médica para acompanhamento nutricional.' },
    { min:17, max:18.5,label:'Magreza leve',   cor:'text-cyan-700',    badge:'bg-cyan-100 text-cyan-700',      icon:'fa-info-circle',         tip:'',          rec:'Considere aumentar a ingestão calórica com alimentos nutritivos.' },
    { min:18.5,max:25, label:'Peso normal',    cor:'text-emerald-700', badge:'bg-emerald-100 text-emerald-700',icon:'fa-check-circle',        tip:'success',   rec:'Parabéns! Mantenha uma dieta equilibrada e pratique exercícios regularmente.' },
    { min:25, max:30,  label:'Sobrepeso',      cor:'text-yellow-700',  badge:'bg-yellow-100 text-yellow-700',  icon:'fa-exclamation',         tip:'warning',   rec:'Considere aumentar a atividade física e reduzir alimentos ultraprocessados.' },
    { min:30, max:35,  label:'Obesidade grau I',cor:'text-orange-700', badge:'bg-orange-100 text-orange-700',  icon:'fa-times-circle',        tip:'warning',   rec:'Recomendado acompanhamento médico e nutricional para perda de peso saudável.' },
    { min:35, max:40,  label:'Obesidade grau II',cor:'text-red-700',   badge:'bg-red-100 text-red-700',        icon:'fa-times-circle',        tip:'warning',   rec:'Necessário acompanhamento médico especializado.' },
    { min:40, max:999, label:'Obesidade grau III',cor:'text-rose-800', badge:'bg-rose-100 text-rose-800',      icon:'fa-times-circle',        tip:'warning',   rec:'Situação de alto risco. Procure acompanhamento médico urgente.' },
  ]

  const faixa = tabelaOMS.find(f => imc >= f.min && imc < f.max) || tabelaOMS[tabelaOMS.length - 1]

  // Mapeamento da barra (IMC 16=10%, 18.5=25%, 25=50%, 30=70%, 35=85%, 40=100%)
  const pcts = [[16,10],[18.5,25],[25,50],[30,70],[35,85],[40,100]]
  let barra = 0
  for (let k = 0; k < pcts.length - 1; k++) {
    const [a, pa] = pcts[k], [b, pb] = pcts[k + 1]
    if (imc >= a && imc <= b) { barra = pa + ((imc - a) / (b - a)) * (pb - pa); break }
    if (imc > 40) barra = 100
  }

  imcBarraPercent.value = Math.min(Math.max(barra, 2), 98)

  resultado.value = {
    imc,
    classificacao: faixa.label,
    corTexto:      faixa.cor,
    badgeClasse:   faixa.badge,
    icone:         faixa.icon,
    classeCSS:     imc >= 18.5 && imc < 25 ? 'tool-result-success' : imc < 18.5 ? 'tool-result-info' : 'tool-result-warning',
    tipoPill:      faixa.tip === 'success' ? 'tip-card-success' : faixa.tip === 'warning' ? 'tip-card-warning' : 'tip-card',
    pesoIdealMin:  minI,
    pesoIdealMax:  maxI,
    ajuste:        p - (minI + maxI) / 2,
    tmb,
    agua,
    recomendacao:  faixa.rec,
  }
}

calcular()
</script>
