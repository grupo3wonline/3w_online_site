<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

type ToolId = 'cpf' | 'cnpj' | 'rg' | 'cep' | 'nome' | 'email' | 'telefone' | 'uuid' | 'cnh' | 'senha'

const activeTab = ref<ToolId>('cpf')
const quantidade = ref(5)
const resultados = ref<string[]>([])
const copiado = ref(false)
const notification = ref('')

function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min }

function gerarDigitosCPF(nums: number[]): number {
  let soma = 0
  for (let i = 0; i < nums.length; i++) soma += nums[i] * (nums.length + 1 - i)
  const r = soma % 11
  return r < 2 ? 0 : 11 - r
}

function gerarCPF(formatado = true): string {
  const n = Array.from({ length: 9 }, () => rand(0, 9))
  n.push(gerarDigitosCPF(n))
  n.push(gerarDigitosCPF(n))
  if (!formatado) return n.join('')
  return `${n.slice(0, 3).join('')}.${n.slice(3, 6).join('')}.${n.slice(6, 9).join('')}-${n.slice(9).join('')}`
}

function gerarDigitosCNPJ(nums: number[], pesos: number[]): number {
  let soma = 0
  for (let i = 0; i < pesos.length; i++) soma += nums[i] * pesos[i]
  const r = soma % 11
  return r < 2 ? 0 : 11 - r
}

function gerarCNPJ(formatado = true): string {
  const n = Array.from({ length: 8 }, () => rand(0, 9))
  n.push(0, 0, 0, 1)
  n.push(gerarDigitosCNPJ(n, [5,4,3,2,9,8,7,6,5,4,3,2]))
  n.push(gerarDigitosCNPJ(n, [6,5,4,3,2,9,8,7,6,5,4,3,2]))
  if (!formatado) return n.join('')
  return `${n.slice(0,2).join('')}.${n.slice(2,5).join('')}.${n.slice(5,8).join('')}/${n.slice(8,12).join('')}-${n.slice(12).join('')}`
}

function gerarRG(): string {
  const n = Array.from({ length: 8 }, () => rand(0, 9))
  let soma = 0
  const pesos = [2,3,4,5,6,7,8,9]
  for (let i = 0; i < 8; i++) soma += n[i] * pesos[i]
  const d = soma % 11
  const dig = d === 0 ? '0' : d === 1 ? 'X' : String(11 - d)
  return `${n.slice(0,2).join('')}.${n.slice(2,5).join('')}.${n.slice(5,8).join('')}-${dig}`
}

function gerarCEP(): string {
  const p1 = String(rand(10000, 99999))
  const p2 = String(rand(0, 999)).padStart(3, '0')
  return `${p1}-${p2}`
}

const nomes = ['Ana','Bruno','Carlos','Daniela','Eduardo','Fernanda','Gabriel','Helena','Igor','Juliana','Lucas','Mariana','Nicolas','Olivia','Pedro','Rafaela','Samuel','Thais','Vinicius','Yasmin']
const sobrenomes = ['Silva','Santos','Oliveira','Pereira','Costa','Souza','Lima','Fernandes','Carvalho','Almeida','Rodrigues','Nascimento','Martins','Araújo','Barbosa']

function gerarNome(): string {
  return `${nomes[rand(0, nomes.length - 1)]} ${sobrenomes[rand(0, sobrenomes.length - 1)]}`
}

function gerarEmail(): string {
  const nome = nomes[rand(0, nomes.length-1)].toLowerCase()
  const sobr = sobrenomes[rand(0, sobrenomes.length-1)].toLowerCase()
  const dominios = ['gmail.com','hotmail.com','yahoo.com.br','outlook.com']
  return `${nome}.${sobr}${rand(1,99)}@${dominios[rand(0,dominios.length-1)]}`
}

function gerarTelefone(): string {
  const ddd = rand(11, 99)
  const p1 = rand(90000, 99999)
  const p2 = rand(1000, 9999)
  return `(${ddd}) ${p1}-${p2}`
}

function gerarUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

function gerarCNH(): string {
  const nums = Array.from({ length: 9 }, () => rand(0, 9)).join('')
  const d1 = nums.split('').reduce((a, v, i) => a + parseInt(v) * (9 - i), 0) % 11
  const d2 = nums.split('').reduce((a, v, i) => a + parseInt(v) * (1 + i), 0) % 11
  return `${nums}${d1 >= 10 ? 0 : d1}${d2 >= 10 ? 0 : d2}`
}

const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&'
function gerarSenha(): string {
  return Array.from({ length: 16 }, () => chars[rand(0, chars.length - 1)]).join('')
}

function gerar() {
  const fns: Record<ToolId, () => string> = {
    cpf: gerarCPF, cnpj: gerarCNPJ, rg: gerarRG, cep: gerarCEP,
    nome: gerarNome, email: gerarEmail, telefone: gerarTelefone,
    uuid: gerarUUID, cnh: gerarCNH, senha: gerarSenha,
  }
  resultados.value = Array.from({ length: quantidade.value }, () => fns[activeTab.value]())
}

async function copiarTodos() {
  await navigator.clipboard.writeText(resultados.value.join('\n'))
  copiado.value = true
  notification.value = 'Copiado!'
  setTimeout(() => { copiado.value = false; notification.value = '' }, 2000)
}

async function copiarItem(val: string) {
  await navigator.clipboard.writeText(val)
  notification.value = 'Copiado!'
  setTimeout(() => { notification.value = '' }, 1500)
}

const tools: { id: ToolId; label: string; icon: string; desc: string }[] = [
  { id: 'cpf', label: 'CPF', icon: 'mdi:card-account-details', desc: 'CPF válido formatado' },
  { id: 'cnpj', label: 'CNPJ', icon: 'mdi:office-building', desc: 'CNPJ válido formatado' },
  { id: 'rg', label: 'RG', icon: 'mdi:card-account-details-outline', desc: 'RG com dígito verificador' },
  { id: 'cep', label: 'CEP', icon: 'mdi:map-marker', desc: 'CEP fictício' },
  { id: 'nome', label: 'Nome', icon: 'mdi:account', desc: 'Nome completo brasileiro' },
  { id: 'email', label: 'E-mail', icon: 'mdi:email', desc: 'E-mail fictício' },
  { id: 'telefone', label: 'Telefone', icon: 'mdi:phone', desc: 'Celular com DDD' },
  { id: 'uuid', label: 'UUID', icon: 'mdi:identifier', desc: 'UUID v4' },
  { id: 'cnh', label: 'CNH', icon: 'mdi:car', desc: 'Número de CNH' },
  { id: 'senha', label: 'Senha', icon: 'mdi:lock', desc: 'Senha forte 16 chars' },
]

const currentTool = computed(() => tools.find(t => t.id === activeTab.value))
</script>

<template>
  <ToolShell

    title="Dados Brasil Generator"

    description="Gere dados fictícios brasileiros realistas para testes e desenvolvimento."

    icon="fa-database"

    icon-gradient="from-green-500 to-teal-700"

    orb-color="emerald"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:database" class="text-blue-400 w-7 h-7" />
        Gerador Brasil Pro
      </h1>
      <p class="text-blue-200 text-sm">Gere dados brasileiros fictícios para testes — 100% local, sem cadastro</p>
    </div>

    <!-- Tool tabs -->
    <div class="flex flex-wrap gap-2">
      <button v-for="t in tools" :key="t.id" @click="activeTab = t.id; resultados = []"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
          activeTab === t.id ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#0f1e3c] border-white/10 text-blue-200 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
      </button>
    </div>

    <!-- Generator -->
    <div class="glass-panel p-5 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon :icon="currentTool?.icon || 'mdi:star'" class="text-blue-400 w-5 h-5" />
          {{ currentTool?.label }} — {{ currentTool?.desc }}
        </h2>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <label class="text-blue-200 text-sm">Quantidade:</label>
          <input v-model.number="quantidade" type="number" min="1" max="50" autocomplete="off"
            class="w-20 bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
        <button @click="gerar"
          class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
          <Icon icon="mdi:cog" class="w-4 h-4" /> Gerar
        </button>
        <button v-if="resultados.length" @click="copiarTodos"
          :class="['px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2', copiado ? 'bg-green-600 text-white' : 'bg-white/10 text-white hover:bg-white/20']">
          <Icon :icon="copiado ? 'mdi:check' : 'mdi:content-copy'" class="w-4 h-4" />
          {{ copiado ? 'Copiado!' : 'Copiar tudo' }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <div v-if="resultados.length" class="glass-panel p-4">
      <h3 class="text-white text-sm font-semibold mb-3 flex items-center gap-2">
        <Icon icon="mdi:format-list-bulleted" class="text-blue-400 w-4 h-4" /> Resultados
      </h3>
      <div class="space-y-2">
        <div v-for="(r, i) in resultados" :key="i" class="flex items-center justify-between bg-[#0a1628] rounded-lg px-3 py-2">
          <span class="text-white font-mono text-sm">{{ r }}</span>
          <button @click="copiarItem(r)" class="text-blue-300 hover:text-white transition-colors ml-3">
            <Icon icon="mdi:content-copy" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <div v-else class="glass-panel flex items-center justify-center p-10">
      <div class="text-center">
        <Icon icon="mdi:database-search" class="w-12 h-12 text-blue-400/20 mx-auto mb-2" />
        <p class="text-blue-200 text-sm">Selecione um tipo e clique em "Gerar"</p>
        <p class="text-blue-300/50 text-xs mt-1">Dados fictícios, apenas para testes de software</p>
      </div>
    </div>

    <!-- Toast -->
    <Transition name="fade">
      <div v-if="notification" class="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
        {{ notification }}
      </div>
    </Transition>
  


  </ToolShell></template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>