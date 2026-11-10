<template>
  <ToolShell
    title="Orçamento de Site"
    description="Estime o custo de desenvolvimento de sites e aplicações web com análise de complexidade."
    icon="fa-globe"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['6 tipos de projeto', 'Funcionalidades extras', 'Urgência e manutenção']"
    :tips="[
      { title: 'Escopo claro', text: 'Defina todas as funcionalidades antes de iniciar. Mudanças no meio do projeto aumentam o custo.', type: 'warning' },
      { title: 'Manutenção', text: 'Orçamente 5–10% do valor do projeto por mês para manutenção e suporte continuado.' },
      { title: 'Prazo e qualidade', text: 'Prazos muito curtos aumentam o custo em até 50% (horas extras) e reduzem a qualidade.', type: 'info' },
    ]"
    :examples="[
      { title: 'Landing page simples', desc: '1 página, design básico, formulário de contato, 30 dias', result: 'R$ 1.800 ~ R$ 2.400' },
      { title: 'E-commerce completo', desc: 'Design premium, pagamento, galeria, área de membros, 60 dias', result: 'R$ 20.000 ~ R$ 25.000' },
      { title: 'Aplicação web', desc: 'Webapp, 10 páginas, API, chat, multi-idioma, 90 dias', result: 'R$ 30.000+' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <!-- Tipo de site -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-layer-group mr-1.5 text-blue-500"></i>
                Tipo de Projeto
              </label>
              <select v-model="tipoSite" class="input-aurora mt-1">
                <option value="landing">Landing Page</option>
                <option value="institucional">Site Institucional</option>
                <option value="portfolio">Portfólio</option>
                <option value="ecommerce">E-commerce</option>
                <option value="blog">Blog / Conteúdo</option>
                <option value="webapp">Aplicação Web</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="numeroPaginas"
                label="Nº de Páginas"
                type="number"
                :min="1"
                :max="100"
                icon="fa-file-alt"
                tooltip="Número de páginas/telas únicas do projeto."
              />
              <BaseInput
                v-model="prazo"
                label="Prazo (dias)"
                type="number"
                :min="7"
                :max="365"
                icon="fa-calendar"
                tooltip="Prazo total de entrega em dias corridos. Prazos &lt; 15 dias geram urgência."
              />
            </div>

            <!-- Design -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-palette mr-1.5 text-blue-500"></i>
                Complexidade do Design
              </label>
              <select v-model="complexidadeDesign" class="input-aurora mt-1">
                <option value="basico">Básico (Template pronto)</option>
                <option value="intermediario">Intermediário (Customizado)</option>
                <option value="avancado">Avançado (Design premium)</option>
                <option value="personalizado">Totalmente personalizado</option>
              </select>
            </div>

            <!-- Funcionalidades -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-cogs mr-1.5 text-blue-500"></i>
                Funcionalidades Adicionais
              </label>
              <div class="grid grid-cols-2 gap-2 mt-2">
                <label
                  v-for="func in funcList"
                  :key="func.key"
                  class="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                >
                  <input type="checkbox" v-model="funcionalidades[func.key]" class="checkbox-aurora" />
                  <span class="text-xs text-gray-700 dark:text-slate-300">{{ func.label }}</span>
                </label>
              </div>
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
            <!-- Destaque -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Orçamento Estimado</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.valorTotal }}</p>
              <p class="text-indigo-300 text-sm font-semibold">{{ resultado.complexidade }}</p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ resultado.prazoDesenvolvimento }}d</div>
                <div class="metric-glass-label">Prazo real</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ resultado.horasEstimadas }}h</div>
                <div class="metric-glass-label">Horas estimadas</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">R$ {{ resultado.valorHora }}</div>
                <div class="metric-glass-label">Valor/hora</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">R$ {{ resultado.manutencaoMensal }}</div>
                <div class="metric-glass-label">Manutenção/mês</div>
              </div>
            </div>

            <!-- Composição -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-blue-500"></i>
                Composição do Orçamento
              </h4>
              <div class="space-y-2 text-sm">
                <div v-for="(item, i) in resultado.breakdown" :key="i"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-400">{{ item.label }}</span>
                  <span class="font-bold text-gray-900 dark:text-white">R$ {{ item.valor }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-lightbulb text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">{{ resultado.dica }}</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-globe text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Configure o projeto e estime o orçamento</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const tipoSite          = ref('institucional')
const numeroPaginas     = ref(5)
const prazo             = ref(30)
const complexidadeDesign = ref('intermediario')

const funcList = [
  { key: 'formulario',  label: 'Formulário de Contato' },
  { key: 'blog',        label: 'Blog / Notícias'       },
  { key: 'galeria',     label: 'Galeria de Imagens'    },
  { key: 'multiidioma', label: 'Multi-idioma'          },
  { key: 'areaMembro',  label: 'Área de Membros'       },
  { key: 'pagamento',   label: 'Integração Pagamento'  },
  { key: 'chat',        label: 'Chat Online'           },
  { key: 'api',         label: 'Integração API'        },
]

const funcionalidades = ref<Record<string, boolean>>({
  formulario: true, blog: false, galeria: false, multiidioma: false,
  areaMembro: false, pagamento: false, chat: false, api: false,
})

const resultado = ref(null)

const valoresTipo    = { landing: 1500, institucional: 3000, portfolio: 2500, ecommerce: 8000, blog: 2000, webapp: 12000 }
const valoresDesign  = { basico: 0, intermediario: 1000, avancado: 2500, personalizado: 5000 }
const valoresFunc    = { formulario: 300, blog: 1500, galeria: 500, multiidioma: 2000, areaMembro: 3000, pagamento: 2500, chat: 800, api: 2000 }
const labelsDesign   = { basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado', personalizado: 'Personalizado' }
const labelsTipo     = { landing: 'Landing Page', institucional: 'Site Institucional', portfolio: 'Portfólio', ecommerce: 'E-commerce', blog: 'Blog', webapp: 'Aplicação Web' }

const calcular = () => {
  const valorBase   = valoresTipo[tipoSite.value]
  const valorPaginas = Math.max(0, (Number(numeroPaginas.value) - 1)) * 300
  const valorDesign = valoresDesign[complexidadeDesign.value]

  let valorFunc = 0
  Object.keys(funcionalidades.value).forEach(k => { if (funcionalidades.value[k]) valorFunc += valoresFunc[k] })

  const multUrgencia = Number(prazo.value) < 15 ? 1.5 : Number(prazo.value) < 30 ? 1.2 : 1
  const subtotal     = valorBase + valorPaginas + valorFunc + valorDesign
  const valorUrgencia = subtotal * (multUrgencia - 1)
  const valorTotal   = Math.round(subtotal * multUrgencia)

  const valorHora     = 80
  const horasEstimadas = Math.round(valorTotal / valorHora)
  const prazoDesenvolvimento = Math.max(Number(prazo.value), Math.ceil(horasEstimadas / 8))
  const manutencaoMensal     = Math.round(valorTotal * 0.05)
  const funcCount            = Object.values(funcionalidades.value).filter(Boolean).length

  const dica = multUrgencia > 1
    ? 'Prazo curto (+50%). Considere estender o prazo para reduzir custos.'
    : funcCount > 5
      ? 'Muitas funcionalidades. Desenvolva em fases para reduzir custo inicial.'
      : 'Invista em SEO técnico para potencializar o retorno do seu investimento.'

  resultado.value = {
    valorTotal: valorTotal.toLocaleString('pt-BR'),
    prazoDesenvolvimento,
    horasEstimadas,
    valorHora: valorHora.toLocaleString('pt-BR'),
    manutencaoMensal: manutencaoMensal.toLocaleString('pt-BR'),
    complexidade: `${horasEstimadas}h de desenvolvimento estimadas`,
    dica,
    breakdown: [
      { label: `Tipo (${labelsTipo[tipoSite.value]})`,       valor: valorBase.toLocaleString('pt-BR') },
      { label: `Páginas (${numeroPaginas.value}pgs)`,        valor: valorPaginas.toLocaleString('pt-BR') },
      { label: `Funcionalidades (${funcCount})`,             valor: valorFunc.toLocaleString('pt-BR') },
      { label: `Design (${labelsDesign[complexidadeDesign.value]})`, valor: valorDesign.toLocaleString('pt-BR') },
      { label: `Urgência (${prazo.value} dias)`,             valor: Math.round(valorUrgencia).toLocaleString('pt-BR') },
    ],
  }
}

const limpar = () => {
  tipoSite.value = 'institucional'; numeroPaginas.value = 5; prazo.value = 30
  complexidadeDesign.value = 'intermediario'
  Object.keys(funcionalidades.value).forEach(k => { funcionalidades.value[k] = k === 'formulario' })
  resultado.value = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
