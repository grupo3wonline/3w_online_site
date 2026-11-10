<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Background overlay -->
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('close')"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10" :class="iconBgClass">
              <svg class="h-6 w-6" :class="iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="type === 'about'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                <path v-else-if="type === 'help'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {{ modalData.title }}
              </h3>
              <div class="mt-2">
                <div class="text-sm text-gray-500" v-html="modalData.content"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button 
            type="button" 
            @click="$emit('close')"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

defineEmits(['close'])

const modalData = computed(() => {
  const data = {
    about: {
      title: 'Sobre o Simulador',
      content: `
        <p class="mb-4">Nossa ferramenta é uma plataforma online que permite simular investimentos de forma fácil e rápida. Com um design intuitivo e moderno, você pode inserir o montante inicial, tempo de investimento e aporte mensal, obtendo um cálculo preciso de seus rendimentos ao longo do tempo.</p>
        
        <p class="mb-4">Ideal para quem quer planejar suas finanças pessoais, essa ferramenta oferece uma visualização clara do crescimento do seu patrimônio ao longo do tempo, permitindo que você ajuste suas contribuições mensais para atingir suas metas financeiras de maneira eficaz.</p>
        
        <p>Com nossa ferramenta, você pode ter uma visão clara e detalhada de seus investimentos, ajudando a tomar decisões financeiras mais informadas. Experimente agora mesmo e comece a planejar seu futuro financeiro!</p>
      `
    },
    help: {
      title: 'Como Usar o Simulador',
      content: `
        <div class="space-y-4">
          <div>
            <h4 class="font-semibold text-gray-900 mb-2">Instruções de Uso:</h4>
            <ol class="list-decimal list-inside space-y-2 text-sm">
              <li>Insira o valor do seu montante inicial</li>
              <li>Defina o tempo de investimento em anos</li>
              <li>Informe o valor do aporte mensal</li>
              <li>Clique em "Simular" para ver os resultados</li>
              <li>Use "Resetar" para fazer uma nova simulação</li>
            </ol>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-900 mb-2">Dicas Importantes:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Todos os valores devem ser números positivos</li>
              <li>Use valores realistas para obter resultados precisos</li>
              <li>Para melhor precisão, insira valores com até duas casas decimais</li>
              <li>Os cálculos são baseados em juros compostos</li>
            </ul>
          </div>
        </div>
      `
    },
    tips: {
      title: 'Dicas de Investimento',
      content: `
        <div class="space-y-4">
          <div>
            <h4 class="font-semibold text-gray-900 mb-2">Orientações Financeiras:</h4>
            
            <p class="mb-3"><strong>Crie um orçamento:</strong> Antes de investir, tenha controle das suas finanças e saiba exatamente quanto dinheiro você tem disponível para investir.</p>
            
            <p class="mb-3"><strong>Reserva de emergência:</strong> Antes de começar a investir, certifique-se de ter uma reserva de emergência equivalente a pelo menos 6 meses de gastos.</p>
            
            <p class="mb-3"><strong>Defina objetivos claros:</strong> Tenha metas financeiras específicas, como aposentadoria, educação dos filhos ou compra de imóveis.</p>
            
            <p class="mb-3"><strong>Diversifique:</strong> Não coloque todos os ovos na mesma cesta. Diversifique seus investimentos para reduzir riscos.</p>
            
            <p class="mb-3"><strong>Seja paciente:</strong> Investir é um jogo de longo prazo. Mantenha a disciplina e foque no longo prazo.</p>
            
            <p class="text-xs text-gray-600 mt-4">Lembre-se: investir envolve riscos. Busque sempre orientação de profissionais qualificados.</p>
          </div>
        </div>
      `
    }
  }
  
  return data[props.type] || data.about
})

const iconComponent = computed(() => {
  // Retorna o nome do ícone SVG
  return 'icon-svg'
})

const iconClass = computed(() => {
  const classes = {
    about: 'text-blue-600',
    help: 'text-green-600',
    tips: 'text-yellow-600'
  }
  return classes[props.type] || 'text-blue-600'
})

const iconBgClass = computed(() => {
  const classes = {
    about: 'bg-blue-100',
    help: 'bg-green-100', 
    tips: 'bg-yellow-100'
  }
  return classes[props.type] || 'bg-blue-100'
})
</script>

<style>
/* Simple icon components since we don't have Heroicons installed yet */
</style>
