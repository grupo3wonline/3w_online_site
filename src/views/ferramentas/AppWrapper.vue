<template>
  <!-- Renderiza diretamente dentro do <main> do ToolWrapper (sem layout próprio) -->
  <component :is="DynamicComponent" v-if="DynamicComponent" />

  <!-- Estado "em breve" para slugs sem componente mapeado -->
  <div v-else class="max-w-2xl mx-auto py-16 px-4 text-center">
    <div class="bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044] rounded-2xl p-10 border border-white/10 shadow-xl">
      <div class="w-20 h-20 mx-auto mb-5 rounded-2xl bg-primary-500/20 flex items-center justify-center">
        <Icon icon="mdi:rocket-launch-outline" class="w-10 h-10 text-primary-400" />
      </div>
      <h2 class="text-xl font-bold text-white mb-2">Em breve</h2>
      <p class="text-blue-200 text-sm mb-6 leading-relaxed">
        Esta aplicação está sendo desenvolvida e estará disponível em breve.
      </p>
      <RouterLink
        to="/ferramentas#aplicacoes"
        class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
      >
        <Icon icon="mdi:tools" class="w-4 h-4" />
        Ver todas as Ferramentas &amp; Aplicações
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, h, defineComponent, watch, onMounted, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { solucoesMap } from '@/components/tools/apps-map'
import { useSeo } from '@/composables/useSeo'
import { useAnalytics } from '@/composables/useAnalytics'
import { useRecaptcha } from '@/composables/useRecaptcha'

const route = useRoute()

// Slug vem de /ferramentas/:slug (rota dinâmica, último filho de ToolWrapper)
const slug = computed(() => (route.params.slug as string) || '')

// Mapeamento slug → nome legível (usado pelo breadcrumb do ToolWrapper via route.meta.title)
const solutionMeta: Record<string, { name: string }> = {
  'analisador-texto':                       { name: 'Analisador de Texto' },
  'calculadora-aluguel-facil':              { name: 'Calculadora de Aluguel Fácil' },
  'calculadora-campanha-trafego':           { name: 'Calculadora de Campanha de Tráfego' },
  'calculadora-churrasco':                  { name: 'Calculadora de Churrasco' },
  'calculadora-empresarial':                { name: 'Calculadora Empresarial' },
  'calculadora-evento':                     { name: 'Calculadora de Evento' },
  'calculadora-freelance':                  { name: 'Calculadora Freelance' },
  'calculadora-imc':                        { name: 'Calculadora de IMC' },
  'calculadora-indicadores-financeiros':    { name: 'Calculadora de Indicadores Financeiros' },
  'calculadora-metragem-cabo':              { name: 'Calculadora de Metragem de Cabo' },
  'calculadora-orcamento-marketing-digital':{ name: 'Calculadora de Orçamento de Marketing Digital' },
  'calculadora-ponto-eletrico':             { name: 'Calculadora de Ponto Elétrico' },
  'calculadora-preco':                      { name: 'Calculadora de Preço' },
  'calculadora-produto-servico':            { name: 'Calculadora de Produto/Serviço' },
  'calculadora-programadores':              { name: 'Calculadora para Programadores' },
  'calculadora-saude':                      { name: 'Calculadora de Saúde' },
  'calculadora-social-midia':               { name: 'Calculadora Social Mídia' },
  'code-logic-flow-studio':                 { name: 'Code Logic Flow Studio' },
  'code-master':                            { name: 'Code Master' },
  'dados-brasil-generator-pro':             { name: 'Dados Brasil Generator Pro' },
  'dev-playground':                         { name: 'Dev Playground' },
  'dev-start':                              { name: 'Dev Start' },
  'dev-toolkit-suite-essentials':           { name: 'Dev Toolkit Suite Essentials' },
  'empreenda-facil':                        { name: 'Empreenda Fácil' },
  'entity-converter-pro':                   { name: 'Entity Converter Pro' },
  'excel-consolidator':                     { name: 'Excel Consolidator' },
  'gerador-legenda':                        { name: 'Gerador de Legenda' },
  'investsim':                              { name: 'InvestSim' },
  'marca-dagua':                            { name: "Marca d'Água" },
  'orcamento-social-midia':                 { name: 'Orçamento Social Mídia' },
  'rendimento-salarial':                    { name: 'Rendimento Salarial' },
  'seu-peso':                               { name: 'Seu Peso' },
  'simuladores-empresariais':               { name: 'Simuladores Empresariais' },
  'srt-converter-pro':                      { name: 'SRT Converter Pro' },
  'thumbnail-pro':                          { name: 'Thumbnail Pro' },
  'thumbnail-youtube':                      { name: 'Thumbnail YouTube' },
  'code-gen':                               { name: 'Gerador de QR Code e Código de Barras' },
  'color-craft':                            { name: 'Color Craft' },
  'conversor-cores':                        { name: 'Conversor de Cores' },
  'convert-share':                          { name: 'Convert & Share' },
  'digitador':                              { name: 'Digitador Automático' },
  'divisor-texto':                          { name: 'Divisor de Texto' },
  'extrator-email-cpf-cnpj':               { name: 'Extrator de E-mail, CPF e CNPJ' },
  'extrator-texto':                         { name: 'Extrator de Texto' },
  'finance-flow':                           { name: 'Finance Flow' },
  'gerador-fatura':                         { name: 'Gerador de Fatura' },
  'gerador-gradiente':                      { name: 'Gerador de Gradiente' },
  'ipsum-generator-plus':                   { name: 'Ipsum Generator Plus' },
  'manipulador-lista':                      { name: 'Manipulador de Lista' },
  'meu-bolso-mensal':                       { name: 'Meu Bolso Mensal' },
  'modificador-texto':                      { name: 'Modificador de Texto' },
  'pdf-convert-pro':                        { name: 'PDF Convert Pro' },
  'planejador-casamento':                   { name: 'Planejador de Casamento' },
  'qr-code-pro':                            { name: 'QR Code Pro' },
  'secure-secret-generator':               { name: 'Gerador de Senhas Seguras' },
  'sorteio-facil':                          { name: 'Sorteio Fácil' },
  'teste-personalidade':                    { name: 'Teste de Personalidade' },
  'watermark-wizard':                       { name: 'Watermark Wizard' },
  'extrator-email':                         { name: 'Extrator de E-mails' },
  'consulta-pix':                           { name: 'Consulta PIX' },
  'teste-vocacional':                       { name: 'Teste Vocacional' },
  'wordcraft-pro':                          { name: 'WordCraft Pro' },
  // ── Geradores de Documentos ───────────────────────────────────────────────
  'gerador-recibo-simples':                 { name: 'Recibo Simples' },
  'nota-promissoria':                       { name: 'Nota Promissória' },
  'declaracao-residencia':                  { name: 'Declaração de Residência' },
  'recibo-servico':                         { name: 'Recibo de Serviço' },
  'recibo-aluguel':                         { name: 'Recibo de Aluguel' },
  'recibo-salario':                         { name: 'Recibo de Salário' },
  'ordem-servico':                          { name: 'Ordem de Serviço' },
  'gerador-orcamento-doc':                  { name: 'Gerador de Orçamento' },
  'gerador-curriculo':                      { name: 'Gerador de Currículo' },
  'declaracao-hipossuficiencia':            { name: 'Declaração de Hipossuficiência' },
  'declaracao-uniao-estavel-doc':           { name: 'Declaração de União Estável' },
  'declaracao-comodato':                    { name: 'Declaração de Comodato' },
  'declaracao-dependencia-economica':       { name: 'Declaração de Dependência Econômica' },
  'declaracao-anuencia':                    { name: 'Declaração de Anuência' },
  'declaracao-bons-antecedentes':           { name: 'Declaração de Bons Antecedentes' },
  'autodeclaracao-etnico-racial':           { name: 'Autodeclaração Étnico-Racial' },
  'declaracao-veracidade':                  { name: 'Declaração de Veracidade' },
  'procuracao-particular':                  { name: 'Procuração Particular' },
  'termo-quitacao':                         { name: 'Termo de Quitação' },
  'autorizacao-uso-imagem':                 { name: 'Autorização de Uso de Imagem' },
  'contrato-namoro':                        { name: 'Contrato de Namoro' },
  'comprovante-renda-mei':                  { name: 'Comprovante de Renda MEI' },
  'declaracao-renda-informal':              { name: 'Declaração de Renda Informal' },
  'contrato-aluguel-residencial':           { name: 'Contrato de Aluguel Residencial' },
  'contrato-uniao-estavel':                 { name: 'Contrato de União Estável' },
  'autorizacao-viagem-menor':               { name: 'Autorização de Viagem para Menor' },
  'contrato-prestacao-servico':             { name: 'Contrato de Prestação de Serviço' },
  'declaracao-trabalho':                    { name: 'Declaração de Trabalho' },
  // ── 4devs-style tools ─────────────────────────────────────────────────────
  'gerador-cnh':                            { name: 'Gerador de CNH' },
  'gerador-pis':                            { name: 'Gerador de PIS/PASEP' },
  'gerador-renavam':                        { name: 'Gerador de RENAVAM' },
  'gerador-rg':                             { name: 'Gerador de RG' },
  'gerador-titulo-eleitor':                 { name: 'Gerador de Título de Eleitor' },
  'gerador-certidao':                       { name: 'Gerador de Certidões' },
  'gerador-inscricao-estadual':             { name: 'Gerador de Inscrição Estadual' },
  'gerador-conta-bancaria':                 { name: 'Gerador de Conta Bancária' },
  'gerador-cep-br':                         { name: 'Gerador de CEP' },
  'gerador-placa-veiculo':                  { name: 'Gerador de Placa de Veículo' },
  'gerador-veiculo':                        { name: 'Gerador de Dados de Veículo' },
  'validador-cnh':                          { name: 'Validador de CNH' },
  'validador-rg':                           { name: 'Validador de RG' },
  'validador-certidao':                     { name: 'Validador de Certidões' },
  'validador-inscricao-estadual':           { name: 'Validador de Inscrição Estadual' },
  'validador-conta-bancaria':               { name: 'Validador de Conta Bancária' },
  'gerador-pessoas':                        { name: 'Gerador de Pessoas' },
  'gerador-empresas':                       { name: 'Gerador de Empresas' },
  'gerador-nomes':                          { name: 'Gerador de Nomes' },
  'gerador-nicks':                          { name: 'Gerador de Nicks' },
  'simbolos-copiar':                        { name: 'Símbolos para Copiar' },
  'gerador-imagem':                         { name: 'Gerador de Imagem' },
  'texto-ordem-alfabetica':                 { name: 'Colocar em Ordem Alfabética' },
  'texto-inverter':                         { name: 'Inverter Texto' },
  'texto-remover-acentos':                  { name: 'Remover Acentos do Texto' },
  'texto-newlines':                         { name: 'Remover ou Trocar \\n' },
  'texto-contador-ocorrencias':             { name: 'Contador de Ocorrência de Palavra' },
  'texto-cortar':                           { name: 'Cortar Textos' },
  'texto-info-caracter':                    { name: 'Informações de Caractere' },
  'contador-caracteres':                    { name: 'Contador de Caracteres' },
  'letras-especiais':                       { name: 'Letras Especiais' },
  'letras-diferentes':                      { name: 'Gerador de Letras Diferentes' },
  'letras-personalizadas':                  { name: 'Letras Personalizadas' },
  'corretor-ortografico':                   { name: 'Corretor Ortográfico' },
  'numero-por-extenso':                     { name: 'Número por Extenso' },
  'fatorar-numero':                         { name: 'Fatorar Número' },
  'resto-divisao':                          { name: 'Resto da Divisão' },
  'numeros-aleatorios':                     { name: 'Gerador de Números Aleatórios' },
  'area-circulo':                           { name: 'Área do Círculo' },
  'area-quadrado':                          { name: 'Área do Quadrado' },
  'area-retangulo':                         { name: 'Área do Retângulo' },
  'area-triangulo':                         { name: 'Área do Triângulo' },
  'area-pentagono':                         { name: 'Área do Pentágono' },
  'area-hexagono':                          { name: 'Área do Hexágono' },
  'area-poligono-regular':                  { name: 'Área do Polígono Regular' },
  'area-losango':                           { name: 'Área do Losango' },
  'area-trapezio':                          { name: 'Área do Trapézio' },
  'area-paralelogramo':                     { name: 'Área do Paralelogramo' },
  'area-elipse':                            { name: 'Área da Elipse' },
  'area-coroa-circular':                    { name: 'Área da Coroa Circular' },
  'area-setor-circular':                    { name: 'Área do Setor Circular' },
  'contador-dias':                          { name: 'Contador de Dias entre Datas' },
  'somar-dias':                             { name: 'Somar Dias em Datas' },
  'subtrair-dias':                          { name: 'Subtrair Dias em Datas' },
  'meu-ip':                                 { name: 'Meu Endereço IP' },
  'consulta-dominio':                       { name: 'Consulta de Domínio & WHOIS' },
  'whois-dominio':                          { name: 'WHOIS / Domínio' },
  // ── Marketing Pro & Design Pro ────────────────────────────────────────────
  'calculadora-engajamento':               { name: 'Calculadora de Engajamento' },
  'calculadora-roas':                      { name: 'Calculadora de ROAS' },
  'calculadora-ltv':                       { name: 'Calculadora de LTV' },
  'calculadora-cac':                       { name: 'Calculadora de CAC' },
  'simulador-funil-vendas':                { name: 'Simulador de Funil de Vendas' },
  'calculadora-email-marketing':           { name: 'Calculadora de E-mail Marketing' },
  'gerador-hashtags':                      { name: 'Gerador de Hashtags' },
  'calculadora-cpm-cpc':                   { name: 'Calculadora de CPM/CPC/CPA' },
  'calculadora-seo-organico':              { name: 'Calculadora de SEO Orgânico' },
  'calculadora-nps':                       { name: 'Calculadora de NPS' },
  'calculadora-churn':                     { name: 'Calculadora de Churn' },
  'calculadora-roi-marketing':             { name: 'Calculadora de ROI de Marketing' },
  'calculadora-influenciador':             { name: 'Calculadora de Influenciadores' },
  'gerador-box-shadow':                    { name: 'Gerador de Box Shadow CSS' },
  'gerador-border-radius':                 { name: 'Gerador de Border Radius CSS' },
  'verificador-contraste-wcag':            { name: 'Verificador de Contraste WCAG' },
  'escala-tipografica':                    { name: 'Escala Tipográfica Modular' },
  'calculadora-proporcao-tela':            { name: 'Calculadora de Proporção' },
  'paleta-harmonica':                      { name: 'Paleta de Cores Harmônica' },
  'sistema-espacamento':                   { name: 'Sistema de Espaçamento CSS' },
  'gerador-text-shadow':                   { name: 'Gerador de Text Shadow CSS' },
  'conversor-cores-avancado':              { name: 'Conversor de Cores Avançado' },
  'gerador-gradiente-avancado':            { name: 'Gerador de Gradiente Avançado' },
  'gerador-padroes-css':                   { name: 'Gerador de Padrões CSS' },
  'calculadora-financeira-pro':             { name: 'Calculadora Financeira' },
  'gerador-tabuada-avancado':               { name: 'Gerador de Tabuada Avançado' },
  'conversor-ascii':                        { name: 'ASCII / Encoding Converter' },
  'gerador-loteria':                        { name: 'Gerador de Jogos de Loteria' },
}

// Atualiza o meta.title da rota para que o ToolWrapper mostre o nome correto no breadcrumb
watch(
  slug,
  (newSlug) => {
    const meta = solutionMeta[newSlug]
    if (meta) {
      const title = `${meta.name} | Ferramentas 3W Online`
      ;(route.meta as Record<string, unknown>).title = title
      document.title = title
    }
  },
  { immediate: true },
)

// ── Componentes de estado de carregamento / erro ──────────────────────────────
const LoadingCard: Component = defineComponent({
  setup: () => () =>
    h('div', { class: 'flex items-center justify-center py-20 text-blue-300 text-sm gap-2' }, [
      h('span', { class: 'animate-spin inline-block w-5 h-5 border-2 border-blue-300 border-t-transparent rounded-full' }),
      'Carregando aplicação...',
    ]),
})

const ErrorCard: Component = defineComponent({
  setup: () => () =>
    h('div', { class: 'flex flex-col items-center justify-center py-20 text-red-400 text-sm gap-2' }, [
      'Erro ao carregar a aplicação. Tente recarregar a página.',
    ]),
})

// ── Componente dinâmico ───────────────────────────────────────────────────────
const DynamicComponent = computed(() => {
  const loader = solucoesMap[slug.value]
  if (!loader) return null
  return defineAsyncComponent({
    loader,
    loadingComponent: LoadingCard,
    errorComponent:   ErrorCard,
  })
})

// ── SEO / Analytics / reCAPTCHA ───────────────────────────────────────────────
const { applySeo } = useSeo()
const { trackToolUsage } = useAnalytics()
const { execute: executeRecaptcha } = useRecaptcha()

function setupAppTracking() {
  const appName = solutionMeta[slug.value]?.name || slug.value

  applySeo({
    title: appName + ' | Aplicacao Online Gratuita | 3W Online',
    description: 'Use ' + appName + ' online gratuitamente. Ferramenta web desenvolvida pela 3W Online para facilitar seu trabalho em Curitiba e todo o Brasil.',
    path: route.path,
    keywords: appName.toLowerCase() + ', aplicacao online, ferramenta gratuita, 3w online, curitiba',
  })

  trackToolUsage(appName, 'view')
  executeRecaptcha('app_view').catch(() => { /* silent */ })
}

onMounted(setupAppTracking)
watch(() => slug.value, setupAppTracking)
</script>
