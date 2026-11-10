<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center space-x-3 mb-4">
          <i class="fas fa-file-contract text-4xl text-blue-600 dark:text-blue-400"></i>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
            Termos de Uso
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
            <i class="fas fa-handshake text-blue-600 dark:text-blue-400 mr-3"></i>
            1. Aceite dos Termos
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Ao acessar e usar a aplicação Seu Peso, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossa aplicação.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-laptop-medical text-blue-600 dark:text-blue-400 mr-3"></i>
            2. Descrição do Serviço
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Seu Peso é uma aplicação web gratuita que oferece ferramentas de cálculo relacionadas à saúde corporal, incluindo:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>Cálculo de Índice de Massa Corporal (IMC)</li>
            <li>Cálculo de Metabolismo Basal (TMB)</li>
            <li>Estimativa de Necessidades Calóricas Diárias</li>
            <li>Cálculo de Peso Ideal</li>
            <li>Estimativa de Necessidades Nutricionais (proteínas, carboidratos, gorduras)</li>
            <li>Cálculo de Gasto Calórico por Atividade</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400 mr-3"></i>
            3. Isenção de Responsabilidade Médica
          </h2>
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-6">
            <p class="text-gray-800 dark:text-gray-200 font-semibold mb-3">
              <i class="fas fa-exclamation-circle text-yellow-600 mr-2"></i>
              AVISO IMPORTANTE:
            </p>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Esta aplicação NÃO substitui consulta médica, nutricional ou orientação profissional de saúde.</strong></li>
              <li>Os cálculos fornecidos são estimativas baseadas em fórmulas padrão e podem não ser adequados para todos os indivíduos.</li>
              <li>Não somos responsáveis por decisões tomadas com base nas informações fornecidas pela aplicação.</li>
              <li>Para orientações personalizadas sobre saúde, nutrição e exercícios físicos, sempre consulte profissionais qualificados (médicos, nutricionistas, educadores físicos).</li>
              <li>Esta ferramenta é destinada apenas para fins informativos e educacionais.</li>
            </ul>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-user-check text-blue-600 dark:text-blue-400 mr-3"></i>
            4. Uso Adequado da Aplicação
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Você concorda em usar a aplicação apenas para fins lícitos e de acordo com estes Termos. Você NÃO deve:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>Usar a aplicação de maneira que possa danificar, desabilitar, sobrecarregar ou comprometer nossos servidores</li>
            <li>Tentar obter acesso não autorizado à aplicação, servidores ou redes conectadas</li>
            <li>Usar a aplicação para qualquer finalidade ilegal ou não autorizada</li>
            <li>Reproduzir, duplicar, copiar ou revender qualquer parte da aplicação sem autorização expressa</li>
            <li>Usar scripts automatizados para coletar informações ou interagir com a aplicação</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-copyright text-blue-600 dark:text-blue-400 mr-3"></i>
            5. Propriedade Intelectual
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Todo o conteúdo da aplicação, incluindo mas não limitado a:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>Textos, gráficos, logotipos, ícones, imagens</li>
            <li>Código-fonte e algoritmos de cálculo</li>
            <li>Design e layout da interface</li>
            <li>Marcas registradas e elementos de branding</li>
          </ul>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
            São de propriedade exclusiva do Grupo 3w Online e protegidos por leis de direitos autorais e propriedade intelectual do Brasil e internacionais.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-user-lock text-blue-600 dark:text-blue-400 mr-3"></i>
            6. Privacidade e Proteção de Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            O uso da aplicação também é regido por nossa <router-link to="/privacidade" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Política de Privacidade</router-link>, que descreve como coletamos, usamos e protegemos suas informações pessoais em conformidade com a LGPD (Lei Geral de Proteção de Dados).
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-ban text-blue-600 dark:text-blue-400 mr-3"></i>
            7. Limitação de Responsabilidade
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Na máxima extensão permitida pela lei aplicável:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>A aplicação é fornecida "como está" e "conforme disponível", sem garantias de qualquer tipo</li>
            <li>Não garantimos que a aplicação será ininterrupta, segura ou livre de erros</li>
            <li>Não somos responsáveis por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos</li>
            <li>Não nos responsabilizamos por decisões tomadas com base nos cálculos fornecidos</li>
            <li>Não garantimos a precisão, completude ou utilidade das informações fornecidas</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-link text-blue-600 dark:text-blue-400 mr-3"></i>
            8. Links para Sites de Terceiros
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Nossa aplicação pode conter links para sites de terceiros. Não temos controle sobre o conteúdo, políticas de privacidade ou práticas desses sites e não assumimos responsabilidade por eles. Recomendamos que você leia os termos e políticas de privacidade de qualquer site de terceiros que visitar.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-sync-alt text-blue-600 dark:text-blue-400 mr-3"></i>
            9. Modificações nos Termos
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Alterações significativas serão notificadas através da aplicação. O uso continuado da aplicação após tais modificações constitui sua aceitação dos novos termos.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-power-off text-blue-600 dark:text-blue-400 mr-3"></i>
            10. Suspensão e Término
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Reservamo-nos o direito de suspender ou encerrar seu acesso à aplicação a qualquer momento, sem aviso prévio, por violação destes Termos de Uso ou por qualquer outro motivo que julguemos apropriado.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-globe-americas text-blue-600 dark:text-blue-400 mr-3"></i>
            11. Disponibilidade e Manutenção
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Embora nos esforcemos para manter a aplicação disponível 24/7, podemos realizar manutenções programadas ou emergenciais que podem resultar em interrupções temporárias do serviço. Não garantimos disponibilidade ininterrupta.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-balance-scale text-blue-600 dark:text-blue-400 mr-3"></i>
            12. Lei Aplicável e Jurisdição
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Estes Termos de Uso são regidos e interpretados de acordo com as leis da República Federativa do Brasil. Qualquer disputa relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-envelope-open-text text-blue-600 dark:text-blue-400 mr-3"></i>
            13. Contato
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Para dúvidas, sugestões ou reclamações sobre estes Termos de Uso:
          </p>
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
            <p class="text-gray-800 dark:text-gray-200 font-medium mb-2">
              <strong>Grupo 3w Online</strong>
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-1">
              Responsável pela aplicação Seu Peso
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Desenvolvedora de sites e sistemas personalizados sob demanda
            </p>
            <router-link 
              to="/contato" 
              class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <i class="fas fa-comments mr-2"></i>
              Fale Conosco
            </router-link>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <i class="fas fa-file-alt text-blue-600 dark:text-blue-400 mr-3"></i>
            14. Disposições Gerais
          </h2>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>Se qualquer disposição destes Termos for considerada inválida, as demais disposições permanecerão em pleno vigor</li>
            <li>A falha em fazer cumprir qualquer disposição destes Termos não constituirá renúncia a tal direito</li>
            <li>Estes Termos constituem o acordo completo entre você e o Grupo 3w Online relativo ao uso da aplicação</li>
          </ul>
        </section>

        <div class="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <div class="flex items-start space-x-3">
            <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 text-2xl flex-shrink-0"></i>
            <div>
              <h3 class="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                Uso Responsável
              </h3>
              <p class="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                Ao usar o Seu Peso, você reconhece que esta é uma ferramenta educacional e informativa. Para orientações personalizadas sobre saúde, sempre consulte profissionais qualificados. Use esta aplicação de forma responsável e consciente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <router-link 
          to="/privacidade"
          class="inline-flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          <i class="fas fa-shield-alt mr-2"></i>
          Ver Política de Privacidade
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
