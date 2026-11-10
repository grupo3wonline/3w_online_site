<template>
  <div class="bg-gray-50 py-16">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Além de ferramentas gratuitas, oferecemos desenvolvimento sob demanda.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6 text-primary-600">
               <font-awesome-icon :icon="['fas', 'code']" size="2x" />
            </div>
            <h3 class="text-xl font-bold mb-4">Desenvolvimento Web</h3>
            <p class="text-gray-600 mb-6">
              Sites institucionais, e-commerces e landing pages de alta conversão. Tecnologias modernas como Vue.js, React e Laravel.
            </p>
            <a href="https://www.3wonline.com.br" class="text-primary-600 font-semibold hover:text-primary-700">Saiba mais &rarr;</a>
         </div>

         <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6 text-primary-600">
               <font-awesome-icon :icon="['fas', 'server']" size="2x" />
            </div>
            <h3 class="text-xl font-bold mb-4">Sistemas Personalizados</h3>
            <p class="text-gray-600 mb-6">
              SaaS, ERPs, CRMs e intranets desenvolvidos sob medida para as necessidades específicas do seu negócio.
            </p>
             <a href="https://www.3wonline.com.br" class="text-primary-600 font-semibold hover:text-primary-700">Saiba mais &rarr;</a>
         </div>

         <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6 text-primary-600">
               <font-awesome-icon :icon="['fas', 'mobile-alt']" size="2x" />
            </div>
            <h3 class="text-xl font-bold mb-4">Aplicativos Mobile</h3>
            <p class="text-gray-600 mb-6">
              Apps nativos e híbridos para iOS e Android. Leve sua empresa para a palma da mão do seu cliente.
            </p>
             <a href="https://www.3wonline.com.br" class="text-primary-600 font-semibold hover:text-primary-700">Saiba mais &rarr;</a>
         </div>
      </div>
      
      <div class="mt-20 bg-primary-900 rounded-2xl p-12 text-center text-white">
          <h2 class="text-3xl font-bold mb-6">Tem um projeto em mente?</h2>
          <p class="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
             Vamos transformar sua ideia em realidade. Marque uma consultoria gratuita com nossos especialistas.
          </p>
          <router-link to="/contato" class="btn bg-white text-primary-900 hover:bg-gray-100 px-8 py-3 text-lg font-bold">
             Fale Conosco
          </router-link>
      </div>
    </div>
  </div>
</template>
