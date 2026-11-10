<template>
  <div>
    <section class="relative py-12 lg:py-16 overflow-hidden">
      <div class="absolute inset-0 gradient-hero opacity-5"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <i class="fa-solid fa-file-lines"></i>
            Documento Legal
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Termos de Uso</h1>
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
                Bem-vindo à <strong>Calculadora Empresarial</strong>. Ao acessar e utilizar nosso site e ferramentas, você concorda com os termos e condições descritos abaixo. Por favor, leia atentamente antes de utilizar nossos serviços.
              </p>
            </div>

            <div v-for="secao in secoes" :key="secao.titulo" class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2">
                  <i :class="secao.icon" class="text-primary-600 dark:text-primary-400"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ secao.titulo }}</h2>
              </div>
              <!-- eslint-disable-next-line vue/no-v-html -- conteudo estatico e confiavel, definido no proprio componente (sem entrada do usuario) -->
              <div class="text-gray-600 dark:text-gray-400 space-y-3 pl-11" v-html="secao.conteudo"></div>
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
  title: 'Termos de Uso',
  description:
    'Termos de Uso da Calculadora Empresarial. Conheça as condições de utilização das nossas ferramentas gratuitas.',
  keywords: 'termos de uso, condições de uso, calculadora empresarial'
})

const secoes = [
  {
    icon: 'fa-solid fa-circle-check',
    titulo: '1. Aceitação dos Termos',
    conteudo: '<p>Ao acessar ou usar a Calculadora Empresarial, você confirma que leu, compreendeu e concorda em estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá usar nosso site.</p>'
  },
  {
    icon: 'fa-solid fa-file-lines',
    titulo: '2. Descrição do Serviço',
    conteudo: '<p>A Calculadora Empresarial oferece ferramentas online gratuitas para cálculos financeiros e empresariais, incluindo:</p><ul class="list-disc pl-5 space-y-1"><li>Calculadoras de juros compostos e simples</li><li>Ferramentas de precificação de produtos e serviços</li><li>Calculadoras de orçamento e marketing</li><li>Simuladores de parcelas e financiamentos</li><li>Calculadoras para profissionais autônomos e freelancers</li></ul>'
  },
  {
    icon: 'fa-solid fa-scale-balanced',
    titulo: '3. Uso Permitido',
    conteudo: '<p>Você pode usar nossas ferramentas para:</p><ul class="list-disc pl-5 space-y-1"><li>Realizar cálculos financeiros para uso pessoal ou profissional</li><li>Planejar orçamentos e preços para seu negócio</li><li>Simular cenários financeiros para tomada de decisão</li><li>Fins educacionais e de aprendizado</li></ul>'
  },
  {
    icon: 'fa-solid fa-ban',
    titulo: '4. Uso Proibido',
    conteudo: '<p>É expressamente proibido:</p><ul class="list-disc pl-5 space-y-1"><li>Usar o site para atividades ilegais ou fraudulentas</li><li>Tentar hackear, descompilar ou acessar partes restritas do sistema</li><li>Distribuir malware ou conteúdo malicioso</li><li>Copiar ou redistribuir o código-fonte sem autorização</li><li>Usar bots ou scripts automatizados de forma abusiva</li></ul>'
  },
  {
    icon: 'fa-solid fa-triangle-exclamation',
    titulo: '5. Isenção de Responsabilidade',
    conteudo: '<div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl mb-3"><p class="text-gray-900 dark:text-white"><strong>IMPORTANTE:</strong> As calculadoras são fornecidas apenas para fins informativos e educacionais. Os resultados são estimativas e não constituem aconselhamento financeiro, contábil ou jurídico profissional.</p></div><p>Recomendamos sempre consultar um profissional qualificado antes de tomar decisões importantes baseadas nos cálculos realizados nesta plataforma.</p><p>A Calculadora Empresarial e o Grupo 3W Online não se responsabilizam por:</p><ul class="list-disc pl-5 space-y-1"><li>Decisões tomadas com base nos cálculos realizados</li><li>Perdas financeiras diretas ou indiretas</li><li>Erros de entrada de dados pelo usuário</li><li>Indisponibilidade temporária do serviço</li></ul>'
  },
  {
    icon: 'fa-solid fa-shield-halved',
    titulo: '6. Propriedade Intelectual',
    conteudo: '<p>Todo o conteúdo do site, incluindo mas não limitado a textos, gráficos, logotipos, ícones, imagens, código-fonte e software, é propriedade do Grupo 3W Online ou de seus licenciadores e está protegido por leis de direitos autorais e propriedade intelectual.</p>'
  },
  {
    icon: 'fa-solid fa-arrows-rotate',
    titulo: '7. Alterações nos Termos',
    conteudo: '<p>Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Alterações significativas serão comunicadas através do site. O uso continuado do serviço após a publicação de alterações constitui aceitação dos novos termos.</p>'
  },
  {
    icon: 'fa-solid fa-envelope',
    titulo: '8. Contato',
    conteudo: '<p>Para dúvidas sobre estes Termos de Uso, entre em contato:</p><div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mt-2"><p><strong>Grupo 3W Online</strong><br>E-mail: contato@3wonline.com.br<br>Site: <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">www.3wonline.com.br</a></p></div>'
  },
  {
    icon: 'fa-solid fa-scale-balanced',
    titulo: '9. Lei Aplicável',
    conteudo: '<p>Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas serão resolvidas nos tribunais brasileiros competentes.</p>'
  }
]
</script>
