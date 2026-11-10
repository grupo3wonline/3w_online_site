<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center space-x-3 mb-4">
          <i class="fas fa-shield-alt text-4xl text-blue-600 dark:text-blue-400"></i>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
            Política de Privacidade
          </h1>
        </div>
        <p class="text-gray-600 dark:text-gray-400">
          Última atualização: {{ lastUpdate }}
        </p>
      </div>

      <!-- Content -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 prose prose-blue dark:prose-invert max-w-none">
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 mr-3"></i>
            1. Introdução
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            O Seu Peso ("nós", "nosso" ou "aplicação") está comprometido com a proteção da sua privacidade e o cumprimento da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossa aplicação de cálculo de saúde corporal.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-database text-blue-600 dark:text-blue-400 mr-3"></i>
            2. Dados Coletados
          </h2>
          
          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            2.1. Dados Fornecidos por Você
          </h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Ao utilizar nossa calculadora, você pode fornecer:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>Dados antropométricos: peso, altura, idade, sexo</li>
            <li>Nível de atividade física</li>
            <li>Objetivo (manutenção, ganho ou perda de peso)</li>
            <li>Informações de contato quando você nos envia mensagens</li>
          </ul>

          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            2.2. Dados Coletados Automaticamente
          </h3>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>Informações de navegação (páginas visitadas, tempo de permanência)</li>
            <li>Dados técnicos (tipo de navegador, sistema operacional, endereço IP)</li>
            <li>Cookies e tecnologias similares</li>
            <li>Dados analíticos de uso via Google Analytics</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-cogs text-blue-600 dark:text-blue-400 mr-3"></i>
            3. Como Utilizamos Seus Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Seus dados são utilizados para:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li><strong>Fornecer os cálculos solicitados:</strong> IMC, metabolismo basal, necessidades calóricas, etc.</li>
            <li><strong>Melhorar nossos serviços:</strong> análise de uso para otimização da aplicação</li>
            <li><strong>Comunicação:</strong> responder suas dúvidas e solicitações</li>
            <li><strong>Segurança:</strong> prevenir fraudes e proteger a integridade da aplicação</li>
            <li><strong>Cumprimento legal:</strong> atender obrigações legais e regulatórias</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-cookie-bite text-blue-600 dark:text-blue-400 mr-3"></i>
            4. Cookies e Tecnologias de Rastreamento
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Utilizamos cookies para melhorar sua experiência:
          </p>
          
          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            4.1. Cookies Essenciais
          </h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Necessários para o funcionamento básico da aplicação (preferências de tema, consentimento de cookies).
          </p>

          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            4.2. Cookies de Análise
          </h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Google Analytics e Google Tag Manager para entender como você usa nossa aplicação.
          </p>

          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            4.3. Gerenciamento de Cookies
          </h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Você pode aceitar ou recusar cookies não essenciais através do nosso banner de consentimento. Para cookies do navegador, acesse as configurações do seu navegador.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-lock text-blue-600 dark:text-blue-400 mr-3"></i>
            5. Armazenamento e Segurança dos Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            <strong>Processamento Local:</strong> Os cálculos são realizados localmente em seu navegador. Seus dados antropométricos NÃO são enviados ou armazenados em nossos servidores.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            <strong>Armazenamento Local:</strong> Utilizamos localStorage do navegador para salvar suas preferências (tema escuro, consentimento de cookies).
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Segurança:</strong> Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-share-alt text-blue-600 dark:text-blue-400 mr-3"></i>
            6. Compartilhamento de Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            <strong>NÃO vendemos seus dados pessoais.</strong> Podemos compartilhar informações com:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li><strong>Provedores de Serviços:</strong> Google Analytics, Google Tag Manager (dados anonimizados de uso)</li>
            <li><strong>Autoridades:</strong> quando exigido por lei</li>
            <li><strong>Grupo 3w Online:</strong> empresa desenvolvedora e mantenedora da aplicação</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-user-shield text-blue-600 dark:text-blue-400 mr-3"></i>
            7. Seus Direitos (LGPD)
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            De acordo com a LGPD, você tem direito a:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li><strong>Confirmação e Acesso:</strong> confirmar se tratamos seus dados e acessá-los</li>
            <li><strong>Correção:</strong> corrigir dados incompletos, inexatos ou desatualizados</li>
            <li><strong>Anonimização, Bloqueio ou Eliminação:</strong> solicitar a remoção de dados desnecessários ou excessivos</li>
            <li><strong>Portabilidade:</strong> solicitar seus dados em formato estruturado</li>
            <li><strong>Revogação de Consentimento:</strong> retirar seu consentimento a qualquer momento</li>
            <li><strong>Informação:</strong> saber com quem compartilhamos seus dados</li>
            <li><strong>Oposição:</strong> opor-se ao tratamento de dados</li>
          </ul>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Para exercer seus direitos, entre em contato através da nossa <router-link to="/contato" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">página de contato</router-link>.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-child text-blue-600 dark:text-blue-400 mr-3"></i>
            8. Menores de Idade
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Nossa aplicação não é destinada a menores de 18 anos. Não coletamos intencionalmente dados de menores sem o consentimento dos pais ou responsáveis legais. Se você acredita que coletamos dados de um menor, entre em contato conosco imediatamente.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-external-link-alt text-blue-600 dark:text-blue-400 mr-3"></i>
            9. Links Externos
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Nossa aplicação pode conter links para sites externos. Não somos responsáveis pelas práticas de privacidade ou pelo conteúdo desses sites. Recomendamos que você leia as políticas de privacidade de cada site que visitar.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-edit text-blue-600 dark:text-blue-400 mr-3"></i>
            10. Alterações nesta Política
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações significativas através de um aviso em nossa aplicação. A data de "Última atualização" no topo desta página indica quando a política foi revisada pela última vez.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-envelope text-blue-600 dark:text-blue-400 mr-3"></i>
            11. Contato
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Para dúvidas sobre esta Política de Privacidade ou exercer seus direitos:
          </p>
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
            <p class="text-gray-800 dark:text-gray-200 font-medium mb-2">
              <strong>Grupo 3w Online</strong>
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Desenvolvedora e responsável pela aplicação Seu Peso
            </p>
            <router-link 
              to="/contato" 
              class="inline-flex items-center mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <i class="fas fa-paper-plane mr-2"></i>
              Entre em Contato
            </router-link>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-balance-scale text-blue-600 dark:text-blue-400 mr-3"></i>
            12. Lei Aplicável
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Esta Política de Privacidade é regida pelas leis da República Federativa do Brasil, especialmente pela Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <div class="mt-12 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
          <div class="flex items-start space-x-3">
            <i class="fas fa-check-circle text-green-600 dark:text-green-400 text-2xl flex-shrink-0"></i>
            <div>
              <h3 class="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                Compromisso com Sua Privacidade
              </h3>
              <p class="text-green-700 dark:text-green-300 text-sm leading-relaxed">
                Seu Peso é uma ferramenta focada em privacidade. Todos os cálculos são processados localmente em seu dispositivo. Seus dados corporais não são enviados ou armazenados em servidores externos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <router-link 
          to="/termos"
          class="inline-flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          <i class="fas fa-file-contract mr-2"></i>
          Ver Termos de Uso
        </router-link>
        <router-link 
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          <i class="fas fa-home mr-2"></i>
          Voltar ao Início
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const lastUpdate = computed(() => {
  return new Date('2025-12-24').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})
</script>
