<template>
  <section
    class="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white relative overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-full h-full" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px;"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Badge de Urgência -->
      <div class="inline-flex items-center px-5 py-2 bg-red-500/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-red-400/50 animate-pulse">
        <i class="fas fa-fire text-orange-400 mr-2"></i>
        Oferta Limitada: Ferramenta 100% GRATUITA
        <i class="fas fa-fire text-orange-400 ml-2"></i>
      </div>

      <!-- Headline Principal com Poder Emocional -->
      <h2 class="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        <span class="block">Não Deixe Seu Dinheiro</span>
        <span class="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
          Escapar pelas Mãos!
        </span>
      </h2>
      
      <!-- Subheadline com Benefício -->
      <p class="text-xl md:text-2xl mb-6 text-blue-100 max-w-3xl mx-auto leading-relaxed">
        <strong class="text-white">Descubra AGORA</strong> quanto você realmente ganha e tome
        <strong class="text-yellow-300">decisões financeiras mais inteligentes</strong>
      </p>

      <!-- Prova Social com Números -->
      <div class="mb-10 flex flex-wrap items-center justify-center gap-8 text-blue-100">
        <div class="flex items-center space-x-3">
          <div class="bg-white/10 rounded-full p-3 backdrop-blur-sm">
            <i class="fas fa-users text-2xl text-blue-300"></i>
          </div>
          <div class="text-left">
            <p class="text-2xl font-bold text-white">+50.000</p>
            <p class="text-sm">usuários satisfeitos</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <div class="bg-white/10 rounded-full p-3 backdrop-blur-sm">
            <div class="flex text-yellow-300">
              <i class="fas fa-star text-lg"></i>
              <i class="fas fa-star text-lg"></i>
              <i class="fas fa-star text-lg"></i>
              <i class="fas fa-star text-lg"></i>
              <i class="fas fa-star text-lg"></i>
            </div>
          </div>
          <div class="text-left">
            <p class="text-2xl font-bold text-white">4.9/5</p>
            <p class="text-sm">avaliação média</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <div class="bg-white/10 rounded-full p-3 backdrop-blur-sm">
            <i class="fas fa-chart-line text-2xl text-green-300"></i>
          </div>
          <div class="text-left">
            <p class="text-2xl font-bold text-white">100%</p>
            <p class="text-sm">grátis e seguro</p>
          </div>
        </div>
      </div>

      <!-- CTAs Principais com Hierarquia Clara -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <a
          href="#calculadora"
          class="group inline-flex items-center justify-center px-10 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-xl rounded-xl shadow-2xl hover:shadow-yellow-300/50 hover:scale-110 transform transition-all duration-300"
        >
          <i class="fas fa-calculator mr-3 text-2xl group-hover:animate-bounce"></i>
          Calcular Meu Salário AGORA
          <i class="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i>
        </a>
        <a
          href="/sobre"
          class="inline-flex items-center justify-center px-10 py-6 bg-white/10 backdrop-blur-md border-2 border-white text-white font-semibold text-xl rounded-xl hover:bg-white hover:text-indigo-700 transform transition-all duration-200"
        >
          <i class="fas fa-info-circle mr-3"></i>
          Saiba Mais
        </a>
      </div>

      <!-- Garantias e Segurança (Remove Objeções) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
          <i class="fas fa-shield-alt text-green-300 text-3xl mb-3"></i>
          <h3 class="font-bold text-lg mb-2">100% Seguro</h3>
          <p class="text-sm text-blue-100">Seus dados são processados localmente. Zero armazenamento.</p>
        </div>
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
          <i class="fas fa-gift text-yellow-300 text-3xl mb-3"></i>
          <h3 class="font-bold text-lg mb-2">Totalmente Grátis</h3>
          <p class="text-sm text-blue-100">Sem pegadinhas, sem cadastro, sem limites de uso.</p>
        </div>
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
          <i class="fas fa-bolt text-orange-300 text-3xl mb-3"></i>
          <h3 class="font-bold text-lg mb-2">Resultado Instantâneo</h3>
          <p class="text-sm text-blue-100">Cálculos precisos em menos de 2 segundos.</p>
        </div>
      </div>

      <!-- Testemunhal Social (Cialdini - Prova Social) -->
      <div class="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
              <i class="fas fa-quote-left text-white text-2xl"></i>
            </div>
          </div>
          <div class="text-left">
            <p class="text-lg italic text-blue-50 mb-4">
              "Esta calculadora me ajudou a entender meu verdadeiro valor por hora e negociar um aumento de 25%. Ferramenta essencial para qualquer profissional!"
            </p>
            <div class="flex items-center space-x-3">
              <div class="text-yellow-300 flex">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <div>
                <p class="font-semibold">Maria Silva</p>
                <p class="text-sm text-blue-200">Analista de TI, São Paulo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Urgência Final -->
      <div class="mt-10">
        <p class="text-lg font-semibold text-yellow-300 animate-pulse">
          <i class="fas fa-users mr-2"></i>
          1.247 pessoas estão calculando AGORA mesmo!
        </p>
        <p class="text-sm text-blue-200 mt-2">
          Junte-se a elas e descubra seu verdadeiro valor
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CtaSection",
};
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
