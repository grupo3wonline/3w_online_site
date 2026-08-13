import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  category: string
  path: string
}

export interface CategoryInfo {
  title: string
  icon: string
  color: string
  total: number
}

export const useToolsStore = defineStore('tools', () => {
  const searchQuery = ref('')

  const tools = ref<Tool[]>([
    // Calculadoras Financeiras
    { id: 'calculadora-freelancer', name: 'Calculadora de Custos para Freelancers', description: 'Calcule o valor da sua hora de trabalho', icon: 'fa-calculator', category: 'calculadoras', path: '/ferramentas/calculadora-freelancer' },
    { id: 'calculadora-anuncios', name: 'Calculadora de Custos de Anúncios', description: 'Calcule ROI e custos de campanhas', icon: 'fa-ad', category: 'calculadoras', path: '/ferramentas/calculadora-anuncios' },
    { id: 'calculadora-precificacao', name: 'Calculadora de Precificação', description: 'Defina o preço ideal para produtos e serviços', icon: 'fa-tags', category: 'calculadoras', path: '/ferramentas/calculadora-precificacao' },
    { id: 'calculadora-imc', name: 'Calculadora de IMC', description: 'Calcule seu Índice de Massa Corporal', icon: 'fa-weight-scale', category: 'calculadoras', path: '/ferramentas/calculadora-imc' },
    { id: 'calculadora-orcamento', name: 'Calculadora de Orçamento', description: 'Gerencie seu orçamento mensal', icon: 'fa-money-bill-wave', category: 'calculadoras', path: '/ferramentas/calculadora-orcamento' },
    { id: 'calculadora-orcamento-projeto', name: 'Calculadora de Orçamento de Projeto', description: 'Orçamento completo do projeto', icon: 'fa-project-diagram', category: 'calculadoras', path: '/ferramentas/calculadora-orcamento-projeto' },
    { id: 'calculadora-preco-produto', name: 'Calculadora de Preço de Produto', description: 'Preço de venda ideal para produtos', icon: 'fa-box', category: 'calculadoras', path: '/ferramentas/calculadora-preco-produto' },
    { id: 'calculadora-site', name: 'Calculadora de Site', description: 'Custo de desenvolvimento de site', icon: 'fa-globe', category: 'calculadoras', path: '/ferramentas/calculadora-site' },
    { id: 'calculadora-social-media', name: 'Calculadora Social Media', description: 'Investimentos em mídias sociais', icon: 'fa-share-nodes', category: 'calculadoras', path: '/ferramentas/calculadora-social-media' },
    { id: 'calculadora-juros', name: 'Calculadora de Juros Compostos', description: 'Calcule rendimentos e investimentos', icon: 'fa-chart-line', category: 'calculadoras', path: '/ferramentas/calculadora-juros' },
    { id: 'calculadora-desconto', name: 'Calculadora de Desconto', description: 'Calcule descontos e preços finais', icon: 'fa-percent', category: 'calculadoras', path: '/ferramentas/calculadora-desconto' },
    { id: 'calculadora-margem', name: 'Calculadora de Margem de Lucro', description: 'Calcule margem e markup de produtos', icon: 'fa-coins', category: 'calculadoras', path: '/ferramentas/calculadora-margem' },
    { id: 'calculadora-tempo', name: 'Calculadora de Tempo', description: 'Calcule diferenças entre datas e horas', icon: 'fa-clock', category: 'calculadoras', path: '/ferramentas/calculadora-tempo' },
    { id: 'calculadora-conversao', name: 'Calculadora de Conversão de Unidades', description: 'Converta medidas e unidades', icon: 'fa-arrows-rotate', category: 'calculadoras', path: '/ferramentas/calculadora-conversao' },
    { id: 'calculadora-emprestimo', name: 'Calculadora de Empréstimo', description: 'Calcule parcelas e juros de empréstimos', icon: 'fa-hand-holding-dollar', category: 'calculadoras', path: '/ferramentas/calculadora-emprestimo' },
    { id: 'calculadora-imovel', name: 'Calculadora de Imóvel', description: 'Calcule financiamento de imóvel com PRICE e SAC', icon: 'fa-house', category: 'calculadoras', path: '/ferramentas/calculadora-imovel' },
    { id: 'calculadora-investimento', name: 'Calculadora de Investimento', description: 'Simule rendimentos de investimentos', icon: 'fa-chart-line', category: 'calculadoras', path: '/ferramentas/calculadora-investimento' },
    { id: 'calculadora-aposentadoria', name: 'Calculadora de Aposentadoria', description: 'Planeje sua aposentadoria financeira', icon: 'fa-umbrella-beach', category: 'calculadoras', path: '/ferramentas/calculadora-aposentadoria' },
    { id: 'calculadora-combustivel', name: 'Calculadora de Combustível', description: 'Compare álcool vs gasolina e economia', icon: 'fa-gas-pump', category: 'calculadoras', path: '/ferramentas/calculadora-combustivel' },
    { id: 'calculadora-salario', name: 'Calculadora de Salário', description: 'Calcule salário líquido com descontos', icon: 'fa-money-bill-wave', category: 'calculadoras', path: '/ferramentas/calculadora-salario' },
    { id: 'calculadora-porcentagem', name: 'Calculadora de Porcentagem', description: 'Calcule porcentagens, aumentos e descontos', icon: 'fa-percent', category: 'calculadoras', path: '/ferramentas/calculadora-porcentagem' },
    { id: 'calculadora-regra-tres', name: 'Calculadora de Regra de Três', description: 'Resolva regras de três simples e compostas', icon: 'fa-square-root-variable', category: 'calculadoras', path: '/ferramentas/calculadora-regra-tres' },
    { id: 'calculadora-fracao', name: 'Calculadora de Frações', description: 'Operações com frações', icon: 'fa-divide', category: 'calculadoras', path: '/ferramentas/calculadora-fracao' },
    { id: 'calculadora-mmc-mdc', name: 'Calculadora MMC e MDC', description: 'Mínimo Múltiplo Comum e Máximo Divisor Comum', icon: 'fa-calculator', category: 'calculadoras', path: '/ferramentas/calculadora-mmc-mdc' },
    { id: 'calculadora-area', name: 'Calculadora de Área', description: 'Calcule áreas de figuras geométricas', icon: 'fa-shapes', category: 'calculadoras', path: '/ferramentas/calculadora-area' },
    { id: 'calculadora-perimetro', name: 'Calculadora de Perímetro', description: 'Calcule perímetros de figuras planas', icon: 'fa-border-all', category: 'calculadoras', path: '/ferramentas/calculadora-perimetro' },
    { id: 'calculadora-volume', name: 'Calculadora de Volume', description: 'Calcule volumes de sólidos geométricos', icon: 'fa-cube', category: 'calculadoras', path: '/ferramentas/calculadora-volume' },
    { id: 'calculadora-pitagoras', name: 'Teorema de Pitágoras', description: 'Calcule lados de triângulos retângulos', icon: 'fa-ruler-combined', category: 'calculadoras', path: '/ferramentas/calculadora-pitagoras' },
    { id: 'calculadora-velocidade', name: 'Calculadora de Velocidade', description: 'Calcule velocidade, distância e tempo', icon: 'fa-gauge-high', category: 'calculadoras', path: '/ferramentas/calculadora-velocidade' },
    { id: 'calculadora-forca', name: 'Calculadora de Força', description: 'Calcule força usando F = m × a', icon: 'fa-up-down-left-right', category: 'calculadoras', path: '/ferramentas/calculadora-forca' },
    { id: 'calculadora-energia', name: 'Calculadora de Energia', description: 'Calcule energia cinética e potencial', icon: 'fa-bolt', category: 'calculadoras', path: '/ferramentas/calculadora-energia' },
    { id: 'calculadora-densidade', name: 'Calculadora de Densidade', description: 'Calcule densidade usando d = m/V', icon: 'fa-flask', category: 'calculadoras', path: '/ferramentas/calculadora-densidade' },
    { id: 'calculadora-margem-lucro', name: 'Calculadora de Margem de Lucro', description: 'Calcule margem bruta, líquida e markup', icon: 'fa-chart-line', category: 'calculadoras', path: '/ferramentas/calculadora-margem-lucro' },
    { id: 'calculadora-ponto-equilibrio', name: 'Calculadora de Ponto de Equilíbrio', description: 'Calcule o break-even point do negócio', icon: 'fa-balance-scale', category: 'calculadoras', path: '/ferramentas/calculadora-ponto-equilibrio' },
    { id: 'calculadora-depreciacao', name: 'Calculadora de Depreciação', description: 'Calcule depreciação de ativos', icon: 'fa-chart-line', category: 'calculadoras', path: '/ferramentas/calculadora-depreciacao' },
    { id: 'calculadora-roi', name: 'Calculadora de ROI', description: 'Calcule Retorno sobre Investimento', icon: 'fa-money-bill-trend-up', category: 'calculadoras', path: '/ferramentas/calculadora-roi' },

    // Geradores
    { id: 'gerador-senha', name: 'Gerador de Senha', description: 'Gere senhas fortes e seguras', icon: 'fa-lock', category: 'geradores', path: '/ferramentas/gerador-senha' },
    { id: 'gerador-qrcode', name: 'Gerador de QR Code', description: 'Crie QR Codes personalizados', icon: 'fa-qrcode', category: 'geradores', path: '/ferramentas/gerador-qrcode' },
    { id: 'gerador-uuid', name: 'Gerador de UUID', description: 'Gere identificadores únicos universais', icon: 'fa-fingerprint', category: 'geradores', path: '/ferramentas/gerador-uuid' },
    { id: 'gerador-cpf-cnpj', name: 'Gerador de CPF/CNPJ', description: 'Gere CPF e CNPJ válidos para testes', icon: 'fa-id-card', category: 'geradores', path: '/ferramentas/gerador-cpf-cnpj' },
    { id: 'gerador-lorem-ipsum', name: 'Gerador de Lorem Ipsum', description: 'Texto Lorem Ipsum para projetos', icon: 'fa-paragraph', category: 'geradores', path: '/ferramentas/gerador-lorem-ipsum' },
    { id: 'gerador-cores', name: 'Gerador de Paleta de Cores', description: 'Crie paletas de cores harmoniosas', icon: 'fa-palette', category: 'geradores', path: '/ferramentas/gerador-cores' },
    { id: 'gerador-gradiente', name: 'Gerador de Gradiente CSS', description: 'Crie gradientes CSS personalizados', icon: 'fa-brush', category: 'geradores', path: '/ferramentas/gerador-gradiente' },
    { id: 'gerador-avatar', name: 'Gerador de Avatar', description: 'Gere avatares aleatórios únicos', icon: 'fa-user-circle', category: 'geradores', path: '/ferramentas/gerador-avatar' },
    { id: 'gerador-hash', name: 'Gerador de Hash', description: 'Gere hashes MD5, SHA-1, SHA-256', icon: 'fa-hashtag', category: 'geradores', path: '/ferramentas/gerador-hash' },
    { id: 'gerador-json', name: 'Gerador de JSON', description: 'Gere dados JSON fictícios para testes', icon: 'fa-file-code', category: 'geradores', path: '/ferramentas/gerador-json' },
    { id: 'gerador-codigo-barras', name: 'Gerador de Código de Barras', description: 'Crie códigos EAN-13, UPC e mais', icon: 'fa-barcode', category: 'geradores', path: '/ferramentas/gerador-codigo-barras' },
    { id: 'gerador-cnpj-completo', name: 'Gerador de Empresa Completa', description: 'Gere dados completos de empresa fictícia', icon: 'fa-building', category: 'geradores', path: '/ferramentas/gerador-cnpj-completo' },
    { id: 'gerador-cartao', name: 'Gerador de Cartão de Crédito', description: 'Gere números de cartão para teste', icon: 'fa-credit-card', category: 'geradores', path: '/ferramentas/gerador-cartao' },
    { id: 'gerador-bitcoin', name: 'Gerador de Endereço Bitcoin', description: 'Gere endereços Bitcoin para teste', icon: 'fa-bitcoin-sign', category: 'geradores', path: '/ferramentas/gerador-bitcoin' },
    { id: 'gerador-sql', name: 'Gerador de SQL', description: 'Gere comandos SQL INSERT automaticamente', icon: 'fa-database', category: 'geradores', path: '/ferramentas/gerador-sql' },
    { id: 'gerador-csv', name: 'Gerador de CSV', description: 'Crie arquivos CSV com dados fictícios', icon: 'fa-file-csv', category: 'geradores', path: '/ferramentas/gerador-csv' },
    { id: 'gerador-srt', name: 'Gerador de Legenda SRT', description: 'Crie arquivos de legenda no formato SRT', icon: 'fa-closed-captioning', category: 'geradores', path: '/ferramentas/gerador-srt' },
    { id: 'gerador-palheta', name: 'Gerador de Palheta de Cores', description: 'Gere paletas de cores harmônicas', icon: 'fa-palette', category: 'geradores', path: '/ferramentas/gerador-palheta' },
    { id: 'gerador-prefixo-sufixo', name: 'Gerador de Prefixo e Sufixo', description: 'Adicione prefixos e sufixos em listas', icon: 'fa-text-width', category: 'geradores', path: '/ferramentas/gerador-prefixo-sufixo' },
    { id: 'gerador-url', name: 'Gerador de URL', description: 'URLs amigáveis e otimizadas', icon: 'fa-link', category: 'geradores', path: '/ferramentas/gerador-url' },
    { id: 'gerador-marca-dagua', name: 'Gerador de Marca D\'Água', description: 'Adicione marcas d\'água em imagens', icon: 'fa-image', category: 'geradores', path: '/ferramentas/gerador-marca-dagua' },
    { id: 'gerador-utm', name: 'Gerador de Links UTM', description: 'Crie links com parâmetros UTM', icon: 'fa-link', category: 'geradores', path: '/ferramentas/gerador-utm' },
    { id: 'gerador-tabuada', name: 'Gerador de Tabuada', description: 'Gere tabuadas de multiplicação', icon: 'fa-table', category: 'geradores', path: '/ferramentas/gerador-tabuada' },
    { id: 'ocr', name: 'OCR - Extração de Texto', description: 'Extraia texto de imagens', icon: 'fa-image', category: 'geradores', path: '/ferramentas/ocr' },
    { id: 'extrator-emails', name: 'Extrator de E-mails', description: 'Extraia endereços de e-mail de textos', icon: 'fa-at', category: 'geradores', path: '/ferramentas/extrator-emails' },
    { id: 'sorteiador', name: 'Sorteiador', description: 'Sorteios aleatórios justos', icon: 'fa-dice', category: 'geradores', path: '/ferramentas/sorteiador' },

    // Texto
    { id: 'analisador-texto', name: 'Analisador de Texto', description: 'Analise características do texto', icon: 'fa-magnifying-glass', category: 'texto', path: '/ferramentas/analisador-texto' },
    { id: 'modificador-texto', name: 'Modificador de Texto', description: 'Transforme e modifique textos', icon: 'fa-pen', category: 'texto', path: '/ferramentas/modificador-texto' },
    { id: 'divisor-texto', name: 'Divisor de Texto', description: 'Divida textos de várias formas', icon: 'fa-scissors', category: 'texto', path: '/ferramentas/divisor-texto' },
    { id: 'manipulador-listagem', name: 'Manipulador de Listagem', description: 'Manipule e transforme listas', icon: 'fa-list', category: 'texto', path: '/ferramentas/manipulador-listagem' },

    // Conversores
    { id: 'conversor-moeda', name: 'Conversor de Moedas', description: 'Converta entre moedas com cotação real', icon: 'fa-coins', category: 'conversores', path: '/ferramentas/conversor-moeda' },
    { id: 'conversor-base64', name: 'Conversor Base64', description: 'Encode/decode Base64', icon: 'fa-code', category: 'conversores', path: '/ferramentas/conversor-base64' },
    { id: 'conversor-url', name: 'Conversor URL Encode', description: 'Encode/decode URL', icon: 'fa-link', category: 'conversores', path: '/ferramentas/conversor-url' },
    { id: 'conversor-html', name: 'Conversor HTML Entities', description: 'Converta caracteres especiais HTML', icon: 'fa-code', category: 'conversores', path: '/ferramentas/conversor-html' },
    { id: 'conversor-markdown', name: 'Conversor Markdown', description: 'Converta Markdown para HTML', icon: 'fa-file-code', category: 'conversores', path: '/ferramentas/conversor-markdown' },
    { id: 'conversor-json-yaml', name: 'Conversor JSON/YAML', description: 'Converta entre JSON e YAML', icon: 'fa-right-left', category: 'conversores', path: '/ferramentas/conversor-json-yaml' },
    { id: 'conversor-xml-json', name: 'Conversor XML/JSON', description: 'Converta entre XML e JSON', icon: 'fa-file-code', category: 'conversores', path: '/ferramentas/conversor-xml-json' },
    { id: 'conversor-csv-json', name: 'Conversor CSV/JSON', description: 'Converta entre CSV e JSON', icon: 'fa-table', category: 'conversores', path: '/ferramentas/conversor-csv-json' },
    { id: 'conversor-rgb-hex', name: 'Conversor RGB/HEX', description: 'Converta cores RGB para HEX', icon: 'fa-palette', category: 'conversores', path: '/ferramentas/conversor-rgb-hex' },
    { id: 'conversor-timestamp', name: 'Conversor de Timestamp', description: 'Converta timestamp Unix', icon: 'fa-calendar-days', category: 'conversores', path: '/ferramentas/conversor-timestamp' },
    { id: 'conversor-fuso-horario', name: 'Conversor de Fuso Horário', description: 'Converta entre fusos horários', icon: 'fa-earth-americas', category: 'conversores', path: '/ferramentas/conversor-fuso-horario' },
    { id: 'conversor-binario', name: 'Conversor Binário', description: 'Converta entre decimal, binário, octal e hex', icon: 'fa-microchip', category: 'conversores', path: '/ferramentas/conversor-binario' },
    { id: 'conversor-numeros-romanos', name: 'Conversor de Números Romanos', description: 'Converta entre romanos e arábicos', icon: 'fa-monument', category: 'conversores', path: '/ferramentas/conversor-numeros-romanos' },
    { id: 'conversor-numerico', name: 'Conversor Numérico', description: 'Converta números entre bases', icon: 'fa-hashtag', category: 'conversores', path: '/ferramentas/conversor-numerico' },
    { id: 'conversor-temperatura', name: 'Conversor de Temperatura', description: 'Converta entre Celsius, Fahrenheit e Kelvin', icon: 'fa-temperature-half', category: 'conversores', path: '/ferramentas/conversor-temperatura' },
    { id: 'conversor-peso', name: 'Conversor de Peso', description: 'Converta unidades de peso e massa', icon: 'fa-weight-scale', category: 'conversores', path: '/ferramentas/conversor-peso' },
    { id: 'conversor-distancia', name: 'Conversor de Distância', description: 'Converta unidades de comprimento', icon: 'fa-ruler', category: 'conversores', path: '/ferramentas/conversor-distancia' },
    { id: 'conversor-volume', name: 'Conversor de Volume', description: 'Converta unidades de volume', icon: 'fa-flask-vial', category: 'conversores', path: '/ferramentas/conversor-volume' },
    { id: 'conversor-area', name: 'Conversor de Área', description: 'Converta unidades de área', icon: 'fa-vector-square', category: 'conversores', path: '/ferramentas/conversor-area' },
    { id: 'conversor-velocidade', name: 'Conversor de Velocidade', description: 'Converta unidades de velocidade', icon: 'fa-gauge-high', category: 'conversores', path: '/ferramentas/conversor-velocidade' },
    { id: 'conversor-pressao', name: 'Conversor de Pressão', description: 'Converta unidades de pressão', icon: 'fa-gauge', category: 'conversores', path: '/ferramentas/conversor-pressao' },

    // Validadores
    { id: 'validador-cpf', name: 'Validador de CPF', description: 'Valide números de CPF brasileiros', icon: 'fa-id-card', category: 'validadores', path: '/ferramentas/validador-cpf' },
    { id: 'validador-cnpj', name: 'Validador de CNPJ', description: 'Valide números de CNPJ brasileiros', icon: 'fa-building', category: 'validadores', path: '/ferramentas/validador-cnpj' },
    { id: 'validador-email', name: 'Validador de E-mail', description: 'Valide endereços de e-mail', icon: 'fa-envelope-circle-check', category: 'validadores', path: '/ferramentas/validador-email' },
    { id: 'validador-url', name: 'Validador de URL', description: 'Valide e analise URLs', icon: 'fa-link', category: 'validadores', path: '/ferramentas/validador-url' },
    { id: 'validador-telefone', name: 'Validador de Telefone', description: 'Valide números de telefone brasileiros', icon: 'fa-phone', category: 'validadores', path: '/ferramentas/validador-telefone' },
    { id: 'validador-cep', name: 'Validador de CEP', description: 'Valide e consulte CEPs brasileiros', icon: 'fa-map-marked-alt', category: 'validadores', path: '/ferramentas/validador-cep' },
    { id: 'validador-cartao', name: 'Validador de Cartão de Crédito', description: 'Valide números de cartões (Luhn)', icon: 'fa-credit-card', category: 'validadores', path: '/ferramentas/validador-cartao' },
    { id: 'validador-senha', name: 'Validador de Senha', description: 'Analise força de senhas', icon: 'fa-lock', category: 'validadores', path: '/ferramentas/validador-senha' },
    { id: 'validador-json', name: 'Validador de JSON', description: 'Valide e formate JSON', icon: 'fa-code', category: 'validadores', path: '/ferramentas/validador-json' },
    { id: 'validador-xml', name: 'Validador de XML', description: 'Valide e formate XML', icon: 'fa-file-code', category: 'validadores', path: '/ferramentas/validador-xml' },
    { id: 'validador-html', name: 'Validador de HTML', description: 'Valide código HTML', icon: 'fa-code', category: 'validadores', path: '/ferramentas/validador-html' },
    { id: 'validador-css', name: 'Validador de CSS', description: 'Valide código CSS', icon: 'fa-paintbrush', category: 'validadores', path: '/ferramentas/validador-css' },
    { id: 'validador-ip', name: 'Validador de IP', description: 'Valide endereços IPv4 e IPv6', icon: 'fa-network-wired', category: 'validadores', path: '/ferramentas/validador-ip' },
    { id: 'validador-regex', name: 'Validador de Regex', description: 'Teste expressões regulares', icon: 'fa-search', category: 'validadores', path: '/ferramentas/validador-regex' },
    { id: 'validador-placa', name: 'Validador de Placa Veicular', description: 'Valide placas brasileiras (Mercosul)', icon: 'fa-car', category: 'validadores', path: '/ferramentas/validador-placa' },
    { id: 'validador-pis', name: 'Validador de PIS/PASEP', description: 'Valide números de PIS/PASEP', icon: 'fa-id-card-alt', category: 'validadores', path: '/ferramentas/validador-pis' },
    { id: 'validador-titulo-eleitor', name: 'Validador de Título de Eleitor', description: 'Valide títulos de eleitor', icon: 'fa-vote-yea', category: 'validadores', path: '/ferramentas/validador-titulo-eleitor' },
    { id: 'validador-renavam', name: 'Validador de RENAVAM', description: 'Valide códigos RENAVAM', icon: 'fa-car-side', category: 'validadores', path: '/ferramentas/validador-renavam' },
    { id: 'validador-iban', name: 'Validador de IBAN', description: 'Valide códigos IBAN internacionais', icon: 'fa-university', category: 'validadores', path: '/ferramentas/validador-iban' },
    { id: 'validador-isbn', name: 'Validador de ISBN', description: 'Valide códigos ISBN de livros', icon: 'fa-book', category: 'validadores', path: '/ferramentas/validador-isbn' },

    // Simuladores
    { id: 'simulador-fgts', name: 'Simulador de FGTS', description: 'Simule saldo e rendimento do FGTS', icon: 'fa-piggy-bank', category: 'simuladores', path: '/ferramentas/simulador-fgts' },
    { id: 'simulador-ferias', name: 'Simulador de Férias', description: 'Calcule valor de férias e 1/3', icon: 'fa-plane', category: 'simuladores', path: '/ferramentas/simulador-ferias' },
    { id: 'simulador-13-salario', name: 'Simulador de 13º Salário', description: 'Calcule o valor do 13º salário', icon: 'fa-calendar-check', category: 'simuladores', path: '/ferramentas/simulador-13-salario' },
    { id: 'simulador-rescisao', name: 'Simulador de Rescisão', description: 'Calcule valores de rescisão trabalhista', icon: 'fa-file-contract', category: 'simuladores', path: '/ferramentas/simulador-rescisao' },
    { id: 'simulador-hora-extra', name: 'Simulador de Hora Extra', description: 'Calcule horas extras e adicionais', icon: 'fa-clock', category: 'simuladores', path: '/ferramentas/simulador-hora-extra' },
    { id: 'simulador-inss', name: 'Simulador de INSS', description: 'Calcule contribuição INSS', icon: 'fa-hand-holding-dollar', category: 'simuladores', path: '/ferramentas/simulador-inss' },
    { id: 'simulador-consorcio', name: 'Simulador de Consórcio', description: 'Simule parcelas de consórcio', icon: 'fa-handshake', category: 'simuladores', path: '/ferramentas/simulador-consorcio' },
    { id: 'simulador-poupanca', name: 'Simulador de Poupança', description: 'Simule rendimento da poupança', icon: 'fa-wallet', category: 'simuladores', path: '/ferramentas/simulador-poupanca' },
    { id: 'simulador-cdb', name: 'Simulador de CDB', description: 'Simule rendimento de CDB', icon: 'fa-landmark', category: 'simuladores', path: '/ferramentas/simulador-cdb' },
    { id: 'simulador-tesouro', name: 'Simulador Tesouro Direto', description: 'Simule investimento no Tesouro Direto', icon: 'fa-building-columns', category: 'simuladores', path: '/ferramentas/simulador-tesouro' },
    { id: 'simulador-acoes', name: 'Simulador de Ações', description: 'Simule investimento em ações', icon: 'fa-chart-simple', category: 'simuladores', path: '/ferramentas/simulador-acoes' },
    { id: 'simulador-precatorio', name: 'Simulador de Precatório', description: 'Calcule atualização de precatórios', icon: 'fa-gavel', category: 'simuladores', path: '/ferramentas/simulador-precatorio' },
    { id: 'simulador-pensao', name: 'Simulador de Pensão Alimentícia', description: 'Calcule valor de pensão alimentícia', icon: 'fa-child', category: 'simuladores', path: '/ferramentas/simulador-pensao' },
    { id: 'simulador-aluguel', name: 'Simulador Alugar ou Comprar', description: 'Compare comprar vs alugar imóvel', icon: 'fa-key', category: 'simuladores', path: '/ferramentas/simulador-aluguel' },
    { id: 'simulador-seguro', name: 'Simulador de Seguro', description: 'Calcule valor de seguro', icon: 'fa-shield', category: 'simuladores', path: '/ferramentas/simulador-seguro' },
    { id: 'simulador-financiamento-carro', name: 'Simulador Financiamento Veículo', description: 'Simule financiamento de carro', icon: 'fa-car', category: 'simuladores', path: '/ferramentas/simulador-financiamento-carro' },
    { id: 'simulador-energia-solar', name: 'Simulador de Energia Solar', description: 'Calcule economia com energia solar', icon: 'fa-solar-panel', category: 'simuladores', path: '/ferramentas/simulador-energia-solar' },
    { id: 'simulador-divida', name: 'Simulador de Quitação de Dívida', description: 'Planeje pagamento de dívidas', icon: 'fa-money-bill-trend-up', category: 'simuladores', path: '/ferramentas/simulador-divida' },
    { id: 'simulador-cambio', name: 'Simulador de Câmbio', description: 'Simule conversão de moedas', icon: 'fa-dollar-sign', category: 'simuladores', path: '/ferramentas/simulador-cambio' },
  ])

  const categoryInfo = computed<Record<string, CategoryInfo>>(() => ({
    calculadoras: {
      title: 'Calculadoras',
      icon: 'fa-calculator',
      color: 'blue',
      total: tools.value.filter(t => t.category === 'calculadoras').length,
    },
    geradores: {
      title: 'Geradores',
      icon: 'fa-wand-magic-sparkles',
      color: 'purple',
      total: tools.value.filter(t => t.category === 'geradores').length,
    },
    conversores: {
      title: 'Conversores',
      icon: 'fa-arrows-rotate',
      color: 'green',
      total: tools.value.filter(t => t.category === 'conversores').length,
    },
    validadores: {
      title: 'Validadores',
      icon: 'fa-check-circle',
      color: 'orange',
      total: tools.value.filter(t => t.category === 'validadores').length,
    },
    simuladores: {
      title: 'Simuladores',
      icon: 'fa-chart-line',
      color: 'red',
      total: tools.value.filter(t => t.category === 'simuladores').length,
    },
    texto: {
      title: 'Texto',
      icon: 'fa-text-height',
      color: 'teal',
      total: tools.value.filter(t => t.category === 'texto').length,
    },
  }))

  const toolsByCategory = computed(() => {
    const grouped: Record<string, Tool[]> = {}
    for (const tool of tools.value) {
      if (!grouped[tool.category]) grouped[tool.category] = []
      grouped[tool.category].push(tool)
    }
    return grouped
  })

  const filteredTools = computed(() => {
    if (!searchQuery.value) return tools.value
    const query = searchQuery.value.toLowerCase()
    return tools.value.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query),
    )
  })

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return {
    tools,
    searchQuery,
    categoryInfo,
    toolsByCategory,
    filteredTools,
    setSearchQuery,
  }
})
