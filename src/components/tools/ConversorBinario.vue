<template>
  <ToolShell
    title="Conversor Binário"
    description="Converta entre decimal, binário, octal e hexadecimal. Essencial para programação, redes e criptografia digital."
    icon="fa-hashtag"
    icon-gradient="from-rose-500 to-pink-700"
    orb-color="rose"
    :quick-tips="['Decimal · Binário · Octal · Hex', 'Conversão instantânea', 'Copia com 1 clique']"
    :tips="[
      { title: 'Binário (Base 2)', text: 'Linguagem nativa dos computadores. Apenas 0 e 1. 8 bits = 1 byte. Ex: 255 decimal = 11111111 binário.', type: 'info' },
      { title: 'Hexadecimal (Base 16)', text: 'Usado em cores CSS (#FF5733), endereços MAC e criptografia. 1 dígito hex = 4 bits (nibble).', type: 'info' },
      { title: 'Octal (Base 8)', text: 'Aparece em permissões Unix: chmod 755 = rwxr-xr-x. Cada dígito octal equivale a 3 bits.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Byte máximo', desc: '255 (decimal) em todas as bases', result: 'Binário: 11111111 | Octal: 377 | Hex: FF' },
      { title: 'Permissão Unix', desc: '755 (octal) em decimal e hex', result: 'Decimal: 493 | Binário: 111101101 | Hex: 1ED' },
      { title: 'Cor CSS', desc: 'FF (hex) em decimal e binário', result: 'Decimal: 255 | Binário: 11111111 | Octal: 377' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Entrada -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-4">
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-layer-group mr-1.5 text-rose-500"></i>
                Base de Origem
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                <button
                  v-for="b in bases"
                  :key="b.value"
                  @click="baseOrigem = b.value; converter()"
                  :class="[
                    'p-3 rounded-xl border-2 transition-all text-center',
                    baseOrigem === b.value
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                      : 'border-gray-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-700',
                  ]"
                >
                  <div class="font-bold text-gray-900 dark:text-white text-sm">{{ b.label }}</div>
                  <div class="text-xs text-gray-500 dark:text-slate-400">{{ b.desc }}</div>
                </button>
              </div>
            </div>

            <BaseInput
              v-model="input"
              label="Valor"
              icon="fa-keyboard"
              :placeholder="getPlaceholder()"
              :hint="`Número em ${bases.find(b => b.value === baseOrigem)?.desc}`"
              tooltip="Digite o número na base selecionada acima para ver a conversão nas demais bases."
              @input="converter"
            />
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="outline" size="sm" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- Dica inline -->
        <div class="tip-card">
          <i class="fas fa-lightbulb text-amber-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">
            <strong>Dica:</strong> 1 byte pode armazenar valores de 0 (00000000) a 255 (11111111) no sistema binário.
          </span>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado !== null" class="space-y-3">
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">Valor em Decimal (Base 10)</p>
              <p class="text-5xl font-black text-white font-mono">{{ resultado }}</p>
            </div>

            <div class="space-y-2">
              <div
                v-for="conv in conversoes"
                :key="conv.nome"
                class="glass-panel p-4 flex items-center justify-between gap-3"
              >
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="badge-aurora-orange text-xs font-bold">{{ conv.nome }}</span>
                    <span class="text-xs text-gray-400 dark:text-slate-500">{{ conv.descricao }}</span>
                  </div>
                  <div class="text-xl font-mono font-black text-rose-600 dark:text-rose-400 break-all">{{ conv.valor }}</div>
                </div>
                <BaseButton variant="ghost" size="xs" icon="fa-copy" @click="copiar(conv.valor)" tooltip="Copiar valor" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-rose-100 dark:ring-rose-900">
                <div class="metric-glass-value text-rose-600 dark:text-rose-400">{{ input.toString().length }}</div>
                <div class="metric-glass-label">Dígitos entrada</div>
              </div>
              <div class="metric-glass ring-1 ring-pink-100 dark:ring-pink-900">
                <div class="metric-glass-value text-pink-600 dark:text-pink-400">{{ conversoes.find(c=>c.nome==='Binário')?.valor.length || 0 }}</div>
                <div class="metric-glass-label">Bits (binário)</div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="resultado === null" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-hashtag text-3xl mb-3 opacity-30 block text-rose-400"></i>
          <p class="text-sm">Selecione a base de origem e digite o número para ver as conversões</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const bases = [
  { value: 'decimal',     label: 'Decimal',     desc: 'Base 10' },
  { value: 'binario',     label: 'Binário',     desc: 'Base 2'  },
  { value: 'octal',       label: 'Octal',       desc: 'Base 8'  },
  { value: 'hexadecimal', label: 'Hexadecimal', desc: 'Base 16' },
]

const baseOrigem = ref('decimal')
const input      = ref('255')
const resultado  = ref(null)
const conversoes = ref([])

const getPlaceholder = () => ({
  decimal: '255', binario: '11111111', octal: '377', hexadecimal: 'FF',
}[baseOrigem.value])

const converter = () => {
  if (!input.value.trim()) {
    resultado.value = null
    conversoes.value = []
    return
  }

  try {
    let dec = 0
    switch (baseOrigem.value) {
      case 'decimal':
        dec = parseInt(input.value, 10)
        break
      case 'binario':
        if (!/^[01]+$/.test(input.value)) throw new Error('Binário deve conter apenas 0 e 1')
        dec = parseInt(input.value, 2)
        break
      case 'octal':
        if (!/^[0-7]+$/.test(input.value)) throw new Error('Octal deve conter apenas dígitos 0-7')
        dec = parseInt(input.value, 8)
        break
      case 'hexadecimal':
        if (!/^[0-9A-Fa-f]+$/.test(input.value)) throw new Error('Hexadecimal deve conter apenas 0-9 e A-F')
        dec = parseInt(input.value, 16)
        break
    }
    if (isNaN(dec)) throw new Error('Valor inválido')

    conversoes.value = [
      { nome: 'Decimal',     descricao: 'Base 10', valor: dec.toString(10) },
      { nome: 'Binário',     descricao: 'Base 2',  valor: dec.toString(2)  },
      { nome: 'Octal',       descricao: 'Base 8',  valor: dec.toString(8)  },
      { nome: 'Hexadecimal', descricao: 'Base 16', valor: dec.toString(16).toUpperCase() },
    ]
    resultado.value = dec
  } catch (e) {
    resultado.value = null
    conversoes.value = []
    Swal.fire({ title: 'Erro de Conversão', text: e.message, icon: 'error', confirmButtonColor: '#2563eb' })
  }
}

const limpar = () => {
  input.value = ''
  resultado.value = null
  conversoes.value = []
}

const copiar = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto)
    Swal.fire({ title: 'Copiado!', icon: 'success', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
