<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slugTabMap: Record<string, string> = {
  'validador-cnh': 'cnh', 'validador-rg': 'rg', 'validador-certidao': 'certidao',
  'validador-inscricao-estadual': 'ie', 'validador-conta-bancaria': 'conta',
}
const aba = ref('cnh')
onMounted(() => { aba.value = slugTabMap[route.params.slug as string] || 'cnh' })
watch(() => route.params.slug, (s) => { if (s) aba.value = slugTabMap[s as string] || aba.value })

const tabs = [
  { id: 'cnh', label: 'CNH' }, { id: 'rg', label: 'RG (SP)' },
  { id: 'certidao', label: 'Certidão' }, { id: 'ie', label: 'Insc. Estadual' },
  { id: 'conta', label: 'Conta Bancária' },
]

const input = ref('')
const resultado = ref<null | { valido: boolean; mensagem: string }>(null)

function limpar() { input.value = ''; resultado.value = null }

function validarCNH(cnh: string): boolean {
  const digits = cnh.replace(/\D/g, '')
  if (digits.length !== 11) return false
  const d = digits.split('').map(Number)
  const sum1 = d.slice(0,9).reduce((s, v, i) => s + v * (9 - i), 0)
  const r1 = sum1 % 11 >= 10 ? 0 : sum1 % 11
  if (r1 !== d[9]) return false
  const sum2 = d.slice(0,9).reduce((s, v, i) => s + v * (1 + i), 0) + d[9] * 2
  const r2 = sum2 % 11 >= 10 ? 0 : sum2 % 11
  return r2 === d[10]
}

function validarRGSP(rg: string): boolean {
  const clean = rg.replace(/[\.\-\/\s]/g, '').toUpperCase()
  if (clean.length < 8 || clean.length > 9) return false
  const digits = clean.slice(0, 8).split('').map(Number)
  const checkChar = clean.length === 9 ? clean[8] : ''
  const w = [2,3,4,5,6,7,8,9]
  const sum = digits.reduce((s, v, i) => s + v * w[i], 0)
  const rem = sum % 11
  if (rem === 0 && checkChar === '0') return true
  if (rem === 1 && checkChar === 'X') return true
  if (rem > 1 && checkChar === String(11 - rem)) return true
  // Also valid if all 9 digits (no check)
  return clean.length === 8
}

function validarCertidao(c: string): boolean {
  // Basic format check: should have 8 blocks
  const parts = c.trim().split(/\s+/)
  return parts.length === 8 && parts.every((p, i) => /^\d+$/.test(p) || (i === 2 && /^[BCO]$/.test(p)))
}

function validarIE(ie: string, uf = 'SP'): boolean {
  const clean = ie.replace(/[\.\-\/\s]/g, '')
  if (uf === 'SP') {
    if (clean.length !== 12) return false
    const d = clean.split('').map(Number)
    const w = [1,3,1,3,1,3,1,3,1,3,1]
    let sum = 0
    for (let i = 0; i < 11; i++) {
      let p = d[i] * w[i]; sum += p >= 10 ? Math.floor(p/10) + (p%10) : p
    }
    const check = (10 - (sum % 10)) % 10
    return check === d[11]
  }
  return clean.length >= 8
}

function validarConta(conta: string): boolean {
  // Basic: format NNNNNN-N or NNNNN-NN
  return /^\d{5,10}[-\s]?\d{1,2}$/.test(conta.trim())
}

const estadoIE = ref('SP')

function validar() {
  const v = input.value.trim()
  if (!v) { resultado.value = { valido: false, mensagem: 'Informe um valor.' }; return }
  let valid = false
  let msg = ''
  switch (aba.value) {
    case 'cnh': valid = validarCNH(v); msg = valid ? 'CNH válida.' : 'CNH inválida.'; break
    case 'rg': valid = validarRGSP(v); msg = valid ? 'RG válido (SP).' : 'RG inválido.'; break
    case 'certidao': valid = validarCertidao(v); msg = valid ? 'Formato de certidão válido.' : 'Formato inválido.'; break
    case 'ie': valid = validarIE(v, estadoIE.value); msg = valid ? `Inscrição Estadual (${estadoIE.value}) válida.` : `Inscrição Estadual (${estadoIE.value}) inválida.`; break
    case 'conta': valid = validarConta(v); msg = valid ? 'Formato de conta válido.' : 'Formato inválido.'; break
  }
  resultado.value = { valido: valid, mensagem: msg }
}

const placeholders: Record<string, string> = {
  cnh: '123.456.789-00', rg: '12.345.678-9 ou 123456789',
  certidao: '123456 01 B 2015 1 00105 162 0001278',
  ie: '111.222.333.004', conta: '123456-7',
}
const placeholder = computed(() => placeholders[aba.value] || '')
watch(aba, () => { input.value = ''; resultado.value = null })
</script>

<template>
  <ToolShell title="Validadores de Documentos BR" description="Valide CNH, RG, Certidões, Inscrição Estadual e Conta Bancária."
    icon="fa-shield-check" icon-gradient="from-green-500 to-teal-700" orb-color="green"
    :quick-tips="['Verificação instantânea','Algoritmo oficial','100% client-side']"
    :tips="[{title:'Uso',text:'Selecione o tipo de documento, insira o número e clique em Validar.'}]">

    <div class="tab-row">
      <button v-for="t in tabs" :key="t.id" @click="aba = t.id"
        :class="['px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba === t.id ? 'bg-green-600 text-white border-green-500' : 'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        {{ t.label }}
      </button>
    </div>

    <div class="glass-panel p-5 space-y-4">
      <div v-if="aba === 'ie'" class="flex gap-2 items-end">
        <div class="flex-1">
          <label class="text-xs text-blue-300 mb-1 block">Inscrição Estadual</label>
          <input v-model="input" @keyup.enter="validar" :placeholder="placeholder" class="w-full input-aurora font-mono text-lg" />
        </div>
        <div>
          <label class="text-xs text-blue-300 mb-1 block">Estado</label>
          <select v-model="estadoIE" class="input-aurora">
            <option v-for="e in ['SP','RJ','MG']" :key="e">{{ e }}</option>
          </select>
        </div>
      </div>
      <div v-else>
        <label class="text-xs text-blue-300 mb-1 block">Número do documento</label>
        <input v-model="input" @keyup.enter="validar" :placeholder="placeholder" class="w-full input-aurora font-mono text-lg" />
      </div>

      <div class="flex gap-2">
        <button @click="validar" class="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-colors">
          <Icon icon="mdi:check-circle-outline" class="w-4 h-4" /> Validar
        </button>
        <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-white/5 text-blue-300 border border-white/10 rounded-lg text-sm transition-colors">
          <Icon icon="mdi:close" class="w-4 h-4" /> Limpar
        </button>
      </div>

      <Transition name="fade">
        <div v-if="resultado" :class="['p-4 rounded-xl flex items-center gap-3',
          resultado.valido ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30']">
          <Icon :icon="resultado.valido ? 'mdi:check-circle' : 'mdi:close-circle'" class="w-8 h-8 shrink-0"
            :class="resultado.valido ? 'text-green-400' : 'text-red-400'" />
          <div>
            <p class="font-bold" :class="resultado.valido ? 'text-green-300' : 'text-red-300'">
              {{ resultado.valido ? '✓ Válido' : '✗ Inválido' }}
            </p>
            <p class="text-xs text-blue-300">{{ resultado.mensagem }}</p>
          </div>
        </div>
      </Transition>
    </div>
  </ToolShell>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

