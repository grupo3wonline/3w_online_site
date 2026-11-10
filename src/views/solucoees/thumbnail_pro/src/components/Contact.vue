<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 transition-colors duration-200">
    <div class="max-w-7xl mx-auto">
      <!-- Hero Contact -->
      <div class="text-center mb-16 animate-fade-in">
        <div class="inline-flex items-center bg-youtube-red/10 px-4 py-2 rounded-full mb-4">
          <i class="fas fa-envelope text-youtube-red mr-2"></i>
          <span class="text-sm font-semibold text-youtube-red">Entre em Contato</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Fale <span class="text-gradient">Conosco</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Estamos aqui para ajudar! Entre em contato com o <strong>Grupo 3w Online</strong> para 
          <strong>transformar suas ideias</strong> em realidade digital
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 mb-16">
        <!-- Company Info -->
        <div class="space-y-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <i class="fas fa-building text-youtube-red mr-3"></i>
              Grupo 3w Online
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Somos especialistas em <strong>desenvolvimento de sites e sistemas personalizados sob demanda</strong>. 
              Com anos de experiência, oferecemos soluções completas e inovadoras para o seu negócio.
            </p>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-globe text-white"></i>
                </div>
                <div class="ml-4">
                  <h3 class="font-bold text-gray-900 dark:text-white mb-1">Website</h3>
                  <a 
                    href="https://www.3wonline.com.br" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-youtube-red hover:underline"
                  >
                    www.3wonline.com.br
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-envelope text-white"></i>
                </div>
                <div class="ml-4">
                  <h3 class="font-bold text-gray-900 dark:text-white mb-1">E-mail</h3>
                  <a 
                    href="mailto:contato@3wonline.com.br" 
                    class="text-youtube-red hover:underline"
                  >
                    contato@3wonline.com.br
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-map-marker-alt text-white"></i>
                </div>
                <div class="ml-4">
                  <h3 class="font-bold text-gray-900 dark:text-white mb-1">Localização</h3>
                  <p class="text-gray-600 dark:text-gray-400">Brasil</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-clock text-white"></i>
                </div>
                <div class="ml-4">
                  <h3 class="font-bold text-gray-900 dark:text-white mb-1">Horário de Atendimento</h3>
                  <p class="text-gray-600 dark:text-gray-400">Segunda a Sexta: 9h às 18h</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="bg-gradient-to-r from-youtube-red to-red-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 class="text-2xl font-bold mb-4 flex items-center">
              <i class="fas fa-share-alt mr-2"></i>
              Nossas Redes Sociais
            </h3>
            <p class="opacity-90 mb-6">
              Siga-nos e acompanhe nossos projetos, dicas e novidades!
            </p>
            <div class="flex flex-wrap gap-4">
              <a 
                href="https://www.linkedin.com/company/3wonline" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
              >
                <i class="fab fa-linkedin text-2xl mr-2"></i>
                LinkedIn
              </a>
              <a 
                href="https://github.com/3wonline" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
              >
                <i class="fab fa-github text-2xl mr-2"></i>
                GitHub
              </a>
              <a 
                href="https://www.facebook.com/3wonline" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
              >
                <i class="fab fa-facebook text-2xl mr-2"></i>
                Facebook
              </a>
              <a 
                href="https://www.instagram.com/3wonline" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
              >
                <i class="fab fa-instagram text-2xl mr-2"></i>
                Instagram
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            <i class="fas fa-paper-plane text-youtube-red mr-2"></i>
            Envie sua Mensagem
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível. 
            <strong>Resposta garantida em até 24 horas!</strong>
          </p>

          <ContactIframe />
        </div>
      </div>

      <!-- Services CTA -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-xl mb-16">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <i class="fas fa-rocket text-youtube-red mr-2"></i>
            Transforme Sua Visão em Realidade
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            O <strong>Grupo 3w Online</strong> oferece soluções completas para empresas que desejam 
            <strong>destacar-se no mundo digital</strong>
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300">
            <div class="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-laptop-code text-3xl text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Sites Profissionais</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Desenvolvimento de websites modernos, responsivos e otimizados para conversão
            </p>
          </div>

          <div class="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300">
            <div class="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-cogs text-3xl text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Sistemas Customizados</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Soluções sob medida para gestão, automação e otimização de processos
            </p>
          </div>

          <div class="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300">
            <div class="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-mobile-alt text-3xl text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Aplicativos Mobile</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Apps nativos e híbridos para iOS e Android com design intuitivo
            </p>
          </div>
        </div>

        <div class="text-center">
          <a 
            href="https://www.3wonline.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn-primary text-lg px-10 py-4 inline-flex items-center shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <i class="fas fa-briefcase mr-2"></i>
            Solicite um Orçamento Sem Compromisso
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">
            <i class="fas fa-check-circle text-green-500 mr-1"></i>
            Resposta em até 24 horas • Orçamento 100% gratuito
          </p>
        </div>
      </div>

      <!-- Why Choose Us -->
      <div class="bg-gradient-to-r from-youtube-red to-red-600 rounded-2xl p-12 text-white shadow-2xl">
        <h2 class="text-4xl font-bold mb-8 text-center">
          Por Que Escolher o Grupo 3w Online?
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-award text-5xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">Experiência Comprovada</h3>
            <p class="opacity-90 text-sm">Anos de mercado desenvolvendo soluções de sucesso</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-users text-5xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">Atendimento Personalizado</h3>
            <p class="opacity-90 text-sm">Suporte dedicado em todas as etapas do projeto</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-bolt text-5xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">Tecnologias Modernas</h3>
            <p class="opacity-90 text-sm">Utilizamos as melhores ferramentas do mercado</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-handshake text-5xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">Compromisso com Resultados</h3>
            <p class="opacity-90 text-sm">Seu sucesso é nossa prioridade número 1</p>
          </div>
        </div>

        <div class="text-center mt-10">
          <p class="text-2xl font-bold mb-4">
            <i class="fas fa-phone-alt mr-2"></i>
            Vamos conversar sobre seu projeto?
          </p>
          <p class="text-lg opacity-90">
            Entre em contato agora e descubra como podemos ajudar sua empresa a crescer!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactIframe from './ContactIframe.vue';

export default {
  name: 'Contact',
  components: {
    ContactIframe
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-bg {
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
