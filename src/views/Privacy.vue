<template>
  <div class="privacy-page">
    <!-- Hero Section — Dark Navy -->
    <section class="page-hero relative overflow-hidden py-14 md:py-20">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Política de Privacidade Global' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:shield-lock-outline" class="w-4 h-4 text-emerald-400" />
            <span>CONFORMIDADE GLOBAL DE PRIVACIDADE • LGPD • GDPR • CCPA • POPIA</span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Política de Privacidade & Proteção de Dados
          </h1>
          <p class="text-sm sm:text-base text-blue-200 max-w-3xl leading-relaxed">
            Transparência absoluta, soberania sobre seus dados e conformidade estrita com as leis de privacidade do Brasil, União Europeia, Estados Unidos e África do Sul.
          </p>

          <div class="flex flex-wrap gap-3 mt-6">
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-emerald-400" /> LGPD (Brasil)
            </span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-blue-400" /> GDPR (Europa & UK)
            </span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-purple-400" /> CCPA / CPRA (EUA)
            </span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-amber-400" /> POPIA (África do Sul)
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="section-padding bg-slate-50/50">
      <div class="container">
        <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm space-y-10 text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
          
          <!-- Card de Ação Rápida de Preferências -->
          <div class="p-5 bg-slate-900 rounded-xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 class="font-bold text-sm text-white flex items-center gap-2">
                <Icon icon="mdi:tune" class="w-4 h-4 text-primary-400" />
                Gerenciar Meu Consentimento de Cookies
              </h3>
              <p class="text-xs text-slate-300 mt-1">
                Altere ou revogue suas permissões para cookies analíticos e de marketing a qualquer momento.
              </p>
            </div>
            <button
              @click="openPreferences"
              class="btn-primary !bg-primary-600 hover:!bg-primary-700 text-xs font-bold !py-2.5 !px-5 whitespace-nowrap shrink-0"
            >
              Configurar Preferências
            </button>
          </div>

          <!-- 1. Introdução e Controlador -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:domain" class="w-5 h-5 text-primary-600" />
              1. Identificação do Controlador & Compromisso Global
            </h2>
            <p class="mb-3">
              A <strong>3W Online Soluções Digitais</strong> (Grupo 3W Online), sediada em Curitiba/PR, Brasil, atua como <strong>Controladora de Dados Pessoais</strong> e adota como princípio fundamental a privacidade por padrão (<em>Privacy by Default</em>) e a privacidade desde a concepção (<em>Privacy by Design</em>).
            </p>
            <p>
              Esta política estabelece os termos de coleta, tratamento, segurança e compartilhamento de informações para usuários, clientes e visitantes de qualquer localidade geográfica, alinhando-se aos mais rigorosos padrões globais de privacidade.
            </p>
          </div>

          <!-- 2. Matriz de Leis e Normas Aplicáveis -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:gavel" class="w-5 h-5 text-primary-600" />
              2. Marcos Regulatórios e Leis Atendidas
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="p-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                <div class="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                  <Icon icon="mdi:flag-variant" class="w-4 h-4 text-emerald-600" /> LGPD (Brasil — Lei 13.709/2018)
                </div>
                <p class="text-xs text-gray-600 dark:text-slate-300">Garantia integral dos direitos previstos no art. 18: confirmação, acesso, correção, anonimização, portabilidade, eliminação e revogação do consentimento.</p>
              </div>

              <div class="p-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                <div class="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                  <Icon icon="mdi:flag-variant" class="w-4 h-4 text-blue-600" /> GDPR (União Europeia & UK)
                </div>
                <p class="text-xs text-gray-600 dark:text-slate-300">Conformidade com o Regulamento Geral de Proteção de Dados (Reg. UE 2016/679): bases legais lícitas, direito ao esquecimento e cláusulas contratuais padrão para transferências.</p>
              </div>

              <div class="p-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                <div class="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                  <Icon icon="mdi:flag-variant" class="w-4 h-4 text-purple-600" /> CCPA / CPRA (Califórnia / EUA)
                </div>
                <p class="text-xs text-gray-600 dark:text-slate-300">Direito de saber quais dados são coletados, direito de exclusão, correção e declaração expressa: <strong>a 3W Online NUNCA vende ou compartilha dados pessoais para terceiros com fins monetários</strong> (<em>Do Not Sell My Info</em>).</p>
              </div>

              <div class="p-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                <div class="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                  <Icon icon="mdi:flag-variant" class="w-4 h-4 text-amber-600" /> POPIA (África do Sul — Act 4 of 2013)
                </div>
                <p class="text-xs text-gray-600 dark:text-slate-300">Processamento lícito e proporcional de informações de pessoas físicas e jurídicas, respeitando o princípio de minimização e segurança da informação.</p>
              </div>
            </div>
          </div>

          <!-- 3. Garantia de Privacidade das Ferramentas Client-Side -->
          <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h2 class="text-base sm:text-lg font-bold text-emerald-950 mb-2 flex items-center gap-2">
              <Icon icon="mdi:shield-check" class="w-5 h-5 text-emerald-600" />
              3. Privacidade Total nas Mais de 280 Ferramentas Gratuitas (Client-Side)
            </h2>
            <p class="text-xs sm:text-sm text-emerald-900 leading-relaxed mb-3">
              Todas as ferramentas interativas oferecidas no portal (geradores de código, calculadoras de ROI, simuladores financeiros, geradores de QR Code, formatadores de dados, etc.) são processadas <strong>100% no navegador (Client-Side)</strong> do usuário.
            </p>
            <ul class="list-disc list-inside space-y-1 text-xs text-emerald-800">
              <li><strong>Zero Transmissão para Servidores:</strong> Nenhum texto, documento, CPF, número ou arquivo inserido nas ferramentas é enviado para a infraestrutura da 3W Online.</li>
              <li><strong>Zero Armazenamento em Banco de Dados:</strong> O processamento ocorre exclusivamente na memória RAM local do seu navegador e é destruído ao fechar a aba.</li>
            </ul>
          </div>

          <!-- 4. Dados Pessoais Coletados e Finalidade -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:database-outline" class="w-5 h-5 text-primary-600" />
              4. Dados Pessoais Coletados & Finalidades Específicas
            </h2>
            <p class="mb-3">Coletamos apenas as informações estritamente necessárias para prestação de serviços e comunicação comercial:</p>
            <ul class="list-disc list-inside space-y-2 pl-2 text-gray-600">
              <li><strong>Formulários de Contato e Simuladores de Preço:</strong> Nome completo, e-mail corporativo, telefone/WhatsApp, nome da empresa e escopo de projeto para elaboração de propostas comerciais (Base legal: Execução de Contrato / Procedimentos Preliminares).</li>
              <li><strong>Dados de Navegação Técnica:</strong> Endereço IP anonimizado, páginas visitadas, tempo de permanência e dispositivo através do Google Analytics 4 com anonimização de IP ativada (Base legal: Legítimo Interesse / Consentimento).</li>
              <li><strong>Parâmetros de Atribuição (SEM / UTM):</strong> Rastreamento de origem de campanhas para entender qual anúncio gerou o contato, sem identificação biométrica ou sensível.</li>
            </ul>
          </div>

          <!-- 5. Direitos dos Titulares e Procedimentos de Solicitação -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:account-key" class="w-5 h-5 text-primary-600" />
              5. Como Exercer Seus Direitos de Privacidade
            </h2>
            <p class="mb-3">
              Independentemente do seu país de residência, você pode exercer gratuitamente os seguintes direitos a qualquer momento:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-slate-50 rounded-xl border border-gray-200">
                <strong>Acesso e Confirmação:</strong> Saber quais dados pessoais mantemos sobre você.
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-gray-200">
                <strong>Retificação / Correção:</strong> Atualizar informações cadastrais incompletas ou incorretas.
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-gray-200">
                <strong>Eliminação / Esquecimento:</strong> Solicitar o apagamento total dos seus dados de contato dos nossos bancos de dados.
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-gray-200">
                <strong>Revogação e Opt-Out:</strong> Retirar consentimento previamente concedido para comunicações ou cookies.
              </div>
            </div>
            <p class="mt-4 text-xs text-gray-600">
              Para formalizar qualquer solicitação, envie uma mensagem para nosso Encarregado de Dados (DPO) através do e-mail: <a href="mailto:privacidade@3wonline.com.br" class="text-primary-600 font-bold underline">privacidade@3wonline.com.br</a>. Respondemos em até 5 dias úteis.
            </p>

            <!-- ─── Formulário de Requisição Formal de Dados (LGPD Art.18 / GDPR Art.15-22 / CCPA) ─── -->
            <div id="solicitar-direitos" class="mt-6 p-5 rounded-2xl border-2 border-primary-200 dark:border-primary-700 bg-primary-50/60 dark:bg-slate-800">
              <h3 class="font-bold text-sm text-primary-700 dark:text-primary-300 mb-4 flex items-center gap-2">
                <Icon icon="mdi:file-document-edit-outline" class="w-5 h-5" />
                Formulário de Requisição Formal — Exercício de Direitos de Privacidade
              </h3>
              <p class="text-xs text-gray-600 dark:text-slate-300 mb-4">
                Preencha o formulário abaixo para exercer qualquer um dos seus direitos. Sua solicitação será encaminhada ao DPO e respondida em <strong>até 5 dias úteis</strong>, conforme exigido pela LGPD (Art. 18), GDPR (Art. 15–22) e CCPA.
              </p>
              <form @submit.prevent="debouncedPrivacySubmit" novalidate autocomplete="off" class="space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="form-label text-xs" for="dsr-name">Nome Completo <span class="text-red-500">*</span></label>
                    <input id="dsr-name" v-model="dsrForm.name" type="text" autocomplete="name" class="form-input" placeholder="Seu nome completo" required />
                  </div>
                  <div>
                    <label class="form-label text-xs" for="dsr-email">E-mail <span class="text-red-500">*</span></label>
                    <input id="dsr-email" v-model="dsrForm.email" type="email" autocomplete="email" class="form-input" placeholder="seu@email.com" required />
                  </div>
                </div>

                <div>
                  <label class="form-label text-xs" for="dsr-country">País de Residência <span class="text-red-500">*</span></label>
                  <select id="dsr-country" v-model="dsrForm.country" autocomplete="country" class="form-select">
                    <option value="">Selecione...</option>
                    <option value="BR">🇧🇷 Brasil — LGPD</option>
                    <option value="EU">🇪🇺 União Europeia / UK — GDPR</option>
                    <option value="US">🇺🇸 Estados Unidos — CCPA/CPRA</option>
                    <option value="ZA">🇿🇦 África do Sul — POPIA</option>
                    <option value="OTHER">🌍 Outro País</option>
                  </select>
                </div>

                <div>
                  <label class="form-label text-xs">Tipo de Solicitação <span class="text-red-500">*</span></label>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label
                      v-for="opt in dsrOptions"
                      :key="opt.value"
                      class="flex items-start gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-all"
                      :class="dsrForm.type === opt.value ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 text-primary-900 dark:text-primary-200 font-semibold' : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-primary-300'"
                    >
                      <input type="radio" :value="opt.value" v-model="dsrForm.type" class="mt-0.5 text-primary-600" />
                      <span>{{ opt.label }}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="form-label text-xs" for="dsr-details">Detalhes da Solicitação (Opcional)</label>
                  <textarea id="dsr-details" v-model="dsrForm.details" rows="2" autocomplete="off" class="form-textarea" placeholder="Descreva brevemente sua solicitação ou forneça informações adicionais..."></textarea>
                </div>

                <div class="flex items-start gap-2">
                  <input id="dsr-confirm" v-model="dsrForm.confirm" type="checkbox" class="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300" required />
                  <label for="dsr-confirm" class="text-[11px] text-gray-600 dark:text-slate-300 cursor-pointer">
                    Confirmo que sou o titular dos dados referenciados e estou exercendo meu direito em conformidade com a legislação de privacidade aplicável ao meu país de residência.
                  </label>
                </div>

                <!-- Honeypot — invisível ao usuário, se preenchido = bot -->
                <input type="text" v-model="hpPrivacy" name="hp_dsr" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;" autocomplete="off" />
                <input type="hidden" name="_csrf" :value="csrfToken" />

                <!-- Cloudflare Turnstile -->
                <AppTurnstile
                  ref="turnstilePrivacyRef"
                  action="privacy_request"
                  @success="turnstilePrivacyToken = $event"
                  @expired="turnstilePrivacyToken = ''"
                  @error="turnstilePrivacyToken = ''"
                />

                <button
                  type="submit"
                  :disabled="!dsrForm.name || !dsrForm.email || !dsrForm.type || !dsrForm.confirm || isSubmittingPrivacy"
                  class="btn-primary text-xs !py-2.5 w-full sm:w-auto"
                >
                  <Icon v-if="isSubmittingPrivacy" icon="mdi:loading" class="w-4 h-4 mr-2 animate-spin" />
                  <Icon v-else icon="mdi:send-outline" class="w-4 h-4 mr-2" />
                  Enviar Solicitação ao DPO
                </button>
              </form>
            </div>
          </div>

          <!-- 6. Segurança e Transferência Internacional -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:lock-check" class="w-5 h-5 text-primary-600" />
              6. Segurança da Informação & Transferência Internacional
            </h2>
            <p class="mb-2">
              Adotamos criptografia de ponta a ponta (SSL/TLS 256 bits), servidores seguros com firewall ativo e políticas restritas de controle de acesso aos bancos de dados de propostas.
            </p>
            <p>
              Quando serviços de infraestrutura em nuvem envolvem servidores localizados fora do Brasil (como provedores de CDN e e-mail com data centers nos EUA ou Europa), asseguramos que as operadoras cumpram com Cláusulas Contratuais Padrão (SCCs) e níveis adequados de segurança exigidos pela LGPD e GDPR.
            </p>
          </div>

          <!-- 7. Contato do DPO / Encarregado de Dados -->
          <div class="p-6 rounded-2xl bg-slate-900 text-white">
            <h2 class="text-base sm:text-lg font-bold mb-2 flex items-center gap-2">
              <Icon icon="mdi:shield-account" class="w-5 h-5 text-emerald-400" />
              7. Encarregado pelo Tratamento de Dados Pessoais (DPO)
            </h2>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              O Encarregado de Proteção de Dados da 3W Online é o responsável por intermediar a comunicação entre os titulares de dados, a empresa e as autoridades de proteção de dados (como a ANPD no Brasil e autoridades supervisoras da UE).
            </p>
            <div class="space-y-1.5 text-xs text-slate-200">
              <p><strong>Canal Oficial de Privacidade:</strong> <a href="mailto:privacidade@3wonline.com.br" class="text-emerald-400 underline font-semibold">privacidade@3wonline.com.br</a></p>
              <p><strong>E-mail Institucional:</strong> <a href="mailto:contato@3wonline.com.br" class="text-blue-300 underline font-semibold">contato@3wonline.com.br</a></p>
              <p><strong>Localização:</strong> Curitiba, Paraná — Brasil (Atendimento Nacional e Internacional)</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import AppTurnstile from '@/components/ui/AppTurnstile.vue'
import { usePrivacyConsent } from '@/composables/usePrivacyConsent'
import { useSeo } from '@/composables/useSeo'
import { useHoneypot } from '@/composables/useHoneypot'
import { useCSRFToken } from '@/composables/useCSRFToken'
import { useFormSecurity } from '@/composables/useFormSecurity'
import { useRecaptcha } from '@/composables/useRecaptcha'
import { debounce } from '@/composables/useDebounce'

const { openPreferences } = usePrivacyConsent()
const { applySeo, injectJsonLd, faqSchema } = useSeo()

// ─── Segurança ────────────────────────────────────────────────────────────────
const { hpField: hpPrivacy, isBot: isBotPrivacy } = useHoneypot()
const { getToken: getCsrfToken } = useCSRFToken()
const { sanitizeFormData, detectInjectionAttempt, useSubmitGuard } = useFormSecurity()
const { execute: recaptchaExecute } = useRecaptcha()

const csrfToken = getCsrfToken()
const { isSubmitting: isSubmittingPrivacy, wasSubmittedRecently, markAsSubmitted } =
  useSubmitGuard('privacy-dsr')
const turnstilePrivacyToken = ref('')
const turnstilePrivacyRef = ref<InstanceType<typeof AppTurnstile> | null>(null)

// FAQs de Privacidade — para FAQ Schema (AEO/SEO)
const privacyFaqs = [
  {
    question: 'A 3W Online vende meus dados pessoais?',
    answer: 'Não. A 3W Online NUNCA vende, aluga ou compartilha dados pessoais com terceiros para fins comerciais. Estamos em conformidade com LGPD, GDPR, CCPA (Do Not Sell) e POPIA.',
  },
  {
    question: 'Como posso solicitar a exclusão dos meus dados?',
    answer: 'Você pode solicitar a exclusão pelo formulário nesta página ou enviando e-mail para privacidade@3wonline.com.br. Respondemos em até 5 dias úteis conforme exigido pela LGPD (Art. 18) e GDPR (Art. 17).',
  },
  {
    question: 'Os dados inseridos nas ferramentas digitais ficam armazenados?',
    answer: 'Não. Todas as 280+ ferramentas são 100% client-side. Os dados processados (textos, CPFs, CNPJs, etc.) ficam apenas na memória do seu navegador e são destruídos ao fechar a aba. Zero transmissão para servidores.',
  },
  {
    question: 'A 3W Online está em conformidade com o GDPR europeu?',
    answer: 'Sim. Implementamos bases legais lícitas para tratamento de dados, Cláusulas Contratuais Padrão (SCCs) para transferências internacionais e respeitamos todos os direitos dos titulares previstos nos Artigos 15 a 22 do GDPR.',
  },
  {
    question: 'Posso retirar meu consentimento de cookies a qualquer momento?',
    answer: 'Sim. Você pode alterar ou retirar seu consentimento de cookies a qualquer momento clicando em "Preferências de Privacidade" no rodapé do site ou acessando nossa Central de Privacidade.',
  },
]

applySeo({
  title: 'Política de Privacidade Global | LGPD, GDPR, CCPA, POPIA | 3W Online',
  description:
    'Conheça nossa Política de Privacidade Global em total conformidade com a LGPD (Brasil), GDPR (Europa), CCPA (EUA) e POPIA (África do Sul). Transparência e segurança total.',
  path: '/privacidade',
  keywords: 'política de privacidade 3w online, lgpd 3w online, gdpr curitiba, ccpa compliance, privacidade de dados',
  faqs: privacyFaqs,
})

// ─── Formulário DSR (Data Subject Request) ────────────────────────────────────
const dsrForm = reactive({
  name: '',
  email: '',
  country: '',
  type: '',
  details: '',
  confirm: false,
})

const dsrOptions = [
  { value: 'access',      label: '📋 Acesso e Confirmação — Saber quais dados temos sobre você' },
  { value: 'correction',  label: '✏️ Retificação — Corrigir dados incorretos ou incompletos' },
  { value: 'deletion',    label: '🗑️ Eliminação / Esquecimento — Apagar meus dados' },
  { value: 'portability', label: '📤 Portabilidade — Receber meus dados em formato legível' },
  { value: 'objection',   label: '🚫 Oposição / Opt-Out — Revogar consentimento ou comunicações' },
  { value: 'info',        label: '❓ Informação — Saber com quem meus dados foram compartilhados' },
]

function submitPrivacyRequest(): void {
  if (!dsrForm.name || !dsrForm.email || !dsrForm.type || !dsrForm.confirm) return
  if (isBotPrivacy.value) return  // Bloqueia bot (honeypot)
  if (wasSubmittedRecently()) {
    Swal.fire({
      icon: 'info',
      title: 'Solicitação já enviada',
      text: 'Sua solicitação de privacidade já foi registrada. Aguarde nossa resposta em até 5 dias úteis.',
      confirmButtonColor: '#2563eb',
    })
    return
  }

  // Detecção de injeção
  const suspicious = detectInjectionAttempt({ name: dsrForm.name, email: dsrForm.email, details: dsrForm.details })
  if (suspicious.length > 0) return

  if (isSubmittingPrivacy.value) return
  isSubmittingPrivacy.value = true

  // Sanitiza com DOMPurify
  const safeForm = sanitizeFormData({
    name: dsrForm.name,
    email: dsrForm.email,
    details: dsrForm.details,
  })

  // Executa reCAPTCHA v3 em background
  recaptchaExecute('privacy_request').then((_token) => {
    const typeLabel = dsrOptions.find((o) => o.value === dsrForm.type)?.label ?? dsrForm.type
    const countryLabel: Record<string, string> = {
      BR: 'Brasil (LGPD)', EU: 'UE/UK (GDPR)', US: 'EUA (CCPA)', ZA: 'África do Sul (POPIA)', OTHER: 'Outro País',
    }

    const msg = encodeURIComponent(
      `Olá! Gostaria de exercer meus direitos de privacidade.\n\n` +
      `👤 Nome: ${safeForm.name}\n` +
      `📧 E-mail: ${safeForm.email}\n` +
      `🌍 País / Lei: ${countryLabel[dsrForm.country] ?? dsrForm.country}\n` +
      `📋 Tipo de Solicitação: ${typeLabel}\n` +
      `💬 Detalhes: ${safeForm.details || 'Nenhum detalhe adicional'}\n\n` +
      `Aguardo resposta em até 5 dias úteis conforme previsto na legislação de privacidade aplicável.`,
    )

    window.open(`https://wa.me/5541996924829?text=${msg}`, '_blank')
    markAsSubmitted()

    // Reset
    Object.assign(dsrForm, { name: '', email: '', country: '', type: '', details: '', confirm: false })
    turnstilePrivacyToken.value = ''
    turnstilePrivacyRef.value?.reset()
    isSubmittingPrivacy.value = false
  }).catch(() => { isSubmittingPrivacy.value = false })
}

// Debounce para evitar duplo envio
const debouncedPrivacySubmit = debounce(submitPrivacyRequest, 400)
</script>