<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { SITE } from '@/lib/utils'
import { useSeo } from '@/composables/useSeo'

const updated = new Date().toLocaleDateString('pt-BR')

useSeo(() => ({
  title: 'Termos de Uso | Calculadora de Redes Sociais | 3W Online',
  description:
    'Termos de Uso da Calculadora de Redes Sociais. Condições, responsabilidades e direitos ao utilizar a ferramenta gratuita do Grupo 3W Online.',
  path: '/termos',
}))
</script>

<template>
  <div>
    <section class="bg-gradient-to-br from-violet-600/10 via-indigo-600/10 to-purple-600/10 py-20 md:py-28">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-4xl space-y-6 text-center">
          <div
            class="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
          >
            <Icon
              icon="lucide:file-text"
              class="mr-2 h-4 w-4"
            />
            Documento Legal
          </div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white md:text-6xl">
            Termos de
            <span class="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Uso</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Última atualização: {{ updated }}
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-4xl">
          <article
            class="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800 md:p-12"
          >
            <div
              class="mb-8 rounded-xl border-l-4 border-violet-600 bg-violet-50 p-6 dark:bg-violet-900/20"
            >
              <div class="flex items-start gap-3">
                <Icon
                  icon="lucide:shield"
                  class="mt-1 h-6 w-6 shrink-0 text-violet-600"
                />
                <div>
                  <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                    Importante
                  </h3>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    Ao utilizar esta ferramenta, você concorda automaticamente com todos os termos e
                    condições descritos neste documento.
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-8 text-gray-700 dark:text-gray-300">
              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  1. Aceitação dos Termos
                </h2>
                <p class="leading-relaxed">
                  Ao acessar e utilizar a Calculadora de Redes Sociais ("Ferramenta"), você concorda
                  em cumprir e estar vinculado a estes termos. Se não concordar com qualquer parte,
                  não utilize a Ferramenta.
                </p>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  2. Descrição do Serviço
                </h2>
                <p class="mb-4 leading-relaxed">
                  A Calculadora de Redes Sociais é uma ferramenta gratuita que permite calcular
                  métricas relacionadas à gestão de redes sociais, incluindo estimativa de preços de
                  serviços.
                </p>
                <p class="leading-relaxed">
                  Os cálculos são estimativas baseadas em algoritmos e dados de mercado, não
                  constituindo garantia de resultados reais.
                </p>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  3. Uso Adequado
                </h2>
                <p class="mb-4 leading-relaxed">
                  Você concorda em:
                </p>
                <ul class="ml-4 list-inside list-disc space-y-2">
                  <li>Utilizar a Ferramenta apenas para fins lícitos e legítimos</li>
                  <li>Não comprometer a segurança ou funcionalidade da Ferramenta</li>
                  <li>Não utilizar a Ferramenta para atividades fraudulentas</li>
                  <li>Não sobrecarregar os servidores com requisições excessivas</li>
                  <li>Respeitar os direitos de propriedade intelectual da 3W Online</li>
                </ul>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  4. Propriedade Intelectual
                </h2>
                <p class="mb-4 leading-relaxed">
                  Todo o conteúdo, design, código-fonte, algoritmos e recursos da Ferramenta são
                  propriedade exclusiva da 3W Online, protegidos por leis de direitos autorais.
                </p>
                <p class="leading-relaxed">
                  É proibida a reprodução, distribuição ou modificação sem autorização prévia por
                  escrito.
                </p>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  5. Isenção de Responsabilidade
                </h2>
                <p class="mb-4 leading-relaxed">
                  A Ferramenta é fornecida "como está", sem garantias de qualquer tipo. A 3W Online
                  não garante que:
                </p>
                <ul class="ml-4 list-inside list-disc space-y-2">
                  <li>A Ferramenta estará sempre disponível ou livre de erros</li>
                  <li>Os resultados dos cálculos serão precisos ou completos</li>
                  <li>A Ferramenta atenderá a todas as suas necessidades específicas</li>
                </ul>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  6. Limitação de Responsabilidade
                </h2>
                <p class="mb-4 leading-relaxed">
                  Em nenhuma circunstância a 3W Online será responsável por danos diretos,
                  indiretos, incidentais ou consequenciais, perda de lucros, dados ou decisões
                  tomadas com base nos resultados fornecidos.
                </p>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  7. Privacidade e Proteção de Dados
                </h2>
                <p class="leading-relaxed">
                  O uso da Ferramenta está sujeito à nossa Política de Privacidade, em conformidade
                  com LGPD, GDPR, CCPA e POPIA. Todos os cálculos são processados localmente no seu
                  navegador quando possível.
                </p>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  8. Modificações e Lei Aplicável
                </h2>
                <p class="mb-4 leading-relaxed">
                  A 3W Online pode modificar estes Termos a qualquer momento, com efeito imediato
                  após a publicação. Estes Termos são regidos pelas leis da República Federativa do
                  Brasil.
                </p>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  9. Contato
                </h2>
                <div class="rounded-xl bg-gray-50 p-6 dark:bg-gray-700/50">
                  <p class="mb-2 font-medium text-gray-900 dark:text-white">
                    {{ SITE.company }}
                  </p>
                  <p class="text-sm">
                    E-mail:
                    <a
                      :href="`mailto:${SITE.email}`"
                      class="text-violet-600 hover:underline dark:text-violet-400"
                    >{{
                      SITE.email
                    }}</a>
                  </p>
                  <p class="text-sm">
                    WhatsApp:
                    <a
                      :href="SITE.whatsappLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-violet-600 hover:underline dark:text-violet-400"
                    >{{
                      SITE.whatsappDisplay
                    }}</a>
                  </p>
                </div>
              </section>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
