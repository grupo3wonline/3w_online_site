
<template>
  <section class="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 transition-colors duration-200">
    <div class="max-w-7xl mx-auto">
      <!-- Hero About -->
      <div class="text-center mb-16 animate-fade-in">
        <div class="inline-flex items-center bg-youtube-red/10 px-4 py-2 rounded-full mb-4">
          <i class="fas fa-building text-youtube-red mr-2"></i>
          <span class="text-sm font-semibold text-youtube-red">Conheça Nossa História</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Sobre o <span class="text-gradient">ThumbnailPro</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Desenvolvido pelo <strong>Grupo 3w Online</strong>, líder em soluções web personalizadas e inovadoras no Brasil
        </p>
      </div>

      <!-- Company Info -->
      <div class="grid md:grid-cols-2 gap-12 mb-16">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center">
              <i class="fas fa-building text-3xl text-white"></i>
            </div>
            <div class="ml-4">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Grupo 3w Online</h2>
              <p class="text-youtube-red font-semibold">Excelência em Desenvolvimento Web</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            O <strong>Grupo 3w Online</strong> é uma empresa brasileira especializada no desenvolvimento de 
            <strong>sites e sistemas personalizados sob demanda</strong>. Com anos de experiência no mercado, 
            oferecemos soluções tecnológicas inovadoras e de alta qualidade para empresas de todos os portes.
          </p>
          <a 
            href="https://www.3wonline.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn-primary inline-flex items-center"
          >
            <i class="fas fa-external-link-alt mr-2"></i>
            Visite o Grupo 3w Online
          </a>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <i class="fas fa-bullseye text-youtube-red mr-3"></i>
            Nossa Missão
          </h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Transformar ideias em realidade digital, fornecendo ferramentas e sistemas web que 
            <strong>facilitam o dia a dia</strong> de profissionais, criadores de conteúdo e empresas.
          </p>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <i class="fas fa-eye text-youtube-red mr-3"></i>
            Nossa Visão
          </h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Ser referência nacional em desenvolvimento de soluções web personalizadas, 
            reconhecidos pela <strong>qualidade, inovação e compromisso</strong> com nossos clientes.
          </p>
        </div>
      </div>

      <!-- Features & Functionalities -->
      <div class="mb-16">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <i class="fas fa-cogs text-youtube-red mr-2"></i>
            Funcionalidades do ThumbnailPro
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            Uma ferramenta completa e profissional para suas necessidades
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border-l-4 border-youtube-red">
            <i class="fas fa-download text-4xl text-youtube-red mb-4"></i>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Extração Instantânea</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Extraia thumbnails de qualquer vídeo público do YouTube em menos de 3 segundos com tecnologia otimizada.
            </p>
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-l-4 border-blue-500">
            <i class="fas fa-expand-arrows-alt text-4xl text-blue-500 mb-4"></i>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Múltiplas Resoluções</h3>
            <p class="text-gray-600 dark:text-gray-400">
              6 tamanhos disponíveis: de 120x90 até 1920x1080 (Full HD/4K). Escolha a resolução ideal para seu projeto.
            </p>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-l-4 border-green-500">
            <i class="fas fa-shield-alt text-4xl text-green-500 mb-4"></i>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">100% Seguro</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Não armazenamos dados. Processamento local e conforme LGPD. Sua privacidade é nossa prioridade.
            </p>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border-l-4 border-purple-500">
            <i class="fas fa-mobile-alt text-4xl text-purple-500 mb-4"></i>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Totalmente Responsivo</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Funciona perfeitamente em desktop, tablet e smartphone. Interface adaptativa e Mobile First.
            </p>
          </div>

          <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 border-l-4 border-yellow-500">
            <i class="fas fa-infinity text-4xl text-yellow-600 mb-4"></i>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Uso Ilimitado</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Sem limites de downloads. 100% gratuito para sempre. Sem taxas ocultas ou planos pagos.
            </p>
          </div>

          <div class="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl p-6 border-l-4 border-pink-500">
            <i class="fas fa-moon text-4xl text-pink-500 mb-4"></i>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Dark Mode</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Modo escuro integrado para conforto visual. Alterne entre temas claro e escuro facilmente.
            </p>
          </div>
        </div>
      </div>

      <!-- Services -->
      <div class="bg-gradient-to-r from-youtube-red to-red-600 rounded-3xl p-12 mb-16 text-white shadow-2xl">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">
            <i class="fas fa-code mr-2"></i>
            Serviços do Grupo 3w Online
          </h2>
          <p class="text-xl opacity-90">
            Desenvolvimento sob medida para o seu negócio
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
            <i class="fas fa-laptop-code text-4xl mb-4"></i>
            <h3 class="text-xl font-bold mb-2">Sites Personalizados</h3>
            <p class="opacity-90 text-sm">Websites profissionais, responsivos e otimizados para SEO</p>
          </div>

          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
            <i class="fas fa-shopping-cart text-4xl mb-4"></i>
            <h3 class="text-xl font-bold mb-2">E-commerce</h3>
            <p class="opacity-90 text-sm">Lojas virtuais completas com gestão integrada</p>
          </div>

          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
            <i class="fas fa-cogs text-4xl mb-4"></i>
            <h3 class="text-xl font-bold mb-2">Sistemas Web</h3>
            <p class="opacity-90 text-sm">Soluções customizadas para gestão empresarial</p>
          </div>

          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
            <i class="fas fa-mobile-alt text-4xl mb-4"></i>
            <h3 class="text-xl font-bold mb-2">Apps Mobile</h3>
            <p class="opacity-90 text-sm">Aplicativos nativos e híbridos para iOS e Android</p>
          </div>

          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
            <i class="fas fa-chart-line text-4xl mb-4"></i>
            <h3 class="text-xl font-bold mb-2">Marketing Digital</h3>
            <p class="opacity-90 text-sm">Estratégias para aumentar sua presença online</p>
          </div>

          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
            <i class="fas fa-tools text-4xl mb-4"></i>
            <h3 class="text-xl font-bold mb-2">Manutenção & Suporte</h3>
            <p class="opacity-90 text-sm">Suporte técnico contínuo e atualizações</p>
          </div>
        </div>

        <div class="text-center mt-10">
          <a 
            href="https://www.3wonline.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center bg-white text-youtube-red px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <i class="fas fa-rocket mr-2"></i>
            Solicite um Orçamento Gratuito
          </a>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-10 mb-16 shadow-xl">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          <i class="fas fa-layer-group text-youtube-red mr-2"></i>
          Tecnologias Utilizadas
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-4">
            <i class="fab fa-vuejs text-5xl text-green-500 mb-2"></i>
            <div class="font-semibold text-gray-900 dark:text-white">Vue.js 3</div>
          </div>
          <div class="p-4">
            <i class="fas fa-bolt text-5xl text-purple-500 mb-2"></i>
            <div class="font-semibold text-gray-900 dark:text-white">Vite</div>
          </div>
          <div class="p-4">
            <i class="fas fa-wind text-5xl text-cyan-500 mb-2"></i>
            <div class="font-semibold text-gray-900 dark:text-white">Tailwind CSS</div>
          </div>
          <div class="p-4">
            <i class="fab fa-js text-5xl text-yellow-500 mb-2"></i>
            <div class="font-semibold text-gray-900 dark:text-white">JavaScript</div>
          </div>
        </div>
      </div>

      <!-- Developer -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-xl">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          <i class="fas fa-user-tie text-youtube-red mr-2"></i>
          Desenvolvedor
        </h2>
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="flex-shrink-0">
            <div class="w-32 h-32 gradient-bg rounded-full flex items-center justify-center shadow-xl">
              <i class="fas fa-code text-6xl text-white"></i>
            </div>
          </div>
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-2xl font-bold text-youtube-red mb-2">HotWyl - willfrombrasil</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Desenvolvedor Full Stack especializado em soluções web modernas e escaláveis. 
              Apaixonado por criar ferramentas que facilitam a vida de criadores de conteúdo e profissionais.
            </p>
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="https://github.com/willfrombrasil" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center text-gray-700 dark:text-gray-300 hover:text-youtube-red dark:hover:text-youtube-red transition-colors"
              >
                <i class="fab fa-github text-2xl mr-2"></i>
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/willfrombrasil" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center text-gray-700 dark:text-gray-300 hover:text-youtube-red dark:hover:text-youtube-red transition-colors"
              >
                <i class="fab fa-linkedin text-2xl mr-2"></i>
                LinkedIn
              </a>
              <router-link 
                to="/contato"
                class="flex items-center text-gray-700 dark:text-gray-300 hover:text-youtube-red dark:hover:text-youtube-red transition-colors"
              >
                <i class="fas fa-envelope text-2xl mr-2"></i>
                Contato
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Final -->
      <div class="text-center mt-16">
        <div class="inline-block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Precisa de uma Solução Personalizada?
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Entre em contato com o Grupo 3w Online e transforme suas ideias em realidade!
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/contato" class="btn-primary inline-flex items-center justify-center">
              <i class="fas fa-envelope mr-2"></i>
              Fale Conosco
            </router-link>
            <a 
              href="https://www.3wonline.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn-secondary inline-flex items-center justify-center"
            >
              <i class="fas fa-external-link-alt mr-2"></i>
              Visite Nosso Site
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
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
