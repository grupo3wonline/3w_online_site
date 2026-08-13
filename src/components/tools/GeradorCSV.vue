<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
          <i class="fas fa-file-csv text-teal-600 dark:text-teal-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de CSV</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere arquivos CSV com dados fictícios para testes</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Dados</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button @click="tipoDados = 'pessoas'" class="p-3 rounded-lg border-2 transition-all" :class="tipoDados === 'pessoas' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-users text-teal-600 dark:text-teal-400 mb-1"></i>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">Pessoas</div>
            </button>
            <button @click="tipoDados = 'vendas'" class="p-3 rounded-lg border-2 transition-all" :class="tipoDados === 'vendas' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-chart-line text-teal-600 dark:text-teal-400 mb-1"></i>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">Vendas</div>
            </button>
            <button @click="tipoDados = 'transacoes'" class="p-3 rounded-lg border-2 transition-all" :class="tipoDados === 'transacoes' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-exchange-alt text-teal-600 dark:text-teal-400 mb-1"></i>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">Transações</div>
            </button>
            <button @click="tipoDados = 'estoque'" class="p-3 rounded-lg border-2 transition-all" :class="tipoDados === 'estoque' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-boxes text-teal-600 dark:text-teal-400 mb-1"></i>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">Estoque</div>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="quantidade" label="Quantidade de Linhas" type="number" :min="1" :max="1000" icon="fa-solid fa-hashtag" />
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delimitador</label>
            <select v-model="delimitador" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value=",">,  (vírgula)</option>
              <option value=";">; (ponto e vírgula)</option>
              <option value="\t">Tab</option>
              <option value="|">| (pipe)</option>
            </select>
          </div>
        </div>

        <BaseButton @click="gerar" variant="primary" class="w-full">
          <i class="fas fa-file-csv mr-2"></i>
          Gerar CSV
        </BaseButton>

        <div v-if="csv" class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Arquivo CSV Gerado ({{ linhasGeradas }} linhas)</h3>
            <div class="flex gap-2">
              <BaseButton @click="copiarCSV" variant="secondary" size="sm">
                <i class="fas fa-copy mr-2"></i>
                Copiar
              </BaseButton>
              <BaseButton @click="baixarCSV" variant="primary" size="sm">
                <i class="fas fa-download mr-2"></i>
                Baixar CSV
              </BaseButton>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-96">
            <pre class="text-gray-900 dark:text-gray-100 text-xs font-mono">{{ csvPreview }}</pre>
          </div>

          <div class="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-teal-600 dark:text-teal-400 mt-1 mr-3"></i>
              <div class="text-sm text-teal-800 dark:text-teal-300">
                <p class="font-semibold mb-2">Sobre o CSV gerado:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li>Primeira linha contém cabeçalhos das colunas</li>
                  <li>Delimitador: {{ getDelimitadorNome() }}</li>
                  <li>Compatível com Excel, Google Sheets, Power BI, etc.</li>
                  <li>Dados fictícios gerados aleatoriamente para testes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const tipoDados = ref('pessoas')
const quantidade = ref(50)
const delimitador = ref(',')
const csv = ref('')
const linhasGeradas = ref(0)

const csvPreview = computed(() => {
  const linhas = csv.value.split('\n')
  return linhas.slice(0, 20).join('\n') + (linhas.length > 20 ? '\n... (restante omitido na prévia)' : '')
})

const nomes = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza', 'Julia Lima', 'Rafael Alves', 'Beatriz Rocha', 'Lucas Martins', 'Fernanda Dias']
const produtos = ['Notebook Dell', 'Mouse Logitech', 'Teclado Mecânico', 'Monitor LG', 'Webcam Full HD', 'Headset Gamer', 'Cadeira Gamer', 'Mesa Escritório']
const categorias = ['Eletrônicos', 'Informática', 'Periféricos', 'Móveis', 'Acessórios', 'Games', 'Audio', 'Video']

const gerarPessoas = (qtd) => {
  const d = delimitador.value
  let resultado = `Nome${d}Email${d}Idade${d}Cidade${d}Telefone${d}CPF\n`
  
  for (let i = 0; i < qtd; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)]
    const email = `${nome.split(' ')[0].toLowerCase()}${i}@example.com`
    const idade = 18 + Math.floor(Math.random() * 52)
    const cidade = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba'][Math.floor(Math.random() * 4)]
    const telefone = `(11) 9${1000 + Math.floor(Math.random() * 9000)}-${1000 + Math.floor(Math.random() * 9000)}`
    const cpf = `${100 + Math.floor(Math.random() * 900)}.${100 + Math.floor(Math.random() * 900)}.${100 + Math.floor(Math.random() * 900)}-${10 + Math.floor(Math.random() * 90)}`
    resultado += `${nome}${d}${email}${d}${idade}${d}${cidade}${d}${telefone}${d}${cpf}\n`
  }
  return resultado
}

const gerarVendas = (qtd) => {
  const d = delimitador.value
  let resultado = `Data${d}Produto${d}Quantidade${d}Valor Unitário${d}Total${d}Vendedor\n`
  
  for (let i = 0; i < qtd; i++) {
    const data = `2024-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`
    const produto = produtos[Math.floor(Math.random() * produtos.length)]
    const quantidade = 1 + Math.floor(Math.random() * 10)
    const valorUnitario = (50 + Math.random() * 950).toFixed(2)
    const total = (quantidade * parseFloat(valorUnitario)).toFixed(2)
    const vendedor = nomes[Math.floor(Math.random() * nomes.length)]
    resultado += `${data}${d}${produto}${d}${quantidade}${d}${valorUnitario}${d}${total}${d}${vendedor}\n`
  }
  return resultado
}

const gerarTransacoes = (qtd) => {
  const d = delimitador.value
  let resultado = `ID${d}Data${d}Tipo${d}Valor${d}Status${d}Método Pagamento\n`
  
  for (let i = 0; i < qtd; i++) {
    const id = 1000 + i
    const data = `2024-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
    const tipo = ['Compra', 'Venda', 'Transferência', 'Estorno'][Math.floor(Math.random() * 4)]
    const valor = (10 + Math.random() * 990).toFixed(2)
    const status = ['Aprovado', 'Pendente', 'Cancelado'][Math.floor(Math.random() * 3)]
    const metodo = ['Crédito', 'Débito', 'PIX', 'Boleto'][Math.floor(Math.random() * 4)]
    resultado += `${id}${d}${data}${d}${tipo}${d}${valor}${d}${status}${d}${metodo}\n`
  }
  return resultado
}

const gerarEstoque = (qtd) => {
  const d = delimitador.value
  let resultado = `SKU${d}Produto${d}Categoria${d}Quantidade${d}Preço${d}Fornecedor\n`
  
  for (let i = 0; i < qtd; i++) {
    const sku = `SKU${String(1000 + i).padStart(6, '0')}`
    const produto = produtos[Math.floor(Math.random() * produtos.length)]
    const categoria = categorias[Math.floor(Math.random() * categorias.length)]
    const quantidade = Math.floor(Math.random() * 200)
    const preco = (30 + Math.random() * 970).toFixed(2)
    const fornecedor = `Fornecedor ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`
    resultado += `${sku}${d}${produto}${d}${categoria}${d}${quantidade}${d}${preco}${d}${fornecedor}\n`
  }
  return resultado
}

const gerar = () => {
  const qtd = Number(quantidade.value)
  
  if (tipoDados.value === 'pessoas') {
    csv.value = gerarPessoas(qtd)
  } else if (tipoDados.value === 'vendas') {
    csv.value = gerarVendas(qtd)
  } else if (tipoDados.value === 'transacoes') {
    csv.value = gerarTransacoes(qtd)
  } else if (tipoDados.value === 'estoque') {
    csv.value = gerarEstoque(qtd)
  }
  
  linhasGeradas.value = csv.value.split('\n').length - 1
  trackToolUsage('Gerador CSV', 'generate', { tipo: tipoDados.value, quantidade: qtd })
}

const copiarCSV = async () => {
  try {
    await navigator.clipboard.writeText(csv.value)
    Swal.fire({
      title: 'Copiado!',
      text: 'CSV copiado para área de transferência',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const baixarCSV = () => {
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csv.value], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `dados_${tipoDados.value}_${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

const getDelimitadorNome = () => {
  const nomes = { ',': 'Vírgula', ';': 'Ponto e vírgula', '\t': 'Tab', '|': 'Pipe' }
  return nomes[delimitador.value] || 'Vírgula'
}
</script>
