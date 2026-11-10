<template>
  <SolucaoLayout :name="currentMeta.name">
    <component :is="DynamicComponent" v-if="DynamicComponent" />
    <div v-else class="max-w-2xl mx-auto py-16 px-4 text-center">
      <div class="bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044] rounded-2xl p-10 border border-white/10 shadow-xl">
        <div class="w-20 h-20 mx-auto mb-5 rounded-2xl bg-accent-500/20 flex items-center justify-center">
          <Icon icon="mdi:rocket-launch-outline" class="w-10 h-10 text-accent-400" />
        </div>
        <h2 class="text-xl font-bold text-white mb-2">Em breve</h2>
        <p class="text-blue-200 text-sm mb-6 leading-relaxed">
          Esta solução está sendo desenvolvida e estará disponível em breve. Volte em alguns dias!
        </p>
        <RouterLink
          to="/solucoes"
          class="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Icon icon="mdi:apps" class="w-4 h-4" />
          Ver todas as Soluções
        </RouterLink>
      </div>
    </div>
  </SolucaoLayout>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, h, defineComponent, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import SolucaoLayout from '@/components/solucoes/SolucaoLayout.vue'
import { solucoesMap } from '@/components/solucoes/index'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const solutionMeta: Record<string, { name: string }> = {
  'analisador-texto': { name: 'Analisador de Texto' },
  'calculadora-aluguel-facil': { name: 'Calculadora de Aluguel Fácil' },
  'calculadora-campanha-trafego': { name: 'Calculadora de Campanha de Tráfego' },
  'calculadora-churrasco': { name: 'Calculadora de Churrasco' },
  'calculadora-empresarial': { name: 'Calculadora Empresarial' },
  'calculadora-evento': { name: 'Calculadora de Evento' },
  'calculadora-freelance': { name: 'Calculadora Freelance' },
  'calculadora-imc': { name: 'Calculadora de IMC' },
  'calculadora-indicadores-financeiros': { name: 'Calculadora de Indicadores Financeiros' },
  'calculadora-metragem-cabo': { name: 'Calculadora de Metragem de Cabo' },
  'calculadora-orcamento-marketing-digital': { name: 'Calculadora de Orçamento de Marketing Digital' },
  'calculadora-ponto-eletrico': { name: 'Calculadora de Ponto Elétrico' },
  'calculadora-preco': { name: 'Calculadora de Preço' },
  'calculadora-produto-servico': { name: 'Calculadora de Produto/Serviço' },
  'calculadora-programadores': { name: 'Calculadora para Programadores' },
  'calculadora-saude': { name: 'Calculadora de Saúde' },
  'calculadora-social-midia': { name: 'Calculadora Social Mídia' },
  'code-logic-flow-studio': { name: 'Code Logic Flow Studio' },
  'code-master': { name: 'Code Master' },
  'dados-brasil-generator-pro': { name: 'Dados Brasil Generator Pro' },
  'dev-playground': { name: 'Dev Playground' },
  'dev-start': { name: 'Dev Start' },
  'dev-toolkit-suite-essentials': { name: 'Dev Toolkit Suite Essentials' },
  'empreenda-facil': { name: 'Empreenda Fácil' },
  'entity-converter-pro': { name: 'Entity Converter Pro' },
  'excel-consolidator': { name: 'Excel Consolidator' },
  'gerador-legenda': { name: 'Gerador de Legenda' },
  'investsim': { name: 'InvestSim' },
  'marca-dagua': { name: "Marca d'Água" },
  'orcamento-social-midia': { name: 'Orçamento Social Mídia' },
  'rendimento-salarial': { name: 'Rendimento Salarial' },
  'seu-peso': { name: 'Seu Peso' },
  'simuladores-empresariais': { name: 'Simuladores Empresariais' },
  'srt-converter-pro': { name: 'SRT Converter Pro' },
  'thumbnail-pro': { name: 'Thumbnail Pro' },
  'thumbnail-youtube': { name: 'Thumbnail YouTube' },
  'code-gen': { name: 'Gerador de QR Code e Código de Barras' },
  'color-craft': { name: 'Color Craft' },
  'conversor-cores': { name: 'Conversor de Cores' },
  'convert-share': { name: 'Convert & Share' },
  'digitador': { name: 'Digitador Automático' },
  'divisor-texto': { name: 'Divisor de Texto' },
  'extrator-email-cpf-cnpj': { name: 'Extrator de E-mail, CPF e CNPJ' },
  'extrator-texto': { name: 'Extrator de Texto' },
  'finance-flow': { name: 'Finance Flow' },
  'gerador-fatura': { name: 'Gerador de Fatura' },
  'gerador-gradiente': { name: 'Gerador de Gradiente' },
  'ipsum-generator-plus': { name: 'Ipsum Generator Plus' },
  'manipulador-lista': { name: 'Manipulador de Lista' },
  'meu-bolso-mensal': { name: 'Meu Bolso Mensal' },
  'modificador-texto': { name: 'Modificador de Texto' },
  'pdf-convert-pro': { name: 'PDF Convert Pro' },
  'planejador-casamento': { name: 'Planejador de Casamento' },
  'qr-code-pro': { name: 'QR Code Pro' },
  'secure-secret-generator': { name: 'Gerador de Senhas Seguras' },
  'sorteio-facil': { name: 'Sorteio Fácil' },
  'teste-personalidade': { name: 'Teste de Personalidade' },
  'watermark-wizard': { name: 'Watermark Wizard' },
  'extrator-email': { name: 'Extrator de E-mails' },
  'consulta-pix': { name: 'Consulta PIX' },
  'teste-vocacional': { name: 'Teste Vocacional' },
  'wordcraft-pro': { name: 'WordCraft Pro' },
}

const currentMeta = computed(() => solutionMeta[slug.value] ?? { name: slug.value })

const LoadingCard: Component = defineComponent({
  setup() {
    return () =>
      h('div', { class: 'flex items-center justify-center py-20 text-blue-300 text-sm gap-2' }, [
        h('span', { class: 'animate-spin inline-block w-5 h-5 border-2 border-blue-300 border-t-transparent rounded-full' }),
        'Carregando solução...',
      ])
  },
})

const ErrorCard: Component = defineComponent({
  setup() {
    return () =>
      h('div', { class: 'flex flex-col items-center justify-center py-20 text-red-400 text-sm gap-2' }, [
        'Erro ao carregar solução. Tente recarregar a página.',
      ])
  },
})

const DynamicComponent = computed(() => {
  const loader = solucoesMap[slug.value]
  if (!loader) return null
  return defineAsyncComponent({
    loader,
    loadingComponent: LoadingCard,
    errorComponent: ErrorCard,
  })
})
</script>
