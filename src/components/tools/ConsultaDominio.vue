<template>
  <ToolShell
    title="Consulta de Domínio & WHOIS"
    description="Verifique registro WHOIS/RDAP, registrante, datas, nameservers e registros DNS de qualquer domínio."
    icon="fa-globe"
    icon-gradient="from-violet-500 to-purple-700"
    orb-color="purple"
    :quick-tips="['WHOIS / RDAP','Registrante & Datas','Nameservers','DNS A, MX, TXT, NS']"
    :tips="dominioTips"
  >
    <!-- Campo de entrada único (compartilhado entre abas) -->
    <div class="glass-panel p-4 mb-4">
      <div class="flex gap-2 items-end flex-wrap">
        <div class="flex-1">
          <label class="text-xs font-semibold text-blue-300 mb-1.5 block">Domínio</label>
          <input v-model="dominio" @keyup.enter="consultar()" class="input-aurora w-full font-mono text-base"
            placeholder="exemplo.com.br" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
        </div>
        <button @click="consultar()" :disabled="consultando"
          class="flex items-center gap-2 px-5 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-colors shrink-0">
          <Icon :icon="consultando ? 'mdi:loading' : 'mdi:magnify'" class="w-5 h-5" :class="consultando?'animate-spin':''" />
          Consultar
        </button>
      </div>
      <div class="flex flex-wrap gap-1.5 mt-2">
        <button v-for="ex in exemplos" :key="ex" @click="dominio=ex;consultar()"
          class="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-blue-300 hover:text-white border border-white/10 transition-colors font-mono">
          {{ ex }}
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tab-row">
      <button v-for="t in tabs" :key="t.id" @click="aba = t.id"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba===t.id?'bg-violet-600 text-white border-violet-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
        <span v-if="t.id === 'whois' && rdapData" class="ml-1 text-[9px] px-1.5 py-0.5 rounded-full"
          :class="rdapData.status?.includes('active') ? 'bg-green-500/30 text-green-300' : 'bg-blue-500/30 text-blue-300'">
          {{ rdapData.status?.includes('active') ? 'OK' : rdapData.status?.[0] || '' }}
        </span>
      </button>
    </div>

    <!-- Erro -->
    <div v-if="erro" class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-300 flex items-start gap-3 mb-4">
      <Icon icon="mdi:alert-circle-outline" class="w-5 h-5 shrink-0 mt-0.5" />
      <div><p class="font-semibold mb-0.5">Erro</p><p>{{ erro }}</p></div>
    </div>

    <!-- ══ ABA: WHOIS / RDAP ═══════════════════════════════════════════ -->
    <div v-if="aba === 'whois'">
      <div v-if="!rdapData && !consultando && !erro" class="glass-panel p-12 text-center">
        <Icon icon="mdi:domain" class="w-16 h-16 text-blue-400/40 mx-auto mb-3" />
        <p class="text-blue-300 text-sm">Insira um domínio acima e clique em Consultar</p>
      </div>

      <div v-if="consultando && aba === 'whois'" class="flex flex-col items-center py-12">
        <Icon icon="mdi:loading" class="w-8 h-8 text-violet-400 animate-spin mb-3" />
        <p class="text-blue-300 text-sm">Consultando RDAP/WHOIS...</p>
      </div>

      <div v-if="rdapData" class="space-y-4">
        <!-- Status e Nome -->
        <div class="glass-panel p-5">
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p class="text-2xl font-black font-mono text-white">{{ rdapData.ldhName || dominioAtual }}</p>
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span v-for="s in rdapData.status?.slice(0,4)" :key="s"
                  class="text-[10px] px-2 py-0.5 rounded-full border font-semibold"
                  :class="s.includes('active') ? 'bg-green-500/20 border-green-500/40 text-green-300' : 'bg-blue-500/20 border-blue-500/40 text-blue-300'">
                  {{ s }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <p v-if="rdapData.registrar" class="text-xs text-blue-300">Registrar</p>
              <p v-if="rdapData.registrar" class="text-sm font-semibold text-white">{{ rdapData.registrar }}</p>
            </div>
          </div>
        </div>

        <!-- Datas -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div v-for="ev in rdapData.events" :key="ev.action" class="glass-panel p-4 text-center">
            <p class="text-[10px] uppercase tracking-wider text-blue-300 mb-1">{{ traduzirEvento(ev.action) }}</p>
            <p class="text-sm font-bold font-mono text-white">{{ formatarData(ev.date) }}</p>
            <p class="text-[10px] text-blue-400 mt-0.5">{{ formatarDataRelativa(ev.date) }}</p>
          </div>
        </div>

        <!-- Nameservers -->
        <div v-if="rdapData.nameservers?.length" class="glass-panel p-4">
          <p class="text-xs font-semibold text-blue-300 mb-3 flex items-center gap-2">
            <Icon icon="mdi:dns" class="w-4 h-4 text-violet-400" /> Nameservers
          </p>
          <div class="grid sm:grid-cols-2 gap-2">
            <div v-for="ns in rdapData.nameservers" :key="ns"
              class="flex items-center justify-between bg-white/5 p-2.5 rounded-lg cursor-pointer hover:bg-white/10 group"
              @click="copiar(ns)">
              <span class="font-mono text-sm text-white">{{ ns }}</span>
              <Icon icon="mdi:content-copy" class="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100" />
            </div>
          </div>
        </div>

        <!-- Contatos / Entidades -->
        <div v-if="rdapData.entities?.length" class="space-y-2">
          <div v-for="entity in rdapData.entities" :key="entity.role" class="glass-panel p-4">
            <p class="text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wide">
              {{ traduzirRole(entity.role) }}
            </p>
            <div class="grid sm:grid-cols-2 gap-2 text-sm">
              <div v-if="entity.name"><span class="text-blue-400 text-xs">Nome</span><p class="font-semibold text-white">{{ entity.name }}</p></div>
              <div v-if="entity.org"><span class="text-blue-400 text-xs">Organização</span><p class="font-semibold text-white">{{ entity.org }}</p></div>
              <div v-if="entity.email"><span class="text-blue-400 text-xs">E-mail</span><p class="font-mono text-white">{{ entity.email }}</p></div>
              <div v-if="entity.country"><span class="text-blue-400 text-xs">País</span><p class="text-white">{{ entity.country }}</p></div>
            </div>
          </div>
        </div>

        <!-- DNSSEC -->
        <div class="glass-panel p-3 flex items-center gap-3">
          <Icon :icon="rdapData.dnssec ? 'mdi:shield-lock-outline' : 'mdi:shield-off-outline'" class="w-5 h-5"
            :class="rdapData.dnssec ? 'text-green-400' : 'text-gray-500'" />
          <div>
            <p class="text-xs text-blue-300">DNSSEC</p>
            <p class="text-sm font-semibold" :class="rdapData.dnssec ? 'text-green-300' : 'text-gray-400'">
              {{ rdapData.dnssec ? 'Habilitado' : 'Não habilitado' }}
            </p>
          </div>
        </div>

        <button @click="copiarWhois()" class="text-xs text-blue-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors w-fit">
          <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar dados WHOIS
        </button>
      </div>
    </div>

    <!-- ══ ABA: DNS ════════════════════════════════════════════════════ -->
    <div v-if="aba === 'dns'">
      <div v-if="!dnsData && !consultando && !erro" class="glass-panel p-12 text-center">
        <Icon icon="mdi:dns-outline" class="w-16 h-16 text-blue-400/40 mx-auto mb-3" />
        <p class="text-blue-300 text-sm">Insira um domínio acima para consultar os registros DNS</p>
      </div>

      <div v-if="consultando && aba === 'dns'" class="flex flex-col items-center py-12">
        <Icon icon="mdi:loading" class="w-8 h-8 text-violet-400 animate-spin mb-3" />
        <p class="text-blue-300 text-sm">Consultando registros DNS...</p>
      </div>

      <div v-if="dnsData" class="space-y-3">
        <div v-for="tipo in tiposDNS" :key="tipo.type" class="glass-panel p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-black px-2.5 py-1 rounded-lg" :class="tipo.cor">{{ tipo.type }}</span>
              <span class="text-xs text-blue-300">{{ tipo.descricao }}</span>
            </div>
            <span v-if="dnsData[tipo.type]" class="text-[10px] text-blue-400">{{ dnsData[tipo.type]?.length }} registro(s)</span>
          </div>

          <div v-if="dnsData[tipo.type]?.length">
            <div v-for="(r, i) in dnsData[tipo.type]" :key="i"
              class="flex items-center justify-between py-1.5 border-t border-white/5 cursor-pointer hover:bg-white/5 rounded px-1 group"
              @click="copiar(r.data)">
              <div class="flex items-center gap-3 min-w-0">
                <span class="text-[10px] text-blue-400 font-mono w-16 shrink-0">TTL: {{ r.TTL }}</span>
                <span class="font-mono text-sm text-white break-all">{{ r.data }}</span>
              </div>
              <Icon icon="mdi:content-copy" class="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 shrink-0" />
            </div>
          </div>
          <div v-else class="text-xs text-blue-400/60 italic mt-1 px-1">Sem registros {{ tipo.type }}</div>
        </div>

        <!-- Status da verificação -->
        <div class="glass-panel p-4 space-y-2">
          <p class="text-xs font-semibold text-blue-300 mb-2 flex items-center gap-2">
            <Icon icon="mdi:check-circle-outline" class="w-4 h-4 text-green-400" /> Resumo de Verificação
          </p>
          <div class="grid sm:grid-cols-3 gap-2">
            <div v-for="check in verificacoes" :key="check.label"
              class="flex items-center gap-2 p-2.5 rounded-lg border text-xs"
              :class="check.ok ? 'bg-green-500/10 border-green-500/30 text-green-300' : 'bg-red-500/10 border-red-500/30 text-red-300'">
              <Icon :icon="check.ok ? 'mdi:check-circle' : 'mdi:close-circle'" class="w-4 h-4 shrink-0" />
              <span class="font-semibold">{{ check.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import Swal from 'sweetalert2'

const dominioTips = [
  { title: 'RDAP vs WHOIS', text: 'RDAP (Registration Data Access Protocol) é o padrão moderno para consulta de registros de domínio, substituto do WHOIS clássico.', type: 'info' as const },
  { title: 'Privacidade de WHOIS', text: 'Muitos registradores ocultam dados pessoais do registrante por padrão (WHOIS Privacy). Isso é normal e não indica nada suspeito.', type: 'info' as const },
  { title: 'DNS & Propagação', text: 'Alterações de DNS podem levar de minutos a 48 horas para propagar globalmente. Os registros exibidos refletem o estado atual.', type: 'info' as const },
]

const dominio      = ref('')
const dominioAtual = ref('')
const consultando  = ref(false)
const erro         = ref('')
const aba          = ref<'whois'|'dns'>('whois')

const tabs = [
  { id: 'whois' as const, label: 'WHOIS / RDAP', icon: 'mdi:domain' },
  { id: 'dns'   as const, label: 'DNS Lookup',   icon: 'mdi:dns'   },
]

const exemplos = ['google.com', 'registro.br', 'globo.com', 'uol.com.br', 'amazon.com.br']

// ─── RDAP Data ────────────────────────────────────────────────────────────────
interface RDAPData {
  ldhName: string; handle?: string; status: string[]; registrar?: string
  events: { action: string; date: string }[]
  nameservers: string[]
  entities: { role: string; name?: string; org?: string; email?: string; country?: string }[]
  dnssec: boolean
}
const rdapData = ref<RDAPData | null>(null)

// ─── DNS Data ─────────────────────────────────────────────────────────────────
type DNSRecord = { data: string; TTL: number }
type DNSData = Record<string, DNSRecord[]>
const dnsData = ref<DNSData | null>(null)

const tiposDNS = [
  { type: 'A',     descricao: 'Endereço IPv4',    cor: 'bg-sky-500/20 text-sky-300 border border-sky-500/30'     },
  { type: 'AAAA',  descricao: 'Endereço IPv6',    cor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' },
  { type: 'MX',    descricao: 'Servidor de e-mail', cor: 'bg-orange-500/20 text-orange-300 border border-orange-500/30' },
  { type: 'NS',    descricao: 'Nameserver',        cor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
  { type: 'TXT',   descricao: 'SPF, DMARC, verify...', cor: 'bg-teal-500/20 text-teal-300 border border-teal-500/30' },
  { type: 'CNAME', descricao: 'Alias / Apontamento', cor: 'bg-pink-500/20 text-pink-300 border border-pink-500/30' },
  { type: 'SOA',   descricao: 'Start of Authority', cor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
]

function limparDominio(raw: string): string {
  let d = raw.trim().toLowerCase()
  d = d.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0].split('?')[0]
  return d
}

function validarDominio(d: string): boolean {
  return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i.test(d)
}

async function consultar() {
  const raw = dominio.value.trim()
  if (!raw) return
  const d = limparDominio(raw)
  if (!validarDominio(d)) { erro.value = `"${raw}" não parece um domínio válido. Exemplo: exemplo.com.br`; return }

  dominio.value = d
  dominioAtual.value = d
  consultando.value = true
  erro.value = ''
  rdapData.value = null
  dnsData.value = null

  // Busca ambas em paralelo
  await Promise.allSettled([
    buscarRDAP(d),
    buscarDNS(d),
  ])

  consultando.value = false
}

async function buscarRDAP(d: string) {
  try {
    // Try rdap.org (universal RDAP client, redirects to right registry)
    const r = await fetch(`https://rdap.org/domain/${encodeURIComponent(d)}`, {
      headers: { 'Accept': 'application/rdap+json' },
      signal: AbortSignal.timeout(12000),
    })

    if (!r.ok) {
      if (r.status === 404) { rdapData.value = { ldhName: d, status: ['unregistered'], events: [], nameservers: [], entities: [], dnssec: false }; return }
      throw new Error(`RDAP retornou ${r.status}`)
    }

    const raw = await r.json()

    // Parse RDAP response
    const events: { action: string; date: string }[] = (raw.events || [])
      .filter((e: any) => ['registration', 'expiration', 'last changed'].includes(e.eventAction))
      .map((e: any) => ({ action: e.eventAction, date: e.eventDate }))

    const nameservers: string[] = (raw.nameservers || []).map((ns: any) =>
      (typeof ns === 'string' ? ns : ns.ldhName || ns.unicodeName || '').toLowerCase()
    ).filter(Boolean)

    // Parse entities
    const entities: RDAPData['entities'] = []
    for (const entity of raw.entities || []) {
      const roles: string[] = entity.roles || []
      for (const role of roles) {
        const parsed = parseVCard(entity.vcardArray)
        entities.push({ role, ...parsed })
      }
    }

    // Find registrar in entities
    let registrar = entities.find(e => e.role === 'registrar')?.org ||
                    entities.find(e => e.role === 'registrar')?.name || ''

    // Also check publicIds for registrar
    if (!registrar && raw.publicIds) {
      const pub = raw.publicIds.find((p: any) => p.type === 'IANA Registrar ID')
      if (pub) registrar = `IANA ID: ${pub.identifier}`
    }

    rdapData.value = {
      ldhName: raw.ldhName || raw.unicodeName || d,
      handle: raw.handle,
      status: raw.status || [],
      registrar,
      events,
      nameservers,
      entities: entities.filter(e => e.role !== 'registrar' || entities.length <= 2),
      dnssec: raw.secureDNS?.delegationSigned || raw.secureDNS?.zoneSigned || false,
    }

  } catch (e: any) {
    // Don't set global error if DNS part may succeed
    if (!rdapData.value) {
      rdapData.value = { ldhName: d, status: [], events: [], nameservers: [], entities: [], dnssec: false }
    }
  }
}

function parseVCard(vcard: any): { name?: string; org?: string; email?: string; country?: string } {
  if (!Array.isArray(vcard) || vcard.length < 2) return {}
  const fields: { name?: string; org?: string; email?: string; country?: string } = {}
  for (const item of vcard[1] || []) {
    if (!Array.isArray(item)) continue
    const [type,,, value] = item
    if (type === 'fn') fields.name = value
    else if (type === 'org') fields.org = Array.isArray(value) ? value[0] : value
    else if (type === 'email') fields.email = value
    else if (type === 'adr') {
      const adr = Array.isArray(value) ? value : []
      fields.country = adr[6] || ''
    }
  }
  return fields
}

async function buscarDNS(d: string) {
  const tipos = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME', 'SOA']
  const results: DNSData = {}

  await Promise.allSettled(tipos.map(async (type) => {
    try {
      const r = await fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(d)}&type=${type}`,
        { signal: AbortSignal.timeout(8000) }
      )
      const data = await r.json()
      if (data.Status === 0 && data.Answer?.length) {
        results[type] = data.Answer.map((a: any) => ({
          data: a.data?.replace(/"/g, '') || '',
          TTL: a.TTL || 0,
        }))
      } else {
        results[type] = []
      }
    } catch {
      results[type] = []
    }
  }))

  dnsData.value = results
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatarData(iso: string): string {
  if (!iso) return '-'
  try { return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) }
  catch { return iso }
}

function formatarDataRelativa(iso: string): string {
  if (!iso) return ''
  try {
    const diff = new Date(iso).getTime() - Date.now()
    const days = Math.round(diff / 86400000)
    if (days > 0) return `em ${days} dias`
    if (days < 0) return `há ${Math.abs(days)} dias`
    return 'hoje'
  } catch { return '' }
}

function traduzirEvento(action: string): string {
  const map: Record<string, string> = {
    'registration':  'Registro',
    'expiration':    'Vencimento',
    'last changed':  'Última atualização',
    'transfer':      'Transferência',
  }
  return map[action] || action
}

function traduzirRole(role: string): string {
  const map: Record<string, string> = {
    'registrant':          'Registrante',
    'administrative':      'Contato Administrativo',
    'technical':           'Contato Técnico',
    'billing':             'Contato de Cobrança',
    'reseller':            'Revendedor',
    'noc':                 'NOC',
  }
  return map[role] || role
}

const verificacoes = computed(() => {
  const dns = dnsData.value
  if (!dns) return []
  return [
    { label: 'Resolve (A)',   ok: (dns.A?.length || 0) > 0 },
    { label: 'Nameservers',   ok: (dns.NS?.length || 0) > 0 },
    { label: 'E-mail (MX)',   ok: (dns.MX?.length || 0) > 0 },
    { label: 'SPF (TXT)',     ok: dns.TXT?.some(r => r.data.startsWith('v=spf')) || false },
    { label: 'DMARC',         ok: dns.TXT?.some(r => r.data.includes('v=DMARC')) || false },
    { label: 'IPv6 (AAAA)',   ok: (dns.AAAA?.length || 0) > 0 },
  ]
})

function copiarWhois() {
  const r = rdapData.value; if (!r) return
  const lines = [
    `Domínio: ${r.ldhName}`,
    `Status: ${r.status.join(', ')}`,
    `Registrar: ${r.registrar || '-'}`,
    ...r.events.map(e => `${traduzirEvento(e.action)}: ${formatarData(e.date)}`),
    `Nameservers: ${r.nameservers.join(', ')}`,
    `DNSSEC: ${r.dnssec ? 'Sim' : 'Não'}`,
  ]
  navigator.clipboard.writeText(lines.join('\n'))
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
}

function copiar(text: string) {
  if (!text) return
  navigator.clipboard.writeText(text)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}
</script>
