<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { SITE } from '@/lib/utils'
import { useSeo } from '@/composables/useSeo'

const updated = new Date().toLocaleDateString('pt-BR')

useSeo(() => ({
  title: 'Política de Privacidade | Calculadora de Redes Sociais | 3W Online',
  description:
    'Política de Privacidade em conformidade com LGPD, GDPR, CCPA e POPIA. Saiba como tratamos e protegemos seus dados na Calculadora de Redes Sociais.',
  path: '/privacidade',
}))

const rights = [
  { title: 'Acesso', description: 'Confirmar se processamos seus dados pessoais.' },
  { title: 'Correção', description: 'Solicitar correção de dados incompletos ou imprecisos.' },
  { title: 'Anonimização', description: 'Requerer anonimização ou bloqueio de dados.' },
  { title: 'Eliminação', description: 'Solicitar eliminação de dados desnecessários.' },
  { title: 'Portabilidade', description: 'Obter cópia dos seus dados em formato estruturado.' },
  { title: 'Revogação', description: 'Revogar consentimento a qualquer momento.' },
]
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
              icon="lucide:shield-check"
              class="mr-2 h-4 w-4"
            />
            LGPD · GDPR · CCPA · POPIA
          </div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white md:text-6xl">
            Política de
            <span class="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Privacidade</span>
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
            <div class="mb-8 rounded-xl border-l-4 border-green-600 bg-green-50 p-6 dark:bg-green-900/20">
              <div class="flex items-start gap-3">
                <Icon
                  icon="lucide:lock"
                  class="mt-1 h-6 w-6 shrink-0 text-green-600"
                />
                <div>
                  <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                    Compromisso com Sua Privacidade
                  </h3>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    O {{ SITE.company }} leva sua privacidade a sério. Esta política descreve como
                    coletamos, usamos e protegemos seus dados em conformidade com as principais leis
                    globais de privacidade: LGPD (Brasil), GDPR (União Europeia), CCPA (Califórnia) e
                    POPIA (África do Sul).
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-8 text-gray-700 dark:text-gray-300">
              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  1. Informações que Coletamos
                </h2>
                <p class="mb-4 leading-relaxed">
                  Podemos coletar:
                </p>
                <ul class="ml-4 list-inside list-disc space-y-2">
                  <li>Dados inseridos na calculadora (processados localmente no navegador)</li>
                  <li>Endereço IP e informações do navegador (anonimizados no Analytics)</li>
                  <li>Páginas visitadas e tempo de permanência</li>
                  <li>Dados de cookies e tecnologias similares</li>
                </ul>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  2. Como Utilizamos Seus Dados
                </h2>
                <ul class="ml-4 list-inside list-disc space-y-2">
                  <li><strong>Fornecer o Serviço:</strong> processar cálculos e exibir resultados</li>
                  <li><strong>Melhorar a Experiência:</strong> otimizar a interface</li>
                  <li><strong>Análises:</strong> compreender o uso via Google Analytics</li>
                  <li><strong>Segurança:</strong> prevenir fraudes e garantir a proteção</li>
                  <li><strong>Compliance:</strong> cumprir obrigações legais</li>
                </ul>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  3. Compartilhamento de Dados
                </h2>
                <p class="mb-4 leading-relaxed">
                  Não vendemos nem alugamos seus dados. Podemos utilizar provedores como Google
                  Analytics e Google Tag Manager para análise de tráfego, e serviços de hospedagem
                  para transmissão de dados. Também podemos divulgar dados quando exigido por lei.
                </p>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  4. Cookies e Tecnologias Similares
                </h2>
                <p class="leading-relaxed">
                  Utilizamos cookies para lembrar preferências, entender o uso da ferramenta e
                  melhorar a performance. Você pode gerenciá-los pelas configurações do navegador ou
                  pelo banner de consentimento exibido no site.
                </p>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  5. Seus Direitos (LGPD/GDPR/CCPA/POPIA)
                </h2>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div
                    v-for="right in rights"
                    :key="right.title"
                    class="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-700 dark:bg-violet-900/20"
                  >
                    <h4 class="mb-2 font-bold text-gray-900 dark:text-white">
                      {{ right.title }}
                    </h4>
                    <p class="text-sm text-gray-700 dark:text-gray-400">
                      {{ right.description }}
                    </p>
                  </div>
                </div>
                <p class="mt-4 leading-relaxed">
                  Para exercer qualquer direito, entre em contato pelo e-mail
                  <a
                    :href="`mailto:${SITE.email}`"
                    class="font-medium text-violet-600 hover:underline dark:text-violet-400"
                  >{{
                    SITE.email
                  }}</a>.
                </p>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  6. Segurança dos Dados
                </h2>
                <ul class="ml-4 list-inside list-disc space-y-2">
                  <li>Criptografia SSL/TLS para transmissão de dados</li>
                  <li>Processamento local no navegador sempre que possível</li>
                  <li>Acesso restrito a dados pessoais</li>
                  <li>Monitoramento contínuo de vulnerabilidades</li>
                </ul>
              </section>

              <section>
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  7. Encarregado de Dados (DPO)
                </h2>
                <div class="rounded-xl bg-gray-50 p-6 dark:bg-gray-700/50">
                  <p class="mb-2 text-sm">
                    <strong>Empresa:</strong> {{ SITE.company }}
                  </p>
                  <p class="mb-2 text-sm">
                    <strong>E-mail:</strong>
                    <a
                      :href="`mailto:${SITE.email}`"
                      class="text-violet-600 hover:underline dark:text-violet-400"
                    >{{
                      SITE.email
                    }}</a>
                  </p>
                  <p class="text-sm">
                    <strong>Website:</strong>
                    <a
                      :href="SITE.companyUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-violet-600 hover:underline dark:text-violet-400"
                    >www.3wonline.com.br</a>
                  </p>
                </div>
              </section>
            </div>

            <div class="mt-12 rounded-xl border-l-4 border-blue-600 bg-blue-50 p-6 dark:bg-blue-900/20">
              <div class="flex items-start gap-3">
                <Icon
                  icon="lucide:user-check"
                  class="mt-1 h-6 w-6 shrink-0 text-blue-600"
                />
                <div>
                  <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                    Seu Consentimento
                  </h3>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    Ao utilizar nossa ferramenta, você consente com a coleta e uso de informações de
                    acordo com esta política. Você pode revogar seu consentimento a qualquer momento.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
