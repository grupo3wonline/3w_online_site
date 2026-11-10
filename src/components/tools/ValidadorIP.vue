<template>
  <ToolShell
    title="Validador de Endereço IP"
    description="Valide endereços IPv4 e IPv6 com análise de faixa, tipo de rede e informações técnicas."
    icon="fa-network-wired"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['IPv4 e IPv6', 'Detecta tipo de rede', 'Validação de octetos']"
    :tips="[
      { title: 'IPv4', text: 'Formato: 4 grupos de números (0–255) separados por ponto. Exemplo: 192.168.1.100', type: 'info' },
      { title: 'IPv6', text: 'Formato: 8 grupos de 4 hex separados por dois-pontos. O :: representa zeros omitidos. Ex: 2001:0db8::1', type: 'info' },
      { title: 'IPs reservados', text: '10.x.x.x, 172.16-31.x.x e 192.168.x.x são faixas privadas. 127.0.0.1 é o loopback (localhost).', type: 'warning' },
    ]"
    :examples="[
      { title: 'IP privado',    desc: '192.168.1.1',      result: 'IPv4 válido — Rede privada (Classe C)' },
      { title: 'Loopback',      desc: '127.0.0.1',        result: 'IPv4 válido — Loopback (localhost)' },
      { title: 'IPv6 compacto', desc: '2001:db8::1',      result: 'IPv6 válido' },
      { title: 'Inválido',      desc: '999.0.0.1',        result: 'IPv4 inválido — octeto fora do intervalo' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <BaseInput
            v-model="ip"
            label="Endereço IP"
            icon="fa-network-wired"
            placeholder="192.168.0.1 ou 2001:0db8::1"
            tooltip="Digite um IPv4 (ex: 192.168.1.1) ou IPv6 (ex: 2001:db8::1)"
            hint="Suporta IPv4 e IPv6"
            @input="validar"
          />
          <div class="flex gap-3 mt-3">
            <BaseButton variant="secondary" icon="fa-check-circle" @click="validar" class="flex-1">
              Validar
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- IPs de exemplo -->
        <div class="glass-panel p-4">
          <p class="input-aurora-label mb-2">
            <i class="fas fa-bookmark mr-1.5 text-teal-500"></i>
            Exemplos rápidos
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="ex in exemplosRapidos"
              :key="ex"
              @click="usarExemplo(ex)"
              class="text-xs px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-all font-mono"
            >
              {{ ex }}
            </button>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- Status principal -->
            <div :class="['tool-header text-center py-6', valido ? '' : 'from-red-900/60 to-red-800/40']">
              <i :class="['text-5xl mb-3 block', valido ? 'fas fa-check-circle text-emerald-400' : 'fas fa-times-circle text-red-400']"></i>
              <p class="text-2xl font-black text-white">{{ valido ? mensagem : 'IP Inválido' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">
                {{ valido ? tipoRede : mensagem }}
              </p>
            </div>

            <!-- Métricas quando válido -->
            <div v-if="valido" class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ tipo }}</div>
                <div class="metric-glass-label">Versão</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400 text-sm font-mono">{{ ip }}</div>
                <div class="metric-glass-label">Endereço</div>
              </div>
            </div>

            <!-- Detalhamento IPv4 -->
            <div v-if="valido && tipo === 'IPv4'" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-sitemap text-teal-500"></i>
                Detalhamento IPv4
              </h4>
              <div class="grid grid-cols-4 gap-2">
                <div
                  v-for="(octeto, i) in octetos"
                  :key="i"
                  class="text-center p-2 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800"
                >
                  <div class="text-lg font-black text-teal-700 dark:text-teal-300">{{ octeto }}</div>
                  <div class="text-xs text-gray-500">Octeto {{ i + 1 }}</div>
                </div>
              </div>
            </div>

            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">{{ tipo === 'IPv4' ? 'Endereço IPv4 com 4 octetos (0–255) válidos.' : 'Endereço IPv6 bem formado.' }}</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-network-wired text-4xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Digite um endereço IP para validar</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const ip        = ref('')
const resultado = ref(false)
const valido    = ref(false)
const mensagem  = ref('')
const tipo      = ref('')
const tipoRede  = ref('')

const exemplosRapidos = ['192.168.1.1', '10.0.0.1', '127.0.0.1', '8.8.8.8', '2001:db8::1', '::1']

const octetos = computed(() => {
  if (tipo.value !== 'IPv4') return []
  return ip.value.split('.').map(Number)
})

const classificarIPv4 = (addr: string): string => {
  const [a, b] = addr.split('.').map(Number)
  if (a === 10) return 'Rede privada (Classe A)'
  if (a === 172 && b >= 16 && b <= 31) return 'Rede privada (Classe B)'
  if (a === 192 && b === 168) return 'Rede privada (Classe C)'
  if (a === 127) return 'Loopback (localhost)'
  if (a === 169 && b === 254) return 'Link-local (APIPA)'
  if (a === 0) return 'Rede (endereço reservado)'
  if (a >= 224 && a <= 239) return 'Multicast'
  if (a >= 240) return 'Reservado (Classe E)'
  return 'Endereço público'
}

const ipv6Regex = /^([0-9a-fA-F]{0,4}:){7}[0-9a-fA-F]{0,4}$|^([0-9a-fA-F]{0,4}:){1,7}:|^:((:[0-9a-fA-F]{0,4}){1,7}|:)$/

const validar = () => {
  if (!ip.value.trim()) { resultado.value = false; return }

  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/

  if (ipv4Regex.test(ip.value)) {
    const partes = ip.value.split('.')
    const ok     = partes.every(p => { const n = parseInt(p); return n >= 0 && n <= 255 })

    if (ok) {
      valido.value   = true
      tipo.value     = 'IPv4'
      mensagem.value = 'Endereço IPv4 válido'
      tipoRede.value = classificarIPv4(ip.value)
    } else {
      valido.value   = false
      mensagem.value = 'Octeto fora do intervalo (0–255)'
    }
  } else if (ipv6Regex.test(ip.value)) {
    valido.value   = true
    tipo.value     = 'IPv6'
    mensagem.value = 'Endereço IPv6 válido'
    tipoRede.value = ip.value === '::1' ? 'Loopback IPv6' : 'Endereço IPv6'
  } else {
    valido.value   = false
    mensagem.value = 'Formato de IP não reconhecido'
  }

  resultado.value = true
}

const usarExemplo = (val: string) => { ip.value = val; validar() }
const limpar      = () => { ip.value = ''; resultado.value = false; valido.value = false }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
