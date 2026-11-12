<template>
  <ToolShell
    title="Calculadora Social Media"
    description="Calcule taxa de engajamento, crescimento de seguidores e projeções de redes sociais."
    icon="fa-hashtag"
    icon-gradient="from-pink-500 to-rose-700"
    orb-color="pink"
    :quick-tips="['Taxa de engajamento', 'Crescimento de seguidores', 'Projeção 30 dias']"
    :tips="[
      { title: 'Taxa de engajamento', text: 'Excelente: > 6% | Bom: 3–6% | Médio: 1–3% | Baixo: < 1%. Varia por plataforma e tamanho da conta.' },
      { title: 'Crescimento saudável', text: 'Viral: >10%/mês | Muito bom: 5–10% | Bom: 2–5% | Normal: <2%.', type: 'info' },
      { title: 'Qualidade > quantidade', text: 'Uma taxa de engajamento de 8% com 1.000 seguidores é melhor que 0,5% com 100.000.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Microinfluenciador', desc: '10.000 seguidores, 800 curtidas + 60 comentários + 40 compartilhamentos', result: 'Engajamento: 9% (Excelente)' },
      { title: 'Conta médiana', desc: '50.000 seguidores, 1.200 interações totais', result: 'Engajamento: 2,4% (Médio)' },
      { title: 'Crescimento mensal', desc: 'De 8.000 para 9.600 seguidores em 30 dias', result: 'Crescimento: 20% (Viral)' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <!-- Seleção de cálculo -->
          <div class="mb-4">
            <label class="input-aurora-label">
              <i class="fas fa-chart-pie mr-1.5 text-pink-500"></i>
              Tipo de Cálculo
            </label>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <button
                @click="tipoCalculo = 'engajamento'; resultado = null"
                :class="['p-3 rounded-xl border-2 transition-all text-center', tipoCalculo === 'engajamento' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 shadow-md' : 'border-gray-200 dark:border-slate-700 hover:border-rose-300']"
              >
                <i :class="['fas fa-heart text-xl mb-1 block', tipoCalculo === 'engajamento' ? 'text-rose-600 dark:text-rose-400' : 'text-gray-400']"></i>
                <span :class="['text-xs font-medium', tipoCalculo === 'engajamento' ? 'text-rose-900 dark:text-rose-300' : 'text-gray-500']">Engajamento</span>
              </button>
              <button
                @click="tipoCalculo = 'crescimento'; resultado = null"
                :class="['p-3 rounded-xl border-2 transition-all text-center', tipoCalculo === 'crescimento' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 shadow-md' : 'border-gray-200 dark:border-slate-700 hover:border-rose-300']"
              >
                <i :class="['fas fa-chart-line text-xl mb-1 block', tipoCalculo === 'crescimento' ? 'text-rose-600 dark:text-rose-400' : 'text-gray-400']"></i>
                <span :class="['text-xs font-medium', tipoCalculo === 'crescimento' ? 'text-rose-900 dark:text-rose-300' : 'text-gray-500']">Crescimento</span>
              </button>
            </div>
          </div>

          <!-- Engajamento -->
          <div v-if="tipoCalculo === 'engajamento'" class="glass-panel p-4 space-y-3">
            <BaseInput
              v-model="seguidores"
              label="Seguidores"
              type="number"
              :min="1"
              icon="fa-users"
              placeholder="10000"
              tooltip="Total de seguidores da conta."
            />
            <div class="grid grid-cols-3 gap-3">
              <BaseInput v-model="curtidas" label="Curtidas" type="number" :min="0" icon="fa-heart" tooltip="Média de curtidas por post." />
              <BaseInput v-model="comentarios" label="Comentários" type="number" :min="0" icon="fa-comment" tooltip="Média de comentários por post." />
              <BaseInput v-model="compartilhamentos" label="Compartilhamentos" type="number" :min="0" icon="fa-share" tooltip="Média de compartilhamentos/reposts." />
            </div>
          </div>

          <!-- Crescimento -->
          <div v-if="tipoCalculo === 'crescimento'" class="glass-panel p-4 space-y-3">
            <BaseInput
              v-model="seguidoresAnteriores"
              label="Seguidores (início do período)"
              type="number"
              :min="1"
              icon="fa-users"
              tooltip="Número de seguidores no início do período analisado."
            />
            <BaseInput
              v-model="seguidoresAtuais"
              label="Seguidores (atual)"
              type="number"
              :min="1"
              icon="fa-users-gear"
              tooltip="Número atual de seguidores."
            />
            <BaseInput
              v-model="periodoDias"
              label="Período (dias)"
              type="number"
              :min="1"
              icon="fa-calendar"
              hint="Ex.: 30 dias para mensal"
              tooltip="Duração do período em dias."
            />
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular
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
            <!-- Destaque -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ resultado.titulo }}</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.valor }}%</p>
              <p class="text-rose-300 text-sm font-semibold">{{ resultado.descricao }}</p>
            </div>

            <!-- Badge de classificação -->
            <div class="text-center">
              <span :class="['inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold', classificacaoClasse]">
                <i :class="classificacaoIcone"></i>
                {{ classificacao }}
              </span>
            </div>

            <!-- Métricas (engajamento) -->
            <div v-if="tipoCalculo === 'engajamento'" class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-pink-100 dark:ring-pink-900">
                <div class="metric-glass-value text-pink-600 dark:text-pink-400">{{ totalInteracoes }}</div>
                <div class="metric-glass-label">Total interações</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ alcance }}</div>
                <div class="metric-glass-label">Alcance estimado</div>
              </div>
            </div>

            <!-- Métricas (crescimento) -->
            <div v-if="tipoCalculo === 'crescimento'" class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-pink-100 dark:ring-pink-900">
                <div class="metric-glass-value text-pink-600 dark:text-pink-400">+{{ ganhoSeguidores }}</div>
                <div class="metric-glass-label">Novos seguidores</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">+{{ crescimentoDiario }}</div>
                <div class="metric-glass-label">Por dia</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ projecao30Dias.toLocaleString('pt-BR') }}</div>
                <div class="metric-glass-label">Projeção 30d</div>
              </div>
            </div>

            <!-- Referências -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <i class="fas fa-bookmark text-pink-500"></i>
                Referências do Mercado
              </h4>
              <div v-if="tipoCalculo === 'engajamento'" class="text-xs space-y-1 text-gray-600 dark:text-slate-400">
                <p>🏆 <strong>Excelente:</strong> &gt; 6% — comunidade muito ativa</p>
                <p>✅ <strong>Bom:</strong> 3–6% — engajamento acima da média</p>
                <p>⚠️ <strong>Médio:</strong> 1–3% — típico para contas grandes</p>
                <p>❌ <strong>Baixo:</strong> &lt; 1% — revisar estratégia de conteúdo</p>
              </div>
              <div v-else class="text-xs space-y-1 text-gray-600 dark:text-slate-400">
                <p>🚀 <strong>Viral:</strong> &gt; 10%/mês</p>
                <p>🏆 <strong>Muito bom:</strong> 5–10%/mês</p>
                <p>✅ <strong>Bom:</strong> 2–5%/mês</p>
                <p>⚠️ <strong>Normal:</strong> &lt; 2%/mês</p>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-chart-line text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Consistência no conteúdo é mais importante que quantidade. Poste com regularidade e qualidade.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-hashtag text-4xl mb-3 opacity-30 block text-pink-400"></i>
          <p class="text-sm">Informe os dados da sua conta e calcule as métricas</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const tipoCalculo = ref('engajamento')

const seguidores           = ref(10000)
const curtidas             = ref(500)
const comentarios          = ref(50)
const compartilhamentos    = ref(25)
const seguidoresAnteriores = ref(10000)
const seguidoresAtuais     = ref(12000)
const periodoDias          = ref(30)

interface ResultadoSocialMedia { titulo: string; valor: string; descricao: string }

const resultado       = ref<ResultadoSocialMedia | null>(null)
const totalInteracoes = computed(() => Number(curtidas.value) + Number(comentarios.value) + Number(compartilhamentos.value))
const alcance         = computed(() => Math.round(Number(seguidores.value) * 0.3).toLocaleString('pt-BR'))
const ganhoSeguidores = computed(() => Number(seguidoresAtuais.value) - Number(seguidoresAnteriores.value))
const crescimentoDiario = computed(() => periodoDias.value > 0 ? Math.round(ganhoSeguidores.value / Number(periodoDias.value)) : 0)
const projecao30Dias  = computed(() => Number(seguidoresAtuais.value) + crescimentoDiario.value * 30)

const taxaAtual = computed(() => resultado.value ? parseFloat(resultado.value.valor) : 0)

const classificacao = computed(() => {
  const t = taxaAtual.value
  if (tipoCalculo.value === 'engajamento') {
    if (t > 6) return 'Excelente 🏆'; if (t > 3) return 'Bom ✅'; if (t > 1) return 'Médio ⚠️'; return 'Baixo ❌'
  }
  if (t > 10) return 'Viral 🚀'; if (t > 5) return 'Muito bom 🏆'; if (t > 2) return 'Bom ✅'; return 'Normal ⚠️'
})

const classificacaoClasse = computed(() => {
  const t = taxaAtual.value
  if (t > 6 || (tipoCalculo.value === 'crescimento' && t > 10))
    return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
  if (t > 3 || (tipoCalculo.value === 'crescimento' && t > 5))
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
  if (t > 1 || (tipoCalculo.value === 'crescimento' && t > 2))
    return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
  return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
})

const classificacaoIcone = computed(() => {
  const t = taxaAtual.value
  if (t > 6 || (tipoCalculo.value === 'crescimento' && t > 10)) return 'fas fa-trophy'
  if (t > 3) return 'fas fa-thumbs-up'
  if (t > 1) return 'fas fa-exclamation-triangle'
  return 'fas fa-times-circle'
})

const calcular = () => {
  if (tipoCalculo.value === 'engajamento') {
    if (!seguidores.value || Number(seguidores.value) <= 0) {
      Swal.fire({ icon: 'error', title: 'Informe os seguidores', confirmButtonColor: '#2563eb' }); return
    }
    const taxa = (totalInteracoes.value / Number(seguidores.value)) * 100
    resultado.value = {
      titulo: 'Taxa de Engajamento',
      valor: taxa.toFixed(2),
      descricao: `${totalInteracoes.value.toLocaleString('pt-BR')} interações de ${Number(seguidores.value).toLocaleString('pt-BR')} seguidores`,
    }
  } else {
    if (!seguidoresAnteriores.value || Number(seguidoresAnteriores.value) <= 0) {
      Swal.fire({ icon: 'error', title: 'Informe os seguidores anteriores', confirmButtonColor: '#2563eb' }); return
    }
    const taxa = (ganhoSeguidores.value / Number(seguidoresAnteriores.value)) * 100
    resultado.value = {
      titulo: 'Taxa de Crescimento',
      valor: taxa.toFixed(2),
      descricao: `+${ganhoSeguidores.value.toLocaleString('pt-BR')} seguidores em ${periodoDias.value} dias`,
    }
  }
}

const limpar = () => {
  seguidores.value = 10000; curtidas.value = 500; comentarios.value = 50
  compartilhamentos.value = 25; seguidoresAnteriores.value = 10000
  seguidoresAtuais.value = 12000; periodoDias.value = 30; resultado.value = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
