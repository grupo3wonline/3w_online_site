<template>
  <ToolShell
    title="Conversor de Pressão"
    description="Converta entre Pascal, bar, PSI, atm, mmHg, kPa e milibar. Tabela completa de todas as unidades em tempo real."
    icon="fa-gauge"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['7 unidades de pressão', 'Tabela completa em tempo real', 'Referências do cotidiano']"
    :tips="[
      { title: 'Pascal e Bar', text: '1 bar = 100.000 Pa (100 kPa). 1 atm = 101.325 Pa ≈ 1,01325 bar. O bar é levemente menor que a atmosfera padrão.', type: 'info' },
      { title: 'PSI em pneus', text: 'Pneus de carros de passeio costumam ter 30–35 PSI. Bicicletas podem ter 60–130 PSI. Sempre verifique a recomendação do fabricante.', type: 'warning' },
      { title: 'Pressão arterial', text: 'Medida em mmHg. Uma leitura saudável é aproximadamente 120/80 mmHg. 1 mmHg = 133,322 Pa.', type: 'info' },
    ]"
    :examples="[
      { title: 'Pressão atmosférica', desc: '1 atm em outras unidades', result: '101.325 Pa | 1,01325 bar | 14,696 PSI | 760 mmHg' },
      { title: 'Pneu de carro', desc: '32 PSI em bar e kPa', result: '2,206 bar | 220,6 kPa | 220.600 Pa' },
      { title: 'Pressão arterial', desc: '120 mmHg em Pascal', result: '15.998,64 Pa = 16 kPa' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Entrada -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <BaseInput
            v-model="valorEntrada"
            label="Valor de Entrada"
            type="number"
            step="0.01"
            icon="fa-gauge"
            placeholder="1"
            tooltip="Digite o valor de pressão na unidade selecionada abaixo."
            hint="Aceita decimais e valores negativos"
            @input="converter"
          />

          <div class="mt-4">
            <label class="input-aurora-label">
              <i class="fas fa-ruler-combined mr-1.5 text-teal-500"></i>
              Unidade de Origem
            </label>
            <select v-model="unidadeOrigem" @change="converter" class="input-aurora">
              <option v-for="u in unidades" :key="u.id" :value="u.id">
                {{ u.nome }} ({{ u.simbolo }})
              </option>
            </select>
          </div>

          <div class="mt-4">
            <label class="input-aurora-label">
              <i class="fas fa-arrow-right mr-1.5 text-cyan-500"></i>
              Unidade de Destino Principal
            </label>
            <select v-model="unidadeDestino" @change="converter" class="input-aurora">
              <option v-for="u in unidades" :key="u.id" :value="u.id">
                {{ u.nome }} ({{ u.simbolo }})
              </option>
            </select>
          </div>
        </div>

        <!-- Resultado principal -->
        <Transition name="scale-in" appear>
          <div v-if="valorEntrada">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Resultado</p>
              <p class="text-4xl font-black text-white font-mono">{{ resultado.toFixed(6) }}</p>
              <p class="text-blue-200 text-sm mt-2">{{ unidades.find(u => u.id === unidadeDestino)?.nome }}</p>
            </div>
          </div>
        </Transition>

        <div v-if="!valorEntrada" class="glass-panel text-center py-10 text-gray-400 dark:text-slate-500">
          <i class="fas fa-gauge text-3xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Digite um valor de pressão acima</p>
        </div>
      </div>

      <!-- Tabela de conversões -->
      <div>
        <label class="input-aurora-label mb-3">
          <i class="fas fa-table mr-1.5 text-teal-500"></i>
          Conversões completas
        </label>

        <div class="glass-panel overflow-hidden">
          <div class="p-3 border-b border-gray-100 dark:border-slate-700 bg-teal-50/50 dark:bg-teal-900/20">
            <div class="grid grid-cols-2 text-xs font-bold text-gray-700 dark:text-slate-200">
              <span>Unidade</span>
              <span class="text-right">Valor</span>
            </div>
          </div>
          <div class="divide-y divide-gray-100 dark:divide-slate-700">
            <div
              v-for="u in unidades"
              :key="u.id"
              :class="[
                'grid grid-cols-2 px-3 py-2.5 text-sm transition-all',
                u.id === unidadeDestino
                  ? 'bg-teal-50 dark:bg-teal-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'
              ]"
            >
              <span class="text-gray-700 dark:text-slate-200">{{ u.nome }} <span class="text-gray-400 text-xs">({{ u.simbolo }})</span></span>
              <span class="text-right font-mono font-bold text-teal-600 dark:text-teal-400 text-xs">
                {{ valorEntrada ? converterPara(u.id).toFixed(6) : '—' }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-4">
          <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
            <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ valorEntrada ? (Number(valorEntrada) * (unidades.find(u=>u.id===unidadeOrigem)?.paraPascal ?? 0)).toFixed(2) : '—' }}</div>
            <div class="metric-glass-label">Em Pascal (Pa)</div>
          </div>
          <div class="metric-glass ring-1 ring-cyan-100 dark:ring-cyan-900">
            <div class="metric-glass-value text-cyan-600 dark:text-cyan-400">{{ valorEntrada ? converterPara('atm').toFixed(4) : '—' }}</div>
            <div class="metric-glass-label">Em Atm</div>
          </div>
        </div>

        <div class="tip-card mt-4">
          <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">PSI é amplamente usado nos EUA para pneus e equipamentos hidráulicos. mmHg é o padrão médico para pressão arterial.</span>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import { ref } from 'vue'

const unidades = [
  { id: 'pascal', nome: 'Pascal',               simbolo: 'Pa',   paraPascal: 1       },
  { id: 'bar',    nome: 'Bar',                  simbolo: 'bar',  paraPascal: 100000  },
  { id: 'psi',    nome: 'PSI',                  simbolo: 'psi',  paraPascal: 6894.76 },
  { id: 'atm',    nome: 'Atmosfera',            simbolo: 'atm',  paraPascal: 101325  },
  { id: 'mmhg',   nome: 'Milímetro de Mercúrio', simbolo: 'mmHg', paraPascal: 133.322 },
  { id: 'kpa',    nome: 'Quilopascal',           simbolo: 'kPa',  paraPascal: 1000    },
  { id: 'mbar',   nome: 'Milibar',              simbolo: 'mbar', paraPascal: 100     },
]

const valorEntrada   = ref(1)
const unidadeOrigem  = ref('atm')
const unidadeDestino = ref('psi')
const resultado      = ref(0)

const converterPara = (unidadeId: string) => {
  const origem  = unidades.find(u => u.id === unidadeOrigem.value)
  const destino = unidades.find(u => u.id === unidadeId)
  if (!origem || !destino) return 0
  return (Number(valorEntrada.value) * origem.paraPascal) / destino.paraPascal
}

const converter = () => {
  resultado.value = converterPara(unidadeDestino.value)
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
