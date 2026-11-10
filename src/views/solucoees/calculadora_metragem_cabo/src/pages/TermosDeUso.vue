<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'
import { SITE, COMPANY } from '@/config/site'

const router = useRouter()

const dataAtualizacao = computed(() =>
  new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
)

useSeo(() => ({
  title: 'Termos de Uso',
  description:
    'Leia os termos de uso da Calculadora de Metragem de Cabos. Conheça seus direitos e responsabilidades ao utilizar nossa plataforma.',
  keywords: 'termos de uso, termos e condições, calculadora cabos, lgpd, direitos do usuário',
  url: `${SITE.url}/termos-de-uso`,
}))
</script>

<template>
  <div class="py-12">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <!-- Cabeçalho -->
      <div class="mb-8 rounded-xl bg-white p-8 shadow-sm dark:bg-gray-800">
        <div class="mb-6 flex items-center gap-4">
          <div
            class="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700"
          >
            <Icon icon="ph:file-text-bold" class="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Termos de Uso
            </h1>
            <p class="mt-1 text-gray-600 dark:text-gray-400">
              Última atualização: {{ dataAtualizacao }}
            </p>
          </div>
        </div>
        <div class="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
          <p class="text-sm leading-relaxed text-blue-900 dark:text-blue-300">
            Ao utilizar a Calculadora de Metragem de Cabos, você concorda com os termos e condições
            descritos abaixo. Leia atentamente antes de usar nossos serviços.
          </p>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="space-y-8 rounded-xl bg-white p-8 shadow-sm dark:bg-gray-800">
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >1</span
            >
            Aceitação dos Termos
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Ao acessar e utilizar a plataforma Calculadora de Metragem de Cabos, você declara que
              leu, compreendeu e concorda em cumprir estes Termos de Uso. Se você não concorda com
              qualquer parte destes termos, não deve utilizar nosso serviço.
            </p>
            <p>
              Estes termos se aplicam a todos os usuários, visitantes e qualquer pessoa que acesse
              ou utilize a calculadora.
            </p>
          </div>
        </section>

        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >2</span
            >
            Descrição do Serviço
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              A Calculadora de Metragem de Cabos é uma ferramenta online gratuita desenvolvida pelo
              <strong>{{ COMPANY.name }}</strong> que permite calcular a metragem de cabos elétricos
              necessária para instalações. O serviço oferece:
            </p>
            <ul class="ml-4 list-inside list-disc space-y-2">
              <li>Cálculo preciso de metragem de cabos com base em parâmetros técnicos</li>
              <li>Histórico de cálculos realizados (armazenado localmente no seu dispositivo)</li>
              <li>Interface responsiva e intuitiva com suporte a modo claro e escuro</li>
              <li>Ferramentas auxiliares para profissionais da área elétrica</li>
              <li>100% gratuito e sem necessidade de cadastro</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >3</span
            >
            Uso Adequado da Plataforma
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>Ao utilizar nossa plataforma, você concorda em:</p>
            <ul class="ml-4 list-inside list-disc space-y-2">
              <li>Utilizar a plataforma apenas para fins legais e legítimos</li>
              <li>Não tentar hackear, comprometer ou prejudicar o funcionamento do serviço</li>
              <li>Não utilizar a ferramenta para atividades ilegais ou não autorizadas</li>
              <li>Respeitar os direitos de propriedade intelectual do {{ COMPANY.name }}</li>
              <li>Validar os resultados com um profissional qualificado antes da implementação</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >4</span
            >
            Limitação de Responsabilidade
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <div
              class="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-900/20"
            >
              <p
                class="mb-2 flex items-center gap-2 font-semibold text-amber-900 dark:text-amber-300"
              >
                <Icon icon="ph:warning-bold" class="h-5 w-5" aria-hidden="true" />
                Importante
              </p>
              <p class="text-amber-800 dark:text-amber-200">
                Os cálculos fornecidos são estimativas baseadas nos parâmetros inseridos. Sempre
                consulte um engenheiro eletricista ou profissional qualificado para validação final
                e implementação.
              </p>
            </div>
            <p>O {{ COMPANY.name }} e seus desenvolvedores não se responsabilizam por:</p>
            <ul class="ml-4 list-inside list-disc space-y-2">
              <li>Erros ou imprecisões nos cálculos decorrentes de dados incorretos inseridos</li>
              <li>Danos diretos ou indiretos resultantes do uso da plataforma</li>
              <li>Interrupções temporárias ou permanentes do serviço</li>
              <li>Perda de dados armazenados localmente no navegador</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >5</span
            >
            Propriedade Intelectual
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Todo o conteúdo, design, código-fonte, logotipos e materiais da plataforma são de
              propriedade do <strong>{{ COMPANY.name }}</strong> e desenvolvidos por
              <strong>HOTWYL | WILLFROMBRASIL</strong>, protegidos por leis de direitos autorais e
              propriedade intelectual.
            </p>
            <p>É proibido:</p>
            <ul class="ml-4 list-inside list-disc space-y-2">
              <li>Copiar, modificar ou distribuir o código-fonte sem autorização expressa</li>
              <li>Utilizar a marca ou logotipos sem permissão</li>
              <li>Criar obras derivadas sem consentimento</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >6</span
            >
            Privacidade e Proteção de Dados
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Respeitamos sua privacidade e estamos comprometidos com as principais normas globais
              de proteção de dados: LGPD (Brasil - Lei nº 13.709/2018), GDPR (União Europeia), CCPA
              (Califórnia/EUA) e POPIA (África do Sul). Nossa plataforma:
            </p>
            <ul class="ml-4 list-inside list-disc space-y-2">
              <li>Não coleta dados pessoais identificáveis dos usuários</li>
              <li>Utiliza apenas cookies essenciais e de análise, mediante seu consentimento</li>
              <li>Armazena o histórico de cálculos localmente no seu navegador</li>
              <li>Não compartilha dados com terceiros para fins comerciais</li>
            </ul>
            <p>
              Para mais informações, consulte nossa
              <RouterLink
                to="/politica-de-privacidade"
                class="font-semibold text-primary-600 hover:underline dark:text-primary-400"
                >Política de Privacidade</RouterLink
              >.
            </p>
          </div>
        </section>

        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >7</span
            >
            Alterações nos Termos
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As
              alterações entrarão em vigor imediatamente após a publicação. É responsabilidade do
              usuário verificar periodicamente esta página.
            </p>
            <p>
              O uso continuado da plataforma após alterações constitui aceitação dos novos termos.
            </p>
          </div>
        </section>

        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >8</span
            >
            Lei Aplicável e Foro
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer
              disputa será submetida ao foro da comarca de Curitiba/PR, com exclusão de qualquer
              outro, por mais privilegiado que seja.
            </p>
          </div>
        </section>

        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300"
              >9</span
            >
            Contato
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Para dúvidas, sugestões ou solicitações relacionadas a estes Termos de Uso, entre em
              contato conosco:
            </p>
            <div class="rounded-lg bg-primary-50 p-4 dark:bg-primary-900/20">
              <p class="mb-2 font-semibold text-gray-900 dark:text-white">{{ COMPANY.name }}</p>
              <p class="flex items-center gap-2">
                <Icon icon="ph:globe-bold" class="h-4 w-4 text-primary-600" aria-hidden="true" />
                <a
                  :href="COMPANY.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:underline"
                  >www.3wonline.com.br</a
                >
              </p>
              <p class="mt-2 flex items-center gap-2">
                <Icon
                  icon="ph:whatsapp-logo-bold"
                  class="h-4 w-4 text-primary-600"
                  aria-hidden="true"
                />
                <a
                  :href="COMPANY.whatsappLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:underline"
                  >{{ COMPANY.whatsapp }}</a
                >
              </p>
              <p class="mt-2 flex items-center gap-2">
                <Icon
                  icon="ph:envelope-simple-bold"
                  class="h-4 w-4 text-primary-600"
                  aria-hidden="true"
                />
                <a :href="COMPANY.emailLink" class="hover:underline">{{ COMPANY.email }}</a>
              </p>
            </div>
          </div>
        </section>
      </div>

      <div class="mt-8 text-center">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
          @click="router.back()"
        >
          <Icon icon="ph:arrow-left-bold" class="h-5 w-5" aria-hidden="true" />
          Voltar
        </button>
      </div>
    </div>
  </div>
</template>
