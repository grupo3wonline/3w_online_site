<template>
  <ToolShell
    title="Consulta & Validação de CEP"
    description="Valide CEPs brasileiros, consulte endereço completo, coordenadas GPS, mapa e links para navegação."
    icon="fa-map-marker-alt"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['Formato 00000-000', 'Coordenadas GPS', 'Mapa Interativo', 'Google Maps & Waze']"
    :tips="cepTips"
  >
    <div class="tool-body">
      <!-- Anti-bot: honeypot — não altere ou remova este campo -->
      <div aria-hidden="true" style="position:absolute;left:-5000px;overflow:hidden;height:0;width:0">
        <label for="_3w_hp_cep">Website</label>
        <input id="_3w_hp_cep" name="website" type="text" tabindex="-1" autocomplete="new-password" v-model="hpField" />
      </div>

      <BaseInput
        v-model="cep"
        label="CEP"
        icon="fa-map-marker-alt"
        placeholder="00000-000"
        clearable
        tooltip="Digite o CEP com ou sem hífens. Aceita exatamente 8 dígitos numéricos."
        :error="erro"
        @input="onInput"
        @enter="debouncedConsultarCep"
        :max="9"
      />

      <div class="flex gap-3 mt-4">
        <BaseButton variant="success" icon="fa-search" @click="debouncedConsultarCep" :loading="consultando || guard.pending.value" class="flex-1">
          Consultar CEP
        </BaseButton>
        <BaseButton variant="outline" icon="fa-trash-alt" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in">
      <div v-if="resultado" class="mt-4 space-y-4">

        <!-- Status -->
        <div :class="[
          'flex items-center gap-4 p-5 rounded-2xl border-2',
          valido
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/15 border-emerald-300 dark:border-emerald-700'
            : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/15 border-red-300 dark:border-red-700',
        ]">
          <div :class="['w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg', valido ? 'bg-gradient-to-br from-emerald-400 to-teal-600' : 'bg-gradient-to-br from-red-400 to-rose-600']">
            <i :class="['fas', valido ? 'fa-check' : 'fa-times']"></i>
          </div>
          <div>
            <h3 :class="['text-xl font-black', valido ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-400']">
              {{ valido ? 'CEP Válido ✓' : 'CEP Inválido ✗' }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-slate-300 mt-0.5">{{ mensagem }}</p>
            <div v-if="valido" class="flex gap-2 mt-2">
              <span class="stat-pill font-mono">{{ cepFormatado }}</span>
            </div>
          </div>
        </div>

        <!-- Dados do endereço -->
        <div v-if="dadosCep" class="glass-panel p-4 space-y-4">

          <!-- Título + fonte -->
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
              <i class="fas fa-map-pin text-emerald-500"></i>
              Endereço Completo
            </h4>
            <span class="text-[10px] text-gray-400 dark:text-slate-500 font-medium">{{ dadosCep.fonte }}</span>
          </div>

          <!-- Grade de campos -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div v-for="campo in camposEndereco" :key="campo.label"
              class="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 group transition-colors"
              @click="copiarCampo(campo.valor)">
              <p class="text-[10px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-0.5 flex items-center gap-1">
                <i v-if="campo.icon" :class="['fas', campo.icon, 'text-emerald-500']"></i>
                {{ campo.label }}
              </p>
              <p class="font-bold text-gray-900 dark:text-white text-sm truncate">{{ campo.valor || '—' }}</p>
              <i class="fas fa-copy text-gray-300 dark:text-slate-500 opacity-0 group-hover:opacity-100 text-[10px] mt-0.5 block"></i>
            </div>
          </div>

          <!-- Coordenadas GPS -->
          <div v-if="dadosCep.latitude && dadosCep.longitude" class="border-t border-gray-100 dark:border-slate-700 pt-3 space-y-3">
            <h5 class="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-2">
              <i class="fas fa-crosshairs text-blue-500"></i>
              Geolocalização
            </h5>
            <div class="grid grid-cols-2 gap-2">
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/40 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                @click="copiarCampo(dadosCep.latitude)">
                <p class="text-[10px] font-semibold text-blue-500 uppercase tracking-wide mb-0.5">Latitude</p>
                <p class="font-bold font-mono text-blue-700 dark:text-blue-300 text-sm">{{ dadosCep.latitude }}</p>
              </div>
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/40 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                @click="copiarCampo(dadosCep.longitude)">
                <p class="text-[10px] font-semibold text-blue-500 uppercase tracking-wide mb-0.5">Longitude</p>
                <p class="font-bold font-mono text-blue-700 dark:text-blue-300 text-sm">{{ dadosCep.longitude }}</p>
              </div>
            </div>

            <!-- Links de Mapa -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a :href="linkGoogleMaps" target="_blank" rel="noopener noreferrer"
                class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs font-semibold text-gray-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all shadow-sm">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                Google Maps
              </a>
              <a :href="linkStreetView" target="_blank" rel="noopener noreferrer"
                class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs font-semibold text-gray-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 hover:text-orange-700 dark:hover:text-orange-300 transition-all shadow-sm">
                <i class="fas fa-street-view text-orange-500 w-4"></i>
                Street View
              </a>
              <a :href="linkWaze" target="_blank" rel="noopener noreferrer"
                class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs font-semibold text-gray-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-300 hover:text-sky-700 dark:hover:text-sky-300 transition-all shadow-sm">
                <i class="fas fa-route text-sky-500 w-4"></i>
                Waze
              </a>
              <a :href="linkOSM" target="_blank" rel="noopener noreferrer"
                class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs font-semibold text-gray-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 hover:text-green-700 dark:hover:text-green-300 transition-all shadow-sm">
                <i class="fas fa-map text-green-500 w-4"></i>
                OpenStreet
              </a>
            </div>

            <!-- Mapa embutido OpenStreetMap -->
            <div class="relative rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm">
              <div class="bg-gray-100 dark:bg-slate-700 py-1.5 px-3 flex items-center justify-between border-b border-gray-200 dark:border-slate-600">
                <span class="text-[10px] font-semibold text-gray-500 dark:text-slate-400 flex items-center gap-1">
                  <i class="fas fa-map text-green-500"></i>
                  Mapa — OpenStreetMap
                </span>
                <a :href="linkOSM" target="_blank" rel="noopener noreferrer"
                  class="text-[10px] text-blue-500 hover:text-blue-700 font-semibold flex items-center gap-1">
                  Abrir mapa completo <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
              <iframe
                :src="linkOSMEmbed"
                class="w-full"
                style="height:300px;border:0"
                loading="lazy"
                title="Mapa do CEP"
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
            </div>
          </div>

          <!-- Dados técnicos -->
          <div v-if="dadosCep.ibge || dadosCep.ddd || dadosCep.siafi" class="border-t border-gray-100 dark:border-slate-700 pt-3">
            <h5 class="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-2">
              <i class="fas fa-code text-purple-500"></i>
              Dados Técnicos
            </h5>
            <div class="flex flex-wrap gap-2">
              <div v-if="dadosCep.ibge" class="text-xs bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 px-2.5 py-1.5 rounded-lg">
                <span class="font-semibold">IBGE:</span> {{ dadosCep.ibge }}
              </div>
              <div v-if="dadosCep.ddd" class="text-xs bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/40 text-teal-700 dark:text-teal-300 px-2.5 py-1.5 rounded-lg">
                <span class="font-semibold">DDD:</span> ({{ dadosCep.ddd }})
              </div>
              <div v-if="dadosCep.siafi" class="text-xs bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 px-2.5 py-1.5 rounded-lg">
                <span class="font-semibold">SIAFI:</span> {{ dadosCep.siafi }}
              </div>
              <div v-if="dadosCep.gia" class="text-xs bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/40 text-orange-700 dark:text-orange-300 px-2.5 py-1.5 rounded-lg">
                <span class="font-semibold">GIA:</span> {{ dadosCep.gia }}
              </div>
              <div v-if="dadosCep.regiao" class="text-xs bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 px-2.5 py-1.5 rounded-lg">
                <span class="font-semibold">Região:</span> {{ dadosCep.regiao }}
              </div>
            </div>
          </div>

          <!-- Botões de cópia -->
          <div class="border-t border-gray-100 dark:border-slate-700 pt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button @click="copiarEndereco()" class="copy-btn justify-center py-2.5">
              <i class="fas fa-copy"></i> Copiar endereço
            </button>
            <button @click="copiarCEP(true)" class="copy-btn justify-center py-2.5">
              <i class="fas fa-copy"></i> CEP formatado
            </button>
            <button v-if="dadosCep.latitude" @click="copiarCoordenadas()" class="copy-btn justify-center py-2.5">
              <i class="fas fa-crosshairs"></i> Coordenadas
            </button>
          </div>
        </div>

        <!-- Sem dados mas CEP válido -->
        <div v-else-if="valido && !consultando" class="tip-card">
          <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">
            CEP válido estruturalmente. Clique em <strong>"Consultar CEP"</strong> para buscar o endereço.
          </span>
        </div>

      </div>
    </Transition>

    <!-- Lote -->
    <div class="mt-5">
      <button @click="loteOpen = !loteOpen" class="accordion-trigger">
        <span class="flex items-center gap-2 text-sm">
          <i class="fas fa-list-check text-primary-500"></i>
          Validar múltiplos CEPs
        </span>
        <i :class="['fas', loteOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-xs text-gray-400']"></i>
      </button>
      <Transition name="accordion">
        <div v-if="loteOpen" class="mt-3 space-y-3">
          <BaseInput v-model="cepsLote" type="textarea" label="Cole CEPs (um por linha)"
            placeholder="01310-100&#10;20040-020&#10;80010-000" :rows="5" />
          <BaseButton variant="primary" icon="fa-check-double" @click="validarLote" class="w-full">
            Validar Todos
          </BaseButton>
        </div>
      </Transition>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import { useApiProxy }     from '@/composables/useApiProxy'
import { useHoneypot }     from '@/composables/useHoneypot'
import { useRequestGuard } from '@/composables/useRequestGuard'
import { debounce }        from '@/composables/useDebounce'

const proxy = useApiProxy()
const { hpField, isBot } = useHoneypot()
const guard              = useRequestGuard()

const cepTips = [
  { text: 'CEP tem exatamente 8 dígitos numéricos. A pontuação (hífen) é opcional.' },
  { text: 'As coordenadas GPS são obtidas via BrasilAPI. Se não disponíveis, apenas dados de endereço são exibidos.', type: 'info' as const },
  { text: 'CEPs com prefixo 01000–09999 são do município de São Paulo.', type: 'info' as const },
]

// ─── Estado ───────────────────────────────────────────────────────────────────
const cep         = ref('')
const resultado   = ref(false)
const valido      = ref(false)
const mensagem    = ref('')
const erro        = ref('')
const consultando = ref(false)
const loteOpen    = ref(false)
const cepsLote    = ref('')

interface DadosCEP {
  logradouro: string; complemento: string; unidade: string
  bairro: string; localidade: string; uf: string; estado: string
  regiao: string; ibge: string; gia: string; ddd: string; siafi: string
  latitude: string; longitude: string
  fonte: string
}
const dadosCep = ref<DadosCEP | null>(null)

// ─── Computed ─────────────────────────────────────────────────────────────────
const cepSoNums   = computed(() => cep.value.replace(/\D/g, ''))
const cepFormatado = computed(() => {
  const n = cepSoNums.value
  return n.length === 8 ? `${n.slice(0,5)}-${n.slice(5)}` : n
})

const camposEndereco = computed(() => {
  const d = dadosCep.value
  if (!d) return []
  return [
    { label: 'Logradouro',   valor: d.logradouro,                              icon: 'fa-road'           },
    { label: 'Complemento',  valor: d.complemento || d.unidade,                icon: 'fa-info'           },
    { label: 'Bairro',       valor: d.bairro,                                  icon: 'fa-map-signs'      },
    { label: 'Cidade',       valor: d.localidade,                              icon: 'fa-city'           },
    { label: 'Estado',       valor: d.estado ? `${d.uf} — ${d.estado}` : d.uf, icon: 'fa-flag'          },
    { label: 'CEP',          valor: cepFormatado.value,                        icon: 'fa-mailbox'        },
  ].filter(c => c.valor)
})

// Links de mapa
const linkGoogleMaps = computed(() => {
  const d = dadosCep.value
  if (!d) return '#'
  if (d.latitude && d.longitude) {
    return `https://www.google.com/maps?q=${d.latitude},${d.longitude}&z=17`
  }
  const q = encodeURIComponent(`${d.logradouro}, ${d.bairro}, ${d.localidade} - ${d.uf}, ${cepFormatado.value}`)
  return `https://www.google.com/maps/search/${q}`
})

const linkStreetView = computed(() => {
  const d = dadosCep.value
  if (!d?.latitude) return '#'
  return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${d.latitude},${d.longitude}`
})

const linkWaze = computed(() => {
  const d = dadosCep.value
  if (!d?.latitude) return '#'
  return `https://waze.com/ul?ll=${d.latitude},${d.longitude}&navigate=yes`
})

const linkOSM = computed(() => {
  const d = dadosCep.value
  if (!d?.latitude) return '#'
  return `https://www.openstreetmap.org/?mlat=${d.latitude}&mlon=${d.longitude}&zoom=17`
})

const linkOSMEmbed = computed(() => {
  const d = dadosCep.value
  if (!d?.latitude || !d?.longitude) return ''
  const lat = parseFloat(d.latitude), lon = parseFloat(d.longitude)
  const delta = 0.008
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lon-delta},${lat-delta},${lon+delta},${lat+delta}&layer=mapnik&marker=${lat},${lon}`
})

// ─── Funções ──────────────────────────────────────────────────────────────────
function onInput() {
  erro.value = ''
  resultado.value = false
  dadosCep.value = null
}

function validarFormato(): boolean {
  const n = cepSoNums.value
  if (!n)           { erro.value = 'Digite um CEP.'; return false }
  if (n.length !== 8) { erro.value = `CEP incompleto (${n.length}/8 dígitos).`; return false }
  erro.value = ''; return true
}

async function consultarCep() {
  if (isBot.value) return   // Honeypot: bot detectado
  if (!validarFormato()) return
  await guard.run(async () => {
    consultando.value = true
    resultado.value   = true
    valido.value      = true
    mensagem.value    = 'Consultando...'
    dadosCep.value    = null

    const n = cepSoNums.value

    try {
      // 1. BrasilAPI v2 — tem coordenadas GPS
      let brasil: any = null
      try {
        const r = await proxy.secureFetch(proxy.cepUrl(n), { signal: AbortSignal.timeout(8000) })
        if (r.ok) brasil = await r.json()
      } catch {}

      // 2. ViaCEP — dados complementares (ibge, ddd, siafi, regiao, estado)
      let via: any = null
      try {
        const r = await proxy.secureFetch(proxy.viaCepUrl(n), { signal: AbortSignal.timeout(8000) })
        if (r.ok) {
          const d = await r.json()
          if (!d.erro) via = d
        }
      } catch {}

    if (!brasil && !via) {
      mensagem.value = 'CEP não encontrado nas bases consultadas.'
      valido.value = false
      return
    }

    // Mescla os dois, priorizando BrasilAPI para endereço e ViaCEP para campos extras
    dadosCep.value = {
      logradouro:  brasil?.street     || via?.logradouro   || '',
      complemento: via?.complemento   || '',
      unidade:     via?.unidade       || '',
      bairro:      brasil?.neighborhood || via?.bairro      || '',
      localidade:  brasil?.city       || via?.localidade    || '',
      uf:          brasil?.state      || via?.uf            || '',
      estado:      via?.estado        || '',
      regiao:      via?.regiao        || '',
      ibge:        via?.ibge          || '',
      gia:         via?.gia           || '',
      ddd:         via?.ddd           || '',
      siafi:       via?.siafi         || '',
      latitude:    brasil?.location?.coordinates?.latitude  ? String(brasil.location.coordinates.latitude)  : '',
      longitude:   brasil?.location?.coordinates?.longitude ? String(brasil.location.coordinates.longitude) : '',
      fonte:       brasil && via ? 'BrasilAPI + ViaCEP' : brasil ? 'BrasilAPI' : 'ViaCEP',
    }

    mensagem.value = `Endereço encontrado! ${dadosCep.value.latitude ? '📍 Coordenadas GPS disponíveis.' : ''}`

  } catch {
    Swal.fire({ icon: 'warning', title: 'Sem conexão', text: 'Não foi possível consultar as APIs. Verifique sua conexão.', confirmButtonColor: '#2563eb' })
    valido.value = false
    mensagem.value = 'Erro ao consultar.'
  } finally {
    consultando.value = false
  }
  }) // guard.run
}

const debouncedConsultarCep = debounce(consultarCep, 400)

function limpar() {
  cep.value = ''; resultado.value = false; valido.value = false
  mensagem.value = ''; erro.value = ''; dadosCep.value = null
}

async function copiarCampo(valor: string) {
  if (!valor) return
  await navigator.clipboard.writeText(valor)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1000 })
}

async function copiarCEP(formatado: boolean) {
  await navigator.clipboard.writeText(formatado ? cepFormatado.value : cepSoNums.value)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1200 })
}

async function copiarEndereco() {
  const d = dadosCep.value; if (!d) return
  const partes = [d.logradouro, d.complemento, d.bairro, `${d.localidade}/${d.uf}`, `CEP: ${cepFormatado.value}`].filter(Boolean)
  await navigator.clipboard.writeText(partes.join(', '))
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Endereço copiado!', showConfirmButton: false, timer: 1500 })
}

async function copiarCoordenadas() {
  const d = dadosCep.value; if (!d?.latitude) return
  await navigator.clipboard.writeText(`${d.latitude}, ${d.longitude}`)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Coordenadas copiadas!', showConfirmButton: false, timer: 1200 })
}

function validarLote() {
  const lines = cepsLote.value.split('\n').map(l => l.trim()).filter(Boolean)
  if (!lines.length) return
  const rows = lines.map(l => {
    const n = l.replace(/\D/g, '')
    const ok = n.length === 8
    const fmt = n.length === 8 ? `${n.slice(0,5)}-${n.slice(5)}` : l
    return `<tr><td style="padding:4px 8px;font-family:monospace">${fmt}</td><td style="font-weight:bold;color:${ok ? '#059669' : '#dc2626'}">${ok ? '✅' : '❌'}</td></tr>`
  }).join('')
  const v = lines.filter(l => l.replace(/\D/g, '').length === 8).length
  Swal.fire({
    title: `${lines.length} CEPs`,
    html: `<div style="margin-bottom:10px"><span style="background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:20px;font-size:0.8rem">✅ ${v}</span> <span style="background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:20px;font-size:0.8rem">❌ ${lines.length - v}</span></div><div style="max-height:250px;overflow-y:auto;border:1px solid #e5e7eb;border-radius:8px"><table style="width:100%;border-collapse:collapse;font-size:0.85rem"><tbody>${rows}</tbody></table></div>`,
    confirmButtonText: 'Fechar', confirmButtonColor: '#2563eb', width: 420,
  })
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
.accordion-enter-active, .accordion-leave-active { transition: all 0.25s ease; overflow: hidden; max-height: 400px; }
.accordion-enter-from, .accordion-leave-to       { max-height: 0; opacity: 0; }
</style>
