<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { useSeo } from '@/composables/useSeo'
import { COMPANY } from '@/data/tools'

useSeo({
  title: 'Política de Privacidade | DevStart Academy',
  description:
    'Como tratamos seus dados em conformidade com LGPD, GDPR, CCPA e POPIA. Transparência total sobre cookies e armazenamento local.',
  path: '/privacidade',
})

const updated = '24 de setembro de 2026'

/** Lista as chaves de armazenamento local usadas pela aplicação. */
const DATA_KEYS = [
  'devstart_theme',
  'devstart_privacy_consent',
  'devstart_consent_date',
  'devstart_provider',
  'devstart_apikeys',
  'devstart_completed_challenges',
  'devstart_flowchart',
  'devstart_logic_nodes',
  'devstart_logic_wires',
  'devstart_blocks',
]

function exportData() {
  const data: Record<string, unknown> = {}
  for (const key of DATA_KEYS) {
    const value = localStorage.getItem(key)
    if (value !== null) {
      try {
        data[key] = JSON.parse(value)
      } catch {
        data[key] = value
      }
    }
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'devstart-meus-dados.json'
  a.click()
  URL.revokeObjectURL(url)
}

function clearData() {
  Swal.fire({
    title: 'Apagar todos os dados locais?',
    text: 'Isso remove tema, progresso, chaves de IA e projetos salvos deste navegador. A ação é irreversível.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Sim, apagar tudo',
    cancelButtonText: 'Cancelar',
  }).then((r) => {
    if (r.isConfirmed) {
      for (const key of DATA_KEYS) localStorage.removeItem(key)
      Swal.fire({
        icon: 'success',
        title: 'Dados apagados',
        text: 'Seus dados locais foram removidos deste navegador.',
        timer: 2200,
        showConfirmButton: false,
      })
    }
  })
}
</script>

<template>
  <article class="container-page max-w-3xl py-12">
    <h1 class="section-title">
      Política de Privacidade
    </h1>
    <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
      Última atualização: {{ updated }}
    </p>

    <div class="prose prose-slate mt-8 max-w-none space-y-6 dark:prose-invert">
      <section>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">
          1. Quem somos
        </h2>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          O DevStart Academy é uma plataforma educacional mantida pelo {{ COMPANY.name }},
          especialista em {{ COMPANY.slogan.toLowerCase() }}. Contato:
          <a
            :href="`mailto:${COMPANY.email}`"
            class="link-underline"
          >{{ COMPANY.email }}</a>.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">
          2. Dados que tratamos
        </h2>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          Não exigimos cadastro. Utilizamos <strong>armazenamento local (localStorage)</strong> do
          seu navegador para guardar preferências (tema, consentimento) e chaves de API do Tutor IA.
          Essas informações permanecem no seu dispositivo e não são enviadas aos nossos servidores.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">
          3. Cookies e análise
        </h2>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          Usamos Google Analytics 4 e Google Tag Manager para entender, de forma agregada e
          anônima, como a plataforma é utilizada. Você pode recusar o uso não essencial no banner de
          consentimento.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">
          4. Chaves de API do Tutor IA
        </h2>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          As chaves configuradas no Tutor IA são armazenadas apenas no seu navegador e enviadas
          diretamente para as APIs oficiais (Google, Groq, OpenRouter). Nunca trafegam pelos nossos
          servidores.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">
          5. Conformidade global (LGPD, GDPR, CCPA, POPIA)
        </h2>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          Respeitamos as principais leis de privacidade: a LGPD (Brasil), o GDPR (União Europeia), o
          CCPA (Califórnia) e a POPIA (África do Sul). Você tem direito de acessar, corrigir e
          eliminar seus dados. Como não mantemos dados pessoais em servidor, basta limpar o
          armazenamento local do navegador para remover tudo.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">
          6. Seus direitos
        </h2>
        <ul class="mt-2 list-disc space-y-1 pl-6 text-slate-600 dark:text-slate-400">
          <li>Revogar o consentimento a qualquer momento.</li>
          <li>Solicitar informações sobre o tratamento de dados.</li>
          <li>Exportar ou apagar seus dados locais aqui mesmo (portabilidade e eliminação).</li>
        </ul>

        <div
          class="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 not-prose dark:border-slate-700 dark:bg-slate-800"
        >
          <p class="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <Icon
              icon="lucide:database"
              class="h-4 w-4 text-brand-600"
            /> Gerenciar meus dados
          </p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              class="btn-secondary flex-1"
              @click="exportData"
            >
              <Icon
                icon="lucide:download"
                class="h-4 w-4"
              /> Exportar meus dados (JSON)
            </button>
            <button
              type="button"
              class="btn flex-1 border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
              @click="clearData"
            >
              <Icon
                icon="lucide:trash-2"
                class="h-4 w-4"
              /> Apagar meus dados locais
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">
          7. Contato
        </h2>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          Dúvidas sobre privacidade? Fale com o {{ COMPANY.name }} pelo WhatsApp
          <a
            :href="COMPANY.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="link-underline"
          >{{ COMPANY.whatsapp }}</a>
          ou pelo e-mail
          <a
            :href="`mailto:${COMPANY.email}`"
            class="link-underline"
          >{{ COMPANY.email }}</a>.
        </p>
      </section>
    </div>
  </article>
</template>
