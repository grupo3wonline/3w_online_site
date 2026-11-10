<template>
  <ToolShell
    title="Conversor Numérico"
    description="Converta entre decimal, binário, octal, hexadecimal e números romanos. Suporte a inteiros e representação por extenso."
    icon="fa-hashtag"
    icon-gradient="from-green-500 to-teal-700"
    orb-color="teal"
    :quick-tips="['5 sistemas numéricos', 'Inclui Números Romanos', 'Copia resultados individualmente']"
    :tips="[
      { title: 'Decimal → Binário', text: 'Divida o número por 2 repetidamente e leia os restos de baixo para cima. Ex: 10 ÷ 2 = 5 R0 → 5 ÷ 2 = 2 R1 → ... = 1010.', type: 'info' },
      { title: 'Prefixos padrão', text: 'Em linguagens de programação: 0b1010 = binário, 0o17 = octal, 0x1F = hexadecimal. Este conversor aceita os números sem prefixo.', type: 'info' },
      { title: 'Números Romanos', text: 'O sistema romano suporta apenas inteiros de 1 a 3.999. Para romano → decimal, use apenas I, V, X, L, C, D, M.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Número 255', desc: '255 (decimal) em todos os sistemas', result: 'Binário: 11111111 | Octal: 377 | Hex: FF | Romano: CCLV' },
      { title: 'Número binário', desc: '1010 (binário) em decimal', result: 'Decimal: 10 | Octal: 12 | Hex: A | Romano: X' },
      { title: 'Ano atual', desc: '2024 (decimal) em romano', result: 'Romano: MMXXIV | Hex: 7E8 | Binário: 11111101000' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Entrada -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-4">
            <BaseInput
              v-model="numeroEntrada"
              label="Número de Entrada"
              icon="fa-keyboard"
              placeholder="Digite um número"
              tooltip="Digite o número no formato da base selecionada abaixo."
              hint="Ex: 255 (decimal), FF (hex), 11111111 (binário)"
              @input="converter"
            />

            <div>
              <label class="input-aurora-label">
                <i class="fas fa-layer-group mr-1.5 text-teal-500"></i>
                Tipo de Entrada
              </label>
              <div class="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
                <button
                  v-for="tipo in tipos"
                  :key="tipo.value"
                  @click="tipoEntrada = tipo.value; converter()"
                  :class="[
                    'p-2 rounded-xl border-2 transition-all text-center',
                    tipoEntrada === tipo.value
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : 'border-gray-200 dark:border-slate-700 hover:border-teal-300',
                  ]"
                >
                  <div class="text-xs font-bold text-gray-700 dark:text-white">{{ tipo.label }}</div>
                </button>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="outline" size="sm" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- Erro -->
        <div v-if="erro" class="tip-card-warning">
          <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0"></i>
          <span class="text-xs">{{ erro }}</span>
        </div>

        <!-- Dica -->
        <div class="tip-card">
          <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">Para hexadecimal, use letras maiúsculas ou minúsculas (A-F). Para romano, use I, V, X, L, C, D, M.</span>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="numeroEntrada && !erro && resultados.length" class="space-y-3">
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">Valor em Decimal</p>
              <p class="text-5xl font-black text-white font-mono">{{ decimalValue }}</p>
            </div>

            <div class="space-y-2">
              <div
                v-for="res in resultados"
                :key="res.tipo"
                class="glass-panel p-4 flex items-center justify-between gap-3"
              >
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="badge-aurora-teal text-xs font-bold">{{ res.label }}</span>
                  </div>
                  <div class="text-xl font-mono font-black text-teal-600 dark:text-teal-400 break-all">{{ res.valor }}</div>
                </div>
                <BaseButton variant="ghost" size="xs" icon="fa-copy" @click="copiar(res.valor)" tooltip="Copiar" />
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!numeroEntrada || (!resultados.length && !erro)" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-hashtag text-3xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Digite um número e selecione o tipo de entrada para converter entre os sistemas</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

const tipos = [
  { value: 'decimal',     label: 'Decimal'  },
  { value: 'binario',     label: 'Binário'  },
  { value: 'octal',       label: 'Octal'    },
  { value: 'hexadecimal', label: 'Hex'      },
  { value: 'romano',      label: 'Romano'   },
]

const numeroEntrada = ref('')
const tipoEntrada   = ref('decimal')
const erro          = ref('')

const validarBinario     = (n) => /^[01]+$/.test(n)
const validarOctal       = (n) => /^[0-7]+$/.test(n)
const validarDecimal     = (n) => /^\d+$/.test(n)
const validarHexadecimal = (n) => /^[0-9A-Fa-f]+$/.test(n)
const validarRomano      = (n) => /^[IVXLCDMivxlcdm]+$/.test(n)

const romanoParaDecimal = (romano) => {
  const vals = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 }
  const r = romano.toUpperCase()
  let total = 0
  for (let i = 0; i < r.length; i++) {
    const a = vals[r[i]], b = vals[r[i+1]]
    total += (b && a < b) ? -a : a
  }
  return total
}

const decimalParaRomano = (num) => {
  if (num <= 0 || num > 3999) return 'Fora do intervalo (1–3999)'
  const tbl = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]
  let r = ''
  for (const [v, s] of tbl) while (num >= v) { r += s; num -= v }
  return r
}

const entradaParaDecimal = () => {
  const n = numeroEntrada.value.trim()
  if (!n) { erro.value = ''; return null }
  try {
    switch (tipoEntrada.value) {
      case 'decimal':
        if (!validarDecimal(n)) { erro.value = 'Número decimal inválido'; return null }
        return parseInt(n, 10)
      case 'binario':
        if (!validarBinario(n)) { erro.value = 'Binário: use apenas 0 e 1'; return null }
        return parseInt(n, 2)
      case 'octal':
        if (!validarOctal(n)) { erro.value = 'Octal: use apenas dígitos 0-7'; return null }
        return parseInt(n, 8)
      case 'hexadecimal':
        if (!validarHexadecimal(n)) { erro.value = 'Hex: use 0-9 e A-F'; return null }
        return parseInt(n, 16)
      case 'romano':
        if (!validarRomano(n)) { erro.value = 'Romano: use I, V, X, L, C, D, M'; return null }
        return romanoParaDecimal(n)
      default: return null
    }
  } catch { erro.value = 'Erro ao converter'; return null }
}

const decimalValue = computed(() => {
  const d = entradaParaDecimal()
  return d !== null ? d.toString() : ''
})

const resultados = computed(() => {
  const dec = entradaParaDecimal()
  if (dec === null) return []
  return [
    { tipo: 'decimal',     label: 'Decimal',     valor: dec.toString(10) },
    { tipo: 'binario',     label: 'Binário',     valor: dec.toString(2)  },
    { tipo: 'octal',       label: 'Octal',       valor: dec.toString(8)  },
    { tipo: 'hexadecimal', label: 'Hexadecimal', valor: dec.toString(16).toUpperCase() },
    { tipo: 'romano',      label: 'Romano',      valor: decimalParaRomano(dec) },
  ].filter(r => r.tipo !== tipoEntrada.value)
})

const converter = () => {
  erro.value = ''
  entradaParaDecimal()
}

const limpar = () => {
  numeroEntrada.value = ''
  erro.value = ''
}

const copiar = async (valor) => {
  try {
    await navigator.clipboard.writeText(valor)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
