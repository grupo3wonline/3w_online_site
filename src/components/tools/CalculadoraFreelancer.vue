<template>
  <ToolShell
    title="Calculadora Freelancer"
    description="Descubra o valor ideal da sua hora de trabalho e precifique projetos com margem de lucro real."
    icon="fa-laptop-code"
    icon-gradient="from-cyan-500 to-blue-700"
    orb-color="cyan"
    :quick-tips="['Valor hora justo', 'Precificação de projetos', 'Margem de segurança']"
    :tips="[
      { title: 'Por que calcular o valor hora?', text: 'Muitos freelancers cobram abaixo do necessário para manter seu padrão de vida. Esta calculadora revela o valor mínimo viável.' },
      { title: 'Horas trabalháveis reais',       text: 'Descontando férias, feriados, doenças e reuniões não pagas, freelancers geralmente têm 70–80% das horas do mês disponíveis.', type: 'info' },
      { title: 'Adicione margem de lucro',       text: 'O valor hora calculado é o mínimo para sobreviver. Adicione 30–50% para crescimento, investimentos e emergências.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Dev Junior', desc: 'Despesas R$ 5.000, 160h/mês, 70% aproveitamento', result: 'Valor hora mínimo: R$ 44,64' },
      { title: 'Designer Mid', desc: 'Despesas R$ 8.000, 140h/mês, 60% aproveitamento', result: 'Valor hora mínimo: R$ 95,24' },
      { title: 'Dev Senior', desc: 'Despesas R$ 15.000, 160h/mês, 80% aproveitamento + 50% margem', result: 'Valor hora: R$ 175,78' },
    ]"
  >

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- ── Coluna 1: Configuração ─────────────────────────── -->
      <div class="space-y-4">
        <div class="tool-section">
          <h3 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <i class="fas fa-wallet text-blue-500"></i>
            Despesas Mensais
          </h3>
          <div class="space-y-3">
            <BaseInput v-model="despesasPessoais" label="Despesas Pessoais (R$)" type="number" icon="fa-home"
              placeholder="Moradia, alimentação, transporte..." tooltip="Soma de todas as suas despesas pessoais mensais: aluguel, alimentação, transporte, saúde, lazer, etc." @input="calcular" />
            <BaseInput v-model="despesasNegocios" label="Despesas do Negócio (R$)" type="number" icon="fa-briefcase"
              placeholder="Software, internet, equipamentos..." tooltip="Custos operacionais: assinaturas de software, internet, energia, contabilidade, cursos, marketing." @input="calcular" />
            <BaseInput v-model="reservaEmergencia" label="Reserva de Emergência (R$)" type="number" icon="fa-shield-halved"
              tooltip="Quanto você quer guardar mensalmente para imprevistos (recomendado: 10–20% da renda)." @input="calcular" />
            <BaseInput v-model="impostos" label="Impostos Estimados (%)" type="number" icon="fa-percent"
              placeholder="Ex: 15" :min="0" :max="80" tooltip="Percentual de impostos sobre o faturamento (Simples Nacional: ~6–15%, PJ: ~13–17%, PF: até 27,5%)." @input="calcular" />
          </div>
        </div>

        <div class="tool-section">
          <h3 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <i class="fas fa-clock text-purple-500"></i>
            Horas de Trabalho
          </h3>
          <div class="space-y-3">
            <BaseInput v-model="horasPorDia" label="Horas trabalhadas por dia" type="number" icon="fa-sun"
              :min="1" :max="16" tooltip="Horas de trabalho efetivo por dia (sem contar pausas longas)." @input="calcular" />
            <BaseInput v-model="diasPorSemana" label="Dias trabalhados por semana" type="number" icon="fa-calendar-week"
              :min="1" :max="7" tooltip="Dias úteis de trabalho por semana." @input="calcular" />
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="input-aurora-label !mb-0">
                  <i class="fas fa-percentage mr-1 text-teal-500"></i>
                  Aproveitamento de horas bilháveis (%)
                  <button class="tooltip-trigger ml-1" @click.prevent="showTooltip('aproveitamento')" tabindex="-1">
                    <i class="fas fa-question text-[9px]"></i>
                  </button>
                </label>
                <span class="text-lg font-black text-teal-600 dark:text-teal-400">{{ aproveitamento }}%</span>
              </div>
              <input v-model.number="aproveitamento" type="range" min="10" max="100" class="range-aurora" @input="calcular" />
            </div>
            <BaseInput v-model="margemLucro" label="Margem de lucro desejada (%)" type="number" icon="fa-chart-line"
              :min="0" :max="300" tooltip="Percentual adicional para crescimento, investimentos e meta de renda acima do mínimo." @input="calcular" />
          </div>
        </div>
      </div>

      <!-- ── Coluna 2: Resultado ────────────────────────────── -->
      <div class="space-y-4">
        <Transition name="fade-in-up" appear>
          <div v-if="resultado.valorHora > 0" class="space-y-4">

            <!-- Valor hora em destaque -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Seu Valor Hora</p>
              <div class="text-5xl font-black text-white mb-1">
                {{ formatarMoeda(resultado.valorHora) }}
              </div>
              <p class="text-blue-200 text-sm">/hora</p>
              <div class="mt-3 text-[11px] text-blue-300">
                Com {{ margemLucro }}% de margem · {{ resultado.horasMes.toFixed(0) }}h/mês bilháveis
              </div>
            </div>

            <!-- Grid de métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-800">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ formatarMoeda(resultado.faturamentoNecessario) }}</div>
                <div class="metric-glass-label">Faturamento mínimo/mês</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-800">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ formatarMoeda(resultado.custoBruto) }}</div>
                <div class="metric-glass-label">Custo mensal total</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-800">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ resultado.horasMes.toFixed(0) }}h</div>
                <div class="metric-glass-label">Horas bilháveis/mês</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-800">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ formatarMoeda(resultado.valorDia) }}</div>
                <div class="metric-glass-label">Valor/dia trabalhado</div>
              </div>
            </div>

            <!-- Tabela de projetos -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-project-diagram text-primary-500"></i>
                Referência para Projetos
              </h4>
              <div class="space-y-2">
                <div v-for="p in projetosRef" :key="p.tipo"
                  class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700 last:border-0 text-sm">
                  <div>
                    <span class="font-semibold text-gray-700 dark:text-slate-200">{{ p.tipo }}</span>
                    <span class="text-gray-500 dark:text-slate-400 text-xs ml-2">({{ p.horas }}h)</span>
                  </div>
                  <span class="font-black text-primary-600 dark:text-primary-400">
                    {{ formatarMoeda(resultado.valorHora * p.horas) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Dica final -->
            <div class="tip-card-warning">
              <i class="fas fa-lightbulb text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                <strong>Lembre-se:</strong> este é o valor <em>mínimo</em> para cobrir suas despesas.
                Considere aumentar conforme sua experiência, especializações e posicionamento de mercado.
              </span>
            </div>

          </div>
        </Transition>

        <div v-if="!resultado.valorHora" class="glass-panel p-6 text-center text-gray-400 dark:text-slate-500">
          <i class="fas fa-calculator text-3xl mb-3 opacity-30 block"></i>
          <p class="text-sm">Preencha os campos ao lado para ver o resultado</p>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

// ─── Estado ───────────────────────────────────────────────────────
const despesasPessoais = ref<number | ''>(3500)
const despesasNegocios = ref<number | ''>(800)
const reservaEmergencia= ref<number | ''>(500)
const impostos         = ref<number | ''>(10)
const horasPorDia      = ref<number | ''>(8)
const diasPorSemana    = ref<number | ''>(5)
const aproveitamento   = ref(70)
const margemLucro      = ref(30)

interface Resultado {
  valorHora: number
  custoBruto: number
  faturamentoNecessario: number
  horasMes: number
  valorDia: number
}

const resultado = ref<Resultado>({ valorHora: 0, custoBruto: 0, faturamentoNecessario: 0, horasMes: 0, valorDia: 0 })

// ─── Projetos de referência ────────────────────────────────────────
const projetosRef = [
  { tipo: 'Landing Page simples',  horas: 20  },
  { tipo: 'Site institucional',    horas: 40  },
  { tipo: 'E-commerce básico',     horas: 80  },
  { tipo: 'App mobile MVP',        horas: 160 },
  { tipo: 'Sistema web completo',  horas: 320 },
]

// ─── Cálculo ──────────────────────────────────────────────────────
function calcular() {
  const dp  = Number(despesasPessoais.value)  || 0
  const dn  = Number(despesasNegocios.value)  || 0
  const re  = Number(reservaEmergencia.value) || 0
  const imp = (Number(impostos.value) || 0) / 100
  const hpd = Number(horasPorDia.value)       || 8
  const dpw = Number(diasPorSemana.value)      || 5
  const apr = aproveitamento.value / 100
  const ml  = 1 + margemLucro.value / 100

  const custoBruto = dp + dn + re
  const semanasPorMes = 4.33
  const horasBrutasMes = hpd * dpw * semanasPorMes
  const horasMes = horasBrutasMes * apr

  if (!horasMes) return

  const faturamentoSemImposto = custoBruto
  const faturamentoComImposto = faturamentoSemImposto / (1 - imp)
  const faturamentoNecessario = faturamentoComImposto * ml
  const valorHora = faturamentoNecessario / horasMes
  const valorDia  = valorHora * hpd

  resultado.value = { valorHora, custoBruto, faturamentoNecessario, horasMes, valorDia }
}

function showTooltip(key: string) {
  const msgs: Record<string, { title: string; text: string }> = {
    aproveitamento: {
      title: 'Aproveitamento de Horas',
      text:  'Nem todas as horas do mês são pagas por clientes. Descontamos tempo em reuniões não pagas, prospecção, aprendizado, problemas técnicos, etc. Para freelancers iniciantes: 50–60%. Para os experientes: 70–80%.',
    },
  }
  const m = msgs[key]
  if (m) Swal.fire({ icon: 'info', title: m.title, text: m.text, confirmButtonColor: '#2563eb' })
}

const formatarMoeda = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

// Calcular automaticamente ao montar
calcular()
watch([despesasPessoais, despesasNegocios, reservaEmergencia, impostos, horasPorDia, diasPorSemana, aproveitamento, margemLucro], calcular)
</script>

