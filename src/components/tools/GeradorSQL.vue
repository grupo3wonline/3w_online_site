<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
          <i class="fas fa-database text-emerald-600 dark:text-emerald-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de SQL</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere comandos INSERT para popular seu banco de dados</p>
      </div>

      <div class="space-y-6">
        <BaseInput v-model="nomeTabela" label="Nome da Tabela" placeholder="usuarios" icon="fa-solid fa-table" />

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Dados</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button @click="tipoDados = 'usuarios'" class="p-3 rounded-lg border-2 transition-all" :class="tipoDados === 'usuarios' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-users text-emerald-600 dark:text-emerald-400 mb-1"></i>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">Usuários</div>
            </button>
            <button @click="tipoDados = 'produtos'" class="p-3 rounded-lg border-2 transition-all" :class="tipoDados === 'produtos' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-box text-emerald-600 dark:text-emerald-400 mb-1"></i>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">Produtos</div>
            </button>
            <button @click="tipoDados = 'pedidos'" class="p-3 rounded-lg border-2 transition-all" :class="tipoDados === 'pedidos' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-shopping-cart text-emerald-600 dark:text-emerald-400 mb-1"></i>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">Pedidos</div>
            </button>
            <button @click="tipoDados = 'clientes'" class="p-3 rounded-lg border-2 transition-all" :class="tipoDados === 'clientes' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-user-tie text-emerald-600 dark:text-emerald-400 mb-1"></i>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">Clientes</div>
            </button>
          </div>
        </div>

        <BaseInput v-model="quantidade" label="Quantidade de Registros" type="number" :min="1" :max="100" icon="fa-solid fa-hashtag" />

        <BaseButton @click="gerar" variant="primary" class="w-full">
          <i class="fas fa-code mr-2"></i>
          Gerar SQL
        </BaseButton>

        <div v-if="sql" class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Comandos SQL Gerados</h3>
            <div class="flex gap-2">
              <BaseButton @click="copiarSQL" variant="secondary" size="sm">
                <i class="fas fa-copy mr-2"></i>
                Copiar
              </BaseButton>
              <BaseButton @click="baixarSQL" variant="secondary" size="sm">
                <i class="fas fa-download mr-2"></i>
                Baixar
              </BaseButton>
            </div>
          </div>

          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-green-400 text-sm font-mono">{{ sql }}</pre>
          </div>

          <div class="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-emerald-600 dark:text-emerald-400 mt-1 mr-3"></i>
              <div class="text-sm text-emerald-800 dark:text-emerald-300">
                <p class="font-semibold mb-2">Como usar:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li>Copie os comandos SQL gerados</li>
                  <li>Execute no seu SGBD (MySQL, PostgreSQL, SQL Server, etc.)</li>
                  <li>Ajuste os tipos de dados conforme necessário</li>
                  <li>Ideal para popular bancos de teste e desenvolvimento</li>
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
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const nomeTabela = ref('usuarios')
const tipoDados = ref('usuarios')
const quantidade = ref(10)
const sql = ref('')

const nomes = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza', 'Julia Lima', 'Rafael Alves', 'Beatriz Rocha']
const emails = ['joao', 'maria', 'pedro', 'ana', 'carlos', 'julia', 'rafael', 'beatriz']
const produtos = ['Notebook', 'Mouse', 'Teclado', 'Monitor', 'Webcam', 'Headset', 'Cadeira Gamer', 'Mesa']
const categorias = ['Eletrônicos', 'Informática', 'Periféricos', 'Móveis', 'Acessórios']
const status = ['pendente', 'processando', 'enviado', 'entregue', 'cancelado']

const gerarDadosUsuarios = (qtd) => {
  const inserts = []
  for (let i = 0; i < qtd; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)]
    const email = `${emails[Math.floor(Math.random() * emails.length)]}${i}@example.com`
    const senha = 'senha' + (1000 + Math.floor(Math.random() * 9000))
    const dataCadastro = `2024-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`
    inserts.push(`INSERT INTO ${nomeTabela.value} (nome, email, senha, data_cadastro) VALUES ('${nome}', '${email}', '${senha}', '${dataCadastro}');`)
  }
  return inserts.join('\n')
}

const gerarDadosProdutos = (qtd) => {
  const inserts = []
  for (let i = 0; i < qtd; i++) {
    const produto = produtos[Math.floor(Math.random() * produtos.length)] + ' ' + (i + 1)
    const preco = (50 + Math.random() * 1950).toFixed(2)
    const estoque = Math.floor(Math.random() * 100)
    const categoria = categorias[Math.floor(Math.random() * categorias.length)]
    inserts.push(`INSERT INTO ${nomeTabela.value} (nome, preco, estoque, categoria) VALUES ('${produto}', ${preco}, ${estoque}, '${categoria}');`)
  }
  return inserts.join('\n')
}

const gerarDadosPedidos = (qtd) => {
  const inserts = []
  for (let i = 0; i < qtd; i++) {
    const usuarioId = 1 + Math.floor(Math.random() * 10)
    const total = (20 + Math.random() * 980).toFixed(2)
    const statusPedido = status[Math.floor(Math.random() * status.length)]
    const dataPedido = `2024-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`
    inserts.push(`INSERT INTO ${nomeTabela.value} (usuario_id, total, status, data_pedido) VALUES (${usuarioId}, ${total}, '${statusPedido}', '${dataPedido}');`)
  }
  return inserts.join('\n')
}

const gerarDadosClientes = (qtd) => {
  const inserts = []
  for (let i = 0; i < qtd; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)]
    const cpf = `${100 + Math.floor(Math.random() * 900)}.${100 + Math.floor(Math.random() * 900)}.${100 + Math.floor(Math.random() * 900)}-${10 + Math.floor(Math.random() * 90)}`
    const telefone = `(11) 9${1000 + Math.floor(Math.random() * 9000)}-${1000 + Math.floor(Math.random() * 9000)}`
    const cidade = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'][Math.floor(Math.random() * 3)]
    inserts.push(`INSERT INTO ${nomeTabela.value} (nome, cpf, telefone, cidade) VALUES ('${nome}', '${cpf}', '${telefone}', '${cidade}');`)
  }
  return inserts.join('\n')
}

const gerar = () => {
  const qtd = Number(quantidade.value)
  
  let sqlGerado = `-- Comandos SQL para tabela ${nomeTabela.value}\n`
  sqlGerado += `-- Tipo: ${tipoDados.value}\n`
  sqlGerado += `-- Quantidade: ${qtd} registros\n\n`
  
  if (tipoDados.value === 'usuarios') {
    sqlGerado += gerarDadosUsuarios(qtd)
  } else if (tipoDados.value === 'produtos') {
    sqlGerado += gerarDadosProdutos(qtd)
  } else if (tipoDados.value === 'pedidos') {
    sqlGerado += gerarDadosPedidos(qtd)
  } else if (tipoDados.value === 'clientes') {
    sqlGerado += gerarDadosClientes(qtd)
  }
  
  sql.value = sqlGerado
  trackToolUsage('Gerador SQL', 'generate', { tipo: tipoDados.value, quantidade: qtd })
}

const copiarSQL = async () => {
  try {
    await navigator.clipboard.writeText(sql.value)
    Swal.fire({
      title: 'Copiado!',
      text: 'SQL copiado para área de transferência',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const baixarSQL = () => {
  const blob = new Blob([sql.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${nomeTabela.value}_inserts.sql`
  a.click()
  URL.revokeObjectURL(url)
}
</script>
