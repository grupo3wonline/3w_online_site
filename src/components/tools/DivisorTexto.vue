<template>
  <ToolShell
    title="Divisor de Texto"
    description="Divida textos longos em partes iguais por caracteres, palavras, linhas ou número fixo de partes."
    icon="fa-scissors"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['4 modos de divisão', 'Mantém palavras inteiras', 'Cópia por parte']"
    :tips="[
      { title: 'Redes sociais', text: 'Use o modo Caracteres com 280 para dividir textos longos em tweets ou posts do Twitter/X.' },
      { title: 'SMS', text: 'Cada SMS suporta 160 caracteres. Divida mensagens longas para garantir o envio correto.', type: 'info' },
      { title: 'Manter palavras inteiras', text: 'Ative a opção para evitar que palavras sejam cortadas no meio da divisão.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Post para Twitter/X', desc: 'Texto longo, Modo: Caracteres, Máx: 280', result: 'N partes de até 280 caracteres cada' },
      { title: 'Capítulos de livro', desc: 'Texto longo, Modo: Palavras, Máx: 500', result: 'Partes com ~500 palavras' },
      { title: 'Divisão igualitária', desc: 'Texto longo, Modo: Partes, Número: 3', result: '3 partes de tamanho similar' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Texto de entrada -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-align-left mr-1.5 text-indigo-500"></i>
              Texto para dividir
            </label>
            <textarea
              v-model="textoEntrada"
              placeholder="Cole ou digite o texto que deseja dividir..."
              class="input-aurora resize-y"
              rows="10"
            ></textarea>
            <p class="input-aurora-hint">
              {{ textoEntrada.length.toLocaleString('pt-BR') }} caracteres
              · {{ palavras }} palavras
              · {{ linhas }} linhas
            </p>
          </div>

          <!-- Tipo de divisão -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-sliders mr-1.5 text-blue-500"></i>
              Dividir por
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="tipo in tiposDivisao"
                :key="tipo.value"
                @click="tipoDivisao = tipo.value"
                :class="[
                  'p-3 rounded-xl border-2 transition-all text-left',
                  tipoDivisao === tipo.value
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-slate-700 hover:border-indigo-300 text-gray-700 dark:text-slate-300'
                ]"
              >
                <i :class="[tipo.icon, 'mb-1 block text-sm']"></i>
                <div class="text-xs font-semibold">{{ tipo.label }}</div>
              </button>
            </div>
          </div>

          <!-- Configuração numérica -->
          <BaseInput
            v-if="tipoDivisao === 'caracteres'"
            v-model="maxCaracteres"
            label="Máx. de caracteres por parte"
            type="number"
            :min="1"
            icon="fa-text-width"
            tooltip="Número máximo de caracteres em cada parte."
            hint="Padrão: 280 (Twitter/X)"
          />
          <BaseInput
            v-if="tipoDivisao === 'palavras'"
            v-model="maxPalavras"
            label="Máx. de palavras por parte"
            type="number"
            :min="1"
            icon="fa-font"
            tooltip="Número máximo de palavras em cada parte."
          />
          <BaseInput
            v-if="tipoDivisao === 'linhas'"
            v-model="maxLinhas"
            label="Máx. de linhas por parte"
            type="number"
            :min="1"
            icon="fa-align-left"
            tooltip="Número máximo de linhas em cada parte."
          />
          <BaseInput
            v-if="tipoDivisao === 'partes'"
            v-model="numeroParts"
            label="Número de partes"
            type="number"
            :min="2"
            icon="fa-list-ol"
            tooltip="Quantidade exata de partes a serem criadas."
          />

          <!-- Opção palavras inteiras -->
          <label
            v-if="tipoDivisao === 'caracteres' || tipoDivisao === 'partes'"
            class="flex items-center gap-3 cursor-pointer"
          >
            <input
              v-model="manterPalavrasInteiras"
              type="checkbox"
              class="checkbox-aurora"
            />
            <span class="text-sm text-gray-700 dark:text-slate-200">Manter palavras inteiras</span>
          </label>

          <!-- Botões -->
          <div class="flex gap-3">
            <BaseButton variant="success" icon="fa-cut" @click="dividir" class="flex-1" :disabled="!textoEntrada">
              Dividir
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultados -->
      <div>
        <Transition name="scale-in">
          <div v-if="partes.length > 0" class="space-y-4">
            <!-- Cabeçalho do resultado -->
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">Texto dividido em</p>
              <p class="text-5xl font-black text-white mb-1">{{ partes.length }}</p>
              <p class="text-indigo-300 text-sm font-semibold">parte(s)</p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
                <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ mediaCaracteres }}</div>
                <div class="metric-glass-label">Média chars</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ menorParte }}~{{ maiorParte }}</div>
                <div class="metric-glass-label">Min~Max chars</div>
              </div>
            </div>

            <!-- Ação copiar tudo -->
            <BaseButton variant="outline" icon="fa-copy" @click="copiarTudo" class="w-full">
              Copiar tudo
            </BaseButton>

            <!-- Partes -->
            <div class="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              <div
                v-for="(parte, index) in partes"
                :key="index"
                class="glass-panel p-4"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <i class="fas fa-bookmark"></i>
                    Parte {{ index + 1 }}
                  </span>
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] text-gray-500 dark:text-slate-400">{{ parte.length }} chars</span>
                    <button
                      @click="copiarParte(parte, index)"
                      class="copy-btn"
                      title="Copiar esta parte"
                    >
                      <i class="fas fa-copy text-xs"></i>
                    </button>
                  </div>
                </div>
                <p class="text-gray-700 dark:text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{{ parte }}</p>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="partes.length === 0" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-scissors text-3xl mb-3 opacity-30 block text-indigo-400"></i>
          <p class="text-sm">Cole um texto e clique em <strong>Dividir</strong></p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const tiposDivisao = [
  { value: 'caracteres', label: 'Caracteres', icon: 'fas fa-text-width' },
  { value: 'palavras',   label: 'Palavras',   icon: 'fas fa-font' },
  { value: 'linhas',     label: 'Linhas',     icon: 'fas fa-align-left' },
  { value: 'partes',     label: 'Nº de partes', icon: 'fas fa-list-ol' },
]

const textoEntrada        = ref('')
const tipoDivisao         = ref('caracteres')
const maxCaracteres       = ref(280)
const maxPalavras         = ref(50)
const maxLinhas           = ref(10)
const numeroParts         = ref(3)
const manterPalavrasInteiras = ref(true)
const partes              = ref<string[]>([])

const palavras = computed(() => textoEntrada.value.trim() ? textoEntrada.value.trim().split(/\s+/).length : 0)
const linhas   = computed(() => textoEntrada.value ? textoEntrada.value.split('\n').length : 0)

const mediaCaracteres = computed(() => {
  if (!partes.value.length) return 0
  return Math.round(partes.value.reduce((s, p) => s + p.length, 0) / partes.value.length)
})
const menorParte = computed(() => partes.value.length ? Math.min(...partes.value.map(p => p.length)) : 0)
const maiorParte = computed(() => partes.value.length ? Math.max(...partes.value.map(p => p.length)) : 0)

const dividirPorCaracteres = () => {
  const resultado = []
  let restante = textoEntrada.value
  const max = Number(maxCaracteres.value)
  while (restante.length > 0) {
    let parte = restante.substring(0, max)
    if (manterPalavrasInteiras.value && restante.length > max) {
      const ult = parte.lastIndexOf(' ')
      if (ult > 0) parte = parte.substring(0, ult)
    }
    resultado.push(parte.trim())
    restante = restante.substring(parte.length).trim()
  }
  return resultado
}

const dividirPorPalavras = () => {
  const palavrasArr = textoEntrada.value.split(/\s+/)
  const resultado = []
  const max = Number(maxPalavras.value)
  for (let i = 0; i < palavrasArr.length; i += max) resultado.push(palavrasArr.slice(i, i + max).join(' '))
  return resultado
}

const dividirPorLinhas = () => {
  const linhasArr = textoEntrada.value.split('\n')
  const resultado = []
  const max = Number(maxLinhas.value)
  for (let i = 0; i < linhasArr.length; i += max) resultado.push(linhasArr.slice(i, i + max).join('\n'))
  return resultado
}

const dividirEmPartes = () => {
  const resultado = []
  const num = Number(numeroParts.value)
  const tamanho = Math.ceil(textoEntrada.value.length / num)
  let restante = textoEntrada.value
  while (restante.length > 0 && resultado.length < num) {
    let parte = restante.substring(0, tamanho)
    if (manterPalavrasInteiras.value && restante.length > tamanho) {
      const ult = parte.lastIndexOf(' ')
      if (ult > 0) parte = parte.substring(0, ult)
    }
    resultado.push(parte.trim())
    restante = restante.substring(parte.length).trim()
  }
  return resultado
}

const dividir = () => {
  if (!textoEntrada.value.trim()) {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'Digite um texto para dividir', confirmButtonColor: '#2563eb' })
    return
  }
  switch (tipoDivisao.value) {
    case 'caracteres': partes.value = dividirPorCaracteres(); break
    case 'palavras':   partes.value = dividirPorPalavras();   break
    case 'linhas':     partes.value = dividirPorLinhas();     break
    case 'partes':     partes.value = dividirEmPartes();      break
  }
}

const copiarParte = async (parte: string, index: number) => {
  try {
    await navigator.clipboard.writeText(parte)
    Swal.fire({ icon: 'success', title: `Parte ${index + 1} copiada`, timer: 1200, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const copiarTudo = async () => {
  try {
    await navigator.clipboard.writeText(partes.value.join('\n\n--- Parte ---\n\n'))
    Swal.fire({ icon: 'success', title: 'Todas as partes copiadas', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const limpar = () => {
  textoEntrada.value = ''; partes.value = []
  maxCaracteres.value = 280; maxPalavras.value = 50
  maxLinhas.value = 10; numeroParts.value = 3
  manterPalavrasInteiras.value = true
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
