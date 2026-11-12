<template>
  <ToolShell
    title="Gerador de JSON"
    description="Gere dados JSON fictícios com schema predefinido para testes de APIs, mockups e banco de dados de desenvolvimento."
    icon="fa-file-code"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['4 templates', 'Pretty print', 'Snippets de código']"
    :tips="[
      { title: 'Mock de API', text: 'Use os dados gerados para simular respostas de API durante o desenvolvimento sem depender do back-end.' },
      { title: 'Valores null', text: 'Ative a opção de incluir nulls para simular dados incompletos e testar a robustez do seu código.', type: 'info' },
      { title: 'Pretty Print', text: 'O JSON formatado é mais legível, mas ocupa mais espaço. Para produção, use JSON minificado (sem pretty print).', type: 'warning' },
    ]"
    :examples="[
      { title: 'Lista de usuários', desc: 'Template: Usuário, Quantidade: 10', result: 'Array JSON com 10 usuários fictícios com id, nome, email, etc.' },
      { title: 'Catálogo de produtos', desc: 'Template: Produto, Quantidade: 20', result: 'Array JSON com produtos, preços, categorias e estoque' },
      { title: 'Pedidos de e-commerce', desc: 'Template: Pedido, Quantidade: 5', result: 'Array JSON com pedidos, status, itens e datas' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Templates -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-layer-group mr-1.5 text-indigo-500"></i>
              Template
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="t in templates"
                :key="t.id"
                @click="templateSelecionado = t.id"
                :class="[
                  'p-3 rounded-xl border-2 transition-all text-center',
                  templateSelecionado === t.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-indigo-300'
                ]"
              >
                <i :class="[t.icon, 'text-xl mb-1 block', templateSelecionado === t.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400']"></i>
                <span class="text-xs font-semibold text-gray-700 dark:text-slate-200">{{ t.nome }}</span>
              </button>
            </div>
          </div>

          <BaseInput
            v-model="quantidade"
            label="Quantidade de registros"
            type="number"
            :min="1"
            :max="100"
            icon="fa-hashtag"
            hint="1 a 100 registros"
            tooltip="Número de objetos JSON a serem gerados dentro do array."
          />

          <!-- Opções -->
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer">
              <input v-model="prettyPrint" type="checkbox" class="checkbox-aurora" />
              <span class="text-sm text-gray-700 dark:text-slate-200">Pretty Print (JSON formatado)</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input v-model="incluirNulls" type="checkbox" class="checkbox-aurora" />
              <span class="text-sm text-gray-700 dark:text-slate-200">Incluir valores <code class="bg-gray-100 dark:bg-slate-700 px-1 rounded text-xs">null</code> aleatórios</span>
            </label>
          </div>

          <BaseButton variant="primary" icon="fa-magic" @click="gerar" class="w-full">
            Gerar JSON
          </BaseButton>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in">
          <div v-if="jsonGerado" class="space-y-4">
            <!-- Cabeçalho -->
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">JSON gerado</p>
              <p class="text-4xl font-black text-white mb-1">{{ quantidade }}</p>
              <p class="text-indigo-300 text-sm font-semibold">registro(s) · {{ jsonGerado.length.toLocaleString() }} chars</p>
            </div>

            <!-- Ações -->
            <div class="flex gap-2">
              <BaseButton variant="primary" icon="fa-download" @click="baixarJson" class="flex-1">Baixar JSON</BaseButton>
              <BaseButton variant="outline" icon="fa-copy" @click="copiar">Copiar</BaseButton>
            </div>

            <!-- Preview do JSON -->
            <div class="glass-panel p-4">
              <div class="bg-gray-900 rounded-xl p-4 overflow-auto max-h-72 overflow-y-auto">
                <pre class="text-green-400 text-xs font-mono">{{ jsonGerado }}</pre>
              </div>
            </div>

            <!-- Snippets de código -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-code text-indigo-500"></i>
                Snippets de código
              </h4>
              <div class="grid grid-cols-1 gap-2">
                <div class="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs font-semibold text-yellow-500"><i class="fab fa-js mr-1"></i>JavaScript</span>
                    <button @click="copiarSnippet('js')" class="text-xs text-indigo-500 hover:underline">Copiar</button>
                  </div>
                  <pre class="font-mono text-xs text-gray-700 dark:text-slate-300 overflow-x-auto">const data = JSON.parse(`{{ jsonGerado.substring(0, 60) }}...`);</pre>
                </div>
                <div class="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs font-semibold text-blue-500"><i class="fab fa-python mr-1"></i>Python</span>
                    <button @click="copiarSnippet('python')" class="text-xs text-indigo-500 hover:underline">Copiar</button>
                  </div>
                  <pre class="font-mono text-xs text-gray-700 dark:text-slate-300 overflow-x-auto">import json&#10;data = json.loads('''...''')</pre>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!jsonGerado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-file-code text-3xl mb-3 opacity-30 block text-indigo-400"></i>
          <p class="text-sm">Selecione um template e clique em <strong>Gerar JSON</strong></p>
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

const templates = [
  { id: 'usuario', nome: 'Usuário',  icon: 'fas fa-user' },
  { id: 'produto', nome: 'Produto',  icon: 'fas fa-shopping-cart' },
  { id: 'empresa', nome: 'Empresa',  icon: 'fas fa-building' },
  { id: 'pedido',  nome: 'Pedido',   icon: 'fas fa-receipt' },
]

const templateSelecionado = ref('usuario')
const quantidade           = ref(5)
const prettyPrint          = ref(true)
const incluirNulls         = ref(false)
const jsonGerado           = ref('')

const nomes    = ['Ana Silva', 'João Santos', 'Maria Oliveira', 'Pedro Costa', 'Julia Almeida', 'Carlos Ferreira']
const emails   = ['exemplo', 'teste', 'demo', 'user', 'contact']
const dominios = ['email.com', 'exemplo.com.br', 'teste.com', 'mail.com']
const cidades  = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Salvador', 'Curitiba']
const empresas = ['Tech Solutions', 'Inovação Brasil', 'Digital Corp', 'Future Systems']
const produtos = ['Notebook', 'Mouse', 'Teclado', 'Monitor', 'Webcam', 'Headset', 'SSD']
const categorias = ['Eletrônicos', 'Informática', 'Acessórios', 'Periféricos']
const statusList = ['pendente', 'processando', 'enviado', 'entregue', 'cancelado']

const rnd    = (arr) => arr[Math.floor(Math.random() * arr.length)]
const rndInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const talvezNull = (val) => incluirNulls.value && Math.random() < 0.2 ? null : val
const gerarId    = () => Math.random().toString(36).substring(2, 15)

const gerarUsuario = () => ({
  id: gerarId(), nome: talvezNull(rnd(nomes)),
  email: talvezNull(`${rnd(emails)}${rndInt(1, 999)}@${rnd(dominios)}`),
  idade: talvezNull(rndInt(18, 65)), cidade: talvezNull(rnd(cidades)),
  ativo: Math.random() > 0.3,
  criado_em: new Date(Date.now() - rndInt(1, 365) * 86400000).toISOString(),
})

const gerarProduto = () => ({
  id: gerarId(), nome: talvezNull(rnd(produtos)),
  descricao: talvezNull(`${rnd(produtos)} de alta qualidade`),
  preco: talvezNull(Number((Math.random() * 5000 + 100).toFixed(2))),
  categoria: talvezNull(rnd(categorias)), estoque: rndInt(0, 500),
  disponivel: Math.random() > 0.2,
  criado_em: new Date(Date.now() - rndInt(1, 180) * 86400000).toISOString(),
})

const gerarEmpresa = () => ({
  id: gerarId(), nome: talvezNull(rnd(empresas)),
  cnpj: talvezNull(`${rndInt(10, 99)}.${rndInt(100, 999)}.${rndInt(100, 999)}/0001-${rndInt(10, 99)}`),
  email: talvezNull(`contato@${rnd(empresas).toLowerCase().replace(/\s/g, '')}.com.br`),
  cidade: talvezNull(rnd(cidades)), funcionarios: rndInt(10, 1000), fundada_em: rndInt(1990, 2020),
})

const gerarPedido = () => ({
  id: gerarId(), numero: `PED-${rndInt(10000, 99999)}`,
  cliente: talvezNull(rnd(nomes)), itens: rndInt(1, 10),
  total: talvezNull(Number((Math.random() * 10000 + 50).toFixed(2))),
  status: rnd(statusList),
  data: new Date(Date.now() - rndInt(1, 30) * 86400000).toISOString(),
  entrega_prevista: new Date(Date.now() + rndInt(1, 15) * 86400000).toISOString(),
})

const gerar = () => {
  const qtd = Number(quantidade.value)
  if (qtd < 1 || qtd > 100) {
    Swal.fire({ icon: 'error', title: 'Quantidade inválida', text: 'Entre 1 e 100 registros', confirmButtonColor: '#2563eb' })
    return
  }
  const geradores = { usuario: gerarUsuario, produto: gerarProduto, empresa: gerarEmpresa, pedido: gerarPedido }
  const dados = Array.from({ length: qtd }, () => geradores[templateSelecionado.value]())
  jsonGerado.value = prettyPrint.value ? JSON.stringify(dados, null, 2) : JSON.stringify(dados)
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(jsonGerado.value)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const copiarSnippet = async (linguagem) => {
  const codigo = linguagem === 'js'
    ? `const data = JSON.parse(\`${jsonGerado.value}\`);`
    : `import json\n\ndata = json.loads('''${jsonGerado.value}''')`
  try {
    await navigator.clipboard.writeText(codigo)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const baixarJson = () => {
  const blob = new Blob([jsonGerado.value], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url; link.download = `${templateSelecionado.value}-${Date.now()}.json`; link.click()
  URL.revokeObjectURL(url)
  Swal.fire({ icon: 'success', title: 'Download iniciado!', timer: 1500, showConfirmButton: false })
}

gerar()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
