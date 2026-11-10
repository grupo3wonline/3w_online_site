<template>
  <div>
    <section class="relative py-12 lg:py-16 overflow-hidden">
      <div class="absolute inset-0 gradient-hero opacity-5"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <i class="fa-solid fa-shield-halved"></i>
            LGPD - Lei Geral de Proteção de Dados
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Política de Privacidade</h1>
          <p class="text-gray-600 dark:text-gray-400">Última atualização: 14 de Janeiro de 2026</p>
        </div>
      </div>
    </section>

    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="card p-8 lg:p-12 space-y-8">
            <div class="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border-l-4 border-primary-600">
              <p class="text-gray-900 dark:text-white">
                A <strong>Calculadora Empresarial</strong>, desenvolvida pelo <strong>Grupo 3W Online</strong>, está comprometida com a proteção da sua privacidade e dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-eye text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">1. Dados Coletados</h2></div>
              <div class="text-gray-600 dark:text-gray-400 space-y-3 pl-11">
                <p>Coletamos apenas os dados estritamente necessários:</p>
                <h3 class="font-semibold text-gray-900 dark:text-white">1.1 Dados de Navegação</h3>
                <ul class="list-disc pl-5 space-y-1"><li>Endereço IP (anonimizado)</li><li>Tipo de navegador e dispositivo</li><li>Páginas visitadas e tempo de permanência</li><li>Data e hora de acesso</li></ul>
                <h3 class="font-semibold text-gray-900 dark:text-white">1.2 Dados nas Calculadoras</h3>
                <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl"><p class="text-gray-900 dark:text-white"><strong>IMPORTANTE:</strong> Os dados inseridos nas calculadoras são processados localmente no seu navegador e <strong>NÃO são enviados aos nossos servidores</strong>.</p></div>
                <h3 class="font-semibold text-gray-900 dark:text-white">1.3 Dados de Contato</h3>
                <ul class="list-disc pl-5 space-y-1"><li>Nome e e-mail (quando envia mensagem)</li><li>Mensagem de contato</li></ul>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-database text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">2. Finalidade do Tratamento</h2></div>
              <div class="text-gray-600 dark:text-gray-400 pl-11"><ul class="list-disc pl-5 space-y-1"><li><strong>Melhorar o serviço:</strong> Análise de uso</li><li><strong>Estatísticas:</strong> Comportamento agregado</li><li><strong>Suporte:</strong> Responder solicitações</li><li><strong>Segurança:</strong> Prevenir fraudes</li></ul></div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-lock text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">3. Base Legal (LGPD)</h2></div>
              <div class="text-gray-600 dark:text-gray-400 pl-11"><ul class="list-disc pl-5 space-y-1"><li><strong>Consentimento (Art. 7º, I):</strong> Aceite de cookies</li><li><strong>Legítimo interesse (Art. 7º, IX):</strong> Melhoria do serviço</li><li><strong>Execução de contrato (Art. 7º, V):</strong> Responder solicitações</li></ul></div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-user-check text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">4. Seus Direitos (LGPD)</h2></div>
              <div class="text-gray-600 dark:text-gray-400 space-y-3 pl-11">
                <div class="grid md:grid-cols-2 gap-3">
                  <div v-for="d in direitos" :key="d.titulo" class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl"><p class="font-semibold text-gray-900 dark:text-white text-sm">{{ d.titulo }}</p><p class="text-sm">{{ d.desc }}</p></div>
                </div>
                <p>Contato: <a href="mailto:contato@3wonline.com.br" class="text-primary-600 dark:text-primary-400 hover:underline">contato@3wonline.com.br</a></p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-cookie-bite text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">5. Cookies e Tecnologias</h2></div>
              <div class="text-gray-600 dark:text-gray-400 space-y-3 pl-11">
                <h3 class="font-semibold text-gray-900 dark:text-white">Essenciais</h3>
                <ul class="list-disc pl-5 space-y-1"><li>Preferência de tema</li><li>Consentimento de cookies</li></ul>
                <h3 class="font-semibold text-gray-900 dark:text-white">Análise</h3>
                <ul class="list-disc pl-5 space-y-1"><li>Google Analytics 4</li><li>Google Tag Manager</li></ul>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-share-nodes text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">6. Compartilhamento de Dados</h2></div>
              <div class="text-gray-600 dark:text-gray-400 pl-11"><p><strong>Não vendemos seus dados.</strong> Compartilhamos apenas quando exigido por lei, necessário para serviços essenciais, ou com seu consentimento.</p></div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-lock text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">7. Segurança dos Dados</h2></div>
              <div class="text-gray-600 dark:text-gray-400 pl-11"><ul class="list-disc pl-5 space-y-1"><li>Conexão HTTPS/SSL</li><li>Processamento local nas calculadoras</li><li>Anonimização de dados analíticos</li><li>Acesso restrito</li></ul></div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-arrows-rotate text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">8. Retenção de Dados</h2></div>
              <div class="text-gray-600 dark:text-gray-400 pl-11"><ul class="list-disc pl-5 space-y-1"><li>Navegação: 26 meses</li><li>Contato: enquanto necessário</li><li>Logs: 6 meses</li></ul></div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-2"><i class="fa-solid fa-circle-exclamation text-yellow-600 dark:text-yellow-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">9. Menores de Idade</h2></div>
              <div class="text-gray-600 dark:text-gray-400 pl-11"><p>Serviço não direcionado a menores de 18 anos.</p></div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-arrows-rotate text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">10. Alterações nesta Política</h2></div>
              <div class="text-gray-600 dark:text-gray-400 pl-11"><p>Pode ser atualizada periodicamente. Alterações serão comunicadas pelo site.</p></div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-envelope text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">11. Contato do DPO</h2></div>
              <div class="text-gray-600 dark:text-gray-400 pl-11"><div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl"><p><strong class="text-gray-900 dark:text-white">Grupo 3W Online</strong><br>E-mail: contato@3wonline.com.br<br>Site: <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">www.3wonline.com.br</a></p></div></div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3"><div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2"><i class="fa-solid fa-scale-balanced text-primary-600 dark:text-primary-400"></i></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">12. Autoridade de Proteção de Dados</h2></div>
              <div class="text-gray-600 dark:text-gray-400 pl-11"><div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl"><p><strong class="text-gray-900 dark:text-white">ANPD</strong><br>Site: <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">www.gov.br/anpd</a></p></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Política de Privacidade',
  description:
    'Política de Privacidade da Calculadora Empresarial em conformidade com LGPD, GDPR, CCPA e POPIA. Seus dados são processados localmente no navegador.',
  keywords: 'política de privacidade, lgpd, gdpr, ccpa, popia, proteção de dados'
})

const direitos = [
  { titulo: 'Acesso', desc: 'Saber quais dados temos sobre você' },
  { titulo: 'Correção', desc: 'Solicitar correção de dados incorretos' },
  { titulo: 'Exclusão', desc: 'Solicitar eliminação dos seus dados' },
  { titulo: 'Portabilidade', desc: 'Receber dados em formato estruturado' },
  { titulo: 'Revogação', desc: 'Retirar consentimento a qualquer momento' },
  { titulo: 'Oposição', desc: 'Se opor ao tratamento em certas situações' },
  { titulo: 'Informação', desc: 'Saber com quem compartilhamos dados' },
  { titulo: 'Revisão', desc: 'Contestar decisões automatizadas' }
]
</script>
