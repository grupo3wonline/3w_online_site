<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-12 px-4"
  >
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <i class="fas fa-comments text-purple-600"></i>
          Fale Conosco
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Entre em contato com o Grupo 3W Online. Estamos aqui para ajudar com
          suas dúvidas, sugestões ou projetos personalizados de sites e
          sistemas.
        </p>
      </div>

      <!-- Company Info -->
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              <i class="fas fa-building text-purple-600 mr-3"></i>
              Grupo 3W Online
            </h2>
            <p class="text-gray-700 leading-relaxed mb-6">
              Somos especializados no desenvolvimento de
              <strong>sites e sistemas personalizados sob demanda</strong>.
              Nossa missão é transformar suas ideias em soluções digitais
              inovadoras, eficientes e de alta qualidade.
            </p>

            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <i class="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                <div>
                  <h3 class="font-semibold text-gray-900">
                    Desenvolvimento Personalizado
                  </h3>
                  <p class="text-sm text-gray-600">
                    Sites, sistemas e aplicações web sob medida para seu negócio
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <i class="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                <div>
                  <h3 class="font-semibold text-gray-900">
                    Tecnologia de Ponta
                  </h3>
                  <p class="text-sm text-gray-600">
                    Utilizamos as mais modernas tecnologias do mercado
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <i class="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                <div>
                  <h3 class="font-semibold text-gray-900">Suporte Dedicado</h3>
                  <p class="text-sm text-gray-600">
                    Acompanhamento completo em todas as etapas do projeto
                  </p>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div
              class="mt-8 p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white"
            >
              <h3 class="text-xl font-bold mb-2">
                <i class="fas fa-rocket mr-2"></i>
                Pronto para transformar sua ideia em realidade?
              </h3>
              <p class="mb-4 text-purple-100">
                Desenvolva seu projeto conosco e alcance resultados
                extraordinários! Entre em contato agora e receba uma consultoria
                gratuita.
              </p>
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <i class="fas fa-external-link-alt mr-2"></i>
                Visite Nosso Site
              </a>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Contact Cards -->
            <div class="grid grid-cols-1 gap-4">
              <div
                class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200"
              >
                <div class="flex items-center space-x-3 mb-3">
                  <div
                    class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center"
                  >
                    <i class="fas fa-globe text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Website</h3>
                    <a
                      href="https://www.3wonline.com.br"
                      target="_blank"
                      class="text-purple-600 hover:text-purple-700 text-sm"
                    >
                      www.3wonline.com.br
                    </a>
                  </div>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200"
              >
                <div class="flex items-center space-x-3 mb-3">
                  <div
                    class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center"
                  >
                    <i class="fas fa-envelope text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Email</h3>
                    <p class="text-blue-600 text-sm">Resposta em até 24h</p>
                  </div>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200"
              >
                <div class="flex items-center space-x-3 mb-3">
                  <div
                    class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center"
                  >
                    <i class="fas fa-headset text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Suporte Técnico</h3>
                    <p class="text-green-600 text-sm">
                      Atendimento especializado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4">
              <div
                class="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100"
              >
                <div class="text-2xl font-bold text-purple-600">10+</div>
                <div class="text-xs text-gray-600">Anos de experiência</div>
              </div>
              <div
                class="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100"
              >
                <div class="text-2xl font-bold text-blue-600">200+</div>
                <div class="text-xs text-gray-600">Projetos entregues</div>
              </div>
              <div
                class="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100"
              >
                <div class="text-2xl font-bold text-green-600">100%</div>
                <div class="text-xs text-gray-600">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form with Freshdesk -->
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-3">
            <i class="fas fa-paper-plane text-purple-600 mr-3"></i>
            Envie sua Mensagem
          </h2>
          <p class="text-gray-600">
            Preencha o formulário abaixo e nossa equipe entrará em contato com
            você o mais breve possível.
          </p>
        </div>

        <!-- Freshdesk Iframe -->
        <div class="flex justify-center">
          <iframe
            title="Feedback Form"
            src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
            class="w-full h-[530px] border-0 rounded-xl shadow-lg"
            style="max-width: 900px"
          ></iframe>
        </div>
      </div>

      <!-- LGPD Notice -->
      <div
        class="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-600 p-6 rounded-xl"
      >
        <div class="flex items-start space-x-4">
          <i
            class="fas fa-shield-alt text-purple-600 text-3xl flex-shrink-0"
          ></i>
          <div class="flex-1">
            <h3 class="font-semibold text-purple-900 mb-2 text-lg">
              <i class="fas fa-lock mr-2"></i>
              Seus dados estão protegidos pela LGPD
            </h3>
            <p class="text-sm text-purple-800 leading-relaxed">
              Ao enviar este formulário, você concorda com nossa
              <router-link
                to="/privacidade"
                class="underline font-semibold hover:text-purple-900"
              >
                Política de Privacidade</router-link
              >. Seus dados serão utilizados apenas para responder à sua
              solicitação e não serão compartilhados com terceiros. Você pode
              solicitar a exclusão dos seus dados a qualquer momento. Garantimos
              total conformidade com a Lei Geral de Proteção de Dados (LGPD -
              Lei nº 13.709/2018).
            </p>
            <div class="mt-3 flex flex-wrap gap-4 text-xs text-purple-700">
              <span><i class="fas fa-check mr-1"></i>Dados criptografados</span>
              <span><i class="fas fa-check mr-1"></i>Armazenamento seguro</span>
              <span
                ><i class="fas fa-check mr-1"></i>Direito ao esquecimento</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="text-center space-y-4">
        <p class="text-sm text-gray-600">
          Ferramenta desenvolvida pelo <strong>Grupo 3W Online</strong> |
          Desenvolvedor: <strong>Hotwyl - Will from Brasil</strong>
        </p>
        <div
          class="flex justify-center items-center space-x-6 text-sm text-gray-500"
        >
          <span
            ><i class="fas fa-lock text-green-500 mr-2"></i>Dados
            protegidos</span
          >
          <span
            ><i class="fas fa-bolt text-yellow-500 mr-2"></i>Resposta
            rápida</span
          >
          <span
            ><i class="fas fa-gem text-purple-500 mr-2"></i>Suporte
            gratuito</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this view
</script>
