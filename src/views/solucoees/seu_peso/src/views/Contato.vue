<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 transition-colors duration-300"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      

      <div class="grid lg:grid-cols-3 gap-8 mb-12">
        <!-- Informações da Empresa -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Card Principal -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <i class="fas fa-building text-white text-xl"></i>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Grupo 3w Online</h2>
                <p class="text-sm text-gray-600 dark:text-gray-400">Excelência em Desenvolvimento Web</p>
              </div>
            </div>
            
            <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
              Empresa especializada no desenvolvimento de <strong class="text-blue-600 dark:text-blue-400">sites e sistemas personalizados sob demanda</strong>. 
              Transformamos ideias em soluções digitais de alto impacto.
            </p>

            <div class="space-y-4 mb-6">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Nossos Serviços</h3>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-500 mt-1 flex-shrink-0"></i>
                  <div>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white block">Desenvolvimento Web Profissional</span>
                    <span class="text-xs text-gray-600 dark:text-gray-400">Sites institucionais e landing pages de alta conversão</span>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-500 mt-1 flex-shrink-0"></i>
                  <div>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white block">Sistemas Corporativos</span>
                    <span class="text-xs text-gray-600 dark:text-gray-400">Soluções customizadas para gestão empresarial</span>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-500 mt-1 flex-shrink-0"></i>
                  <div>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white block">E-commerce Completo</span>
                    <span class="text-xs text-gray-600 dark:text-gray-400">Lojas virtuais otimizadas para vendas</span>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-500 mt-1 flex-shrink-0"></i>
                  <div>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white block">Aplicações Web Customizadas</span>
                    <span class="text-xs text-gray-600 dark:text-gray-400">Ferramentas web sob medida para seu negócio</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <div class="flex items-center space-x-2">
                  <i class="fas fa-clock"></i>
                  <span>Atendimento</span>
                </div>
                <span class="font-medium">Seg-Sex: 9h às 18h</span>
              </div>
            </div>
          </div>

          <!-- CTA Card Aprimorado -->
          <div class="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            
            <div class="relative z-10">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                <i class="fas fa-rocket text-2xl"></i>
              </div>
              
              <h3 class="text-xl font-bold mb-3">Transforme Sua Ideia em Realidade!</h3>
              
              <p class="text-blue-100 text-sm mb-4 leading-relaxed">
                🚀 <strong>Não deixe para depois!</strong> Cada dia sem sua presença digital é uma oportunidade perdida. 
                Desenvolva seu projeto com quem entende do assunto.
              </p>

              <ul class="text-sm text-blue-50 mb-6 space-y-2">
                <li class="flex items-center space-x-2">
                  <i class="fas fa-star text-yellow-300"></i>
                  <span>Projetos sob medida</span>
                </li>
                <li class="flex items-center space-x-2">
                  <i class="fas fa-star text-yellow-300"></i>
                  <span>Suporte dedicado</span>
                </li>
                <li class="flex items-center space-x-2">
                  <i class="fas fa-star text-yellow-300"></i>
                  <span>Resultados comprovados</span>
                </li>
              </ul>
              
              <a 
                href="https://www.3wonline.com.br" 
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <i class="fas fa-external-link-alt mr-2"></i>
                Solicitar Orçamento Grátis
              </a>

              <p class="text-xs text-blue-200 mt-3 text-center">
                <i class="fas fa-shield-alt mr-1"></i>
                Sem compromisso • Resposta em 24h
              </p>
            </div>
          </div>
        </div>

        <!-- Formulário de Contato -->
        <div class="lg:col-span-2">

          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
              <i class="fas fa-comments text-white text-4xl"></i>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Fale Conosco
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Estamos aqui para ajudar! Envie sua mensagem, sugestão ou dúvida.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Envie sua Mensagem
            </h2>
            <ContactIframe />
          </div>

          <!-- Info Adicional -->
          <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 mt-10">
            <div class="flex items-start space-x-3">
              <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 text-xl flex-shrink-0 mt-1"></i>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Tempo de Resposta</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Valorizamos seu tempo! Respondemos <strong>todas as mensagens em até 24 horas úteis</strong> com atenção e profissionalismo.
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <!-- Seção de Benefícios -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Por que Desenvolver com a 3w Online?
        </h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-rocket text-blue-600 dark:text-blue-400 text-2xl"></i>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Tecnologia Moderna</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Frameworks e ferramentas de última geração</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-paint-brush text-purple-600 dark:text-purple-400 text-2xl"></i>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Design Profissional</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Interfaces modernas e intuitivas</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-headset text-green-600 dark:text-green-400 text-2xl"></i>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Suporte Dedicado</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Acompanhamento em todas as etapas</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-award text-yellow-600 dark:text-yellow-400 text-2xl"></i>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Qualidade Garantida</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Projetos testados e otimizados</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ContactIframe from "../components/ContactIframe.vue";
</script>
