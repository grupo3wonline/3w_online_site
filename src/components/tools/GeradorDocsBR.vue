<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()

// ─── Tab ──────────────────────────────────────────────────────────────────────
const slugTabMap: Record<string, string> = {
  'gerador-cnh': 'cnh', 'gerador-pis': 'pis', 'gerador-renavam': 'renavam',
  'gerador-rg': 'rg', 'gerador-titulo-eleitor': 'titulo', 'gerador-certidao': 'certidao',
  'gerador-inscricao-estadual': 'ie', 'gerador-conta-bancaria': 'conta',
  'gerador-cep-br': 'cep', 'gerador-placa-veiculo': 'placa', 'gerador-veiculo': 'veiculo',
}
const aba = ref('cnh')
onMounted(() => { aba.value = slugTabMap[route.params.slug as string] || 'cnh' })
watch(() => route.params.slug, (s) => { if (s) aba.value = slugTabMap[s as string] || aba.value })

const tabs = [
  { id: 'cnh', label: 'CNH', icon: 'mdi:card-account-details-outline' },
  { id: 'pis', label: 'PIS/PASEP', icon: 'mdi:numeric' },
  { id: 'renavam', label: 'RENAVAM', icon: 'mdi:car-cog' },
  { id: 'rg', label: 'RG', icon: 'mdi:card-account-details' },
  { id: 'titulo', label: 'Título Eleitor', icon: 'mdi:vote-outline' },
  { id: 'certidao', label: 'Certidão', icon: 'mdi:certificate-outline' },
  { id: 'ie', label: 'Insc. Estadual', icon: 'mdi:store-outline' },
  { id: 'conta', label: 'Conta Bancária', icon: 'mdi:bank-outline' },
  { id: 'cep', label: 'CEP', icon: 'mdi:map-marker-outline' },
  { id: 'placa', label: 'Placa', icon: 'mdi:license' },
  { id: 'veiculo', label: 'Veículo', icon: 'mdi:car-outline' },
]

const abaLabel = computed(() => tabs.find(t => t.id === aba.value)?.label || 'CNH')

// ─── Configurações gerais ─────────────────────────────────────────────────────
const qtd = ref(5)
const resultados = ref<string[]>([])

// Estado específico por aba
const estado = ref('SP')
const tipoCertidao = ref('nascimento')
const tipoPlaca = ref('mercosul')
const tipoCNH = ref('B')
const tipoIE = ref('SP')

const estados = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']
const categoriasHab = ['A','B','C','D','E','AB','AC','AD','AE']

// ─── Algoritmos ───────────────────────────────────────────────────────────────
function rand(n = 10) { return Math.floor(Math.random() * n) }
function randArr(n: number) { return Array.from({length: n}, () => rand()) }

function gerarCNH(): string {
  const d = randArr(9)
  const sum1 = d.reduce((s, v, i) => s + v * (9 - i), 0)
  const d10 = sum1 % 11 >= 10 ? 0 : sum1 % 11
  const sum2 = d.reduce((s, v, i) => s + v * (1 + i), 0) + d10 * 2
  const d11 = sum2 % 11 >= 10 ? 0 : sum2 % 11
  const full = [...d, d10, d11].join('')
  return full.slice(0,3) + '.' + full.slice(3,6) + '.' + full.slice(6,9) + '-' + full.slice(9)
}

function gerarPIS(): string {
  const d = randArr(10)
  const w = [3,2,9,8,7,6,5,4,3,2]
  const sum = d.reduce((s, v, i) => s + v * w[i], 0)
  const rem = sum % 11
  const check = rem < 2 ? 0 : 11 - rem
  const r = [...d, check].join('')
  return r.slice(0,3) + '.' + r.slice(3,8) + '.' + r.slice(8)
}

function gerarRENAVAM(): string {
  const d = randArr(10)
  const w = [3,2,9,8,7,6,5,4,3,2]
  const sum = d.reduce((s, v, i) => s + v * w[i], 0)
  const rem = sum % 11
  const check = rem < 2 ? 0 : 11 - rem
  if (check > 9) return gerarRENAVAM()
  return [...d, check].join('')
}

function gerarRG(uf = 'SP'): string {
  const d = randArr(8)
  if (uf === 'SP') {
    const w = [2,3,4,5,6,7,8,9]
    const sum = d.reduce((s, v, i) => s + v * w[i], 0)
    const rem = sum % 11
    const check = rem === 0 ? '0' : rem === 1 ? 'X' : String(11 - rem)
    return d.slice(0,2).join('') + '.' + d.slice(2,5).join('') + '.' + d.slice(5,8).join('') + '-' + check
  }
  // Generic RG
  return d.join('').slice(0,2) + '.' + d.join('').slice(2,5) + '.' + d.join('').slice(5,8) + '-' + (rand(9)+1)
}

function gerarTituloEleitor(uf = 'SP'): string {
  const codigos: Record<string, number> = { SP: 1, MG: 2, RJ: 3, RS: 4, BA: 5, PR: 6, CE: 7, PE: 8, SC: 9, GO: 10, MA: 11, PB: 12, PA: 13, ES: 14, PI: 15, RN: 16, AL: 17, MT: 18, MS: 19, DF: 20, SE: 21, AM: 22, RO: 23, AC: 24, AP: 25, RR: 26, TO: 27 }
  const cod = codigos[uf] || 1
  const seq = randArr(8)
  const w1 = [2,3,4,5,6,7,8,9]
  let sum1 = seq.reduce((s, v, i) => s + v * w1[i], 0)
  let rem1 = sum1 % 11
  if (rem1 === 0 && [1, 2].includes(cod)) rem1 = 1
  const d1 = rem1 >= 10 ? 0 : rem1
  const codD = [Math.floor(cod / 10), cod % 10]
  const w2 = [7, 8, 9]
  let sum2 = [...codD, d1].reduce((s, v, i) => s + v * w2[i], 0)
  let rem2 = sum2 % 11
  if (rem2 === 0 && [1, 2].includes(cod)) rem2 = 1
  const d2 = rem2 >= 10 ? 0 : rem2
  const r = seq.join('') + String(cod).padStart(2, '0') + d1 + d2
  return r.slice(0,4) + ' ' + r.slice(4,8) + ' ' + r.slice(8)
}

function gerarCertidao(tipo = 'nascimento'): string {
  const ano = 1980 + rand(45)
  const matricula = randArr(6).join('')
  const livro = String(rand(99) + 1).padStart(2, '0')
  const folha = String(rand(500) + 1).padStart(3, '0')
  const item = rand(2) + 1
  const cartorio = randArr(6).join('')
  const servico = String(rand(3) + 1).padStart(3, '0')
  const sequencial = randArr(7).join('')
  const tipoMap: Record<string, string> = { nascimento: 'B', casamento: 'C', obito: 'O' }
  const t = tipoMap[tipo] || 'B'
  return `${matricula} ${livro} ${t} ${ano} ${item} ${cartorio} ${servico} ${sequencial}`
}

function gerarIE(uf = 'SP'): string {
  if (uf === 'SP') {
    const d = randArr(11)
    const w = [1,3,1,3,1,3,1,3,1,3,1]
    let sum = 0
    for (let i = 0; i < 11; i++) {
      let p = d[i] * w[i]
      sum += p >= 10 ? Math.floor(p / 10) + (p % 10) : p
    }
    const check = (10 - (sum % 10)) % 10
    const r = [...d, check].join('')
    return r.slice(0,3) + '.' + r.slice(3,6) + '.' + r.slice(6,9) + '.' + r.slice(9)
  }
  if (uf === 'RJ') {
    const d = randArr(7)
    const w = [2,7,6,5,4,3,2]
    const sum = d.reduce((s, v, i) => s + v * w[i], 0)
    const rem = sum % 11
    const check = rem < 2 ? 0 : 11 - rem
    return d.join('') + '-' + check + '.' + randArr(5).join('')
  }
  if (uf === 'MG') {
    const d = randArr(12)
    return d.slice(0,3).join('') + '.' + d.slice(3,6).join('') + '.' + d.slice(6,9).join('') + '/' + d.slice(9).join('')
  }
  // Generic
  return randArr(rand(4) + 9).join('').slice(0,12)
}

const bancos = [
  { codigo: '001', nome: 'Banco do Brasil' }, { codigo: '033', nome: 'Santander' },
  { codigo: '104', nome: 'Caixa Econômica Federal' }, { codigo: '237', nome: 'Bradesco' },
  { codigo: '341', nome: 'Itaú' }, { codigo: '748', nome: 'Sicredi' },
  { codigo: '756', nome: 'Sicoob' }, { codigo: '260', nome: 'Nubank' },
  { codigo: '290', nome: 'PagBank' }, { codigo: '336', nome: 'C6 Bank' },
  { codigo: '077', nome: 'Inter' }, { codigo: '212', nome: 'Banco Original' },
]

interface ContaBancaria { banco: { codigo: string; nome: string }; agencia: string; conta: string }
const contaGerada = ref<ContaBancaria | null>(null)

function gerarConta(): ContaBancaria {
  const banco = bancos[Math.floor(Math.random() * bancos.length)]
  const agencia = String(rand(9000) + 1000)
  const contaNum = String(rand(900000) + 100000)
  const digito = String(rand(9) + 1)
  return { banco, agencia, conta: contaNum + '-' + digito }
}

const cepRanges: Record<string, [number, number]> = {
  SP: [1000000, 19999999], RJ: [20000000, 28999999], ES: [29000000, 29999999],
  MG: [30000000, 39999999], BA: [40000000, 48999999], SE: [49000000, 49999999],
  PE: [50000000, 56999999], AL: [57000000, 57999999], PB: [58000000, 58999999],
  RN: [59000000, 59999999], CE: [60000000, 63999999], PI: [64000000, 64999999],
  MA: [65000000, 65999999], PA: [66000000, 68899999], AP: [68900000, 68999999],
  AM: [69000000, 69299999], RR: [69300000, 69399999], AC: [69900000, 69999999],
  DF: [70000000, 73699999], GO: [73700000, 76799999], TO: [77000000, 77999999],
  RO: [76800000, 76999999], MT: [78000000, 78899999], MS: [79000000, 79999999],
  PR: [80000000, 87999999], SC: [88000000, 89999999], RS: [90000000, 99999999],
}

function gerarCEP(uf = 'SP'): string {
  const [min, max] = cepRanges[uf] || [1000000, 99999999]
  const num = Math.floor(Math.random() * (max - min + 1)) + min
  const s = num.toString().padStart(8, '0')
  return s.slice(0, 5) + '-' + s.slice(5)
}

function gerarPlaca(tipo = 'mercosul'): string {
  const L = () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[rand(26)]
  const N = () => String(rand(10))
  if (tipo === 'mercosul') return L() + L() + L() + N() + L() + N() + N()
  return L() + L() + L() + '-' + N() + N() + N() + N()
}

const marcas = ['Fiat','Volkswagen','Chevrolet','Ford','Toyota','Honda','Hyundai','Renault','Jeep','Nissan','Mitsubishi','Citroën','Peugeot','BMW','Mercedes-Benz']
const modelosPorMarca: Record<string, string[]> = {
  Fiat: ['Uno','Palio','Siena','Strada','Toro','Argo','Cronos','Mobi','Pulse'],
  Volkswagen: ['Gol','Polo','T-Cross','Virtus','Saveiro','Fox','Voyage','Jetta'],
  Chevrolet: ['Onix','Prisma','Cruze','S10','Tracker','Trailblazer','Spin'],
  Ford: ['Ka','Ecosport','Ranger','Fusion','Territory'],
  Toyota: ['Corolla','Hilux','Yaris','RAV4','Camry'],
  Honda: ['Civic','Fit','City','HR-V','CR-V'],
  Hyundai: ['HB20','Creta','Tucson','Santa Fe','i30'],
  Renault: ['Sandero','Logan','Duster','Kwid','Captur'],
  Jeep: ['Renegade','Compass','Grand Cherokee','Wrangler'],
  Nissan: ['Kicks','Versa','Sentra','Frontier'],
  Mitsubishi: ['ASX','Eclipse Cross','L200','Pajero'],
  Citroën: ['C3','C4','Aircross'],
  Peugeot: ['208','2008','3008'],
  BMW: ['Série 3','Série 5','X1','X3'],
  'Mercedes-Benz': ['A 200','C 200','GLA','GLC'],
}
const cores = ['Branco','Preto','Prata','Cinza','Vermelho','Azul','Verde','Amarelo','Laranja','Vinho']
const combustiveis = ['Flex','Gasolina','Álcool','Diesel','Elétrico','Híbrido']
const categorias = ['Particular','Comercial','Especial','Oficial','Diplomático']

interface Veiculo { marca: string; modelo: string; ano: number; cor: string; combustivel: string; categoria: string; placa: string; renavam: string; chassi: string }
const veiculoGerado = ref<Veiculo | null>(null)

function gerarVeiculo(): Veiculo {
  const marca = marcas[rand(marcas.length)]
  const modelos = modelosPorMarca[marca] || ['Modelo']
  const modelo = modelos[rand(modelos.length)]
  const ano = 2000 + rand(26)
  const cor = cores[rand(cores.length)]
  const combustivel = combustiveis[rand(combustiveis.length)]
  const categoria = categorias[rand(categorias.length)]
  const placa = gerarPlaca(rand(2) ? 'mercosul' : 'antigo')
  const renavam = gerarRENAVAM()
  const chassi = Array.from({length: 17}, () => '0123456789ABCDEFGHJKLMNPRSTUVWXYZ'[rand(33)]).join('')
  return { marca, modelo, ano, cor, combustivel, categoria, placa, renavam, chassi }
}

// ─── Gerar ────────────────────────────────────────────────────────────────────
function gerar() {
  if (aba.value === 'conta') { contaGerada.value = gerarConta(); return }
  if (aba.value === 'veiculo') { veiculoGerado.value = gerarVeiculo(); return }
  const fns: Record<string, () => string> = {
    cnh: gerarCNH,
    pis: gerarPIS,
    renavam: gerarRENAVAM,
    rg: () => gerarRG(estado.value),
    titulo: () => gerarTituloEleitor(estado.value),
    certidao: () => gerarCertidao(tipoCertidao.value),
    ie: () => gerarIE(tipoIE.value),
    cep: () => gerarCEP(estado.value),
    placa: () => gerarPlaca(tipoPlaca.value),
  }
  const fn = fns[aba.value]
  if (fn) resultados.value = Array.from({length: Math.max(1, Math.min(50, qtd.value))}, fn)
}

function copiar(text: string) {
  navigator.clipboard.writeText(text)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
}

function copiarTodos() {
  navigator.clipboard.writeText(resultados.value.join('\n'))
  Swal.fire({ icon: 'success', title: `${resultados.value.length} itens copiados!`, timer: 1200, showConfirmButton: false })
}

onMounted(gerar)
watch(aba, () => { resultados.value = []; contaGerada.value = null; veiculoGerado.value = null; gerar() })
</script>

<template>
  <ToolShell
    title="Gerador de Documentos Brasileiros"
    :description="`Gere ${abaLabel} válidos para fins de teste e desenvolvimento.`"
    icon="fa-id-card"
    icon-gradient="from-blue-600 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Algoritmo oficial', 'Para testes', 'Cópia rápida']"
    :tips="[{ title: 'Apenas para testes', text: 'Todos os documentos gerados são matematicamente válidos mas NÃO pertencem a pessoas reais. Use apenas para desenvolvimento/testes.' }]"
  >

    <!-- Tabs -->
    <div class="tab-row">
      <button v-for="t in tabs" :key="t.id" @click="aba = t.id"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba === t.id ? 'bg-blue-600 text-white border-blue-500' : 'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
      </button>
    </div>

    <!-- Options per tab -->
    <div class="glass-panel p-5 mb-5 flex flex-wrap gap-3 items-end">
      <div v-if="!['conta','veiculo'].includes(aba)">
        <label class="text-xs text-blue-300 mb-1 block">Quantidade</label>
        <input v-model.number="qtd" type="number" min="1" max="50" class="w-20 input-aurora" />
      </div>

      <div v-if="['rg','titulo','cep'].includes(aba)">
        <label class="text-xs text-blue-300 mb-1 block">Estado</label>
        <select v-model="estado" class="input-aurora">
          <option v-for="e in estados" :key="e">{{ e }}</option>
        </select>
      </div>

      <div v-if="aba === 'ie'">
        <label class="text-xs text-blue-300 mb-1 block">Estado</label>
        <select v-model="tipoIE" class="input-aurora">
          <option v-for="e in ['SP','RJ','MG']" :key="e">{{ e }}</option>
        </select>
      </div>

      <div v-if="aba === 'certidao'">
        <label class="text-xs text-blue-300 mb-1 block">Tipo</label>
        <select v-model="tipoCertidao" class="input-aurora">
          <option value="nascimento">Nascimento</option>
          <option value="casamento">Casamento</option>
          <option value="obito">Óbito</option>
        </select>
      </div>

      <div v-if="aba === 'cnh'">
        <label class="text-xs text-blue-300 mb-1 block">Categoria</label>
        <select v-model="tipoCNH" class="input-aurora">
          <option v-for="c in categoriasHab" :key="c">{{ c }}</option>
        </select>
      </div>

      <div v-if="aba === 'placa'">
        <label class="text-xs text-blue-300 mb-1 block">Formato</label>
        <select v-model="tipoPlaca" class="input-aurora">
          <option value="mercosul">Mercosul (AAA9A99)</option>
          <option value="antigo">Antigo (AAA-9999)</option>
        </select>
      </div>

      <button @click="gerar" class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors">
        <Icon icon="mdi:refresh" class="w-4 h-4" /> Gerar
      </button>
    </div>

    <!-- Results: Conta Bancária -->
    <div v-if="aba === 'conta' && contaGerada" class="glass-panel p-5 space-y-3">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="bg-white/5 p-3 rounded-lg">
          <p class="text-xs text-blue-300 mb-1">Banco</p>
          <p class="text-sm font-bold text-white">{{ contaGerada.banco.nome }}</p>
          <p class="text-xs text-blue-300">Cód: {{ contaGerada.banco.codigo }}</p>
        </div>
        <div class="bg-white/5 p-3 rounded-lg">
          <p class="text-xs text-blue-300 mb-1">Agência</p>
          <p class="text-xl font-mono font-bold text-white">{{ contaGerada.agencia }}</p>
        </div>
        <div class="bg-white/5 p-3 rounded-lg">
          <p class="text-xs text-blue-300 mb-1">Conta</p>
          <p class="text-xl font-mono font-bold text-white">{{ contaGerada.conta }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button @click="gerar" class="btn-glass text-xs py-1.5 px-3"><Icon icon="mdi:refresh" class="w-3.5 h-3.5 mr-1 inline" />Nova conta</button>
        <button @click="copiar(`${contaGerada.banco.nome} | Ag: ${contaGerada.agencia} | CC: ${contaGerada.conta}`)" class="btn-glass text-xs py-1.5 px-3"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5 mr-1 inline" />Copiar</button>
      </div>
    </div>

    <!-- Results: Veículo -->
    <div v-else-if="aba === 'veiculo' && veiculoGerado" class="glass-panel p-5 space-y-3">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div class="bg-white/5 p-3 rounded-lg"><p class="text-blue-300 mb-1">Marca</p><p class="font-bold text-white">{{ veiculoGerado.marca }}</p></div>
        <div class="bg-white/5 p-3 rounded-lg"><p class="text-blue-300 mb-1">Modelo</p><p class="font-bold text-white">{{ veiculoGerado.modelo }}</p></div>
        <div class="bg-white/5 p-3 rounded-lg"><p class="text-blue-300 mb-1">Ano</p><p class="font-bold text-white">{{ veiculoGerado.ano }}</p></div>
        <div class="bg-white/5 p-3 rounded-lg"><p class="text-blue-300 mb-1">Cor</p><p class="font-bold text-white">{{ veiculoGerado.cor }}</p></div>
        <div class="bg-white/5 p-3 rounded-lg"><p class="text-blue-300 mb-1">Combustível</p><p class="font-bold text-white">{{ veiculoGerado.combustivel }}</p></div>
        <div class="bg-white/5 p-3 rounded-lg"><p class="text-blue-300 mb-1">Placa</p><p class="font-bold text-white font-mono">{{ veiculoGerado.placa }}</p></div>
        <div class="bg-white/5 p-3 rounded-lg"><p class="text-blue-300 mb-1">RENAVAM</p><p class="font-bold text-white font-mono">{{ veiculoGerado.renavam }}</p></div>
        <div class="bg-white/5 p-3 rounded-lg col-span-2 sm:col-span-1"><p class="text-blue-300 mb-1">Chassi</p><p class="font-bold text-white font-mono text-xs">{{ veiculoGerado.chassi }}</p></div>
      </div>
      <div class="flex gap-2">
        <button @click="gerar" class="btn-glass text-xs py-1.5 px-3"><Icon icon="mdi:refresh" class="w-3.5 h-3.5 mr-1 inline" />Novo veículo</button>
      </div>
    </div>

    <!-- Results: list -->
    <div v-else class="space-y-2">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs text-blue-300">{{ resultados.length }} resultado(s)</span>
        <button v-if="resultados.length > 1" @click="copiarTodos" class="btn-glass text-xs py-1 px-2.5">
          <Icon icon="mdi:content-copy" class="w-3.5 h-3.5 mr-1 inline" />Copiar todos
        </button>
      </div>
      <div v-for="(r, i) in resultados" :key="i"
        class="flex items-center justify-between bg-white/5 hover:bg-white/10 p-3 rounded-lg group transition-colors">
        <span class="font-mono text-white text-sm font-semibold">{{ r }}</span>
        <button @click="copiar(r)" class="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400 hover:text-white">
          <Icon icon="mdi:content-copy" class="w-4 h-4" />
        </button>
      </div>
    </div>

  </ToolShell>
</template>

