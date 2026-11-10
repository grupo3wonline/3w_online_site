<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <div class="inline-flex items-center px-5 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6">
          <i class="fas fa-envelope mr-2"></i>
          Fale Conosco
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Entre em Contato
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Tire suas dúvidas, envie sugestões ou descubra como podemos ajudar sua empresa
        </p>
      </div>

      <!-- Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Info Cards -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Card: Sobre a Empresa -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
            <div class="flex items-center mb-4">
              <div class="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <i class="fas fa-building text-white text-xl"></i>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Grupo 3w Online</h2>
            </div>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Empresa especializada em desenvolvimento de <strong>sites e sistemas personalizados sob demanda</strong>.
            </p>
            <div class="space-y-3">
              <div class="flex items-center text-gray-700 dark:text-gray-300">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Soluções sob medida</span>
              </div>
              <div class="flex items-center text-gray-700 dark:text-gray-300">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Design profissional</span>
              </div>
              <div class="flex items-center text-gray-700 dark:text-gray-300">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Suporte dedicado</span>
              </div>
            </div>
          </div>

          <!-- Card: Por Que Escolher -->
          <div class="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-xl text-white">
            <h3 class="text-xl font-bold mb-4 flex items-center">
              <i class="fas fa-star mr-2"></i>
              Por Que Nos Escolher?
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start">
                <i class="fas fa-rocket mr-3 mt-1 text-yellow-300"></i>
                <span>Desenvolvimento ágil e eficiente</span>
              </li>
              <li class="flex items-start">
                <i class="fas fa-shield-alt mr-3 mt-1 text-yellow-300"></i>
                <span>Segurança e qualidade garantidas</span>
              </li>
              <li class="flex items-start">
                <i class="fas fa-users mr-3 mt-1 text-yellow-300"></i>
                <span>Equipe experiente e dedicada</span>
              </li>
              <li class="flex items-start">
                <i class="fas fa-chart-line mr-3 mt-1 text-yellow-300"></i>
                <span>Foco em resultados mensuráveis</span>
              </li>
            </ul>
          </div>

          <!-- Card: Contato Rápido -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <i class="fas fa-info-circle text-blue-500 mr-2"></i>
              Informações
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex items-center text-gray-700 dark:text-gray-300">
                <i class="fas fa-clock text-indigo-500 mr-3"></i>
                <span>Atendimento 24/7</span>
              </div>
              <div class="flex items-center text-gray-700 dark:text-gray-300">
                <i class="fas fa-globe text-indigo-500 mr-3"></i>
                <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  www.3wonline.com.br
                </a>
              </div>
              <div class="flex items-center text-gray-700 dark:text-gray-300">
                <i class="fas fa-map-marker-alt text-indigo-500 mr-3"></i>
                <span>Atuação em todo Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form (Iframe) -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Envie sua Mensagem
              </h2>
              <p class="text-gray-600 dark:text-gray-400">
                Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.
              </p>
            </div>
            
            <!-- Freshdesk Iframe -->
            <div class="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <ContactIframe />
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
        <div class="max-w-3xl mx-auto">
          <i class="fas fa-rocket text-5xl mb-6"></i>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Transformar sua Ideia em Realidade?
          </h2>
          <p class="text-xl text-blue-100 mb-8">
            O <strong>Grupo 3w Online</strong> desenvolve soluções digitais personalizadas que 
            <strong>impulsionam seu negócio</strong> e superam suas expectativas.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              <i class="fas fa-globe mr-3"></i>
              Visite Nosso Site
              <i class="fas fa-external-link-alt ml-3"></i>
            </a>
            <button
              @click="scrollToForm"
              class="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-xl hover:bg-white hover:text-indigo-700 transform transition-all duration-200"
            >
              <i class="fas fa-envelope mr-3"></i>
              Enviar Mensagem
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/20">
            <div class="text-center">
              <i class="fas fa-users text-3xl mb-2"></i>
              <p class="font-bold text-2xl">100+</p>
              <p class="text-sm text-blue-200">Clientes Satisfeitos</p>
            </div>
            <div class="text-center">
              <i class="fas fa-project-diagram text-3xl mb-2"></i>
              <p class="font-bold text-2xl">250+</p>
              <p class="text-sm text-blue-200">Projetos Entregues</p>
            </div>
            <div class="text-center">
              <i class="fas fa-star text-3xl mb-2"></i>
              <p class="font-bold text-2xl">4.9/5</p>
              <p class="text-sm text-blue-200">Avaliação Média</p>
            </div>
            <div class="text-center">
              <i class="fas fa-clock text-3xl mb-2"></i>
              <p class="font-bold text-2xl">24/7</p>
              <p class="text-sm text-blue-200">Suporte Disponível</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import ContactIframe from '@/components/ContactIframe.vue';
import { useSEO } from '@/composables/useSEO';

export default {
  name: 'ContatoPage',
  components: {
    ContactIframe,
  },
  setup() {
    const { updateSEO } = useSEO();

    onMounted(() => {
      updateSEO({
        title: 'Contato - Calculadora de Rendimento Salarial | 3w Online',
        description: 'Entre em contato com o Grupo 3w Online. Desenvolvimento de sites e sistemas personalizados sob demanda. Tire suas dúvidas ou solicite um orçamento.',
        keywords: 'contato 3w online, desenvolvimento web, sistemas personalizados, orçamento site',
      });
    });

    const scrollToForm = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
      scrollToForm,
    };
  },
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
