<template>
  <div class="landing-marketing">
    <!-- Header -->
    <header class="bg-primary-700 text-white py-4 sticky top-0 z-50 shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <div class="text-2xl font-bold">3W Online</div>
          <nav class="hidden md:flex space-x-8">
            <a href="#inicio" class="hover:text-orange-300 transition-colors">Início</a>
            <a href="#sobre" class="hover:text-orange-300 transition-colors">Sobre</a>
            <a href="#servicos" class="hover:text-orange-300 transition-colors">Serviços</a>
            <a href="#contato" class="hover:text-orange-300 transition-colors">Contato</a>
          </nav>
          <button class="md:hidden text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section id="inicio" class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-32">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Transforme sua Presença Digital com a 3W Online!
        </h1>
        <p class="text-xl md:text-2xl mb-4 text-blue-100">
          Quer mais clientes e mais visibilidade para o seu negócio?
        </p>
        <p class="text-lg md:text-xl mb-8 text-blue-200">
          Na 3W Online, somos especialistas em Marketing Digital e Gestão de Redes Sociais!
        </p>
        <button 
          @click="scrollToContact"
          class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Fale Conosco
        </button>
      </div>
    </section>

    <!-- Services Section -->
    <section id="servicos" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          O que oferecemos?
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Gestão Completa das Redes Sociais -->
          <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              Gestão Completa das Redes Sociais
            </h3>
            <p class="text-gray-600">
              Conteúdo criativo com publicações que aumentam o engajamento da sua marca.
            </p>
          </div>

          <!-- Gestão de Tráfego Pago -->
          <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              Gestão de Tráfego Pago
            </h3>
            <p class="text-gray-600">
              Campanhas eficientes que trazem tráfego e conversões para seu negócio.
            </p>
          </div>

          <!-- Estratégias Personalizadas -->
          <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              Estratégias Personalizadas
            </h3>
            <p class="text-gray-600">
              Planos sob medida com foco em resultados reais.
            </p>
          </div>

          <!-- Monitoramento e Análise -->
          <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              Monitoramento e Análise
            </h3>
            <p class="text-gray-600">
              Métricas e otimização para garantir o melhor ROI.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          Por que escolher a 3W Online?
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Experiência e Resultados -->
          <div class="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Experiência e Resultados</h3>
            <p class="text-gray-600">
              Mais de 5 anos criando estratégias digitais de sucesso.
            </p>
          </div>

          <!-- Foco no Cliente -->
          <div class="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Foco no Cliente</h3>
            <p class="text-gray-600">
              Compreendemos e alinhamos nossos serviços aos seus objetivos.
            </p>
          </div>

          <!-- Conteúdo Criativo -->
          <div class="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Conteúdo Criativo</h3>
            <p class="text-gray-600">
              Designs e mídias que fazem sua marca se destacar.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          Pacotes para todos os tamanhos de negócio
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <!-- Gestão de Redes Sociais -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Gestão de Redes Sociais</h3>
            <div class="text-center mb-6">
              <span class="text-orange-500 font-bold">a partir de </span>
              <span class="text-3xl font-bold text-gray-800">R$ 500</span>
              <span class="text-gray-600">/mês</span>
            </div>
            <p class="text-sm text-gray-600 mb-6">
              Posts criativos, calendário, publicação e monitoramento.
            </p>
            <button 
              @click="scrollToContact"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Contratar Agora
            </button>
          </div>

          <!-- Gestão de Tráfego Pago -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Gestão de Tráfego Pago</h3>
            <div class="text-center mb-6">
              <span class="text-orange-500 font-bold">a partir de </span>
              <span class="text-3xl font-bold text-gray-800">R$ 500</span>
              <span class="text-gray-600">/mês</span>
            </div>
            <p class="text-sm text-gray-600 mb-6">
              Criação de campanhas, anúncios e otimização.
            </p>
            <button 
              @click="scrollToContact"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Contratar Agora
            </button>
          </div>

          <!-- Artes Criativas e Publicidade -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Artes Criativas e Publicidade</h3>
            <div class="text-center mb-6">
              <span class="text-orange-500 font-bold">a partir de </span>
              <span class="text-3xl font-bold text-gray-800">R$ 50</span>
            </div>
            <p class="text-sm text-gray-600 mb-6">
              Criação de artes, vídeos e materiais de publicidade.
            </p>
            <button 
              @click="scrollToContact"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Contratar Agora
            </button>
          </div>

          <!-- Combo Completo -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-2 border-orange-500 relative">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              MAIS POPULAR
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Combo Completo</h3>
            <div class="text-center mb-6">
              <span class="text-orange-500 font-bold">a partir de </span>
              <span class="text-3xl font-bold text-gray-800">R$ 1.250</span>
              <span class="text-gray-600">/mês</span>
            </div>
            <p class="text-sm text-gray-600 mb-6">
              Inclui todas as opções acima: Gestão Geral Redes Sociais + Gestão de Tráfego + Criativos
            </p>
            <button 
              @click="scrollToContact"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Contratar Agora
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          O que nossos clientes dizem
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div class="bg-gray-50 rounded-lg p-6 shadow-lg">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">JS</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">João Silva</h4>
                <p class="text-sm text-gray-600">CEO, TechStart</p>
              </div>
            </div>
            <p class="text-gray-700 italic">
              "A 3W Online transformou nossa presença digital. Aumentamos nossos seguidores em 300% e as vendas cresceram 150% em apenas 6 meses!"
            </p>
            <div class="flex text-yellow-400 mt-4">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 shadow-lg">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">MS</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Maria Santos</h4>
                <p class="text-sm text-gray-600">Proprietária, Boutique Elegance</p>
              </div>
            </div>
            <p class="text-gray-700 italic">
              "Profissionais incríveis! Minha loja online decolou depois que começaram a gerenciar minhas redes sociais. Recomendo muito!"
            </p>
            <div class="flex text-yellow-400 mt-4">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 shadow-lg">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">CO</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Carlos Oliveira</h4>
                <p class="text-sm text-gray-600">Diretor, Construtora Alpha</p>
              </div>
            </div>
            <p class="text-gray-700 italic">
              "Excelente trabalho! As campanhas de tráfego pago trouxeram leads qualificados e aumentaram significativamente nossas vendas."
            </p>
            <div class="flex text-yellow-400 mt-4">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Alavanque sua marca agora mesmo!
        </h2>
        <p class="text-xl mb-8 text-blue-100">
          Fale com a 3W Online e transforme sua presença digital.
        </p>
        <button 
          @click="openWhatsApp"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Fale Conosco no WhatsApp
        </button>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          Perguntas Frequentes
        </h2>
        
        <div class="max-w-4xl mx-auto space-y-6">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-gray-50 rounded-lg shadow-lg overflow-hidden"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-300"
            >
              <span class="font-semibold text-gray-800">{{ faq.question }}</span>
              <svg 
                class="w-5 h-5 text-gray-600 transition-transform duration-300"
                :class="{ 'rotate-180': openFaq === index }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-if="openFaq === index"
              class="px-6 pb-4 text-gray-600"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section id="contato" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Entre em Contato
          </h2>
          
          <div class="bg-white rounded-lg shadow-lg p-8">
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="nome" class="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    id="nome"
                    v-model="form.nome"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label for="empresa" class="block text-sm font-medium text-gray-700 mb-2">
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    v-model="form.empresa"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                    placeholder="Nome da sua empresa"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label for="telefone" class="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    id="telefone"
                    v-model="form.telefone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                    placeholder="(XX) XXXXX-XXXX"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-4">
                  Serviços de interesse *
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label class="flex items-center">
                    <input
                      v-model="form.servicos"
                      type="checkbox"
                      value="redes-sociais"
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-gray-700">Gestão de Redes Sociais</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="form.servicos"
                      type="checkbox"
                      value="trafego-pago"
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-gray-700">Gestão de Tráfego Pago</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="form.servicos"
                      type="checkbox"
                      value="artes-criativas"
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-gray-700">Artes Criativas</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="form.servicos"
                      type="checkbox"
                      value="combo-completo"
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-gray-700">Combo Completo</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label for="mensagem" class="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  v-model="form.mensagem"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-colors duration-300"
                  placeholder="Conte-nos mais sobre seu projeto..."
                ></textarea>
              </div>
              
              <div class="text-center">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span v-if="isSubmitting">Enviando...</span>
                  <span v-else">Solicitar Orçamento</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary-800 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="text-2xl font-bold mb-4">3W Online</div>
            <p class="text-blue-200 mb-4">
              Especialistas em marketing digital e gestão de redes sociais para impulsionar seu negócio.
            </p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Contato</h3>
            <div class="space-y-2 text-blue-200">
              <p>📧 contato@3wonline.com.br</p>
              <p>📱 (41) 99692-4829</p>
              <p>🌐 www.3wonline.com.br</p>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div class="flex space-x-4">
              <a href="https://www.facebook.com/grupo3wonline" target="_blank" class="text-blue-200 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/grupo3wonline" target="_blank" class="text-blue-200 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.467 4.467-4.467c2.458 0 4.467 2.009 4.467 4.467s-2.009 4.468-4.467 4.468zm7.519 0c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.467 4.467-4.467c2.458 0 4.467 2.009 4.467 4.467s-2.009 4.468-4.467 4.468z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="border-t border-primary-700 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; 2025 3W Online – Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const isSubmitting = ref(false)
const openFaq = ref<number | null>(null)

const form = reactive({
  nome: '',
  empresa: '',
  email: '',
  telefone: '',
  servicos: [] as string[],
  mensagem: ''
})

const faqs = [
  {
    question: "Qual é o prazo de entrega dos serviços?",
    answer: "O prazo varia conforme o serviço. Para gestão de redes sociais, começamos em até 5 dias úteis. Para campanhas de tráfego pago, o setup inicial leva de 3 a 7 dias. Artes criativas são entregues em 24 a 48 horas."
  },
  {
    question: "Como posso fazer o pagamento?",
    answer: "Aceitamos diversas formas de pagamento: PIX, cartão de crédito, débito, transferência bancária e boleto. Para serviços mensais, o pagamento é feito sempre no início do mês."
  },
  {
    question: "Posso cancelar o serviço a qualquer momento?",
    answer: "Sim, nossos contratos são mensais e podem ser cancelados com aviso prévio de 30 dias. Não cobramos multa por cancelamento."
  },
  {
    question: "Vocês oferecem suporte técnico?",
    answer: "Sim! Oferecemos suporte completo via WhatsApp, e-mail e telefone durante horário comercial. Para clientes do combo completo, temos suporte prioritário."
  }
]

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}

const scrollToContact = () => {
  const element = document.getElementById('contato')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const openWhatsApp = () => {
  const message = "Olá! Vi a landing page e gostaria de saber mais sobre os serviços de marketing digital da 3W Online."
  const whatsappUrl = `https://wa.me/5541996924829?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulating form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create WhatsApp message
    const servicosText = form.servicos.length > 0 ? form.servicos.join(', ') : 'Não especificado'
    const message = `
Novo contato da Landing Page de Marketing:

Nome: ${form.nome}
Empresa: ${form.empresa || 'Não informado'}
Email: ${form.email}
Telefone: ${form.telefone}
Serviços de interesse: ${servicosText}
Mensagem: ${form.mensagem || 'Não informado'}
    `.trim()
    
    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/5541996924829?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    // Reset form
    Object.assign(form, {
      nome: '',
      empresa: '',
      email: '',
      telefone: '',
      servicos: [],
      mensagem: ''
    })
    
    alert('Obrigado pelo seu interesse! Entraremos em contato em breve.')
    
  } catch (error) {
    alert('Erro ao enviar mensagem. Tente novamente.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.landing-marketing {
  font-family: 'Inter', sans-serif;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Hover effects */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .grid {
    gap: 1.5rem;
  }
}

/* Focus styles for accessibility */
input:focus,
textarea:focus,
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>