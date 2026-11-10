<template>
  <div class="solucoes-page">
    <!-- Header Dark Navy -->
    <div class="bg-gradient-to-r from-[#0a1628] via-[#111d3a] to-[#162044] py-4 border-b border-white/10">
      <div class="container">
        <nav class="flex items-center text-xs text-blue-300 gap-1.5" aria-label="Trilha de navegação">
          <RouterLink to="/" class="hover:text-white transition-colors flex items-center gap-1">
            <Icon icon="mdi:home" class="w-3.5 h-3.5" />
            <span>Início</span>
          </RouterLink>
          <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-blue-400/60" />
          <span class="text-white font-medium">Soluções Digitais</span>
        </nav>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="page-hero relative overflow-hidden">
      <div class="container relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 bg-accent-500/20 text-accent-300 border border-accent-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:rocket-launch-outline" class="w-3.5 h-3.5 text-accent-400" />
            <span>62 Soluções • 100% Gratuitas & Client-Side</span>
          </div>

          <h1 class="page-hero-title">
            62 Soluções Digitais Gratuitas
          </h1>

          <p class="page-hero-subtitle mb-8 max-w-2xl leading-relaxed">
            Calculadoras financeiras, ferramentas de marketing, dev tools, geradores de conteúdo e muito mais. Tudo rodando no seu navegador, sem cadastro.
          </p>

          <div class="flex flex-wrap gap-2.5">
            <div class="flex items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-3.5 py-1.5 text-xs text-white">
              <Icon icon="mdi:shield-check" class="w-4 h-4 mr-1.5 text-green-400" />
              <span>Privacidade Total</span>
            </div>
            <div class="flex items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-3.5 py-1.5 text-xs text-white">
              <Icon icon="mdi:flash" class="w-4 h-4 mr-1.5 text-yellow-400" />
              <span>Processamento Instantâneo</span>
            </div>
            <div class="flex items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-3.5 py-1.5 text-xs text-white">
              <Icon icon="mdi:gift-outline" class="w-4 h-4 mr-1.5 text-pink-300" />
              <span>Sem Cadastro</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Filter Chips -->
    <section class="sticky top-14 md:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-3">
      <div class="container">
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            v-for="cat in categories"
            :key="cat.id"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border whitespace-nowrap flex items-center gap-1.5 shrink-0',
              selectedCat === cat.id
                ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400 hover:text-primary-600',
            ]"
            @click="selectCat(cat.id)"
          >
            <Icon :icon="cat.icon" class="w-3.5 h-3.5" />
            <span>{{ cat.label }}</span>
            <span
              v-if="cat.id !== 'todas'"
              class="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
              :class="selectedCat === cat.id ? 'bg-white/20' : 'bg-gray-100 text-gray-500'"
            >
              {{ solutions.filter(s => s.category === cat.id).length }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Solution Cards Grid -->
    <section class="container py-8">
      <div class="mb-5 flex items-center justify-between">
        <p class="text-sm text-gray-600">
          <span class="font-semibold text-gray-900">{{ filteredSolutions.length }}</span>
          solução(ões) encontrada(s)
          <span v-if="selectedCat !== 'todas'" class="text-primary-600 font-medium">
            em {{ categories.find(c => c.id === selectedCat)?.label }}
          </span>
        </p>
        <RouterLink to="/ferramentas" class="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1">
          <Icon icon="mdi:tools" class="w-3.5 h-3.5" />
          Ver Ferramentas (120+)
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <RouterLink
          v-for="sol in filteredSolutions"
          :key="sol.slug"
          :to="`/solucoes/${sol.slug}`"
          class="group flex flex-col p-4 rounded-xl border border-gray-100 bg-white hover:bg-primary-50/40 hover:border-primary-200 hover:shadow-md transition-all"
        >
          <div class="flex items-start gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors">
              <Icon :icon="sol.icon" class="w-5 h-5" />
            </div>
            <div class="min-w-0">
              <h3 class="text-xs font-bold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">
                {{ sol.name }}
              </h3>
              <span class="text-[10px] text-gray-400 mt-0.5 inline-block capitalize">{{ sol.category }}</span>
            </div>
          </div>
          <p class="text-[11px] text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-3">
            {{ sol.description }}
          </p>
          <div class="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] font-semibold text-primary-600 group-hover:text-primary-700">
            <span>Acessar →</span>
            <Icon icon="mdi:arrow-top-right" class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- CTA Dark Navy -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Soluções Personalizadas</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-3">Precisa de uma solução sob medida?</h2>
        <p class="text-sm text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Desenvolvemos sistemas, plataformas e aplicativos personalizados para o seu negócio.
        </p>
        <div class="flex flex-col sm:flex-row gap-3.5 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento para desenvolvimento."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary text-sm font-bold shadow-lg"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" />
            Falar no WhatsApp
          </a>
          <RouterLink to="/servicos" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-sm font-bold shadow-lg">
            Ver Nossos Serviços
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

interface Solution {
  slug: string
  name: string
  category: string
  description: string
  icon: string
}

interface Category {
  id: string
  label: string
  icon: string
}

const route = useRoute()
const router = useRouter()

const catParam = computed(() => (route.query.cat as string) || 'todas')
const selectedCat = ref(catParam.value)

watch(catParam, (newVal) => {
  selectedCat.value = newVal
})

const categories: Category[] = [
  { id: 'todas', label: 'Todas', icon: 'mdi:apps' },
  { id: 'financas', label: 'Finanças & Saúde', icon: 'mdi:cash-multiple' },
  { id: 'marketing', label: 'Marketing', icon: 'mdi:trending-up' },
  { id: 'dev', label: 'Dev Tools', icon: 'mdi:code-braces' },
  { id: 'texto', label: 'Texto & Conteúdo', icon: 'mdi:text-box-outline' },
  { id: 'design', label: 'Design & Mídia', icon: 'mdi:palette-outline' },
  { id: 'negocios', label: 'Negócios', icon: 'mdi:briefcase-outline' },
]

const solutions: Solution[] = [
  // Finanças & Saúde
  { slug: 'calculadora-imc', name: 'Calculadora de IMC', category: 'financas', description: 'Calcule seu Índice de Massa Corporal e veja sua classificação de peso.', icon: 'mdi:weight' },
  { slug: 'calculadora-saude', name: 'Calculadora de Saúde', category: 'financas', description: 'Ferramentas completas de saúde: TMB, hidratação e mais.', icon: 'mdi:heart-pulse' },
  { slug: 'seu-peso', name: 'Seu Peso', category: 'financas', description: 'Monitore seu peso e acompanhe seu progresso de forma simples.', icon: 'mdi:scale' },
  { slug: 'calculadora-aluguel-facil', name: 'Calculadora de Aluguel Fácil', category: 'financas', description: 'Calcule o aluguel ideal com base na sua renda e custos fixos.', icon: 'mdi:home-city' },
  { slug: 'calculadora-freelance', name: 'Calculadora Freelance', category: 'financas', description: 'Calcule o valor da sua hora e precifique seus projetos freelance.', icon: 'mdi:briefcase-account' },
  { slug: 'calculadora-preco', name: 'Calculadora de Preço', category: 'financas', description: 'Defina o preço ideal para produtos e serviços com margem de lucro.', icon: 'mdi:tag' },
  { slug: 'calculadora-produto-servico', name: 'Calculadora de Produto/Serviço', category: 'financas', description: 'Calcule o custo total de produtos e serviços incluindo impostos.', icon: 'mdi:package-variant' },
  { slug: 'calculadora-indicadores-financeiros', name: 'Calculadora de Indicadores Financeiros', category: 'financas', description: 'Analise KPIs financeiros: ROI, ROE, liquidez e muito mais.', icon: 'mdi:chart-box' },
  { slug: 'investsim', name: 'InvestSim', category: 'financas', description: 'Simule investimentos e compare rendimentos de diferentes ativos.', icon: 'mdi:trending-up' },
  { slug: 'finance-flow', name: 'Finance Flow', category: 'financas', description: 'Controle seu fluxo de caixa e visualize entradas e saídas.', icon: 'mdi:cash-multiple' },
  { slug: 'rendimento-salarial', name: 'Rendimento Salarial', category: 'financas', description: 'Calcule seu salário líquido com todos os descontos e benefícios.', icon: 'mdi:currency-usd' },
  { slug: 'meu-bolso-mensal', name: 'Meu Bolso Mensal', category: 'financas', description: 'Planeje seu orçamento mensal e controle seus gastos pessoais.', icon: 'mdi:wallet' },
  { slug: 'planejador-casamento', name: 'Planejador de Casamento', category: 'financas', description: 'Organize e calcule todos os custos do seu casamento dos sonhos.', icon: 'mdi:heart' },
  { slug: 'calculadora-orcamento-marketing-digital', name: 'Calculadora de Orçamento de Marketing Digital', category: 'financas', description: 'Calcule o orçamento ideal para campanhas de marketing digital.', icon: 'mdi:bullseye-arrow' },
  { slug: 'calculadora-churrasco', name: 'Calculadora de Churrasco', category: 'financas', description: 'Calcule a quantidade de carne e bebidas para o seu churrasco.', icon: 'mdi:fire' },
  { slug: 'calculadora-evento', name: 'Calculadora de Evento', category: 'financas', description: 'Calcule custos e organize o orçamento do seu próximo evento.', icon: 'mdi:calendar-star' },

  // Marketing
  { slug: 'calculadora-campanha-trafego', name: 'Calculadora de Campanha de Tráfego', category: 'marketing', description: 'Calcule métricas de campanhas: CPC, CPM, ROI e conversões.', icon: 'mdi:chart-bar' },
  { slug: 'calculadora-social-midia', name: 'Calculadora Social Mídia', category: 'marketing', description: 'Calcule o investimento e retorno esperado em mídias sociais.', icon: 'mdi:facebook' },
  { slug: 'orcamento-social-midia', name: 'Orçamento Social Mídia', category: 'marketing', description: 'Monte o orçamento completo para gestão de redes sociais.', icon: 'mdi:instagram' },
  { slug: 'gerador-legenda', name: 'Gerador de Legenda', category: 'marketing', description: 'Gere legendas criativas e otimizadas para redes sociais.', icon: 'mdi:closed-caption' },
  { slug: 'calculadora-programadores', name: 'Calculadora para Programadores', category: 'marketing', description: 'Calculadora multi-função essencial para desenvolvedores.', icon: 'mdi:code-tags' },
  { slug: 'simuladores-empresariais', name: 'Simuladores Empresariais', category: 'marketing', description: 'Simule cenários empresariais e tome decisões estratégicas.', icon: 'mdi:domain' },
  { slug: 'empreenda-facil', name: 'Empreenda Fácil', category: 'marketing', description: 'Ferramenta completa para planejamento do seu empreendimento.', icon: 'mdi:store' },
  { slug: 'calculadora-empresarial', name: 'Calculadora Empresarial', category: 'marketing', description: 'Calcule indicadores essenciais para a gestão da sua empresa.', icon: 'mdi:calculator-variant' },

  // Dev Tools
  { slug: 'code-gen', name: 'Gerador de QR Code e Código de Barras', category: 'dev', description: 'Gere QR Codes e códigos de barras personalizados com download.', icon: 'mdi:qrcode' },
  { slug: 'code-logic-flow-studio', name: 'Code Logic Flow Studio', category: 'dev', description: 'Crie e visualize fluxos de lógica de código interativos.', icon: 'mdi:arrow-decision-outline' },
  { slug: 'code-master', name: 'Code Master', category: 'dev', description: 'Editor de código com syntax highlighting e execução em tempo real.', icon: 'mdi:code-json' },
  { slug: 'dev-playground', name: 'Dev Playground', category: 'dev', description: 'Playground interativo para testar HTML, CSS e JavaScript.', icon: 'mdi:play-circle-outline' },
  { slug: 'dev-start', name: 'Dev Start', category: 'dev', description: 'Kit de início rápido para novos projetos de desenvolvimento.', icon: 'mdi:rocket-launch-outline' },
  { slug: 'dev-toolkit-suite-essentials', name: 'Dev Toolkit Suite Essentials', category: 'dev', description: 'Suite completa de ferramentas essenciais para desenvolvedores.', icon: 'mdi:toolbox-outline' },
  { slug: 'calculadora-ponto-eletrico', name: 'Calculadora de Ponto Elétrico', category: 'dev', description: 'Calcule a carga elétrica e potência dos seus projetos técnicos.', icon: 'mdi:lightning-bolt' },
  { slug: 'calculadora-metragem-cabo', name: 'Calculadora de Metragem de Cabo', category: 'dev', description: 'Calcule a quantidade de cabo necessária para instalações.', icon: 'mdi:ethernet-cable' },
  { slug: 'dados-brasil-generator-pro', name: 'Dados Brasil Generator Pro', category: 'dev', description: 'Gere dados fictícios brasileiros para testes e desenvolvimento.', icon: 'mdi:database-outline' },
  { slug: 'entity-converter-pro', name: 'Entity Converter Pro', category: 'dev', description: 'Converta HTML entities e caracteres especiais facilmente.', icon: 'mdi:swap-horizontal' },
  { slug: 'excel-consolidator', name: 'Excel Consolidator', category: 'dev', description: 'Consolide e manipule planilhas Excel diretamente no browser.', icon: 'mdi:microsoft-excel' },
  { slug: 'pdf-convert-pro', name: 'PDF Convert Pro', category: 'dev', description: 'Converta, mescle e manipule arquivos PDF online sem instalação.', icon: 'mdi:file-pdf-box' },
  { slug: 'srt-converter-pro', name: 'SRT Converter Pro', category: 'dev', description: 'Converta e edite legendas SRT com suporte a múltiplos formatos.', icon: 'mdi:subtitles-outline' },
  { slug: 'qr-code-pro', name: 'QR Code Pro', category: 'dev', description: 'Crie QR Codes com logo, cores e download em alta qualidade.', icon: 'mdi:qrcode-scan' },
  { slug: 'secure-secret-generator', name: 'Gerador de Senhas Seguras', category: 'dev', description: 'Gere senhas e segredos altamente seguros e criptografados.', icon: 'mdi:key-variant' },
  { slug: 'conversor-cores', name: 'Conversor de Cores', category: 'dev', description: 'Converta cores entre HEX, RGB, HSL e outros formatos.', icon: 'mdi:eyedropper-variant' },
  { slug: 'convert-share', name: 'Convert & Share', category: 'dev', description: 'Converta e compartilhe arquivos nos formatos mais populares.', icon: 'mdi:share-variant-outline' },

  // Texto & Conteúdo
  { slug: 'analisador-texto', name: 'Analisador de Texto', category: 'texto', description: 'Analise textos: contagem de palavras, frequência e legibilidade.', icon: 'mdi:text-search' },
  { slug: 'divisor-texto', name: 'Divisor de Texto', category: 'texto', description: 'Divida textos longos em partes iguais ou por delimitador.', icon: 'mdi:format-columns' },
  { slug: 'extrator-email-cpf-cnpj', name: 'Extrator de E-mail, CPF e CNPJ', category: 'texto', description: 'Extraia e-mails, CPFs e CNPJs de qualquer texto automaticamente.', icon: 'mdi:email-search-outline' },
  { slug: 'extrator-texto', name: 'Extrator de Texto', category: 'texto', description: 'Extraia conteúdo específico de textos com expressões regulares.', icon: 'mdi:text-box-search-outline' },
  { slug: 'manipulador-lista', name: 'Manipulador de Lista', category: 'texto', description: 'Manipule listas: ordene, duplique, filtre e transforme.', icon: 'mdi:format-list-bulleted' },
  { slug: 'modificador-texto', name: 'Modificador de Texto', category: 'texto', description: 'Transforme textos: maiúsculas, slug, título e muito mais.', icon: 'mdi:format-text' },
  { slug: 'wordcraft-pro', name: 'WordCraft Pro', category: 'texto', description: 'Editor de texto avançado com ferramentas de formatação profissional.', icon: 'mdi:pencil-ruler' },
  { slug: 'ipsum-generator-plus', name: 'Ipsum Generator Plus', category: 'texto', description: 'Gere Lorem Ipsum e textos placeholder personalizados.', icon: 'mdi:format-quote-close' },
  { slug: 'extrator-email', name: 'Extrator de E-mails', category: 'texto', description: 'Extraia todos os endereços de e-mail de um texto com um clique.', icon: 'mdi:email-multiple-outline' },
  { slug: 'digitador', name: 'Digitador Automático', category: 'texto', description: 'Automatize a digitação de textos com velocidade configurável.', icon: 'mdi:keyboard-outline' },
  { slug: 'teste-personalidade', name: 'Teste de Personalidade', category: 'texto', description: 'Descubra seu perfil de personalidade com testes detalhados.', icon: 'mdi:head-cog-outline' },
  { slug: 'teste-vocacional', name: 'Teste Vocacional', category: 'texto', description: 'Descubra sua vocação e as carreiras mais alinhadas ao seu perfil.', icon: 'mdi:school-outline' },

  // Design & Mídia
  { slug: 'color-craft', name: 'Color Craft', category: 'design', description: 'Crie paletas de cores harmônicas para seus projetos de design.', icon: 'mdi:palette-outline' },
  { slug: 'gerador-gradiente', name: 'Gerador de Gradiente', category: 'design', description: 'Crie gradientes CSS personalizados e copie o código gerado.', icon: 'mdi:gradient-horizontal' },
  { slug: 'gerador-fatura', name: 'Gerador de Fatura', category: 'design', description: 'Crie faturas profissionais e exporte em PDF com sua marca.', icon: 'mdi:receipt-text-outline' },
  { slug: 'thumbnail-pro', name: 'Thumbnail Pro', category: 'design', description: 'Crie thumbnails profissionais para vídeos e conteúdo digital.', icon: 'mdi:image-edit-outline' },
  { slug: 'thumbnail-youtube', name: 'Thumbnail YouTube', category: 'design', description: 'Design de thumbnails otimizados para YouTube com templates.', icon: 'mdi:youtube' },
  { slug: 'marca-dagua', name: "Marca d'Água", category: 'design', description: "Adicione marca d'água às suas imagens de forma simples.", icon: 'mdi:copyright' },
  { slug: 'watermark-wizard', name: 'Watermark Wizard', category: 'design', description: "Ferramenta avançada para criar e aplicar marcas d'água.", icon: 'mdi:image-lock-outline' },

  // Negócios
  { slug: 'sorteio-facil', name: 'Sorteio Fácil', category: 'negocios', description: 'Realize sorteios online transparentes para concursos e rifas.', icon: 'mdi:dice-5-outline' },
  { slug: 'consulta-pix', name: 'Consulta PIX', category: 'negocios', description: 'Consulte e valide chaves PIX de forma rápida e segura.', icon: 'mdi:bank-transfer' },
]

const filteredSolutions = computed(() => {
  if (selectedCat.value === 'todas') return solutions
  return solutions.filter((s) => s.category === selectedCat.value)
})

const selectCat = (id: string) => {
  selectedCat.value = id
  router.replace({
    path: '/solucoes',
    query: id !== 'todas' ? { cat: id } : {},
  })
}
</script>
