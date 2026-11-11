<template>
  <ToolShell
    title="Meu Endereço IP"
    description="Veja seu IPv4, IPv6, localização, ISP, DNS reverso (PTR) e consulte qualquer IP."
    icon="fa-network-wired"
    icon-gradient="from-sky-500 to-blue-700"
    orb-color="blue"
    :quick-tips="['IPv4 & IPv6','DNS Reverso (PTR)','Localização & ISP','100% privado']"
    :tips="ipTips"
  >
    <!-- Tabs -->
    <div class="tab-row">
      <button v-for="t in tabs" :key="t.id" @click="aba = t.id"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba===t.id?'bg-sky-600 text-white border-sky-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
      </button>
    </div>

    <!-- ══ ABA: MEU IP ═══════════════════════════════════════════════ -->
    <div v-if="aba === 'meuip'">
      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <Icon icon="mdi:loading" class="w-10 h-10 text-blue-400 animate-spin mb-4" />
        <p class="text-blue-300 text-sm">Detectando endereços IP...</p>
      </div>

      <!-- Erro -->
      <div v-else-if="erro" class="glass-panel p-6 text-center">
        <Icon icon="mdi:alert-circle-outline" class="w-12 h-12 text-red-400 mx-auto mb-3" />
        <p class="text-red-300 mb-4">{{ erro }}</p>
        <button @click="buscarMeuIP()" class="btn-glass text-sm py-2 px-4">
          <Icon icon="mdi:refresh" class="w-4 h-4 mr-1 inline" /> Tentar novamente
        </button>
      </div>

      <!-- Resultado -->
      <div v-else class="space-y-4">

        <!-- IPs destacados -->
        <div class="grid sm:grid-cols-2 gap-3">
          <!-- IPv4 -->
          <div class="glass-panel p-5 text-center relative">
            <div class="text-[10px] uppercase tracking-widest text-sky-400 mb-1 font-semibold">IPv4</div>
            <div class="flex items-center justify-center gap-2 mb-2">
              <span class="text-2xl sm:text-3xl font-black font-mono text-white break-all">{{ ipData.ipv4 || '—' }}</span>
              <button v-if="ipData.ipv4" @click="copiar(ipData.ipv4)" class="text-blue-400 hover:text-white shrink-0">
                <Icon icon="mdi:content-copy" class="w-5 h-5" />
              </button>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300">
              {{ ipData.ipv4 ? 'IPv4' : 'Não disponível' }}
            </span>
          </div>

          <!-- IPv6 -->
          <div class="glass-panel p-5 text-center relative">
            <div class="text-[10px] uppercase tracking-widest text-indigo-400 mb-1 font-semibold">IPv6</div>
            <div class="flex items-center justify-center gap-2 mb-2">
              <span class="text-sm sm:text-base font-black font-mono text-white break-all leading-snug">{{ ipData.ipv6 || '—' }}</span>
              <button v-if="ipData.ipv6" @click="copiar(ipData.ipv6)" class="text-blue-400 hover:text-white shrink-0">
                <Icon icon="mdi:content-copy" class="w-5 h-5" />
              </button>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
              {{ ipData.ipv6 ? 'IPv6' : 'Não disponível' }}
            </span>
          </div>
        </div>

        <!-- PTR - Reverse DNS -->
        <div class="glass-panel p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center shrink-0">
              <Icon icon="mdi:dns-outline" class="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p class="text-[10px] text-blue-300 uppercase tracking-wide">DNS Reverso (PTR)</p>
              <p class="text-sm font-mono font-semibold text-white">
                <span v-if="ipData.ptr === 'carregando'" class="text-blue-400 text-xs">Consultando...</span>
                <span v-else>{{ ipData.ptr || 'Sem registro PTR' }}</span>
              </p>
              <p v-if="ipData.ipv4" class="text-[10px] text-blue-400 mt-0.5">{{ reversePTRQuery(ipData.ipv4) }}</p>
            </div>
          </div>
          <button v-if="ipData.ptr && ipData.ptr !== 'carregando'" @click="copiar(ipData.ptr)" class="text-blue-400 hover:text-white shrink-0">
            <Icon icon="mdi:content-copy" class="w-4 h-4" />
          </button>
        </div>

        <!-- Localização e ISP -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div v-for="item in infoGrid" :key="item.label"
            class="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-colors cursor-pointer group"
            @click="copiar(item.valor)">
            <div class="flex items-center gap-2 mb-1">
              <Icon :icon="item.icon" class="w-4 h-4 shrink-0" :class="item.iconColor" />
              <p class="text-[10px] text-blue-300 uppercase tracking-wide font-semibold">{{ item.label }}</p>
            </div>
            <p class="text-sm font-semibold text-white font-mono break-all leading-snug">{{ item.valor || '—' }}</p>
            <Icon icon="mdi:content-copy" class="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 mt-1" />
          </div>
        </div>

        <!-- Segurança (VPN/Proxy) -->
        <div v-if="ipData.security" class="glass-panel p-4">
          <p class="text-xs font-semibold text-blue-300 mb-3 flex items-center gap-2">
            <Icon icon="mdi:shield-search" class="w-4 h-4 text-sky-400" /> Análise de Segurança
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div v-for="item in securityItems" :key="item.label"
              class="flex items-center gap-2 p-2.5 rounded-lg border text-xs"
              :class="item.ativo ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-green-500/10 border-green-500/30 text-green-300'">
              <Icon :icon="item.ativo ? 'mdi:alert-circle' : 'mdi:check-circle'" class="w-4 h-4 shrink-0" />
              <span class="font-semibold">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Ações -->
        <div class="flex gap-2 flex-wrap">
          <button @click="buscarMeuIP()" class="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-semibold transition-colors">
            <Icon icon="mdi:refresh" class="w-4 h-4" /> Atualizar
          </button>
          <button @click="copiarTudo()" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 rounded-lg text-sm transition-colors">
            <Icon icon="mdi:content-copy" class="w-4 h-4" /> Copiar tudo
          </button>
        </div>

        <p class="text-xs text-blue-400 text-center">Localização aproximada. Dados obtidos de serviços públicos — nenhum dado é armazenado.</p>
      </div>
    </div>

    <!-- ══ ABA: CONSULTAR IP ══════════════════════════════════════════ -->
    <div v-if="aba === 'consultarip'" class="space-y-4">
      <div class="glass-panel p-4 space-y-3">
        <!-- Anti-bot: honeypot -->
        <div aria-hidden="true" style="position:absolute;left:-5000px;overflow:hidden;height:0;width:0">
          <label for="_3w_hp_ip">Website</label>
          <input id="_3w_hp_ip" name="website" type="text" tabindex="-1" autocomplete="new-password" v-model="hpField" />
        </div>
        <label class="text-xs font-semibold text-blue-300 block">Endereço IPv4 ou IPv6</label>
        <div class="flex gap-2">
          <input v-model="ipConsulta" @keyup.enter="debouncedConsultarIP()" class="input-aurora flex-1 font-mono" placeholder="8.8.8.8 ou 2001:4860:4860::8888" />
          <button @click="debouncedConsultarIP()" :disabled="consultandoIP || guardIP.pending.value"
            class="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-colors shrink-0">
            <Icon :icon="consultandoIP ? 'mdi:loading' : 'mdi:magnify'" class="w-4 h-4" :class="consultandoIP?'animate-spin':''" />
            Consultar
          </button>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <button v-for="ex in examplosIP" :key="ex.ip" @click="ipConsulta=ex.ip;debouncedConsultarIP()"
            class="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-blue-300 hover:text-white border border-white/10 transition-colors">
            {{ ex.label }}
          </button>
        </div>
      </div>

      <!-- Erro de consulta -->
      <div v-if="erroConsulta" class="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
        <Icon icon="mdi:alert-circle-outline" class="w-4 h-4 shrink-0" /> {{ erroConsulta }}
      </div>

      <!-- Resultado da consulta -->
      <div v-if="resultConsulta" class="space-y-3">
        <!-- IP e tipo -->
        <div class="glass-panel p-5 text-center">
          <span class="text-[10px] px-2 py-0.5 rounded-full text-xs font-semibold mb-2 inline-block"
            :class="resultConsulta.type === 'IPv4' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'">
            {{ resultConsulta.type }}
          </span>
          <p class="text-2xl font-black font-mono text-white mt-1">{{ resultConsulta.ip }}</p>
          <p v-if="resultConsulta.flag" class="text-2xl mt-1">{{ resultConsulta.flag }}</p>
        </div>

        <!-- PTR da consulta -->
        <div class="glass-panel p-3 flex items-center gap-3">
          <Icon icon="mdi:dns-outline" class="w-5 h-5 text-teal-400 shrink-0" />
          <div>
            <p class="text-[10px] text-blue-300 uppercase tracking-wide">DNS Reverso (PTR)</p>
            <p class="text-sm font-mono text-white">
              <span v-if="consultandoPTR" class="text-blue-400 text-xs">Consultando PTR...</span>
              <span v-else>{{ resultConsulta.ptr || 'Sem registro PTR' }}</span>
            </p>
          </div>
        </div>

        <!-- Grid de info -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div v-for="item in resultConsultaGrid" :key="item.label"
            class="bg-white/5 p-3 rounded-xl cursor-pointer hover:bg-white/10 transition-colors" @click="copiar(item.valor)">
            <p class="text-[10px] text-blue-300 uppercase tracking-wide mb-0.5">{{ item.label }}</p>
            <p class="text-sm font-semibold text-white font-mono break-all">{{ item.valor || '—' }}</p>
          </div>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import Swal from 'sweetalert2'
import { useApiProxy }     from '@/composables/useApiProxy'
import { useHoneypot }     from '@/composables/useHoneypot'
import { useRequestGuard } from '@/composables/useRequestGuard'
import { debounce }        from '@/composables/useDebounce'

const proxy = useApiProxy()
const { hpField, isBot } = useHoneypot()
const guardIP            = useRequestGuard()

const ipTips = [
  { title: 'Privacidade', text: 'Nenhum dado é armazenado. As consultas são feitas diretamente do seu navegador para APIs públicas gratuitas.', type: 'info' as const },
  { title: 'IPv6', text: 'IPv6 pode não estar disponível se seu provedor ou roteador não suportar. A maioria das conexões ainda usa IPv4.', type: 'info' as const },
  { title: 'DNS Reverso (PTR)', text: 'O registro PTR mapeia um IP para um nome de host. Muitos IPs residenciais não têm PTR configurado.', type: 'info' as const },
]

const tabs = [
  { id: 'meuip' as const,     label: 'Meu IP',       icon: 'mdi:ip-network' },
  { id: 'consultarip' as const, label: 'Consultar IP', icon: 'mdi:magnify' },
]
const aba = ref<'meuip'|'consultarip'>('meuip')

// ─── Meu IP ───────────────────────────────────────────────────────────────────
const loading = ref(true)
const erro    = ref('')

interface IPData {
  ipv4: string; ipv6: string; ptr: string
  country: string; countryCode: string; region: string; city: string
  postal: string; lat: string; lon: string; timezone: string
  isp: string; org: string; asn: string; domain: string
  flag: string; security: boolean
  vpn: boolean; proxy: boolean; tor: boolean; hosting: boolean
}

const ipData = ref<Partial<IPData>>({})

function reversePTRQuery(ip: string): string {
  if (!ip) return ''
  if (ip.includes(':')) return `${ip}.ip6.arpa (IPv6)`
  return ip.split('.').reverse().join('.') + '.in-addr.arpa'
}

async function buscarPTR(ip: string): Promise<string> {
  try {
    let ptrName = ''
    if (ip.includes(':')) {
      // IPv6 - simplified (not all IPv6 cases)
      ptrName = ip.split(':').reverse().join('.') + '.ip6.arpa'
    } else {
      ptrName = ip.split('.').reverse().join('.') + '.in-addr.arpa'
    }
    const r = await proxy.secureFetch(proxy.dnsUrl(ptrName, 'PTR'), {
      signal: AbortSignal.timeout(6000)
    })
    const d = await r.json()
    return d.Answer?.[0]?.data?.replace(/\.$/, '') || ''
  } catch {
    return ''
  }
}

async function buscarMeuIP() {
  loading.value = true; erro.value = ''
  ipData.value = { ptr: 'carregando' }

  try {
    // 1. IPv4
    let ipv4 = ''
    try {
      const r4 = await proxy.secureFetch(proxy.ipv4Url(), { signal: AbortSignal.timeout(5000) })
      ipv4 = (await r4.json()).ip || ''
    } catch {}

    // 2. IPv6 (optional)
    let ipv6 = ''
    try {
      const r6 = await proxy.secureFetch(proxy.ipv6Url(), { signal: AbortSignal.timeout(5000) })
      ipv6 = (await r6.json()).ip || ''
      // Don't store if same as ipv4 (some APIs return IPv4-mapped IPv6)
      if (ipv6 === ipv4) ipv6 = ''
    } catch {}

    // 3. Geolocation + ISP (use ipv4 or fallback to auto)
    const geoIP = ipv4 || ''
    const rGeo = await proxy.secureFetch(proxy.geoipUrl(geoIP), { signal: AbortSignal.timeout(8000) })
    const geo = await rGeo.json()

    if (!geo.success && !ipv4) throw new Error('Não foi possível obter o IP.')

    const detectedIP = geo.ip || ipv4

    ipData.value = {
      ipv4: (geo.type === 'IPv4' ? detectedIP : ipv4) || detectedIP,
      ipv6: ipv6 || (geo.type === 'IPv6' ? detectedIP : ''),
      ptr: 'carregando',
      country: geo.country || '-',
      countryCode: geo.country_code || '',
      region: geo.region || '-',
      city: geo.city || '-',
      postal: geo.postal || '-',
      lat: geo.latitude ? String(geo.latitude) : '-',
      lon: geo.longitude ? String(geo.longitude) : '-',
      timezone: geo.timezone?.id || '-',
      isp: geo.connection?.isp || '-',
      org: geo.connection?.org || '-',
      asn: geo.connection?.asn ? `AS${geo.connection.asn}` : '-',
      domain: geo.connection?.domain || '-',
      flag: geo.flag?.emoji || '',
      security: !!(geo.security),
      vpn: !!geo.security?.vpn,
      proxy: !!geo.security?.proxy,
      tor: !!geo.security?.tor,
      hosting: !!geo.security?.hosting,
    }

    // 4. PTR lookup assíncrono (não bloqueia o UI)
    const ipForPTR = ipData.value.ipv4 || detectedIP
    buscarPTR(ipForPTR).then(ptr => {
      if (ipData.value) ipData.value.ptr = ptr || ''
    })

  } catch (e: any) {
    // Fallback simples
    try {
      const r = await proxy.secureFetch(proxy.geoipFallUrl(), { signal: AbortSignal.timeout(6000) })
      const d = await r.json()
      ipData.value = {
        ipv4: d.ip, ipv6: '', ptr: '',
        country: d.country_name, region: d.region, city: d.city,
        postal: d.postal, lat: d.latitude, lon: d.longitude,
        timezone: d.timezone, isp: d.org, asn: d.asn, org: d.org, domain: '', flag: '',
        security: false, vpn: false, proxy: false, tor: false, hosting: false,
      }
      buscarPTR(d.ip).then(ptr => { if (ipData.value) ipData.value.ptr = ptr || '' })
    } catch {
      erro.value = 'Não foi possível obter as informações de IP. Verifique sua conexão.'
    }
  } finally {
    loading.value = false
  }
}

const infoGrid = computed(() => {
  const d = ipData.value
  if (!d) return []
  return [
    { label: 'País',       valor: `${d.flag || ''} ${d.country || ''}`.trim(), icon: 'mdi:flag-outline',       iconColor: 'text-orange-400' },
    { label: 'Estado',     valor: d.region || '',       icon: 'mdi:map-marker-radius-outline', iconColor: 'text-green-400'  },
    { label: 'Cidade',     valor: d.city || '',         icon: 'mdi:city-variant-outline',      iconColor: 'text-blue-400'   },
    { label: 'CEP',        valor: d.postal || '',       icon: 'mdi:mailbox-outline',            iconColor: 'text-purple-400' },
    { label: 'ISP',        valor: d.isp || '',          icon: 'mdi:server-network',             iconColor: 'text-sky-400'    },
    { label: 'ASN',        valor: d.asn || '',          icon: 'mdi:transit-connection-variant', iconColor: 'text-teal-400'   },
    { label: 'Organização',valor: d.org || '',          icon: 'mdi:office-building-outline',    iconColor: 'text-indigo-400' },
    { label: 'Domínio ISP',valor: d.domain || '',       icon: 'mdi:web',                        iconColor: 'text-cyan-400'   },
    { label: 'Latitude',   valor: d.lat || '',          icon: 'mdi:latitude',                   iconColor: 'text-lime-400'   },
    { label: 'Longitude',  valor: d.lon || '',          icon: 'mdi:longitude',                  iconColor: 'text-lime-400'   },
    { label: 'Fuso Horário',valor: d.timezone || '',    icon: 'mdi:clock-time-four-outline',    iconColor: 'text-amber-400'  },
    { label: 'País (código)',valor: d.countryCode || '', icon: 'mdi:alphabetical-variant',      iconColor: 'text-rose-400'   },
  ].filter(i => i.valor && i.valor.trim() !== '' && i.valor !== '-')
})

const securityItems = computed(() => {
  const d = ipData.value
  if (!d) return []
  return [
    { label: 'VPN',    ativo: !!d.vpn     },
    { label: 'Proxy',  ativo: !!d.proxy   },
    { label: 'Tor',    ativo: !!d.tor     },
    { label: 'Hosting',ativo: !!d.hosting },
  ]
})

function copiarTudo() {
  const d = ipData.value
  const linhas = [
    `IPv4: ${d.ipv4 || '-'}`,
    `IPv6: ${d.ipv6 || 'Não disponível'}`,
    `PTR: ${d.ptr || 'Sem PTR'}`,
    `País: ${d.country || '-'}`,
    `Estado: ${d.region || '-'}`,
    `Cidade: ${d.city || '-'}`,
    `ISP: ${d.isp || '-'}`,
    `ASN: ${d.asn || '-'}`,
    `Timezone: ${d.timezone || '-'}`,
  ]
  navigator.clipboard.writeText(linhas.join('\n'))
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
}

// ─── Consultar IP ─────────────────────────────────────────────────────────────
const ipConsulta    = ref('')
const consultandoIP = ref(false)
const consultandoPTR = ref(false)
const erroConsulta  = ref('')

interface IPResult {
  ip: string; type: string; flag: string; ptr: string
  country: string; region: string; city: string; postal: string
  lat: string; lon: string; timezone: string; isp: string
  asn: string; org: string
}
const resultConsulta = ref<IPResult | null>(null)

const examplosIP = [
  { label: 'Google DNS', ip: '8.8.8.8' },
  { label: 'Cloudflare', ip: '1.1.1.1' },
  { label: 'OpenDNS', ip: '208.67.222.222' },
  { label: 'IPv6 Google', ip: '2001:4860:4860::8888' },
]

async function consultarIP() {
  if (isBot.value) return // Honeypot
  const ip = ipConsulta.value.trim()
  if (!ip) return
  await guardIP.run(async () => {
  consultandoIP.value = true; erroConsulta.value = ''; resultConsulta.value = null
  try {
    const r = await proxy.secureFetch(proxy.geoipUrl(ip), { signal: AbortSignal.timeout(8000) })
    const d = await r.json()
    if (!d.success) throw new Error(d.message || 'IP inválido ou não encontrado.')

    resultConsulta.value = {
      ip: d.ip, type: d.type,
      flag: d.flag?.emoji || '',
      ptr: '', // will load separately
      country: d.country || '-',
      region: d.region || '-',
      city: d.city || '-',
      postal: d.postal || '-',
      lat: d.latitude ? String(d.latitude) : '-',
      lon: d.longitude ? String(d.longitude) : '-',
      timezone: d.timezone?.id || '-',
      isp: d.connection?.isp || '-',
      asn: d.connection?.asn ? `AS${d.connection.asn}` : '-',
      org: d.connection?.org || '-',
    }

    // PTR async
    consultandoPTR.value = true
    buscarPTR(d.ip).then(ptr => {
      if (resultConsulta.value) resultConsulta.value.ptr = ptr || 'Sem registro PTR'
      consultandoPTR.value = false
    })

  } catch (e: any) {
    erroConsulta.value = e.message || 'Erro ao consultar IP.'
  } finally {
    consultandoIP.value = false
  }
  }) // guardIP.run
}

const debouncedConsultarIP = debounce(consultarIP, 400)

const resultConsultaGrid = computed(() => {
  const r = resultConsulta.value
  if (!r) return []
  return [
    { label: 'País',      valor: `${r.flag} ${r.country}`.trim() },
    { label: 'Estado',    valor: r.region },
    { label: 'Cidade',    valor: r.city },
    { label: 'CEP',       valor: r.postal },
    { label: 'ISP',       valor: r.isp },
    { label: 'ASN',       valor: r.asn },
    { label: 'Organização',valor: r.org },
    { label: 'Latitude',  valor: r.lat },
    { label: 'Longitude', valor: r.lon },
    { label: 'Timezone',  valor: r.timezone },
  ].filter(i => i.valor && i.valor !== '-' && i.valor.trim() !== '')
})

function copiar(text: string) {
  if (!text || text === '-') return
  navigator.clipboard.writeText(text)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}

onMounted(buscarMeuIP)
</script>
