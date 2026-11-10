<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient text-white py-16 md:py-24">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <span class="inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-medium mb-4">
          <i class="fas fa-envelope mr-2"></i> Fale Conosco
        </span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
          Entre em Contato
        </h1>
        <p class="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
          Estamos prontos para ajudar você a transformar suas ideias em realidade
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12">
          
          <!-- Company Info -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              <i class="fas fa-building text-blue-500 mr-3"></i>
              Grupo 3W Online
            </h2>
            
            <p class="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Somos especialistas em <strong>desenvolvimento de sites e sistemas personalizados sob demanda</strong>. 
              Nossa equipe de profissionais experientes está pronta para transformar sua visão em soluções digitais de sucesso.
            </p>

            <!-- Services -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <i class="fas fa-cogs text-blue-500"></i>
                Nossos Serviços
              </h3>
              <ul class="space-y-3">
                <li class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i class="fas fa-check-circle text-green-500"></i>
                  Desenvolvimento de Sites Institucionais
                </li>
                <li class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i class="fas fa-check-circle text-green-500"></i>
                  E-commerce e Lojas Virtuais
                </li>
                <li class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i class="fas fa-check-circle text-green-500"></i>
                  Sistemas Web Personalizados
                </li>
                <li class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i class="fas fa-check-circle text-green-500"></i>
                  Aplicações Mobile
                </li>
                <li class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i class="fas fa-check-circle text-green-500"></i>
                  Integrações e APIs
                </li>
                <li class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <i class="fas fa-check-circle text-green-500"></i>
                  Consultoria em Tecnologia
                </li>
              </ul>
            </div>

            <!-- CTA Box -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
              <h3 class="text-xl font-bold mb-3">
                <i class="fas fa-lightbulb text-yellow-300 mr-2"></i>
                Transforme sua Ideia em Realidade!
              </h3>
              <p class="text-blue-100 mb-4">
                Não importa o tamanho do seu projeto, estamos prontos para ajudar. 
                <strong>Mais de 500 projetos entregues</strong> com excelência e satisfação garantida.
              </p>
              <p class="text-blue-100 mb-4 italic">
                "A confiança de nossos clientes é nosso maior patrimônio. 
                <strong>Junte-se a centenas de empresas</strong> que já transformaram seus negócios conosco."
              </p>
              <a 
                href="https://www.3wonline.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                <i class="fas fa-rocket"></i>
                Solicitar Orçamento Gratuito
              </a>
            </div>

            <!-- Social Proof -->
            <div class="mt-8 grid grid-cols-3 gap-4 text-center">
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <span class="block text-3xl font-bold text-blue-600 dark:text-blue-400">500+</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">Projetos Entregues</span>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <span class="block text-3xl font-bold text-green-600 dark:text-green-400">98%</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">Clientes Satisfeitos</span>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <span class="block text-3xl font-bold text-purple-600 dark:text-purple-400">10+</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">Anos de Experiência</span>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <i class="fas fa-paper-plane text-blue-500"></i>
                Envie sua Mensagem
              </h3>
              
              <!-- Freshdesk Widget -->
              <iframe
                title="Formulário de Contato"
                src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                class="w-full h-[530px] border-0 rounded-xl shadow-lg bg-white dark:bg-gray-700"
                style="max-width:900px;"
              ></iframe>

              <p class="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                <i class="fas fa-shield-alt text-green-500 mr-1"></i>
                Suas informações estão seguras e protegidas conforme a LGPD
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            <i class="fas fa-question-circle text-blue-500 mr-3"></i>
            Perguntas Frequentes
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </div>

        <div class="space-y-4">
          <details class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 cursor-pointer group">
            <summary class="font-bold text-gray-900 dark:text-white flex items-center justify-between">
              Quanto tempo leva para desenvolver um projeto?
              <i class="fas fa-chevron-down transition-transform group-open:rotate-180"></i>
            </summary>
            <p class="mt-4 text-gray-600 dark:text-gray-300">
              O prazo varia de acordo com a complexidade do projeto. Sites institucionais geralmente levam de 15 a 30 dias, 
              enquanto sistemas mais complexos podem levar de 2 a 6 meses. Sempre definimos prazos realistas e mantemos comunicação transparente.
            </p>
          </details>

          <details class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 cursor-pointer group">
            <summary class="font-bold text-gray-900 dark:text-white flex items-center justify-between">
              Vocês oferecem suporte após a entrega?
              <i class="fas fa-chevron-down transition-transform group-open:rotate-180"></i>
            </summary>
            <p class="mt-4 text-gray-600 dark:text-gray-300">
              Sim! Oferecemos suporte técnico e manutenção contínua para todos os projetos. 
              Temos planos mensais de manutenção para garantir que seu sistema esteja sempre atualizado e seguro.
            </p>
          </details>

          <details class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 cursor-pointer group">
            <summary class="font-bold text-gray-900 dark:text-white flex items-center justify-between">
              Como funciona o processo de orçamento?
              <i class="fas fa-chevron-down transition-transform group-open:rotate-180"></i>
            </summary>
            <p class="mt-4 text-gray-600 dark:text-gray-300">
              O orçamento é <strong>totalmente gratuito</strong>. Entre em contato pelo formulário acima, 
              descreva sua necessidade e nossa equipe entrará em contato em até 24 horas úteis com uma proposta personalizada.
            </p>
          </details>

          <details class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 cursor-pointer group">
            <summary class="font-bold text-gray-900 dark:text-white flex items-center justify-between">
              Quais tecnologias vocês utilizam?
              <i class="fas fa-chevron-down transition-transform group-open:rotate-180"></i>
            </summary>
            <p class="mt-4 text-gray-600 dark:text-gray-300">
              Trabalhamos com as tecnologias mais modernas do mercado: Vue.js, React, Node.js, Python, PHP, Laravel, 
              WordPress, e muito mais. Escolhemos a stack ideal para cada projeto.
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-16 md:py-24 bg-gray-800 text-white">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <i class="fas fa-handshake text-yellow-400 mr-3"></i>
          Vamos Trabalhar Juntos?
        </h2>
        <p class="text-xl text-gray-300 mb-8">
          Entre em contato agora e dê o primeiro passo para transformar seu negócio digitalmente!
        </p>
        <a 
          href="https://www.3wonline.com.br" 
          target="_blank" 
          rel="noopener noreferrer"
          class="cta-button bg-yellow-400 text-gray-900 hover:bg-yellow-300"
        >
          <i class="fas fa-rocket mr-2"></i>
          Solicitar Orçamento Gratuito
        </a>
      </div>
    </section>
  </div>
</template>
