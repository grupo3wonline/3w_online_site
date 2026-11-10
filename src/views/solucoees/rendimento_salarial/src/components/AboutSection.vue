<template>
  <section class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Sobre a Calculadora
        </h2>
        <p class="text-xl text-gray-600">
          Uma ferramenta confiável para planejamento financeiro
        </p>
      </div>

      <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div class="prose prose-lg max-w-none">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Como funciona?</h3>
          <p class="text-gray-600 mb-6">
            Nossa calculadora de rendimento salarial utiliza cálculos precisos baseados em padrões brasileiros 
            de trabalho para fornecer uma visão completa dos seus ganhos em diferentes períodos.
          </p>

          <h4 class="text-xl font-semibold text-gray-900 mb-3">Metodologia de Cálculo:</h4>
          <div class="bg-blue-50 rounded-2xl p-6 mb-6">
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                <div>
                  <strong class="text-blue-900">Por Hora:</strong> 
                  <span class="text-blue-800">Baseado em 220 horas trabalhadas por mês (8h/dia × 22 dias úteis)</span>
                </div>
              </li>
              <li class="flex items-start">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                <div>
                  <strong class="text-blue-900">Por Dia:</strong> 
                  <span class="text-blue-800">Salário mensal dividido por 30 dias</span>
                </div>
              </li>
              <li class="flex items-start">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                <div>
                  <strong class="text-blue-900">Por Semana:</strong> 
                  <span class="text-blue-800">Considerando 4,33 semanas por mês em média</span>
                </div>
              </li>
              <li class="flex items-start">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                <div>
                  <strong class="text-blue-900">Períodos maiores:</strong> 
                  <span class="text-blue-800">Multiplicação simples do salário mensal</span>
                </div>
              </li>
            </ul>
          </div>

          <h4 class="text-xl font-semibold text-gray-900 mb-3">Características Técnicas:</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-green-50 rounded-xl p-4">
              <h5 class="font-semibold text-green-900 mb-2">🛡️ Segurança</h5>
              <ul class="text-green-800 text-sm space-y-1">
                <li>✅ Nenhum dado armazenado</li>
                <li>✅ Processamento local</li>
                <li>✅ Sem cookies ou tracking</li>
                <li>✅ LGPD Compliant</li>
              </ul>
            </div>
            <div class="bg-purple-50 rounded-xl p-4">
              <h5 class="font-semibold text-purple-900 mb-2">⚡ Performance</h5>
              <ul class="text-purple-800 text-sm space-y-1">
                <li>✅ Carregamento instantâneo</li>
                <li>✅ Cálculos em tempo real</li>
                <li>✅ Interface responsiva</li>
                <li>✅ PWA ready</li>
              </ul>
            </div>
          </div>

          <div class="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
            <h4 class="text-xl font-semibold text-orange-900 mb-3">💡 Dica Importante</h4>
            <p class="text-orange-800">
              Use esta ferramenta como base para planejamento financeiro, negociação salarial 
              e comparação de propostas de trabalho. Lembre-se de considerar benefícios adicionais 
              como vale alimentação, plano de saúde e outros na sua análise completa.
            </p>
          </div>

          <div class="bg-gray-50 rounded-2xl p-6">
            <h4 class="text-xl font-semibold text-gray-900 mb-3">🎯 Casos de Uso Recomendados:</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul class="space-y-2 text-gray-700">
                <li>• Planejamento financeiro pessoal</li>
                <li>• Negociação salarial</li>
                <li>• Comparação de propostas</li>
                <li>• Precificação de freelances</li>
              </ul>
              <ul class="space-y-2 text-gray-700">
                <li>• Análise de custos empresariais</li>
                <li>• Educação financeira</li>
                <li>• Controle orçamentário</li>
                <li>• Tomada de decisões</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Technology Stack -->
      <div class="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
        <h3 class="text-2xl font-bold mb-6 text-center">👨‍💻 Desenvolvedor</h3>
        <div class="flex flex-col md:flex-row items-center gap-8 justify-center">
          <div class="flex flex-col items-center justify-center text-center md:w-1/3">
            <img src="https://avatars.githubusercontent.com/u/10501009?v=4" alt="HotWyl Avatar" class="w-20 h-20 rounded-full border-4 border-blue-500 mb-3 shadow-lg" />
            <span class="font-bold text-xl mt-2">HotWyl</span>
            <span class="text-sm text-gray-300 mb-2">Desenvolvedor Web</span>
          </div>
          <div class="md:w-2/3 text-left">
            <p class="mb-2">Este projeto foi desenvolvido como uma demonstração das capacidades modernas do desenvolvimento web, com foco na performance, acessibilidade e experiência do usuário.</p>
            <p class="mb-2">A aplicação utiliza as melhores práticas de desenvolvimento e design para oferecer uma experiência excepcional.</p>
            <div class="mt-4 flex gap-4">
              <a href="https://www.linkedin.com/in/william-camargo-dev/" target="_blank" rel="noopener" class="text-blue-300 hover:underline">LinkedIn</a>
              <a href="https://github.com/hotwyl" target="_blank" rel="noopener" class="text-blue-300 hover:underline block mb-2">GitHub</a>
              <a href="/" class="text-blue-300 hover:underline block">Experimentar Aplicação</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection'
}
</script>
