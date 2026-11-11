<template>
  <ToolShell
    title="Validador & Consulta de CNPJ"
    description="Valide matematicamente e consulte dados completos da Receita Federal: QSA, endereço, CNAE, Simples Nacional e situação cadastral."
    icon="fa-building"
    icon-gradient="from-indigo-500 to-blue-800"
    orb-color="indigo"
    :quick-tips="['Dados da Receita Federal','QSA completo','CNAE principal e secundários','Simples Nacional / MEI']"
    :tips="cnpjTips"
  >
    <!-- Entrada -->
    <div class="tool-body">
      <!-- Anti-bot: honeypot — não altere ou remova este campo -->
      <div aria-hidden="true" style="position:absolute;left:-5000px;overflow:hidden;height:0;width:0">
        <label for="_3w_hp_cnpj">Website</label>
        <input id="_3w_hp_cnpj" name="website" type="text" tabindex="-1" autocomplete="new-password" v-model="hpField" />
      </div>

      <BaseInput
        v-model="cnpjRaw"
        label="CNPJ"
        icon="fa-building"
        placeholder="00.000.000/0000-00"
        :max="18"
        clearable
        tooltip="Digite ou cole o CNPJ. Aceita com ou sem formatação."
        :error="erro"
        hint="Aceita: 00.000.000/0001-00 ou 00000000000100"
        @input="onInput"
        @enter="debouncedConsultarCNPJ"
      />
      <div v-if="cnpjFormatado" class="mt-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40">
        <span class="text-xs text-blue-600 dark:text-blue-300 font-mono">
          <i class="fas fa-magic mr-1.5"></i>
          Formatado: <strong>{{ cnpjFormatado }}</strong>
        </span>
      </div>
      <div class="flex gap-3 mt-4">
        <BaseButton variant="primary" icon="fa-search" @click="debouncedConsultarCNPJ" :loading="consultando || guard.pending.value" class="flex-1">
          Consultar CNPJ
        </BaseButton>
        <BaseButton variant="outline" icon="fa-check" @click="validarApenas">
          Só Validar
        </BaseButton>
        <BaseButton variant="outline" icon="fa-trash-alt" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="consultando" class="mt-5 flex flex-col items-center py-10">
      <i class="fas fa-circle-notch fa-spin text-indigo-400 text-3xl mb-3"></i>
      <p class="text-sm text-gray-600 dark:text-slate-300">Consultando Receita Federal...</p>
    </div>

    <!-- Resultado: validação apenas (sem dados) -->
    <Transition name="scale-in">
      <div v-if="validado && !dadosCnpj && !consultando" class="mt-4">
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
              {{ valido ? 'CNPJ Válido ✓' : 'CNPJ Inválido ✗' }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-slate-300 mt-0.5">{{ mensagemValidacao }}</p>
            <div v-if="valido" class="flex flex-wrap gap-2 mt-2">
              <span class="stat-pill font-mono text-xs">{{ cnpjFormatado }}</span>
              <span class="stat-pill text-xs">{{ estabelecimento }}</span>
            </div>
          </div>
        </div>
        <div v-if="valido" class="mt-3 flex gap-2">
          <button @click="copiarRaw(false)" class="copy-btn flex-1 justify-center py-2"><i class="fas fa-copy"></i> Sem máscara</button>
          <button @click="copiarRaw(true)" class="copy-btn flex-1 justify-center py-2"><i class="fas fa-copy"></i> Formatado</button>
        </div>
      </div>
    </Transition>

    <!-- Resultado: dados completos da Receita Federal -->
    <Transition name="scale-in">
      <div v-if="dadosCnpj && !consultando" class="mt-4 space-y-4">

        <!-- Header: nome + status -->
        <div class="rounded-2xl border-2 overflow-hidden" :class="statusClass.border">
          <div class="p-5" :class="statusClass.bg">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  <span class="text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide" :class="statusClass.badge">
                    {{ dadosCnpj.descricao_situacao_cadastral || '—' }}
                  </span>
                  <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/20 text-gray-700 dark:text-white">
                    {{ dadosCnpj.descricao_matriz_filial || estabelecimento }}
                  </span>
                  <span v-if="dadosCnpj.opcao_pelo_simples" class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                    📊 Simples Nacional
                  </span>
                  <span v-if="dadosCnpj.opcao_pelo_mei" class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    🤝 MEI
                  </span>
                </div>
                <h2 class="text-lg font-black text-gray-900 dark:text-white leading-tight">{{ dadosCnpj.razao_social }}</h2>
                <p v-if="dadosCnpj.nome_fantasia" class="text-sm text-gray-600 dark:text-slate-300 mt-0.5">
                  <span class="font-semibold">Fantasia:</span> {{ dadosCnpj.nome_fantasia }}
                </p>
                <p class="text-sm font-mono font-semibold text-gray-700 dark:text-slate-200 mt-1">{{ cnpjFormatado }}</p>
              </div>
              <button @click="copiarTudo()" class="copy-btn text-xs py-1.5 shrink-0">
                <i class="fas fa-copy"></i> Copiar tudo
              </button>
            </div>
          </div>
        </div>

        <!-- Tabs de conteúdo -->
        <div>
          <div class="flex gap-1 p-1 bg-gray-100 dark:bg-slate-700 rounded-xl mb-4">
            <button v-for="t in tabsDados" :key="t.id" @click="tabAtiva=t.id"
              :class="['flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all',
                tabAtiva===t.id?'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm':'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white']">
              <i :class="['fas', t.icon, 'text-xs']"></i> {{ t.label }}
            </button>
          </div>

          <!-- Dados Gerais -->
          <div v-show="tabAtiva==='geral'" class="space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div v-for="campo in camposGerais" :key="campo.label"
                class="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors group"
                @click="copiarCampo(campo.valor)">
                <p class="text-[10px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-0.5 flex items-center gap-1">
                  <i v-if="campo.icon" :class="['fas', campo.icon, 'text-indigo-400 text-[10px]']"></i>
                  {{ campo.label }}
                </p>
                <p class="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{{ campo.valor || '—' }}</p>
                <i class="fas fa-copy text-gray-300 dark:text-slate-500 opacity-0 group-hover:opacity-100 text-[10px] mt-0.5 block"></i>
              </div>
            </div>
          </div>

          <!-- Endereço -->
          <div v-show="tabAtiva==='endereco'" class="space-y-3">
            <div class="p-5 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
              <p class="text-xs text-gray-500 dark:text-slate-400 font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <i class="fas fa-map-marker-alt text-red-500"></i> Endereço completo
              </p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white leading-relaxed">{{ enderecoFormatado }}</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div v-for="campo in camposEndereco" :key="campo.label"
                class="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                @click="copiarCampo(campo.valor)">
                <p class="text-[10px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">{{ campo.label }}</p>
                <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ campo.valor || '—' }}</p>
              </div>
            </div>
            <div v-if="linkGoogleMaps" class="flex gap-2">
              <a :href="linkGoogleMaps" target="_blank" rel="noopener noreferrer"
                class="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs font-semibold text-gray-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all shadow-sm">
                <i class="fas fa-map-marker-alt text-red-500"></i> Abrir no Google Maps
              </a>
              <button @click="copiarCampo(enderecoFormatado)" class="copy-btn py-2 px-4">
                <i class="fas fa-copy"></i> Copiar endereço
              </button>
            </div>
          </div>

          <!-- QSA -->
          <div v-show="tabAtiva==='qsa'" class="space-y-3">
            <div v-if="!dadosCnpj.qsa?.length" class="p-6 text-center text-gray-400 dark:text-slate-500 glass-panel">
              <i class="fas fa-users text-3xl mb-2 block"></i>
              Sem informações de sócios disponíveis
            </div>
            <div v-else class="space-y-3">
              <p class="text-xs text-gray-500 dark:text-slate-400">
                {{ dadosCnpj.qsa.length }} {{ dadosCnpj.qsa.length === 1 ? 'membro' : 'membros' }} no Quadro de Sócios e Administradores
              </p>
              <div v-for="(socio, i) in dadosCnpj.qsa" :key="i"
                class="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600 space-y-2">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0"
                      :class="tipoSocioClass(socio.identificador_de_socio)">
                      {{ socio.nome_socio?.charAt(0) || '?' }}
                    </div>
                    <div>
                      <p class="font-bold text-gray-900 dark:text-white text-sm">{{ socio.nome_socio }}</p>
                      <p v-if="socio.cnpj_cpf_do_socio" class="text-xs font-mono text-gray-500 dark:text-slate-400">
                        {{ mascararDocumento(socio.cnpj_cpf_do_socio) }}
                      </p>
                    </div>
                  </div>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" :class="tipoSocioClass(socio.identificador_de_socio) + ' bg-opacity-20'">
                    {{ tipoSocioLabel(socio.identificador_de_socio) }}
                  </span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                  <div v-if="socio.qualificacao_socio?.descricao || socio.codigo_qualificacao_socio" class="text-xs">
                    <span class="text-gray-400 dark:text-slate-500 font-semibold block">Qualificação</span>
                    <span class="text-gray-700 dark:text-slate-200">{{ socio.qualificacao_socio?.descricao || `Cód. ${socio.codigo_qualificacao_socio}` }}</span>
                  </div>
                  <div v-if="socio.data_entrada_sociedade" class="text-xs">
                    <span class="text-gray-400 dark:text-slate-500 font-semibold block">Entrada</span>
                    <span class="text-gray-700 dark:text-slate-200">{{ formatarData(socio.data_entrada_sociedade) }}</span>
                  </div>
                  <div v-if="socio.percentual_capital_social" class="text-xs">
                    <span class="text-gray-400 dark:text-slate-500 font-semibold block">Capital</span>
                    <span class="text-gray-700 dark:text-slate-200">{{ socio.percentual_capital_social }}%</span>
                  </div>
                </div>
                <!-- Representante Legal -->
                <div v-if="socio.nome_representante_legal" class="mt-2 pt-2 border-t border-gray-200 dark:border-slate-600">
                  <p class="text-[10px] text-gray-400 dark:text-slate-500 font-semibold uppercase tracking-wide mb-1">Representante Legal</p>
                  <p class="text-xs font-semibold text-gray-700 dark:text-slate-200">{{ socio.nome_representante_legal }}</p>
                  <p v-if="socio.cpf_representante_legal" class="text-xs font-mono text-gray-500">
                    {{ mascararDocumento(socio.cpf_representante_legal) }}
                  </p>
                  <p v-if="socio.qualificacao_representante_legal?.descricao" class="text-xs text-gray-500">
                    {{ socio.qualificacao_representante_legal.descricao }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- CNAEs -->
          <div v-show="tabAtiva==='cnae'" class="space-y-3">
            <!-- CNAE Principal -->
            <div>
              <p class="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                CNAE Principal
              </p>
              <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/40">
                <span class="text-xs font-black font-mono text-indigo-600 dark:text-indigo-300 block mb-1">{{ dadosCnpj.cnae_fiscal }}</span>
                <p class="text-sm font-semibold text-gray-800 dark:text-white">{{ dadosCnpj.cnae_fiscal_descricao }}</p>
              </div>
            </div>
            <!-- CNAEs Secundários -->
            <div v-if="dadosCnpj.cnaes_secundarios?.length">
              <p class="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-gray-400 inline-block"></span>
                CNAEs Secundários ({{ dadosCnpj.cnaes_secundarios.length }})
              </p>
              <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
                <div v-for="cnae in dadosCnpj.cnaes_secundarios" :key="cnae.codigo"
                  class="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600 flex items-start gap-3">
                  <span class="text-[11px] font-black font-mono text-gray-500 dark:text-slate-400 shrink-0 pt-0.5">{{ cnae.codigo }}</span>
                  <span class="text-sm text-gray-700 dark:text-slate-200">{{ cnae.descricao }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Rodapé: copiar CNPJ -->
        <div class="flex gap-2 flex-wrap">
          <button @click="copiarRaw(true)" class="copy-btn py-2 flex-1 justify-center">
            <i class="fas fa-copy"></i> Copiar CNPJ formatado
          </button>
          <button @click="copiarRaw(false)" class="copy-btn py-2 flex-1 justify-center">
            <i class="fas fa-copy"></i> Copiar sem máscara
          </button>
        </div>

        <p class="text-[11px] text-gray-400 dark:text-slate-500 text-center">
          Dados provenientes da Receita Federal via BrasilAPI. Situação cadastral atualizada periodicamente.
        </p>
      </div>
    </Transition>

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

const cnpjTips = [
  { title: 'Dados em tempo real', text: 'Os dados são consultados diretamente na Receita Federal via BrasilAPI. A situação cadastral pode levar horas para atualizar após mudanças.', type: 'info' as const },
  { title: 'QSA — Quadro de Sócios', text: 'O QSA lista todos os sócios e administradores com qualificação, percentual de capital e data de entrada na sociedade.', type: 'info' as const },
  { title: 'CNPJ de testes', text: 'CNPJs matematicamente válidos podem não existir na Receita Federal. Para gerar um CNPJ válido real, use o Gerador de CNPJ.', type: 'warning' as const },
]

// ─── Estado ───────────────────────────────────────────────────────────────────
const cnpjRaw = ref('')
const erro    = ref('')
const consultando = ref(false)
const validado    = ref(false)
const valido      = ref(false)
const mensagemValidacao = ref('')
const estabelecimento   = ref('')
const tabAtiva = ref<'geral'|'endereco'|'qsa'|'cnae'>('geral')

interface QSASocio {
  identificador_de_socio: number
  nome_socio: string
  cnpj_cpf_do_socio?: string
  codigo_qualificacao_socio?: number
  percentual_capital_social?: number
  data_entrada_sociedade?: string
  cpf_representante_legal?: string
  nome_representante_legal?: string
  qualificacao_socio?: { codigo: number; descricao: string }
  qualificacao_representante_legal?: { codigo: number; descricao: string }
}

interface CNAESecundario { codigo: number; descricao: string }

interface DadosCNPJ {
  cnpj: string; razao_social: string; nome_fantasia: string
  identificador_matriz_filial: number; descricao_matriz_filial: string
  descricao_situacao_cadastral: string; data_situacao_cadastral: string
  data_inicio_atividade: string
  cnae_fiscal: number; cnae_fiscal_descricao: string
  cnaes_secundarios: CNAESecundario[]
  descricao_natureza_juridica: string; porte: string; descricao_porte: string
  capital_social: number
  logradouro: string; numero: string; complemento: string
  bairro: string; municipio: string; uf: string; cep: string
  ddd_telefone_1: string; ddd_telefone_2: string
  email: string
  opcao_pelo_simples: boolean; data_opcao_pelo_simples?: string
  opcao_pelo_mei: boolean
  qsa: QSASocio[]
}

const dadosCnpj = ref<DadosCNPJ | null>(null)

const tabsDados = [
  { id: 'geral'    as const, label: 'Dados Gerais', icon: 'fa-info-circle' },
  { id: 'endereco' as const, label: 'Endereço',     icon: 'fa-map-marker-alt' },
  { id: 'qsa'      as const, label: 'QSA',          icon: 'fa-users' },
  { id: 'cnae'     as const, label: 'CNAEs',        icon: 'fa-industry' },
]

// ─── Computed ─────────────────────────────────────────────────────────────────
const cnpjSoNums   = computed(() => cnpjRaw.value.replace(/\D/g, ''))
const cnpjFormatado = computed(() => {
  const n = cnpjSoNums.value
  if (n.length < 2)   return ''
  if (n.length <= 5)  return `${n.slice(0,2)}.${n.slice(2)}`
  if (n.length <= 8)  return `${n.slice(0,2)}.${n.slice(2,5)}.${n.slice(5)}`
  if (n.length <= 12) return `${n.slice(0,2)}.${n.slice(2,5)}.${n.slice(5,8)}/${n.slice(8)}`
  return `${n.slice(0,2)}.${n.slice(2,5)}.${n.slice(5,8)}/${n.slice(8,12)}-${n.slice(12,14)}`
})

const statusClass = computed(() => {
  const s = dadosCnpj.value?.descricao_situacao_cadastral?.toUpperCase() || ''
  if (s === 'ATIVA') return {
    bg: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/15',
    border: 'border-emerald-300 dark:border-emerald-700',
    badge: 'bg-emerald-500 text-white',
  }
  if (s === 'BAIXADA') return {
    bg: 'bg-gray-50 dark:bg-slate-800/50',
    border: 'border-gray-300 dark:border-slate-600',
    badge: 'bg-gray-500 text-white',
  }
  if (['INAPTA','NULA','CANCELADA'].includes(s)) return {
    bg: 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/15',
    border: 'border-red-300 dark:border-red-700',
    badge: 'bg-red-500 text-white',
  }
  return { // SUSPENSA or others
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/15',
    border: 'border-amber-300 dark:border-amber-700',
    badge: 'bg-amber-500 text-white',
  }
})

const camposGerais = computed(() => {
  const d = dadosCnpj.value; if (!d) return []
  return [
    { label: 'CNPJ',               valor: cnpjFormatado.value,                                            icon: 'fa-hashtag'       },
    { label: 'Situação Cadastral', valor: d.descricao_situacao_cadastral,                                  icon: 'fa-circle'        },
    { label: 'Data da Situação',   valor: formatarData(d.data_situacao_cadastral),                         icon: 'fa-calendar-day'  },
    { label: 'Data de Abertura',   valor: formatarData(d.data_inicio_atividade),                           icon: 'fa-calendar-plus' },
    { label: 'Tipo',               valor: d.descricao_matriz_filial,                                       icon: 'fa-sitemap'       },
    { label: 'Natureza Jurídica',  valor: d.descricao_natureza_juridica,                                   icon: 'fa-gavel'         },
    { label: 'Porte',              valor: d.descricao_porte || d.porte,                                    icon: 'fa-chart-bar'     },
    { label: 'Capital Social',     valor: d.capital_social ? formatarMoeda(d.capital_social) : '',         icon: 'fa-dollar-sign'   },
    { label: 'Telefone 1',         valor: formatarTelefone(d.ddd_telefone_1),                              icon: 'fa-phone'         },
    { label: 'Telefone 2',         valor: formatarTelefone(d.ddd_telefone_2),                              icon: 'fa-phone'         },
    { label: 'E-mail',             valor: d.email,                                                         icon: 'fa-envelope'      },
    { label: 'Simples Nacional',   valor: d.opcao_pelo_simples ? `Sim${d.data_opcao_pelo_simples ? ` (desde ${formatarData(d.data_opcao_pelo_simples)})` : ''}` : 'Não', icon: 'fa-leaf' },
    { label: 'MEI',                valor: d.opcao_pelo_mei ? 'Sim' : 'Não',                                icon: 'fa-user-tie'      },
  ].filter(c => c.valor && c.valor !== 'Não definido')
})

const camposEndereco = computed(() => {
  const d = dadosCnpj.value; if (!d) return []
  return [
    { label: 'CEP',          valor: d.cep ? d.cep.replace(/(\d{5})(\d{3})/, '$1-$2') : '' },
    { label: 'Bairro',       valor: d.bairro },
    { label: 'Município',    valor: d.municipio },
    { label: 'Estado (UF)', valor: d.uf },
  ].filter(c => c.valor)
})

const enderecoFormatado = computed(() => {
  const d = dadosCnpj.value; if (!d) return ''
  const partes = [
    d.logradouro ? `${d.logradouro}${d.numero ? ', ' + d.numero : ''}` : '',
    d.complemento,
    d.bairro,
    `${d.municipio}/${d.uf}`,
    d.cep ? `CEP: ${d.cep.replace(/(\d{5})(\d{3})/, '$1-$2')}` : '',
  ].filter(Boolean)
  return partes.join(' — ')
})

const linkGoogleMaps = computed(() => {
  const d = dadosCnpj.value; if (!d || !d.municipio) return ''
  const q = encodeURIComponent(enderecoFormatado.value || `${d.municipio}, ${d.uf}`)
  return `https://www.google.com/maps/search/${q}`
})

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatarData(s?: string): string {
  if (!s) return ''
  // Format: YYYY-MM-DD ou YYYY-MM-DDTHH:MM:SS
  try {
    const d = new Date(s)
    if (isNaN(d.getTime())) return s
    return d.toLocaleDateString('pt-BR')
  } catch { return s }
}

function formatarMoeda(v: number): string {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatarTelefone(raw?: string): string {
  if (!raw) return ''
  const n = raw.replace(/\D/g, '')
  if (n.length === 10) return `(${n.slice(0,2)}) ${n.slice(2,6)}-${n.slice(6)}`
  if (n.length === 11) return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`
  return raw
}

function mascararDocumento(doc?: string): string {
  if (!doc) return ''
  const n = doc.replace(/\D/g, '')
  if (n.length === 11) return `***.${n.slice(3,6)}.${n.slice(6,9)}-**` // CPF
  if (n.length === 14) return `${n.slice(0,2)}.${n.slice(2,5)}.${n.slice(5,8)}/****-**` // CNPJ
  return doc
}

function tipoSocioClass(tipo?: number): string {
  if (tipo === 1) return 'bg-purple-500' // PJ
  if (tipo === 3) return 'bg-orange-500' // Estrangeiro
  return 'bg-indigo-500' // PF (default)
}

function tipoSocioLabel(tipo?: number): string {
  if (tipo === 1) return 'Pessoa Jurídica'
  if (tipo === 3) return 'Estrangeiro'
  return 'Pessoa Física'
}

// ─── Validação matemática ──────────────────────────────────────────────────────
function calcularDigito(cnpj: string, pesos: number[]): number {
  let soma = 0
  for (let i = 0; i < pesos.length; i++) soma += parseInt(cnpj[i]) * pesos[i]
  const r = soma % 11; return r < 2 ? 0 : 11 - r
}

function validarCNPJMath(n: string): boolean {
  if (n.length !== 14 || /^(\d)\1{13}$/.test(n)) return false
  const p1 = [5,4,3,2,9,8,7,6,5,4,3,2]
  const p2 = [6,5,4,3,2,9,8,7,6,5,4,3,2]
  return calcularDigito(n,p1) === parseInt(n[12]) && calcularDigito(n,p2) === parseInt(n[13])
}

// ─── Ações ────────────────────────────────────────────────────────────────────
function onInput() { erro.value = ''; validado.value = false; dadosCnpj.value = null }

function validarApenas() {
  const n = cnpjSoNums.value
  if (!n)           { erro.value = 'Digite um CNPJ.'; return }
  if (n.length !== 14) { erro.value = `CNPJ incompleto (${n.length}/14 dígitos).`; return }
  erro.value = ''
  validado.value = true
  dadosCnpj.value = null
  if (validarCNPJMath(n)) {
    valido.value = true
    const ord = parseInt(n.slice(8,12))
    estabelecimento.value = ord === 1 ? 'Matriz' : `Filial ${ord}`
    mensagemValidacao.value = 'CNPJ estruturalmente válido (verificação matemática).'
  } else {
    valido.value = false
    mensagemValidacao.value = 'CNPJ inválido — dígitos verificadores incorretos.'
  }
}

async function consultarCNPJ() {
  if (isBot.value) return // Honeypot: bot detectado
  const n = cnpjSoNums.value
  if (!n)           { erro.value = 'Digite um CNPJ.'; return }
  if (n.length !== 14) { erro.value = `CNPJ incompleto (${n.length}/14 dígitos).`; return }

  if (!validarCNPJMath(n)) {
    erro.value = 'CNPJ inválido matematicamente.'
    return
  }

  await guard.run(async () => {
  erro.value = ''
  consultando.value = true
  validado.value = false
  dadosCnpj.value = null
  tabAtiva.value = 'geral'

  try {
    const r = await proxy.secureFetch(proxy.cnpjUrl(n), {
      signal: AbortSignal.timeout(15000)
    })

    if (r.status === 404) {
      Swal.fire({
        icon: 'warning', confirmButtonColor: '#4f46e5',
        title: 'CNPJ não encontrado',
        text: 'Este CNPJ é matematicamente válido, mas não foi encontrado na base da Receita Federal. Pode ser um CNPJ inativo, cancelado ou de teste.',
      })
      validado.value = true; valido.value = true
      const ord = parseInt(n.slice(8,12))
      estabelecimento.value = ord === 1 ? 'Matriz' : `Filial ${ord}`
      mensagemValidacao.value = 'CNPJ válido matematicamente, mas não encontrado na Receita Federal.'
      return
    }

    if (!r.ok) throw new Error(`Erro ${r.status}`)

    const data: DadosCNPJ = await r.json()
    dadosCnpj.value = data

  } catch (e: any) {
    if (e.name === 'TimeoutError' || e.name === 'AbortError') {
      Swal.fire({ icon: 'warning', title: 'Timeout', text: 'A consulta demorou muito. Verifique sua conexão e tente novamente.', confirmButtonColor: '#4f46e5' })
    } else {
      Swal.fire({ icon: 'error', title: 'Erro na consulta', text: 'Não foi possível consultar a Receita Federal. Tente novamente em instantes.', confirmButtonColor: '#4f46e5' })
    }
    // Fallback: show just validation result
    validado.value = true; valido.value = true
    const ord = parseInt(n.slice(8,12))
    estabelecimento.value = ord === 1 ? 'Matriz' : `Filial ${ord}`
    mensagemValidacao.value = 'CNPJ válido. Consulta online indisponível no momento.'
  } finally {
    consultando.value = false
  }
  }) // guard.run
}

const debouncedConsultarCNPJ = debounce(consultarCNPJ, 400)

function limpar() { cnpjRaw.value = ''; erro.value = ''; validado.value = false; valido.value = false; dadosCnpj.value = null }

async function copiarCampo(valor?: string) {
  if (!valor) return
  await navigator.clipboard.writeText(valor)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1000 })
}

async function copiarRaw(formatado: boolean) {
  await navigator.clipboard.writeText(formatado ? cnpjFormatado.value : cnpjSoNums.value)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1200 })
}

async function copiarTudo() {
  const d = dadosCnpj.value; if (!d) return
  const socios = d.qsa?.map(s => `  • ${s.nome_socio} — ${s.qualificacao_socio?.descricao || 'Sócio'}`).join('\n') || '  Sem informações'
  const txt = [
    `CNPJ: ${cnpjFormatado.value}`,
    `Razão Social: ${d.razao_social}`,
    d.nome_fantasia ? `Nome Fantasia: ${d.nome_fantasia}` : '',
    `Situação: ${d.descricao_situacao_cadastral}`,
    `Tipo: ${d.descricao_matriz_filial}`,
    `Natureza Jurídica: ${d.descricao_natureza_juridica}`,
    `Porte: ${d.descricao_porte || d.porte}`,
    d.capital_social ? `Capital Social: ${formatarMoeda(d.capital_social)}` : '',
    `Abertura: ${formatarData(d.data_inicio_atividade)}`,
    `CNAE: ${d.cnae_fiscal} — ${d.cnae_fiscal_descricao}`,
    `Endereço: ${enderecoFormatado.value}`,
    d.ddd_telefone_1 ? `Telefone: ${formatarTelefone(d.ddd_telefone_1)}` : '',
    d.email ? `E-mail: ${d.email}` : '',
    `\nQSA — Quadro de Sócios:`,
    socios,
  ].filter(Boolean).join('\n')
  await navigator.clipboard.writeText(txt)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Dados copiados!', showConfirmButton: false, timer: 1500 })
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
