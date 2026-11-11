<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface Pessoa {
  nome: string; email: string; cpf: string; rg: string; dataNasc: string; idade: number
  sexo: string; telefone: string; celular: string; cep: string; endereco: string
  numero: string; bairro: string; cidade: string; estado: string
  mae: string; pai: string; cartao: string; senha: string; login: string
}

const pessoa = ref<Pessoa | null>(null)
const sexoFiltro = ref('ambos')
const qtd = ref(1)
const multiplos = ref<Pessoa[]>([])

const nomesM = ['Carlos','João','Pedro','Lucas','Marcos','Felipe','Rafael','Gabriel','Matheus','André','Roberto','Daniel','Eduardo','Leandro','Bruno','Diego','Alexandre','Rodrigo','Fábio','Renato','Gustavo','Henrique','Vinicius','Thiago','Leonardo']
const nomesF = ['Ana','Maria','Fernanda','Patricia','Juliana','Camila','Larissa','Beatriz','Gabriela','Isabela','Amanda','Tatiana','Vanessa','Carolina','Mariana','Aline','Leticia','Priscila','Renata','Sandra','Cristina','Monica','Helena','Bianca','Natalia']
const sobrenomesP1 = ['Silva','Santos','Oliveira','Souza','Pereira','Costa','Ferreira','Alves','Rodrigues','Nascimento','Lima','Araújo','Melo','Barbosa','Carvalho','Cardoso','Gomes','Martins','Monteiro','Ribeiro']
const sobrenomesP2 = ['de Souza','dos Santos','da Silva','de Oliveira','Ferreira','Pereira','Costa','Lima','Rodrigues','Nunes']
const estados2 = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']
const cidades: Record<string, string[]> = {
  SP: ['São Paulo','Campinas','Santos','Ribeirão Preto','Sorocaba','São José dos Campos'],
  RJ: ['Rio de Janeiro','Niterói','Nova Iguaçu','Duque de Caxias','Petrópolis'],
  MG: ['Belo Horizonte','Uberlândia','Contagem','Juiz de Fora','Betim'],
  RS: ['Porto Alegre','Canoas','Pelotas','Caxias do Sul','Santa Maria'],
  PR: ['Curitiba','Londrina','Maringá','Foz do Iguaçu','Cascavel'],
  BA: ['Salvador','Feira de Santana','Vitória da Conquista','Ilhéus'],
}
const ruas = ['Rua das Acácias','Av. Paulista','Rua do Comércio','Av. Brasil','Rua dos Pinheiros','Av. Independência','Rua das Flores','Rua Tiradentes','Av. São João','Rua XV de Novembro']
const bairros = ['Centro','Jardins','Vila Nova','Boa Vista','Santa Maria','Bela Vista','Jardim América','Ipanema','Copacabana','Pinheiros']

function rand(n: number) { return Math.floor(Math.random() * n) }
function pick<T>(arr: T[]): T { return arr[rand(arr.length)] }

function gerarCPF(): string {
  const n = Array.from({length: 9}, () => rand(10))
  const d1 = ((n.reduce((s, v, i) => s + v * (10 - i), 0) * 10) % 11) % 10
  const d2 = (([...n, d1].reduce((s, v, i) => s + v * (11 - i), 0) * 10) % 11) % 10
  const r = [...n, d1, d2].join('')
  return r.slice(0,3) + '.' + r.slice(3,6) + '.' + r.slice(6,9) + '-' + r.slice(9)
}

function gerarRG(): string {
  const d = Array.from({length: 8}, () => rand(10))
  const w = [2,3,4,5,6,7,8,9]
  const rem = d.reduce((s, v, i) => s + v * w[i], 0) % 11
  const ch = rem === 0 ? '0' : rem === 1 ? 'X' : String(11 - rem)
  return d.slice(0,2).join('') + '.' + d.slice(2,5).join('') + '.' + d.slice(5,8).join('') + '-' + ch
}

function gerarCEP(uf = 'SP'): string {
  const ranges: Record<string, [number,number]> = { SP:[1000000,19999999], RJ:[20000000,28999999], MG:[30000000,39999999], RS:[90000000,99999999], PR:[80000000,87999999] }
  const [min, max] = ranges[uf] || [1000000, 99999999]
  const n = Math.floor(Math.random() * (max - min + 1)) + min
  const s = n.toString().padStart(8,'0')
  return s.slice(0,5) + '-' + s.slice(5)
}

function gerarCartao(): string {
  const bandeiras = ['4', '5'] // Visa/Master prefix
  const pref = pick(bandeiras)
  const digits = pref + Array.from({length: 15}, () => rand(10)).join('')
  return digits.slice(0,4) + ' ' + digits.slice(4,8) + ' ' + digits.slice(8,12) + ' ' + digits.slice(12,16)
}

function gerarData(): {str: string; idade: number} {
  const year = 1950 + rand(55)
  const month = rand(12) + 1
  const day = rand(28) + 1
  const str = String(day).padStart(2,'0') + '/' + String(month).padStart(2,'0') + '/' + year
  const idade = new Date().getFullYear() - year
  return { str, idade }
}

function gerarPessoa(sexo?: string): Pessoa {
  const s = sexo === 'M' ? 'M' : sexo === 'F' ? 'F' : (rand(2) ? 'M' : 'F')
  const prenome = s === 'M' ? pick(nomesM) : pick(nomesF)
  const sobrenome = pick(sobrenomesP1) + ' ' + pick(sobrenomesP2)
  const nome = prenome + ' ' + sobrenome
  const uf = pick(estados2)
  const cidadesUF = cidades[uf] || ['Capital']
  const cidade = pick(cidadesUF)
  const { str: dataNasc, idade } = gerarData()
  const email = prenome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') + rand(999) + '@' + pick(['gmail.com','hotmail.com','yahoo.com','outlook.com'])
  const login = prenome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') + '_' + sobrenomesP1[rand(sobrenomesP1.length)].toLowerCase() + rand(99)
  const tel = '(' + (rand(89)+11) + ') ' + (rand(8999)+1000) + '-' + (rand(8999)+1000)
  const cel = '(' + (rand(89)+11) + ') 9' + (rand(8999)+1000) + '-' + (rand(8999)+1000)

  const nomeMae = pick(nomesF) + ' ' + pick(sobrenomesP1)
  const nomePai = pick(nomesM) + ' ' + pick(sobrenomesP1)

  return {
    nome, email, cpf: gerarCPF(), rg: gerarRG(), dataNasc, idade, sexo: s === 'M' ? 'Masculino' : 'Feminino',
    telefone: tel, celular: cel, cep: gerarCEP(uf),
    endereco: pick(ruas), numero: String(rand(999)+1),
    bairro: pick(bairros), cidade, estado: uf,
    mae: nomeMae, pai: nomePai,
    cartao: gerarCartao(),
    senha: Array.from({length: 10}, () => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%'[rand(66)]).join(''),
    login,
  }
}

function gerar() {
  const s = sexoFiltro.value === 'M' ? 'M' : sexoFiltro.value === 'F' ? 'F' : undefined
  if (qtd.value === 1) { pessoa.value = gerarPessoa(s); multiplos.value = [] }
  else { multiplos.value = Array.from({length: Math.min(50, qtd.value)}, () => gerarPessoa(s)); pessoa.value = null }
}

function copiarTudo(p: Pessoa) {
  const txt = Object.entries(p).map(([k,v]) => `${k}: ${v}`).join('\n')
  navigator.clipboard.writeText(txt)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
}

function copiar(text: string) {
  navigator.clipboard.writeText(text)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}

gerar()
</script>

<template>
  <ToolShell title="Gerador de Pessoas" description="Gere dados completos de pessoas fictícias para testes: nome, CPF, endereço, e-mail e mais."
    icon="fa-users" icon-gradient="from-purple-500 to-violet-700" orb-color="purple"
    :quick-tips="['CPF válido','Endereços reais','Emails fictícios']"
    :tips="[{title:'Apenas para testes',text:'Dados gerados são fictícios. CPF/RG são matematicamente válidos mas não correspondem a pessoas reais.'}]">

    <div class="btn-row !mb-4">
      <div>
        <label class="text-xs text-blue-300 mb-1 block">Sexo</label>
        <select v-model="sexoFiltro" class="input-aurora">
          <option value="ambos">Ambos</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>
      <div>
        <label class="text-xs text-blue-300 mb-1 block">Quantidade</label>
        <input v-model.number="qtd" type="number" min="1" max="50" class="w-20 input-aurora" />
      </div>
      <button @click="gerar" class="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold transition-colors">
        <Icon icon="mdi:refresh" class="w-4 h-4" /> Gerar
      </button>
    </div>

    <!-- Single person detail -->
    <div v-if="pessoa" class="glass-panel p-5 space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
            {{ pessoa.nome.split(' ').map(n=>n[0]).slice(0,2).join('') }}
          </div>
          <div>
            <p class="text-lg font-bold text-white">{{ pessoa.nome }}</p>
            <p class="text-xs text-blue-300">{{ pessoa.sexo }} • {{ pessoa.idade }} anos</p>
          </div>
        </div>
        <button @click="copiarTudo(pessoa!)" class="btn-glass text-xs py-1.5 px-3">
          <Icon icon="mdi:content-copy" class="w-3.5 h-3.5 mr-1 inline" />Copiar tudo
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <template v-for="[label, val] in [
          ['CPF', pessoa.cpf], ['RG', pessoa.rg], ['Data de Nasc.', pessoa.dataNasc],
          ['E-mail', pessoa.email], ['Login', pessoa.login], ['Senha', pessoa.senha],
          ['Telefone', pessoa.telefone], ['Celular', pessoa.celular],
          ['CEP', pessoa.cep], ['Endereço', `${pessoa.endereco}, ${pessoa.numero}`],
          ['Bairro', pessoa.bairro], ['Cidade/UF', `${pessoa.cidade} - ${pessoa.estado}`],
          ['Mãe', pessoa.mae], ['Pai', pessoa.pai], ['Cartão', pessoa.cartao]
        ] as [string,string][]" :key="label">
          <div class="bg-white/5 p-2.5 rounded-lg flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer" @click="copiar(val)">
            <div>
              <p class="text-blue-300 text-[10px]">{{ label }}</p>
              <p class="font-mono text-white">{{ val }}</p>
            </div>
            <Icon icon="mdi:content-copy" class="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 shrink-0" />
          </div>
        </template>
      </div>
    </div>

    <!-- Multiple persons table -->
    <div v-if="multiplos.length > 0" class="overflow-x-auto">
      <table class="w-full text-xs">
        <thead class="bg-white/5">
          <tr>
            <th class="p-2 text-left text-blue-300">Nome</th>
            <th class="p-2 text-left text-blue-300">CPF</th>
            <th class="p-2 text-left text-blue-300">E-mail</th>
            <th class="p-2 text-left text-blue-300">Cidade</th>
            <th class="p-2 text-left text-blue-300">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in multiplos" :key="i" class="border-t border-white/5 hover:bg-white/5 transition-colors">
            <td class="p-2 text-white font-semibold">{{ p.nome }}</td>
            <td class="p-2 font-mono text-blue-200">{{ p.cpf }}</td>
            <td class="p-2 text-blue-200">{{ p.email }}</td>
            <td class="p-2 text-blue-200">{{ p.cidade }}/{{ p.estado }}</td>
            <td class="p-2">
              <button @click="copiarTudo(p)" class="text-blue-400 hover:text-white">
                <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </ToolShell>
</template>

