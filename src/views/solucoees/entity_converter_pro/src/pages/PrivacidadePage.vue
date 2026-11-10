<script setup>
import { RouterLink } from 'vue-router'

const lastUpdate = '23 de Dezembro de 2025'
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient text-white py-16 md:py-20">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          <i class="fas fa-shield-alt mr-3"></i>
          Política de Privacidade
        </h1>
        <p class="text-xl font-light opacity-90">
          Última atualização: {{ lastUpdate }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-4xl mx-auto px-4">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          
          <!-- LGPD Badge -->
          <div class="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
            <p class="text-green-800 dark:text-green-200 m-0 flex items-start gap-3">
              <i class="fas fa-shield-alt text-2xl mt-1"></i>
              <span>
                <strong>Em conformidade com a LGPD</strong><br>
                Esta Política de Privacidade está em conformidade com a Lei Geral de Proteção de Dados Pessoais 
                (Lei nº 13.709/2018) e descreve como tratamos seus dados.
              </span>
            </p>
          </div>

          <!-- Important Notice -->
          <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
            <h3 class="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
              <i class="fas fa-exclamation-circle"></i>
              Importante: Não Coletamos Dados Pessoais
            </h3>
            <p class="text-blue-800 dark:text-blue-300 m-0">
              O Entity Converter Pro é uma ferramenta <strong>100% Client-Side</strong>. Todo o processamento de texto 
              é realizado localmente no seu navegador. <strong>Nenhum dado inserido na ferramenta é enviado para 
              servidores externos ou armazenado por nós.</strong>
            </p>
          </div>

          <!-- Section 1 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
            Quem Somos
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            O Entity Converter Pro é uma ferramenta desenvolvida e mantida pelo <strong>Grupo 3W Online</strong>, 
            empresa especializada em desenvolvimento de sites e sistemas personalizados sob demanda.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            Para questões relacionadas à privacidade, você pode entrar em contato através da nossa 
            <RouterLink to="/contato" class="text-blue-600 dark:text-blue-400 hover:underline">página de contato</RouterLink>.
          </p>

          <!-- Section 2 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
            Dados que NÃO Coletamos
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Diferente da maioria dos serviços online, o Entity Converter Pro <strong>não coleta</strong>:
          </p>
          <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Texto inserido na ferramenta de conversão</li>
            <li>Dados pessoais de identificação</li>
            <li>Endereço de e-mail</li>
            <li>Informações de localização precisa</li>
            <li>Dados de pagamento (a ferramenta é 100% gratuita)</li>
          </ul>

          <!-- Section 3 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
            Dados que Coletamos
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Para fins de melhoria da experiência e análise de uso, podemos coletar dados anônimos e agregados:
          </p>
          
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-4">3.1 Cookies Funcionais</h3>
          <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li><strong>cookie_consent:</strong> Armazena sua preferência de consentimento de cookies</li>
            <li><strong>theme:</strong> Armazena sua preferência de tema (claro/escuro)</li>
          </ul>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-4">3.2 Dados de Análise (Google Analytics)</h3>
          <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Páginas visitadas e tempo de permanência</li>
            <li>Tipo de dispositivo e navegador (informações técnicas anônimas)</li>
            <li>País/região de acesso (dados agregados, não precisos)</li>
            <li>Eventos de interação com a ferramenta (conversões, cópias)</li>
          </ul>

          <!-- Section 4 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
            Finalidade do Uso dos Dados
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Os dados anônimos coletados são utilizados exclusivamente para:
          </p>
          <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Melhorar a experiência do usuário e a interface da ferramenta</li>
            <li>Entender como os usuários utilizam a ferramenta</li>
            <li>Identificar e corrigir problemas técnicos</li>
            <li>Gerar estatísticas agregadas de uso</li>
          </ul>

          <!-- Section 5 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
            Cookies e Tecnologias Similares
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Utilizamos apenas cookies estritamente necessários e de análise:
          </p>
          
          <div class="overflow-x-auto mt-4">
            <table class="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead class="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Cookie</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Finalidade</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Duração</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-900">
                <tr class="border-t border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">cookie_consent</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Armazena preferência de cookies</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">1 ano</td>
                </tr>
                <tr class="border-t border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">theme</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Preferência de tema claro/escuro</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Permanente</td>
                </tr>
                <tr class="border-t border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">_ga / _gid</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Google Analytics (análise anônima)</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">2 anos / 24h</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Section 6 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">6</span>
            Seus Direitos (LGPD)
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
          </p>
          <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li><strong>Confirmação e Acesso:</strong> Confirmar se tratamos seus dados e acessá-los</li>
            <li><strong>Correção:</strong> Solicitar correção de dados incompletos ou desatualizados</li>
            <li><strong>Anonimização ou Exclusão:</strong> Solicitar anonimização ou exclusão de dados desnecessários</li>
            <li><strong>Portabilidade:</strong> Solicitar portabilidade dos seus dados</li>
            <li><strong>Revogação do Consentimento:</strong> Revogar o consentimento a qualquer momento</li>
            <li><strong>Oposição:</strong> Opor-se ao tratamento quando aplicável</li>
          </ul>
          <p class="text-gray-600 dark:text-gray-300 mt-4">
            Como não coletamos dados pessoais identificáveis, a maioria desses direitos não se aplica diretamente. 
            No entanto, você pode gerenciar os cookies do seu navegador a qualquer momento.
          </p>

          <!-- Section 7 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">7</span>
            Segurança dos Dados
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Implementamos medidas de segurança técnicas e organizacionais para proteger as informações:
          </p>
          <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Processamento 100% client-side (no seu navegador)</li>
            <li>Conexão segura via HTTPS</li>
            <li>Nenhum armazenamento de dados em servidores</li>
            <li>Código auditável e transparente</li>
          </ul>

          <!-- Section 8 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">8</span>
            Compartilhamento de Dados
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            <strong>Não compartilhamos, vendemos ou alugamos dados pessoais</strong> para terceiros. 
            Os únicos serviços terceirizados que utilizamos são:
          </p>
          <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li><strong>Google Analytics:</strong> Para análise anônima de uso (dados agregados)</li>
            <li><strong>Google Tag Manager:</strong> Para gerenciamento de tags de análise</li>
          </ul>

          <!-- Section 9 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">9</span>
            Alterações nesta Política
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas 
            nesta página com a data de atualização. Recomendamos que você revise esta política regularmente.
          </p>

          <!-- Section 10 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">10</span>
            Contato
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados, 
            entre em contato conosco:
          </p>

          <!-- Contact Box -->
          <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mt-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              <i class="fas fa-building text-blue-500 mr-2"></i>
              Grupo 3W Online
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Empresa desenvolvedora do Entity Converter Pro
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <RouterLink 
                to="/contato"
                class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <i class="fas fa-envelope"></i>
                Página de Contato
              </RouterLink>
              <a 
                href="https://www.3wonline.com.br" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <i class="fas fa-globe"></i>
                Nosso Website
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="py-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-4xl mx-auto px-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <RouterLink 
            to="/termos-de-uso"
            class="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-2"
          >
            <i class="fas fa-arrow-left"></i>
            Ver Termos de Uso
          </RouterLink>
          <RouterLink 
            to="/"
            class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-2"
          >
            <i class="fas fa-home"></i>
            Voltar ao Início
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
