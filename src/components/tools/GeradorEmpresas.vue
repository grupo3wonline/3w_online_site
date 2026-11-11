<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface Empresa {
  razaoSocial: string; nomeFantasia: string; cnpj: string; inscricaoEstadual: string
  tipo: string; porte: string; cnae: string; telefone: string; email: string
  cep: string; logradouro: string; numero: string; bairro: string; cidade: string; uf: string
  responsavel: string; cpfResponsavel: string
}

const empresa = ref<Empresa | null>(null)
const multiplos = ref<Empresa[]>([])
const qtd = ref(1)

const prefixos = ['Tech','Data','Net','Web','Digital','Smart','Mega','Alfa','Beta','Global','Prime','Fast','Pro','Soft','Cloud']
const sufixos = ['Solutions','Systems','Serviços','Comércio','Tecnologia','Inovação','Engenharia','Consultoria','Distribuidora','Indústria']
const tipos = ['Ltda','S/A','EIRELI','MEI','S.S','Ltda - ME']
const portes = ['Microempresa (ME)','Empresa de Pequeno Porte (EPP)','Empresa de Médio Porte','Grande Empresa']
const cnaeMap = [
  '6201-5/00 – Desenvolvimento de programas de computador sob encomenda',
  '6202-3/00 – Desenvolvimento e licenciamento de programas de computador',
  '6209-1/00 – Suporte técnico em TI',
  '4751-2/01 – Comércio varejista especializado de equipamentos e suprimentos de informática',
  '4753-9/00 – Comércio varejista especializado de eletrodomésticos e equipamentos de áudio e vídeo',
  '7490-1/04 – Atividades de intermediação e agenciamento de serviços',
  '8599-6/04 – Treinamento em desenvolvimento profissional',
  '7311-4/00 – Agências de publicidade',
  '4921-3/01 – Transporte rodoviário coletivo de passageiros',
  '4312-6/00 – Perfurações e sondagens',
]
const estados2 = ['SP','RJ','MG','RS','PR','BA','CE','PE','GO','SC']
const cidades2: Record<string, string[]> = { SP: ['São Paulo','Campinas','Ribeirão Preto'], RJ: ['Rio de Janeiro','Niterói'], MG: ['Belo Horizonte','Uberlândia'], RS: ['Porto Alegre','Caxias do Sul'], PR: ['Curitiba','Londrina'] }
const nomesMasc = ['Carlos','João','Pedro','Marcos','Felipe','Rafael','Roberto','Daniel','Eduardo']
const sobrenomes = ['Silva','Santos','Oliveira','Costa','Ferreira','Alves','Rodrigues','Lima','Araújo']

function rand(n: number) { return Math.floor(Math.random() * n) }
function pick<T>(arr: T[]): T { return arr[rand(arr.length)] }

function gerarCNPJ(): string {
  const n = Array.from({length: 12}, () => rand(10))
  n[8] = 0; n[9] = 0; n[10] = 0; n[11] = 1
  const w1 = [5,4,3,2,9,8,7,6,5,4,3,2]
  const d1 = 11 - (n.reduce((s,v,i) => s + v*w1[i], 0) % 11)
  const d1f = d1 >= 10 ? 0 : d1
  const w2 = [6,5,4,3,2,9,8,7,6,5,4,3,2]
  const d2 = 11 - ([...n, d1f].reduce((s,v,i) => s + v*w2[i], 0) % 11)
  const d2f = d2 >= 10 ? 0 : d2
  const r = [...n, d1f, d2f].join('')
  return r.slice(0,2) + '.' + r.slice(2,5) + '.' + r.slice(5,8) + '/' + r.slice(8,12) + '-' + r.slice(12)
}

function gerarCPF(): string {
  const n = Array.from({length: 9}, () => rand(10))
  const d1 = ((n.reduce((s,v,i) => s + v*(10-i), 0) * 10) % 11) % 10
  const d2 = (([...n, d1].reduce((s,v,i) => s + v*(11-i), 0) * 10) % 11) % 10
  const r = [...n, d1, d2].join('')
  return r.slice(0,3) + '.' + r.slice(3,6) + '.' + r.slice(6,9) + '-' + r.slice(9)
}

function gerarIESP(): string {
  const d = Array.from({length: 11}, () => rand(10))
  const w = [1,3,1,3,1,3,1,3,1,3,1]
  let sum = 0
  for (let i = 0; i < 11; i++) { let p = d[i]*w[i]; sum += p >= 10 ? Math.floor(p/10)+(p%10) : p }
  const ch = (10 - (sum%10)) % 10
  const r = [...d, ch].join('')
  return r.slice(0,3) + '.' + r.slice(3,6) + '.' + r.slice(6,9) + '.' + r.slice(9)
}

function gerarCEP(uf = 'SP'): string {
  const ranges: Record<string, [number,number]> = { SP:[1000000,19999999], RJ:[20000000,28999999], MG:[30000000,39999999] }
  const [min, max] = ranges[uf] || [1000000,99999999]
  const n = Math.floor(Math.random() * (max - min + 1)) + min
  const s = n.toString().padStart(8,'0')
  return s.slice(0,5) + '-' + s.slice(5)
}

function gerarEmpresa(): Empresa {
  const pref = pick(prefixos); const suf = pick(sufixos)
  const razaoSocial = `${pref} ${suf} ${pick(tipos)}`
  const nomeFantasia = `${pref} ${suf}`
  const uf = pick(estados2)
  const cidadesUF = cidades2[uf] || ['Capital']
  const nomeResp = pick(nomesMasc) + ' ' + pick(sobrenomes)
  return {
    razaoSocial, nomeFantasia, cnpj: gerarCNPJ(), inscricaoEstadual: gerarIESP(),
    tipo: pick(tipos), porte: pick(portes), cnae: pick(cnaeMap),
    telefone: `(${rand(89)+11}) ${rand(8999)+1000}-${rand(8999)+1000}`,
    email: `contato@${nomeFantasia.toLowerCase().replace(/\s/g,'')}.com.br`,
    cep: gerarCEP(uf), logradouro: `Av. ${pick(['Brasil','Paulista','São João','Industrial','Comercial'])}`,
    numero: String(rand(9999)+1), bairro: pick(['Centro','Jardim Industrial','Vila Comercial','Parque Empresarial']),
    cidade: pick(cidadesUF), uf,
    responsavel: nomeResp, cpfResponsavel: gerarCPF(),
  }
}

function gerar() {
  if (qtd.value === 1) { empresa.value = gerarEmpresa(); multiplos.value = [] }
  else { multiplos.value = Array.from({length: Math.min(20, qtd.value)}, gerarEmpresa); empresa.value = null }
}

function copiar(text: string) { navigator.clipboard.writeText(text); Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false }) }
function copiarTudo(e: Empresa) { navigator.clipboard.writeText(Object.entries(e).map(([k,v]) => `${k}: ${v}`).join('\n')); Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false }) }

gerar()
</script>

<template>
  <ToolShell title="Gerador de Empresas" description="Gere dados completos de empresas fictícias para testes: CNPJ, IE, endereço e responsável."
    icon="fa-building" icon-gradient="from-sky-500 to-blue-700" orb-color="blue"
    :quick-tips="['CNPJ válido','Dados completos','Para testes']"
    :tips="[{title:'Apenas para testes',text:'Dados gerados são fictícios. CNPJs são matematicamente válidos mas não pertencem a empresas reais.'}]">

    <div class="btn-row !mb-4">
      <div>
        <label class="text-xs text-blue-300 mb-1 block">Quantidade</label>
        <input v-model.number="qtd" type="number" min="1" max="20" class="w-20 input-aurora" />
      </div>
      <button @click="gerar" class="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-semibold transition-colors">
        <Icon icon="mdi:refresh" class="w-4 h-4" /> Gerar
      </button>
    </div>

    <div v-if="empresa" class="glass-panel p-5 space-y-4">
      <div class="flex justify-between items-start">
        <div>
          <p class="text-lg font-bold text-white">{{ empresa.razaoSocial }}</p>
          <p class="text-sm text-blue-300">{{ empresa.nomeFantasia }}</p>
        </div>
        <button @click="copiarTudo(empresa!)" class="btn-glass text-xs py-1.5 px-3"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5 mr-1 inline" />Copiar tudo</button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <template v-for="[label, val] in [
          ['CNPJ', empresa.cnpj], ['Inscrição Estadual', empresa.inscricaoEstadual],
          ['Tipo', empresa.tipo], ['Porte', empresa.porte],
          ['CNAE', empresa.cnae], ['Telefone', empresa.telefone],
          ['E-mail', empresa.email], ['CEP', empresa.cep],
          ['Logradouro', `${empresa.logradouro}, ${empresa.numero}`],
          ['Bairro', empresa.bairro], ['Cidade/UF', `${empresa.cidade} - ${empresa.uf}`],
          ['Responsável', empresa.responsavel], ['CPF Responsável', empresa.cpfResponsavel]
        ] as [string,string][]" :key="label">
          <div class="bg-white/5 p-2.5 rounded-lg flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer" @click="copiar(val)">
            <div><p class="text-blue-300 text-[10px]">{{ label }}</p><p class="font-mono text-white text-xs">{{ val }}</p></div>
            <Icon icon="mdi:content-copy" class="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 shrink-0" />
          </div>
        </template>
      </div>
    </div>

    <div v-if="multiplos.length > 0" class="overflow-x-auto">
      <table class="w-full text-xs">
        <thead class="bg-white/5"><tr>
          <th class="p-2 text-left text-blue-300">Razão Social</th>
          <th class="p-2 text-left text-blue-300">CNPJ</th>
          <th class="p-2 text-left text-blue-300">Cidade/UF</th>
          <th class="p-2 text-blue-300"></th>
        </tr></thead>
        <tbody>
          <tr v-for="(e, i) in multiplos" :key="i" class="border-t border-white/5 hover:bg-white/5">
            <td class="p-2 text-white font-semibold">{{ e.razaoSocial }}</td>
            <td class="p-2 font-mono text-blue-200">{{ e.cnpj }}</td>
            <td class="p-2 text-blue-200">{{ e.cidade }}/{{ e.uf }}</td>
            <td class="p-2"><button @click="copiarTudo(e)" class="text-blue-400 hover:text-white"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </ToolShell>
</template>

