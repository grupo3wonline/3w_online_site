<template>
  <ToolShell
    title="Gerador de Jogos de Loteria"
    description="Gere números aleatórios para todas as loterias da Caixa Econômica Federal."
    icon="fa-ticket"
    icon-gradient="from-yellow-500 to-orange-600"
    orb-color="orange"
    :quick-tips="['11 loterias da CEF', 'Múltiplos jogos', 'Impressão formatada']"
    :tips="loteriaTips"
  >

    <!-- AVISO LEGAL fixo no topo -->
    <div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2 mb-5">
      <Icon icon="mdi:alert-outline" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
      <span>⚠️ <strong>Aviso de Responsabilidade:</strong> Este gerador cria números aleatórios para fins de entretenimento. Não garante ganhos ou influencia probabilidades. Jogue com responsabilidade. Se o jogo estiver afetando sua vida, ligue <strong>0800 722 1500</strong> (CVV).</span>
    </div>

    <!-- Seletor de Jogo -->
    <div class="mb-5">
      <h3 class="text-xs font-semibold text-blue-300 mb-3 uppercase tracking-wider">Selecione o Jogo</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <button v-for="jogo in jogos" :key="jogo.id" @click="jogoAtual = jogo.id"
          :class="['flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left',
            jogoAtual === jogo.id
              ? 'border-opacity-100 shadow-lg scale-[1.02]'
              : 'border-white/10 bg-white/5 hover:bg-white/10']"
          :style="jogoAtual === jogo.id ? `border-color: ${jogo.cor}; background: ${jogo.cor}22` : ''">
          <span class="text-xl">{{ jogo.emoji }}</span>
          <div class="min-w-0">
            <p class="text-xs font-bold text-white leading-tight">{{ jogo.nome }}</p>
            <p class="text-[10px] text-blue-300 leading-tight truncate">{{ jogo.descricao }}</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Configuração do jogo selecionado -->
    <div v-if="jogoInfo" class="glass-panel p-4 mb-4 space-y-3">
      <div class="flex flex-wrap items-center gap-4">
        <div class="text-sm">
          <p class="text-blue-300 text-xs mb-0.5">Jogo selecionado</p>
          <p class="font-bold text-white flex items-center gap-2">{{ jogoInfo.emoji }} {{ jogoInfo.nome }}</p>
        </div>
        <div class="text-xs text-blue-300 space-y-0.5 ml-auto">
          <p>{{ jogoInfo.regras }}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 items-end">
        <!-- Quantidade de dezenas (jogos com seleção variável) -->
        <div v-if="jogoInfo.minDez && jogoInfo.minDez !== jogoInfo.maxDez">
          <label class="text-xs text-blue-300 mb-1 block">Dezenas por jogo</label>
          <select v-model.number="qtdDezenas" class="input-aurora">
            <option v-for="n in range(jogoInfo.minDez, jogoInfo.maxDez)" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <!-- Quantidade de jogos -->
        <div>
          <label class="text-xs text-blue-300 mb-1 block">Quantidade de jogos</label>
          <input v-model.number="qtdJogos" type="number" min="1" max="20" class="input-aurora w-24" />
        </div>

        <!-- Tipo de geração -->
        <div v-if="jogoInfo.id !== 'loteca' && jogoInfo.id !== 'federal' && jogoInfo.id !== 'supersete'">
          <label class="text-xs text-blue-300 mb-1 block">Tipo de geração</label>
          <select v-model="tipoGeracao" class="input-aurora">
            <option value="aleatorio">🎲 Aleatório puro</option>
            <option value="sequencia">📈 Com sequência</option>
            <option value="pares">↕ Pares e Ímpares balanceados</option>
            <option value="dezenaAlta">🔢 Dezenas altas (>50%)</option>
            <option value="dezenasBaixa">🔡 Dezenas baixas (≤50%)</option>
          </select>
        </div>

        <button @click="gerarJogos()"
          :style="`background-color: ${jogoInfo.cor}; border-color: ${jogoInfo.cor}`"
          class="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-bold text-sm transition-all hover:opacity-90 shadow-lg">
          <Icon icon="mdi:dice-multiple-outline" class="w-5 h-5" /> Gerar {{ qtdJogos }} Jogo{{ qtdJogos > 1 ? 's' : '' }}
        </button>
      </div>
    </div>

    <!-- Jogos gerados -->
    <div v-if="jogosGerados.length" class="space-y-3">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-semibold text-white">{{ jogosGerados.length }} jogo(s) gerado(s) — {{ jogoInfo?.nome }}</h3>
        <div class="flex gap-2">
          <button @click="copiarJogos()" class="flex items-center gap-1.5 text-xs text-blue-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors">
            <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar
          </button>
          <button @click="imprimirJogos()" class="flex items-center gap-1.5 text-xs text-blue-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors">
            <Icon icon="mdi:printer-outline" class="w-3.5 h-3.5" /> Imprimir
          </button>
        </div>
      </div>

      <div id="loteria-print-area" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="(jogo, idx) in jogosGerados" :key="idx"
          class="rounded-xl p-4 border-2 border-white/10"
          :style="`border-color: ${jogoInfo?.cor}33; background: ${jogoInfo?.cor}11`">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold" :style="`color: ${jogoInfo?.cor}`">{{ jogoInfo?.emoji }} Jogo {{ idx + 1 }}</span>
            <button @click="jogosGerados.splice(idx, 1)" class="text-blue-400/50 hover:text-red-400 text-[10px]">✕</button>
          </div>

          <!-- Números normais (a maioria dos jogos) -->
          <div v-if="jogo.type === 'numeros'" class="flex flex-wrap gap-1.5">
            <span v-for="n in jogo.numeros" :key="n"
              class="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold text-white shadow-sm"
              :style="`background-color: ${jogoInfo?.cor}`">
              {{ String(n).padStart(2,'0') }}
            </span>
          </div>

          <!-- +Milionária (números + trevos) -->
          <div v-else-if="jogo.type === 'milionaria'">
            <div class="flex flex-wrap gap-1.5 mb-2">
              <span v-for="n in jogo.numeros" :key="n"
                class="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold text-white"
                :style="`background-color: ${jogoInfo?.cor}`">
                {{ String(n).padStart(2,'0') }}
              </span>
            </div>
            <p class="text-[10px] text-blue-300 mb-1">🍀 Trevos</p>
            <div class="flex gap-1.5">
              <span v-for="t in jogo.trevos" :key="t"
                class="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white bg-green-600">
                {{ String(t).padStart(2,'0') }}
              </span>
            </div>
          </div>

          <!-- Timemania (números + time do coração) -->
          <div v-else-if="jogo.type === 'timemania'">
            <div class="flex flex-wrap gap-1.5 mb-2">
              <span v-for="n in jogo.numeros" :key="n"
                class="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold text-white"
                :style="`background-color: ${jogoInfo?.cor}`">
                {{ String(n).padStart(2,'0') }}
              </span>
            </div>
            <p class="text-[10px] text-orange-300">⚽ Time: {{ jogo.time }}</p>
          </div>

          <!-- Dupla Sena (2 colunas) -->
          <div v-else-if="jogo.type === 'duplasena'">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <p class="text-[10px] text-blue-300 mb-1">1ª Coluna</p>
                <div class="flex flex-wrap gap-1">
                  <span v-for="n in jogo.coluna1" :key="n" class="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white" :style="`background-color: ${jogoInfo?.cor}`">{{ String(n).padStart(2,'0') }}</span>
                </div>
              </div>
              <div>
                <p class="text-[10px] text-blue-300 mb-1">2ª Coluna</p>
                <div class="flex flex-wrap gap-1">
                  <span v-for="n in jogo.coluna2" :key="n" class="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white" :style="`background-color: ${jogoInfo?.cor}`">{{ String(n).padStart(2,'0') }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Loteca (14 partidas) -->
          <div v-else-if="jogo.type === 'loteca'" class="text-xs font-mono space-y-0.5">
            <div v-for="(res, i) in jogo.resultados" :key="i" class="flex items-center justify-between">
              <span class="text-blue-300">Partida {{ i+1 }}</span>
              <span class="font-bold" :class="res==='C'?'text-green-400':res==='E'?'text-yellow-400':'text-red-400'">{{ res }}</span>
            </div>
          </div>

          <!-- Loteria Federal (número sorteado) -->
          <div v-else-if="jogo.type === 'federal'" class="text-center">
            <p class="text-3xl font-black font-mono" :style="`color: ${jogoInfo?.cor}`">{{ jogo.numero }}</p>
            <p class="text-xs text-blue-300 mt-1">Número do bilhete</p>
          </div>

          <!-- Super Sete (7 colunas) -->
          <div v-else-if="jogo.type === 'supersete'" class="text-xs">
            <div class="grid grid-cols-7 gap-1 text-center">
              <div v-for="(col, i) in jogo.colunas" :key="i">
                <p class="text-blue-300 mb-1">{{ i+1 }}</p>
                <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold text-white" :style="`background-color: ${jogoInfo?.cor}`">{{ col }}</span>
              </div>
            </div>
          </div>

          <!-- Dia de Sorte (números + mês) -->
          <div v-else-if="jogo.type === 'diasorte'">
            <div class="flex flex-wrap gap-1.5 mb-2">
              <span v-for="n in jogo.numeros" :key="n"
                class="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold text-white"
                :style="`background-color: ${jogoInfo?.cor}`">
                {{ String(n).padStart(2,'0') }}
              </span>
            </div>
            <p class="text-xs text-orange-300">📅 Mês: {{ jogo.mes }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela de regras de cada jogo -->
    <div class="mt-6 glass-panel p-4">
      <h3 class="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <Icon icon="mdi:information-outline" class="w-4 h-4 text-blue-400" /> Regras dos Jogos
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead><tr class="text-blue-300 border-b border-white/10">
            <th class="py-1.5 text-left">Jogo</th>
            <th class="py-1.5 text-left">Dezenas</th>
            <th class="py-1.5 text-left">Intervalo</th>
            <th class="py-1.5 text-left">Prêmio (aprox.)</th>
          </tr></thead>
          <tbody>
            <tr v-for="j in jogos" :key="j.id" class="border-b border-white/5 hover:bg-white/5">
              <td class="py-1.5 text-white font-semibold">{{ j.emoji }} {{ j.nome }}</td>
              <td class="py-1.5 text-blue-200">{{ j.regras }}</td>
              <td class="py-1.5 text-blue-200">{{ j.intervalo }}</td>
              <td class="py-1.5 text-green-400 font-semibold">{{ j.premio }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import Swal from 'sweetalert2'

const loteriaTips = [
  { title: 'Jogo responsável', text: 'Estabeleça um limite de gastos e nunca jogue dinheiro que você não pode perder. Loteria é entretenimento, não investimento.', type: 'warning' as const },
  { title: 'Probabilidade real', text: 'A chance de acertar 6 dezenas na Mega-Sena é 1 em 50.063.860. Números gerados aleatoriamente têm a mesma probabilidade que qualquer outra combinação.', type: 'info' as const },
]

// ─── Definição dos jogos ───────────────────────────────────────────────────────
const jogos = [
  { id: 'megasena',    nome: 'Mega-Sena',      emoji: '🍀', cor: '#209869', minDez: 6,  maxDez: 15, totalNum: 60,  tipo: 'numeros', regras: '6 a 15 dezenas',    intervalo: '01–60',  premio: 'Acumula em milhões', descricao: '6 dezenas de 60' },
  { id: 'lotofacil',   nome: 'Lotofácil',      emoji: '🌸', cor: '#930089', minDez: 15, maxDez: 20, totalNum: 25,  tipo: 'numeros', regras: '15 a 20 dezenas', intervalo: '01–25',  premio: 'A partir de R$1,7M', descricao: '15 dezenas de 25' },
  { id: 'quina',       nome: 'Quina',          emoji: '🔵', cor: '#260085', minDez: 5,  maxDez: 15, totalNum: 80,  tipo: 'numeros', regras: '5 a 15 dezenas',  intervalo: '01–80',  premio: 'Acumula',          descricao: '5 dezenas de 80' },
  { id: 'lotomania',   nome: 'Lotomania',      emoji: '🟡', cor: '#F7941D', minDez: 50, maxDez: 50, totalNum: 100, tipo: 'numeros', regras: '50 dezenas fixas', intervalo: '00–99',  premio: 'Acumula',          descricao: '50 dezenas de 100' },
  { id: 'duplasena',   nome: 'Dupla Sena',     emoji: '🔴', cor: '#CC0000', minDez: 6,  maxDez: 15, totalNum: 50,  tipo: 'duplasena', regras: '6 a 15 dezenas × 2', intervalo: '01–50', premio: 'Acumula',         descricao: '2 colunas de 6' },
  { id: 'milionaria',  nome: '+Milionária',    emoji: '💎', cor: '#00009C', minDez: 6,  maxDez: 6,  totalNum: 50,  tipo: 'milionaria', regras: '6 nº + 2 trevos', intervalo: '01–50', premio: 'R$10M mínimo',    descricao: '6 nº + 2 trevos' },
  { id: 'timemania',   nome: 'Timemania',      emoji: '⚽', cor: '#01A09A', minDez: 10, maxDez: 10, totalNum: 80,  tipo: 'timemania', regras: '10 dezenas + time', intervalo: '01–80', premio: 'Acumula',         descricao: '10 nº + 1 time' },
  { id: 'loteca',      nome: 'Loteca',         emoji: '🏆', cor: '#0056A2', minDez: 14, maxDez: 14, totalNum: 14,  tipo: 'loteca', regras: '14 partidas (C/E/V)', intervalo: 'C/E/V', premio: 'Acumula',          descricao: '14 partidas' },
  { id: 'diasorte',    nome: 'Dia de Sorte',   emoji: '📅', cor: '#009688', minDez: 7,  maxDez: 15, totalNum: 31,  tipo: 'diasorte', regras: '7 a 15 nº + mês', intervalo: '01–31', premio: 'Acumula',           descricao: '7 nº + mês' },
  { id: 'supersete',   nome: 'Super Sete',     emoji: '7️⃣', cor: '#8B1A1A', minDez: 7,  maxDez: 7,  totalNum: 10,  tipo: 'supersete', regras: '7 colunas 0–9', intervalo: '0–9', premio: 'Acumula',              descricao: '7 colunas de 0–9' },
  { id: 'federal',     nome: 'Loteria Federal',emoji: '🎫', cor: '#4A148C', minDez: 1,  maxDez: 1,  totalNum: 100000, tipo: 'federal', regras: 'Número de bilhete', intervalo: '00001–99999', premio: 'R$600K 1º prêmio', descricao: 'Bilhete 5 dígitos' },
]

type JogoGerado =
  | { type: 'numeros';   numeros: number[] }
  | { type: 'duplasena'; coluna1: number[]; coluna2: number[] }
  | { type: 'milionaria'; numeros: number[]; trevos: number[] }
  | { type: 'timemania'; numeros: number[]; time: string }
  | { type: 'loteca';    resultados: string[] }
  | { type: 'federal';   numero: string }
  | { type: 'supersete'; colunas: number[] }
  | { type: 'diasorte';  numeros: number[]; mes: string }

const jogoAtual   = ref('megasena')
const qtdDezenas  = ref(6)
const qtdJogos    = ref(1)
const tipoGeracao = ref('aleatorio')
const jogosGerados = ref<JogoGerado[]>([])

const jogoInfo = computed(() => jogos.find(j => j.id === jogoAtual.value))
const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const times  = ['Flamengo','Corinthians','Palmeiras','São Paulo','Santos','Vasco','Fluminense','Botafogo','Grêmio','Internacional','Athletico-PR','Atlético-MG','Cruzeiro','Bahia','Sport','Ceará','Fortaleza','Goiás','América-MG','Juventude']

function range(a: number, b: number): number[] { return Array.from({length: b-a+1}, (_,i) => a+i) }

function sortear(total: number, qtd: number, tipo = 'aleatorio', min = 1): number[] {
  const pool = Array.from({length: total}, (_, i) => i + min)
  // Apply type bias
  let nums: number[]
  if (tipo === 'pares') {
    const pares = pool.filter(n => n % 2 === 0)
    const impares = pool.filter(n => n % 2 !== 0)
    const metade = Math.floor(qtd / 2)
    nums = [...sortearDe(pares, metade), ...sortearDe(impares, qtd - metade)]
  } else if (tipo === 'dezenaAlta') {
    const meio = Math.floor(total / 2)
    const altas = pool.filter(n => n > meio)
    const baixas = pool.filter(n => n <= meio)
    const qAltas = Math.ceil(qtd * 0.6)
    nums = [...sortearDe(altas, qAltas), ...sortearDe(baixas, qtd - qAltas)]
  } else if (tipo === 'dezenasBaixa') {
    const meio = Math.floor(total / 2)
    const altas = pool.filter(n => n > meio)
    const baixas = pool.filter(n => n <= meio)
    const qBaixas = Math.ceil(qtd * 0.6)
    nums = [...sortearDe(baixas, qBaixas), ...sortearDe(altas, qtd - qBaixas)]
  } else {
    nums = sortearDe(pool, qtd)
  }
  return nums.sort((a,b) => a-b)
}

function sortearDe<T>(arr: T[], qtd: number): T[] {
  const copia = [...arr]
  for (let i = copia.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia.slice(0, Math.min(qtd, copia.length))
}

function gerarUmJogo(info: typeof jogos[0]): JogoGerado {
  const dez = qtdDezenas.value

  switch(info.tipo) {
    case 'numeros':
      return { type: 'numeros', numeros: sortear(info.totalNum, dez, tipoGeracao.value, info.id === 'lotomania' ? 0 : 1) }

    case 'duplasena':
      return { type: 'duplasena', coluna1: sortear(50, dez, tipoGeracao.value), coluna2: sortear(50, dez, tipoGeracao.value) }

    case 'milionaria':
      return { type: 'milionaria', numeros: sortear(50, 6, tipoGeracao.value), trevos: sortearDe(range(1,6), 2).sort((a,b)=>a-b) }

    case 'timemania':
      return { type: 'timemania', numeros: sortear(80, 10, tipoGeracao.value), time: times[Math.floor(Math.random()*times.length)] }

    case 'loteca':
      return { type: 'loteca', resultados: Array.from({length:14}, () => (['C','E','V'] as const)[Math.floor(Math.random()*3)] as string) }

    case 'federal':
      return { type: 'federal', numero: String(Math.floor(Math.random()*99999)+1).padStart(5,'0') }

    case 'supersete':
      return { type: 'supersete', colunas: Array.from({length:7}, () => Math.floor(Math.random()*10)) }

    case 'diasorte':
      return { type: 'diasorte', numeros: sortear(31, Math.max(dez, 7), tipoGeracao.value), mes: meses[Math.floor(Math.random()*12)] }

    default:
      return { type: 'numeros', numeros: sortear(info.totalNum, dez) }
  }
}

function gerarJogos() {
  const info = jogoInfo.value
  if (!info) return
  // Atualiza qtdDezenas para o mínimo se não for variável
  if (info.minDez === info.maxDez) qtdDezenas.value = info.minDez
  jogosGerados.value = Array.from({length: Math.min(qtdJogos.value, 20)}, () => gerarUmJogo(info))
}

function copiarJogos() {
  const info = jogoInfo.value
  if (!info) return
  const texto = jogosGerados.value.map((j, i) => {
    if (j.type === 'numeros') return `Jogo ${i+1}: ${j.numeros.map(n => String(n).padStart(2,'0')).join('-')}`
    if (j.type === 'duplasena') return `Jogo ${i+1}: 1ª[${j.coluna1.map(n=>String(n).padStart(2,'0')).join('-')}] 2ª[${j.coluna2.map(n=>String(n).padStart(2,'0')).join('-')}]`
    if (j.type === 'milionaria') return `Jogo ${i+1}: ${j.numeros.map(n=>String(n).padStart(2,'0')).join('-')} | Trevos: ${j.trevos.join('-')}`
    if (j.type === 'timemania') return `Jogo ${i+1}: ${j.numeros.map(n=>String(n).padStart(2,'0')).join('-')} | Time: ${j.time}`
    if (j.type === 'loteca') return `Jogo ${i+1}: ${j.resultados.join(' ')}`
    if (j.type === 'federal') return `Jogo ${i+1}: ${j.numero}`
    if (j.type === 'supersete') return `Jogo ${i+1}: ${j.colunas.join(' ')}`
    if (j.type === 'diasorte') return `Jogo ${i+1}: ${j.numeros.map(n=>String(n).padStart(2,'0')).join('-')} | Mês: ${j.mes}`
    return `Jogo ${i+1}`
  }).join('\n')
  navigator.clipboard.writeText(`${info.nome}\n${'─'.repeat(30)}\n${texto}`)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
}

function imprimirJogos() { window.print() }
</script>

<style>
@media print {
  body * { visibility: hidden; }
  #loteria-print-area, #loteria-print-area * { visibility: visible; }
  #loteria-print-area { position: fixed; top: 0; left: 0; right: 0; padding: 1cm; background: white; }
  @page { size: A4; margin: 1.5cm; }
}
</style>

