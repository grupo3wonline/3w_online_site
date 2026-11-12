<template>
  <ToolShell
    title="Simulador de Seguro"
    description="Estime o prêmio de seguro para automóvel, residencial ou vida com base no perfil de risco."
    icon="fa-shield-halved"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Comparar CET entre seguradoras', 'Franquia maior = prêmio menor', 'Perfil de risco define valor']"
    :tips="[
      { title: 'Compare cotações', text: 'Sempre compare o CET (Custo Efetivo Total) em pelo menos 3 seguradoras diferentes. Preços podem variar em até 50%.', type: 'info' },
      { title: 'Franquia e bônus', text: 'Franquia maior reduz o prêmio anual. Bônus por não sinistro pode reduzir até 50% do prêmio após alguns anos sem acionamento.' },
      { title: 'Perfil de risco', text: 'Jovens (< 25 anos), fumantes e uso profissional (Uber) pagam prêmios maiores. Perfil influencia significativamente o valor.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Carro R$ 50.000, 30 anos, lazer', desc: 'Franquia R$ 2.000, perfil médio', result: 'Prêmio estimado: ~R$ 3.500/ano (R$ 292/mês)' },
      { title: 'Residência R$ 300.000', desc: 'Com cobertura incêndio e roubo', result: 'Prêmio estimado: ~R$ 1.800/ano (R$ 150/mês)' },
      { title: 'Vida, 35 anos, não fumante', desc: 'Capital R$ 500.000', result: 'Prêmio estimado: ~R$ 1.000/ano (R$ 83/mês)' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <!-- Tipo de seguro -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-shield-halved mr-1.5 text-blue-500"></i>
                Tipo de Seguro
              </label>
              <div class="grid grid-cols-3 gap-2 mt-1">
                <button
                  v-for="tipo in tiposSeguro" :key="tipo.value"
                  @click="tipoSeguro = tipo.value; resultado = null"
                  :class="['p-2.5 rounded-xl border-2 text-sm transition-all text-center', tipoSeguro === tipo.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-slate-600']"
                >
                  <i :class="['fas', tipo.icon, 'text-lg mb-1 block', tipoSeguro === tipo.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400']"></i>
                  <div class="font-bold text-xs">{{ tipo.label }}</div>
                </button>
              </div>
            </div>

            <!-- Campos Automóvel -->
            <template v-if="tipoSeguro === 'auto'">
              <BaseInput v-model="valorVeiculo" label="Valor do Veículo (R$)" type="number" :min="0" step="1000" icon="fa-car" placeholder="50000" @input="calcularAuto" />
              <BaseInput v-model="idadeCondutor" label="Idade do Condutor" type="number" :min="18" :max="100" icon="fa-user" placeholder="30" @input="calcularAuto" />
              <div>
                <label class="input-aurora-label">
                  <i class="fas fa-route mr-1.5 text-blue-500"></i>
                  Perfil de Uso
                </label>
                <select v-model="perfilUso" class="input-aurora" @change="calcularAuto">
                  <option value="lazer">Lazer (uso eventual)</option>
                  <option value="trabalho">Trabalho (uso diário)</option>
                  <option value="uber">Uber/App (profissional)</option>
                </select>
              </div>
              <BaseInput v-model="franquia" label="Franquia (R$)" type="number" :min="0" step="500" icon="fa-dollar-sign" placeholder="2000" hint="Franquia maior = prêmio menor" @input="calcularAuto" />
            </template>

            <!-- Campos Residencial -->
            <template v-if="tipoSeguro === 'residencial'">
              <BaseInput v-model="valorImovel" label="Valor do Imóvel (R$)" type="number" :min="0" step="10000" icon="fa-home" placeholder="300000" @input="calcularAuto" />
              <BaseInput v-model="valorConteudo" label="Valor do Conteúdo (R$)" type="number" :min="0" step="5000" icon="fa-couch" placeholder="50000" hint="Móveis, eletrodomésticos, etc." @input="calcularAuto" />
              <label class="checkbox-aurora cursor-pointer select-none">
                <input v-model="coberturaIncendio" type="checkbox" class="w-4 h-4 rounded text-blue-600" @change="calcularAuto" />
                <span class="text-sm font-medium">Cobertura contra incêndio</span>
              </label>
              <label class="checkbox-aurora cursor-pointer select-none">
                <input v-model="coberturaRoubo" type="checkbox" class="w-4 h-4 rounded text-blue-600" @change="calcularAuto" />
                <span class="text-sm font-medium">Cobertura contra roubo</span>
              </label>
            </template>

            <!-- Campos Vida -->
            <template v-if="tipoSeguro === 'vida'">
              <BaseInput v-model="capitalSegurado" label="Capital Segurado (R$)" type="number" :min="0" step="10000" icon="fa-hand-holding-dollar" placeholder="500000" @input="calcularAuto" />
              <BaseInput v-model="idadeContratante" label="Idade do Contratante" type="number" :min="18" :max="80" icon="fa-user" placeholder="35" @input="calcularAuto" />
              <label class="checkbox-aurora cursor-pointer select-none">
                <input v-model="fumante" type="checkbox" class="w-4 h-4 rounded text-blue-600" @change="calcularAuto" />
                <span class="text-sm font-medium">Fumante (aumento de até 50%)</span>
              </label>
            </template>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-shield-halved" @click="calcular" class="flex-1">
              Calcular Prêmio
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
              <p class="text-sm text-blue-200 mb-1">Prêmio Anual Estimado</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.premioAnual }}</p>
              <p class="text-indigo-300 text-sm font-semibold">
                <i class="fas fa-calendar-alt mr-1"></i>
                ou 12× R$ {{ resultado.premioMensal }} · Perfil: {{ resultado.perfil }}
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ resultado.percentual }}%</div>
                <div class="metric-glass-label">% do valor segurado</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.cobertura }}</div>
                <div class="metric-glass-label">Cobertura total</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">R$ {{ resultado.premioMensal }}</div>
                <div class="metric-glass-label">Prêmio mensal</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">R$ {{ resultado.custoCincoAnos }}</div>
                <div class="metric-glass-label">Custo 5 anos</div>
              </div>
            </div>

            <div class="tip-card-warning">
              <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Valor estimado. Sempre solicite cotações em pelo menos 3 seguradoras para comparar o CET real.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-shield-halved text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Selecione o tipo de seguro e preencha os dados para estimar o prêmio</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const tipoSeguro        = ref('auto')
const valorVeiculo      = ref(50000)
const idadeCondutor     = ref(30)
const perfilUso         = ref('lazer')
const franquia          = ref(2000)
interface ResultadoSeguro {
  premioAnual: string; premioMensal: string; parcelas: string
  cobertura: string; percentual: string; custoCincoAnos: string; perfil: string
}

const valorImovel       = ref(300000)
const valorConteudo     = ref(50000)
const coberturaIncendio = ref(true)
const coberturaRoubo    = ref(true)
const capitalSegurado   = ref(500000)
const idadeContratante  = ref(35)
const fumante           = ref(false)
const resultado         = ref<ResultadoSeguro | null>(null)

const tiposSeguro = [
  { value: 'auto',        label: 'Automóvel',   icon: 'fa-car' },
  { value: 'residencial', label: 'Residencial', icon: 'fa-home' },
  { value: 'vida',        label: 'Vida',         icon: 'fa-heart' },
]

function calcular() {
  let premioAnual = 0, cobertura = 0, perfil = 'Médio'

  if (tipoSeguro.value === 'auto') {
    const valor = Number(valorVeiculo.value)
    const idade = Number(idadeCondutor.value)
    if (!valor) { Swal.fire({ icon: 'warning', title: 'Informe o valor do veículo', confirmButtonColor: '#2563eb' }); return }
    let taxa = 0.06
    if (idade < 25) taxa += 0.02
    else if (idade > 60) taxa += 0.01
    if (perfilUso.value === 'trabalho') taxa += 0.01
    else if (perfilUso.value === 'uber') taxa += 0.03
    if (Number(franquia.value) > 3000) taxa -= 0.01
    premioAnual = valor * taxa; cobertura = valor
    perfil = idade < 25 || perfilUso.value === 'uber' ? 'Alto' : idade > 50 && perfilUso.value === 'lazer' ? 'Baixo' : 'Médio'

  } else if (tipoSeguro.value === 'residencial') {
    const valorIm   = Number(valorImovel.value)
    const valorCont = Number(valorConteudo.value)
    if (!valorIm) { Swal.fire({ icon: 'warning', title: 'Informe o valor do imóvel', confirmButtonColor: '#2563eb' }); return }
    let taxa = 0.003
    if (coberturaIncendio.value) taxa += 0.001
    if (coberturaRoubo.value)    taxa += 0.002
    premioAnual = (valorIm + valorCont) * taxa; cobertura = valorIm + valorCont
    perfil = coberturaIncendio.value && coberturaRoubo.value ? 'Completo' : 'Básico'

  } else if (tipoSeguro.value === 'vida') {
    const capital = Number(capitalSegurado.value)
    const idade   = Number(idadeContratante.value)
    if (!capital) { Swal.fire({ icon: 'warning', title: 'Informe o capital segurado', confirmButtonColor: '#2563eb' }); return }
    let taxa = idade < 30 ? 0.0015 : idade > 60 ? 0.007 : idade > 50 ? 0.004 : 0.002
    if (fumante.value) taxa *= 1.5
    premioAnual = capital * taxa; cobertura = capital
    perfil = fumante.value || idade > 60 ? 'Alto' : idade < 40 ? 'Baixo' : 'Médio'
  }

  resultado.value = {
    premioAnual:    premioAnual.toFixed(2),
    premioMensal:   (premioAnual / 12).toFixed(2),
    parcelas:       '12',
    cobertura:      cobertura.toFixed(2),
    percentual:     cobertura > 0 ? ((premioAnual / cobertura) * 100).toFixed(2) : '0',
    custoCincoAnos: (premioAnual * 5).toFixed(2),
    perfil,
  }
}

function calcularAuto() {
  calcular()
}

function limpar() {
  valorVeiculo.value = 50000; idadeCondutor.value = 30; perfilUso.value = 'lazer'
  franquia.value = 2000; valorImovel.value = 300000; valorConteudo.value = 50000
  coberturaIncendio.value = true; coberturaRoubo.value = true
  capitalSegurado.value = 500000; idadeContratante.value = 35; fumante.value = false
  resultado.value = null
}

watch(tipoSeguro, () => { resultado.value = null })
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

