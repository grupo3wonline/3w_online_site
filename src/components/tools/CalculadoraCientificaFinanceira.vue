<template>
  <ToolShell
    title="Calculadora Científica & Financeira"
    description="Calculadora científica completa, funções financeiras e gerador de tabuadas."
    icon="fa-calculator"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Científica & Padrão', 'Juros & Financiamento', 'Gerador de Tabuadas']"
    :tips="calcTips"
  >
    <!-- Tabs -->
    <div class="flex gap-1 p-1 bg-white/5 rounded-xl mb-5 w-fit">
      <button v-for="t in tabs" :key="t.id" @click="aba = t.id"
        :class="['flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all',
          aba === t.id ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-300 hover:text-white hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-4 h-4" /> {{ t.label }}
      </button>
    </div>

    <!-- ══ ABA CALCULADORA ════════════════════════════════════════════ -->
    <div v-if="aba === 'calc'" class="max-w-sm mx-auto">

      <!-- Modo DEG/RAD + toggle científica -->
      <div class="flex justify-between items-center mb-3">
        <div class="flex gap-1 p-0.5 bg-white/5 rounded-lg">
          <button @click="graus=true" :class="['px-3 py-1 rounded text-xs font-semibold transition-colors', graus?'bg-blue-600 text-white':'text-blue-300 hover:text-white']">DEG</button>
          <button @click="graus=false" :class="['px-3 py-1 rounded text-xs font-semibold transition-colors', !graus?'bg-blue-600 text-white':'text-blue-300 hover:text-white']">RAD</button>
        </div>
        <button @click="modoCalc = modoCalc==='std'?'sci':'std'" class="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg transition-colors">
          {{ modoCalc==='sci'?'← Padrão':'⚗ Científica' }}
        </button>
      </div>

      <!-- Display -->
      <div class="bg-[#0a1628] border border-white/10 rounded-2xl p-4 mb-3 shadow-lg">
        <div class="text-blue-400 text-xs font-mono min-h-5 text-right mb-1 truncate">{{ expressao || '&nbsp;' }}</div>
        <div class="text-white text-3xl font-bold font-mono text-right leading-tight">{{ display }}</div>
        <div class="text-blue-300 text-xs text-right mt-1 font-mono">{{ historico[historico.length-1] || '' }}</div>
      </div>

      <!-- Botões científicos (modo científico) -->
      <div v-if="modoCalc==='sci'" class="grid grid-cols-4 gap-2 mb-2">
        <button v-for="b in botoesScientificos" :key="b.label" @click="clickSci(b)"
          class="calc-btn calc-btn-fn text-xs">{{ b.label }}</button>
      </div>

      <!-- Memória -->
      <div class="grid grid-cols-4 gap-2 mb-2">
        <button @click="memClear()" class="calc-btn calc-btn-mem text-xs">MC</button>
        <button @click="memRecall()" class="calc-btn calc-btn-mem text-xs">MR</button>
        <button @click="memAdd()" class="calc-btn calc-btn-mem text-xs">M+</button>
        <button @click="memSub()" class="calc-btn calc-btn-mem text-xs">M−</button>
      </div>

      <!-- Botões principais -->
      <div class="grid grid-cols-4 gap-2">
        <button @click="clear()" class="calc-btn calc-btn-clear">AC</button>
        <button @click="backspace()" class="calc-btn calc-btn-fn">⌫</button>
        <button @click="appendOp('%')" class="calc-btn calc-btn-fn">%</button>
        <button @click="appendOp('÷')" class="calc-btn calc-btn-op">÷</button>

        <button @click="appendNum('7')" class="calc-btn calc-btn-num">7</button>
        <button @click="appendNum('8')" class="calc-btn calc-btn-num">8</button>
        <button @click="appendNum('9')" class="calc-btn calc-btn-num">9</button>
        <button @click="appendOp('×')" class="calc-btn calc-btn-op">×</button>

        <button @click="appendNum('4')" class="calc-btn calc-btn-num">4</button>
        <button @click="appendNum('5')" class="calc-btn calc-btn-num">5</button>
        <button @click="appendNum('6')" class="calc-btn calc-btn-num">6</button>
        <button @click="appendOp('−')" class="calc-btn calc-btn-op">−</button>

        <button @click="appendNum('1')" class="calc-btn calc-btn-num">1</button>
        <button @click="appendNum('2')" class="calc-btn calc-btn-num">2</button>
        <button @click="appendNum('3')" class="calc-btn calc-btn-num">3</button>
        <button @click="appendOp('+')" class="calc-btn calc-btn-op">+</button>

        <button @click="toggleSign()" class="calc-btn calc-btn-fn">+/−</button>
        <button @click="appendNum('0')" class="calc-btn calc-btn-num">0</button>
        <button @click="appendDot()" class="calc-btn calc-btn-num">.</button>
        <button @click="calcular()" class="calc-btn calc-btn-eq">=</button>
      </div>

      <!-- Histórico -->
      <div v-if="historico.length" class="mt-4 glass-panel p-3 max-h-32 overflow-y-auto">
        <p class="text-xs text-blue-300 mb-2 font-semibold">Histórico:</p>
        <p v-for="(h,i) in [...historico].reverse().slice(0,8)" :key="i" class="text-xs font-mono text-blue-200 py-0.5 border-b border-white/5">{{ h }}</p>
      </div>
    </div>

    <!-- ══ ABA FINANCEIRA ═════════════════════════════════════════════ -->
    <div v-if="aba === 'fin'">
      <!-- Sub-tabs financeiros -->
      <div class="tab-row">
        <button v-for="ft in finTabs" :key="ft.id" @click="finAba=ft.id"
          :class="['px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
            finAba===ft.id?'bg-indigo-600 text-white border-indigo-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
          {{ ft.label }}
        </button>
      </div>

      <!-- Juros Simples e Compostos -->
      <div v-if="finAba==='juros'" class="grid lg:grid-cols-2 gap-5">
        <div class="glass-panel p-5 space-y-3">
          <h3 class="text-sm font-semibold text-white mb-3">Juros Simples & Compostos</h3>
          <div><label class="text-xs text-blue-300 mb-1 block">Capital Inicial (R$)</label><input v-model.number="jCapital" type="number" step="0.01" class="input-aurora w-full" placeholder="1000.00" /></div>
          <div><label class="text-xs text-blue-300 mb-1 block">Taxa de Juros (% a.m.)</label><input v-model.number="jTaxa" type="number" step="0.01" class="input-aurora w-full" placeholder="1.5" /></div>
          <div><label class="text-xs text-blue-300 mb-1 block">Período (meses)</label><input v-model.number="jPeriodo" type="number" class="input-aurora w-full" placeholder="12" /></div>
          <div class="flex gap-2">
            <label class="flex items-center gap-1.5 text-xs cursor-pointer"><input type="radio" v-model="jTipo" value="simples" class="accent-blue-500" /><span class="text-blue-200">Simples</span></label>
            <label class="flex items-center gap-1.5 text-xs cursor-pointer"><input type="radio" v-model="jTipo" value="composto" class="accent-blue-500" /><span class="text-blue-200">Composto</span></label>
          </div>
          <button @click="calcJuros()" class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors">Calcular</button>
        </div>
        <div v-if="jResultado" class="glass-panel p-5 space-y-3">
          <h3 class="text-sm font-semibold text-white">Resultado — {{ jTipo === 'simples' ? 'Juros Simples' : 'Juros Compostos' }}</h3>
          <div v-for="item in jResultado" :key="item.label" class="flex justify-between border-b border-white/5 pb-2">
            <span class="text-xs text-blue-300">{{ item.label }}</span>
            <span class="text-sm font-bold font-mono" :class="item.destaque?'text-green-400':'text-white'">{{ item.valor }}</span>
          </div>
        </div>
      </div>

      <!-- Financiamento / PMT -->
      <div v-if="finAba==='financiamento'" class="grid lg:grid-cols-2 gap-5">
        <div class="glass-panel p-5 space-y-3">
          <h3 class="text-sm font-semibold text-white mb-3">Financiamento — Tabela Price</h3>
          <div><label class="text-xs text-blue-300 mb-1 block">Valor do Bem (R$)</label><input v-model.number="fValor" type="number" step="0.01" class="input-aurora w-full" /></div>
          <div><label class="text-xs text-blue-300 mb-1 block">Entrada (R$)</label><input v-model.number="fEntrada" type="number" step="0.01" class="input-aurora w-full" /></div>
          <div><label class="text-xs text-blue-300 mb-1 block">Taxa de Juros (% a.m.)</label><input v-model.number="fTaxa" type="number" step="0.01" class="input-aurora w-full" /></div>
          <div><label class="text-xs text-blue-300 mb-1 block">Número de Parcelas</label><input v-model.number="fParcelas" type="number" class="input-aurora w-full" /></div>
          <button @click="calcFinanciamento()" class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors">Calcular</button>
        </div>
        <div v-if="fResultado" class="glass-panel p-5 space-y-3">
          <h3 class="text-sm font-semibold text-white">Resultado</h3>
          <div v-for="item in fResultado" :key="item.label" class="flex justify-between border-b border-white/5 pb-2">
            <span class="text-xs text-blue-300">{{ item.label }}</span>
            <span class="text-sm font-bold font-mono" :class="item.destaque?'text-green-400':'text-white'">{{ item.valor }}</span>
          </div>
        </div>
      </div>

      <!-- Desconto Comercial / Bancário -->
      <div v-if="finAba==='desconto'" class="grid lg:grid-cols-2 gap-5">
        <div class="glass-panel p-5 space-y-3">
          <h3 class="text-sm font-semibold text-white mb-3">Desconto Comercial & Bancário</h3>
          <div><label class="text-xs text-blue-300 mb-1 block">Valor Nominal (R$)</label><input v-model.number="dNominal" type="number" step="0.01" class="input-aurora w-full" /></div>
          <div><label class="text-xs text-blue-300 mb-1 block">Taxa de Desconto (% a.m.)</label><input v-model.number="dTaxa" type="number" step="0.01" class="input-aurora w-full" /></div>
          <div><label class="text-xs text-blue-300 mb-1 block">Prazo (meses)</label><input v-model.number="dPrazo" type="number" class="input-aurora w-full" /></div>
          <div class="flex gap-2">
            <label class="flex items-center gap-1.5 text-xs cursor-pointer"><input type="radio" v-model="dTipo" value="comercial" class="accent-blue-500" /><span class="text-blue-200">Comercial (simples)</span></label>
            <label class="flex items-center gap-1.5 text-xs cursor-pointer"><input type="radio" v-model="dTipo" value="bancario" class="accent-blue-500" /><span class="text-blue-200">Bancário (racional)</span></label>
          </div>
          <button @click="calcDesconto()" class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors">Calcular</button>
        </div>
        <div v-if="dResultado" class="glass-panel p-5 space-y-3">
          <h3 class="text-sm font-semibold text-white">Resultado</h3>
          <div v-for="item in dResultado" :key="item.label" class="flex justify-between border-b border-white/5 pb-2">
            <span class="text-xs text-blue-300">{{ item.label }}</span>
            <span class="text-sm font-bold font-mono" :class="item.destaque?'text-green-400':'text-white'">{{ item.valor }}</span>
          </div>
        </div>
      </div>

      <!-- Inflação -->
      <div v-if="finAba==='inflacao'" class="grid lg:grid-cols-2 gap-5">
        <div class="glass-panel p-5 space-y-3">
          <h3 class="text-sm font-semibold text-white mb-3">Correção por Inflação</h3>
          <div><label class="text-xs text-blue-300 mb-1 block">Valor Original (R$)</label><input v-model.number="iValor" type="number" step="0.01" class="input-aurora w-full" /></div>
          <div><label class="text-xs text-blue-300 mb-1 block">Taxa de Inflação (% a.a.)</label><input v-model.number="iTaxa" type="number" step="0.01" class="input-aurora w-full" /></div>
          <div><label class="text-xs text-blue-300 mb-1 block">Período (anos)</label><input v-model.number="iPeriodo" type="number" class="input-aurora w-full" /></div>
          <button @click="calcInflacao()" class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors">Calcular</button>
        </div>
        <div v-if="iResultado" class="glass-panel p-5 space-y-3">
          <h3 class="text-sm font-semibold text-white">Resultado</h3>
          <div v-for="item in iResultado" :key="item.label" class="flex justify-between border-b border-white/5 pb-2">
            <span class="text-xs text-blue-300">{{ item.label }}</span>
            <span class="text-sm font-bold font-mono" :class="item.destaque?'text-green-400':'text-white'">{{ item.valor }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ ABA TABUADA ════════════════════════════════════════════════ -->
    <div v-if="aba === 'tabuada'" class="space-y-5">
      <div class="flex flex-wrap gap-4 items-end glass-panel p-4">
        <div>
          <label class="text-xs text-blue-300 mb-1 block">Número(s) <span class="text-blue-400">(separe por vírgula: 5, 7, 9)</span></label>
          <input v-model="tabNumeros" class="input-aurora w-56" placeholder="ex: 5, 7, 9 ou só 5" />
        </div>
        <div>
          <label class="text-xs text-blue-300 mb-1 block">De</label>
          <input v-model.number="tabDe" type="number" min="0" max="100" class="input-aurora w-20" />
        </div>
        <div>
          <label class="text-xs text-blue-300 mb-1 block">Até</label>
          <input v-model.number="tabAte" type="number" min="0" max="100" class="input-aurora w-20" />
        </div>
        <div>
          <label class="text-xs text-blue-300 mb-1 block">Formato</label>
          <select v-model="tabFormato" class="input-aurora">
            <option value="lista">Lista</option>
            <option value="tabela">Tabela</option>
          </select>
        </div>
        <button @click="gerarTabuada()" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors">Gerar</button>
        <button @click="imprimirTabuada()" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:printer-outline" class="w-4 h-4 inline" /> Imprimir</button>
        <div class="w-full">
          <label class="text-xs text-blue-300 mb-2 block">Atalhos rápidos:</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="n in [1,2,3,4,5,6,7,8,9,10]" :key="n" @click="tabNumeros=String(n);gerarTabuada()"
              class="w-9 h-9 text-sm font-bold rounded-lg bg-white/5 hover:bg-blue-600/50 text-blue-200 hover:text-white border border-white/10 transition-colors">
              {{ n }}
            </button>
          </div>
        </div>
      </div>

      <!-- Resultado tabuada -->
      <div v-if="tabResultado.length" id="tab-print-area" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="tab in tabResultado" :key="tab.numero" class="glass-panel p-4">
          <h3 class="text-sm font-bold text-white mb-3 text-center border-b border-white/10 pb-2">Tabuada do {{ tab.numero }}</h3>
          <div v-if="tabFormato==='lista'" class="space-y-1">
            <p v-for="item in tab.itens" :key="item.mult" class="text-sm font-mono text-blue-200 flex justify-between">
              <span>{{ tab.numero }} × {{ item.mult }}</span>
              <span class="font-bold text-white"> = {{ item.resultado }}</span>
            </p>
          </div>
          <table v-else class="w-full text-xs">
            <thead><tr class="border-b border-white/10"><th class="py-1 text-left text-blue-300">×</th><th class="py-1 text-right text-blue-300">Resultado</th></tr></thead>
            <tbody>
              <tr v-for="item in tab.itens" :key="item.mult" class="border-b border-white/5">
                <td class="py-1 font-mono text-blue-200">{{ tab.numero }} × {{ item.mult }}</td>
                <td class="py-1 text-right font-mono font-bold text-white">{{ item.resultado }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'

const calcTips = [
  { title: 'Graus vs Radianos', text: 'Use DEG para cálculos cotidianos com ângulos. RAD é necessário para cálculos avançados em radiano.', type: 'info' as const },
  { title: 'Memória', text: 'MC limpa, MR recupera, M+ adiciona e M− subtrai o valor atual da memória.', type: 'info' as const },
  { title: 'Resultado financeiro', text: 'Os resultados são meramente ilustrativos. Consulte um profissional para decisões financeiras.', type: 'warning' as const },
]

const tabs = [
  { id: 'calc' as const,    label: 'Calculadora', icon: 'mdi:calculator' },
  { id: 'fin' as const,     label: 'Financeira',  icon: 'mdi:currency-usd' },
  { id: 'tabuada' as const, label: 'Tabuada',     icon: 'mdi:table' },
]
const aba = ref<'calc'|'fin'|'tabuada'>('calc')

// ─── CALCULADORA ──────────────────────────────────────────────────────────────
const display   = ref('0')
const expressao = ref('')
const historico = ref<string[]>([])
const memoria   = ref(0)
const graus     = ref(true)
const modoCalc  = ref<'std'|'sci'>('std')
let   esperandoNum = false

function toRad(x: number): number { return graus.value ? x * Math.PI / 180 : x }

const botoesScientificos = [
  { label: 'sin',  fn: (x: number) => Math.sin(toRad(x)) },
  { label: 'cos',  fn: (x: number) => Math.cos(toRad(x)) },
  { label: 'tan',  fn: (x: number) => Math.tan(toRad(x)) },
  { label: 'asin', fn: (x: number) => graus.value ? Math.asin(x)*180/Math.PI : Math.asin(x) },
  { label: 'acos', fn: (x: number) => graus.value ? Math.acos(x)*180/Math.PI : Math.acos(x) },
  { label: 'atan', fn: (x: number) => graus.value ? Math.atan(x)*180/Math.PI : Math.atan(x) },
  { label: '√',    fn: (x: number) => Math.sqrt(x) },
  { label: '∛',    fn: (x: number) => Math.cbrt(x) },
  { label: 'x²',   fn: (x: number) => x*x },
  { label: 'x³',   fn: (x: number) => x*x*x },
  { label: 'log',  fn: (x: number) => Math.log10(x) },
  { label: 'ln',   fn: (x: number) => Math.log(x) },
  { label: 'eˣ',   fn: (x: number) => Math.exp(x) },
  { label: '10ˣ',  fn: (x: number) => Math.pow(10, x) },
  { label: '1/x',  fn: (x: number) => 1/x },
  { label: '|x|',  fn: (x: number) => Math.abs(x) },
  { label: 'π',    fn: () => Math.PI, noArg: true },
  { label: 'e',    fn: () => Math.E, noArg: true },
  { label: 'n!',   fn: (x: number) => { let f=1; for(let i=2;i<=x;i++) f*=i; return f } },
  { label: '^',    isOp: true, label2: '^' },
]

function clickSci(b: any) {
  if (b.isOp) { appendOp('^'); return }
  if (b.noArg) { const v = b.fn(); display.value = String(parseFloat(v.toFixed(10))); esperandoNum = true; return }
  const x = parseFloat(display.value)
  if (isNaN(x)) return
  const result = b.fn(x)
  expressao.value = `${b.label}(${display.value})`
  display.value = String(parseFloat(result.toFixed(10)))
  esperandoNum = true
}

function appendNum(n: string) {
  if (esperandoNum) { display.value = n; esperandoNum = false }
  else display.value = display.value === '0' ? n : display.value + n
}

function appendDot() {
  if (esperandoNum) { display.value = '0.'; esperandoNum = false; return }
  if (!display.value.includes('.')) display.value += '.'
}

function appendOp(op: string) {
  expressao.value = display.value + ' ' + op + ' '
  esperandoNum = true
  currentOp.value = op
  firstOperand.value = parseFloat(display.value)
}

const currentOp    = ref('')
const firstOperand = ref(0)

function calcular() {
  if (!currentOp.value) return
  const a = firstOperand.value
  const b = parseFloat(display.value)
  let result: number
  switch(currentOp.value) {
    case '+': result = a + b; break
    case '−': result = a - b; break
    case '×': result = a * b; break
    case '÷': result = b !== 0 ? a / b : NaN; break
    case '%': result = a % b; break
    case '^': result = Math.pow(a, b); break
    default: return
  }
  const expr = `${a} ${currentOp.value} ${b} = ${parseFloat(result.toFixed(10))}`
  historico.value.push(expr)
  if (historico.value.length > 20) historico.value.shift()
  display.value = isNaN(result) ? 'Erro' : String(parseFloat(result.toFixed(10)))
  expressao.value = ''
  currentOp.value = ''
  esperandoNum = true
}

function clear() { display.value = '0'; expressao.value = ''; currentOp.value = ''; esperandoNum = false }
function backspace() {
  if (display.value.length <= 1) { display.value = '0'; return }
  display.value = display.value.slice(0,-1)
}
function toggleSign() { display.value = display.value.startsWith('-') ? display.value.slice(1) : '-' + display.value }
function memClear() { memoria.value = 0 }
function memRecall() { display.value = String(memoria.value); esperandoNum = true }
function memAdd() { memoria.value += parseFloat(display.value) || 0 }
function memSub() { memoria.value -= parseFloat(display.value) || 0 }

// ─── FINANCEIRA ───────────────────────────────────────────────────────────────
const finTabs = [
  { id: 'juros', label: 'Juros' },
  { id: 'financiamento', label: 'Financiamento' },
  { id: 'desconto', label: 'Desconto' },
  { id: 'inflacao', label: 'Inflação' },
]
const finAba = ref('juros')

function brl(n: number) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }

// Juros
const jCapital = ref<number>(1000); const jTaxa = ref<number>(1.5); const jPeriodo = ref<number>(12); const jTipo = ref('composto')
const jResultado = ref<{label:string;valor:string;destaque?:boolean}[]|null>(null)
function calcJuros() {
  const C = jCapital.value, i = jTaxa.value/100, n = jPeriodo.value
  const J = jTipo.value === 'simples' ? C * i * n : C * (Math.pow(1+i, n) - 1)
  const M = C + J
  jResultado.value = [
    { label: 'Capital Inicial', valor: brl(C) },
    { label: 'Taxa Mensal', valor: (jTaxa.value) + '%' },
    { label: 'Período', valor: n + ' meses' },
    { label: 'Juros Total', valor: brl(J) },
    { label: 'Montante Final', valor: brl(M), destaque: true },
    { label: 'Taxa Acumulada', valor: ((J/C)*100).toFixed(2) + '%' },
    { label: 'Taxa Anual Equiv.', valor: (Math.pow(1+jTaxa.value/100, 12) - 1)*100 < 999 ? ((Math.pow(1+jTaxa.value/100, 12)-1)*100).toFixed(2)+'%' : 'N/A' },
  ]
}

// Financiamento
const fValor = ref<number>(50000); const fEntrada = ref<number>(10000); const fTaxa = ref<number>(1.2); const fParcelas = ref<number>(48)
const fResultado = ref<{label:string;valor:string;destaque?:boolean}[]|null>(null)
function calcFinanciamento() {
  const PV = fValor.value - fEntrada.value, i = fTaxa.value/100, n = fParcelas.value
  const PMT = PV * (i * Math.pow(1+i,n)) / (Math.pow(1+i,n) - 1)
  const totalPago = PMT * n + fEntrada.value, jurosTotal = totalPago - fValor.value
  fResultado.value = [
    { label: 'Valor Financiado', valor: brl(PV) },
    { label: 'Parcela Mensal (PMT)', valor: brl(PMT), destaque: true },
    { label: 'Total Pago (s/ entrada)', valor: brl(PMT * n) },
    { label: 'Total Pago (c/ entrada)', valor: brl(totalPago) },
    { label: 'Juros Total', valor: brl(jurosTotal) },
    { label: 'Custo Efetivo', valor: ((jurosTotal/fValor.value)*100).toFixed(1) + '%' },
  ]
}

// Desconto
const dNominal = ref<number>(10000); const dTaxa = ref<number>(2); const dPrazo = ref<number>(3); const dTipo = ref('comercial')
const dResultado = ref<{label:string;valor:string;destaque?:boolean}[]|null>(null)
function calcDesconto() {
  const N = dNominal.value, i = dTaxa.value/100, n = dPrazo.value
  const D = dTipo.value === 'comercial' ? N * i * n : N - N/(1 + i*n)
  const VA = N - D
  dResultado.value = [
    { label: 'Valor Nominal', valor: brl(N) },
    { label: 'Desconto', valor: brl(D) },
    { label: 'Valor Atual', valor: brl(VA), destaque: true },
    { label: 'Taxa Efetiva', valor: ((D/(VA)*(1/n))*100).toFixed(2) + '%' },
  ]
}

// Inflação
const iValor = ref<number>(1000); const iTaxa = ref<number>(5); const iPeriodo = ref<number>(5)
const iResultado = ref<{label:string;valor:string;destaque?:boolean}[]|null>(null)
function calcInflacao() {
  const V = iValor.value, i = iTaxa.value/100, n = iPeriodo.value
  const VF = V * Math.pow(1+i, n)
  const perdaPP = ((VF - V)/V)*100
  iResultado.value = [
    { label: 'Valor Atual', valor: brl(V) },
    { label: 'Inflação a.a.', valor: iTaxa.value + '%' },
    { label: 'Período', valor: n + ' anos' },
    { label: 'Valor Corrigido', valor: brl(VF), destaque: true },
    { label: 'Variação Total', valor: '+' + perdaPP.toFixed(1) + '%' },
    { label: 'Poder de Compra (R$1,00 original)', valor: brl(1/Math.pow(1+i, n)) },
  ]
}

// ─── TABUADA ──────────────────────────────────────────────────────────────────
const tabNumeros = ref('5')
const tabDe      = ref(1)
const tabAte     = ref(10)
const tabFormato = ref<'lista'|'tabela'>('lista')
const tabResultado = ref<{numero:number; itens:{mult:number;resultado:number}[]}[]>([])

function gerarTabuada() {
  const nums = tabNumeros.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0)
  tabResultado.value = nums.map(n => ({
    numero: n,
    itens: Array.from({length: tabAte.value - tabDe.value + 1}, (_, i) => ({
      mult: tabDe.value + i,
      resultado: n * (tabDe.value + i)
    }))
  }))
}

function imprimirTabuada() { window.print() }

// Inicializar
gerarTabuada()
</script>

<style>
.calc-btn {
  @apply h-12 rounded-xl font-semibold text-sm transition-all active:scale-95 select-none cursor-pointer border;
}
.calc-btn-num  { @apply bg-white/10 dark:bg-white/10 hover:bg-white/20 text-white border-white/15; }
.calc-btn-op   { @apply bg-blue-600/80 hover:bg-blue-500 text-white border-blue-500/50; }
.calc-btn-eq   { @apply bg-blue-500 hover:bg-blue-400 text-white border-blue-400 font-bold; }
.calc-btn-fn   { @apply bg-white/5 hover:bg-white/15 text-blue-200 hover:text-white border-white/10; }
.calc-btn-clear{ @apply bg-red-500/80 hover:bg-red-400 text-white border-red-400; }
.calc-btn-mem  { @apply bg-indigo-500/30 hover:bg-indigo-500/50 text-indigo-200 hover:text-white border-indigo-500/30 text-xs; }

@media print {
  body * { visibility: hidden; }
  #tab-print-area, #tab-print-area * { visibility: visible; }
  #tab-print-area { position: fixed; top: 0; left: 0; right: 0; padding: 1cm; background: white; color: black; }
  @page { size: A4; margin: 1.5cm; }
}
</style>


