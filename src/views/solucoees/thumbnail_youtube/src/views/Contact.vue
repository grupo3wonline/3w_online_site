<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-block p-4 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <i class="fas fa-envelope text-5xl text-red-600 dark:text-red-500"></i>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Entre em Contato</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Tem dúvidas, sugestões ou precisa de ajuda? Estamos aqui para você!
        </p>
      </div>

      <!-- Informações da Empresa -->
      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 mb-8">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            <i class="fas fa-building text-red-600 dark:text-red-500 mr-3"></i>
            Grupo 3w Online
          </h2>
          <p class="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Especialistas em <strong>desenvolvimento de sites e sistemas personalizados sob demanda</strong>. 
            Transformamos suas ideias em soluções digitais de alto impacto!
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div class="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
            <i class="fas fa-code text-4xl text-red-600 dark:text-red-500 mb-4"></i>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">Desenvolvimento Web</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Sites modernos e responsivos</p>
          </div>
          
          <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
            <i class="fas fa-laptop-code text-4xl text-blue-600 dark:text-blue-500 mb-4"></i>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">Sistemas Personalizados</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Soluções sob medida</p>
          </div>
          
          <div class="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
            <i class="fas fa-mobile-alt text-4xl text-green-600 dark:text-green-500 mb-4"></i>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">Aplicações Web</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">PWAs e SPAs otimizadas</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-900 dark:to-red-800 rounded-2xl p-8 text-center text-white">
          <h3 class="text-2xl font-bold mb-4">
            <i class="fas fa-rocket mr-2"></i>
            Pronto Para Transformar Seu Negócio?
          </h3>
          <p class="text-lg mb-6 text-red-100">
            Conte com nossa expertise para criar a solução perfeita para sua empresa. 
            Agende uma conversa e descubra como podemos ajudar!
          </p>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <i class="fas fa-external-link-alt mr-3"></i>
            Visite Nosso Site
            <i class="fas fa-arrow-right ml-3"></i>
          </a>
        </div>
      </div>

      <!-- Formulário de Contato (Iframe) -->
      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            <i class="fas fa-comments text-red-600 dark:text-red-500 mr-3"></i>
            Fale Conosco
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Preencha o formulário abaixo e nossa equipe entrará em contato em breve
          </p>
        </div>

        <div class="flex justify-center">
          <iframe
            title="Formulário de Contato - Grupo 3w Online"
            src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
            class="w-full h-[530px] border-0 rounded-xl shadow-lg dark:shadow-gray-900"
            style="max-width:900px;"
            loading="lazy"
          ></iframe>
        </div>

        <!-- Informações Adicionais -->
        <div class="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <i class="fas fa-headset text-3xl text-red-600 dark:text-red-500 mb-3"></i>
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">Suporte Rápido</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Respondemos em até 24h</p>
            </div>
            
            <div>
              <i class="fas fa-shield-check text-3xl text-green-600 dark:text-green-500 mb-3"></i>
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">Confiável</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Seus dados estão seguros</p>
            </div>
            
            <div>
              <i class="fas fa-clock text-3xl text-blue-600 dark:text-blue-500 mb-3"></i>
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">Disponível</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Seg a Sex, 9h às 18h</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Redes Sociais -->
      <div class="mt-8 text-center">
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          <i class="fas fa-share-alt mr-2"></i>
          Siga-nos nas redes sociais
        </p>
        <div class="flex justify-center gap-4">
          <a href="https://www.facebook.com/3wonline" target="_blank" rel="noopener noreferrer" 
             class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-110">
            <i class="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="https://www.instagram.com/3wonline" target="_blank" rel="noopener noreferrer" 
             class="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all hover:scale-110">
            <i class="fab fa-instagram text-xl"></i>
          </a>
          <a href="https://www.linkedin.com/company/3wonline" target="_blank" rel="noopener noreferrer" 
             class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-all hover:scale-110">
            <i class="fab fa-linkedin-in text-xl"></i>
          </a>
          <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" 
             class="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white transition-all hover:scale-110">
            <i class="fas fa-globe text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: 'Contato',
      page_location: window.location.href
    })
  }
})
</script>
