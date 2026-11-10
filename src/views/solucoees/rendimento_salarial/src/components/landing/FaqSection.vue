<template>
  <section class="py-20 bg-white dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Perguntas Frequentes
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Tudo o que você precisa saber sobre nossa calculadora
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full flex items-center justify-between p-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span
              class="text-lg font-semibold text-gray-900 dark:text-white text-left"
            >
              {{ faq.question }}
            </span>
            <svg
              :class="{ 'rotate-180': faq.open }"
              class="w-6 h-6 text-gray-500 transform transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            v-show="faq.open"
            class="px-6 pb-6 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FaqSection",
  data() {
    return {
      faqs: [
        {
          question: "A calculadora é realmente gratuita?",
          answer:
            "Sim! Nossa calculadora é 100% gratuita e sempre será. Não cobramos nenhuma taxa, não pedimos cadastro e não há custos ocultos. Nosso objetivo é ajudar você a entender melhor suas finanças.",
          open: false,
        },
        {
          question: "Meus dados ficam salvos ou compartilhados?",
          answer:
            "Não! Valorizamos sua privacidade. Todos os cálculos são feitos localmente no seu navegador e nenhum dado é enviado para nossos servidores ou compartilhado com terceiros. Seus dados financeiros são completamente privados e seguros.",
          open: false,
        },
        {
          question: "Como são calculados os valores por hora?",
          answer:
            "Usamos o padrão brasileiro de 220 horas trabalhadas por mês (baseado em 44 horas semanais). O cálculo é: Salário Mensal ÷ 220 = Valor por Hora. Você pode usar esse valor como referência para freelances e trabalhos extras.",
          open: false,
        },
        {
          question: "Posso usar em dispositivos móveis?",
          answer:
            "Sim! Nossa calculadora é totalmente responsiva e funciona perfeitamente em smartphones, tablets e desktops. A interface se adapta automaticamente ao tamanho da sua tela para proporcionar a melhor experiência possível.",
          open: false,
        },
        {
          question: "Os cálculos consideram descontos e impostos?",
          answer:
            "A calculadora mostra o rendimento bruto baseado no salário informado. Ela não deduz impostos (INSS, IR) ou outros descontos, pois esses valores variam muito de acordo com cada situação específica. O objetivo é mostrar o valor total que você recebe.",
          open: false,
        },
        {
          question: "Posso salvar ou imprimir os resultados?",
          answer:
            'Sim! Você pode imprimir seus resultados clicando no botão "Imprimir Resultados" na tela de resultados. O formato é otimizado para impressão e inclui todos os detalhes calculados.',
          open: false,
        },
        {
          question: "Como posso entrar em contato se tiver problemas?",
          answer:
            "Se você encontrar qualquer problema ou tiver sugestões, pode entrar em contato através da nossa página de contato. Estamos sempre abertos a feedback e trabalhamos continuamente para melhorar a ferramenta.",
          open: false,
        },
        {
          question: "A calculadora funciona offline?",
          answer:
            "Parcialmente sim! Após carregar a página pela primeira vez, muitas funcionalidades continuam funcionando mesmo sem internet, graças à nossa tecnologia PWA (Progressive Web App). Isso significa que você pode calcular seu salário mesmo em locais sem conexão.",
          open: false,
        },
      ],
    };
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
  },
};
</script>
