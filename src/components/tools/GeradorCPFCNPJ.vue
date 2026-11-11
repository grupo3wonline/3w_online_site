<template>
  <ToolShell
    title="Gerador de CPF & CNPJ"
    description="Gere CPFs e CNPJs matematicamente válidos para ambientes de teste e desenvolvimento. APENAS para testes."
    icon="fa-id-card"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Algoritmo oficial', 'Validação integrada', 'Download em lote']"
    :tips="[
      { title: 'APENAS para desenvolvimento', text: 'Os documentos gerados são válidos matematicamente mas NÃO correspondem a pessoas ou empresas reais. Use apenas em ambientes de teste/homologação.', type: 'warning' },
      { title: 'CPF gerado com dígitos verificadores reais', text: 'O algoritmo usa a mesma fórmula da Receita Federal (Módulo 11) garantindo que o CPF/CNPJ seja aceito em campos com validação.', type: 'info' },
    ]"
    :examples="[
      { title: 'CPF de teste', desc: '10 dígitos + 2 verificadores', code: '111.444.777-35', result: 'Válido matematicamente' },
      { title: 'CNPJ de teste', desc: '12 dígitos + 2 verificadores', code: '11.222.333/0001-81', result: 'Matriz, filial 0001' },
    ]"
  >

    <div class="tool-body">
      <!-- Toggle CPF / CNPJ -->
      <div class="flex gap-2 p-1 bg-gray-100 dark:bg-slate-700 rounded-xl mb-4">
        <button
          :class="['flex-1 py-3 rounded-lg text-sm font-semibold transition-all flex flex-col items-center gap-1',
            tipo === 'cpf' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600']"
          @click="tipo = 'cpf'; gerar()"
        >
          <i class="fas fa-user text-lg"></i>
          <span>CPF</span>
        </button>
        <button
          :class="['flex-1 py-3 rounded-lg text-sm font-semibold transition-all flex flex-col items-center gap-1',
            tipo === 'cnpj' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600']"
          @click="tipo = 'cnpj'; gerar()"
        >
          <i class="fas fa-building text-lg"></i>
          <span>CNPJ</span>
        </button>
      </div>

      <!-- Configurações -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <BaseInput
          v-model="quantidade"
          label="Quantidade" type="number" :min="1" :max="50"
          icon="fa-hashtag" placeholder="5"
          tooltip="Gere entre 1 e 50 documentos por vez."
        />
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="input-aurora-label !mb-0">
              <i class="fas fa-paint-brush mr-1 text-blue-500"></i>
              Formatação
            </label>
          </div>
          <div class="flex gap-2 mt-1">
            <label class="checkbox-aurora flex-1">
              <input type="checkbox" v-model="formatado" class="w-4 h-4 accent-blue-600" @change="gerar" />
              <span class="text-xs">Com pontuação</span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex gap-3">
        <BaseButton variant="primary" icon="fa-rotate" @click="gerar" class="flex-1">
          Gerar {{ tipo.toUpperCase() }}(s)
        </BaseButton>
        <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- Lista de documentos -->
    <Transition name="scale-in">
      <div v-if="documentos.length > 0" class="mt-4 space-y-3">

        <!-- Aviso -->
        <div class="tip-card-warning">
          <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">
            <strong>⚠️ Aviso:</strong> Use APENAS em testes, desenvolvimento e homologação.
            NÃO use em produção ou para fraudes — crime previsto no Art. 297 do Código Penal.
          </span>
        </div>

        <!-- Ações -->
        <div class="flex gap-2">
          <button @click="copiarTodos" class="copy-btn flex-1 justify-center py-2.5">
            <i class="fas fa-copy"></i> Copiar todos
          </button>
          <button @click="baixarTxt" class="copy-btn flex-1 justify-center py-2.5">
            <i class="fas fa-download"></i> Baixar .txt
          </button>
        </div>

        <!-- Lista -->
        <div class="glass-panel overflow-hidden">
          <div class="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-700">
            <div
              v-for="(doc, i) in documentos"
              :key="i"
              class="flex items-center justify-between px-4 py-3 hover:bg-primary-50/40 dark:hover:bg-primary-900/10 transition-colors group"
            >
              <div class="flex-1">
                <code class="text-sm text-blue-600 dark:text-blue-300 font-mono">{{ doc }}</code>
                <span class="ml-2 text-[10px] text-emerald-500 dark:text-emerald-400">
                  <i class="fas fa-check-circle"></i> válido
                </span>
              </div>
              <button
                @click="copiarUm(doc)"
                class="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 ml-2"
                title="Copiar"
              >
                <i class="fas fa-copy text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Validador inline -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-shield-halved text-blue-500"></i>
            Validar {{ tipo.toUpperCase() }}
          </h4>
          <div class="flex gap-2">
            <input
              v-model="docParaValidar"
              type="text"
              :placeholder="`Cole um ${tipo.toUpperCase()} para validar`"
              class="input-aurora flex-1 font-mono"
            />
            <BaseButton variant="primary" icon="fa-check" @click="validar" size="sm">
              Validar
            </BaseButton>
          </div>
          <Transition name="scale-in">
            <div v-if="resultadoVal !== null" class="mt-3 flex items-center gap-2 text-sm font-semibold"
              :class="resultadoVal ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'">
              <i :class="['fas', resultadoVal ? 'fa-check-circle' : 'fa-times-circle']"></i>
              {{ resultadoVal ? `${tipo.toUpperCase()} válido!` : `${tipo.toUpperCase()} inválido.` }}
            </div>
          </Transition>
        </div>
      </div>
    </Transition>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const tipo           = ref<'cpf' | 'cnpj'>('cpf')
const quantidade     = ref<number | ''>(5)
const formatado      = ref(true)
const documentos     = ref<string[]>([])
const docParaValidar = ref('')
const resultadoVal   = ref<boolean | null>(null)

// ── Geração ───────────────────────────────────────────────────────────────────
function gerarCPF(): string {
  const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
  let s = n.reduce((acc, v, i) => acc + v * (10 - i), 0)
  let d1 = 11 - s % 11; if (d1 > 9) d1 = 0; n.push(d1)
  s = n.reduce((acc, v, i) => acc + v * (11 - i), 0)
  let d2 = 11 - s % 11; if (d2 > 9) d2 = 0; n.push(d2)
  const str = n.join('')
  return formatado.value ? str.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : str
}

function gerarCNPJ(): string {
  const n = [...Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)), 0, 0, 0, 1]
  const p1 = [5,4,3,2,9,8,7,6,5,4,3,2]
  let s = n.reduce((a, v, i) => a + v * p1[i], 0); let d1 = s % 11; d1 = d1 < 2 ? 0 : 11 - d1; n.push(d1)
  const p2 = [6,5,4,3,2,9,8,7,6,5,4,3,2]
  s = n.reduce((a, v, i) => a + v * p2[i], 0); let d2 = s % 11; d2 = d2 < 2 ? 0 : 11 - d2; n.push(d2)
  const str = n.join('')
  return formatado.value ? str.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : str
}

function gerar() {
  const qtd = Number(quantidade.value) || 1
  if (qtd < 1 || qtd > 50) {
    Swal.fire({ icon: 'warning', title: 'Entre 1 e 50 documentos', confirmButtonColor: '#2563eb' }); return
  }
  documentos.value = Array.from({ length: qtd }, () => tipo.value === 'cpf' ? gerarCPF() : gerarCNPJ())
}

// ── Validação ─────────────────────────────────────────────────────────────────
function validarCPF(cpf: string): boolean {
  const n = cpf.replace(/\D/g, '')
  if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false
  let s = 0; for (let i = 0; i < 9; i++) s += +n[i] * (10 - i)
  let d = 11 - s % 11; if (d > 9) d = 0; if (d !== +n[9]) return false
  s = 0; for (let i = 0; i < 10; i++) s += +n[i] * (11 - i)
  d = 11 - s % 11; if (d > 9) d = 0; return d === +n[10]
}

function validarCNPJ(cnpj: string): boolean {
  const n = cnpj.replace(/\D/g, '')
  if (n.length !== 14 || /^(\d)\1+$/.test(n)) return false
  const p1 = [5,4,3,2,9,8,7,6,5,4,3,2]
  let s = p1.reduce((a, v, i) => a + +n[i] * v, 0); let d = s % 11; d = d < 2 ? 0 : 11 - d; if (d !== +n[12]) return false
  const p2 = [6,5,4,3,2,9,8,7,6,5,4,3,2]
  s = p2.reduce((a, v, i) => a + +n[i] * v, 0); d = s % 11; d = d < 2 ? 0 : 11 - d; return d === +n[13]
}

function validar() {
  if (!docParaValidar.value) return
  resultadoVal.value = tipo.value === 'cpf' ? validarCPF(docParaValidar.value) : validarCNPJ(docParaValidar.value)
}

async function copiarUm(doc: string) {
  await navigator.clipboard.writeText(doc)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1200 })
}

async function copiarTodos() {
  await navigator.clipboard.writeText(documentos.value.join('\n'))
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `${documentos.value.length} copiados!`, showConfirmButton: false, timer: 1500 })
}

function baixarTxt() {
  const blob = new Blob([documentos.value.join('\n')], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url; link.download = `${tipo.value}-${Date.now()}.txt`; link.click()
  URL.revokeObjectURL(url)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Download iniciado!', showConfirmButton: false, timer: 1500 })
}

function limpar() { documentos.value = []; docParaValidar.value = ''; resultadoVal.value = null }

gerar()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
