<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 md:py-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 md:mb-16 animate-fadeIn">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-6"
        >
          <i class="fas fa-envelope"></i>
          <span>Fale Conosco</span>
        </div>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Como Podemos
          <span
            class="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent block mt-2"
          >
            Ajudar Você?
          </span>
        </h1>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Envie sua mensagem, sugestão ou dúvida. Nossa equipe está pronta para atendê-lo!
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 items-start">
        <!-- Contact Form with Iframe -->
        <BaseCard class="p-6 md:p-8 animate-slideUp">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <i class="fas fa-paper-plane text-primary-600"></i>
            Enviar Mensagem
          </h2>

          <div class="mb-6">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas.
            </p>
          </div>

          <!-- Freshdesk Iframe -->
          <div class="w-full flex justify-center my-6">
            <iframe
              title="Formulário de Feedback"
              src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
              class="w-full h-[530px] border-0 rounded-xl shadow-lg"
              style="max-width:100%;"
            ></iframe>
          </div>

          <!-- LGPD Consent -->
          <div
            class="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
          >
            <div class="flex items-start gap-3">
              <i class="fas fa-shield-alt text-blue-600 dark:text-blue-400 text-xl flex-shrink-0 mt-0.5"></i>
              <div class="text-sm text-gray-700 dark:text-gray-300">
                <p class="font-semibold mb-2">🔒 Proteção de Dados (LGPD)</p>
                <p class="leading-relaxed">
                  Ao enviar este formulário, você concorda com nossa
                  <router-link
                    to="/politica-de-privacidade"
                    class="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                  >
                    Política de Privacidade
                  </router-link>
                  e
                  <router-link
                    to="/termos-de-uso"
                    class="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                  >
                    Termos de Uso </router-link
                  >. Seus dados são 100% seguros e serão utilizados apenas para responder sua mensagem.
                </p>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Contact Info & Company Info -->
        <div class="space-y-6 animate-slideUp" style="animation-delay: 0.1s">
          
          <!-- Grupo 3w Online Info -->
          <BaseCard class="p-6 md:p-8 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 border-2 border-primary-200 dark:border-primary-900">
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <i class="fas fa-building text-3xl text-white"></i>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Grupo 3w Online
              </h3>
              <p class="text-primary-600 dark:text-primary-400 font-semibold">
                Desenvolvimento de Sites e Sistemas Personalizados
              </p>
            </div>

            <div class="space-y-4 mb-6">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                Somos especialistas em criar <strong>soluções digitais sob medida</strong> para empresas e profissionais que buscam excelência tecnológica e resultados reais.
              </p>

              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                <h4 class="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <i class="fas fa-check-circle text-green-500"></i>
                  Nossos Serviços:
                </h4>
                <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex items-start gap-2">
                    <i class="fas fa-laptop-code text-primary-600 mt-1"></i>
                    <span><strong>Sites Profissionais:</strong> Institucionais, Landing Pages, E-commerce</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i class="fas fa-cogs text-primary-600 mt-1"></i>
                    <span><strong>Sistemas Web:</strong> ERPs, CRMs, Plataformas Personalizadas</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i class="fas fa-mobile-alt text-primary-600 mt-1"></i>
                    <span><strong>Aplicativos:</strong> Progressive Web Apps (PWA) e Mobile</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i class="fas fa-chart-line text-primary-600 mt-1"></i>
                    <span><strong>Consultoria:</strong> Estratégia Digital e Otimização</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- CTA Persuasivo -->
            <div class="bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl p-6 text-white text-center shadow-xl">
              <h4 class="text-xl font-bold mb-3">
                <i class="fas fa-rocket"></i>
                Transforme Sua Presença Digital!
              </h4>
              <p class="mb-4 text-blue-100 text-sm leading-relaxed">
                Mais de <strong class="text-white">500 projetos entregues</strong> com excelência. 
                Sua empresa merece uma solução digital de alto nível!
              </p>
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i class="fas fa-external-link-alt"></i>
                Conheça Nosso Portfólio
              </a>
              <p class="mt-4 text-xs text-blue-200">
                <i class="fas fa-shield-alt"></i>
                Garantia de qualidade | Suporte especializado | Prazos cumpridos
              </p>
            </div>
          </BaseCard>

          <!-- Contact Cards -->
          <BaseCard class="p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-globe text-primary-600 dark:text-primary-400 text-xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 dark:text-white mb-1">
                  Website
                </h3>
                <a
                  href="https://www.3wonline.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary-600 dark:text-primary-400 hover:underline break-all"
                >
                  www.3wonline.com.br
                </a>
              </div>
            </div>
          </BaseCard>

          <BaseCard class="p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-envelope text-green-600 dark:text-green-400 text-xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 dark:text-white mb-1">
                  E-mail
                </h3>
                <a
                  href="mailto:contato@3wonline.com.br"
                  class="text-primary-600 dark:text-primary-400 hover:underline break-all"
                >
                  contato@3wonline.com.br
                </a>
              </div>
            </div>
          </BaseCard>

          <BaseCard class="p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-headset text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 dark:text-white mb-1">
                  Suporte
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  Atendimento de segunda a sexta<br />
                  Das 9h às 18h (Horário de Brasília)
                </p>
              </div>
            </div>
          </BaseCard>

          <!-- Social Links -->
          <BaseCard class="p-6">
            <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fas fa-share-alt text-primary-600"></i>
              Redes Sociais
            </h3>
            <div class="flex gap-3">
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 bg-gray-100 dark:bg-gray-800 hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Website"
                title="Website Grupo 3w Online"
              >
                <i class="fas fa-globe text-lg"></i>
              </a>
              <a
                href="mailto:contato@3wonline.com.br"
                class="w-12 h-12 bg-gray-100 dark:bg-gray-800 hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Email"
                title="Email"
              >
                <i class="fas fa-envelope text-lg"></i>
              </a>
            </div>
          </BaseCard>

          <!-- Why Choose Us -->
          <BaseCard class="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
            <h3 class="font-bold text-gray-900 dark:text-white mb-4 text-xl flex items-center gap-2">
              <i class="fas fa-star text-yellow-500"></i>
              Por Que Escolher a 3w Online?
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <i class="fas fa-check-circle text-green-600 mt-1 flex-shrink-0"></i>
                <span><strong>+10 anos</strong> de experiência em desenvolvimento web</span>
              </li>
              <li class="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <i class="fas fa-check-circle text-green-600 mt-1 flex-shrink-0"></i>
                <span><strong>+500 projetos</strong> entregues com sucesso</span>
              </li>
              <li class="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <i class="fas fa-check-circle text-green-600 mt-1 flex-shrink-0"></i>
                <span><strong>Suporte dedicado</strong> durante e após o projeto</span>
              </li>
              <li class="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <i class="fas fa-check-circle text-green-600 mt-1 flex-shrink-0"></i>
                <span><strong>Tecnologias modernas</strong> e atualizadas</span>
              </li>
              <li class="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <i class="fas fa-check-circle text-green-600 mt-1 flex-shrink-0"></i>
                <span><strong>Preços justos</strong> e transparentes</span>
              </li>
            </ul>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useSEO } from "@/composables/useSEO";
import BaseCard from "@/components/ui/BaseCard.vue";

const { setSEO } = useSEO();

onMounted(() => {
  setSEO({
    title: "Contato - Fale Conosco | InvestSim",
    description:
      "Entre em contato com a equipe InvestSim e Grupo 3w Online. Desenvolvimento de sites e sistemas personalizados sob demanda.",
    keywords: "contato investsim, suporte, 3w online, desenvolvimento web, sites personalizados, sistemas sob medida",
  });
});
</script>
