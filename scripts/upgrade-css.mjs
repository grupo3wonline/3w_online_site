/**
 * upgrade-css.mjs — Substitui classes CSS antigas por Aurora Glass em todas as ferramentas.
 * Aplica somente nos arquivos que JÁ têm <ToolShell> mas ainda usam padrões antigos.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir  = dirname(fileURLToPath(import.meta.url))
const TOOLS  = join(__dir, '../src/components/tools')

// Tools já totalmente refatorados manualmente — pular
const SKIP_MANUAL = new Set([
  'CalculadoraROI','CalculadoraFreelancer','ValidadorCPF','ValidadorCNPJ',
  'GeradorSenha','CalculadoraDesconto','ConversorMoeda','CalculadoraIMC',
  'GeradorQRCode','CalculadoraPorcentagem','CalculadoraJuros','CalculadoraSalario',
  'GeradorUUID','ConversorBase64','CalculadoraCombustivel','ConversorTemperatura',
  'ValidadorEmail','GeradorCPFCNPJ','CalculadoraEmprestimo','CalculadoraMargem',
])

// ── Mapeamentos de substituição CSS ──────────────────────────────────────────

const CSS_SUBSTITUTIONS = [
  // Fix spacing after > on same line as ToolShell
  [/>\s*(<div|<label|<textarea|<input|<button|<select|<!--)/g, '>\n    $1'],

  // === CONTAINERS ===
  // Metric cards (bg-X p-4 text-center individual)
  [/class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center"/g,
   'class="metric-glass"'],
  [/class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center"/g,
   'class="metric-glass"'],

  // Glass panels (bg-gray-50 or bg-white containers)
  [/class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4"/g,   'class="glass-panel p-5 space-y-4"'],
  [/class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-3"/g,   'class="glass-panel p-5 space-y-3"'],
  [/class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"/g,              'class="glass-panel p-5"'],
  [/class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"/g,              'class="glass-panel p-4"'],
  [/class="bg-gray-50 dark:bg-gray-700 rounded-lg p-5"/g,              'class="glass-panel p-5"'],
  [/class="bg-gray-50 dark:bg-gray-700 rounded-lg"/g,                  'class="glass-panel"'],
  [/class="bg-white dark:bg-gray-700 rounded-lg p-6 space-y-3"/g,      'class="glass-panel p-5 space-y-3"'],
  [/class="bg-white dark:bg-gray-700 rounded-lg p-6"/g,                'class="glass-panel p-5"'],
  [/class="bg-white dark:bg-gray-700 rounded-lg p-4"/g,                'class="glass-panel p-4"'],
  [/class="bg-white dark:bg-gray-700 rounded-lg"/g,                    'class="glass-panel"'],

  // === TIP CARDS ===
  // Info tip (blue/cyan/purple)
  [/class="bg-blue-50 dark:bg-blue-900\/20 border-l-4 border-blue-500 p-4"/g,       'class="tip-card"'],
  [/class="bg-cyan-50 dark:bg-cyan-900\/20 border-l-4 border-cyan-500 p-4"/g,       'class="tip-card"'],
  [/class="bg-indigo-50 dark:bg-indigo-900\/20 border-l-4 border-indigo-500 p-4"/g, 'class="tip-card"'],
  [/class="bg-purple-50 dark:bg-purple-900\/20 border-l-4 border-purple-500 p-4"/g, 'class="tip-card"'],
  [/class="bg-teal-50 dark:bg-teal-900\/20 border-l-4 border-teal-500 p-4"/g,       'class="tip-card"'],
  // Warning tip (orange/amber/red)
  [/class="bg-orange-50 dark:bg-orange-900\/20 border-l-4 border-orange-500 p-4"/g, 'class="tip-card-warning"'],
  [/class="bg-amber-50 dark:bg-amber-900\/20 border-l-4 border-amber-500 p-4"/g,    'class="tip-card-warning"'],
  [/class="bg-yellow-50 dark:bg-yellow-900\/20 border-l-4 border-yellow-500 p-4"/g, 'class="tip-card-warning"'],
  [/class="bg-red-50 dark:bg-red-900\/20 border-l-4 border-red-500 p-4"/g,          'class="tip-card-warning"'],
  // Success tip (green)
  [/class="bg-green-50 dark:bg-green-900\/20 border-l-4 border-green-500 p-4"/g,    'class="tip-card-success"'],
  [/class="bg-emerald-50 dark:bg-emerald-900\/20 border-l-4 border-emerald-500 p-4"/g, 'class="tip-card-success"'],

  // === INPUTS ===
  [/class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-\w+-500 focus:border-transparent(?:\s+transition-all)?(?:\s+resize-none)?"/g,
   'class="input-aurora"'],
  [/class="w-full px-4 py-2\.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-\w+-500 focus:border-transparent"/g,
   'class="input-aurora"'],
  // Textarea variants
  [/class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-\w+-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono text-sm"/g,
   'class="input-aurora font-mono text-sm"'],
  [/class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-\w+-500 focus:border-transparent(?:\s+resize-none)?"/g,
   'class="input-aurora"'],

  // === COPY BUTTONS ===
  [/class="px-3 py-1 bg-\w+-100 dark:bg-\w+-900\/30 text-\w+-600 dark:text-\w+-400 rounded-lg hover:bg-\w+-200 dark:hover:bg-\w+-900\/50 transition-colors text-sm"/g,
   'class="copy-btn"'],
  [/class="px-4 py-2 bg-\w+-600 text-white rounded-lg hover:bg-\w+-700 transition-colors text-sm"/g,
   'class="copy-btn"'],

  // === CHECKBOX Aurora ===
  [/class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"/g,
   'class="checkbox-aurora"'],
  [/class="flex items-center gap-3 p-3\.5 bg-gray-50 dark:bg-gray-700\/50 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"/g,
   'class="checkbox-aurora"'],

  // === RESULTADO cards (gradient) → tool-result ===
  [/class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-center text-white"/g,
   'class="tool-result-success p-7 text-center"'],
  [/class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-center text-white"/g,
   'class="tool-result-info p-7 text-center"'],
  [/class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-center text-white"/g,
   'class="tool-result-info p-7 text-center"'],
  [/class="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-center text-white"/g,
   'class="tool-result-success p-7 text-center"'],
  [/class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white"/g,
   'class="tool-result-warning p-7 text-center"'],
  [/class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-center text-white"/g,
   'class="tool-result-warning p-7 text-center"'],
  [/class="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-center text-white"/g,
   'class="tool-result-danger p-7 text-center"'],
  [/class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white"/g,
   'class="tool-result-success p-7 text-center"'],
  [/class="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-8 text-center text-white"/g,
   'class="tool-result-info p-7 text-center"'],
  [/class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-8 text-center text-white"/g,
   'class="tool-result-info p-7 text-center"'],

  // === METRIC GLASS VALUES ===
  [/class="text-2xl font-bold text-(green|blue|purple|teal|orange|amber|red|emerald|cyan|indigo|pink|violet|slate)-600 dark:text-\1-400"/g,
   'class="metric-glass-value text-$1-600 dark:text-$1-400"'],

  // === OLD SELECT ===
  [/class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-\w+-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/g,
   'class="input-aurora"'],

  // === BUTTONS (old primary) ===
  [/class="w-full py-3 px-6 bg-(\w+)-600 text-white rounded-lg font-semibold hover:bg-\1-700 focus:ring-2 focus:ring-\1-500 focus:ring-offset-2 transition-all"/g,
   'class="btn-aurora w-full"'],

  // === SPACE AFTER TOOLSHELL > ===
  [/orb-color="\w+"\s*>\s*\n\s*/g, (m) => m.replace(/>\s*\n\s*/, '>\n    ')],
]

// ── Mapeamentos de metadados por ferramenta ───────────────────────────────────
const TOOL_META = {
  AnalisadorTexto:         { desc: 'Analise palavras, caracteres, frases, parágrafos, tempo de leitura e fala.',     tips: ['O texto é processado 100% localmente.', 'Tempo de leitura: ~200 palavras/min.'] },
  CalculadoraAnuncios:     { desc: 'Calcule ROI, CPL, CPC e métricas de campanhas de anúncios pagos.',               tips: ['CPM é o custo por mil impressões.', 'CTR médio no Google Search: 2–10%.'] },
  CalculadoraAposentadoria:{ desc: 'Simule quanto precisa guardar mensalmente para se aposentar com renda desejada.', tips: ['Quanto antes começar, menor o aporte necessário.', 'Use taxa conservadora: 0,5–0,7% a.m.'] },
  CalculadoraArea:         { desc: 'Calcule a área de figuras geométricas com fórmulas explicadas.',                  tips: ['Todas as medidas devem estar na mesma unidade.', 'Pi = 3.14159265...'] },
  CalculadoraConversao:    { desc: 'Converta entre as principais unidades de medida: comprimento, peso, volume e mais.',tips: ['1 pé = 30,48 cm | 1 polegada = 2,54 cm.', '1 libra = 0,453592 kg.'] },
  CalculadoraDensidade:    { desc: 'Calcule densidade (d = m/V), massa ou volume a partir de dois valores.',           tips: ['Densidade da água: 1 g/cm³.', 'Densidade do ouro: 19,3 g/cm³.'] },
  CalculadoraDepreciacao:  { desc: 'Calcule a depreciação de ativos pelos métodos linear e por saldo decrescente.',   tips: ['Vida útil contábil: equipamentos TI = 5 anos; imóveis = 25 anos.', 'Deprecie pelo método mais adequado ao ativo.'] },
  CalculadoraEnergia:      { desc: 'Calcule energia cinética, potencial, trabalho e potência.',                       tips: ['Ec = ½mv² | Ep = mgh | P = E/t.', 'Unidade SI: Joule (J).'] },
  CalculadoraForca:        { desc: 'Calcule força (F = ma), aceleração ou massa usando a Segunda Lei de Newton.',     tips: ['F = m × a em Newtons.', 'g = 9,81 m/s² na superfície terrestre.'] },
  CalculadoraFracao:       { desc: 'Realize operações com frações: soma, subtração, multiplicação e divisão.',        tips: ['Para somar frações, iguale os denominadores (MMC).', 'Simplifique pelo MDC.'] },
  CalculadoraImovel:       { desc: 'Calcule financiamentos imobiliários pelos sistemas PRICE e SAC.',                 tips: ['SAC: amortização fixa, juros decrescentes.', 'PRICE: parcelas iguais, mais juros no total.'] },
  CalculadoraInvestimento: { desc: 'Simule o crescimento de investimentos com aportes e taxas compostas.',            tips: ['A rentabilidade real desconta a inflação.', 'Compare com benchmarks: CDI, SELIC, IBOVESPA.'] },
  CalculadoraMargemLucro:  { desc: 'Calcule margem bruta, líquida e markup sobre o preço de custo.',                 tips: ['Margem ≠ Markup. Margem sobre venda, Markup sobre custo.', 'Markup 100% = Margem 50%.'] },
  CalculadoraMMCMDC:       { desc: 'Calcule o Mínimo Múltiplo Comum e o Máximo Divisor Comum de dois ou mais números.',tips: ['MMC é usado para somar frações.', 'MDC é usado para simplificar frações.'] },
  CalculadoraOrcamento:    { desc: 'Monte orçamentos profissionais com itens, margens, impostos e download.',         tips: ['Inclua todos os custos indiretos no orçamento.', 'Adicione 10–20% de contingência.'] },
  CalculadoraOrcamentoProjeto: { desc: 'Ferramenta de orçamento para projetos digitais e de engenharia.',            tips: [] },
  CalculadoraPerimetro:    { desc: 'Calcule o perímetro de figuras geométricas planas.',                              tips: ['Perímetro = soma de todos os lados.', 'Para círculos: P = 2πr.'] },
  CalculadoraPitagoras:    { desc: 'Calcule o lado desconhecido de um triângulo retângulo com o Teorema de Pitágoras.',tips: ['a² + b² = c² (c = hipotenusa).', 'Hipotenusa é sempre o maior lado.'] },
  CalculadoraPontoEquilibrio:{ desc:'Descubra o ponto em que receita = custo total (break-even).',                   tips: ['Abaixo do ponto de equilíbrio: prejuízo.', 'Reduza custos fixos para abaixar o ponto de equilíbrio.'] },
  CalculadoraPrecificacao: { desc: 'Precifique seus serviços considerando custos, margem e horas trabalhadas.',       tips: ['Inclua todos os custos: fixos, variáveis e impostos.', 'Pesquise preços de mercado.'] },
  CalculadoraPrecoProduto: { desc: 'Calcule o preço de venda ideal para produtos com custos e margem desejada.',     tips: ['Inclua frete, impostos e custo de marketplace.', 'Margem diferente de markup.'] },
  CalculadoraRegraTres:    { desc: 'Resolva regras de três simples e compostas de forma rápida.',                     tips: ['Regra de três simples: 2 grandezas.', 'Compostas: 3+ grandezas diretamente/inversamente proporcionais.'] },
  CalculadoraSite:         { desc: 'Estime o custo de desenvolvimento de um site ou aplicação web.',                  tips: ['Inclua hospedagem, domínio e manutenção anual.', 'Sites complexos requerem análise detalhada.'] },
  CalculadoraSocialMedia:  { desc: 'Calcule o custo de pacotes de gestão de redes sociais.',                          tips: ['Precifique por post, não só por horas.', 'Inclua ferramentas e custos operacionais.'] },
  CalculadoraTempo:        { desc: 'Calcule a diferença entre datas e some/subtraia períodos de tempo.',              tips: ['Anos bissextos têm 366 dias.', 'Use para prazos de contratos e projetos.'] },
  CalculadoraVelocidade:   { desc: 'Calcule velocidade, distância ou tempo (v = d/t).',                               tips: ['v = d/t | d = v×t | t = d/v.', '1 nó = 1,852 km/h.'] },
  CalculadoraVolume:       { desc: 'Calcule o volume de sólidos geométricos tridimensionais.',                        tips: ['Volume do cubo: a³.', 'Volume da esfera: (4/3)πr³.'] },
  ConversorArea:           { desc: 'Converta entre m², cm², km², pés², acres, hectares e mais.',                      tips: ['1 hectare = 10.000 m².', '1 acre = 4.046,86 m².'] },
  ConversorBinario:        { desc: 'Converta entre decimal, binário, octal e hexadecimal.',                           tips: ['Binário: base 2 (0 e 1).', 'Hexadecimal: base 16 (0–9 + A–F).'] },
  ConversorCSVJSON:        { desc: 'Converta arquivos CSV para JSON e JSON para CSV instantaneamente.',               tips: ['Primeira linha do CSV deve ser o cabeçalho.', 'JSON arrays viram linhas CSV.'] },
  ConversorDistancia:      { desc: 'Converta entre km, m, cm, mm, milhas, pés, polegadas e jardas.',                 tips: ['1 milha = 1.609,34 m.', '1 polegada = 2,54 cm.'] },
  ConversorFusoHorario:    { desc: 'Converta horários entre fusos horários de qualquer parte do mundo.',              tips: ['Horário de Brasília: UTC-3.', 'Horário de verão pode alterar UTC.'] },
  ConversorHTML:           { desc: 'Converta caracteres especiais para entidades HTML e vice-versa.',                 tips: ['& → &amp; | < → &lt; | > → &gt;.', 'Use para inserir código HTML em posts.'] },
  ConversorJSONYAML:       { desc: 'Converta entre JSON e YAML com validação e formatação automática.',               tips: ['YAML usa indentação para hierarquia.', 'JSON usa chaves e colchetes.'] },
  ConversorMarkdown:       { desc: 'Converta Markdown para HTML e visualize o resultado em tempo real.',              tips: ['# = H1, ## = H2, **negrito**, *itálico*.', '- ou * para listas.'] },
  ConversorNumerico:       { desc: 'Converta entre decimal, binário, octal e hexadecimal com cálculo passo a passo.', tips: ['Decimal → Binário: divida por 2 repetidamente.', 'Use 0x para hex e 0b para binário.'] },
  ConversorNumerosRomanos: { desc: 'Converta números arábicos para romanos e romanos para arábicos.',                 tips: ['I=1, V=5, X=10, L=50, C=100, D=500, M=1000.', 'Máximo: 3.999 em numerais romanos.'] },
  ConversorPeso:           { desc: 'Converta entre kg, g, lb, oz, toneladas e outras unidades de massa.',             tips: ['1 kg = 2,20462 libras.', '1 onça troy = 31,1 g (para metais preciosos).'] },
  ConversorPressao:        { desc: 'Converta entre Pa, bar, psi, atm, mmHg e outras unidades de pressão.',           tips: ['1 atm = 101.325 Pa.', '1 bar ≈ 1 atm (ligeiramente menor).'] },
  ConversorRGBHex:         { desc: 'Converta cores entre HEX, RGB, HSL e HSV com preview visual.',                   tips: ['HEX #RRGGBB em hexadecimal.', 'HSL: matiz (0-360°), saturação, luminosidade.'] },
  ConversorTimestamp:      { desc: 'Converta timestamps Unix para datas legíveis e vice-versa.',                      tips: ['Unix timestamp = segundos desde 01/01/1970.', 'JavaScript usa milissegundos: Date.now().'] },
  ConversorURL:            { desc: 'Encode e decode URLs — converta caracteres especiais para formato seguro.',       tips: ['Espaços viram %20 ou +.', 'Sempre encode parâmetros de URL.'] },
  ConversorVelocidade:     { desc: 'Converta entre km/h, m/s, mph, nós e outras unidades de velocidade.',            tips: ['1 m/s = 3,6 km/h.', '1 nó = 1,852 km/h (náutico).'] },
  ConversorVolume:         { desc: 'Converta entre litros, ml, m³, galões, pints e outras unidades de volume.',      tips: ['1 galão EUA = 3,785 litros.', '1 m³ = 1.000 litros.'] },
  ConversorXMLJSON:        { desc: 'Converta entre XML e JSON com suporte a atributos e namespaces.',                 tips: ['Atributos XML viram propriedades JSON.', 'Tags aninhadas viram objetos.'] },
  DivisorTexto:            { desc: 'Divida textos longos em partes iguais por caracteres, palavras ou linhas.',       tips: ['Útil para redes sociais com limite de caracteres.', 'Divida por parágrafo para manter contexto.'] },
  ExtratorEmails:          { desc: 'Extraia todos os endereços de e-mail de qualquer bloco de texto.',                tips: ['100% client-side — nenhum e-mail é armazenado.', 'Funciona com textos colados de qualquer fonte.'] },
  GeradorAvatar:           { desc: 'Gere avatares coloridos a partir de iniciais ou texto.',                          tips: ['Útil para sistemas sem foto de perfil.', 'Exporte em SVG ou PNG.'] },
  GeradorBitcoin:          { desc: 'Gere endereços Bitcoin para fins de teste e desenvolvimento.',                    tips: ['APENAS para testes! Endereços gerados não têm chave privada salva.', 'Nunca use endereços gerados aqui para transações reais.'] },
  GeradorCartao:           { desc: 'Gere números de cartão de crédito válidos (algoritmo Luhn) para testes.',        tips: ['APENAS para testes de formulários e desenvolvimento.', 'Nunca use em transações reais — crime previsto em lei.'] },
  GeradorCNPJCompleto:     { desc: 'Gere dados completos de empresa fictícia com CNPJ, razão social e endereço.',    tips: ['Para ambientes de desenvolvimento e testes.', 'Não corresponde a empresa real.'] },
  GeradorCodigoBarras:     { desc: 'Gere códigos de barras nos formatos EAN-13, EAN-8, UPC-A e Code 128.',           tips: ['EAN-13: padrão mundial para produtos.', 'Code 128: uso geral, alfanumérico.'] },
  GeradorCores:            { desc: 'Gere paletas de cores harmônicas: complementar, análoga, triádica e mais.',      tips: ['Cores análogas: vizinhas na roda de cores.', 'Complementar: lados opostos (maior contraste).'] },
  GeradorCSV:              { desc: 'Gere arquivos CSV com dados fictícios para testes de banco de dados.',           tips: ['Defina o separador como vírgula ou ponto-e-vírgula.', 'A primeira linha é o cabeçalho.'] },
  GeradorGradiente:        { desc: 'Crie gradientes CSS lineares, radiais e cônicos com preview ao vivo.',           tips: ['background: linear-gradient(dir, cor1, cor2).', 'Use gradientes sutis para fundos profissionais.'] },
  GeradorHash:             { desc: 'Gere hashes MD5, SHA-1, SHA-256 e SHA-512 de qualquer texto.',                   tips: ['Hashes são unidirecionais — não é possível reverter.', 'SHA-256 é o padrão recomendado atualmente.'] },
  GeradorJSON:             { desc: 'Gere dados JSON fictícios com estrutura personalizada para testes.',             tips: ['Defina os campos e tipos desejados.', 'Útil para mockar APIs durante o desenvolvimento.'] },
  GeradorLoremIpsum:       { desc: 'Gere texto Lorem Ipsum em diferentes quantidades e formatos.',                   tips: ['Lorem Ipsum é texto de placeholder, sem significado.', 'Use para mockups e wireframes.'] },
  GeradorMarcaDagua:       { desc: 'Adicione marca d\'água em imagens com texto ou imagem customizável.',            tips: ['Escolha opacidade adequada para não prejudicar o conteúdo.', 'Posicione no canto ou diagonal para melhor proteção.'] },
  GeradorPalheta:          { desc: 'Gere paletas de cores baseadas em teoria das cores ou imagem.',                   tips: ['Paletas de 5 cores cobrem a maioria dos projetos.', 'Teste contraste para acessibilidade.'] },
  GeradorPrefixoSufixo:    { desc: 'Adicione prefixos e sufixos a listas de texto automaticamente.',                 tips: ['Útil para gerar SQL, variáveis CSS e comandos em lote.', 'Pode processar centenas de linhas de uma vez.'] },
  GeradorSQL:              { desc: 'Gere comandos SQL INSERT com dados fictícios para popular banco de dados.',      tips: ['Defina as colunas e tipos de dados.', 'Gere múltiplas linhas de INSERT de uma vez.'] },
  GeradorSRT:              { desc: 'Gere ou converta arquivos de legenda no formato SRT para vídeos.',               tips: ['Formato SRT: número, timecode, texto.', 'Timecode: HH:MM:SS,mmm --> HH:MM:SS,mmm.'] },
  GeradorTabuada:          { desc: 'Gere tabuadas completas de 1 a 10 ou de qualquer número.',                       tips: ['Tabuada é a base da multiplicação.', 'Gere cartazes de tabuada para estudo.'] },
  GeradorURL:              { desc: 'Gere URLs amigáveis (slugs) a partir de títulos com caracteres especiais.',      tips: ['Remova acentos e espaços de URLs.', 'Use hifens (-) em vez de espaços ou underscores.'] },
  GeradorUTM:              { desc: 'Gere links com parâmetros UTM para rastrear campanhas de marketing.',             tips: ['utm_source: origem (google, facebook).', 'utm_medium: canal (cpc, email, social).'] },
  ManipuladorListagem:     { desc: 'Ordene, filtre, remova duplicatas e processe listas de texto.',                  tips: ['Processa uma linha por vez.', 'Remove linhas em branco automaticamente.'] },
  ModificadorTexto:        { desc: 'Transforme textos: maiúsculas, camelCase, snake_case, slug e mais.',             tips: ['camelCase: palavrasJuntas com maiúsculas.', 'snake_case: palavras_separadas_por_underscore.'] },
  OCR:                     { desc: 'Extraia texto de imagens usando reconhecimento óptico de caracteres (OCR).',     tips: ['Imagens com alto contraste dão melhores resultados.', 'Funciona com JPG, PNG, GIF e BMP.'] },
  Simulador13Salario:      { desc: 'Calcule o 13º salário com parcelas, descontos e datas de pagamento.',           tips: ['1ª parcela: novembro | 2ª parcela: dezembro.', 'Base: salário + horas extras + adicionais.'] },
  SimuladorAcoes:          { desc: 'Simule o retorno de investimentos em ações com dividendos e valorização.',       tips: ['Rentabilidade passada não garante resultados futuros.', 'Diversifique entre setores.'] },
  SimuladorAluguel:        { desc: 'Compare financeiramente alugar vs. comprar um imóvel.',                          tips: ['Inclua todos os custos: ITBI, escritura, reforma.', 'Considere a oportunidade de investir a diferença.'] },
  SimuladorCambio:         { desc: 'Simule operações de câmbio com taxas IOF, spread e custos bancários.',           tips: ['IOF sobre câmbio: 1,1% a 6,38%.', 'Dólar comercial ≠ dólar turismo (spread bancário).'] },
  SimuladorCDB:            { desc: 'Simule o rendimento de CDBs com diferentes percentuais do CDI e prazos.',       tips: ['100% CDI ≈ SELIC - 0,1%.', 'Imposto de Renda retido na fonte (tabela regressiva).'] },
  SimuladorConsorcio:      { desc: 'Simule custos e parcelas de um consórcio comparando com outras modalidades.',   tips: ['Consórcio não tem juros, mas tem taxa de administração (~20%).', 'Contemplação por lance ou sorteio.'] },
  SimuladorDivida:         { desc: 'Planeje o pagamento de dívidas com estratégias avalanche e bola de neve.',      tips: ['Avalanche: pague primeiro a maior taxa de juros.', 'Bola de neve: pague primeiro a menor dívida.'] },
  SimuladorEnergiaSolar:   { desc: 'Estime a economia com energia solar fotovoltaica residencial ou comercial.',     tips: ['Payback médio no Brasil: 4–7 anos.', 'Produção: ~100–130 kWh/mês por kWp instalado.'] },
  SimuladorFerias:         { desc: 'Calcule o valor das férias CLT com 1/3 constitucional e abono opcional.',       tips: ['1/3 de férias é garantia constitucional.', 'Abono: venda 1/3 das férias por dinheiro.'] },
  SimuladorFGTS:           { desc: 'Calcule o saldo do FGTS e simule saques e retiradas.',                          tips: ['Depósito mensal: 8% do salário bruto.', 'Rendimento: TR + 3% a.a.'] },
  SimuladorFinanciamentoCarro: { desc:'Simule financiamento de veículos com diferentes taxas e prazos.',            tips: ['Taxa do CDC varia de 0,99% a 3% a.m.', 'Compare o CET (Custo Efetivo Total).'] },
  SimuladorHoraExtra:      { desc: 'Calcule o valor de horas extras com 50%, 100% e adicional noturno.',            tips: ['50%: dias úteis | 100%: domingos e feriados.', 'Adicional noturno (22h–5h): 20% a mais.'] },
  SimuladorINSS:           { desc: 'Calcule a contribuição do INSS 2025 pela tabela progressiva.',                  tips: ['Tabela 2025: 7,5% até R$ 1.412; 9% até R$ 2.667; 12% até R$ 4.000; 14% até R$ 7.786.', 'O teto do INSS 2025 é R$ 908,86.'] },
  SimuladorPensao:         { desc: 'Calcule o valor de pensão alimentícia com base na renda e número de filhos.',   tips: ['Base de cálculo: salário líquido.', 'Juiz pode considerar padrão de vida.'] },
  SimuladorPoupanca:       { desc: 'Simule o rendimento da poupança com aportes periódicos.',                       tips: ['Rendimento: TR + 0,5% a.m. quando SELIC > 8,5%.', 'Quando SELIC ≤ 8,5%: 70% da SELIC + TR.'] },
  SimuladorPrecatorio:     { desc: 'Calcule a atualização monetária de precatórios com juros e correção.',          tips: ['Precatório é dívida judicial do poder público.', 'Atualização: IPCA-E + juros de mora.'] },
  SimuladorRescisao:       { desc: 'Calcule os valores da rescisão contratual CLT (demissão sem justa causa).',     tips: ['Inclui: saldo de salário, 13º proporcional, férias + 1/3, multa FGTS (40%).', 'Aviso prévio: 30 dias + 3 dias por ano.'] },
  SimuladorSeguro:         { desc: 'Estime o valor do prêmio de seguro para diferentes coberturas.',                tips: ['Compare sempre o CET (Custo Efetivo Total).', 'Carência varia por tipo de cobertura.'] },
  SimuladorTesouro:        { desc: 'Simule investimentos no Tesouro Direto: Selic, IPCA+ e Prefixado.',             tips: ['Tesouro Selic: menor risco e liquidez diária.', 'IPCA+: proteção contra inflação de longo prazo.'] },
  Sorteiador:              { desc: 'Realize sorteios de nomes, números ou itens de forma transparente.',            tips: ['Resultado 100% aleatório usando crypto.getRandomValues().', 'Excelente para rifas, sorteios de brindes e gincanas.'] },
  ValidadorCartao:         { desc: 'Valide números de cartão de crédito pelo algoritmo de Luhn.',                   tips: ['Luhn verifica apenas a estrutura, não a validade do cartão.', 'Funciona com Visa, Mastercard, Amex e mais.'] },
  ValidadorCEP:            { desc: 'Valide e formate CEPs brasileiros com 8 dígitos.',                              tips: ['Consulte o endereço no ViaCEP para buscar o endereço completo.', 'CEP tem exatamente 8 dígitos.'] },
  ValidadorCSS:            { desc: 'Valide e formate folhas de estilo CSS com detecção de erros.',                  tips: ['CSS inválido pode causar layout quebrado.', 'Use ferramentas como stylelint para projetos.'] },
  ValidadorHTML:           { desc: 'Valide estrutura HTML detectando tags não fechadas e problemas de semântica.',  tips: ['HTML semântico é crucial para SEO e acessibilidade.', 'Use tags corretas: article, section, nav, header.'] },
  ValidadorIBAN:           { desc: 'Valide IBANs internacionais de qualquer país.',                                  tips: ['IBAN: International Bank Account Number.', 'Formato: CC + 2 dígitos + BBAN.'] },
  ValidadorIP:             { desc: 'Valide endereços IPv4 e IPv6.',                                                   tips: ['IPv4: 4 octetos (0–255). Ex: 192.168.1.1.', 'IPv6: 8 grupos de 4 hex. Ex: 2001:0db8::1.'] },
  ValidadorISBN:           { desc: 'Valide ISBNs de livros nos formatos ISBN-10 e ISBN-13.',                        tips: ['ISBN-13 começa com 978 ou 979.', 'O último dígito é verificador.'] },
  ValidadorJSON:           { desc: 'Valide e formate JSON com visualização em árvore e destaque de erros.',         tips: ['JSON requer aspas duplas em strings.', 'Use null (não undefined) para valores nulos.'] },
  ValidadorPIS:            { desc: 'Valide números PIS/PASEP/NIT com verificação do dígito verificador.',           tips: ['PIS (empregado privado), PASEP (servidor público), NIT (autônomo).', '11 dígitos — gerado no primeiro emprego formal.'] },
  ValidadorPlaca:          { desc: 'Valide placas veiculares no padrão Mercosul e antigo.',                          tips: ['Padrão antigo: AAA-9999.', 'Padrão Mercosul: AAA9A99 (a 4ª posição é letra).'] },
  ValidadorRegex:          { desc: 'Teste expressões regulares com realce de capturas e grupos.',                    tips: ['^ = início | $ = fim | . = qualquer char | * = 0+.', 'Use /g para match global (todas as ocorrências).'] },
  ValidadorRENAVAM:        { desc: 'Valide o RENAVAM de veículos com verificação do dígito verificador.',           tips: ['RENAVAM tem 9 ou 11 dígitos.', 'Dígito verificador calculado pelo Módulo 11.'] },
  ValidadorSenha:          { desc: 'Analise a força de uma senha e receba recomendações de melhoria.',              tips: ['Senhas fortes: 16+ chars, letras, números e símbolos.', 'Nunca reutilize senhas entre serviços.'] },
  ValidadorTelefone:       { desc: 'Valide e formate números de telefone brasileiros (fixo e celular).',            tips: ['Celular: 11 dígitos (DDD + 9 + número).', 'DDD válido: 11–99 (apenas os cadastrados na ANATEL).'] },
  ValidadorTituloEleitor:  { desc: 'Valide títulos de eleitor brasileiros com verificação dos dígitos.',            tips: ['Título tem 12 dígitos: sequencial + estado + verificadores.', 'Os 2 últimos dígitos são verificadores.'] },
  ValidadorURL:            { desc: 'Valide URLs e analise protocolo, domínio, path e parâmetros.',                  tips: ['URLs válidas começam com http:// ou https://.', 'Parâmetros: ?chave=valor&chave2=valor2.'] },
  ValidadorXML:            { desc: 'Valide e formate documentos XML detectando erros de estrutura.',                tips: ['XML é case-sensitive: <Tag> ≠ <tag>.', 'Todo elemento deve ter tag de fechamento.'] },
}

// ── Transformação ──────────────────────────────────────────────────────────────

const files = readdirSync(TOOLS).filter(f =>
  f.endsWith('.vue') && !readdirSync(join(TOOLS, 'common')).includes(f)
)

let count = 0

for (const file of files) {
  const baseName = file.replace('.vue', '')
  if (SKIP_MANUAL.has(baseName)) continue

  const path = join(TOOLS, file)
  let src  = readFileSync(path, 'utf8')

  // 1. Update ToolShell metadata if we have it
  const meta = TOOL_META[baseName]
  if (meta && meta.desc) {
    // Update description
    src = src.replace(
      /description="[^"]*"/,
      `description="${meta.desc.replace(/"/g, "'")}"`,
    )
    // Add tips if not present and we have them
    if (meta.tips?.length && !src.includes(':tips=')) {
      const tipsJson = JSON.stringify(meta.tips.map(t => ({ text: t })))
        .replace(/"/g, "'")
      src = src.replace(
        /(orb-color="[^"]*")/,
        `$1\n    :tips="${tipsJson.replace(/'/g, '"')}"`,
      )
    }
  }

  // 2. Apply CSS substitutions
  for (const [from, to] of CSS_SUBSTITUTIONS) {
    src = src.replace(from, /** @type {string} */ (to))
  }

  // 3. Add tool-body wrapper to the main content if no glass-panel yet
  // (Just ensure there's a newline after ToolShell >)
  src = src.replace(/orb-color="[^"]*"\s*:tips="[^"]*"\s*>/g, (m) => m.replace(/>$/, '>\n'))

  writeFileSync(path, src, 'utf8')
  count++
}

console.log(`✅ ${count} arquivos atualizados.`)
