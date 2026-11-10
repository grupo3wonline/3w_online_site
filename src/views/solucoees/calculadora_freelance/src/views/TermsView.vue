<script setup lang="ts">
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import { COMPANY } from '@/lib/constants'

const lastUpdate = '24 de setembro de 2026'
</script>

<template>
  <section class="bg-white py-16 dark:bg-gray-950">
    <div class="container-app">
      <AppBreadcrumb :items="[{ label: 'Termos de Uso' }]" />

      <div class="mx-auto max-w-4xl">
        <header
          class="mb-8 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-purple-50 p-8 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700"
        >
          <h1 class="mb-4 flex items-center gap-3 text-4xl font-bold">
            <i class="fas fa-file-contract text-brand-600"></i> Termos de Uso
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            <i class="fas fa-calendar-alt"></i> Última atualização:
            <strong>{{ lastUpdate }}</strong>
          </p>
        </header>

        <div class="prose max-w-none space-y-8 dark:prose-invert">
          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-circle-info text-brand-600"></i> 1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e usar a <strong>Calculadora Freelancer</strong>, você concorda em cumprir
              estes termos e condições. Se não concordar com qualquer parte, não utilize o serviço.
            </p>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-clipboard-list text-brand-600"></i> 2. Descrição do Serviço
            </h2>
            <p>A Calculadora Freelancer é uma ferramenta gratuita que oferece:</p>
            <ul>
              <li>Cálculo de valor/hora para freelancers</li>
              <li>Estimativa de orçamentos de projetos</li>
              <li>Cálculo de prazos de entrega</li>
              <li>Geração de propostas comerciais</li>
            </ul>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-user-shield text-brand-600"></i> 3. Uso Permitido
            </h2>
            <ul>
              <li>Utilizar a ferramenta gratuitamente para fins pessoais ou profissionais</li>
              <li>Realizar quantos cálculos forem necessários</li>
              <li>Compartilhar o link da ferramenta</li>
              <li>Utilizar os resultados em suas propostas comerciais</li>
            </ul>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-ban text-brand-600"></i> 4. Uso Proibido
            </h2>
            <ul>
              <li>Utilizar a ferramenta para qualquer finalidade ilegal</li>
              <li>Tentar comprometer a segurança do sistema</li>
              <li>Copiar, modificar ou distribuir o código-fonte</li>
              <li>Utilizar bots ou sistemas automatizados sem autorização</li>
              <li>Revender ou comercializar o acesso</li>
            </ul>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-triangle-exclamation text-brand-600"></i> 5. Limitação de
              Responsabilidade
            </h2>
            <p>A ferramenta é fornecida "como está". Não garantimos que:</p>
            <ul>
              <li>O serviço estará disponível ininterruptamente ou livre de erros</li>
              <li>Os resultados sejam absolutamente precisos em todos os casos</li>
              <li>A ferramenta atenderá a todas as suas necessidades específicas</li>
            </ul>
            <p>
              <strong>Importante:</strong> os cálculos baseiam-se nas informações fornecidas por
              você. Consulte um contador ou consultor financeiro para decisões importantes.
            </p>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-copyright text-brand-600"></i> 6. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo, design, código e funcionalidades são de propriedade do
              <strong>{{ COMPANY.legalName }}</strong> e estão protegidos por leis de direitos
              autorais.
            </p>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-shield-halved text-brand-600"></i> 7. Privacidade e Dados
            </h2>
            <p>
              Os cálculos são realizados localmente no seu navegador. Consulte nossa
              <RouterLink to="/privacidade" class="font-semibold text-brand-600 underline"
                >Política de Privacidade</RouterLink
              >.
            </p>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-scale-balanced text-brand-600"></i> 8. Lei Aplicável
            </h2>
            <p>
              Estes termos são regidos pelas leis da República Federativa do Brasil, em conformidade
              com a LGPD (Lei 13.709/2018) e o Marco Civil da Internet (Lei 12.965/2014).
            </p>
          </section>

          <section>
            <h2 class="flex items-center gap-2 text-2xl font-bold">
              <i class="fas fa-envelope text-brand-600"></i> 9. Contato
            </h2>
            <div
              class="not-prose rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-purple-50 p-6 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700"
            >
              <p class="mb-2">
                <i class="fas fa-building text-brand-600"></i>
                <strong>{{ COMPANY.legalName }}</strong>
              </p>
              <p class="mb-2">
                <i class="fab fa-whatsapp text-brand-600"></i> WhatsApp:
                <a :href="COMPANY.whatsappLink" class="text-brand-600 underline">{{
                  COMPANY.whatsappDisplay
                }}</a>
              </p>
              <p><i class="fas fa-envelope text-brand-600"></i> E-mail: {{ COMPANY.email }}</p>
            </div>
          </section>
        </div>

        <div class="mt-12 rounded border-l-4 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <i class="fas fa-circle-info text-blue-500"></i>
            <strong
              >Ao utilizar a Calculadora Freelancer, você declara ter lido e concordado com estes
              Termos de Uso.</strong
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
