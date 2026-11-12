<template>
  <ToolShell
    title="Calculadora de Aposentadoria"
    description="Simule quanto precisa guardar mensalmente para se aposentar com a renda que deseja."
    icon="fa-umbrella-beach"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['Regra dos 4% aplicada', 'Patrimônio inicial incluso', 'Simulação personalizada']"
    :tips="[
      { title: 'Comece cedo', text: 'Começar aos 25 anos exige aportes muito menores do que começar aos 35. O tempo é o maior aliado nos juros compostos.', type: 'warning' },
      { title: 'Taxa conservadora', text: 'Use taxa de retorno de 0,5–0,7% ao mês (6–8% a.a.) para uma simulação realista e conservadora.', type: 'info' },
      { title: 'Regra dos 4%', text: 'Um patrimônio 25x o seu gasto anual é suficiente para viver de renda retirando 4% ao ano sem esgotar o capital.', type: 'success' },
    ]"
    :examples="[
      { title: 'Aposentadoria aos 60', desc: '30 anos, aposenta aos 60, gasto R$ 5.000/mês, taxa 8% a.a.', result: 'Patrimônio necessário: R$ 1.500.000, aporte ~R$ 870/mês' },
      { title: 'Aposentadoria precoce', desc: '25 anos, aposenta aos 45, gasto R$ 8.000/mês, taxa 10% a.a.', result: 'Patrimônio necessário: R$ 2.400.000, aporte ~R$ 2.100/mês' },
      { title: 'Com patrimônio inicial', desc: '40 anos, aposenta aos 65, R$ 100k já investido, R$ 6.000/mês', result: 'Aporte mensal reduzido pelo patrimônio existente' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="tool-body !mb-0 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <BaseInput v-model="idadeAtual" label="Idade Atual (anos)" type="number" :min="18" :max="80" icon="fa-user" tooltip="Sua idade atual." />
          <BaseInput v-model="idadeAposentadoria" label="Aposentar aos (anos)" type="number" :min="50" :max="85" icon="fa-umbrella-beach" tooltip="Idade que deseja se aposentar." />
        </div>
        <BaseInput v-model="gastoMensal" label="Gasto Mensal Desejado (R$)" type="number" :min="0" step="100" icon="fa-money-bill-wave" tooltip="Quanto você quer gastar por mês na aposentadoria." />
        <div class="grid grid-cols-2 gap-3">
          <BaseInput v-model="expectativaVida" label="Expectativa de vida (anos)" type="number" :min="60" :max="120" icon="fa-heart" tooltip="Sua expectativa de vida para o planejamento." />
          <BaseInput v-model="patrimonioAtual" label="Patrimônio Atual (R$)" type="number" :min="0" step="1000" icon="fa-piggy-bank" tooltip="Quanto você já tem investido hoje." />
        </div>
        <BaseInput v-model="taxaRetorno" label="Taxa de Retorno (% ao ano)" type="number" step="0.1" icon="fa-percent" hint="Taxa conservadora: 6–8% a.a." tooltip="Rentabilidade anual esperada dos seus investimentos." />

        <BaseButton variant="success" icon="fa-calculator" @click="calcular" fullWidth>
          Calcular Aposentadoria
        </BaseButton>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Aporte Mensal Necessário</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.aporteMensal }}</p>
              <p class="text-teal-300 text-sm font-semibold">
                <i class="fas fa-calendar-alt mr-1"></i>
                Para aposentar em {{ anosAteAposentadoria }} anos
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <span class="metric-glass-value text-teal-600 dark:text-teal-400">R$ {{ resultado.patrimonioNecessario }}</span>
                <span class="metric-glass-label">Patrimônio Necessário</span>
              </div>
              <div class="metric-glass ring-1 ring-cyan-100 dark:ring-cyan-900">
                <span class="metric-glass-value text-cyan-600 dark:text-cyan-400">R$ {{ resultado.totalAportado }}</span>
                <span class="metric-glass-label">Total a Investir</span>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <span class="metric-glass-value text-blue-600 dark:text-blue-400">{{ anosAteAposentadoria }}</span>
                <span class="metric-glass-label">Anos até Aposentar</span>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <span class="metric-glass-value text-purple-600 dark:text-purple-400">{{ anosAposentado }}</span>
                <span class="metric-glass-label">Anos Aposentado</span>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-teal-500"></i>
                Como calculamos
              </h4>
              <ul class="text-xs text-gray-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Patrimônio necessário = gasto anual × 25 (Regra dos 4%)</li>
                <li>O patrimônio atual cresce com juros compostos até a aposentadoria</li>
                <li>O aporte mensal cobre a diferença restante</li>
                <li>Diversifique: ações, FIIs, renda fixa para equilibrar risco</li>
              </ul>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-seedling text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Com <strong>R$ {{ resultado.aporteMensal }}/mês</strong> durante <strong>{{ anosAteAposentadoria }} anos</strong> você acumula o patrimônio necessário para viver de renda.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-umbrella-beach text-4xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Preencha os dados para simular sua aposentadoria</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import Swal from 'sweetalert2'

const idadeAtual = ref(30)
const idadeAposentadoria = ref(60)
const gastoMensal = ref(5000)
const expectativaVida = ref(85)
const patrimonioAtual = ref(50000)
const taxaRetorno = ref(8)
const resultado = ref(null)

const anosAteAposentadoria = computed(() => Number(idadeAposentadoria.value) - Number(idadeAtual.value))
const anosAposentado = computed(() => Number(expectativaVida.value) - Number(idadeAposentadoria.value))

const calcular = () => {
  if (anosAteAposentadoria.value <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Idade de aposentadoria deve ser maior que a idade atual', confirmButtonColor: '#2563eb' })
    return
  }

  const gastoAnual = Number(gastoMensal.value) * 12
  const patrimonioNecessario = gastoAnual * 25

  const taxa = Number(taxaRetorno.value) / 100 / 12
  const meses = anosAteAposentadoria.value * 12
  const patrimonioInicial = Number(patrimonioAtual.value)

  const patrimonioFuturo = patrimonioInicial * Math.pow(1 + taxa, meses)
  const faltaAcumular = Math.max(0, patrimonioNecessario - patrimonioFuturo)

  let aporteMensal = 0
  if (faltaAcumular > 0) {
    aporteMensal = (faltaAcumular * taxa) / (Math.pow(1 + taxa, meses) - 1)
  }

  const totalAportado = aporteMensal * meses

  resultado.value = {
    patrimonioNecessario: patrimonioNecessario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    aporteMensal: aporteMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    totalAportado: totalAportado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
