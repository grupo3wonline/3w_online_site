<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <i class="fas fa-file-code text-indigo-600 dark:text-indigo-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de JSON</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere dados JSON falsos para testes e protótipos</p>
      </div>

      <div class="space-y-6">
        <!-- Templates -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <i class="fas fa-layer-group mr-2"></i>
            Template
          </label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              v-for="template in templates"
              :key="template.id"
              @click="templateSelecionado = template.id"
              class="p-4 rounded-lg border-2 transition-all"
              :class="templateSelecionado === template.id 
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' 
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-indigo-400'"
            >
              <i :class="[template.icon, 'text-2xl mb-2', templateSelecionado === template.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400']"></i>
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ template.nome }}</div>
            </button>
          </div>
        </div>

        <!-- Opções -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="quantidade"
            label="Quantidade de registros"
            type="number"
            :min="1"
            :max="100"
            icon="fa-solid fa-hashtag"
          />

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Opções
            </label>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="prettyPrint"
                  v-model="prettyPrint"
                  class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                >
                <label for="prettyPrint" class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  Formatação legível (Pretty Print)
                </label>
              </div>
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="incluirNulls"
                  v-model="incluirNulls"
                  class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                >
                <label for="incluirNulls" class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  Incluir valores null aleatórios
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Botão Gerar -->
        <BaseButton @click="gerar" variant="primary" class="w-full">
          <i class="fas fa-magic mr-2"></i>
          Gerar JSON
        </BaseButton>

        <!-- JSON Gerado -->
        <div v-if="jsonGerado" class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">JSON Gerado</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ jsonGerado.length }} caracteres • {{ quantidade }} registro(s)
                </p>
              </div>
              <div class="flex gap-2">
                <BaseButton @click="copiar" variant="outline" size="sm">
                  <i class="fas fa-copy mr-2"></i>
                  Copiar
                </BaseButton>
                <BaseButton @click="baixarJson" variant="outline" size="sm">
                  <i class="fas fa-download mr-2"></i>
                  Baixar
                </BaseButton>
              </div>
            </div>

            <div class="relative">
              <pre class="bg-white dark:bg-gray-600 rounded-lg p-4 text-sm text-gray-900 dark:text-white overflow-x-auto max-h-96 overflow-y-auto font-mono">{{ jsonGerado }}</pre>
            </div>
          </div>

          <!-- Snippets de Código -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
                  <i class="fab fa-js text-yellow-500 mr-2"></i>
                  JavaScript
                </h4>
                <button @click="copiarSnippet('js')" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                  Copiar
                </button>
              </div>
              <pre class="bg-gray-50 dark:bg-gray-600 rounded p-2 text-xs text-gray-900 dark:text-white overflow-x-auto font-mono">const data = {{ jsonGerado.substring(0, 100) }}...</pre>
            </div>

            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
                  <i class="fab fa-python text-blue-500 mr-2"></i>
                  Python
                </h4>
                <button @click="copiarSnippet('python')" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                  Copiar
                </button>
              </div>
              <pre class="bg-gray-50 dark:bg-gray-600 rounded p-2 text-xs text-gray-900 dark:text-white overflow-x-auto font-mono">import json
data = json.loads('''{{ jsonGerado.substring(0, 50) }}...''')</pre>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4">
          <div class="flex">
            <i class="fas fa-lightbulb text-indigo-600 dark:text-indigo-400 mt-1 mr-3"></i>
            <div class="text-sm text-indigo-800 dark:text-indigo-300">
              <p class="font-semibold mb-2">💡 Dica de Uso:</p>
              <p>
                Use este gerador para criar dados de teste para APIs, mockups de interface, 
                demonstrações de produtos ou preenchimento de bancos de dados de desenvolvimento.
                Os dados são totalmente fictícios e gerados aleatoriamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const templates = [
  { id: 'usuario', nome: 'Usuário', icon: 'fas fa-user' },
  { id: 'produto', nome: 'Produto', icon: 'fas fa-shopping-cart' },
  { id: 'empresa', nome: 'Empresa', icon: 'fas fa-building' },
  { id: 'pedido', nome: 'Pedido', icon: 'fas fa-receipt' }
]

const templateSelecionado = ref('usuario')
const quantidade = ref(5)
const prettyPrint = ref(true)
const incluirNulls = ref(false)
const jsonGerado = ref('')

const nomes = ['Ana Silva', 'João Santos', 'Maria Oliveira', 'Pedro Costa', 'Julia Almeida', 'Carlos Ferreira', 'Beatriz Lima', 'Lucas Souza']
const emails = ['exemplo', 'teste', 'demo', 'user', 'contact']
const dominios = ['email.com', 'exemplo.com.br', 'teste.com', 'mail.com']
const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Salvador', 'Fortaleza', 'Curitiba', 'Porto Alegre']
const empresas = ['Tech Solutions', 'Inovação Brasil', 'Digital Corp', 'Future Systems', 'Smart Business']
const produtos = ['Notebook', 'Mouse', 'Teclado', 'Monitor', 'Webcam', 'Headset', 'SSD', 'RAM']
const categorias = ['Eletrônicos', 'Informática', 'Acessórios', 'Periféricos']
const status = ['pendente', 'processando', 'enviado', 'entregue', 'cancelado']

const aleatorio = (array) => array[Math.floor(Math.random() * array.length)]
const numeroAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const talvezNull = (valor) => (incluirNulls.value && Math.random() < 0.2) ? null : valor

const gerarId = () => Math.random().toString(36).substring(2, 15)

const gerarUsuario = () => ({
  id: gerarId(),
  nome: talvezNull(aleatorio(nomes)),
  email: talvezNull(`${aleatorio(emails)}${numeroAleatorio(1, 999)}@${aleatorio(dominios)}`),
  idade: talvezNull(numeroAleatorio(18, 65)),
  cidade: talvezNull(aleatorio(cidades)),
  ativo: Math.random() > 0.3,
  criado_em: new Date(Date.now() - numeroAleatorio(1, 365) * 24 * 60 * 60 * 1000).toISOString()
})

const gerarProduto = () => ({
  id: gerarId(),
  nome: talvezNull(aleatorio(produtos)),
  descricao: talvezNull(`${aleatorio(produtos)} de alta qualidade`),
  preco: talvezNull(Number((Math.random() * 5000 + 100).toFixed(2))),
  categoria: talvezNull(aleatorio(categorias)),
  estoque: numeroAleatorio(0, 500),
  disponivel: Math.random() > 0.2,
  criado_em: new Date(Date.now() - numeroAleatorio(1, 180) * 24 * 60 * 60 * 1000).toISOString()
})

const gerarEmpresa = () => ({
  id: gerarId(),
  nome: talvezNull(aleatorio(empresas)),
  cnpj: talvezNull(`${numeroAleatorio(10, 99)}.${numeroAleatorio(100, 999)}.${numeroAleatorio(100, 999)}/0001-${numeroAleatorio(10, 99)}`),
  email: talvezNull(`contato@${aleatorio(empresas).toLowerCase().replace(/\s/g, '')}.com.br`),
  telefone: talvezNull(`(${numeroAleatorio(11, 99)}) ${numeroAleatorio(9000, 9999)}-${numeroAleatorio(1000, 9999)}`),
  cidade: talvezNull(aleatorio(cidades)),
  funcionarios: numeroAleatorio(10, 1000),
  fundada_em: numeroAleatorio(1990, 2020)
})

const gerarPedido = () => ({
  id: gerarId(),
  numero: `PED-${numeroAleatorio(10000, 99999)}`,
  cliente: talvezNull(aleatorio(nomes)),
  itens: numeroAleatorio(1, 10),
  total: talvezNull(Number((Math.random() * 10000 + 50).toFixed(2))),
  status: aleatorio(status),
  data: new Date(Date.now() - numeroAleatorio(1, 30) * 24 * 60 * 60 * 1000).toISOString(),
  entrega_prevista: new Date(Date.now() + numeroAleatorio(1, 15) * 24 * 60 * 60 * 1000).toISOString()
})

const gerar = () => {
  const qtd = Number(quantidade.value)
  
  if (qtd < 1 || qtd > 100) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Quantidade deve estar entre 1 e 100' })
    return
  }

  const dados = []
  
  for (let i = 0; i < qtd; i++) {
    switch (templateSelecionado.value) {
      case 'usuario':
        dados.push(gerarUsuario())
        break
      case 'produto':
        dados.push(gerarProduto())
        break
      case 'empresa':
        dados.push(gerarEmpresa())
        break
      case 'pedido':
        dados.push(gerarPedido())
        break
    }
  }

  jsonGerado.value = prettyPrint.value 
    ? JSON.stringify(dados, null, 2)
    : JSON.stringify(dados)

  trackToolUsage('Gerador JSON', 'generate')
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(jsonGerado.value)
    trackConversion('copy', 'json')
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      timer: 1000,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const copiarSnippet = async (linguagem) => {
  let codigo = ''
  
  if (linguagem === 'js') {
    codigo = `const data = ${jsonGerado.value};`
  } else if (linguagem === 'python') {
    codigo = `import json\n\ndata = json.loads('''${jsonGerado.value}''')`
  }

  try {
    await navigator.clipboard.writeText(codigo)
    trackConversion('copy', `snippet-${linguagem}`)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      timer: 1000,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const baixarJson = () => {
  const blob = new Blob([jsonGerado.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${templateSelecionado.value}-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)

  trackConversion('download', 'json')
  Swal.fire({
    icon: 'success',
    title: 'Download iniciado!',
    timer: 1500,
    showConfirmButton: false
  })
}

// Gerar automaticamente ao carregar
gerar()
</script>
