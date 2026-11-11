<template>
  <ToolShell
    title="Orçamento de Projeto"
    description="Estime o custo de projetos por fases, recursos, cronograma e contingência."
    icon="fa-clipboard-list"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Fases + recursos', 'Cronograma detalhado', 'Contingência automática']"
    :tips="[
      { title: 'Contingência', text: 'Projetos de software: reserve 15–25% para imprevistos. Projetos de engenharia: 10–20%.', type: 'warning' },
      { title: 'Escopo bem definido', text: 'Um escopo claro reduz retrabalho e controla custos. Documente cada fase antes de estimar.' },
      { title: 'Recursos por fase', text: 'Fases diferentes exigem perfis diferentes. Arquiteto na fase de planejamento, dev na implementação.', type: 'info' },
    ]"
    :examples="[
      { title: 'App mobile MVP', desc: '3 fases (planejamento 5d, dev 30d, testes 10d) × R$ 350/dia', result: 'Total: R$ 15.750 + 20% contingência = R$ 18.900' },
      { title: 'Site institucional', desc: '2 fases (design 7d × R$ 250 + dev 14d × R$ 300)', result: 'Total: R$ 5.950 + 15% = R$ 6.842' },
      { title: 'Sistema web completo', desc: '5 fases, equipe de 3, 90 dias total, R$ 400/dia médio', result: 'Estimativa: R$ 108.000 + contingência' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <BaseInput
              v-model="nomeProjeto"
              label="Nome do Projeto"
              type="text"
              icon="fa-folder-open"
              placeholder="Projeto Alpha"
              tooltip="Nome do projeto para identificação no orçamento."
            />

            <!-- Fases -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-layer-group mr-1.5 text-blue-500"></i>
                Fases do Projeto
              </label>
              <div class="space-y-2 mt-1.5">
                <div
                  v-for="(fase, idx) in fases"
                  :key="idx"
                  class="flex gap-2 items-center"
                >
                  <input
                    v-model="fase.nome"
                    type="text"
                    placeholder="Nome da fase"
                    class="input-aurora flex-1 min-w-0 text-sm"
                  />
                  <input
                    v-model="fase.dias"
                    type="number"
                    min="1"
                    placeholder="Dias"
                    class="input-aurora w-16 text-sm"
                  />
                  <input
                    v-model="fase.valorDia"
                    type="number"
                    min="0"
                    step="10"
                    placeholder="R$/dia"
                    class="input-aurora w-24 text-sm"
                  />
                  <button
                    @click="removerFase(idx)"
                    class="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex-shrink-0"
                    title="Remover fase"
                  >
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
              <button
                @click="adicionarFase"
                class="mt-2 w-full py-2.5 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl text-blue-600 dark:text-blue-400 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all text-sm font-medium"
              >
                <i class="fas fa-plus mr-2"></i>Adicionar Fase
              </button>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="recursos"
                label="Nº de Recursos"
                type="number"
                :min="1"
                icon="fa-users"
                hint="Pessoas na equipe"
                tooltip="Número de profissionais envolvidos no projeto."
              />
              <BaseInput
                v-model="contingencia"
                label="Contingência (%)"
                type="number"
                :min="0"
                :max="50"
                icon="fa-shield-halved"
                hint="10–25% recomendado"
                tooltip="Percentual de reserva para imprevistos e mudanças de escopo."
              />
            </div>

            <div>
              <label class="input-aurora-label">
                <i class="fas fa-calendar-alt mr-1.5 text-blue-500"></i>
                Data de Início
              </label>
              <input
                v-model="dataInicio"
                type="date"
                class="input-aurora w-full mt-1"
              />
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular Orçamento
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <!-- Destaque principal -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Orçamento Total do Projeto</p>
              <p class="text-5xl font-black text-white mb-2">{{ fmt(resultado.totalFinal) }}</p>
              <p class="text-indigo-300 text-sm font-semibold">
                <i class="fas fa-calendar mr-1"></i>
                {{ resultado.totalDias }} dias · {{ resultado.totalDias * Number(recursos) }} homens-dia
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ fmt(resultado.custoBase) }}</div>
                <div class="metric-glass-label">Custo base</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ fmt(resultado.valorContingencia) }}</div>
                <div class="metric-glass-label">Contingência</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ resultado.totalDias }}d</div>
                <div class="metric-glass-label">Prazo total</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ fmt(resultado.custoDiaMedio) }}</div>
                <div class="metric-glass-label">Custo/dia médio</div>
              </div>
            </div>

            <!-- Detalhamento por fase -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-blue-500"></i>
                Detalhamento por Fase
              </h4>
              <div class="space-y-2">
                <div
                  v-for="(fase, i) in resultado.fases"
                  :key="i"
                  class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700 last:border-0"
                >
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-black flex-shrink-0">
                      {{ i + 1 }}
                    </span>
                    <div>
                      <span class="text-sm font-medium text-gray-800 dark:text-slate-200">{{ fase.nome }}</span>
                      <span class="text-xs text-gray-500 dark:text-slate-400 ml-2">{{ fase.dias }}d × {{ fmt(fase.valorDia) }}</span>
                    </div>
                  </div>
                  <span class="text-sm font-bold text-blue-600 dark:text-blue-400">{{ fmt(fase.total) }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-calendar-check text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Previsão de conclusão: <strong>{{ resultado.dataFim }}</strong> ·
                Iniciando em <strong>{{ resultado.dataInicioFmt }}</strong>
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-clipboard-list text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Adicione as fases do projeto e clique em <strong>Calcular</strong></p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

interface Fase { nome: string; dias: number; valorDia: number }
interface FaseResultado extends Fase { total: number }
interface Resultado {
  custoBase: number; valorContingencia: number; totalFinal: number
  totalDias: number; custoDiaMedio: number; fases: FaseResultado[]
  dataFim: string; dataInicioFmt: string
}

const nomeProjeto = ref('Projeto Alpha')
const recursos    = ref(2)
const contingencia = ref(20)
const dataInicio  = ref(new Date().toISOString().split('T')[0])

const fases = ref<Fase[]>([
  { nome: 'Planejamento',  dias: 5,  valorDia: 300 },
  { nome: 'Desenvolvimento', dias: 20, valorDia: 400 },
  { nome: 'Testes',        dias: 5,  valorDia: 350 },
  { nome: 'Implantação',   dias: 3,  valorDia: 350 },
])

const resultado = ref<Resultado | null>(null)

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const fmtData = (d: Date) => d.toLocaleDateString('pt-BR')

const adicionarFase = () => {
  fases.value.push({ nome: `Fase ${fases.value.length + 1}`, dias: 5, valorDia: 300 })
}

const removerFase = (idx: number) => {
  if (fases.value.length > 1) {
    fases.value.splice(idx, 1)
  } else {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'Mantenha pelo menos 1 fase.', confirmButtonColor: '#2563eb' })
  }
}

const calcular = () => {
  if (fases.value.some(f => !f.nome || f.dias <= 0 || f.valorDia <= 0)) {
    Swal.fire({ icon: 'error', title: 'Dados incompletos', text: 'Preencha todas as fases corretamente.', confirmButtonColor: '#2563eb' })
    return
  }

  const fasesCalc: FaseResultado[] = fases.value.map(f => ({
    ...f,
    total: Number(f.dias) * Number(f.valorDia) * Number(recursos.value),
  }))

  const custoBase        = fasesCalc.reduce((acc, f) => acc + f.total, 0)
  const valorContingencia = custoBase * (Number(contingencia.value) / 100)
  const totalFinal       = custoBase + valorContingencia
  const totalDias        = fases.value.reduce((acc, f) => acc + Number(f.dias), 0)
  const custoDiaMedio    = totalDias > 0 ? custoBase / totalDias : 0

  const inicio    = new Date(dataInicio.value + 'T00:00:00')
  const fim       = new Date(inicio)
  fim.setDate(fim.getDate() + totalDias)

  resultado.value = {
    custoBase, valorContingencia, totalFinal, totalDias,
    custoDiaMedio, fases: fasesCalc,
    dataFim: fmtData(fim),
    dataInicioFmt: fmtData(inicio),
  }
}

const limpar = () => {
  nomeProjeto.value = 'Projeto Alpha'
  recursos.value    = 2
  contingencia.value = 20
  dataInicio.value  = new Date().toISOString().split('T')[0]
  fases.value       = [
    { nome: 'Planejamento',  dias: 5,  valorDia: 300 },
    { nome: 'Desenvolvimento', dias: 20, valorDia: 400 },
    { nome: 'Testes',        dias: 5,  valorDia: 350 },
    { nome: 'Implantação',   dias: 3,  valorDia: 350 },
  ]
  resultado.value = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

