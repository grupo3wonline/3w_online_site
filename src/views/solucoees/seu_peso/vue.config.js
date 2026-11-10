const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/seu_peso/',
  productionSourceMap: false,
  css: {
    extract: true,
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Seu Peso - Calculadora de Saúde Corporal'
      args[0].meta = {
        viewport: 'width=device-width,initial-scale=1.0',
        description: 'Aplicação completa para calcular IMC, metabolismo basal, calorias diárias e muito mais. Monitore sua saúde de forma inteligente.',
        keywords: 'imc, calculadora, peso ideal, metabolismo basal, calorias, saúde, fitness, nutrição',
        author: 'Ferramentas WYL',
        'og:title': 'Seu Peso - Calculadora de Saúde Corporal',
        'og:description': 'Calcule seu IMC, peso ideal, metabolismo basal e muito mais com nossa ferramenta completa de saúde.',
        'og:type': 'website',
        'twitter:card': 'summary_large_image'
      }
      return args
    })
  }
})
