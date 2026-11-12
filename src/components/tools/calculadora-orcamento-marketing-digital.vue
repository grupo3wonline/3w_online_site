<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const followers = ref('')
const ratePerFollower = ref('')
const durationDays = ref('')
const result = ref<number | null>(null)

function parseNum(v: string): number {
  const n = parseFloat(String(v).replace(',', '.'))
  return isFinite(n) ? n : 0
}

function calcular() {
  const f = parseNum(followers.value)
  const r = parseNum(ratePerFollower.value)
  const d = parseNum(durationDays.value)
  if (f <= 0 || r <= 0 || d <= 0) {
    Swal.fire({ icon: 'warning', title: 'Campos inválidos', text: 'Preencha todos os campos com valores maiores que zero.', confirmButtonColor: '#4f46e5' })
    return
  }
  result.value = f * r * d
  Swal.fire({
    icon: 'success',
    title: 'Orçamento Calculado!',
    html: `<div style="font-size:1.5rem;font-weight:700;color:#4f46e5;margin:1rem 0">${fmt(result.value)}</div>
           <p style="color:#64748b;font-size:0.875rem">${fmtN(f)} seguidores × ${fmt(r)} × ${d} dias</p>`,
    confirmButtonColor: '#4f46e5',
  })
}

function limpar() { followers.value = ''; ratePerFollower.value = ''; durationDays.value = ''; result.value = null }

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
function fmtN(v: number) { return v.toLocaleString('pt-BR') }
</script>

<template>

    <ToolShell


      title="Orçamento Marketing Digital"


      description="Calcule o orçamento ideal para campanhas, conteúdo e gestão de redes sociais."


      icon="fa-bullseye-arrow"


      icon-gradient="from-orange-500 to-amber-600"


      orb-color="orange"


      :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"


      :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"


    >

  <div class="max-w-3xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:bullhorn-outline" class="text-indigo-400 w-7 h-7" />
        Calculadora de Orçamento de Marketing Digital
      </h1>
      <p class="text-blue-200 text-sm">Estime o investimento em campanhas com influenciadores e ads</p>
    </div>

      <div>
        <label class="text-blue-200 text-sm font-medium block mb-2 flex items-center gap-2">
          <Icon icon="mdi:account-multiple-outline" class="w-4 h-4 text-indigo-400" />
          Número de Seguidores / Audiência
        <input v-model="followers" type="text" inputmode="numeric" autocomplete="off" placeholder="Ex: 50000"
          class="w-full input-aurora" />
        <p class="text-blue-300/60 text-xs mt-1">Número total de seguidores/visitantes atingidos</p>
      </div>

      <div>
        <label class="text-blue-200 text-sm font-medium block mb-2 flex items-center gap-2">
          <Icon icon="mdi:currency-brl" class="w-4 h-4 text-indigo-400" />
          Taxa por Seguidor (R$)
        </label>
        <input v-model="ratePerFollower" type="text" inputmode="decimal" autocomplete="off" placeholder="Ex: 0.05"
          class="w-full input-aurora" />
        <p class="text-blue-300/60 text-xs mt-1">Valor cobrado por seguidor por dia (ex.: R$ 0,05)</p>
      </div>

      <div>
        <label class="text-blue-200 text-sm font-medium block mb-2 flex items-center gap-2">
          <Icon icon="mdi:calendar-range" class="w-4 h-4 text-indigo-400" />
          Duração da Campanha (dias)
        </label>
        <input v-model="durationDays" type="text" inputmode="numeric" autocomplete="off" placeholder="Ex: 30"
          class="w-full input-aurora" />
        <p class="text-blue-300/60 text-xs mt-1">Duração total da campanha em dias</p>
      </div>

      <div class="flex gap-3">
        <button @click="calcular"
          class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Icon icon="mdi:calculator" class="w-5 h-5" /> Calcular Orçamento
        </button>
        <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white py-3 px-5 rounded-lg transition-colors">
          <Icon icon="mdi:refresh" class="w-5 h-5" />
        </button>
      </div>

      <!-- Resultado -->
      <transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 translate-y-2">
        <div v-if="result !== null" class="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-5 text-center">
          <div class="text-indigo-300 text-sm mb-1">Orçamento Estimado Total</div>
          <div class="text-4xl font-black text-white">{{ fmt(result) }}</div>
          <p class="text-blue-200 text-xs mt-2">
            {{ fmtN(parseNum(followers)) }} seguidores × {{ fmt(parseNum(ratePerFollower)) }}/dia × {{ parseNum(durationDays) }} dias
          </p>
        </div>
      </transition>
    </div>

    <!-- Fórmula / Dicas -->
    <div class="glass-panel p-5">
      <h3 class="text-white font-semibold text-sm mb-3 flex items-center gap-2">
        <Icon icon="mdi:lightbulb-outline" class="text-yellow-400 w-4 h-4" />
        Como usar esta calculadora
      </h3>
      <ul class="space-y-2 text-blue-200 text-sm">
        <li class="flex items-start gap-2"><Icon icon="mdi:check-circle-outline" class="text-green-400 w-4 h-4 mt-0.5 shrink-0" /><span><strong class="text-white">Seguidores:</strong> Total de seguidores do influenciador ou audiência da plataforma</span></li>
        <li class="flex items-start gap-2"><Icon icon="mdi:check-circle-outline" class="text-green-400 w-4 h-4 mt-0.5 shrink-0" /><span><strong class="text-white">Taxa/seguidor:</strong> Valor cobrado por seguidor por dia (varia de R$ 0,02 a R$ 0,10)</span></li>
        <li class="flex items-start gap-2"><Icon icon="mdi:check-circle-outline" class="text-green-400 w-4 h-4 mt-0.5 shrink-0" /><span><strong class="text-white">Fórmula:</strong> Seguidores × Taxa × Duração = Orçamento estimado</span></li>
      </ul>
    </div>
  



    </ToolShell></template>