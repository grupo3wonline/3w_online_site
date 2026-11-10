<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-900 text-white overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-10 bg-cover bg-center"></div>
      <div class="container-custom relative z-10 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Transforme Roteiros em <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Legendas Profissionais</span>
        </h1>
        <p class="text-lg md:text-xl text-primary-100 max-w-3xl mb-10 leading-relaxed">
          Pare de perder horas sincronizando legendas manualmente. Com o <span class="font-semibold text-white">Gerador de Legenda</span>, você converte seus textos em arquivos SRT formatados com precisão milimétrica em segundos. A ferramenta secreta dos criadores de conteúdo de sucesso.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 mb-12">
          <router-link to="/ferramentas" class="btn bg-white text-primary-700 hover:bg-gray-100 text-lg px-8 py-4 shadow-xl transform hover:-translate-y-1 transition-all">
            Começar Grátis Agora
          </router-link>
          <router-link to="/sobre" class="btn border border-primary-300 text-white hover:bg-primary-800/50 text-lg px-8 py-4">
            Saiba Mais
          </router-link>
        </div>
        <div class="flex items-center space-x-2 text-sm text-primary-200">
           <font-awesome-icon :icon="['fas', 'check-circle']" class="text-teal-400"/>
           <span>Sem cartão de crédito</span>
           <span class="mx-2">•</span>
           <font-awesome-icon :icon="['fas', 'check-circle']" class="text-teal-400"/>
           <span>Processamento Seguro</span>
           <span class="mx-2">•</span>
           <font-awesome-icon :icon="['fas', 'check-circle']" class="text-teal-400"/>
           <span>100% Gratuito</span>
        </div>
      </div>
       <!-- Wave Separator -->
       <div class="absolute bottom-0 w-full overflow-hidden leading-none rotate-180">
          <svg class="relative block w-[calc(118%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="fill-white"></path>
          </svg>
      </div>
    </section>

    <!-- Problem/Solution Section (Pain Points) -->
    <section class="py-20 bg-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Você ainda legenda seus vídeos "no olho"?</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            A forma antiga é lenta, cansativa e propensa a erros. O Princípio de Pareto diz que 80% dos resultados vêm de 20% dos esforços. 
            <span class="font-semibold text-primary-600">Não gaste seus 80% em tarefas repetitivas.</span>
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
            <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
              <font-awesome-icon :icon="['fas', 'clock']" size="2x" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Perda de Tempo</h3>
            <p class="text-gray-600">
              Editores gastam horas digitando e sincronizando legendas. Esse é um tempo precioso que você poderia usar criando mais conteúdo.
            </p>
          </div>
          <!-- Card 2 -->
          <div class="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-500">
            <div class="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-6 text-yellow-600">
              <font-awesome-icon :icon="['fas', 'exclamation-triangle']" size="2x" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Erros de Sincronia</h3>
            <p class="text-gray-600">
              Um milissegundo fora e a experiência do espectador é arruinada. Ajustar manualmente é frustrante e nunca fica perfeito.
            </p>
          </div>
          <!-- Card 3 -->
          <div class="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
             <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
              <font-awesome-icon :icon="['fas', 'check-doubles']" size="2x" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">A Solução Inteligente</h3>
            <p class="text-gray-600">
              Nossa IA faz o trabalho duro. Cole seu roteiro, defina os parâmetros e receba um arquivo pronto para o YouTube, TikTok e Instagram.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="w-full md:w-1/2">
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="Dashboard Preview" class="rounded-2xl shadow-2xl transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
          </div>
          <div class="w-full md:w-1/2">
             <h2 class="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">Recursos Poderosos</h2>
             <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Tudo o que você precisa para acelerar seu fluxo</h3>
             
             <div class="space-y-6">
                <div class="flex">
                   <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                         <font-awesome-icon :icon="['fas', 'bolt']" />
                      </div>
                   </div>
                   <div class="ml-4">
                      <h4 class="text-lg leading-6 font-medium text-gray-900">Velocidade Relâmpago</h4>
                      <p class="mt-2 text-base text-gray-500">Processamento instantâneo. De texto para .SRT em milissegundos.</p>
                   </div>
                </div>
                
                <div class="flex">
                   <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                         <font-awesome-icon :icon="['fas', 'shield-alt']" />
                      </div>
                   </div>
                   <div class="ml-4">
                      <h4 class="text-lg leading-6 font-medium text-gray-900">Segurança Total</h4>
                      <p class="mt-2 text-base text-gray-500">Seus roteiros não ficam salvos em nossos servidores. Privacidade garantida.</p>
                   </div>
                </div>

                <div class="flex">
                   <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                         <font-awesome-icon :icon="['fas', 'robot']" />
                      </div>
                   </div>
                   <div class="ml-4">
                      <h4 class="text-lg leading-6 font-medium text-gray-900">Inteligência Artificial (Em Beta)</h4>
                      <p class="mt-2 text-base text-gray-500">Integração com Gemini, Groq e OpenRouter para otimizar seus textos automaticamente.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof / CTA Section -->
    <section class="py-24 bg-primary-900 text-white text-center">
      <div class="container-custom">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Junte-se a milhares de criadores inteligentes</h2>
        <p class="text-xl text-primary-200 mb-10 max-w-2xl mx-auto">
          Não deixe a tecnologia te atrasar. Use-a a seu favor. Aumente sua produtividade hoje mesmo.
        </p>
        <div class="flex flex-col md:flex-row justify-center items-center gap-6">
           <router-link to="/ferramentas" class="btn bg-white text-primary-900 hover:bg-gray-100 px-10 py-4 text-lg font-bold shadow-lg">
             Acessar Ferramenta Grátis
           </router-link>
           <p class="text-sm text-primary-300 mt-4 md:mt-0">
             Desenvolvido com excelência pelo <a href="https://www.3wonline.com.br" target="_blank" class="underline hover:text-white">Grupo 3w Online</a>
           </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>
