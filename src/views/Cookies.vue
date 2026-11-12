<template>
  <div class="cookies-page">
    <!-- Hero Section — Dark Navy -->
    <section class="page-hero relative overflow-hidden py-14 md:py-20">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Política de Cookies' }]" />

        <div class="max-w-4xl mt-4">
          <div class="inline-flex items-center gap-2 bg-amber-500/20 text-amber-200 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:cookie-outline" class="w-4 h-4 text-amber-400" />
            <span>POLÍTICA DE COOKIES • LGPD • GDPR • CCPA • POPIA</span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Política de Cookies
          </h1>
          <p class="text-sm sm:text-base text-blue-200 max-w-3xl leading-relaxed">
            Saiba quais cookies utilizamos, por que os utilizamos e como você pode gerenciar suas preferências de privacidade na 3W Online.
          </p>

          <div class="flex flex-wrap gap-3 mt-6">
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-emerald-400" /> Cookies Essenciais
            </span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-blue-400" /> Cookies Analíticos
            </span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10 flex items-center gap-1.5">
              <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5 text-purple-400" /> Cookies de Marketing
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="section-padding bg-slate-50/50">
      <div class="container">
        <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm space-y-10 text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed">

          <!-- Ação Rápida de Preferências -->
          <div class="p-5 bg-slate-900 rounded-xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 class="font-bold text-sm text-white flex items-center gap-2">
                <Icon icon="mdi:tune" class="w-4 h-4 text-primary-400" />
                Gerenciar Minhas Preferências de Cookies
              </h3>
              <p class="text-xs text-slate-300 mt-1">
                Altere ou revogue seu consentimento para cookies analíticos e de marketing a qualquer momento.
              </p>
            </div>
            <button
              @click="openPreferences"
              class="btn-primary !bg-primary-600 hover:!bg-primary-700 text-xs font-bold !py-2.5 !px-5 whitespace-nowrap shrink-0"
            >
              Configurar Preferências
            </button>
          </div>

          <!-- 1. O que são cookies -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:cookie-outline" class="w-5 h-5 text-primary-600" />
              1. O que são Cookies?
            </h2>
            <p class="mb-3">
              Cookies são pequenos arquivos de texto armazenados no seu navegador quando você acessa um site. Eles permitem que o site reconheça seu dispositivo em visitas futuras, lembre suas preferências e ofereça uma experiência mais personalizada e eficiente.
            </p>
            <p>
              Cookies não são programas de computador e não podem executar código malicioso. Eles funcionam apenas como marcadores de identificação que viajam entre seu navegador e os servidores do site.
            </p>
          </div>

          <!-- 2. Tipos de Cookies -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:format-list-bulleted-type" class="w-5 h-5 text-primary-600" />
              2. Tipos de Cookies que Utilizamos
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <!-- Essenciais -->
              <div class="p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20">
                <div class="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                  <Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-600" />
                  Essenciais
                </div>
                <p class="text-xs text-gray-600 dark:text-slate-300 mb-3">
                  Necessários para o funcionamento básico do site. Não podem ser desativados. Incluem preferências de tema (claro/escuro), consentimento de cookies e tokens de segurança.
                </p>
                <span class="inline-flex items-center px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold rounded-full">
                  Sempre ativos
                </span>
              </div>

              <!-- Analíticos -->
              <div class="p-4 rounded-xl border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
                <div class="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                  <Icon icon="mdi:chart-bar" class="w-4 h-4 text-blue-600" />
                  Analíticos
                </div>
                <p class="text-xs text-gray-600 dark:text-slate-300 mb-3">
                  Nos ajudam a entender como os visitantes interagem com o site — páginas visitadas, tempo de permanência e origem do tráfego. Dados anonimizados via Google Analytics 4.
                </p>
                <span class="inline-flex items-center px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] font-semibold rounded-full">
                  Requer consentimento
                </span>
              </div>

              <!-- Marketing -->
              <div class="p-4 rounded-xl border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20">
                <div class="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                  <Icon icon="mdi:bullseye-arrow" class="w-4 h-4 text-purple-600" />
                  Marketing
                </div>
                <p class="text-xs text-gray-600 dark:text-slate-300 mb-3">
                  Utilizados para rastrear visitantes em sites e exibir anúncios relevantes. Podem ser definidos por parceiros como Google Ads e Meta Ads mediante seu consentimento.
                </p>
                <span class="inline-flex items-center px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-[10px] font-semibold rounded-full">
                  Requer consentimento
                </span>
              </div>
            </div>
          </div>

          <!-- 3. Lista de Cookies do Site -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:table-of-contents" class="w-5 h-5 text-primary-600" />
              3. Lista de Cookies Utilizados
            </h2>
            <div class="overflow-x-auto rounded-xl border border-gray-200">
              <table class="w-full text-xs">
                <thead class="bg-slate-100 text-gray-700 font-semibold">
                  <tr>
                    <th class="text-left px-4 py-3">Nome</th>
                    <th class="text-left px-4 py-3">Tipo</th>
                    <th class="text-left px-4 py-3">Duração</th>
                    <th class="text-left px-4 py-3">Finalidade</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr class="hover:bg-slate-50">
                    <td class="px-4 py-3 font-mono font-semibold text-gray-800">theme</td>
                    <td class="px-4 py-3"><span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-semibold">Essencial</span></td>
                    <td class="px-4 py-3 text-gray-500">Persistente</td>
                    <td class="px-4 py-3 text-gray-600">Armazena a preferência de tema claro/escuro do usuário.</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="px-4 py-3 font-mono font-semibold text-gray-800">3wonline_consent</td>
                    <td class="px-4 py-3"><span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-semibold">Essencial</span></td>
                    <td class="px-4 py-3 text-gray-500">365 dias</td>
                    <td class="px-4 py-3 text-gray-600">Registra as escolhas de consentimento de cookies do usuário (LGPD/GDPR).</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="px-4 py-3 font-mono font-semibold text-gray-800">_ga</td>
                    <td class="px-4 py-3"><span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-semibold">Analítico</span></td>
                    <td class="px-4 py-3 text-gray-500">2 anos</td>
                    <td class="px-4 py-3 text-gray-600">Google Analytics 4 — identifica sessões únicas de usuários de forma anonimizada.</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="px-4 py-3 font-mono font-semibold text-gray-800">_ga_*</td>
                    <td class="px-4 py-3"><span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-semibold">Analítico</span></td>
                    <td class="px-4 py-3 text-gray-500">2 anos</td>
                    <td class="px-4 py-3 text-gray-600">Google Analytics 4 — mantém o estado da sessão para a propriedade específica.</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="px-4 py-3 font-mono font-semibold text-gray-800">_gcl_au</td>
                    <td class="px-4 py-3"><span class="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-semibold">Marketing</span></td>
                    <td class="px-4 py-3 text-gray-500">90 dias</td>
                    <td class="px-4 py-3 text-gray-600">Google Ads — armazena e rastreia conversões de campanhas publicitárias.</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="px-4 py-3 font-mono font-semibold text-gray-800">_fbp</td>
                    <td class="px-4 py-3"><span class="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-semibold">Marketing</span></td>
                    <td class="px-4 py-3 text-gray-500">90 dias</td>
                    <td class="px-4 py-3 text-gray-600">Meta Pixel — identifica navegadores para rastreamento de anúncios no Facebook/Instagram.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 4. Como Desativar Cookies -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:cookie-off-outline" class="w-5 h-5 text-primary-600" />
              4. Como Desativar ou Gerenciar Cookies
            </h2>
            <p class="mb-3">
              Você tem o direito de aceitar, recusar ou revogar o consentimento para cookies não essenciais a qualquer momento. Existem três formas de fazer isso:
            </p>

            <div class="space-y-3">
              <div class="p-4 rounded-xl border border-gray-200 bg-slate-50 flex items-start gap-3">
                <Icon icon="mdi:tune-variant" class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold text-gray-800 text-xs sm:text-sm">Central de Preferências do Site</p>
                  <p class="text-xs text-gray-600 mt-1">Use o painel de preferências de privacidade no rodapé ou clique no botão "Configurar Preferências" acima para escolher quais categorias de cookies aceitar.</p>
                </div>
              </div>

              <div class="p-4 rounded-xl border border-gray-200 bg-slate-50 flex items-start gap-3">
                <Icon icon="mdi:web" class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold text-gray-800 text-xs sm:text-sm">Configurações do Navegador</p>
                  <p class="text-xs text-gray-600 mt-1">A maioria dos navegadores permite bloquear ou excluir cookies nas configurações. Acesse as configurações de privacidade do seu navegador (Chrome, Firefox, Safari, Edge) e ajuste as permissões de cookies.</p>
                </div>
              </div>

              <div class="p-4 rounded-xl border border-gray-200 bg-slate-50 flex items-start gap-3">
                <Icon icon="mdi:tools" class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold text-gray-800 text-xs sm:text-sm">Ferramentas de Opt-Out dos Parceiros</p>
                  <p class="text-xs text-gray-600 mt-1">
                    Para Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" class="text-primary-600 underline font-semibold">tools.google.com/dlpage/gaoptout</a>.
                    Para Meta/Facebook: <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" class="text-primary-600 underline font-semibold">Configurações de Anúncios do Facebook</a>.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
              <strong>Atenção:</strong> Desativar cookies essenciais pode afetar o funcionamento do site, como a manutenção de preferências de tema e o carregamento correto de alguns recursos.
            </div>
          </div>

          <!-- 5. Bases Legais -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:gavel" class="w-5 h-5 text-primary-600" />
              5. Bases Legais para o Uso de Cookies
            </h2>
            <p class="mb-3">
              O uso de cookies pelo site da 3W Online está fundamentado nas seguintes bases legais, em conformidade com a LGPD, GDPR, CCPA e POPIA:
            </p>
            <ul class="list-disc list-inside space-y-2 pl-2 text-gray-600">
              <li><strong>Cookies Essenciais:</strong> Legítimo interesse e necessidade para o funcionamento do serviço (Art. 7º, IX da LGPD; Art. 6(1)(b) do GDPR).</li>
              <li><strong>Cookies Analíticos:</strong> Consentimento livre e expresso do titular dos dados (Art. 7º, I da LGPD; Art. 6(1)(a) do GDPR).</li>
              <li><strong>Cookies de Marketing:</strong> Consentimento livre e expresso do titular dos dados (Art. 7º, I da LGPD; Art. 6(1)(a) do GDPR).</li>
            </ul>
          </div>

          <!-- 6. Atualizações desta Política -->
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="mdi:update" class="w-5 h-5 text-primary-600" />
              6. Atualizações desta Política
            </h2>
            <p>
              Esta política pode ser atualizada periodicamente para refletir mudanças em nossas práticas de cookies ou por exigências legais. A data da última revisão é exibida no topo da página. Recomendamos revisitar este documento regularmente.
            </p>
            <p class="mt-2 text-xs text-gray-500">Última atualização: julho de 2025.</p>
          </div>

          <!-- 7. Contato -->
          <div class="p-6 rounded-2xl bg-slate-900 text-white">
            <h2 class="text-base sm:text-lg font-bold mb-2 flex items-center gap-2">
              <Icon icon="mdi:email-outline" class="w-5 h-5 text-emerald-400" />
              7. Contato e Dúvidas sobre Cookies
            </h2>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed">
              Para dúvidas, solicitações de esclarecimento ou exercício de seus direitos relacionados ao uso de cookies e dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados (DPO).
            </p>
            <div class="space-y-1.5 text-xs text-slate-200">
              <p><strong>Canal de Privacidade:</strong> <a href="mailto:privacidade@3wonline.com.br" class="text-emerald-400 underline font-semibold">privacidade@3wonline.com.br</a></p>
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
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import { usePrivacyConsent } from '@/composables/usePrivacyConsent'
import { useSeo } from '@/composables/useSeo'

const { openPreferences } = usePrivacyConsent()

const { applySeo, injectJsonLd, faqSchema } = useSeo()

const cookieFaqs = [
  { question: 'Posso usar o site sem cookies?', answer: 'Sim, o site funciona com apenas os cookies essenciais ativados. Cookies analíticos e de marketing são opcionais e podem ser recusados.' },
  { question: 'Como desativo os cookies de marketing?', answer: 'Clique em "Preferências de Privacidade" no rodapé do site, desative a categoria "Cookies de Marketing" e salve suas preferências.' },
  { question: 'Os cookies coletam dados pessoais identificáveis?', answer: 'Não. Os cookies analíticos utilizam IP anonimizado e não identificam usuários individualmente. Os cookies essenciais não coletam dados pessoais.' },
  { question: 'Por quanto tempo os cookies ficam armazenados?', answer: 'Cookies de sessão são excluídos ao fechar o navegador. Cookies persistentes duram no máximo 13 meses, conforme exigido pelo GDPR.' },
]

applySeo({
  title: 'Política de Cookies | LGPD & GDPR | 3W Online',
  description:
    'Saiba quais cookies utilizamos e como gerenciar suas preferências de privacidade na 3W Online. Conformidade com LGPD, GDPR, CCPA e POPIA.',
  path: '/cookies',
  keywords: 'cookies, política de cookies, privacidade, lgpd, gdpr, 3w online',
  faqs: cookieFaqs,
})

injectJsonLd(faqSchema(cookieFaqs), 'schema-faq')
</script>
