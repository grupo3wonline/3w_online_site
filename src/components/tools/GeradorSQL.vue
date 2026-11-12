<template>
  <ToolShell
    title="Gerador de SQL"
    description="Gere comandos SQL INSERT com dados fictícios para popular banco de dados de teste rapidamente."
    icon="fa-database"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['4 tipos de dados', 'Até 100 registros', 'Copie ou baixe o .sql']"
    :tips="[
      { title: 'Para que serve', text: 'Popule bancos de dados de teste e desenvolvimento sem criar dados manualmente.', type: 'info' },
      { title: 'SGBDs suportados', text: 'Os INSERTs gerados são compatíveis com MySQL, PostgreSQL, SQL Server e SQLite.', type: 'info' },
      { title: 'Ajuste os tipos', text: 'Revise os tipos de dados gerados antes de executar em banco de produção.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Tabela de usuários', desc: 'Tipo: Usuários | Tabela: usuarios | Qtd: 10', result: 'INSERT INTO usuarios (nome, email, senha, data_cadastro) VALUES (...)' },
      { title: 'Catálogo de produtos', desc: 'Tipo: Produtos | Tabela: produtos | Qtd: 5', result: 'INSERT INTO produtos (nome, preco, estoque, categoria) VALUES (...)' },
      { title: 'Histórico de pedidos', desc: 'Tipo: Pedidos | Tabela: pedidos | Qtd: 20', result: 'INSERT INTO pedidos (usuario_id, total, status, data_pedido) VALUES (...)' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Configuração -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <BaseInput
            v-model="nomeTabela"
            label="Nome da Tabela"
            placeholder="usuarios"
            icon="fa-table"
            tooltip="Nome da tabela SQL onde os dados serão inseridos."
          />

          <div>
            <label class="input-aurora-label">
              <i class="fas fa-database mr-1.5 text-blue-500"></i>
              Tipo de Dados
            </label>
            <div class="grid grid-cols-2 gap-3 mt-2">
              <button
                v-for="tipo in tiposDados"
                :key="tipo.value"
                @click="tipoDados = tipo.value"
                :class="['p-3 rounded-xl border-2 transition-all text-left', tipoDados === tipo.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700']"
              >
                <i :class="['fas', tipo.icon, 'text-blue-600 dark:text-blue-400 mb-1 block text-lg']"></i>
                <div class="font-semibold text-gray-900 dark:text-white text-sm">{{ tipo.label }}</div>
              </button>
            </div>
          </div>

          <BaseInput
            v-model="quantidade"
            label="Quantidade de Registros"
            type="number"
            :min="1"
            :max="100"
            icon="fa-hashtag"
            hint="Máximo 100 registros por geração"
            tooltip="Quantos comandos INSERT serão gerados."
          />

          <div class="flex gap-3">
            <BaseButton variant="primary" icon="fa-code" @click="gerar" class="flex-1">Gerar SQL</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="sql = ''">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="sql" class="space-y-4">
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">SQL gerado para</p>
              <p class="text-3xl font-black text-white mb-1">{{ nomeTabela || 'tabela' }}</p>
              <p class="text-blue-300 text-sm">
                <i class="fas fa-database mr-1"></i>{{ quantidade }} registros • {{ tipoDados }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ quantidade }}</div>
                <div class="metric-glass-label">Registros</div>
              </div>
              <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
                <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">
                  {{ sql.split('\n').filter(l => l.startsWith('INSERT')).length }}
                </div>
                <div class="metric-glass-label">Comandos INSERT</div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                  <i class="fas fa-code text-blue-500"></i>SQL Gerado
                </h4>
                <div class="flex gap-2">
                  <button @click="copiarSQL" class="copy-btn"><i class="fas fa-copy mr-1"></i>Copiar</button>
                  <button @click="baixarSQL" class="copy-btn"><i class="fas fa-download mr-1"></i>Baixar</button>
                </div>
              </div>
              <pre class="bg-gray-900 dark:bg-black text-green-400 text-xs font-mono p-3 rounded-lg max-h-72 overflow-auto">{{ sql }}</pre>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Execute no seu SGBD (MySQL, PostgreSQL, SQLite). Ajuste os tipos de dados conforme necessário.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!sql" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-database text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Configure os parâmetros e clique em Gerar SQL</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const nomeTabela = ref('usuarios')
const tipoDados  = ref('usuarios')
const quantidade = ref(10)
const sql        = ref('')

const tiposDados = [
  { value: 'usuarios', label: 'Usuários',  icon: 'fa-users' },
  { value: 'produtos', label: 'Produtos',  icon: 'fa-box' },
  { value: 'pedidos',  label: 'Pedidos',   icon: 'fa-shopping-cart' },
  { value: 'clientes', label: 'Clientes',  icon: 'fa-user-tie' },
]

const nomes      = ['João Silva','Maria Santos','Pedro Oliveira','Ana Costa','Carlos Souza','Julia Lima','Rafael Alves','Beatriz Rocha']
const emailBase  = ['joao','maria','pedro','ana','carlos','julia','rafael','beatriz']
const produtos   = ['Notebook','Mouse','Teclado','Monitor','Webcam','Headset','Cadeira Gamer','Mesa']
const categorias = ['Eletrônicos','Informática','Periféricos','Móveis','Acessórios']
const statusList = ['pendente','processando','enviado','entregue','cancelado']
const cidades    = ['São Paulo','Rio de Janeiro','Belo Horizonte','Curitiba','Porto Alegre']

const rnd  = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
const rndN = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const rndDate = () => `2024-${String(rndN(1,12)).padStart(2,'0')}-${String(rndN(1,28)).padStart(2,'0')}`

const gerarDados = (qtd: number) => {
  const rows: string[] = []
  for (let i = 0; i < qtd; i++) {
    const tb = nomeTabela.value
    if (tipoDados.value === 'usuarios') {
      const nome = rnd(nomes)
      rows.push(`INSERT INTO ${tb} (nome, email, senha, data_cadastro) VALUES ('${nome}', '${rnd(emailBase)}${i}@example.com', 'hash${1000+i}', '${rndDate()}');`)
    } else if (tipoDados.value === 'produtos') {
      rows.push(`INSERT INTO ${tb} (nome, preco, estoque, categoria) VALUES ('${rnd(produtos)} ${i+1}', ${(50+Math.random()*1950).toFixed(2)}, ${rndN(0,100)}, '${rnd(categorias)}');`)
    } else if (tipoDados.value === 'pedidos') {
      rows.push(`INSERT INTO ${tb} (usuario_id, total, status, data_pedido) VALUES (${rndN(1,10)}, ${(20+Math.random()*980).toFixed(2)}, '${rnd(statusList)}', '${rndDate()}');`)
    } else {
      const nome = rnd(nomes)
      rows.push(`INSERT INTO ${tb} (nome, cpf, telefone, cidade) VALUES ('${nome}', '${rndN(100,999)}.${rndN(100,999)}.${rndN(100,999)}-${rndN(10,99)}', '(11) 9${rndN(1000,9999)}-${rndN(1000,9999)}', '${rnd(cidades)}');`)
    }
  }
  return rows.join('\n')
}

const gerar = () => {
  sql.value = `-- SQL para tabela ${nomeTabela.value}\n-- Tipo: ${tipoDados.value} | Qtd: ${quantidade.value}\n\n` + gerarDados(Number(quantidade.value))
}

const copiarSQL = async () => {
  try {
    await navigator.clipboard.writeText(sql.value)
    Swal.fire({ title: 'Copiado!', icon: 'success', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const baixarSQL = () => {
  const blob = new Blob([sql.value], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = `${nomeTabela.value}_inserts.sql`; a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
