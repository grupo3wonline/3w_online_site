<template>
  <ToolShell
    title="Calculadora de Combustível"
    description="Compare álcool x gasolina e descubra qual é mais econômico para o seu carro."
    icon="fa-gas-pump"
    icon-gradient="from-orange-500 to-amber-700"
    orb-color="orange"
    :quick-tips="['Regra dos 70%', 'Custo por km', 'Simulação de trajeto']"
    :tips="[
      { title: 'Regra dos 70%', text: 'Álcool vale a pena quando seu preço for inferior a 70% do preço da gasolina. Isso porque o rendimento médio do álcool é ~30% menor.' },
      { title: 'Consumo real vs INMETRO', text: 'O consumo informado pelo fabricante é obtido em laboratório. No uso real, desconte 15-20% — considere também condução urbana vs estrada.', type: 'info' },
      { title: 'Flex com desgaste', text: 'Carros mais antigos podem ter consumo degradado. Calibre os pneus, verifique filtros e velas para manter a eficiência.', type: 'warning' },
    ]"
    :examples="[
      { title: 'São Paulo (2025)', desc: 'Gasolina R$ 5,89/L, Álcool R$ 3,99/L', result: 'Álcool = 67,7% da gasolina → USE ÁLCOOL' },
      { title: 'Interior SP', desc: 'Gasolina R$ 5,45/L, Álcool R$ 3,90/L', result: 'Álcool = 71,6% da gasolina → USE GASOLINA' },
      { title: 'Nordeste', desc: 'Gasolina R$ 6,10/L, Álcool R$ 4,05/L', result: 'Álcool = 66,4% → USE ÁLCOOL' },
    ]"
  >

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-section">
          <h3 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-dollar-sign text-orange-500"></i>
            Preços na bomba
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <BaseInput
              v-model="precoGasolina"
              label="Gasolina (R$/L)"
              type="number" step="0.01" :min="0"
              icon="fa-gas-pump"
              placeholder="5.89"
              @input="calcularAuto"
            />
            <BaseInput
              v-model="precoAlcool"
              label="Álcool (R$/L)"
              type="number" step="0.01" :min="0"
              icon="fa-gas-pump"
              placeholder="3.99"
              @input="calcularAuto"
            />
          </div>
        </div>

        <div class="tool-section">
          <h3 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-gauge text-blue-500"></i>
            Consumo do seu carro
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <BaseInput
              v-model="consumoGasolina"
              label="Com gasolina (km/L)"
              type="number" step="0.1" :min="1"
              icon="fa-tachometer-alt"
              placeholder="12"
              tooltip="Consumo médio do seu carro abastecido com gasolina. Ex: 12 km/L"
              @input="calcularAuto"
            />
            <BaseInput
              v-model="consumoAlcool"
              label="Com álcool (km/L)"
              type="number" step="0.1" :min="1"
              icon="fa-tachometer-alt"
              placeholder="8.5"
              tooltip="Consumo médio abastecido com álcool. Geralmente ~70% do consumo com gasolina."
              @input="calcularAuto"
            />
          </div>
        </div>

        <div class="tool-section">
          <h3 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-route text-purple-500"></i>
            Simulação de trajeto (opcional)
          </h3>
          <BaseInput
            v-model="km"
            label="Distância (km)"
            type="number" :min="1"
            icon="fa-road"
            placeholder="100"
            hint="Calcule o custo de um trajeto específico"
            @input="calcularAuto"
          />
        </div>

        <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="w-full">
          Calcular Mais Econômico
        </BaseButton>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- Recomendação em destaque -->
            <div :class="['tool-header text-center py-7', resultado.maisEconomico === 'Gasolina' ? '' : '']">
              <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-gas-pump text-2xl text-white"></i>
              </div>
              <p class="text-blue-200 text-sm mb-1">Combustível mais econômico</p>
              <p class="text-4xl font-black text-white">{{ resultado.maisEconomico }}</p>
              <p class="text-orange-300 text-sm mt-1 font-semibold">
                Economia de R$ {{ resultado.economiaKm }}/km
              </p>
            </div>

            <!-- Comparativo visual -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3">
                <i class="fas fa-scale-balanced mr-2 text-primary-500"></i>
                Comparativo
              </h4>
              <div class="grid grid-cols-2 gap-3">
                <!-- Gasolina -->
                <div :class="['p-4 rounded-xl border-2 transition-all', resultado.maisEconomico === 'Gasolina' ? 'border-green-400 dark:border-green-600 bg-green-50/50 dark:bg-green-900/10' : 'border-gray-200 dark:border-slate-600']">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-bold text-gray-700 dark:text-slate-200">⛽ Gasolina</span>
                    <span v-if="resultado.maisEconomico === 'Gasolina'" class="badge-aurora-green">Melhor</span>
                  </div>
                  <div class="space-y-1 text-xs text-gray-600 dark:text-slate-300">
                    <div class="flex justify-between">
                      <span>Custo/km:</span>
                      <strong class="font-mono">R$ {{ resultado.custoPorKmGasolina }}</strong>
                    </div>
                    <div class="flex justify-between">
                      <span>100 km:</span>
                      <strong class="font-mono">R$ {{ resultado.custo100kmGasolina }}</strong>
                    </div>
                  </div>
                </div>

                <!-- Álcool -->
                <div :class="['p-4 rounded-xl border-2 transition-all', resultado.maisEconomico === 'Álcool' ? 'border-green-400 dark:border-green-600 bg-green-50/50 dark:bg-green-900/10' : 'border-gray-200 dark:border-slate-600']">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-bold text-gray-700 dark:text-slate-200">🌿 Álcool</span>
                    <span v-if="resultado.maisEconomico === 'Álcool'" class="badge-aurora-green">Melhor</span>
                  </div>
                  <div class="space-y-1 text-xs text-gray-600 dark:text-slate-300">
                    <div class="flex justify-between">
                      <span>Custo/km:</span>
                      <strong class="font-mono">R$ {{ resultado.custoPorKmAlcool }}</strong>
                    </div>
                    <div class="flex justify-between">
                      <span>100 km:</span>
                      <strong class="font-mono">R$ {{ resultado.custo100kmAlcool }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Regra dos 70% -->
            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-bold text-gray-700 dark:text-slate-200">Relação Álcool/Gasolina</span>
                <span :class="['badge-aurora', resultado.relacaoPercent <= 70 ? 'badge-aurora-green' : 'badge-aurora-orange']">
                  {{ resultado.relacaoPercent.toFixed(1) }}%
                </span>
              </div>
              <div class="strength-track mb-2">
                <div class="strength-bar transition-all duration-700"
                  :class="resultado.relacaoPercent <= 70 ? 'bg-emerald-500' : 'bg-orange-500'"
                  :style="{ width: Math.min(resultado.relacaoPercent, 100) + '%' }"
                ></div>
              </div>
              <div class="flex justify-between text-[10px] text-gray-500 dark:text-slate-400">
                <span>0%</span>
                <span class="text-emerald-600 font-bold">70% (limite)</span>
                <span>100%</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-slate-300 mt-2">
                {{ resultado.relacaoPercent <= 70
                  ? 'Álcool está abaixo de 70% da gasolina → USE ÁLCOOL'
                  : 'Álcool está acima de 70% da gasolina → USE GASOLINA' }}
              </p>
            </div>

            <!-- Simulação de trajeto -->
            <div v-if="km && resultado.trajeto" class="tool-result-info">
              <h4 class="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                <i class="fas fa-route"></i>
                Trajeto de {{ km }} km
              </h4>
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span class="text-blue-600 dark:text-blue-300">Com Gasolina:</span>
                  <strong class="block text-blue-800 dark:text-blue-200 font-mono">R$ {{ resultado.trajeto.gasolina }}</strong>
                </div>
                <div>
                  <span class="text-blue-600 dark:text-blue-300">Com Álcool:</span>
                  <strong class="block text-blue-800 dark:text-blue-200 font-mono">R$ {{ resultado.trajeto.alcool }}</strong>
                </div>
                <div class="col-span-2">
                  <span class="text-blue-600 dark:text-blue-300">Economia total:</span>
                  <strong class="block text-emerald-700 dark:text-emerald-300 font-mono">R$ {{ resultado.trajeto.economia }}</strong>
                </div>
              </div>
            </div>

          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel p-6 text-center text-gray-400 dark:text-slate-500">
          <i class="fas fa-gas-pump text-3xl mb-3 opacity-30 block text-orange-400"></i>
          <p class="text-sm">Informe os preços e consumos para comparar</p>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const precoGasolina   = ref<number | ''>(5.89)
const precoAlcool     = ref<number | ''>(3.99)
const consumoGasolina = ref<number | ''>(12)
const consumoAlcool   = ref<number | ''>(8.5)
const km              = ref<number | ''>(100)

interface Resultado {
  maisEconomico: string; economiaKm: string
  custoPorKmGasolina: string; custoPorKmAlcool: string
  custo100kmGasolina: string; custo100kmAlcool: string
  relacaoPercent: number
  trajeto?: { gasolina: string; alcool: string; economia: string }
}

const resultado = ref<Resultado | null>(null)

function calcular() {
  const pg = Number(precoGasolina.value) || 0
  const pa = Number(precoAlcool.value)   || 0
  const cg = Number(consumoGasolina.value) || 1
  const ca = Number(consumoAlcool.value)   || 1
  const d  = Number(km.value) || 0

  if (!pg || !pa || !cg || !ca) { resultado.value = null; return }

  const ckGas = pg / cg
  const ckAlc = pa / ca
  const melhor = ckAlc < ckGas ? 'Álcool' : 'Gasolina'
  const relacao = (pa / pg) * 100

  const trajeto = d > 0 ? {
    gasolina: (ckGas * d).toFixed(2),
    alcool:   (ckAlc * d).toFixed(2),
    economia: Math.abs((ckGas - ckAlc) * d).toFixed(2),
  } : undefined

  resultado.value = {
    maisEconomico:       melhor,
    economiaKm:          Math.abs(ckGas - ckAlc).toFixed(3),
    custoPorKmGasolina:  ckGas.toFixed(3),
    custoPorKmAlcool:    ckAlc.toFixed(3),
    custo100kmGasolina:  (ckGas * 100).toFixed(2),
    custo100kmAlcool:    (ckAlc * 100).toFixed(2),
    relacaoPercent:      relacao,
    trajeto,
  }
}

function calcularAuto() { calcular() }

calcular()
watch([precoGasolina, precoAlcool, consumoGasolina, consumoAlcool, km], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

