<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'
import { SITE, COMPANY } from '@/config/site'

const dataAtualizacao = computed(() =>
  new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
)

useSeo(() => ({
  title: 'Política de Privacidade',
  description:
    'Saiba como a CableCal coleta, usa e protege seus dados, em conformidade com LGPD, GDPR, CCPA e POPIA. Processamento local e sem coleta de dados pessoais identificáveis.',
  keywords: 'política de privacidade, lgpd, gdpr, ccpa, popia, proteção de dados, cookies',
  url: `${SITE.url}/politica-de-privacidade`,
}))

const direitos = [
  {
    title: 'Confirmação e Acesso',
    desc: 'Confirmar se tratamos seus dados e acessar os dados armazenados',
  },
  {
    title: 'Correção',
    desc: 'Solicitar a correção de dados incompletos, inexatos ou desatualizados',
  },
  {
    title: 'Anonimização, Bloqueio ou Eliminação',
    desc: 'Solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos',
  },
  {
    title: 'Portabilidade',
    desc: 'Solicitar a portabilidade dos dados a outro fornecedor de serviço',
  },
  {
    title: 'Eliminação de Dados Tratados com Consentimento',
    desc: 'Excluir dados pessoais tratados com base no seu consentimento',
  },
  {
    title: 'Informação sobre Compartilhamento',
    desc: 'Saber com quais entidades públicas e privadas compartilhamos seus dados',
  },
  {
    title: 'Revogação do Consentimento',
    desc: 'Revogar o consentimento dado anteriormente para tratamento de dados',
  },
  {
    title: 'Oposição',
    desc: 'Opor-se ao tratamento realizado com base em hipótese de dispensa de consentimento',
  },
]
</script>

<template>
  <div class="py-12">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <!-- Cabeçalho -->
      <div class="mb-8 rounded-xl bg-white p-8 shadow-sm dark:bg-gray-800">
        <div class="mb-6 flex items-center gap-4">
          <div
            class="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-green-700"
          >
            <Icon icon="ph:shield-check-bold" class="h-9 w-9 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Política de Privacidade
            </h1>
            <p class="mt-1 text-gray-600 dark:text-gray-400">
              Última atualização: {{ dataAtualizacao }}
            </p>
          </div>
        </div>
        <div class="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
          <p class="text-sm leading-relaxed text-green-900 dark:text-green-300">
            Esta Política descreve como a {{ SITE.name }} coleta, usa, armazena e protege suas
            informações, em conformidade com as principais normas globais de privacidade: LGPD
            (Brasil - Lei nº 13.709/2018), GDPR (União Europeia), CCPA (Califórnia/EUA) e POPIA
            (África do Sul).
          </p>
        </div>
      </div>

      <div class="space-y-8 rounded-xl bg-white p-8 shadow-sm dark:bg-gray-800">
        <!-- 1 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >1</span
            >
            Definições e Responsável pelos Dados
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Controlador de Dados:</strong> {{ COMPANY.name }}, responsável pelas decisões
              sobre o tratamento de dados pessoais.
            </p>
            <p>
              <strong>Dados Pessoais:</strong> Qualquer informação relacionada a uma pessoa natural
              identificada ou identificável.
            </p>
            <p>
              <strong>Tratamento:</strong> Toda operação realizada com dados pessoais, como coleta,
              uso, acesso, armazenamento, eliminação, entre outras.
            </p>
            <div class="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p class="mb-2 font-semibold text-blue-900 dark:text-blue-300">
                Dados do Controlador:
              </p>
              <ul class="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                <li><strong>Nome:</strong> {{ COMPANY.name }}</li>
                <li><strong>Website:</strong> www.3wonline.com.br</li>
                <li><strong>WhatsApp:</strong> {{ COMPANY.whatsapp }}</li>
                <li><strong>E-mail:</strong> {{ COMPANY.email }}</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 2 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >2</span
            >
            Dados Coletados
          </h2>
          <div class="space-y-4 pl-11 text-gray-700 dark:text-gray-300">
            <p>A {{ SITE.name }} pode tratar os seguintes tipos de dados:</p>
            <div class="rounded-r-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
              <h3 class="mb-2 font-bold text-blue-900 dark:text-blue-300">
                Dados Técnicos e de Navegação
              </h3>
              <ul class="list-inside list-disc space-y-1 text-sm text-blue-800 dark:text-blue-300">
                <li>Endereço IP, navegador e sistema operacional</li>
                <li>Data, hora e páginas visitadas</li>
                <li>Origem do acesso e dispositivo utilizado</li>
              </ul>
              <p class="mt-2 text-xs text-blue-900 dark:text-blue-300">
                <strong>Base Legal:</strong> Legítimo interesse para melhoria do serviço
              </p>
            </div>
            <div
              class="rounded-r-lg border-l-4 border-purple-500 bg-purple-50 p-4 dark:bg-purple-900/20"
            >
              <h3 class="mb-2 font-bold text-purple-900 dark:text-purple-300">
                Dados de Uso da Aplicação
              </h3>
              <ul
                class="list-inside list-disc space-y-1 text-sm text-purple-800 dark:text-purple-300"
              >
                <li>Histórico de cálculos (armazenado localmente)</li>
                <li>Parâmetros utilizados e preferências de uso</li>
              </ul>
              <p class="mt-2 text-xs text-purple-900 dark:text-purple-300">
                <strong>Armazenamento:</strong> LocalStorage do navegador (não enviado ao servidor)
              </p>
            </div>
            <div
              class="rounded-r-lg border-l-4 border-orange-500 bg-orange-50 p-4 dark:bg-orange-900/20"
            >
              <h3 class="mb-2 font-bold text-orange-900 dark:text-orange-300">
                Cookies e Tecnologias Similares
              </h3>
              <ul
                class="list-inside list-disc space-y-1 text-sm text-orange-800 dark:text-orange-300"
              >
                <li><strong>Essenciais:</strong> necessários para o funcionamento</li>
                <li><strong>Preferência:</strong> lembram configurações do usuário</li>
                <li><strong>Analíticos:</strong> coletam informações sobre o uso do site</li>
              </ul>
              <p class="mt-2 text-xs text-orange-900 dark:text-orange-300">
                <strong>Base Legal:</strong> Consentimento e legítimo interesse
              </p>
            </div>
            <div
              class="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20"
            >
              <p class="text-sm text-green-900 dark:text-green-300">
                <strong>Importante:</strong> A {{ SITE.name }} NÃO coleta dados pessoais sensíveis
                como nome, e-mail, CPF ou endereço. Todo o processamento do cálculo ocorre no seu
                próprio navegador.
              </p>
            </div>
          </div>
        </section>

        <!-- 3 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >3</span
            >
            Finalidade do Tratamento de Dados
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>Utilizamos os dados coletados para as seguintes finalidades:</p>
            <ul class="ml-4 list-inside list-disc space-y-2">
              <li><strong>Operação do Serviço:</strong> garantir o funcionamento da calculadora</li>
              <li>
                <strong>Melhoria Contínua:</strong> analisar o uso para aprimorar funcionalidades
              </li>
              <li>
                <strong>Segurança:</strong> proteger contra fraudes, abusos e atividades ilícitas
              </li>
              <li>
                <strong>Estatísticas:</strong> gerar relatórios analíticos sobre o uso da plataforma
              </li>
              <li><strong>Suporte:</strong> responder dúvidas e solicitações dos usuários</li>
              <li><strong>Conformidade Legal:</strong> cumprir obrigações legais e regulatórias</li>
            </ul>
          </div>
        </section>

        <!-- 4 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >4</span
            >
            Compartilhamento de Dados
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              A {{ SITE.name }} não vende, aluga ou comercializa seus dados. Podemos compartilhar
              dados apenas:
            </p>
            <ul class="ml-4 list-inside list-disc space-y-2">
              <li>
                <strong>Prestadores de Serviços:</strong> hospedagem, análise e CDN, sob contrato de
                proteção de dados
              </li>
              <li>
                <strong>Obrigações Legais:</strong> quando exigido por lei ou autoridade competente
              </li>
              <li>
                <strong>Proteção de Direitos:</strong> para proteger direitos, propriedade ou
                segurança
              </li>
              <li><strong>Consentimento:</strong> com sua autorização expressa</li>
            </ul>
            <div
              class="mt-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20"
            >
              <p class="text-sm text-yellow-900 dark:text-yellow-300">
                <strong>Atenção:</strong> garantimos que todos os terceiros mantêm níveis adequados
                de proteção, conforme LGPD, GDPR, CCPA e POPIA.
              </p>
            </div>
          </div>
        </section>

        <!-- 5 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >5</span
            >
            Armazenamento e Segurança dos Dados
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>Implementamos medidas técnicas e organizacionais para proteger seus dados:</p>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <div
                class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50"
              >
                <h4 class="mb-2 flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                  <Icon
                    icon="ph:shield-check-bold"
                    class="h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                  Medidas Técnicas
                </h4>
                <ul class="space-y-1 text-sm">
                  <li>Criptografia SSL/TLS</li>
                  <li>Firewalls e sistemas de proteção</li>
                  <li>Monitoramento contínuo</li>
                  <li>Backups regulares</li>
                </ul>
              </div>
              <div
                class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50"
              >
                <h4 class="mb-2 flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                  <Icon
                    icon="ph:users-three-bold"
                    class="h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                  Medidas Organizacionais
                </h4>
                <ul class="space-y-1 text-sm">
                  <li>Controle de acesso restrito</li>
                  <li>Políticas internas de segurança</li>
                  <li>Treinamento de equipe</li>
                  <li>Auditorias periódicas</li>
                </ul>
              </div>
            </div>
            <p class="mt-4">
              <strong>Período de Retenção:</strong> os dados são mantidos apenas pelo tempo
              necessário. Dados em LocalStorage permanecem até que você os exclua manualmente.
            </p>
          </div>
        </section>

        <!-- 6 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >6</span
            >
            Seus Direitos
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Conforme LGPD, GDPR, CCPA e POPIA, você possui os seguintes direitos sobre seus dados:
            </p>
            <div class="mt-4 space-y-3">
              <div v-for="(direito, index) in direitos" :key="index" class="flex items-start gap-3">
                <span
                  class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700"
                  >{{ index + 1 }}</span
                >
                <div>
                  <p class="font-semibold">{{ direito.title }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ direito.desc }}</p>
                </div>
              </div>
            </div>
            <div
              class="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20"
            >
              <p class="mb-2 text-sm text-green-900 dark:text-green-300">
                <strong>Como exercer seus direitos:</strong>
              </p>
              <p class="text-sm text-green-800 dark:text-green-300">
                Entre em contato pelo WhatsApp
                <a
                  :href="COMPANY.whatsappLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-green-600 hover:underline"
                  >{{ COMPANY.whatsapp }}</a
                >
                ou pelo e-mail
                <a :href="COMPANY.emailLink" class="font-semibold text-green-600 hover:underline">{{
                  COMPANY.email
                }}</a
                >. Responderemos em até 15 dias.
              </p>
            </div>
          </div>
        </section>

        <!-- 7 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >7</span
            >
            Cookies e Tecnologias de Rastreamento
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Você pode gerenciar suas preferências de cookies pelo banner de consentimento a
              qualquer momento.
            </p>
            <div class="mt-4 space-y-3">
              <div
                class="rounded-r-lg border-l-4 border-gray-500 bg-gray-50 p-3 dark:bg-gray-700/50"
              >
                <p class="font-semibold text-gray-900 dark:text-white">
                  Cookies Essenciais (Obrigatórios)
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Necessários para o funcionamento básico do site. Não podem ser desativados.
                </p>
              </div>
              <div
                class="rounded-r-lg border-l-4 border-blue-500 bg-gray-50 p-3 dark:bg-gray-700/50"
              >
                <p class="font-semibold text-gray-900 dark:text-white">
                  Cookies de Preferência (Opcionais)
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Armazenam suas preferências e configurações.
                </p>
              </div>
              <div
                class="rounded-r-lg border-l-4 border-purple-500 bg-gray-50 p-3 dark:bg-gray-700/50"
              >
                <p class="font-semibold text-gray-900 dark:text-white">
                  Cookies Analíticos (Opcionais)
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Coletam informações sobre como você usa o site para nos ajudar a melhorá-lo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 8 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >8</span
            >
            Transferência Internacional de Dados
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Alguns prestadores de serviços podem estar localizados fora do Brasil. Nesse caso,
              garantimos que:
            </p>
            <ul class="ml-4 list-inside list-disc space-y-2">
              <li>O país de destino oferece nível adequado de proteção de dados</li>
              <li>Existem cláusulas contratuais de proteção de dados</li>
              <li>Há conformidade com LGPD, GDPR, CCPA e POPIA</li>
            </ul>
          </div>
        </section>

        <!-- 9 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >9</span
            >
            Alterações nesta Política
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Podemos atualizar esta Política periodicamente. Notificaremos alterações
              significativas por:
            </p>
            <ul class="ml-4 list-inside list-disc space-y-2">
              <li>Aviso destacado no site</li>
              <li>Atualização da data de "Última atualização" no topo desta página</li>
              <li>Banner de notificação ao acessar a plataforma</li>
            </ul>
          </div>
        </section>

        <!-- 10 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >10</span
            >
            Contato e Encarregado de Dados (DPO)
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>Para dúvidas sobre esta Política ou para exercer seus direitos, entre em contato:</p>
            <div
              class="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-600 dark:bg-gray-700/50"
            >
              <h4 class="mb-4 font-bold text-gray-900 dark:text-white">Canais de Contato</h4>
              <ul class="space-y-3 text-sm">
                <li class="flex items-center gap-3">
                  <Icon
                    icon="ph:whatsapp-logo-bold"
                    class="h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                  <a
                    :href="COMPANY.whatsappLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline"
                    >{{ COMPANY.whatsapp }}</a
                  >
                </li>
                <li class="flex items-center gap-3">
                  <Icon
                    icon="ph:envelope-simple-bold"
                    class="h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                  <a :href="COMPANY.emailLink" class="hover:underline">{{ COMPANY.email }}</a>
                </li>
                <li class="flex items-center gap-3">
                  <Icon icon="ph:globe-bold" class="h-5 w-5 text-green-600" aria-hidden="true" />
                  <a
                    :href="COMPANY.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline"
                    >www.3wonline.com.br</a
                  >
                </li>
                <li class="flex items-center gap-3">
                  <Icon icon="ph:clock-bold" class="h-5 w-5 text-green-600" aria-hidden="true" />
                  <span>Prazo de resposta: até 15 dias úteis</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 11 -->
        <section>
          <h2 class="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300"
              >11</span
            >
            Legislação e Foro
          </h2>
          <div class="space-y-3 pl-11 text-gray-700 dark:text-gray-300">
            <p>
              Esta Política é regida pelas leis brasileiras, especialmente a LGPD (Lei nº
              13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014) e o Código de Defesa do
              Consumidor (Lei nº 8.078/1990), observadas ainda as normas internacionais aplicáveis
              (GDPR, CCPA e POPIA).
            </p>
            <p>
              Fica eleito o foro do domicílio do usuário para dirimir questões relacionadas a esta
              Política.
            </p>
          </div>
        </section>

        <!-- Rodapé -->
        <div class="mt-8 border-t border-gray-200 pt-6 dark:border-gray-600">
          <div class="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
            <p class="mb-4 text-center font-semibold text-green-900 dark:text-green-300">
              Seu direito à privacidade é importante para nós. Estamos comprometidos em proteger
              seus dados pessoais.
            </p>
            <div class="flex flex-col justify-center gap-3 sm:flex-row">
              <RouterLink
                to="/"
                class="rounded-lg bg-green-600 px-6 py-2 text-center text-white transition-colors hover:bg-green-700"
                >Voltar à Home</RouterLink
              >
              <RouterLink
                to="/termos-de-uso"
                class="rounded-lg bg-gray-600 px-6 py-2 text-center text-white transition-colors hover:bg-gray-700"
                >Termos de Uso</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
