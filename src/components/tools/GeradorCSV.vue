<template>
  <ToolShell
    title="Gerador de CSV"
    description="Gere arquivos CSV com dados fictícios para testes: pessoas, vendas, transações e estoque. Compatível com Excel e Google Sheets."
    icon="fa-file-csv"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['4 tipos de dados', 'Separador configurável', 'Download direto']"
    :tips="[
      { title: 'Compatibilidade', text: 'O arquivo gerado é compatível com Excel, Google Sheets, LibreOffice Calc, Power BI e qualquer ferramenta que aceite CSV.' },
      { title: 'BOM UTF-8', text: 'O arquivo inclui BOM (Byte Order Mark) para garantir que caracteres especiais (acentos) apareçam corretamente no Excel.', type: 'info' },
      { title: 'Ponto e vírgula', text: 'Se o seu Excel usa vírgula como separador decimal, prefira o delimitador ponto e vírgula (;) para evitar conflitos.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Base de usuários', desc: 'Tipo: Pessoas, Linhas: 100', result: 'CSV com nome, email, idade, cidade, telefone, CPF' },
      { title: 'Relatório de vendas', desc: 'Tipo: Vendas, Linhas: 50', result: 'CSV com data, produto, quantidade, valor, vendedor' },
      { title: 'Inventário', desc: 'Tipo: Estoque, Linhas: 200', result: 'CSV com SKU, produto, categoria, quantidade, preço' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Tipo de dados -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-database mr-1.5 text-emerald-500"></i>
              Tipo de dados
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="tipo in tiposDados"
                :key="tipo.id"
                @click="tipoDados = tipo.id"
                :class="[
                  'p-3 rounded-xl border-2 transition-all text-center',
                  tipoDados === tipo.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300'
                ]"
              >
                <i :class="[tipo.icon, 'text-xl mb-1 block', tipoDados === tipo.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400']"></i>
                <span class="text-xs font-semibold text-gray-700 dark:text-slate-200">{{ tipo.nome }}</span>
              </button>
            </div>
          </div>

          <BaseInput
            v-model="quantidade"
            label="Quantidade de linhas"
            type="number"
            :min="1"
            :max="1000"
            icon="fa-hashtag"
            hint="Máximo: 1.000 linhas"
            tooltip="Número de registros de dados a gerar (excluindo o cabeçalho)."
          />

          <div>
            <label class="input-aurora-label">
              <i class="fas fa-grip-lines-vertical mr-1.5 text-teal-500"></i>
              Delimitador
            </label>
            <select v-model="delimitador" class="input-aurora">
              <option value=",">, (vírgula)</option>
              <option value=";">; (ponto e vírgula)</option>
              <option value="\t">Tab</option>
              <option value="|">| (pipe)</option>
            </select>
          </div>

          <BaseButton variant="success" icon="fa-file-csv" @click="gerar" class="w-full">
            Gerar CSV
          </BaseButton>
        </div>

        <!-- Métricas (após geração) -->
        <Transition name="scale-in">
          <div v-if="csv" class="grid grid-cols-2 gap-3">
            <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
              <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ linhasGeradas }}</div>
              <div class="metric-glass-label">Linhas</div>
            </div>
            <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
              <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ colunasGeradas }}</div>
              <div class="metric-glass-label">Colunas</div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in">
          <div v-if="csv" class="space-y-4">
            <!-- Cabeçalho do resultado -->
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">CSV gerado</p>
              <p class="text-4xl font-black text-white mb-1">{{ linhasGeradas }}</p>
              <p class="text-emerald-300 text-sm font-semibold">registros · delimitador {{ getDelimitadorNome() }}</p>
            </div>

            <!-- Ações -->
            <div class="flex gap-2">
              <BaseButton variant="primary" icon="fa-download" @click="baixarCSV" class="flex-1">
                Baixar CSV
              </BaseButton>
              <BaseButton variant="outline" icon="fa-copy" @click="copiarCSV">
                Copiar
              </BaseButton>
            </div>

            <!-- Preview -->
            <div class="glass-panel p-4">
              <h4 class="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                Prévia (primeiras 20 linhas)
              </h4>
              <div class="bg-gray-900 rounded-lg p-3 overflow-x-auto max-h-72 overflow-y-auto">
                <pre class="text-green-400 text-xs font-mono whitespace-pre">{{ csvPreview }}</pre>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Arquivo com BOM UTF-8 — compatível com Excel, Google Sheets, Power BI.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!csv" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-file-csv text-3xl mb-3 opacity-30 block text-emerald-400"></i>
          <p class="text-sm">Configure e clique em <strong>Gerar CSV</strong></p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const tiposDados = [
  { id: 'pessoas',    nome: 'Pessoas',    icon: 'fas fa-users' },
  { id: 'vendas',     nome: 'Vendas',     icon: 'fas fa-chart-line' },
  { id: 'transacoes', nome: 'Transações', icon: 'fas fa-exchange-alt' },
  { id: 'estoque',    nome: 'Estoque',    icon: 'fas fa-boxes' },
]

const tipoDados    = ref('pessoas')
const quantidade   = ref(50)
const delimitador  = ref(',')
const csv          = ref('')
const linhasGeradas = ref(0)
const colunasGeradas = ref(0)

const csvPreview = computed(() => {
  const linhas = csv.value.split('\n')
  return linhas.slice(0, 20).join('\n') + (linhas.length > 20 ? '\n...' : '')
})

const getDelimitadorNome = () => ({ ',': 'vírgula', ';': 'ponto e vírgula', '\t': 'tab', '|': 'pipe' }[delimitador.value] || 'vírgula')

const nomes    = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza', 'Julia Lima', 'Rafael Alves', 'Beatriz Rocha']
const produtos = ['Notebook Dell', 'Mouse Logitech', 'Teclado Mecânico', 'Monitor LG', 'Webcam Full HD', 'Headset Gamer', 'Cadeira Gamer']
const categorias = ['Eletrônicos', 'Informática', 'Periféricos', 'Móveis', 'Acessórios']

const rnd    = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
const rndInt = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a

const gerarPessoas   = (qtd: number) => {
  const d = delimitador.value
  let r = `Nome${d}Email${d}Idade${d}Cidade${d}Telefone${d}CPF\n`
  for (let i = 0; i < qtd; i++) {
    const nome   = rnd(nomes)
    const email  = `${nome.split(' ')[0].toLowerCase()}${i}@example.com`
    const cidade = rnd(['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba'])
    const tel    = `(11) 9${rndInt(1000, 9999)}-${rndInt(1000, 9999)}`
    const cpf    = `${rndInt(100, 999)}.${rndInt(100, 999)}.${rndInt(100, 999)}-${rndInt(10, 99)}`
    r += `${nome}${d}${email}${d}${rndInt(18, 70)}${d}${cidade}${d}${tel}${d}${cpf}\n`
  }
  return r
}

const gerarVendas = (qtd: number) => {
  const d = delimitador.value
  let r = `Data${d}Produto${d}Quantidade${d}Valor Unitário${d}Total${d}Vendedor\n`
  for (let i = 0; i < qtd; i++) {
    const data = `2024-${String(rndInt(1, 12)).padStart(2, '0')}-${String(rndInt(1, 28)).padStart(2, '0')}`
    const prod = rnd(produtos); const qtdItem = rndInt(1, 10)
    const val  = (50 + Math.random() * 950).toFixed(2)
    r += `${data}${d}${prod}${d}${qtdItem}${d}${val}${d}${(qtdItem * parseFloat(val)).toFixed(2)}${d}${rnd(nomes)}\n`
  }
  return r
}

const gerarTransacoes = (qtd: number) => {
  const d = delimitador.value
  let r = `ID${d}Data${d}Tipo${d}Valor${d}Status${d}Método\n`
  for (let i = 0; i < qtd; i++) {
    const data = `2024-${String(rndInt(1, 12)).padStart(2, '0')}-${String(rndInt(1, 28)).padStart(2, '0')} ${String(rndInt(0, 23)).padStart(2, '0')}:${String(rndInt(0, 59)).padStart(2, '0')}`
    r += `${1000 + i}${d}${data}${d}${rnd(['Compra', 'Venda', 'Transferência'])}${d}${(10 + Math.random() * 990).toFixed(2)}${d}${rnd(['Aprovado', 'Pendente', 'Cancelado'])}${d}${rnd(['Crédito', 'Débito', 'PIX', 'Boleto'])}\n`
  }
  return r
}

const gerarEstoque = (qtd: number) => {
  const d = delimitador.value
  let r = `SKU${d}Produto${d}Categoria${d}Quantidade${d}Preço${d}Fornecedor\n`
  for (let i = 0; i < qtd; i++) {
    r += `SKU${String(1000 + i).padStart(6, '0')}${d}${rnd(produtos)}${d}${rnd(categorias)}${d}${rndInt(0, 200)}${d}${(30 + Math.random() * 970).toFixed(2)}${d}Fornecedor ${String.fromCharCode(65 + rndInt(0, 4))}\n`
  }
  return r
}

const gerar = () => {
  const qtd = Number(quantidade.value)
  const geradores = { pessoas: gerarPessoas, vendas: gerarVendas, transacoes: gerarTransacoes, estoque: gerarEstoque }
  csv.value = geradores[tipoDados.value as keyof typeof geradores](qtd)
  const linhas = csv.value.split('\n').filter(Boolean)
  linhasGeradas.value  = linhas.length - 1
  colunasGeradas.value = linhas[0]?.split(delimitador.value === '\t' ? '\t' : delimitador.value).length || 0
}

const copiarCSV = async () => {
  try {
    await navigator.clipboard.writeText(csv.value)
    Swal.fire({ title: 'CSV copiado!', icon: 'success', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const baixarCSV = () => {
  const blob = new Blob(['\uFEFF' + csv.value], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = `dados_${tipoDados.value}_${Date.now()}.csv`; a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
