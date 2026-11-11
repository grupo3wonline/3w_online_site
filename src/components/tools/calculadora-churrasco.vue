<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

type Apetite = 'leve' | 'normal' | 'reforcado'

interface ChurrascoInput {
  homens: number; mulheres: number; criancas: number; duracao: number; apetite: Apetite
}
interface ItemQtd { label: string; value: string; qtd: number; base: 'kg' | 'unidade' }
interface ResultadoChurrasco {
  adultos: number; criancas: number; duracao: number; apetite: Apetite
  carneMin: string; carneMax: string; carneMediaKg: number
  acompanhamentos: ItemQtd[]; bebidas: ItemQtd[]; destilados: ItemQtd[]
}

const APETITE: Record<Apetite, number> = { leve: 0.8, normal: 1, reforcado: 1.25 }

const form = reactive<ChurrascoInput>({ homens: 0, mulheres: 0, criancas: 0, duracao: 4, apetite: 'normal' })
const resultado = ref<ResultadoChurrasco | null>(null)

const PRECOS_PADRAO: Record<string, number> = {
  Carne: 45, 'Pão de Alho': 12, 'Asa de Frango': 18, 'Coxa de Frango': 16, 'Peito de Frango': 22, Linguiça: 25,
  Refrigerante: 9, Suco: 8, Energético: 12, Cerveja: 4, Vinho: 35, Espumante: 40, Champanhe: 60, Gin: 70,
  Vodka: 45, Tequila: 90, Whisky: 80, Cachaça: 20, Conhaque: 55, Rum: 50,
}
const precos = reactive<Record<string, number>>({ ...PRECOS_PADRAO })
const editandoPrecos = ref(false)

const custo = computed(() => {
  if (!resultado.value) return 0
  const r = resultado.value
  let total = r.carneMediaKg * (precos['Carne'] ?? 0)
  for (const item of [...r.acompanhamentos, ...r.bebidas, ...r.destilados])
    total += (precos[item.label] ?? 0) * item.qtd
  return total
})

function calcular() {
  const { homens, mulheres, criancas, duracao, apetite } = form
  if (homens + mulheres + criancas === 0) {
    Swal.fire({ icon: 'warning', title: 'Informe ao menos uma pessoa', confirmButtonColor: '#ea580c' }); return
  }
  if (duracao < 1) {
    Swal.fire({ icon: 'warning', title: 'Duração mínima: 1 hora', confirmButtonColor: '#ea580c' }); return
  }
  const adultos = homens + mulheres
  const fator = APETITE[apetite]
  const meiaHora = duracao / 2
  const val1 = (((278 * meiaHora + 373 * meiaHora + 157 * meiaHora) * 1.1 * 5) / 1000) * fator
  const val2 = ((278 * meiaHora * adultos + 373 * meiaHora * adultos) / 1000 + (157 * meiaHora * criancas) / 2000) * fator
  const max = Math.max(val1, val2); const min = Math.min(val1, val2); const media = (min + max) / 2
  const f = (v: number) => v * fator
  const paoAlho = Math.ceil((adultos * 0.9 + criancas * 0.75) * fator)
  const fatorF = adultos * 0.5 + criancas * 0.25
  const unid = (ml: number, cap: number, un: string, label: string): ItemQtd =>
    ({ label, value: `${Math.max(0, Math.ceil(ml / cap))} ${un}`, qtd: Math.max(0, Math.ceil(ml / cap)), base: 'unidade' })
  const kgItem = (val: number, label: string): ItemQtd =>
    ({ label, value: `${val.toFixed(2)} Kg`, qtd: val, base: 'kg' })

  resultado.value = {
    adultos, criancas, duracao, apetite,
    carneMin: min.toFixed(2), carneMax: max.toFixed(2), carneMediaKg: media,
    acompanhamentos: [
      { label: 'Pão de Alho', value: `${paoAlho} pacote(s)`, qtd: paoAlho, base: 'unidade' },
      kgItem(fatorF * 0.09 * media, 'Asa de Frango'),
      kgItem(fatorF * 0.11 * media, 'Coxa de Frango'),
      kgItem(fatorF * 0.15 * media, 'Peito de Frango'),
      kgItem(fatorF * 0.19 * media, 'Linguiça'),
    ],
    bebidas: [
      unid(f(1000 * duracao / 2 * adultos + 1000 * duracao / 4 * criancas), 2000, 'garrafa(s) 2L', 'Refrigerante'),
      unid(f(500 * duracao / 3 * adultos), 1000, 'garrafa(s) 1L', 'Suco'),
      unid(f(2000 * duracao / 2 * adultos), 355, 'lata(s) 350ml', 'Cerveja'),
      unid(f(500 * duracao / 6 * adultos), 750, 'garrafa(s) 750ml', 'Vinho'),
      unid(f(390 * duracao / 3 * adultos), 750, 'garrafa(s) 750ml', 'Espumante'),
    ],
    destilados: [
      unid(f(500 * duracao / 9 * adultos), 700, 'garrafa(s) 700ml', 'Vodka'),
      unid(f(410 * duracao / 7 * adultos), 750, 'garrafa(s) 750ml', 'Tequila'),
      unid(f(500 * duracao / 10 * adultos), 1000, 'garrafa(s) 1L', 'Whisky'),
      unid(f(500 * duracao / 9 * adultos), 750, 'garrafa(s) 750ml', 'Cachaça'),
    ],
  }
  Swal.fire({ icon: 'success', title: 'Churrasco calculado!', timer: 1600, showConfirmButton: false })
}

function limpar() {
  form.homens = 0; form.mulheres = 0; form.criancas = 0; form.duracao = 4; form.apetite = 'normal'
  resultado.value = null
}

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
</script>

<template>
  <ToolShell
    title="Calculadora de Churrasco"
    description="Calcule a quantidade de carnes, acompanhamentos, bebidas e o custo estimado para o seu churrasco."
    icon="fa-fire"
    icon-gradient="from-orange-500 to-red-600"
    orb-color="orange"
    :quick-tips="['Cálculo por pessoa', 'Custo estimado', 'Ajuste de preços']"
    :tips="[
      { title: 'Regra geral de carne', text: 'A estimativa padrão é 400 g de carne por adulto e 200 g por criança para cada 2 horas de churrasco.' },
      { title: 'Apetite reforçado', text: 'Para grupos com grande apetite, use o multiplicador 1,25×. Atletas e eventos esportivos costumam precisar mais.' },
      { title: 'Ajuste de preços', text: 'Clique em Ajustar Preços no resultado para personalizar o custo estimado de acordo com sua região.' },
    ]"
    :examples="[
      { title: 'Churrasco familiar', desc: '5 homens + 3 mulheres + 2 crianças, 4h, apetite normal', result: '≈ 7–9 Kg de carne + lista completa de bebidas' },
      { title: 'Festão de empresa', desc: '30 adultos, 6h, apetite reforçado', result: '≈ 50–60 Kg de carne + custo estimado de R$ 1.800+' },
      { title: 'Fim de semana com amigos', desc: '8 adultos, 3h, apetite normal', result: '≈ 6–8 Kg de carne + cerveja e acompanhamentos' },
    ]"
  >
    <div class="grid lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="tool-body !mb-0 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <BaseInput v-model="form.homens" label="Homens" type="number" :min="0" icon="fa-male" />
          <BaseInput v-model="form.mulheres" label="Mulheres" type="number" :min="0" icon="fa-female" />
          <BaseInput v-model="form.criancas" label="Crianças" type="number" :min="0" icon="fa-child" />
          <BaseInput v-model="form.duracao" label="Duração (horas)" type="number" :min="1" :max="24" icon="fa-clock" />
        </div>

        <div>
          <label class="input-aurora-label"><i class="fas fa-gauge-high mr-1.5 text-orange-500"></i>Apetite do Grupo</label>
          <div class="grid grid-cols-3 gap-2 mt-1">
            <button
              v-for="op in [{ v: 'leve', l: 'Leve', pct: '80%' }, { v: 'normal', l: 'Normal', pct: '100%' }, { v: 'reforcado', l: 'Reforçado', pct: '125%' }]"
              :key="op.v" type="button" @click="form.apetite = op.v as Apetite"
              :class="['border-2 rounded-xl py-2.5 text-sm font-semibold transition-all', form.apetite === op.v ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-orange-300']"
            >
              <div>{{ op.l }}</div>
              <div class="text-[10px] opacity-60">{{ op.pct }}</div>
            </button>
          </div>
        </div>

        <div class="flex gap-3">
          <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">Calcular</BaseButton>
          <BaseButton variant="outline" icon="fa-eraser" @click="limpar">Limpar</BaseButton>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <!-- Métricas -->
            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600">{{ resultado.adultos }}</div>
                <div class="metric-glass-label">Adulto(s)</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600">{{ resultado.criancas }}</div>
                <div class="metric-glass-label">Criança(s)</div>
              </div>
              <div class="metric-glass ring-1 ring-gray-100 dark:ring-slate-700">
                <div class="metric-glass-value">{{ resultado.duracao }}h</div>
                <div class="metric-glass-label">Duração</div>
              </div>
            </div>

            <!-- Destaque carne -->
            <div class="tool-header text-center py-5">
              <p class="text-xs text-orange-200 mb-1">Carnes estimadas</p>
              <p class="text-4xl font-black text-white">{{ resultado.carneMin }}–{{ resultado.carneMax }} Kg</p>
              <p class="text-orange-300 text-sm mt-1">{{ resultado.adultos + resultado.criancas }} pessoas · {{ resultado.duracao }}h</p>
            </div>

            <!-- Custo + ajuste de preços -->
            <div class="glass-panel p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-bold text-gray-700 dark:text-slate-200">Custo Estimado</p>
                  <button @click="editandoPrecos = !editandoPrecos" class="text-xs text-primary-600 hover:underline mt-0.5">
                    {{ editandoPrecos ? 'Ocultar' : 'Ajustar preços →' }}
                  </button>
                </div>
                <span class="text-2xl font-black text-emerald-600 dark:text-emerald-400">{{ brl(custo) }}</span>
              </div>
              <div v-if="editandoPrecos" class="mt-3 max-h-44 overflow-y-auto space-y-1 bg-gray-50 dark:bg-slate-800 rounded-lg p-2">
                <div v-for="(_, key) in precos" :key="key" class="flex items-center justify-between text-xs gap-2">
                  <span class="text-gray-600 dark:text-slate-300">{{ key }}</span>
                  <div class="flex items-center gap-1">
                    <span class="text-gray-400">R$</span>
                    <input v-model.number="precos[key]" type="number" min="0" step="0.5" autocomplete="off"
                      class="w-20 input-aurora text-right text-xs py-0.5 px-2" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Listas -->
            <div v-for="(section, si) in [
              { title: 'Acompanhamentos', items: resultado.acompanhamentos, icon: 'fa-bread-slice', color: 'text-orange-500' },
              { title: 'Bebidas',         items: resultado.bebidas,         icon: 'fa-wine-bottle', color: 'text-blue-500'   },
              { title: 'Destilados',      items: resultado.destilados,      icon: 'fa-whiskey-glass', color: 'text-amber-500' },
            ]" :key="si" class="glass-panel p-4">
              <h3 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2 mb-3">
                <i :class="['fas', section.icon, section.color]"></i>
                {{ section.title }}
              </h3>
              <div class="grid grid-cols-2 gap-1.5">
                <div v-for="item in section.items" :key="item.label" class="flex justify-between text-xs py-1 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">{{ item.label }}</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel p-10 text-center text-gray-400 dark:text-slate-500">
          <i class="fas fa-fire text-3xl mb-3 opacity-30 block text-orange-400"></i>
          <p class="text-sm">Preencha o formulário e calcule</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all .3s ease; }
.scale-in-enter-from { transform: scale(.97); opacity: 0; }
.scale-in-leave-to  { opacity: 0; }
</style>
