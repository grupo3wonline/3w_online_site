<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const ipExterno = ref('')
const ipInfo = ref<Record<string, string>>({})
const loading = ref(true)
const erro = ref('')

async function buscarIP() {
  loading.value = true; erro.value = ''
  try {
    const r = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(8000) })
    const d = await r.json()
    ipExterno.value = d.ip || ''
    ipInfo.value = {
      'IP Externo': d.ip || '-', 'País': d.country_name || '-',
      'Estado/Região': d.region || '-', 'Cidade': d.city || '-',
      'CEP': d.postal || '-', 'Fuso horário': d.timezone || '-',
      'ASN / Provedor': d.org || '-', 'Latitude': d.latitude || '-',
      'Longitude': d.longitude || '-', 'Tipo': d.ip?.includes(':') ? 'IPv6' : 'IPv4',
    }
  } catch (e) {
    // Try fallback
    try {
      const r2 = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(5000) })
      const d2 = await r2.json()
      ipExterno.value = d2.ip || ''
      ipInfo.value = { 'IP Externo': d2.ip || '-', 'Tipo': d2.ip?.includes(':') ? 'IPv6' : 'IPv4' }
    } catch {
      erro.value = 'Não foi possível obter o IP. Verifique sua conexão.'
    }
  } finally { loading.value = false }
}

function copiar(text: string) {
  navigator.clipboard.writeText(text)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}

onMounted(buscarIP)
</script>

<template>
  <ToolShell title="Meu Endereço IP" description="Visualize seu IP externo e informações de localização da sua conexão."
    icon="fa-network-wired" icon-gradient="from-sky-500 to-blue-700" orb-color="blue"
    :quick-tips="['IP externo e IPv6','Localização aproximada','100% privado']"
    :tips="[{title:'Privacidade',text:'Nenhum dado é armazenado. A consulta é feita diretamente do seu navegador para serviços públicos de IP.'}]">

    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <Icon icon="mdi:loading" class="w-10 h-10 text-blue-400 animate-spin mb-4" />
      <p class="text-blue-300">Detectando seu endereço IP...</p>
    </div>

    <div v-else-if="erro" class="glass-panel p-6 text-center">
      <Icon icon="mdi:alert-circle-outline" class="w-12 h-12 text-red-400 mx-auto mb-3" />
      <p class="text-red-300 mb-4">{{ erro }}</p>
      <button @click="buscarIP" class="btn-glass text-sm py-2 px-4"><Icon icon="mdi:refresh" class="w-4 h-4 mr-1 inline" />Tentar novamente</button>
    </div>

    <div v-else class="space-y-5">
      <!-- IP principal destacado -->
      <div class="glass-panel p-6 text-center">
        <p class="text-xs text-blue-300 uppercase tracking-wider mb-2">Seu IP Externo</p>
        <div class="flex items-center justify-center gap-3 mb-3">
          <p class="text-4xl font-bold font-mono text-white">{{ ipExterno }}</p>
          <button @click="copiar(ipExterno)" class="text-blue-400 hover:text-white transition-colors">
            <Icon icon="mdi:content-copy" class="w-6 h-6" />
          </button>
        </div>
        <span class="text-xs px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full">
          {{ ipExterno.includes(':') ? 'IPv6' : 'IPv4' }}
        </span>
      </div>

      <!-- Informações detalhadas -->
      <div v-if="Object.keys(ipInfo).length > 1" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div v-for="[label, valor] in Object.entries(ipInfo).filter(([k]) => k !== 'IP Externo')" :key="label"
          class="bg-white/5 p-3 rounded-lg flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer"
          @click="copiar(valor)">
          <div>
            <p class="text-xs text-blue-300">{{ label }}</p>
            <p class="text-sm font-semibold text-white">{{ valor }}</p>
          </div>
          <Icon icon="mdi:content-copy" class="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 shrink-0" />
        </div>
      </div>

      <div class="flex gap-2">
        <button @click="buscarIP" class="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-semibold transition-colors">
          <Icon icon="mdi:refresh" class="w-4 h-4" /> Atualizar
        </button>
      </div>

      <p class="text-xs text-blue-400 text-center">A localização exibida é aproximada e pode não corresponder à sua localização exata.</p>
    </div>
  </ToolShell>
</template>
