<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 animate-fadeIn">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-6"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>LGPD - Lei 13.709/2018</span>
        </div>
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Política de Privacidade
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Última atualização: {{ lastUpdated }}
        </p>
      </div>

      <!-- Content -->
      <BaseCard class="p-8 md:p-12 animate-slideUp">
        <div class="prose prose-blue dark:prose-invert max-w-none">
          <!-- Introdução -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Introdução
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              O Grupo 3w Online, responsável pela plataforma InvestSim, está
              comprometido com a proteção da sua privacidade e dos seus dados
              pessoais, em conformidade com a Lei Geral de Proteção de Dados
              (LGPD - Lei nº 13.709/2018).
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Esta Política de Privacidade descreve como coletamos, usamos,
              armazenamos, compartilhamos e protegemos suas informações pessoais
              quando você utiliza o InvestSim.
            </p>
          </section>

          <!-- Responsável pelo Tratamento -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Responsável pelo Tratamento de Dados
            </h2>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-2">
              <p class="text-gray-800 dark:text-gray-200">
                <strong>Controlador:</strong> Grupo 3w Online
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>E-mail para contato:</strong>
                <a
                  href="mailto:contato@3wonline.com.br"
                  class="text-primary-600 hover:underline"
                  >contato@3wonline.com.br</a
                >
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>Website:</strong>
                <a
                  href="https://www.3wonline.com.br"
                  target="_blank"
                  class="text-primary-600 hover:underline"
                  >www.3wonline.com.br</a
                >
              </p>
            </div>
          </section>

          <!-- Dados Coletados -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Dados Pessoais Coletados
            </h2>

            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-3"
            >
              3.1. Dados Fornecidos Voluntariamente
            </h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Quando você utiliza nosso formulário de contato, coletamos:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mb-6"
            >
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Telefone (opcional)</li>
              <li>Assunto da mensagem</li>
              <li>Conteúdo da mensagem</li>
            </ul>

            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-3"
            >
              3.2. Dados Coletados Automaticamente
            </h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Durante sua navegação, coletamos automaticamente:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mb-6"
            >
              <li>Endereço IP</li>
              <li>Tipo e versão do navegador</li>
              <li>Sistema operacional</li>
              <li>Páginas visitadas e tempo de navegação</li>
              <li>Origem do acesso (site de referência)</li>
              <li>Informações de dispositivo (resolução de tela, idioma)</li>
            </ul>

            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-3"
            >
              3.3. Dados de Simulações
            </h3>
            <div
              class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 mb-4"
            >
              <p class="text-gray-800 dark:text-gray-200">
                <strong>✓ Importante:</strong> Os dados das suas simulações
                (valores, taxas, prazos) são processados apenas localmente no
                seu navegador e
                <strong
                  >NÃO são enviados ou armazenados em nossos servidores</strong
                >.
              </p>
            </div>
          </section>

          <!-- Finalidade -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Finalidade do Tratamento de Dados
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Utilizamos seus dados pessoais para as seguintes finalidades:
            </p>

            <div class="space-y-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  📧 Comunicação
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Responder suas mensagens, dúvidas e solicitações enviadas
                  através do formulário de contato.
                </p>
              </div>

              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  📊 Análise e Melhoria
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Analisar o uso da plataforma para melhorar funcionalidades,
                  corrigir erros e otimizar a experiência do usuário.
                </p>
              </div>

              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  🔒 Segurança
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Proteger a plataforma contra fraudes, abusos e atividades
                  maliciosas.
                </p>
              </div>

              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  ⚖️ Cumprimento Legal
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Cumprir obrigações legais, regulatórias e atender solicitações
                  de autoridades competentes.
                </p>
              </div>
            </div>
          </section>

          <!-- Base Legal -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Base Legal para o Tratamento
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              O tratamento dos seus dados pessoais é realizado com base nas
              seguintes bases legais previstas na LGPD:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4"
            >
              <li>
                <strong>Consentimento:</strong> Quando você fornece seus dados
                voluntariamente através do formulário de contato
              </li>
              <li>
                <strong>Legítimo interesse:</strong> Para análise de uso da
                plataforma e melhorias técnicas
              </li>
              <li>
                <strong>Cumprimento de obrigação legal:</strong> Quando exigido
                por lei ou autoridades competentes
              </li>
            </ul>
          </section>

          <!-- Compartilhamento -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Compartilhamento de Dados
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Seus dados pessoais não são vendidos, alugados ou comercializados.
              Podemos compartilhar informações nas seguintes situações:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mb-4"
            >
              <li>
                <strong>Prestadores de serviço:</strong> Com empresas que nos
                auxiliam na operação da plataforma (hospedagem, análise, e-mail)
              </li>
              <li>
                <strong>Obrigação legal:</strong> Quando exigido por lei, ordem
                judicial ou autoridades competentes
              </li>
              <li>
                <strong>Proteção de direitos:</strong> Para proteger nossos
                direitos, propriedade ou segurança
              </li>
            </ul>
            <div
              class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4"
            >
              <p class="text-gray-800 dark:text-gray-200">
                <strong>Garantia:</strong> Todos os terceiros que acessam seus
                dados são contratualmente obrigados a protegê-los e utilizá-los
                apenas para os fins especificados.
              </p>
            </div>
          </section>

          <!-- Armazenamento -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Armazenamento e Segurança
            </h2>

            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-3"
            >
              7.1. Período de Armazenamento
            </h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Armazenamos seus dados pessoais pelo tempo necessário para cumprir
              as finalidades descritas nesta política, incluindo:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mb-6"
            >
              <li>
                <strong>Dados de contato:</strong> Até 2 anos após o último
                contato ou até você solicitar a exclusão
              </li>
              <li>
                <strong>Dados de navegação:</strong> Até 12 meses para fins
                analíticos
              </li>
              <li>
                <strong>Logs de segurança:</strong> Até 6 meses para fins de
                segurança e auditoria
              </li>
            </ul>

            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-3"
            >
              7.2. Medidas de Segurança
            </h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Implementamos medidas técnicas e organizacionais para proteger
              seus dados:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4"
            >
              <li>Criptografia SSL/TLS para transmissão de dados</li>
              <li>Acesso restrito aos dados apenas para pessoal autorizado</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares e seguros</li>
              <li>
                Proteção contra acesso não autorizado e ataques cibernéticos
              </li>
            </ul>
          </section>

          <!-- Cookies -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Cookies e Tecnologias de Rastreamento
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Utilizamos cookies e tecnologias similares para melhorar sua
              experiência. Os tipos de cookies que utilizamos são:
            </p>

            <div class="space-y-4">
              <div class="border-l-4 border-gray-400 pl-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  Cookies Essenciais (Necessários)
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Necessários para o funcionamento básico da plataforma. Não
                  podem ser desativados.
                </p>
                <p class="text-xs text-gray-500">
                  Exemplo: cookies de sessão, preferências de idioma
                </p>
              </div>

              <div class="border-l-4 border-blue-400 pl-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  Cookies de Preferências
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Armazenam suas escolhas e configurações (ex: modo
                  escuro/claro).
                </p>
                <p class="text-xs text-gray-500">
                  Exemplo: tema escolhido, configurações de visualização
                </p>
              </div>

              <div class="border-l-4 border-purple-400 pl-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  Cookies Analíticos (Requerem Consentimento)
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Coletam informações sobre como você usa a plataforma para
                  melhorias.
                </p>
                <p class="text-xs text-gray-500">Exemplo: Google Analytics</p>
              </div>
            </div>

            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Você pode gerenciar suas preferências de cookies através do banner
              de consentimento que aparece na primeira visita ou nas
              configurações do seu navegador.
            </p>
          </section>

          <!-- Direitos do Titular -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Seus Direitos como Titular de Dados
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              De acordo com a LGPD, você possui os seguintes direitos em relação
              aos seus dados pessoais:
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓ Confirmação e Acesso
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Confirmar se tratamos seus dados e solicitar acesso a eles
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓ Correção
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Solicitar a correção de dados incompletos, inexatos ou
                  desatualizados
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓ Anonimização ou Exclusão
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Solicitar anonimização, bloqueio ou eliminação de dados
                  desnecessários
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓ Portabilidade
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Solicitar a portabilidade dos seus dados a outro fornecedor
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓ Revogação do Consentimento
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Revogar o consentimento a qualquer momento
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓ Informação sobre Compartilhamento
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Saber com quem compartilhamos seus dados
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓ Oposição
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Opor-se a tratamento realizado com base em legítimo interesse
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓ Revisão de Decisões Automatizadas
                </h4>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  Solicitar revisão de decisões tomadas unicamente com base em
                  tratamento automatizado
                </p>
              </div>
            </div>

            <div
              class="bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800 rounded-lg p-6 mt-6"
            >
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Como Exercer Seus Direitos
              </h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Para exercer qualquer um desses direitos, entre em contato
                conosco através do e-mail:
              </p>
              <a
                href="mailto:contato@3wonline.com.br"
                class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-semibold"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                contato@3wonline.com.br
              </a>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-3">
                Responderemos sua solicitação em até 15 dias úteis.
              </p>
            </div>
          </section>

          <!-- Menores de Idade -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. Proteção de Menores de Idade
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              O InvestSim não coleta intencionalmente dados de menores de 18
              anos. Se você é pai, mãe ou responsável legal e acredita que seu
              filho forneceu dados pessoais, entre em contato conosco para que
              possamos tomar as medidas necessárias.
            </p>
          </section>

          <!-- Transferência Internacional -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              11. Transferência Internacional de Dados
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Alguns dos nossos prestadores de serviço podem estar localizados
              fora do Brasil. Quando isso ocorrer, garantimos que:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4"
            >
              <li>
                A transferência está em conformidade com a LGPD e legislação
                aplicável
              </li>
              <li>
                São implementadas garantias adequadas de proteção de dados
              </li>
              <li>
                Os países destinatários possuem nível adequado de proteção de
                dados
              </li>
            </ul>
          </section>

          <!-- Alterações -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              12. Alterações nesta Política
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente para
              refletir mudanças em nossas práticas ou na legislação. Quando
              fizermos alterações significativas, notificaremos você através da
              plataforma ou por e-mail. Recomendamos que você revise esta página
              regularmente.
            </p>
          </section>

          <!-- ANPD -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              13. Autoridade Nacional de Proteção de Dados (ANPD)
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Se você acredita que seus direitos não foram adequadamente
              atendidos, você pode apresentar uma reclamação à Autoridade
              Nacional de Proteção de Dados (ANPD):
            </p>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">
              <p class="text-gray-800 dark:text-gray-200">
                <strong>ANPD - Autoridade Nacional de Proteção de Dados</strong>
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                Website:
                <a
                  href="https://www.gov.br/anpd/pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary-600 hover:underline"
                  >www.gov.br/anpd</a
                >
              </p>
            </div>
          </section>

          <!-- Contato -->
          <section>
            <div
              class="bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800 rounded-lg p-6"
            >
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Dúvidas sobre esta Política?
              </h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Se você tiver dúvidas, preocupações ou solicitações relacionadas
                a esta Política de Privacidade ou ao tratamento dos seus dados
                pessoais, entre em contato conosco:
              </p>
              <div class="space-y-2">
                <p class="text-gray-800 dark:text-gray-200">
                  <strong>E-mail:</strong>
                  <a
                    href="mailto:contato@3wonline.com.br"
                    class="text-primary-600 hover:underline ml-2"
                    >contato@3wonline.com.br</a
                  >
                </p>
                <p class="text-gray-800 dark:text-gray-200">
                  <strong>Assunto:</strong> LGPD - Proteção de Dados Pessoais
                </p>
              </div>
            </div>
          </section>
        </div>

        <!-- Back Button -->
        <div class="mt-8 flex justify-center gap-4">
          <router-link to="/termos-de-uso">
            <BaseButton variant="outline" size="sm">
              Ver Termos de Uso
            </BaseButton>
          </router-link>
          <router-link to="/">
            <BaseButton variant="primary">
              <template #left>
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </template>
              Voltar à Página Inicial
            </BaseButton>
          </router-link>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useSEO } from "@/composables/useSEO";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const { setSEO } = useSEO();

const lastUpdated = "10 de Outubro de 2025";

onMounted(() => {
  setSEO({
    title: "Política de Privacidade | InvestSim - LGPD",
    description:
      "Conheça como o InvestSim protege seus dados pessoais em conformidade com a LGPD. Transparência e segurança no tratamento de suas informações.",
    keywords:
      "política de privacidade, lgpd, proteção de dados, privacidade, investsim, dados pessoais",
  });
});
</script>
