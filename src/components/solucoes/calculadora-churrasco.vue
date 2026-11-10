<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type Apetite = 'leve' | 'normal' | 'reforcado'

interface ChurrascoInput {
  homens: number
  mulheres: number
  criancas: number
  duracao: number
  apetite: Apetite
}

interface ItemQtd { label: string; value: string; qtd: number; base: 'kg' | 'unidade' }

interface ResultadoChurrasco {
  adultos: number; criancas: number; duracao: number; apetite: Apetite
  carneMin: string; carneMax: string; carneMediaKg: number
  acompanhamentos: ItemQtd[]
  bebidas: ItemQtd[]
  destilados: ItemQtd[]
}

const APETITE: Record<Apetite, number> = { leve: 0.8, normal: 1, reforcado: 1.25 }

const form = reactive<ChurrascoInput>({ homens: 0, mulheres: 0, criancas: 0, duracao: 4, apetite: 'normal' })
const resultado = ref<ResultadoChurrasco | null>(null)

const PRECOS_PADRAO: Record<string, number> = {
  'Carne': 45, 'Pão de Alho': 12, 'Asa de Frango': 18, 'Coxa de Frango': 16, 'Peito de Frango': 22, 'Linguiça': 25,
  'Refrigerante': 9, 'Suco': 8, 'Energético': 12, 'Cerveja': 4, 'Vinho': 35, 'Espumante': 40, 'Champanhe': 60, 'Gin': 70,
  'Vodka': 45, 'Tequila': 90, 'Whisky': 80, 'Cachaça': 20, 'Conhaque': 55, 'Rum': 50,
}
const precos = reactive<Record<string, number>>({ ...PRECOS_PADRAO })
const editandoPrecos = ref(false)

const custo = computed(() => {
  if (!resultado.value) return 0
  const r = resultado.value
  let total = r.carneMediaKg * (precos['Carne'] ?? 0)
  for (const item of [...r.acompanhamentos, ...r.bebidas, ...r.destilados]) {
    total += (precos[item.label] ?? 0) * item.qtd
  }
  return total
})

function calcular() {
  const { homens, mulheres, criancas, duracao, apetite } = form
  if (homens + mulheres + criancas === 0) {
    Swal.fire({ icon: 'warning', title: 'Informe ao menos uma pessoa', confirmButtonColor: '#ea580c' })
    return
  }
  if (duracao < 1) {
    Swal.fire({ icon: 'warning', title: 'Duração mínima: 1 hora', confirmButtonColor: '#ea580c' })
    return
  }
  const adultos = homens + mulheres
  const fator = APETITE[apetite]
  const meiaHora = duracao / 2
  const porHomem = 373 * meiaHora
  const porMulher = 278 * meiaHora
  const porCrianca = 157 * meiaHora
  const val1 = (((porMulher + porHomem + porCrianca) * (1.1) * 5) / 1000) * fator
  const val2 = ((porMulher + porHomem) * adultos / 1000 + porCrianca * criancas / 2000) * fator
  const max = Math.max(val1, val2)
  const min = Math.min(val1, val2)
  const media = (min + max) / 2

  const unid = (ml: number, cap: number, un: string, label: string): ItemQtd => ({
    label, value: `${Math.max(0, Math.ceil(ml / cap))} ${un}`, qtd: Math.max(0, Math.ceil(ml / cap)), base: 'unidade'
  })
  const kgItem = (val: number, label: string): ItemQtd => ({
    label, value: `${val.toFixed(2)} Kg`, qtd: val, base: 'kg'
  })

  const f = (v: number) => v * fator
  const paoAlho = Math.ceil((adultos * 0.9 + criancas * 0.75) * fator)
  const fatorF = adultos * 0.5 + criancas * 0.25

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
      unid(f(500 * duracao / 5 * adultos), 1000, 'garrafa(s) 2L', 'Energético'),
      unid(f(2000 * duracao / 2 * adultos), 355, 'lata(s) 350ml', 'Cerveja'),
      unid(f(500 * duracao / 6 * adultos), 750, 'garrafa(s) 750ml', 'Vinho'),
      unid(f(390 * duracao / 3 * adultos), 750, 'garrafa(s) 750ml', 'Espumante'),
      unid(f(360 * duracao / 3 * adultos), 750, 'garrafa(s) 750ml', 'Champanhe'),
      unid(f(500 * duracao / 5 * adultos), 750, 'garrafa(s) 750ml', 'Gin'),
    ],
    destilados: [
      unid(f(500 * duracao / 9 * adultos), 700, 'garrafa(s) 700ml', 'Vodka'),
      unid(f(410 * duracao / 7 * adultos), 750, 'garrafa(s) 750ml', 'Tequila'),
      unid(f(500 * duracao / 10 * adultos), 1000, 'garrafa(s) 1L', 'Whisky'),
      unid(f(500 * duracao / 9 * adultos), 750, 'garrafa(s) 750ml', 'Cachaça'),
      unid(f(300 * duracao / 7 * adultos), 700, 'garrafa(s) 700ml', 'Conhaque'),
      unid(f(250 * duracao / 7 * adultos), 980, 'garrafa(s) 980ml', 'Rum'),
    ],
  }
  Swal.fire({ icon: 'success', title: 'Churrasco calculado!', text: 'Veja abaixo a lista completa.', timer: 1600, showConfirmButton: false, confirmButtonColor: '#ea580c' })
}

function limpar() {
  form.homens = 0; form.mulheres = 0; form.criancas = 0; form.duracao = 4; form.apetite = 'normal'
  resultado.value = null
}

function brl(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:fire" class="text-orange-400 w-7 h-7" />
        Calculadora de Churrasco
      </h1>
      <p class="text-blue-200 text-sm">Calcule carnes, bebidas e custo estimado para o seu churrasco</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Formulário -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:account-group" class="text-orange-400 w-5 h-5" />
          Dados do Churrasco
        </h2>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Homens</label>
            <input v-model.number="form.homens" type="number" min="0" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Mulheres</label>
            <input v-model.number="form.mulheres" type="number" min="0" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Crianças</label>
            <input v-model.number="form.criancas" type="number" min="0" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Duração (horas)</label>
            <input v-model.number="form.duracao" type="number" min="1" max="24" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
          </div>
        </div>

        <div>
          <label class="text-blue-200 text-xs font-medium block mb-2">Apetite do Grupo</label>
          <div class="grid grid-cols-3 gap-2">
            <button v-for="op in [{ v: 'leve', l: 'Leve' }, { v: 'normal', l: 'Normal' }, { v: 'reforcado', l: 'Reforçado' }]" :key="op.v"
              type="button" @click="form.apetite = op.v as Apetite"
              :class="['border rounded-lg py-2 text-sm font-medium transition-all', form.apetite === op.v ? 'border-orange-500 bg-orange-500/20 text-orange-300' : 'border-white/10 text-blue-200 hover:bg-white/5']">
              {{ op.l }}
            </button>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="calcular"
            class="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <Icon icon="mdi:calculator" class="w-4 h-4" />
            Calcular Churrasco
          </button>
          <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-lg transition-colors text-sm">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Resultado -->
      <div v-if="resultado" class="space-y-4">
        <!-- Resumo -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5">
          <div class="grid grid-cols-3 gap-3 text-center mb-4">
            <div class="bg-orange-900/20 rounded-lg p-3">
              <div class="text-2xl font-bold text-orange-400">{{ resultado.adultos }}</div>
              <div class="text-blue-200 text-xs">Adulto(s)</div>
            </div>
            <div class="bg-blue-900/20 rounded-lg p-3">
              <div class="text-2xl font-bold text-blue-400">{{ resultado.criancas }}</div>
              <div class="text-blue-200 text-xs">Criança(s)</div>
            </div>
            <div class="bg-white/5 rounded-lg p-3">
              <div class="text-2xl font-bold text-white">{{ resultado.duracao }}h</div>
              <div class="text-blue-200 text-xs">Duração</div>
            </div>
          </div>
          <!-- Carnes -->
          <div class="bg-red-900/20 border border-red-500/20 rounded-lg p-4 mb-3">
            <h3 class="text-red-300 font-semibold text-sm mb-2 flex items-center gap-1">
              <Icon icon="mdi:food-drumstick" class="w-4 h-4" /> Carnes
            </h3>
            <div class="grid grid-cols-2 gap-2 text-center">
              <div>
                <div class="text-lg font-bold text-red-400">{{ resultado.carneMin }} Kg</div>
                <div class="text-xs text-blue-200">Mínimo</div>
              </div>
              <div>
                <div class="text-lg font-bold text-red-300">{{ resultado.carneMax }} Kg</div>
                <div class="text-xs text-blue-200">Recomendado</div>
              </div>
            </div>
          </div>
          <!-- Custo -->
          <div class="bg-green-900/20 border border-green-500/20 rounded-lg p-3 flex items-center justify-between">
            <div>
              <div class="text-green-300 font-semibold text-sm">Custo Estimado</div>
              <button @click="editandoPrecos = !editandoPrecos" class="text-xs text-blue-300 hover:text-white mt-0.5">
                {{ editandoPrecos ? 'Ocultar' : 'Ajustar preços' }}
              </button>
            </div>
            <div class="text-2xl font-bold text-green-400">{{ brl(custo) }}</div>
          </div>
          <div v-if="editandoPrecos" class="mt-2 max-h-48 overflow-y-auto space-y-1 bg-black/20 rounded-lg p-2">
            <div v-for="(val, key) in precos" :key="key" class="flex items-center justify-between gap-2 text-xs">
              <span class="text-blue-200">{{ key }}</span>
              <div class="flex items-center gap-1">
                <span class="text-blue-300">R$</span>
                <input v-model.number="precos[key]" type="number" min="0" step="0.5" autocomplete="off"
                  class="w-20 bg-[#0a1628] text-white border border-white/10 rounded px-2 py-0.5 text-right text-xs" />
              </div>
            </div>
          </div>
        </div>
        <!-- Listas colapsáveis -->
        <div v-for="(section, si) in [
          { title: 'Acompanhamentos', items: resultado.acompanhamentos, icon: 'mdi:bread-slice', color: 'orange' },
          { title: 'Bebidas', items: resultado.bebidas, icon: 'mdi:glass-wine', color: 'blue' },
          { title: 'Destilados', items: resultado.destilados, icon: 'mdi:bottle-tonic-skull-outline', color: 'amber' },
        ]" :key="si" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4">
          <h3 class="text-white font-semibold text-sm flex items-center gap-2 mb-3">
            <Icon :icon="section.icon" class="w-4 h-4" :class="`text-${section.color}-400`" />
            {{ section.title }}
          </h3>
          <div class="grid grid-cols-2 gap-1.5">
            <div v-for="item in section.items" :key="item.label" class="flex justify-between text-xs">
              <span class="text-blue-200">{{ item.label }}</span>
              <span class="text-white font-medium">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Placeholder -->
      <div v-else class="bg-[#0f1e3c] border border-white/10 rounded-xl flex items-center justify-center p-12">
        <div class="text-center">
          <Icon icon="mdi:fire" class="w-16 h-16 text-orange-400/20 mx-auto mb-3" />
          <p class="text-blue-200 text-sm">Preencha o formulário e calcule</p>
        </div>
      </div>
    </div>
  </div>
</template>
