<script setup lang="ts">
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import { COMPANY } from '@/lib/constants'

const lastUpdate = '24 de setembro de 2026'

const rights = [
  { icon: 'fa-eye', title: 'Acesso', desc: 'Confirmar a existência de tratamento de dados.' },
  { icon: 'fa-pen', title: 'Correção', desc: 'Corrigir dados incompletos ou desatualizados.' },
  { icon: 'fa-trash', title: 'Eliminação', desc: 'Solicitar a exclusão de dados pessoais.' },
  { icon: 'fa-file-export', title: 'Portabilidade', desc: 'Solicitar a transferência dos dados.' },
  { icon: 'fa-ban', title: 'Oposição', desc: 'Opor-se ao tratamento de dados.' },
  { icon: 'fa-circle-info', title: 'Informação', desc: 'Conhecer com quem compartilhamos dados.' },
]

const laws = [
  {
    icon: 'fa-flag',
    name: 'LGPD (Brasil)',
    desc: 'Lei 13.709/2018 — direito de acesso, correção, eliminação e portabilidade dos seus dados.',
  },
  {
    icon: 'fa-earth-europe',
    name: 'GDPR (União Europeia)',
    desc: 'Regulamento 2016/679 — base legal, consentimento explícito e direito ao esquecimento.',
  },
  {
    icon: 'fa-earth-americas',
    name: 'CCPA (Califórnia, EUA)',
    desc: 'Direito de saber quais dados são coletados e de solicitar a não venda de dados pessoais.',
  },
  {
    icon: 'fa-earth-africa',
    name: 'POPIA (África do Sul)',
    desc: 'Protection of Personal Information Act — tratamento lícito e finalidade específica.',
  },
]
</script>

<template>
  <section class="bg-white py-16 dark:bg-gray-950">
    <div class="container-app">
      <AppBreadcrumb :items="[{ label: 'Política de Privacidade' }]" />

      <div class="mx-auto max-w-4xl">
        <header
          class="mb-8 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-purple-50 p-8 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700"
        >
          <h1 class="mb-4 flex items-center gap-3 text-4xl font-bold">
            <i class="fas fa-shield-halved text-brand-600"></i> Política de Privacidade
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            <i class="fas fa-calendar-alt"></i> Última atualização:
            <strong>{{ lastUpdate }}</strong>
          </p>
        </header>

        <!-- Conformidade Global -->
        <div class="mb-10 grid gap-4 md:grid-cols-2">
          <div v-for="law in laws" :key="law.name" class="card-surface flex items-start gap-4 p-5">
            <i class="fas mt-1 text-2xl text-brand-600" :class="law.icon"></i>
            <div>
              <h3 class="font-bold">{{ law.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ law.desc }}</p>
            </div>
          </div>
        </div>

        <div class="prose max-w-none space-y-8 dark:prose-invert">
          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-circle-info text-brand-600"></i> 1. Introdução
            </h2>
            <p>
              O <strong>{{ COMPANY.legalName }}</strong
              >, desenvolvedor da <strong>Calculadora Freelancer</strong>, está comprometido em
              proteger sua privacidade, em conformidade com LGPD, GDPR, CCPA e POPIA.
            </p>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-database text-brand-600"></i> 2. Dados que Coletamos
            </h2>
            <div
              class="not-prose mb-4 rounded-xl border-l-4 border-green-500 bg-green-50 p-6 dark:bg-green-900/20"
            >
              <h3 class="mb-2 flex items-center gap-2 font-bold">
                <i class="fas fa-circle-check text-green-500"></i> Dados da Calculadora — 100%
                Privados
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Todos os cálculos (valores, horas, margens) são processados
                <strong>localmente no seu navegador</strong>. Não armazenamos, enviamos ou temos
                acesso a esses dados.
              </p>
            </div>
            <h3 class="font-bold">2.1. Dados de navegação (automáticos)</h3>
            <ul>
              <li>Endereço IP (anonimizado)</li>
              <li>Tipo e versão do navegador</li>
              <li>Sistema operacional</li>
              <li>Páginas visitadas e tempo de permanência</li>
              <li>Origem do acesso e data/hora</li>
            </ul>
            <h3 class="font-bold">2.2. Cookies</h3>
            <ul>
              <li><strong>Essenciais:</strong> armazenar sua preferência de consentimento</li>
              <li><strong>Analíticos:</strong> Google Analytics 4 para entender o uso</li>
              <li><strong>Marketing:</strong> Google Tag Manager para otimização</li>
            </ul>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-bullseye text-brand-600"></i> 3. Como Usamos Seus Dados
            </h2>
            <ul>
              <li>Melhorar a experiência do usuário</li>
              <li>Analisar padrões de uso</li>
              <li>Identificar e corrigir erros técnicos</li>
              <li>Garantir a segurança e prevenir fraudes</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-user-check text-brand-600"></i> 4. Seus Direitos
            </h2>
            <p>De acordo com a LGPD, GDPR, CCPA e POPIA, você tem os seguintes direitos:</p>
            <div class="not-prose grid gap-4 md:grid-cols-2">
              <div
                v-for="right in rights"
                :key="right.title"
                class="rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-purple-50 p-4 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700"
              >
                <div class="flex items-start gap-3">
                  <i class="fas mt-1 text-xl text-brand-600" :class="right.icon"></i>
                  <div>
                    <h4 class="font-bold">{{ right.title }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ right.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Para exercer estes direitos, contate:
              <a
                :href="`mailto:${COMPANY.privacyEmail}`"
                class="font-semibold text-brand-600 underline"
              >
                {{ COMPANY.privacyEmail }}
              </a>
            </p>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-lock text-brand-600"></i> 5. Segurança dos Dados
            </h2>
            <ul>
              <li>Criptografia SSL/TLS em todas as comunicações (HTTPS)</li>
              <li>Processamento local de cálculos no navegador</li>
              <li>Anonimização de dados analíticos</li>
              <li>Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options)</li>
              <li>Monitoramento contínuo de segurança</li>
            </ul>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-clock text-brand-600"></i> 6. Retenção de Dados
            </h2>
            <p>
              Mantemos dados apenas pelo tempo necessário. Dados analíticos são retidos por até 26
              meses (padrão do Google Analytics 4).
            </p>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-user-tie text-brand-600"></i> 7. Encarregado de Dados (DPO)
            </h2>
            <div
              class="not-prose rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-purple-50 p-6 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700"
            >
              <p class="mb-2">
                <i class="fas fa-building text-brand-600"></i>
                <strong>{{ COMPANY.legalName }}</strong> — Encarregado de Dados
              </p>
              <p class="mb-2">
                <i class="fas fa-envelope text-brand-600"></i> E-mail:
                <a :href="`mailto:${COMPANY.privacyEmail}`" class="text-brand-600 underline">{{
                  COMPANY.privacyEmail
                }}</a>
              </p>
              <p class="mb-2">
                <i class="fab fa-whatsapp text-brand-600"></i> WhatsApp:
                <a :href="COMPANY.whatsappLink" class="text-brand-600 underline">{{
                  COMPANY.whatsappDisplay
                }}</a>
              </p>
              <p>
                <i class="fas fa-globe text-brand-600"></i> Website:
                <a
                  :href="COMPANY.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-brand-600 underline"
                  >www.3wonline.com.br</a
                >
              </p>
            </div>
          </section>
        </div>

        <div class="mt-12 rounded border-l-4 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <i class="fas fa-circle-check text-blue-500"></i>
            <strong
              >Esta Política está em conformidade com LGPD (Lei 13.709/2018), GDPR, CCPA, POPIA e o
              Marco Civil da Internet (Lei 12.965/2014).</strong
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
