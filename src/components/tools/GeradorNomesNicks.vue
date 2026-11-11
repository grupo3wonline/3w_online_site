<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const aba = ref<'nomes'|'nicks'>('nomes')
onMounted(() => { if (route.params.slug === 'gerador-nicks') aba.value = 'nicks' })
watch(() => route.params.slug, (s) => { if (s === 'gerador-nicks') aba.value = 'nicks'; else if (s === 'gerador-nomes') aba.value = 'nomes' })

const qtd = ref(10)
const sexo = ref('ambos')
const resultados = ref<string[]>([])

const nomesM = ['Carlos','João','Pedro','Lucas','Marcos','Felipe','Rafael','Gabriel','Matheus','André','Roberto','Daniel','Eduardo','Leandro','Bruno','Diego','Alexandre','Rodrigo','Thiago','Leonardo','Murilo','Douglas','Vinícius','Gustavo','Henrique','Arthur','Davi','Cauã','Enzo','Miguel']
const nomesF = ['Ana','Maria','Fernanda','Patricia','Juliana','Camila','Larissa','Beatriz','Gabriela','Isabela','Amanda','Tatiana','Vanessa','Carolina','Mariana','Aline','Leticia','Priscila','Renata','Sandra','Cristina','Monica','Helena','Bianca','Natalia','Clara','Sofia','Julia','Valentina','Laura']
const sobrenomes = ['Silva','Santos','Oliveira','Souza','Pereira','Costa','Ferreira','Alves','Rodrigues','Nascimento','Lima','Araújo','Melo','Barbosa','Carvalho','Cardoso','Gomes','Martins','Monteiro','Ribeiro','Vieira','Fernandes','Dias','Cunha','Freitas','Campos','Ramos','Pinto','Moreira','Cavalcanti']

// Nick generation
const nickAdj = ['Dark','Fast','Light','Fire','Ice','Iron','Brave','Shadow','Silver','Gold','Wild','Blue','Red','Black','Storm','Flash','Night','Star','Dragon','Wolf','Epic','Pro','Ultra','Hyper','Super','Master','Legend','Elite','Nova','Cyber']
const nickNoun = ['Blade','Tiger','Hunter','Raider','Knight','Ranger','Sniper','Ninja','Warrior','Phantom','Ghost','Falcon','Eagle','Lion','Fox','Snake','Hawk','Wolf','Dragon','Phoenix','Shadow','Storm','Blaze','Frost','Thunder','Lightning','Viper','Cobra','Panther','Shark']
const nickSuffix = ['','99','_BR','2024','_X','Pro','XD','777','_BR99','2025','Gamer','_Game']

function rand(n: number) { return Math.floor(Math.random() * n) }
function pick<T>(arr: T[]): T { return arr[rand(arr.length)] }

function gerarNome(): string {
  const s = sexo.value === 'M' ? 'M' : sexo.value === 'F' ? 'F' : (rand(2) ? 'M' : 'F')
  const prenome = s === 'M' ? pick(nomesM) : pick(nomesF)
  return prenome + ' ' + pick(sobrenomes) + (rand(2) ? ' ' + pick(sobrenomes) : '')
}

function gerarNick(): string {
  const styles = [
    () => pick(nickAdj) + pick(nickNoun) + pick(nickSuffix),
    () => pick(nickAdj).toLowerCase() + '_' + pick(nickNoun).toLowerCase() + pick(nickSuffix),
    () => 'x' + pick(nickNoun) + 'x' + pick(nickSuffix),
    () => pick(nickAdj) + pick(nickNoun) + String(rand(99)),
    () => pick(nomesM).toLowerCase() + pick(nickSuffix),
  ]
  return pick(styles)()
}

function gerar() {
  const n = Math.max(1, Math.min(100, qtd.value))
  resultados.value = Array.from({length: n}, aba.value === 'nomes' ? gerarNome : gerarNick)
}

function copiarTodos() {
  navigator.clipboard.writeText(resultados.value.join('\n'))
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
}

function copiar(text: string) {
  navigator.clipboard.writeText(text)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}

onMounted(gerar)
watch([aba, sexo], gerar)
</script>

<template>
  <ToolShell :title="aba === 'nomes' ? 'Gerador de Nomes' : 'Gerador de Nicks'"
    :description="aba === 'nomes' ? 'Gere nomes brasileiros aleatórios masculinos, femininos ou mistos.' : 'Gere nicks/apelidos criativos para games, redes sociais e usuários.'"
    icon="fa-user-tag" icon-gradient="from-pink-500 to-rose-700" orb-color="pink"
    :quick-tips="['Nomes reais brasileiros','Nicks únicos','Cópia rápida']"
    :tips="[{title:'Uso',text:'Selecione o tipo, quantidade e clique em Gerar.'}]">

    <div class="flex gap-1.5 mb-4">
      <button @click="aba='nomes'" :class="['px-4 py-2 rounded-lg text-sm font-semibold transition-all border',aba==='nomes'?'bg-pink-600 text-white border-pink-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">Nomes</button>
      <button @click="aba='nicks'" :class="['px-4 py-2 rounded-lg text-sm font-semibold transition-all border',aba==='nicks'?'bg-pink-600 text-white border-pink-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">Nicks / Apelidos</button>
    </div>

    <div class="btn-row !mb-4">
      <div v-if="aba === 'nomes'">
        <label class="text-xs text-blue-300 mb-1 block">Sexo</label>
        <select v-model="sexo" class="input-aurora"><option value="ambos">Ambos</option><option value="M">Masculino</option><option value="F">Feminino</option></select>
      </div>
      <div>
        <label class="text-xs text-blue-300 mb-1 block">Quantidade</label>
        <input v-model.number="qtd" type="number" min="1" max="100" class="w-20 input-aurora" />
      </div>
      <button @click="gerar" class="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-semibold transition-colors">
        <Icon icon="mdi:refresh" class="w-4 h-4" /> Gerar
      </button>
      <button v-if="resultados.length" @click="copiarTodos" class="flex items-center gap-2 px-4 py-2 bg-white/5 text-blue-300 border border-white/10 hover:bg-white/10 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:content-copy" class="w-4 h-4" /> Copiar todos
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <div v-for="(r, i) in resultados" :key="i"
        class="flex items-center justify-between bg-white/5 hover:bg-white/10 p-2.5 rounded-lg group transition-colors cursor-pointer"
        @click="copiar(r)">
        <span class="text-white text-sm">{{ r }}</span>
        <Icon icon="mdi:content-copy" class="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100" />
      </div>
    </div>
  </ToolShell>
</template>

