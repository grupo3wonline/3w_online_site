<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="hero-gradient text-white py-20 md:py-32 px-4 relative overflow-hidden"
    >
      <!-- Background decoration -->
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="max-w-7xl mx-auto text-center relative z-10">
        <div class="animate-fade-in">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <span
              class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
            ></span>
            <span class="text-sm font-medium"
              >Ferramenta 100% Gratuita e Sem Cadastro</span
            >
          </div>

          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow leading-tight"
          >
            Transforme Seus Sonhos em
            <span class="text-yellow-300 block mt-2">Realidade Financeira</span>
          </h1>
          <p
            class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            Descubra exatamente quanto você precisa investir hoje para
            conquistar a liberdade financeira amanhã.
            <strong class="text-white">Resultados em segundos.</strong>
          </p>

          <!-- CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <router-link
              to="/simulador"
              class="group bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
            >
              <svg
                class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Simular Agora Grátis
            </router-link>
            <button
              @click="scrollToFeatures"
              class="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Ver Como Funciona
            </button>
          </div>

          <!-- Social Proof -->
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm"
          >
            <div class="flex items-center gap-2">
              <div class="flex -space-x-2">
                <div
                  class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"
                ></div>
                <div
                  class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"
                ></div>
                <div
                  class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"
                ></div>
              </div>
              <span class="text-blue-100"
                ><strong class="text-white">+10.000</strong> simulações
                realizadas</span
              >
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span class="text-blue-100"
                ><strong class="text-white">4.9/5</strong> avaliação média</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section ref="featuresSection" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16 animate-slide-up">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher nosso simulador?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Ferramentas poderosas para ajudar você a planejar e alcançar seus
            objetivos financeiros
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="card p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
            :class="`animation-delay-${index * 200}`"
          >
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <div class="text-2xl">{{ feature.icon }}</div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como funciona?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Simule seus investimentos em apenas 3 passos simples
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(step, index) in steps" :key="index" class="text-center">
            <div class="relative">
              <div
                class="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold"
              >
                {{ index + 1 }}
              </div>
              <div
                v-if="index < steps.length - 1"
                class="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-primary-200 transform translate-x-10"
              ></div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ step.title }}
            </h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-20 bg-primary-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Planeje seu futuro financeiro com confiança
            </h2>
            <div class="space-y-6">
              <div
                v-for="(benefit, index) in benefits"
                :key="index"
                class="flex items-start space-x-4"
              >
                <div
                  class="w-8 h-8 bg-success-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">
                    {{ benefit.title }}
                  </h3>
                  <p class="text-gray-600">{{ benefit.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <div class="bg-white rounded-2xl shadow-2xl p-8 mx-auto max-w-md">
              <div class="text-4xl mb-4">📈</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                Resultados Visuais
              </h3>
              <p class="text-gray-600 mb-6">
                Veja o crescimento do seu patrimônio em gráficos claros e
                detalhados
              </p>
              <router-link
                to="/simulador"
                class="btn-primary w-full inline-block"
              >
                Experimentar Agora
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <span
            class="text-primary-600 font-semibold uppercase tracking-wide dark:text-primary-400"
            >Depoimentos</span
          >
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-2 dark:text-white"
          >
            O que nossos usuários dizem
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
            Milhares de pessoas já transformaram seu planejamento financeiro
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-gray-50 p-8 rounded-xl dark:bg-gray-900"
          >
            <div class="flex items-center mb-4">
              <svg
                v-for="i in 5"
                :key="i"
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <p class="text-gray-700 mb-6 italic dark:text-gray-300">
              "{{ testimonial.text }}"
            </p>
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-primary-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold"
              >
                {{ testimonial.name.charAt(0) }}
              </div>
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">
                  {{ testimonial.name }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ testimonial.role }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-16">
          <span
            class="text-primary-600 font-semibold uppercase tracking-wide dark:text-primary-400"
            >FAQ</span
          >
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-2 dark:text-white"
          >
            Perguntas Frequentes
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            Tire suas dúvidas sobre o simulador
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-gray-800"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors dark:hover:bg-gray-700"
            >
              <span class="font-semibold text-gray-900 pr-8 dark:text-white">{{
                faq.question
              }}</span>
              <svg
                class="w-6 h-6 text-gray-500 transform transition-transform flex-shrink-0"
                :class="{ 'rotate-180': faq.open }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              v-show="faq.open"
              class="px-6 pb-5 text-gray-600 dark:text-gray-400"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 gradient-bg text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="max-w-4xl mx-auto text-center px-4 relative z-10">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">
          Pronto para Transformar Seu Futuro Financeiro?
        </h2>
        <p class="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Junte-se a milhares de pessoas que já estão planejando seu futuro com
          inteligência.
          <strong class="text-white">Comece agora, é 100% gratuito!</strong>
        </p>
        <router-link
          to="/simulador"
          class="bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
        >
          Começar Simulação Grátis
        </router-link>
        <p class="text-sm text-blue-100 mt-6">
          ✓ Sem cadastro &nbsp;&nbsp;✓ Sem custos &nbsp;&nbsp;✓ Resultados
          instantâneos
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const featuresSection = ref(null);

const features = [
  {
    icon: "🎯",
    title: "Cálculos Precisos",
    description:
      "Algoritmos avançados que consideram juros compostos e aportes mensais para resultados 100% confiáveis",
  },
  {
    icon: "📱",
    title: "Interface Intuitiva",
    description:
      "Design moderno, limpo e responsivo que funciona perfeitamente em todos os dispositivos",
  },
  {
    icon: "⚡",
    title: "Resultados Instantâneos",
    description:
      "Simulações completas em menos de 1 segundo com visualizações claras e detalhadas",
  },
  {
    icon: "🔒",
    title: "Totalmente Gratuito",
    description:
      "Use quantas vezes quiser, sem custos ocultos, cadastros ou limitações de acesso",
  },
  {
    icon: "📊",
    title: "Análise Completa",
    description:
      "Visualize crescimento patrimonial, lucros, rentabilidade e valor total investido",
  },
  {
    icon: "💡",
    title: "Educação Financeira",
    description:
      "Aprenda sobre investimentos, juros compostos e estratégias para construir patrimônio",
  },
];

const steps = [
  {
    title: "Preencha os Dados",
    description:
      "Informe valor inicial, tempo de investimento e aporte mensal desejado",
  },
  {
    title: "Simule em Tempo Real",
    description:
      "Nossa ferramenta processa os dados instantaneamente com cálculos precisos",
  },
  {
    title: "Analise os Resultados",
    description: "Veja projeções detalhadas e planeje seu futuro financeiro",
  },
];

const benefits = [
  {
    title: "Planejamento Estratégico",
    description:
      "Defina metas financeiras realistas e acompanhe o progresso dos seus objetivos com clareza",
  },
  {
    title: "Tomada de Decisão Inteligente",
    description:
      "Compare diferentes cenários de investimento e escolha a melhor estratégia para seu perfil",
  },
  {
    title: "Visualização do Futuro",
    description:
      "Entenda como pequenos aportes mensais podem se transformar em grande patrimônio ao longo do tempo",
  },
  {
    title: "Educação Financeira Prática",
    description:
      "Aprenda na prática sobre o poder dos juros compostos e a importância de investimentos de longo prazo",
  },
];

const testimonials = [
  {
    name: "Ana Silva",
    role: "Empresária",
    text: "Excelente ferramenta! Me ajudou a visualizar meus objetivos financeiros de forma clara e realista. Recomendo muito!",
  },
  {
    name: "Carlos Santos",
    role: "Engenheiro",
    text: "Interface simples e resultados precisos. Uso frequentemente para planejar meus investimentos mensais.",
  },
  {
    name: "Maria Oliveira",
    role: "Professora",
    text: "Finalmente entendi como os juros compostos funcionam na prática. Ferramenta educativa e muito útil!",
  },
];

const faqs = reactive([
  {
    question: "O simulador é realmente gratuito?",
    answer:
      "Sim! O InvestSim é 100% gratuito, sem custos ocultos, assinaturas ou necessidade de cadastro. Você pode usar quantas vezes quiser.",
    open: false,
  },
  {
    question: "Como são calculados os resultados?",
    answer:
      "Utilizamos fórmulas de juros compostos considerando o montante inicial, aportes mensais e tempo de investimento. Os cálculos são baseados em taxas médias de rentabilidade do mercado brasileiro.",
    open: false,
  },
  {
    question: "Preciso me cadastrar para usar?",
    answer:
      "Não! O simulador funciona sem necessidade de cadastro, login ou fornecimento de dados pessoais. Sua privacidade é importante para nós.",
    open: false,
  },
  {
    question: "Os resultados são garantidos?",
    answer:
      "Os resultados são simulações baseadas em projeções matemáticas. Investimentos reais podem ter variações devido a condições de mercado, taxas e outros fatores. Sempre consulte um especialista financeiro.",
    open: false,
  },
  {
    question: "Posso salvar minhas simulações?",
    answer:
      "Atualmente, você pode imprimir os resultados das simulações. Estamos trabalhando em funcionalidades de salvamento e histórico para futuras versões.",
    open: false,
  },
  {
    question: "O simulador funciona em celular?",
    answer:
      "Sim! O InvestSim é totalmente responsivo e funciona perfeitamente em smartphones, tablets e desktops com a mesma qualidade.",
    open: false,
  },
]);

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: "smooth" });
};

const toggleFaq = (index) => {
  faqs[index].open = !faqs[index].open;
};
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
