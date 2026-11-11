<template>
  <ToolShell
    title="Gerador de Links UTM"
    description="Crie links rastreados com parâmetros UTM para campanhas de marketing digital no Google Analytics e GA4."
    icon="fa-link"
    icon-gradient="from-orange-500 to-amber-700"
    orb-color="orange"
    :quick-tips="['5 parâmetros UTM', 'Présets de campanha', 'Validação automática']"
    :tips="[
      { text: 'UTM = Urchin Tracking Module. Permite rastrear qual campanha gerou cada visita.' },
      { text: 'utm_source: google, facebook | utm_medium: cpc, email, social | utm_campaign: nome da campanha.', type: 'info' },
      { text: 'Use letras minúsculas e hifens em todos os parâmetros UTM para consistência nos relatórios.', type: 'warning' },
    ]"
  >
    <div class="tool-body">
      <div class="space-y-3">
        <BaseInput
          v-model="url"
          label="URL de destino *"
          icon="fa-globe"
          placeholder="https://www.seusite.com.br/pagina"
          tooltip="A URL base sem parâmetros. Deve começar com http:// ou https://"
          :error="erroUrl"
          @input="erroUrl = ''"
        />

        <!-- Présets -->
        <div>
          <label class="input-aurora-label text-xs mb-2">Pré-sets de campanha</label>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="p in presets"
              :key="p.label"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
              @click="aplicarPreset(p)"
            >
              <i :class="['fas', p.icon, 'mr-1 text-orange-500']"></i>
              {{ p.label }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BaseInput v-model="source"   label="utm_source *"   icon="fa-at"           placeholder="google"        tooltip="Origem do tráfego: google, facebook, newsletter, instagram, etc." />
          <BaseInput v-model="medium"   label="utm_medium *"   icon="fa-road"         placeholder="cpc"           tooltip="Canal de marketing: cpc, email, social, organic, referral, etc." />
          <BaseInput v-model="campaign" label="utm_campaign *"  icon="fa-bullhorn"     placeholder="nome-campanha" tooltip="Nome único da campanha para identificação nos relatórios." />
          <BaseInput v-model="term"     label="utm_term"       icon="fa-search"       placeholder="palavra-chave" hint="Para campanhas de busca paga (Google Ads)." />
          <BaseInput v-model="content"  label="utm_content"    icon="fa-layers"       placeholder="cta-header"    hint="Para A/B test de criativos ou variações de anúncio." class="sm:col-span-2" />
        </div>
      </div>

      <div class="flex gap-3 mt-4">
        <BaseButton variant="primary" icon="fa-link" @click="gerar" class="flex-1">
          Gerar Link UTM
        </BaseButton>
        <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in">
      <div v-if="linkGerado" class="mt-4 space-y-4">
        <div class="glass-panel p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
              <i class="fas fa-link text-orange-500"></i>
              Link com UTM
            </h4>
            <div class="flex gap-2">
              <button @click="copiarLink" class="copy-btn">
                <i :class="['fas', copiado ? 'fa-check text-emerald-500' : 'fa-copy']"></i>
                {{ copiado ? 'Copiado!' : 'Copiar' }}
              </button>
              <a :href="linkGerado" target="_blank" rel="noopener noreferrer" class="copy-btn">
                <i class="fas fa-external-link-alt text-xs"></i>
                Testar
              </a>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3">
            <code class="text-xs text-blue-600 dark:text-blue-300 break-all font-mono leading-relaxed">{{ linkGerado }}</code>
          </div>
        </div>

        <!-- Parâmetros detalhados -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-list-check text-primary-500"></i>
            Parâmetros UTM
          </h4>
          <div class="space-y-2 text-xs">
            <div v-for="p in parametrosVisiveis" :key="p.chave"
              class="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
              <div>
                <code class="font-mono font-bold text-orange-600 dark:text-orange-400">{{ p.chave }}</code>
                <span class="text-gray-400 dark:text-slate-500 ml-2">{{ p.desc }}</span>
              </div>
              <code class="font-mono font-semibold text-gray-700 dark:text-slate-200">{{ p.valor }}</code>
            </div>
          </div>
        </div>

        <div class="tip-card-success">
          <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
          <span>Link gerado com {{ parametrosVisiveis.length }} parâmetros UTM. Configure uma View de Campanha no GA4 para visualizar os resultados.</span>
        </div>
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

// ─── Estado ───────────────────────────────────────────────────────────────────
const url      = ref('https://www.seusite.com.br')
const source   = ref('')
const medium   = ref('')
const campaign = ref('')
const term     = ref('')
const content  = ref('')
const erroUrl  = ref('')
const linkGerado = ref('')
const copiado    = ref(false)

// ─── Pré-sets ─────────────────────────────────────────────────────────────────
const presets = [
  { label: 'Google Ads',    icon: 'fa-google',     source: 'google',       medium: 'cpc',         campaign: 'google-ads-search'  },
  { label: 'Meta Ads',      icon: 'fa-facebook',   source: 'facebook',     medium: 'cpc',         campaign: 'meta-ads-feed'      },
  { label: 'Instagram',     icon: 'fa-instagram',  source: 'instagram',    medium: 'social',      campaign: 'instagram-stories'  },
  { label: 'E-mail',        icon: 'fa-envelope',   source: 'newsletter',   medium: 'email',       campaign: 'email-mensal'       },
  { label: 'WhatsApp',      icon: 'fa-whatsapp',   source: 'whatsapp',     medium: 'social',      campaign: 'whatsapp-broadcast' },
  { label: 'LinkedIn',      icon: 'fa-linkedin',   source: 'linkedin',     medium: 'social',      campaign: 'linkedin-posts'     },
  { label: 'TikTok',        icon: 'fa-tiktok',     source: 'tiktok',       medium: 'cpc',         campaign: 'tiktok-ads'         },
  { label: 'YouTube',       icon: 'fa-youtube',    source: 'youtube',      medium: 'video',       campaign: 'youtube-ads'        },
]

function aplicarPreset(p: typeof presets[0]) {
  source.value   = p.source
  medium.value   = p.medium
  campaign.value = p.campaign
}

// ─── Geração ──────────────────────────────────────────────────────────────────
function gerar() {
  if (!url.value.trim() || !url.value.startsWith('http')) {
    erroUrl.value = 'Informe uma URL válida começando com http:// ou https://'
    return
  }
  if (!source.value.trim() || !medium.value.trim() || !campaign.value.trim()) {
    Swal.fire({ icon: 'warning', title: 'Campos obrigatórios', text: 'Preencha utm_source, utm_medium e utm_campaign.', confirmButtonColor: '#ea580c' })
    return
  }

  const params = new URLSearchParams()
  if (source.value.trim())   params.set('utm_source',   sanitize(source.value))
  if (medium.value.trim())   params.set('utm_medium',   sanitize(medium.value))
  if (campaign.value.trim()) params.set('utm_campaign', sanitize(campaign.value))
  if (term.value.trim())     params.set('utm_term',     sanitize(term.value))
  if (content.value.trim())  params.set('utm_content',  sanitize(content.value))

  const base = url.value.includes('?') ? url.value + '&' : url.value + '?'
  linkGerado.value = base + params.toString()
}

function sanitize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-_]/g, '')
}

const parametrosVisiveis = computed(() => {
  const list = []
  if (source.value.trim())   list.push({ chave: 'utm_source',   valor: sanitize(source.value),   desc: 'Origem' })
  if (medium.value.trim())   list.push({ chave: 'utm_medium',   valor: sanitize(medium.value),   desc: 'Canal' })
  if (campaign.value.trim()) list.push({ chave: 'utm_campaign', valor: sanitize(campaign.value), desc: 'Campanha' })
  if (term.value.trim())     list.push({ chave: 'utm_term',     valor: sanitize(term.value),     desc: 'Palavra-chave' })
  if (content.value.trim())  list.push({ chave: 'utm_content',  valor: sanitize(content.value),  desc: 'Criativo/variação' })
  return list
})

async function copiarLink() {
  await navigator.clipboard.writeText(linkGerado.value)
  copiado.value = true
  setTimeout(() => (copiado.value = false), 2000)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Link copiado!', showConfirmButton: false, timer: 1800 })
}

function limpar() {
  url.value = 'https://www.seusite.com.br'
  source.value = medium.value = campaign.value = term.value = content.value = ''
  linkGerado.value = ''
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
