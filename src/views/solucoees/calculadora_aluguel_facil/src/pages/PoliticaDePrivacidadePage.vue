<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

useHead({
  title: 'Política de Privacidade - LGPD, GDPR, CCPA e POPIA | Calculadora Aluguel Fácil',
  meta: [{ name: 'description', content: 'Política de Privacidade da Calculadora Aluguel Fácil em conformidade com LGPD, GDPR, CCPA e POPIA. Saiba como tratamos seus dados pessoais.' }]
})

const lastUpdate = '01 de janeiro de 2025'
</script>

<template>
  <div class="container py-8">
    <Breadcrumb :items="[{ label: 'Política de Privacidade' }]" />

    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="section-title mb-4">Política de Privacidade</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Última atualização: {{ lastUpdate }} — Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)
        </p>
      </div>

      <div class="card p-8 prose prose-gray dark:prose-invert max-w-none">
        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Introdução</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            O Grupo 3W Online ("nós", "nosso"), responsável pela Calculadora Aluguel Fácil ("Plataforma"),
            está comprometido com a proteção da privacidade dos usuários. Esta Política de Privacidade
            descreve como coletamos, utilizamos, armazenamos e protegemos informações em conformidade com
            a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Controlador de Dados</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            O controlador dos dados pessoais tratados por esta Plataforma é o Grupo 3W Online.
            Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais,
            entre em contato através da nossa
            <router-link to="/#contato" class="text-primary-600 dark:text-primary-400 hover:underline">página de contato</router-link>.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Dados Coletados</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            A Calculadora Aluguel Fácil foi projetada para funcionar com o mínimo de coleta de dados pessoais:
          </p>

          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">3.1 Dados NÃO coletados</h3>
          <ul class="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400 mb-4">
            <li>Dados inseridos nas calculadoras (valores de imóveis, rendas, etc.) — processados localmente no navegador</li>
            <li>Dados de identificação pessoal (nome, CPF, endereço) — não solicitamos cadastro</li>
            <li>Dados financeiros sensíveis — nenhuma integração com sistemas bancários</li>
          </ul>

          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">3.2 Dados coletados automaticamente</h3>
          <ul class="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400 mb-4">
            <li>Dados de navegação: endereço IP, tipo de navegador, sistema operacional, páginas visitadas</li>
            <li>Cookies técnicos: preferências de tema (claro/escuro), aceite de cookies</li>
            <li>Dados de uso: páginas acessadas, tempo de permanência, ferramentas utilizadas</li>
          </ul>

          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">3.3 Dados fornecidos voluntariamente</h3>
          <ul class="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>
              Contato direto: ao nos contatar por WhatsApp ou e-mail, você compartilha voluntariamente os dados
              que decidir enviar (como nome e a mensagem). Não utilizamos formulário nesta Plataforma.
            </li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Finalidade do Tratamento</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Os dados coletados são utilizados para as seguintes finalidades:
          </p>
          <ul class="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li><strong>Funcionamento da Plataforma:</strong> garantir a operação técnica e segurança</li>
            <li><strong>Melhoria do serviço:</strong> entender como os usuários utilizam as ferramentas para aprimorá-las</li>
            <li><strong>Análise estatística:</strong> dados agregados e anônimos para métricas de uso</li>
            <li><strong>Comunicação:</strong> responder mensagens enviadas por WhatsApp ou e-mail</li>
            <li><strong>Cumprimento de obrigações legais:</strong> atendimento a requisições judiciais quando aplicável</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Base Legal (Art. 7º, LGPD)</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            O tratamento de dados pessoais nesta Plataforma fundamenta-se nas seguintes bases legais:
          </p>
          <ul class="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li><strong>Consentimento (Art. 7º, I):</strong> para cookies não essenciais e comunicações</li>
            <li><strong>Legítimo interesse (Art. 7º, IX):</strong> para análise de uso e melhoria da Plataforma</li>
            <li><strong>Cumprimento de obrigação legal (Art. 7º, II):</strong> quando exigido por lei</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Cookies</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Utilizamos os seguintes tipos de cookies:
          </p>
          <ul class="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li><strong>Cookies essenciais:</strong> necessários para o funcionamento básico (preferência de tema, aceite de cookies)</li>
            <li><strong>Cookies analíticos:</strong> utilizados para entender padrões de uso (dados agregados e anônimos)</li>
          </ul>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
            Você pode gerenciar suas preferências de cookies a qualquer momento através das configurações do seu navegador.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Compartilhamento de Dados</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Não vendemos, alugamos ou compartilhamos dados pessoais com terceiros para fins de marketing.
            Os dados podem ser compartilhados apenas com:
          </p>
          <ul class="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li><strong>Google Analytics / Tag Manager:</strong> métricas de uso agregadas e anônimas</li>
            <li><strong>Serviços de hospedagem:</strong> armazenamento técnico da Plataforma</li>
            <li><strong>Autoridades competentes:</strong> quando exigido por lei ou ordem judicial</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Segurança dos Dados</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Adotamos medidas técnicas e organizacionais para proteger os dados, incluindo:
          </p>
          <ul class="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Comunicação criptografada via HTTPS/SSL</li>
            <li>Processamento local dos cálculos (dados não trafegam para servidores)</li>
            <li>Acesso restrito aos dados por pessoal autorizado</li>
            <li>Monitoramento contínuo de vulnerabilidades</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Direitos do Titular (Art. 18, LGPD)</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Em conformidade com a LGPD, você tem os seguintes direitos:
          </p>
          <ul class="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Confirmação da existência de tratamento de dados</li>
            <li>Acesso aos dados pessoais tratados</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
            <li>Portabilidade dos dados a outro fornecedor de serviço</li>
            <li>Eliminação dos dados tratados com consentimento</li>
            <li>Informação sobre com quem os dados são compartilhados</li>
            <li>Revogação do consentimento</li>
          </ul>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
            Para exercer qualquer um desses direitos, entre em contato através da nossa
            <router-link to="/#contato" class="text-primary-600 dark:text-primary-400 hover:underline">página de contato</router-link>.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            9.1 Conformidade Internacional (GDPR, CCPA e POPIA)
          </h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Além da LGPD, respeitamos as principais legislações globais de privacidade. Como os cálculos
            são realizados no próprio navegador e não exigimos cadastro, o tratamento de dados pessoais é
            mínimo e restrito a métricas anônimas e preferências locais.
          </p>
          <ul class="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>
              <strong>GDPR (União Europeia):</strong> garantimos os direitos de acesso, retificação,
              apagamento ("direito ao esquecimento"), portabilidade e oposição ao tratamento, além do
              consentimento explícito para cookies não essenciais.
            </li>
            <li>
              <strong>CCPA/CPRA (Califórnia, EUA):</strong> você tem o direito de saber quais dados são
              coletados, solicitar sua exclusão e optar por não ter dados "vendidos" — ressaltando que
              <strong>não vendemos dados pessoais</strong>.
            </li>
            <li>
              <strong>POPIA (África do Sul):</strong> tratamos os dados de forma lícita, mínima e
              transparente, assegurando os direitos de acesso, correção e exclusão previstos na lei.
            </li>
          </ul>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
            Para exercer qualquer desses direitos, independentemente da sua localização, basta nos
            contatar por WhatsApp ou e-mail na seção de contato.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">10. Retenção de Dados</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Os dados são retidos pelo tempo necessário para cumprir as finalidades descritas nesta política:
          </p>
          <ul class="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Dados de navegação: até 12 meses</li>
            <li>Dados de contato: até o encerramento da comunicação ou solicitação de exclusão</li>
            <li>Cookies: conforme validade definida em cada cookie</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">11. Menores de Idade</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            A Plataforma não é direcionada a menores de 18 anos. Não coletamos intencionalmente dados
            de menores. Como não exigimos cadastro, não temos como verificar a idade dos usuários.
            Caso identifiquemos coleta acidental de dados de menores, estes serão imediatamente eliminados.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">12. Alterações nesta Política</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Esta Política de Privacidade pode ser atualizada periodicamente. Alterações significativas
            serão comunicadas através de aviso na Plataforma. A data da última atualização será sempre
            indicada no topo deste documento.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">13. Contato e Encarregado de Dados</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Para questões relacionadas à privacidade e proteção de dados, entre em contato com nosso
            Encarregado de Dados (DPO) através da
            <router-link to="/#contato" class="text-primary-600 dark:text-primary-400 hover:underline">página de contato</router-link>
            ou visite
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">www.3wonline.com.br</a>.
          </p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
            Caso considere que o tratamento de dados pessoais viola a LGPD, você pode apresentar
            reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
